// ─── IoT Demo App — Effects (Side Effects) ────────────────────
// Isolated side effects. Each effect receives dispatch to emit actions.
// No direct state mutation — effects only dispatch actions.

import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog } from '../data/devices';
import type { MetricStatus, MetricStatusLevel } from '../data/devices';
import type { ActivationRecord } from '../state/Model';

export function createEffects(dispatch: (action: AppAction) => void) {
  return {
    // ── Load static device catalog ──
    loadCatalog: () => {
      dispatch({ type: 'device/LOAD_CATALOG', payload: { devices: deviceCatalog } });
    },

    // ── Activate a demo status for a metric ──
    activateStatus: (
      deviceId: string,
      deviceName: string,
      metricId: string,
      metricName: string,
      metricUnit: string,
      status: MetricStatus,
      statusLevel: MetricStatusLevel,
    ) => {
      // Set the active status for display
      dispatch({ type: 'activation/SET_STATUS', payload: { status, statusLevel } });

      // Record this activation in history
      const record: ActivationRecord = {
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        deviceId,
        deviceName,
        metricId,
        metricName,
        status,
        value: statusLevel.value,
        unit: metricUnit,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'activation/RECORD', payload: { record } });

      // Future: Here you would also insert the reading into PocketBase
      // pb.collection('sensor_readings').create({ ... })
    },

    // ── Clear current activation ──
    clearActivation: () => {
      dispatch({ type: 'activation/CLEAR_STATUS' });
    },

    // ── Clear activation history ──
    clearHistory: () => {
      dispatch({ type: 'activation/CLEAR_HISTORY' });
    },

    // ── Cleanup (no timers needed for this demo) ──
    cleanup: () => {
      // No-op for now; reserved for future timer-based effects
    },
  };
}

export type Effects = ReturnType<typeof createEffects>;
