import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { enforcementCases, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return enforcementCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  return c
    ? {
        title: `${c.org} — Enforcement Case`,
        description: c.summary.slice(0, 155),
      }
    : {};
}

const fmtUsd = (n: number | null) =>
  n == null ? "—" : n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : `$${(n / 1e6).toFixed(0)}M`;

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aml-kyc-wiki.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.org} enforcement case`,
    description: c.summary.slice(0, 300),
    datePublished: `${c.year}-01-01`,
    author: { "@type": "Organization", name: "AML/KYC Wiki" },
    isPartOf: { "@type": "WebSite", name: "AML/KYC Wiki", url: siteUrl },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-muted">
        <Link href="/cases" className="hover:text-ink">Enforcement Cases</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{c.org}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          {c.year}
        </span>
        {c.fineUsd != null && (
          <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-emerald-400">
            {fmtUsd(c.fineUsd)}
          </span>
        )}
        <span className="text-xs text-muted">{c.country}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {c.org}
      </h1>
      <p className="mt-2 text-lg text-emerald-400/90">{c.headline}</p>
      <p className="mt-1 text-sm text-muted">{c.penalty}</p>

      <p className="mt-6 leading-8 text-body">{c.summary}</p>

      {/* key facts */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
            People & entities
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-body">
            {c.people.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
            Typologies
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {c.typologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 text-xs text-body"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Outcome
          </h3>
          <p className="mt-1.5 text-sm text-body">{c.status}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
            Regulator / prosecutor
          </h3>
          <p className="mt-2 text-sm text-body">{c.regulator}</p>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Penalty
          </h3>
          <p className="mt-1.5 text-sm text-body">{c.penalty}</p>
        </div>
      </div>

      {/* analyst angle */}
      <h2 className="mt-10 text-xl font-bold tracking-tight">
        How an analyst could have caught it
      </h2>
      <div className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/5 p-5">
        <p className="text-sm leading-7 text-body">{c.analystAngle}</p>
      </div>

      {/* root control failure */}
      <h2 className="mt-10 text-xl font-bold tracking-tight">Root control failure</h2>
      <div className="mt-4 rounded-xl border border-red-400/25 bg-red-400/5 p-5">
        <p className="text-sm leading-7 text-body">{c.rootFailure}</p>
      </div>

      {/* mistakes */}
      <h2 className="mt-10 text-xl font-bold tracking-tight">Where the controls failed</h2>
      <div className="mt-4 space-y-3">
        {c.mistakes.map((m, i) => (
          <div
            key={m.title}
            className="rounded-xl border border-line bg-surface/60 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-xs font-bold text-red-400">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-muted">{m.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* study links */}
      {c.study && c.study.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight">Study this</h2>
          <p className="mt-1 text-sm text-muted">
            Course material covering the controls this case failed.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {c.study.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="rounded-lg border border-line bg-surface/50 px-3.5 py-2 text-xs font-medium text-body transition-colors hover:border-emerald-400/40 hover:text-ink"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* lessons */}
      <h2 className="mt-10 text-xl font-bold tracking-tight">Lessons for AML/KYC work</h2>
      <ul className="mt-4 space-y-2.5">
        {c.lessons.map((l) => (
          <li
            key={l}
            className="flex gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4 text-sm leading-7 text-body"
          >
            <span className="text-emerald-400">→</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>

      <p className="mt-10 rounded-xl border border-line bg-surface/50 p-4 text-xs leading-6 text-muted">
        Educational summary compiled from public enforcement records, court
        filings and regulator settlements. Details are abridged for learning
        purposes and should be verified against primary sources before
        professional use. Not legal advice.
      </p>
    </div>
  );
}
