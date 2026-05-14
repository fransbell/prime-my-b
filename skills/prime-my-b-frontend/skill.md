# Prime My Brain - Frontend Skill

## Purpose
This skill enforces frontend development standards for all web apps in the Prime My Brain monorepo, using Elm Architecture with Zustand Redux pattern.

## Tech Stack (Mandatory)

| Technology | Version | Purpose |
|---|---|---|
| Vite | 5.x+ | Build tool (ONLY build tool allowed) |
| React | 18+ | UI Framework |
| Mantine UI | 7.x | Component Library (theme-only customization) |
| @mantine/form | 7.x | Form management (use-form hook) |
| Zustand | 5.x+ | State management (redux middleware, dispatch pattern) |
| Zod | 3.x+ | Schema validation |
| PocketBase JS SDK | 0.21+ | Database interaction |
| TypeScript | 5.x+ | Type safety |

## Vite Build Tool (MANDATORY)

Vite is the ONLY accepted build tool. No alternatives.

### Vite Configuration
Every app MUST have a `vite.config.ts` at its root:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8090', changeOrigin: true },
    },
  },
  build: { outDir: 'dist' },
});
```

### Vite Features to Use
- `import.meta.env.VITE_*` for environment variables
- `import.meta.hot` for HMR (automatic with Vite)
- Static asset imports via Vite's asset handling
- Code splitting via dynamic `import()`

### Forbidden Build Tools
- ❌ webpack (any config)
- ❌ Create React App (CRA)
- ❌ Next.js
- ❌ Parcel
- ❌ esbuild directly (Vite uses it internally, that's fine)

## Elm Architecture (MANDATORY)

Every app MUST follow the Elm Architecture pattern: **Model → Update → View**

### Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        Elm Architecture                          │
│                                                                  │
│   Model (State)          Update (Reducer)         View (Render)  │
│   ┌──────────┐          ┌──────────────┐        ┌───────────┐   │
│   │ type     │  Action   │ (state,      │ State  │ (state,   │   │
│   │ AppState │ ────────→ │  action)     │ ─────→ │ dispatch) │   │
│   └──────────┘          │ => AppState  │        │ => JSX    │   │
│                         └──────────────┘        └───────────┘   │
│                              ↑                         │         │
│                              │ Action                  │         │
│                              │                         ↓         │
│                         ┌──────────┐             ┌──────────┐    │
│                         │ Effects  │             │   User   │    │
│                         │(async)   │             │  Event   │    │
│                         └──────────┘             └──────────┘    │
│                              │ dispatch Action                   │
│                              └────────────────────────────────── │
└──────────────────────────────────────────────────────────────────┘
```

### Model (State) — `state/Model.ts`

The Model is a plain TypeScript interface. No classes, no methods, no non-serializable values.

```typescript
// state/Model.ts
import type { SensorReading, Alert, Farm } from '@prime-my-brain/schemas';

export interface AppState {
  // Data
  sensors: Sensor[];
  readings: SensorReading[];
  alerts: Alert[];
  farms: Farm[];

  // UI state
  loading: boolean;
  error: string | null;
  activeTab: string;
  selectedSensorId: string | null;

  // Pagination
  currentPage: number;
  totalRecords: number;
}

export const initialAppState: AppState = {
  sensors: [],
  readings: [],
  alerts: [],
  farms: [],
  loading: false,
  error: null,
  activeTab: 'overview',
  selectedSensorId: null,
  currentPage: 1,
  totalRecords: 0,
};
```

### Actions — `state/Actions.ts`

Actions are a discriminated union type. Every state mutation MUST be represented as an action.

