import type { Metadata } from "next";
import JobSimulation from "@/components/JobSimulation";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "AML/KYC Job Simulation",
  description:
    "Work a simulated AML analyst shift — triage alerts, run CDD/EDD, draft SAR narratives and make filing decisions. Scored, with instant feedback.",
};

export default function JobSimulationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">AML/KYC Job Simulation</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Step into the analyst&apos;s chair. Each simulation walks you through a real
        shift — alert queues, KYC refreshes, adverse media, escalation calls and
        SAR deadlines — and scores every decision with the reasoning a senior
        analyst would give. Best scores are saved on this device.
      </p>
      <ViewTracker type="search" id="job-simulation" />
      <div className="mt-10">
        <JobSimulation />
      </div>
    </div>
  );
}
