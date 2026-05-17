// ─── Dashboard App — Effects (Side Effects) ───────────────────
// Effects handle all async operations (PocketBase calls, etc.)
// All PocketBase CRUD is here — views and reducers never touch PB directly.

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';
import type {
  BatchRecord, BatchAnalysis, AnalysisHistoryEntry, DashboardSummary, ProcessType,
  FermentationPhase, TriggeredRule, ProcessRecommendation, SimilarBatch, Recipe,
} from '../state/Model';
import type { AlertRecord } from '@prime-my-brain/store';
import { notifications } from '@mantine/notifications';
import { buildRetrievedReference, type RetrievalQuery } from './recipeRetrieval';

// ═══════════════════════════════════════════════════════════════
// Fermentation Rule Engine
// ═══════════════════════════════════════════════════════════════

// Variety-specific pH targets and floors (Washed process)
const VARIETY_PH: Record<string, { optimal: number; floor: number }> = {
  typica:       { optimal: 4.2, floor: 3.8 },
  'chiang mai 80': { optimal: 4.3, floor: 3.9 },
  'cm80':       { optimal: 4.3, floor: 3.9 },
  sl28:         { optimal: 4.1, floor: 3.7 },
  sl34:         { optimal: 4.1, floor: 3.7 },
  geisha:       { optimal: 4.4, floor: 4.0 },
  caturra:      { optimal: 4.2, floor: 3.8 },
  catuai:       { optimal: 4.2, floor: 3.8 },
  robusta:      { optimal: 4.2, floor: 3.8 },
};

// Washed process phase boundaries (pH ranges)
const WASHED_PHASES: { phase: FermentationPhase; label: string; phMin: number; phMax: number }[] = [
  { phase: 'phase1', label: 'Initial Breakdown',    phMin: 5.5, phMax: 6.5 },
  { phase: 'phase2', label: 'Primary Fermentation', phMin: 4.8, phMax: 5.5 },
  { phase: 'phase3', label: 'Active Acid Drop',     phMin: 4.2, phMax: 4.8 },
  { phase: 'phase4', label: 'Finish Zone',          phMin: 3.7, phMax: 4.2 },
];

// Arrhenius-based temperature rate multiplier (baseline 26°C)
function tempRateMultiplier(tankTemp: number): number {
  // Q10 approximation: +3°C ≈ +15% rate
  const delta = tankTemp - 26;
  return Math.pow(1.05, delta / 1.0); // ~5% per degree
}

// ΔpH/h from last N readings (sorted newest first)
function computePhRate(readings: { ph?: number | null; timestamp: string }[]): number | null {
  const validReadings = readings
    .filter(r => r.ph != null)
    .slice(0, 6); // last 6 readings
  if (validReadings.length < 2) return null;
  const newest = validReadings[0];
  const oldest = validReadings[validReadings.length - 1];
  const deltaPh = (newest.ph ?? 0) - (oldest.ph ?? 0);
  const deltaHours =
    (new Date(newest.timestamp).getTime() - new Date(oldest.timestamp).getTime()) / 3_600_000;
  if (deltaHours < 0.01) return null;
  return deltaPh / deltaHours;
}

// Classify fermentation phase from current pH
function classifyPhase(ph: number): FermentationPhase {
  for (const p of WASHED_PHASES) {
    if (ph >= p.phMin && ph <= p.phMax) return p.phase;
  }
  if (ph > 6.5) return 'phase1';
  return 'complete';
}

