// @prime-my-brain/store
// Shared Zustand stores using Elm Architecture + Redux dispatch pattern
//
// Pattern:
//   Model (state interface) → Actions (discriminated union) → Update (pure reducer) → Store
//   View components read state and dispatch actions
//   Side effects live in app-level effects/ directory

export { createSensorStore } from './sensorStore';
export { createAuthStore } from './authStore';
export type { SensorState, SensorAction } from './sensorStore';
export type { AuthState, AuthAction } from './authStore';
