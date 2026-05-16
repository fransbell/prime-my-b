// ─── IoT Demo — Device & Metric Data ────────────────────────────
// Static catalog of IoT hardware devices and their measurable metrics
// for the coffee farming pitch demo.

// ─── Types ─────────────────────────────────────────────────────

export type MetricStatus =
  | 'dead'
  | 'critical'
  | 'bad'
  | 'normal'
  | 'good'
  | 'great'
  | 'ideal';

export interface MetricStatusLevel {
  status: MetricStatus;
  /** Display label (Dead → Ideal) */
  label: string;
  /** Value to display in the demo */
  value: number;
  /** Mantine color token */
  color: string;
  /** Short description of what this status means */
  description: string;
  /** Emoji icon for quick visual */
  icon: string;
}

export interface DeviceMetric {
  id: string;
  /** Human-readable metric name */
  name: string;
  /** What parameter this metric measures */
  parameter: string;
  /** Unit of measurement */
  unit: string;
  /** Icon name from Mantine tabler icons */
  icon: string;
  /** Demo status levels from Dead → Ideal */
  statusLevels: MetricStatusLevel[];
  /** Typical normal range for reference */
  normalRange: { min: number; max: number };
}

export interface IoTDevice {
  id: string;
  /** Device model name */
  name: string;
  /** Short description for the hardware list card */
  description: string;
  /** Path to device image in /public */
  imageUrl: string;
  /** Device category */
  category: 'soil' | 'environment' | 'water' | 'light' | 'nutrient';
  /** List of metrics this device can measure */
  metrics: DeviceMetric[];
}

// ─── Metric scale order (worst → best) ─────────────────────────

export const METRIC_SCALE_ORDER: MetricStatus[] = [
  'dead',
  'critical',
  'bad',
  'normal',
  'good',
  'great',
  'ideal',
];

const SCALE_META: Record<
  MetricStatus,
  { label: string; color: string; icon: string; tone: string }
> = {
  dead: { label: 'Dead', color: 'dark', icon: '💀', tone: 'no measurable signal' },
  critical: { label: 'Critical', color: 'red', icon: '🚨', tone: 'immediate action required' },
  bad: { label: 'Bad', color: 'orange', icon: '⚠️', tone: 'outside healthy range' },
  normal: { label: 'Normal', color: 'blue', icon: '📊', tone: 'acceptable baseline' },
  good: { label: 'Good', color: 'green', icon: '👍', tone: 'within healthy range' },
  great: { label: 'Great', color: 'teal', icon: '✨', tone: 'strong condition' },
  ideal: { label: 'Ideal', color: 'cyan', icon: '🌿', tone: 'optimal for coffee growth' },
};

function makeStatusLevels(
  dead: number,
  critical: number,
  bad: number,
  normal: number,
  good: number,
  great: number,
  ideal: number,
  unit: string,
): MetricStatusLevel[] {
  const values: Record<MetricStatus, number> = {
    dead, critical, bad, normal, good, great, ideal,
  };

  return METRIC_SCALE_ORDER.map((status) => {
    const value = values[status];
    const meta = SCALE_META[status];
    return {
      status,
      label: meta.label,
      value,
      color: meta.color,
      description: `${meta.label} at ${value} ${unit} — ${meta.tone}`,
      icon: meta.icon,
    };
  });
}

/** Build 7 levels from legacy 5-value presets (ideal … critical). */
function makeLegacyStatusLevels(
  ideal: number,
  good: number,
  normal: number,
  bad: number,
  critical: number,
  unit: string,
): MetricStatusLevel[] {
  const towardIdeal = ideal >= good ? 1 : -1;
  const great = good + (ideal - good) * 0.5 * towardIdeal;
  const towardDead = critical <= bad ? -1 : 1;
  const deadStep = Math.abs(bad - critical) || Math.abs(normal - critical) * 0.5 || 1;
  const dead = Math.max(0, critical + deadStep * towardDead);

  return makeStatusLevels(dead, critical, bad, normal, good, great, ideal, unit);
}

// ─── Device Catalog ────────────────────────────────────────────

