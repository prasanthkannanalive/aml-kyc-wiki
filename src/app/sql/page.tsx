import type { Metadata } from "next";
import Link from "next/link";
import ModuleQuiz from "@/components/ModuleQuiz";
import SqlPlayground from "@/components/SqlPlayground";
import { SQL_SECTIONS, SQL_FINAL, SQL_TRACK_INTRO } from "@/lib/sql-track";

export const metadata: Metadata = {
  title: "SQL & Data Skills for AML/KYC — AML/KYC Wiki",
  description:
    "Learn SQL for transaction monitoring and AML analytics — joins, window functions, structuring detection — plus hands-on practice on Dune, Flipside and BigQuery blockchain data.",
};

export default function SqlTrackPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Technical skills track
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        {SQL_TRACK_INTRO.title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">{SQL_TRACK_INTRO.body}</p>

      <div className="mt-6 rounded-xl border border-line bg-surface/50 p-5">
        <h2 className="text-sm font-bold text-ink">How this track works</h2>
        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-muted">
          <li>Six short sections — read the points, then pass the section check.</li>
          <li>Every question explains all four options, and the debrief shows your weakest topics.</li>
          <li>Hands-on practice: work the queries on{" "}
            <a href="https://sqlbolt.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              SQLBolt
            </a>{" "}
            (free) and real chain data on{" "}
            <a href="https://dune.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              Dune
            </a>
            ,{" "}
            <a href="https://flipsidecrypto.xyz" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              Flipside
            </a>{" "}
            and{" "}
            <a href="https://cloud.google.com/blockchain-analytics" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              BigQuery
            </a>
            .
          </li>
          <li>The capstone at the bottom ties it together — aim for 80%+.</li>
        </ul>
      </div>

      {SQL_SECTIONS.map((s, i) => (
        <section key={s.id} className="mt-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-faint">
            Section {i + 1} of {SQL_SECTIONS.length}
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink">{s.title}</h2>
          <p className="mt-1 text-sm text-muted">{s.tagline}</p>
          <ul className="mt-4 space-y-2">
            {s.points.map((pt, j) => (
              <li key={j} className="flex gap-2.5 text-sm leading-6 text-body">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {pt}
              </li>
            ))}
          </ul>
          <ModuleQuiz
            moduleTitle={s.title}
            questions={s.questions}
            trackId={`sql-track/${s.id}`}
          />
        </section>
      ))}

      <div className="mt-12">
        <SqlPlayground />
      </div>

      <section className="mt-14 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-transparent p-6 sm:p-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Capstone
        </p>
        <h2 className="mt-1 text-xl font-bold text-ink">
          Final assessment — SQL for AML/KYC
        </h2>
        <p className="mt-1 text-sm text-muted">
          {SQL_FINAL.length} questions across all six sections. The debrief
          breaks your score down by topic so you know exactly what to revisit.
        </p>
        <ModuleQuiz
          moduleTitle="SQL capstone"
          questions={SQL_FINAL}
          trackId="sql-track/final"
        />
      </section>

      <p className="mt-10 text-xs leading-5 text-muted">
        Pair this with the{" "}
        <Link href="/tech" className="text-emerald-400 hover:underline">
          tech-skills page
        </Link>{" "}
        for the role-by-role breakdown, and the{" "}
        <Link href="/labs" className="text-emerald-400 hover:underline">
          Data Lab
        </Link>{" "}
        for hands-on rule tuning on synthetic transactions.
      </p>
    </div>
  );
}
