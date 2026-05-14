// ─── IoT Demo App — Store ─────────────────────────────────────
// Zustand store using redux middleware (dispatch-only pattern).
// set() is FORBIDDEN — all state changes go through dispatch → update reducer.

import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import type { AppAction } from './Actions';
import { update } from './Update';
import { initialAppState } from './Model';

export const useStore = create(redux(update, initialAppState));

export const dispatch = useStore.dispatch;
export type { AppAction };
