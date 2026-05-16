// ─── Alerts Page ──────────────────────────────────────────────
// Lists all alerts across all batches with severity filters.

import { useState } from 'react';
import {
  Card, Text, Group, Badge, Stack, Box, Center, Skeleton,
  Button,
} from '@mantine/core';
import { IconBell, IconChecks } from '@tabler/icons-react';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { AlertSeverity } from '../state/Model';
import { AlertGuidelineButton } from './AlertGuidelineModal';

const effects: Effects = createEffects(dispatch as any);

// ─── Severity Colors ──────────────────────────────────────────
const SEVERITY_BG: Record<AlertSeverity, string> = {
  critical: 'red.0',
  high: 'orange.0',
  medium: 'yellow.0',
  low: 'blue.0',
};

const SEVERITY_BORDER: Record<AlertSeverity, string> = {
  critical: 'red.5',
  high: 'orange.5',
  medium: 'yellow.5',
  low: 'blue.5',
};

const SEVERITY_BADGE: Record<AlertSeverity, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
};

export function AlertsPage() {
  const state = useStore();
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');
  const [showAcked, setShowAcked] = useState(false);

  const filtered = state.alerts.filter(a => {
    if (!showAcked && a.resolved) return false;
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    return true;
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
            All alerts across all fermentation batches
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
            variant={showAcked ? 'filled' : 'outline'}
            color={showAcked ? 'forest-green' : 'gray'}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowAcked(v => !v)}
          >
            {showAcked ? 'Showing acknowledged' : 'Show acknowledged'}
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
            {filtered.map(alert => {
              const severity = alert.severity as AlertSeverity;
              return (
                <Box
                  key={alert.id}
                  p="md"
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    background: `var(--mantine-color-${SEVERITY_BG[severity] ?? 'gray-0'})`,
                    borderLeft: `4px solid var(--mantine-color-${SEVERITY_BORDER[severity] ?? 'gray-5'})`,
                    opacity: alert.resolved ? 0.5 : 1,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Box style={{ flex: 1 }}>
                      <Group gap="xs" mb={4}>
                        <Badge
                          size="xs"
                          variant="light"
                          color={SEVERITY_BADGE[severity] ?? 'gray'}
                          ff="'Space Mono', monospace"
                          tt="uppercase"
                        >
                          {severity}
                        </Badge>
                        <Text size="xs" fw={600} tt="capitalize">
                          {(alert.type as string || '').replace(/_/g, ' ')}
                        </Text>
                        <Text fz={10} c="dimmed" ff="'Space Mono', monospace" ml="auto">
                          {new Date(alert.created).toLocaleString()}
                        </Text>
                      </Group>
                      <Text size="sm" lh={1.5}>{alert.message}</Text>
                    </Box>
                    {!alert.resolved && (
                      <Button
                        size="xs"
                        variant="outline"
                        leftSection={<IconChecks size={14} />}
                        onClick={() => effects.resolveAlert(alert.id)}
                      >
                        Ack
                      </Button>
                    )}
                  </Group>
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
