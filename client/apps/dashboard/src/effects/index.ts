// ─── Dashboard App — Effects (Side Effects) ───────────────────
// Effects handle all async operations (PocketBase calls, etc.)
// They dispatch actions before and after async work.
// Effects are the ONLY place for impure code.

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';

// Effect runner: takes dispatch and returns named effect functions
export function createEffects(dispatch: (action: AppAction) => void) {
  return {
    // ── Sensor Effects ──
    fetchSensors: async () => {
      dispatch({ type: 'sensor/FETCH_START' });
      try {
        const sensors = await pb.collection('sensors').getFullList({
          sort: '-created',
        });
        dispatch({ type: 'sensor/FETCH_SUCCESS', payload: { sensors: sensors as any } });
      } catch (error) {
        dispatch({ type: 'sensor/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Reading Effects ──
    fetchReadings: async (sensorId?: string, page = 1, perPage = 50) => {
      dispatch({ type: 'reading/FETCH_START' });
      try {
        const filter = sensorId ? `sensor="${sensorId}"` : '';
        const result = await pb.collection('sensor_readings').getList(page, perPage, {
          filter,
          sort: '-timestamp',
        });
        dispatch({
          type: 'reading/FETCH_SUCCESS',
          payload: { readings: result.items as any, total: result.totalItems },
        });
      } catch (error) {
        dispatch({ type: 'reading/FETCH_ERROR', payload: { error: (error as Error).message } });
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

    // ── Alert Effects ──
    fetchAlerts: async () => {
      try {
        const alerts = await pb.collection('alerts').getFullList({
          filter: 'resolved=false',
          sort: '-created',
        });
        dispatch({ type: 'alert/FETCH_SUCCESS', payload: { alerts: alerts as any } });
      } catch (error) {
        // Silent fail for alerts - non-critical
      }
    },

    resolveAlert: async (alertId: string) => {
      try {
        await pb.collection('alerts').update(alertId, {
          resolved: true,
          resolvedAt: new Date().toISOString(),
        });
        dispatch({ type: 'alert/RESOLVE', payload: { alertId } });
      } catch (error) {
        // Silent fail for alert resolution
      }
    },
  };
}

export type Effects = ReturnType<typeof createEffects>;
