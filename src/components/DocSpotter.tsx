"use client";

import { useState } from "react";
import { SPOTTER_DOCS, type SpotterDoc } from "@/lib/doc-spotter";

export default function DocSpotter() {
  const [doc, setDoc] = useState<SpotterDoc | null>(null);
  const [candidates, setCandidates] = useState<{ id: string; label: string; real: boolean }[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const start = (d: SpotterDoc) => {
    setDoc(d);
    setCandidates(
      [
        ...d.issues.map((i) => ({ id: i.id, label: i.label, real: true })),
        ...d.decoys.map((x, i) => ({ id: `d${i}`, label: x, real: false })),
      ].sort(() => Math.random() - 0.5)
    );
    setPicked(new Set());
    setSubmitted(false);
  };

  const toggle = (id: string) => {
    if (submitted) return;
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const score = submitted && doc
    ? {
        tp: doc.issues.filter((i) => picked.has(i.id)).length,
        fp: [...picked].filter((id) => !doc.issues.some((i) => i.id === id)).length,
        fn: doc.issues.filter((i) => !picked.has(i.id)).length,
      }
    : null;

  /* ---------- picker ---------- */
  if (!doc) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {SPOTTER_DOCS.map((d) => (
          <button
            key={d.slug}
            onClick={() => start(d)}
            className="rounded-xl border border-line bg-surface/50 p-4 text-left transition-colors hover:border-emerald-400/40"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              {d.kind}
            </span>
            <h3 className="mt-1.5 text-sm font-bold text-ink">{d.title}</h3>
            <p className="mt-1 text-[11px] text-faint">{d.lines.length} lines · {d.issues.length} real issues hidden among decoys</p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      {/* document */}
      <div>
        <button onClick={() => setDoc(null)} className="text-xs text-muted hover:text-ink">← All documents</button>
        <div className="mt-3 rounded-xl border border-line bg-[#f5f1e6] p-5 font-mono text-[11px] leading-6 text-zinc-800 shadow-inner dark:bg-[#1a1f2e] dark:text-zinc-200">
          <p className="mb-3 border-b border-zinc-300 pb-2 text-center text-[10px] font-bold uppercase tracking-widest dark:border-zinc-600">
            {doc.title}
          </p>
          {doc.lines.map((l, i) => (
            <p key={i} className={l.endsWith(":") || l === l.toUpperCase() ? "font-semibold" : ""}>
              {l}
            </p>
          ))}
        </div>
      </div>

      {/* findings */}
      <div>
        <p className="text-xs font-semibold text-ink">
          Select every REAL issue — some options are plausible-sounding decoys.
        </p>
        <div className="mt-3 space-y-2">
          {candidates.map((c) => {
            const isReal = doc.issues.some((i) => i.id === c.id);
            const isPicked = picked.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                disabled={submitted}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-left text-xs leading-5 transition-colors ${
                  submitted && isReal
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    : submitted && isPicked && !isReal
                      ? "border-red-500/50 bg-red-500/10 text-red-500"
                      : isPicked
                        ? "border-sky-500/50 bg-sky-500/10 text-ink"
                        : "border-line bg-surface/50 text-muted hover:border-sky-400/40"
                }`}
              >
                <span className="flex items-start gap-2">
                  <span className={`mt-0.5 ${isPicked ? "text-sky-500" : "text-faint"}`}>{isPicked ? "☑" : "☐"}</span>
                  {c.label}
                </span>
                {submitted && (
                  <span className="mt-1 block pl-5 text-[11px] leading-4 opacity-80">
                    {isReal ? doc.issues.find((i) => i.id === c.id)?.why : "Not an issue — plausible but not a real red flag."}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={picked.size === 0}
            className="mt-4 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300 disabled:opacity-40"
          >
            Submit findings ({picked.size} selected)
          </button>
        ) : score && (
          <div className="mt-4 rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">
              {score.tp}/{doc.issues.length} real issues found
              {score.fp > 0 && <span className="text-red-400"> · {score.fp} false positive{score.fp > 1 ? "s" : ""}</span>}
              {score.fn > 0 && <span className="text-amber-400"> · {score.fn} missed</span>}
            </p>
            <p className="mt-1 text-xs text-muted">
              {score.tp === doc.issues.length && score.fp === 0
                ? "Perfect eye — you spotted every planted issue with no false positives."
                : score.tp >= doc.issues.length - 1
                  ? "Strong. The missed item is worth a second look at the document."
                  : "Review the explanations above — the missed issues are the ones examiners probe on."}
            </p>
            <button onClick={() => start(doc)} className="mt-3 rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink">
              ↻ Reshuffle & retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
