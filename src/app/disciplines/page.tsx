import type { Metadata } from "next";
import Link from "next/link";
import { disciplines } from "@/lib/disciplines";

export const metadata: Metadata = {
  title: "Disciplines",
  description:
    "Focused guides to the core AML/KYC operating disciplines — CDD/KYB, transaction monitoring, VASP compliance and trade-based money laundering.",
};

export default function DisciplinesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Disciplines</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Focused guides to the operating disciplines that sit alongside the
        certification courses — the day-to-day craft of AML/KYC work.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {disciplines.map((d) => (
          <Link
            key={d.slug}
            href={`/disciplines/${d.slug}`}
            className="group rounded-2xl border border-line bg-surface/50 p-6 transition-all hover:border-emerald-400/40 hover:bg-surface"
          >
            <h2 className="text-lg font-semibold text-ink">{d.title}</h2>
            <p className="mt-1 text-sm text-emerald-400/90">{d.tagline}</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {d.overview.slice(0, 180)}…
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
