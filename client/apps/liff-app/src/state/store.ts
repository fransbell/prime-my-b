// ─── LIFF App — Store ─────────────────────────────────────────

import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { update } from './Update';
import { initialAppState } from './Model';

export const useStore = create<AppState>()(redux(update, initialAppState));

export const dispatch = useStore.dispatch;
export type { AppAction };
