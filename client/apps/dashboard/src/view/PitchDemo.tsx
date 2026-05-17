// ─── Pitch Demo — in-app auto-play ────────────────────────────
// One sidebar click runs the whole mock-RAG story by itself:
// drives the real UI (opens New Batch, types Gesha·Natural, shows the
// grounded reference, applies it, then the Analysis page) with a
// narration caption. Read-only — it never writes the DB.
//
// Single source of truth = a timed script here. Views render from
// state.demo; cancellation is via a run-id bump (Stop / re-start).

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Group, Text, Stack, Progress, Button, ThemeIcon, Box } from '@mantine/core';
import { IconSparkles, IconPlayerStopFilled } from '@tabler/icons-react';
import { useStore, dispatch } from '../state/store';

// Completed Gesha · natural batch that has an existing analysis (read-only).
const GESHA_BATCH = 'mwfquvp2me6d6wr';

export function PitchDemo() {
  const demo = useStore().demo;
  const navigate = useNavigate();
  const runId = useRef(0);
  // Keep a stable handle — navigate's identity changes on every route
  // change, and the demo navigates, so it must NOT be an effect dep
  // (otherwise the effect restarts and the demo loops back to step 1).
  const navRef = useRef(navigate);
  navRef.current = navigate;

  useEffect(() => {
    if (!demo.active) return;
    const go = (path: string) => navRef.current(path);

    const myRun = ++runId.current;
    const alive = () => runId.current === myRun && useStore.getState().demo.active;
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const setStep = (step: number, title: string, caption: string) =>
      dispatch({ type: 'demo/SET_STEP', payload: { step, title, caption } });

    (async () => {
      // 1 — Knowledge base
      setStep(1, 'Recipe Library',
        'ทุก batch ที่ทำเสร็จถูกสกัดเป็น “สูตร” อัตโนมัติ — นี่คือคลังความรู้ของ RAG');
      go('/recipes');
      await sleep(3000); if (!alive()) return;

      // 2 — Start a new batch
      setStep(2, 'New Batch', 'เริ่ม batch ใหม่ — Gesha กระบวนการ Natural');
      go('/batches');
      await sleep(1400); if (!alive()) return;
      dispatch({ type: 'demo/OPEN_NEW_BATCH', payload: { open: true } });
      await sleep(1800); if (!alive()) return;

      // 3 — Retrieve (type it out)
      setStep(3, 'Retrieve', 'พอเลือกสายพันธุ์ + กระบวนการ ระบบค้นประวัติให้ทันที…');
      dispatch({ type: 'demo/SET_FORM', payload: { form: { name: 'Gesha Natural — Pitch Demo' } } });
      await sleep(500); if (!alive()) return;
      const target = 'Gesha';
      for (let i = 1; i <= target.length; i++) {
        dispatch({ type: 'demo/SET_FORM', payload: { form: { variety: target.slice(0, i) } } });
        await sleep(170); if (!alive()) return;
      }
      dispatch({ type: 'demo/SET_FORM', payload: { form: { process: 'natural' } } });
      await sleep(1500); if (!alive()) return; // debounce + retrieval

      // 4 — Grounded reference (the heart of RAG)
      setStep(4, 'Grounded Reference',
        'เจอสูตร Gesha · Natural ที่เคยทำได้ พร้อม “citation” ว่าอ้างอิงจาก batch ไหน — หัวใจของ RAG');
      await sleep(4500); if (!alive()) return;

      // 5 — Augment the new batch
      setStep(5, 'Augment', 'ดึงพารามิเตอร์ที่เรียนรู้มาใส่ batch ใหม่ได้ในคลิกเดียว');
      dispatch({ type: 'demo/APPLY_AMBIENT', payload: { value: true } });
      await sleep(2800); if (!alive()) return;

      // 6 — Closed loop on the real Analysis page
      setStep(6, 'Closed Loop', 'ในหน้า Analysis ของ batch จริง คำแนะนำก็ผูกกับหลักฐานเสมอ');
      dispatch({ type: 'demo/OPEN_NEW_BATCH', payload: { open: false } });
      dispatch({ type: 'demo/APPLY_AMBIENT', payload: { value: false } });
      await sleep(600); if (!alive()) return;
      go(`/batches/${GESHA_BATCH}/analysis`);
      await sleep(3000); if (!alive()) return;
      document.getElementById('demo-retrieved-ref')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(5000); if (!alive()) return;

      dispatch({ type: 'demo/STOP' });
    })();
    // Cancellation: next run bumps runId; Stop sets demo.active=false → alive() false.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo.active]);

  if (!demo.active) return null;

  const pct = (demo.step / demo.totalSteps) * 100;

  return (
    <Box
      style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1100, width: 'min(560px, calc(100vw - 32px))',
      }}
    >
      <Paper withBorder shadow="xl" p="md" radius="md" bg="forest-green.0">
        <Group justify="space-between" wrap="nowrap" mb="xs">
          <Group gap="xs" wrap="nowrap">
            <ThemeIcon size="md" variant="light" color="forest-green" radius="xl">
              <IconSparkles size={15} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text fz={10} ff="'Space Mono', monospace" c="dimmed" tt="uppercase" lts="0.06em">
                Pitch Demo · Step {demo.step}/{demo.totalSteps}
              </Text>
              <Text size="sm" fw={800}>{demo.title}</Text>
            </Stack>
          </Group>
          <Button
            size="compact-xs"
            variant="subtle"
            color="gray"
            leftSection={<IconPlayerStopFilled size={11} />}
            onClick={() => dispatch({ type: 'demo/STOP' })}
          >
            Stop
          </Button>
        </Group>
        <Text size="sm" lh={1.6} mb="sm">{demo.caption}</Text>
        <Progress value={pct} color="forest-green" size="sm" radius="xl" animated />
      </Paper>
    </Box>
  );
}
