import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/breath/app-shell";
import { TechniqueCard } from "@/components/breath/technique-card";
import { Badge } from "@/components/ui/badge";
import {
  CATEGORY_META,
  techniques,
  type TechniqueCategory,
} from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice/")({
  component: PracticeLibrary,
});

const filters: Array<{ id: "all" | "favorites" | TechniqueCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "favorites", label: "Favorites" },
  { id: "foundations", label: "Foundations" },
  { id: "rhythms", label: "Rhythms" },
  { id: "energy", label: "Energy" },
  { id: "heart", label: "Heart" },
  { id: "spiritual", label: "Spiritual" },
];

function PracticeLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const favorites = useBreathStore((s) => s.favorites);

  const list = useMemo(() => {
    let items = [...techniques];
    if (filter === "favorites") {
      items = items.filter((t) => favorites.includes(t.id));
    } else if (filter !== "all") {
      items = items.filter((t) => t.category === filter);
    }
    if (q.trim()) {
      const s = q.toLowerCase();
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          t.tagline.toLowerCase().includes(s) ||
          t.benefits.some((b) => b.toLowerCase().includes(s)),
      );
    }
    return items;
  }, [filter, q, favorites]);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl">
        <PageHeader
          title="Practice library"
          subtitle="Interactive techniques from Dan Brulé’s Spiritual Breathing toolkit — timed, guided, and ready when you are."
        />

        <div className="px-4 sm:px-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search techniques, benefits…"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-subtle outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto custom-scroll pb-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  filter === f.id
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border bg-surface/50 text-muted hover:text-fg",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filter !== "all" && filter !== "favorites" && (
            <p className="mt-4 text-sm text-muted">
              {CATEGORY_META[filter].description}
            </p>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {list.map((t) => (
              <TechniqueCard key={t.id} technique={t} />
            ))}
          </div>

          {list.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-muted">No techniques match.</p>
              <button
                type="button"
                className="mt-2 text-sm text-primary hover:underline"
                onClick={() => {
                  setFilter("all");
                  setQ("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-8 mb-4 flex flex-wrap gap-2">
            {Object.entries(CATEGORY_META).map(([id, meta]) => (
              <Badge
                key={id}
                variant="outline"
                style={{ borderColor: `${meta.color}44`, color: meta.color }}
              >
                {meta.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
