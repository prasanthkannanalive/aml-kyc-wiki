"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PLAYGROUND_SCENARIOS, SCENARIO_CATS, DIFF_LABEL, type PlaygroundScenario } from "@/lib/playground";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScenarioRunner() {
  const [cat, setCat] = useState<string>("All");
  const [diff, setDiff] = useState<number>(0); // 0 = all
  const [queue, setQueue] = useState<PlaygroundScenario[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [done, setDone] = useState(false);

  const filtered = useMemo(
    () =>
      PLAYGROUND_SCENARIOS.filter(
        (s) => (cat === "All" || s.cat === cat) && (diff === 0 || s.diff === diff)
      ),
    [cat, diff]
  );

  const start = (count = 10) => {
    const pool = shuffle(filtered).slice(0, Math.min(count, filtered.length));
    setQueue(pool);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setAnswered(0);
    setDone(false);
  };

  const cur = queue[idx];

  const choose = (oi: number) => {
    if (picked !== null || !cur) return;
    setPicked(oi);
    setAnswered((a) => a + 1);
    if (oi === cur.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) {
      setDone(true);
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quiz", id: "playground-scenarios" }),
      }).catch(() => {});
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const pct = answered ? Math.round((score / answered) * 100) : 0;

  return (
    <div>
      {/* controls */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-lg border border-line bg-surface/60 px-3 py-2 text-xs text-ink"
        >
          <option value="All">All categories</option>
          {SCENARIO_CATS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={diff}
          onChange={(e) => setDiff(Number(e.target.value))}
          className="rounded-lg border border-line bg-surface/60 px-3 py-2 text-xs text-ink"
        >
          <option value={0}>All difficulties</option>
          {[5, 4, 3, 2, 1].map((d) => (
            <option key={d} value={d}>{DIFF_LABEL[d]} only</option>
          ))}
        </select>
        <button
          onClick={() => start(10)}
          className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
        >
          ▶ Start 10-scenario run
        </button>
        <button
          onClick={() => start(filtered.length)}
          className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink"
        >
          All {filtered.length} filtered
        </button>
        <span className="ml-auto text-xs text-muted">
          {score}/{answered} correct · {pct}%
        </span>
      </div>

      {/* scenario card */}
      {done ? (
        <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center">
          <p className="font-mono text-3xl font-bold text-ink">{score}/{queue.length}</p>
          <p className="mt-1 text-sm text-muted">
            {pct >= 80 ? "Veteran-level judgment — these scenarios don't rattle you." :
             pct >= 60 ? "Solid. Review the misses — they're the ones interviewers love." :
             "The hard ones got you. Work through the categories you missed and retry."}
          </p>
          <button onClick={() => start(10)} className="mt-4 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300">
            New run
          </button>
        </div>
      ) : cur ? (
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full border border-line bg-surface/60 px-2.5 py-0.5 font-mono text-muted">
              #{cur.id} · {cur.cat}
            </span>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-semibold text-amber-300">
              {DIFF_LABEL[cur.diff]}
            </span>
            <span className="text-muted">{idx + 1}/{queue.length}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-ink">{cur.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{cur.situation}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {cur.options.map((opt, oi) => {
              const isPicked = picked === oi;
              const isCorrect = cur.answer === oi;
              const showResult = picked !== null;
              return (
                <button
                  key={oi}
                  onClick={() => choose(oi)}
                  disabled={picked !== null}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs leading-5 transition-colors ${
                    showResult && isCorrect
                      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                      : showResult && isPicked && !isCorrect
                        ? "border-red-400/50 bg-red-400/10 text-red-300"
                        : isPicked
                          ? "border-emerald-400/50 bg-emerald-400/10 text-ink"
                          : "border-line bg-surface/60 text-muted hover:border-emerald-400/40 hover:text-ink"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-line bg-surface/50 p-4"
              >
                <p className="text-xs font-semibold text-ink">
                  {picked === cur.answer ? "✓ Correct" : "✗ Not quite"}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-muted">{cur.why}</p>
                <button onClick={next} className="mt-3 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300">
                  {idx + 1 >= queue.length ? "See results" : "Next scenario →"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted">
          Pick a category or difficulty, then start a run — {PLAYGROUND_SCENARIOS.length} scenarios across {SCENARIO_CATS.length} typologies.
        </div>
      )}
    </div>
  );
}
