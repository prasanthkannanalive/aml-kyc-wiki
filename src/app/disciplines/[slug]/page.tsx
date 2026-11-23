import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { disciplines, getDiscipline } from "@/lib/disciplines";

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) return {};
  return { title: d.title, description: d.tagline };
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted">
        <Link href="/disciplines" className="hover:text-ink">Disciplines</Link>
        <span className="mx-2">/</span>
        <span className="text-body">{d.title}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{d.title}</h1>
      <p className="mt-2 text-lg text-emerald-400/90">{d.tagline}</p>
      <p className="mt-6 leading-8 text-muted">{d.overview}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Key concepts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {d.concepts.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-surface/50 p-5">
              <h3 className="font-semibold text-ink">{c.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Common typologies & red flags</h2>
        <ul className="mt-4 space-y-2.5">
          {d.typologies.map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Go deeper</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {d.links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="rounded-lg border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-emerald-400/50 hover:bg-surface"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 text-sm text-faint">
        Discipline overview for orientation — verify current rules, thresholds
        and typologies against your regulator and internal policy.
      </p>
    </div>
  );
}
