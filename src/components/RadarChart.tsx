"use client";

interface RadarChartProps {
  tags: Record<string, number>;
  color: string;
  maxTagValue: number;
}

const STATS = [
  { label: "呪力出力", keys: ["passion", "instinct", "madness"] },
  { label: "術式解釈", keys: ["intellect", "rational", "cool"] },
  { label: "身体能力", keys: ["instinct", "pride", "passion"] },
  { label: "反転術式適性", keys: ["bond", "duty", "cool"] },
  { label: "呪いの深さ", keys: ["madness", "solitude", "rebellion"] },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/**
 * Determine the ideal text-anchor based on the label's angular position.
 */
function getTextAnchor(angleDeg: number): "start" | "middle" | "end" {
  const a = ((angleDeg % 360) + 360) % 360;
  if (a <= 15 || a >= 345) return "middle"; // top
  if (a >= 165 && a <= 195) return "middle"; // bottom
  if (a > 15 && a < 165) return "start";
  return "end";
}

/**
 * Fine-tune label x/y offset based on angle to prevent edge clipping.
 * Increased offsets for white background readability.
 */
function getLabelOffset(angleDeg: number): { dx: number; dy: number } {
  const a = ((angleDeg % 360) + 360) % 360;
  if (a <= 15 || a >= 345) return { dx: 0, dy: -12 };
  if (a >= 165 && a <= 195) return { dx: 0, dy: 14 };
  if (a > 15 && a < 165) return { dx: 8, dy: 0 };
  return { dx: -8, dy: 0 };
}

export default function RadarChart({ tags, color, maxTagValue }: RadarChartProps) {
  const viewW = 400;
  const viewH = 380;
  const cx = viewW / 2;
  const cy = viewH / 2;
  const maxR = 100;
  const levels = 5;
  const n = STATS.length;
  const angleStep = 360 / n;
  const labelRadius = maxR + 48; // extra generous gap for light theme

  // Calculate stat values (0–1)
  const values = STATS.map((stat) => {
    const avg = stat.keys.reduce((sum, k) => sum + (tags[k] || 0), 0) / stat.keys.length;
    return Math.min(avg / Math.max(maxTagValue, 1), 1);
  });

  // Grid polygons (concentric pentagons)
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const r = (maxR / levels) * (lvl + 1);
    return Array.from({ length: n }, (_, i) => {
      const p = polarToCartesian(cx, cy, r, i * angleStep);
      return `${p.x},${p.y}`;
    }).join(" ");
  });

  // Axis lines
  const axes = Array.from({ length: n }, (_, i) => {
    const p = polarToCartesian(cx, cy, maxR, i * angleStep);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Data polygon
  const dataPoints = values
    .map((v, i) => {
      const p = polarToCartesian(cx, cy, v * maxR, i * angleStep);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // Label positions with smart anchoring
  const labels = STATS.map((stat, i) => {
    const angle = i * angleStep;
    const p = polarToCartesian(cx, cy, labelRadius, angle);
    const anchor = getTextAnchor(angle);
    const offset = getLabelOffset(angle);
    return {
      x: p.x + offset.dx,
      y: p.y + offset.dy,
      anchor,
      label: stat.label,
      value: Math.round(values[i] * 10),
    };
  });

  const glowId = `radar-glow-${color.replace("#", "")}`;

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-full max-w-[340px]"
        aria-label="Radar chart showing character stats"
      >
        <defs>
          {/* Soft glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for fill area */}
          <radialGradient id="radar-fill-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.20" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* ── Grid ── */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke={i === levels - 1 ? "#D2D2D7" : "#E8E8ED"}
            strokeWidth={i === levels - 1 ? "1" : "0.5"}
          />
        ))}

        {/* ── Axes ── */}
        {axes.map((a, i) => (
          <line
            key={`axis-${i}`}
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke="#E8E8ED"
            strokeWidth="0.5"
          />
        ))}

        {/* ── Data area fill + stroke with glow ── */}
        <polygon
          points={dataPoints}
          fill="url(#radar-fill-grad)"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          className="radar-fill"
        />

        {/* ── Data points (vertices) ── */}
        {values.map((v, i) => {
          const p = polarToCartesian(cx, cy, v * maxR, i * angleStep);
          return (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r="5"
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="2"
              className="radar-dot"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          );
        })}

        {/* ── Labels with dynamic anchor ── */}
        {labels.map((l, i) => (
          <g key={`label-${i}`} className="radar-label" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
            {/* Stat name */}
            <text
              x={l.x}
              y={l.y - 8}
              textAnchor={l.anchor}
              dominantBaseline="middle"
              fill="#1D1D1F"
              fontSize="10.5"
              fontWeight="600"
              letterSpacing="0.03em"
            >
              {l.label}
            </text>
            {/* Stat value */}
            <text
              x={l.x}
              y={l.y + 10}
              textAnchor={l.anchor}
              dominantBaseline="middle"
              fill={color}
              fontSize="13"
              fontWeight="700"
              fontFamily="'SF Mono', ui-monospace, monospace"
            >
              {l.value}
            </text>
          </g>
        ))}

        <style>{`
          .radar-fill {
            animation: radarReveal 1s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .radar-dot {
            animation: radarDotPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }
          .radar-label {
            animation: radarLabelFade 0.5s ease-out both;
          }
          @keyframes radarReveal {
            from {
              opacity: 0;
              transform: scale(0.2);
              transform-origin: ${cx}px ${cy}px;
            }
            to {
              opacity: 1;
              transform: scale(1);
              transform-origin: ${cx}px ${cy}px;
            }
          }
          @keyframes radarDotPop {
            from {
              opacity: 0;
              r: 0;
            }
            to {
              opacity: 1;
              r: 5;
            }
          }
          @keyframes radarLabelFade {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </svg>
    </div>
  );
}
