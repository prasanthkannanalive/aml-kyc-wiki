"use client";

import { useEffect, useState } from "react";

const LEVELS = [
  { xp: 0, title: "Analyst" },
  { xp: 100, title: "Associate Analyst" },
  { xp: 300, title: "Senior Analyst" },
  { xp: 700, title: "Lead Analyst" },
  { xp: 1500, title: "MLRO Track" },
];

function loadArcade() {
  try {
    const raw = localStorage.getItem("aml-arcade-v1");
    if (raw) return JSON.parse(raw) as { streak?: number; done?: Record<string, number> };
  } catch {}
  return {};
}

export default function ProfileExtras({
  chaptersRead,
  chaptersDone,
}: {
  chaptersRead: number;
  chaptersDone: number;
}) {
  const [arcade, setArcade] = useState<{ streak: number; games: number; best: number } | null>(null);
  const [examPassed, setExamPassed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const a = loadArcade();
      const done = a.done ?? {};
      setArcade({
        streak: a.streak ?? 0,
        games: Object.keys(done).length,
        best: Math.max(0, ...Object.values(done)),
      });
      try {
        setExamPassed(localStorage.getItem("aml-kyc-final-exam:kyc-cdd-tm-analyst") === "passed");
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const arcadeXp = (arcade?.games ?? 0) * 15;
  const xp = chaptersRead * 10 + chaptersDone * 20 + arcadeXp + (examPassed ? 100 : 0);
  const level = [...LEVELS].reverse().find((l) => xp >= l.xp) ?? LEVELS[0];
  const next = LEVELS.find((l) => l.xp > xp);
  const pct = next ? Math.min(100, Math.round(((xp - level.xp) / (next.xp - level.xp)) * 100)) : 100;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold">Your journey</h2>
      <div className="mt-4 rounded-2xl border border-line bg-surface/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted">Level</div>
            <div className="mt-0.5 text-2xl font-bold text-emerald-400">{level.title}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm text-ink">{xp} XP</div>
            <div className="text-xs text-muted">
              {next ? `${next.xp - xp} XP to ${next.title}` : "Top level reached"}
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-surface p-3 text-center">
            <div className="font-mono text-lg font-bold text-ink">{chaptersRead * 10 + chaptersDone * 20}</div>
            <div className="text-[11px] text-muted">Course XP</div>
          </div>
          <div className="rounded-xl bg-surface p-3 text-center">
            <div className="font-mono text-lg font-bold text-ink">{arcade?.games ?? "—"}</div>
            <div className="text-[11px] text-muted">Arcade games today</div>
          </div>
          <div className="rounded-xl bg-surface p-3 text-center">
            <div className="font-mono text-lg font-bold text-ink">{arcade?.streak ?? "—"}</div>
            <div className="text-[11px] text-muted">Day streak</div>
          </div>
          <div className="rounded-xl bg-surface p-3 text-center">
            <div className={`font-mono text-lg font-bold ${examPassed ? "text-emerald-400" : "text-muted"}`}>
              {examPassed ? "✓" : "—"}
            </div>
            <div className="text-[11px] text-muted">Final exam</div>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-muted">
          XP = 10 per chapter read + 20 per chapter completed + 15 per arcade game + 100 for the
          final exam. Levels are a self-tracking aid, not an accreditation.
        </p>
      </div>
    </div>
  );
}
