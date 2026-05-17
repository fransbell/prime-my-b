// ─── Dashboard App — Update (Pure Reducer) ────────────────────
// The Update function is a PURE function: (state, action) → newState

import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState, initialDemoState } from './Model';

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

    case 'batch/UPDATE_SUCCESS':
      return {
        ...state,
        batches: state.batches.map(b =>
          b.id === action.payload.batch.id ? action.payload.batch : b
        ),
      };

    // ── Analysis ──
    case 'analysis/FETCH_SUCCESS':
      return { ...state, batchAnalysis: action.payload.analysis };

    case 'analysis/CLEAR':
      return { ...state, batchAnalysis: null, analysisHistory: [] };

    case 'analysis/HISTORY_FETCH_SUCCESS':
      return { ...state, analysisHistory: action.payload.history };

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

    // ── Recipes ──
    case 'recipe/FETCH_SUCCESS':
      return { ...state, recipes: action.payload.recipes };

    case 'recipe/SAVE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.some(r => r.id === action.payload.recipe.id)
          ? state.recipes.map(r => r.id === action.payload.recipe.id ? action.payload.recipe : r)
          : [action.payload.recipe, ...state.recipes],
      };

    case 'recipe/RETRIEVE_SUCCESS':
      return { ...state, retrievedReference: action.payload.reference };

    case 'recipe/RETRIEVE_CLEAR':
      return { ...state, retrievedReference: null };

    // ── Pitch Demo ──
    case 'demo/START':
      return { ...state, demo: { ...initialDemoState, active: true } };

    case 'demo/STOP':
      return { ...state, demo: { ...initialDemoState } };

    case 'demo/SET_STEP':
      return {
        ...state,
        demo: {
          ...state.demo,
          step: action.payload.step,
          title: action.payload.title,
          caption: action.payload.caption,
        },
      };

    case 'demo/OPEN_NEW_BATCH':
      return { ...state, demo: { ...state.demo, openNewBatch: action.payload.open } };

    case 'demo/APPLY_AMBIENT':
      return { ...state, demo: { ...state.demo, applyAmbient: action.payload.value } };

    case 'demo/SET_FORM':
      return {
        ...state,
        demo: { ...state.demo, form: { ...state.demo.form, ...action.payload.form } },
      };

    // ── General UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
