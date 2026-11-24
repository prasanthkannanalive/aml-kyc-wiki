"use client";

import { useMemo, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { totalChapters, type Course } from "@/lib/content";

const TRACKS: Record<string, string> = {
  "fraud-prevention": "Fraud",
  "sanctions-screening": "Sanctions",
  "counter-terrorist-financing": "CTF",
  "financial-intelligence-trafficking": "Financial Intelligence",
  "kyc-cdd-tm-analyst": "KYC / CDD / TM",
  "virtual-asset-compliance": "Virtual Assets",
  "trade-based-laundering": "TBML",
};

export default function CoursesBrowser({
  items,
}: {
  items: { course: Course; liveReads?: number }[];
}) {
  const [q, setQ] = useState("");
  const [track, setTrack] = useState("All");
  const [level, setLevel] = useState("All");

  const tracks = useMemo(() => ["All", ...Object.values(TRACKS)], []);
  const levels = useMemo(
    () => ["All", ...new Set(items.map((i) => i.course.level))],
    [items]
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const terms = needle.split(/\s+/).filter(Boolean);
    return items.filter(({ course }) => {
      if (track !== "All" && TRACKS[course.slug] !== track) return false;
      if (level !== "All" && course.level !== level) return false;
      if (!terms.length) return true;
      const hay = [
        course.title,
        course.tagline,
        course.code,
        course.description,
        course.audience.join(" "),
        course.outcomes.join(" "),
        course.modules.map((m) => m.title).join(" "),
        course.modules.flatMap((m) => m.chapters.map((c) => c.title)).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, q, track, level]);

  const totalChaptersAll = items.reduce((s, i) => s + totalChapters(i.course), 0);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, modules, chapters, outcomes…"
            className="w-full rounded-xl border border-line bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-faint focus:border-emerald-400/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                level === l
                  ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300"
                  : "border-line bg-surface/50 text-muted hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-faint">
          Track
        </span>
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              track === t
                ? "border-sky-400/50 bg-sky-400/15 text-sky-300"
                : "border-line bg-surface/50 text-muted hover:text-ink"
            }`}
          >
            {t}
            {t !== "All" && (
              <span className="ml-1.5 opacity-60">
                {items.filter((i) => TRACKS[i.course.slug] === t).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs text-faint">
        {results.length} of {items.length} courses · {totalChaptersAll} chapters
        {q && ` — matching "${q}"`}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface/40 p-10 text-center">
          <p className="text-sm text-muted">
            No courses match{" "}
            <span className="font-medium text-ink">&ldquo;{q}&rdquo;</span>
            {track !== "All" && ` in ${track}`}
            {level !== "All" && ` at ${level} level`}.
          </p>
          <button
            onClick={() => {
              setQ("");
              setTrack("All");
              setLevel("All");
            }}
            className="mt-4 rounded-lg border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-400/10"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {results.map(({ course, liveReads }) => (
            <CourseCard key={course.slug} course={course} liveReads={liveReads} />
          ))}
        </div>
      )}
    </div>
  );
}
