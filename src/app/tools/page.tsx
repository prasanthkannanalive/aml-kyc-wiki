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
    </div>
  );
}
