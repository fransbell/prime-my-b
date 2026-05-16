// ─── Dashboard App — Effects (Side Effects) ───────────────────
// Effects handle all async operations (PocketBase calls, etc.)
// All PocketBase CRUD is here — views and reducers never touch PB directly.

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';
import type { BatchRecord, BatchAnalysis, AnalysisHistoryEntry, DashboardSummary, ProcessType } from '../state/Model';
import type { AlertRecord } from '@prime-my-brain/store';
import { notifications } from '@mantine/notifications';

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function computeSummary(batches: BatchRecord[], alerts: AlertRecord[]): DashboardSummary {
  const activeBatches = batches.filter(b => b.status === 'active').length;
  const completedBatches = batches.filter(b => b.status === 'completed').length;
  const unacknowledgedAlerts = alerts.filter(a => !a.resolved).length;
  const scored = batches.filter(b => b.predictedScore != null);
  const avgPredictedScore = scored.length > 0
    ? scored.reduce((sum, b) => sum + (b.predictedScore ?? 0), 0) / scored.length
    : undefined;

  const processMap = new Map<ProcessType, number>();
  batches.forEach(b => {
    processMap.set(b.processType, (processMap.get(b.processType) ?? 0) + 1);
  });
  const processByType = Array.from(processMap.entries()).map(([processType, count]) => ({ processType, count }));

  return {
    activeBatches,
    completedBatches,
    unacknowledgedAlerts,
    avgPredictedScore,
    recentAlerts: alerts.filter(a => !a.resolved).slice(0, 5) as any[],
    processByType,
  };
}

function notifySuccess(title: string, message?: string) {
  notifications.show({ title, message, color: 'green', autoClose: 3000 });
}

function notifyError(title: string) {
  notifications.show({ title, message: '', color: 'red', autoClose: 4000 });
}

// ═══════════════════════════════════════════════════════════════
// Effects Factory
// ═══════════════════════════════════════════════════════════════

