import type { Metadata } from "next";
import Link from "next/link";
import { CHEAT_SHEETS } from "@/lib/cheatsheets";

export const metadata: Metadata = {
  title: "Cheat Sheets — Quick Recap of Every Course & Tool",
  description:
    "One-page quick recaps for every AML/KYC course — key distinctions, numbers that matter, traps to remember — plus a practice toolkit reference for the sandbox, labs and exams.",
};

export default function CheatSheetsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Quick review
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Cheat sheets
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        The 30-second version of each course — the distinctions interviewers
        probe, the numbers that matter, and the traps that fail candidates.
        Print any sheet or keep it open before a quiz, exam or shift.
      </p>

      <div className="mt-10 space-y-8">
        {CHEAT_SHEETS.map((s) => (
          <section
            key={s.slug}
            className={`overflow-hidden rounded-2xl border bg-surface/50 ${s.accent.split(" ")[0]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/70 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-0.5 text-xs text-muted">{s.subtitle}</p>
              </div>
              <Link
                href={s.href}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-emerald-400/50"
              >
                {s.cta} →
              </Link>
            </div>
            <div className="grid gap-px bg-line/40 md:grid-cols-2">
              {s.sections.map((sec) => (
                <div key={sec.title} className="bg-surface/60 p-5">
                  <h3
                    className={`font-mono text-[10px] font-bold uppercase tracking-widest ${s.accent.split(" ")[1]}`}
                  >
                    {sec.title}
                  </h3>
                  <dl className="mt-3 space-y-2.5">
                    {sec.rows.map((r) => (
                      <div key={r.k} className="text-sm leading-5">
                        <dt className="font-semibold text-ink">{r.k}</dt>
                        <dd className="mt-0.5 text-muted">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Cheat sheets distil the courses — they don&apos;t replace them.{" "}
        <Link href="/walkthrough" className="text-emerald-400 hover:underline">
          Take the walkthrough
        </Link>{" "}
        if you&apos;re new here.{" "}
        <Link href="/typologies" className="text-emerald-400 hover:underline">
          Typologies cheat sheet →
        </Link>{" "}
        ·{" "}
        <Link href="/banking" className="text-emerald-400 hover:underline">
          Banking &amp; exams →
        </Link>
      </p>
    </div>
  );
}
