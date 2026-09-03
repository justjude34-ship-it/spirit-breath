import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, Home, Sparkles, Wind } from "lucide-react";
import { DownloadButton } from "@/components/pwa/download-button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Practice", icon: Wind },
  { to: "/journey", label: "Journey", icon: Compass },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/progress", label: "Progress", icon: Sparkles },
] as const;

export function AppShell({
  children,
  hideNav = false,
}: {
  children: React.ReactNode;
  hideNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="app-shell flex flex-col">
      {/* Thick animated gradient frame — pure black interior */}
      <div className="app-frame" aria-hidden="true" />

      {/* Always-visible top download strip */}
      {!hideNav && (
        <div className="download-strip sticky top-0 z-40">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                Spirit Breath
              </p>
              <p className="truncate text-[11px] text-white/55">Offline app · free download</p>
            </div>
            <DownloadButton size="bar" label="Download" className="shrink-0 shadow-lg" />
          </div>
        </div>
      )}

      <div className={cn("relative z-10 flex-1", !hideNav && "pb-nav")}>{children}</div>

      {!hideNav && (
        <nav
          className="nav-gradient fixed inset-x-0 bottom-0 z-50 border-t border-transparent bg-black/95 backdrop-blur-xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          aria-label="Main"
        >
          <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pt-1.5 pb-1.5">
            {nav.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/"
                  ? pathname === "/"
                  : pathname === to || pathname.startsWith(`${to}/`);
              return (
                <li key={to} className="flex-1">
                  <Link
                    to={to}
                    className={cn(
                      "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium tracking-wide transition-colors",
                      active ? "text-primary" : "text-subtle hover:text-muted",
                    )}
                  >
                    <Icon
                      className={cn("size-5", active && "drop-shadow-[0_0_8px_#5eead488]")}
                      strokeWidth={active ? 2.25 : 1.75}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
  back,
  showDownload = false,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  back?: React.ReactNode;
  showDownload?: boolean;
}) {
  return (
    <header className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 sm:px-6">
      <div className="min-w-0 flex-1">
        {back && <div className="mb-2">{back}</div>}
        <h1 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 max-w-prose text-sm text-muted sm:text-base">{subtitle}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {action}
        {showDownload && <DownloadButton size="sm" label="Download" />}
      </div>
    </header>
  );
}