export function createEffects(dispatch: (action: AppAction) => void) {
  const fx = {

    // ── Fetch dashboard summary (uses custom API + fallback) ──
    fetchSummary: async (): Promise<void> => {
      try {
        // Try custom server endpoint first
        const resp = await fetch(`${pb.baseURL}/api/custom/dashboard/summary`);
        if (resp.ok) {
          const summary = await resp.json() as DashboardSummary;
          dispatch({ type: 'summary/FETCH_SUCCESS', payload: { summary } });
          return;
        }
      } catch {
        // fallback to client-side computation below
      }

      // Fallback: compute from local PB data
      try {
        const [batches, alerts] = await Promise.all([
          pb.collection('batches').getFullList({ sort: '-startedAt' }) as unknown as Promise<BatchRecord[]>,
          pb.collection('alerts').getFullList({ sort: '-created' }) as unknown as Promise<AlertRecord[]>,
        ]);
        const summary = computeSummary(batches, alerts);
        dispatch({ type: 'summary/FETCH_SUCCESS', payload: { summary } });
        dispatch({ type: 'batch/FETCH_SUCCESS', payload: { batches } });
        dispatch({ type: 'alert/FETCH_SUCCESS', payload: { alerts } });
      } catch {
        // graceful degradation
      }
    },

    // ── Batch CRUD ──────────────────────────────────────────────

    fetchBatches: async (): Promise<BatchRecord[]> => {
      dispatch({ type: 'batch/FETCH_START' });
      try {
        const batches = await pb.collection('batches').getFullList({
          sort: '-startedAt',
        }) as unknown as BatchRecord[];
        dispatch({ type: 'batch/FETCH_SUCCESS', payload: { batches } });
        return batches;
      } catch (error) {
        dispatch({ type: 'batch/FETCH_ERROR', payload: { error: (error as Error).message } });
        return [];
      }
    },

    fetchBatch: async (batchId: string): Promise<BatchRecord | null> => {
      try {
        return await pb.collection('batches').getOne(batchId) as unknown as BatchRecord;
      } catch {
        return null;
      }
    },

    createBatch: async (data: {
      name: string;
      coffeeVariety?: string;
      processType: 'washed' | 'natural' | 'honey' | 'anaerobic';
      targetFlavorProfile?: string;
      ambientTemp?: number;
      notes?: string;
    }): Promise<BatchRecord | null> => {
      try {
        const batch = await pb.collection('batches').create({
          ...data,
          status: 'active',
          startedAt: new Date().toISOString(),
          latestPh: null,
          latestTemp: null,
          latestWeight: null,
          latestCo2: null,
        }) as unknown as BatchRecord;

        notifySuccess('Batch created', `${data.name} is now active.`);

        // Refresh data
        await fx.fetchBatches();
        await fx.fetchSummary();
        return batch;
      } catch (error) {
        notifyError('Failed to create batch');
        dispatch({ type: 'batch/FETCH_ERROR', payload: { error: (error as Error).message } });
        return null;
      }
    },

    updateBatch: async (
      batchId: string,
      data: Pick<Partial<BatchRecord>, 'name' | 'notes' | 'coffeeVariety' | 'targetFlavorProfile' | 'ambientTemp'>,
    ): Promise<BatchRecord | null> => {
      try {
        const batch = await pb.collection('batches').update(batchId, data) as unknown as BatchRecord;
        dispatch({ type: 'batch/UPDATE_SUCCESS', payload: { batch } });
        notifySuccess('Batch updated');
        await fx.fetchBatches();
        await fx.fetchSummary();
        return batch;
      } catch (error) {
        notifyError('Failed to update batch');
        dispatch({ type: 'batch/FETCH_ERROR', payload: { error: (error as Error).message } });
        return null;
      }
    },

    completeBatch: async (batchId: string): Promise<void> => {
      try {
        await pb.collection('batches').update(batchId, {
          status: 'completed',
          endedAt: new Date().toISOString(),
        });
        notifySuccess('Batch completed');
        await fx.fetchBatches();
        await fx.fetchSummary();
      } catch (error) {
        notifyError('Failed to complete batch');
      }
    },

    // ── Batch Readings ──────────────────────────────────────────

    fetchReadings: async (batchId: string, page = 1, perPage = 50): Promise<void> => {
      dispatch({ type: 'reading/FETCH_START' });
      try {
        const result = await pb.collection('batch_readings').getList(page, perPage, {
          filter: `batch="${batchId}"`,
          sort: '-timestamp',
        });
        dispatch({
          type: 'reading/FETCH_SUCCESS',
          payload: { readings: result.items as any, total: result.totalItems },
        });
      } catch (error) {
        dispatch({ type: 'reading/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    addReading: async (batchId: string, data: {
      ph?: number;
      temperature?: number;
      weight?: number;
      co2?: number;
    }): Promise<void> => {
      try {
        await pb.collection('batch_readings').create({
          batch: batchId,
          ...data,
          timestamp: new Date().toISOString(),
        });
        notifySuccess('Sensor reading recorded');

        // Refresh readings + batch (server hook updates latest* fields)
        await fx.fetchReadings(batchId);
        await fx.fetchBatches();
        await fx.fetchAlerts();
        await fx.fetchSummary();
      } catch (error) {
        notifyError('Failed to record reading');
      }
    },

    // ── Alerts ──────────────────────────────────────────────────

    fetchAlerts: async (): Promise<AlertRecord[]> => {
      try {
        const alerts = await pb.collection('alerts').getFullList({ sort: '-created' });
        dispatch({ type: 'alert/FETCH_SUCCESS', payload: { alerts: alerts as unknown as AlertRecord[] } });
        return alerts as unknown as AlertRecord[];
      } catch {
        return [];
      }
    },

    resolveAlert: async (alertId: string): Promise<void> => {
      try {
        await pb.collection('alerts').update(alertId, {
          resolved: true,
          resolvedAt: new Date().toISOString(),
        });
        dispatch({ type: 'alert/RESOLVE', payload: { alertId } });
        notifySuccess('Alert acknowledged');
        await fx.fetchAlerts();
        await fx.fetchSummary();
      } catch {
        notifyError('Failed to acknowledge alert');
      }
    },

    // ── Analysis ────────────────────────────────────────────────

    fetchAnalysis: async (batchId: string): Promise<BatchAnalysis | null> => {
      try {
        const results = await pb.collection('batch_analysis').getFullList({
          filter: `batch="${batchId}"`,
          sort: '-createdAt,-created',
        });
        if (results.length > 0) {
          const analysis = results[0] as unknown as BatchAnalysis;
          dispatch({ type: 'analysis/FETCH_SUCCESS', payload: { analysis } });
          return analysis;
        }
        dispatch({ type: 'analysis/CLEAR' });
        return null;
      } catch {
        dispatch({ type: 'analysis/CLEAR' });
        return null;
      }
    },

    fetchAnalysisHistory: async (batchId: string): Promise<AnalysisHistoryEntry[]> => {
      try {
        const results = await pb.collection('analysis_history').getFullList({
          filter: `batch="${batchId}"`,
          sort: '-createdAt,-created',
        }) as unknown as AnalysisHistoryEntry[];
        dispatch({ type: 'analysis/HISTORY_FETCH_SUCCESS', payload: { history: results } });
        return results;
      } catch {
        dispatch({ type: 'analysis/HISTORY_FETCH_SUCCESS', payload: { history: [] } });
        return [];
      }
    },

    // Archive the current analysis to analysis_history before creating a new one
    archiveAnalysis: async (batchId: string): Promise<void> => {
      try {
        const results = await pb.collection('batch_analysis').getFullList({
          filter: `batch="${batchId}"`,
          sort: '-createdAt,-created',
        });
        if (results.length > 0) {
          const current = results[0] as any;
          await pb.collection('analysis_history').create({
            batch: batchId,
            stage: current.stage,
            stageNumber: current.stageNumber,
            totalStages: current.totalStages,
            riskLevel: current.riskLevel,
            predictedScore: current.predictedScore,
            estimatedHoursRemaining: current.estimatedHoursRemaining,
            recommendation: current.recommendation,
            originalAnalysisId: current.id,
          });
        }
      } catch {
        // graceful — history archival failure shouldn't block new analysis
      }
    },

    // Create a mock analysis (in production this would call an AI service)
    triggerAnalysis: async (batchId: string): Promise<BatchAnalysis | null> => {
      try {
        // Archive existing analysis before overwriting
        await fx.archiveAnalysis(batchId);

        // Get current batch
        const batch = await fx.fetchBatch(batchId);
        if (!batch) return null;

        const ph = batch.latestPh ?? 5.5;
        const temp = batch.latestTemp ?? 24;

        // Simple rule-based "analysis" for demo purposes
        let riskLevel: 'safe' | 'caution' | 'warning' | 'critical' = 'safe';
        let stage = 'Initial Fermentation';
        let stageNumber = 1;
        let totalStages = 5;
        let recommendation = 'Fermentation is progressing normally. Continue monitoring.';
        let predictedScore = 82.0;
        let estimatedHours = 72.0;

        if (ph < 4.5) {
          riskLevel = 'caution';
          stage = 'Acid Development';
          stageNumber = 3;
          recommendation = 'pH dropping below ideal range. Consider temperature adjustment.';
          predictedScore = 78.5;
          estimatedHours = 48;
        } else if (ph < 5.0) {
          stage = 'Mid Fermentation';
          stageNumber = 2;
          recommendation = 'pH trending downward as expected. Good fermentation progress.';
          predictedScore = 84.0;
          estimatedHours = 60;
        }

        if (temp > 28) {
          riskLevel = riskLevel === 'safe' ? 'caution' : 'warning';
          recommendation += ' Temperature is elevated — monitor closely.';
          predictedScore -= 2;
        }

        const analysis = await pb.collection('batch_analysis').create({
          batch: batchId,
          stage,
          stageNumber,
          totalStages,
          riskLevel,
          predictedScore,
          estimatedHoursRemaining: estimatedHours,
          recommendation,
        }) as unknown as BatchAnalysis;

        dispatch({ type: 'analysis/FETCH_SUCCESS', payload: { analysis } });
        notifySuccess('Analysis complete', 'AI fermentation analysis updated.');
        await fx.fetchAnalysisHistory(batchId);
        await fx.fetchBatches();
        await fx.fetchAlerts();
        await fx.fetchSummary();
        return analysis;
      } catch (error) {
        notifyError('Analysis failed');
        return null;
      }
    },

    // ── Sensor subscriptions ────────────────────────────────────

    subscribeToReadings: async (_batchId: string): Promise<void> => {
      await pb.collection('batch_readings').subscribe('*', (e) => {
        if (e.action === 'create') {
          dispatch({ type: 'reading/ADD_ONE', payload: { reading: e.record as any } });
        }
      });
    },

    unsubscribeFromReadings: async (): Promise<void> => {
      await pb.collection('batch_readings').unsubscribe('*');
    },

    // ── Initialize all data ─────────────────────────────────────

    initialize: async (): Promise<void> => {
      // Always fetch batches — fetchSummary's custom endpoint only returns aggregates
      await Promise.all([
        fx.fetchBatches(),
        fx.fetchAlerts(),
        fx.fetchSummary(),
      ]);
    },
  };

  return fx;
}

export type Effects = ReturnType<typeof createEffects>;
