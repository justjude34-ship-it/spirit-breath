import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { PhaseStep, Technique } from "@/data/techniques";
import { playCompleteChime, playPhaseTone } from "@/lib/breath/audio";
import { useBreathStore } from "@/lib/breath/store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BreathOrb } from "./breath-orb";
import { TechniqueIcon } from "./icons";

type BuiltStep = PhaseStep & { key: string };

function buildTimeline(technique: Technique): BuiltStep[] {
  const steps: BuiltStep[] = [];
  let i = 0;
  if (technique.intro) {
    for (const s of technique.intro) {
      steps.push({ ...s, key: `intro-${i++}` });
    }
  }
  for (let c = 0; c < technique.cycles; c++) {
    for (const s of technique.pattern) {
      steps.push({ ...s, key: `c${c}-${i++}` });
    }
  }
  if (technique.outro) {
    for (const s of technique.outro) {
      steps.push({ ...s, key: `outro-${i++}` });
    }
  }
  return steps;
}

export function SessionPlayer({
  technique,
  moduleId,
}: {
  technique: Technique;
  moduleId?: string;
}) {
  const timeline = useMemo(() => buildTimeline(technique), [technique]);
  const totalSec = useMemo(
    () => timeline.reduce((a, s) => a + s.durationSec, 0),
    [timeline],
  );

  const soundEnabled = useBreathStore((s) => s.soundEnabled);
  const setSoundEnabled = useBreathStore((s) => s.setSoundEnabled);
  const addSession = useBreathStore((s) => s.addSession);
  const completeModule = useBreathStore((s) => s.completeModule);
  const skipIntro = useBreathStore((s) => s.skipIntro);
  const setSkipIntro = useBreathStore((s) => s.setSkipIntro);

  const autoStart = skipIntro || technique.id === "breath-awareness";

  const [index, setIndex] = useState(0);
  const [phaseElapsed, setPhaseElapsed] = useState(0);
  const [running, setRunning] = useState(autoStart);
  const [done, setDone] = useState(false);
  const [elapsedTotal, setElapsedTotal] = useState(0);
  const [showIntro, setShowIntro] = useState(!autoStart);
  const startedRef = useRef(false);

  const step = timeline[index] ?? timeline[0];
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);
  const savedRef = useRef(false);

  const finish = useCallback(() => {
    setDone(true);
    setRunning(false);
    playCompleteChime(soundEnabled);
    if (!savedRef.current) {
      savedRef.current = true;
      addSession({
        techniqueId: technique.id,
        techniqueName: technique.name,
        durationSec: totalSec,
        moduleId,
      });
      if (moduleId) completeModule(moduleId);
    }
  }, [addSession, completeModule, moduleId, soundEnabled, technique, totalSec]);

  useEffect(() => {
    if (!running || done) {
      lastTs.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = Math.min(0.1, (ts - lastTs.current) / 1000);
      lastTs.current = ts;

      setPhaseElapsed((prev) => {
        const next = prev + dt;
        const dur = step.durationSec;
        if (next >= dur) {
          const overflow = next - dur;
          setIndex((idx) => {
            if (idx + 1 >= timeline.length) {
              finish();
              return idx;
            }
            const nextStep = timeline[idx + 1];
            playPhaseTone(nextStep.phase, soundEnabled);
            return idx + 1;
          });
          setElapsedTotal((e) => e + (dur - prev));
          return overflow;
        }
        setElapsedTotal((e) => e + dt);
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, done, step, timeline, finish, soundEnabled]);

  useEffect(() => {
    const nextAuto = skipIntro || technique.id === "breath-awareness";
    setIndex(0);
    setPhaseElapsed(0);
    setRunning(nextAuto);
    setDone(false);
    setElapsedTotal(0);
    setShowIntro(!nextAuto);
    savedRef.current = false;
    startedRef.current = false;
    lastTs.current = null;
  }, [technique.id, skipIntro]);

  useEffect(() => {
    if (running && !startedRef.current && step) {
      startedRef.current = true;
      playPhaseTone(step.phase, soundEnabled);
    }
  }, [running, step, soundEnabled]);

  const progress = step ? Math.min(1, phaseElapsed / step.durationSec) : 0;
  const countdown = step ? Math.max(0, step.durationSec - phaseElapsed) : 0;
  const overallPct = Math.min(100, (elapsedTotal / totalSec) * 100);

  const start = () => {
    setSkipIntro(true);
    setShowIntro(false);
    setRunning(true);
    if (step) playPhaseTone(step.phase, soundEnabled);
  };

  const reset = () => {
    setIndex(0);
    setPhaseElapsed(0);
    setRunning(true);
    setDone(false);
    setElapsedTotal(0);
    setShowIntro(false);
    savedRef.current = false;
    startedRef.current = false;
    lastTs.current = null;
  };

  if (done) {
    return (
      <div className="flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col items-center justify-center px-5 py-10 text-center animate-fade-up">
        <div
          className="mb-6 flex size-20 items-center justify-center rounded-full"
          style={{
            background: `color-mix(in oklab, ${technique.color} 22%, transparent)`,
            color: technique.color,
            boxShadow: `0 0 40px color-mix(in oklab, ${technique.color} 30%, transparent)`,
          }}
        >
          <Check className="size-10" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-3xl font-medium text-fg">Session complete</h2>
        <p className="mt-2 max-w-sm text-muted">
          You finished <span className="text-fg">{technique.name}</span>. Carry this
          awareness into the rest of your day.
        </p>
        {technique.danNote && (
          <blockquote className="mt-6 max-w-md rounded-2xl border border-border bg-surface/60 px-5 py-4 text-left text-sm italic text-muted">
            <span className="not-italic font-medium text-primary">Dan Brulé — </span>
            {technique.danNote}
          </blockquote>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="secondary">
            <RotateCcw className="size-4" />
            Practice again
          </Button>
          <Button asChild>
            <Link to="/practice">Back to library</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] max-w-lg flex-col px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="icon-sm">
            <Link to="/practice">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-fg"
            aria-label={soundEnabled ? "Mute tones" : "Enable tones"}
          >
            {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-6 animate-fade-up">
          <div
            className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl"
            style={{
              background: `color-mix(in oklab, ${technique.color} 20%, transparent)`,
              color: technique.color,
            }}
          >
            <TechniqueIcon name={technique.icon} className="size-8" />
          </div>
          <h1 className="text-center font-display text-3xl font-medium text-fg">
            {technique.name}
          </h1>
          <p className="mt-2 text-center text-muted">{technique.tagline}</p>

          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="text-xs font-medium uppercase tracking-widest text-subtle">
              How to practice
            </h2>
            <ol className="space-y-2.5">
              {technique.howTo.slice(0, 5).map((stepText, i) => (
                <li key={i} className="flex gap-3 text-sm text-fg/90">
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular-nums"
                    style={{
                      background: `color-mix(in oklab, ${technique.color} 18%, transparent)`,
                      color: technique.color,
                    }}
                  >
                    {i + 1}
                  </span>
                  {stepText}
                </li>
              ))}
            </ol>
          </div>

          {technique.why && (
            <p className="mt-4 text-center text-xs leading-relaxed text-subtle">
              {technique.why.slice(0, 160)}
              {technique.why.length > 160 ? "…" : ""}
            </p>
          )}

          <p className="mt-3 text-center text-xs text-subtle">
            ~{Math.max(1, Math.round(totalSec / 60))} min · {timeline.length} guided steps · Soft
            tones optional
          </p>

          <Button size="lg" className="mt-6 w-full" onClick={start}>
            <Play className="size-5" />
            Begin practice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] max-w-lg flex-col px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          asChild
          aria-label="Exit session"
        >
          <Link to="/practice">
            <X className="size-4" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-medium text-fg">{technique.name}</p>
          <p className="text-[11px] text-subtle tabular-nums">
            Step {index + 1} of {timeline.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-fg"
          aria-label={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
        </button>
      </div>

      <div className="mt-3">
        <Progress value={overallPct} className="h-1.5" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <BreathOrb
          phase={step.phase}
          durationSec={step.durationSec}
          progress={progress}
          phaseLabel={step.cue ?? step.label}
          countdown={countdown}
          running={running}
        />

        <p
          className="mt-6 max-w-sm text-center text-base leading-relaxed text-fg sm:text-lg"
          key={step.key}
        >
          {step.instruction}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-subtle">{step.label}</p>
      </div>

      <div className="flex items-center justify-center gap-3 pb-6">
        <Button variant="secondary" size="icon" onClick={reset} aria-label="Restart">
          <RotateCcw className="size-4" />
        </Button>
        <Button size="lg" className="min-w-[140px]" onClick={() => setRunning((r) => !r)}>
          {running ? (
            <>
              <Pause className="size-5" /> Pause
            </>
          ) : (
            <>
              <Play className="size-5" /> Resume
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
