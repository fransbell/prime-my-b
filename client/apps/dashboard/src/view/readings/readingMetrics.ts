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

// ─── IoT metric scale (Dead → Ideal, matches iot-demo app) ────

export type BatchMetricKey = keyof MetricValues;

export type IotScale =
  | 'dead'
  | 'critical'
  | 'bad'
  | 'normal'
  | 'good'
  | 'great'
  | 'ideal';

export const IOT_SCALE_ORDER: IotScale[] = [
  'dead',
  'critical',
  'bad',
  'normal',
  'good',
  'great',
  'ideal',
];

export const IOT_SCALE_META: Record<IotScale, { label: string; color: string }> = {
  dead: { label: 'Dead', color: 'dark' },
  critical: { label: 'Critical', color: 'red' },
  bad: { label: 'Bad', color: 'orange' },
  normal: { label: 'Normal', color: 'blue' },
  good: { label: 'Good', color: 'green' },
  great: { label: 'Great', color: 'teal' },
  ideal: { label: 'Ideal', color: 'cyan' },
};

/** Demo preset values per batch field for each scale step */
export const IOT_SCALE_PRESETS: Record<BatchMetricKey, Record<IotScale, number>> = {
  ph: {
    dead: 4.0,
    critical: 4.3,
    bad: 4.6,
    normal: 5.2,
    good: 5.8,
    great: 6.0,
    ideal: 6.2,
  },
  temperature: {
    dead: 42,
    critical: 38,
    bad: 33,
    normal: 28,
    good: 24.5,
    great: 23,
    ideal: 22,
  },
  weight: {
    dead: 4,
    critical: 6,
    bad: 8,
    normal: 10.5,
    good: 12.5,
    great: 14,
    ideal: 15,
  },
  co2: {
    dead: 95,
    critical: 85,
    bad: 78,
    normal: 60,
    good: 42,
    great: 35,
    ideal: 28,
  },
};

export type MetricScales = Record<BatchMetricKey, IotScale>;

export const defaultMetricScales = (): MetricScales => ({
  ph: 'normal',
  temperature: 'normal',
  weight: 'normal',
  co2: 'normal',
});

export function valuesFromScales(scales: MetricScales): MetricValues {
  return {
    ph: IOT_SCALE_PRESETS.ph[scales.ph],
    temperature: IOT_SCALE_PRESETS.temperature[scales.temperature],
    weight: IOT_SCALE_PRESETS.weight[scales.weight],
    co2: IOT_SCALE_PRESETS.co2[scales.co2],
  };
}

export function getScaleValue(key: BatchMetricKey, scale: IotScale): number {
  return IOT_SCALE_PRESETS[key][scale];
}
