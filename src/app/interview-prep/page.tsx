import type { Metadata } from "next";
import { interviewSections } from "@/lib/content";
import InterviewBrowser from "@/components/InterviewBrowser";
import QuizMode from "@/components/QuizMode";
import MockInterview from "@/components/MockInterview";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Interview Prep",
  description:
    "AML/KYC interview questions and crisp answers — money laundering, KYC/CDD, sanctions screening, reporting and transaction monitoring alerts.",
};

export default function InterviewPrepPage() {
  const count = interviewSections.reduce((n, s) => n + s.items.length, 0);
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">AML/KYC Interview Prep</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {count} rapid-fire questions with concise answers — the vocabulary,
        processes and distinctions interviewers actually probe. Search or tap a
        question to reveal the answer.
      </p>
      <ViewTracker type="interview" id="all" />
      <div className="mt-8">
        <QuizMode sections={interviewSections} />
      </div>
      <div className="mt-8">
        <MockInterview sections={interviewSections} />
      </div>
      <div className="mt-8">
        <InterviewBrowser sections={interviewSections} />
      </div>
    </div>
  );
}
