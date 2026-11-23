"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/* ============================ CDD RISK CALCULATOR ============================ */

type Opt = { v: string; label: string; w: number };

const CUST_TYPES: Opt[] = [
  { v: "ind", label: "Individual (retail)", w: 5 },
  { v: "sm", label: "Small business / SME", w: 10 },
  { v: "corp", label: "Corporate / complex entity", w: 18 },
  { v: "npo", label: "Non-profit / NGO", w: 14 },
  { v: "fi", label: "Financial institution / VASP", w: 22 },
  { v: "highrisk", label: "Casino, MSB, bullion dealer", w: 20 },
];
const GEO: Opt[] = [
  { v: "low", label: "Low-risk jurisdiction", w: 3 },
  { v: "med", label: "Medium-risk jurisdiction", w: 10 },
  { v: "high", label: "High-risk / FATF grey or black list", w: 22 },
  { v: "sanct", label: "Sanctioned / embargoed territory", w: 30 },
];
const PRODUCTS: Opt[] = [
  { v: "basic", label: "Basic deposit / payments", w: 3 },
  { v: "credit", label: "Credit / lending products", w: 6 },
  { v: "trade", label: "Trade finance / correspondent", w: 14 },
  { v: "crypto", label: "Crypto / virtual assets", w: 16 },
  { v: "private", label: "Private banking / wealth", w: 12 },
  { v: "shellish", label: "Shell-like structures, bearer shares, nominee", w: 18 },
];
const CHANNELS: Opt[] = [
  { v: "branch", label: "Branch / face-to-face", w: 2 },
  { v: "online", label: "Online with e-ID verification", w: 6 },
  { v: "nonface", label: "Non-face-to-face, no e-ID", w: 12 },
  { v: "intermediary", label: "Introduced via third party / agent", w: 10 },
];
const PEPS: Opt[] = [
  { v: "none", label: "Not a PEP", w: 0 },
  { v: "former", label: "Former PEP (>12 months out)", w: 6 },
  { v: "domestic", label: "Domestic PEP (UK: lower risk since 2024)", w: 8 },
  { v: "foreign", label: "Foreign PEP / international organisation PEP", w: 15 },
];

function band(score: number) {
  if (score < 25)
    return {
      label: "LOW RISK",
      color: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
      cdd: "Simplified or standard CDD may apply. Verify identity, understand purpose, screen sanctions.",
      ongoing: "Periodic refresh on risk-based cycle.",
    };
  if (score < 50)
    return {
      label: "MEDIUM RISK",
      color: "text-amber-400 border-amber-400/40 bg-amber-400/10",
      cdd: "Standard CDD + documented risk rating. Verify source of funds where activity warrants.",
      ongoing: "Enhanced monitoring frequency; refresh on trigger events.",
    };
  if (score < 75)
    return {
      label: "HIGH RISK",
      color: "text-orange-400 border-orange-400/40 bg-orange-400/10",
      cdd: "EDD required: senior management approval, source of wealth AND source of funds, enhanced ongoing monitoring.",
      ongoing: "Closer transaction monitoring; periodic EDD refresh at least annually or on trigger.",
    };
  return {
    label: "PROHIBITIVE / DECLINE-OR-JUSTIFY",
    color: "text-red-400 border-red-400/40 bg-red-400/10",
    cdd: "EDD mandatory; many firms' policies prohibit onboarding or require committee approval. Document the decision either way.",
    ongoing: "If onboarded: intensive monitoring, restricted products, regular senior review.",
  };
}

