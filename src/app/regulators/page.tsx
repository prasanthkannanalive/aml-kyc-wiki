import type { Metadata } from "next";
import RegulatorsBrowser from "@/components/RegulatorsBrowser";
import { ENFORCEMENT_STAGES } from "@/lib/regulators";
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