// Run decision rules and return triggered list
function runRules(opts: {
  process: ProcessType;
  ph: number;
  tankTemp: number;
  ambientTemp: number;
  co2Ppm: number | null;
  phRatePerHour: number | null;
  elapsedHours: number;
  varietyFloor: number;
  varietyOptimal: number;
}): TriggeredRule[] {
  const rules: TriggeredRule[] = [];
  const {
    process, ph, tankTemp, ambientTemp, co2Ppm,
    phRatePerHour, elapsedHours, varietyFloor, varietyOptimal,
  } = opts;

  if (process === 'washed' || process === 'anaerobic') {
    // W-01 / A-03: pH drop rate too fast
    const baselineRate = 0.08; // pH/h
    if (phRatePerHour != null && phRatePerHour < -(baselineRate * 1.8)) {
      rules.push({ id: 'W-01', status: 'critical', message: `pH dropping ${Math.abs(phRatePerHour).toFixed(3)} pH/h — over-fermentation risk` });
    } else if (phRatePerHour != null) {
      rules.push({ id: 'W-01', status: 'pass', message: `pH rate ${phRatePerHour.toFixed(3)} pH/h — within normal range` });
    }

    // W-02: pH floor breach
    if (ph < varietyFloor) {
      rules.push({ id: 'W-02', status: 'critical', message: `pH ${ph.toFixed(2)} below floor ${varietyFloor} — over-fermented` });
    } else {
      rules.push({ id: 'W-02', status: 'pass', message: `pH ${ph.toFixed(2)} above variety floor ${varietyFloor}` });
    }

    // W-03: approaching target
    if (ph <= varietyOptimal + 0.3 && ph > varietyOptimal) {
      rules.push({ id: 'W-03', status: 'warn', message: `pH ${ph.toFixed(2)} — approaching target ${varietyOptimal}. Prepare to stop` });
    }

    // W-04: tank temp too high
    if (tankTemp > 30) {
      rules.push({ id: 'W-04', status: 'critical', message: `Tank ${tankTemp.toFixed(1)}°C — fermentation rate elevated, off-flavor risk` });
    } else if (tankTemp > 28) {
      rules.push({ id: 'W-04', status: 'warn', message: `Tank ${tankTemp.toFixed(1)}°C — slightly elevated, monitor closely` });
    } else {
      rules.push({ id: 'W-04', status: 'pass', message: `Tank temp ${tankTemp.toFixed(1)}°C — within optimal range` });
    }

    // W-05: temp too low → risk of undesirable bacteria if too slow
    if (tankTemp < 18 && elapsedHours > 24 && ph > 5.5) {
      rules.push({ id: 'W-05', status: 'warn', message: `Tank ${tankTemp.toFixed(1)}°C — fermentation stalling, undesirable bacteria risk` });
    }

    // W-06: stalled fermentation
    if (phRatePerHour != null && Math.abs(phRatePerHour) < 0.02 && elapsedHours > 12 && ph > 5.0) {
      rules.push({ id: 'W-06', status: 'warn', message: `ΔpH/h ${phRatePerHour.toFixed(3)} — fermentation stalled, check temp & mucilage cleanliness` });
    } else if (phRatePerHour != null) {
      rules.push({ id: 'W-06', status: 'pass', message: `Fermentation active (ΔpH/h ${phRatePerHour.toFixed(3)})` });
    }
  }

  if (process === 'natural') {
    // N-01: humidity mold risk
    if (ambientTemp > 32) {
      rules.push({ id: 'N-03', status: 'warn', message: `Ambient ${ambientTemp.toFixed(1)}°C — drying may be too fast, cracking risk` });
    } else {
      rules.push({ id: 'N-01', status: 'pass', message: `Ambient temp ${ambientTemp.toFixed(1)}°C — drying conditions acceptable` });
    }
  }

  if (process === 'honey') {
    if (ambientTemp > 32) {
      rules.push({ id: 'H-01', status: 'warn', message: `Ambient ${ambientTemp.toFixed(1)}°C — mucilage fermentation accelerating, monitor closely` });
    } else {
      rules.push({ id: 'H-01', status: 'pass', message: `Ambient temp ${ambientTemp.toFixed(1)}°C — honey process conditions acceptable` });
    }
  }

  if (process === 'anaerobic') {
    // A-01: CO2 purge
    if (co2Ppm != null && co2Ppm > 2000) {
      rules.push({ id: 'A-01', status: 'pass', message: `CO₂ ${co2Ppm} ppm — anaerobic purge established` });
    } else if (co2Ppm != null) {
      rules.push({ id: 'A-01', status: 'warn', message: `CO₂ ${co2Ppm} ppm — still purging O₂, wait before sealing` });
    }

    // A-02: pressure buildup warning
    if (co2Ppm != null && co2Ppm > 5000) {
      rules.push({ id: 'A-02', status: 'critical', message: `CO₂ ${co2Ppm} ppm — check pressure release valve immediately` });
    } else if (co2Ppm != null) {
      rules.push({ id: 'A-02', status: 'pass', message: `CO₂ ${co2Ppm} ppm — pressure within safe range` });
    }

    // A-05: anaerobic temp critical
    if (tankTemp > 30) {
      rules.push({ id: 'A-05', status: 'critical', message: `Tank ${tankTemp.toFixed(1)}°C — CRITICAL for anaerobic, undesirable fermentation risk` });
    } else {
      rules.push({ id: 'A-05', status: 'pass', message: `Tank ${tankTemp.toFixed(1)}°C — within anaerobic safe range` });
    }
  }

  return rules;
}

