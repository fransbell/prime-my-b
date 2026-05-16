// ─── Dashboard App — Actions ──────────────────────────────────
// Actions are discriminated union types. Every state mutation is an action.

import type {
  SensorRecord, SensorReading, AlertRecord,
} from '@prime-my-brain/store';
import type {
  BatchRecord, BatchAnalysis, DashboardSummary,
  BatchStatus, ProcessType, AlertSeverity,
} from './Model';

// ─── Batch Actions ────────────────────────────────────────────
export type BatchAction =
  | { type: 'batch/FETCH_START' }
  | { type: 'batch/FETCH_SUCCESS'; payload: { batches: BatchRecord[] } }
  | { type: 'batch/FETCH_ERROR'; payload: { error: string } }
  | { type: 'batch/SELECT'; payload: { batchId: string } }
  | { type: 'batch/DESELECT' }
  | { type: 'batch/SET_STATUS_FILTER'; payload: { filter: BatchStatus | 'all' } }
  | { type: 'batch/SET_PROCESS_FILTER'; payload: { filter: ProcessType | 'all' } };

// ─── Batch Analysis Actions ───────────────────────────────────
export type AnalysisAction =
  | { type: 'analysis/FETCH_SUCCESS'; payload: { analysis: BatchAnalysis } }
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

// ─── Root Action Union ────────────────────────────────────────
export type AppAction =
  | BatchAction
  | AnalysisAction
  | SensorAction
  | ReadingAction
  | AlertAction
  | SummaryAction
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };
