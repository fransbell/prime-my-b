// ─── Batch Reading Panel — tabbed detail + new recording (demo /demo) ──

import { useCallback, useEffect, useState } from 'react';
import {
  Card, Text, Group, Stack, Box, Button, Table, NumberInput, Center, Paper, Tabs,
  Badge, Title, ScrollArea,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useStore, dispatch } from '../../state/store';
import { createEffects, type Effects } from '../../effects';
import type { BatchRecord, BatchStatus } from '../../state/Model';
import { IotDeviceCards } from '../demo/IotDeviceCards';
import type { DemoIotDevice } from '../demo/iotDevices';
import { getDeviceScaleValue } from '../demo/iotDevices';
import {
  METRIC_PLACEHOLDERS,
  getMetricDefaults,
  resolveMetric,
  defaultMetricScales,
  type BatchReadingMetrics,
  type BatchMetricKey,
  type IotScale,
  type MetricScales,
} from './readingMetrics';

const effects: Effects = createEffects(dispatch as any);

const STATUS_COLOR: Record<BatchStatus, string> = {
  active: 'green',
  completed: 'gray',
  paused: 'yellow',
  failed: 'red',
};

const METRIC_LABELS: Record<BatchMetricKey, string> = {
  ph: 'pH',
  temperature: 'Temp °C',
  weight: 'Weight kg',
  co2: 'CO₂ %',
};

interface BatchReadingPanelProps {
  batchId: string;
  batch: BatchRecord;
}

