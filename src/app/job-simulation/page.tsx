import type { Metadata } from "next";
import Link from "next/link";
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
        SAR deadlines — plus SAR/STR filing simulations for the US, UK, Canada,
        Australia, Singapore, Hong Kong, Japan, UAE and the EU. Every decision is
        scored with the reasoning a senior analyst would give. Best scores are
        saved on this device.
      </p>
      <ViewTracker type="search" id="job-simulation" />
      <div className="mt-10">
        <JobSimulation />
      </div>
      <p className="mt-10 text-sm text-muted">
        Want to test the platform knowledge employers ask about? Try the{" "}
        <Link
          href="/cert-mocks/ops-tooling"
          className="font-medium text-emerald-400 hover:underline"
        >
          Operations &amp; Tooling readiness mock
        </Link>{" "}
        — TM platforms, chain analytics, SAR/STR support and QA.
      </p>
    </div>
  );
}
