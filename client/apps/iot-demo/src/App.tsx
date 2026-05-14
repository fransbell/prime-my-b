// ─── IoT Demo App — Root View (Elm Architecture) ──────────────
// Pattern: Model (state) → View (render) → Action (dispatch) → Update (reducer) → Model
// This is the root view that delegates to view components.
// NO local state — all state flows from the store via (state, dispatch).

import { useEffect, useRef } from 'react';
import { AppShell, Group, Title, Badge } from '@mantine/core';
import { useStore, dispatch } from './state/store';
import { createEffects, type Effects } from './effects';
import type { AppAction } from './state/Actions';
import type { AppState } from './state/Model';
import { HardwareListView } from './view/HardwareListView';
import { DeviceDetailView } from './view/DeviceDetailView';
import { MetricActivateView } from './view/MetricActivateView';

// Effects singleton — created once, receives dispatch
const effects: Effects = createEffects(dispatch as (a: AppAction) => void);

// ─── View Router ─────────────────────────────────────────────
// Selects the correct view based on currentView in state

function ViewRouter({ state, dispatch: d }: { state: AppState; dispatch: (a: AppAction) => void }) {
  switch (state.currentView) {
    case 'hardware-list':
      return <HardwareListView state={state} dispatch={d} />;

    case 'device-detail':
      return <DeviceDetailView state={state} dispatch={d} />;

    case 'metric-activate':
      return <MetricActivateView state={state} dispatch={d} effects={effects} />;

    default:
      return <HardwareListView state={state} dispatch={d} />;
  }
}

// ─── Root View: App ──────────────────────────────────────────

function App() {
  const state = useStore();
  const appDispatch = useStore.dispatch;
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effects.loadCatalog();
    }
    return () => {
      effects.cleanup();
    };
  }, []);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Title order={3} style={{ cursor: 'pointer' }} onClick={() => appDispatch({ type: 'nav/GOTO', payload: { view: 'hardware-list' } })}>
              Prime My B
            </Title>
            <Badge variant="light" color="orange" size="sm">
              IoT Demo
            </Badge>
          </Group>
          <Group gap="xs">
            <Badge variant="outline" color="gray" size="sm">
              No Auth Required
            </Badge>
            {state.activationHistory.length > 0 && (
              <Badge variant="light" color="violet" size="sm">
                {state.activationHistory.length} activations
              </Badge>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <ViewRouter state={state} dispatch={appDispatch} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