export function BatchReadingPanel({ batchId, batch }: BatchReadingPanelProps) {
  const state = useStore();
  const readings = state.readings;
  const canEdit = batch.status === 'active';

  const [activeTab, setActiveTab] = useState<string | null>('detail');
  const [ph, setPh] = useState<string | number>('');
  const [temperature, setTemperature] = useState<string | number>('');
  const [weight, setWeight] = useState<string | number>('');
  const [co2, setCo2] = useState<string | number>('');
  const [metricScales, setMetricScales] = useState<MetricScales>(defaultMetricScales);
  const [selectedReadingId, setSelectedReadingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const applyDefaults = useCallback(() => {
    const values = getMetricDefaults(batch);
    setPh(values.ph);
    setTemperature(values.temperature);
    setWeight(values.weight);
    setCo2(values.co2);
  }, [batch]);

  const setField = useCallback((key: BatchMetricKey, value: number) => {
    switch (key) {
      case 'ph':
        setPh(value);
        break;
      case 'temperature':
        setTemperature(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'co2':
        setCo2(value);
        break;
    }
  }, []);

  const handleDeviceScale = useCallback((
    batchKey: BatchMetricKey,
    scale: IotScale,
    device: DemoIotDevice,
  ) => {
    setMetricScales((prev) => ({ ...prev, [batchKey]: scale }));
    setField(batchKey, getDeviceScaleValue(device, scale));
    setActiveTab('record');
  }, [setField]);

  const fillFormFromReading = useCallback((reading: BatchReadingMetrics) => {
    const values = getMetricDefaults(batch, reading);
    setPh(values.ph);
    setTemperature(values.temperature);
    setWeight(values.weight);
    setCo2(values.co2);
    setSelectedReadingId(reading.id ?? null);
    setActiveTab('record');
  }, [batch]);

  useEffect(() => {
    setSelectedReadingId(null);
    setMetricScales(defaultMetricScales());
    setActiveTab('detail');
    effects.fetchReadings(batchId);
  }, [batchId]);

  useEffect(() => {
    applyDefaults();
  }, [batchId, batch.id, applyDefaults]);

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
    applyDefaults();
    setMetricScales(defaultMetricScales());
    setSelectedReadingId(null);
    setSubmitting(false);
    setActiveTab('detail');
  };

  const readingHistory = (
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
  );

  const batchDetailTab = (
    <Stack gap="md">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Box>
          <Text size="xs" c="forest-green.6" fw={600} tt="uppercase" lts="0.08em">
            Batch detail
          </Text>
          <Title order={3} mt={4}>{batch.name}</Title>
          <Group gap="xs" mt="xs">
            <Badge variant="outline" tt="capitalize">{batch.processType}</Badge>
            <Badge color={STATUS_COLOR[batch.status]} tt="capitalize">{batch.status}</Badge>
            {batch.coffeeVariety && (
              <Text size="sm" c="dimmed">{batch.coffeeVariety}</Text>
            )}
          </Group>
        </Box>
        <Group gap="lg">
          <Box ta="right">
            <Text size="xs" c="dimmed">Latest pH</Text>
            <Text size="lg" fw={800} ff="'Space Mono', monospace">
              {batch.latestPh?.toFixed(2) ?? '—'}
            </Text>
          </Box>
          <Box ta="right">
            <Text size="xs" c="dimmed">Latest °C</Text>
            <Text size="lg" fw={800} ff="'Space Mono', monospace">
              {batch.latestTemp?.toFixed(1) ?? '—'}
            </Text>
          </Box>
          <Box ta="right">
            <Text size="xs" c="dimmed">Latest kg</Text>
            <Text size="lg" fw={800} ff="'Space Mono', monospace">
              {batch.latestWeight?.toFixed(2) ?? '—'}
            </Text>
          </Box>
          <Box ta="right">
            <Text size="xs" c="dimmed">Latest CO₂%</Text>
            <Text size="lg" fw={800} ff="'Space Mono', monospace">
              {batch.latestCo2?.toFixed(0) ?? '—'}
            </Text>
          </Box>
        </Group>
      </Group>

      {readingHistory}

      {canEdit && (
        <Text size="xs" c="dimmed">
          Click a history row to copy values into the New recording tab.
        </Text>
      )}
    </Stack>
  );

  const newRecordingTab = canEdit ? (
    <Stack gap="md">
      <Box>
        <Text fw={700} mb={4}>Record new reading</Text>
        <Text size="xs" c="dimmed" mb="md">
          Enter values directly or use IoT device scales below to auto-fill a field.
        </Text>
        <Group align="flex-end" wrap="nowrap" gap="sm" grow>
          <NumberInput
            label={METRIC_LABELS.ph}
            placeholder={String(METRIC_PLACEHOLDERS.ph)}
            step={0.01}
            min={0}
            max={14}
            decimalScale={2}
            value={ph === '' ? '' : Number(ph)}
            onChange={(v) => setPh(v === '' || v == null ? '' : v)}
            styles={{ root: { flex: 1, minWidth: 72 } }}
          />
          <NumberInput
            label={METRIC_LABELS.temperature}
            placeholder={String(METRIC_PLACEHOLDERS.temperature)}
            step={0.1}
            decimalScale={1}
            value={temperature === '' ? '' : Number(temperature)}
            onChange={(v) => setTemperature(v === '' || v == null ? '' : v)}
            styles={{ root: { flex: 1, minWidth: 72 } }}
          />
          <NumberInput
            label={METRIC_LABELS.weight}
            placeholder={String(METRIC_PLACEHOLDERS.weight)}
            step={0.01}
            decimalScale={2}
            value={weight === '' ? '' : Number(weight)}
            onChange={(v) => setWeight(v === '' || v == null ? '' : v)}
            styles={{ root: { flex: 1, minWidth: 72 } }}
          />
          <NumberInput
            label={METRIC_LABELS.co2}
            placeholder={String(METRIC_PLACEHOLDERS.co2)}
            step={0.1}
            min={0}
            max={100}
            decimalScale={1}
            value={co2 === '' ? '' : Number(co2)}
            onChange={(v) => setCo2(v === '' || v == null ? '' : v)}
            styles={{ root: { flex: 1, minWidth: 72 } }}
          />
          <Button
            leftSection={<IconRefresh size={16} />}
            loading={submitting}
            onClick={handleSubmit}
            bg="forest-green.6"
            style={{ flexShrink: 0 }}
          >
            Save
          </Button>
        </Group>
      </Box>

      <IotDeviceCards
        activeScales={metricScales}
        onDeviceScale={handleDeviceScale}
      />
    </Stack>
  ) : (
    <Card withBorder padding="md" bg="gray.0">
      <Text size="sm" c="dimmed" ta="center">
        This batch is {batch.status} — new readings cannot be added.
      </Text>
    </Card>
  );

  return (
    <Paper
      withBorder
      radius="md"
      shadow="xs"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        <Tabs.List px="md" pt="sm" style={{ flexShrink: 0 }}>
          <Tabs.Tab value="detail">Batch detail</Tabs.Tab>
          <Tabs.Tab value="record" disabled={!canEdit}>
            New recording
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value="detail"
          pt="md"
          px="md"
          pb="md"
          style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
        >
          <ScrollArea h="100%" type="auto" offsetScrollbars>
            {batchDetailTab}
          </ScrollArea>
        </Tabs.Panel>

        <Tabs.Panel
          value="record"
          pt="md"
          px="md"
          pb="md"
          style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
        >
          <ScrollArea h="100%" type="auto" offsetScrollbars>
            {newRecordingTab}
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
