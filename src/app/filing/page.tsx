import type { Metadata } from "next";
import FilingGuide from "@/components/FilingGuide";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "SAR/STR Filing Guides by Jurisdiction — AML/KYC Wiki",
  description:
    "How suspicious-activity reports are actually filed in the US, UK, EU, Canada, India and Singapore — deadlines, channels, form fields and examiner traps.",
};

export default function FilingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="filing" />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Field craft
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Filing walkthroughs</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Knowing a SAR is required is half the job — knowing <em>how</em> it&apos;s
        filed in your jurisdiction is the other half. Pick a regime and walk the
        process: deadline, channel, form fields, and the traps examiners probe.
      </p>
      <div className="mt-8">
        <FilingGuide />
      </div>
    </div>
  );
}
