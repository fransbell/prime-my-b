// ─── IoT Demo — Device & Metric Data ────────────────────────────
// Static catalog of IoT hardware devices and their measurable metrics
// for the coffee farming pitch demo.

// ─── Types ─────────────────────────────────────────────────────

export type MetricStatus = 'best' | 'good' | 'normal' | 'bad' | 'critical';

export interface MetricStatusLevel {
  status: MetricStatus;
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
  /** Demo status levels from best → critical */
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

// ─── Helper: Create status levels for a metric ────────────────

function makeStatusLevels(
  best: number,
  good: number,
  normal: number,
  bad: number,
  critical: number,
  unit: string,
): MetricStatusLevel[] {
  return [
    {
      status: 'best',
      label: 'Best',
      value: best,
      color: 'teal',
      description: `Optimal condition at ${best} ${unit} — ideal for coffee growth`,
      icon: '🌿',
    },
    {
      status: 'good',
      label: 'Good',
      value: good,
      color: 'green',
      description: `Good condition at ${good} ${unit} — within healthy range`,
      icon: '👍',
    },
    {
      status: 'normal',
      label: 'Normal',
      value: normal,
      color: 'blue',
      description: `Typical reading at ${normal} ${unit} — acceptable baseline`,
      icon: '📊',
    },
    {
      status: 'bad',
      label: 'Bad',
      value: bad,
      color: 'orange',
      description: `Attention needed at ${bad} ${unit} — outside optimal range`,
      icon: '⚠️',
    },
    {
      status: 'critical',
      label: 'Critical',
      value: critical,
      color: 'red',
      description: `Critical at ${critical} ${unit} — immediate action required`,
      icon: '🚨',
    },
  ];
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
        statusLevels: makeStatusLevels(45, 35, 28, 18, 10, '%'),
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
        statusLevels: makeStatusLevels(22, 25, 28, 33, 38, '°C'),
        normalRange: { min: 18, max: 28 },
      },
      {
        id: 'relative-humidity',
        name: 'Relative Humidity',
        parameter: 'Humidity',
        unit: '%',
        icon: 'IconDroplet',
        statusLevels: makeStatusLevels(70, 60, 50, 35, 25, '%'),
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
        statusLevels: makeStatusLevels(6.0, 5.8, 5.5, 4.8, 4.2, 'pH'),
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
        statusLevels: makeStatusLevels(800, 600, 400, 150, 50, 'μmol/m²/s'),
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
        statusLevels: makeStatusLevels(15, 8, 3, 0.5, 0, 'mm'),
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
        statusLevels: makeStatusLevels(50, 40, 30, 18, 8, 'mg/kg'),
        normalRange: { min: 25, max: 60 },
      },
      {
        id: 'phosphorus-level',
        name: 'Phosphorus (P)',
        parameter: 'Phosphorus',
        unit: 'mg/kg',
        icon: 'IconAtom',
        statusLevels: makeStatusLevels(35, 25, 18, 10, 4, 'mg/kg'),
        normalRange: { min: 15, max: 40 },
      },
      {
        id: 'potassium-level',
        name: 'Potassium (K)',
        parameter: 'Potassium',
        unit: 'mg/kg',
        icon: 'IconAtom',
        statusLevels: makeStatusLevels(180, 140, 100, 60, 30, 'mg/kg'),
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
