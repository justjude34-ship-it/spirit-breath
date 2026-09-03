import { useState } from "react";
import { Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reliable offline download for preview + browser.
 * Prefers blob download; falls back to opening the offline HTML file.
 */
export async function downloadOfflineApp(): Promise<"saved" | "opened"> {
  const url = "/spirit-breath-offline.html";
  const filename = "Spirit-Breath-Offline.html";

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    return "saved";
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
    return "opened";
  }
}

type Size = "default" | "sm" | "lg" | "xl" | "icon" | "bar";

/** Always-visible download control — solid rainbow fill so it never blends into black */
export function DownloadButton({
  className,
  label = "Download app",
  size = "default",
}: {
  className?: string;
  label?: string;
  size?: Size;
}) {
  const [state, setState] = useState<"idle" | "working" | "done" | "opened">("idle");

  const onClick = async () => {
    if (state === "working") return;
    setState("working");
    const result = await downloadOfflineApp();
    setState(result === "opened" ? "opened" : "done");
    window.setTimeout(() => setState("idle"), 3200);
  };

  const sizeCls =
    size === "icon"
      ? "size-11 rounded-xl text-sm"
      : size === "sm"
        ? "h-9 rounded-xl px-3.5 text-xs"
        : size === "lg"
          ? "h-12 rounded-2xl px-6 text-base"
          : size === "xl"
            ? "h-14 rounded-2xl px-7 text-base sm:text-lg"
            : size === "bar"
              ? "h-10 rounded-full px-5 text-sm"
              : "h-11 rounded-xl px-5 text-sm";

  const text =
    state === "working"
      ? "Preparing…"
      : state === "done"
        ? "Downloaded!"
        : state === "opened"
          ? "Opened offline app"
          : label;

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      disabled={state === "working"}
      className={cn(
        "download-btn-solid inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-[transform,filter] duration-200 active:scale-[0.98] disabled:opacity-80",
        sizeCls,
        className,
      )}
    >
      {state === "done" || state === "opened" ? (
        <Check className="size-4 shrink-0" strokeWidth={2.5} />
      ) : (
        <Download className="size-4 shrink-0" strokeWidth={2.5} />
      )}
      {size !== "icon" && <span>{text}</span>}
    </button>
  );
}
