// ─── IoT Demo App — Update (Pure Reducer) ─────────────────────
// Pure function: (state, action) → newState
// No side effects, no mutations. Every state transition is explicit.

import type { AppState, ViewFlow } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

// Navigation back-map: where to go when user navigates back
const backMap: Record<ViewFlow, ViewFlow> = {
  'hardware-list': 'hardware-list',
  'device-detail': 'hardware-list',
  'metric-activate': 'device-detail',
};

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── Device ──
    case 'device/LOAD_CATALOG':
      return { ...state, devices: action.payload.devices };

    case 'device/SELECT':
      return {
        ...state,
        selectedDeviceId: action.payload.deviceId,
        currentView: 'device-detail',
        selectedMetricId: null,
      };

    case 'device/DESELECT':
      return {
        ...state,
        selectedDeviceId: null,
        selectedMetricId: null,
        currentView: 'hardware-list',
      };

    // ── Metric ──
    case 'metric/SELECT':
      return {
        ...state,
        selectedMetricId: action.payload.metricId,
        currentView: 'metric-activate',
        activeStatus: null,
        activeStatusLevel: null,
      };

    case 'metric/DESELECT':
      return {
        ...state,
        selectedMetricId: null,
        currentView: 'device-detail',
        activeStatus: null,
        activeStatusLevel: null,
      };

    // ── Activation ──
    case 'activation/SET_STATUS':
      return {
        ...state,
        activeStatus: action.payload.status,
        activeStatusLevel: action.payload.statusLevel,
      };

    case 'activation/CLEAR_STATUS':
      return { ...state, activeStatus: null, activeStatusLevel: null };

    case 'activation/RECORD':
      return {
        ...state,
        activationHistory: [action.payload.record, ...state.activationHistory].slice(0, 50),
      };

    case 'activation/CLEAR_HISTORY':
      return { ...state, activationHistory: [] };

    // ── Navigation ──
    case 'nav/GOTO':
      return { ...state, currentView: action.payload.view };

    case 'nav/BACK':
      return { ...state, currentView: backMap[state.currentView] };

    // ── UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
