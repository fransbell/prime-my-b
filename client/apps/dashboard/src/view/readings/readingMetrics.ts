import type { BatchRecord } from '../../state/Model';

export const METRIC_PLACEHOLDERS = {
  ph: 5.8,
  temperature: 24.5,
  weight: 12.5,
  co2: 45,
} as const;

export type BatchReadingMetrics = {
  id?: string;
  ph?: number;
  temperature?: number;
  weight?: number;
  co2?: number;
};

export type MetricValues = {
  ph: number;
  temperature: number;
  weight: number;
  co2: number;
};

export function getMetricDefaults(
  batch: BatchRecord,
  latestReading?: BatchReadingMetrics,
): MetricValues {
  return {
    ph: latestReading?.ph ?? batch.latestPh ?? METRIC_PLACEHOLDERS.ph,
    temperature: latestReading?.temperature ?? batch.latestTemp ?? METRIC_PLACEHOLDERS.temperature,
    weight: latestReading?.weight ?? batch.latestWeight ?? METRIC_PLACEHOLDERS.weight,
    co2: latestReading?.co2 ?? batch.latestCo2 ?? METRIC_PLACEHOLDERS.co2,
  };
}

export function resolveMetric(value: string | number, fallback: number): number {
  if (value === '' || value == null) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
