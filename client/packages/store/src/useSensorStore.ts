import { create } from 'zustand';

interface SensorReading {
  id: string;
  sensor: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface SensorState {
  sensors: unknown[];
  readings: SensorReading[];
  loading: boolean;
  error: string | null;
  setSensors: (sensors: unknown[]) => void;
  setReadings: (readings: SensorReading[]) => void;
  addReading: (reading: SensorReading) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  sensors: [],
  readings: [],
  loading: false,
  error: null,
};

export const useSensorStore = create<SensorState>((set) => ({
  ...initialState,
  setSensors: (sensors) => set({ sensors }),
  setReadings: (readings) => set({ readings }),
  addReading: (reading) =>
    set((state) => ({ readings: [reading, ...state.readings] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
