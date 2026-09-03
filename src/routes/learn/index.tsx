import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Quote } from "lucide-react";
import { AppShell, PageHeader } from "@/components/breath/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { principles, techniques } from "@/data/techniques";

export const Route = createFileRoute("/learn/")({
  component: LearnPage,
});

function LearnPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl">
        <PageHeader
          title="Learn"
          subtitle="The philosophy and science of Spiritual Breathing — so every session is more than a timer."
        />

        <div className="space-y-8 px-4 pb-10 sm:px-6">
          {/* About */}
          <section className="overflow-hidden rounded-3xl border border-border bg-surface/80">
            <div className="border-b border-border bg-gradient-to-br from-primary/10 to-transparent px-5 py-6 sm:px-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                The teacher
              </p>
              <h2 className="mt-2 font-display text-2xl text-fg sm:text-3xl">
                Dan Brulé & Spiritual Breathing
              </h2>
            </div>
            <div className="space-y-4 px-5 py-6 text-sm leading-relaxed text-muted sm:px-7 sm:text-base">
              <p>
                Dan Brulé is a pioneer of modern breathwork and a leader of the worldwide
                Spiritual Breathing movement. A former U.S. Navy deep-sea diver, he draws on
                pranayama, chi kung, breath therapy, and decades of teaching to help people
                use the breath for healing, performance, and spiritual awakening.
              </p>
              <p>
                His book <em className="text-fg">Just Breathe</em> (with a foreword by Tony
                Robbins) and Breath Mastery trainings present a simple, profound framework:
                combine <strong className="text-fg">Breath Awareness</strong> with{" "}
                <strong className="text-fg">Conscious Breathing</strong> — the two wings of
                the practice.
              </p>
              <p>
                This app is an educational companion inspired by those teachings. It is not
                affiliated with Dan Brulé personally, and it is not a substitute for his
                books, courses, or medical advice.
              </p>
            </div>
          </section>

          <blockquote className="relative rounded-2xl border border-primary/20 bg-primary/5 px-5 py-5 sm:px-6">
            <Quote className="absolute right-4 top-4 size-8 text-primary/20" />
            <p className="font-display text-lg text-fg italic leading-snug sm:text-xl">
              “Whatever breathing exercise makes you more conscious — that is the best one.”
            </p>
            <footer className="mt-3 text-sm text-primary">— Dan Brulé</footer>
          </blockquote>

          {/* Principles */}
          <section>
            <h2 className="font-display text-xl text-fg sm:text-2xl">Core principles</h2>
            <div className="mt-4 grid gap-3">
              {principles.map((p, i) => (
                <Card key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex gap-3">
                      <span className="font-display text-2xl text-primary/50 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-fg">{p.title}</h3>
                        <p className="mt-1 text-sm text-muted leading-relaxed">{p.body}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How to use */}
          <section className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="size-5" />
              <h2 className="font-display text-xl text-fg">How to use this app</h2>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <strong className="text-fg">1. Start simple.</strong> Breath Awareness and
                Low & Slow build the foundation Brulé emphasizes for stress and presence.
              </li>
              <li>
                <strong className="text-fg">2. Follow the 7 Essentials journey.</strong>{" "}
                Modules move from grounding through power, heart, voice, vision, and
                liberation.
              </li>
              <li>
                <strong className="text-fg">3. Use the orb as a coach.</strong> Expand on
                inhale, soften on exhale. Soft tones mark phase changes — mute anytime.
              </li>
              <li>
                <strong className="text-fg">4. Stay safe.</strong> Never force holds. Stop if
                dizzy or unwell. Not for use in water or while driving.
              </li>
            </ol>
          </section>

          {/* Technique deep dives preview */}
          <section>
            <div className="flex items-end justify-between gap-2">
              <h2 className="font-display text-xl text-fg sm:text-2xl">
                Technique guides
              </h2>
              <Link to="/practice" className="text-xs font-medium text-primary hover:underline">
                Open library
              </Link>
            </div>
            <p className="mt-1 text-sm text-muted">
              Each session opens with full instructions, then a live timed practice.
            </p>
            <ul className="mt-4 space-y-2">
              {techniques.slice(0, 6).map((t) => (
                <li key={t.id}>
                  <Link
                    to="/practice/$techniqueId"
                    params={{ techniqueId: t.id }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 transition-colors hover:border-border-strong"
                  >
                    <div>
                      <p className="font-medium text-fg">{t.name}</p>
                      <p className="text-xs text-muted line-clamp-1">{t.why.slice(0, 90)}…</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl border border-border bg-bg-elevated p-5 text-center">
            <p className="text-sm text-muted">
              Ready to practice what you've learned?
            </p>
            <Button asChild className="mt-4" size="lg">
              <Link to="/practice/$techniqueId" params={{ techniqueId: "low-and-slow" }}>
                Begin Low & Slow
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
