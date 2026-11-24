"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CHAPTER_SCENARIOS } from "@/lib/chapter-scenarios";

type Variant = "flow" | "cycle" | "chain" | "branch" | "funnel" | "timeline" | "matrix" | "alert";

const RULES: [Variant, RegExp][] = [
  ["cycle", /lifecycle|cycle|perpet|refresh|loop|round|iteration|journey/i],
  ["chain", /ownership|ubo|entit|structur|trust|nominee|network|counterpart|chain|holding|layer|corporate|registry|arrangement/i],
  ["branch", /escalat|decision|alert|triage|disposition|referral|exception|override|committee|outcome|regime|compar|jurisdiction|liabilit|approv|gate/i],
  ["funnel", /threshold|funnel|pyramid|scale|rank|priority|tuning|coverage|filter/i],
  ["timeline", /deadline|timeline|roadmap|history|phase|implementation|day|dates|evolution|playbook|stage/i],
  ["matrix", /governance|framework|regulation|legal|compliance|responsibilit|lines|program|policy|overview|introduc|guide|institutional|standard|obligation|requirement|accredit|curriculum|metric/i],
  ["alert", /fraud|detect|monitor|red flag|indicator|signal|typolog|smurf|mule|scam|deepfake|screen|match|identit|verif|investigat|osint|evidence|behaviour|behavior|analytics|model|device|authenticat|biometric/i],
];

export function pickVariant(text: string): Variant {
  for (const [v, re] of RULES) if (re.test(text)) return v;
  return "flow";
}

export const ACCENT: Record<Variant, string> = {
  flow: "#34d399",
  cycle: "#38bdf8",
  chain: "#a78bfa",
  branch: "#f59e0b",
  funnel: "#f472b6",
  timeline: "#22d3ee",
  matrix: "#4ade80",
  alert: "#fb7185",
};

/* ------------------------- mini diagrams ------------------------- */

