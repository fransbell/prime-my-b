// ─── IoT Demo — View: Metric Activate (Realtime Demo) ─────────
// Select a metric status level (best → critical) to insert a record
// into PocketBase. Realtime subscription shows live updates.
// Each action button inserts a new record to the metric's PB table.
// A line chart visualizes recent readings in real time.
// Elm Architecture: receives (state, dispatch) — no local state.

import { useEffect, useRef } from 'react';
import {
  Container, Stack, Title, Text, Button, Group, Badge, Paper, SimpleGrid,
  RingProgress, Center, Table, ScrollArea, Alert, Loader,
} from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog } from '../data/devices';
import type { Effects } from '../effects';
import { MetricLineChart } from './MetricLineChart';

interface MetricActivateViewProps {
  state: AppState;
  dispatch: (a: AppAction) => void;
  effects: Effects;
}

// Status color map for the chart dots
const statusColors: Record<string, string> = {
  best: '#12b886',
  good: '#40c057',
  normal: '#339af0',
  bad: '#fd7e14',
  critical: '#fa5252',
};

export function MetricActivateView({ state, dispatch, effects }: MetricActivateViewProps) {
  const device = deviceCatalog.find((d) => d.id === state.selectedDeviceId);
  const metric = device?.metrics.find((m) => m.id === state.selectedMetricId);
  const subscribedRef = useRef(false);

  // Fetch readings + subscribe to realtime when this view mounts
  useEffect(() => {
    if (!metric) return;
    subscribedRef.current = true;
    effects.fetchReadings(metric.id);
    effects.subscribeToMetric(metric.id);

    return () => {
      // Cleanup happens in App.tsx via effects.cleanup()
    };
  }, [metric?.id]);

  if (!device || !metric) {
    return (
      <Container size="md">
        <Paper p="xl" withBorder>
          <Stack align="center">
            <Text c="dimmed">Metric not found</Text>
            <Button variant="subtle" onClick={() => dispatch({ type: 'nav/GOTO', payload: { view: 'hardware-list' } })}>
              Back to Hardware List
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const statusButtonOrder = ['best', 'good', 'normal', 'bad', 'critical'] as const;

  return (
    <Container size="lg">
      <Stack gap="lg">
        {/* Back Button */}
        <Button
          variant="subtle"
          size="xs"
          onClick={() => dispatch({ type: 'metric/DESELECT' })}
        >
          ← Back to {device.name}
        </Button>

        {/* Metric Header */}
        <Paper p="lg" withBorder radius="md">
          <Group justify="space-between" wrap="wrap">
            <Stack gap={4}>
              <Title order={3}>{metric.name}</Title>
              <Text size="sm" c="dimmed">
                {device.name} — Measures {metric.parameter} in {metric.unit}
              </Text>
              <Text size="xs" c="dimmed">
                Normal range: {metric.normalRange.min} – {metric.normalRange.max} {metric.unit}
              </Text>
            </Stack>

            {/* Live Reading Display */}
            {state.activeStatusLevel && (
              <RingProgress
                size={120}
                thickness={12}
                roundCaps
                sections={[{ value: 75, color: state.activeStatusLevel.color }]}
                label={
                  <Center>
                    <Stack gap={0} align="center">
                      <Text fw={700} size="xl">{state.activeStatusLevel.value}</Text>
                      <Text size="xs" c="dimmed">{metric.unit}</Text>
                    </Stack>
                  </Center>
                }
              />
            )}
          </Group>
        </Paper>

        {/* Realtime Line Chart */}
        <Paper p="lg" withBorder radius="md">
          <Group justify="space-between">
            <Title order={4}>Realtime Readings</Title>
            <Group gap="xs">
              <Badge variant="light" color="violet" size="sm">
                {state.readingsTotal} records
              </Badge>
              {state.readingsLoading && <Loader size="xs" />}
            </Group>
          </Group>

          {state.readings.length > 0 ? (
            <MetricLineChart
              readings={state.readings}
              unit={metric.unit}
              normalMin={metric.normalRange.min}
              normalMax={metric.normalRange.max}
              statusColors={statusColors}
            />
          ) : (
            <Text c="dimmed" size="sm" ta="center" py="xl">
              No readings yet. Click a status button below to insert a record.
            </Text>
          )}
        </Paper>

        {/* Status Alert — shows when a status is active */}
        {state.activeStatusLevel && (
          <Alert
            color={state.activeStatusLevel.color}
            variant="filled"
            radius="md"
            title={`${state.activeStatusLevel.icon} ${state.activeStatusLevel.label} — ${state.activeStatusLevel.value} ${metric.unit}`}
          >
            {state.activeStatusLevel.description}
          </Alert>
        )}

        {/* Action Buttons — Insert records to PB */}
        <Paper p="lg" withBorder radius="md">
          <Stack gap="md">
            <Title order={4}>Action — Insert Reading</Title>
            <Text size="sm" c="dimmed">
              Click a status level to insert a new reading into the database.
              Records appear in the chart and table in real time.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 5 }} spacing="sm">
              {statusButtonOrder.map((statusKey) => {
                const level = metric.statusLevels.find((s) => s.status === statusKey);
                if (!level) return null;

                return (
                  <Button
                    key={statusKey}
                    color={level.color}
                    variant={state.activeStatus === statusKey ? 'filled' : 'light'}
                    size="lg"
                    radius="md"
                    fullWidth
                    onClick={() => effects.insertReading(
                      device.id,
                      device.name,
                      metric.id,
                      metric.name,
                      metric.unit,
                      statusKey,
                      level,
                    )}
                  >
                    <Stack gap={2} align="center">
                      <Text size="lg">{level.icon}</Text>
                      <Text fw={700} size="sm">{level.label}</Text>
                      <Text size="xs" opacity={0.8}>
                        {level.value} {metric.unit}
                      </Text>
                    </Stack>
                  </Button>
                );
              })}
            </SimpleGrid>
          </Stack>
        </Paper>

        {/* Recent Readings Table */}
        {state.readings.length > 0 && (
          <Paper p="lg" withBorder radius="md">
            <Group justify="space-between">
              <Title order={4}>Recent Readings</Title>
              <Badge variant="outline" size="sm" color="violet">
                Live via PocketBase Realtime
              </Badge>
            </Group>

            <ScrollArea mah={300}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Value</Table.Th>
                    <Table.Th>Source</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {state.readings.slice(0, 20).map((reading) => (
                    <Table.Tr key={reading.id}>
                      <Table.Td>
                        <Text size="xs">
                          {new Date(reading.created).toLocaleTimeString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={statusColors[reading.status] || 'gray'}
                          size="sm"
                          variant="filled"
                        >
                          {reading.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" fw={600}>
                          {reading.value} {reading.unit}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="dot" size="sm" color="gray">
                          {reading.source}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        )}

        {/* Activation History */}
        {state.activationHistory.length > 0 && (
          <Paper p="lg" withBorder radius="md">
            <Group justify="space-between">
              <Title order={4}>Session Activations</Title>
              <Button
                variant="subtle"
                size="xs"
                color="red"
                onClick={() => effects.clearHistory()}
              >
                Clear
              </Button>
            </Group>

            <ScrollArea mah={200}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Value</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {state.activationHistory.map((record) => (
                    <Table.Tr key={record.id}>
                      <Table.Td>
                        <Text size="xs">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={statusColors[record.status] || 'gray'}
                          size="sm"
                          variant="filled"
                        >
                          {record.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" fw={600}>
                          {record.value} {record.unit}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
