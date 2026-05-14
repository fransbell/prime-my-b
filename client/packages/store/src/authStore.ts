// ═══════════════════════════════════════════════════════════════
// Auth Store — Elm Architecture + Zustand Redux Pattern
// ═══════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// ─── Model (State) ────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'farmer' | 'viewer';
  lineUserId?: string;
  farm?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ─── Actions ──────────────────────────────────────────────────
export type AuthAction =
  | { type: 'auth/LOGIN_START' }
  | { type: 'auth/LOGIN_SUCCESS'; payload: { user: AuthUser; token: string } }
  | { type: 'auth/LOGIN_ERROR'; payload: { error: string } }
  | { type: 'auth/LOGOUT' }
  | { type: 'auth/UPDATE_USER'; payload: { user: Partial<AuthUser> } }
  | { type: 'auth/CLEAR_ERROR' };

// ─── Initial State ────────────────────────────────────────────
export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ─── Update (Pure Reducer) ────────────────────────────────────
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'auth/LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'auth/LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case 'auth/LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'auth/LOGOUT':
      return initialAuthState;

    case 'auth/UPDATE_USER':
      return {
        ...state,
        user: state.user
          ? { ...state.user, ...action.payload.user }
          : null,
      };

    case 'auth/CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

// ─── Store Factory ─────────────────────────────────────────────
export function createAuthStore() {
  return create<AuthState>()(redux(authReducer, initialAuthState));
}

// Pre-created singleton store
export const useAuthStore = createAuthStore();
