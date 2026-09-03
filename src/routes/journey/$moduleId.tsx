import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Play } from "lucide-react";
import { AppShell } from "@/components/breath/app-shell";
import { TechniqueIcon } from "@/components/breath/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getModule, getTechnique } from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";

export const Route = createFileRoute("/journey/$moduleId")({
  component: ModuleDetailPage,
});

function ModuleDetailPage() {
  const { moduleId } = Route.useParams();
  const mod = getModule(moduleId);
  const completed = useBreathStore((s) => s.completedModules);
  const completeModule = useBreathStore((s) => s.completeModule);

  if (!mod) {
    return (
      <AppShell>
        <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
          <p className="text-muted">Module not found.</p>
          <Button asChild>
            <Link to="/journey">Back</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const done = completed.includes(mod.id);
  const techs = mod.techniqueIds.map((id) => getTechnique(id)).filter(Boolean);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-4 pb-10 sm:px-6">
        <div className="pt-4">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link to="/journey">
              <ArrowLeft className="size-4" />
              Journey
            </Link>
          </Button>
        </div>

        <div
          className="mt-3 overflow-hidden rounded-3xl border border-border p-6 sm:p-8"
          style={{
            background: `linear-gradient(145deg, color-mix(in oklab, ${mod.color} 14%, #0c1019), #0c1019 60%)`,
          }}
        >
          <div className="flex items-center gap-2">
            <Badge style={{ borderColor: `${mod.color}55`, color: mod.color }}>
              Module {mod.number}
            </Badge>
            {done && (
              <Badge variant="default" className="gap-1">
                <Check className="size-3" /> Done
              </Badge>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-medium text-fg sm:text-4xl">
            {mod.title}
          </h1>
          <p className="mt-1 text-lg text-muted">{mod.subtitle}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg/85 sm:text-base">
            {mod.description}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="font-display text-xl text-fg">Practices in this module</h2>
          <ul className="mt-3 space-y-2">
            {mod.practices.map((p) => (
              <li
                key={p}
                className="flex gap-2 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-fg/90"
              >
                <span style={{ color: mod.color }}>·</span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl text-fg">Guided techniques</h2>
          <div className="mt-3 space-y-3">
            {techs.map((t) =>
              t ? (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4"
                >
                  <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${t.color} 18%, transparent)`,
                      color: t.color,
                    }}
                  >
                    <TechniqueIcon name={t.icon} className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-fg">{t.name}</p>
                    <p className="text-xs text-muted line-clamp-1">{t.tagline}</p>
                  </div>
                  <Button asChild size="sm">
                    <Link
                      to="/practice/$techniqueId"
                      params={{ techniqueId: t.id }}
                      search={{ module: mod.id }}
                    >
                      <Play className="size-3.5" />
                      Start
                    </Link>
                  </Button>
                </div>
              ) : null,
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface/60 p-5">
          <h2 className="text-xs font-medium uppercase tracking-widest text-subtle">
            Reflection
          </h2>
          <p className="mt-2 font-display text-lg text-fg italic">{mod.reflection}</p>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          {techs[0] && (
            <Button asChild size="lg">
              <Link
                to="/practice/$techniqueId"
                params={{ techniqueId: techs[0]!.id }}
                search={{ module: mod.id }}
              >
                <Play className="size-4" />
                Begin module practice
              </Link>
            </Button>
          )}
          {!done && (
            <Button variant="secondary" size="lg" onClick={() => completeModule(mod.id)}>
              <Check className="size-4" />
              Mark module complete
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
