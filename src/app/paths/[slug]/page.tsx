import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEARNING_PATHS, pathStats } from "@/lib/paths";
import { getSessionUser } from "@/lib/auth";
import { getProgress } from "@/lib/db";
import PathCertificate from "@/components/PathCertificate";
import ViewTracker from "@/components/ViewTracker";

export function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = LEARNING_PATHS.find((x) => x.slug === slug);
  return p
    ? {
        title: `${p.title} — Learning Path`,
        description: p.tagline,
      }
    : {};
}

const fmtMins = (m: number) => (m >= 60 ? `~${Math.round(m / 60)}h` : `~${m}m`);

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stats = pathStats(slug);
  if (!stats) notFound();
  const { path, courses, totalMins, totalChapters } = stats;

  const user = await getSessionUser();
  const progress = user ? await getProgress(user.id) : {};

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aml-kyc-wiki.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: path.title,
    description: path.tagline,
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${c.title} (${c.code})`,
      url: `${siteUrl}/courses/${c.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id={`path-${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/paths" className="hover:text-ink">Learning Paths</Link>
        <span className="mx-2">/</span>
        <span className="text-body">{path.title}</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">{path.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{path.tagline}</p>
      <p className="mt-2 text-xs text-faint">For: {path.audience}</p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span>{courses.length} courses</span>
        <span>·</span>
        <span>{totalChapters} chapters</span>
        <span>·</span>
        <span>~{Math.round(totalMins / 60)} hours total</span>
      </div>

      {/* ordered courses */}
      <div className="mt-8 space-y-3">
        {courses.map((c, i) => {
          const done = Object.keys(progress).filter(
            (k) => k.startsWith(`done:${c.slug}/`) || k === `done:${c.slug}`
          ).length;
          const pct = c.chapters ? Math.min(100, Math.round((done / c.chapters) * 100)) : 0;
          return (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-emerald-400/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 font-mono text-sm font-bold text-emerald-300">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    {c.code}
                  </span>
                  <h2 className="truncate text-sm font-bold text-ink group-hover:text-emerald-300">
                    {c.title}
                  </h2>
                </div>
                <p className="mt-0.5 text-[11px] text-muted">
                  {c.chapters} chapters · {fmtMins(c.mins)}
                  {user && pct > 0 && ` · ${pct}% complete`}
                </p>
                {user && pct > 0 && (
                  <div className="mt-1.5 h-1 w-full max-w-xs overflow-hidden rounded-full bg-line/60">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
              <span className="shrink-0 text-xs font-medium text-muted group-hover:text-emerald-300">
                {pct === 100 ? "Review →" : pct > 0 ? "Continue →" : "Start →"}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-line bg-surface/40 p-5 text-sm leading-6 text-muted">
          <h3 className="font-semibold text-ink">How this path works</h3>
          <p className="mt-2">
            Courses are ordered the way the discipline builds — foundations
            first, applied judgment last. You can take them in any order, but
            the sequence is deliberate. Each course ends with module quizzes,
            a final exam and a verifiable certificate; pass every final exam on
            this path and a path certificate unlocks below.
          </p>
          <p className="mt-3 text-xs text-faint">
            Progress shown is for signed-in members; guest progress is tracked in
            your browser per course.
          </p>
        </div>
        <PathCertificate
          pathTitle={path.title}
          courses={courses.map((c) => ({ slug: c.slug, title: c.title, code: c.code }))}
          totalChapters={totalChapters}
        />
      </div>
    </div>
  );
}
