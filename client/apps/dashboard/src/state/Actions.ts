// ─── Dashboard App — Actions ──────────────────────────────────
// Actions are discriminated union types. Every state mutation is an action.

import type { SensorRecord, SensorReading, AlertRecord } from '@prime-my-brain/store';
import type { TabType } from './Model';

// ─── Sensor Actions ───
export type SensorAction =
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: SensorRecord[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } }
  | { type: 'sensor/SELECT'; payload: { sensorId: string } }
  | { type: 'sensor/DESELECT' };

// ─── Reading Actions ───
export type ReadingAction =
  | { type: 'reading/FETCH_START' }
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: SensorReading[]; total: number } }
  | { type: 'reading/FETCH_ERROR'; payload: { error: string } }
  | { type: 'reading/ADD_ONE'; payload: { reading: SensorReading } }
  | { type: 'reading/SET_PAGE'; payload: { page: number } };

// ─── Alert Actions ───
export type AlertAction =
  | { type: 'alert/FETCH_SUCCESS'; payload: { alerts: AlertRecord[] } }
  | { type: 'alert/RESOLVE'; payload: { alertId: string } };

// ─── Dashboard UI Actions ───
export type DashboardAction =
  | { type: 'dashboard/SET_TAB'; payload: { tab: TabType } }
  | { type: 'dashboard/SET_DATE_RANGE'; payload: { start: string; end: string } }
  | { type: 'dashboard/CLEAR_DATE_RANGE' };

// ─── Root Action Union ───
export type AppAction =
  | SensorAction
  | ReadingAction
  | AlertAction
  | DashboardAction
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };
