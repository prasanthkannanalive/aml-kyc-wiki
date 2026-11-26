"use client";

import { useEffect, useRef, useState } from "react";

export interface BankQuestion {
  q: string;
  options: string[];
  answer: number;
  module?: string; // label for breakdown, e.g. "Module 3" or course code
}

export interface BankCourse {
  slug: string;
  title: string;
  code: string;
  questions: BankQuestion[];
}

const PASS = 0.7;
const TIME_LIMIT = 15 * 60; // 15 minutes

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExamSimulator({
  courses,
  initialSlug = "",
}: {
  courses: BankCourse[];
  initialSlug?: string;
}) {
  const [mode, setMode] = useState<"pick" | "run" | "done">("pick");
  const [slug, setSlug] = useState<string>(initialSlug); // "" = mixed
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [picked, setPicked] = useState<(number | null)[]>([]);
  const [secsLeft, setSecsLeft] = useState(TIME_LIMIT);
  const [submitted, setSubmitted] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = courses.find((c) => c.slug === slug);

  const start = (s: string) => {
    const p =
      s === ""
        ? courses.flatMap((c) =>
            c.questions.map((q) => ({ ...q, module: c.code }))
          )
        : (courses.find((c) => c.slug === s)?.questions ?? []);
    const sample = shuffle(p).slice(0, Math.min(20, p.length));
    setSlug(s);
    setQuestions(sample);
    setPicked(sample.map(() => null));
    setSecsLeft(TIME_LIMIT);
    setSubmitted(false);
    setMode("run");
  };

  useEffect(() => {
    if (!initialSlug) return;
    const t = setTimeout(() => start(initialSlug), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mode !== "run" || submitted) return;
    timer.current = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer.current!);
          setSubmitted(true);
          setMode("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [mode, submitted]);

  const finish = () => {
    if (timer.current) clearInterval(timer.current);
    setSubmitted(true);
    setMode("done");
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "exam", id: slug === "" ? "simulator-mixed" : slug }),
    }).catch(() => {});
  };

  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const pct = questions.length ? score / questions.length : 0;
  const passed = pct >= PASS;

  const breakdown = questions.reduce<Record<string, { ok: number; n: number }>>(
    (acc, q, i) => {
      const key = q.module ?? "Exam";
      acc[key] = acc[key] ?? { ok: 0, n: 0 };
      acc[key].n += 1;
      if (picked[i] === q.answer) acc[key].ok += 1;
      return acc;
    },
    {}
  );

  const mm = String(Math.floor(secsLeft / 60)).padStart(2, "0");
  const ss = String(secsLeft % 60).padStart(2, "0");

  if (mode === "pick") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => start("")}
          className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5 text-left transition-colors hover:border-emerald-400/60"
        >
          <p className="font-semibold text-ink">Mixed mock exam</p>
          <p className="mt-1 text-xs leading-5 text-muted">
            20 random questions sampled across all {courses.length} courses —
            closest to a real certification sit.
          </p>
        </button>
        {courses.map((c) => (
          <button
            key={c.slug}
            onClick={() => start(c.slug)}
            className="rounded-xl border border-line bg-surface/60 p-5 text-left transition-colors hover:border-emerald-400/40"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              {c.code}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{c.title}</p>
            <p className="mt-1 text-xs text-muted">
              {Math.min(20, c.questions.length)} questions · {TIME_LIMIT / 60} min
            </p>
          </button>
        ))}
      </div>
    );
  }

  if (mode === "done") {
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
            {Math.round(pct * 100)}% —{" "}
            {passed ? "PASS" : `below the ${PASS * 100}% pass mark`}
          </p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(breakdown).map(([mod, b]) => (
            <div
              key={mod}
              className="flex items-center justify-between rounded-lg border border-line bg-surface/60 px-4 py-2.5 text-xs"
            >
              <span className="font-mono text-muted">{mod}</span>
              <span
                className={`font-semibold ${b.ok / b.n >= PASS ? "text-emerald-400" : "text-amber-400"}`}
              >
                {b.ok}/{b.n}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setMode("pick")}
            className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
          >
            New exam
          </button>
          <button
            onClick={() => start(slug)}
            className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink"
          >
            Retake same paper
          </button>
        </div>
      </div>
    );
  }

  const allAnswered = picked.every((p) => p !== null);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-1 mb-5 flex items-center justify-between rounded-lg border border-line bg-background/90 px-4 py-2.5 backdrop-blur">
        <span className="font-mono text-xs text-muted">
          {slug === "" ? "Mixed exam" : active?.code}
        </span>
        <span
          className={`font-mono text-sm font-bold tabular-nums ${
            secsLeft < 120 ? "text-red-400" : "text-ink"
          }`}
        >
          ⏱ {mm}:{ss}
        </span>
        <span className="text-xs text-muted">
          {picked.filter((p) => p !== null).length}/{questions.length} answered
        </span>
      </div>

      <div className="space-y-5">
        {questions.map((item, qi) => (
          <div key={qi}>
            <p className="text-sm font-medium text-ink">
              <span className="mr-2 font-mono text-xs text-emerald-400">
                {qi + 1}.
              </span>
              {item.q}
            </p>
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
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={finish}
          disabled={!allAnswered}
          className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit exam
        </button>
        {!allAnswered && (
          <span className="text-xs text-muted">
            Answer all questions to submit — unanswered count as wrong.
          </span>
        )}
      </div>
    </div>
  );
}
