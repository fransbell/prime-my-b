// ─── Mock RAG — Recipe Retrieval & Grounded Reference Generator ─
// "Retrieve → Augment → Generate" without embeddings or an LLM.
//
//   Corpus    : saved recipes (knowledge base) + completed batches (evidence)
//   Retriever : deterministic structured scoring (mock of vector cosine)
//   Generator : template string with inline citations (mock of an LLM)
//
// Swap points to go "real RAG" later (the RetrievedReference shape stays
// stable, so none of the UI changes):
//   • scoreRecipeMatch          → embedding cosine over recipe.notes + cupping text
//   • buildRetrievedReference()  summary → Claude API call w/ retrieved context
//
// Pure module: no PocketBase, no React, no randomness → demo-stable + testable.

import type { Recipe, BatchRecord, ProcessType, RetrievedReference } from '../state/Model';

export interface RetrievalQuery {
  variety: string;
  processType: ProcessType;
  flavorProfile?: string;
  ambientTemp?: number;
}

// ─── Lexical similarity helpers ───────────────────────────────

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

// Token-overlap ratio (0..1) — the "mock" stand-in for semantic similarity.
function flavorOverlap(a?: string, b?: string): number {
  const ta = new Set(tokenize(a ?? ''));
  const tb = new Set(tokenize(b ?? ''));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / Math.max(ta.size, tb.size);
}

// ─── Retriever: score corpus items against the query ──────────

// Recipe relevance, 0–100. Variety 40 · process 30 · flavor 20 · ambient 10.
export function scoreRecipeMatch(q: RetrievalQuery, r: Recipe): number {
  let score = 0;

  const qv = q.variety.trim().toLowerCase();
  const rv = (r.variety ?? '').trim().toLowerCase();
  if (qv && rv) {
    if (qv === rv) score += 40;
    else if (qv.includes(rv) || rv.includes(qv)) score += 20;
  }

  if (r.processType === q.processType) score += 30;

  score += flavorOverlap(q.flavorProfile, r.targetFlavorProfile) * 20;

  if (q.ambientTemp != null && r.ambientTempMin != null && r.ambientTempMax != null) {
    if (q.ambientTemp >= r.ambientTempMin - 1 && q.ambientTemp <= r.ambientTempMax + 1) {
      score += 10;
    } else {
      const dist = Math.min(
        Math.abs(q.ambientTemp - r.ambientTempMin),
        Math.abs(q.ambientTemp - r.ambientTempMax),
      );
      score += Math.max(0, 10 - dist * 3);
    }
  }

  return Math.round(Math.min(100, score));
}

// Completed-batch relevance (evidence), 0–100. Variety 50 · process 30 · flavor 20.
// No pH/duration terms — the query is pre-fermentation so those are unknown.
export function scoreBatchMatch(q: RetrievalQuery, b: BatchRecord): number {
  let score = 0;

  const qv = q.variety.trim().toLowerCase();
  const bv = (b.coffeeVariety ?? '').trim().toLowerCase();
  if (qv && bv) {
    if (qv === bv) score += 50;
    else if (qv.includes(bv) || bv.includes(qv)) score += 25;
  }

  if (b.processType === q.processType) score += 30;

  score += flavorOverlap(q.flavorProfile, b.targetFlavorProfile) * 20;

  return Math.round(Math.min(100, score));
}

// Confidence from how many batches a recipe has generalized over.
export function referenceConfidence(r: Recipe): 'low' | 'medium' | 'high' {
  const n = r.batchCount ?? 1;
  if (n >= 4) return 'high';
  if (n >= 2) return 'medium';
  return 'low';
}

// ─── Generator: template summary with inline citations ────────

