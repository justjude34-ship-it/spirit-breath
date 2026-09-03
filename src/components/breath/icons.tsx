import {
  Eye,
  Waves,
  Wind,
  Smile,
  Triangle,
  Square,
  Layers,
  Circle,
  Heart,
  Flame,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Technique } from "@/data/techniques";

const map: Record<Technique["icon"], LucideIcon> = {
  eye: Eye,
  wave: Waves,
  wind: Wind,
  yawn: Smile,
  triangle: Triangle,
  box: Square,
  layers: Layers,
  circle: Circle,
  heart: Heart,
  flame: Flame,
  spark: Sparkles,
};

export function TechniqueIcon({
  name,
  className,
  style,
}: {
  name: Technique["icon"];
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} style={style} aria-hidden />;
}
