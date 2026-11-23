import type { Metadata } from "next";
import Link from "next/link";
import { enforcementCases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Enforcement Cases",
  description:
    "Landmark AML/KYC enforcement cases — bank scandals, regulator penalties and founder prosecutions, with the control failures behind each.",
};

const fmtUsd = (n: number | null) =>
  n == null ? "—" : n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${(n / 1e6).toFixed(0)}M`;

export default function CasesPage() {
  const ranked = [...enforcementCases].sort(
    (a, b) => (b.fineUsd ?? -1) - (a.fineUsd ?? -1)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Enforcement Cases</h1>
      <p className="mt-3 max-w-3xl text-muted">
        The cases that defined modern AML/KYC enforcement — what happened, who
        was held accountable, and where the controls failed. Ranked by headline
        penalty where a fine exists; institutional impact otherwise.
      </p>

      {/* ranked table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5 font-medium">#</th>
              <th className="px-5 py-3.5 font-medium">Case</th>
              <th className="hidden px-5 py-3.5 font-medium md:table-cell">Country</th>
              <th className="px-5 py-3.5 text-right font-medium">Year</th>
              <th className="px-5 py-3.5 text-right font-medium">Penalty</th>
              <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {ranked.map((c, i) => (
              <tr key={c.slug} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4">
                  <span className={`text-lg font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/cases/${c.slug}`}
                    className="font-medium text-ink hover:text-emerald-300"
                  >
                    {c.org}
                  </Link>
                  <p className="mt-0.5 max-w-md text-xs text-muted">{c.headline}</p>
                </td>
                <td className="hidden px-5 py-4 text-muted md:table-cell">{c.country}</td>
                <td className="px-5 py-4 text-right font-mono text-body">{c.year}</td>
                <td className="px-5 py-4 text-right font-mono text-body">
                  {fmtUsd(c.fineUsd)}
                </td>
                <td className="hidden px-5 py-4 text-xs text-muted lg:table-cell">
                  {c.status.split("—")[0].trim()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-emerald-400/40"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                {c.year}
              </span>
              <span className="font-mono text-sm text-emerald-400">
                {fmtUsd(c.fineUsd)}
              </span>
            </div>
            <h2 className="mt-3 font-semibold text-ink group-hover:text-emerald-300">
              {c.org}
            </h2>
            <p className="mt-1 text-sm text-muted">{c.headline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.typologies.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-4 text-xs text-faint">{c.country}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
