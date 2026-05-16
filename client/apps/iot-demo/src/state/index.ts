// ─── IoT Demo App — State Re-exports ──────────────────────────

export type { AppState, ViewFlow, ActivationRecord } from './Model';
export { initialAppState } from './Model';
export type { AppAction, DeviceAction, MetricAction, ReadingAction, ActivationAction, NavigationAction, UIAction } from './Actions';
export { update } from './Update';
export { useStore, dispatch } from './store';
