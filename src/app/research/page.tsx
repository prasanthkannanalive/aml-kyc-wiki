import type { Metadata } from "next";
import Link from "next/link";
import { research } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Research",
  description: "In-depth analysis on AML/KYC frameworks, detection methods and typologies.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Research</h1>
      <p className="mt-3 text-muted">
        In-depth analysis on frameworks, detection methods and the limits of
        compliance controls.
      </p>
      <div className="mt-8 space-y-4">
        {research.map((a) => (
          <Link
            key={a.slug}
            href={`/research/${a.slug}`}
            className="block rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-emerald-400/40"
          >
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="rounded bg-sky-400/10 px-2 py-0.5 font-medium text-sky-300">
                {a.tag}
              </span>
              <span>{a.date}</span>
              <span>{a.mins} min read</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-ink">{a.title}</h2>
            <p className="mt-2 text-sm leading-6 text-body">{a.dek}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
