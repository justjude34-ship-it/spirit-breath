import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/breath/app-shell";
import { Progress } from "@/components/ui/progress";
import { journeyModules, getTechnique } from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journey/")({
  component: JourneyPage,
});

function JourneyPage() {
  const completed = useBreathStore((s) => s.completedModules);
  const pct = Math.round((completed.length / journeyModules.length) * 100);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl">
        <PageHeader
          title="7 Essentials"
          subtitle="A path through Dan Brulé’s essentials of Spiritual Breathing — from earth to infinite spirit."
        />

        <div className="px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-surface/70 p-4 sm:p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Your path</span>
              <span className="tabular-nums text-fg">
                {completed.length}/{journeyModules.length} complete
              </span>
            </div>
            <Progress value={pct} className="mt-3 h-2" />
          </div>

          <ol className="relative mt-6 space-y-3 pb-8">
            <div
              className="absolute left-[1.4rem] top-4 bottom-4 w-px bg-border sm:left-[1.65rem]"
              aria-hidden
            />
            {journeyModules.map((mod) => {
              const done = completed.includes(mod.id);
              const firstTech = getTechnique(mod.techniqueIds[0]);
              return (
                <li key={mod.id} className="relative">
                  <Link
                    to="/journey/$moduleId"
                    params={{ moduleId: mod.id }}
                    className={cn(
                      "flex gap-3 rounded-2xl border bg-surface/70 p-4 transition-colors hover:border-border-strong sm:gap-4 sm:p-5",
                      done ? "border-primary/30" : "border-border",
                    )}
                  >
                    <div
                      className={cn(
                        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-medium sm:size-12",
                        done
                          ? "border-primary/40 bg-primary/20 text-primary"
                          : "border-border-strong bg-bg-elevated text-muted",
                      )}
                      style={
                        !done
                          ? {
                              boxShadow: `0 0 0 4px color-mix(in oklab, ${mod.color} 12%, transparent)`,
                            }
                          : undefined
                      }
                    >
                      {done ? <Check className="size-5" /> : mod.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[11px] font-medium uppercase tracking-widest"
                        style={{ color: mod.color }}
                      >
                        {mod.theme}
                      </p>
                      <h3 className="mt-0.5 font-display text-lg text-fg">{mod.title}</h3>
                      <p className="mt-1 text-sm text-muted line-clamp-2">{mod.subtitle}</p>
                      {firstTech && (
                        <p className="mt-2 text-xs text-subtle">
                          Starts with {firstTech.name}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="mt-3 size-5 shrink-0 text-subtle" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