function CddCalculator() {
  const [sel, setSel] = useState<Record<string, string>>({
    cust: "ind", geo: "low", prod: "basic", chan: "branch", pep: "none",
  });
  const groups: { key: string; label: string; opts: Opt[] }[] = [
    { key: "cust", label: "Customer type", opts: CUST_TYPES },
    { key: "geo", label: "Geography", opts: GEO },
    { key: "prod", label: "Product / service", opts: PRODUCTS },
    { key: "chan", label: "Delivery channel", opts: CHANNELS },
    { key: "pep", label: "PEP status", opts: PEPS },
  ];
  const score = useMemo(() => {
    let s = 0;
    for (const g of groups) s += g.opts.find((o) => o.v === sel[g.key])?.w ?? 0;
    return Math.min(100, s);
  }, [sel]); // eslint-disable-line react-hooks/exhaustive-deps
  const b = band(score);
  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <label key={g.key} className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
              {g.label}
            </span>
            <select
              value={sel[g.key]}
              onChange={(e) => setSel((p) => ({ ...p, [g.key]: e.target.value }))}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
            >
              {g.opts.map((o) => (
                <option key={o.v} value={o.v}>{o.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Inherent risk score</span>
          <span className="font-mono font-semibold text-ink">{score}/100</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${score < 25 ? "bg-emerald-400" : score < 50 ? "bg-amber-400" : score < 75 ? "bg-orange-400" : "bg-red-400"}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <div className={`mt-4 rounded-xl border p-4 ${b.color}`}>
        <div className="text-sm font-bold tracking-wide">{b.label}</div>
        <p className="mt-1.5 text-sm leading-6 text-body">{b.cdd}</p>
        <p className="mt-1 text-sm leading-6 text-body"><span className="font-semibold">Ongoing:</span> {b.ongoing}</p>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted">
        Educational model only — illustrative weights, not any regulator&apos;s formula. Real risk
        assessments are firm-specific and documented in your AML policy. See{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/1.4" className="text-emerald-400 hover:underline">
          Chapter 1.4 — Risk scoring in practice
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================ UBO THRESHOLD CALCULATOR ============================ */

function mulberry(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Hop { owner: string; pct: number; isPerson: boolean }

function UboCalculator() {
  const [hops, setHops] = useState<Hop[]>([
    { owner: "Individual", pct: 60, isPerson: true },
    { owner: "HoldCo A", pct: 70, isPerson: false },
  ]);
  const [customer, setCustomer] = useState("Meridian Trading Ltd");
  const rnd = useMemo(() => mulberry(7), []);

  const cum = hops.reduce((acc, h) => acc * (h.pct / 100), 1);
  const persons = hops.filter((h) => h.isPerson);

  // distribute the customer stake across last-hop owners for realism
  const update = (i: number, patch: Partial<Hop>) =>
    setHops((hs) => hs.map((h, j) => (j === i ? { ...h, ...patch } : h)));

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <p className="text-sm text-muted">
        Who ultimately owns <span className="font-medium text-ink">{customer}</span>? Enter each
        ownership hop — the calculator multiplies the percentages down the chain.
      </p>
      <div className="mt-4 space-y-3">
        {hops.map((h, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-3">
            <span className="w-14 font-mono text-xs text-muted">{i === 0 ? "owns" : "owns"} ↓</span>
            <input
              value={h.owner}
              onChange={(e) => update(i, { owner: e.target.value })}
              className="min-w-0 flex-1 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-sm text-ink outline-none focus:border-emerald-400"
            />
            <label className="flex items-center gap-1.5 text-xs text-muted">
              <input
                type="checkbox"
                checked={h.isPerson}
                onChange={(e) => update(i, { isPerson: e.target.checked })}
                className="accent-emerald-400"
              />
              person
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number" min={1} max={100}
                value={h.pct}
                onChange={(e) => update(i, { pct: Math.max(1, Math.min(100, Number(e.target.value) || 1)) })}
                className="w-16 rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-sm text-ink outline-none focus:border-emerald-400"
              />
              <span className="text-xs text-muted">%</span>
            </div>
            {hops.length > 1 && (
              <button
                onClick={() => setHops((hs) => hs.filter((_, j) => j !== i))}
                className="rounded-lg border border-line px-2 py-1.5 text-xs text-muted hover:border-red-400/50 hover:text-red-400"
                aria-label="Remove hop"
              >✕</button>
            )}
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 text-xs text-muted">
          <span className="rounded-lg border border-line px-3 py-1.5">↓ owns 100%</span>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-sm text-ink outline-none focus:border-emerald-400"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setHops((hs) => [...hs, { owner: `Entity ${hs.length + 1}`, pct: 50, isPerson: false }])}
          className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-400/20"
        >+ Add hop</button>
        <button
          onClick={() => {
            const names = ["HoldCo", "BidCo", "Trust", "SPV", "Parent Ltd", "Nominee Co"];
            const r = mulberry(Math.floor(rnd() * 9999) + Date.now() % 1000);
            const n = 2 + Math.floor(r() * 3);
            setHops(
              Array.from({ length: n }, (_, i) => ({
                owner: i === 0 ? "Individual" : names[Math.floor(r() * names.length)] + (r() > 0.5 ? ` ${i}` : ""),
                pct: 30 + Math.floor(r() * 60),
                isPerson: i === 0 || r() > 0.7,
              }))
            );
          }}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-emerald-400/40 hover:text-ink"
        >🎲 Random chain</button>
        <button
          onClick={() => setHops([{ owner: "Individual", pct: 60, isPerson: true }, { owner: "HoldCo A", pct: 70, isPerson: false }])}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-emerald-400/40 hover:text-ink"
        >Reset example</button>
      </div>
      <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Cumulative indirect ownership</div>
        <div className="mt-1 font-mono text-3xl font-bold text-ink">{(cum * 100).toFixed(1)}%</div>
        <div className="mt-1 text-xs text-muted">
          {hops.map((h) => `${h.pct}%`).join(" × ")} = {(cum * 100).toFixed(1)}%
        </div>
        <div className="mt-3 space-y-1.5">
          {persons.length === 0 ? (
            <p className="text-sm text-amber-400">No natural persons in the chain — keep unwrapping: trusts, nominees and bearer shares often hide the real owner.</p>
          ) : (
            persons.map((p, i) => {
              const pc = hops.slice(0, i + 1).reduce((a, h) => a * (h.pct / 100), 1);
              const meets25 = pc >= 0.25;
              return (
                <div key={i} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm">
                  <span className="text-ink">{p.owner}</span>
                  <span className={`font-mono text-xs ${meets25 ? "text-emerald-400" : "text-muted"}`}>
                    {(pc * 100).toFixed(1)}% indirect → {meets25 ? "reportable UBO (≥25%)" : "below 25% threshold"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted">
        FATF R.24 sets no universal percentage — 25% is the common national threshold; some regimes
        use 10% for higher-risk. Control can also make someone a UBO regardless of ownership.
        See{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/3.5" className="text-emerald-400 hover:underline">
          Chapter 3.5 — Beneficial ownership thresholds
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================ SAR DEADLINE TIMER ============================ */

interface Rule { label: string; days: number; unit: "calendar" | "working"; note: string }

const RULES: Rule[] = [
  { label: "US — SAR (subject identified)", days: 30, unit: "calendar", note: "FinCEN SAR due within 30 days of initial detection. 60 days when no subject is identified." },
  { label: "US — SAR (no subject identified)", days: 60, unit: "calendar", note: "Extended deadline when the subject cannot be identified." },
  { label: "US — CTR", days: 15, unit: "calendar", note: "Currency Transaction Report due within 15 days." },
  { label: "US — Continuing SAR", days: 90, unit: "calendar", note: "Ongoing suspicious activity: file a continuing SAR every 90 days." },
  { label: "UK — DAML notice period", days: 7, unit: "working", note: "NCA must respond within 7 working days; moratorium can run up to 31 days; silence = deemed consent." },
  { label: "India — STR (PMLA Rule 8)", days: 7, unit: "calendar", note: "STR due within 7 days of concluding a transaction is suspicious — all reporting entities." },
];

function addBusinessDays(d: Date, n: number) {
  const out = new Date(d);
  let added = 0;
  while (added < n) {
    out.setDate(out.getDate() + 1);
    const day = out.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return out;
}

function SarTimer() {
  const [ruleIdx, setRuleIdx] = useState(0);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    return d.toISOString().slice(0, 10);
  });
  const rule = RULES[ruleIdx];

  const res = useMemo(() => {
    if (!date) return null;
    const start = new Date(date + "T00:00:00");
    if (isNaN(start.getTime())) return null;
    const due = rule.unit === "working" ? addBusinessDays(start, rule.days) : new Date(start.getTime() + rule.days * 86400000);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const ms = due.getTime() - now.getTime();
    const daysLeft = Math.ceil(ms / 86400000);
    const overdue = daysLeft < 0;
    return { due, daysLeft: Math.abs(daysLeft), overdue };
  }, [date, rule]);

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Deadline rule</span>
          <select
            value={ruleIdx}
            onChange={(e) => setRuleIdx(Number(e.target.value))}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
          >
            {RULES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
            {rule.unit === "working" ? "Date request made" : "Date suspicion arose / detection"}
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
          />
        </label>
      </div>
      {res && (
        <div className={`mt-4 rounded-xl border p-4 ${res.overdue ? "border-red-400/40 bg-red-400/10" : res.daysLeft <= 7 ? "border-amber-400/40 bg-amber-400/10" : "border-emerald-400/30 bg-emerald-400/5"}`}>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Due date</div>
          <div className="mt-1 text-lg font-bold text-ink">{res.due.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
          <div className={`mt-1 font-mono text-sm ${res.overdue ? "text-red-400" : "text-ink"}`}>
            {res.overdue ? `${res.daysLeft} day${res.daysLeft === 1 ? "" : "s"} OVERDUE` : `${res.daysLeft} day${res.daysLeft === 1 ? "" : "s"} remaining`}
          </div>
        </div>
      )}
      <p className="mt-3 text-sm leading-6 text-body">{rule.note}</p>
      <p className="mt-2 text-[11px] leading-5 text-muted">
        Deadlines vary by jurisdiction and facts — always confirm against the current rules in{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/6.3" className="text-emerald-400 hover:underline">
          Chapter 6.3 — Filing timelines
        </Link>
        .
      </p>
    </div>
  );
}

/* ============================ PAGE ============================ */

export default function Tools() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold text-ink">CDD risk calculator</h2>
        <p className="mt-1 text-sm text-muted">Score a hypothetical customer profile — see the risk band and which CDD measures apply.</p>
        <div className="mt-4"><CddCalculator /></div>
      </section>
      <section>
        <h2 className="text-xl font-bold text-ink">UBO threshold calculator</h2>
        <p className="mt-1 text-sm text-muted">Multiply ownership percentages down a chain to find who crosses the beneficial-ownership threshold.</p>
        <div className="mt-4"><UboCalculator /></div>
      </section>
      <section>
        <h2 className="text-xl font-bold text-ink">SAR / STR deadline timer</h2>
        <p className="mt-1 text-sm text-muted">Pick a filing rule and a start date — get the due date and days remaining.</p>
        <div className="mt-4"><SarTimer /></div>
      </section>
    </div>
  );
}
