"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-emerald-400/50 hover:text-ink"
    >
      {copied ? "Copied ✓" : "Copy"}
    </motion.button>
  );
}
