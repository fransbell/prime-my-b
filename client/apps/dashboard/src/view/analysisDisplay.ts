import type { BatchAnalysis, AnalysisHistoryEntry } from '../state/Model';

/** PocketBase may use createdAt (schema) or created (system) on records. */
export function analysisTimestamp(entry: {
  createdAt?: string;
  created?: string;
}): string | undefined {
  return entry.createdAt ?? entry.created;
}

/** Current batch_analysis, or most recent archived report if none on file. */
export function getLatestAnalysis(
  current: BatchAnalysis | null,
  history: AnalysisHistoryEntry[],
): BatchAnalysis | null {
  if (current) return current;
  if (history.length === 0) return null;

  const entry = history[0];
  return {
    id: entry.id,
    batch: entry.batch,
    stage: entry.stage,
    stageNumber: entry.stageNumber,
    totalStages: entry.totalStages,
    riskLevel: entry.riskLevel,
    predictedScore: entry.predictedScore,
    estimatedHoursRemaining: entry.estimatedHoursRemaining,
    recommendation: entry.recommendation,
    createdAt: analysisTimestamp(entry) ?? '',
  };
}

/** Past reports for history panel — skip duplicate when latest comes from history[0]. */
export function getPastAnalysisHistory(
  current: BatchAnalysis | null,
  history: AnalysisHistoryEntry[],
): AnalysisHistoryEntry[] {
  if (current) return history;
  return history.slice(1);
}
