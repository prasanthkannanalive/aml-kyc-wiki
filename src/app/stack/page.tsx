import type { Metadata } from "next";
import Link from "next/link";
import StackBrowser from "@/components/StackBrowser";
import StackWalkthrough from "@/components/StackWalkthrough";
import HopExplorer from "@/components/HopExplorer";
import DeFiFlow from "@/components/DeFiFlow";
import { SAR_PIPELINE, CERTIFICATIONS, LAYERS } from "@/lib/compliance-stack";
import { courses } from "@/lib/content";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Compliance Stack Landscape — AML Vendors & Platforms",
  description:
    "The platforms crypto-compliance and financial-crime teams actually use — blockchain analytics (Chainalysis, TRM, Elliptic, CipherTrace), KYC/CDD screening vendors, certifications, and how they fit the SAR workflow.",
};
export const dynamic = "force-dynamic";

const PILLARS = [
  { n: "01", title: "Screening", desc: "KYC/CDD, PEP, sanctions and adverse-media checks at onboarding and refresh", cls: "text-sky-300 border-sky-400/30" },
  { n: "02", title: "On-chain analytics", desc: "Trace funds, score wallet exposure, map clusters for investigations", cls: "text-violet-300 border-violet-400/30" },
  { n: "03", title: "Case & filing", desc: "Alert queues, investigation case files and SAR/STR drafting to the FIU", cls: "text-emerald-300 border-emerald-400/30" },
];

const DEMOS = [
  {
    tag: "Scenario A",
    title: "Trace a money trail — hop by hop",
    desc: "Reactor/TRM-style investigation panel: address cards connected hop to hop with cluster tags, risk badges and a detail panel. Hit ▶ Trace funds and click any node.",
    el: <HopExplorer />,
  },
  {
    tag: "Scenario B",
    title: "DeFi flows — contract-level tracing",
    desc: "DeFiLlama-style token graph: animated packets travel wallet → router → pools → bridge → exchange while the panel shows each contract call (approve, swap, sendToken).",
    el: <DeFiFlow />,
  },
  {
    tag: "Scenario C",
    title: "Guided walkthrough — screening to SAR",
    desc: "A simulated compliance console: click the menu or hit ▶ Guided tour and watch a wallet go from screening → alert → investigation → filed SAR.",
    el: <StackWalkthrough />,
  },
];

export default function StackPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      {/* 1 · executive summary */}
      <h1 className="text-3xl font-bold tracking-tight">Compliance Stack Landscape</h1>
      <p className="mt-3 max-w-3xl text-muted">
        This page maps the actual tools, workflows and certifications modern
        crypto-compliance and AML/KYC teams run on — in the order the work
        actually happens.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {PILLARS.map((p, i) => (
          <div key={p.n} className={`relative rounded-xl border bg-surface/60 p-4 ${p.cls}`}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold opacity-70">{p.n}</span>
              <h2 className="text-sm font-semibold text-ink">{p.title}</h2>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-muted">{p.desc}</p>
            {i < PILLARS.length - 1 && (
              <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-faint sm:block">→</span>
            )}
          </div>
        ))}
      </div>
      <ViewTracker type="search" id="stack" />

      {/* 2 · SAR workflow */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">How it fits together — the SAR workflow</h2>
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

      {/* 3 · platform landscape */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">The platform landscape</h2>
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

      {/* 4 · tools in action */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Tools in action — the deep dive</h2>
        <p className="mt-1 text-sm text-muted">
          Now that you know the tools, see them work. Three interactive demos
          mirror what analysts actually do inside these platforms.
        </p>
        <div className="mt-6 space-y-10">
          {DEMOS.map((d) => (
            <div key={d.tag}>
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                  {d.tag}
                </span>
                <h3 className="text-base font-semibold text-ink">{d.title}</h3>
              </div>
              <p className="mt-1.5 max-w-3xl text-sm text-muted">{d.desc}</p>
              <div className="mt-4">{d.el}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · key points */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Points analysts should note</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Enrichment beats alerts",
              d: "A bare rule hit is noise; the same alert enriched with mixer/sanctions exposure is a case. Budget for analytics feeds.",
            },
            {
              t: "Unhosted wallets change the rules",
              d: "No counterparty VASP means no Travel Rule exchange — but FATF still requires you to collect and retain the data.",
            },
            {
              t: "One bad hop can end the trail",
              d: "Mixers and chain-hops sever attribution. Capture evidence before the trail goes dark — screenshots and exports are part of the SAR.",
            },
            {
              t: "Corroborate across vendors",
              d: "Top teams run Chainalysis + TRM + Elliptic together — cluster tags disagree, and disagreement is itself a signal.",
            },
          ].map((p) => (
            <div key={p.t} className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
              <h3 className="text-sm font-semibold text-amber-200">{p.t}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 · certifications */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Certifications recruiters name</h2>
        <p className="mt-1 text-sm text-muted">
          Vendor and professional credentials that show up repeatedly in AML/KYC and crypto-compliance JDs —
          then <Link href="/interview-prep" className="text-emerald-400 hover:underline">practise the questions</Link>.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-bold text-emerald-300">{c.name}</h3>
                <span className="text-[10px] uppercase tracking-wide text-faint">{c.issuer}</span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-muted">{c.desc}</p>
              <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
                Covered by
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {c.covers.map((slug) => (
                  <Link
                    key={slug}
                    href={`/courses/${slug}`}
                    className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] text-muted transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                  >
                    {courses.find((x) => x.slug === slug)?.code ?? slug}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
