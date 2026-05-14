import { AppShell, Group, Title, Text, Container } from '@mantine/core';

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>Prime My Brain - Dashboard</Title>
          <Text size="sm" c="dimmed">Analytics & Data Visualization</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container>
          <Title order={2} mb="md">Sensor Dashboard</Title>
          <Text c="dimmed">Dashboard is loading. Connect to PocketBase server to see live data.</Text>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
