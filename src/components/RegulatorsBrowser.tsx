"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { REGULATORS, TIER_META, type RegTier, type Regulator } from "@/lib/regulators";

const TIERS: (RegTier | "all")[] = ["all", "advanced", "established", "developing"];

function RegCard({ r }: { r: Regulator }) {
  const tier = TIER_META[r.tier];
  return (
    <div id={r.code.toLowerCase()} className="flex flex-col scroll-mt-24 rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-emerald-400/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted">
              {r.code}
            </span>
            <h3 className="font-semibold text-ink">{r.country}</h3>
          </div>
          <p className="mt-1.5 text-xs leading-5 text-muted">{r.regulator}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tier.cls}`}>
          {tier.label}
        </span>
      </div>

      {/* regime maturity meter */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-faint">
          <span>Regime maturity</span>
          <span>{tier.pct}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className={`h-full rounded-full ${
              r.tier === "advanced" ? "bg-emerald-400" : r.tier === "established" ? "bg-sky-400" : "bg-amber-400"
            }`}
            style={{ width: `${tier.pct}%` }}
          />
        </div>
        <p className="mt-1 text-[10px] leading-4 text-faint">{tier.desc}</p>
      </div>

      <dl className="mt-4 space-y-2 text-xs">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-faint">FIU</dt>
          <dd className="mt-0.5 text-muted">{r.fiu}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-faint">Legal framework</dt>
          <dd className="mt-0.5 text-muted">{r.law}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-faint">Filing channel</dt>
          <dd className="mt-0.5 text-muted">{r.filing}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-faint">Deadline style</dt>
          <dd className="mt-0.5 font-medium text-ink">{r.deadline}</dd>
        </div>
      </dl>

      <p className="mt-3 flex-1 text-[11px] leading-4 text-faint">{r.note}</p>
      <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3 text-[11px]">
        <span className="text-faint">{r.fatf}</span>
        {r.sim && (
          <Link href={`/job-simulation?sim=${r.sim}`} className="font-medium text-emerald-400 hover:text-emerald-300">
            Practice filing →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function RegulatorsBrowser() {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState<RegTier | "all">("all");

  const rows = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return REGULATORS.filter((r) => {
      if (tier !== "all" && r.tier !== tier) return false;
      if (!terms.length) return true;
      const hay = `${r.country} ${r.regulator} ${r.fiu} ${r.law} ${r.filing} ${r.note}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, tier]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: REGULATORS.length };
    for (const r of REGULATORS) c[r.tier] = (c[r.tier] ?? 0) + 1;
    return c;
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search country, FIU, law…"
          className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5">
          {TIERS.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                tier === t
                  ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                  : "border-line bg-surface/60 text-muted hover:text-ink"
              }`}
            >
              {t === "all" ? "All" : TIER_META[t].label} ({counts[t] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-faint">
        {rows.length} of {REGULATORS.length} jurisdictions
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-line bg-surface/50 p-8 text-center text-sm text-muted">
          No regulators match — try a different search or tier.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <RegCard key={r.code} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}
