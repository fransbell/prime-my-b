// ─── IoT Demo App — Model (State) ────────────────────────────
import type { SensorRecord, SensorReading, SensorType } from '@prime-my-brain/store';

export interface AppState {
  // Available sensors for data insertion
  sensors: SensorRecord[];

  // Recently inserted readings (local echo)
  recentReadings: SensorReading[];

  // Batch generator state
  generator: GeneratorState;

  // Simulator state
  simulator: SimulatorState;

  // UI
  loading: boolean;
  error: string | null;
  activeTab: TabType;
  successCount: number;
  failCount: number;
}

export type TabType = 'entry' | 'batch' | 'simulator' | 'status';

export interface GeneratorState {
  sensorId: string;
  intervalMs: number;
  readingTypes: SensorType[];
  valueRange: { min: number; max: number };
  isRunning: boolean;
  generatedCount: number;
}

export interface SimulatorState {
  isRunning: boolean;
  sensorCount: number;
  readingTypes: SensorType[];
  totalGenerated: number;
}

export const initialAppState: AppState = {
  sensors: [],
  recentReadings: [],
  generator: {
    sensorId: '',
    intervalMs: 1000,
    readingTypes: ['temperature'],
    valueRange: { min: 0, max: 50 },
    isRunning: false,
    generatedCount: 0,
  },
  simulator: {
    isRunning: false,
    sensorCount: 5,
    readingTypes: ['temperature', 'humidity', 'soil_moisture'],
    totalGenerated: 0,
  },
  loading: false,
  error: null,
  activeTab: 'entry',
  successCount: 0,
  failCount: 0,
};
