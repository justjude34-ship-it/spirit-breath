import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SessionPlayer } from "@/components/breath/session-player";
import { getTechnique } from "@/data/techniques";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  module: z.string().optional(),
});

export const Route = createFileRoute("/practice/$techniqueId")({
  validateSearch: searchSchema,
  component: TechniqueSessionPage,
});

function TechniqueSessionPage() {
  const { techniqueId } = Route.useParams();
  const { module: moduleId } = Route.useSearch();
  const technique = getTechnique(techniqueId);

  if (!technique) {
    return (
      <div className="app-shell flex min-h-[50dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl text-fg">Technique not found</h1>
        <Button asChild>
          <Link to="/practice">Back to library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <SessionPlayer technique={technique} moduleId={moduleId} />
    </div>
  );
}
