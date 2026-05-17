// ─── Analysis Page ─────────────────────────────────────────────
// Full-page AI fermentation analysis for a single batch.
// Route: /batches/:id/analysis

import {
  Box, Card, Text, Group, Badge, Stack, Grid, Progress,
  Divider, Button, Center, Skeleton, ThemeIcon, Timeline,
  Alert as MantineAlert, SimpleGrid, RingProgress,
} from '@mantine/core';
import {
  IconArrowLeft, IconBolt, IconAlertTriangle,
  IconCircleCheck, IconCircleX, IconFlask,
  IconThermometer, IconChartLine, IconClock,
  IconDroplet, IconWind, IconRefresh,
  IconTarget, IconHistory, IconSparkles, IconBookmark,
} from '@tabler/icons-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore, dispatch } from '../state/store';
import { createEffects, type Effects } from '../effects';
import type { BatchRecord, TriggeredRule, FermentationPhase, ProcessRecommendation, SimilarBatch, RetrievedReference } from '../state/Model';
import { getLatestAnalysis } from './analysisDisplay';

const effects: Effects = createEffects(dispatch as any);

// ─── Helpers ──────────────────────────────────────────────────

const RISK_CONFIG: Record<string, { color: string; label: string; mantine: string }> = {
  safe:     { color: 'green.6',  label: 'Safe',     mantine: 'green'  },
  caution:  { color: 'yellow.6', label: 'Caution',  mantine: 'yellow' },
  warning:  { color: 'orange.6', label: 'Warning',  mantine: 'orange' },
  critical: { color: 'red.6',    label: 'Critical', mantine: 'red'    },
};

const PHASE_LABELS: Record<FermentationPhase, { label: string; desc: string; phRange: string }> = {
  phase1:   { label: 'Phase 1 — Initial Breakdown',    desc: 'Enterobacteriaceae present, mucilage begins breaking down. Yeast and LAB establishing.',         phRange: '5.5 – 6.5' },
  phase2:   { label: 'Phase 2 — Primary Fermentation', desc: 'LAB becomes dominant. Lactic acid accumulating, yeast active. pH dropping steadily.',            phRange: '4.8 – 5.5' },
  phase3:   { label: 'Phase 3 — Active Acid Drop',     desc: 'LAB at peak activity. Pectinase optimal pH (4.5–5.0). Rate-of-change at maximum.',               phRange: '4.2 – 4.8' },
  phase4:   { label: 'Phase 4 — Finish Zone',          desc: 'Mucilage nearly exhausted. Carbon source depleting. Approach target pH carefully.',               phRange: '3.7 – 4.2' },
  complete: { label: 'Fermentation Complete',           desc: 'Target pH reached. Remove from tank and wash or transfer to drying immediately.',                 phRange: '< 3.7' },
};

function parseJson<T>(val: unknown): T | null {
  if (!val) return null;
  if (typeof val === 'object') return val as T;
  try { return JSON.parse(val as string); } catch { return null; }
}

function ruleStatusIcon(status: TriggeredRule['status']) {
  if (status === 'critical') return <IconCircleX size={14} color="var(--mantine-color-red-6)" />;
  if (status === 'warn')     return <IconAlertTriangle size={14} color="var(--mantine-color-orange-6)" />;
  return <IconCircleCheck size={14} color="var(--mantine-color-green-6)" />;
}

function ruleColor(status: TriggeredRule['status']) {
  if (status === 'critical') return 'red';
  if (status === 'warn')     return 'orange';
  return 'green';
}

// ─── Sub-components ───────────────────────────────────────────

function StatCard({ label, value, unit, icon: Icon, color = 'forest-green', hint }: {
  label: string; value: string | null; unit?: string;
  icon: React.ElementType; color?: string; hint?: string;
}) {
  return (
    <Card withBorder padding="md">
      <Group gap="xs" mb={6}>
        <ThemeIcon size="sm" variant="light" color={color}>
          <Icon size={12} />
        </ThemeIcon>
        <Text fz={9} ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
          {label}
        </Text>
      </Group>
      <Text size="xl" fw={800} ff="'Space Mono', monospace" c={value ? undefined : 'dimmed'}>
        {value ?? '—'}
        {value && unit && (
          <Text component="span" size="sm" c="dimmed" ml={4}>{unit}</Text>
        )}
      </Text>
      {hint && (
        <Text fz={10} c="dimmed" mt={4} lh={1.4}>{hint}</Text>
      )}
    </Card>
  );
}

