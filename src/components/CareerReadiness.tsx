"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { careerRoles } from "@/lib/careers";
import { EMPTY_STATS, mergeStats, type SyncStats } from "@/lib/sync-stats";

interface CourseProg { slug: string; title: string; read: number; done: number; total: number }

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

export default function CareerReadiness({
  perCourse,
  loggedIn,
  serverStats,
}: {
  perCourse: CourseProg[];
  loggedIn: boolean;
  serverStats?: SyncStats;
}) {
  const [local, setLocal] = useState<SyncStats | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLocal(loadLocal()), 0);
    return () => clearTimeout(t);
  }, []);

  const merged = useMemo(
    () => (local ? mergeStats(local, serverStats ?? EMPTY_STATS) : (serverStats ?? null)),
    [local, serverStats]
  );

  const stats = useMemo(() => {
    const n = perCourse.length || 1;
    const avgDone = perCourse.reduce((s, c) => s + (c.total ? c.done / c.total : 0), 0) / n;
    const avgRead = perCourse.reduce((s, c) => s + (c.total ? c.read / c.total : 0), 0) / n;
    let pts = avgDone * 60 + avgRead * 20;
    if (merged?.exam) pts += 10;
    if ((merged?.simBest ?? 0) >= 70) pts += 5;
    else if ((merged?.simBest ?? 0) >= 50) pts += 3;
    if ((merged?.arcadeToday ?? 0) >= 5) pts += 2;
    if ((merged?.arcadeStreak ?? 0) >= 3) pts += 1;
    return Math.min(100, Math.round(pts));
  }, [perCourse, merged]);

  const totalDone = perCourse.reduce((s, c) => s + c.done, 0);
  const totalCh = perCourse.reduce((s, c) => s + c.total, 0);

  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">Your qualification readiness</h2>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Estimated from your real activity — chapters completed, final exam, job
            simulations and arcade. This is a self-tracking signal, not a credential.
            {!loggedIn && " Sign in to unlock chapter-progress tracking."}
          </p>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl font-bold text-emerald-400">{merged ? stats : "—"}%</div>
          <div className="text-xs text-muted">qualification score</div>
        </div>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-700"
          style={{ width: `${merged ? stats : 0}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">
        {totalDone}/{totalCh} chapters completed
        {merged?.exam ? " · final exam passed" : ""}
        {(merged?.simBest ?? 0) > 0 ? ` · best simulation ${merged?.simBest}%` : ""}
        {(merged?.arcadeStreak ?? 0) > 0 ? ` · arcade streak ${merged?.arcadeStreak}d` : ""}
      </p>

      {/* role readiness */}
      <div className="mt-6 space-y-3">
        {careerRoles.map((r) => {
          const pct = Math.min(100, Math.round((stats / r.readyAt) * 100));
          const ready = stats >= r.readyAt;
          const keyPct = r.keyCourse
            ? (() => {
                const c = perCourse.find((p) => p.slug === r.keyCourse);
                return c?.total ? Math.round((c.done / c.total) * 100) : 0;
              })()
            : null;
          return (
            <div key={r.slug} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{r.title}</span>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                    {r.level}
                  </span>
                </div>
                <span className={`text-xs font-semibold ${ready ? "text-emerald-400" : "text-muted"}`}>
                  {ready ? "✓ Role-ready" : `${pct}% there`}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${ready ? "bg-emerald-400" : "bg-sky-400/70"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                Ready at ~{r.readyAt}% qualification
                {keyPct !== null && ` · ${r.keyCourse === "kyc-cdd-tm-analyst" ? "KYC course" : r.keyCourse} ${keyPct}% done`}
              </p>
            </div>
          );
        })}
      </div>

      {!loggedIn && (
        <p className="mt-4 text-xs text-muted">
          <Link href="/signup" className="text-emerald-400 hover:underline">Create a free account</Link>{" "}
          to have chapter progress counted toward your score.
        </p>
      )}
    </div>
  );
}
