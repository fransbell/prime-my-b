// ─── New Batch Modal ───────────────────────────────────────────
// Modal form to create a new fermentation batch.
// Submits via effects → PocketBase → refreshes store.

import {
  Modal, Box, Text, Stack, TextInput, Textarea, Select,
  NumberInput, Button, Divider, Group, Card, Badge, ThemeIcon,
} from '@mantine/core';
import { IconBookmark, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useEffect, useRef } from 'react';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';

const CONFIDENCE_COLOR: Record<'low' | 'medium' | 'high', string> = {
  low: 'gray',
  medium: 'yellow',
  high: 'forest-green',
};

const effects: Effects = createEffects(dispatch as any);

const schema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  coffeeVariety: z.string().optional(),
  processType: z.enum(['washed', 'natural', 'honey', 'anaerobic']),
  targetFlavorProfile: z.string().optional(),
  ambientTemp: z.number().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PROCESS_DESCRIPTIONS: Record<string, string> = {
  washed: 'Coffee pulped, mucilage fermented off in water tanks. Clean, bright cup.',
  natural: 'Whole cherry dried on raised beds. Fruity, wine-like, complex.',
  honey: 'Pulped but not washed — some mucilage left to dry. Sweet, balanced.',
  anaerobic: 'Sealed tank fermentation. Distinctive, experimental flavors.',
};

interface NewBatchModalProps {
  opened: boolean;
  onClose: () => void;
  onCreated?: (batchId: string) => void;
}

// ─── Mock RAG — retrieved reference panel ─────────────────────

function ReferencePanel({ onApplyAmbient }: { onApplyAmbient: (mid: number) => void }) {
  const ref = useStore().retrievedReference;
  if (!ref) return null;

  const sp = ref.suggestedParams;
  const ambientMid =
    sp.ambientTempMin != null && sp.ambientTempMax != null
      ? Math.round(((sp.ambientTempMin + sp.ambientTempMax) / 2) * 10) / 10
      : null;

  return (
    <Card withBorder bg="forest-green.0" padding="sm">
      <Group justify="space-between" mb={6} wrap="nowrap">
        <Group gap="xs">
          <ThemeIcon size="sm" variant="light" color="forest-green">
            <IconSparkles size={12} />
          </ThemeIcon>
          <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
            Reference from your history
          </Text>
        </Group>
        <Badge size="xs" variant="light" color={CONFIDENCE_COLOR[ref.confidence]}>
          {ref.confidence} confidence
        </Badge>
      </Group>

      <Text size="xs" lh={1.6} mb="xs">{ref.summary}</Text>

      {ref.citations.length > 0 && (
        <Group gap={4} mb="xs">
          <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em">Grounded in</Text>
          {ref.citations.map(c => (
            <Badge
              key={c.kind + c.id}
              size="xs"
              variant="outline"
              color={c.kind === 'recipe' ? 'forest-green' : 'gray'}
              leftSection={c.kind === 'recipe' ? <IconBookmark size={9} /> : undefined}
              ff="'Space Mono', monospace"
            >
              {c.label} · {c.score}%
            </Badge>
          ))}
        </Group>
      )}

      {ambientMid != null && (
        <Button
          size="compact-xs"
          variant="light"
          color="forest-green"
          onClick={() => onApplyAmbient(ambientMid)}
        >
          Apply ambient {ambientMid}°C
        </Button>
      )}
    </Card>
  );
}

