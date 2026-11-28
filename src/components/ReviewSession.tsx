"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { BankQuestion } from "./ExamSimulator";
import QuizDebrief from "@/components/QuizDebrief";
import type { ModuleQuizQuestion } from "@/lib/module-quizzes";

const REVIEW_SIZE = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak() {
  try {
    const raw = localStorage.getItem("aml-review-streak");
    const cur = raw ? (JSON.parse(raw) as { count: number; last: string }) : null;
    const today = todayKey();
    if (cur?.last === today) return cur.count;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const count = cur?.last === yesterday ? (cur.count ?? 0) + 1 : 1;
    localStorage.setItem("aml-review-streak", JSON.stringify({ count, last: today }));
    return count;
  } catch {
    return 1;
  }
}

export default function ReviewSession({
  questions,
}: {
  questions: { course: string; q: BankQuestion }[];
}) {
  const [qs, setQs] = useState(() => shuffle(questions).slice(0, REVIEW_SIZE));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState<number | null>(null);

  const cur = qs[idx];
  const answered = picked !== null;

  const choose = (oi: number) => {
    if (answered) return;
    setPicked(oi);
    setAnswers((prev) => {
      const n = [...prev];
      n[idx] = oi;
      return n;
    });
    if (oi === cur.q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= qs.length) {
      setFinished(true);
      setStreak(bumpStreak());
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quiz", id: "daily-review" }),
      }).catch(() => {});
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setQs(shuffle(questions).slice(0, REVIEW_SIZE));
    setIdx(0);
    setPicked(null);
    setAnswers([]);
    setScore(0);
    setFinished(false);
    setStreak(null);
  };

  if (finished) {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center">
        <p className="font-mono text-3xl font-bold text-ink">
          {score}/{qs.length}
        </p>
        <p className="mt-1 text-sm text-muted">
          {score === qs.length
            ? "Perfect recall — spaced repetition doing its job."
            : score >= qs.length * 0.7
              ? "Solid. The questions you missed will come back sooner next review."
              : "Review the chapters behind the misses, then come back tomorrow."}
        </p>
        {streak !== null && streak > 1 && (
          <p className="mt-3 text-xs font-semibold text-amber-400">
            🔥 {streak}-day review streak
          </p>
        )}
        <div className="mx-auto mt-5 max-w-lg text-left">
          <QuizDebrief
            questions={qs.map((x) => x.q as ModuleQuizQuestion)}
            picked={answers}
          />
        </div>
        <button
          onClick={restart}
          className="mt-5 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
        >
          Review again
        </button>
      </div>
    );
  }

  if (!cur) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span className="font-mono">
          {cur.course} · Question {idx + 1}/{qs.length}
        </span>
        <div className="flex gap-1">
          {qs.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i < idx ? "bg-emerald-400" : i === idx ? "bg-emerald-400/60" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-sm font-medium leading-6 text-ink">{cur.q.q}</p>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {cur.q.options.map((opt, oi) => {
              const isPicked = picked === oi;
              const isCorrect = cur.q.answer === oi;
              return (
                <button
                  key={oi}
                  onClick={() => choose(oi)}
                  disabled={answered}
                  className={`rounded-lg border px-3 py-2 text-left text-xs leading-5 transition-colors ${
                    answered && isCorrect
                      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                      : answered && isPicked && !isCorrect
                        ? "border-red-400/50 bg-red-400/10 text-red-300"
                        : isPicked
                          ? "border-emerald-400/50 bg-emerald-400/10 text-ink"
                          : "border-line bg-surface/60 text-muted hover:border-emerald-400/40 hover:text-ink"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && cur.q.explain && (
            <div className="mt-3 space-y-1 rounded-lg border border-line/60 bg-surface/40 p-3">
              {cur.q.options.map((opt, oi) => {
                const isCorrect = cur.q.answer === oi;
                const note = cur.q.explain![oi];
                if (!note) return null;
                return (
                  <p
                    key={oi}
                    className={`text-[11px] leading-5 ${
                      isCorrect ? "text-emerald-300" : "text-muted"
                    }`}
                  >
                    <span className="font-mono font-semibold">
                      {String.fromCharCode(65 + oi)}
                      {isCorrect ? " ✓" : ""}:
                    </span>{" "}
                    {note}
                  </p>
                );
              })}
            </div>
          )}

          {answered && (
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs font-semibold ${
                  picked === cur.q.answer ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {picked === cur.q.answer ? "Correct" : "Incorrect"}
              </span>
              <button
                onClick={next}
                className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                {idx + 1 >= qs.length ? "Finish" : "Next →"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
