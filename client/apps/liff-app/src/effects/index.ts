// ─── LIFF App — Effects (Side Effects) ────────────────────────
//
// LINE Login → PocketBase Auth Flow:
//
//  1. initLiff()       — Load LIFF SDK, check if already logged in
//  2. loginWithLine()  — Trigger LINE Login (if not already logged in)
//  3. authenticateWithPB() — Send LINE ID token to PocketBase for verification
//  4. PocketBase verifies token with LINE API, finds/creates user, returns auth token
//  5. pb.authStore.save() — Store PocketBase auth token for subsequent API calls
//
// All side effects dispatch actions. Reducers stay pure.

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';


// LIFF type declarations (from @line/liff)
declare global {
  interface Window {
    liff?: any;
  }
}

// Lazy-loaded LIFF instance
let liffModule: any = null;

async function getLiff() {
  if (!liffModule) {
    liffModule = await import('@line/liff');
  }
  return liffModule;
}

export function createEffects(dispatch: (action: AppAction) => void) {
  return {
    // ══════════════════════════════════════════════════════════
    // Auth Effects — LINE Login → PocketBase Auth
    // ══════════════════════════════════════════════════════════

    /**
     * Initialize LIFF SDK and check login status.
     * If already logged in to LINE, automatically proceed to PB auth.
     */
    initLiff: async () => {
      dispatch({ type: 'auth/LIFF_INIT_START' });
      try {
        const liff = await getLiff();
        const liffId = import.meta.env.VITE_LIFF_ID;

        if (!liffId) {
          dispatch({ type: 'auth/LIFF_INIT_ERROR', payload: { error: 'VITE_LIFF_ID is not configured' } });
          return;
        }

        await liff.init({ liffId });

        dispatch({ type: 'auth/LIFF_INIT_SUCCESS' });

        // If already logged in to LINE, get profile and authenticate with PB
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          dispatch({
            type: 'auth/LIFF_LOGIN_SUCCESS',
            payload: {
              profile: {
                userId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage,
              },
            },
          });

          // Automatically authenticate with PocketBase
          await authenticateWithPocketBase(liff, dispatch);
        }
      } catch (error) {
        dispatch({ type: 'auth/LIFF_INIT_ERROR', payload: { error: (error as Error).message } });
      }
    },

    /**
     * Trigger LINE Login via LIFF.
     * On success, gets profile and authenticates with PocketBase.
     */
    loginWithLine: async () => {
      dispatch({ type: 'auth/LIFF_LOGIN_START' });
      try {
        const liff = await getLiff();

        if (!liff.isLoggedIn()) {
          // This redirects to LINE Login page — user will come back to the app
          liff.login();
          return; // Page will reload after LINE login
        }

        // Already logged in — get profile
        const profile = await liff.getProfile();
        dispatch({
          type: 'auth/LIFF_LOGIN_SUCCESS',
          payload: {
            profile: {
              userId: profile.userId,
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl,
              statusMessage: profile.statusMessage,
            },
          },
        });

        // Authenticate with PocketBase
        await authenticateWithPocketBase(liff, dispatch);
      } catch (error) {
        dispatch({ type: 'auth/LIFF_LOGIN_ERROR', payload: { error: (error as Error).message } });
      }
    },

    /**
     * Logout from both LINE and PocketBase.
     */
    logout: async () => {
      try {
        const liff = await getLiff();
        if (liff.isLoggedIn()) {
          liff.logout();
        }
      } catch {
        // LIFF logout may fail outside LINE context
      }
      pb.authStore.clear();
      dispatch({ type: 'auth/LOGOUT' });
    },

    // ══════════════════════════════════════════════════════════
    // Data Effects (require PB auth)
    // ══════════════════════════════════════════════════════════

    fetchSensors: async () => {
      dispatch({ type: 'sensor/FETCH_START' });
      try {
        const sensors = await pb.collection('sensors').getFullList({
          filter: 'status="active"',
          sort: '-created',
        });
        dispatch({ type: 'sensor/FETCH_SUCCESS', payload: { sensors: sensors as any } });
      } catch (error) {
        dispatch({ type: 'sensor/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    fetchLatestReadings: async (sensorId: string) => {
      try {
        const readings = await pb.collection('sensor_readings').getList(1, 20, {
          filter: `sensor="${sensorId}"`,
          sort: '-timestamp',
        });
        dispatch({ type: 'reading/FETCH_SUCCESS', payload: { readings: readings.items as any } });
      } catch (error) {
        // Silent fail for readings
      }
    },

    subscribeToReadings: async () => {
      await pb.collection('sensor_readings').subscribe('*', (e) => {
        if (e.action === 'create') {
          dispatch({ type: 'reading/ADD_ONE', payload: { reading: e.record as any } });
        }
      });
    },

    unsubscribeFromReadings: async () => {
      await pb.collection('sensor_readings').unsubscribe('*');
    },

    fetchUnreadAlertCount: async () => {
      try {
        const result = await pb.collection('alerts').getList(1, 1, {
          filter: 'resolved=false',
        });
        dispatch({ type: 'alert/SET_UNREAD_COUNT', payload: { count: result.totalItems } });
      } catch (error) {
        // Silent fail for alerts
      }
    },

    // ── Cleanup ──
    cleanup: async () => {
      try {
        await pb.collection('sensor_readings').unsubscribe('*');
      } catch {
        // Silent cleanup
      }
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// Internal: Authenticate with PocketBase using LINE ID token
// ═══════════════════════════════════════════════════════════════

async function authenticateWithPocketBase(liff: any, dispatch: (action: AppAction) => void) {
  dispatch({ type: 'auth/PB_AUTH_START' });
  try {
    // Get the ID token from LIFF — this is a JWT that proves LINE identity
    const idToken = liff.getIDToken();

    if (!idToken) {
      dispatch({ type: 'auth/PB_AUTH_ERROR', payload: { error: 'No LINE ID token available' } });
      return;
    }

    // Send ID token to our PocketBase custom auth endpoint
    // Server verifies with LINE API → creates/finds user → returns PB auth token
    const response = await fetch(`${pb.baseURL}/api/custom/auth/line`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      dispatch({ type: 'auth/PB_AUTH_ERROR', payload: { error: errorData.error || 'Authentication failed' } });
      return;
    }

    const data = await response.json();

    // Save PocketBase auth token — this enables all subsequent PB API calls
    pb.authStore.save(data.token, data.record);

    dispatch({
      type: 'auth/PB_AUTH_SUCCESS',
      payload: {
        token: data.token,
        user: data.record,
      },
    });
  } catch (error) {
    dispatch({ type: 'auth/PB_AUTH_ERROR', payload: { error: (error as Error).message } });
  }
}

export type Effects = ReturnType<typeof createEffects>;
