// ─── LIFF App — Root View (Elm Architecture) ──────────────────
// Pattern: Model (state) → View (render) → Action (dispatch) → Update (reducer) → Model

import { useEffect, useRef } from 'react';
import { AppShell, Group, Title, Text, Container, Stack, Badge, Loader, Button } from '@mantine/core';
import { useStore, dispatch } from './state/store';
import { createEffects, type Effects } from './effects';
import type { AppAction } from './state/Actions';
import type { AppState } from './state/Model';

const effects: Effects = createEffects(dispatch as (a: AppAction) => void);

// ─── View: Home Page ──────────────────────────────────────────
function HomePage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack gap="md">
      <Title order={2}>Welcome{state.profile ? `, ${state.profile.displayName}` : ''}</Title>
      {state.liffLoggedIn && state.profile && (
        <Group>
          {state.profile.pictureUrl && (
            <img src={state.profile.pictureUrl} alt="Profile" style={{ borderRadius: '50%', width: 48, height: 48 }} />
          )}
          <div>
            <Text fw={500}>{state.profile.displayName}</Text>
            {state.profile.statusMessage && (
              <Text size="xs" c="dimmed">{state.profile.statusMessage}</Text>
            )}
          </div>
        </Group>
      )}
      <Group>
        <Badge size="lg" variant="light" color="green">{state.sensors.length} Sensors</Badge>
        <Badge size="lg" variant="light" color="orange">{state.unreadAlerts} Alerts</Badge>
      </Group>
      <Text c="dimmed">Your farm sensor data will appear here.</Text>
    </Stack>
  );
}

// ─── View: Sensor Data Page ───────────────────────────────────
function SensorDataPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Latest Readings</Title>
      {state.latestReadings.length === 0 ? (
        <Text c="dimmed">No readings available.</Text>
      ) : (
        state.latestReadings.slice(0, 10).map((reading) => (
          <Group key={reading.id} justify="space-between">
            <Text size="sm">{reading.type}</Text>
            <Badge>{reading.value} {reading.unit}</Badge>
          </Group>
        ))
      )}
    </Stack>
  );
}

// ─── View: Alerts Page ────────────────────────────────────────
function AlertsPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Alerts</Title>
      <Text c="dimmed">You have {state.unreadAlerts} unread alerts.</Text>
    </Stack>
  );
}

// ─── Root View: App ───────────────────────────────────────────
function App() {
  const state = useStore();
  const appDispatch = useStore.dispatch;
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effects.fetchSensors();
      effects.fetchUnreadAlertCount();
      effects.subscribeToReadings();
    }
    return () => {
      effects.unsubscribeFromReadings();
      effects.cleanup();
    };
  }, []);

  return (
    <AppShell header={{ height: 50 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={4}>Prime My Brain</Title>
          <Group gap="xs">
            {state.loading && <Loader size="xs" />}
            <Text size="xs" c="dimmed">LIFF</Text>
            {state.unreadAlerts > 0 && (
              <Badge color="red" size="xs">{state.unreadAlerts}</Badge>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xs">
          <Stack gap="md">
            {state.activePage === 'home' && <HomePage state={state} dispatch={appDispatch} />}
            {state.activePage === 'sensors' && <SensorDataPage state={state} dispatch={appDispatch} />}
            {state.activePage === 'alerts' && <AlertsPage state={state} dispatch={appDispatch} />}
          </Stack>

          {/* Bottom Navigation */}
          <Group justify="center" mt="xl" gap="xs">
            <Button
              variant={state.activePage === 'home' ? 'filled' : 'subtle'}
              size="xs"
              onClick={() => appDispatch({ type: 'nav/SET_PAGE', payload: { page: 'home' } })}
            >
              Home
            </Button>
            <Button
              variant={state.activePage === 'sensors' ? 'filled' : 'subtle'}
              size="xs"
              onClick={() => appDispatch({ type: 'nav/SET_PAGE', payload: { page: 'sensors' } })}
            >
              Sensors
            </Button>
            <Button
              variant={state.activePage === 'alerts' ? 'filled' : 'subtle'}
              size="xs"
              onClick={() => appDispatch({ type: 'nav/SET_PAGE', payload: { page: 'alerts' } })}
            >
              Alerts
            </Button>
          </Group>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
