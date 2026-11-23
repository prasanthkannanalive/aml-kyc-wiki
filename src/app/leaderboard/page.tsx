import type { Metadata } from "next";
import Link from "next/link";
import { courses, leaderboard, totalChapters } from "@/lib/content";
import { listChapters } from "@/lib/chapters";
import { getAllProgress, getAllStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "The most-read topics across the AML/KYC knowledge base — ranked by live reads and completions.",
};

/** Map "Course Title" chapter title -> chapter num */
function chapterNumFor(courseSlug: string, title: string): string | null {
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course) return null;
  for (const m of course.modules) {
    const ch = m.chapters.find((c) => c.title === title);
    if (ch) return ch.num;
  }
  return null;
}

export default async function LeaderboardPage() {
  const stats = await getAllStats();
  const progress = await getAllProgress();

  const rows = leaderboard.map((e) => {
    const num = chapterNumFor(e.courseSlug, e.title);
    const key = num ? `chapter:${e.courseSlug}/${num}` : null;
    const reads = key ? (stats[key] ?? 0) : 0;
    const done = key
      ? Object.values(progress).filter((p) => p[key]).length
      : 0;
    return { ...e, liveReads: reads, liveDone: done };
  });

  const courseRows = [...courses]
    .map((c) => {
      const chapterNums = new Set(
        listChapters(c.slug).map((ch) => ch.num)
      );
      const reads =
        (stats[`course:${c.slug}`] ?? 0) +
        [...chapterNums].reduce(
          (s, n) => s + (stats[`chapter:${c.slug}/${n}`] ?? 0),
          0
        );
      // count distinct users who read any chapter of this course
      const users = new Set(
        Object.entries(progress)
          .filter(([, p]) =>
            Object.keys(p).some((k) =>
              k.startsWith(`chapter:${c.slug}/`)
            )
          )
          .map(([uid]) => uid)
      );
      return { ...c, liveReads: reads, liveDone: users.size };
    })
    .sort((a, b) => b.liveReads - a.liveReads);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Knowledge Leaderboard</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Live rankings across the knowledge base — tracked in real time from
        chapter reads and completions by registered readers.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5 font-medium">#</th>
              <th className="px-5 py-3.5 font-medium">Topic</th>
              <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Course</th>
              <th className="px-5 py-3.5 text-right font-medium">Reads</th>
              <th className="hidden px-5 py-3.5 text-right font-medium md:table-cell">Done</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {rows.map((e, i) => (
              <tr key={e.title} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4">
                  <span
                    className={`text-lg font-bold ${
                      i < 3 ? "text-emerald-400" : "text-faint"
                    }`}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/courses/${e.courseSlug}`}
                    className="font-medium text-ink hover:text-emerald-300"
                  >
                    {e.title}
                  </Link>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                    {e.blurb}
                  </p>
                </td>
                <td className="hidden px-5 py-4 text-muted sm:table-cell">
                  <span className="text-xs">{e.course}</span>
                </td>
                <td className="px-5 py-4 text-right font-mono text-body">
                  {e.liveReads.toLocaleString()}
                </td>
                <td className="hidden px-5 py-4 text-right font-mono text-muted md:table-cell">
                  {e.liveDone.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 text-2xl font-bold tracking-tight">
        Top Courses by Engagement
      </h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5 font-medium">#</th>
              <th className="px-5 py-3.5 font-medium">Course</th>
              <th className="px-5 py-3.5 text-right font-medium">Chapters</th>
              <th className="px-5 py-3.5 text-right font-medium">Reads</th>
              <th className="hidden px-5 py-3.5 text-right font-medium md:table-cell">Readers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {courseRows.map((c, i) => (
              <tr key={c.slug} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4">
                  <span
                    className={`text-lg font-bold ${
                      i < 3 ? "text-emerald-400" : "text-faint"
                    }`}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/courses/${c.slug}`}
                    className="font-medium text-ink hover:text-emerald-300"
                  >
                    {c.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted">{c.code}</p>
                </td>
                <td className="px-5 py-4 text-right font-mono text-body">
                  {totalChapters(c)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-body">
                  {c.liveReads.toLocaleString()}
                </td>
                <td className="hidden px-5 py-4 text-right font-mono text-muted md:table-cell">
                  {c.liveDone.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-faint">
        Counts update in real time as readers browse chapters. Sign in to have
        your reading progress recorded on your profile.
      </p>
    </div>
  );
}