function buildSummary(
  q: RetrievalQuery,
  recipe: Recipe | undefined,
  recipeScore: number | undefined,
  evidenceCount: number,
  confidence: 'low' | 'medium' | 'high',
): string {
  if (!recipe) {
    return (
      `No saved recipe matches ${q.variety || 'this profile'} · ${q.processType} yet. ` +
      `Grounded on ${evidenceCount} similar completed batch${evidenceCount > 1 ? 'es' : ''} — ` +
      `outcomes not yet generalized into a recipe. Confidence: ${confidence}.`
    );
  }

  const parts: string[] = [];
  parts.push(
    `Retrieved recipe "${recipe.variety} · ${recipe.processType}"` +
      (recipe.batchCount ? ` learned from ${recipe.batchCount} batch${recipe.batchCount > 1 ? 'es' : ''}` : '') +
      (recipe.avgCuppingScore != null ? ` (avg cupping ${recipe.avgCuppingScore.toFixed(1)})` : '') +
      ` — ${recipeScore ?? 0}% match.`,
  );

  const targets: string[] = [];
  if (recipe.targetPh != null) targets.push(`target pH ${recipe.targetPh.toFixed(2)}`);
  if (recipe.fermentationHours != null) targets.push(`ferment ~${recipe.fermentationHours}h`);
  if (recipe.ambientTempMin != null && recipe.ambientTempMax != null) {
    targets.push(`ambient ${recipe.ambientTempMin.toFixed(0)}–${recipe.ambientTempMax.toFixed(0)}°C`);
  }
  if (targets.length) parts.push(`Suggested: ${targets.join(', ')}.`);

  if (evidenceCount > 0) {
    parts.push(`Backed by ${evidenceCount} similar batch${evidenceCount > 1 ? 'es' : ''}.`);
  }
  parts.push(`Confidence: ${confidence}.`);

  return parts.join(' ');
}

// ─── Orchestrator: retrieve → augment → generate ──────────────

export function buildRetrievedReference(
  q: RetrievalQuery,
  recipes: Recipe[],
  completedBatches: BatchRecord[],
): RetrievedReference | null {
  if (!q.variety && !q.flavorProfile) return null;

  const rankedRecipes = recipes
    .map(r => ({ r, score: scoreRecipeMatch(q, r) }))
    .filter(x => x.score >= 30)
    .sort((a, b) => b.score - a.score);

  const rankedBatches = completedBatches
    .map(b => ({ b, score: scoreBatchMatch(q, b) }))
    .filter(x => x.score >= 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (rankedRecipes.length === 0 && rankedBatches.length === 0) return null;

  const top = rankedRecipes[0]?.r;
  const topScore = rankedRecipes[0]?.score;

  const citations: RetrievedReference['citations'] = [];
  if (top) {
    citations.push({
      kind: 'recipe',
      id: top.id,
      label:
        `${top.variety} · ${top.processType}` +
        (top.batchCount ? ` · ${top.batchCount} batch${top.batchCount > 1 ? 'es' : ''}` : ''),
      score: topScore ?? 0,
    });
  }
  for (const { b, score } of rankedBatches) {
    citations.push({
      kind: 'batch',
      id: b.id,
      label: b.name + (b.actualCuppingScore != null ? ` · ${b.actualCuppingScore.toFixed(1)}` : ''),
      score,
    });
  }

  const suggestedParams: RetrievedReference['suggestedParams'] = top
    ? {
        targetPh: top.targetPh,
        fermentationHours: top.fermentationHours,
        ambientTempMin: top.ambientTempMin,
        ambientTempMax: top.ambientTempMax,
      }
    : {};

  const confidence: 'low' | 'medium' | 'high' = top
    ? referenceConfidence(top)
    : rankedBatches.length >= 2
    ? 'medium'
    : 'low';

  const summary = buildSummary(q, top, topScore, rankedBatches.length, confidence);

  return {
    recipeId: top?.id,
    query: { variety: q.variety, processType: q.processType, flavorProfile: q.flavorProfile },
    summary,
    suggestedParams,
    citations,
    confidence,
  };
}
