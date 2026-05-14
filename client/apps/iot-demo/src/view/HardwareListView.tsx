// ─── IoT Demo — View: Hardware List ───────────────────────────
// Displays all IoT devices as a card grid with device images,
// category badges, and metric previews.
// Elm Architecture: receives (state, dispatch) — no local state.

import {
  SimpleGrid, Card, Image, Text, Badge, Group, Stack, Title, Container,
} from '@mantine/core';
import type { AppState } from '../state/Model';
import type { AppAction } from '../state/Actions';
import { devices as deviceCatalog, categoryLabels, categoryColors } from '../data/devices';

interface HardwareListViewProps {
  state: AppState;
  dispatch: (a: AppAction) => void;
}

export function HardwareListView({ dispatch }: HardwareListViewProps) {
  return (
    <Container size="lg">
      <Stack gap="lg">
        {/* Header */}
        <Stack gap={4}>
          <Title order={2}>IoT Hardware Catalog</Title>
          <Text size="sm" c="dimmed">
            Select a device to explore its measurable metrics and run a live demo
          </Text>
        </Stack>

        {/* Device Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {deviceCatalog.map((device) => (
            <Card
              key={device.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
              onClick={() => dispatch({ type: 'device/SELECT', payload: { deviceId: device.id } })}
            >
              <Card.Section>
                <Image
                  src={device.imageUrl}
                  height={180}
                  alt={device.name}
                  fallbackSrc="https://placehold.co/400x200?text=IoT+Device"
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

                <Group gap={4} mt="xs">
                  <Badge variant="outline" size="sm" color="violet">
                    {device.metrics.length} metric{device.metrics.length > 1 ? 's' : ''}
                  </Badge>
                  {device.metrics.map((m) => (
                    <Badge key={m.id} variant="dot" size="sm" color="gray">
                      {m.parameter}
                    </Badge>
                  ))}
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
