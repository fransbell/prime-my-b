// ─── LIFF App — Actions ───────────────────────────────────────

import type { SensorRecord, SensorReading } from '@prime-my-brain/store';
import type { LiffProfile, PageType } from './Model';

// ─── LIFF Actions ───
export type LiffAction =
  | { type: 'liff/INIT_SUCCESS' }
  | { type: 'liff/LOGIN_SUCCESS'; payload: { profile: LiffProfile } }
  | { type: 'liff/LOGOUT' };

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
  | LiffAction
  | SensorAction
  | ReadingAction
  | AlertAction
  | NavAction
  | { type: 'ui/CLEAR_ERROR' }
  | { type: 'ui/RESET' };
