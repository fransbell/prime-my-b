// ─── Alert → Batch detail link ─────────────────────────────────

import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export function AlertBatchLink({ batchId }: { batchId?: string | null }) {
  if (!batchId) return null;

  return (
    <Text
      component={Link}
      to={`/batches/${batchId}`}
      size="xs"
      c="forest-green.6"
      fw={500}
      mt={6}
      style={{ display: 'inline-block', textDecoration: 'none' }}
    >
      View batch detail →
    </Text>
  );
}
