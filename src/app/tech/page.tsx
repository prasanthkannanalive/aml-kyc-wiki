import type { Metadata } from "next";
import Link from "next/link";
import { TECH_AREAS, TECH_FACTS, ROLE_TECH, TECH_PRACTICE_LINKS } from "@/lib/tech";
import { TechSkillsTable } from "@/components/TechExplorer";

export const metadata: Metadata = {
  title: "Technical Skills for AML/KYC — SQL, Python, Web3 & RegTech",
  description:
    "The programming and tooling layer AML/KYC roles actually hire for — SQL, Python, Excel/VBA, Solidity and blockchain APIs, RegTech/AI workflows and BI — mapped to each role level.",
};

const PRIORITY_STYLE: Record<string, string> = {
  Core: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  High: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  "Role-specific": "border-violet-400/40 bg-violet-400/10 text-violet-300",
};

export default function TechPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Technical track
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Technical skills for AML/KYC
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Beyond investigative judgment, employers increasingly screen for
        programming and tooling fluency. Standard L1/L2 alert review runs on
        Excel and case-management interfaces — but SQL and Python are the
        primary requirements once you move into senior analyst, rule-tuning
        or crypto-compliance positions.
      </p>

      {/* core facts */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {TECH_FACTS.map((f) => (
          <div key={f.k} className="rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">{f.k}</p>
            <p className="mt-1.5 text-xs leading-5 text-muted">{f.v}</p>
          </div>
        ))}
      </div>

      {/* skill areas */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">The skill stack</h2>
        <p className="mt-1 text-sm text-muted">
          What each layer is actually used for in a compliance operation.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_AREAS.map((a) => (
            <div key={a.name} className="rounded-xl border border-line bg-surface/50 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-ink">{a.name}</h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${PRIORITY_STYLE[a.priority]}`}
                >
                  {a.priority}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {a.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-5 text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* role breakdown */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Tech by role</h2>
        <p className="mt-1 text-sm text-muted">
          What each level actually needs — filter or sort the table.
        </p>
        <div className="mt-5">
          <TechSkillsTable rows={ROLE_TECH} />
        </div>
      </section>

      {/* where to practice */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Where to practise</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {TECH_PRACTICE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-emerald-400/40"
            >
              <p className="text-sm font-semibold text-ink group-hover:text-emerald-300">
                {l.label} →
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-faint">
          The Data Lab generates synthetic transaction datasets you can
          interrogate; the Virtual Asset course covers the on-chain
          investigation side this stack supports.
        </p>
      </section>
    </div>
  );
}
