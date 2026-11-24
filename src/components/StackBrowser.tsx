"use client";

import { useMemo, useState } from "react";
import { VENDORS, LAYERS, type StackLayer } from "@/lib/compliance-stack";

const FILTERS: (StackLayer | "all")[] = ["all", "analytics", "kyc", "workflow"];

export default function StackBrowser() {
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState<StackLayer | "all">("all");

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return VENDORS.filter((v) => {
      if (layer !== "all" && v.layer !== layer) return false;
      if (!terms.length) return true;
      const hay = `${v.name} ${v.tagline} ${v.caps.join(" ")} ${v.seenIn ?? ""} ${v.cert ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, layer]);

  const layerMeta = (k: StackLayer) => LAYERS.find((l) => l.key === k)!;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search vendors — try 'mixers', 'PEP', 'CCCA'…"
          className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = layer === f;
            const meta = f === "all" ? null : layerMeta(f);
            return (
              <button
                key={f}
                onClick={() => setLayer(f)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                    : "border-line text-muted hover:border-emerald-400/40 hover:text-ink"
                }`}
              >
                {f === "all" ? `All · ${VENDORS.length}` : `${meta!.label} · ${VENDORS.filter((v) => v.layer === f).length}`}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-faint">
        {results.length} of {VENDORS.length} platforms
        {q && ` matching “${q}”`}
        {layer !== "all" && ` in ${layerMeta(layer).label}`}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((v) => {
          const meta = layerMeta(v.layer);
          return (
            <div
              key={v.name}
              id={`vendor-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="flex scroll-mt-24 flex-col rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-emerald-400/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-ink">{v.name}</h3>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.cls}`}>
                  {meta.label}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted">{v.tagline}</p>
              <ul className="mt-3 flex-1 space-y-1.5">
                {v.caps.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs leading-5 text-body">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    {c}
                  </li>
                ))}
              </ul>
              {v.cert && (
                <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5 text-[11px] leading-4 text-amber-200">
                  <span className="font-semibold">Cert:</span> {v.cert}
                </p>
              )}
              {v.seenIn && (
                <p className="mt-2 text-[11px] leading-4 text-faint">{v.seenIn}</p>
              )}
            </div>
          );
        })}
      </div>
      {results.length === 0 && (
        <p className="mt-6 rounded-xl border border-line bg-surface/50 p-6 text-sm text-muted">
          No vendors match — try a broader term like “screening” or “analytics”.
        </p>
      )}
    </div>
  );
}
