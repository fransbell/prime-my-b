// ─── Alert Guideline Modal ────────────────────────────────────
// Shows threshold rules for each parameter: what change triggers what alert.
// Purely presentational — uses local state, no store dispatch needed.

import {
  Modal, Text, Group, Badge, Stack, Box, Table, Divider, ActionIcon, Tooltip,
} from '@mantine/core';
import { IconInfoCircle, IconFlask, IconThermometer, IconWeight, IconWind } from '@tabler/icons-react';
import { useState } from 'react';

// ─── Guideline Data ───────────────────────────────────────────
// Maps each parameter → thresholds → severity + message

interface Threshold {
  condition: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
}

interface ParameterGuide {
  key: string;
  label: string;
  unit: string;
  icon: React.ElementType;
  normalRange: string;
  thresholds: Threshold[];
}

const PARAMETER_GUIDELINES: ParameterGuide[] = [
  {
    key: 'ph',
    label: 'pH',
    unit: '',
    icon: IconFlask,
    normalRange: '4.5 – 6.0',
    thresholds: [
      { condition: 'pH > 6.0', severity: 'low', message: 'Fermentation has not started yet — pH is too high' },
      { condition: 'pH 5.0 – 6.0', severity: 'low', message: 'Early fermentation — pH beginning to drop' },
      { condition: 'pH 4.5 – 5.0', severity: 'medium', message: 'Active acid development — entering critical zone' },
      { condition: 'pH 4.0 – 4.5', severity: 'high', message: 'pH approaching over-fermentation — consider stopping' },
      { condition: 'pH < 4.0', severity: 'critical', message: 'pH critically low — over-fermentation risk, batch may be lost' },
    ],
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    icon: IconThermometer,
    normalRange: '22 – 28°C',
    thresholds: [
      { condition: 'Temp < 18°C', severity: 'high', message: 'Too cold — fermentation stalled or very slow' },
      { condition: 'Temp 18 – 22°C', severity: 'low', message: 'Below optimal range — slow fermentation' },
      { condition: 'Temp 28 – 32°C', severity: 'high', message: 'Elevated temperature — risk of off-flavors' },
      { condition: 'Temp > 32°C', severity: 'critical', message: 'Overheating — fermentation out of control, off-flavors likely' },
    ],
  },
  {
    key: 'co2',
    label: 'CO₂',
    unit: '%',
    icon: IconWind,
    normalRange: '20 – 50%',
    thresholds: [
      { condition: 'CO₂ < 20%', severity: 'low', message: 'Low microbial activity — fermentation may be stuck' },
      { condition: 'CO₂ 50 – 70%', severity: 'medium', message: 'High CO₂ activity — peak fermentation, monitor closely' },
      { condition: 'CO₂ > 70%', severity: 'critical', message: 'Critical CO₂ level — ventilation needed, risk of contamination' },
    ],
  },
  {
    key: 'weight',
    label: 'Weight',
    unit: 'kg',
    icon: IconWeight,
    normalRange: '< 15% loss',
    thresholds: [
      { condition: 'Loss 10 – 15%', severity: 'low', message: 'Normal weight loss during fermentation' },
      { condition: 'Loss 15 – 25%', severity: 'medium', message: 'Significant weight loss — check for leaks or excessive drainage' },
      { condition: 'Loss > 25%', severity: 'high', message: 'Excessive weight loss — possible batch failure' },
    ],
  },
];

const SEVERITY_COLOR: Record<string, string> = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
};

// ─── Small (i) Trigger Button ─────────────────────────────────
// Drop this into any page header to open the guideline modal.

export function AlertGuidelineButton({ size = 16 }: { size?: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip label="Alert guidelines" position="bottom" withArrow>
        <ActionIcon
          variant="subtle"
          color="forest-green"
          size="sm"
          onClick={() => setOpened(true)}
          style={{ cursor: 'pointer' }}
        >
          <IconInfoCircle size={size} />
        </ActionIcon>
      </Tooltip>

      <AlertGuidelineModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}

// ─── Modal Component ──────────────────────────────────────────

export function AlertGuidelineModal({ opened, onClose }: {
  opened: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconInfoCircle size={18} color="var(--mantine-color-forest-green-6)" />
          <Text size="sm" fw={700}>Alert Threshold Guidelines</Text>
        </Group>
      }
      size="lg"
      radius="md"
      styles={{
        body: { padding: 0 },
      }}
    >
      <Box p="md">
        <Text size="xs" c="dimmed" mb="md" lh={1.6}>
          The system monitors sensor readings and triggers alerts automatically when
          parameters cross defined thresholds. Below are the rules for each parameter.
        </Text>

        <Stack gap="lg">
          {PARAMETER_GUIDELINES.map((param) => {
            const Icon = param.icon;
            return (
              <Box key={param.key}>
                {/* Parameter Header */}
                <Group gap="xs" mb="xs">
                  <Box
                    p={4}
                    bg="warm-ivory.2"
                    style={{ borderRadius: 'var(--mantine-radius-sm)' }}
                  >
                    <Icon size={14} color="var(--mantine-color-forest-green-6)" />
                  </Box>
                  <Text size="sm" fw={700}>{param.label}</Text>
                  <Badge size="xs" variant="light" color="forest-green" ff="'Space Mono', monospace">
                    Normal: {param.normalRange}
                  </Badge>
                </Group>

                {/* Threshold Table */}
                <Box style={{ overflowX: 'auto' }}>
                  <Table style={{ tableLayout: 'fixed' }}>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th w="28%">
                          <Text fz={9} tt="uppercase" c="dimmed" ff="'Space Mono', monospace" lts="0.06em">
                            Condition
                          </Text>
                        </Table.Th>
                        <Table.Th w="14%">
                          <Text fz={9} tt="uppercase" c="dimmed" ff="'Space Mono', monospace" lts="0.06em">
                            Severity
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fz={9} tt="uppercase" c="dimmed" ff="'Space Mono', monospace" lts="0.06em">
                            Alert Message
                          </Text>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {param.thresholds.map((t, i) => (
                        <Table.Tr key={i}>
                          <Table.Td>
                            <Text size="xs" ff="'Space Mono', monospace" fw={600}>
                              {t.condition}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              size="xs"
                              variant="light"
                              color={SEVERITY_COLOR[t.severity]}
                              tt="capitalize"
                              fullWidth
                            >
                              {t.severity}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="xs" c="dimmed" lh={1.5}>
                              {t.message}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>

                {param.key !== 'weight' && <Divider color="gray.3" mt="sm" />}
              </Box>
            );
          })}
        </Stack>

        {/* Footer */}
        <Box mt="md" p="sm" bg="warm-ivory.1" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
          <Group gap="xs" align="flex-start">
            <IconInfoCircle size={14} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed" lh={1.6}>
              Thresholds are based on specialty coffee fermentation best practices.
              Adjustments may be needed depending on bean variety, altitude, and target flavor profile.
              Alerts are triggered in real-time as new sensor readings arrive.
            </Text>
          </Group>
        </Box>
      </Box>
    </Modal>
  );
}
