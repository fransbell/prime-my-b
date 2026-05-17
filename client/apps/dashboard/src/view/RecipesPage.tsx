// ─── Recipes Page (Feature 5 — Learning & Recipe Builder) ─────
// Shows all saved recipe templates learned from completed batches.
// Route: /recipes

import {
  Box, Card, Text, Group, Badge, Stack, Grid,
  Center, Skeleton, ThemeIcon, SimpleGrid, Button, Divider,
} from '@mantine/core';
import {
  IconBookmark, IconStar, IconFlask,
  IconThermometer, IconClock, IconPlant2,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { Recipe, ProcessType } from '../state/Model';

const effects: Effects = createEffects(dispatch as any);

// ─── Helpers ──────────────────────────────────────────────────

const PROCESS_COLOR: Record<ProcessType, string> = {
  washed:    'blue',
  natural:   'orange',
  honey:     'yellow',
  anaerobic: 'violet',
};

function scoreColor(score?: number): string {
  if (score == null) return 'gray';
  if (score >= 87) return 'forest-green';
  if (score >= 84) return 'yellow';
  return 'orange';
}

// ─── Recipe Card ──────────────────────────────────────────────

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card withBorder>
      <Group justify="space-between" mb="sm" wrap="nowrap">
        <Group gap="xs" style={{ flex: 1, minWidth: 0 }}>
          <ThemeIcon size="sm" variant="light" color="forest-green">
            <IconBookmark size={12} />
          </ThemeIcon>
          <Text size="sm" fw={700} lineClamp={1}>{recipe.variety}</Text>
        </Group>
        <Badge size="sm" color={PROCESS_COLOR[recipe.processType]} variant="light" tt="capitalize">
          {recipe.processType}
        </Badge>
      </Group>

      {recipe.targetFlavorProfile && (
        <Text size="xs" c="dimmed" mb="sm" lh={1.5}>
          {recipe.targetFlavorProfile}
        </Text>
      )}

      <Divider mb="sm" />

      <SimpleGrid cols={2} spacing="xs">
        {recipe.targetPh != null && (
          <Box>
            <Group gap={4}>
              <IconFlask size={11} color="var(--mantine-color-dimmed)" />
              <Text fz={10} c="dimmed" tt="uppercase" lts="0.04em">Target pH</Text>
            </Group>
            <Text size="xs" fw={700} ff="'Space Mono', monospace">{recipe.targetPh.toFixed(2)}</Text>
          </Box>
        )}
        {recipe.fermentationHours != null && (
          <Box>
            <Group gap={4}>
              <IconClock size={11} color="var(--mantine-color-dimmed)" />
              <Text fz={10} c="dimmed" tt="uppercase" lts="0.04em">Duration</Text>
            </Group>
            <Text size="xs" fw={700} ff="'Space Mono', monospace">{recipe.fermentationHours}h</Text>
          </Box>
        )}
        {(recipe.ambientTempMin != null || recipe.ambientTempMax != null) && (
          <Box>
            <Group gap={4}>
              <IconThermometer size={11} color="var(--mantine-color-dimmed)" />
              <Text fz={10} c="dimmed" tt="uppercase" lts="0.04em">Ambient</Text>
            </Group>
            <Text size="xs" fw={700} ff="'Space Mono', monospace">
              {recipe.ambientTempMin?.toFixed(0) ?? '—'}–{recipe.ambientTempMax?.toFixed(0) ?? '—'}°C
            </Text>
          </Box>
        )}
        {recipe.batchCount != null && (
          <Box>
            <Group gap={4}>
              <IconPlant2 size={11} color="var(--mantine-color-dimmed)" />
              <Text fz={10} c="dimmed" tt="uppercase" lts="0.04em">Batches</Text>
            </Group>
            <Text size="xs" fw={700} ff="'Space Mono', monospace">{recipe.batchCount}</Text>
          </Box>
        )}
      </SimpleGrid>

      {recipe.avgCuppingScore != null && (
        <>
          <Divider my="sm" />
          <Group justify="space-between">
            <Group gap={4}>
              <IconStar size={12} color="var(--mantine-color-muted-gold-6)" />
              <Text fz={10} c="dimmed">Avg cupping score</Text>
            </Group>
            <Text
              size="sm"
              fw={800}
              ff="'Space Mono', monospace"
              c={`${scoreColor(recipe.avgCuppingScore)}.6`}
            >
              {recipe.avgCuppingScore.toFixed(1)}
            </Text>
          </Group>
        </>
      )}

      {recipe.notes && (
        <Text fz={10} c="dimmed" mt="sm" lh={1.5}>{recipe.notes}</Text>
      )}

      {recipe.lastUpdated && (
        <Text fz={9} c="dimmed" mt="sm" opacity={0.5} ff="'Space Mono', monospace">
          Updated {new Date(recipe.lastUpdated).toLocaleDateString()}
        </Text>
      )}
    </Card>
  );
}

// ─── Group recipes by variety ─────────────────────────────────

function groupByVariety(recipes: Recipe[]): Map<string, Recipe[]> {
  const map = new Map<string, Recipe[]>();
  for (const r of recipes) {
    const key = r.variety || 'Unknown';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return map;
}

// ─── Main Page ────────────────────────────────────────────────

export function RecipesPage() {
  const state = useStore();
  const recipes = state.recipes;
  const loading = state.loading;

  useEffect(() => {
    effects.fetchRecipes();
  }, []);

  const grouped = groupByVariety(recipes);

  return (
    <Box p="xl" maw={1100} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb={4}>
              Learning & Recipe Builder
            </Text>
            <Text size="xl" fw={800}>Recipe Library</Text>
            <Text size="xs" c="dimmed" mt={4}>
              Learned from completed batches. Save more batches to improve recommendations.
            </Text>
          </Box>
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            onClick={() => effects.fetchRecipes()}
          >
            Refresh
          </Button>
        </Group>

        {/* Content */}
        {loading ? (
          <Grid>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                <Skeleton height={220} />
              </Grid.Col>
            ))}
          </Grid>
        ) : recipes.length === 0 ? (
          <Center py={80}>
            <Stack align="center" gap="md">
              <ThemeIcon size={56} variant="light" color="gray" radius="xl">
                <IconBookmark size={28} />
              </ThemeIcon>
              <Text c="dimmed" ta="center" maw={320} lh={1.6}>
                No recipes yet. Complete a batch, submit a cupping score, and click
                "Save as Recipe" to start building your library.
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack gap="xl">
            {Array.from(grouped.entries()).map(([variety, varietyRecipes]) => (
              <Box key={variety}>
                <Group gap="xs" mb="md">
                  <ThemeIcon size="sm" variant="light" color="forest-green">
                    <IconPlant2 size={12} />
                  </ThemeIcon>
                  <Text size="sm" fw={700}>{variety}</Text>
                  <Text fz={10} c="dimmed">({varietyRecipes.length} recipe{varietyRecipes.length > 1 ? 's' : ''})</Text>
                </Group>
                <Grid>
                  {varietyRecipes.map(recipe => (
                    <Grid.Col key={recipe.id} span={{ base: 12, sm: 6, md: 4 }}>
                      <RecipeCard recipe={recipe} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
