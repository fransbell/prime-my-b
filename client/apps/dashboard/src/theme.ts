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
    Card: {
      styles: {
        root: {
          backgroundColor: '#ffffff',
        },
        section: {
          backgroundColor: '#ffffff',
        },
      },
    },
    Modal: {
      styles: {
        content: {
          backgroundColor: '#ffffff',
        },
        header: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--mantine-color-gray-3)',
        },
        body: {
          backgroundColor: '#ffffff',
        },
      },
    },
    Table: {
      styles: {
        table: {
          backgroundColor: '#ffffff',
        },
      },
    },
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
