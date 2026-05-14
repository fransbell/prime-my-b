// ─── Dashboard App — Update (Pure Reducer) ────────────────────
// The Update function is a PURE function: (state, action) → newState
// No side effects, no API calls, no mutations. Only state transitions.

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

    case 'sensor/SELECT':
      return { ...state, selectedSensorId: action.payload.sensorId };

    case 'sensor/DESELECT':
      return { ...state, selectedSensorId: null };

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

    // ── Dashboard UI ──
    case 'dashboard/SET_TAB':
      return { ...state, activeTab: action.payload.tab };

    case 'dashboard/SET_DATE_RANGE':
      return { ...state, dateRange: { start: action.payload.start, end: action.payload.end } };

    case 'dashboard/CLEAR_DATE_RANGE':
      return { ...state, dateRange: null };

    // ── General UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
