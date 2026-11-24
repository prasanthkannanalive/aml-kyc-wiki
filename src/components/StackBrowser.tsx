"use client";

import { useMemo, useState, type ReactNode } from "react";
import { VENDORS, LAYERS, type StackLayer } from "@/lib/compliance-stack";

const FILTERS: (StackLayer | "all")[] = ["all", "analytics", "kyc", "workflow"];

/* ---------- mock product panels — stylised "screenshots" of each tool ---------- */

function MockChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-zinc-950/60">
      <div className="flex items-center gap-1.5 border-b border-line/60 bg-surface-2/60 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 truncate text-[9px] font-medium text-faint">{title}</span>
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

function AnalyticsMock({ variant }: { variant: number }) {
  if (variant === 0) {
    // node-graph investigation view
    return (
      <MockChrome title="investigation · cluster view">
        <svg viewBox="0 0 220 84" className="w-full">
          <line x1="40" y1="42" x2="95" y2="20" stroke="#3f3f46" strokeWidth="1" />
          <line x1="40" y1="42" x2="95" y2="64" stroke="#3f3f46" strokeWidth="1" />
          <line x1="95" y1="20" x2="160" y2="30" stroke="#34d39988" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="95" y1="64" x2="160" y2="58" stroke="#fbbf2488" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="40" cy="42" r="10" fill="#0c1a2e" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="95" cy="20" r="8" fill="#0c1a14" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="95" cy="64" r="8" fill="#1c1206" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="160" cy="30" r="9" fill="#1c0f16" stroke="#fb7185" strokeWidth="1.5" />
          <circle cx="160" cy="58" r="7" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
          <text x="40" y="45" textAnchor="middle" fontSize="7" fill="#7dd3fc">W</text>
          <text x="95" y="23" textAnchor="middle" fontSize="7" fill="#6ee7b7">EX</text>
          <text x="95" y="67" textAnchor="middle" fontSize="7" fill="#fcd34d">MX</text>
          <text x="160" y="33" textAnchor="middle" fontSize="7" fill="#fda4af">OF</text>
          <text x="160" y="61" textAnchor="middle" fontSize="7" fill="#a5b4fc">?</text>
          <rect x="176" y="14" width="40" height="12" rx="3" fill="#7f1d1d55" stroke="#f87171" strokeWidth="0.8" />
          <text x="196" y="22" textAnchor="middle" fontSize="7" fill="#fca5a5">HIGH</text>
        </svg>
      </MockChrome>
    );
  }
  if (variant === 1) {
    // exposure breakdown bars
    return (
      <MockChrome title="wallet risk · exposure">
        <div className="space-y-1.5">
          {[
            ["Mixer", 34, "bg-orange-400"],
            ["Darknet", 12, "bg-red-400"],
            ["Sanctions", 4, "bg-amber-400"],
            ["Exchange", 61, "bg-sky-400"],
          ].map(([l, w, c]) => (
            <div key={l as string} className="flex items-center gap-2">
              <span className="w-14 text-[8px] text-faint">{l}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div className={`h-full rounded-full ${c}`} style={{ width: `${w}%` }} />
              </div>
              <span className="w-6 text-right font-mono text-[8px] text-muted">{w}%</span>
            </div>
          ))}
          <div className="mt-1 flex justify-between text-[8px] text-faint">
            <span>score 87</span><span className="text-red-300">HIGH</span>
          </div>
        </div>
      </MockChrome>
    );
  }
  // alert feed rows
  return (
    <MockChrome title="alert feed · enriched">
      <div className="space-y-1">
        {[
          ["Velocity × structuring", "HIGH", "text-red-300"],
          ["Mixer exposure +14%", "MED", "text-amber-300"],
          ["Sanctions cluster hit", "CRIT", "text-red-400"],
        ].map(([t, s, c]) => (
          <div key={t} className="flex items-center justify-between rounded bg-surface-2/60 px-2 py-1">
            <span className="truncate text-[8px] text-ink">{t}</span>
            <span className={`text-[8px] font-bold ${c}`}>{s}</span>
          </div>
        ))}
      </div>
    </MockChrome>
  );
}

