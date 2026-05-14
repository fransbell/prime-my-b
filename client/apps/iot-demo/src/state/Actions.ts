// ─── IoT Demo App — Actions ───────────────────────────────────

import type { SensorRecord, SensorReading, SensorType } from '@prime-my-brain/store';
import type { TabType, GeneratorState, SimulatorState } from './Model';

// ─── Sensor Actions ───
export type SensorAction =
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: SensorRecord[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } };

// ─── Reading Insert Actions ───
export type ReadingAction =
  | { type: 'reading/INSERT_START' }
  | { type: 'reading/INSERT_SUCCESS'; payload: { reading: SensorReading } }
  | { type: 'reading/INSERT_ERROR'; payload: { error: string } }
  | { type: 'reading/CLEAR_RECENT' };

// ─── Generator Actions ───
export type GeneratorAction =
  | { type: 'generator/SET_SENSOR'; payload: { sensorId: string } }
  | { type: 'generator/SET_INTERVAL'; payload: { intervalMs: number } }
  | { type: 'generator/SET_TYPES'; payload: { readingTypes: SensorType[] } }
  | { type: 'generator/SET_RANGE'; payload: { min: number; max: number } }
  | { type: 'generator/START' }
  | { type: 'generator/STOP' }
  | { type: 'generator/INCREMENT_COUNT' }
  | { type: 'generator/RESET_COUNT' };

// ─── Simulator Actions ───
export type SimulatorAction =
  | { type: 'simulator/START' }
  | { type: 'simulator/STOP' }
  | { type: 'simulator/SET_SENSOR_COUNT'; payload: { count: number } }
  | { type: 'simulator/SET_TYPES'; payload: { readingTypes: SensorType[] } }
  | { type: 'simulator/INCREMENT_TOTAL'; payload: { count: number } }
  | { type: 'simulator/RESET_TOTAL' };

// ─── UI Actions ───
export type UIAction =
  | { type: 'ui/SET_TAB'; payload: { tab: TabType } }
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };

// ─── Root Action Union ───
export type AppAction =
  | SensorAction
  | ReadingAction
  | GeneratorAction
  | SimulatorAction
  | UIAction;
