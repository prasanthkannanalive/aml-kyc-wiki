import type { Metadata } from "next";
import SarWriter from "@/components/SarWriter";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "SAR Writing Practice — AML/KYC Wiki",
  description:
    "Draft suspicious-activity report narratives from real case briefs and get fact-coverage scoring plus a model answer to compare.",
};

export default function SarWriterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="sar-writer" />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Field craft
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">SAR narrative writing</h1>
      <p className="mt-3 max-w-2xl text-muted">
        The most-judged skill in AML work. Each exercise gives you a case brief —
        write the narrative an FIU analyst would file, then check your fact
        coverage against the model answer.
      </p>
      <div className="mt-8">
        <SarWriter />
      </div>
      <p className="mt-6 text-xs leading-5 text-faint">
        Scoring checks factual coverage (who/what/when/where/why) — it can&apos;t
        judge prose quality, so always compare against the model narrative.
        Real SARs go to your FIU, not the public.
      </p>
    </div>
  );
}
