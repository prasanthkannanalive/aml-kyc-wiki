"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CASE_SIMS, type CaseSim } from "@/lib/case-sims";

const KIND_STYLE: Record<string, { label: string; cls: string }> = {
  evidence: { label: "EVIDENCE", cls: "border-sky-400/40 bg-sky-400/10 text-sky-300" },
  trail: { label: "MONEY TRAIL", cls: "border-violet-400/40 bg-violet-400/10 text-violet-300" },
  note: { label: "ANALYST NOTE", cls: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  decision: { label: "YOUR CALL", cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
};

const DIFF_DOTS = ["", "●", "●●", "●●●", "●●●●", "●●●●●"];

export default function CaseSimulator() {
  const [active, setActive] = useState<CaseSim | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState<string[]>([]);
  const [lastDone, setLastDone] = useState<{ sim: CaseSim; mistakes: number } | null>(null);

  const cur = active?.steps[step];
  const isDecision = cur?.kind === "decision";

  const start = (c: CaseSim) => {
    setActive(c);
    setStep(0);
    setPicked(null);
    setMistakes(0);
    setFinished([]);
  };

  const choose = (ci: number) => {
    if (picked !== null || !cur?.choices) return;
    setPicked(ci);
    if (!cur.choices[ci].correct) setMistakes((m) => m + 1);
  };

  const advance = () => {
    if (!active) return;
    if (step + 1 >= active.steps.length) {
      setFinished((f) => [...f, active.slug]);
      setLastDone({ sim: active, mistakes });
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "sim", id: `case-${active.slug}` }),
      }).catch(() => {});
      setActive(null);
      setStep(0);
      setPicked(null);
    } else {
      setStep(step + 1);
      setPicked(null);
    }
  };

  /* ---------- case picker ---------- */
  if (!active) {
    return (
      <div>
        {lastDone && (
          <div className="mb-5">
            <CaseOutcome
              sim={lastDone.sim}
              mistakes={lastDone.mistakes}
              onBack={() => setLastDone(null)}
            />
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_SIMS.map((c) => (
            <button
              key={c.slug}
              onClick={() => start(c)}
              className={`rounded-xl border border-line bg-surface/50 p-4 text-left transition-colors hover:border-emerald-400/40 ${
                finished.includes(c.slug) ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  {c.domain}
                </span>
                <span className="text-[10px] text-amber-400/80" title={`Difficulty ${c.difficulty}/5`}>
                  {DIFF_DOTS[c.difficulty]}
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-bold text-ink">{c.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted">{c.blurb}</p>
              <p className="mt-2 text-[10px] font-medium text-faint">
                {finished.includes(c.slug) ? "✓ completed — replay" : `${c.steps.length} steps · ~5 min`}
              </p>
            </button>
          ))}
        </div>
        {finished.length > 0 && (
          <p className="mt-4 text-xs text-muted">
            {finished.length}/{CASE_SIMS.length} case files worked · {mistakes === 0 ? "" : ""}
          </p>
        )}
      </div>
    );
  }

  /* ---------- in-case view ---------- */
  const k = cur ? KIND_STYLE[cur.kind] : KIND_STYLE.evidence;
  return (
    <div className="rounded-2xl border border-line bg-surface/40">
      {/* case header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 px-5 py-3.5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Case file · {active.domain}
          </p>
          <h3 className="text-sm font-bold text-ink">{active.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span>{step + 1}/{active.steps.length}</span>
          <div className="flex gap-1">
            {active.steps.map((_, i) => (
              <span key={i} className={`h-1.5 w-4 rounded-full ${i < step ? "bg-emerald-400" : i === step ? "bg-emerald-400/50" : "bg-line"}`} />
            ))}
          </div>
          <button onClick={() => setActive(null)} className="text-faint hover:text-ink">✕</button>
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${k.cls}`}>
              {k.label}
            </span>
            <h4 className="mt-3 text-base font-bold text-ink">{cur?.title}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{cur?.body}</p>

            {isDecision && cur?.choices && (
              <div className="mt-4 grid gap-2">
                {cur.choices.map((ch, ci) => {
                  const showResult = picked !== null;
                  return (
                    <button
                      key={ci}
                      onClick={() => choose(ci)}
                      disabled={showResult}
                      className={`rounded-lg border px-3.5 py-2.5 text-left text-xs leading-5 transition-colors ${
                        showResult && ch.correct
                          ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                          : showResult && picked === ci && !ch.correct
                            ? "border-red-400/50 bg-red-400/10 text-red-300"
                            : "border-line bg-background/50 text-muted hover:border-emerald-400/40 hover:text-ink"
                      }`}
                    >
                      {ch.label}
                      {showResult && (
                        <span className="mt-1 block text-[11px] leading-4 opacity-80">{ch.feedback}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {(!isDecision || picked !== null) && (
              <button
                onClick={advance}
                className="mt-5 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                {step + 1 >= active.steps.length ? "Close the file →" : "Continue →"}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- outcome panel (shown after finishing) ---------- */
export function CaseOutcome({ sim, mistakes, onBack }: { sim: CaseSim; mistakes: number; onBack: () => void }) {
  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
        Case closed · {sim.domain}
      </p>
      <h3 className="mt-1.5 text-lg font-bold text-ink">{sim.title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-background/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-300">Filing</p>
          <p className="mt-1.5 text-xs leading-5 text-muted">{sim.outcome.filed}</p>
        </div>
        <div className="rounded-xl border border-line bg-background/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-300">Analyst rationale</p>
          <p className="mt-1.5 text-xs leading-5 text-muted">{sim.outcome.rationale}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className={`text-sm font-semibold ${mistakes === 0 ? "text-emerald-400" : mistakes <= 1 ? "text-amber-400" : "text-red-400"}`}>
          {mistakes === 0 ? "Clean file — zero missteps" : `${mistakes} misstep${mistakes > 1 ? "s" : ""} along the way`}
        </span>
        <button onClick={onBack} className="ml-auto rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink">
          ← All case files
        </button>
      </div>
    </div>
  );
}
