// @prime-my-brain/schemas
// Shared Zod validation schemas for all apps

import { z } from 'zod';

// Sensor schemas
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
  name: z.string().min(1, 'Name is required'),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

export type Sensor = z.infer<typeof sensorSchema>;

// Sensor reading schemas
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
  unit: z.string().min(1, 'Unit is required'),
  timestamp: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export type SensorReading = z.infer<typeof sensorReadingSchema>;

// Alert schemas
export const alertSchema = z.object({
  id: z.string().optional(),
  sensor: z.string(),
  type: z.enum(['threshold_exceeded', 'sensor_offline', 'anomaly_detected']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  message: z.string().min(1, 'Message is required'),
  threshold: z.number().optional(),
  currentValue: z.number().optional(),
  resolved: z.boolean().default(false),
  resolvedAt: z.string().optional(),
});

export type Alert = z.infer<typeof alertSchema>;

// Farm schemas
export const farmSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Farm name is required'),
  owner: z.string().optional(),
  location: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  elevation: z.number().optional(),
  area: z.number().positive().optional(),
  coffeeVariety: z.string().optional(),
});

export type Farm = z.infer<typeof farmSchema>;

// User schemas
export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  lineUserId: z.string().optional(),
  role: z.enum(['admin', 'farmer', 'viewer']).default('viewer'),
  farm: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
