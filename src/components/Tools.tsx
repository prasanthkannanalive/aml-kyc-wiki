"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

/* ============================ shared bits ============================ */

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="mt-4 grid gap-2 sm:grid-cols-3">
      {items.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.3 }}
          className="flex items-start gap-2.5 rounded-xl border border-line/70 bg-surface/40 px-3 py-2.5"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[10px] font-bold text-emerald-300">
            {i + 1}
          </span>
          <span className="text-xs leading-5 text-muted">{s}</span>
        </motion.li>
      ))}
    </ol>
  );
}

function ToolShell({
  title,
  desc,
  steps,
  children,
  footnote,
}: {
  title: string;
  desc: string;
  steps: string[];
  children: React.ReactNode;
  footnote?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-surface/70 to-surface/30 p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{desc}</p>
      <Steps items={steps} />
      <div className="mt-4">{children}</div>
      {footnote && <div className="mt-3">{footnote}</div>}
    </div>
  );
}

function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] leading-5 text-muted">
      {children}
    </p>
  );
}

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

const CDD_COLORS = ["#34d399", "#38bdf8", "#a78bfa", "#f59e0b", "#fb7185"];

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
  const parts = useMemo(
    () =>
      groups.map((g, i) => ({
        ...g,
        w: g.opts.find((o) => o.v === sel[g.key])?.w ?? 0,
        color: CDD_COLORS[i],
      })),
    [sel] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const score = Math.min(100, parts.reduce((s, p) => s + p.w, 0));
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

      {/* contribution breakdown — how the score is built */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Inherent risk score — factor breakdown</span>
          <motion.span
            key={score}
            initial={{ scale: 1.15, color: "#34d399" }}
            animate={{ scale: 1, color: "#e5e7eb" }}
            className="font-mono font-semibold text-ink"
          >
            {score}/100
          </motion.span>
        </div>
        <div className="mt-1.5 flex h-3 w-full gap-px overflow-hidden rounded-full bg-surface-2">
          <AnimatePresence>
            {parts.map((p) =>
              p.w > 0 ? (
                <motion.div
                  key={p.key + p.w}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.w}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full"
                  style={{ background: p.color }}
                  title={`${p.label}: +${p.w}`}
                />
              ) : null
            )}
          </AnimatePresence>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {parts.map((p) => (
            <span key={p.key} className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="h-2 w-2 rounded-sm" style={{ background: p.color }} />
              {p.label.split(" ")[0]} <span className="font-mono text-ink">+{p.w}</span>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        key={b.label}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 rounded-xl border p-4 ${b.color}`}
      >
        <div className="text-sm font-bold tracking-wide">{b.label}</div>
        <p className="mt-1.5 text-sm leading-6 text-body">{b.cdd}</p>
        <p className="mt-1 text-sm leading-6 text-body"><span className="font-semibold">Ongoing:</span> {b.ongoing}</p>
      </motion.div>
      <Footnote>
        Educational model only — illustrative weights, not any regulator&apos;s formula. Real risk
        assessments are firm-specific and documented in your AML policy. See{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/1.4" className="text-emerald-400 hover:underline">
          Chapter 1.4 — Risk scoring in practice
        </Link>
        .
      </Footnote>
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

  // cumulative product through each hop — the "traverse" of the chain
  const chain = useMemo(() => {
    const out: (Hop & { i: number; cum: number })[] = [];
    let acc = 1;
    hops.forEach((h, i) => {
      acc *= h.pct / 100;
      out.push({ ...h, i, cum: acc });
    });
    return out;
  }, [hops]);
  const finalCum = chain.length ? chain[chain.length - 1].cum : 0;

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
            <span className="w-14 font-mono text-xs text-muted">owns ↓</span>
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

      {/* chain traversal — step through the multiplication */}
      <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Ownership traversal
          </div>
          <div className="font-mono text-2xl font-bold text-ink">{(finalCum * 100).toFixed(1)}%</div>
        </div>
        <div className="mt-3 space-y-1.5">
          {chain.map((c) => (
            <motion.div
              key={c.i + c.owner + c.pct}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: c.i * 0.15, duration: 0.3 }}
              className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2 text-ink">
                <span className="font-mono text-xs text-emerald-400">×{c.pct}%</span>
                {c.owner}
                {c.isPerson && <span className="rounded bg-violet-400/15 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">PERSON</span>}
              </span>
              <span className="font-mono text-xs text-muted">→ {(c.cum * 100).toFixed(1)}%</span>
            </motion.div>
          ))}
          <div className="flex items-center justify-between rounded-lg border border-dashed border-line px-3 py-2 text-sm">
            <span className="text-muted">{customer}</span>
            <span className="font-mono text-xs text-emerald-400">final stake</span>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {chain.filter((c) => c.isPerson).length === 0 ? (
            <p className="text-sm text-amber-400">No natural persons in the chain — keep unwrapping: trusts, nominees and bearer shares often hide the real owner.</p>
          ) : (
            chain.filter((c) => c.isPerson).map((p) => {
              const meets25 = p.cum >= 0.25;
              return (
                <div key={p.owner} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm">
                  <span className="text-ink">{p.owner}</span>
                  <span className={`font-mono text-xs ${meets25 ? "text-emerald-400" : "text-muted"}`}>
                    {(p.cum * 100).toFixed(1)}% indirect → {meets25 ? "reportable UBO (≥25%)" : "below 25% threshold"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footnote>
        FATF R.24 sets no universal percentage — 25% is the common national threshold; some regimes
        use 10% for higher-risk. Control can also make someone a UBO regardless of ownership.
        See{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/3.5" className="text-emerald-400 hover:underline">
          Chapter 3.5 — Beneficial ownership thresholds
        </Link>
        .
      </Footnote>
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
    const total = rule.unit === "working"
      ? (due.getTime() - start.getTime()) / 86400000
      : rule.days;
    const elapsed = Math.min(1, Math.max(0, (now.getTime() - start.getTime()) / (total * 86400000)));
    return { due, start, daysLeft: Math.abs(daysLeft), overdue, elapsed, total };
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
        <div className="mt-4">
          {/* timeline traverse: start → today → due */}
          <div className="relative h-2 rounded-full bg-surface-2">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${res.overdue ? "bg-red-400/70" : "bg-emerald-400/70"}`}
              animate={{ width: `${Math.min(100, res.elapsed * 100)}%` }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-ink bg-amber-400"
              animate={{ left: `calc(${Math.min(100, res.elapsed * 100)}% - 7px)` }}
              transition={{ duration: 0.6 }}
              title="Today"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-faint">
            <span>{res.start.toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
            <span className="text-amber-300">today</span>
            <span>{res.due.toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
          </div>
          <div className={`mt-4 rounded-xl border p-4 ${res.overdue ? "border-red-400/40 bg-red-400/10" : res.daysLeft <= 7 ? "border-amber-400/40 bg-amber-400/10" : "border-emerald-400/30 bg-emerald-400/5"}`}>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">Due date</div>
            <div className="mt-1 text-lg font-bold text-ink">{res.due.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
            <div className={`mt-1 font-mono text-sm ${res.overdue ? "text-red-400" : "text-ink"}`}>
              {res.overdue ? `${res.daysLeft} day${res.daysLeft === 1 ? "" : "s"} OVERDUE` : `${res.daysLeft} day${res.daysLeft === 1 ? "" : "s"} remaining`}
            </div>
          </div>
        </div>
      )}
      <p className="mt-3 text-sm leading-6 text-body">{rule.note}</p>
      <Footnote>
        Deadlines vary by jurisdiction and facts — always confirm against the current rules in{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/6.3" className="text-emerald-400 hover:underline">
          Chapter 6.3 — Filing timelines
        </Link>
        .
      </Footnote>
    </div>
  );
}

/* ============================ TRAVEL RULE CHECKER (crypto) ============================ */

const TR_RULES = [
  { v: "us", label: "US (FinCEN)", threshold: 1000, note: "USD 1,000 — originator & beneficiary info must accompany covered transfers." },
  { v: "eu", label: "EU (TFR 2023/1113)", threshold: 0, note: "No de-minimis — applies to ALL virtual-asset transfers regardless of amount." },
  { v: "uk", label: "UK (FCA)", threshold: 1000, note: "GBP 1,000 — aligned to FATF standard since Sept 2023." },
  { v: "fatf", label: "FATF baseline", threshold: 1000, note: "USD/EUR 1,000 recommended threshold — jurisdictions may set lower." },
];

const TR_FIELDS = [
  "Originator name",
  "Originator account / wallet address",
  "Originator physical address or unique ID",
  "Beneficiary name",
  "Beneficiary account / wallet address",
  "Beneficiary physical address or unique ID",
];

function TravelRuleChecker() {
  const [jur, setJur] = useState("us");
  const [amount, setAmount] = useState("5000");
  const [unhosted, setUnhosted] = useState(false);
  const rule = TR_RULES.find((r) => r.v === jur)!;
  const amt = Number(amount) || 0;
  const applies = rule.threshold === 0 ? amt > 0 : amt >= rule.threshold;

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Jurisdiction rule</span>
          <select
            value={jur}
            onChange={(e) => setJur(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
          >
            {TR_RULES.map((r) => <option key={r.v} value={r.v}>{r.label}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Transfer amount (USD equiv.)</span>
          <input
            type="number" min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
          />
        </label>
        <label className="flex items-end gap-2 pb-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={unhosted}
            onChange={(e) => setUnhosted(e.target.checked)}
            className="accent-emerald-400"
          />
          Counterparty is an unhosted wallet
        </label>
      </div>

      <motion.div
        key={`${jur}-${applies}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 rounded-xl border p-4 ${applies ? "border-sky-400/40 bg-sky-400/10" : "border-emerald-400/30 bg-emerald-400/5"}`}
      >
        <div className={`text-sm font-bold ${applies ? "text-sky-300" : "text-emerald-300"}`}>
          {applies ? "Travel Rule APPLIES" : "Below threshold — TR data exchange not mandatory"}
        </div>
        <p className="mt-1 text-sm leading-6 text-body">{rule.note}</p>
        {applies && (
          <div className="mt-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Required originator & beneficiary data
            </div>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {TR_FIELDS.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-xs text-ink"
                >
                  <span className="text-emerald-400">✓</span> {f}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {unhosted && applies && (
          <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-200">
            Unhosted wallet counterparty: no VASP exists to exchange data with. Under FATF guidance the
            transacting VASP must still <strong>collect and retain</strong> the required information —
            and treat the absence of a counterparty VASP as an enhanced-due-diligence trigger.
          </p>
        )}
      </motion.div>
      <Footnote>
        Thresholds and scope vary by jurisdiction and change — verify against{" "}
        <Link href="/courses/virtual-asset-compliance/chapters/4.2" className="text-emerald-400 hover:underline">
          VA Compliance Chapter 4.2 — Implementing the Travel Rule
        </Link>
        .
      </Footnote>
    </div>
  );
}

/* ============================ STRUCTURING CHECKER ============================ */

function StructuringChecker() {
  const [amounts, setAmounts] = useState<string[]>(["9000", "9500", "8900"]);
  const [threshold, setThreshold] = useState("10000");
  const th = Number(threshold) || 10000;
  const vals = amounts.map((a) => Number(a) || 0).filter((v) => v > 0);
  const total = vals.reduce((s, v) => s + v, 0);
  const under = vals.filter((v) => v < th);
  const maxRun = vals.every((v) => v < th) && vals.length >= 2 && total >= th * 0.8;

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
            Cash deposits (each below the reporting threshold)
          </span>
          <div className="flex flex-wrap gap-2">
            {amounts.map((a, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="font-mono text-xs text-muted">$</span>
                <input
                  type="number" min={0}
                  value={a}
                  onChange={(e) => setAmounts((as) => as.map((x, j) => (j === i ? e.target.value : x)))}
                  className="w-24 rounded-lg border border-line bg-surface px-2.5 py-2 text-sm text-ink outline-none focus:border-emerald-400"
                />
                {amounts.length > 2 && (
                  <button
                    onClick={() => setAmounts((as) => as.filter((_, j) => j !== i))}
                    className="text-xs text-muted hover:text-red-400"
                    aria-label="Remove amount"
                  >✕</button>
                )}
              </div>
            ))}
            <button
              onClick={() => setAmounts((as) => [...as, ""])}
              className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300 hover:bg-emerald-400/20"
            >+ Add</button>
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Threshold</span>
          <input
            type="number" min={100}
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-32 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-emerald-400"
          />
        </label>
      </div>

      {vals.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-surface/50 p-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Combined total</div>
              <motion.div
                key={total}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                className="font-mono text-2xl font-bold text-ink"
              >
                ${total.toLocaleString()}
              </motion.div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">{under.length}/{vals.length} below threshold</div>
              <div className="font-mono text-sm text-muted">each &lt; ${th.toLocaleString()}</div>
            </div>
          </div>
          {/* stacked bars per deposit */}
          <div className="mt-3 flex h-8 gap-1 overflow-hidden rounded-lg">
            {vals.map((v, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`flex-1 rounded-sm ${v >= th ? "bg-red-400/80" : "bg-amber-400/80"}`}
                style={{ height: "100%" }}
                title={`$${v.toLocaleString()} — ${v >= th ? "at/above threshold" : "below threshold"}`}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {vals.map((v, i) => (
              <span
                key={i}
                className={`rounded-md px-2 py-1 font-mono text-[11px] ${v >= th ? "bg-red-400/15 text-red-300" : "bg-amber-400/15 text-amber-300"}`}
              >
                ${v.toLocaleString()}
              </span>
            ))}
          </div>
          <AnimatePresence>
            {maxRun && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-sm leading-6 text-red-200"
              >
                <strong>Structuring pattern:</strong> {vals.length} deposits all kept just below the
                ${th.toLocaleString()} reporting line, totalling ${total.toLocaleString()}. Individually
                each looks ordinary; together they look like deliberate threshold avoidance — a classic
                smurfing/structuring red flag worth escalating.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <Footnote>
        Educational heuristic — real CTR/threshold rules differ by instrument and jurisdiction (US CTR
        $10k cash; SAR thresholds differ). See{" "}
        <Link href="/courses/fraud-prevention/chapters/4.2" className="text-emerald-400 hover:underline">
          Fraud Chapter 4.2 — Expense, payroll and vendor fraud
        </Link>{" "}
        and the{" "}
        <Link href="/courses/kyc-cdd-tm-analyst/chapters/4.3" className="text-emerald-400 hover:underline">
          KYC Chapter 4.3 — Structuring and smurfing detection
        </Link>
        .
      </Footnote>
    </div>
  );
}

/* ============================ PAGE ============================ */

export default function Tools() {
  return (
    <div className="space-y-12">
      <section>
        <ToolShell
          title="CDD risk calculator"
          desc="Score a hypothetical customer profile — see the risk band and which CDD measures apply. The stacked bar shows exactly which factors drove the score."
          steps={[
            "Pick the customer type — who is applying?",
            "Rate geography, product, channel and PEP status",
            "Read the band: the colour tells you which CDD tier applies",
          ]}
        >
          <CddCalculator />
        </ToolShell>
      </section>

      <section>
        <ToolShell
          title="UBO threshold calculator"
          desc="Multiply ownership percentages down a chain to find who crosses the beneficial-ownership threshold. The traversal shows the running product at every hop."
          steps={[
            "List each hop from the natural person down to the customer",
            "Enter the % owned at each hop and tick 'person' for natural persons",
            "Read the traversal: each row shows the cumulative indirect stake",
          ]}
        >
          <UboCalculator />
        </ToolShell>
      </section>

      <section>
        <ToolShell
          title="SAR / STR deadline timer"
          desc="Pick a filing rule and a start date — get the due date and days remaining, with a visual timeline of elapsed vs remaining time."
          steps={[
            "Choose the jurisdiction rule (US SAR/CTR, UK DAML, India STR)",
            "Enter the date suspicion arose or was detected",
            "Read the due date and the today-marker on the timeline",
          ]}
        >
          <SarTimer />
        </ToolShell>
      </section>

      <section>
        <ToolShell
          title="Travel Rule checker — virtual assets"
          desc="Enter a crypto transfer amount and jurisdiction — see whether FATF Travel Rule data exchange applies and which fields are mandatory."
          steps={[
            "Pick the jurisdiction rule (US $1k, EU no threshold, UK £1k, FATF baseline)",
            "Enter the transfer amount in USD equivalent",
            "Check 'unhosted wallet' if the counterparty is self-custody — the rules change",
          ]}
        >
          <TravelRuleChecker />
        </ToolShell>
      </section>

      <section>
        <ToolShell
          title="Structuring / smurfing checker"
          desc="Enter a series of cash deposits kept under the reporting threshold — see the combined total and whether the pattern looks like deliberate structuring."
          steps={[
            "Add each deposit amount (all below the threshold)",
            "Set the reporting threshold for your scenario",
            "Watch the stacked bars — uniform just-below-threshold amounts are the tell",
          ]}
        >
          <StructuringChecker />
        </ToolShell>
      </section>
    </div>
  );
}
