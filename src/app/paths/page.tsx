import type { Metadata } from "next";
import Link from "next/link";
import { LEARNING_PATHS, pathStats } from "@/lib/paths";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Learning Paths — AML/KYC Wiki",
  description:
    "Role-based and jurisdiction-based learning paths through the AML/KYC courses — AML analyst, fraud analyst, sanctions specialist, crypto compliance, FIU intelligence, trade finance, and country tracks for the US, UK, EU, Canada, India, Singapore, Australia, UAE, Switzerland and Hong Kong.",
};

export default function PathsPage() {
  const paths = LEARNING_PATHS.map((p) => ({ ...p, stats: pathStats(p.slug) }));
  const rolePaths = paths.filter((p) => !p.country);
  const countryPaths = paths.filter((p) => p.country);

  const renderGroup = (
    title: string,
    blurb: string,
    list: typeof paths,
    offset: number
  ) => (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted">{blurb}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {list.map((p, i) => {
          const s = p.stats;
          return (
            <Link
              key={p.slug}
              href={`/paths/${p.slug}`}
              className="group rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-emerald-400/40"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  {p.country ? p.country : `Path ${String(offset + i + 1).padStart(2, "0")}`}
                </span>
                {s && (
                  <span className="text-[11px] text-muted">
                    {s.courses.length} courses · ~{Math.round(s.totalMins / 60)}h
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 text-lg font-bold text-ink group-hover:text-emerald-300">
                {p.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-muted">{p.tagline}</p>
              <p className="mt-3 text-[11px] font-medium text-faint">
                For: {p.audience}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="paths" />
      <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Not sure where to start? Each path sequences the courses in the order a
        working analyst actually learns them — finish every course and unlock a
        path certificate alongside the per-course credentials.
      </p>

      {renderGroup(
        "Role paths",
        "Job-shaped sequences — pick the one matching the role you're targeting.",
        rolePaths,
        0
      )}
      {renderGroup(
        "Jurisdiction paths",
        "Country tracks — the same core courses framed to each market's law, FIU and filing regime.",
        countryPaths,
        0
      )}
    </div>
  );
}
