// ─── Demo Layout — Sensor reading showcase (no dashboard sidebar) ──

import { useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppShell, Group, Text, Box, Button, Badge } from '@mantine/core';
import { IconArrowLeft, IconGauge } from '@tabler/icons-react';
import { dispatch } from '../../state/store';
import { createEffects, type Effects } from '../../effects';

const effects: Effects = createEffects(dispatch as any);

export function DemoLayout() {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effects.initialize();
    }
  }, []);

  return (
    <AppShell
      header={{ height: 56 }}
      padding={0}
      styles={{
        main: {
          background: 'linear-gradient(160deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-warm-ivory-1) 100%)',
          minHeight: 'calc(100vh - 56px)',
        },
      }}
    >
      <AppShell.Header
        px="lg"
        style={{
          borderBottom: '1px solid var(--mantine-color-gray-3)',
          background: '#ffffff',
        }}
      >
        <Group h="100%" justify="space-between">
          <Group gap="md">
            <Box
              w={36}
              h={36}
              bg="forest-green.6"
              style={{
                borderRadius: 'var(--mantine-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconGauge size={20} color="white" />
            </Box>
            <Box>
              <Group gap="xs">
                <Text fw={800} size="lg">Sensor Reading Demo</Text>
                <Badge size="xs" variant="light" color="violet">IoT</Badge>
              </Group>
              <Text size="xs" c="dimmed">
                Record and review batch sensor metrics
              </Text>
            </Box>
          </Group>
          <Button
            component={Link}
            to="/"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to dashboard
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet key={location.pathname} />
      </AppShell.Main>
    </AppShell>
  );
}
