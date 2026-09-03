import { Link } from "@tanstack/react-router";
import { Clock, Star } from "lucide-react";
import type { Technique } from "@/data/techniques";
import { CATEGORY_META, estimateSessionSeconds } from "@/data/techniques";
import { useBreathStore } from "@/lib/breath/store";
import { cn, formatDuration, formatMinutes } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TechniqueIcon } from "./icons";

export function TechniqueCard({
  technique,
  featured = false,
}: {
  technique: Technique;
  featured?: boolean;
}) {
  const favorites = useBreathStore((s) => s.favorites);
  const toggleFavorite = useBreathStore((s) => s.toggleFavorite);
  const isFav = favorites.includes(technique.id);
  const secs = estimateSessionSeconds(technique);
  const cat = CATEGORY_META[technique.category];

  return (
    <article
      className={cn(
        "group rainbow-edge relative overflow-hidden rounded-2xl border border-transparent bg-surface/90 transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_40px_#00000090]",
        featured && "sm:col-span-2",
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full opacity-25 blur-2xl"
        style={{ background: technique.color }}
        aria-hidden
      />
      <Link
        to="/practice/$techniqueId"
        params={{ techniqueId: technique.id }}
        className="block p-4 pr-12 sm:p-5 sm:pr-14"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border-strong"
            style={{
              background: `color-mix(in oklab, ${technique.color} 18%, transparent)`,
              color: technique.color,
            }}
          >
            <TechniqueIcon name={technique.icon} className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-medium transition-opacity group-hover:opacity-90">
              {technique.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted line-clamp-2">{technique.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Clock className="size-3" />
                {formatMinutes(secs)}
              </Badge>
              <Badge
                variant="outline"
                style={{ borderColor: `${cat.color}55`, color: cat.color }}
              >
                {cat.label}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {technique.level}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={isFav ? "Remove favorite" : "Add favorite"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(technique.id);
        }}
        className="absolute right-2.5 top-2.5 z-10 flex size-10 items-center justify-center rounded-xl text-subtle transition-colors hover:bg-surface-2 hover:text-gold"
      >
        <Star
          className={cn("size-4", isFav && "fill-gold text-gold")}
          strokeWidth={isFav ? 0 : 1.75}
        />
      </button>
    </article>
  );
}

export function MiniTechniqueChip({ technique }: { technique: Technique }) {
  return (
    <Link
      to="/practice/$techniqueId"
      params={{ techniqueId: technique.id }}
      className="rainbow-edge flex items-center gap-2 rounded-xl border border-transparent bg-surface/80 px-3 py-2 text-sm text-fg transition-colors hover:bg-surface-2"
    >
      <span
        className="flex size-7 items-center justify-center rounded-lg"
        style={{
          background: `color-mix(in oklab, ${technique.color} 20%, transparent)`,
          color: technique.color,
        }}
      >
        <TechniqueIcon name={technique.icon} className="size-3.5" />
      </span>
      <span className="font-medium">{technique.shortName}</span>
      <span className="text-subtle">·</span>
      <span className="text-xs text-muted">
        {formatDuration(estimateSessionSeconds(technique))}
      </span>
    </Link>
  );
}