```typescript
// state/Actions.ts

// ─── Sensor Actions ───
export type SensorAction =
  | { type: 'sensor/FETCH_START' }
  | { type: 'sensor/FETCH_SUCCESS'; payload: { sensors: Sensor[] } }
  | { type: 'sensor/FETCH_ERROR'; payload: { error: string } }
  | { type: 'sensor/SELECT'; payload: { sensorId: string } }
  | { type: 'sensor/DESELECT' };

// ─── Reading Actions ───
export type ReadingAction =
  | { type: 'reading/FETCH_START' }
  | { type: 'reading/FETCH_SUCCESS'; payload: { readings: SensorReading[] } }
  | { type: 'reading/FETCH_ERROR'; payload: { error: string } }
  | { type: 'reading/ADD_ONE'; payload: { reading: SensorReading } }
  | { type: 'reading/SET_PAGE'; payload: { page: number } };

// ─── Alert Actions ───
export type AlertAction =
  | { type: 'alert/FETCH_SUCCESS'; payload: { alerts: Alert[] } }
  | { type: 'alert/RESOLVE'; payload: { alertId: string } };

// ─── UI Actions ───
export type UIAction =
  | { type: 'ui/SET_TAB'; payload: { tab: string } }
  | { type: 'ui/RESET' };

// ─── Root Action Union ───
export type AppAction =
  | SensorAction
  | ReadingAction
  | AlertAction
  | UIAction;
```

### Action Naming Convention
- Format: `domain/VERB` (e.g., `sensor/FETCH_START`, `reading/ADD_ONE`)
- Domains: `sensor`, `reading`, `alert`, `farm`, `auth`, `ui`
- Verbs: `FETCH_START`, `FETCH_SUCCESS`, `FETCH_ERROR`, `ADD_ONE`, `SET_*`, `REMOVE`, `RESET`
- ALWAYS use past tense for completed actions: `FETCH_SUCCESS` not `FETCH`

### Update (Reducer) — `state/Update.ts`

The Update is a PURE function. No side effects, no API calls, no mutations.

```typescript
// state/Update.ts
import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { initialAppState } from './Model';

export function update(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ─── Sensor ───
    case 'sensor/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'sensor/FETCH_SUCCESS':
      return {
        ...state,
        sensors: action.payload.sensors,
        loading: false,
      };

    case 'sensor/FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case 'sensor/SELECT':
      return { ...state, selectedSensorId: action.payload.sensorId };

    case 'sensor/DESELECT':
      return { ...state, selectedSensorId: null };

    // ─── Reading ───
    case 'reading/FETCH_START':
      return { ...state, loading: true, error: null };

    case 'reading/FETCH_SUCCESS':
      return {
        ...state,
        readings: action.payload.readings,
        loading: false,
      };

    case 'reading/ADD_ONE':
      return {
        ...state,
        readings: [action.payload.reading, ...state.readings],
      };

    case 'reading/SET_PAGE':
      return { ...state, currentPage: action.payload.page };

    // ─── Alert ───
    case 'alert/FETCH_SUCCESS':
      return { ...state, alerts: action.payload.alerts };

    case 'alert/RESOLVE':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload.alertId ? { ...a, resolved: true } : a
        ),
      };

    // ─── UI ───
    case 'ui/SET_TAB':
      return { ...state, activeTab: action.payload.tab };

    case 'ui/RESET':
      return initialAppState;

    default:
      return state;
  }
}
```

### View (Render) — `view/`

Views are React components that receive state and dispatch. They are pure rendering functions.

```typescript
// view/DashboardPage.tsx
import { Stack, Title, Text, Loader } from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';

interface ViewProps {
  state: AppState;
  dispatch: (action: AppAction) => void;
}

export function DashboardPage({ state, dispatch }: ViewProps) {
  if (state.loading) return <Loader />;

  return (
    <Stack>
      <Title order={2}>Sensors ({state.sensors.length})</Title>
      {state.sensors.map((sensor) => (
        <Text
          key={sensor.id}
          onClick={() => dispatch({ type: 'sensor/SELECT', payload: { sensorId: sensor.id! } })}
        >
          {sensor.name} - {sensor.status}
        </Text>
      ))}
    </Stack>
  );
}
```

### Effects — `effects/`

Effects handle all side effects (async operations). They dispatch actions on completion.

