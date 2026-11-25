"use client";

import { useMemo, useState } from "react";
import { SAR_EXERCISES, type SarExercise } from "@/lib/sar-exercises";

export default function SarWriter() {
  const [ex, setEx] = useState<SarExercise | null>(null);
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState(false);

  const lower = draft.toLowerCase();
  const hits = useMemo(
    () => (ex ? ex.keywords.filter((k) => lower.includes(k)) : []),
    [ex, lower]
  );
  const coverage = ex ? Math.round((hits.length / ex.keywords.length) * 100) : 0;
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  const start = (e: SarExercise) => {
    setEx(e);
    setDraft("");
    setChecked(false);
  };

  /* ---------- picker ---------- */
  if (!ex) {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {SAR_EXERCISES.map((e) => (
          <button
            key={e.slug}
            onClick={() => start(e)}
            className="rounded-xl border border-line bg-surface/50 p-4 text-left transition-colors hover:border-emerald-400/40"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              {e.domain}
            </span>
            <h3 className="mt-1.5 text-sm font-bold text-ink">{e.title}</h3>
            <p className="mt-2 text-[11px] leading-4 text-faint">
              {e.checklist.length}-point rubric · model narrative provided
            </p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      {/* brief + rubric */}
      <div>
        <button onClick={() => setEx(null)} className="text-xs text-muted hover:text-ink">← All exercises</button>
        <div className="mt-3 rounded-xl border border-line bg-surface/50 p-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            {ex.domain}
          </span>
          <h3 className="mt-1 text-sm font-bold text-ink">{ex.title}</h3>
          <p className="mt-2 text-xs leading-5 text-muted">{ex.brief}</p>
        </div>
        <div className="mt-3 rounded-xl border border-line bg-surface/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">What a good SAR covers</p>
          <ul className="mt-2 space-y-1">
            {ex.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-muted">
                <span className="mt-0.5 text-emerald-400">▸</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* writer */}
      <div>
        <textarea
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setChecked(false); }}
          placeholder="Write the SAR narrative here — who, what, when, where, why suspicious…"
          rows={14}
          className="w-full rounded-xl border border-line bg-background/60 p-4 font-mono text-xs leading-5 text-ink placeholder:text-faint focus:border-emerald-400/50 focus:outline-none"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setChecked(true)}
            disabled={wordCount < 20}
            className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300 disabled:opacity-40"
          >
            Check my draft
          </button>
          <span className="text-xs text-muted">{wordCount} words</span>
        </div>

        {checked && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-line bg-surface/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-ink">Fact coverage</p>
                <span className={`font-mono text-sm font-bold ${coverage >= 70 ? "text-emerald-400" : coverage >= 40 ? "text-amber-400" : "text-red-400"}`}>
                  {coverage}%
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted">
                Key facts your draft mentions: {hits.length}/{ex.keywords.length}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {ex.keywords.map((k) => (
                  <span
                    key={k}
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      hits.includes(k) ? "bg-emerald-400/15 text-emerald-300" : "bg-line/40 text-faint"
                    }`}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <details className="rounded-xl border border-line bg-surface/50 p-4">
              <summary className="cursor-pointer text-xs font-semibold text-ink">
                Model narrative (compare after writing your own)
              </summary>
              <p className="mt-3 text-xs leading-5 text-muted">{ex.model}</p>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
