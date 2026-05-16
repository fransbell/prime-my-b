// ─── Layout — Sidebar + Main Content ──────────────────────────
// Follows the reference site's sidebar navigation pattern with
// Harvest Lanna branding and Mantine components.

import { useEffect, useRef, useState } from 'react';
import {
  AppShell, NavLink, Group, Text, ActionIcon, Box, Badge, Divider, Loader,
} from '@mantine/core';
import {
  IconDashboard, IconFlask, IconBell, IconMenu2, IconX, IconGauge,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';

const effects: Effects = createEffects(dispatch as any);

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: IconDashboard },
  { href: '/batches', label: 'Batches', icon: IconFlask },
  { href: '/alerts', label: 'Alerts', icon: IconBell },
  { href: '/demo', label: 'Sensor Demo', icon: IconGauge },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const state = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effects.initialize();
    }
  }, []);

  const unackAlerts = state.summary?.unacknowledgedAlerts ?? state.alerts.filter(a => !a.resolved).length;

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{
        width: 224,
        breakpoint: 'md',
        collapsed: { mobile: !mobileNavOpen },
      }}
      padding={0}
    >
      {/* ─── Sidebar ─── */}
      <AppShell.Navbar bg="warm-ivory.0" style={{ borderRight: '1px solid var(--mantine-color-warm-ivory-4)' }}>
        {/* Logo / Brand */}
        <Box p="md" pb="xs">
          <Group gap="xs">
            <Box
              w={28} h={28}
              bg="forest-green.6"
              style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <IconFlask size={16} color="white" />
            </Box>
            <Box>
              <Text size="xs" fw={800} tt="uppercase" lts="0.08em" c="forest-green.6" lh={1.1}>
                Harvest Lanna
              </Text>
              <Text fz={9} c="dimmed" ff="'Space Mono', monospace">
                Fermentation Copilot
              </Text>
            </Box>
          </Group>
        </Box>

        <Divider color="warm-ivory.4" />

        {/* Navigation */}
        <Box p="sm" pt="md">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = href === '/'
              ? location.pathname === '/'
              : href === '/demo'
                ? location.pathname.startsWith('/demo')
                : location.pathname.startsWith(href);
            const alertBadge = label === 'Alerts' && unackAlerts > 0 ? unackAlerts : null;

            return (
              <NavLink
                key={href}
                label={
                  <Group gap="xs">
                    <Text size="sm">{label}</Text>
                    {alertBadge != null && (
                      <Badge
                        size="xs" color="red" variant="filled"
                        circle
                        styles={{ root: { minWidth: 18, height: 18, padding: 0 } }}
                      >
                        {alertBadge > 9 ? '9+' : alertBadge}
                      </Badge>
                    )}
                  </Group>
                }
                leftSection={<Icon size={18} stroke={1.5} />}
                active={active}
                variant={active ? 'filled' : 'subtle'}
                color="forest-green"
                style={{
                  borderRadius: 'var(--mantine-radius-md)',
                  marginBottom: 2,
                }}
                onClick={() => {
                  navigate(href);
                  setMobileNavOpen(false);
                }}
              />
            );
          })}
        </Box>
      </AppShell.Navbar>

      {/* ─── Mobile Header ─── */}
      <Box
        hiddenFrom="md"
        p="sm"
        style={{
          borderBottom: '1px solid var(--mantine-color-warm-ivory-4)',
          background: 'var(--mantine-color-warm-ivory-0)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Group justify="space-between">
          <Group gap="xs">
            <ActionIcon
              variant="subtle" color="forest-green"
              onClick={() => setMobileNavOpen(v => !v)}
            >
              {mobileNavOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </ActionIcon>
            <Text size="sm" fw={700}>Fermentation Copilot</Text>
          </Group>
          {state.loading && <Loader size="xs" />}
        </Group>
      </Box>

      {/* ─── Main Content ─── */}
      <AppShell.Main style={{ background: 'var(--mantine-color-body)', minHeight: '100vh' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
