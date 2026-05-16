// ─── Alert detail row (white surface + severity accent) ─────────

import { Box, Text, Group, Badge, Button, Paper } from '@mantine/core';
import { IconChecks } from '@tabler/icons-react';
import type { AlertRecord } from '@prime-my-brain/store';
import type { AlertSeverity } from '../state/Model';
import { AlertBatchLink } from './AlertBatchLink';

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

interface AlertDetailCardProps {
  alert: AlertRecord;
  showAck?: boolean;
  showBatchLink?: boolean;
  onAck?: () => void;
}

export function AlertDetailCard({
  alert,
  showAck = false,
  showBatchLink = false,
  onAck,
}: AlertDetailCardProps) {
  const severity = alert.severity as AlertSeverity;
  const acknowledged = alert.resolved;
  const ackedAt = alert.resolvedAt
    ? new Date(alert.resolvedAt).toLocaleString([], {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : null;

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{
        backgroundColor: '#ffffff',
        borderLeft: acknowledged
          ? '4px solid var(--mantine-color-gray-4)'
          : `4px solid var(--mantine-color-${SEVERITY_BORDER[severity] ?? 'gray-5'})`,
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box style={{ flex: 1 }}>
          <Group gap="xs" mb={4} wrap="wrap">
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
            {acknowledged ? (
              <Badge
                size="xs"
                variant="light"
                color="green"
                leftSection={<IconChecks size={12} />}
              >
                Acknowledged{ackedAt ? ` · ${ackedAt}` : ''}
              </Badge>
            ) : (
              <Badge size="xs" variant="dot" color="red">
                Needs attention
              </Badge>
            )}
            <Text fz={10} c="dimmed" ff="'Space Mono', monospace" ml="auto">
              {new Date(alert.created).toLocaleString()}
            </Text>
          </Group>
          <Text size="sm" lh={1.5} c={acknowledged ? 'dimmed' : undefined}>
            {alert.message}
          </Text>
          {showBatchLink && <AlertBatchLink batchId={alert.batch} />}
        </Box>
        {showAck && !acknowledged && onAck && (
          <Button
            size="xs"
            variant="outline"
            leftSection={<IconChecks size={14} />}
            onClick={onAck}
          >
            Ack
          </Button>
        )}
      </Group>
    </Paper>
  );
}
