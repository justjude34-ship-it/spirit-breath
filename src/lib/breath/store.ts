import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionRecord = {
  id: string;
  techniqueId: string;
  techniqueName: string;
  durationSec: number;
  completedAt: string;
  moduleId?: string;
};

type BreathState = {
  sessions: SessionRecord[];
  completedModules: string[];
  favorites: string[];
  totalBreathSeconds: number;
  streak: number;
  lastPracticeDate: string | null;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  addSession: (session: Omit<SessionRecord, "id" | "completedAt">) => void;
  toggleFavorite: (techniqueId: string) => void;
  completeModule: (moduleId: string) => void;
  setSoundEnabled: (v: boolean) => void;
  setHapticsEnabled: (v: boolean) => void;
  sessionsToday: () => number;
  minutesThisWeek: () => number;
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function computeStreak(lastDate: string | null, prevStreak: number, now = todayKey()): number {
  if (!lastDate) return 1;
  if (lastDate === now) return Math.max(prevStreak, 1);
  const last = new Date(lastDate + "T12:00:00");
  const cur = new Date(now + "T12:00:00");
  const diffDays = Math.round((cur.getTime() - last.getTime()) / 86400000);
  if (diffDays === 1) return prevStreak + 1;
  if (diffDays === 0) return prevStreak;
  return 1;
}

export const useBreathStore = create<BreathState>()(
  persist(
    (set, get) => ({
      sessions: [],
      completedModules: [],
      favorites: [],
      totalBreathSeconds: 0,
      streak: 0,
      lastPracticeDate: null,
      soundEnabled: true,
      hapticsEnabled: true,

      addSession: (session) => {
        const now = todayKey();
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const record: SessionRecord = {
          ...session,
          id,
          completedAt: new Date().toISOString(),
        };
        set((s) => ({
          sessions: [record, ...s.sessions].slice(0, 200),
          totalBreathSeconds: s.totalBreathSeconds + session.durationSec,
          streak: computeStreak(s.lastPracticeDate, s.streak, now),
          lastPracticeDate: now,
        }));
      },

      toggleFavorite: (techniqueId) =>
        set((s) => ({
          favorites: s.favorites.includes(techniqueId)
            ? s.favorites.filter((id) => id !== techniqueId)
            : [...s.favorites, techniqueId],
        })),

      completeModule: (moduleId) =>
        set((s) => ({
          completedModules: s.completedModules.includes(moduleId)
            ? s.completedModules
            : [...s.completedModules, moduleId],
        })),

      setSoundEnabled: (v) => set({ soundEnabled: v }),
      setHapticsEnabled: (v) => set({ hapticsEnabled: v }),

      sessionsToday: () => {
        const key = todayKey();
        return get().sessions.filter((s) => s.completedAt.startsWith(key)).length;
      },

      minutesThisWeek: () => {
        const weekAgo = Date.now() - 7 * 86400000;
        const secs = get()
          .sessions.filter((s) => new Date(s.completedAt).getTime() >= weekAgo)
          .reduce((a, s) => a + s.durationSec, 0);
        return Math.round(secs / 60);
      },
    }),
    { name: "spiritual-breathing-v1" },
  ),
);
