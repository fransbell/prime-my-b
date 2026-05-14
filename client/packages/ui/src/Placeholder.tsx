import { Center, Text, Stack } from '@mantine/core';

interface PlaceholderProps {
  title: string;
  description?: string;
}

export function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <Center mih={200}>
      <Stack align="center" gap="xs">
        <Text fw={500}>{title}</Text>
        {description && (
          <Text size="sm" c="dimmed">{description}</Text>
        )}
      </Stack>
    </Center>
  );
}
