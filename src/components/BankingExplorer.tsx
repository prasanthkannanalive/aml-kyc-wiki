"use client";

import { useMemo, useState } from "react";
import type { CountryAml, ExamRegime } from "@/lib/banking";

type SortDir = "asc" | "desc";

function useSortFilter<T extends object>(rows: T[], keys: (keyof T)[]) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [dir, setDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows.filter((r) =>
      q === "" || keys.some((k) => String(r[k]).toLowerCase().includes(q))
    );
    if (sortKey) {
      out = [...out].sort((a, b) => {
        const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
        return dir === "asc" ? cmp : -cmp;
      });
    }
    return out;
  }, [rows, query, sortKey, dir, keys]);

  const toggleSort = (k: keyof T) => {
    if (sortKey === k) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setDir("asc");
    }
  };

  const sortMark = (k: keyof T) =>
    sortKey === k ? (dir === "asc" ? " ↑" : " ↓") : "";

  return { query, setQuery, filtered, toggleSort, sortMark, sortKey };
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-surface/60 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-emerald-400/60 focus:outline-none"
      />
    </div>
  );
}

const thCls =
  "px-5 py-3.5 font-medium cursor-pointer select-none hover:text-ink transition-colors";

export function ExamRegimesTable({ rows }: { rows: ExamRegime[] }) {
  const { query, setQuery, filtered, toggleSort, sortMark } =
    useSortFilter<ExamRegime>(rows, ["jurisdiction", "internal", "external"]);

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Filter by jurisdiction, examiner or body…"
        />
      </div>

      {/* mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((e) => (
          <div key={e.jurisdiction} className="rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">{e.jurisdiction}</p>
            <dl className="mt-2 space-y-1.5 text-xs">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">Internal</dt>
                <dd className="mt-0.5 leading-5 text-body">{e.internal}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">External exam</dt>
                <dd className="mt-0.5 leading-5 text-body">{e.external}</dd>
              </div>
            </dl>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">No regimes match “{query}”.</p>
        )}
      </div>

      {/* desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className={thCls} onClick={() => toggleSort("jurisdiction")}>
                Jurisdiction{sortMark("jurisdiction")}
              </th>
              <th className={thCls} onClick={() => toggleSort("internal")}>
                Internal layer{sortMark("internal")}
              </th>
              <th className={thCls} onClick={() => toggleSort("external")}>
                External exam{sortMark("external")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {filtered.map((e) => (
              <tr key={e.jurisdiction} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4 font-semibold text-ink">{e.jurisdiction}</td>
                <td className="px-5 py-4 text-body">{e.internal}</td>
                <td className="px-5 py-4 text-muted">{e.external}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-sm text-muted">
                  No regimes match “{query}”.
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

const COUNTRY_FIELDS: (keyof CountryAml & string)[] = [
  "country",
  "law",
  "fiu",
  "supervisor",
  "filing",
];

export function CountryAmlTable({ rows }: { rows: CountryAml[] }) {
  const { query, setQuery, filtered, toggleSort, sortMark } =
    useSortFilter<CountryAml>(rows, COUNTRY_FIELDS);

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Filter by country, FIU, law or filing rule…"
        />
      </div>

      {/* mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((c) => (
          <div key={c.country} className="rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">{c.country}</p>
            <dl className="mt-2 space-y-1.5 text-xs">
              {[
                ["Core law", c.law],
                ["FIU", c.fiu],
                ["Supervisor", c.supervisor],
                ["Filing", c.filing],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-0.5 leading-5 text-body">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">No jurisdictions match “{query}”.</p>
        )}
      </div>

      {/* desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              {(
                [
                  ["country", "Country"],
                  ["law", "Core law"],
                  ["fiu", "FIU"],
                  ["supervisor", "Supervisor"],
                  ["filing", "Filing"],
                ] as [keyof CountryAml, string][]
              ).map(([k, label]) => (
                <th key={k} className={thCls} onClick={() => toggleSort(k)}>
                  {label}
                  {sortMark(k)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {filtered.map((c) => (
              <tr key={c.country} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4 font-semibold text-ink">{c.country}</td>
                <td className="px-5 py-4 text-body">{c.law}</td>
                <td className="px-5 py-4 text-muted">{c.fiu}</td>
                <td className="px-5 py-4 text-muted">{c.supervisor}</td>
                <td className="px-5 py-4 text-muted">{c.filing}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-muted">
                  No jurisdictions match “{query}”.
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
