import type { Metadata } from "next";
import Tools from "@/components/Tools";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Interactive Tools",
  description:
    "Hands-on AML/KYC tools — CDD risk calculator, UBO ownership threshold calculator and SAR/STR deadline timer.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Interactive Tools</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Practical calculators for the work AML analysts actually do — risk rating,
        beneficial-ownership unwrapping and filing deadlines. All run in your browser.
      </p>
      <ViewTracker type="search" id="tools" />
      <div className="mt-10">
        <Tools />
      </div>
      <div className="mt-10 rounded-2xl border border-line bg-surface/50 p-5">
        <h2 className="text-base font-semibold text-ink">Want to see the platforms these tools sit inside?</h2>
        <p className="mt-1 text-sm text-muted">
          The calculators here mirror logic that runs inside the real compliance stack — explore the
          vendor landscape, watch a guided screening→SAR walkthrough, or trace a money trail hop by hop.
        </p>
        <a
          href="/stack"
          className="mt-3 inline-block rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
        >
          Open the Compliance Stack Landscape →
        </a>
      </div>
    </div>
  );
}
