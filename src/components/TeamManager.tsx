"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeamManager() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const post = async (body: Record<string, string>) => {
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!d.ok) {
        setErr(d.error === "not-found" ? "No team with that code." : "Something went wrong.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <p className="text-sm font-semibold text-ink">Create a team</p>
        <p className="mt-1 text-xs text-muted">Get a shareable 6-character code your cohort joins with.</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team name (optional)"
          maxLength={60}
          className="mt-3 w-full rounded-lg border border-line bg-background/60 px-3 py-2 text-sm text-ink placeholder:text-faint"
        />
        <button
          disabled={busy}
          onClick={() => post({ action: "create", name })}
          className="mt-3 w-full rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300 disabled:opacity-40"
        >
          Create team
        </button>
      </div>
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <p className="text-sm font-semibold text-ink">Join with a code</p>
        <p className="mt-1 text-xs text-muted">Enter the code a teammate shared with you.</p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. K7M2QX"
          maxLength={6}
          className="mt-3 w-full rounded-lg border border-line bg-background/60 px-3 py-2 font-mono text-sm tracking-widest text-ink placeholder:text-faint"
        />
        <button
          disabled={busy || code.length < 6}
          onClick={() => post({ action: "join", code })}
          className="mt-3 w-full rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/20 disabled:opacity-40"
        >
          Join team
        </button>
      </div>
      {err && <p className="text-xs text-red-400 sm:col-span-2">{err}</p>}
    </div>
  );
}