export const devices: IoTDevice[] = [
  {
    id: 'soil-moisture-sensor',
    name: 'Soil Moisture Sensor',
    description: 'Monitors soil water content to optimize irrigation scheduling and prevent over/under-watering of coffee plants.',
    imageUrl: '/device-soil-moisture.png',
    category: 'soil',
    metrics: [
      {
        id: 'soil-moisture-vwc',
        name: 'Volumetric Water Content',
        parameter: 'Soil Moisture',
        unit: '%',
        icon: 'IconDrop',
        statusLevels: makeLegacyStatusLevels(45, 35, 28, 18, 10, '%'),
        normalRange: { min: 25, max: 50 },
      },
    ],
  },
  {
    id: 'temp-humidity-sensor',
    name: 'Temperature & Humidity Sensor',
    description: 'Measures ambient temperature and relative humidity — critical for coffee cherry development and disease prevention.',
    imageUrl: '/device-temp-humidity.png',
    category: 'environment',
    metrics: [
      {
        id: 'ambient-temperature',
        name: 'Ambient Temperature',
        parameter: 'Temperature',
        unit: '°C',
        icon: 'IconTemperature',
        statusLevels: makeLegacyStatusLevels(22, 25, 28, 33, 38, '°C'),
        normalRange: { min: 18, max: 28 },
      },
      {
        id: 'relative-humidity',
        name: 'Relative Humidity',
        parameter: 'Humidity',
        unit: '%',
        icon: 'IconDroplet',
        statusLevels: makeLegacyStatusLevels(70, 60, 50, 35, 25, '%'),
        normalRange: { min: 50, max: 80 },
      },
    ],
  },
  {
    id: 'soil-ph-sensor',
    name: 'Soil pH Sensor',
    description: 'Measures soil acidity/alkalinity — coffee thrives in slightly acidic soil (pH 5.5–6.5), making pH monitoring essential.',
    imageUrl: '/device-ph.png',
    category: 'soil',
    metrics: [
      {
        id: 'soil-ph-level',
        name: 'Soil pH Level',
        parameter: 'pH',
        unit: 'pH',
        icon: 'IconFlask',
        statusLevels: makeLegacyStatusLevels(6.0, 5.8, 5.5, 4.8, 4.2, 'pH'),
        normalRange: { min: 5.0, max: 6.5 },
      },
    ],
  },
  {
    id: 'light-par-sensor',
    name: 'Light Sensor (PAR)',
    description: 'Measures Photosynthetically Active Radiation — the light spectrum that coffee plants actually use for growth and cherry production.',
    imageUrl: '/device-light-par.png',
    category: 'light',
    metrics: [
      {
        id: 'par-intensity',
        name: 'PAR Intensity',
        parameter: 'Light (PAR)',
        unit: 'μmol/m²/s',
        icon: 'IconSun',
        statusLevels: makeLegacyStatusLevels(800, 600, 400, 150, 50, 'μmol/m²/s'),
        normalRange: { min: 300, max: 900 },
      },
    ],
  },
  {
    id: 'rain-gauge',
    name: 'Rain Gauge',
    description: 'Measures daily rainfall to track water input and plan supplemental irrigation for coffee plantations.',
    imageUrl: '/device-rain-gauge.png',
    category: 'water',
    metrics: [
      {
        id: 'daily-rainfall',
        name: 'Daily Rainfall',
        parameter: 'Rainfall',
        unit: 'mm',
        icon: 'IconCloudRain',
        statusLevels: makeLegacyStatusLevels(15, 8, 3, 0.5, 0, 'mm'),
        normalRange: { min: 2, max: 20 },
      },
    ],
  },
  {
    id: 'npk-sensor',
    name: 'NPK Sensor',
    description: 'Measures Nitrogen, Phosphorus, and Potassium levels in soil — the three primary macronutrients essential for coffee plant health and yield.',
    imageUrl: '/device-npk.png',
    category: 'nutrient',
    metrics: [
      {
        id: 'nitrogen-level',
        name: 'Nitrogen (N)',
        parameter: 'Nitrogen',
        unit: 'mg/kg',
        icon: 'IconAtom',
        statusLevels: makeLegacyStatusLevels(50, 40, 30, 18, 8, 'mg/kg'),
        normalRange: { min: 25, max: 60 },
      },
      {
        id: 'phosphorus-level',
        name: 'Phosphorus (P)',
        parameter: 'Phosphorus',
        unit: 'mg/kg',
        icon: 'IconAtom',
        statusLevels: makeLegacyStatusLevels(35, 25, 18, 10, 4, 'mg/kg'),
        normalRange: { min: 15, max: 40 },
      },
      {
        id: 'potassium-level',
        name: 'Potassium (K)',
        parameter: 'Potassium',
        unit: 'mg/kg',
        icon: 'IconAtom',
        statusLevels: makeLegacyStatusLevels(180, 140, 100, 60, 30, 'mg/kg'),
        normalRange: { min: 80, max: 200 },
      },
    ],
  },
];

// ─── Category Labels ──────────────────────────────────────────

export const categoryLabels: Record<string, string> = {
  soil: 'Soil',
  environment: 'Environment',
  water: 'Water',
  light: 'Light',
  nutrient: 'Nutrient',
};

export const categoryColors: Record<string, string> = {
  soil: 'brown',
  environment: 'blue',
  water: 'cyan',
  light: 'yellow',
  nutrient: 'green',
};

/** All 7 scale levels for a metric in display order (Dead → Ideal). */
export function getMetricScaleLevels(metric: DeviceMetric): MetricStatusLevel[] {
  return METRIC_SCALE_ORDER.map((status) => {
    const level = metric.statusLevels.find((s) => s.status === status);
    if (!level) throw new Error(`Metric ${metric.id} is missing scale level: ${status}`);
    return level;
  });
}

export function getStatusLabel(metric: DeviceMetric, status: string): string {
  return metric.statusLevels.find((s) => s.status === status)?.label ?? status;
}

/** Chart / badge hex colors keyed by scale status */
export const METRIC_STATUS_COLORS: Record<MetricStatus, string> = {
  dead: '#25262b',
  critical: '#fa5252',
  bad: '#fd7e14',
  normal: '#339af0',
  good: '#40c057',
  great: '#12b886',
  ideal: '#15aabf',
};
