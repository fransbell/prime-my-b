// ─── Dashboard App — Root View (Elm Architecture) ─────────────
// The root App component connects the Zustand Redux store to the Elm Architecture.
// Pattern: Model (state) → View (render) → Action (dispatch) → Update (reducer) → Model

import { useEffect, useRef } from 'react';
import { AppShell, Group, Title, Text, Container, Tabs, Loader, Stack, Badge } from '@mantine/core';
import { useStore, dispatch } from './state/store';
import { createEffects, type Effects } from './effects';
import type { AppAction } from './state/Actions';
import type { AppState } from './state/Model';

// Create effects bound to dispatch
const effects: Effects = createEffects(dispatch as (a: AppAction) => void);

// ─── View: App Header ─────────────────────────────────────────
function AppHeader({ state }: { state: AppState }) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Title order={3}>Prime My Brain</Title>
        <Group gap="md">
          {state.loading && <Loader size="xs" />}
          <Text size="sm" c="dimmed">Dashboard</Text>
          {state.error && <Badge color="red">Error</Badge>}
        </Group>
      </Group>
    </AppShell.Header>
  );
}

// ─── View: Overview Page ──────────────────────────────────────
function OverviewPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={2}>Overview</Title>
      <Group>
        <Badge size="lg" variant="light">{state.sensors.length} Sensors</Badge>
        <Badge size="lg" variant="light" color="blue">{state.readings.length} Readings</Badge>
        <Badge size="lg" variant="light" color="orange">{state.alerts.filter(a => !a.resolved).length} Alerts</Badge>
      </Group>
      <Text c="dimmed">Connect to PocketBase server to see live sensor data.</Text>
    </Stack>
  );
}

// ─── View: Sensors Page ───────────────────────────────────────
function SensorsPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={2}>Sensors</Title>
      {state.sensors.length === 0 ? (
        <Text c="dimmed">No sensors found. Ensure PocketBase is running and sensors are configured.</Text>
      ) : (
        state.sensors.map((sensor) => (
          <Group
            key={sensor.id}
            onClick={() => dispatch({ type: 'sensor/SELECT', payload: { sensorId: sensor.id } })}
            style={{ cursor: 'pointer' }}
          >
            <Text>{sensor.name || sensor.sensorId}</Text>
            <Badge color={sensor.status === 'active' ? 'green' : sensor.status === 'inactive' ? 'red' : 'yellow'}>
              {sensor.status}
            </Badge>
          </Group>
        ))
      )}
    </Stack>
  );
}

// ─── View: Analytics Page ─────────────────────────────────────
function AnalyticsPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={2}>Analytics</Title>
      <Text c="dimmed">Sensor analytics and data visualization will appear here.</Text>
    </Stack>
  );
}

// ─── View: Alerts Page ────────────────────────────────────────
function AlertsPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={2}>Alerts</Title>
      {state.alerts.length === 0 ? (
        <Text c="dimmed">No active alerts.</Text>
      ) : (
        state.alerts.filter(a => !a.resolved).map((alert) => (
          <Group key={alert.id}>
            <Badge color={alert.severity === 'critical' ? 'red' : alert.severity === 'high' ? 'orange' : 'yellow'}>
              {alert.severity}
            </Badge>
            <Text size="sm">{alert.message}</Text>
          </Group>
        ))
      )}
    </Stack>
  );
}

// ─── Root View: App ───────────────────────────────────────────
// Connects Zustand Redux store to Elm Architecture views
function App() {
  const state = useStore();
  const appDispatch = useStore.dispatch;
  const initialized = useRef(false);

  // Fetch initial data on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effects.fetchSensors();
      effects.fetchAlerts();
      effects.subscribeToReadings();
    }
    return () => {
      effects.unsubscribeFromReadings();
      effects.cleanup();
    };
  }, []);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppHeader state={state} />

      <AppShell.Main>
        <Container size="xl">
          <Tabs
            value={state.activeTab}
            onChange={(tab) => appDispatch({ type: 'dashboard/SET_TAB', payload: { tab: tab as any } })}
          >
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="sensors">Sensors</Tabs.Tab>
              <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
              <Tabs.Tab value="alerts">Alerts</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview" pt="md">
              <OverviewPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="sensors" pt="md">
              <SensorsPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="analytics" pt="md">
              <AnalyticsPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="alerts" pt="md">
              <AlertsPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
