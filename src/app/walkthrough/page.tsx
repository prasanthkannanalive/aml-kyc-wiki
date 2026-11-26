import type { Metadata } from "next";
import Walkthrough from "@/components/Walkthrough";

export const metadata: Metadata = {
  title: "Site Walkthrough — AML/KYC Wiki",
  description:
    "A guided 11-step tour of the AML/KYC Wiki — courses, learning paths, playground simulations, field-craft labs, credentials and reference material.",
};

export default function WalkthroughPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Orientation
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Website walkthrough
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Eleven stops covering everything the site offers — what each area does,
        why it matters, and a direct link to try it. Click any step in the map
        to jump around.
      </p>

      <div className="mt-8">
        <Walkthrough />
      </div>
    </div>
  );
}
