"use client";

import { useEffect, useState } from "react";
import { simulations, type Simulation } from "@/lib/simulations";
import { simHints } from "@/lib/sim-hints";

interface SimProgress {
  done: Record<string, number>; // slug -> best score %
}

function load(): SimProgress {
  try {
    const raw = localStorage.getItem("aml-sim-v1");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { done: {} };
}

function save(p: SimProgress) {
  try {
    localStorage.setItem("aml-sim-v1", JSON.stringify(p));
  } catch {}
}

const RANKS = [
  { min: 90, title: "MLRO-calibre judgement", emoji: "🏆" },
  { min: 70, title: "Solid analyst instincts", emoji: "💼" },
  { min: 50, title: "Promising — keep drilling", emoji: "📈" },
  { min: 0, title: "Back to the chapters — then retry", emoji: "📚" },
];

export default function JobSimulation() {
  const [active, setActive] = useState<Simulation | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picks, setPicks] = useState<number[]>([]);
  const [hintOpen, setHintOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState<SimProgress>({ done: {} });
  const [filter, setFilter] = useState<"all" | "shift" | "filing">("all");

  useEffect(() => {
    const t = setTimeout(() => setProgress(load()), 0);
    return () => clearTimeout(t);
  }, []);

  // deep-link: /job-simulation?sim=<slug> auto-starts that scenario
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("sim");
    if (!slug) return;
    const sim = simulations.find((s) => s.slug === slug);
    if (sim) {
      const t = setTimeout(() => {
        setActive(sim);
        setStep(0);
        setPicked(null);
        setAnswers([]);
        setPicks([]);
        setFinished(false);
        setHintOpen(false);
        try {
          setNotes(localStorage.getItem(`aml-sim-notes:${sim.slug}`) ?? "");
        } catch {
          setNotes("");
        }
        setFilter(sim.category === "filing" ? "filing" : "shift");
      }, 350);
      return () => clearTimeout(t);
    }
  }, []);

  const pick = (sim: Simulation) => {
    setActive(sim);
    setStep(0);
    setPicked(null);
    setAnswers([]);
    setPicks([]);
    setFinished(false);
    setHintOpen(false);
    try {
      setNotes(localStorage.getItem(`aml-sim-notes:${sim.slug}`) ?? "");
    } catch {
      setNotes("");
    }
  };

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const opt = active!.steps[step].options[i];
    setAnswers((a) => [...a, opt.correct ? 2 : opt.partial ? 1 : 0]);
    setPicks((p) => [...p, i]);
  };

  const next = () => {
    if (step + 1 >= active!.steps.length) {
      const score = Math.round((answers.reduce((s, v) => s + v, 0) / (active!.steps.length * 2)) * 100);
      setProgress((p) => {
        const np = { done: { ...p.done, [active!.slug]: Math.max(p.done[active!.slug] ?? 0, score) } };
        save(np);
        return np;
      });
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "sim", id: active!.slug }),
      }).catch(() => {});
      setFinished(true);
    } else {
      setStep((s) => s + 1);
      setPicked(null);
      setHintOpen(false);
    }
  };

  const reset = () => {
    setActive(null);
    setFinished(false);
    setStep(0);
    setPicked(null);
    setAnswers([]);
    setPicks([]);
    try {
      const raw = localStorage.getItem("aml-sim-v1");
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  };

  // ---- scenario select ----
  if (!active) {
    const shown = simulations.filter((s) => filter === "all" || s.category === filter);
    return (
      <div>
        <div className="mb-5 flex flex-wrap gap-2">
          {([["all", "All simulations"], ["shift", "Analyst shifts"], ["filing", "SAR/STR filing — by country"]] as const).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${filter === f ? "border-emerald-400 bg-emerald-400/15 text-emerald-300" : "border-line text-muted hover:border-emerald-400/40 hover:text-ink"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
        {shown.map((s) => {
          const best = progress.done[s.slug];
          return (
            <button
              key={s.slug}
              onClick={() => pick(s)}
              className="group rounded-2xl border border-line bg-surface/60 p-6 text-left transition-all hover:border-emerald-400/50 hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.level === "Junior" ? "bg-sky-400/10 text-sky-300" : "bg-violet-400/10 text-violet-300"}`}>
                  {s.level}
                </span>
                <span className="text-xs text-muted">~{s.minutes} min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-emerald-300">{s.title}</h3>
              <p className="mt-1 text-xs font-medium text-emerald-400">{s.role}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{s.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted">{s.steps.length} decisions</span>
                {best !== undefined && (
                  <span className="font-mono text-emerald-400">Best: {best}%</span>
                )}
              </div>
            </button>
          );
        })}
        </div>
      </div>
    );
  }

  // ---- results ----
  if (finished) {
    const score = Math.round((answers.reduce((s, v) => s + v, 0) / (active.steps.length * 2)) * 100);
    const rank = RANKS.find((r) => score >= r.min)!;
    return (
      <div className="rounded-2xl border border-line bg-surface/60 p-6">
        <div className="text-center">
          <div className="text-5xl">{rank.emoji}</div>
          <h2 className="mt-3 text-2xl font-bold text-ink">{rank.title}</h2>
          <p className="mt-1 font-mono text-sm text-muted">
            Score: {score}% · {active.title} ·{" "}
            <span className="text-emerald-400 font-semibold">
              +{score >= 70 ? 50 : score >= 50 ? 25 : 10} XP earned
            </span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-body">
            {score >= 70
              ? "You handled the shift like a working analyst — prioritisation, documentation, escalation and deadlines all in order."
              : "Every decision point is a real AML judgement call. Revisit the chapters, then run it again — the second attempt always goes better."}
          </p>
        </div>
        <div className="mt-6 space-y-3">
          {active.steps.map((st, i) => {
            const v = answers[i];
            return (
              <details key={st.id} className="rounded-xl border border-line bg-surface/60 p-4">
                <summary className="cursor-pointer text-sm font-medium text-ink">
                  <span className={`mr-2 font-mono text-xs ${v === 2 ? "text-emerald-400" : v === 1 ? "text-amber-400" : "text-red-400"}`}>
                    {v === 2 ? "✓" : v === 1 ? "~" : "✗"}
                  </span>
                  {st.title}
                </summary>
                <div className="mt-3 space-y-2">
                  {st.options.map((o, j) => {
                    const isPick = picks[i] === j;
                    const isBest = o.correct || (o.partial && v === 1 && isPick);
                    return (
                      <div
                        key={j}
                        className={`rounded-lg border p-3 text-sm ${
                          isPick
                            ? isBest
                              ? "border-emerald-400/40 bg-emerald-400/5"
                              : "border-red-400/40 bg-red-400/5"
                            : o.correct
                              ? "border-emerald-400/20"
                              : "border-line opacity-70"
                        }`}
                      >
                        <p className="font-medium text-ink">
                          {isPick ? "→ " : ""}{o.label}
                          {o.correct && !isPick && <span className="ml-2 text-[10px] font-semibold text-emerald-400">BEST ANSWER</span>}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">{o.feedback}</p>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => pick(active)} className="rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform">
            Run it again
          </button>
          <button onClick={reset} className="rounded-xl border border-line px-5 py-2 text-sm font-medium text-muted hover:text-ink">
            All simulations
          </button>
        </div>
      </div>
    );
  }

  // ---- step ----
  const st = active.steps[step];
  const opt = picked !== null ? st.options[picked] : null;
  const last = step + 1 === active.steps.length;

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{active.title} · {active.role}</span>
        <span>Step {step + 1}/{active.steps.length}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${((step + (picked !== null ? 1 : 0)) / active.steps.length) * 100}%` }} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{st.title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{st.narrative}</p>
      {st.facts && (
        <ul className="mt-3 space-y-1.5">
          {st.facts.map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted">
              <span className="text-emerald-400">▸</span>{f}
            </li>
          ))}
        </ul>
      )}
      {simHints[`${active.slug}/${st.id}`] && (
        <div className="mt-4">
          <button
            onClick={() => setHintOpen((h) => !h)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-400/20"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 2a4.5 4.5 0 0 0-4.4 5.5c.3.9.3 1.8-.2 2.6L3 13l2.9-.4c.8.5 1.7.7 2.6.5A4.5 4.5 0 1 0 8 2Z" />
            </svg>
            {hintOpen ? "Hide hint" : "Need a hint?"}
          </button>
          {hintOpen && (
            <p className="mt-2 rounded-lg border border-amber-400/30 bg-amber-400/5 p-3 text-sm leading-6 text-body">
              {simHints[`${active.slug}/${st.id}`]}
            </p>
          )}
        </div>
      )}
      <div className="mt-5 space-y-2.5">
        {st.options.map((o, i) => {
          const state = picked === null ? "" : i === picked ? (o.correct ? "correct" : o.partial ? "partial" : "wrong") : "dim";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`w-full rounded-xl border p-4 text-left text-sm leading-6 transition-all ${
                state === "correct" ? "border-emerald-400 bg-emerald-400/10 text-ink" :
                state === "partial" ? "border-amber-400 bg-amber-400/10 text-ink" :
                state === "wrong" ? "border-red-400 bg-red-400/10 text-ink" :
                state === "dim" ? "border-line opacity-50" :
                "border-line bg-surface text-body hover:border-emerald-400/50 hover:bg-emerald-400/5"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {opt && (
        <div className={`mt-4 rounded-xl border p-4 ${opt.correct ? "border-emerald-400/40 bg-emerald-400/5" : opt.partial ? "border-amber-400/40 bg-amber-400/5" : "border-red-400/40 bg-red-400/5"}`}>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            {opt.correct ? "✓ Sound judgement" : opt.partial ? "~ Partially right" : "✗ Reconsider"}
          </div>
          <p className="mt-1.5 text-sm leading-6 text-body">{opt.feedback}</p>
          <button
            onClick={next}
            className="mt-3 rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform"
          >
            {last ? "Finish shift →" : "Continue →"}
          </button>
        </div>
      )}
      {/* field notepad — persists per scenario */}
      <div className="mt-6 rounded-xl border border-line bg-surface/60 p-4">
        <div className="flex items-center justify-between">
          <label htmlFor="sim-notes" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2.5h7l3 3v8H3v-11Z" /><path d="M10 2.5v3h3" /><path d="M5.5 8h5M5.5 10.5h5" />
            </svg>
            Field notes — {active.title}
          </label>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-faint">{notes.length} chars · saved on this device</span>
            {notes && (
              <button
                onClick={() => { setNotes(""); try { localStorage.removeItem(`aml-sim-notes:${active.slug}`); } catch {} }}
                className="text-[10px] text-muted hover:text-red-400"
              >Clear</button>
            )}
          </div>
        </div>
        <textarea
          id="sim-notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            try { localStorage.setItem(`aml-sim-notes:${active.slug}`, e.target.value); } catch {}
          }}
          rows={4}
          placeholder="Jot down red flags, deadlines, questions to revisit — like a real analyst's notebook…"
          className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-xs leading-5 text-ink placeholder-muted outline-none focus:border-emerald-400"
        />
      </div>

      <button onClick={reset} className="mt-4 text-xs text-muted hover:text-ink">
        ← Back to simulations
      </button>
    </div>
  );
}

