import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse } from "@/lib/content";
import {
  estimateMins,
  getChapter,
  listChapters,
  readChapterBody,
} from "@/lib/chapters";
import ChapterContent from "@/components/ChapterContent";
import ChapterScenario from "@/components/ChapterScenario";
import ViewTracker from "@/components/ViewTracker";

export function generateStaticParams() {
  return courses.flatMap((c) =>
    listChapters(c.slug).map((ch) => ({ slug: c.slug, chapter: ch.num }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}): Promise<Metadata> {
  const { slug, chapter } = await params;
  const meta = getChapter(slug, chapter);
  const course = getCourse(slug);
  if (!meta || !course) return {};
  return {
    title: `${meta.num} ${meta.title} — ${course.code}`,
    description: `${meta.title} from the ${course.title} (${course.code}) study guide.`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;
  const course = getCourse(slug);
  const meta = getChapter(slug, chapter);
  const body = readChapterBody(slug, chapter);
  if (!course || !meta || body === null) notFound();

  const all = listChapters(slug);
  const idx = all.findIndex((c) => c.num === chapter);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const mins = estimateMins(body);
  const words = body.split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${meta.num} ${meta.title}`,
    isPartOf: {
      "@type": "Course",
      name: `${course.title} (${course.code})`,
      provider: { "@type": "Organization", name: "AML/KYC Wiki" },
    },
    wordCount: words,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker type="chapter" id={`${slug}/${chapter}`} />
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/courses" className="hover:text-ink">Courses</Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${course.slug}`} className="hover:text-ink">
          {course.code}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-body">
          {meta.num} {meta.title}
        </span>
      </nav>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 font-mono font-medium text-emerald-300">
            CHAPTER {meta.num}
          </span>
          {meta.moduleTitle && meta.moduleNum !== 0 && (
            <span>Module {meta.moduleNum}: {meta.moduleTitle}</span>
          )}
          {meta.startPage && (
            <span>
              pp. {meta.startPage}
              {meta.endPage && meta.endPage !== meta.startPage
                ? `–${meta.endPage}`
                : ""}
            </span>
          )}
          <span>{mins} min read</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          From {course.title}
        </p>

        <ChapterScenario slug={slug} num={meta.num} title={meta.title} />

        <article className="mt-8">
          <ChapterContent markdown={body} />
        </article>

        {/* Prev / next */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/courses/${slug}/chapters/${prev.num}`}
              className="rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-emerald-400/40"
            >
              <div className="text-xs text-muted">← Previous</div>
              <div className="mt-1 text-sm font-medium text-ink">
                {prev.num} {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/courses/${slug}/chapters/${next.num}`}
              className="rounded-xl border border-line bg-surface/50 p-4 text-right transition-colors hover:border-emerald-400/40"
            >
              <div className="text-xs text-muted">Next →</div>
              <div className="mt-1 text-sm font-medium text-ink">
                {next.num} {next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-surface/40 p-5 text-sm text-muted">
          Educational material from the {course.code} study guide — principles
          and mechanisms, not legal advice. Verify current rules with the
          regulator or source named in the text.
          {course.lastReviewed && (
            <span className="mt-2 block text-xs text-faint">
              Content last reviewed: {course.lastReviewed}
              {course.jurisdictions?.length
                ? ` · Jurisdictions covered: ${course.jurisdictions.join(", ")}`
                : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
