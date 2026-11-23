"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export default function ModuleQuiz({
  moduleTitle,
  questions,
}: {
  moduleTitle: string;
  questions: QuizQuestion[];
}) {
  const [picked, setPicked] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const allAnswered = picked.every((p) => p !== null);

  return (
    <div className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-ink">
          Module check — {moduleTitle}
        </h4>
        <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
          {questions.length} questions
        </span>
      </div>
      <p className="mt-1 text-xs text-muted">
        Five-question knowledge check — answer all, then submit.
      </p>

      <div className="mt-4 space-y-4">
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
                const showResult = submitted;
                const isCorrect = item.answer === oi;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() =>
                      setPicked((prev) => {
                        const n = [...prev];
                        n[qi] = oi;
                        return n;
                      })
                    }
                    className={`rounded-lg border px-3 py-2 text-left text-xs leading-5 transition-colors ${
                      showResult && isCorrect
                        ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                        : showResult && isPicked && !isCorrect
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
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        {!submitted ? (
          <button
            onClick={() => allAnswered && setSubmitted(true)}
            disabled={!allAnswered}
            className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit check
          </button>
        ) : (
          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-semibold ${
                score === questions.length
                  ? "text-emerald-400"
                  : score >= questions.length * 0.6
                    ? "text-amber-400"
                    : "text-red-400"
              }`}
            >
              Score: {score}/{questions.length}
              {score === questions.length
                ? " — module mastered"
                : score >= questions.length * 0.6
                  ? " — review the misses and retake"
                  : " — revisit the chapters before continuing"}
            </motion.span>
          </AnimatePresence>
        )}
        {submitted && (
          <button
            onClick={() => {
              setPicked(questions.map(() => null));
              setSubmitted(false);
            }}
            className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Retake
          </button>
        )}
      </div>
    </div>
  );
}
