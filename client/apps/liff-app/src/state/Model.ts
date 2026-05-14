// ─── LIFF App — Model (State) ────────────────────────────────
import type { SensorRecord, SensorReading } from '@prime-my-brain/store';

export interface AppState {
  // Auth — LINE Login → PocketBase Auth
  liffInitialized: boolean;
  liffLoggedIn: boolean;
  pbAuthenticated: boolean;
  profile: LiffProfile | null;
  pbToken: string | null;

  // Data
  sensors: SensorRecord[];
  latestReadings: SensorReading[];
  unreadAlerts: number;

  // UI
  loading: boolean;
  error: string | null;
  activePage: PageType;
}

export type PageType = 'home' | 'sensors' | 'alerts' | 'profile';

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export const initialAppState: AppState = {
  liffInitialized: false,
  liffLoggedIn: false,
  pbAuthenticated: false,
  profile: null,
  pbToken: null,
  sensors: [],
  latestReadings: [],
  unreadAlerts: 0,
  loading: false,
  error: null,
  activePage: 'home',
};
