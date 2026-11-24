"use client";

import { useEffect, useMemo, useState } from "react";
import { badges, TIER_STYLE, type BadgeDef } from "@/lib/badges";
import { EMPTY_STATS, mergeStats, type SyncStats } from "@/lib/sync-stats";
import Confetti from "@/components/Confetti";

interface CourseProg { slug: string; read: number; done: number; total: number }
type LocalStats = SyncStats;

const SEEN_KEY = "aml-badges-seen-v1";

function loadLocal(): SyncStats {
  const out: SyncStats = { ...EMPTY_STATS };
  try {
    out.exam = localStorage.getItem("aml-kyc-final-exam:kyc-cdd-tm-analyst") === "passed";
    const sim = localStorage.getItem("aml-sim-v1");
    if (sim) {
      const d = (JSON.parse(sim) as { done?: Record<string, number> }).done ?? {};
      const vals = Object.values(d);
      out.simBest = Math.max(0, ...vals);
      out.simPlayed = vals.length;
    }
    const arc = localStorage.getItem("aml-arcade-v1");
    if (arc) {
      const a = JSON.parse(arc) as { done?: Record<string, number>; streak?: number };
      out.arcadeToday = Object.keys(a.done ?? {}).length;
      out.arcadeGames = out.arcadeToday;
      out.arcadeStreak = a.streak ?? 0;
    }
  } catch {}
  return out;
}

function earnedSet(perCourse: CourseProg[], local: LocalStats): Set<string> {
  const s = new Set<string>();
  const totalRead = perCourse.reduce((a, c) => a + c.read, 0);
  const coursesWithProgress = perCourse.filter((c) => c.read > 0).length;
  const kyc = perCourse.find((c) => c.slug === "kyc-cdd-tm-analyst");
  const kycPct = kyc?.total ? kyc.done / kyc.total : 0;
  const anyCourseDone = perCourse.some((c) => c.total > 0 && c.done >= c.total);

  if (totalRead >= 1) s.add("first-steps");
  if (totalRead >= 10) s.add("bookworm");
  if (totalRead >= 25) s.add("scholar");
  if (anyCourseDone) s.add("course-finisher");
  if (kycPct >= 0.5) s.add("kyc-master");
  if (local.exam) s.add("exam-pass");
  if (local.simBest >= 70) s.add("simulator");
  if (local.arcadeToday >= 5) s.add("arcade-daily");
  if (local.arcadeStreak >= 3) s.add("arcade-streak");
  if (coursesWithProgress >= 3) s.add("polymath");
  return s;
}

export default function Achievements({
  perCourse,
  serverStats,
}: {
  perCourse: CourseProg[];
  serverStats?: SyncStats;
}) {
  const [local, setLocal] = useState<SyncStats | null>(null);
  const [toasts, setToasts] = useState<BadgeDef[]>([]);
  const [confetti, setConfetti] = useState(0);

  const merged = useMemo(
    () => (local ? mergeStats(local, serverStats ?? EMPTY_STATS) : (serverStats ?? null)),
    [local, serverStats]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      const l = loadLocal();
      setLocal(l);
      const m = mergeStats(l, serverStats ?? EMPTY_STATS);
      let prev: string[] = [];
      try {
        prev = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
      } catch {}
      const earned = earnedSet(perCourse, m);
      // persist earned∪prev so badges don't re-toast
      const merged = [...new Set([...prev, ...earned])];
      try { localStorage.setItem(SEEN_KEY, JSON.stringify(merged)); } catch {}
      // newly earned = earned now but not previously seen; skip toasts on very first visit
      let initialized = true;
      try { initialized = localStorage.getItem("aml-badges-init") === "1"; } catch {}
      const fresh = badges.filter((b) => earned.has(b.id) && !prev.includes(b.id));
      try { localStorage.setItem("aml-badges-init", "1"); } catch {}
      if (fresh.length && initialized) {
        setToasts(fresh.slice(0, 3));
        setConfetti((c) => c + 1);
        const timer = setTimeout(() => setToasts([]), 6000);
        return () => clearTimeout(timer);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [perCourse, serverStats]);

  const earned = useMemo(
    () => (merged ? earnedSet(perCourse, merged) : new Set<string>()),
    [perCourse, merged]
  );

  const earnedBadges = badges.filter((b) => earned.has(b.id));
  const locked = badges.filter((b) => !earned.has(b.id));

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <Confetti fire={confetti} />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <span className="font-mono text-xs text-muted">
          {earnedBadges.length}/{badges.length} earned
        </span>
      </div>

      {earnedBadges.length === 0 ? (
        <p className="mt-3 text-sm text-muted">
          Complete chapters, pass the exam, or play the arcade to start earning badges.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {earnedBadges.map((b) => (
            <div key={b.id} className={`rounded-xl border p-3 text-center ${TIER_STYLE[b.tier]}`} title={b.desc}>
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-current/30 text-lg font-bold">
                {b.title[0]}
              </div>
              <div className="mt-1.5 text-xs font-semibold leading-4">{b.title}</div>
              <div className="mt-0.5 text-[10px] leading-3 opacity-80">{b.desc}</div>
            </div>
          ))}
        </div>
      )}

      {locked.length > 0 && earnedBadges.length > 0 && (
        <p className="mt-4 text-xs text-muted">
          Next up: {locked.slice(0, 3).map((b) => b.title).join(" · ")}
          {locked.length > 3 ? ` +${locked.length - 3} more` : ""}
        </p>
      )}

      {/* toast notifications */}
      {toasts.map((b) => (
        <div
          key={b.id}
          className="toast-in fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-2xl border border-yellow-400/50 bg-surface px-4 py-3 shadow-2xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/15 text-lg font-bold text-yellow-300">
            {b.title[0]}
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-yellow-300">Badge earned</div>
            <div className="text-sm font-semibold text-ink">{b.title}</div>
            <div className="text-xs text-muted">{b.desc} · +XP</div>
          </div>
        </div>
      ))}
    </div>
  );
}
