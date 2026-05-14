// ═══════════════════════════════════════════════════════════════
// Sensor Store — Elm Architecture + Zustand Redux Pattern
// ═══════════════════════════════════════════════════════════════
//
// Model  → SensorState (plain data, no methods)
// Action → SensorAction (discriminated union, every mutation is an action)
// Update → sensorReducer (pure function: state + action → new state)
// Store  → createSensorStore (Zustand with redux middleware)
//

import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// ─── Model (State) ────────────────────────────────────────────
export interface SensorState {
  // Data
  sensors: SensorRecord[];
  readings: SensorReading[];
  alerts: AlertRecord[];

  // UI
  loading: boolean;
  error: string | null;
  selectedSensorId: string | null;
  currentPage: number;
  totalRecords: number;
}

// Data types (aligned with PocketBase collections)
export interface SensorRecord {
  id: string;
  sensorId: string;
  type: SensorType;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastReading: string | null;
  created: string;
  updated: string;
}

export interface SensorReading {
  id: string;
  sensor: string;
  type: SensorType;
  value: number;
  unit: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AlertRecord {
  id: string;
  sensor: string;
  type: 'threshold_exceeded' | 'sensor_offline' | 'anomaly_detected';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  threshold?: number;
  currentValue?: number;
  resolved: boolean;
  resolvedAt?: string;
  created: string;
}

export type SensorType =
  | 'temperature'
  | 'humidity'
  | 'soil_moisture'
  | 'light'
  | 'ph'
  | 'rainfall'
  | 'wind'
  | 'npk';

// ─── Actions ──────────────────────────────────────────────────
export type SensorAction =
  // Sensor CRUD
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: SensorRecord[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } }
  | { type: 'sensor/SELECT'; payload: { sensorId: string } }
  | { type: 'sensor/DESELECT' }
  | { type: 'sensor/UPDATE_STATUS'; payload: { sensorId: string; status: SensorRecord['status'] } }

  // Reading operations
  | { type: 'reading/FETCH_START' }
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: SensorReading[]; total: number } }
  | { type: 'reading/FETCH_ERROR'; payload: { error: string } }
  | { type: 'reading/ADD_ONE'; payload: { reading: SensorReading } }
  | { type: 'reading/SET_PAGE'; payload: { page: number } }

  // Alert operations
  | { type: 'alert/FETCH_SUCCESS'; payload: { alerts: AlertRecord[] } }
  | { type: 'alert/RESOLVE'; payload: { alertId: string } }

  // UI
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };

// ─── Initial State ────────────────────────────────────────────
export const initialSensorState: SensorState = {
  sensors: [],
  readings: [],
  alerts: [],
  loading: false,
  error: null,
  selectedSensorId: null,
  currentPage: 1,
  totalRecords: 0,
};

// ─── Update (Pure Reducer) ────────────────────────────────────
// IMPORTANT: This is a PURE function. No side effects, no API calls.
export function sensorReducer(state: SensorState, action: SensorAction): SensorState {
  switch (action.type) {
    // ── Sensor ──
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return {
        ...state,
        sensors: action.payload.sensors,
        loading: false,
      };

    case 'sensor/FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'sensor/SELECT':
      return { ...state, selectedSensorId: action.payload.sensorId };

    case 'sensor/DESELECT':
      return { ...state, selectedSensorId: null };

    case 'sensor/UPDATE_STATUS':
      return {
        ...state,
        sensors: state.sensors.map((s) =>
          s.id === action.payload.sensorId
            ? { ...s, status: action.payload.status }
            : s
        ),
      };

    // ── Reading ──
    case 'reading/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'reading/FETCH_SUCCESS':
      return {
        ...state,
        readings: action.payload.readings,
        totalRecords: action.payload.total,
        loading: false,
      };

    case 'reading/FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'reading/ADD_ONE':
      return {
        ...state,
        readings: [action.payload.reading, ...state.readings],
        totalRecords: state.totalRecords + 1,
      };

    case 'reading/SET_PAGE':
      return { ...state, currentPage: action.payload.page };

    // ── Alert ──
    case 'alert/FETCH_SUCCESS':
      return { ...state, alerts: action.payload.alerts };

    case 'alert/RESOLVE':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload.alertId
            ? { ...a, resolved: true, resolvedAt: new Date().toISOString() }
            : a
        ),
      };

    // ── UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialSensorState;

    default:
      return state;
  }
}

// ─── Store Factory ─────────────────────────────────────────────
// Creates a Zustand store with redux middleware for dispatch pattern.
//
// Usage:
//   const useSensorStore = createSensorStore();
//   const state = useSensorStore((s) => s.sensors);
//   useSensorStore.dispatch({ type: 'sensor/FETCH_START' });
//
export function createSensorStore() {
  return create<SensorState>()(redux(sensorReducer, initialSensorState));
}

// Pre-created singleton store for convenience
export const useSensorStore = createSensorStore();
