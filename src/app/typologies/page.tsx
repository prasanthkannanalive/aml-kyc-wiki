import type { Metadata } from "next";
import Link from "next/link";
import { TYPOLOGY_GROUPS } from "@/lib/typologies";
import { glossary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Typologies Cheat Sheet — ML, Fraud & Sanctions Evasion",
  description:
    "Every major money-laundering, fraud and sanctions-evasion typology in one place — how each works, what an analyst sees, and the quick-review version of the terms that come up in interviews and exams.",
};

export default function TypologiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Quick review
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Typologies cheat sheet
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Every major laundering, fraud and evasion pattern — how it works and
        what an analyst actually sees. Use it for interview prep, exam review,
        or the 30-second version before a case.
      </p>

      {/* typology groups */}
      <div className="mt-10 space-y-8">
        {TYPOLOGY_GROUPS.map((g) => (
          <section key={g.slug}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h2 className={`text-lg font-bold ${g.accent.split(" ")[0]}`}>
                {g.title}
              </h2>
              <span className="text-xs text-muted">{g.blurb}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.typologies.map((tp) => (
                <div
                  key={tp.name}
                  className={`rounded-xl border bg-surface/50 p-4 ${g.accent.split(" ")[1]}`}
                >
                  <h3 className="text-sm font-bold text-ink">{tp.name}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted">{tp.how}</p>
                  <p className="mt-2 border-t border-line/60 pt-2 text-[11px] leading-4 text-body">
                    <span className="font-semibold text-ink">Analyst sees: </span>
                    {tp.signals}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* discussable terms */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Terms that come up in every interview</h2>
        <p className="mt-1 text-sm text-muted">
          The working vocabulary — definitions compressed to one line each.{" "}
          <Link href="/glossary" className="text-emerald-400 hover:underline">
            Full glossary →
          </Link>
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map((t) => (
            <div
              key={t.term}
              className="rounded-lg border border-line bg-surface/40 px-4 py-3"
            >
              <p className="text-xs font-bold text-ink">{t.term}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted">{t.definition}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-muted">
        Typologies are patterns, not verdicts — every one has legitimate
        explanations. The skill is the investigation, not the label.{" "}
        <Link href="/cheatsheets" className="text-emerald-400 hover:underline">
          Course cheat sheets →
        </Link>
      </p>
    </div>
  );
}