```typescript
// effects/index.ts
import { pb } from '../lib/pb';
import type { AppAction } from '../state/Actions';

export const effects = {
  fetchSensors: (dispatch: (a: AppAction) => void) => async () => {
    dispatch({ type: 'sensor/FETCH_START' });
    try {
      const sensors = await pb.collection('sensors').getFullList();
      dispatch({ type: 'sensor/FETCH_SUCCESS', payload: { sensors } });
    } catch (error) {
      dispatch({ type: 'sensor/FETCH_ERROR', payload: { error: (error as Error).message } });
    }
  },

  fetchReadings: (dispatch: (a: AppAction) => void) => async (sensorId: string) => {
    dispatch({ type: 'reading/FETCH_START' });
    try {
      const readings = await pb.collection('sensor_readings').getFullList({
        filter: `sensor="${sensorId}"`,
        sort: '-timestamp',
      });
      dispatch({ type: 'reading/FETCH_SUCCESS', payload: { readings } });
    } catch (error) {
      dispatch({ type: 'reading/FETCH_ERROR', payload: { error: (error as Error).message } });
    }
  },
};
```

### Connecting Elm Architecture to React

The root App component connects the Zustand Redux store to the Elm Architecture:

```typescript
// App.tsx
import { useStore } from './state/store';
import { effects } from './effects';
import { DashboardPage } from './view/DashboardPage';
import type { AppAction } from './state/Actions';

function App() {
  const state = useStore((s) => s);
  const dispatch = useStore.dispatch;

  return <DashboardPage state={state} dispatch={dispatch} />;
}
```

## Zustand Redux Pattern (MANDATORY)

### Store Creation with Redux Middleware

```typescript
// state/store.ts
import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import type { AppState } from './Model';
import type { AppAction } from './Actions';
import { update } from './Update';
import { initialAppState } from './Model';

export const useStore = create<AppState>()(
  redux(update, initialAppState)
);

// Usage in components:
// const state = useStore((s) => s);       // Select entire state
// const sensors = useStore((s) => s.sensors);  // Select slice
// const dispatch = useStore.dispatch;      // Dispatch actions
// dispatch({ type: 'sensor/FETCH_START' });
```

### Redux Pattern Rules
- **ALWAYS** use `redux` middleware from `zustand/middleware`
- **ALWAYS** use `dispatch({ type, payload })` to mutate state
- **NEVER** use `set()` directly — all mutations go through the reducer
- **NEVER** put async logic in the reducer — use `effects/` directory
- **NEVER** store non-serializable values (functions, class instances, DOM refs) in state
- Reducer MUST be a pure function: `(state, action) => newState`
- Every action MUST have a `type` string in `domain/VERB` format
- Payload MUST be an object, never a primitive

### Store Composition Pattern

For larger apps, compose reducers using a root reducer pattern:

```typescript
// state/Update.ts — Composing multiple reducers
import { sensorReducer } from './sensorReducer';
import { readingReducer } from './readingReducer';
import { uiReducer } from './uiReducer';
import type { AppState, AppAction } from './types';

export function update(state: AppState, action: AppAction): AppState {
  return {
    ...sensorReducer(state, action),
    ...readingReducer(state, action),
    ...uiReducer(state, action),
  };
}
```

## Mantine UI Rules (CRITICAL)

### Theme-Only Customization
ALL visual customization MUST be done through the Mantine theme configuration in `theme.ts`.

```typescript
// src/theme.ts - THE ONLY PLACE FOR STYLING
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  defaultRadius: 'md',
  components: {
    Button: { defaultProps: { size: 'sm' } },
  },
});
```

### Forbidden Styling Approaches
- ❌ CSS modules (`*.module.css`)
- ❌ styled-components / emotion
- ❌ Tailwind CSS
- ❌ Inline style props for theming (use Mantine props)
- ❌ Overriding Mantine component internal CSS classes
- ❌ Custom CSS files for component styling

### Acceptable Style Overrides (via theme only)
- `createTheme()` - colors, fonts, spacing, radius, shadows
- `components` key in theme - default props for Mantine components
- `virtualColor()` - light/dark mode color variants
- CSS variables set by MantineProvider

## Component Usage Rules

### Layout Components
- Use `AppShell` for app layout (header, navbar, aside, footer)
- Use `Container` for centered content
- Use `Grid` / `SimpleGrid` for layouts
- Use `Group` / `Stack` / `Flex` for flex composition

### Data Display
- Use `Table` for tabular data
- Use `Card` for content cards
- Use `Badge` / `Chip` for tags
- Use `RingProgress` / `Progress` for indicators
- Use `Timeline` for chronological data

