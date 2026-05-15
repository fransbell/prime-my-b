import { createTheme } from '@mantine/core';
import { harvestTheme } from '@prime-my-brain/ui';

/**
 * Dashboard Theme
 * Extends the shared Harvest Lanna Plus brand theme with
 * dashboard-specific defaults (data viz, forms, admin controls).
 */
export const theme = createTheme({
  ...harvestTheme,
  components: {
    ...harvestTheme.components,
    TextInput: {
      defaultProps: {
        size: 'sm',
      },
    },
    Select: {
      defaultProps: {
        size: 'sm',
      },
    },
    NumberInput: {
      defaultProps: {
        size: 'sm',
      },
    },
  },
});
