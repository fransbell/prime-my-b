// ─── Demo Sensor Page — Split list + reading detail ─────────────

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Text, Group, Stack, Badge, ScrollArea, Paper, Center, Skeleton, Title,
} from '@mantine/core';
import { IconFlask, IconChevronRight } from '@tabler/icons-react';
import { useStore, dispatch } from '../../state/store';
import { createEffects, type Effects } from '../../effects';
import type { BatchRecord, BatchStatus } from '../../state/Model';
import { BatchReadingPanel } from '../readings/BatchReadingPanel';

const effects: Effects = createEffects(dispatch as any);

const STATUS_COLOR: Record<BatchStatus, string> = {
  active: 'green',
  completed: 'gray',
  paused: 'yellow',
  failed: 'red',
};

const PROCESS_DOT: Record<string, string> = {
  washed: 'blue',
  natural: 'yellow',
  honey: 'orange',
  anaerobic: 'violet',
};

export function DemoSensorPage() {
  const { id: selectedId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const state = useStore();
  const [batch, setBatch] = useState<BatchRecord | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!selectedId) {
      setBatch(null);
      return;
    }
    setDetailLoading(true);
    dispatch({ type: 'batch/SELECT', payload: { batchId: selectedId } });
    effects.fetchBatch(selectedId).then(b => {
      setBatch(b);
      setDetailLoading(false);
    });
  }, [selectedId]);

  const selectBatch = (batchId: string) => {
    navigate(`/demo/${batchId}`);
  };

  return (
    <Box
      mih="calc(100vh - 56px)"
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {/* ── Batch list (left rail) ── */}
      <Paper
        w={{ base: '100%', md: 340 }}
        maw={{ base: '100%', md: 340 }}
        radius={0}
        style={{
          borderRight: '1px solid var(--mantine-color-gray-3)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
          <Title order={4}>Batches</Title>
          <Text size="xs" c="dimmed" mt={4}>
            Select a batch to view and record readings
          </Text>
        </Box>

        <ScrollArea style={{ flex: 1 }} p="sm" type="auto">
          {state.loading && state.batches.length === 0 ? (
            <Stack gap="xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={72} radius="md" />
              ))}
            </Stack>
          ) : state.batches.length === 0 ? (
            <Center py="xl">
              <Text size="sm" c="dimmed">No batches available</Text>
            </Center>
          ) : (
            <Stack gap="xs">
              {state.batches.map(b => {
                const selected = b.id === selectedId;
                return (
                  <Paper
                    key={b.id}
                    p="sm"
                    radius="md"
                    withBorder
                    style={{
                      cursor: 'pointer',
                      borderColor: selected
                        ? 'var(--mantine-color-forest-green-5)'
                        : undefined,
                      background: selected
                        ? 'var(--mantine-color-forest-green-0)'
                        : undefined,
                      transition: 'border-color 0.15s ease, background 0.15s ease',
                    }}
                    onClick={() => selectBatch(b.id)}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
                        <Box
                          w={8}
                          h={8}
                          bg={PROCESS_DOT[b.processType] ?? 'gray'}
                          style={{ borderRadius: '50%', flexShrink: 0 }}
                        />
                        <Box style={{ minWidth: 0 }}>
                          <Text size="sm" fw={600} truncate>{b.name}</Text>
                          <Group gap={6} mt={4}>
                            <Badge size="xs" variant="dot" color={STATUS_COLOR[b.status]} tt="capitalize">
                              {b.status}
                            </Badge>
                            <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                              pH {b.latestPh?.toFixed(2) ?? '—'}
                            </Text>
                          </Group>
                        </Box>
                      </Group>
                      <IconChevronRight
                        size={16}
                        color={selected ? 'var(--mantine-color-forest-green-6)' : 'var(--mantine-color-dimmed)'}
                      />
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </ScrollArea>
      </Paper>

      {/* ── Detail (right pane) — hidden on mobile until selection */}
      <Box
        flex={1}
        p={{ base: 'md', md: 'xl' }}
        style={{ minWidth: 0 }}
        display={{ base: selectedId ? 'block' : 'none', md: 'block' }}
      >
        {!selectedId ? (
          <Center h="100%" mih={400}>
            <Stack align="center" gap="sm">
              <IconFlask size={48} color="var(--mantine-color-gray-5)" stroke={1.2} />
              <Text fw={600} c="dimmed">Select a batch from the list</Text>
              <Text size="sm" c="dimmed" ta="center" maw={280}>
                The detail panel shows reading history and a form to add new sensor data.
              </Text>
            </Stack>
          </Center>
        ) : detailLoading || !batch ? (
          <Stack gap="md" maw={720}>
            <Skeleton height={40} w={240} />
            <Skeleton height={200} radius="md" />
            <Skeleton height={320} radius="md" />
          </Stack>
        ) : (
          <Stack gap="lg" maw={720}>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text size="xs" c="forest-green.6" fw={600} tt="uppercase" lts="0.08em">
                  Batch detail
                </Text>
                <Title order={2} mt={4}>{batch.name}</Title>
                <Group gap="xs" mt="xs">
                  <Badge variant="outline" tt="capitalize">{batch.processType}</Badge>
                  <Badge color={STATUS_COLOR[batch.status]} tt="capitalize">{batch.status}</Badge>
                  {batch.coffeeVariety && (
                    <Text size="sm" c="dimmed">{batch.coffeeVariety}</Text>
                  )}
                </Group>
              </Box>
              <Box ta="right" visibleFrom="sm">
                <Text size="xs" c="dimmed">Latest pH</Text>
                <Text size="xl" fw={800} ff="'Space Mono', monospace">
                  {batch.latestPh?.toFixed(2) ?? '—'}
                </Text>
              </Box>
            </Group>

            <BatchReadingPanel batchId={batch.id} batch={batch} />
          </Stack>
        )}
      </Box>
    </Box>
  );
}
