import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse, totalChapters } from "@/lib/content";
import { listChapters } from "@/lib/chapters";
import ViewTracker from "@/components/ViewTracker";
import ModuleQuiz from "@/components/ModuleQuiz";
import ModuleExplorer from "@/components/ModuleExplorer";
import FinalExam from "@/components/FinalExam";
import { MODULE_QUIZZES, FINAL_EXAM } from "@/lib/module-quizzes";
import { getCourseReads, getCourseCompletions } from "@/lib/db";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} (${course.code})`,
    description: course.description.slice(0, 160),
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const chapters = totalChapters(course);
  const others = courses.filter((c) => c.slug !== course.slug);
  const liveReads = await getCourseReads(course.slug);
  const liveCompletions = await getCourseCompletions(course.slug);
  const readable = new Set(listChapters(course.slug).map((c) => c.num));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} (${course.code})`,
    description: course.description,
    provider: { "@type": "Organization", name: "AML/KYC Wiki" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <ViewTracker type="course" id={course.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/courses" className="hover:text-ink">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-body">{course.title}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          {course.code}
        </span>
        <span className="rounded-md bg-surface-2 px-2.5 py-1 text-xs text-muted">
          {course.level}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {course.title}
      </h1>
      <p className="mt-1 text-lg text-emerald-400/90">{course.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
        <span><strong className="text-ink">{course.modules.length}</strong> modules</span>
        <span><strong className="text-ink">{chapters}</strong> chapters</span>
        <span><strong className="text-ink">{course.pages}</strong> pages</span>
        {liveReads > 0 && (
          <>
            <span><strong className="text-ink">{liveReads.toLocaleString()}</strong> reads</span>
            <span><strong className="text-ink">{liveCompletions.toLocaleString()}</strong> completions</span>
          </>
        )}
      </div>

      {(course.lastReviewed || course.jurisdictions) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-faint">
          {course.lastReviewed && <span>Last reviewed: {course.lastReviewed}</span>}
          {course.jurisdictions && (
            <span>Jurisdictions: {course.jurisdictions.join(" · ")}</span>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 leading-8 text-muted">{course.description}</p>
            {course.accreditation && (
              <p className="mt-3 text-sm text-muted">{course.accreditation}</p>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">Who this is for</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {course.audience.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">What you&apos;ll learn</h2>
            <ul className="mt-3 space-y-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm leading-6 text-muted">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* Table of contents */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold">Table of Contents</h2>
            <p className="mt-1 text-sm text-muted">
              {course.modules.length} modules · {chapters} chapters
            </p>
            <div className="mt-5 space-y-6">
              {readable.has("0.0") && (
                <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
                  <ul className="divide-y divide-line/60">
                    <li>
                      <Link
                        href={`/courses/${course.slug}/chapters/0.0`}
                        className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-surface/70"
                      >
                        <span className="w-10 shrink-0 font-mono text-sm text-emerald-400/80">
                          0.0
                        </span>
                        <span className="text-sm text-body">
                          Introduction &amp; how to use this guide
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {course.modules.map((m) => (
                <div
                  key={m.num}
                  className="overflow-hidden rounded-2xl border border-line bg-surface/40"
                >
                  <div className="border-b border-line bg-surface/80 px-5 py-3.5">
                    <span className="mr-2 text-xs font-bold text-emerald-400">
                      MODULE {m.num}
                    </span>
                    <span className="font-medium text-ink">{m.title}</span>
                    <span className="ml-2 text-xs text-muted">
                      {m.chapters.length} chapters
                    </span>
                  </div>
                  <div className="border-b border-line/60 px-4 py-3">
                    <ModuleExplorer
                      slug={course.slug}
                      moduleNum={m.num}
                      moduleTitle={m.title}
                      chapters={[]}
                      hideChapters
                    />
                  </div>
                  <ul className="divide-y divide-line/60">
                    {m.chapters.map((ch) => (
                      <li key={ch.num}>
                        {readable.has(ch.num) ? (
                          <Link
                            href={`/courses/${course.slug}/chapters/${ch.num}`}
                            className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-surface/70"
                          >
                            <span className="w-10 shrink-0 font-mono text-sm text-emerald-400/80">
                              {ch.num}
                            </span>
                            <span className="text-sm text-body">{ch.title}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-4 px-5 py-3">
                            <span className="w-10 shrink-0 font-mono text-sm text-faint">
                              {ch.num}
                            </span>
                            <span className="text-sm text-muted">{ch.title}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  {(m.quiz ?? MODULE_QUIZZES[course.slug]?.[m.num]) &&
                    (m.quiz ?? MODULE_QUIZZES[course.slug]?.[m.num])!.length > 0 && (
                    <div className="border-t border-line/60 px-5 py-4">
                      <ModuleQuiz
                        moduleTitle={m.title}
                        questions={(m.quiz ?? MODULE_QUIZZES[course.slug]?.[m.num])!}
                        trackId={`${course.slug}/m${m.num}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sources & further reading */}
          {course.sources && course.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold">Sources &amp; further reading</h2>
              <p className="mt-1 text-sm text-muted">
                Primary regulatory guidance and industry standards behind this programme.
              </p>
              <div className="mt-5 space-y-6">
                {course.sources.map((s) => (
                  <div key={s.module}>
                    <h3 className="text-sm font-semibold text-emerald-400">{s.module}</h3>
                    <ul className="mt-2 space-y-1.5">
                      {s.items.map((item) => (
                        <li key={item.url} className="text-sm">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body underline decoration-line underline-offset-2 transition-colors hover:text-emerald-400"
                          >
                            {item.title}
                          </a>
                          {item.note && (
                            <span className="ml-2 text-xs text-faint">({item.note})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Final exam */}
          {FINAL_EXAM[course.slug] && (
            <FinalExam
              courseSlug={course.slug}
              courseTitle={course.title}
              questions={FINAL_EXAM[course.slug]}
            />
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface/50 p-5">
            <h3 className="text-sm font-semibold text-ink">Course details</h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Level</dt>
                <dd className="text-body">{course.level}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Length</dt>
                <dd className="text-body">{course.pages} pages</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Completion rate</dt>
                <dd className="text-body">
                  {liveReads > 0
                    ? `${Math.round((liveCompletions / liveReads) * 100)}%`
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface/50 p-5">
            <h3 className="text-sm font-semibold text-ink">More courses</h3>
            <ul className="mt-3 space-y-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="block rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-line hover:bg-surface"
                  >
                    <div className="text-sm font-medium text-ink">{c.title}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      {totalChapters(c)} chapters · {c.pages} pages
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
