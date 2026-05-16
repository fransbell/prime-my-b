// ─── IoT Demo — View: Hardware List ───────────────────────────
// Device cards: image, metric type, 7-step scale actions (Dead → Ideal).
// Elm Architecture: receives (state, dispatch, effects) — no local state.

import {
  SimpleGrid, Card, Image, Text, Badge, Group, Stack, Title, Container, Button, Divider,
  ScrollArea,
} from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';
import {
  devices as deviceCatalog,
  categoryLabels,
  categoryColors,
  getMetricScaleLevels,
  type MetricStatus,
} from '../data/devices';
import type { Effects } from '../effects';

interface HardwareListViewProps {
  state: AppState;
  dispatch: (a: AppAction) => void;
  effects: Effects;
}

export function HardwareListView({ dispatch, effects }: HardwareListViewProps) {
  const handleScaleAction = (
    deviceId: string,
    metricId: string,
    status: MetricStatus,
  ) => {
    const device = deviceCatalog.find((d) => d.id === deviceId);
    const metric = device?.metrics.find((m) => m.id === metricId);
    if (!device || !metric) return;

    const level = getMetricScaleLevels(metric).find((s) => s.status === status);
    if (!level) return;

    effects.insertReading(
      device.id,
      device.name,
      metric.id,
      metric.name,
      metric.unit,
      status,
      level,
    );
  };

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <Title order={2}>IoT Hardware Catalog</Title>
          <Text size="sm" c="dimmed">
            Each card shows sensor metrics with scale actions: Dead, Critical, Bad, Normal, Good, Great, Ideal.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {deviceCatalog.map((device) => (
            <Card key={device.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={device.imageUrl}
                  height={160}
                  alt={device.name}
                  fallbackSrc="https://placehold.co/400x160?text=IoT+Device"
                />
              </Card.Section>

              <Stack gap="xs" mt="md">
                <Group justify="space-between" align="flex-start">
                  <Text fw={600} size="md" style={{ flex: 1 }}>
                    {device.name}
                  </Text>
                  <Badge
                    color={categoryColors[device.category] || 'gray'}
                    variant="light"
                    size="sm"
                  >
                    {categoryLabels[device.category] || device.category}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={2}>
                  {device.description}
                </Text>

                <Group gap={4}>
                  {device.metrics.map((m) => (
                    <Badge key={m.id} variant="dot" size="sm" color="violet">
                      {m.parameter}
                    </Badge>
                  ))}
                </Group>

                <Divider my="xs" />

                {device.metrics.map((metric) => {
                  const levels = getMetricScaleLevels(metric);
                  return (
                    <Stack key={metric.id} gap={6}>
                      <Text size="xs" fw={600} c="dimmed" tt="uppercase">
                        {metric.parameter} ({metric.unit})
                      </Text>
                      <ScrollArea type="auto" offsetScrollbars>
                        <Group gap={6} wrap="nowrap" pb={4}>
                          {levels.map((level) => (
                            <Button
                              key={level.status}
                              size="compact-xs"
                              color={level.color}
                              variant="light"
                              style={{ flexShrink: 0 }}
                              onClick={() => handleScaleAction(device.id, metric.id, level.status)}
                            >
                              {level.label}
                            </Button>
                          ))}
                        </Group>
                      </ScrollArea>
                    </Stack>
                  );
                })}

                <Button
                  variant="subtle"
                  size="xs"
                  mt="xs"
                  onClick={() => dispatch({ type: 'device/SELECT', payload: { deviceId: device.id } })}
                >
                  View &amp; analyze
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
