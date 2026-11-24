"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EnforcementCase } from "@/lib/cases";

const fmtUsd = (n: number | null) =>
  n == null ? "—" : n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${(n / 1e6).toFixed(0)}M`;

type SortKey = "penalty-desc" | "penalty-asc" | "year-desc" | "year-asc" | "name";

const SORTS: { v: SortKey; label: string }[] = [
  { v: "penalty-desc", label: "Penalty: high → low" },
  { v: "penalty-asc", label: "Penalty: low → high" },
  { v: "year-desc", label: "Year: newest first" },
  { v: "year-asc", label: "Year: oldest first" },
  { v: "name", label: "Name A–Z" },
];

const selectCls =
  "rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400";

export default function CasesBrowser({ cases }: { cases: EnforcementCase[] }) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [typology, setTypology] = useState("");
  const [decade, setDecade] = useState("");
  const [sort, setSort] = useState<SortKey>("penalty-desc");

  const countries = useMemo(
    () => [...new Set(cases.map((c) => c.country))].sort(),
    [cases]
  );
  const typologies = useMemo(
    () => [...new Set(cases.flatMap((c) => c.typologies))].sort(),
    [cases]
  );
  const decades = useMemo(
    () => [...new Set(cases.map((c) => Math.floor(c.year / 10) * 10))].sort().reverse(),
    [cases]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = cases.filter((c) => {
      if (country && c.country !== country) return false;
      if (typology && !c.typologies.includes(typology)) return false;
      if (decade && Math.floor(c.year / 10) * 10 !== Number(decade)) return false;
      if (needle) {
        const hay = `${c.org} ${c.headline} ${c.summary} ${c.penalty} ${c.regulator}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const by: Record<SortKey, (a: EnforcementCase, b: EnforcementCase) => number> = {
      "penalty-desc": (a, b) => (b.fineUsd ?? -1) - (a.fineUsd ?? -1),
      "penalty-asc": (a, b) => (a.fineUsd ?? Infinity) - (b.fineUsd ?? Infinity),
      "year-desc": (a, b) => b.year - a.year,
      "year-asc": (a, b) => a.year - b.year,
      name: (a, b) => a.org.localeCompare(b.org),
    };
    return [...out].sort(by[sort]);
  }, [cases, q, country, typology, decade, sort]);

  const active =
    (country ? 1 : 0) + (typology ? 1 : 0) + (decade ? 1 : 0) + (q.trim() ? 1 : 0);

  const clear = () => {
    setQ(""); setCountry(""); setTypology(""); setDecade("");
  };

  return (
    <div>
      {/* controls */}
      <div className="rounded-2xl border border-line bg-surface/60 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cases — bank, typology, regulator…"
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2 text-sm text-ink placeholder-muted outline-none focus:border-emerald-400 lg:max-w-xs"
          />
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
            <option value="">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={typology} onChange={(e) => setTypology(e.target.value)} className={selectCls}>
            <option value="">All typologies</option>
            {typologies.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={decade} onChange={(e) => setDecade(e.target.value)} className={selectCls}>
            <option value="">All decades</option>
            {decades.map((d) => <option key={d} value={d}>{d}s</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
            {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
          </select>
          {active > 0 && (
            <button onClick={clear} className="text-xs font-medium text-emerald-400 hover:text-emerald-300 lg:ml-auto">
              Clear {active} filter{active === 1 ? "" : "s"} ✕
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted">
          {filtered.length} of {cases.length} cases
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-line bg-surface/50 p-6 text-sm text-muted">
          No cases match those filters. Try widening the search.
        </p>
      ) : (
        <>
          {/* ranked table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3.5 font-medium">#</th>
                  <th className="px-5 py-3.5 font-medium">Case</th>
                  <th className="hidden px-5 py-3.5 font-medium md:table-cell">Country</th>
                  <th className="px-5 py-3.5 text-right font-medium">Year</th>
                  <th className="px-5 py-3.5 text-right font-medium">Penalty</th>
                  <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filtered.map((c, i) => (
                  <tr key={c.slug} className="transition-colors hover:bg-surface-2/50">
                    <td className="px-5 py-4">
                      <span className={`text-lg font-bold ${i < 3 && sort === "penalty-desc" ? "text-emerald-400" : "text-faint"}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/cases/${c.slug}`} className="font-medium text-ink hover:text-emerald-300">
                        {c.org}
                      </Link>
                      <p className="mt-0.5 max-w-md text-xs text-muted">{c.headline}</p>
                    </td>
                    <td className="hidden px-5 py-4 text-muted md:table-cell">{c.country}</td>
                    <td className="px-5 py-4 text-right font-mono text-body">{c.year}</td>
                    <td className="px-5 py-4 text-right font-mono text-body">{fmtUsd(c.fineUsd)}</td>
                    <td className="hidden px-5 py-4 text-xs text-muted lg:table-cell">
                      {c.status.split("—")[0].trim()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-emerald-400/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    {c.year}
                  </span>
                  <span className="font-mono text-sm text-emerald-400">{fmtUsd(c.fineUsd)}</span>
                </div>
                <h2 className="mt-3 font-semibold text-ink group-hover:text-emerald-300">{c.org}</h2>
                <p className="mt-1 text-sm text-muted">{c.headline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.typologies.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-4 text-xs text-faint">{c.country}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
