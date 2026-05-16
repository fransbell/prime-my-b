// ─── Alerts Page ──────────────────────────────────────────────
// Lists all alerts across all batches with severity filters.

import { useState } from 'react';
import {
  Card, Text, Group, Badge, Stack, Box, Center, Skeleton,
} from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { AlertSeverity } from '../state/Model';
import { AlertGuidelineButton } from './AlertGuidelineModal';
import { AlertDetailCard } from './AlertDetailCard';

const effects: Effects = createEffects(dispatch as any);

export function AlertsPage() {
  const state = useStore();
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');
  const [hideAcked, setHideAcked] = useState(false);

  const filtered = state.alerts
    .filter(a => {
      if (hideAcked && a.resolved) return false;
      if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

  const unackCount = state.alerts.filter(a => !a.resolved).length;

  return (
    <Box p="xl" maw={800} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Box>
          <Group gap="md">
            <Text size="xl" fw={800}>Alerts</Text>
            <AlertGuidelineButton />
            {unackCount > 0 && (
              <Badge size="sm" color="red" variant="filled" circle>
                {unackCount} unacknowledged
              </Badge>
            )}
          </Group>
          <Text size="xs" c="dimmed" ff="'Space Mono', monospace" mt={4}>
            Active and acknowledged alerts — history stays visible as a reminder
          </Text>
        </Box>

        {/* Filters */}
        <Group gap="md" wrap="wrap">
          <Group gap={4} bg="warm-ivory.2" p={4} style={{ borderRadius: 'var(--mantine-radius-md)' }}>
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map(s => (
              <Box
                key={s}
                px="sm" py={4}
                bg={severityFilter === s ? 'white' : 'transparent'}
                style={{
                  borderRadius: 'var(--mantine-radius-sm)',
                  cursor: 'pointer',
                  boxShadow: severityFilter === s ? 'var(--mantine-shadow-xs)' : 'none',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => setSeverityFilter(s)}
              >
                <Text
                  size="xs"
                  ff="'Space Mono', monospace"
                  fw={severityFilter === s ? 600 : 400}
                  c={severityFilter === s ? 'forest-green.9' : 'dimmed'}
                  tt="capitalize"
                >
                  {s}
                </Text>
              </Box>
            ))}
          </Group>

          <Badge
            size="sm"
            variant={hideAcked ? 'filled' : 'outline'}
            color={hideAcked ? 'gray' : 'forest-green'}
            style={{ cursor: 'pointer' }}
            onClick={() => setHideAcked(v => !v)}
          >
            {hideAcked ? 'Hiding acknowledged' : 'Hide acknowledged'}
          </Badge>
        </Group>

        {/* Alert List */}
        {state.loading && state.alerts.length === 0 ? (
          <Stack gap="xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} height={80} radius="md" />
            ))}
          </Stack>
        ) : filtered.length === 0 ? (
          <Card withBorder p="xl">
            <Center>
              <Stack align="center">
                <IconBell size={40} color="var(--mantine-color-dimmed)" opacity={0.4} />
                <Text size="sm" c="dimmed">
                  {state.alerts.length === 0 ? 'No alerts yet' : 'No alerts matching filters'}
                </Text>
              </Stack>
            </Center>
          </Card>
        ) : (
          <Stack gap="xs">
            {filtered.map(alert => (
              <AlertDetailCard
                key={alert.id}
                alert={alert}
                showAck
                showBatchLink
                onAck={() => effects.resolveAlert(alert.id)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
