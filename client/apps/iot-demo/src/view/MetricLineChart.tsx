// ─── IoT Demo — Metric Line Chart (Pure SVG) ─────────────────
// Real-time line chart showing metric readings over time.
// Uses plain SVG — no chart library dependency.
// Color-coded dots show status severity.

import { useMemo } from 'react';
import type { MetricReading } from '../effects';

interface MetricLineChartProps {
  readings: MetricReading[];
  unit: string;
  normalMin: number;
  normalMax: number;
  statusColors: Record<string, string>;
}

export function MetricLineChart({
  readings,
  unit,
  normalMin,
  normalMax,
  statusColors,
}: MetricLineChartProps) {
  // Reverse so oldest is first (left → right)
  const sorted = useMemo(
    () => [...readings].reverse().slice(-30),
    [readings],
  );

  if (sorted.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem', color: '#868e96', fontSize: '0.875rem' }}>
        Need at least 2 readings to show a chart.
      </div>
    );
  }

  const values = sorted.map((r) => r.value);
  const minVal = Math.min(...values, normalMin) * 0.9;
  const maxVal = Math.max(...values, normalMax) * 1.1;
  const range = maxVal - minVal || 1;

  // SVG dimensions
  const W = 600;
  const H = 200;
  const PAD_L = 50;
  const PAD_R = 20;
  const PAD_T = 20;
  const PAD_B = 30;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const toX = (i: number) => PAD_L + (i / (sorted.length - 1)) * chartW;
  const toY = (v: number) => PAD_T + chartH - ((v - minVal) / range) * chartH;

  // Build polyline path
  const linePath = sorted
    .map((r, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(r.value).toFixed(1)}`)
    .join(' ');

  // Area fill (close to bottom)
  const areaPath = `${linePath} L${toX(sorted.length - 1).toFixed(1)},${(PAD_T + chartH).toFixed(1)} L${toX(0).toFixed(1)},${(PAD_T + chartH).toFixed(1)} Z`;

  // Normal range band coords
  const normalY1 = toY(normalMax);
  const normalY2 = toY(normalMin);

  // Y-axis ticks
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const v = minVal + (range * i) / (tickCount - 1);
    return { value: v, y: toY(v) };
  });

  // Time label helper
  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString();

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {/* Normal range band */}
      <rect
        x={PAD_L}
        y={normalY1}
        width={chartW}
        height={normalY2 - normalY1}
        fill="rgba(51,154,240,0.08)"
        stroke="rgba(51,154,240,0.2)"
        strokeWidth={1}
        strokeDasharray="4,4"
      />

      {/* Y-axis grid + labels */}
      {ticks.map((t) => (
        <g key={t.y.toFixed(1)}>
          <line x1={PAD_L} y1={t.y} x2={W - PAD_R} y2={t.y} stroke="#e9ecef" strokeWidth={0.5} />
          <text x={PAD_L - 5} y={t.y + 4} textAnchor="end" fontSize={10} fill="#868e96">
            {t.value.toFixed(1)}
          </text>
        </g>
      ))}

      {/* Unit label */}
      <text x={PAD_L - 5} y={PAD_T - 8} textAnchor="end" fontSize={10} fill="#868e96">
        {unit}
      </text>

      {/* Area fill */}
      <path d={areaPath} fill="rgba(64,192,87,0.1)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#40c057" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Data points colored by status */}
      {sorted.map((r, i) => (
        <circle
          key={r.id}
          cx={toX(i)}
          cy={toY(r.value)}
          r={4}
          fill={statusColors[r.status] || '#868e96'}
          stroke="white"
          strokeWidth={1.5}
        />
      ))}

      {/* X-axis time labels */}
      <text x={toX(0)} y={H - 5} textAnchor="start" fontSize={9} fill="#868e96">
        {fmtTime(sorted[0].created)}
      </text>
      {sorted.length > 2 && (
        <text x={toX(Math.floor(sorted.length / 2))} y={H - 5} textAnchor="middle" fontSize={9} fill="#868e96">
          {fmtTime(sorted[Math.floor(sorted.length / 2)].created)}
        </text>
      )}
      <text x={toX(sorted.length - 1)} y={H - 5} textAnchor="end" fontSize={9} fill="#868e96">
        {fmtTime(sorted[sorted.length - 1].created)}
      </text>

      {/* Normal range labels */}
      <text x={W - PAD_R + 2} y={normalY1 + 4} fontSize={8} fill="#339af0">
        max {normalMax}
      </text>
      <text x={W - PAD_R + 2} y={normalY2 + 4} fontSize={8} fill="#339af0">
        min {normalMin}
      </text>
    </svg>
  );
}