function KycMock({ variant }: { variant: number }) {
  if (variant === 0) {
    // ID verification card
    return (
      <MockChrome title="id verification">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2.5 14c.8-2.5 3-4 5.5-4s4.7 1.5 5.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[9px] font-medium text-ink">J. Doe — passport verified</div>
            <div className="text-[8px] text-emerald-300">✓ document · ✓ liveness · ✓ watchlist clear</div>
          </div>
          <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[8px] font-bold text-emerald-300">PASS</span>
        </div>
      </MockChrome>
    );
  }
  if (variant === 1) {
    // screening results table
    return (
      <MockChrome title="screening results">
        <div className="space-y-1">
          {[
            ["PEP — domestic", "CLEAR", "text-emerald-300"],
            ["Sanctions (OFAC/EU)", "1 POTENTIAL", "text-amber-300"],
            ["Adverse media", "2 HITS", "text-orange-300"],
          ].map(([t, s, c]) => (
            <div key={t} className="flex items-center justify-between rounded bg-surface-2/60 px-2 py-1">
              <span className="text-[8px] text-ink">{t}</span>
              <span className={`text-[8px] font-bold ${c}`}>{s}</span>
            </div>
          ))}
        </div>
      </MockChrome>
    );
  }
  // onboarding funnel
  return (
    <MockChrome title="kyc journey">
      <div className="flex items-center gap-1">
        {["ID doc", "Selfie", "PEP", "EDD?"].map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1">
            <div className={`h-5 w-full rounded ${i < 2 ? "bg-emerald-400/30" : i === 2 ? "bg-amber-400/30" : "bg-surface-2"}`} />
            <span className="text-[7px] text-faint">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 text-center text-[8px] text-muted">EDD triggered — PEP match requires source-of-wealth</div>
    </MockChrome>
  );
}

function WorkflowMock({ variant }: { variant: number }) {
  if (variant === 0) {
    // alert queue
    return (
      <MockChrome title="alert queue">
        <div className="space-y-1">
          {[
            ["#4471 structuring", "HIGH", "bg-red-400/20 text-red-300"],
            ["#4472 velocity", "MED", "bg-amber-400/20 text-amber-300"],
            ["#4473 round-amount", "LOW", "bg-sky-400/20 text-sky-300"],
          ].map(([t, s, c]) => (
            <div key={t} className="flex items-center justify-between rounded bg-surface-2/60 px-2 py-1">
              <span className="text-[8px] text-ink">{t}</span>
              <span className={`rounded px-1 text-[7px] font-bold ${c}`}>{s}</span>
            </div>
          ))}
        </div>
      </MockChrome>
    );
  }
  if (variant === 1) {
    // SAR document
    return (
      <MockChrome title="sar draft · fincen">
        <div className="space-y-1">
          <div className="h-1.5 w-3/4 rounded bg-surface-2" />
          <div className="h-1.5 w-full rounded bg-surface-2" />
          <div className="h-1.5 w-5/6 rounded bg-surface-2" />
          <div className="h-1.5 w-2/3 rounded bg-emerald-400/30" />
          <div className="flex justify-between pt-0.5 text-[8px]">
            <span className="text-faint">narrative auto-fill</span>
            <span className="font-bold text-emerald-300">DUE 22d</span>
          </div>
        </div>
      </MockChrome>
    );
  }
  // case timeline
  return (
    <MockChrome title="case file · timeline">
      <div className="flex items-end gap-1">
        {[40, 65, 30, 80, 55, 90].map((h, i) => (
          <div key={i} className="flex-1">
            <div className={`w-full rounded-sm ${i === 5 ? "bg-red-400/70" : "bg-emerald-400/40"}`} style={{ height: `${h * 0.5}px` }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[7px] text-faint">
        <span>day 1</span><span>day 6</span>
      </div>
    </MockChrome>
  );
}

function VendorMock({ layer, name }: { layer: StackLayer; name: string }) {
  const variant = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 3;
  if (layer === "analytics") return <AnalyticsMock variant={variant} />;
  if (layer === "kyc") return <KycMock variant={variant} />;
  return <WorkflowMock variant={variant} />;
}

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
            const dot =
              f === "analytics" ? "bg-sky-400" : f === "kyc" ? "bg-violet-400" : f === "workflow" ? "bg-emerald-400" : "bg-zinc-400";
            return (
              <button
                key={f}
                onClick={() => setLayer(f)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                    : "border-line text-muted hover:border-emerald-400/40 hover:text-ink"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
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
              <div className="mt-3">
                <VendorMock layer={v.layer} name={v.name} />
              </div>
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
