"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/*
 * Hop explorer — a mock of the Reactor/Forensics-style trace panel:
 * address cards connected hop by hop, each with amount, time, cluster tag
 * and risk. "Play trace" lights the trail up sequentially like analysts
 * follow funds through the graph.
 */

interface Hop {
  addr: string;
  name: string;
  kind: "customer" | "exchange" | "unhosted" | "mixer" | "sanctioned";
  amount: string;
  time: string;
  conf: string;
  cluster: string;
  risk: "low" | "med" | "high" | "crit";
  detail: string;
}

const TRAIL: Hop[] = [
  {
    addr: "bc1q…x0wl",
    name: "Customer wallet",
    kind: "customer",
    amount: "42.0 BTC in",
    time: "Day 1 · 09:14",
    conf: "214 confs",
    cluster: "KYC'd — acct 4471",
    risk: "low",
    detail: "Deposit wallet tied to the verified customer. Funded by 9 structured cash deposits totalling $87,400.",
  },
  {
    addr: "1A1z…PpE",
    name: "Exchange hot wallet",
    kind: "exchange",
    amount: "38.0 BTC",
    time: "Day 1 · 11:02",
    conf: "211 confs",
    cluster: "Licensed VASP — exchange",
    risk: "low",
    detail: "Sweep to a known exchange hot wallet. Counterparty is a regulated VASP — Travel Rule data available.",
  },
  {
    addr: "bc1q…k9d",
    name: "Unhosted wallet A",
    kind: "unhosted",
    amount: "36.5 BTC",
    time: "Day 2 · 03:47",
    conf: "189 confs",
    cluster: "No VASP — self-custody",
    risk: "med",
    detail: "Withdrawal to an unhosted wallet — no Travel Rule counterparty exists. Treat as EDD trigger per FATF guidance.",
  },
  {
    addr: "sin…bad",
    name: "Sinbad mixer pool",
    kind: "mixer",
    amount: "31.0 BTC",
    time: "Day 3 · 22:18",
    conf: "96 confs",
    cluster: "Mixer · sanctioned-adjacent",
    risk: "high",
    detail: "Funds enter the Sinbad mixing pool — outputs are deliberately obfuscated. Any residual traceability is gone after this hop.",
  },
  {
    addr: "sanc…ofac",
    name: "OFAC-listed entity",
    kind: "sanctioned",
    amount: "12.0 BTC",
    time: "Day 5 · 14:55",
    conf: "44 confs",
    cluster: "OFAC SDN match",
    risk: "crit",
    detail: "Cluster attribution links 12 BTC to an OFAC-sanctioned entity. This single hop converts the case from 'suspicious' to 'reportable'.",
  },
];

const KIND_CLS: Record<Hop["kind"], { node: string; chip: string }> = {
  customer: { node: "border-sky-400/50 text-sky-300", chip: "bg-sky-400/10 text-sky-300" },
  exchange: { node: "border-emerald-400/50 text-emerald-300", chip: "bg-emerald-400/10 text-emerald-300" },
  unhosted: { node: "border-amber-400/50 text-amber-300", chip: "bg-amber-400/10 text-amber-300" },
  mixer: { node: "border-orange-400/50 text-orange-300", chip: "bg-orange-400/10 text-orange-300" },
  sanctioned: { node: "border-red-400/60 text-red-300", chip: "bg-red-400/10 text-red-300" },
};

export default function HopExplorer() {
  const [lit, setLit] = useState(0); // how many hops revealed
  const [playing, setPlaying] = useState(false);
  const [sel, setSel] = useState(0);

  const play = () => {
    setPlaying(true);
    setLit(1);
    setSel(0);
    let i = 1;
    const iv = setInterval(() => {
      i += 1;
      setLit(i);
      setSel(i - 1);
      if (i >= TRAIL.length) {
        clearInterval(iv);
        setPlaying(false);
      }
    }, 1100);
  };

  useEffect(() => () => {}, []);

  const hop = TRAIL[Math.min(sel, TRAIL.length - 1)];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
      {/* panel header — like a tool window */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 bg-surface/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-xs font-medium text-muted">investigation · case 4471</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-md bg-surface-2 px-2 py-1 font-mono text-[10px] text-muted sm:block">
            subject: bc1q…x0wl
          </span>
          <button
            onClick={play}
            disabled={playing}
            className="rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
          >
            {playing ? "Tracing…" : lit >= TRAIL.length ? "↻ Replay trace" : "▶ Trace funds"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px]">
        {/* hop chain */}
        <div className="relative overflow-x-auto p-5">
          <div className="flex min-w-[640px] items-stretch">
            {TRAIL.map((h, i) => {
              const on = i < lit;
              const isSel = sel === i;
              const cls = KIND_CLS[h.kind];
              return (
                <div key={h.addr} className="flex flex-1 items-center last:flex-none">
                  <motion.button
                    onClick={() => { setSel(i); if (i >= lit) setLit(i + 1); }}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.35, scale: isSel ? 1.03 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full rounded-xl border bg-surface-2/70 p-3 text-left transition-colors ${cls.node} ${
                      isSel ? "border-current shadow-[0_0_18px_-4px_currentColor]" : "border-line"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[11px] font-bold">{h.addr}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${cls.chip}`}>
                        {h.kind}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-[11px] font-medium text-ink">{h.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] text-muted">{h.amount}</div>
                  </motion.button>
                  {i < TRAIL.length - 1 && (
                    <div className="relative mx-1 flex w-8 shrink-0 items-center">
                      <svg width="32" height="12" viewBox="0 0 32 12" className="overflow-visible">
                        <motion.line
                          x1="0" y1="6" x2="32" y2="6"
                          stroke={on && i + 1 < lit ? "#34d399" : "#3f3f46"}
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          initial={false}
                          animate={on && i + 1 < lit ? { strokeDashoffset: [0, -14] } : {}}
                          transition={on && i + 1 < lit ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                        />
                        <path d="M28 2 L32 6 L28 10" fill="none" stroke={on && i + 1 < lit ? "#34d399" : "#3f3f46"} strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* hop meta strip */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Amount", hop.amount],
              ["Time", hop.time],
              ["Confirmations", hop.conf],
              ["Cluster", hop.cluster],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-surface-2/40 px-3 py-2">
                <div className="text-[9px] font-semibold uppercase tracking-wide text-faint">{k}</div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-ink" title={v}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* detail panel */}
        <div className="border-t border-line/70 bg-surface/30 p-4 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={hop.addr}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-sm font-bold text-ink">{hop.addr}</h4>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${KIND_CLS[hop.kind].chip}`}>
                  {hop.risk} risk
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-muted">{hop.name}</p>
              <p className="mt-2 text-xs leading-5 text-body">{hop.detail}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 rounded-lg border border-line bg-surface-2/40 p-3">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-faint">Analyst note</div>
            <p className="mt-1 text-[11px] leading-4 text-muted">
              {sel === TRAIL.length - 1
                ? "Case meets SAR threshold — draft narrative and file within deadline."
                : "Follow the trail forward — each hop either clears or deepens the risk picture."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
