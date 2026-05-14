// ─── Dashboard App — Store ─────────────────────────────────────
// Zustand store using redux middleware (Elm Architecture dispatch pattern)

import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import type { AppAction } from './Actions';
import { update } from './Update';
import { initialAppState } from './Model';

export const useStore = create(redux(update, initialAppState));

// Typed dispatch for convenience
export const dispatch = useStore.dispatch;
export type { AppAction };