// ═══════════════════════════════════════════════════════════════
// Feature 3 — Process Optimizer
// ═══════════════════════════════════════════════════════════════

// Which processes are ideal / acceptable per variety
const VARIETY_PROCESS_COMPAT: Record<string, { ideal: ProcessType[]; acceptable: ProcessType[] }> = {
  typica:         { ideal: ['washed', 'honey'],    acceptable: ['natural', 'anaerobic'] },
  'chiang mai 80': { ideal: ['washed', 'honey'],   acceptable: ['natural', 'anaerobic'] },
  cm80:           { ideal: ['washed', 'honey'],    acceptable: ['natural', 'anaerobic'] },
  sl28:           { ideal: ['washed', 'anaerobic'], acceptable: ['honey'] },
  sl34:           { ideal: ['washed', 'anaerobic'], acceptable: ['honey'] },
  geisha:         { ideal: ['washed', 'anaerobic'], acceptable: ['honey', 'natural'] },
  caturra:        { ideal: ['washed', 'natural'],   acceptable: ['honey'] },
  catuai:         { ideal: ['washed', 'natural'],   acceptable: ['honey'] },
  robusta:        { ideal: ['natural', 'honey'],    acceptable: ['washed'] },
};

// Flavor profile → target pH range + recommended process
const FLAVOR_PH_MAP: Record<string, { targetPh: number; phRange: [number, number]; bestProcess: ProcessType[] }> = {
  'bright acidity':  { targetPh: 4.05, phRange: [3.9, 4.2],  bestProcess: ['washed', 'anaerobic'] },
  'fruity':          { targetPh: 4.35, phRange: [4.2, 4.5],  bestProcess: ['natural', 'anaerobic'] },
  'floral':          { targetPh: 4.25, phRange: [4.1, 4.4],  bestProcess: ['anaerobic', 'honey'] },
  'chocolate':       { targetPh: 4.15, phRange: [4.0, 4.3],  bestProcess: ['honey', 'washed'] },
  'caramel':         { targetPh: 4.20, phRange: [4.1, 4.35], bestProcess: ['honey', 'natural'] },
  'wine':            { targetPh: 4.40, phRange: [4.3, 4.6],  bestProcess: ['natural', 'anaerobic'] },
  'clean':           { targetPh: 4.10, phRange: [3.95, 4.25], bestProcess: ['washed'] },
  'fermented':       { targetPh: 4.45, phRange: [4.3, 4.6],  bestProcess: ['anaerobic', 'natural'] },
};

// Recommended fermentation duration by process + ambient temp
function recommendedHours(process: ProcessType, ambientTemp: number): { min: number; max: number } {
  const base: Record<ProcessType, { min: number; max: number }> = {
    washed:    { min: 24, max: 48 },
    natural:   { min: 96, max: 240 },
    honey:     { min: 48, max: 120 },
    anaerobic: { min: 36, max: 96 },
  };
  const b = base[process];
  // Warmer = faster: scale by inverse of temp multiplier
  const scale = 1 / tempRateMultiplier(ambientTemp);
  return {
    min: Math.round(b.min * scale),
    max: Math.round(b.max * scale),
  };
}

