// ─── Batch Detail Page ────────────────────────────────────────
// Shows detailed view of a single batch with charts, sensor cards,
// AI analysis, alerts, and readings. All mutations go through effects.

import {
  Card, Text, Group, Badge, Stack, Box, Center, Grid,
  SimpleGrid, Skeleton, Button, Table, NumberInput,
  Progress, Divider, ActionIcon,
} from '@mantine/core';
import {
  IconArrowLeft, IconBolt, IconRefresh, IconFlask,
  IconThermometer, IconWeight, IconWind,
  IconChecks,
} from '@tabler/icons-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AlertGuidelineButton } from './AlertGuidelineModal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { BatchRecord } from '../state/Model';

const effects: Effects = createEffects(dispatch as any);

// ─── Sensor Card ──────────────────────────────────────────────
function SensorCard({ icon: Icon, label, value, unit, warn }: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  unit: string;
  warn?: boolean;
}) {
  return (
    <Card withBorder padding="md">
      <Group gap="xs" mb={4}>
        <Icon size={14} color="var(--mantine-color-dimmed)" />
        <Text fz={9} ff="'Space Mono', monospace" c="dimmed" tt="uppercase">{label}</Text>
      </Group>
      <Text
        size="xl"
        fw={800}
        ff="'Space Mono', monospace"
        c={warn ? 'red.6' : undefined}
      >
        {value ?? '—'}
        {value && (
          <Text component="span" size="sm" c="dimmed" ml={4}>{unit}</Text>
        )}
      </Text>
    </Card>
  );
}

// ─── Risk Config ──────────────────────────────────────────────
const RISK_CONFIG: Record<string, { color: string; label: string }> = {
  safe: { color: 'green.6', label: 'Safe' },
  caution: { color: 'yellow.6', label: 'Caution' },
  warning: { color: 'orange.6', label: 'Warning' },
  critical: { color: 'red.6', label: 'Critical' },
};

// ─── Severity Colors ──────────────────────────────────────────
const SEVERITY_COLORS: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
};

// ─── Custom Chart Tooltip ─────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg="white"
      p="sm"
      style={{
        border: '1px solid var(--mantine-color-warm-ivory-4)',
        borderRadius: 'var(--mantine-radius-sm)',
        boxShadow: 'var(--mantine-shadow-sm)',
        fontSize: 11,
      }}
    >
      <Text fz={10} c="dimmed" ff="'Space Mono', monospace" mb={4}>{label}</Text>
      {payload.map((entry: any) => (
        <Group key={entry.dataKey} gap={4}>
          <Box w={8} h={8} bg={entry.color} style={{ borderRadius: '50%' }} />
          <Text fz={11} ff="'Space Mono', monospace">
            {entry.dataKey}: {entry.value?.toFixed(entry.dataKey === 'pH' ? 2 : 1) ?? '—'}
          </Text>
        </Group>
      ))}
    </Box>
  );
}

