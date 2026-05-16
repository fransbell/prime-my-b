// ─── Edit Batch Modal ───────────────────────────────────────────
// Edit batch name and notes from the batch detail page.

import { useEffect } from 'react';
import {
  Modal, Text, Stack, TextInput, Textarea, Button, Divider, Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { BatchRecord } from '../state/Model';

const effects: Effects = createEffects(dispatch as any);

const schema = z.object({
  name: z.string().min(1, 'Batch name is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EditBatchModalProps {
  batch: BatchRecord;
  opened: boolean;
  onClose: () => void;
  onSaved?: (batch: BatchRecord) => void;
}

export function EditBatchModal({ batch, opened, onClose, onSaved }: EditBatchModalProps) {
  const form = useForm<FormData>({
    initialValues: {
      name: batch.name,
      notes: batch.notes ?? '',
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (opened) {
      form.setValues({
        name: batch.name,
        notes: batch.notes ?? '',
      });
    }
  }, [opened, batch.id, batch.name, batch.notes]);

  const onSubmit = async (values: FormData) => {
    const updated = await effects.updateBatch(batch.id, {
      name: values.name,
      notes: values.notes || '',
    });
    if (updated) {
      onSaved?.(updated);
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700}>Edit batch</Text>}
      size="md"
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Batch name"
            placeholder="e.g. CM80 Washed Typica Lot 1"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Notes"
            placeholder="Observations, adjustments, reminders..."
            rows={4}
            key={form.key('notes')}
            {...form.getInputProps('notes')}
          />
          <Divider />
          <Group grow>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" bg="forest-green.6">
              Save changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
