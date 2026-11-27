import type { Metadata } from "next";
import { challengeDay } from "@/lib/challenge";
import DailyChallenge from "@/components/DailyChallenge";
import ViewTracker from "@/components/ViewTracker";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Challenge — AML/KYC Wiki",
  description:
    "One fixed set of five AML scenario questions per day — same for everyone worldwide. Answer, submit your score and climb today's leaderboard.",
};

export default function ChallengePage() {
  const { day, questions } = challengeDay();

  return (
    <>
      <ViewTracker type="search" id="challenge" />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Daily challenge
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Five calls. One board.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Every day at midnight UTC a fresh set of five AML scenarios drops —
          alert dispositions, typology calls and regulatory dates. Same
          questions for everyone on Earth; submit your score and take your
          place on today&apos;s leaderboard.
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-surface/40 p-6">
          <DailyChallenge day={day} questions={questions} />
        </div>
      </div>
    </>
  );
}
