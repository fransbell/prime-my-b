// ─── LIFF App — Root View (Elm Architecture) ──────────────────
// LINE Login → PocketBase Auth Flow
//
// 1. LIFF init → check if logged in to LINE
// 2. If not logged in → show "Login with LINE" button
// 3. LINE login → get ID token → verify with PocketBase
// 4. PB auth success → show main app with sensor data

import { useEffect, useRef } from 'react';
import {
  AppShell, Group, Title, Text, Container, Stack, Badge,
  Loader, Button, Avatar, Paper, Divider,
} from '@mantine/core';
import { useStore, dispatch } from './state/store';
import { createEffects, type Effects } from './effects';
import type { AppAction } from './state/Actions';
import type { AppState } from './state/Model';

const effects: Effects = createEffects(dispatch as (a: AppAction) => void);

// ─── View: Login Screen ──────────────────────────────────────
function LoginScreen({ state }: { state: AppState; dispatch: (a: AppAction) => void }) {
  if (!state.liffInitialized) {
    return (
      <Stack align="center" gap="md" mih="60vh" justify="center">
        <Loader size="lg" />
        <Text c="dimmed">Initializing LINE...</Text>
      </Stack>
    );
  }

  if (state.loading) {
    return (
      <Stack align="center" gap="md" mih="60vh" justify="center">
        <Loader size="lg" />
        <Text c="dimmed">Authenticating...</Text>
      </Stack>
    );
  }

  return (
    <Stack align="center" gap="lg" mih="60vh" justify="center">
      <Title order={2} ta="center">Prime My Brain</Title>
      <Text c="dimmed" ta="center">IoT Coffee Sensor Platform</Text>

      {state.error && (
        <Paper p="md" withBorder bg="red.0">
          <Text size="sm" c="red">{state.error}</Text>
        </Paper>
      )}

      <Button
        size="lg"
        radius="xl"
        onClick={() => effects.loginWithLine()}
        loading={state.loading}
      >
        Login with LINE
      </Button>

      <Text size="xs" c="dimmed" ta="center">
        Login with your LINE account to access your farm sensor data.
        <br />No additional registration required.
      </Text>
    </Stack>
  );
}

// ─── View: Home Page (authenticated) ─────────────────────────
function HomePage({ state }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack gap="md">
      <Group>
        {state.profile?.pictureUrl && (
          <Avatar src={state.profile.pictureUrl} alt={state.profile.displayName} radius="xl" size="lg" />
        )}
        <div>
          <Text fw={600} size="lg">{state.profile?.displayName}</Text>
          {state.profile?.statusMessage && (
            <Text size="xs" c="dimmed">{state.profile.statusMessage}</Text>
          )}
        </div>
      </Group>

      <Divider />

      <Group>
        <Badge size="lg" variant="light" color="green">{state.sensors.length} Sensors</Badge>
        <Badge size="lg" variant="light" color="orange">{state.unreadAlerts} Alerts</Badge>
      </Group>

      <Text c="dimmed">Your farm sensor data will appear here.</Text>
    </Stack>
  );
}

// ─── View: Sensor Data Page ───────────────────────────────────
function SensorDataPage({ state }: { state: AppState; dispatch: (a: AppAction) => void }) {
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
function AlertsPage({ state }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Alerts</Title>
      <Text c="dimmed">You have {state.unreadAlerts} unread alerts.</Text>
    </Stack>
  );
}

// ─── View: Profile Page ───────────────────────────────────────
function ProfilePage({ state }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Profile</Title>
      <Paper p="md" withBorder>
        <Stack gap="sm">
          <Group>
            {state.profile?.pictureUrl && (
              <Avatar src={state.profile.pictureUrl} size="xl" radius="xl" />
            )}
            <div>
              <Text fw={600}>{state.profile?.displayName}</Text>
              <Text size="sm" c="dimmed">LINE User ID: {state.profile?.userId}</Text>
            </div>
          </Group>
          <Divider />
          <Text size="sm" c="dimmed">
            Authenticated via LINE Login.
            Your PocketBase account is automatically linked to your LINE profile.
          </Text>
        </Stack>
      </Paper>
      <Button
        variant="outline"
        color="red"
        onClick={() => effects.logout()}
        mt="md"
      >
        Logout
      </Button>
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

      // Initialize LIFF — this starts the LINE Login flow
      effects.initLiff();
    }
    return () => {
      effects.cleanup();
    };
  }, []);

  // After PB auth succeeds, load data
  useEffect(() => {
    if (state.pbAuthenticated) {
      effects.fetchSensors();
      effects.fetchUnreadAlertCount();
      effects.subscribeToReadings();
    }
  }, [state.pbAuthenticated]);

  // Not authenticated → show login screen
  if (!state.pbAuthenticated) {
    return (
      <AppShell header={{ height: 50 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Title order={4}>Prime My Brain</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Container size="xs">
            <LoginScreen state={state} dispatch={appDispatch} />
          </Container>
        </AppShell.Main>
      </AppShell>
    );
  }

  // Authenticated → show main app
  return (
    <AppShell header={{ height: 50 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={4}>Prime My Brain</Title>
          <Group gap="xs">
            {state.loading && <Loader size="xs" />}
            {state.unreadAlerts > 0 && (
              <Badge color="red" size="xs">{state.unreadAlerts}</Badge>
            )}
            {state.profile?.pictureUrl && (
              <Avatar src={state.profile.pictureUrl} size="sm" radius="xl" />
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
            {state.activePage === 'profile' && <ProfilePage state={state} dispatch={appDispatch} />}
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
            <Button
              variant={state.activePage === 'profile' ? 'filled' : 'subtle'}
              size="xs"
              onClick={() => appDispatch({ type: 'nav/SET_PAGE', payload: { page: 'profile' } })}
            >
              Profile
            </Button>
          </Group>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
