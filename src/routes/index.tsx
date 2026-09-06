import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Flame, Heart, Sparkles, Wind } from "lucide-react";
import { AppShell } from "@/components/breath/app-shell";
import { MiniTechniqueChip, TechniqueCard } from "@/components/breath/technique-card";
import { DownloadButton } from "@/components/pwa/download-button";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { techniques, journeyModules } from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";
import { formatMinutes } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const streak = useBreathStore((s) => s.streak);
  const totalBreathSeconds = useBreathStore((s) => s.totalBreathSeconds);
  const sessionsToday = useBreathStore((s) => s.sessionsToday());
  const completedModules = useBreathStore((s) => s.completedModules);
  const featured = techniques.find((t) => t.id === "spiritual-breathing")!;
  const quick = [
    techniques.find((t) => t.id === "low-and-slow")!,
    techniques.find((t) => t.id === "box-breathing")!,
    techniques.find((t) => t.id === "yawn-and-sigh")!,
    techniques.find((t) => t.id === "heart-breath")!,
  ];
  const nextModule =
    journeyModules.find((m) => !completedModules.includes(m.id)) ?? journeyModules[0];

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl">
        <section className="relative overflow-hidden bg-black">
          <div
            className="relative w-full overflow-hidden bg-black"
            style={{
              backgroundColor: "#000",
              backgroundImage: "url(/covers/harbour-blue.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center 38%",
              height:
                "clamp(28rem, calc(100dvh - var(--grok-banner-h, 0px) - 3.5rem - 5.75rem), 46rem)",
            }}
          >
            <img
              src="/covers/harbour-blue.jpg"
              alt="Spirit Breath — pretty blue harbour with little boats"
              className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-[center_38%]"
              fetchPriority="high"
            />
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,18,40,0.55) 0%, rgba(6,18,40,0.18) 28%, rgba(6,18,40,0.02) 46%, rgba(6,16,36,0.28) 74%, rgba(6,14,32,0.66) 100%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-x-0 top-0 z-20 px-5 pt-7 text-center sm:px-7 sm:pt-9">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white"
                style={{ textShadow: "0 2px 18px rgba(6,16,36,0.85)" }}
              >
                Dan Brulé · Spiritual Breathing
              </p>
              <h1
                className="mt-2 font-display text-5xl font-medium leading-[1.02] text-cream sm:text-6xl"
                style={{
                  textShadow:
                    "0 6px 32px rgba(6,16,36,0.9), 0 2px 8px rgba(6,16,36,0.7), 0 1px 0 rgba(0,0,0,0.4)",
                }}
              >
                Spirit Breath
              </h1>
              <div
                className="mx-auto mt-3 h-px w-24"
                style={{ background: "linear-gradient(90deg, transparent, #d4b483, transparent)" }}
                aria-hidden
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-6 pt-20 sm:px-7">
              <p
                className="max-w-md text-sm text-white/92 sm:text-base"
                style={{ textShadow: "0 2px 14px rgba(6,16,36,0.7)" }}
              >
                Breathe yourself awake — awareness, energy, heart, and presence.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  type="button"
                  size="lg"
                  onClick={() =>
                    void navigate({
                      to: "/practice/$techniqueId",
                      params: { techniqueId: "spiritual-breathing" },
                    })
                  }
                >
                  <Wind className="size-5" /> Start guided session
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={() => void navigate({ to: "/practice" })}
                >
                  Browse techniques <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="px-4 sm:px-6">
          <section className="gradient-edge mt-4 mb-4 overflow-hidden rounded-3xl bg-black p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Free offline app
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium">Download Spirit Breath</h2>
            <p className="mt-1.5 text-sm text-muted">
              One tap saves a full offline copy you can open anytime — no install required.
            </p>
            <DownloadButton size="xl" label="Download app now" className="mt-4 w-full" />
          </section>
          <InstallPrompt className="mb-4" />
          <section className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Streak", value: `${streak}d`, icon: Flame, color: "#d4b483" },
              { label: "Today", value: String(sessionsToday), icon: Sparkles, color: "#7eb8ae" },
              {
                label: "Lifetime",
                value: formatMinutes(totalBreathSeconds || 0).replace(" min", "m"),
                icon: Heart,
                color: "#c98990",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="gradient-edge border-0 bg-black">
                <CardContent className="flex flex-col items-center gap-1 p-3 sm:p-4">
                  <Icon className="size-4" style={{ color }} />
                  <p className="font-display text-xl font-medium tabular-nums text-fg sm:text-2xl">
                    {value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-subtle">{label}</p>
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="mt-8">
            <div className="mb-3 flex items-end justify-between gap-2">
              <h2 className="font-display text-xl font-medium">Quick start</h2>
              <Link to="/practice" className="text-xs font-medium text-primary hover:underline">
                See all
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {quick.map((t) => (
                <MiniTechniqueChip key={t.id} technique={t} />
              ))}
            </div>
          </section>
          <section className="mt-8">
            <h2 className="mb-3 font-display text-xl font-medium">7 Essentials journey</h2>
            <Link
              to="/journey"
              className="gradient-edge block overflow-hidden rounded-2xl border border-transparent bg-black p-5 transition-opacity hover:opacity-95"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-medium"
                  style={{
                    background: `color-mix(in oklab, ${nextModule.color} 22%, transparent)`,
                    color: nextModule.color,
                  }}
                >
                  {nextModule.number}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-subtle">
                    {completedModules.length >= 7
                      ? "Complete — revisit anytime"
                      : `Module ${nextModule.number} of 7`}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg">{nextModule.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{nextModule.description}</p>
                  <p className="mt-3 text-xs font-medium text-primary">
                    Continue journey <ArrowRight className="ml-1 inline size-3.5" />
                  </p>
                </div>
              </div>
            </Link>
          </section>
          <section className="mt-8 mb-4">
            <h2 className="mb-3 font-display text-xl font-medium">Featured</h2>
            <TechniqueCard technique={featured} featured />
          </section>
          <p className="mb-6 text-center text-[11px] leading-relaxed text-subtle">
            Educational practice inspired by Dan Brulé's Spiritual Breathing teachings. Not a
            medical device. Breathe gently; stop if dizzy.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
