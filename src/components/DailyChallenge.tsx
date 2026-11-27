"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ChallengeQuestion } from "@/lib/challenge";

interface BoardEntry {
  key: string;
  name: string;
  score: number;
  ts: string;
}

const LS_NAME = "aml-challenge-name";
const LS_KEY = "aml-challenge-key";
const LS_STREAK = "aml-challenge-streak";

function anonKey(): string {
  try {
    let k = localStorage.getItem(LS_KEY);
    if (!k) {
      k = `a:${crypto.randomUUID()}`;
      localStorage.setItem(LS_KEY, k);
    }
    return k;
  } catch {
    return "a:guest";
  }
}

function loadStreak(): { lastDay: string; streak: number } {
  try {
    const raw = localStorage.getItem(LS_STREAK);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lastDay: "", streak: 0 };
}

function yesterdayStr(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function timeOf(ts: string): string {
  const d = new Date(ts);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function DailyChallenge({
  day,
  questions,
}: {
  day: string;
  questions: ChallengeQuestion[];
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [phase, setPhase] = useState<"play" | "submit" | "done">("play");
  const [name, setName] = useState("");
  const [authed, setAuthed] = useState(false);
  const [board, setBoard] = useState<BoardEntry[] | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [myKey, setMyKey] = useState("");
  const [streak, setStreak] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const score = useMemo(
    () => results.filter(Boolean).length,
    [results]
  );
  const total = questions.length;
  const finished = results.length >= total;

  // identity + today's board on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetch("/api/auth/me").then((r) => r.json());
        if (cancelled) return;
        if (me?.user) {
          setAuthed(true);
          setName(me.user.name || me.user.email || "");
          setMyKey(`u:${me.user.id}`);
        } else {
          setMyKey(anonKey());
          try {
            setName(localStorage.getItem(LS_NAME) ?? "");
          } catch {}
        }
      } catch {
        if (!cancelled) setMyKey(anonKey());
      }
    })();
    fetch(`/api/challenge?day=${day}`)
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled && j?.ok) setBoard(j.board);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [day]);

  const finish = (finalResults: boolean[]) => {
    const s = finalResults.filter(Boolean).length;
    void s;
    // streak: consecutive days completed
    const st = loadStreak();
    const ns =
      st.lastDay === day ? st.streak : st.lastDay === yesterdayStr(day) ? st.streak + 1 : 1;
    try {
      localStorage.setItem(LS_STREAK, JSON.stringify({ lastDay: day, streak: ns }));
    } catch {}
    setStreak(ns);
    setPhase("submit");
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "challenge", id: day }),
    }).catch(() => {});
  };

  const choose = (oi: number) => {
    if (picked !== null || finished) return;
    const q = questions[idx];
    const correct = q.options[oi] === q.answer;
    setPicked(oi);
    const nr = [...results, correct];
    setResults(nr);
    advanceTimer.current = setTimeout(() => {
      setPicked(null);
      if (idx + 1 >= total) finish(nr);
      else setIdx(idx + 1);
    }, 800);
  };

  const submit = async () => {
    if (busy || !myKey) return;
    setBusy(true);
    setError("");
    try {
      const trimmed = name.trim();
      if (!authed && trimmed) {
        try {
          localStorage.setItem(LS_NAME, trimmed);
        } catch {}
      }
      const res = await fetch("/api/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          name: trimmed || "Player",
          score,
          key: myKey,
        }),
      });
      const j = await res.json();
      if (!j?.ok) throw new Error("submit failed");
      setBoard(j.board);
      setRank(j.rank);
      setPhase("done");
    } catch {
      setError("Could not submit — try again.");
    } finally {
      setBusy(false);
    }
  };

  const q = questions[idx];

  return (
    <div>
      {/* status strip */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Daily run #{day}
        </span>
        {streak > 0 && phase !== "play" && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
            Streak: {streak} day{streak === 1 ? "" : "s"}
          </span>
        )}
        {phase === "play" && (
          <span className="text-xs text-faint">
            Question {Math.min(idx + 1, total)}/{total} · {score} correct so far
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {phase === "play" && q && (
          <motion.div
            key={`q-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-5"
          >
            <p className="rounded-xl border border-line bg-surface/60 p-4 text-sm font-medium leading-6 text-ink">
              {q.q}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((o, oi) => {
                const isAnswer = o === q.answer;
                return (
                  <button
                    key={o}
                    onClick={() => choose(oi)}
                    disabled={picked !== null}
                    className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      picked !== null
                        ? isAnswer
                          ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                          : oi === picked
                            ? "border-red-400 bg-red-400/15 text-red-300"
                            : "border-line text-faint"
                        : "border-line bg-surface text-body hover:border-emerald-400/50 hover:text-ink"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {picked !== null && q.why && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 rounded-lg border border-line bg-surface/60 p-3 text-xs leading-5 text-muted"
                >
                  <span className="font-semibold text-ink">
                    {q.answer}.
                  </span>{" "}
                  {q.why}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase !== "play" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5"
          >
            <div className="rounded-xl border border-line bg-surface/60 p-5 text-center">
              <p className="font-mono text-3xl font-bold text-emerald-400">
                {score}/{total}
              </p>
              <p className="mt-1 text-sm text-muted">
                {score === total
                  ? "Perfect run — flawless instincts."
                  : score >= total * 0.6
                    ? "Solid run — review the misses below."
                    : "Tough one — the encyclopedia is right here."}
              </p>
              {streak > 0 && (
                <p className="mt-1 text-xs font-semibold text-amber-300">
                  {streak}-day streak
                </p>
              )}
            </div>

            {/* missed-question review */}
            <div className="mt-4 space-y-2">
              {questions.map((qq, i) => {
                const ok = results[i];
                if (ok) return null;
                return (
                  <div
                    key={i}
                    className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs leading-5 text-muted"
                  >
                    <p className="font-medium text-ink">{qq.q}</p>
                    <p className="mt-1">
                      Answer: <span className="font-semibold text-emerald-300">{qq.answer}</span>
                      {qq.why ? ` — ${qq.why}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>

            {phase === "submit" && (
              <div className="mt-4 rounded-xl border border-line bg-surface/60 p-4">
                <p className="text-sm font-medium text-ink">
                  Put your score on today&apos;s board
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={authed}
                    maxLength={24}
                    placeholder={authed ? "Signed-in name" : "Display name"}
                    className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none placeholder:text-faint focus:border-emerald-400/60 disabled:opacity-60"
                  />
                  <button
                    onClick={submit}
                    disabled={busy || !myKey}
                    className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-40"
                  >
                    {busy ? "Submitting…" : "Submit score"}
                  </button>
                </div>
                {authed && (
                  <p className="mt-2 text-[11px] text-faint">
                    Signed in — posting as {name || "your account"}.
                  </p>
                )}
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
                <button
                  onClick={() => {
                    setPhase("done");
                    fetch(`/api/challenge?day=${day}`)
                      .then((r) => r.json())
                      .then((j) => j?.ok && setBoard(j.board))
                      .catch(() => {});
                  }}
                  className="mt-2 text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
                >
                  Skip — just view the board
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* board */}
      {board !== null && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-5 py-3">
            <h3 className="text-sm font-semibold text-ink">
              Today&apos;s leaderboard
            </h3>
            <span className="text-xs text-faint">
              {board.length} player{board.length === 1 ? "" : "s"}
            </span>
          </div>
          {board.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-muted">
              No scores yet — be the first on the board.
            </p>
          ) : (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-line/60">
                {board.slice(0, 15).map((e, i) => {
                  const mine = myKey && e.key === myKey;
                  return (
                    <tr
                      key={e.key}
                      className={mine ? "bg-emerald-400/10" : ""}
                    >
                      <td className="w-12 px-5 py-2.5">
                        <span
                          className={`font-mono text-sm font-bold ${
                            i === 0
                              ? "text-amber-300"
                              : i === 1
                                ? "text-slate-300"
                                : i === 2
                                  ? "text-amber-600"
                                  : "text-faint"
                          }`}
                        >
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 font-medium text-ink">
                        {e.name}
                        {mine && (
                          <span className="ml-2 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                            YOU{rank ? ` · #${rank}` : ""}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-2.5 text-right font-mono text-body">
                        {e.score}/{total}
                      </td>
                      <td className="hidden px-5 py-2.5 text-right text-xs text-faint sm:table-cell">
                        {timeOf(e.ts)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