function computeProcessOptimizer(opts: {
  variety: string;
  process: ProcessType;
  flavorProfile: string;
  ambientTemp: number;
}): ProcessRecommendation[] {
  const recs: ProcessRecommendation[] = [];
  const { variety, process, flavorProfile, ambientTemp } = opts;
  const varietyKey = variety.toLowerCase().trim();

  // Variety × Process compatibility
  const compat = VARIETY_PROCESS_COMPAT[varietyKey];
  if (compat) {
    if (compat.ideal.includes(process)) {
      recs.push({
        type: 'variety_process',
        level: 'ideal',
        message: `${variety} × ${process} — ideal combination`,
        detail: `Ideal processes for ${variety}: ${compat.ideal.join(', ')}`,
      });
    } else if (compat.acceptable.includes(process)) {
      recs.push({
        type: 'variety_process',
        level: 'acceptable',
        message: `${variety} × ${process} — acceptable, not optimal`,
        detail: `Ideal processes for ${variety}: ${compat.ideal.join(', ')}. Consider switching for better cup quality.`,
      });
    } else {
      recs.push({
        type: 'variety_process',
        level: 'caution',
        message: `${variety} × ${process} — not recommended`,
        detail: `Ideal processes for ${variety}: ${compat.ideal.join(', ')}`,
      });
    }
  }

  // Flavor profile → pH + process alignment
  const flavorKey = flavorProfile.toLowerCase().trim();
  const flavorMatch = Object.entries(FLAVOR_PH_MAP).find(([k]) => flavorKey.includes(k));
  if (flavorMatch) {
    const [flavorName, flavorData] = flavorMatch;
    const targetMsg = `Target pH ${flavorData.phRange[0]}–${flavorData.phRange[1]} for ${flavorName} profile`;
    const processFit = flavorData.bestProcess.includes(process);
    recs.push({
      type: 'flavor_ph',
      level: processFit ? 'ideal' : 'acceptable',
      message: processFit
        ? `${process} process suits "${flavorName}" flavor target`
        : `"${flavorName}" flavor is better achieved with ${flavorData.bestProcess.join(' or ')}`,
      detail: targetMsg,
    });
  }

  // Temperature-based duration recommendation
  const duration = recommendedHours(process, ambientTemp);
  const tempNote = ambientTemp > 28
    ? `High ambient temp (${ambientTemp.toFixed(1)}°C) — fermentation faster, target ${duration.min}–${duration.max}h`
    : ambientTemp < 20
    ? `Low ambient temp (${ambientTemp.toFixed(1)}°C) — fermentation slower, target ${duration.min}–${duration.max}h`
    : `Ambient ${ambientTemp.toFixed(1)}°C — target fermentation window ${duration.min}–${duration.max}h`;

  recs.push({
    type: 'temp_duration',
    level: ambientTemp > 30 ? 'caution' : 'ideal',
    message: tempNote,
    detail: `Baseline (26°C) for ${process}: ${Object.values({ washed: '24–48h', natural: '96–240h', honey: '48–120h', anaerobic: '36–96h' })[['washed', 'natural', 'honey', 'anaerobic'].indexOf(process)]}`,
  });

  return recs;
}

// ═══════════════════════════════════════════════════════════════
// Feature 4 — Batch Similarity Scoring
// ═══════════════════════════════════════════════════════════════

