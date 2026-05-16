// ─── Dashboard App — Types ────────────────────────────────────
// Re-export state types from Elm Architecture modules

export type {
  AppState, BatchRecord, BatchAnalysis, DashboardSummary,
  BatchStatus, ProcessType, AlertSeverity,
} from '../state/Model';
export type { AppAction } from '../state/Actions';
