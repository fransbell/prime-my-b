// ─── New Batch Modal ───────────────────────────────────────────
// Modal form to create a new fermentation batch.
// Submits via effects → PocketBase → refreshes store.

import {
  Modal, Box, Text, Stack, TextInput, Textarea, Select,
  NumberInput, Button, Divider, Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';

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
