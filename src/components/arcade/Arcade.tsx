"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AML_WORDS,
  DISPO_BANK,
  RUSH_BANK,
  SORT_SETS,
  TIME_BANK,
  dayOfYear,
  mulberry32,
  pickDaily,
} from "@/lib/arcade";

// ---------- daily progress (localStorage) ----------

interface Progress {
  date: string;
  done: Record<string, number>;
  streak: number;
  lastPlay: string;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem("aml-arcade-v1");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { date: todayStr(), done: {}, streak: 0, lastPlay: "" };
}

function saveProgress(p: Progress) {
  try {
    localStorage.setItem("aml-arcade-v1", JSON.stringify(p));
  } catch {}
}

// ---------- shared bits ----------

function useDaily<T>(arr: T[], count: number, salt = 0): T[] {
  return useMemo(() => pickDaily(arr, dayOfYear(), count, salt), [arr, count, salt]);
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        score === total
          ? "bg-emerald-400/15 text-emerald-300"
          : score >= total * 0.6
            ? "bg-amber-400/15 text-amber-300"
            : "bg-red-400/15 text-red-300"
      }`}
    >
      {score}/{total}
    </span>
  );
}

// ---------- Game 1: Sort the Signal ----------

function SortSignal({ onScore }: { onScore: (s: number, t: number) => void }) {
  const set = SORT_SETS[dayOfYear() % SORT_SETS.length];
  const [assign, setAssign] = useState<Record<string, number>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const allCards = useMemo(() => {
    const cards = set.flatMap((g) => g.cards.map((c) => ({ card: c, group: g.name })));
    const rnd = mulberry32(dayOfYear() * 31 + 7);
    return cards.sort(() => rnd() - 0.5);
  }, [set]);

  const groups = set.map((g) => g.name);

  const check = () => {
    const correct = allCards.filter((c) => assign[c.card] === groups.indexOf(c.group)).length;
    setChecked(true);
    onScore(correct, allCards.length);
  };

  return (
    <div>
      <p className="text-sm text-muted">
        Cards secretly belong to squads. Tap a card, then tap its home row.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {groups.map((g, gi) => {
          const members = allCards.filter((c) => assign[c.card] === gi);
          const gdata = set.find((x) => x.name === g)!;
          return (
            <button
              key={g}
              onClick={() => {
                if (sel && !checked) {
                  setAssign((a) => ({ ...a, [sel]: gi }));
                  setSel(null);
                }
              }}
              className={`min-h-24 rounded-xl border p-3 text-left transition-colors ${
                sel ? "border-emerald-400/50 bg-emerald-400/5" : "border-line bg-surface/50"
              } ${checked && members.length === 4 ? "border-emerald-400/60" : ""}`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-400">{g}</p>
              <p className="mt-0.5 text-[11px] text-faint">{gdata.hint}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {members.map((m) => (
                  <span
                    key={m.card}
                    className={`rounded-md px-2 py-0.5 text-[11px] ${
                      checked
                        ? m.group === g
                          ? "bg-emerald-400/20 text-emerald-300"
                          : "bg-red-400/20 text-red-300"
                        : "bg-surface-2 text-body"
                    }`}
                  >
                    {m.card}
                  </span>
                ))}
                {members.length === 0 && (
                  <span className="text-[11px] text-faint">drop cards here</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {allCards.map((c) => {
          const placed = assign[c.card] !== undefined;
          return (
            <button
              key={c.card}
              disabled={checked}
              onClick={() => setSel(sel === c.card ? null : c.card)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                sel === c.card
                  ? "border-emerald-400 bg-emerald-400/15 text-ink"
                  : placed
                    ? "border-emerald-400/30 bg-emerald-400/5 text-muted"
                    : "border-line bg-surface text-body hover:border-emerald-400/40"
              }`}
            >
              {c.card}
            </button>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={check}
          disabled={Object.keys(assign).length < allCards.length}
          className="mt-4 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-40"
        >
          Check placements ({Object.keys(assign).length}/{allCards.length})
        </button>
      ) : (
        <p className="mt-4 text-sm text-muted">
          {Object.values(assign).length === allCards.length
            ? "All cards placed — review the colours: green = correct squad, red = wrong."
            : "Some cards unplaced."}
        </p>
      )}
    </div>
  );
}

// ---------- Game 2: AMLdle ----------

function evalGuess(guess: string, answer: string): ("g" | "y" | "x")[] {
  const res: ("g" | "y" | "x")[] = Array(5).fill("x");
  const pool: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) res[i] = "g";
    else pool[answer[i]] = (pool[answer[i]] ?? 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    if (res[i] === "g") continue;
    if ((pool[guess[i]] ?? 0) > 0) {
      res[i] = "y";
      pool[guess[i]]--;
    }
  }
  return res;
}

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

