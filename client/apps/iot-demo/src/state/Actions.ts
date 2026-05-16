// ─── IoT Demo App — Actions ───────────────────────────────────
// Discriminated union actions following domain/VERB naming convention.
// All state transitions are triggered by dispatching these actions.

import type { IoTDevice, MetricStatus, MetricStatusLevel } from '../data/devices';
import type { ViewFlow, ActivationRecord } from './Model';
import type { MetricReading } from '../effects';

// ─── Device Actions ───
export type DeviceAction =
  | { type: 'device/LOAD_CATALOG'; payload: { devices: IoTDevice[] } }
  | { type: 'device/SELECT'; payload: { deviceId: string } }
  | { type: 'device/DESELECT' };

// ─── Metric Actions ───
export type MetricAction =
  | { type: 'metric/SELECT'; payload: { metricId: string } }
  | { type: 'metric/DESELECT' };

// ─── Reading Actions (PocketBase realtime) ───
export type ReadingAction =
  | { type: 'reading/FETCH_START' }
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: MetricReading[]; total: number } }
  | { type: 'reading/FETCH_ERROR'; payload: { error: string } }
  | { type: 'reading/ADD_REALTIME'; payload: { reading: MetricReading } }
  | { type: 'reading/CLEAR' };

// ─── Activation Actions (Demo) ───
export type ActivationAction =
  | { type: 'activation/SET_STATUS'; payload: { status: MetricStatus; statusLevel: MetricStatusLevel } }
  | { type: 'activation/CLEAR_STATUS' }
  | { type: 'activation/RECORD'; payload: { record: ActivationRecord } }
  | { type: 'activation/CLEAR_HISTORY' };

// ─── Navigation Actions ───
export type NavigationAction =
  | { type: 'nav/GOTO'; payload: { view: ViewFlow } }
  | { type: 'nav/BACK' };

// ─── UI Actions ───
export type UIAction =
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };

// ─── Root Action Union ───
export type AppAction =
  | DeviceAction
  | MetricAction
  | ReadingAction
  | ActivationAction
  | NavigationAction
  | UIAction;
