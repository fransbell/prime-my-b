import { createTheme } from '@mantine/core';
import { harvestTheme } from '@prime-my-brain/ui';

/**
 * LIFF App Theme
 * Extends the shared Harvest Lanna Plus brand theme with
 * mobile-first defaults (larger radius, bigger touch targets).
 */
export const theme = createTheme({
  ...harvestTheme,
  defaultRadius: 'lg',
  components: {
    ...harvestTheme.components,
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
  },
});
