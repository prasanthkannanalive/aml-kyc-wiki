import type { Metadata } from "next";
import Link from "next/link";
import { courses, leaderboard, totalChapters } from "@/lib/content";
import { listChapters } from "@/lib/chapters";
import { getAllProgress, getAllStats, getUsers } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Live rankings across the AML/KYC knowledge base — reads, completions, section visits and practice activity.",
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

function Bar({ pct, className = "bg-emerald-400" }: { pct: number; className?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className={`h-full rounded-full ${className}`}
        style={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
      />
    </div>
  );
}

const SECTION_LABELS: Record<string, string> = {
  tools: "Compliance tools",
  arcade: "Daily arcade",
  library: "Document library",
  careers: "Careers guide",
  "job-simulation": "Job simulation",
  search: "Search",
};

const PRACTICE_LABELS: [string, string][] = [
  ["quiz", "Module quizzes"],
  ["exam", "Final exams passed"],
  ["sandbox", "Sandbox runs"],
  ["sim", "Job simulations"],
  ["arcade", "Arcade games played"],
];

export default async function LeaderboardPage() {
  const stats = await getAllStats();
  const progress = await getAllProgress();

  /* ---------- existing: top reads ---------- */
  const rows = leaderboard.map((e) => {
    const num = chapterNumFor(e.courseSlug, e.title);
    const key = num ? `chapter:${e.courseSlug}/${num}` : null;
    const reads = key ? (stats[key] ?? 0) : 0;
    const done = key
      ? Object.values(progress).filter((p) => p[key]).length
      : 0;
    return { ...e, liveReads: reads, liveDone: done };
  });
  const maxReads = Math.max(1, ...rows.map((r) => r.liveReads));

  /* ---------- existing: top courses ---------- */
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
  const maxCourseReads = Math.max(1, ...courseRows.map((c) => c.liveReads));

  /* ---------- most completed chapters ---------- */
  const doneCounts = new Map<string, number>();
  for (const p of Object.values(progress)) {
    for (const k of Object.keys(p)) {
      if (k.startsWith("done:")) doneCounts.set(k, (doneCounts.get(k) ?? 0) + 1);
    }
  }
  const completedRows = [...doneCounts.entries()]
    .map(([key, n]) => {
      const [slug, num] = key.slice(5).split("/");
      const course = courses.find((c) => c.slug === slug);
      const ch = course ? listChapters(slug).find((c) => c.num === num) : null;
      return {
        key,
        slug,
        num,
        title: ch?.title ?? num,
        courseTitle: course?.title ?? slug,
        count: n,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const maxDone = Math.max(1, ...completedRows.map((r) => r.count));

  /* ---------- section visits (search:* stats) ---------- */
  const sectionRows = Object.entries(stats)
    .filter(([k]) => k.startsWith("search:"))
    .map(([k, v]) => ({ id: k.slice(7), count: v }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const maxSection = Math.max(1, ...sectionRows.map((r) => r.count));

  /* ---------- practice activity ---------- */
  const practiceRows = PRACTICE_LABELS.map(([type, label]) => {
    const total = Object.entries(stats)
      .filter(([k]) => k.startsWith(`${type}:`))
      .reduce((s, [, v]) => s + v, 0);
    return { type, label, total };
  }).filter((r) => r.total > 0 || r.type !== "exam");
  const maxPractice = Math.max(1, ...practiceRows.map((r) => r.total));

  /* ---------- learner streaks & weekly activity ---------- */
  const users = await getUsers();
  const nameFor = new Map(users.map((u) => [u.id, u.name || u.email]));
  const dayKey = (iso: string) => iso.slice(0, 10);
  const todayMs = Date.parse(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  const today = new Date(todayMs).toISOString().slice(0, 10);
  const dayStr = (ms: number) => new Date(ms).toISOString().slice(0, 10);
  const weekStart = todayMs - 6 * 86400000;
  const streakRows = Object.entries(progress)
    .map(([uid, p]) => {
      const days = new Set(
        Object.values(p)
          .filter((v) => typeof v === "string")
          .map(dayKey)
      );
      // streak: consecutive days ending today or yesterday
      let streak = 0;
      let cursor = days.has(today) ? todayMs : todayMs - 86400000;
      while (days.has(dayStr(cursor))) {
        streak += 1;
        cursor -= 86400000;
      }
      const week = Object.values(p).filter(
        (v) => typeof v === "string" && Date.parse(v) >= weekStart
      ).length;
      return {
        uid,
        name: nameFor.get(uid) ?? `Reader ${uid.slice(0, 6)}`,
        streak,
        week,
        total: Object.keys(p).length,
      };
    })
    .filter((r) => r.streak > 0 || r.week > 0)
    .sort((a, b) => b.streak - a.streak || b.week - a.week)
    .slice(0, 8);

  /* ---------- live strip ---------- */
  const totalEvents = Object.values(stats).reduce((s, v) => s + v, 0);
  const totalReads = Object.entries(stats)
    .filter(([k]) => k.startsWith("chapter:") || k.startsWith("course:"))
    .reduce((s, [, v]) => s + v, 0);
  const totalDone = [...doneCounts.values()].reduce((s, v) => s + v, 0);
  const readers = Object.keys(progress).length;

  const card = "rounded-2xl border border-line bg-surface/50 p-5";

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Leaderboard</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Live rankings across the knowledge base — reads, completions,
            section visits and practice activity, updated in real time.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          LIVE
        </span>
      </div>

      {/* live stats strip */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tracked events", value: totalEvents },
          { label: "Chapter & course reads", value: totalReads },
          { label: "Completions", value: totalDone },
          { label: "Registered readers", value: readers },
        ].map((s) => (
          <div key={s.label} className={card}>
            <div className="font-mono text-2xl font-bold text-emerald-400">
              {s.value.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* most read topics */}
      <h2 className="mt-12 text-2xl font-bold tracking-tight">Top Reads</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5 font-medium">#</th>
              <th className="px-5 py-3.5 font-medium">Topic</th>
              <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Course</th>
              <th className="w-32 px-5 py-3.5 font-medium">Share</th>
              <th className="px-5 py-3.5 text-right font-medium">Reads</th>
              <th className="hidden px-5 py-3.5 text-right font-medium md:table-cell">Done</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {rows.map((e, i) => (
              <tr key={e.title} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4">
                  <span className={`text-lg font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link href={`/courses/${e.courseSlug}`} className="font-medium text-ink hover:text-emerald-300">
                    {e.title}
                  </Link>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted">{e.blurb}</p>
                </td>
                <td className="hidden px-5 py-4 text-muted sm:table-cell">
                  <span className="text-xs">{e.course}</span>
                </td>
                <td className="px-5 py-4">
                  <Bar pct={(e.liveReads / maxReads) * 100} />
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

      {/* most completed */}
      {completedRows.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold tracking-tight">Most Completed Chapters</h2>
          <div className="mt-6 space-y-2.5">
            {completedRows.map((r, i) => (
              <div key={r.key} className="flex items-center gap-4 rounded-xl border border-line bg-surface/50 px-4 py-3">
                <span className={`w-6 text-center font-mono text-sm font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{r.title}</div>
                  <div className="text-[11px] text-muted">{r.courseTitle}</div>
                </div>
                <div className="hidden w-40 sm:block">
                  <Bar pct={(r.count / maxDone) * 100} className="bg-sky-400/80" />
                </div>
                <span className="w-14 text-right font-mono text-sm text-body">{r.count}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* top courses */}
      <h2 className="mt-12 text-2xl font-bold tracking-tight">Top Courses by Engagement</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5 font-medium">#</th>
              <th className="px-5 py-3.5 font-medium">Course</th>
              <th className="px-5 py-3.5 text-right font-medium">Chapters</th>
              <th className="w-32 px-5 py-3.5 font-medium">Share</th>
              <th className="px-5 py-3.5 text-right font-medium">Reads</th>
              <th className="hidden px-5 py-3.5 text-right font-medium md:table-cell">Readers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {courseRows.map((c, i) => (
              <tr key={c.slug} className="transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-4">
                  <span className={`text-lg font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Link href={`/courses/${c.slug}`} className="font-medium text-ink hover:text-emerald-300">
                    {c.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted">{c.code}</p>
                </td>
                <td className="px-5 py-4 text-right font-mono text-body">
                  {totalChapters(c)}
                </td>
                <td className="px-5 py-4">
                  <Bar pct={(c.liveReads / maxCourseReads) * 100} className="bg-emerald-400/70" />
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

      {/* section visits */}
      {sectionRows.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold tracking-tight">Most Visited Sections</h2>
          <div className="mt-6 space-y-2.5">
            {sectionRows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-4 rounded-xl border border-line bg-surface/50 px-4 py-3">
                <span className={`w-6 text-center font-mono text-sm font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">
                    {SECTION_LABELS[r.id] ?? r.id}
                  </div>
                </div>
                <div className="hidden w-40 sm:block">
                  <Bar pct={(r.count / maxSection) * 100} className="bg-violet-400/70" />
                </div>
                <span className="w-14 text-right font-mono text-sm text-body">{r.count}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* learner streaks */}
      {streakRows.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold tracking-tight">
            Learner Streaks &amp; This Week
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3.5 font-medium">#</th>
                  <th className="px-5 py-3.5 font-medium">Learner</th>
                  <th className="px-5 py-3.5 text-right font-medium">🔥 Streak</th>
                  <th className="hidden px-5 py-3.5 text-right font-medium sm:table-cell">This week</th>
                  <th className="hidden px-5 py-3.5 text-right font-medium md:table-cell">All-time activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {streakRows.map((r, i) => (
                  <tr key={r.uid} className="transition-colors hover:bg-surface-2/50">
                    <td className="px-5 py-4">
                      <span className={`text-lg font-bold ${i < 3 ? "text-emerald-400" : "text-faint"}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">{r.name}</td>
                    <td className="px-5 py-4 text-right font-mono text-body">
                      {r.streak > 0 ? `${r.streak}d` : "—"}
                    </td>
                    <td className="hidden px-5 py-4 text-right font-mono text-muted sm:table-cell">
                      {r.week} events
                    </td>
                    <td className="hidden px-5 py-4 text-right font-mono text-muted md:table-cell">
                      {r.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-faint">
            Streaks count consecutive days with recorded progress; &quot;this
            week&quot; counts activity events in the last 7 days.
          </p>
        </>
      )}

      {/* practice activity */}
      <h2 className="mt-12 text-2xl font-bold tracking-tight">Practice Activity</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {practiceRows.map((r) => (
          <div key={r.type} className={card}>
            <div className="font-mono text-xl font-bold text-emerald-400">{r.total}</div>
            <div className="mt-1 text-xs text-muted">{r.label}</div>
            <div className="mt-3">
              <Bar pct={(r.total / maxPractice) * 100} className="bg-amber-400/80" />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-faint">
        Counts update in real time as readers browse, quiz, simulate and play.
        Practice categories (quizzes, exams, sandbox, simulations, arcade) started
        tracking recently — numbers grow as users engage. Sign in to have your
        reading progress recorded on your profile.
      </p>
    </div>
  );
}
