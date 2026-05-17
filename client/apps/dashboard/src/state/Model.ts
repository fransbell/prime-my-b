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
  actualCuppingScore?: number;
  targetFlavorProfile?: string;
  ambientTemp?: number;
  notes?: string;
  startedAt: string;
  endedAt?: string;
  created: string;
  updated: string;
}

export type FermentationPhase = 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'complete';

export interface TriggeredRule {
  id: string;         // e.g. "W-01"
  status: 'pass' | 'warn' | 'critical';
  message: string;
}

// Feature 3 — Process Optimizer
export interface ProcessRecommendation {
  type: 'variety_process' | 'flavor_ph' | 'temp_duration' | 'seasonal';
  level: 'ideal' | 'acceptable' | 'caution';
  message: string;
  detail?: string;
}

// Feature 4 — Quality Predictor
export interface SimilarBatch {
  batchId: string;
  batchName: string;
  variety: string;
  processType: ProcessType;
  actualCuppingScore?: number;
  predictedScore?: number;
  similarityScore: number;        // 0–100
  fermentationHours?: number;
  stopPh?: number;
}

// Feature 5 — Recipe
export interface Recipe {
  id: string;
  variety: string;
  processType: ProcessType;
  targetFlavorProfile?: string;
  targetPh?: number;
  fermentationHours?: number;
  ambientTempMin?: number;
  ambientTempMax?: number;
  avgCuppingScore?: number;
  batchCount?: number;
  notes?: string;
  lastUpdated?: string;
  created: string;
  updated: string;
}

// Mock RAG — a retrieved + grounded reference for a (new or analyzed) batch.
// Shape is stable across mock → real RAG; only its producer changes.
export interface RetrievedReference {
  recipeId?: string;
  query: { variety: string; processType: ProcessType; flavorProfile?: string };
  summary: string;                       // template-generated, citations inline
  suggestedParams: {
    targetPh?: number;
    fermentationHours?: number;
    ambientTempMin?: number;
    ambientTempMax?: number;
  };
  citations: { kind: 'recipe' | 'batch'; id: string; label: string; score: number }[];
  confidence: 'low' | 'medium' | 'high';
}

// Pitch Demo — in-app auto-play (read-only, never writes the DB).
// The controller drives this; views render from it.
export interface DemoState {
  active: boolean;
  step: number;
  totalSteps: number;
  title: string;
  caption: string;
  openNewBatch: boolean;
  applyAmbient: boolean;
  form: { name: string; variety: string; process: ProcessType };
}

export const initialDemoState: DemoState = {
  active: false,
  step: 0,
  totalSteps: 6,
  title: '',
  caption: '',
  openNewBatch: false,
  applyAmbient: false,
  form: { name: '', variety: '', process: 'washed' },
};

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
  // Extended analysis fields
  fermentationPhase?: FermentationPhase;
  phRateOfChange?: number;        // ΔpH/h (negative = dropping)
  tempAdjustedEta?: number;       // Arrhenius-corrected ETA in hours
  triggeredRules?: TriggeredRule[] | string;          // JSON string from PocketBase
  phasePh?: { min: number; max: number } | string;   // JSON string from PocketBase
  varietyFloor?: number;
  // Feature 3
  processRecommendations?: ProcessRecommendation[] | string;
  // Feature 4
  similarBatches?: SimilarBatch[] | string;
}

export type AnalysisHistoryEntry = BatchAnalysis & {
  originalAnalysisId?: string;
};

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
  analysisHistory: AnalysisHistoryEntry[];
  // Feature 5 — Recipes
  recipes: Recipe[];
  // Mock RAG — retrieved reference for the batch being created/analyzed
  retrievedReference: RetrievedReference | null;
  // Pitch Demo — in-app auto-play state
  demo: DemoState;

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
  analysisHistory: [],
  recipes: [],
  retrievedReference: null,
  demo: initialDemoState,
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
