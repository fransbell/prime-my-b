// ─── Dashboard App — Model (State) ────────────────────────────
// Aligned with the Fermentation Copilot design:
// Dashboard → Batch List → Batch Detail → Alerts

import type { SensorRecord, SensorReading, AlertRecord } from '@prime-my-brain/store';

// ─── Batch Types ──────────────────────────────────────────────
export type BatchStatus = 'active' | 'completed' | 'paused' | 'failed';
export type ProcessType = 'washed' | 'natural' | 'honey' | 'anaerobic';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface BatchRecord {
  id: string;
  name: string;
  coffeeVariety?: string;
  processType: ProcessType;
  status: BatchStatus;
  currentStage?: string;
  latestPh?: number;
  latestTemp?: number;
  latestWeight?: number;
  latestCo2?: number;
  predictedScore?: number;
  targetFlavorProfile?: string;
  ambientTemp?: number;
  notes?: string;
  startedAt: string;
  endedAt?: string;
  created: string;
  updated: string;
}

export interface BatchAnalysis {
  id: string;
  batch: string;
  stage: string;
  stageNumber: number;
  totalStages: number;
  riskLevel: 'safe' | 'caution' | 'warning' | 'critical';
  predictedScore?: number;
  estimatedHoursRemaining?: number;
  recommendation: string;
  createdAt: string;
}

export interface DashboardSummary {
  activeBatches: number;
  completedBatches: number;
  unacknowledgedAlerts: number;
  avgPredictedScore?: number;
  recentAlerts: AlertRecord[];
  processByType: { processType: ProcessType; count: number }[];
}

// ─── App State ────────────────────────────────────────────────
export interface AppState {
  // Batch data
  batches: BatchRecord[];
  selectedBatchId: string | null;
  batchAnalysis: BatchAnalysis | null;

  // Sensor data
  sensors: SensorRecord[];
  readings: SensorReading[];
  alerts: AlertRecord[];

  // Dashboard summary
  summary: DashboardSummary | null;

  // Filters
  batchStatusFilter: BatchStatus | 'all';
  batchProcessFilter: ProcessType | 'all';
  alertSeverityFilter: AlertSeverity | 'all';
  showAcknowledgedAlerts: boolean;

  // Loading & errors
  loading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalRecords: number;
}

export const initialAppState: AppState = {
  batches: [],
  selectedBatchId: null,
  batchAnalysis: null,
  sensors: [],
  readings: [],
  alerts: [],
  summary: null,
  batchStatusFilter: 'all',
  batchProcessFilter: 'all',
  alertSeverityFilter: 'all',
  showAcknowledgedAlerts: false,
  loading: false,
  error: null,
  currentPage: 1,
  totalRecords: 0,
};
