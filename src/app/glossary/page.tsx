import type { Metadata } from "next";
import { glossary } from "@/lib/content";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-language definitions of AML, KYC, CDD, EDD, STR, PEP, UBO and the vocabulary of financial-crime compliance.",
};

export default function GlossaryPage() {
  const groups = glossary.reduce<Record<string, typeof glossary>>((acc, t) => {
    (acc[t.category] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <ViewTracker type="glossary" id="all" />
      <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
      <p className="mt-3 max-w-2xl text-muted">
        The working vocabulary of AML, KYC and financial-crime compliance —
        defined plainly, the way the courses use it.
      </p>

      <div className="mt-10 space-y-10">
        {Object.entries(groups).map(([cat, terms]) => (
          <section key={cat}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              {cat}
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {terms.map((t) => (
                <div
                  key={t.term}
                  className="rounded-xl border border-line bg-surface/50 p-4"
                >
                  <dt className="font-mono text-sm font-semibold text-ink">
                    {t.term}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-muted">
                    {t.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
