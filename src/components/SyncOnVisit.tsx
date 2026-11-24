"use client";

import { useEffect } from "react";

// Pushes localStorage achievement signals (exam, simulations, arcade) to the
// signed-in account on every profile visit — idempotent merge, so redirect
// logins (Logto/Google) that bypass AuthForm still sync progress.

const FLAG = "aml-sync-on-visit";

export default function SyncOnVisit() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(FLAG)) return;
      sessionStorage.setItem(FLAG, "1");
    } catch {
      return;
    }
    try {
      const exam = localStorage.getItem("aml-kyc-final-exam:kyc-cdd-tm-analyst") === "passed";
      const sims: Record<string, number> = {};
      try {
        const raw = localStorage.getItem("aml-sim-v1");
        if (raw) Object.assign(sims, (JSON.parse(raw) as { done?: Record<string, number> }).done ?? {});
      } catch {}
      let arcade: { streak: number; games: number } | undefined;
      try {
        const raw = localStorage.getItem("aml-arcade-v1");
        if (raw) {
          const a = JSON.parse(raw) as { done?: Record<string, number>; streak?: number };
          arcade = { streak: a.streak ?? 0, games: Object.keys(a.done ?? {}).length };
        }
      } catch {}
      if (!exam && !Object.keys(sims).length && !arcade) return;
      fetch("/api/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, sims, arcade }),
      }).catch(() => {});
    } catch {}
  }, []);
  return null;
}
