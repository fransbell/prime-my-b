// ─── LIFF App — Update (Pure Reducer) ────────────────────────

import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── Auth: LIFF Init ──
    case 'auth/LIFF_INIT_SUCCESS':
      return { ...state, liffInitialized: true };

    case 'auth/LIFF_INIT_ERROR':
      return { ...state, liffInitialized: false, error: action.payload.error };

    // ── Auth: LIFF Login ──
    case 'auth/LIFF_LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'auth/LIFF_LOGIN_SUCCESS':
      return {
        ...state,
        liffLoggedIn: true,
        profile: action.payload.profile,
        loading: false,
      };

    case 'auth/LIFF_LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    // ── Auth: PocketBase Auth ──
    case 'auth/PB_AUTH_START':
      return { ...state, loading: true, error: null };

    case 'auth/PB_AUTH_SUCCESS':
      return {
        ...state,
        pbAuthenticated: true,
        pbToken: action.payload.token,
        loading: false,
      };

    case 'auth/PB_AUTH_ERROR':
      return { ...state, pbAuthenticated: false, loading: false, error: action.payload.error };

    // ── Auth: Logout ──
    case 'auth/LOGOUT':
      return { ...state, liffLoggedIn: false, pbAuthenticated: false, profile: null, pbToken: null };

    // ── Sensor ──
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return { ...state, sensors: action.payload.sensors, loading: false };

    case 'sensor/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    // ── Reading ──
    case 'reading/FETCH_SUCCESS':
      return { ...state, latestReadings: action.payload.readings };

    case 'reading/ADD_ONE':
      return {
        ...state,
        latestReadings: [action.payload.reading, ...state.latestReadings].slice(0, 50),
      };

    // ── Alert ──
    case 'alert/SET_UNREAD_COUNT':
      return { ...state, unreadAlerts: action.payload.count };

    // ── Navigation ──
    case 'nav/SET_PAGE':
      return { ...state, activePage: action.payload.page };

    // ── General UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
