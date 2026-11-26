"use client";

import { useState } from "react";
import Link from "next/link";
import { WALKTHROUGH_STEPS } from "@/lib/walkthrough";

export default function Walkthrough() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const cur = WALKTHROUGH_STEPS[step];
  const total = WALKTHROUGH_STEPS.length;

  const markDone = () => {
    setDone((d) => new Set(d).add(step));
    if (step < total - 1) setStep(step + 1);
  };

  return (
    <div>
      {/* progress */}
      <div className="flex items-center gap-2">
        {WALKTHROUGH_STEPS.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setStep(i)}
            aria-label={`Step ${i + 1}: ${s.title}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === step
                ? "bg-emerald-400"
                : done.has(i)
                  ? "bg-emerald-400/40"
                  : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-faint">
        Step {step + 1} of {total} · {Math.round(((step + 1) / total) * 100)}%
      </p>

      {/* card */}
      <div className="mt-4 rounded-2xl border border-line bg-surface/50 p-6 sm:p-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
          {cur.tagline}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-ink">{cur.title}</h2>
        <p className="mt-3 text-sm leading-6 text-body">{cur.body}</p>
        <ul className="mt-5 space-y-2">
          {cur.points.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm leading-6 text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={cur.href}
            className="rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300"
          >
            {cur.cta} →
          </Link>
          {step < total - 1 ? (
            <button
              onClick={markDone}
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-emerald-400/50"
            >
              Got it — next step
            </button>
          ) : (
            <button
              onClick={() => {
                setDone(new Set());
                setStep(0);
              }}
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-emerald-400/50"
            >
              Restart walkthrough
            </button>
          )}
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      {/* step map */}
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {WALKTHROUGH_STEPS.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
              i === step
                ? "border-emerald-400/50 bg-emerald-400/5 text-ink"
                : "border-line bg-surface/40 text-muted hover:text-ink"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                done.has(i)
                  ? "bg-emerald-400/20 text-emerald-300"
                  : i === step
                    ? "bg-emerald-400 text-emerald-950"
                    : "bg-surface text-faint"
              }`}
            >
              {done.has(i) ? "✓" : i + 1}
            </span>
            <span className="truncate font-medium">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
