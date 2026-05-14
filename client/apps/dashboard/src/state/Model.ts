// ─── Dashboard App — Model (State) ────────────────────────────
// The Model defines the complete state shape of the Dashboard app.
// All state is a plain object — no classes, no methods, no non-serializable values.

import type { SensorRecord, SensorReading, AlertRecord } from '@prime-my-brain/store';

export interface AppState {
  // Data
  sensors: SensorRecord[];
  readings: SensorReading[];
  alerts: AlertRecord[];

  // Dashboard-specific UI
  activeTab: TabType;
  selectedSensorId: string | null;
  dateRange: { start: string; end: string } | null;

  // Loading & errors
  loading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalRecords: number;
}

export type TabType = 'overview' | 'sensors' | 'analytics' | 'alerts' | 'settings';

export const initialAppState: AppState = {
  sensors: [],
  readings: [],
  alerts: [],
  activeTab: 'overview',
  selectedSensorId: null,
  dateRange: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalRecords: 0,
};