function computeSimilarityScore(
  target: { variety: string; process: ProcessType; elapsedHours: number; finalPh: number },
  candidate: BatchRecord,
): number {
  let score = 0;

  // Variety match (40 pts)
  if ((candidate.coffeeVariety ?? '').toLowerCase() === target.variety.toLowerCase()) score += 40;

  // Process match (30 pts)
  if (candidate.processType === target.process) score += 30;

  // Fermentation duration similarity (20 pts) — within 20%
  if (candidate.endedAt && candidate.startedAt) {
    const candidateHours = (new Date(candidate.endedAt).getTime() - new Date(candidate.startedAt).getTime()) / 3_600_000;
    const durationDiff = Math.abs(candidateHours - target.elapsedHours) / Math.max(target.elapsedHours, 1);
    score += Math.max(0, 20 - durationDiff * 100);
  }

  // Stop pH similarity (10 pts) — within 0.5 pH
  if (candidate.latestPh != null) {
    const phDiff = Math.abs(candidate.latestPh - target.finalPh);
    score += Math.max(0, 10 - phDiff * 20);
  }

  return Math.round(Math.min(100, score));
}

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
          sort: '-createdAt', // batch_analysis has createdAt (no `created`)
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
          sort: '-created', // analysis_history has `created` (no createdAt)
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
          sort: '-createdAt', // batch_analysis has createdAt (no `created`)
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

    // Rule-based fermentation analysis engine
    triggerAnalysis: async (batchId: string): Promise<BatchAnalysis | null> => {
      try {
        await fx.archiveAnalysis(batchId);

        const batch = await fx.fetchBatch(batchId);
        if (!batch) return null;

        // Fetch recent readings to compute ΔpH/h
        const recentReadings = await pb.collection('batch_readings').getFullList({
          filter: `batch="${batchId}"`,
          sort: '-timestamp',
          limit: 8,
        }) as unknown as { ph?: number | null; temperature?: number | null; co2?: number | null; timestamp: string }[];

        const ph = batch.latestPh ?? 5.5;
        const tankTemp = batch.latestTemp ?? 24;
        const ambientTemp = batch.ambientTemp ?? tankTemp;
        const co2Ppm = batch.latestCo2 ?? null;

        // ΔpH/h from recent readings
        const phRateOfChange = computePhRate(recentReadings);

        // Elapsed hours since batch start
        const elapsedHours = batch.startedAt
          ? (Date.now() - new Date(batch.startedAt).getTime()) / 3_600_000
          : 0;

        // Variety thresholds
        const varietyKey = (batch.coffeeVariety ?? '').toLowerCase().trim();
        const varietyPh = VARIETY_PH[varietyKey] ?? VARIETY_PH['typica'];

        // Fermentation phase from pH
        const fermentationPhase = classifyPhase(ph);
        const phaseInfo = WASHED_PHASES.find(p => p.phase === fermentationPhase);

        // Stage label + stageNumber from phase
        const phaseStageMap: Record<FermentationPhase, { label: string; num: number }> = {
          phase1:   { label: 'Initial Breakdown',    num: 1 },
          phase2:   { label: 'Primary Fermentation', num: 2 },
          phase3:   { label: 'Active Acid Drop',     num: 3 },
          phase4:   { label: 'Finish Zone',          num: 4 },
          complete: { label: 'Fermentation Complete', num: 5 },
        };
        const stageInfo = phaseStageMap[fermentationPhase];

        // Run decision rules
        const triggeredRules = runRules({
          process: batch.processType,
          ph,
          tankTemp,
          ambientTemp,
          co2Ppm,
          phRatePerHour: phRateOfChange,
          elapsedHours,
          varietyFloor: varietyPh.floor,
          varietyOptimal: varietyPh.optimal,
        });

        // Derive risk level from rules
        const hasCritical = triggeredRules.some(r => r.status === 'critical');
        const hasWarn = triggeredRules.some(r => r.status === 'warn');
        const riskLevel: 'safe' | 'caution' | 'warning' | 'critical' = hasCritical
          ? 'critical'
          : hasWarn
          ? 'warning'
          : 'safe';

        // Predicted score: start from variety-process baseline, subtract for risks
        let predictedScore = batch.processType === 'anaerobic' ? 86.0
          : batch.processType === 'natural' ? 84.0
          : batch.processType === 'honey' ? 85.0
          : 83.0;

        const phDistanceFromOptimal = Math.abs(ph - varietyPh.optimal);
        predictedScore -= phDistanceFromOptimal * 3;
        if (hasCritical) predictedScore -= 5;
        else if (hasWarn) predictedScore -= 2;
        if (tankTemp > 30) predictedScore -= 3;
        predictedScore = Math.max(60, Math.min(94, predictedScore));

        // Temperature-adjusted ETA using Arrhenius approximation
        const phRemaining = Math.max(0, ph - varietyPh.optimal);
        const baseRatePhPerHour = 0.08;
        const adjustedRate = baseRatePhPerHour * tempRateMultiplier(tankTemp);
        const tempAdjustedEta = adjustedRate > 0 ? phRemaining / adjustedRate : null;

        // Build recommendation text from highest-priority rules
        const criticalRules = triggeredRules.filter(r => r.status === 'critical');
        const warnRules = triggeredRules.filter(r => r.status === 'warn');
        let recommendation = '';
        if (criticalRules.length > 0) {
          recommendation = criticalRules.map(r => r.message).join(' • ');
        } else if (warnRules.length > 0) {
          recommendation = warnRules.map(r => r.message).join(' • ');
        } else {
          recommendation = `Fermentation is in ${stageInfo.label} phase. pH ${ph.toFixed(2)}, target ${varietyPh.optimal}. Continue monitoring.`;
        }

        // Feature 3 — Process Optimizer recommendations
        const processRecommendations = computeProcessOptimizer({
          variety: batch.coffeeVariety ?? 'typica',
          process: batch.processType,
          flavorProfile: batch.targetFlavorProfile ?? '',
          ambientTemp,
        });

        // Feature 4 — Similar completed batches
        const allBatches = await pb.collection('batches').getFullList({
          filter: `status="completed" && id != "${batchId}"`,
          sort: '-endedAt',
        }) as unknown as BatchRecord[];

        const similarBatches: SimilarBatch[] = allBatches
          .map(b => ({
            batchId: b.id,
            batchName: b.name,
            variety: b.coffeeVariety ?? '',
            processType: b.processType,
            actualCuppingScore: b.actualCuppingScore,
            predictedScore: b.predictedScore,
            similarityScore: computeSimilarityScore(
              { variety: batch.coffeeVariety ?? '', process: batch.processType, elapsedHours, finalPh: ph },
              b,
            ),
            fermentationHours: b.endedAt && b.startedAt
              ? Math.round((new Date(b.endedAt).getTime() - new Date(b.startedAt).getTime()) / 3_600_000)
              : undefined,
            stopPh: b.latestPh,
          }))
          .filter(b => b.similarityScore >= 30)
          .sort((a, b) => b.similarityScore - a.similarityScore)
          .slice(0, 3);

        const analysis = await pb.collection('batch_analysis').create({
          batch: batchId,
          stage: stageInfo.label,
          stageNumber: stageInfo.num,
          totalStages: 5,
          riskLevel,
          predictedScore: Math.round(predictedScore * 10) / 10,
          estimatedHoursRemaining: tempAdjustedEta != null ? Math.round(tempAdjustedEta * 10) / 10 : null,
          recommendation,
          fermentationPhase,
          phRateOfChange: phRateOfChange != null ? Math.round(phRateOfChange * 1000) / 1000 : null,
          tempAdjustedEta: tempAdjustedEta != null ? Math.round(tempAdjustedEta * 10) / 10 : null,
          triggeredRules: JSON.stringify(triggeredRules),
          phasePh: phaseInfo ? JSON.stringify({ min: phaseInfo.phMin, max: phaseInfo.phMax }) : null,
          varietyFloor: varietyPh.floor,
          processRecommendations: JSON.stringify(processRecommendations),
          similarBatches: JSON.stringify(similarBatches),
        }) as unknown as BatchAnalysis;

        dispatch({ type: 'analysis/FETCH_SUCCESS', payload: { analysis } });
        notifySuccess('Analysis complete', 'Fermentation analysis updated.');
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

    // ── Feature 4: Submit actual cupping score ──────────────────

    submitCuppingScore: async (batchId: string, score: number): Promise<void> => {
      try {
        const batch = await pb.collection('batches').update(batchId, {
          actualCuppingScore: score,
        }) as unknown as BatchRecord;
        dispatch({ type: 'batch/UPDATE_SUCCESS', payload: { batch } });
        notifySuccess('Cupping score saved', `Score ${score.toFixed(1)} recorded for this batch.`);
        await fx.fetchBatches();
        await fx.fetchSummary();
      } catch {
        notifyError('Failed to save cupping score');
      }
    },

    // ── Feature 5: Recipe library ───────────────────────────────

    fetchRecipes: async (): Promise<Recipe[]> => {
      try {
        const recipes = await pb.collection('recipes').getFullList({
          sort: '-avgCuppingScore,-batchCount',
        }) as unknown as Recipe[];
        dispatch({ type: 'recipe/FETCH_SUCCESS', payload: { recipes } });
        return recipes;
      } catch {
        dispatch({ type: 'recipe/FETCH_SUCCESS', payload: { recipes: [] } });
        return [];
      }
    },

    // Mock RAG — retrieve recipes + completed batches, ground a reference.
    // Read-only; never mutates. Pure logic lives in recipeRetrieval.ts.
    retrieveReferences: async (query: RetrievalQuery): Promise<void> => {
      try {
        const recipes = await pb.collection('recipes').getFullList({
          sort: '-avgCuppingScore,-batchCount',
        }) as unknown as Recipe[];
        const completed = await pb.collection('batches').getFullList({
          filter: `status="completed"`,
          sort: '-endedAt',
        }) as unknown as BatchRecord[];

        const reference = buildRetrievedReference(query, recipes, completed);
        dispatch({ type: 'recipe/RETRIEVE_SUCCESS', payload: { reference } });
      } catch {
        dispatch({ type: 'recipe/RETRIEVE_SUCCESS', payload: { reference: null } });
      }
    },

    saveRecipe: async (batchId: string): Promise<Recipe | null> => {
      try {
        const batch = await fx.fetchBatch(batchId);
        if (!batch || batch.status !== 'completed') {
          notifyError('Batch must be completed before saving a recipe');
          return null;
        }

        const fermentationHours = batch.endedAt && batch.startedAt
          ? Math.round((new Date(batch.endedAt).getTime() - new Date(batch.startedAt).getTime()) / 3_600_000)
          : undefined;

        // Check if a recipe with same variety+process+flavor already exists
        const variety = batch.coffeeVariety ?? 'Unknown';
        const flavor = batch.targetFlavorProfile ?? '';
        const existingList = await pb.collection('recipes').getFullList({
          filter: `variety="${variety}" && processType="${batch.processType}"`,
        }) as unknown as Recipe[];

        const score = batch.actualCuppingScore ?? batch.predictedScore;
        const existing = existingList.find(r => (r.targetFlavorProfile ?? '') === flavor);

        let recipe: Recipe;
        if (existing) {
          // Update running average
          const prevCount = existing.batchCount ?? 1;
          const prevAvg = existing.avgCuppingScore ?? score ?? 80;
          const newAvg = score != null
            ? Math.round(((prevAvg * prevCount + score) / (prevCount + 1)) * 10) / 10
            : prevAvg;

          recipe = await pb.collection('recipes').update(existing.id, {
            avgCuppingScore: newAvg,
            batchCount: prevCount + 1,
            fermentationHours: fermentationHours ?? existing.fermentationHours,
            targetPh: batch.latestPh ?? existing.targetPh,
            ambientTempMin: Math.min(batch.ambientTemp ?? 26, existing.ambientTempMin ?? 999),
            ambientTempMax: Math.max(batch.ambientTemp ?? 26, existing.ambientTempMax ?? 0),
            lastUpdated: new Date().toISOString(),
          }) as unknown as Recipe;
        } else {
          recipe = await pb.collection('recipes').create({
            variety,
            processType: batch.processType,
            targetFlavorProfile: flavor,
            targetPh: batch.latestPh,
            fermentationHours,
            ambientTempMin: batch.ambientTemp,
            ambientTempMax: batch.ambientTemp,
            avgCuppingScore: score,
            batchCount: 1,
            notes: batch.notes ?? '',
            lastUpdated: new Date().toISOString(),
          }) as unknown as Recipe;
        }

        dispatch({ type: 'recipe/SAVE_SUCCESS', payload: { recipe } });
        notifySuccess('Recipe saved', `Recipe for ${variety} ${batch.processType} updated.`);
        return recipe;
      } catch {
        notifyError('Failed to save recipe');
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