function AMLdle({ onScore }: { onScore: (s: number, t: number) => void }) {
  const answer = AML_WORDS[dayOfYear() % AML_WORDS.length];
  const [guesses, setGuesses] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [done, setDone] = useState<null | "win" | "lose">(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const finish = (won: boolean, finalGuesses: string[]) => {
    setDone(won ? "win" : "lose");
    onScore(won ? 6 - finalGuesses.length + 1 : 0, 6);
  };

  const submit = (g: string) => {
    if (done || g.length !== 5 || guesses.length >= 6) return;
    const ng = [...guesses, g];
    setGuesses(ng);
    setCur("");
    if (g === answer) finish(true, ng);
    else if (ng.length === 6) finish(false, ng);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Enter") submit(cur);
      else if (e.key === "Backspace") setCur((c) => c.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && cur.length < 5) setCur((c) => c + e.key.toUpperCase());
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const keyState = (k: string): "g" | "y" | "x" => {
    let best: "g" | "y" | "x" | null = null;
    for (const g of guesses) {
      for (let i = 0; i < 5; i++) {
        if (g[i] !== k) continue;
        const ev = evalGuess(g, answer)[i];
        if (ev === "g") return "g";
        if (ev === "y") best = "y";
      }
    }
    return best ?? "x";
  };

  const cellColor = (row: number, col: number) => {
    if (row >= guesses.length) return "border-line bg-surface";
    const g = guesses[row];
    const ev = evalGuess(g, answer)[col];
    if (ev === "g") return "border-emerald-400 bg-emerald-400/25 text-emerald-300";
    if (ev === "y") return "border-amber-400 bg-amber-400/20 text-amber-300";
    return "border-line bg-surface-2 text-faint";
  };

  return (
    <div onClick={() => inputRef.current?.focus()} className="cursor-text">
      <input
        ref={inputRef}
        value={cur}
        onChange={(e) => setCur(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5))}
        className="sr-only"
        autoFocus
      />
      <div className="mx-auto grid max-w-xs grid-cols-5 gap-1.5">
        {Array.from({ length: 30 }).map((_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          const ch = r === guesses.length ? cur[c] ?? "" : guesses[r]?.[c] ?? "";
          return (
            <motion.div
              key={i}
              animate={r === guesses.length && c === cur.length ? { scale: [1, 1.08, 1] } : {}}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-bold uppercase ${cellColor(r, c)}`}
            >
              {ch}
            </motion.div>
          );
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-sm flex-col items-center gap-1.5">
        {KEY_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {ri === 2 && (
              <button
                onClick={() => setCur((c) => c.slice(0, -1))}
                className="rounded-md border border-line bg-surface-2 px-2 py-2 text-[10px] font-bold text-muted"
              >
                DEL
              </button>
            )}
            {row.split("").map((k) => {
              const st = keyState(k);
              return (
                <button
                  key={k}
                  onClick={() => setCur((c) => (c.length < 5 ? c + k : c))}
                  className={`h-11 w-8 rounded-md border text-xs font-bold transition-colors ${
                    st === "g"
                      ? "border-emerald-400 bg-emerald-400/30 text-emerald-200"
                      : st === "y"
                        ? "border-amber-400 bg-amber-400/25 text-amber-200"
                        : "border-line bg-surface-2 text-body hover:bg-surface"
                  }`}
                >
                  {k}
                </button>
              );
            })}
            {ri === 2 && (
              <button
                onClick={() => submit(cur)}
                className="rounded-md border border-emerald-400/50 bg-emerald-400/15 px-2 py-2 text-[10px] font-bold text-emerald-300"
              >
                GO
              </button>
            )}
          </div>
        ))}
      </div>

      {done && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm font-semibold text-emerald-300"
        >
          {done === "win" ? `Solved in ${guesses.length} — the word was ${answer}` : `The word was ${answer}`}
        </motion.p>
      )}
    </div>
  );
}

// ---------- Game 3: Typology Rush ----------

function TypologyRush({ onScore }: { onScore: (s: number, t: number) => void }) {
  const items = useDaily(RUSH_BANK, 8, 3);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const finished = useRef(false);

  const answer = (oi: number) => {
    if (picked !== null || finished.current) return;
    const correct = oi === items[idx].options.indexOf(items[idx].answer);
    const ns = correct ? score + 1 + Math.floor(streak / 3) : score;
    const nstreak = correct ? streak + 1 : 0;
    setScore(ns);
    setStreak(nstreak);
    setPicked(oi);
    setTimeout(() => {
      setPicked(null);
      setTimeLeft(10);
      if (idx + 1 >= items.length) {
        finished.current = true;
        onScore(ns, items.length);
      } else setIdx(idx + 1);
    }, 900);
  };

  useEffect(() => {
    if (picked !== null || idx >= items.length || finished.current) return;
    const t = setInterval(() => setTimeLeft((v) => v - 0.1), 100);
    return () => clearInterval(t);
  }, [idx, picked, items.length]);

  useEffect(() => {
    if (timeLeft <= 0 && picked === null && idx < items.length) answer(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  if (idx >= items.length) {
    return <p className="text-sm text-muted">Round complete — {score}/{items.length} points.</p>;
  }

  const item = items[idx];
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Scenario {idx + 1}/{items.length} · streak ×{streak}
        </span>
        <span className={timeLeft < 3 ? "font-bold text-red-400" : ""}>{Math.ceil(timeLeft)}s</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className={`h-full transition-all ${timeLeft < 3 ? "bg-red-400" : "bg-emerald-400"}`}
          style={{ width: `${(timeLeft / 10) * 100}%` }}
        />
      </div>
      <p className="mt-4 rounded-xl border border-line bg-surface/60 p-4 text-sm font-medium text-ink">
        {item.clue}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {item.options.map((o, oi) => (
          <button
            key={o}
            onClick={() => answer(oi)}
            disabled={picked !== null}
            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
              picked !== null
                ? o === item.answer
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                  : oi === picked
                    ? "border-red-400 bg-red-400/15 text-red-300"
                    : "border-line text-faint"
                : "border-line bg-surface text-body hover:border-emerald-400/50 hover:text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-2 text-right text-xs font-bold text-ink">{score} pts</p>
    </div>
  );
}

// ---------- Game 4: Time Warp ----------

function TimeWarp({ onScore }: { onScore: (s: number, t: number) => void }) {
  const items = useDaily(TIME_BANK, 8, 4);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const reported = useRef(false);

  const choose = (oi: number) => {
    if (picked !== null) return;
    const item = items[idx];
    const yr = item.options[oi];
    const ns = yr === item.year ? score + 1 : score;
    setScore(ns);
    setPicked(oi);
    setTimeout(() => {
      setPicked(null);
      if (idx + 1 >= items.length) {
        if (!reported.current) {
          reported.current = true;
          onScore(ns, items.length);
        }
      } else setIdx(idx + 1);
    }, 800);
  };

  if (idx >= items.length) {
    return <p className="text-sm text-muted">Timeline complete — {score}/{items.length}.</p>;
  }
  const item = items[idx];
  return (
    <div>
      <p className="text-xs text-muted">
        Event {idx + 1}/{items.length} — pin the year it happened
      </p>
      <p className="mt-3 rounded-xl border border-line bg-surface/60 p-4 text-sm font-medium text-ink">
        {item.event}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {item.options.map((y, oi) => (
          <button
            key={y}
            onClick={() => choose(oi)}
            disabled={picked !== null}
            className={`rounded-lg border py-3 text-sm font-bold transition-colors ${
              picked !== null
                ? y === item.year
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                  : oi === picked
                    ? "border-red-400 bg-red-400/15 text-red-300"
                    : "border-line text-faint"
                : "border-line bg-surface text-body hover:border-emerald-400/50"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
      <p className="mt-2 text-right text-xs font-bold text-ink">{score} correct</p>
    </div>
  );
}

// ---------- Game 5: Disposition ----------

function Disposition({ onScore }: { onScore: (s: number, t: number) => void }) {
  const items = useDaily(DISPO_BANK, 8, 5);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const reported = useRef(false);

  const choose = (oi: number) => {
    if (picked !== null) return;
    const item = items[idx];
    const correct = item.options[oi] === item.answer;
    const ns = correct ? score + 1 : score;
    setScore(ns);
    setPicked(oi);
    setTimeout(() => {
      setPicked(null);
      if (idx + 1 >= items.length) {
        if (!reported.current) {
          reported.current = true;
          onScore(ns, items.length);
        }
      } else setIdx(idx + 1);
    }, 1600);
  };

  if (idx >= items.length) {
    return <p className="text-sm text-muted">Round complete — {score}/{items.length} correct calls.</p>;
  }
  const item = items[idx];
  return (
    <div>
      <p className="text-xs text-muted">
        Alert {idx + 1}/{items.length} — what&apos;s the right call?
      </p>
      <p className="mt-3 rounded-xl border border-line bg-surface/60 p-4 text-sm leading-6 text-ink">
        {item.scenario}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {item.options.map((o, oi) => (
          <button
            key={o}
            onClick={() => choose(oi)}
            disabled={picked !== null}
            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
              picked !== null
                ? o === item.answer
                  ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                  : oi === picked
                    ? "border-red-400 bg-red-400/15 text-red-300"
                    : "border-line text-faint"
                : "border-line bg-surface text-body hover:border-emerald-400/50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-lg border border-line bg-surface/60 p-3 text-xs leading-5 text-muted"
          >
            <span className="font-semibold text-ink">{item.answer}.</span> {item.why}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- shell ----------

const GAMES = [
  { id: "sort", name: "Sort the Signal", blurb: "Group typologies into their squads" },
  { id: "wordle", name: "AMLdle", blurb: "Guess the 5-letter AML term" },
  { id: "rush", name: "Typology Rush", blurb: "Name the typology before the clock dies" },
  { id: "time", name: "Time Warp", blurb: "Pin landmark AML events to their year" },
  { id: "dispo", name: "Disposition", blurb: "Make the right alert call" },
];

export default function Arcade() {
  const [game, setGame] = useState("sort");
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const day = dayOfYear();

  const recordScore = (gid: string, score: number, total: number) => {
    void total;
    setProgress((prev) => {
      const p = prev ?? { date: todayStr(), done: {}, streak: 0, lastPlay: "" };
      const done = { ...p.done, [gid]: score };
      const allDone = GAMES.every((g) => done[g.id] !== undefined);
      // streak counts consecutive days where every game was played
      const streak =
        allDone && p.lastPlay !== todayStr() ? p.streak + 1 : p.streak;
      const np = { ...p, done, streak, lastPlay: allDone ? todayStr() : p.lastPlay };
      saveProgress(np);
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "arcade", id: gid }),
      }).catch(() => {});
      return np;
    });
  };

  const scores = progress?.done ?? {};

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        AML Arcade · daily run #{day}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Press play. Get sharper.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Five bite-sized AML brain games — typologies, alerts, SARs and the
        regulations behind them. Same puzzles for everyone each day; progress
        lives in this browser.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span suppressHydrationWarning className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Streak: {progress.streak} day{progress.streak === 1 ? "" : "s"}
        </span>
        <span suppressHydrationWarning className="text-xs text-faint">
          {Object.keys(scores).length}/{GAMES.length} games played today
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setGame(g.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              game === g.id
                ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                : "border-line bg-surface text-muted hover:border-emerald-400/40 hover:text-ink"
            }`}
          >
            {g.name}
            {scores[g.id] !== undefined && (
              <span className="ml-1.5 text-[10px] text-emerald-400">●</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface/40 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink">
              {GAMES.find((g) => g.id === game)?.name}
            </h2>
            <p className="text-xs text-muted">
              {GAMES.find((g) => g.id === game)?.blurb}
            </p>
          </div>
          {scores[game] !== undefined && <ScoreBadge score={scores[game]} total={8} />}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={game}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {game === "sort" && <SortSignal onScore={(s, t) => recordScore("sort", s, t)} />}
            {game === "wordle" && <AMLdle onScore={(s, t) => recordScore("wordle", s, t)} />}
            {game === "rush" && <TypologyRush onScore={(s, t) => recordScore("rush", s, t)} />}
            {game === "time" && <TimeWarp onScore={(s, t) => recordScore("time", s, t)} />}
            {game === "dispo" && <Disposition onScore={(s, t) => recordScore("dispo", s, t)} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-5">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setGame(g.id)}
            className={`rounded-xl border p-3 text-left transition-colors ${
              game === g.id
                ? "border-emerald-400/50 bg-emerald-400/5"
                : "border-line bg-surface/40 hover:border-emerald-400/30"
            }`}
          >
            <p className="text-xs font-semibold text-ink">{g.name}</p>
            <p className="mt-0.5 text-[11px] leading-4 text-faint">{g.blurb}</p>
            {scores[g.id] !== undefined && (
              <p className="mt-1.5 text-[11px] font-bold text-emerald-400">
                scored {scores[g.id]}
              </p>
            )}
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-faint">
        Miss a round? The encyclopedia is right here —{" "}
        <a href="/glossary" className="text-emerald-400 hover:underline">
          study the glossary
        </a>{" "}
        or{" "}
        <a href="/interview-prep" className="text-emerald-400 hover:underline">
          drill interview questions
        </a>
        .
      </p>
    </div>
  );
}
