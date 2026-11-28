"use client";

import { useEffect, useState } from "react";

interface Entry {
  key: string;
  name: string;
  score: string | number;
  ts: string;
}

interface DayBoard {
  day: string;
  board: Entry[];
}

function shiftDay(day: string, delta: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

function label(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function ChallengeArchive({ day }: { day: string }) {
  const [boards, setBoards] = useState<DayBoard[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const days = Array.from({ length: 7 }, (_, i) => shiftDay(day, -(i + 1)));
    Promise.all(
      days.map((d) =>
        fetch(`/api/challenge?day=${d}`)
          .then((r) => r.json())
          .then((j) => ({ day: d, board: j?.ok ? j.board : [] }))
          .catch(() => ({ day: d, board: [] as Entry[] }))
      )
    ).then((res) => {
      if (!cancelled) setBoards(res);
    });
    return () => {
      cancelled = true;
    };
  }, [day]);

  if (!boards) return null;
  const played = boards.filter((b) => b.board.length > 0);
  if (played.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Past boards
      </h2>
      <p className="mt-1 text-xs text-muted">
        Winners from the last 7 days — a new board drops every midnight UTC.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {boards.map((b) => {
          const top = b.board[0];
          return (
            <div
              key={b.day}
              className="rounded-xl border border-line bg-surface/50 p-3"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">
                {label(b.day)}
              </p>
              {top ? (
                <>
                  <p className="mt-1.5 truncate text-sm font-semibold text-ink">
                    {top.name}
                  </p>
                  <p className="text-xs text-emerald-300">
                    {top.score}/5 · {b.board.length} player
                    {b.board.length === 1 ? "" : "s"}
                  </p>
                </>
              ) : (
                <p className="mt-1.5 text-xs text-faint">No scores</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
