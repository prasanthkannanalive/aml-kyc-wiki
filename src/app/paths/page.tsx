import type { Metadata } from "next";
import Link from "next/link";
import { LEARNING_PATHS, pathStats } from "@/lib/paths";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Learning Paths — AML/KYC Wiki",
  description:
    "Role-based learning paths through the AML/KYC courses — AML analyst, fraud analyst, sanctions specialist, crypto compliance, FIU intelligence and trade finance.",
};

export default function PathsPage() {
  const paths = LEARNING_PATHS.map((p) => ({ ...p, stats: pathStats(p.slug) }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="paths" />
      <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Not sure where to start? Each path sequences the courses in the order a
        working analyst actually learns them — finish every course and unlock a
        path certificate alongside the per-course credentials.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {paths.map((p, i) => {
          const s = p.stats;
          return (
            <Link
              key={p.slug}
              href={`/paths/${p.slug}`}
              className="group rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-emerald-400/40"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  Path {String(i + 1).padStart(2, "0")}
                </span>
                {s && (
                  <span className="text-[11px] text-muted">
                    {s.courses.length} courses · ~{Math.round(s.totalMins / 60)}h
                  </span>
                )}
              </div>
              <h2 className="mt-1.5 text-lg font-bold text-ink group-hover:text-emerald-300">
                {p.title}
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-muted">{p.tagline}</p>
              <p className="mt-3 text-[11px] font-medium text-faint">
                For: {p.audience}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
