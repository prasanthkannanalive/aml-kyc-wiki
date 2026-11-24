import type { Metadata } from "next";
import RegulatorsBrowser from "@/components/RegulatorsBrowser";
import { ENFORCEMENT_STAGES } from "@/lib/regulators";
import { AML_CFT_PILLARS, FATF_LISTS, REFORMS } from "@/lib/reg-frameworks";
import { courses } from "@/lib/content";
import Link from "next/link";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Regulatory Bodies — FIUs & AML Supervisors by Country",
  description:
    "Which regulator and FIU handles AML in each jurisdiction — legal framework, filing channel, deadline style and regime maturity, plus the enforcement pipeline stages.",
};
export const dynamic = "force-dynamic";

export default function RegulatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Regulatory Bodies</h1>
      <p className="mt-3 max-w-3xl text-muted">
        Every jurisdiction has a financial intelligence unit and sector
        supervisors — but the rules, channels and deadlines differ sharply.
        This directory maps who does what, how mature each regime is, and how a
        suspicious-activity report travels from detection to enforcement.
      </p>
      <ViewTracker type="search" id="regulators" />

      {/* enforcement pipeline */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">How a report travels — the enforcement pipeline</h2>
        <p className="mt-1 text-sm text-muted">
          Whatever the country, the lifecycle of a suspicious-activity report follows the same five stages.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ENFORCEMENT_STAGES.map((s, i) => (
            <div key={s.n} className="relative rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 font-mono text-[11px] font-bold text-emerald-300">
                  {s.n}
                </span>
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{s.desc}</p>
              {i < ENFORCEMENT_STAGES.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-faint lg:block">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AML/CFT program pillars */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">The six AML/CFT program pillars</h2>
        <p className="mt-1 text-sm text-muted">
          Whatever the jurisdiction, an obliged entity&apos;s program stands on
          these six pillars — the backbone every certification exam tests.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AML_CFT_PILLARS.map((p) => (
            <div key={p.n} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 font-mono text-[11px] font-bold text-emerald-300">
                  {p.n}
                </span>
                <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{p.desc}</p>
              <p className="mt-2.5 border-t border-line/60 pt-2 text-[11px] leading-4 text-faint">
                {p.exam}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FATF lists */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">The FATF listing system</h2>
        <p className="mt-1 text-sm text-muted">
          Jurisdictions with strategic AML/CFT deficiencies get listed — and the
          listing changes what obliged entities must do with connected customers.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {FATF_LISTS.map((l) => (
            <div key={l.tag} className="rounded-xl border border-line bg-surface/60 p-4">
              <span
                className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  l.tone === "red"
                    ? "border-red-400/40 bg-red-400/10 text-red-300"
                    : l.tone === "amber"
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                      : "border-sky-400/40 bg-sky-400/10 text-sky-300"
                }`}
              >
                {l.tag}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-ink">{l.list}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted">{l.desc}</p>
              <p className="mt-2 text-[11px] leading-4 text-faint">{l.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* reforms timeline */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Major reforms reshaping compliance</h2>
        <p className="mt-1 text-sm text-muted">
          The rules themselves are moving — these are the changes analysts and
          compliance teams need on their radar.
        </p>
        <div className="mt-5 space-y-3">
          {REFORMS.map((r) => (
            <div key={r.title} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                  {r.when}
                </span>
                <h3 className="text-sm font-semibold text-ink">{r.title}</h3>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-muted">{r.body}</p>
              <p className="mt-1.5 text-[11px] font-medium text-sky-300/90">
                Impact: {r.impact}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {r.courses.map((slug) => {
                  const c = courses.find((x) => x.slug === slug);
                  return c ? (
                    <Link
                      key={slug}
                      href={`/courses/${slug}`}
                      className="rounded-full border border-line bg-background/60 px-2 py-0.5 text-[10px] text-muted transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      {c.code}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold">FIUs &amp; supervisors by jurisdiction</h2>
        <p className="mt-1 text-sm text-muted">
          Filter by regime maturity —{" "}
          <span className="text-emerald-300">Advanced</span>,{" "}
          <span className="text-sky-300">Established</span> or{" "}
          <span className="text-amber-300">Developing</span> — or search by country, FIU or law.
          Jurisdictions with a matching simulation link straight into practice.
        </p>
        <div className="mt-6">
          <RegulatorsBrowser />
        </div>
      </section>
    </div>
  );
}
