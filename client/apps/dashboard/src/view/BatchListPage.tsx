// ─── Batch List Page ──────────────────────────────────────────
// Lists all batches with status and process type filters.

import { useState } from 'react';
import {
  Card, Text, Group, Badge, Stack, Box, Center, Skeleton,
} from '@mantine/core';
import {
  IconPlus, IconFlask, IconClock, IconCircleCheck,
  IconPlayerPause, IconAlertCircle,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../state/store';
import type { BatchStatus, ProcessType } from '../state/Model';

// ─── Process Colors ───────────────────────────────────────────
const PROCESS_COLORS: Record<string, string> = {
  washed: 'blue',
  natural: 'yellow',
  honey: 'orange',
  anaerobic: 'violet',
};

// ─── Status Config ────────────────────────────────────────────
const STATUS_CONFIG: Record<BatchStatus, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: 'Active', color: 'green', icon: IconCircleCheck },
  completed: { label: 'Completed', color: 'gray', icon: IconCircleCheck },
  paused: { label: 'Paused', color: 'yellow', icon: IconPlayerPause },
  failed: { label: 'Failed', color: 'red', icon: IconAlertCircle },
};

export function BatchListPage() {
  const state = useStore();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<BatchStatus | 'all'>('all');
  const [processFilter, setProcessFilter] = useState<ProcessType | 'all'>('all');

  // Filter batches
  const filtered = state.batches.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (processFilter !== 'all' && b.processType !== processFilter) return false;
    return true;
  });

  // Status counts
  const statusCounts: Record<string, number> = {
    all: state.batches.length,
    active: state.batches.filter(b => b.status === 'active').length,
    completed: state.batches.filter(b => b.status === 'completed').length,
    paused: state.batches.filter(b => b.status === 'paused').length,
    failed: state.batches.filter(b => b.status === 'failed').length,
  };

  return (
    <Box p="xl" maw={1000} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between">
          <Box>
            <Text size="xl" fw={800}>
              Batches
            </Text>
            <Text size="xs" c="dimmed" ff="'Space Mono', monospace" mt={2}>
              {state.batches.length} total batches
            </Text>
          </Box>
          <Badge
            size="md"
            variant="filled"
            bg="forest-green.6"
            leftSection={<IconPlus size={14} />}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/batches/new')}
          >
            New Batch
          </Badge>
        </Group>

        {/* Status Filter */}
        <Group gap={4} bg="warm-ivory.2" p={4} style={{ borderRadius: 'var(--mantine-radius-md)', width: 'fit-content' }}>
          {(['all', 'active', 'completed', 'paused', 'failed'] as const).map(s => (
            <Box
              key={s}
              px="sm" py={4}
              bg={statusFilter === s ? 'white' : 'transparent'}
              style={{
                borderRadius: 'var(--mantine-radius-sm)',
                cursor: 'pointer',
                boxShadow: statusFilter === s ? 'var(--mantine-shadow-xs)' : 'none',
                transition: 'all 0.15s ease',
              }}
              onClick={() => setStatusFilter(s)}
            >
              <Text
                size="xs"
                ff="'Space Mono', monospace"
                fw={statusFilter === s ? 600 : 400}
                c={statusFilter === s ? 'forest-green.9' : 'dimmed'}
              >
                {s === 'all' ? `All (${statusCounts.all})` : `${s} (${statusCounts[s]})`}
              </Text>
            </Box>
          ))}
        </Group>

        {/* Process Filter */}
        <Group gap="xs">
          <Text size="xs" c="dimmed" ff="'Space Mono', monospace">Process:</Text>
          {(['all', 'washed', 'natural', 'honey', 'anaerobic'] as const).map(p => (
            <Badge
              key={p}
              size="sm"
              variant={processFilter === p ? 'filled' : 'outline'}
              color={p === 'all' ? 'gray' : PROCESS_COLORS[p]}
              tt="capitalize"
              style={{ cursor: 'pointer' }}
              onClick={() => setProcessFilter(p)}
              leftSection={
                p !== 'all' ? (
                  <Box
                    w={6} h={6}
                    bg={processFilter === p ? 'white' : PROCESS_COLORS[p]}
                    style={{ borderRadius: '50%' }}
                  />
                ) : undefined
              }
            >
              {p}
            </Badge>
          ))}
        </Group>

        {/* Batch List */}
        {state.loading && state.batches.length === 0 ? (
          <Stack gap="xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={96} radius="md" />
            ))}
          </Stack>
        ) : filtered.length === 0 ? (
          <Card withBorder p="xl">
            <Center>
              <Stack align="center">
                <IconFlask size={40} color="var(--mantine-color-dimmed)" opacity={0.4} />
                <Text size="sm" c="dimmed">No batches found</Text>
                <Badge
                  variant="outline"
                  color="forest-green"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/batches/new')}
                >
                  Create your first batch
                </Badge>
              </Stack>
            </Center>
          </Card>
        ) : (
          <Stack gap="xs">
            {filtered.map(batch => {
              const statusConf = STATUS_CONFIG[batch.status];
              const StatusIcon = statusConf.icon;

              return (
                <Card
                  key={batch.id}
                  withBorder
                  padding="md"
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--mantine-shadow-md)';
                    e.currentTarget.style.borderColor = 'var(--mantine-color-forest-green-3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                  onClick={() => navigate(`/batches/${batch.id}`)}
                >
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Group gap="xs" mb={6}>
                        <Box
                          w={10} h={10}
                          bg={PROCESS_COLORS[batch.processType] ?? 'gray'}
                          style={{ borderRadius: '50%', flexShrink: 0 }}
                        />
                        <Text size="sm" fw={600} truncate>{batch.name}</Text>
                        {batch.coffeeVariety && (
                          <Text size="xs" c="dimmed">— {batch.coffeeVariety}</Text>
                        )}
                        <Badge size="xs" variant="outline" tt="capitalize" ff="'Space Mono', monospace" ml="auto">
                          {batch.processType}
                        </Badge>
                      </Group>
                      <Group gap="md">
                        <Group gap={4}>
                          <StatusIcon size={14} color={`var(--mantine-color-${statusConf.color}-6)`} />
                          <Text size="xs" c={`${statusConf.color}.6`} fw={500}>{statusConf.label}</Text>
                        </Group>
                        <Group gap={4}>
                          <IconClock size={12} color="var(--mantine-color-dimmed)" />
                          <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                            {new Date(batch.startedAt).toLocaleDateString()}
                          </Text>
                        </Group>
                        {batch.currentStage && (
                          <Badge size="xs" variant="light" tt="capitalize">{batch.currentStage}</Badge>
                        )}
                      </Group>
                    </Box>

                    <Group gap="lg" align="flex-end" style={{ flexShrink: 0 }}>
                      <Box ta="right">
                        <Text fz={9} c="dimmed" ff="'Space Mono', monospace">pH</Text>
                        <Text size="sm" fw={700} ff="'Space Mono', monospace">
                          {batch.latestPh?.toFixed(2) ?? '—'}
                        </Text>
                      </Box>
                      <Box ta="right">
                        <Text fz={9} c="dimmed" ff="'Space Mono', monospace">°C</Text>
                        <Text size="sm" fw={700} ff="'Space Mono', monospace">
                          {batch.latestTemp?.toFixed(1) ?? '—'}
                        </Text>
                      </Box>
                      {batch.predictedScore != null && (
                        <Box ta="right" miw={40}>
                          <Text fz={9} c="dimmed" ff="'Space Mono', monospace">score</Text>
                          <Text size="md" fw={800} c="muted-gold.6">
                            {batch.predictedScore.toFixed(1)}
                          </Text>
                        </Box>
                      )}
                    </Group>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
