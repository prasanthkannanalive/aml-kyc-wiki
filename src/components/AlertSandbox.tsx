"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface SandboxScenario {
  id: string;
  title: string;
  alert: string;
  facts: string[];
  options: { label: string; correct?: boolean; feedback: string }[];
}

export default function AlertSandbox({ scenarios }: { scenarios: SandboxScenario[] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const s = scenarios[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (s.options[i].correct) setScore((v) => v + 1);
  };

  const next = () => {
    if (idx + 1 >= scenarios.length) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center"
      >
        <p className="text-3xl font-bold text-emerald-400">
          {score} / {scenarios.length}
        </p>
        <p className="mt-2 text-sm text-muted">
          {score === scenarios.length
            ? "Perfect triage — analyst-grade instincts."
            : score >= scenarios.length / 2
              ? "Solid work. Review the explanations for the misses."
              : "Worth another run — the explanations are where the learning is."}
        </p>
        <button
          onClick={restart}
          className="mt-5 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-300"
        >
          Try again
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* progress */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full bg-emerald-400"
            animate={{ width: `${((idx + (picked !== null ? 1 : 0)) / scenarios.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-xs text-muted">
          {idx + 1}/{scenarios.length} · score {score}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-line bg-surface/50"
        >
          <div className="border-b border-line/60 px-5 py-3.5">
            <span className="rounded-md bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-300">
              TM ALERT #{s.id}
            </span>
            <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.alert}</p>
          </div>
          <ul className="space-y-2 px-5 py-4">
            {s.facts.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-line/60 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Choose your disposition
            </p>
            {s.options.map((o, i) => {
              const isPicked = picked === i;
              const showResult = picked !== null;
              const cls = showResult
                ? o.correct
                  ? "border-emerald-400/60 bg-emerald-400/10"
                  : isPicked
                    ? "border-red-400/60 bg-red-400/10"
                    : "border-line opacity-50"
                : "border-line hover:border-emerald-400/40 hover:bg-surface-2/40";
              return (
                <button
                  key={o.label}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all ${cls}`}
                >
                  <span className="font-medium text-ink">{o.label}</span>
                  {showResult && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1.5 block text-xs leading-5 text-muted"
                    >
                      {o.feedback}
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="flex justify-end border-t border-line/60 px-5 py-3.5">
              <button
                onClick={next}
                className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                {idx + 1 >= scenarios.length ? "See results" : "Next alert →"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
