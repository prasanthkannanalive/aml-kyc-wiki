"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Animated TM pipeline: transaction → rule → alert → analyst → disposition.
// A pulse travels the track while stages light up in sequence, looping.

const STAGES = [
  { n: "1", label: "Transaction" },
  { n: "2", label: "Rule hit" },
  { n: "3", label: "Alert queue" },
  { n: "4", label: "Analyst" },
  { n: "5", label: "SAR / close" },
] as const;

const STEP_MS = 750;
const TRACK_MS = STAGES.length * STEP_MS;

export default function TmFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), STEP_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-center px-4">
      {/* track */}
      <div className="relative">
        <div className="absolute left-[6%] right-[6%] top-[13px] h-px bg-line" />
        {/* completed portion */}
        <motion.div
          className="absolute left-[6%] top-[13px] h-px bg-emerald-400"
          animate={{ width: `${(active / (STAGES.length - 1)) * 88}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* travelling pulse */}
        <motion.div
          className="absolute top-[9px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_2px_rgba(52,211,153,0.55)]"
          animate={{ left: ["6%", "94%"] }}
          transition={{ duration: TRACK_MS / 1000, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative flex justify-between">
          {STAGES.map((s, i) => {
            const on = i <= active;
            const isActive = i === active;
            return (
              <div key={s.n} className="flex flex-col items-center">
                <motion.div
                  animate={
                    isActive
                      ? { scale: [1, 1.25, 1], borderColor: "#34d399" }
                      : { scale: 1, borderColor: on ? "#34d399" : "var(--line)" }
                  }
                  transition={isActive ? { duration: 0.7, repeat: Infinity } : { duration: 0.3 }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold"
                  style={{
                    borderColor: on ? "#34d399" : "var(--line)",
                    background: isActive ? "rgba(52,211,153,0.18)" : "var(--surface)",
                    color: on ? "#6ee7b7" : "var(--faint)",
                  }}
                >
                  {s.n}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      {/* labels */}
      <div className="mt-2 flex justify-between px-1">
        {STAGES.map((s, i) => (
          <span
            key={s.n}
            className={`w-[19%] text-center text-[9px] leading-3 transition-colors duration-300 ${
              i <= active ? "text-emerald-300" : "text-faint"
            }`}
          >
            {s.label}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center text-[9px] text-faint">
        {STAGES[active].label} → next stage
      </p>
    </div>
  );
}
