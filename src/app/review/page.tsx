import type { Metadata } from "next";
import { courses } from "@/lib/content";
import { MODULE_QUIZZES } from "@/lib/module-quizzes";
import ReviewSession from "@/components/ReviewSession";

export const metadata: Metadata = {
  title: "Daily Review — AML/KYC Wiki",
  description:
    "Spaced-repetition review: 10 random questions from across every course to keep AML/KYC knowledge fresh.",
};

export default function ReviewPage() {
  const pool = courses.flatMap((c) =>
    Object.values(MODULE_QUIZZES[c.slug] ?? {}).flatMap((qs) =>
      qs.map((q) => ({ course: c.code, q }))
    )
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Spaced repetition
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Daily review
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Ten questions pulled at random from every course&apos;s module banks —
        the forgetting curve does the rest. Come back tomorrow to keep your
        streak alive.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface/40 p-6">
        <ReviewSession questions={pool} />
      </div>
    </div>
  );
}
