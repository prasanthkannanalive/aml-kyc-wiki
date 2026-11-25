import type { Metadata } from "next";
import DocSpotter from "@/components/DocSpotter";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Document Red-Flag Spotter — AML/KYC Wiki",
  description:
    "Spot the planted issues in realistic trade, KYB, Travel Rule and SAR documents — with decoys that test whether you over-flag.",
};

export default function DocSpotterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="doc-spotter" />
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Field craft
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Document red-flag spotter</h1>
      <p className="mt-3 max-w-2xl text-muted">
        The eyeball skill examiners test: real issues hide among plausible
        decoys. Review each document, select every genuine red flag, and learn
        why each one matters — and why the decoys don&apos;t.
      </p>
      <div className="mt-8">
        <DocSpotter />
      </div>
    </div>
  );
}
