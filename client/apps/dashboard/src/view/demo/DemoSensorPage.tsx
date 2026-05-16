// ─── Demo Sensor Page — Split list + tabbed batch panel ─────────

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

const DEMO_PANE_HEIGHT = 'calc(100vh - 56px)';

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
      h={DEMO_PANE_HEIGHT}
      style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}
    >
      {/* ── Batch list (left rail) ── */}
      <Paper
        w={{ base: '100%', md: 340 }}
        maw={{ base: '100%', md: 340 }}
        h="100%"
        radius={0}
        style={{
          borderRight: '1px solid var(--mantine-color-gray-3)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)', flexShrink: 0 }}>
          <Title order={4}>Batches</Title>
          <Text size="xs" c="dimmed" mt={4}>
            Select a batch to view and record readings
          </Text>
        </Box>

        <ScrollArea style={{ flex: 1 }} p="sm" type="auto" offsetScrollbars>
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

      {/* ── Tabbed batch panel (right) ── */}
      <Box
        flex={1}
        p={{ base: 'md', md: 'lg' }}
        h="100%"
        style={{ minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        display={{ base: selectedId ? 'flex' : 'none', md: 'flex' }}
      >
        {!selectedId ? (
          <Center flex={1}>
            <Stack align="center" gap="sm">
              <IconFlask size={48} color="var(--mantine-color-gray-5)" stroke={1.2} />
              <Text fw={600} c="dimmed">Select a batch from the list</Text>
              <Text size="sm" c="dimmed" ta="center" maw={280}>
                Batch detail and new recordings open in the panel on the right.
              </Text>
            </Stack>
          </Center>
        ) : detailLoading || !batch ? (
          <Stack gap="md" flex={1}>
            <Skeleton height={48} radius="md" />
            <Skeleton flex={1} radius="md" />
          </Stack>
        ) : (
          <Box flex={1} style={{ minHeight: 0 }}>
            <BatchReadingPanel batchId={batch.id} batch={batch} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
