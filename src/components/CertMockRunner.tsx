"use client";

import { useEffect, useRef, useState } from "react";
import type { CertMock } from "@/lib/cert-mocks";
import type { ModuleQuizQuestion } from "@/lib/module-quizzes";

function fmt(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CertMockRunner({ mock }: { mock: CertMock }) {
  const questions: ModuleQuizQuestion[] = mock.questions;
  const [picked, setPicked] = useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [secsLeft, setSecsLeft] = useState(mock.durationMin * 60);
  const [submitted, setSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const passCount =
    mock.passCount ?? Math.ceil(questions.length * (mock.passPct ?? 0.6));

  useEffect(() => {
    if (submitted) return;
    timer.current = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          if (timer.current) clearInterval(timer.current);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [submitted]);

  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const pct = score / questions.length;
  const passed =
    mock.passCount !== undefined ? score >= mock.passCount : pct >= (mock.passPct ?? 0.6);
  const answered = picked.filter((p) => p !== null).length;

  // per-section breakdown
  const sections = new Map<string, { correct: number; total: number }>();
  questions.forEach((item, i) => {
    const s = item.section ?? "General";
    const cur = sections.get(s) ?? { correct: 0, total: 0 };
    cur.total += 1;
    if (picked[i] === item.answer) cur.correct += 1;
    sections.set(s, cur);
  });
  const sectionRows = [...sections.entries()].map(([name, v]) => ({
    name,
    ...v,
    pct: v.correct / v.total,
  }));
  const weakest = [...sectionRows].sort((a, b) => a.pct - b.pct).slice(0, 3);
  const missed = questions
    .map((item, i) => ({ item, i, ok: picked[i] === item.answer }))
    .filter((x) => !x.ok);

  const IMPROVEMENTS: Record<string, string> = {
    "PMLA": "Re-read PMLA/RBI KYC chapters — thresholds (₹10L CTR), deadlines (7-day STR) and definitions (proceeds of crime, scheduled offences) are the most-tested facts.",
    "FIU-IND": "Focus on reporting mechanics: STR vs CTR vs CNTR, 7-day window, FIU-IND formats — drill the filing guides.",
    "SEBI": "Review SEBI AML/CFT framework + market-abuse chapters — UCC, KRA-KYC, UBO 25% threshold and market-specific red flags.",
    "KYC": "Revisit CDD/EDD chapters — OVDs, pKYC refresh cycles (2/8/10 yrs), PEP/RCAs and source-of-wealth verification.",
    "Monitoring": "Work the transaction-monitoring + labs chapters — structuring, velocity, pass-through and false-positive tuning.",
    "TBML": "Study the TBML typology + trade-finance chapters — over/under-invoicing, phantom shipments, black-hole corridors.",
    "Crypto": "Review virtual-asset + sanctions chapters — Travel Rule, mixers, chain-hopping, VASP obligations.",
    "SAR": "Practise SAR/STR writing in /sar-writer — five Ws, chronology, suspicion-not-guilt framing, continuing reports.",
    "EDD": "Deep-dive the EDD/PEP chapters — senior approval, SoW corroboration, adverse media, RCAs.",
    "Governance": "Read enforcement cases + careers chapter — MLRO duties, three-lines model, personal liability.",
    "FATF": "Study the regulators page + FATF recommendation chapters — grey/black lists, R.10/16/20/30-32.",
    "Enforcement": "Review the /cases library — TD Bank, Binance, Danske teach institutional-failure patterns.",
  };
  const tipFor = (name: string) => {
    for (const [k, v] of Object.entries(IMPROVEMENTS))
      if (name.includes(k)) return v;
    return "Revisit the relevant course chapters and re-take the module quiz for this section.";
  };

  const submit = () => {
    if (timer.current) clearInterval(timer.current);
    setSubmitted(true);
  };

  const letter = (n: number) => String.fromCharCode(65 + n);

  // ---------- RESULTS ----------
  if (submitted) {
    return (
      <div>
        <div
          className={`rounded-xl border p-6 text-center ${
            passed
              ? "border-emerald-400/40 bg-emerald-400/10"
              : "border-amber-400/40 bg-amber-400/10"
          }`}
        >
          <p className="font-mono text-3xl font-bold text-ink">
            {score}/{questions.length}
          </p>
          <p className="mt-1 text-sm text-muted">
            {mock.passCount !== undefined
              ? `${score} correct — need ${mock.passCount} to pass (${Math.round(pct * 100)}%)`
              : `${Math.round(pct * 100)}% — ${passed ? "PASS" : `need ${Math.round((mock.passPct ?? 0.6) * 100)}% to pass`}`}
          </p>
          <p className="mt-2 text-xs text-muted">
            Mock only — this simulates {mock.format.toLowerCase()}. It does not
            issue any credential.
          </p>
        </div>

        {/* Section-wise scorecard */}
        <div className="mt-6 rounded-xl border border-line bg-surface/60 p-5">
          <h3 className="text-sm font-bold text-ink">Score by section</h3>
          <div className="mt-3 space-y-2">
            {sectionRows.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-56 shrink-0 truncate text-xs text-muted" title={s.name}>
                  {s.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${
                      s.pct >= 0.7
                        ? "bg-emerald-400"
                        : s.pct >= 0.5
                          ? "bg-amber-400"
                          : "bg-red-400"
                    }`}
                    style={{ width: `${Math.round(s.pct * 100)}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-xs text-ink">
                  {s.correct}/{s.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement plan */}
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
          <h3 className="text-sm font-bold text-ink">What to improve</h3>
          <ul className="mt-2 space-y-2">
            {weakest.map((s) => (
              <li key={s.name} className="text-xs leading-5 text-body">
                <span className="font-semibold text-ink">
                  {s.name} — {Math.round(s.pct * 100)}%
                </span>{" "}
                ({s.correct}/{s.total} correct). {tipFor(s.name)}
              </li>
            ))}
            {missed.length === 0 && (
              <li className="text-xs text-emerald-300">
                Perfect score — no weak sections. Try a fresh retake to confirm
                it wasn&apos;t luck.
              </li>
            )}
          </ul>
          <p className="mt-3 text-[11px] text-muted">
            Tip: retake the mock after revising the weak sections — the question
            order is fixed, so track whether your section scores improve.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setPicked(questions.map(() => null));
              setSecsLeft(mock.durationMin * 60);
              setSubmitted(false);
              setReviewMode(false);
            }}
            className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
          >
            Retake mock
          </button>
          <button
            onClick={() => setReviewMode((v) => !v)}
            className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink"
          >
            {reviewMode ? "Hide review" : "Review answers & why"}
          </button>
        </div>

        {reviewMode && (
          <div className="mt-6 space-y-4">
            {questions.map((item, qi) => {
              const myPick = picked[qi];
              const ok = myPick === item.answer;
              return (
                <div
                  key={qi}
                  className={`rounded-lg border p-4 ${
                    ok ? "border-emerald-400/30 bg-surface/50" : "border-red-400/30 bg-red-400/5"
                  }`}
                >
                  <p className="text-xs font-medium leading-5 text-ink">
                    <span className="mr-2 font-mono text-emerald-400">
                      {qi + 1}.
                    </span>
                    {item.q}
                  </p>
                  <div className="mt-2 space-y-1">
                    {item.options.map((opt, oi) => {
                      const isCorrect = item.answer === oi;
                      const isPicked = myPick === oi;
                      const note = item.explain?.[oi];
                      return (
                        <p
                          key={oi}
                          className={`text-[11px] leading-5 ${
                            isCorrect
                              ? "text-emerald-300"
                              : isPicked
                                ? "text-red-300"
                                : "text-muted"
                          }`}
                        >
                          <span className="font-mono font-semibold">
                            {letter(oi)}
                            {isCorrect ? " ✓" : isPicked ? " ✗" : ""}:
                          </span>{" "}
                          {opt}
                          {note && <span className="text-muted"> — {note}</span>}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ---------- EXAM ----------
  return (
    <div>
      <div className="sticky top-0 z-10 -mx-1 mb-5 flex items-center justify-between rounded-lg border border-line bg-background/90 px-4 py-2.5 backdrop-blur">
        <span className="font-mono text-xs text-muted">{mock.cert}</span>
        <span
          className={`font-mono text-sm font-bold tabular-nums ${
            secsLeft < 300 ? "text-red-400" : "text-ink"
          }`}
        >
          ⏱ {fmt(secsLeft)}
        </span>
        <span className="text-xs text-muted">
          {answered}/{questions.length} answered
        </span>
      </div>

      {/* question palette */}
      <div className="mb-5 rounded-lg border border-line bg-surface/50 p-3">
        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
          Question map — click to jump
        </p>
        <div className="flex flex-wrap gap-1">
          {questions.map((_, qi) => {
            const p = picked[qi];
            return (
              <button
                key={qi}
                onClick={() =>
                  document
                    .getElementById(`certq-${qi}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className={`h-7 w-7 rounded text-[10px] font-mono font-semibold transition-colors ${
                  p !== null
                    ? "bg-emerald-400/20 text-emerald-300"
                    : "bg-surface-2 text-muted hover:text-ink"
                }`}
              >
                {qi + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((item, qi) => (
          <div key={qi} id={`certq-${qi}`} className="scroll-mt-24 rounded-lg border border-line/60 bg-surface/40 p-4">
            <p className="text-sm font-medium text-ink">
              <span className="mr-2 font-mono text-xs text-emerald-400">
                {qi + 1}.
              </span>
              {item.q}
            </p>
            {item.section && (
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-faint">
                {item.section}
              </p>
            )}
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {item.options.map((opt, oi) => {
                const isPicked = picked[qi] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() =>
                      setPicked((prev) => {
                        const n = [...prev];
                        n[qi] = oi;
                        return n;
                      })
                    }
                    className={`rounded-lg border px-3 py-2 text-left text-xs leading-5 transition-colors ${
                      isPicked
                        ? "border-emerald-400/50 bg-emerald-400/10 text-ink"
                        : "border-line bg-surface/60 text-muted hover:border-emerald-400/40 hover:text-ink"
                    }`}
                  >
                    <span className="mr-1.5 font-mono text-[10px] text-faint">
                      {letter(oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 z-10 mt-6 -mx-1 flex items-center gap-4 rounded-lg border border-line bg-background/90 px-4 py-3 backdrop-blur">
        <button
          onClick={submit}
          className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
        >
          Submit mock exam
        </button>
        {answered < questions.length && (
          <span className="text-xs text-muted">
            {questions.length - answered} unanswered — they count as wrong.
          </span>
        )}
      </div>
    </div>
  );
}
