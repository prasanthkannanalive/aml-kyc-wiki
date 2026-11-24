import type { Metadata } from "next";
import { enforcementCases } from "@/lib/cases";
import CasesBrowser from "@/components/CasesBrowser";

export const metadata: Metadata = {
  title: "Enforcement Cases",
  description:
    "Landmark AML/KYC enforcement cases — bank scandals, regulator penalties and founder prosecutions, with the control failures behind each. Filter by country, typology and decade.",
};

export default function CasesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Enforcement Cases</h1>
      <p className="mt-3 max-w-3xl text-muted">
        The cases that defined modern AML/KYC enforcement — what happened, who
        was held accountable, and where the controls failed. Filter by country,
        typology or decade, and sort by penalty or year.
      </p>
      <div className="mt-8">
        <CasesBrowser cases={enforcementCases} />
      </div>
    </div>
  );
}
