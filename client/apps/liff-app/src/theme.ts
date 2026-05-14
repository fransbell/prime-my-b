import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'green',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  defaultRadius: 'lg',
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
  },
});
