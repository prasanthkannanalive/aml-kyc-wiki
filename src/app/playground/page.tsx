import type { Metadata } from "next";
import Link from "next/link";
import ScenarioRunner from "@/components/ScenarioRunner";
import { PLAYGROUND_SCENARIOS, SCENARIO_CATS } from "@/lib/playground";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Playground — Interactive AML/KYC Challenges",
  description:
    "Every interactive experience in one place — 100 hard AML scenarios, the alert sandbox, data lab, mock exams, daily review, tools, simulations and arcade.",
};

const EXPERIENCES = [
  {
    href: "/sandbox",
    title: "Alert Sandbox",
    tag: "TM triage",
    desc: "Work a queue of transaction-monitoring alerts and file your dispositions.",
    accent: "border-sky-400/30",
  },
  {
    href: "/labs",
    title: "Transaction Data Lab",
    tag: "Rule tuning",
    desc: "Build detection rules and run them against a synthetic ledger with planted typologies.",
    accent: "border-violet-400/30",
  },
  {
    href: "/exams",
    title: "Mock Exam Simulator",
    tag: "Timed assessment",
    desc: "15-minute randomized papers across all courses with per-module breakdowns.",
    accent: "border-emerald-400/30",
  },
  {
    href: "/review",
    title: "Daily Review",
    tag: "Spaced repetition",
    desc: "Ten questions a day from every course — keep the forgetting curve at bay.",
    accent: "border-amber-400/30",
  },
  {
    href: "/tools",
    title: "Analyst Tools",
    tag: "Calculators",
    desc: "CDD risk calculator, UBO calculator, SAR deadline timer, Travel Rule checker and more.",
    accent: "border-rose-400/30",
  },
  {
    href: "/job-simulation",
    title: "Job Simulation",
    tag: "Roleplay shift",
    desc: "Live an analyst's shift — triage, EDD, SAR drafting — with scored decisions.",
    accent: "border-cyan-400/30",
  },
  {
    href: "/arcade",
    title: "AML Arcade",
    tag: "Daily games",
    desc: "Typology sorting, word puzzles, timed recognition and more — streaks included.",
    accent: "border-fuchsia-400/30",
  },
  {
    href: "/stack",
    title: "Compliance Stack",
    tag: "Vendor landscape",
    desc: "Guided console walkthrough, hop explorer and DeFi flow graph of real platforms.",
    accent: "border-indigo-400/30",
  },
];

export default function PlaygroundPage() {
  const byCat = SCENARIO_CATS.map((c) => ({
    cat: c,
    n: PLAYGROUND_SCENARIOS.filter((s) => s.cat === c).length,
    maxDiff: Math.max(...PLAYGROUND_SCENARIOS.filter((s) => s.cat === c).map((s) => s.diff)),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="playground" />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Playground
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Interactive AML/KYC challenges</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Everything hands-on in one place — scenario judgment, rule tuning, timed
        exams and daily drills. Start with the 100 hard scenarios below, then
        take the skills into the sandbox and simulations.
      </p>

      {/* 100 challenging scenarios */}
      <section className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold">100 most challenging scenarios</h2>
          <span className="text-xs text-muted">
            {PLAYGROUND_SCENARIOS.length} scenarios · {SCENARIO_CATS.length} typologies · difficulties 1–5
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {byCat.map((c) => (
            <span key={c.cat} className="rounded-full border border-line bg-surface/50 px-2.5 py-1 text-[10px] text-muted">
              {c.cat} <span className="font-semibold text-ink">{c.n}</span>
            </span>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-line bg-surface/40 p-5 sm:p-6">
          <ScenarioRunner />
        </div>
      </section>

      {/* experiences grid */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">More playgrounds</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className={`group rounded-xl border ${e.accent} bg-surface/50 p-4 transition-colors hover:bg-surface-2/60`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                {e.tag}
              </span>
              <h3 className="mt-1 text-sm font-bold text-ink group-hover:text-emerald-300">{e.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted">{e.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
