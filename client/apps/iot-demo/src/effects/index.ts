// ─── IoT Demo App — Effects (Side Effects) ────────────────────

import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';
import type { SensorType } from '@prime-my-brain/store';

// Generate a random value within a range for a given sensor type
function generateValue(type: SensorType, min: number, max: number): number {
  const ranges: Record<string, { min: number; max: number; unit: string }> = {
    temperature: { min: 15, max: 40, unit: 'celsius' },
    humidity: { min: 30, max: 95, unit: 'percent' },
    soil_moisture: { min: 20, max: 80, unit: 'percent' },
    light: { min: 0, max: 100000, unit: 'lux' },
    ph: { min: 3, max: 9, unit: 'ph' },
    rainfall: { min: 0, max: 50, unit: 'mm' },
    wind: { min: 0, max: 30, unit: 'm/s' },
    npk: { min: 0, max: 100, unit: 'mg/kg' },
  };

  const range = ranges[type] || { min, max, unit: 'unknown' };
  const value = range.min + Math.random() * (range.max - range.min);
  return Math.round(value * 100) / 100;
}

function getUnit(type: SensorType): string {
  const units: Record<string, string> = {
    temperature: 'celsius',
    humidity: 'percent',
    soil_moisture: 'percent',
    light: 'lux',
    ph: 'ph',
    rainfall: 'mm',
    wind: 'm/s',
    npk: 'mg/kg',
  };
  return units[type] || 'unknown';
}

export function createEffects(dispatch: (action: AppAction) => void) {
  let generatorTimer: ReturnType<typeof setInterval> | null = null;
  let simulatorTimer: ReturnType<typeof setInterval> | null = null;

  return {
    // ── Sensor Effects ──
    fetchSensors: async () => {
      dispatch({ type: 'sensor/FETCH_START' });
      try {
        const sensors = await pb.collection('sensors').getFullList({ sort: '-created' });
        dispatch({ type: 'sensor/FETCH_SUCCESS', payload: { sensors: sensors as any } });
      } catch (error) {
        dispatch({ type: 'sensor/FETCH_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Single Reading Insert ──
    insertReading: async (sensor: string, type: SensorType, value: number) => {
      dispatch({ type: 'reading/INSERT_START' });
      try {
        const reading = await pb.collection('sensor_readings').create({
          sensor,
          type,
          value,
          unit: getUnit(type),
          timestamp: new Date().toISOString(),
        });
        dispatch({ type: 'reading/INSERT_SUCCESS', payload: { reading: reading as any } });
      } catch (error) {
        dispatch({ type: 'reading/INSERT_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Batch Insert ──
    batchInsert: async (sensor: string, readings: Array<{ type: SensorType; value: number }>) => {
      dispatch({ type: 'reading/INSERT_START' });
      try {
        for (const r of readings) {
          await pb.collection('sensor_readings').create({
            sensor,
            type: r.type,
            value: r.value,
            unit: getUnit(r.type),
            timestamp: new Date().toISOString(),
          });
        }
        dispatch({ type: 'reading/INSERT_SUCCESS', payload: { reading: {} as any } });
      } catch (error) {
        dispatch({ type: 'reading/INSERT_ERROR', payload: { error: (error as Error).message } });
      }
    },

    // ── Generator (continuous data generation) ──
    startGenerator: (sensorId: string, intervalMs: number, types: SensorType[], min: number, max: number) => {
      if (generatorTimer) clearInterval(generatorTimer);

      dispatch({ type: 'generator/START' });

      generatorTimer = setInterval(() => {
        const type = types[Math.floor(Math.random() * types.length)];
        const value = generateValue(type, min, max);
        const unit = getUnit(type);

        pb.collection('sensor_readings').create({
          sensor: sensorId,
          type,
          value,
          unit,
          timestamp: new Date().toISOString(),
        }).then((record) => {
          dispatch({ type: 'reading/INSERT_SUCCESS', payload: { reading: record as any } });
          dispatch({ type: 'generator/INCREMENT_COUNT' });
        }).catch((error) => {
          dispatch({ type: 'reading/INSERT_ERROR', payload: { error: error.message } });
        });
      }, intervalMs);
    },

    stopGenerator: () => {
      if (generatorTimer) {
        clearInterval(generatorTimer);
        generatorTimer = null;
      }
      dispatch({ type: 'generator/STOP' });
    },

    // ── Simulator (multi-sensor simulation) ──
    startSimulator: (sensorCount: number, types: SensorType[]) => {
      if (simulatorTimer) clearInterval(simulatorTimer);

      dispatch({ type: 'simulator/START' });

      simulatorTimer = setInterval(() => {
        for (let i = 0; i < sensorCount; i++) {
          const sensorId = `SIM_SENSOR_${String(i + 1).padStart(3, '0')}`;
          const type = types[Math.floor(Math.random() * types.length)];
          const value = generateValue(type, 0, 100);
          const unit = getUnit(type);

          pb.collection('sensor_readings').create({
            sensor: sensorId,
            type,
            value,
            unit,
            timestamp: new Date().toISOString(),
          }).catch(() => {
            // Silent fail for simulator
          });
        }
        dispatch({ type: 'simulator/INCREMENT_TOTAL', payload: { count: sensorCount * types.length } });
      }, 2000);
    },

    stopSimulator: () => {
      if (simulatorTimer) {
        clearInterval(simulatorTimer);
        simulatorTimer = null;
      }
      dispatch({ type: 'simulator/STOP' });
    },

    // ── Cleanup ──
    cleanup: () => {
      if (generatorTimer) clearInterval(generatorTimer);
      if (simulatorTimer) clearInterval(simulatorTimer);
    },
  };
}

export type Effects = ReturnType<typeof createEffects>;
