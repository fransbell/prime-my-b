// ─── IoT Demo App — Root View (Elm Architecture) ──────────────
// Pattern: Model (state) → View (render) → Action (dispatch) → Update (reducer) → Model

import { useEffect, useRef } from 'react';
import {
  AppShell, Group, Title, Text, Container, Stack, Badge,
  Button, NumberInput, Select, Tabs, Loader, Paper,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useStore, dispatch } from './state/store';
import { createEffects, type Effects } from './effects';
import type { AppAction } from './state/Actions';
import type { AppState } from './state/Model';

const effects: Effects = createEffects(dispatch as (a: AppAction) => void);

// ─── View: Data Entry Page ────────────────────────────────────
function DataEntryPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  const sensorOptions = state.sensors.map((s) => ({
    value: s.id,
    label: `${s.name || s.sensorId} (${s.type})`,
  }));

  const typeOptions = [
    'temperature', 'humidity', 'soil_moisture', 'light',
    'ph', 'rainfall', 'wind', 'npk',
  ].map((t) => ({ value: t, label: t }));

  const formSchema = z.object({
    sensor: z.string().min(1, 'Select a sensor'),
    type: z.string().min(1, 'Select reading type'),
    value: z.number({ required_error: 'Value is required' }),
  });

  const form = useForm({
    validate: zodResolver(formSchema),
    initialValues: { sensor: '', type: '', value: 0 },
  });

  const handleSubmit = (values: typeof form.values) => {
    effects.insertReading(values.sensor, values.type as any, values.value);
  };

  return (
    <Stack>
      <Title order={3}>Insert Sensor Reading</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label="Sensor"
            data={sensorOptions}
            {...form.getInputProps('sensor')}
          />
          <Select
            label="Reading Type"
            data={typeOptions}
            {...form.getInputProps('type')}
          />
          <NumberInput
            label="Value"
            decimalScale={2}
            {...form.getInputProps('value')}
          />
          <Button type="submit" loading={state.loading}>Insert Reading</Button>
        </Stack>
      </form>

      <Group mt="md">
        <Badge color="green">Success: {state.successCount}</Badge>
        <Badge color="red">Failed: {state.failCount}</Badge>
      </Group>
    </Stack>
  );
}

// ─── View: Batch Generator Page ───────────────────────────────
function BatchGeneratorPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Data Generator</Title>
      <Paper p="md" withBorder>
        <Stack>
          <Text size="sm">Generate continuous sensor data at a set interval.</Text>
          <Group>
            <Badge>Generated: {state.generator.generatedCount}</Badge>
            <Badge color={state.generator.isRunning ? 'green' : 'gray'}>
              {state.generator.isRunning ? 'Running' : 'Stopped'}
            </Badge>
          </Group>
          <Group>
            {!state.generator.isRunning ? (
              <Button
                onClick={() => effects.startGenerator(
                  state.generator.sensorId || 'GEN_001',
                  state.generator.intervalMs,
                  state.generator.readingTypes,
                  state.generator.valueRange.min,
                  state.generator.valueRange.max,
                )}
              >
                Start Generator
              </Button>
            ) : (
              <Button color="red" onClick={() => effects.stopGenerator()}>
                Stop Generator
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

// ─── View: Simulator Page ─────────────────────────────────────
function SimulatorPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Multi-Sensor Simulator</Title>
      <Paper p="md" withBorder>
        <Stack>
          <Text size="sm">Simulate multiple sensors sending data simultaneously.</Text>
          <Group>
            <Badge>Sensors: {state.simulator.sensorCount}</Badge>
            <Badge>Total: {state.simulator.totalGenerated}</Badge>
            <Badge color={state.simulator.isRunning ? 'green' : 'gray'}>
              {state.simulator.isRunning ? 'Running' : 'Stopped'}
            </Badge>
          </Group>
          <Group>
            {!state.simulator.isRunning ? (
              <Button
                onClick={() => effects.startSimulator(
                  state.simulator.sensorCount,
                  state.simulator.readingTypes,
                )}
              >
                Start Simulator
              </Button>
            ) : (
              <Button color="red" onClick={() => effects.stopSimulator()}>
                Stop Simulator
              </Button>
            )}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

// ─── View: Status Page ────────────────────────────────────────
function StatusPage({ state, dispatch }: { state: AppState; dispatch: (a: AppAction) => void }) {
  return (
    <Stack>
      <Title order={3}>Status</Title>
      <Paper p="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Text size="sm">PocketBase Connection</Text>
            <Badge color="gray">Not Connected</Badge>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Readings Inserted</Text>
            <Badge>{state.successCount}</Badge>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Failed Inserts</Text>
            <Badge color="red">{state.failCount}</Badge>
          </Group>
          <Group justify="space-between">
            <Text size="sm">Available Sensors</Text>
            <Badge>{state.sensors.length}</Badge>
          </Group>
        </Stack>
      </Paper>
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
    }
    return () => {
      effects.cleanup();
    };
  }, []);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>IoT Data Demo</Title>
          <Group gap="xs">
            {state.loading && <Loader size="xs" />}
            <Text size="sm" c="dimmed">Data Generator</Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="md">
          <Tabs
            value={state.activeTab}
            onChange={(tab) => appDispatch({ type: 'ui/SET_TAB', payload: { tab: tab as any } })}
          >
            <Tabs.List>
              <Tabs.Tab value="entry">Data Entry</Tabs.Tab>
              <Tabs.Tab value="batch">Generator</Tabs.Tab>
              <Tabs.Tab value="simulator">Simulator</Tabs.Tab>
              <Tabs.Tab value="status">Status</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="entry" pt="md">
              <DataEntryPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="batch" pt="md">
              <BatchGeneratorPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="simulator" pt="md">
              <SimulatorPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
            <Tabs.Panel value="status" pt="md">
              <StatusPage state={state} dispatch={appDispatch} />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
