// ─── LIFF App — Update (Pure Reducer) ────────────────────────

import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ── LIFF ──
    case 'liff/INIT_SUCCESS':
      return { ...state, liffInitialized: true };

    case 'liff/LOGIN_SUCCESS':
      return {
        ...state,
        liffLoggedIn: true,
        profile: action.payload.profile,
      };

    case 'liff/LOGOUT':
      return { ...state, liffLoggedIn: false, profile: null };

    // ── Sensor ──
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return { ...state, sensors: action.payload.sensors, loading: false };

    case 'sensor/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload.error };

    // ── Reading ──
    case 'reading/FETCH_SUCCESS':
      return { ...state, latestReadings: action.payload.readings };

    case 'reading/ADD_ONE':
      return {
        ...state,
        latestReadings: [action.payload.reading, ...state.latestReadings].slice(0, 50),
      };

    // ── Alert ──
    case 'alert/SET_UNREAD_COUNT':
      return { ...state, unreadAlerts: action.payload.count };

    // ── Navigation ──
    case 'nav/SET_PAGE':
      return { ...state, activePage: action.payload.page };

    // ── General UI ──
    case 'ui/CLEAR_ERROR':
      return { ...state, error: null };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