export function BatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useStore();
  const [batch, setBatch] = useState<BatchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingReading, setSubmittingReading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Sensor form state
  const [ph, setPh] = useState<string | number>('');
  const [temperature, setTemperature] = useState<string | number>('');
  const [weight, setWeight] = useState<string | number>('');
  const [co2, setCo2] = useState<string | number>('');

  useEffect(() => {
    if (id) {
      dispatch({ type: 'batch/SELECT', payload: { batchId: id } });
      effects.fetchBatch(id).then(b => {
        setBatch(b);
        setLoading(false);
      });
      effects.fetchAnalysis(id);
      effects.fetchReadings(id);
    }
  }, [id]);

  // ── Handlers ────────────────────────────────────────────────

  const handleAddReading = async () => {
    if (!id) return;
    const data: Record<string, number> = {};
    if (ph !== '') data.ph = Number(ph);
    if (temperature !== '') data.temperature = Number(temperature);
    if (weight !== '') data.weight = Number(weight);
    if (co2 !== '') data.co2 = Number(co2);

    if (Object.keys(data).length === 0) return;

    setSubmittingReading(true);
    await effects.addReading(id, data);
    // Refresh batch to get updated latest* fields
    const updated = await effects.fetchBatch(id);
    if (updated) setBatch(updated);
    setSubmittingReading(false);

    // Clear form
    setPh('');
    setTemperature('');
    setWeight('');
    setCo2('');
  };

  const handleAnalyze = async () => {
    if (!id) return;
    setAnalyzing(true);
    await effects.triggerAnalysis(id);
    setAnalyzing(false);
  };

  const handleComplete = async () => {
    if (!id) return;
    await effects.completeBatch(id);
    const updated = await effects.fetchBatch(id);
    if (updated) setBatch(updated);
  };

  if (loading) {
    return (
      <Box p="xl" maw={1000} mx="auto">
        <Stack gap="md">
          <Skeleton height={32} w={200} />
          <SimpleGrid cols={4}>
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={80} />)}
          </SimpleGrid>
          <Skeleton height={280} />
        </Stack>
      </Box>
    );
  }

  if (!batch) {
    return (
      <Box p="xl" ta="center">
        <Text c="dimmed">Batch not found.</Text>
        <Button variant="outline" mt="md" onClick={() => navigate('/batches')}>
          Back to batches
        </Button>
      </Box>
    );
  }

  const analysis = state.batchAnalysis;
  const readings = state.readings;
  const batchAlerts = state.alerts.filter(a => !a.resolved).slice(0, 8);

  // Build chart data from readings (reversed so oldest → newest)
  const chartData = [...readings]
    .reverse()
    .map((r: any) => ({
      time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pH: r.ph ?? null,
      Temp: r.temperature ?? null,
    }));

  return (
    <Box p="xl" maw={1100} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap="md" align="flex-start">
            <ActionIcon
              variant="subtle" color="gray" size="sm"
              mt={4}
              onClick={() => navigate('/batches')}
            >
              <IconArrowLeft size={16} />
            </ActionIcon>
            <Box>
              <Group gap="xs" mb={4}>
                <Text size="xl" fw={800}>{batch.name}</Text>
                <Badge size="xs" variant="outline" tt="capitalize" ff="'Space Mono', monospace">
                  {batch.processType}
                </Badge>
                <Badge
                  size="xs"
                  variant={batch.status === 'active' ? 'filled' : 'light'}
                  color={batch.status === 'active' ? 'green' : 'gray'}
                  tt="capitalize"
                >
                  {batch.status}
                </Badge>
              </Group>
              {batch.coffeeVariety && (
                <Text size="sm" c="dimmed">{batch.coffeeVariety}</Text>
              )}
              <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                Started {new Date(batch.startedAt).toLocaleString()}
              </Text>
            </Box>
          </Group>
          <Group gap="xs">
            <Button
              size="xs"
              variant="outline"
              leftSection={<IconBolt size={14} />}
              loading={analyzing}
              onClick={handleAnalyze}
            >
              Analyze
            </Button>
            {batch.status === 'active' && (
              <Button
                size="xs"
                variant="light"
                onClick={handleComplete}
              >
                Complete Batch
              </Button>
            )}
          </Group>
        </Group>

        {/* Live Sensors */}
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
          <SensorCard
            icon={IconFlask}
            label="pH"
            value={batch.latestPh?.toFixed(2)}
            unit=""
            warn={batch.latestPh != null && batch.latestPh < 4.2}
          />
          <SensorCard
            icon={IconThermometer}
            label="Temperature"
            value={batch.latestTemp?.toFixed(1)}
            unit="°C"
            warn={batch.latestTemp != null && batch.latestTemp > 30}
          />
          <SensorCard
            icon={IconWeight}
            label="Weight"
            value={batch.latestWeight?.toFixed(2)}
            unit="kg"
          />
          <SensorCard
            icon={IconWind}
            label="CO₂"
            value={batch.latestCo2?.toFixed(1)}
            unit="%"
            warn={batch.latestCo2 != null && batch.latestCo2 > 70}
          />
        </SimpleGrid>

        <Grid gutter="lg">
          {/* Left Column (2/3) */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="lg">
              {/* pH & Temperature Chart */}
              <Card withBorder>
                <Card.Section withBorder inheritPadding py="xs" bg="warm-ivory.0">
                  <Group justify="space-between">
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                      pH & Temperature
                    </Text>
                    <Group gap="md">
                      <Group gap={4}>
                        <Box w={12} h={3} bg="forest-green.6" style={{ borderRadius: 2 }} />
                        <Text fz={9} c="dimmed" ff="'Space Mono', monospace">pH</Text>
                      </Group>
                      <Group gap={4}>
                        <Box w={12} h={3} bg="orange.5" style={{ borderRadius: 2 }} />
                        <Text fz={9} c="dimmed" ff="'Space Mono', monospace">°C</Text>
                      </Group>
                    </Group>
                  </Group>
                </Card.Section>

                {readings.length === 0 ? (
                  <Box h={220} bg="warm-ivory.1" style={{ borderRadius: 'var(--mantine-radius-md)', marginTop: 4 }}>
                    <Center h="100%">
                      <Text size="sm" c="dimmed">No sensor data yet — add readings below</Text>
                    </Center>
                  </Box>
                ) : (
                  <Box mt={4}>
                    <ResponsiveContainer width="100%" height={240}>
                      <LineChart
                        data={chartData}
                        margin={{ top: 8, right: 16, left: -8, bottom: 4 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--mantine-color-warm-ivory-4)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="time"
                          tick={{ fontSize: 10, fill: 'var(--mantine-color-dimmed)' }}
                          tickLine={false}
                          axisLine={{ stroke: 'var(--mantine-color-warm-ivory-4)' }}
                          interval="preserveStartEnd"
                        />
                        <YAxis
                          yAxisId="ph"
                          tick={{ fontSize: 10, fill: 'var(--mantine-color-forest-green-6)' }}
                          tickLine={false}
                          axisLine={false}
                          domain={['dataMin - 0.3', 'dataMax + 0.3']}
                          tickFormatter={(v: number) => v.toFixed(1)}
                        />
                        <YAxis
                          yAxisId="temp"
                          orientation="right"
                          tick={{ fontSize: 10, fill: 'var(--mantine-color-orange-5)' }}
                          tickLine={false}
                          axisLine={false}
                          domain={['dataMin - 2', 'dataMax + 2']}
                          tickFormatter={(v: number) => v.toFixed(0)}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Line
                          yAxisId="ph"
                          type="monotone"
                          dataKey="pH"
                          stroke="var(--mantine-color-forest-green-6)"
                          strokeWidth={2}
                          dot={{ r: 3, fill: 'var(--mantine-color-forest-green-6)', strokeWidth: 0 }}
                          activeDot={{ r: 5, fill: 'var(--mantine-color-forest-green-6)', stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                          yAxisId="temp"
                          type="monotone"
                          dataKey="Temp"
                          stroke="var(--mantine-color-orange-5)"
                          strokeWidth={2}
                          strokeDasharray="6 3"
                          dot={{ r: 3, fill: 'var(--mantine-color-orange-5)', strokeWidth: 0 }}
                          activeDot={{ r: 5, fill: 'var(--mantine-color-orange-5)', stroke: 'white', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </Card>

              {/* Simulate Sensor Reading */}
              {batch.status === 'active' && (
                <Card withBorder>
                  <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                    Add Sensor Reading
                  </Text>
                  <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
                    <NumberInput
                      label="pH"
                      placeholder="5.8"
                      step={0.01}
                      min={0} max={14}
                      size="xs"
                      value={ph === '' ? undefined : Number(ph)}
                      onChange={(v) => setPh(v === '' ? '' : v)}
                    />
                    <NumberInput
                      label="Temp °C"
                      placeholder="24.5"
                      step={0.1}
                      size="xs"
                      value={temperature === '' ? undefined : Number(temperature)}
                      onChange={(v) => setTemperature(v === '' ? '' : v)}
                    />
                    <NumberInput
                      label="Weight kg"
                      placeholder="12.5"
                      step={0.01}
                      size="xs"
                      value={weight === '' ? undefined : Number(weight)}
                      onChange={(v) => setWeight(v === '' ? '' : v)}
                    />
                    <NumberInput
                      label="CO₂ %"
                      placeholder="45"
                      step={0.1}
                      min={0} max={100}
                      size="xs"
                      value={co2 === '' ? undefined : Number(co2)}
                      onChange={(v) => setCo2(v === '' ? '' : v)}
                    />
                  </SimpleGrid>
                  <Button
                    size="xs"
                    variant="outline"
                    mt="md"
                    leftSection={<IconRefresh size={14} />}
                    loading={submittingReading}
                    onClick={handleAddReading}
                  >
                    Record Reading
                  </Button>
                </Card>
              )}

              {/* Recent Readings Table */}
              {readings.length > 0 && (
                <Card withBorder>
                  <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                    Recent Readings ({readings.length})
                  </Text>
                  <Box style={{ overflowX: 'auto' }}>
                    <Table highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th><Text size="xs" c="dimmed" ff="'Space Mono', monospace">Time</Text></Table.Th>
                          <Table.Th ta="right"><Text size="xs" c="dimmed" ff="'Space Mono', monospace">pH</Text></Table.Th>
                          <Table.Th ta="right"><Text size="xs" c="dimmed" ff="'Space Mono', monospace">°C</Text></Table.Th>
                          <Table.Th ta="right"><Text size="xs" c="dimmed" ff="'Space Mono', monospace">kg</Text></Table.Th>
                          <Table.Th ta="right"><Text size="xs" c="dimmed" ff="'Space Mono', monospace">CO₂%</Text></Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {readings.slice(0, 10).map(r => (
                          <Table.Tr key={r.id}>
                            <Table.Td>
                              <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                                {new Date(r.timestamp).toLocaleString([], {
                                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                })}
                              </Text>
                            </Table.Td>
                            <Table.Td ta="right">
                              <Text size="xs" fw={700} ff="'Space Mono', monospace">
                                {(r as any).ph?.toFixed(2) ?? '—'}
                              </Text>
                            </Table.Td>
                            <Table.Td ta="right">
                              <Text size="xs" ff="'Space Mono', monospace">
                                {(r as any).temperature?.toFixed(1) ?? '—'}
                              </Text>
                            </Table.Td>
                            <Table.Td ta="right">
                              <Text size="xs" ff="'Space Mono', monospace">
                                {(r as any).weight?.toFixed(2) ?? '—'}
                              </Text>
                            </Table.Td>
                            <Table.Td ta="right">
                              <Text size="xs" ff="'Space Mono', monospace">
                                {(r as any).co2?.toFixed(0) ?? '—'}
                              </Text>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Box>
                </Card>
              )}
            </Stack>
          </Grid.Col>

          {/* Right Column (1/3) */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="lg">
              {/* AI Analysis */}
              <Card withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                    AI Analysis
                  </Text>
                  {analysis && (
                    <Badge
                      size="xs"
                      variant="light"
                      color={RISK_CONFIG[analysis.riskLevel]?.color.split('.')[0] ?? 'green'}
                    >
                      {RISK_CONFIG[analysis.riskLevel]?.label ?? 'Safe'}
                    </Badge>
                  )}
                </Group>

                {!analysis ? (
                  <Center py="lg">
                    <Stack align="center">
                      <IconBolt size={24} color="var(--mantine-color-dimmed)" opacity={0.4} />
                      <Text size="xs" c="dimmed">No analysis yet</Text>
                      <Button size="xs" variant="outline" onClick={handleAnalyze} loading={analyzing}>
                        Run Analysis
                      </Button>
                    </Stack>
                  </Center>
                ) : (
                  <Stack gap="md">
                    <Box>
                      <Group justify="space-between" mb={6}>
                        <Text size="xs" fw={600}>{analysis.stage}</Text>
                        <Text size="xs" ff="'Space Mono', monospace" c="dimmed">
                          {analysis.stageNumber}/{analysis.totalStages}
                        </Text>
                      </Group>
                      <Progress
                        value={(analysis.stageNumber / analysis.totalStages) * 100}
                        color="forest-green"
                        size="sm"
                        radius="md"
                      />
                    </Box>

                    {analysis.estimatedHoursRemaining != null && (
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Est. remaining</Text>
                        <Text size="xs" fw={700} ff="'Space Mono', monospace">
                          {analysis.estimatedHoursRemaining.toFixed(1)}h
                        </Text>
                      </Group>
                    )}

                    {analysis.predictedScore != null && (
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Predicted score</Text>
                        <Text size="md" fw={800} c="muted-gold.6" ff="'Space Mono', monospace">
                          {analysis.predictedScore.toFixed(1)}
                        </Text>
                      </Group>
                    )}

                    <Divider />

                    <Text size="xs" c="dimmed" lh={1.6}>
                      {analysis.recommendation}
                    </Text>

                    <Text fz={9} c="dimmed" ff="'Space Mono', monospace" opacity={0.6}>
                      Updated {new Date(analysis.createdAt).toLocaleString()}
                    </Text>
                  </Stack>
                )}
              </Card>

              {/* Alerts */}
              <Card withBorder>
                <Group justify="space-between" mb="md">
                  <Group gap="xs">
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                      Alerts
                    </Text>
                    <AlertGuidelineButton size={13} />
                  </Group>
                  {batchAlerts.length > 0 && (
                    <Badge size="xs" color="red" variant="filled" circle>
                      {batchAlerts.length}
                    </Badge>
                  )}
                </Group>

                {batchAlerts.length === 0 ? (
                  <Text size="xs" c="dimmed" ta="center" py="sm">No alerts</Text>
                ) : (
                  <Stack gap="xs">
                    {batchAlerts.map(alert => (
                      <Box
                        key={alert.id}
                        p="sm"
                        style={{
                          borderRadius: 'var(--mantine-radius-sm)',
                          background: `var(--mantine-color-${SEVERITY_COLORS[alert.severity] ?? 'gray'}-0)`,
                          borderLeft: `3px solid var(--mantine-color-${SEVERITY_COLORS[alert.severity] ?? 'gray'}-5)`,
                        }}
                      >
                        <Group justify="space-between" align="flex-start" wrap="nowrap">
                          <Box style={{ flex: 1 }}>
                            <Text size="xs" fw={600} tt="capitalize" mb={2}>
                              {(alert.type as string || '').replace(/_/g, ' ')}
                            </Text>
                            <Text fz={11} c="dimmed" lh={1.4}>{alert.message}</Text>
                          </Box>
                          {!alert.resolved && (
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="gray"
                              onClick={() => effects.resolveAlert(alert.id)}
                            >
                              <IconChecks size={14} />
                            </ActionIcon>
                          )}
                        </Group>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Card>

              {/* Batch Details */}
              {(batch.notes || batch.targetFlavorProfile) && (
                <Card withBorder>
                  <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                    Details
                  </Text>
                  <Stack gap="sm">
                    {batch.targetFlavorProfile && (
                      <Box>
                        <Text size="xs" c="dimmed">Target flavor</Text>
                        <Text size="xs" fw={500}>{batch.targetFlavorProfile}</Text>
                      </Box>
                    )}
                    {batch.ambientTemp != null && (
                      <Box>
                        <Text size="xs" c="dimmed">Ambient temp</Text>
                        <Text size="xs" fw={700} ff="'Space Mono', monospace">{batch.ambientTemp}°C</Text>
                      </Box>
                    )}
                    {batch.notes && (
                      <Box>
                        <Text size="xs" c="dimmed">Notes</Text>
                        <Text size="xs" lh={1.6}>{batch.notes}</Text>
                      </Box>
                    )}
                  </Stack>
                </Card>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
}
