"use client";

import { useMemo, useState } from "react";
import type { RoleTech } from "@/lib/tech";

type SortDir = "asc" | "desc";
type SortKey = keyof RoleTech;

export function TechSkillsTable({ rows }: { rows: RoleTech[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [dir, setDir] = useState<SortDir>("asc");

  const keys: SortKey[] = ["role", "must", "good"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows.filter(
      (r) =>
        q === "" ||
        keys.some((k) => r[k].toLowerCase().includes(q))
    );
    if (sortKey) {
      out = [...out].sort((a, b) => {
        const cmp = a[sortKey].localeCompare(b[sortKey]);
        return dir === "asc" ? cmp : -cmp;
      });
    }
    return out;
  }, [rows, query, sortKey, dir]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setDir("asc");
    }
  };

  const sortMark = (k: SortKey) =>
    sortKey === k ? (dir === "asc" ? " ↑" : " ↓") : "";

  const thCls =
    "px-5 py-3.5 font-medium cursor-pointer select-none hover:text-ink transition-colors";

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by role or skill…"
            className="w-full rounded-lg border border-line bg-surface/60 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-emerald-400/60 focus:outline-none"
          />
        </div>
      </div>

      {/* mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <div key={r.role} className="rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">{r.role}</p>
            <dl className="mt-2 space-y-1.5 text-xs">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">Must-have</dt>
                <dd className="mt-0.5 leading-5 text-body">{r.must}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">Good-to-have</dt>
                <dd className="mt-0.5 leading-5 text-body">{r.good}</dd>
              </div>
            </dl>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">No roles match “{query}”.</p>
        )}
      </div>

      {/* desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              {(
                [
                  ["role", "Role focus"],
                  ["must", "Must-have tech"],
                  ["good", "Good-to-have tech"],
                ] as [SortKey, string][]
              ).map(([k, label]) => (
                <th key={k} className={thCls} onClick={() => toggleSort(k)}>
                  {label}
                  {sortMark(k)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {filtered.map((r) => (
              <tr key={r.role} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4 font-semibold text-ink">{r.role}</td>
                <td className="px-5 py-4 text-body">{r.must}</td>
                <td className="px-5 py-4 text-muted">{r.good}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-sm text-muted">
                  No roles match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-faint">
        {filtered.length} of {rows.length} shown
      </p>
    </div>
  );
}
