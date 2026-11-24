// Shared shape for achievement signals — produced from either localStorage
// (guest) or the account's synced meta (server). Pure + client-safe.

export interface SyncStats {
  exam: boolean;
  simBest: number;
  simPlayed: number;
  arcadeToday: number;
  arcadeGames: number;
  arcadeStreak: number;
}

export const EMPTY_STATS: SyncStats = {
  exam: false,
  simBest: 0,
  simPlayed: 0,
  arcadeToday: 0,
  arcadeGames: 0,
  arcadeStreak: 0,
};

export interface SyncMetaLike {
  exam?: boolean;
  sims?: Record<string, number>;
  arcade?: { streak: number; games: number };
}

export function syncMetaToStats(m?: SyncMetaLike | null): SyncStats {
  if (!m) return { ...EMPTY_STATS };
  const vals = Object.values(m.sims ?? {});
  return {
    exam: m.exam === true,
    simBest: Math.max(0, ...vals),
    simPlayed: vals.length,
    arcadeToday: m.arcade?.games ?? 0,
    arcadeGames: m.arcade?.games ?? 0,
    arcadeStreak: m.arcade?.streak ?? 0,
  };
}

// device-local always wins ties upward — take the better of guest vs account
export function mergeStats(a: SyncStats, b: SyncStats): SyncStats {
  return {
    exam: a.exam || b.exam,
    simBest: Math.max(a.simBest, b.simBest),
    simPlayed: Math.max(a.simPlayed, b.simPlayed),
    arcadeToday: Math.max(a.arcadeToday, b.arcadeToday),
    arcadeGames: Math.max(a.arcadeGames, b.arcadeGames),
    arcadeStreak: Math.max(a.arcadeStreak, b.arcadeStreak),
  };
}
