"use client";

import { useMemo, useState } from "react";
import type { InterviewSection } from "@/lib/content";

interface Card { q: string; a: string; section: string }

function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function MockInterview({ sections }: { sections: InterviewSection[] }) {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(5);
  const [deck, setDeck] = useState<Card[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [grades, setGrades] = useState<Record<number, "got" | "shaky" | "missed">>({});

  const all = useMemo(
    () =>
      sections.flatMap((s) =>
        s.items.map((i) => ({ q: i.q, a: i.a, section: s.title }))
      ),
    [sections]
  );

  const start = (n: number) => {
    const r = mulberry(Date.now() % 2147483647);
    const shuffled = [...all].sort(() => r() - 0.5).slice(0, n);
    setDeck(shuffled);
    setCount(n);
    setIdx(0);
    setRevealed(false);
    setAnswer("");
    setGrades({});
    setRunning(true);
  };

  const card = deck[idx];
  const done = running && idx >= deck.length;
  const score = Object.values(grades);
  const got = score.filter((g) => g === "got").length;

  if (!running) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6">
        <h2 className="text-lg font-bold text-ink">Mock interview</h2>
        <p className="mt-1 text-sm text-muted">
          Get {count === 5 ? "5" : count} random questions drawn from all sections. Type your
          answer out loud or in the box, reveal the model answer, then grade yourself honestly.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs text-muted">Questions:</span>
          {[3, 5, 8, 10].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${count === n ? "border-emerald-400 bg-emerald-400/15 text-emerald-300" : "border-line text-muted hover:border-emerald-400/40"}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => start(count)}
            className="ml-auto rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 transition-transform hover:scale-[1.02]"
          >
            Start mock interview →
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = deck.length ? Math.round((got / deck.length) * 100) : 0;
    return (
      <div className="rounded-2xl border border-line bg-surface/60 p-6">
        <div className="text-center">
          <div className="text-4xl">{pct >= 80 ? "🎯" : pct >= 50 ? "💪" : "📚"}</div>
          <h2 className="mt-2 text-xl font-bold text-ink">Interview complete</h2>
          <p className="mt-1 text-sm text-muted">
            {got}/{deck.length} nailed it ({pct}%) ·{" "}
            {score.filter((g) => g === "shaky").length} shaky ·{" "}
            {score.filter((g) => g === "missed").length} missed
          </p>
        </div>
        <div className="mt-6 space-y-3">
          {deck.map((c, i) => (
            <details key={i} className="rounded-xl border border-line bg-surface/60 p-4">
              <summary className="cursor-pointer text-sm font-medium text-ink">
                <span className={`mr-2 font-mono text-xs ${grades[i] === "got" ? "text-emerald-400" : grades[i] === "shaky" ? "text-amber-400" : "text-red-400"}`}>
                  {grades[i] === "got" ? "✓" : grades[i] === "shaky" ? "~" : "✗"}
                </span>
                {c.q}
              </summary>
              <p className="mt-2 text-sm leading-6 text-body">{c.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => start(count)} className="rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform">
            Retry new set
          </button>
          <button onClick={() => setRunning(false)} className="rounded-xl border border-line px-5 py-2 text-sm font-medium text-muted hover:text-ink">
            Back to question bank
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Question {idx + 1} of {deck.length}</span>
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5">{card.section}</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${(idx / deck.length) * 100}%` }} />
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-7 text-ink">{card.q}</h3>
      {!revealed ? (
        <>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            placeholder="Type your answer as you would say it in the interview…"
            className="mt-4 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-emerald-400"
          />
          <button
            onClick={() => setRevealed(true)}
            className="mt-3 rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform"
          >
            Reveal model answer
          </button>
        </>
      ) : (
        <div className="mt-4">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Model answer</div>
            <p className="mt-1.5 text-sm leading-6 text-body">{card.a}</p>
          </div>
          {answer.trim() && (
            <details className="mt-3 rounded-xl border border-line bg-surface/60 p-3">
              <summary className="cursor-pointer text-xs font-medium text-muted">Your answer</summary>
              <p className="mt-2 text-sm leading-6 text-body">{answer}</p>
            </details>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">Grade yourself:</span>
            {([["got", "✓ Got it", "text-emerald-400 border-emerald-400/40"],
              ["shaky", "~ Shaky", "text-amber-400 border-amber-400/40"],
              ["missed", "✗ Missed", "text-red-400 border-red-400/40"]] as const).map(([g, label, cls]) => (
              <button
                key={g}
                onClick={() => setGrades((p) => ({ ...p, [idx]: g }))}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${cls} ${grades[idx] === g ? "bg-emerald-400/10" : "hover:bg-surface-2"}`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => { setIdx((i) => i + 1); setRevealed(false); setAnswer(""); }}
              className="ml-auto rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform"
            >
              {idx + 1 === deck.length ? "See results →" : "Next question →"}
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setRunning(false)} className="mt-4 text-xs text-muted hover:text-ink">
        End interview early
      </button>
    </div>
  );
}
