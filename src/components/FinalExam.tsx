"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ModuleQuizQuestion } from "@/lib/module-quizzes";

const PASS_MARK = 0.7;
const STORAGE_PREFIX = "aml-kyc-final-exam:";

export default function FinalExam({
  courseSlug,
  courseTitle,
  questions,
}: {
  courseSlug: string;
  courseTitle: string;
  questions: ModuleQuizQuestion[];
}) {
  const [picked, setPicked] = useState<(number | null)[]>(
    () => questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [forceShow, setForceShow] = useState(false);
  const storageKey = STORAGE_PREFIX + courseSlug;
  const subscribe = (cb: () => void) => {
    window.addEventListener("aml-exam-pass", cb);
    return () => window.removeEventListener("aml-exam-pass", cb);
  };
  const passed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(storageKey) === "passed";
      } catch {
        return false;
      }
    },
    () => false
  );

  const certKey = `aml-cert:${courseSlug}`;
  const certSubscribe = (cb: () => void) => {
    window.addEventListener("aml-cert-issued", cb);
    window.addEventListener("storage", cb);
    return () => {
      window.removeEventListener("aml-cert-issued", cb);
      window.removeEventListener("storage", cb);
    };
  };
  const certId = useSyncExternalStore(
    certSubscribe,
    () => {
      try {
        return localStorage.getItem(certKey) ?? "";
      } catch {
        return "";
      }
    },
    () => ""
  );

  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const allAnswered = picked.every((p) => p !== null);
  const didPass = score / questions.length >= PASS_MARK;

  const submit = () => {
    setSubmitted(true);
    if (didPass) {
      try {
        localStorage.setItem(storageKey, "passed");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event("aml-exam-pass"));
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "exam", id: courseSlug }),
      }).catch(() => {});
      fetch("/api/cert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d?.id) {
            try {
              localStorage.setItem(certKey, d.id);
            } catch {
              /* ignore */
            }
            window.dispatchEvent(new Event("aml-cert-issued"));
          }
        })
        .catch(() => {});
    }
  };

  const retake = () => {
    setPicked(questions.map(() => null));
    setSubmitted(false);
  };

  return (
    <section className="mt-12 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Final assessment
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink">
            End-of-course exam — {courseTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {questions.length} questions across all six modules. Pass mark:{" "}
            {Math.round(PASS_MARK * 100)}%. Passing issues your course
            completion badge.
          </p>
        </div>
        {passed && (
          <span className="rounded-full border border-emerald-400/50 bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            ✓ Badge earned
          </span>
        )}
      </div>

      {passed && !submitted && (
        <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5">
          <p className="text-sm font-semibold text-emerald-300">
            Congratulations — you passed the final assessment.
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            Your completion badge for {courseTitle} is recorded in this
            browser. This is a course-completion credential issued by this
            knowledge base — it is not an external accreditation.
          </p>
          {certId && (
            <a
              href={`/verify/${certId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20"
            >
              View &amp; verify certificate →
            </a>
          )}
          <button
            onClick={() => {
              retake();
              setForceShow(true);
            }}
            className="mt-3 text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Retake exam
          </button>
        </div>
      )}

      {(!passed || submitted || forceShow) && (
        <>
          <div className="mt-6 space-y-5">
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

          <div className="mt-6 flex items-center gap-4">
            {!submitted ? (
              <button
                onClick={submit}
                disabled={!allAnswered}
                className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit final exam
              </button>
            ) : (
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-semibold ${
                    didPass ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  Score: {score}/{questions.length} —{" "}
                  {didPass
                    ? "passed — badge earned"
                    : `below the ${Math.round(PASS_MARK * 100)}% pass mark — review and retake`}
                </motion.span>
              </AnimatePresence>
            )}
            {submitted && (
              <button
                onClick={retake}
                className="text-xs font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
              >
                Retake
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