function Box({ children, accent, className = "" }: { children: React.ReactNode; accent: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border px-2 py-1 text-[9px] font-semibold ${className}`}
      style={{ borderColor: `${accent}66`, background: `${accent}14`, color: accent }}
    >
      {children}
    </div>
  );
}

function FlowDiagram({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-1.5 px-3">
      {["Input", "Check", "Outcome"].map((l, i) => (
        <div key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <motion.div
              className="h-px w-4"
              style={{ background: accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.5, duration: 0.4 }}
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5, duration: 0.35 }}
          >
            <Box accent={accent}>{l}</Box>
          </motion.div>
        </div>
      ))}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        animate={{ left: ["16%", "82%", "16%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CycleDiagram({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <ellipse cx="100" cy="50" rx="80" ry="30" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <motion.path
          d="M 100 20 A 80 30 0 1 1 99.9 20"
          fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.85, 1] }}
        />
      </svg>
      {["Step 1", "Step 2", "Step 3"].map((l, i) => {
        const angle = ((i * 120 - 90) * Math.PI) / 180;
        const x = 50 + 38 * Math.cos(angle);
        const y = 50 + 16 * Math.sin(angle);
        return (
          <motion.div
            key={l}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.3, duration: 0.4 }}
          >
            <Box accent={accent}>{l}</Box>
          </motion.div>
        );
      })}
    </div>
  );
}

function ChainDiagram({ accent }: { accent: string }) {
  const nodes: [string, string][] = [["Entity", ""], ["HoldCo", "80%"], ["Person", "64%"]];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      {nodes.map(([l, pct], i) => (
        <div key={l} className="flex flex-col items-center">
          {i > 0 && (
            <motion.div
              className="h-2 w-px"
              style={{ background: accent }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.4, duration: 0.3 }}
            />
          )}
          <motion.div
            initial={{ opacity: 0, x: i % 2 ? 8 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.35 }}
          >
            <Box accent={accent} className={i === nodes.length - 1 ? "border-dashed" : ""}>
              {l}
              {pct && <span className="ml-1 opacity-70">{pct}</span>}
            </Box>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function BranchDiagram({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <Box accent={accent}>Decision</Box>
      </motion.div>
      <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <motion.path
          d="M100 18 L40 68 M100 18 L160 68"
          fill="none" stroke={accent} strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
      <motion.div className="absolute left-[6%] top-[64%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <Box accent="#34d399">Approve</Box>
      </motion.div>
      <motion.div className="absolute right-[6%] top-[64%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <Box accent="#fb7185">Escalate</Box>
      </motion.div>
    </div>
  );
}

function FunnelDiagram({ accent }: { accent: string }) {
  const rows: [string, string][] = [
    ["88%", "All"],
    ["62%", "Filtered"],
    ["38%", "Action"],
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
      {rows.map(([w, label], i) => (
        <motion.div
          key={label}
          className="flex h-6 items-center justify-center rounded-sm border text-[9px] font-semibold"
          style={{ width: w, borderColor: `${accent}66`, background: `${accent}${14 + i * 8}`, color: accent }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: i * 0.35, duration: 0.4 }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

function TimelineDiagram({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6">
      <div className="absolute h-px w-4/5 bg-line" />
      {["T-30", "T-7", "Due"].map((l, i) => (
        <div key={l} className="absolute flex flex-col items-center" style={{ left: `${16 + i * 34}%` }}>
          <motion.div
            className="h-2.5 w-2.5 rounded-full border-2"
            style={{ borderColor: accent, background: "var(--background)" }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5 }}
          />
          <motion.span
            className="mt-2 text-[9px] font-semibold"
            style={{ color: accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.4 }}
          >
            {l}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function MatrixDiagram({ accent }: { accent: string }) {
  const [hi, setHi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHi((x) => (x + 1) % 4), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid h-full w-full grid-cols-2 gap-1.5 p-4">
      {["A", "B", "C", "D"].map((c, i) => (
        <motion.div
          key={c}
          className="flex items-center justify-center rounded-md border text-[10px] font-bold"
          style={{
            borderColor: i === hi ? accent : "var(--line)",
            background: i === hi ? `${accent}22` : "var(--surface)",
            color: i === hi ? accent : "var(--faint)",
          }}
          animate={i === hi ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.2 }}
        >
          {c}
        </motion.div>
      ))}
    </div>
  );
}

function AlertDiagram({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-10 w-10 rounded-full border"
          style={{ borderColor: accent }}
          animate={{ scale: [0.6, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.66 }}
        />
      ))}
      <motion.div
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-black"
        style={{ borderColor: accent, color: accent, background: `${accent}18` }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        !
      </motion.div>
    </div>
  );
}

export const DIAGRAMS: Record<Variant, (p: { accent: string }) => React.ReactNode> = {
  flow: FlowDiagram,
  cycle: CycleDiagram,
  chain: ChainDiagram,
  branch: BranchDiagram,
  funnel: FunnelDiagram,
  timeline: TimelineDiagram,
  matrix: MatrixDiagram,
  alert: AlertDiagram,
};

/* --------------------------- card --------------------------- */

export default function ChapterScenario({
  slug,
  num,
  title,
}: {
  slug: string;
  num: string;
  title: string;
}) {
  const scenario = CHAPTER_SCENARIOS[`${slug}/${num}`];
  if (!scenario) return null;
  const variant = pickVariant(`${title} ${scenario}`);
  const accent = ACCENT[variant];
  const Diagram = DIAGRAMS[variant];

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface to-surface/40">
      <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5">
        <span className="rounded bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
          Scenario
        </span>
        <span className="text-[11px] text-faint">visual map</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_220px]">
        <div className="flex items-center px-4 py-4">
          <p className="text-sm leading-6 text-ink">{scenario}</p>
        </div>
        <div className="relative flex h-36 items-center justify-center overflow-hidden border-t border-line/60 bg-background/50 sm:border-l sm:border-t-0">
          <Diagram accent={accent} />
        </div>
      </div>
    </div>
  );
}
