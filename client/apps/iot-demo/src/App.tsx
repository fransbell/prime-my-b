import { AppShell, Group, Title, Text, Container, Stack } from '@mantine/core';

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>IoT Data Demo</Title>
          <Text size="sm" c="dimmed">Sensor Data Generator</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container>
          <Stack gap="md">
            <Title order={2}>IoT Demo Tool</Title>
            <Text c="dimmed">Use this tool to generate and insert demo IoT data into PocketBase for dashboard testing.</Text>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
