import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <h1 className="font-display text-2xl font-medium">Page not found</h1>
      <p className="max-w-sm text-sm text-muted">
        That link doesn't match a screen in Spirit Breath.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-fg"
      >
        Back to home
      </Link>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
