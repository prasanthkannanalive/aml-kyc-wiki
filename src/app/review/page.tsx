import type { Metadata } from "next";
import { courses } from "@/lib/content";
import { MODULE_QUIZZES } from "@/lib/module-quizzes";
import { getSessionUser } from "@/lib/auth";
import { getQuizStats } from "@/lib/db";
import ReviewSession from "@/components/ReviewSession";

export const metadata: Metadata = {
  title: "Daily Review — AML/KYC Wiki",
  description:
    "Adaptive spaced-repetition review: questions weighted toward the topics you keep missing, across every course.",
};

export default async function ReviewPage() {
  const pool = courses.flatMap((c) =>
    Object.values(MODULE_QUIZZES[c.slug] ?? {}).flatMap((qs) =>
      qs.map((q) => ({ course: c.code, q }))
    )
  );

  // server-side weak keys for logged-in users (localStorage covers guests)
  let weakKeys: string[] = [];
  const user = await getSessionUser();
  if (user) {
    const stats = await getQuizStats(user.id);
    weakKeys = Object.entries(stats)
      .filter(([, s]) => s.c + s.w > 0 && s.c / (s.c + s.w) < 0.6)
      .map(([k]) => k);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Spaced repetition
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Daily review
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Ten questions pulled from every course&apos;s module banks — weighted
        toward the topics you keep missing, so review time goes where it
        counts. Come back tomorrow to keep your streak alive.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface/40 p-6">
        <ReviewSession questions={pool} weakKeys={weakKeys} />
      </div>
    </div>
  );
}
