// ─── IoT Demo App — Effects (Side Effects) ────────────────────
// All PocketBase calls live here (effects/ directory only).
// Each metric has its own PB collection. Actions insert records,
// realtime subscriptions push new readings to the UI.
//
// Flow:
//   1. loadCatalog()          — Load static device catalog into state
//   2. fetchReadings()        — GET recent records from a metric collection
//   3. subscribeToMetric()    — Open realtime SSE subscription for live updates
//   4. insertReading()        — POST a new record (triggered by action buttons)
//   5. unsubscribe()          — Close SSE subscription

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog } from '../data/devices';
import type { MetricStatus, MetricStatusLevel } from '../data/devices';

// ═══════════════════════════════════════════════════════════════
// Device Metric → PocketBase Collection Name Mapping
// ═══════════════════════════════════════════════════════════════

export const METRIC_COLLECTIONS: Record<string, string> = {
  'soil-moisture-vwc':  'metric_soil_moisture',
  'ambient-temperature': 'metric_temperature',
  'relative-humidity':  'metric_humidity',
  'soil-ph-level':      'metric_ph',
  'par-intensity':      'metric_par',
  'daily-rainfall':     'metric_rainfall',
  'nitrogen-level':     'metric_nitrogen',
  'phosphorus-level':   'metric_phosphorus',
  'potassium-level':    'metric_potassium',
};

/** Get the PB collection name for a metric ID */
export function getCollectionName(metricId: string): string {
  const name = METRIC_COLLECTIONS[metricId];
  if (!name) throw new Error(`No collection mapping for metric: ${metricId}`);
  return name;
}

// ═══════════════════════════════════════════════════════════════
// Reading record shape (from PB collection)
// ═══════════════════════════════════════════════════════════════

export interface MetricReading {
  id: string;
  value: number;
  unit: string;
  status: string;
  device_id: string;
  metric_id: string;
  source: string;
  created: string;
  updated: string;
}

// ═══════════════════════════════════════════════════════════════
// Effects Factory
// ═══════════════════════════════════════════════════════════════

export function createEffects(dispatch: (action: AppAction) => void) {
  // Track active subscriptions so we can clean up
  let activeSubscriptionMetricId: string | null = null;

  return {
    // ── Load static device catalog ──
    loadCatalog: () => {
      dispatch({ type: 'device/LOAD_CATALOG', payload: { devices: deviceCatalog } });
    },

    // ── Fetch recent readings for a metric ──
    fetchReadings: async (metricId: string) => {
      dispatch({ type: 'reading/FETCH_START' });
      try {
        const collection = getCollectionName(metricId);
        const result = await pb.collection(collection).getList<MetricReading>(1, 50, {
          sort: '-created',
        });
        dispatch({
          type: 'reading/FETCH_SUCCESS',
          payload: { readings: result.items, total: result.totalItems },
        });
      } catch (error) {
        dispatch({ type: 'reading/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Subscribe to realtime updates for a metric ──
    subscribeToMetric: async (metricId: string) => {
      // Unsubscribe from previous metric if different
      if (activeSubscriptionMetricId && activeSubscriptionMetricId !== metricId) {
        try {
          const oldCollection = getCollectionName(activeSubscriptionMetricId);
          await pb.collection(oldCollection).unsubscribe('*');
        } catch {
          // Silent
        }
      }

      try {
        const collection = getCollectionName(metricId);
        await pb.collection(collection).subscribe<MetricReading>('*', (event) => {
          if (event.action === 'create') {
            dispatch({ type: 'reading/ADD_REALTIME', payload: { reading: event.record } });
          }
        });
        activeSubscriptionMetricId = metricId;
        console.log('[IoT] Subscribed to realtime:', collection);
      } catch (error) {
        console.error('[IoT] Subscribe error:', error);
      }
    },

    // ── Insert a new reading record (action button) ──
    insertReading: async (
      deviceId: string,
      deviceName: string,
      metricId: string,
      metricName: string,
      metricUnit: string,
      status: MetricStatus,
      statusLevel: MetricStatusLevel,
    ) => {
      // Optimistically update UI
      dispatch({ type: 'activation/SET_STATUS', payload: { status, statusLevel } });

      try {
        const collection = getCollectionName(metricId);
        const record = await pb.collection(collection).create<MetricReading>({
          value: statusLevel.value,
          unit: metricUnit,
          status,
          device_id: deviceId,
          metric_id: metricId,
          source: 'demo_action',
        });

        // Record in local activation history
        dispatch({
          type: 'activation/RECORD',
          payload: {
            record: {
              id: record.id,
              deviceId,
              deviceName,
              metricId,
              metricName,
              status,
              value: statusLevel.value,
              unit: metricUnit,
              timestamp: record.created,
            },
          },
        });
      } catch (error) {
        dispatch({ type: 'reading/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Clear current activation display ──
    clearActivation: () => {
      dispatch({ type: 'activation/CLEAR_STATUS' });
    },

    // ── Clear activation history ──
    clearHistory: () => {
      dispatch({ type: 'activation/CLEAR_HISTORY' });
    },

    // ── Cleanup subscriptions ──
    cleanup: async () => {
      try {
        if (activeSubscriptionMetricId) {
          const collection = getCollectionName(activeSubscriptionMetricId);
          await pb.collection(collection).unsubscribe('*');
          activeSubscriptionMetricId = null;
        }
      } catch {
        // Silent
      }
    },
  };
}

export type Effects = ReturnType<typeof createEffects>;
