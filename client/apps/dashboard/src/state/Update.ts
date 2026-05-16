// ─── Dashboard App — Update (Pure Reducer) ────────────────────
// The Update function is a PURE function: (state, action) → newState

import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── Batch ──
    case 'batch/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'batch/FETCH_SUCCESS':
      return { ...state, batches: action.payload.batches, loading: false };

    case 'batch/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    case 'batch/SELECT':
      return { ...state, selectedBatchId: action.payload.batchId };

    case 'batch/DESELECT':
      return { ...state, selectedBatchId: null, batchAnalysis: null };

    case 'batch/SET_STATUS_FILTER':
      return { ...state, batchStatusFilter: action.payload.filter };

    case 'batch/SET_PROCESS_FILTER':
      return { ...state, batchProcessFilter: action.payload.filter };

    // ── Analysis ──
    case 'analysis/FETCH_SUCCESS':
      return { ...state, batchAnalysis: action.payload.analysis };

    case 'analysis/CLEAR':
      return { ...state, batchAnalysis: null };

    // ── Sensor ──
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return { ...state, sensors: action.payload.sensors, loading: false };

    case 'sensor/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    case 'sensor/SELECT':
      return { ...state, selectedBatchId: action.payload.sensorId };

    case 'sensor/DESELECT':
      return { ...state, selectedBatchId: null };

    // ── Reading ──
    case 'reading/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'reading/FETCH_SUCCESS':
      return {
        ...state,
        readings: action.payload.readings,
        totalRecords: action.payload.total,
        loading: false,
      };

    case 'reading/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    case 'reading/ADD_ONE':
      return {
        ...state,
        readings: [action.payload.reading, ...state.readings],
        totalRecords: state.totalRecords + 1,
      };

    case 'reading/SET_PAGE':
      return { ...state, currentPage: action.payload.page };

    // ── Alert ──
    case 'alert/FETCH_SUCCESS':
      return { ...state, alerts: action.payload.alerts };

    case 'alert/RESOLVE':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload.alertId
            ? { ...a, resolved: true, resolvedAt: new Date().toISOString() }
            : a
        ),
      };

    case 'alert/SET_SEVERITY_FILTER':
      return { ...state, alertSeverityFilter: action.payload.filter };

    case 'alert/TOGGLE_SHOW_ACKNOWLEDGED':
      return { ...state, showAcknowledgedAlerts: action.payload.show };

    // ── Summary ──
    case 'summary/FETCH_SUCCESS':
      return { ...state, summary: action.payload.summary };

    // ── General UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
