// ─── IoT Demo — View: Device Detail ───────────────────────────
// Shows a selected device's image, description, and list of
// available metrics. Clicking a metric navigates to the activation demo.
// Elm Architecture: receives (state, dispatch) — no local state.

import {
  Container, Stack, Title, Text, Image, Badge, Group, Card, SimpleGrid,
  Button, Paper, RingProgress, Center,
} from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog, categoryLabels, categoryColors } from '../data/devices';

interface DeviceDetailViewProps {
  state: AppState;
  dispatch: (a: AppAction) => void;
}

export function DeviceDetailView({ state, dispatch }: DeviceDetailViewProps) {
  const device = deviceCatalog.find((d) => d.id === state.selectedDeviceId);

  if (!device) {
    return (
      <Container size="md">
        <Paper p="xl" withBorder>
          <Stack align="center">
            <Text c="dimmed">Device not found</Text>
            <Button variant="subtle" onClick={() => dispatch({ type: 'nav/GOTO', payload: { view: 'hardware-list' } })}>
              Back to Hardware List
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg">
      <Stack gap="lg">
        {/* Back Button */}
        <Button
          variant="subtle"
          size="xs"
          onClick={() => dispatch({ type: 'device/DESELECT' })}
        >
          ← Back to Hardware
        </Button>

        {/* Device Header */}
        <Group align="flex-start" gap="xl" wrap="wrap">
          <Image
            src={device.imageUrl}
            w={220}
            h={220}
            radius="md"
            fit="contain"
            fallbackSrc="https://placehold.co/220x220?text=IoT+Device"
          />
          <Stack gap="xs" style={{ flex: 1, minWidth: 280 }}>
            <Group gap="sm">
              <Title order={2}>{device.name}</Title>
              <Badge color={categoryColors[device.category]} variant="light">
                {categoryLabels[device.category]}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" maw={500}>
              {device.description}
            </Text>
            <Group gap="xs" mt="xs">
              <Badge variant="filled" color="violet">
                {device.metrics.length} metric{device.metrics.length > 1 ? 's' : ''}
              </Badge>
              <Text size="xs" c="dimmed">
                Select a metric to analyze readings (Dead → Ideal scale on each card)
              </Text>
            </Group>
          </Stack>
        </Group>

        {/* Metrics Grid */}
        <Title order={4} mt="md">Available Metrics</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {device.metrics.map((metric) => {
            // Find the "normal" status level for the center display
            const normalLevel = metric.statusLevels.find((s) => s.status === 'normal');
            const normalColor = normalLevel?.color || 'blue';

            return (
              <Card
                key={metric.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                onClick={() => dispatch({ type: 'metric/SELECT', payload: { metricId: metric.id } })}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={600}>{metric.name}</Text>
                    <Text size="sm" c="dimmed">
                      Measures {metric.parameter} in {metric.unit}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Normal range: {metric.normalRange.min} – {metric.normalRange.max} {metric.unit}
                    </Text>
                  </Stack>
                  <RingProgress
                    size={80}
                    thickness={8}
                    roundCaps
                    sections={[{ value: 70, color: normalColor }]}
                    label={
                      <Center>
                        <Stack gap={0} align="center">
                          <Text fw={700} size="sm">{normalLevel?.value ?? '—'}</Text>
                          <Text size="xs" c="dimmed">{metric.unit}</Text>
                        </Stack>
                      </Center>
                    }
                  />
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
