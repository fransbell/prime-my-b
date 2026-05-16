// ─── Batch Reading Panel ────────────────────────────────────────
// Form + readings history for a single batch. Used by the sensor demo.

import { useCallback, useEffect, useState } from 'react';
import {
  Card, Text, Group, Stack, Box, Button, Table, NumberInput, SimpleGrid, Center,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useStore, dispatch } from '../../state/store';
import { createEffects, type Effects } from '../../effects';
import type { BatchRecord } from '../../state/Model';
import {
  METRIC_PLACEHOLDERS,
  getMetricDefaults,
  resolveMetric,
  type BatchReadingMetrics,
} from './readingMetrics';

const effects: Effects = createEffects(dispatch as any);

interface BatchReadingPanelProps {
  batchId: string;
  batch: BatchRecord;
}

export function BatchReadingPanel({ batchId, batch }: BatchReadingPanelProps) {
  const state = useStore();
  const readings = state.readings;
  const canEdit = batch.status === 'active';

  const [ph, setPh] = useState<string | number>('');
  const [temperature, setTemperature] = useState<string | number>('');
  const [weight, setWeight] = useState<string | number>('');
  const [co2, setCo2] = useState<string | number>('');
  const [selectedReadingId, setSelectedReadingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fillFormFromReading = useCallback((reading: BatchReadingMetrics) => {
    const values = getMetricDefaults(batch, reading);
    setPh(values.ph);
    setTemperature(values.temperature);
    setWeight(values.weight);
    setCo2(values.co2);
    setSelectedReadingId(reading.id ?? null);
  }, [batch]);

  const applyReadingDefaults = useCallback((
    b: BatchRecord,
    list: BatchReadingMetrics[],
  ) => {
    const latest = list[0];
    if (latest) {
      const values = getMetricDefaults(b, latest);
      setPh(values.ph);
      setTemperature(values.temperature);
      setWeight(values.weight);
      setCo2(values.co2);
      setSelectedReadingId(latest.id ?? null);
    } else {
      const values = getMetricDefaults(b);
      setPh(values.ph);
      setTemperature(values.temperature);
      setWeight(values.weight);
      setCo2(values.co2);
      setSelectedReadingId(null);
    }
  }, []);

  useEffect(() => {
    setSelectedReadingId(null);
    effects.fetchReadings(batchId);
  }, [batchId]);

  useEffect(() => {
    applyReadingDefaults(batch, readings as BatchReadingMetrics[]);
  }, [batch, readings[0]?.id, applyReadingDefaults, readings]);

  const handleSubmit = async () => {
    const latest = readings[0] as BatchReadingMetrics | undefined;
    const defaults = getMetricDefaults(batch, latest);

    const data = {
      ph: resolveMetric(ph, defaults.ph),
      temperature: resolveMetric(temperature, defaults.temperature),
      weight: resolveMetric(weight, defaults.weight),
      co2: resolveMetric(co2, defaults.co2),
    };

    setSubmitting(true);
    await effects.addReading(batchId, data);
    applyReadingDefaults(batch, useStore.getState().readings as BatchReadingMetrics[]);
    setSubmitting(false);
  };

  return (
    <Stack gap="md">
      {canEdit ? (
        <Card withBorder padding="lg" radius="md">
          <Text fw={700} mb="xs">Record new reading</Text>
          <Text size="xs" c="dimmed" mb="md">
            Empty fields use the last reading or demo defaults. Click a row below to copy values.
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
            <NumberInput
              label="pH"
              placeholder={String(METRIC_PLACEHOLDERS.ph)}
              step={0.01}
              min={0}
              max={14}
              decimalScale={2}
              value={ph === '' ? '' : Number(ph)}
              onChange={(v) => setPh(v === '' || v == null ? '' : v)}
            />
            <NumberInput
              label="Temp °C"
              placeholder={String(METRIC_PLACEHOLDERS.temperature)}
              step={0.1}
              decimalScale={1}
              value={temperature === '' ? '' : Number(temperature)}
              onChange={(v) => setTemperature(v === '' || v == null ? '' : v)}
            />
            <NumberInput
              label="Weight kg"
              placeholder={String(METRIC_PLACEHOLDERS.weight)}
              step={0.01}
              decimalScale={2}
              value={weight === '' ? '' : Number(weight)}
              onChange={(v) => setWeight(v === '' || v == null ? '' : v)}
            />
            <NumberInput
              label="CO₂ %"
              placeholder={String(METRIC_PLACEHOLDERS.co2)}
              step={0.1}
              min={0}
              max={100}
              decimalScale={1}
              value={co2 === '' ? '' : Number(co2)}
              onChange={(v) => setCo2(v === '' || v == null ? '' : v)}
            />
          </SimpleGrid>
          <Button
            mt="md"
            leftSection={<IconRefresh size={16} />}
            loading={submitting}
            onClick={handleSubmit}
            bg="forest-green.6"
          >
            Save reading
          </Button>
        </Card>
      ) : (
        <Card withBorder padding="md" bg="gray.0">
          <Text size="sm" c="dimmed" ta="center">
            This batch is {batch.status} — new readings cannot be added.
          </Text>
        </Card>
      )}

      <Card withBorder padding={0} radius="md" style={{ overflow: 'hidden' }}>
        <Box px="lg" py="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
          <Group justify="space-between">
            <Text fw={700}>Reading history</Text>
            <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
              {readings.length} total
            </Text>
          </Group>
        </Box>

        {readings.length === 0 ? (
          <Center py="xl">
            <Text size="sm" c="dimmed">No readings yet</Text>
          </Center>
        ) : (
          <Box style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Time</Table.Th>
                  <Table.Th ta="right">pH</Table.Th>
                  <Table.Th ta="right">°C</Table.Th>
                  <Table.Th ta="right">kg</Table.Th>
                  <Table.Th ta="right">CO₂%</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {readings.map(r => (
                  <Table.Tr
                    key={r.id}
                    style={{ cursor: canEdit ? 'pointer' : undefined }}
                    bg={selectedReadingId === r.id ? 'forest-green.0' : undefined}
                    onClick={() => {
                      if (canEdit) fillFormFromReading(r as BatchReadingMetrics);
                    }}
                  >
                    <Table.Td>
                      <Text size="sm" ff="'Space Mono', monospace">
                        {new Date(r.timestamp).toLocaleString([], {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="sm" fw={600} ff="'Space Mono', monospace">
                        {(r as BatchReadingMetrics).ph?.toFixed(2) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="sm" ff="'Space Mono', monospace">
                        {(r as BatchReadingMetrics).temperature?.toFixed(1) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="sm" ff="'Space Mono', monospace">
                        {(r as BatchReadingMetrics).weight?.toFixed(2) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="sm" ff="'Space Mono', monospace">
                        {(r as BatchReadingMetrics).co2?.toFixed(0) ?? '—'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        )}
      </Card>
    </Stack>
  );
}
