import { createTheme } from '@mantine/core';
import { harvestTheme } from '@prime-my-brain/ui';

/**
 * IoT Demo Theme
 * Extends the shared Harvest Lanna Plus brand theme.
 * Form-heavy app for generating/inserting demo sensor data.
 */
export const theme = createTheme({
  ...harvestTheme,
});