### Data Visualization (Dashboard App)
- Prefer Mantine components for UI chrome
- Use `@mantine/charts` (Recharts wrapper) for charts
- Chart theming inherits from Mantine theme

### Forms
- ALWAYS use `@mantine/form` hook for form state
- ALWAYS use Zod for validation via `zodResolver`
- Form submission dispatches actions to the store

```typescript
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
  sensorId: z.string().min(1, 'Sensor ID is required'),
  temperature: z.number().min(-40).max(85),
  humidity: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof schema>;

function SensorForm({ dispatch }: { dispatch: (a: AppAction) => void }) {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: { sensorId: '', temperature: 0, humidity: 0 },
  });

  const handleSubmit = (values: FormValues) => {
    dispatch({
      type: 'reading/ADD_ONE',
      payload: {
        reading: {
          sensor: values.sensorId,
          type: 'temperature',
          value: values.temperature,
          unit: 'celsius',
          timestamp: new Date().toISOString(),
        },
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Sensor ID" {...form.getInputProps('sensorId')} />
      <NumberInput label="Temperature" {...form.getInputProps('temperature')} />
      <NumberInput label="Humidity" {...form.getInputProps('humidity')} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## PocketBase Client Setup

```typescript
// src/lib/pb.ts
import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://localhost:8090');
pb.autoCancellation(false);
```

### PocketBase Interaction Rules
- ALL PocketBase calls go through the shared `pb` instance in `lib/pb.ts`
- PocketBase calls belong in `effects/` directory ONLY
- NEVER call PocketBase directly from reducers or views
- Effects dispatch actions before and after PocketBase calls
- Real-time subscriptions via `pb.collection().subscribe()` in effects
- Auth via `pb.collection('users').authWithPassword()` in effects

## Zod Schema Rules

- All schemas in `src/schemas/` directory
- Shared schemas in `packages/schemas/`
- ALWAYS derive TypeScript types from Zod schemas using `z.infer<>`
- NEVER define types separately from schemas

## App-Specific Conventions

### Dashboard App (`apps/dashboard`)
- Focus: Analytics, data visualization, sensor monitoring
- Charts: Use `@mantine/charts` for Recharts integration
- Layout: `AppShell` with sidebar navigation
- Elm modules: sensor state, reading state, alert state, dashboard UI state

### LIFF App (`apps/liff-app`)
- Focus: LINE LIFF integration, farmer-facing interface
- Must include `@line/liff` SDK
- Mobile-first responsive design
- **Auth: LINE Login ONLY** (no email/password for farmers)
- Elm modules: auth state (LINE → PB flow), sensor viewer state, notification state
- Auth flow: LIFF init → LINE login → get ID token → POST /api/custom/auth/line → PB auth

#### LINE Auth Effects Pattern
```typescript
// effects/index.ts — LINE Login → PocketBase Auth
export function createEffects(dispatch: (action: AppAction) => void) {
  return {
    initLiff: async () => {
      const liff = await import('@line/liff');
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      dispatch({ type: 'auth/LIFF_INIT_SUCCESS' });

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        dispatch({ type: 'auth/LIFF_LOGIN_SUCCESS', payload: { profile } });
        // Auto-authenticate with PocketBase
        await authenticateWithPB(liff, dispatch);
      }
    },

    loginWithLine: async () => {
      const liff = await import('@line/liff');
      if (!liff.isLoggedIn()) {
        liff.login(); // Redirects to LINE consent
      }
    },
  };
}

async function authenticateWithPB(liff: any, dispatch: (a: AppAction) => void) {
  dispatch({ type: 'auth/PB_AUTH_START' });
  try {
    const idToken = liff.getIDToken();
    const response = await fetch(`${pb.baseUrl}/api/custom/auth/line`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    const { token, record } = await response.json();
    pb.authStore.save(token, record);
    dispatch({ type: 'auth/PB_AUTH_SUCCESS', payload: { token, user: record } });
  } catch (error) {
    dispatch({ type: 'auth/PB_AUTH_ERROR', payload: { error: (error as Error).message } });
  }
}
```

### IoT Demo App (`apps/iot-demo`)
- Focus: Generate/insert demo IoT data for dashboard testing
- Simulates sensor data streams
- Form-heavy for manual data entry
- Elm modules: data entry state, generator state, simulator state
