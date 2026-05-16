// ─── Batch Detail Page ────────────────────────────────────────
// Shows detailed view of a single batch with charts, sensor cards,
// AI analysis, alerts, and readings. All mutations go through effects.

import {
  Card, Text, Group, Badge, Stack, Box, Center, Grid,
  SimpleGrid, Skeleton, Button, Anchor,
  Progress, Divider, ActionIcon, Tooltip as MantineTooltip,
} from '@mantine/core';
import {
  IconArrowLeft, IconBolt, IconFlask,
  IconThermometer, IconWeight, IconWind,
  IconHistory, IconPencil,
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
import { AlertDetailCard } from './AlertDetailCard';
import { EditBatchModal } from './EditBatchModal';
import { BatchReadingHistory } from './readings/BatchReadingHistory';
import {
  analysisTimestamp,
  getLatestAnalysis,
  getPastAnalysisHistory,
} from './analysisDisplay';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);
  const [editBatchOpened, setEditBatchOpened] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch({ type: 'batch/SELECT', payload: { batchId: id } });
      effects.fetchBatch(id).then(b => {
        setBatch(b);
        setLoading(false);
      });
      effects.fetchAnalysis(id);
      effects.fetchAnalysisHistory(id);
      effects.fetchReadings(id);
    }
  }, [id]);

  // ── Handlers ────────────────────────────────────────────────

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

  const analysisHistory = state.analysisHistory;
  const latestAnalysis = getLatestAnalysis(state.batchAnalysis, analysisHistory);
  const pastAnalysisHistory = getPastAnalysisHistory(state.batchAnalysis, analysisHistory);
  const analysisFromArchive = !state.batchAnalysis && latestAnalysis != null;
  const readings = state.readings;
  const batchAlertHistory = state.alerts
    .filter(a => a.batch === id)
    .sort((a, b) => {
      if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
  const unackBatchAlerts = batchAlertHistory.filter(a => !a.resolved);

  const formatAnalysisDate = (entry: { createdAt?: string; created?: string }) => {
    const raw = analysisTimestamp(entry);
    return raw ? new Date(raw).toLocaleString() : '—';
  };

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
              <Group gap="xs" mb={4} align="center">
                <Text size="xl" fw={800}>{batch.name}</Text>
                <MantineTooltip label="Edit name & notes">
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    onClick={() => setEditBatchOpened(true)}
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                </MantineTooltip>
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
                <Card.Section withBorder inheritPadding py="xs">
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
                      <Text size="sm" c="dimmed">No sensor data yet</Text>
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

              {id && (
                <BatchReadingHistory
                  batchId={id}
                  maxRows={20}
                  hint={
                    <Text size="xs" c="dimmed" mt={4}>
                      To record readings, use{' '}
                      <Anchor component={Link} to={`/demo/${id}`} size="xs">
                        Sensor Demo
                      </Anchor>
                    </Text>
                  }
                />
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
                  <Group gap="xs">
                    {pastAnalysisHistory.length > 0 && (
                      <Button
                        size="compact-xs"
                        variant={showAnalysisHistory ? 'light' : 'subtle'}
                        color="gray"
                        leftSection={<IconHistory size={12} />}
                        onClick={() => setShowAnalysisHistory(v => !v)}
                      >
                        History ({pastAnalysisHistory.length})
                      </Button>
                    )}
                    {latestAnalysis && (
                      <Badge
                        size="xs"
                        variant="light"
                        color={RISK_CONFIG[latestAnalysis.riskLevel]?.color.split('.')[0] ?? 'green'}
                      >
                        {RISK_CONFIG[latestAnalysis.riskLevel]?.label ?? 'Safe'}
                      </Badge>
                    )}
                  </Group>
                </Group>

                {!latestAnalysis ? (
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
                    {analysisFromArchive && (
                      <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                        Latest archived report
                      </Text>
                    )}
                    <Box>
                      <Group justify="space-between" mb={6}>
                        <Text size="xs" fw={600}>{latestAnalysis.stage}</Text>
                        <Text size="xs" ff="'Space Mono', monospace" c="dimmed">
                          {latestAnalysis.stageNumber}/{latestAnalysis.totalStages}
                        </Text>
                      </Group>
                      <Progress
                        value={(latestAnalysis.stageNumber / latestAnalysis.totalStages) * 100}
                        color="forest-green"
                        size="sm"
                        radius="md"
                      />
                    </Box>

                    {latestAnalysis.estimatedHoursRemaining != null && (
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Est. remaining</Text>
                        <Text size="xs" fw={700} ff="'Space Mono', monospace">
                          {latestAnalysis.estimatedHoursRemaining.toFixed(1)}h
                        </Text>
                      </Group>
                    )}

                    {latestAnalysis.predictedScore != null && (
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Predicted score</Text>
                        <Text size="md" fw={800} c="muted-gold.6" ff="'Space Mono', monospace">
                          {latestAnalysis.predictedScore.toFixed(1)}
                        </Text>
                      </Group>
                    )}

                    <Divider />

                    <Text size="xs" c="dimmed" lh={1.6}>
                      {latestAnalysis.recommendation}
                    </Text>

                    {analysisTimestamp(latestAnalysis) && (
                      <Text fz={9} c="dimmed" ff="'Space Mono', monospace" opacity={0.6}>
                        Updated {formatAnalysisDate(latestAnalysis)}
                      </Text>
                    )}

                    <Button
                      size="xs"
                      variant="outline"
                      leftSection={<IconBolt size={14} />}
                      loading={analyzing}
                      onClick={handleAnalyze}
                    >
                      Run new analysis
                    </Button>
                  </Stack>
                )}

                {showAnalysisHistory && pastAnalysisHistory.length > 0 && (
                  <>
                    <Divider my="md" />
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="sm">
                      Past Reports
                    </Text>
                    <Stack gap="sm">
                      {pastAnalysisHistory.map(entry => (
                        <Box
                          key={entry.id}
                          p="sm"
                          bg="warm-ivory.0"
                          style={{ borderRadius: 'var(--mantine-radius-sm)' }}
                        >
                          <Group justify="space-between" mb={4}>
                            <Text size="xs" fw={600}>{entry.stage}</Text>
                            <Badge
                              size="xs"
                              variant="light"
                              color={RISK_CONFIG[entry.riskLevel]?.color.split('.')[0] ?? 'gray'}
                            >
                              {RISK_CONFIG[entry.riskLevel]?.label ?? entry.riskLevel}
                            </Badge>
                          </Group>
                          <Text size="xs" c="dimmed" lh={1.5} lineClamp={3}>
                            {entry.recommendation}
                          </Text>
                          <Text fz={9} c="dimmed" ff="'Space Mono', monospace" mt={6} opacity={0.7}>
                            {formatAnalysisDate(entry)}
                          </Text>
                        </Box>
                      ))}
                    </Stack>
                  </>
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
                  {unackBatchAlerts.length > 0 && (
                    <Badge size="xs" color="red" variant="filled" circle>
                      {unackBatchAlerts.length}
                    </Badge>
                  )}
                </Group>

                {batchAlertHistory.length === 0 ? (
                  <Text size="xs" c="dimmed" ta="center" py="sm">No alerts</Text>
                ) : (
                  <Stack gap="xs">
                    {batchAlertHistory.map(alert => (
                      <AlertDetailCard
                        key={alert.id}
                        alert={alert}
                        showAck
                        onAck={() => effects.resolveAlert(alert.id)}
                      />
                    ))}
                  </Stack>
                )}
              </Card>

              {/* Batch Details */}
              <Card withBorder>
                <Group justify="space-between" mb="md">
                  <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                    Details
                  </Text>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    onClick={() => setEditBatchOpened(true)}
                  >
                    <IconPencil size={14} />
                  </ActionIcon>
                </Group>
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
                  <Box>
                    <Text size="xs" c="dimmed">Notes</Text>
                    <Text size="xs" lh={1.6} c={batch.notes ? undefined : 'dimmed'}>
                      {batch.notes || 'No notes yet'}
                    </Text>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>

      <EditBatchModal
        batch={batch}
        opened={editBatchOpened}
        onClose={() => setEditBatchOpened(false)}
        onSaved={setBatch}
      />
    </Box>
  );
}
