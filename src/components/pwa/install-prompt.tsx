import { useEffect, useState } from "react";
import { Share, Smartphone, X } from "lucide-react";
import { DownloadButton, downloadOfflineApp } from "@/components/pwa/download-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

export function InstallPrompt({ className }: { className?: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) {
      setInstalled(true);
      return;
    }

    try {
      if (localStorage.getItem("spirit-breath-install-dismissed") === "1") {
        setDismissed(true);
      }
    } catch {
      /* ignore */
    }

    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    setPlatform(isIOS ? "ios" : isAndroid ? "android" : "desktop");

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("appinstalled", onInstalled);

    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    } else if ("serviceWorker" in navigator && import.meta.env.DEV) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const r of regs) void r.unregister();
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("spirit-breath-install-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const installNative = async () => {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setStatus("Installed on your device.");
      }
      setDeferred(null);
    } catch {
      setStatus("Install was cancelled. You can still download the offline file.");
    }
  };

  return (
    <div
      className={cn(
        "gradient-edge relative overflow-hidden rounded-2xl bg-black p-4",
        className,
      )}
      role="region"
      aria-label="Download app"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-lg text-subtle hover:bg-surface hover:text-fg"
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-col gap-3 pr-6">
        <div>
          <p className="font-display text-base font-medium">Save Spirit Breath offline</p>
          <p className="mt-0.5 text-xs text-muted leading-relaxed">
            Download a free offline copy, or install as a home-screen app.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DownloadButton
            size="default"
            label="Download offline file"
            className="flex-1 sm:flex-none"
          />
          {deferred && (
            <Button
              size="default"
              variant="secondary"
              onClick={() => void installNative()}
              type="button"
            >
              <Smartphone className="size-3.5" />
              Install to device
            </Button>
          )}
          <Button
            size="default"
            variant="outline"
            type="button"
            onClick={() => {
              void downloadOfflineApp().then((r) =>
                setStatus(
                  r === "opened"
                    ? "Opened offline app in a new tab — use Save Page if download is blocked."
                    : "Saved Spirit-Breath-Offline.html to your downloads.",
                ),
              );
            }}
          >
            Retry download
          </Button>
        </div>
        {platform === "ios" && !deferred && (
          <p className="flex items-center gap-1.5 text-[11px] text-subtle">
            <Share className="size-3.5 shrink-0" />
            Or: Safari Share → Add to Home Screen
          </p>
        )}
        {status && (
          <p className="text-[11px] text-primary" role="status">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
