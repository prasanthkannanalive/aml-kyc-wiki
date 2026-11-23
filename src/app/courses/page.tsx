import type { Metadata } from "next";
import { courses, totalChapters } from "@/lib/content";
import CourseCard from "@/components/CourseCard";
import { getCourseReads } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Certification study guides for AML, KYC and financial-crime operations: fraud prevention, sanctions screening, counter-terrorist financing and financial intelligence.",
};

export default async function CoursesPage() {
  const total = courses.reduce((s, c) => s + totalChapters(c), 0);
  const readCounts = Object.fromEntries(
    await Promise.all(courses.map(async (c) => [c.slug, await getCourseReads(c.slug)]))
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Certification Courses</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {courses.length} courses · {total} chapters — the complete curriculum
        for financial-crime operations, organised as a browsable knowledge
        base.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} liveReads={readCounts[c.slug]} />
        ))}
      </div>
    </div>
  );
}
