// ─── LIFF App — Effects (Side Effects) ────────────────────────

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';

export function createEffects(dispatch: (action: AppAction) => void) {
  return {
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
        // Silent fail
      }
    },

    subscribeToReadings: async () => {
      await pb.collection('sensor_readings').subscribe('*', (e) => {
        if (e.action === 'create') {
          dispatch({ type: 'reading/ADD_ONE', payload: { reading: e.record as any } });
        }
      });
    },

    fetchUnreadAlertCount: async () => {
      try {
        const result = await pb.collection('alerts').getList(1, 1, {
          filter: 'resolved=false',
        });
        dispatch({ type: 'alert/SET_UNREAD_COUNT', payload: { count: result.totalItems } });
      } catch (error) {
        // Silent fail
      }
    },
  };
}

export type Effects = ReturnType<typeof createEffects>;
