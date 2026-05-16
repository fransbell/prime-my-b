// ─── Dashboard App — State Re-exports ─────────────────────────

export type {
  AppState, BatchRecord, BatchAnalysis, DashboardSummary,
  BatchStatus, ProcessType, AlertSeverity,
} from './Model';
export { initialAppState } from './Model';
export type {
  AppAction, BatchAction, AnalysisAction, SensorAction,
  ReadingAction, AlertAction, SummaryAction,
} from './Actions';
export { update } from './Update';
export { useStore, dispatch } from './store';
