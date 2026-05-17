// ─── Dashboard App — Actions ──────────────────────────────────
// Actions are discriminated union types. Every state mutation is an action.

import type {
  SensorRecord, SensorReading, AlertRecord,
} from '@prime-my-brain/store';
import type {
  BatchRecord, BatchAnalysis, AnalysisHistoryEntry, DashboardSummary,
  BatchStatus, ProcessType, AlertSeverity, Recipe, RetrievedReference,
} from './Model';

// ─── Pitch Demo Actions ───────────────────────────────────────
export type DemoAction =
  | { type: 'demo/START' }
  | { type: 'demo/STOP' }
  | { type: 'demo/SET_STEP'; payload: { step: number; title: string; caption: string } }
  | { type: 'demo/OPEN_NEW_BATCH'; payload: { open: boolean } }
  | { type: 'demo/APPLY_AMBIENT'; payload: { value: boolean } }
  | { type: 'demo/SET_FORM'; payload: { form: Partial<{ name: string; variety: string; process: ProcessType }> } };

// ─── Batch Actions ────────────────────────────────────────────
export type BatchAction =
  | { type: 'batch/FETCH_START' }
  | { type: 'batch/FETCH_SUCCESS'; payload: { batches: BatchRecord[] } }
  | { type: 'batch/FETCH_ERROR'; payload: { error: string } }
  | { type: 'batch/SELECT'; payload: { batchId: string } }
  | { type: 'batch/DESELECT' }
  | { type: 'batch/SET_STATUS_FILTER'; payload: { filter: BatchStatus | 'all' } }
  | { type: 'batch/SET_PROCESS_FILTER'; payload: { filter: ProcessType | 'all' } }
  | { type: 'batch/UPDATE_SUCCESS'; payload: { batch: BatchRecord } };

// ─── Batch Analysis Actions ───────────────────────────────────
export type AnalysisAction =
  | { type: 'analysis/FETCH_SUCCESS'; payload: { analysis: BatchAnalysis } }
  | { type: 'analysis/HISTORY_FETCH_SUCCESS'; payload: { history: AnalysisHistoryEntry[] } }
  | { type: 'analysis/CLEAR' };

// ─── Sensor Actions ───────────────────────────────────────────
export type SensorAction =
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: SensorRecord[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } }
  | { type: 'sensor/SELECT'; payload: { sensorId: string } }
  | { type: 'sensor/DESELECT' };

// ─── Reading Actions ──────────────────────────────────────────
export type ReadingAction =
  | { type: 'reading/FETCH_START' }
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: SensorReading[]; total: number } }
  | { type: 'reading/FETCH_ERROR'; payload: { error: string } }
  | { type: 'reading/ADD_ONE'; payload: { reading: SensorReading } }
  | { type: 'reading/SET_PAGE'; payload: { page: number } };

// ─── Alert Actions ────────────────────────────────────────────
export type AlertAction =
  | { type: 'alert/FETCH_SUCCESS'; payload: { alerts: AlertRecord[] } }
  | { type: 'alert/RESOLVE'; payload: { alertId: string } }
  | { type: 'alert/SET_SEVERITY_FILTER'; payload: { filter: AlertSeverity | 'all' } }
  | { type: 'alert/TOGGLE_SHOW_ACKNOWLEDGED'; payload: { show: boolean } };

// ─── Dashboard Summary Actions ────────────────────────────────
export type SummaryAction =
  | { type: 'summary/FETCH_SUCCESS'; payload: { summary: DashboardSummary } };

// ─── Recipe Actions (Feature 5) ───────────────────────────────
export type RecipeAction =
  | { type: 'recipe/FETCH_SUCCESS'; payload: { recipes: Recipe[] } }
  | { type: 'recipe/SAVE_SUCCESS'; payload: { recipe: Recipe } }
  | { type: 'recipe/RETRIEVE_SUCCESS'; payload: { reference: RetrievedReference | null } }
  | { type: 'recipe/RETRIEVE_CLEAR' };

// ─── Root Action Union ────────────────────────────────────────
export type AppAction =
  | BatchAction
  | AnalysisAction
  | SensorAction
  | ReadingAction
  | AlertAction
  | SummaryAction
  | RecipeAction
  | DemoAction
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };
