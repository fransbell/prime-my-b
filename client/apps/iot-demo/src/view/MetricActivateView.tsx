// ─── IoT Demo — View: Metric Activate (Demo) ─────────────────
// The pitch demo view: select a metric status level (best → critical)
// to see what the reading would look like. Each status button triggers
// an "activation" that records the demo reading.
// Elm Architecture: receives (state, dispatch) — no local state.

import {
  Container, Stack, Title, Text, Button, Group, Badge, Paper, SimpleGrid,
  RingProgress, Center, Table, ScrollArea, Alert,
} from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog } from '../data/devices';
import type { Effects } from '../effects';

interface MetricActivateViewProps {
  state: AppState;
  dispatch: (a: AppAction) => void;
  effects: Effects;
}

export function MetricActivateView({ state, dispatch, effects }: MetricActivateViewProps) {
  const device = deviceCatalog.find((d) => d.id === state.selectedDeviceId);
  const metric = device?.metrics.find((m) => m.id === state.selectedMetricId);

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

  // Build status button color map for visual emphasis
  const statusEmphasis: Record<string, { variant: 'filled' | 'light' | 'outline'; size: string }> = {
    best: { variant: 'filled', size: 'lg' },
    good: { variant: 'filled', size: 'lg' },
    normal: { variant: 'light', size: 'lg' },
    bad: { variant: 'filled', size: 'lg' },
    critical: { variant: 'filled', size: 'lg' },
  };

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

        {/* Demo Activation Buttons */}
        <Paper p="lg" withBorder radius="md">
          <Stack gap="md">
            <Title order={4}>Manual Activate — Demo</Title>
            <Text size="sm" c="dimmed">
              Click a status level below to simulate what the sensor reading would look like.
              Use this for pitch demos to show how different conditions are displayed.
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 5 }} spacing="sm">
              {statusButtonOrder.map((statusKey) => {
                const level = metric.statusLevels.find((s) => s.status === statusKey);
                if (!level) return null;
                const emphasis = statusEmphasis[statusKey];

                return (
                  <Button
                    key={statusKey}
                    color={level.color}
                    variant={state.activeStatus === statusKey ? 'filled' : emphasis.variant}
                    size={emphasis.size as any}
                    radius="md"
                    fullWidth
                    onClick={() => effects.activateStatus(
                      device.id,
                      device.name,
                      metric.id,
                      metric.name,
                      metric.unit,
                      statusKey,
                      level,
                    )}
                    styles={{
                      root: {
                        transition: 'transform 0.1s ease',
                      },
                    }}
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

        {/* Activation History */}
        {state.activationHistory.length > 0 && (
          <Paper p="lg" withBorder radius="md">
            <Group justify="space-between">
              <Title order={4}>Activation History</Title>
              <Button
                variant="subtle"
                size="xs"
                color="red"
                onClick={() => effects.clearHistory()}
              >
                Clear
              </Button>
            </Group>

            <ScrollArea mah={300}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Device</Table.Th>
                    <Table.Th>Metric</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Value</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {state.activationHistory.map((record) => {
                    const level = metric.statusLevels.find((s) => s.status === record.status);
                    return (
                      <Table.Tr key={record.id}>
                        <Table.Td>
                          <Text size="xs">
                            {new Date(record.timestamp).toLocaleTimeString()}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs">{record.deviceName}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs">{record.metricName}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={level?.color || 'gray'} size="sm" variant="filled">
                            {level?.icon} {record.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" fw={600}>
                            {record.value} {record.unit}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
