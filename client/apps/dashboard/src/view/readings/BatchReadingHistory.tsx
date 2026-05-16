// ─── Batch Reading History (read-only table) ───────────────────

import { useEffect } from 'react';
import {
  Card, Text, Group, Box, Center, Table,
} from '@mantine/core';
import { useStore, dispatch } from '../../state/store';
import { createEffects, type Effects } from '../../effects';
import type { BatchReadingMetrics } from './readingMetrics';

const effects: Effects = createEffects(dispatch as any);

interface BatchReadingHistoryProps {
  batchId: string;
  /** Optional hint below the title (e.g. link to demo) */
  hint?: React.ReactNode;
  maxRows?: number;
  onRowClick?: (reading: BatchReadingMetrics) => void;
  selectedReadingId?: string | null;
}

export function BatchReadingHistory({
  batchId,
  hint,
  maxRows,
  onRowClick,
  selectedReadingId,
}: BatchReadingHistoryProps) {
  const readings = useStore(s => s.readings);

  useEffect(() => {
    effects.fetchReadings(batchId);
  }, [batchId]);

  const rows = maxRows != null ? readings.slice(0, maxRows) : readings;

  return (
    <Card withBorder>
      <Group justify="space-between" mb="md">
        <Box>
          <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
            Reading history ({readings.length})
          </Text>
          {hint}
        </Box>
      </Group>

      {readings.length === 0 ? (
        <Center py="lg">
          <Text size="sm" c="dimmed">No readings yet</Text>
        </Center>
      ) : (
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
              {rows.map(r => {
                const row = r as BatchReadingMetrics & { id: string; timestamp: string };
                return (
                  <Table.Tr
                    key={row.id}
                    style={{ cursor: onRowClick ? 'pointer' : undefined }}
                    bg={selectedReadingId === row.id ? 'forest-green.0' : undefined}
                    onClick={() => onRowClick?.(row)}
                  >
                    <Table.Td>
                      <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                        {new Date(row.timestamp).toLocaleString([], {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" fw={700} ff="'Space Mono', monospace">
                        {row.ph?.toFixed(2) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" ff="'Space Mono', monospace">
                        {row.temperature?.toFixed(1) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" ff="'Space Mono', monospace">
                        {row.weight?.toFixed(2) ?? '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td ta="right">
                      <Text size="xs" ff="'Space Mono', monospace">
                        {row.co2?.toFixed(0) ?? '—'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Box>
      )}
    </Card>
  );
}
