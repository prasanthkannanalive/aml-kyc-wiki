"use client";

import { useMemo, useState } from "react";
import type { InterviewSection } from "@/lib/content";

type Mode = "flashcards" | "quiz";

interface QuizQ {
  q: string;
  a: string;
  correctOpt: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const short = (s: string) => (s.length > 110 ? s.slice(0, 107) + "…" : s);

export default function QuizMode({ sections }: { sections: InterviewSection[] }) {
  const [mode, setMode] = useState<Mode>("flashcards");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [quiz, setQuiz] = useState<QuizQ[]>([]);

  const all = useMemo(
    () => sections.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title }))),
    [sections]
  );

  // built on demand (click) so SSR and hydration render identical markup
  const buildQuiz = () => {
    const qs = shuffle(all).slice(0, 10);
    setQuiz(
      qs.map((item) => {
        const correctOpt = short(item.a);
        const distractors = shuffle(
          all
            .filter((x) => x.q !== item.q)
            .map((x) => short(x.a))
            .filter((d) => d !== correctOpt)
        ).slice(0, 3);
        return {
          q: item.q,
          a: item.a,
          correctOpt,
          options: shuffle([correctOpt, ...distractors]),
        };
      })
    );
  };

  const reset = () => {
    setIdx(0);
    setFlipped(false);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  const restart = () => {
    reset();
    buildQuiz();
  };

  const current = all[idx % all.length];

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["flashcards", "quiz"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                reset();
                if (m === "quiz") buildQuiz();
              }}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-emerald-400 text-zinc-950"
                  : "border border-line text-muted hover:text-ink"
              }`}
            >
              {m === "flashcards" ? "Flashcards" : "Quiz me"}
            </button>
          ))}
        </div>
        {mode === "quiz" && !done && quiz.length > 0 && (
          <span className="text-sm text-muted">
            Question {Math.min(idx + 1, quiz.length)}/{quiz.length} · Score {score}
          </span>
        )}
      </div>

      {mode === "flashcards" ? (
        <div className="mt-6">
          <button
            onClick={() => setFlipped(!flipped)}
            className="block min-h-44 w-full rounded-xl border border-line bg-surface-2/60 p-6 text-left transition-colors hover:border-emerald-400/40"
          >
            <div className="text-xs uppercase tracking-wide text-muted">
              {current.section}
            </div>
            <div className="mt-3 text-lg font-semibold text-ink">{current.q}</div>
            {flipped ? (
              <p className="mt-4 border-t border-line pt-4 text-sm leading-7 text-body">
                {current.a}
              </p>
            ) : (
              <p className="mt-4 text-xs text-faint">Tap to reveal answer</p>
            )}
          </button>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => {
                setIdx((idx - 1 + all.length) % all.length);
                setFlipped(false);
              }}
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted hover:text-ink"
            >
              ← Prev
            </button>
            <span className="text-xs text-faint">
              {idx + 1} / {all.length}
            </span>
            <button
              onClick={() => {
                setIdx((idx + 1) % all.length);
                setFlipped(false);
              }}
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted hover:text-ink"
            >
              Next →
            </button>
          </div>
        </div>
      ) : done ? (
        <div className="mt-6 text-center">
          <div className="text-4xl font-bold text-emerald-400">
            {score}/{quiz.length}
          </div>
          <p className="mt-2 text-sm text-muted">
            {score === quiz.length
              ? "Perfect — interview-ready."
              : score >= quiz.length * 0.7
                ? "Solid. Review the misses and go again."
                : "Keep practising — the flashcards are right below."}
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-300"
          >
            Try again
          </button>
        </div>
      ) : quiz.length > 0 ? (
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-muted">
            {quiz[idx]?.q ?? ""}
          </p>
          <div className="mt-3 space-y-2">
            {quiz[idx]?.options.map((opt, i) => {
              const isCorrect = opt === quiz[idx].correctOpt;
              const showResult = picked !== null;
              return (
                <button
                  key={i}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i);
                    if (isCorrect) setScore((s) => s + 1);
                    setTimeout(() => {
                      if (idx + 1 >= quiz.length) setDone(true);
                      else {
                        setIdx(idx + 1);
                        setPicked(null);
                      }
                    }, 900);
                  }}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm leading-6 transition-colors ${
                    showResult
                      ? isCorrect
                        ? "border-emerald-400/60 bg-emerald-400/10 text-ink"
                        : picked === i
                          ? "border-red-400/60 bg-red-400/10 text-ink"
                          : "border-line text-muted"
                      : "border-line text-body hover:border-emerald-400/40 hover:text-ink"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className="mt-3 text-xs text-muted">
              Correct answer: {quiz[idx].a}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
