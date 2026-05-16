// ─── New Batch Page ───────────────────────────────────────────
// Form to create a new fermentation batch.
// Submits via effects → PocketBase → refreshes store.

import {
  Card, Text, Group, Stack, Box, TextInput, Textarea, Select,
  NumberInput, Button, Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
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

export function NewBatchPage() {
  const navigate = useNavigate();

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
      navigate(`/batches/${batch.id}`);
    }
  };

  return (
    <Box p="xl" maw={560} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Group gap="md">
          <Box
            p={6}
            bg="warm-ivory.2"
            style={{ borderRadius: 'var(--mantine-radius-sm)', cursor: 'pointer' }}
            onClick={() => navigate('/batches')}
          >
            <IconArrowLeft size={16} />
          </Box>
          <Box>
            <Text size="xl" fw={800}>
              New Batch
            </Text>
            <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
              Configure your fermentation batch
            </Text>
          </Box>
        </Group>

        {/* Form Card */}
        <Card withBorder>
          <Text size="xs" tt="uppercase" lts="0.08em" c="dimmed" ff="'Space Mono', monospace" mb="md">
            Batch Details
          </Text>

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
                <Button
                  variant="outline"
                  onClick={() => navigate('/batches')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg="forest-green.6"
                >
                  Start Batch
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
