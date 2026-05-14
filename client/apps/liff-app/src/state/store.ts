// ─── LIFF App — Store ─────────────────────────────────────────

import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import type { AppAction } from './Actions';
import { update } from './Update';
import { initialAppState } from './Model';

export const useStore = create(redux(update, initialAppState));

export const dispatch = useStore.dispatch;
export type { AppAction };
