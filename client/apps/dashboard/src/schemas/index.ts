// ─── Dashboard App — Local Zod Schemas ────────────────────────
// Domain-specific schemas that extend shared schemas from @prime-my-brain/schemas

export { sensorSchema, sensorReadingSchema, alertSchema, farmSchema } from '@prime-my-brain/schemas';
export type { Sensor, SensorReading, Alert, Farm } from '@prime-my-brain/schemas';

// Dashboard-specific schemas
import { z } from 'zod';

export const dateRangeSchema = z.object({
  start: z.string(),
  end: z.string(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;
