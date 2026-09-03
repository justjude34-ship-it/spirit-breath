let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  return ctx;
}

export function playPhaseTone(
  phase: string,
  enabled: boolean,
): void {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;

  if (audio.state === "suspended") {
    void audio.resume();
  }

  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.connect(gain);
  gain.connect(audio.destination);

  const freqs: Record<string, number> = {
    inhale: 392,
    hold: 330,
    exhale: 294,
    pause: 262,
    rest: 220,
    guide: 440,
  };

  osc.frequency.value = freqs[phase] ?? 350;
  osc.type = "sine";
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  osc.start(now);
  osc.stop(now + 0.4);
}

export function playCompleteChime(enabled: boolean): void {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();

  const notes = [523.25, 659.25, 783.99];
  const now = audio.currentTime;
  notes.forEach((freq, i) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.14;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    osc.start(t);
    osc.stop(t + 0.5);
  });
}
