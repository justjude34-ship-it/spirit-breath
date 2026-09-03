import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  Flame,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/breath/app-shell";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { techniques, journeyModules } from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";
import { formatMinutes } from "@/lib/utils";

export const Route = createFileRoute("/progress/")({
  component: ProgressPage,
});

function ProgressPage() {
  const sessions = useBreathStore((s) => s.sessions);
  const streak = useBreathStore((s) => s.streak);
  const totalBreathSeconds = useBreathStore((s) => s.totalBreathSeconds);
  const favorites = useBreathStore((s) => s.favorites);
  const completedModules = useBreathStore((s) => s.completedModules);
  const soundEnabled = useBreathStore((s) => s.soundEnabled);
  const setSoundEnabled = useBreathStore((s) => s.setSoundEnabled);
  const minutesThisWeek = useBreathStore((s) => s.minutesThisWeek());

  const byTechnique = sessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.techniqueId] = (acc[s.techniqueId] ?? 0) + 1;
    return acc;
  }, {});
  const topIds = Object.entries(byTechnique)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl">
        <PageHeader
          title="Progress"
          subtitle="Your streak, sessions, and journey — all saved on this device."
          action={
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:text-fg"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
          }
        />

        <div className="space-y-6 px-4 pb-10 sm:px-6">
          <InstallPrompt />

          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Flame}
              color="#fb923c"
              label="Day streak"
              value={String(streak)}
            />
            <StatCard
              icon={Clock}
              color="#2dd4bf"
              label="This week"
              value={`${minutesThisWeek}m`}
            />
            <StatCard
              icon={Calendar}
              color="#38bdf8"
              label="Total sessions"
              value={String(sessions.length)}
            />
            <StatCard
              icon={Star}
              color="#fbbf24"
              label="Lifetime breath"
              value={formatMinutes(totalBreathSeconds || 0)}
            />
          </div>

          <section>
            <h2 className="font-display text-xl">Journey progress</h2>
            <div className="mt-3 grid gap-2">
              {journeyModules.map((m) => {
                const done = completedModules.includes(m.id);
                return (
                  <Link
                    key={m.id}
                    to="/journey/$moduleId"
                    params={{ moduleId: m.id }}
                    className="rainbow-edge flex items-center gap-3 rounded-xl border border-transparent bg-surface/70 px-3 py-2.5 text-sm"
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-full text-xs font-medium"
                      style={{
                        background: done
                          ? `color-mix(in oklab, ${m.color} 25%, transparent)`
                          : "var(--color-surface-2)",
                        color: done ? m.color : "var(--color-subtle)",
                      }}
                    >
                      {m.number}
                    </span>
                    <span className={done ? "text-fg" : "text-muted"}>{m.title}</span>
                    <span className="ml-auto text-xs text-subtle">
                      {done ? "Complete" : "Open"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {topIds.length > 0 && (
            <section>
              <h2 className="font-display text-xl">Most practiced</h2>
              <ul className="mt-3 space-y-2">
                {topIds.map(([id, count]) => {
                  const t = techniques.find((x) => x.id === id);
                  if (!t) return null;
                  return (
                    <li
                      key={id}
                      className="flex items-center justify-between rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm"
                    >
                      <span className="text-fg">{t.name}</span>
                      <span className="tabular-nums text-muted">{count}×</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {favorites.length > 0 && (
            <section>
              <h2 className="font-display text-xl">Favorites</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {favorites.map((id) => {
                  const t = techniques.find((x) => x.id === id);
                  if (!t) return null;
                  return (
                    <Button key={id} asChild variant="secondary" size="sm">
                      <Link to="/practice/$techniqueId" params={{ techniqueId: id }}>
                        {t.shortName}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-display text-xl">Recent sessions</h2>
            {sessions.length === 0 ? (
              <Card className="mt-3">
                <CardContent className="p-6 text-center">
                  <p className="text-muted">No sessions yet. Your first breath is waiting.</p>
                  <Button asChild className="mt-4">
                    <Link to="/practice">Start practicing</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ul className="mt-3 space-y-2">
                {sessions.slice(0, 12).map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-fg">{s.techniqueName}</p>
                      <p className="text-xs text-subtle">
                        {format(parseISO(s.completedAt), "MMM d · h:mm a")}
                      </p>
                    </div>
                    <span className="shrink-0 tabular-nums text-muted">
                      {Math.round(s.durationSec / 60)}m
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="text-center text-[11px] text-subtle">
            Progress is stored locally in your browser. Clearing site data resets history.
            Install the app for a full-screen experience from your home screen.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <Icon className="size-4" style={{ color }} />
        <p className="mt-2 font-display text-2xl font-medium tabular-nums text-fg">
          {value}
        </p>
        <p className="text-xs text-subtle">{label}</p>
      </CardContent>
    </Card>
  );
}
