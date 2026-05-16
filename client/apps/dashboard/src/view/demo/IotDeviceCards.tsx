// ─── IoT device cards — image + vertical scale actions ─────────

import {
  SimpleGrid, Card, Image, Text, Badge, Group, Stack, Title, Box,
} from '@mantine/core';
import { demoIotDevices, type DemoIotDevice } from './iotDevices';
import { MetricScaleButtons } from './MetricScaleButtons';
import type { BatchMetricKey, IotScale } from '../readings/readingMetrics';

interface IotDeviceCardsProps {
  onDeviceScale: (batchKey: BatchMetricKey, scale: IotScale, device: DemoIotDevice) => void;
  activeScales: Record<BatchMetricKey, IotScale>;
}

const IMAGE_BOX_H = 160;

export function IotDeviceCards({ onDeviceScale, activeScales }: IotDeviceCardsProps) {
  return (
    <Stack gap="sm">
      <Stack gap={4}>
        <Title order={5}>IoT devices</Title>
        <Text size="xs" c="dimmed">
          Pick a scale step (Dead → Ideal) to auto-fill the linked field in the recording form.
        </Text>
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }} spacing="md">
        {demoIotDevices.map((device) => (
          <Card key={device.id} shadow="sm" padding="md" radius="md" withBorder>
            <Group align="stretch" wrap="nowrap" gap="md">
              <Box
                w={{ base: 100, sm: 112 }}
                mih={IMAGE_BOX_H}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--mantine-color-gray-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={device.imageUrl}
                  alt={device.name}
                  fit="contain"
                  w="100%"
                  h={IMAGE_BOX_H}
                  fallbackSrc="https://placehold.co/112x160?text=Sensor"
                />
              </Box>

              <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                  <Text fw={600} size="sm" lineClamp={2} style={{ flex: 1 }}>
                    {device.name}
                  </Text>
                  <Badge variant="light" size="sm" style={{ flexShrink: 0 }}>
                    {device.category}
                  </Badge>
                </Group>
                <Badge variant="outline" color="violet" size="sm" w="fit-content">
                  {device.metricLabel}
                </Badge>
                <MetricScaleButtons
                  orientation="vertical"
                  activeScale={activeScales[device.batchKey]}
                  onSelect={(scale) => onDeviceScale(device.batchKey, scale, device)}
                />
              </Stack>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
