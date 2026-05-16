// ─── 7-step IoT scale buttons (Dead → Ideal) ───────────────────

import { Stack, Group, Button, ScrollArea } from '@mantine/core';
import {
  IOT_SCALE_ORDER,
  IOT_SCALE_META,
  type IotScale,
} from '../readings/readingMetrics';

interface MetricScaleButtonsProps {
  activeScale: IotScale;
  onSelect: (scale: IotScale) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function MetricScaleButtons({
  activeScale,
  onSelect,
  orientation = 'vertical',
}: MetricScaleButtonsProps) {
  const buttons = IOT_SCALE_ORDER.map((scale) => {
    const meta = IOT_SCALE_META[scale];
    return (
      <Button
        key={scale}
        size="compact-xs"
        color={meta.color}
        variant={activeScale === scale ? 'filled' : 'light'}
        fullWidth={orientation === 'vertical'}
        style={orientation === 'horizontal' ? { flexShrink: 0 } : undefined}
        onClick={() => onSelect(scale)}
      >
        {meta.label}
      </Button>
    );
  });

  if (orientation === 'vertical') {
    return <Stack gap={4}>{buttons}</Stack>;
  }

  return (
    <ScrollArea type="auto" offsetScrollbars>
      <Group gap={6} wrap="nowrap" pb={4}>
        {buttons}
      </Group>
    </ScrollArea>
  );
}
