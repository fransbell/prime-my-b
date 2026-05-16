// ─── IoT device catalog for dashboard sensor demo ─────────────
// Mirrors iot-demo hardware; maps each device to a batch reading field.

import type { BatchMetricKey, IotScale } from '../readings/readingMetrics';
import { getScaleValue } from '../readings/readingMetrics';
import { iotDeviceImages } from './iotDeviceImages';

export interface DemoIotDevice {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  /** Primary sensor / metric label shown on the card */
  metricLabel: string;
  category: string;
  /** Batch form field this device drives in the demo */
  batchKey: BatchMetricKey;
}

export const demoIotDevices: DemoIotDevice[] = [
  {
    id: 'soil-moisture-sensor',
    name: 'Soil Moisture Sensor',
    description: 'Volumetric water content — irrigation scheduling',
    imageUrl: iotDeviceImages['soil-moisture-sensor'],
    metricLabel: 'Soil moisture',
    category: 'Soil',
    batchKey: 'weight',
  },
  {
    id: 'temp-humidity-sensor',
    name: 'Temperature & Humidity',
    description: 'Ambient temperature for fermentation monitoring',
    imageUrl: iotDeviceImages['temp-humidity-sensor'],
    metricLabel: 'Temperature',
    category: 'Environment',
    batchKey: 'temperature',
  },
  {
    id: 'soil-ph-sensor',
    name: 'Soil pH Sensor',
    description: 'Acidity level — maps to batch pH in this demo',
    imageUrl: iotDeviceImages['soil-ph-sensor'],
    metricLabel: 'pH',
    category: 'Soil',
    batchKey: 'ph',
  },
  {
    id: 'light-par-sensor',
    name: 'Light Sensor (PAR)',
    description: 'Photosynthetically active radiation',
    imageUrl: iotDeviceImages['light-par-sensor'],
    metricLabel: 'Light (PAR)',
    category: 'Light',
    batchKey: 'co2',
  },
  {
    id: 'rain-gauge',
    name: 'Rain Gauge',
    description: 'Daily rainfall input tracking',
    imageUrl: iotDeviceImages['rain-gauge'],
    metricLabel: 'Rainfall',
    category: 'Water',
    batchKey: 'co2',
  },
  {
    id: 'npk-sensor',
    name: 'NPK Sensor',
    description: 'Soil macronutrients N, P, K',
    imageUrl: iotDeviceImages['npk-sensor'],
    metricLabel: 'NPK',
    category: 'Nutrient',
    batchKey: 'weight',
  },
];

export function getDeviceScaleValue(device: DemoIotDevice, scale: IotScale): number {
  return getScaleValue(device.batchKey, scale);
}
