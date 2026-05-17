// ─── Dashboard Page ───────────────────────────────────────────
// Main dashboard with stat cards, active batches, and recent alerts.
// Matches the reference site's Dashboard design using Mantine UI.

import {
  Card, Text, Group, Grid, Badge, Stack, Box,
  SimpleGrid, Skeleton, Center,
} from '@mantine/core';
import {
  IconActivity, IconAlertTriangle, IconCircleCheck, IconTrendingUp,
  IconFlask,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../state/store';
import type { BatchRecord, AlertSeverity } from '../state/Model';
import { AlertGuidelineButton } from './AlertGuidelineModal';

// ─── Process Colors ───────────────────────────────────────────
const PROCESS_COLORS: Record<string, string> = {
  washed: 'blue',
  natural: 'yellow',
  honey: 'orange',
  anaerobic: 'violet',
};

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, sub, color }: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  sub?: string;
  color?: string;
}) {
  return (
    <Card shadow="xs" padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="flex-start">
        <Box>
          <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
            {label}
          </Text>
          <Text size="xl" fw={800} mt={4} c={color}>
            {value}
          </Text>
          {sub && (
            <Text size="xs" c="dimmed" mt={2}>
              {sub}
            </Text>
          )}
        </Box>
        <Box
          bg="warm-ivory.3"
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
            flexShrink: 0,
          }}
        >
          <Icon size={18} stroke={1.5} color="var(--mantine-color-dimmed)" />
        </Box>
      </Group>
    </Card>
  );
}

