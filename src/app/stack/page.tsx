import type { Metadata } from "next";
import StackBrowser from "@/components/StackBrowser";
import StackWalkthrough from "@/components/StackWalkthrough";
import { SAR_PIPELINE, CERTIFICATIONS, LAYERS } from "@/lib/compliance-stack";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Compliance Stack Landscape — AML Vendors & Platforms",
  description:
    "The platforms crypto-compliance and financial-crime teams actually use — blockchain analytics (Chainalysis, TRM, Elliptic, CipherTrace), KYC/CDD screening vendors, certifications, and how they fit the SAR workflow.",
};
export const dynamic = "force-dynamic";

export default function StackPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Compliance Stack Landscape</h1>
      <p className="mt-3 max-w-3xl text-muted">
        The platforms analysts and compliance teams actually run on — which
        blockchain-analytics engines trace funds for SARs, which screening
        vendors handle KYC/EDD, and the certifications recruiters ask for in
        job descriptions.
      </p>
      <ViewTracker type="search" id="stack" />

      {/* guided walkthrough — mock console */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Guided walkthrough — screening to SAR</h2>
        <p className="mt-1 text-sm text-muted">
          A simulated compliance console: click through the menu or hit{" "}
          <span className="font-medium text-ink">▶ Guided tour</span> and watch a wallet go from
          screening → alert → investigation → filed SAR.
        </p>
        <div className="mt-5">
          <StackWalkthrough />
        </div>
      </section>

      {/* how the stack fits the SAR workflow */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">How the stack fits the SAR workflow</h2>
        <p className="mt-1 text-sm text-muted">
          No single tool does the job — alerts get enriched on-chain, investigated
          in graph tools, re-screened for KYC, then drafted into the filing.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SAR_PIPELINE.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 font-mono text-[11px] font-bold text-emerald-300">
                  {s.n}
                </span>
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {s.tools.map((t) => (
                  <span key={t} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
              {s.n < SAR_PIPELINE.length && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-faint lg:block">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* certifications */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Certifications recruiters name</h2>
        <p className="mt-1 text-sm text-muted">
          Vendor and professional credentials that show up repeatedly in AML/KYC and crypto-compliance JDs.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-bold text-emerald-300">{c.name}</h3>
                <span className="text-[10px] uppercase tracking-wide text-faint">{c.issuer}</span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* vendor directory */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">The platforms</h2>
        <p className="mt-1 text-sm text-muted">
          {LAYERS.map((l, i) => (
            <span key={l.key}>
              {i > 0 && " · "}
              <span className={l.cls.split(" ").find((c) => c.startsWith("text-"))}>{l.label}</span>
              {" — "}{l.desc}
            </span>
          ))}
        </p>
        <div className="mt-6">
          <StackBrowser />
        </div>
      </section>
    </div>
  );
}
