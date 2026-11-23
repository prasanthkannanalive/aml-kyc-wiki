import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getProgress } from "@/lib/db";
import { courses } from "@/lib/content";
import { listChapters } from "@/lib/chapters";

export const metadata: Metadata = { title: "Profile" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const progress = await getProgress(user.id);
  const readKeys = Object.keys(progress);

  // per-course progress
  const perCourse = courses.map((c) => {
    const nums = new Set(listChapters(c.slug).map((ch) => ch.num));
    const read = readKeys.filter((k) => {
      const [type, rest] = k.split(":");
      if (type !== "chapter") return false;
      const [s, n] = rest.split("/");
      return s === c.slug && nums.has(n);
    }).length;
    const total = nums.size;
    const done = readKeys.filter((k) => {
      const [type, rest] = k.split(":");
      if (type !== "done") return false;
      const [s, n] = rest.split("/");
      return s === c.slug && nums.has(n);
    }).length;
    return { course: c, read, done, total };
  });

  const totalCh = perCourse.reduce((s, p) => s + p.total, 0);
  const totalRead = perCourse.reduce((s, p) => s + p.read, 0);
  const pct = totalCh ? Math.round((totalRead / totalCh) * 100) : 0;

  const recent = readKeys
    .filter((k) => k.startsWith("chapter:"))
    .sort((a, b) => progress[b].localeCompare(progress[a]))
    .slice(0, 8)
    .map((k) => {
      const [, rest] = k.split(":");
      const [slug, num] = rest.split("/");
      const course = courses.find((c) => c.slug === slug);
      const ch = course ? listChapters(slug).find((c) => c.num === num) : null;
      return { slug, num, course, title: ch?.title ?? num };
    });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
      <p className="mt-1 text-sm text-muted">{user.email}</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <div className="text-2xl font-bold text-emerald-400">{totalRead}</div>
          <div className="mt-1 text-xs text-muted">Chapters read</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <div className="text-2xl font-bold text-emerald-400">{pct}%</div>
          <div className="mt-1 text-xs text-muted">Course coverage</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <div className="text-2xl font-bold text-emerald-400">
            {courses.length}
          </div>
          <div className="mt-1 text-xs text-muted">Courses</div>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Progress by course</h2>
      <div className="mt-4 space-y-3">
        {perCourse.map(({ course, read, done, total }) => {
          const p = total ? Math.round((read / total) * 100) : 0;
          return (
            <div
              key={course.slug}
              className="rounded-xl border border-line bg-surface/60 p-4"
            >
              <div className="flex items-center justify-between text-sm">
                <Link
                  href={`/courses/${course.slug}`}
                  className="font-medium text-ink hover:text-emerald-300"
                >
                  {course.title}
                </Link>
                <span className="font-mono text-xs text-muted">
                  {read}/{total} read · {done}/{total} done
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${p}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {recent.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold">Recently read</h2>
          <ul className="mt-4 space-y-2">
            {recent.map((r) => (
              <li key={`${r.slug}/${r.num}`}>
                <Link
                  href={`/courses/${r.slug}/chapters/${r.num}`}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface/60 px-4 py-3 text-sm transition-colors hover:border-emerald-400/40"
                >
                  <span className="font-mono text-xs text-emerald-400">{r.num}</span>
                  <span className="text-body">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