// ─── Batch Row ────────────────────────────────────────────────
function BatchRow({ batch }: { batch: BatchRecord }) {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      padding="md"
      style={{ cursor: 'pointer', transition: 'box-shadow 0.15s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--mantine-shadow-md)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
      onClick={() => navigate(`/batches/${batch.id}`)}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group gap="xs" mb={4}>
            <Box
              w={8} h={8}
              bg={PROCESS_COLORS[batch.processType] ?? 'gray'}
              style={{ borderRadius: '50%', flexShrink: 0 }}
            />
            <Text size="sm" fw={600} truncate>
              {batch.name}
            </Text>
            {batch.currentStage && (
              <Badge size="xs" variant="outline" tt="capitalize" ff="'Space Mono', monospace">
                {batch.currentStage}
              </Badge>
            )}
            <Badge size="xs" variant="light" color={PROCESS_COLORS[batch.processType]} tt="capitalize">
              {batch.processType}
            </Badge>
          </Group>
          <Group gap="lg" mt={6}>
            <Metric label="pH" value={batch.latestPh?.toFixed(2)} />
            <Metric label="°C" value={batch.latestTemp?.toFixed(1)} />
            <Metric label="kg" value={batch.latestWeight?.toFixed(1)} />
            <Metric label="CO₂%" value={batch.latestCo2?.toFixed(0)} />
          </Group>
        </Box>
        {batch.predictedScore != null && (
          <Box ta="right" style={{ flexShrink: 0 }}>
            <Text size="xs" c="dimmed" ff="'Space Mono', monospace">score</Text>
            <Text size="lg" fw={800} c="muted-gold.6">
              {batch.predictedScore.toFixed(1)}
            </Text>
          </Box>
        )}
      </Group>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value?: string | null }) {
  return (
    <Box>
      <Text fz={9} c="dimmed" ff="'Space Mono', monospace">{label}</Text>
      <Text size="sm" fw={700} ff="'Space Mono', monospace">{value ?? '—'}</Text>
    </Box>
  );
}

// ─── Alert Row (compact) ──────────────────────────────────────
function AlertRow({ alert }: { alert: any }) {
  const severity = alert.severity as AlertSeverity;
  const borderColor: Record<AlertSeverity, string> = {
    critical: 'red.5',
    high: 'orange.5',
    medium: 'yellow.5',
    low: 'blue.5',
  };

  return (
    <Box
      p="sm"
      style={{
        borderRadius: 'var(--mantine-radius-sm)',
        backgroundColor: '#ffffff',
        border: '1px solid var(--mantine-color-gray-3)',
        borderLeft: `3px solid var(--mantine-color-${borderColor[severity] ?? 'gray-5'})`,
      }}
    >
      <Text size="xs" fw={600} tt="capitalize" mb={2}>
        {(alert.type as string || '').replace(/_/g, ' ')}
      </Text>
      <Text size="xs" c="dimmed" lineClamp={2}>
        {alert.message}
      </Text>
    </Box>
  );
}

// ─── Dashboard Page Component ─────────────────────────────────
export function DashboardPage() {
  const state = useStore();
  const navigate = useNavigate();

  const activeBatches = state.batches.filter(b => b.status === 'active');
  const summary = state.summary;

  return (
    <Box p="xl" maw={1100} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Box>
          <Text size="xl" fw={800} lh={1.2}>
            Fermentation Copilot
          </Text>
          <Text size="xs" c="dimmed" ff="'Space Mono', monospace" mt={2}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </Text>
        </Box>

        {/* Stat Cards */}
        {state.loading && !summary ? (
          <SimpleGrid cols={{ base: 2, lg: 4 }} spacing="md">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={100} radius="md" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 2, lg: 4 }} spacing="md">
            <StatCard
              label="Active Batches"
              value={summary?.activeBatches ?? activeBatches.length}
              icon={IconActivity}
              sub="currently fermenting"
              color="var(--mantine-color-forest-green-6)"
            />
            <StatCard
              label="Completed"
              value={summary?.completedBatches ?? 0}
              icon={IconCircleCheck}
              sub="all time"
            />
            <StatCard
              label="Unack Alerts"
              value={summary?.unacknowledgedAlerts ?? 0}
              icon={IconAlertTriangle}
              sub="need attention"
              color={(summary?.unacknowledgedAlerts ?? 0) > 0 ? 'var(--mantine-color-red-6)' : undefined}
            />
            <StatCard
              label="Avg Score"
              value={summary?.avgPredictedScore != null ? summary.avgPredictedScore.toFixed(1) : '—'}
              icon={IconTrendingUp}
              sub="predicted quality"
              color="var(--mantine-color-muted-gold-6)"
            />
          </SimpleGrid>
        )}

        {/* Main Content Grid */}
        <Grid gutter="lg">
          {/* Active Batches (2/3 width) */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="xs" fw={600} tt="uppercase" lts="0.08em" c="dimmed" ff="'Space Mono', monospace">
                  Active Batches
                </Text>
                <Text
                  size="xs" c="forest-green.6" style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/batches')}
                >
                  View all →
                </Text>
              </Group>

              {state.loading && state.batches.length === 0 ? (
                <Stack gap="xs">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} height={80} radius="md" />
                  ))}
                </Stack>
              ) : activeBatches.length === 0 ? (
                <Card withBorder p="xl">
                  <Center>
                    <Stack align="center">
                      <IconFlask size={32} color="var(--mantine-color-dimmed)" />
                      <Text size="sm" c="dimmed">No active batches</Text>
                      <Text
                        size="xs"
                        c="forest-green.6"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/batches')}
                      >
                        Go to Batches →
                      </Text>
                    </Stack>
                  </Center>
                </Card>
              ) : (
                <Stack gap="xs">
                  {activeBatches.slice(0, 5).map(batch => (
                    <BatchRow key={batch.id} batch={batch} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar (1/3 width) */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="lg">
              {/* Process Breakdown */}
              {summary?.processByType && summary.processByType.length > 0 && (
                <Stack gap="xs">
                  <Text size="xs" fw={600} tt="uppercase" lts="0.08em" c="dimmed" ff="'Space Mono', monospace">
                    By Process
                  </Text>
                  <Card withBorder p="md">
                    <Stack gap="xs">
                      {summary.processByType.map(p => (
                        <Group key={p.processType} justify="space-between">
                          <Group gap="xs">
                            <Box
                              w={8} h={8}
                              bg={PROCESS_COLORS[p.processType] ?? 'gray'}
                              style={{ borderRadius: '50%' }}
                            />
                            <Text size="sm" tt="capitalize">{p.processType}</Text>
                          </Group>
                          <Text size="sm" fw={700} ff="'Space Mono', monospace">{p.count}</Text>
                        </Group>
                      ))}
                    </Stack>
                  </Card>
                </Stack>
              )}

              {/* Recent Alerts */}
              <Stack gap="xs">
                <Group justify="space-between">
                  <Group gap="xs">
                    <Text size="xs" fw={600} tt="uppercase" lts="0.08em" c="dimmed" ff="'Space Mono', monospace">
                      Recent Alerts
                    </Text>
                    <AlertGuidelineButton size={12} />
                  </Group>
                  <Text
                    size="xs" c="forest-green.6" style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/alerts')}
                  >
                    View all →
                  </Text>
                </Group>

                {state.loading ? (
                  <Skeleton height={120} radius="md" />
                ) : (summary?.recentAlerts?.length ?? 0) === 0 ? (
                  <Card withBorder p="md">
                    <Center>
                      <Stack align="center" gap={4}>
                        <IconCircleCheck size={20} color="var(--mantine-color-muted-gold-6)" />
                        <Text size="xs" c="dimmed">No unacknowledged alerts</Text>
                      </Stack>
                    </Center>
                  </Card>
                ) : (
                  <Stack gap={6}>
                    {summary!.recentAlerts.map(alert => (
                      <AlertRow key={alert.id} alert={alert} />
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
}
