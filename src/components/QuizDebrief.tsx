"use client";

import { tipForSection } from "@/lib/quiz-tips";
import type { ModuleQuizQuestion } from "@/lib/module-quizzes";

/**
 * Post-quiz debrief: score, per-section breakdown, weakest areas with
 * targeted revision tips, and a missed-question recap.
 */
export default function QuizDebrief({
  questions,
  picked,
}: {
  questions: ModuleQuizQuestion[];
  picked: (number | null)[];
}) {
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const pct = score / questions.length;

  // group by section (fall back to a single bucket when untagged)
  const sections = new Map<string, { correct: number; total: number }>();
  questions.forEach((item, i) => {
    const s = item.section ?? "";
    if (!s) return;
    const cur = sections.get(s) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (picked[i] === item.answer) cur.correct += 1;
    sections.set(s, cur);
  });
  const hasSections = sections.size > 1;
  const sectionRows = [...sections.entries()]
    .map(([name, v]) => ({ name, ...v, pct: v.correct / v.total }))
    .sort((a, b) => a.pct - b.pct);
  const weakest = sectionRows.filter((s) => s.pct < 0.8).slice(0, 3);

  const missed = questions
    .map((item, i) => ({ item, i }))
    .filter((x) => picked[x.i] !== x.item.answer);

  return (
    <div className="mt-4 space-y-4">
      {/* score line */}
      <p
        className={`text-sm font-semibold ${
          pct >= 0.8
            ? "text-emerald-400"
            : pct >= 0.6
              ? "text-amber-400"
              : "text-red-400"
        }`}
      >
        Score: {score}/{questions.length} ({Math.round(pct * 100)}%)
        {pct >= 0.8
          ? " — strong result"
          : pct >= 0.6
            ? " — solid, tighten the weak spots below"
            : " — revisit the material before your next attempt"}
      </p>

      {/* per-section breakdown */}
      {hasSections && (
        <div className="rounded-lg border border-line bg-surface/60 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Score by topic
          </p>
          <div className="mt-2.5 space-y-1.5">
            {sectionRows.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5">
                <span className="w-40 shrink-0 truncate text-[11px] text-muted" title={s.name}>
                  {s.name}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${
                      s.pct >= 0.8
                        ? "bg-emerald-400"
                        : s.pct >= 0.6
                          ? "bg-amber-400"
                          : "bg-red-400"
                    }`}
                    style={{ width: `${Math.round(s.pct * 100)}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-mono text-[10px] text-ink">
                  {s.correct}/{s.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* what to improve */}
      {(hasSections ? weakest.length > 0 : missed.length > 0) && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Focus your revision
          </p>
          <ul className="mt-2 space-y-2">
            {hasSections
              ? weakest.map((s) => (
                  <li key={s.name} className="text-xs leading-5 text-body">
                    <span className="font-semibold text-ink">
                      {s.name} — {Math.round(s.pct * 100)}%
                    </span>{" "}
                    ({s.correct}/{s.total}). {tipForSection(s.name)}
                  </li>
                ))
              : missed.slice(0, 4).map((m) => (
                  <li key={m.i} className="text-xs leading-5 text-body">
                    <span className="font-semibold text-ink">
                      Q{m.i + 1}:
                    </span>{" "}
                    {m.item.q.length > 90
                      ? m.item.q.slice(0, 90) + "…"
                      : m.item.q}{" "}
                    — see the explanation below.
                  </li>
                ))}
          </ul>
        </div>
      )}

      {/* missed recap */}
      {missed.length > 0 && (
        <p className="text-[11px] text-muted">
          Missed {missed.length} question{missed.length === 1 ? "" : "s"}:{" "}
          {missed.map((m) => `Q${m.i + 1}`).join(", ")} — each has a full
          per-option explanation above.
        </p>
      )}
    </div>
  );
}
