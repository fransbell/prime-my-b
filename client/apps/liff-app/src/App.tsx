import { AppShell, Group, Title, Text, Container, Stack } from '@mantine/core';

function App() {
  return (
    <AppShell header={{ height: 50 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={4}>Prime My Brain</Title>
          <Text size="xs" c="dimmed">LINE LIFF</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xs">
          <Stack gap="md">
            <Title order={2}>Welcome, Farmer</Title>
            <Text c="dimmed">LINE LIFF application is loading. Connect to PocketBase to see your sensor data.</Text>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
