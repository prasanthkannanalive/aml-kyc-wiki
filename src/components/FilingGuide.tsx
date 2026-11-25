"use client";

import { useState } from "react";
import { FILING_GUIDES } from "@/lib/filing-guides";

export default function FilingGuide() {
  const [slug, setSlug] = useState(FILING_GUIDES[0].slug);
  const [open, setOpen] = useState(0);
  const g = FILING_GUIDES.find((x) => x.slug === slug)!;

  return (
    <div>
      {/* regime picker */}
      <div className="flex flex-wrap gap-2">
        {FILING_GUIDES.map((x) => (
          <button
            key={x.slug}
            onClick={() => { setSlug(x.slug); setOpen(0); }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              x.slug === slug
                ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                : "border-line bg-surface/50 text-muted hover:text-ink"
            }`}
          >
            {x.country}
          </button>
        ))}
      </div>

      {/* guide header */}
      <div className="mt-5 rounded-xl border border-line bg-surface/50 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-ink">{g.reportName}</h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">{g.regime}</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-line/60 bg-background/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">Deadline</p>
            <p className="mt-0.5 text-xs font-medium text-ink">{g.deadline}</p>
          </div>
          <div className="rounded-lg border border-line/60 bg-background/50 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">Channel</p>
            <p className="mt-0.5 text-xs font-medium text-ink">{g.channel}</p>
          </div>
        </div>
      </div>

      {/* steps */}
      <div className="mt-4 space-y-2">
        {g.steps.map((s, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-line bg-surface/40">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-sm font-semibold text-ink">{s.title}</span>
              <span className="text-faint">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="border-t border-line/60 px-4 py-3">
                <p className="text-xs leading-5 text-muted">{s.body}</p>
                {s.fields && (
                  <ul className="mt-3 space-y-1">
                    {s.fields.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted">
                        <span className="mt-0.5 text-emerald-400">▸</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* gotchas */}
      <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-300">Examiner traps</p>
        <ul className="mt-2 space-y-1.5">
          {g.gotchas.map((gc) => (
            <li key={gc} className="flex items-start gap-2 text-xs leading-5 text-muted">
              <span className="mt-0.5 text-amber-400">⚠</span>{gc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
