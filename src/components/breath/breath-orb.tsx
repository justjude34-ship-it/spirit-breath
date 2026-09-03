import { cn } from "@/lib/utils";
import type { BreathPhase } from "@/data/techniques";

const PHASE_COLOR: Record<BreathPhase, string> = {
  inhale: "var(--color-inhale)",
  hold: "var(--color-hold)",
  exhale: "var(--color-exhale)",
  pause: "var(--color-pause)",
  rest: "var(--color-rest)",
  guide: "var(--color-primary)",
};

const PHASE_SCALE: Record<BreathPhase, { from: number; to: number }> = {
  inhale: { from: 0.72, to: 1 },
  hold: { from: 1, to: 1 },
  exhale: { from: 1, to: 0.72 },
  pause: { from: 0.72, to: 0.72 },
  rest: { from: 0.82, to: 0.88 },
  guide: { from: 0.85, to: 0.9 },
};

export function BreathOrb({
  phase,
  durationSec,
  progress,
  phaseLabel,
  countdown,
  running,
}: {
  phase: BreathPhase;
  durationSec: number;
  progress: number;
  phaseLabel: string;
  countdown: number;
  running: boolean;
}) {
  const color = PHASE_COLOR[phase];
  const scales = PHASE_SCALE[phase];
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Interpolate scale by progress for smooth JS-driven animation (reliable across HMR)
  const scale = scales.from + (scales.to - scales.from) * Math.min(1, Math.max(0, progress));

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[min(320px,78vw)] items-center justify-center">
      {/* Outer glow rings */}
      <div
        className={cn("absolute inset-[8%] rounded-full orb-ring", !running && "opacity-40")}
        style={{
          border: `1px solid color-mix(in oklab, ${color} 40%, transparent)`,
          boxShadow: `0 0 60px color-mix(in oklab, ${color} 25%, transparent)`,
        }}
      />
      <div
        className="absolute inset-[18%] rounded-full"
        style={{
          border: `1px solid color-mix(in oklab, ${color} 25%, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Core orb */}
      <div
        className="orb-core relative z-10 flex size-[58%] items-center justify-center rounded-full will-change-transform"
        style={{
          transform: `scale(${reduced ? 0.9 : scale})`,
          transition: running
            ? `transform ${Math.max(0.05, durationSec * 0.08)}s linear`
            : "transform 0.4s ease",
          background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${color} 55%, white), color-mix(in oklab, ${color} 35%, #0c1019) 55%, #0a0e18)`,
          boxShadow: `
            0 0 40px color-mix(in oklab, ${color} 45%, transparent),
            inset 0 0 40px color-mix(in oklab, ${color} 20%, transparent)
          `,
        }}
      >
        <div className="text-center px-3">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.2em] sm:text-xs"
            style={{ color }}
          >
            {phaseLabel}
          </p>
          <p className="mt-1 font-display text-4xl font-medium tabular-nums text-fg sm:text-5xl">
            {Math.max(0, Math.ceil(countdown))}
          </p>
        </div>
      </div>

      {/* Progress ring SVG */}
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="color-mix(in oklab, var(--color-border-strong) 80%, transparent)"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={`${progress * 295.3} 295.3`}
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            transition: "stroke-dasharray 0.1s linear",
          }}
        />
      </svg>
    </div>
  );
}
