import type { Metadata } from "next";
import DataLab from "@/components/DataLab";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Transaction Data Lab — AML/KYC Wiki",
  description:
    "Build detection rules against a synthetic transaction dataset and see which alerts fire — structuring, velocity, large amounts and layering, live in your browser.",
};

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="labs" />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Data lab
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Transaction Data Lab</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        A synthetic ledger with planted typologies — structuring bursts,
        velocity spikes, round-amount layering and new counterparties. Tune the
        detection rules on the left, run the monitor, and see exactly which
        transactions fire and why. This is the alert-tuning loop analysts run
        against real TMS data.
      </p>
      <div className="mt-8">
        <DataLab />
      </div>
      <p className="mt-6 text-xs leading-5 text-faint">
        All data is generated client-side — nothing leaves your browser. Rule
        logic mirrors real TM concepts: sliding-window aggregation, threshold
        checks and first-seen counterparty detection.
      </p>
    </div>
  );
}
