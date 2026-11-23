import Link from "next/link";
import { totalChapters, type Course } from "@/lib/content";

export default function CourseCard({ course, liveReads }: { course: Course; liveReads?: number }) {
  const chapters = totalChapters(course);
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all hover:border-emerald-400/40 hover:bg-surface"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
          {course.code}
        </span>
        <span className="text-xs text-muted">{course.level}</span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-ink group-hover:text-emerald-300">
        {course.title}
      </h3>
      <p className="mt-1 text-sm text-emerald-400/80">{course.tagline}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
        {course.description}
      </p>
      <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-muted">
        <span>{course.modules.length} modules</span>
        <span>{chapters} chapters</span>
        <span>{course.pages} pages</span>
        <span className="ml-auto text-emerald-400/70 group-hover:text-emerald-300">
          {liveReads !== undefined
            ? liveReads > 0
              ? `${liveReads.toLocaleString()} reads →`
              : "Start reading →"
            : `${course.reads.toLocaleString()} reads →`}
        </span>
      </div>
    </Link>
  );
}