// Thai presenter caption — small dimmed line under a section header.
function SectionCaption({ children }: { children: React.ReactNode }) {
  return (
    <Text fz={11} c="dimmed" lh={1.5} mb="sm" mt={-6}>
      {children}
    </Text>
  );
}

function PhaseTimeline({ currentPhase }: { currentPhase: FermentationPhase }) {
  const phases: FermentationPhase[] = ['phase1', 'phase2', 'phase3', 'phase4', 'complete'];
  const currentIdx = phases.indexOf(currentPhase);

  return (
    <Timeline active={currentIdx} bulletSize={20} lineWidth={2} color="forest-green">
      {phases.map((phase, i) => {
        const info = PHASE_LABELS[phase];
        const isPast = i < currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <Timeline.Item
            key={phase}
            bullet={isCurrent ? <IconFlask size={12} /> : undefined}
            title={
              <Text
                size="sm"
                fw={isCurrent ? 700 : 400}
                c={isCurrent ? 'forest-green.7' : isPast ? 'dimmed' : undefined}
              >
                {info.label}
              </Text>
            }
          >
            <Text size="xs" c="dimmed" mt={2}>pH {info.phRange}</Text>
            {isCurrent && (
              <Text size="xs" c="dimmed" mt={4} lh={1.5}>{info.desc}</Text>
            )}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
}

function RuleRow({ rule }: { rule: TriggeredRule }) {
  return (
    <Group
      gap="sm"
      p="xs"
      bg={rule.status === 'critical' ? 'red.0' : rule.status === 'warn' ? 'orange.0' : 'green.0'}
      style={{ borderRadius: 'var(--mantine-radius-sm)' }}
      wrap="nowrap"
      align="flex-start"
    >
      <Box mt={1}>{ruleStatusIcon(rule.status)}</Box>
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Group gap={6} mb={2}>
          <Badge size="xs" variant="outline" color={ruleColor(rule.status)} ff="'Space Mono', monospace">
            {rule.id}
          </Badge>
          <Badge size="xs" variant="light" color={ruleColor(rule.status)}>
            {rule.status === 'critical' ? 'Critical' : rule.status === 'warn' ? 'Warning' : 'Pass'}
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" lh={1.5}>{rule.message}</Text>
      </Box>
    </Group>
  );
}

// ─── Feature 3: Process Optimizer Card ───────────────────────

const REC_LEVEL_COLOR: Record<ProcessRecommendation['level'], string> = {
  ideal:      'forest-green',
  acceptable: 'yellow',
  caution:    'red',
};

const REC_LEVEL_LABEL: Record<ProcessRecommendation['level'], string> = {
  ideal:      'Ideal',
  acceptable: 'Acceptable',
  caution:    'Caution',
};

function ProcessOptimizerCard({ recommendations }: { recommendations: ProcessRecommendation[] }) {
  if (recommendations.length === 0) return null;
  return (
    <Card withBorder>
      <Group gap="xs" mb="md">
        <ThemeIcon size="sm" variant="light" color="forest-green">
          <IconTarget size={12} />
        </ThemeIcon>
        <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
          Process Optimizer
        </Text>
      </Group>
      <SectionCaption>
        ข้อเสนอปรับกระบวนการให้เข้ากับสายพันธุ์และโปรไฟล์รสที่ตั้งเป้าไว้
      </SectionCaption>
      <Stack gap="xs">
        {recommendations.map((rec, i) => (
          <Box
            key={i}
            p="xs"
            bg={rec.level === 'ideal' ? 'green.0' : rec.level === 'acceptable' ? 'yellow.0' : 'red.0'}
            style={{ borderRadius: 'var(--mantine-radius-sm)' }}
          >
            <Group gap="xs" mb={4} wrap="nowrap">
              <Badge size="xs" variant="light" color={REC_LEVEL_COLOR[rec.level]}>
                {REC_LEVEL_LABEL[rec.level]}
              </Badge>
            </Group>
            <Text size="xs" fw={500}>{rec.message}</Text>
            {rec.detail && (
              <Text fz={10} c="dimmed" mt={2}>{rec.detail}</Text>
            )}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

// ─── Feature 4: Similar Batches Card ─────────────────────────

function SimilarBatchesCard({ batches }: { batches: SimilarBatch[] }) {
  if (batches.length === 0) return null;
  return (
    <Card withBorder>
      <Group gap="xs" mb="md">
        <ThemeIcon size="sm" variant="light" color="muted-gold">
          <IconHistory size={12} />
        </ThemeIcon>
        <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
          Similar Batches
        </Text>
        <Text fz={10} c="dimmed">(by variety + process + duration)</Text>
      </Group>
      <SectionCaption>
        batch ในอดีตที่คล้ายกัน ใช้เทียบผลจริงกับที่ทำนาย และตั้งความคาดหวังคะแนน
      </SectionCaption>
      <Stack gap="sm">
        {batches.map((b, i) => (
          <Box key={b.batchId}>
            {i > 0 && <Divider mb="sm" />}
            <Group justify="space-between" mb={4} wrap="nowrap">
              <Text size="xs" fw={600} style={{ flex: 1 }} lineClamp={1}>{b.batchName}</Text>
              <Badge size="xs" variant="outline" color="gray" ff="'Space Mono', monospace">
                {b.similarityScore}% match
              </Badge>
            </Group>
            <Group gap="xs" wrap="wrap">
              <Badge size="xs" variant="light" color="gray" tt="capitalize">{b.processType}</Badge>
              {b.variety && <Text fz={10} c="dimmed">{b.variety}</Text>}
              {b.fermentationHours != null && (
                <Text fz={10} c="dimmed" ff="'Space Mono', monospace">{b.fermentationHours}h</Text>
              )}
              {b.stopPh != null && (
                <Text fz={10} c="dimmed" ff="'Space Mono', monospace">stop pH {b.stopPh.toFixed(2)}</Text>
              )}
            </Group>
            <Group gap="md" mt={6}>
              {b.actualCuppingScore != null && (
                <Group gap={4}>
                  <Text fz={10} c="dimmed">Actual</Text>
                  <Text fz={10} fw={700} c="muted-gold.6" ff="'Space Mono', monospace">
                    {b.actualCuppingScore.toFixed(1)}
                  </Text>
                </Group>
              )}
              {b.predictedScore != null && (
                <Group gap={4}>
                  <Text fz={10} c="dimmed">Predicted</Text>
                  <Text fz={10} c="dimmed" ff="'Space Mono', monospace">
                    {b.predictedScore.toFixed(1)}
                  </Text>
                </Group>
              )}
            </Group>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

// ─── Mock RAG — Retrieved Reference Card ─────────────────────

const CONFIDENCE_COLOR: Record<'low' | 'medium' | 'high', string> = {
  low: 'gray',
  medium: 'yellow',
  high: 'forest-green',
};

function RetrievedReferenceCard({ reference }: { reference: RetrievedReference | null }) {
  if (!reference) return null;
  const sp = reference.suggestedParams;
  return (
    <Card withBorder id="demo-retrieved-ref">
      <Group justify="space-between" mb="md" wrap="nowrap">
        <Group gap="xs">
          <ThemeIcon size="sm" variant="light" color="forest-green">
            <IconSparkles size={12} />
          </ThemeIcon>
          <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
            Retrieved Reference
          </Text>
        </Group>
        <Badge size="xs" variant="light" color={CONFIDENCE_COLOR[reference.confidence]}>
          {reference.confidence} confidence
        </Badge>
      </Group>

      <SectionCaption>
        หัวใจของระบบ (RAG): ดึง “สูตร” จากประวัติที่คล้ายที่สุด พร้อมอ้างอิงว่ามาจาก batch ไหน
        และมั่นใจแค่ไหน — คำแนะนำทุกอย่างผูกกับหลักฐาน ไม่ได้เดา
      </SectionCaption>

      <Text size="xs" lh={1.7} mb="sm">{reference.summary}</Text>

      {(sp.targetPh != null || sp.fermentationHours != null ||
        (sp.ambientTempMin != null && sp.ambientTempMax != null)) && (
        <SimpleGrid cols={3} spacing="xs" mb="sm">
          {sp.targetPh != null && (
            <Box>
              <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em">Recipe pH</Text>
              <Text size="xs" fw={700} ff="'Space Mono', monospace">{sp.targetPh.toFixed(2)}</Text>
            </Box>
          )}
          {sp.fermentationHours != null && (
            <Box>
              <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em">Recipe ferment</Text>
              <Text size="xs" fw={700} ff="'Space Mono', monospace">{sp.fermentationHours}h</Text>
            </Box>
          )}
          {sp.ambientTempMin != null && sp.ambientTempMax != null && (
            <Box>
              <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em">Recipe ambient</Text>
              <Text size="xs" fw={700} ff="'Space Mono', monospace">
                {sp.ambientTempMin.toFixed(0)}–{sp.ambientTempMax.toFixed(0)}°C
              </Text>
            </Box>
          )}
        </SimpleGrid>
      )}

      {reference.citations.length > 0 && (
        <>
          <Divider mb="sm" />
          <Group gap={4}>
            <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em" mr={2}>Grounded in</Text>
            {reference.citations.map(c => (
              <Badge
                key={c.kind + c.id}
                size="xs"
                variant="outline"
                color={c.kind === 'recipe' ? 'forest-green' : 'gray'}
                leftSection={c.kind === 'recipe' ? <IconBookmark size={9} /> : undefined}
                ff="'Space Mono', monospace"
              >
                {c.label} · {c.score}%
              </Badge>
            ))}
          </Group>
        </>
      )}
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useStore();
  const [batch, setBatch] = useState<BatchRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch({ type: 'batch/SELECT', payload: { batchId: id } });
    Promise.all([
      effects.fetchBatch(id).then(b => {
        setBatch(b);
        setLoading(false);
        if (b) {
          effects.retrieveReferences({
            variety: b.coffeeVariety ?? '',
            processType: b.processType,
            flavorProfile: b.targetFlavorProfile || undefined,
            ambientTemp: b.ambientTemp,
          });
        }
      }),
      effects.fetchAnalysis(id),
      effects.fetchAnalysisHistory(id),
    ]);
    return () => { dispatch({ type: 'recipe/RETRIEVE_CLEAR' }); };
  }, [id]);

  const handleAnalyze = async () => {
    if (!id) return;
    setAnalyzing(true);
    await effects.triggerAnalysis(id);
    setAnalyzing(false);
  };

  if (loading) {
    return (
      <Box p="xl" maw={1100} mx="auto">
        <Skeleton height={32} w={200} mb="lg" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="lg">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={90} />)}
        </SimpleGrid>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}><Skeleton height={400} /></Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}><Skeleton height={400} /></Grid.Col>
        </Grid>
      </Box>
    );
  }

  if (!batch) {
    return (
      <Box p="xl" ta="center">
        <Text c="dimmed">Batch not found.</Text>
        <Button variant="outline" mt="md" onClick={() => navigate('/batches')}>Back to batches</Button>
      </Box>
    );
  }

  const analysis = getLatestAnalysis(state.batchAnalysis, state.analysisHistory);

  const triggeredRules: TriggeredRule[] = analysis
    ? (parseJson<TriggeredRule[]>(analysis.triggeredRules) ?? [])
    : [];

  const processRecommendations: ProcessRecommendation[] = analysis
    ? (parseJson<ProcessRecommendation[]>(analysis.processRecommendations) ?? [])
    : [];

  const similarBatches: SimilarBatch[] = analysis
    ? (parseJson<SimilarBatch[]>(analysis.similarBatches) ?? [])
    : [];

  const phasePh = analysis ? parseJson<{ min: number; max: number }>(analysis.phasePh) : null;
  const phase = (analysis?.fermentationPhase ?? 'phase1') as FermentationPhase;
  const phaseInfo = PHASE_LABELS[phase];

  const riskCfg = RISK_CONFIG[analysis?.riskLevel ?? 'safe'];
  const criticalCount = triggeredRules.filter(r => r.status === 'critical').length;
  const warnCount = triggeredRules.filter(r => r.status === 'warn').length;
  const passCount = triggeredRules.filter(r => r.status === 'pass').length;
  const totalRules = triggeredRules.length;

  const scoreRingValue = analysis?.predictedScore
    ? Math.round(((analysis.predictedScore - 60) / 40) * 100)
    : 0;

  return (
    <Box p="xl" maw={1100} mx="auto">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
          <Group gap="sm">
            <Button
              component={Link}
              to={`/batches/${id}`}
              variant="subtle"
              size="xs"
              leftSection={<IconArrowLeft size={14} />}
              color="gray"
            >
              {batch.name}
            </Button>
          </Group>
          <Group gap="xs">
            <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
              AI Analysis
            </Text>
            {analysis && (
              <Badge size="sm" variant="light" color={riskCfg.mantine}>
                {riskCfg.label}
              </Badge>
            )}
          </Group>
          <Button
            size="xs"
            variant="outline"
            leftSection={<IconRefresh size={14} />}
            loading={analyzing}
            onClick={handleAnalyze}
          >
            {analysis ? 'Re-run Analysis' : 'Run Analysis'}
          </Button>
        </Group>

        {!analysis ? (
          <Center py={60}>
            <Stack align="center" gap="md">
              <ThemeIcon size={48} variant="light" color="gray" radius="xl">
                <IconBolt size={24} />
              </ThemeIcon>
              <Text c="dimmed" ta="center">No analysis yet. Run analysis to see predictions.</Text>
              <Button
                variant="filled"
                color="forest-green"
                leftSection={<IconBolt size={14} />}
                loading={analyzing}
                onClick={handleAnalyze}
              >
                Run Analysis
              </Button>
            </Stack>
          </Center>
        ) : (
          <>
            {/* Stat Cards Row */}
            <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }}>
              <StatCard
                label="Predicted Score"
                value={analysis.predictedScore?.toFixed(1) ?? null}
                icon={IconChartLine}
                color="muted-gold"
                hint="คะแนน cupping ที่คาดการณ์ (สเกล SCA)"
              />
              <StatCard
                label="ΔpH / hour"
                value={analysis.phRateOfChange != null ? analysis.phRateOfChange.toFixed(3) : null}
                unit="pH/h"
                icon={IconDroplet}
                color={
                  analysis.phRateOfChange == null ? 'gray'
                    : Math.abs(analysis.phRateOfChange) < 0.02 ? 'orange'
                    : analysis.phRateOfChange < -0.14 ? 'red'
                    : 'forest-green'
                }
                hint="อัตรา pH ลดต่อชั่วโมง — เร็ว/ช้า/นิ่ง"
              />
              <StatCard
                label="Temp-adjusted ETA"
                value={analysis.tempAdjustedEta != null ? analysis.tempAdjustedEta.toFixed(1) : null}
                unit="h"
                icon={IconClock}
                color="forest-green"
                hint="เวลาที่เหลือโดยประมาณ ปรับตามอุณหภูมิจริง"
              />
              <StatCard
                label="Tank Temp"
                value={batch.latestTemp != null ? batch.latestTemp.toFixed(1) : null}
                unit="°C"
                icon={IconThermometer}
                color={batch.latestTemp != null && batch.latestTemp > 30 ? 'red' : 'forest-green'}
                hint="อุณหภูมิถังหมักล่าสุด (>30° = เสี่ยง)"
              />
            </SimpleGrid>

            {/* Main Grid */}
            <Grid gutter="lg">
              {/* Left: Phase Timeline + Rules */}
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">

                  {/* Fermentation Phase */}
                  <Card withBorder>
                    <Group justify="space-between" mb="md">
                      <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                        Fermentation Phase
                      </Text>
                      <Group gap="xs">
                        <Badge size="xs" variant="light" color="forest-green" ff="'Space Mono', monospace">
                          {phaseInfo.label.split('—')[0].trim()}
                        </Badge>
                        {phasePh && (
                          <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                            pH {phasePh.min}–{phasePh.max}
                          </Text>
                        )}
                      </Group>
                    </Group>

                    <SectionCaption>
                      ระยะการหมักปัจจุบัน อิงค่า pH — บอกว่าตอนนี้จุลินทรีย์ทำงานอยู่ช่วงไหน
                      และเหลืออีกกี่ stage จนเสร็จ
                    </SectionCaption>

                    <Box mb="lg">
                      <Group justify="space-between" mb={6}>
                        <Text size="xs" fw={600}>{analysis.stage}</Text>
                        <Text size="xs" ff="'Space Mono', monospace" c="dimmed">
                          Stage {analysis.stageNumber} / {analysis.totalStages}
                        </Text>
                      </Group>
                      <Progress
                        value={(analysis.stageNumber / analysis.totalStages) * 100}
                        color="forest-green"
                        size="md"
                        radius="md"
                      />
                    </Box>

                    <MantineAlert
                      variant="light"
                      color="forest-green"
                      icon={<IconFlask size={16} />}
                      mb="lg"
                    >
                      <Text size="xs" lh={1.6}>{phaseInfo.desc}</Text>
                    </MantineAlert>

                    <PhaseTimeline currentPhase={phase} />
                  </Card>

                  {/* Decision Rules */}
                  <Card withBorder>
                    <Group justify="space-between" mb="md">
                      <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                        Decision Rules
                      </Text>
                      <Group gap="xs">
                        {criticalCount > 0 && (
                          <Badge size="xs" color="red" variant="filled">{criticalCount} Critical</Badge>
                        )}
                        {warnCount > 0 && (
                          <Badge size="xs" color="orange" variant="filled">{warnCount} Warning</Badge>
                        )}
                        {passCount > 0 && (
                          <Badge size="xs" color="green" variant="light">{passCount} Pass</Badge>
                        )}
                      </Group>
                    </Group>

                    <SectionCaption>
                      กฎความปลอดภัยอัตโนมัติ ตรวจทุกเงื่อนไข (pH / อุณหภูมิ / CO₂ / เวลา)
                      แล้วจัดระดับ ผ่าน · เตือน · วิกฤต
                    </SectionCaption>

                    {triggeredRules.length === 0 ? (
                      <Text size="xs" c="dimmed" ta="center" py="md">
                        No rules evaluated — run analysis to check conditions.
                      </Text>
                    ) : (
                      <Stack gap="xs">
                        {/* Critical first, then warn, then pass */}
                        {['critical', 'warn', 'pass'].flatMap(status =>
                          triggeredRules
                            .filter(r => r.status === status)
                            .map(rule => <RuleRow key={rule.id + rule.status} rule={rule} />)
                        )}
                      </Stack>
                    )}

                    {totalRules > 0 && (
                      <>
                        <Divider my="md" />
                        <Group gap="xs">
                          <Text size="xs" c="dimmed">Rule coverage:</Text>
                          <Progress
                            value={passCount / totalRules * 100}
                            color="green"
                            size="xs"
                            style={{ flex: 1 }}
                          />
                          <Text size="xs" c="dimmed" ff="'Space Mono', monospace">
                            {passCount}/{totalRules} passing
                          </Text>
                        </Group>
                      </>
                    )}
                  </Card>

                  {/* Recommendation */}
                  <Card withBorder>
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                      Recommendation
                    </Text>
                    <SectionCaption>
                      คำแนะนำเชิงปฏิบัติ สรุปจากกฎที่ทริกเกอร์ ว่าตอนนี้ควรลงมือทำอะไรต่อ
                    </SectionCaption>
                    <Text size="sm" lh={1.7}>{analysis.recommendation}</Text>
                    {analysis.createdAt && (
                      <Text fz={10} c="dimmed" ff="'Space Mono', monospace" mt="md" opacity={0.6}>
                        Last updated {new Date(analysis.createdAt).toLocaleString()}
                      </Text>
                    )}
                  </Card>

                  {/* Feature 3 — Process Optimizer */}
                  <ProcessOptimizerCard recommendations={processRecommendations} />

                  {/* Mock RAG — Retrieved Reference (recipe + evidence) */}
                  <RetrievedReferenceCard reference={state.retrievedReference} />

                  {/* Feature 4 — Similar Batches */}
                  <SimilarBatchesCard batches={similarBatches} />

                </Stack>
              </Grid.Col>

              {/* Right: Score ring + key metrics */}
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="lg">

                  {/* Predicted score ring */}
                  <Card withBorder>
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                      Quality Prediction
                    </Text>
                    <SectionCaption>
                      คะแนน cupping ที่คาดการณ์ (สเกล SCA) พร้อมระดับความเสี่ยงและข้อมูล batch
                    </SectionCaption>
                    <Center mb="md">
                      <RingProgress
                        size={140}
                        thickness={12}
                        roundCaps
                        sections={[{
                          value: scoreRingValue,
                          color: scoreRingValue >= 75 ? 'forest-green' : scoreRingValue >= 50 ? 'yellow' : 'red',
                        }]}
                        label={
                          <Center>
                            <Stack gap={0} align="center">
                              <Text size="xl" fw={800} ff="'Space Mono', monospace" c="muted-gold.6">
                                {analysis.predictedScore?.toFixed(1) ?? '—'}
                              </Text>
                              <Text fz={9} c="dimmed" tt="uppercase" lts="0.04em">SCA Score</Text>
                            </Stack>
                          </Center>
                        }
                      />
                    </Center>
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Risk level</Text>
                        <Badge size="xs" color={riskCfg.mantine} variant="light">{riskCfg.label}</Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">Process</Text>
                        <Badge size="xs" variant="outline" color="gray" tt="capitalize">{batch.processType}</Badge>
                      </Group>
                      {batch.coffeeVariety && (
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">Variety</Text>
                          <Text size="xs" fw={600}>{batch.coffeeVariety}</Text>
                        </Group>
                      )}
                      {analysis.varietyFloor != null && (
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">Variety floor pH</Text>
                          <Text size="xs" fw={600} ff="'Space Mono', monospace" c="red.6">
                            {analysis.varietyFloor}
                          </Text>
                        </Group>
                      )}
                    </Stack>
                  </Card>

                  {/* pH rate interpretation */}
                  <Card withBorder>
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                      ΔpH / Hour
                    </Text>
                    <SectionCaption>
                      อัตราที่ pH ลดต่อชั่วโมง — ช้าไป = หมักนิ่ง, เร็วไป = เสี่ยงหมักเกิน
                    </SectionCaption>
                    {analysis.phRateOfChange != null ? (
                      <Stack gap="sm">
                        <Group justify="center">
                          <Text
                            size="2rem"
                            fw={800}
                            ff="'Space Mono', monospace"
                            c={
                              Math.abs(analysis.phRateOfChange) < 0.02 ? 'orange.6'
                              : analysis.phRateOfChange < -0.14 ? 'red.6'
                              : 'forest-green.7'
                            }
                          >
                            {analysis.phRateOfChange > 0 ? '+' : ''}
                            {analysis.phRateOfChange.toFixed(3)}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed" ta="center">
                          {Math.abs(analysis.phRateOfChange) < 0.02
                            ? 'Stalled — check temperature and mucilage cleanliness'
                            : analysis.phRateOfChange < -0.14
                            ? 'Too fast — over-fermentation risk'
                            : 'Normal drop rate — fermentation active'}
                        </Text>
                        <Divider />
                        <Stack gap={4}>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Stalled threshold</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">|ΔpH/h| &lt; 0.02</Text>
                          </Group>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Fast threshold</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">|ΔpH/h| &gt; 0.14</Text>
                          </Group>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Baseline</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">0.06–0.10 pH/h</Text>
                          </Group>
                        </Stack>
                      </Stack>
                    ) : (
                      <Text size="xs" c="dimmed" ta="center">
                        Not enough readings to compute rate.
                        <br />Record at least 2 sensor readings.
                      </Text>
                    )}
                  </Card>

                  {/* Arrhenius ETA */}
                  <Card withBorder>
                    <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                      Temperature-adjusted ETA
                    </Text>
                    <SectionCaption>
                      เวลาที่เหลือจนถึง pH เป้าหมาย ปรับด้วยอุณหภูมิจริง (สมการ Arrhenius)
                    </SectionCaption>
                    {analysis.tempAdjustedEta != null ? (
                      <Stack gap="sm">
                        <Group justify="center" align="baseline" gap="xs">
                          <Text size="2rem" fw={800} ff="'Space Mono', monospace" c="forest-green.7">
                            {analysis.tempAdjustedEta.toFixed(1)}
                          </Text>
                          <Text size="sm" c="dimmed">hours</Text>
                        </Group>
                        <Text size="xs" c="dimmed" ta="center">
                          Arrhenius correction at {batch.latestTemp?.toFixed(1) ?? '—'}°C
                        </Text>
                        <Divider />
                        <Stack gap={4}>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Baseline (26°C)</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">1.00×</Text>
                          </Group>
                          {batch.latestTemp != null && (
                            <Group justify="space-between">
                              <Text fz={10} c="dimmed">At {batch.latestTemp.toFixed(1)}°C</Text>
                              <Text
                                fz={10}
                                c={batch.latestTemp > 28 ? 'orange.6' : 'dimmed'}
                                ff="'Space Mono', monospace"
                              >
                                {Math.pow(1.05, batch.latestTemp - 26).toFixed(2)}×
                              </Text>
                            </Group>
                          )}
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Target pH</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">
                              {analysis.varietyFloor != null ? analysis.varietyFloor + 0.2 : '—'}
                            </Text>
                          </Group>
                        </Stack>
                      </Stack>
                    ) : (
                      <Text size="xs" c="dimmed" ta="center">
                        Current pH at target — no remaining fermentation time estimated.
                      </Text>
                    )}
                  </Card>

                  {/* CO2 / anaerobic status */}
                  {batch.processType === 'anaerobic' && (
                    <Card withBorder>
                      <Text size="xs" ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em" mb="md">
                        Anaerobic Status
                      </Text>
                      <SectionCaption>
                        สถานะถังไร้อากาศ — ระดับ CO₂ ยืนยันการไล่ออกซิเจน และเตือนแรงดันสูง
                      </SectionCaption>
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Group gap="xs">
                            <IconWind size={14} color="var(--mantine-color-dimmed)" />
                            <Text size="xs" c="dimmed">CO₂ level</Text>
                          </Group>
                          <Text size="xs" fw={700} ff="'Space Mono', monospace"
                            c={batch.latestCo2 != null && batch.latestCo2 > 5000 ? 'red.6'
                              : batch.latestCo2 != null && batch.latestCo2 > 2000 ? 'green.6'
                              : 'dimmed'
                            }
                          >
                            {batch.latestCo2 != null ? `${batch.latestCo2} ppm` : '—'}
                          </Text>
                        </Group>
                        <Divider />
                        <Stack gap={4}>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Purge confirmed</Text>
                            <Text fz={10} c="dimmed" ff="'Space Mono', monospace">&gt; 2,000 ppm</Text>
                          </Group>
                          <Group justify="space-between">
                            <Text fz={10} c="dimmed">Pressure warning</Text>
                            <Text fz={10} c="red.6" ff="'Space Mono', monospace">&gt; 5,000 ppm</Text>
                          </Group>
                        </Stack>
                      </Stack>
                    </Card>
                  )}

                </Stack>
              </Grid.Col>
            </Grid>
          </>
        )}
      </Stack>
    </Box>
  );
}
