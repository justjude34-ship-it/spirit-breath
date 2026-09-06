import { useState, type MouseEvent } from "react";
import { Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const OFFLINE_URL = "/spirit-breath-offline.html";
const OFFLINE_NAME = "Spirit-Breath-Offline.html";

/**
 * Reliable offline download for preview, Android WebView, and desktop.
 * Prefers the native share sheet on phones, then a real file download,
 * then opens the offline app so the tap always does something visible.
 */
export async function downloadOfflineApp(): Promise<"shared" | "saved" | "opened"> {
  try {
    const res = await fetch(OFFLINE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const file = new File([blob], OFFLINE_NAME, { type: "text/html;charset=utf-8" });

    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean;
      share?: (data: { files?: File[]; title?: string; text?: string }) => Promise<void>;
    };
    if (typeof nav.canShare === "function" && nav.share && nav.canShare({ files: [file] })) {
      await nav.share({
        files: [file],
        title: "Spirit Breath",
        text: "Offline copy of Spirit Breath",
      });
      return "shared";
    }

    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = OFFLINE_NAME;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    return "saved";
  } catch {
    window.location.assign(OFFLINE_URL);
    return "opened";
  }
}

type Size = "default" | "sm" | "lg" | "xl" | "icon" | "bar";

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

  const onClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (state === "working") return;
    setState("working");
    try {
      const result = await downloadOfflineApp();
      setState(result === "opened" ? "opened" : "done");
    } catch {
      window.location.assign(OFFLINE_URL);
      setState("opened");
    }
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
    <a
      href={OFFLINE_URL}
      download={OFFLINE_NAME}
      onClick={(e) => void onClick(e)}
      className={cn(
        "download-btn-solid inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-[transform,filter] duration-200 active:scale-[0.98]",
        state === "working" && "pointer-events-none opacity-80",
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
    </a>
  );
}
