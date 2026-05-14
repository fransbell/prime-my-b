// ─── IoT Demo App — Model (State) ────────────────────────────
// Elm Architecture: Model defines the entire application state shape.
// The flow is: Hardware List → Device Detail → Metric Activate (Demo)

import type { IoTDevice, MetricStatus, MetricStatusLevel } from '../data/devices';

// ─── Navigation / View Flow ──────────────────────────────────

export type ViewFlow = 'hardware-list' | 'device-detail' | 'metric-activate';

// ─── App State ───────────────────────────────────────────────

export interface AppState {
  // ── Navigation ──
  currentView: ViewFlow;

  // ── Hardware List ──
  devices: IoTDevice[];
  selectedDeviceId: string | null;

  // ── Device Detail / Metric Selection ──
  selectedMetricId: string | null;

  // ── Metric Activation (Demo) ──
  activeStatus: MetricStatus | null;
  activeStatusLevel: MetricStatusLevel | null;
  activationHistory: ActivationRecord[];

  // ── UI ──
  loading: boolean;
  error: string | null;
}

// ─── Activation Record ──────────────────────────────────────
// Tracks each manual demo activation for display

export interface ActivationRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  metricId: string;
  metricName: string;
  status: MetricStatus;
  value: number;
  unit: string;
  timestamp: string;
}

// ─── Initial State ──────────────────────────────────────────

export const initialAppState: AppState = {
  currentView: 'hardware-list',
  devices: [],
  selectedDeviceId: null,
  selectedMetricId: null,
  activeStatus: null,
  activeStatusLevel: null,
  activationHistory: [],
  loading: false,
  error: null,
};
