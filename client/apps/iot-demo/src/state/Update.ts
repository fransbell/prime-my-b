// ─── IoT Demo App — Update (Pure Reducer) ─────────────────────

import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── Sensor ──
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return { ...state, sensors: action.payload.sensors, loading: false };

    case 'sensor/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    // ── Reading ──
    case 'reading/INSERT_START':
      return { ...state, loading: true, error: null };

    case 'reading/INSERT_SUCCESS':
      return {
        ...state,
        loading: false,
        recentReadings: [action.payload.reading, ...state.recentReadings].slice(0, 100),
        successCount: state.successCount + 1,
      };

    case 'reading/INSERT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        failCount: state.failCount + 1,
      };

    case 'reading/CLEAR_RECENT':
      return { ...state, recentReadings: [] };

    // ── Generator ──
    case 'generator/SET_SENSOR':
      return { ...state, generator: { ...state.generator, sensorId: action.payload.sensorId } };

    case 'generator/SET_INTERVAL':
      return { ...state, generator: { ...state.generator, intervalMs: action.payload.intervalMs } };

    case 'generator/SET_TYPES':
      return { ...state, generator: { ...state.generator, readingTypes: action.payload.readingTypes } };

    case 'generator/SET_RANGE':
      return {
        ...state,
        generator: {
          ...state.generator,
          valueRange: { min: action.payload.min, max: action.payload.max },
        },
      };

    case 'generator/START':
      return { ...state, generator: { ...state.generator, isRunning: true } };

    case 'generator/STOP':
      return { ...state, generator: { ...state.generator, isRunning: false } };

    case 'generator/INCREMENT_COUNT':
      return { ...state, generator: { ...state.generator, generatedCount: state.generator.generatedCount + 1 } };

    case 'generator/RESET_COUNT':
      return { ...state, generator: { ...state.generator, generatedCount: 0 } };

    // ── Simulator ──
    case 'simulator/START':
      return { ...state, simulator: { ...state.simulator, isRunning: true } };

    case 'simulator/STOP':
      return { ...state, simulator: { ...state.simulator, isRunning: false } };

    case 'simulator/SET_SENSOR_COUNT':
      return { ...state, simulator: { ...state.simulator, sensorCount: action.payload.count } };

    case 'simulator/SET_TYPES':
      return { ...state, simulator: { ...state.simulator, readingTypes: action.payload.readingTypes } };

    case 'simulator/INCREMENT_TOTAL':
      return { ...state, simulator: { ...state.simulator, totalGenerated: state.simulator.totalGenerated + action.payload.count } };

    case 'simulator/RESET_TOTAL':
      return { ...state, simulator: { ...state.simulator, totalGenerated: 0 } };

    // ── UI ──
    case 'ui/SET_TAB':
      return { ...state, activeTab: action.payload.tab };

    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
