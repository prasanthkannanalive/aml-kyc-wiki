"use client";

import { useMemo, useState } from "react";

/* ---------------- synthetic dataset ---------------- */

export interface Txn {
  id: number;
  ts: number; // epoch ms
  customer: string;
  counterparty: string;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  currency: string;
  channel: string;
  isNewCp?: boolean;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CUSTOMERS = ["Acme Trading", "Nova Retail", "BluePeak LLC", "Orbit Foods", "Vertex GmbH", "Lumen Studio", "Kite Logistics", "Solstice Travel"];
const CPS = ["Payroll-UK", "Supplier-DE", "Client-US", "Vendor-SG", "Partner-AE", "Customer-IN", "Subsidiary-NL", "Freelancer-BR"];
const CHANNELS = ["Wire", "ACH", "SEPA", "Crypto off-ramp", "Card settlement"];

export function generate(seed: number): Txn[] {
  const rnd = mulberry32(seed);
  const txns: Txn[] = [];
  const start = Date.UTC(2025, 0, 1);
  const day = 86400000;
  let id = 1;

  const push = (t: Partial<Txn> & { ts: number; customer: string; counterparty: string; type: Txn["type"]; amount: number }) => {
    txns.push({
      id: id++,
      currency: "USD",
      channel: CHANNELS[Math.floor(rnd() * CHANNELS.length)],
      ...t,
    } as Txn);
  };

  // baseline noise: ~180 ordinary transactions
  for (let i = 0; i < 180; i++) {
    const cust = CUSTOMERS[Math.floor(rnd() * CUSTOMERS.length)];
    const amt = Math.round((rnd() * 4800 + 120) * 100) / 100;
    push({
      ts: start + Math.floor(rnd() * 30) * day + Math.floor(rnd() * 86400000),
      customer: cust,
      counterparty: CPS[Math.floor(rnd() * CPS.length)],
      type: rnd() > 0.5 ? "deposit" : "withdrawal",
      amount: amt,
    });
  }

  // typology 1 — structuring: 6 deposits of $9,400–$9,900 within 5 days
  const st = CUSTOMERS[1];
  for (let i = 0; i < 6; i++) {
    push({
      ts: start + (4 + i) * day + Math.floor(rnd() * 43200000),
      customer: st,
      counterparty: "Client-US",
      type: "deposit",
      amount: Math.round((9400 + rnd() * 480) * 100) / 100,
    });
  }

  // typology 2 — velocity: 14 withdrawals in one day
  const vx = CUSTOMERS[4];
  for (let i = 0; i < 14; i++) {
    push({
      ts: start + 12 * day + i * 2700000 + Math.floor(rnd() * 600000),
      customer: vx,
      counterparty: "Vendor-SG",
      type: "withdrawal",
      amount: Math.round((rnd() * 2400 + 300) * 100) / 100,
    });
  }

  // typology 3 — round-amount layering + new counterparty
  const ly = CUSTOMERS[6];
  for (let i = 0; i < 8; i++) {
    push({
      ts: start + (18 + i) * day + Math.floor(rnd() * 43200000),
      customer: ly,
      counterparty: "Subsidiary-NL",
      type: "transfer",
      amount: [25000, 50000, 75000, 100000][i % 4],
      isNewCp: i < 3,
    });
  }

  // typology 4 — weekend structuring burst
  const we = CUSTOMERS[7];
  for (let i = 0; i < 5; i++) {
    push({
      ts: start + 22 * day + i * 93600000 + Math.floor(rnd() * 3600000), // ~26h apart → Sat/Sun
      customer: we,
      counterparty: "Freelancer-BR",
      type: "deposit",
      amount: Math.round((9200 + rnd() * 700) * 100) / 100,
    });
  }

  return txns.sort((a, b) => a.ts - b.ts);
}

/* ---------------- rules ---------------- */

interface Rules {
  structuring: { on: boolean; threshold: number; count: number; windowDays: number };
  velocity: { on: boolean; hours: number; count: number };
  largeAmount: { on: boolean; min: number };
  roundAmount: { on: boolean; min: number };
  newCounterparty: { on: boolean };
}

const DEFAULT_RULES: Rules = {
  structuring: { on: true, threshold: 10000, count: 3, windowDays: 5 },
  velocity: { on: true, hours: 24, count: 10 },
  largeAmount: { on: true, min: 25000 },
  roundAmount: { on: true, min: 10000 },
  newCounterparty: { on: true },
};

interface Alert {
  txn: Txn;
  reasons: string[];
  score: number;
}

function evaluate(txns: Txn[], rules: Rules): Alert[] {
  const alerts = new Map<number, Alert>();
  const add = (t: Txn, reason: string, pts: number) => {
    const a = alerts.get(t.id) ?? { txn: t, reasons: [], score: 0 };
    if (!a.reasons.includes(reason)) {
      a.reasons.push(reason);
      a.score += pts;
    }
    alerts.set(t.id, a);
  };

  // per-transaction rules
  for (const t of txns) {
    if (rules.largeAmount.on && t.amount >= rules.largeAmount.min)
      add(t, `Amount ≥ $${rules.largeAmount.min.toLocaleString()}`, 20);
    if (rules.roundAmount.on && t.amount >= rules.roundAmount.min && t.amount % 5000 === 0)
      add(t, "Round-amount transfer", 15);
    if (rules.newCounterparty.on && t.isNewCp)
      add(t, "First-seen counterparty", 25);
  }

  // structuring: count sub-threshold deposits per customer in sliding window
  if (rules.structuring.on) {
    const { threshold, count, windowDays } = rules.structuring;
    const byCust = new Map<string, Txn[]>();
    for (const t of txns)
      if (t.type === "deposit" && t.amount < threshold)
        byCust.set(t.customer, [...(byCust.get(t.customer) ?? []), t]);
    for (const list of byCust.values()) {
      list.sort((a, b) => a.ts - b.ts);
      for (let i = 0; i < list.length; i++) {
        const win = list.filter(
          (t) => t.ts >= list[i].ts && t.ts <= list[i].ts + windowDays * 86400000
        );
        if (win.length >= count) win.forEach((t) => add(t, `Structuring — ${win.length} deposits <$${threshold.toLocaleString()} in ${windowDays}d`, 35));
      }
    }
  }

  // velocity: N+ txns same customer within window
  if (rules.velocity.on) {
    const { hours, count } = rules.velocity;
    const byCust = new Map<string, Txn[]>();
    for (const t of txns) byCust.set(t.customer, [...(byCust.get(t.customer) ?? []), t]);
    for (const list of byCust.values()) {
      list.sort((a, b) => a.ts - b.ts);
      for (let i = 0; i < list.length; i++) {
        const win = list.filter((t) => t.ts >= list[i].ts && t.ts <= list[i].ts + hours * 3600000);
        if (win.length >= count) win.forEach((t) => add(t, `Velocity — ${win.length} txns in ${hours}h`, 30));
      }
    }
  }

  return [...alerts.values()].sort((a, b) => b.score - a.score);
}

/* ---------------- UI ---------------- */

const fmt$ = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const fmtTs = (ms: number) => new Date(ms).toISOString().slice(0, 16).replace("T", " ");

function Num({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <label className="block">
      <span className="text-[11px] text-muted">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-line bg-background/60 px-2.5 py-1.5 font-mono text-xs text-ink"
      />
    </label>
  );
}

function Toggle({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <button
      onClick={() => set(!on)}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
        on ? "border-emerald-400/40 bg-emerald-400/5 text-ink" : "border-line bg-surface/40 text-muted"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className={`font-mono text-[10px] ${on ? "text-emerald-400" : "text-faint"}`}>{on ? "ON" : "off"}</span>
    </button>
  );
}

export default function DataLab() {
  const [seed, setSeed] = useState(42);
  const [rules, setRules] = useState<Rules>(DEFAULT_RULES);
  const [ran, setRan] = useState(false);

  const txns = useMemo(() => generate(seed), [seed]);
  const alerts = useMemo(() => (ran ? evaluate(txns, rules) : []), [ran, txns, rules]);

  const set = <K extends keyof Rules>(k: K, v: Partial<Rules[K]>) =>
    setRules((r) => ({ ...r, [k]: { ...r[k], ...v } }));

  const download = () => {
    const rows = [
      "date,customer,counterparty,type,amount,channel,rules,score",
      ...alerts.map((a) =>
        [
          fmtTs(a.txn.ts),
          a.txn.customer,
          a.txn.counterparty,
          a.txn.type,
          a.txn.amount.toFixed(2),
          a.txn.channel,
          `"${a.reasons.join("; ")}"`,
          a.score,
        ].join(",")
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `aml-alerts-seed${seed}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const typologyHits = alerts.reduce((m, a) => {
    for (const r of a.reasons) m[r.split(" — ")[0]] = (m[r.split(" — ")[0]] ?? 0) + 1;
    return m;
  }, {} as Record<string, number>);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* rules panel */}
      <div className="space-y-3">
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Dataset</p>
          <p className="mt-1 text-xs leading-5 text-muted">
            {txns.length} synthetic transactions · 8 customers · 30 days · seed {seed}
          </p>
          <button
            onClick={() => { setSeed(Math.floor(Math.random() * 9999)); setRan(false); }}
            className="mt-3 w-full rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-emerald-400/40 hover:text-ink"
          >
            ↻ Regenerate dataset
          </button>
        </div>

        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Detection rules</p>
          <div className="space-y-2">
            <Toggle label="Structuring (sub-threshold deposits)" on={rules.structuring.on} set={(v) => set("structuring", { on: v })} />
            {rules.structuring.on && (
              <div className="grid grid-cols-3 gap-2 pl-1">
                <Num label="Threshold $" value={rules.structuring.threshold} onChange={(v) => set("structuring", { threshold: v })} min={1000} max={50000} step={1000} />
                <Num label="# in window" value={rules.structuring.count} onChange={(v) => set("structuring", { count: v })} min={2} max={10} step={1} />
                <Num label="Days" value={rules.structuring.windowDays} onChange={(v) => set("structuring", { windowDays: v })} min={1} max={30} step={1} />
              </div>
            )}
            <Toggle label="Velocity (txns per window)" on={rules.velocity.on} set={(v) => set("velocity", { on: v })} />
            {rules.velocity.on && (
              <div className="grid grid-cols-2 gap-2 pl-1">
                <Num label="# txns" value={rules.velocity.count} onChange={(v) => set("velocity", { count: v })} min={3} max={30} step={1} />
                <Num label="Hours" value={rules.velocity.hours} onChange={(v) => set("velocity", { hours: v })} min={1} max={168} step={1} />
              </div>
            )}
            <Toggle label="Large amount" on={rules.largeAmount.on} set={(v) => set("largeAmount", { on: v })} />
            {rules.largeAmount.on && (
              <div className="pl-1"><Num label="Min $" value={rules.largeAmount.min} onChange={(v) => set("largeAmount", { min: v })} min={1000} max={200000} step={1000} /></div>
            )}
            <Toggle label="Round-amount layering" on={rules.roundAmount.on} set={(v) => set("roundAmount", { on: v })} />
            {rules.roundAmount.on && (
              <div className="pl-1"><Num label="Min $" value={rules.roundAmount.min} onChange={(v) => set("roundAmount", { min: v })} min={1000} max={100000} step={1000} /></div>
            )}
            <Toggle label="New counterparty" on={rules.newCounterparty.on} set={(v) => set("newCounterparty", { on: v })} />
          </div>
        </div>

        <button
          onClick={() => setRan(true)}
          className="w-full rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
        >
          ▶ Run monitoring rules
        </button>
      </div>

      {/* results */}
      <div className="min-w-0">
        {!ran ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted">
            Configure rules and run the monitor to see alerts
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { l: "Alerts", v: alerts.length, c: "text-ink" },
                { l: "Transactions scanned", v: txns.length, c: "text-ink" },
                { l: "Alert rate", v: `${((alerts.length / txns.length) * 100).toFixed(1)}%`, c: alerts.length / txns.length > 0.15 ? "text-amber-400" : "text-emerald-400" },
                { l: "Top rule", v: Object.keys(typologyHits)[0]?.split(" ")[0] ?? "—", c: "text-ink" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-line bg-surface/60 p-3.5">
                  <div className={`font-mono text-xl font-bold ${s.c}`}>{s.v}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{s.l}</div>
                </div>
              ))}
            </div>

            {Object.keys(typologyHits).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Object.entries(typologyHits).map(([r, n]) => (
                  <span key={r} className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11px] text-muted">
                    {r}: <span className="font-semibold text-ink">{n}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-2/60 text-left text-[10px] uppercase tracking-wide text-muted">
                    <th className="px-3 py-2.5 font-medium">Date</th>
                    <th className="px-3 py-2.5 font-medium">Customer</th>
                    <th className="hidden px-3 py-2.5 font-medium md:table-cell">Counterparty</th>
                    <th className="px-3 py-2.5 text-right font-medium">Amount</th>
                    <th className="hidden px-3 py-2.5 font-medium lg:table-cell">Rules hit</th>
                    <th className="px-3 py-2.5 text-right font-medium">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {alerts.slice(0, 40).map((a) => (
                    <tr key={a.txn.id} className="hover:bg-surface-2/40">
                      <td className="px-3 py-2 font-mono text-muted">{fmtTs(a.txn.ts)}</td>
                      <td className="px-3 py-2 font-medium text-ink">{a.txn.customer}</td>
                      <td className="hidden px-3 py-2 text-muted md:table-cell">{a.txn.counterparty}</td>
                      <td className="px-3 py-2 text-right font-mono text-ink">{fmt$(a.txn.amount)}</td>
                      <td className="hidden px-3 py-2 text-muted lg:table-cell">{a.reasons.join(" · ")}</td>
                      <td className={`px-3 py-2 text-right font-mono font-bold ${a.score >= 60 ? "text-red-400" : a.score >= 35 ? "text-amber-400" : "text-sky-400"}`}>
                        {a.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {alerts.length > 40 && (
              <p className="mt-2 text-[11px] text-faint">Showing top 40 of {alerts.length} alerts by score — download CSV for all.</p>
            )}
            <div className="mt-4 flex gap-3">
              <button onClick={download} className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:border-emerald-400/40 hover:text-ink">
                ↓ Download alerts CSV
              </button>
              <button onClick={() => setRan(false)} className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink">
                ← Back to rules
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
