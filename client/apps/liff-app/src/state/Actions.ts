// ─── LIFF App — Actions ───────────────────────────────────────

import type { SensorRecord, SensorReading } from '@prime-my-brain/store';
import type { LiffProfile, PageType } from './Model';

// ─── LINE + PocketBase Auth Actions ───
export type AuthAction =
  | { type: 'auth/LIFF_INIT_SUCCESS' }
  | { type: 'auth/LIFF_INIT_ERROR'; payload: { error: string } }
  | { type: 'auth/LIFF_LOGIN_START' }
  | { type: 'auth/LIFF_LOGIN_SUCCESS'; payload: { profile: LiffProfile } }
  | { type: 'auth/LIFF_LOGIN_ERROR'; payload: { error: string } }
  | { type: 'auth/PB_AUTH_START' }
  | { type: 'auth/PB_AUTH_SUCCESS'; payload: { token: string; user: PBUser } }
  | { type: 'auth/PB_AUTH_ERROR'; payload: { error: string } }
  | { type: 'auth/LOGOUT' };

export interface PBUser {
  id: string;
  name: string;
  email: string;
  lineUserId: string;
  role: string;
}

// ─── Sensor Actions ───
export type SensorAction =
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: SensorRecord[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } };

// ─── Reading Actions ───
export type ReadingAction =
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: SensorReading[] } }
  | { type: 'reading/ADD_ONE'; payload: { reading: SensorReading } };

// ─── Alert Actions ───
export type AlertAction =
  | { type: 'alert/SET_UNREAD_COUNT'; payload: { count: number } };

// ─── Navigation Actions ───
export type NavAction =
  | { type: 'nav/SET_PAGE'; payload: { page: PageType } };

// ─── Root Action Union ───
export type AppAction =
  | AuthAction
  | SensorAction
  | ReadingAction
  | AlertAction
  | NavAction
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };
