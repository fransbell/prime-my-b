import { z } from 'zod';

export const sensorSchema = z.object({
  id: z.string().optional(),
  sensorId: z.string().min(1, 'Sensor ID is required'),
  type: z.enum([
    'temperature',
    'humidity',
    'soil_moisture',
    'light',
    'ph',
    'rainfall',
    'wind',
    'npk',
  ]),
  value: z.number(),
  unit: z.string().min(1, 'Unit is required'),
  timestamp: z.string(),
  location: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type Sensor = z.infer<typeof sensorSchema>;

export const sensorReadingSchema = z.object({
  id: z.string().optional(),
  sensor: z.string().min(1, 'Sensor reference is required'),
  type: z.enum([
    'temperature',
    'humidity',
    'soil_moisture',
    'light',
    'ph',
    'rainfall',
    'wind',
    'npk',
  ]),
  value: z.number(),
  unit: z.string(),
  timestamp: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export type SensorReading = z.infer<typeof sensorReadingSchema>;

export const alertSchema = z.object({
  id: z.string().optional(),
  sensor: z.string(),
  type: z.enum(['threshold_exceeded', 'sensor_offline', 'anomaly_detected']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  message: z.string(),
  threshold: z.number().optional(),
  currentValue: z.number().optional(),
  resolved: z.boolean().default(false),
});

export type Alert = z.infer<typeof alertSchema>;

export const farmSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Farm name is required'),
  location: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  elevation: z.number().optional(),
  area: z.number().positive().optional(),
  coffeeVariety: z.string().optional(),
});

export type Farm = z.infer<typeof farmSchema>;
