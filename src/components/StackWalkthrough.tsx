"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

/*
 * Guided walkthrough — a mock of the compliance-stack workflow:
 * menu on the left (Screening → Alert → Investigation → SAR filing),
 * each step animates the "traverse of results" the way real tools do.
 */

const STEPS = [
  { id: "screen", label: "1 · Wallet screening", icon: "⌕" },
  { id: "alert", label: "2 · Alert enrichment", icon: "⚠" },
  { id: "investigate", label: "3 · Investigation", icon: "⑂" },
  { id: "report", label: "4 · SAR filing", icon: "✎" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

const WALLET = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

const SCREEN_RESULTS = [
  { cat: "Mixer exposure", pct: 14, vendor: "Chainalysis", cls: "text-red-300", bar: "bg-red-400" },
  { cat: "Darknet market", pct: 6, vendor: "TRM Labs", cls: "text-red-300", bar: "bg-red-400/80" },
  { cat: "Sanctions-adjacent cluster", pct: 4, vendor: "Elliptic", cls: "text-amber-300", bar: "bg-amber-400" },
  { cat: "Exchange (licensed VASP)", pct: 61, vendor: "All vendors", cls: "text-sky-300", bar: "bg-sky-400" },
  { cat: "Unattributed / unknown", pct: 15, vendor: "—", cls: "text-muted", bar: "bg-surface-2" },
];

const ALERT_FACTS = [
  { k: "Rule hit", v: "Velocity × structuring — 9 deposits, all < CTR line" },
  { k: "Enriched by", v: "Chainalysis KYT + TRM alert feed" },
  { k: "Counterparty", v: "Wallet bc1q…x0wl → cluster tagged 'mixer·Sinbad'" },
  { k: "Severity", v: "HIGH — auto-escalated to senior analyst" },
];

// investigation graph: hops from customer wallet to sanctioned entity
const HOPS = [
  { from: "Customer wallet", to: "Exchange hot wallet", label: "42 BTC · day 1", risk: "low" },
  { from: "Exchange hot wallet", to: "Unhosted wallet A", label: "38 BTC · day 2", risk: "med" },
  { from: "Unhosted wallet A", to: "Mixer pool (Sinbad)", label: "31 BTC · day 3", risk: "high" },
  { from: "Mixer pool", to: "OFAC-listed entity", label: "12 BTC · day 5", risk: "crit" },
];

const RISK_CLS: Record<string, string> = {
  low: "border-emerald-400/40 text-emerald-300",
  med: "border-amber-400/40 text-amber-300",
  high: "border-orange-400/40 text-orange-300",
  crit: "border-red-400/50 text-red-300",
};

const SAR_FIELDS = [
  { label: "Subject", value: "J. Doe — acct 4471, verified via Jumio IDV" },
  { label: "Activity", value: "9 structured cash deposits totalling $87,400 over 6 days" },
  { label: "On-chain trail", value: "42 BTC → mixer 'Sinbad' → OFAC-listed entity (12 BTC)" },
  { label: "Narrative", value: "Deposits kept below CTR threshold; proceeds moved through mixer to sanctioned counterparty — consistent with layering." },
  { label: "Filing", value: "FinCEN SAR via BSA E-Filing · due in 22 days" },
];

function Bar({ pct, cls, delay }: { pct: number; cls: string; delay: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        className={`h-full rounded-full ${cls}`}
      />
    </div>
  );
}

/* ---------- step 1: wallet screening ---------- */
function ScreeningStep({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  useEffect(() => {
    if (active && phase === "idle") {
      const t1 = setTimeout(() => {
        setPhase("running");
        setTimeout(() => setPhase("done"), 1600);
      }, 80);
      return () => clearTimeout(t1);
    }
  }, [active, phase]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">Screen address — all analytics vendors in parallel</div>
        <div className="mt-2 flex items-center gap-2">
          <code className="min-w-0 flex-1 truncate rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-ink">
            {WALLET}
          </code>
          <button
            onClick={() => { setPhase("running"); setTimeout(() => setPhase("done"), 1600); }}
            disabled={phase === "running"}
            className="shrink-0 rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
          >
            {phase === "running" ? "Screening…" : "Run screen"}
          </button>
        </div>
        <AnimatePresence>
          {phase === "running" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 space-y-1.5"
            >
              {["Chainalysis…", "TRM Labs…", "Elliptic…", "CipherTrace…"].map((v, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="flex items-center gap-2 text-xs text-muted"
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-emerald-400"
                  >●</motion.span>
                  Querying {v}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-400/30 bg-red-400/5 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wide text-red-300">Risk breakdown</div>
              <span className="rounded-full border border-red-400/40 bg-red-400/10 px-2 py-0.5 text-[10px] font-bold text-red-300">
                SCORE 87/100 — HIGH
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {SCREEN_RESULTS.map((r, i) => (
                <div key={r.cat}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-ink">{r.cat}</span>
                    <span className={`font-mono ${r.cls}`}>{r.pct}% · {r.vendor}</span>
                  </div>
                  <Bar pct={r.pct} cls={r.bar} delay={i * 0.12} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-5 text-muted">
              14% mixer + 6% darknet exposure crosses the auto-escalation threshold — an alert is
              generated in the transaction-monitoring queue.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- step 2: alert enrichment ---------- */
function AlertStep({ done }: { done: boolean }) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {done &&
          ALERT_FACTS.map((f, i) => (
            <motion.div
              key={f.k}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.25 }}
              className="flex items-start gap-3 rounded-xl border border-line bg-surface/60 p-4"
            >
              <span className="w-24 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-faint pt-0.5">
                {f.k}
              </span>
              <span className="text-sm text-ink">{f.v}</span>
            </motion.div>
          ))}
      </AnimatePresence>
      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm leading-6 text-body"
        >
          The TMS alert is now <span className="font-semibold text-amber-300">enriched</span> — instead
          of a bare &quot;9 deposits&quot; rule hit, the analyst sees the full context: which vendors flagged it,
          what the funds touched on-chain, and why it escalated. This is the difference between a
          30-second dismissal and a SAR.
        </motion.div>
      )}
    </div>
  );
}

/* ---------- step 3: investigation graph ---------- */
function InvestigateStep({ done }: { done: boolean }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">
          Money trail — hop by hop (Reactor / TRM Investigations view)
        </div>
        <div className="mt-3 space-y-0">
          {HOPS.map((h, i) => (
            <div key={i} className="relative flex items-stretch gap-3">
              {/* connector */}
              <div className="flex w-6 flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={done ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.5 }}
                  className={`h-3 w-3 rounded-full border-2 ${
                    h.risk === "crit"
                      ? "border-red-400 bg-red-400/30"
                      : h.risk === "high"
                        ? "border-orange-400 bg-orange-400/30"
                        : h.risk === "med"
                          ? "border-amber-400 bg-amber-400/30"
                          : "border-emerald-400 bg-emerald-400/30"
                  }`}
                />
                {i < HOPS.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={done ? { scaleY: 1 } : {}}
                    transition={{ delay: i * 0.5 + 0.2, duration: 0.4 }}
                    className="w-px flex-1 bg-line"
                  />
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={done ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.5 + 0.1 }}
                className="mb-3 flex-1 rounded-lg border border-line bg-surface-2/60 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-ink">{h.from} → {h.to}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${RISK_CLS[h.risk]}`}>
                    {h.risk}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-muted">{h.label}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      {done && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-xs leading-5 text-red-200"
        >
          12 BTC traced into an <strong>OFAC-listed entity</strong> via the Sinbad mixer — the trail is
          now evidence-grade: timestamped hops, amounts, cluster attributions. This graph is what goes
          into the SAR attachments.
        </motion.p>
      )}
    </div>
  );
}

/* ---------- step 4: SAR filing ---------- */
function ReportStep({ done }: { done: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (done && !submitted) {
      const iv = setInterval(() => setFilled((f) => Math.min(SAR_FIELDS.length, f + 1)), 700);
      return () => clearInterval(iv);
    }
  }, [done, submitted]);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">
          SAR draft — auto-populated from the investigation
        </div>
        <div className="mt-3 space-y-2">
          {SAR_FIELDS.slice(0, filled).map((f) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-lg border border-line bg-surface-2/50 px-3 py-2"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">{f.label}</div>
              <div className="mt-0.5 text-xs leading-5 text-ink">{f.value}</div>
            </motion.div>
          ))}
          {filled < SAR_FIELDS.length && done && (
            <div className="flex items-center gap-2 px-1 text-xs text-muted">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="text-emerald-400">●</motion.span>
              Drafting field {filled + 1} of {SAR_FIELDS.length}…
            </div>
          )}
        </div>
        {filled >= SAR_FIELDS.length && !submitted && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSubmitted(true)}
            className="mt-3 w-full rounded-lg bg-emerald-400 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
          >
            Submit SAR to FinCEN BSA E-Filing
          </motion.button>
        )}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-center"
          >
            <div className="text-sm font-bold text-emerald-300">SAR filed ✓</div>
            <p className="mt-1 text-xs text-muted">
              Reference SAR-2025-04471 · filed within deadline · customer placed under enhanced monitoring
            </p>
          </motion.div>
        )}
      </div>
      <p className="text-[11px] leading-5 text-faint">
        In production this draft is written by the analyst inside the TMS case file — the tools supply
        the evidence, the human writes the narrative.{" "}
        <Link href="/resources" className="text-emerald-400 hover:underline">SAR narrative template →</Link>
      </p>
    </div>
  );
}

/* ---------- walkthrough shell ---------- */
export default function StackWalkthrough() {
  const [step, setStep] = useState<StepId>("screen");
  const [guided, setGuided] = useState(false);
  const idx = STEPS.findIndex((s) => s.id === step);

  // auto-advance in guided mode
  useEffect(() => {
    if (!guided) return;
    const t = setTimeout(() => {
      if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
      else setGuided(false);
    }, 5200);
    return () => clearTimeout(t);
  }, [guided, step, idx]);

  const stepDone = (id: StepId) => STEPS.findIndex((s) => s.id === id) < idx || (id === "screen" && step !== "screen");

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
      {/* top bar — looks like an app header */}
      <div className="flex items-center justify-between border-b border-line/70 bg-surface/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-xs font-medium text-muted">aml-kyc-wiki · stack walkthrough</span>
        </div>
        <button
          onClick={() => { setStep("screen"); setGuided(true); }}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            guided ? "bg-emerald-400/20 text-emerald-300" : "bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
          }`}
        >
          {guided ? "Guided ●" : "▶ Guided tour"}
        </button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr]">
        {/* sidebar menu */}
        <nav className="border-b border-line/70 bg-surface/30 p-3 md:border-b-0 md:border-r">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-faint">Compliance console</div>
          {STEPS.map((s) => {
            const active = step === s.id;
            const done = stepDone(s.id);
            return (
              <button
                key={s.id}
                onClick={() => { setStep(s.id); setGuided(false); }}
                className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-emerald-400/15 font-medium text-emerald-300"
                    : done
                      ? "text-muted hover:bg-surface-2/60 hover:text-ink"
                      : "text-faint hover:bg-surface-2/60 hover:text-muted"
                }`}
              >
                <span className={active ? "text-emerald-400" : done ? "text-emerald-500/60" : "text-faint"}>{s.icon}</span>
                {s.label}
                {done && !active && <span className="ml-auto text-[10px] text-emerald-500">✓</span>}
                {guided && active && <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity }} className="ml-auto text-emerald-400">●</motion.span>}
              </button>
            );
          })}
          <div className="mt-4 border-t border-line/60 px-2 pt-3 text-[10px] leading-4 text-faint">
            Simulated demo — no real data. Real stacks run Chainalysis/TRM/Elliptic feeds into the TMS.
          </div>
        </nav>

        {/* stage content */}
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {step === "screen" && <ScreeningStep active={true} />}
              {step === "alert" && <AlertStep done={true} />}
              {step === "investigate" && <InvestigateStep done={true} />}
              {step === "report" && <ReportStep done={true} />}
            </motion.div>
          </AnimatePresence>

          {/* step nav */}
          <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
            <button
              onClick={() => idx > 0 && setStep(STEPS[idx - 1].id)}
              disabled={idx === 0}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-emerald-400/40 hover:text-ink disabled:opacity-40"
            >
              ← Back
            </button>
            <span className="text-[11px] text-faint">Step {idx + 1} of {STEPS.length}</span>
            <button
              onClick={() => idx < STEPS.length - 1 && setStep(STEPS[idx + 1].id)}
              disabled={idx === STEPS.length - 1}
              className="rounded-lg bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/25 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