export function NewBatchModal({ opened, onClose, onCreated }: NewBatchModalProps) {
  const form = useForm<FormData>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      coffeeVariety: '',
      processType: 'washed',
      targetFlavorProfile: '',
      notes: '',
    },
    validate: zodResolver(schema),
  });

  const watchedProcess = form.getValues().processType;

  // ── Mock RAG: debounced retrieval as the user types ──────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleRetrieve = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const v = form.getValues();
      if (!v.coffeeVariety && !v.targetFlavorProfile) {
        dispatch({ type: 'recipe/RETRIEVE_CLEAR' });
        return;
      }
      effects.retrieveReferences({
        variety: v.coffeeVariety ?? '',
        processType: v.processType,
        flavorProfile: v.targetFlavorProfile || undefined,
        ambientTemp: v.ambientTemp,
      });
    }, 400);
  };

  form.watch('coffeeVariety', scheduleRetrieve);
  form.watch('processType', scheduleRetrieve);
  form.watch('targetFlavorProfile', scheduleRetrieve);
  form.watch('ambientTemp', scheduleRetrieve);

  // Clear stale reference whenever the modal is closed
  useEffect(() => {
    if (!opened) dispatch({ type: 'recipe/RETRIEVE_CLEAR' });
  }, [opened]);

  // ── Pitch Demo: mirror the scripted form values (auto-typing) ──
  const demo = useStore().demo;
  const reference = useStore().retrievedReference;

  useEffect(() => {
    if (!demo.active) return;
    form.setValues({
      name: demo.form.name,
      coffeeVariety: demo.form.variety,
      processType: demo.form.process,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.active, demo.form.name, demo.form.variety, demo.form.process]);

  useEffect(() => {
    if (!demo.active || !demo.applyAmbient || !reference) return;
    const sp = reference.suggestedParams;
    if (sp.ambientTempMin != null && sp.ambientTempMax != null) {
      form.setFieldValue(
        'ambientTemp',
        Math.round(((sp.ambientTempMin + sp.ambientTempMax) / 2) * 10) / 10,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.active, demo.applyAmbient, reference]);

  const onSubmit = async (values: FormData) => {
    const batch = await effects.createBatch({
      name: values.name,
      coffeeVariety: values.coffeeVariety || undefined,
      processType: values.processType,
      targetFlavorProfile: values.targetFlavorProfile || undefined,
      ambientTemp: values.ambientTemp,
      notes: values.notes || undefined,
    });

    if (batch) {
      form.reset();
      onClose();
      onCreated?.(batch.id);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={!demo.active}
      closeOnClickOutside={!demo.active}
      closeOnEscape={!demo.active}
      title={
        <Box>
          <Text size="lg" fw={800}>New Batch</Text>
          <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
            Configure your fermentation batch
          </Text>
        </Box>
      }
      size="lg"
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Batch Name *"
            placeholder="e.g. CM80 Washed Typica Lot 1"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Coffee Variety"
            placeholder="e.g. Typica, Catuai, SL28"
            key={form.key('coffeeVariety')}
            {...form.getInputProps('coffeeVariety')}
          />

          <Select
            label="Process Type *"
            data={[
              { value: 'washed', label: 'Washed' },
              { value: 'natural', label: 'Natural' },
              { value: 'honey', label: 'Honey' },
              { value: 'anaerobic', label: 'Anaerobic' },
            ]}
            key={form.key('processType')}
            {...form.getInputProps('processType')}
          />
          {watchedProcess && (
            <Text size="xs" c="dimmed" mt={-8}>
              {PROCESS_DESCRIPTIONS[watchedProcess]}
            </Text>
          )}

          <ReferencePanel onApplyAmbient={(mid) => form.setFieldValue('ambientTemp', mid)} />

          <Group grow>
            <NumberInput
              label="Ambient Temp (°C)"
              placeholder="e.g. 25.0"
              decimalScale={1}
              key={form.key('ambientTemp')}
              {...form.getInputProps('ambientTemp')}
            />
            <TextInput
              label="Target Flavor"
              placeholder="e.g. Fruity, floral"
              key={form.key('targetFlavorProfile')}
              {...form.getInputProps('targetFlavorProfile')}
            />
          </Group>

          <Textarea
            label="Notes"
            placeholder="Any additional notes..."
            rows={3}
            key={form.key('notes')}
            {...form.getInputProps('notes')}
          />

          <Divider />

          <Group grow>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" bg="forest-green.6">
              Start Batch
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
