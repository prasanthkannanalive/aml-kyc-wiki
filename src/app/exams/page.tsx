import type { Metadata } from "next";
import { courses } from "@/lib/content";
import { MODULE_QUIZZES, FINAL_EXAM } from "@/lib/module-quizzes";
import ExamSimulator, { type BankCourse } from "@/components/ExamSimulator";

export const metadata: Metadata = {
  title: "Mock Exams — AML/KYC Wiki",
  description:
    "Timed, randomized mock exams across every AML/KYC course — mixed papers or per-course simulations with per-module score breakdowns.",
};

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const bank: BankCourse[] = courses.map((c) => {
    const modQs = Object.entries(MODULE_QUIZZES[c.slug] ?? {}).flatMap(
      ([mod, qs]) => qs.map((q) => ({ ...q, module: `M${mod}` }))
    );
    const finalQs = (FINAL_EXAM[c.slug] ?? []).map((q) => ({
      ...q,
      module: "Final",
    }));
    return {
      slug: c.slug,
      title: c.title,
      code: c.code,
      questions: [...modQs, ...finalQs],
    };
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Assessment
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Mock exam simulator
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Real-exam conditions: 20 randomized questions, a 15-minute timer, and a
        pass mark of 70%. Scores break down by module so you know exactly where
        to revise. Mixed mode samples across every course.
      </p>

      <div className="mt-8">
        <ExamSimulator
          courses={bank}
          initialSlug={course && bank.some((b) => b.slug === course) ? course : ""}
        />
      </div>

      <p className="mt-8 text-xs leading-5 text-muted">
        Questions are drawn from the same banks as the end-of-module checks and
        final assessments in each course. Passing a course&apos;s own final
        exam (not the simulator) is what issues your verifiable certificate.
      </p>
    </div>
  );
}
