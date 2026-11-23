import type { Metadata } from "next";
import { courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the AML/KYC Wiki — a knowledge base built from professional certification study guides.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="mt-6 space-y-5 leading-8 text-muted">
        <p>
          AML/KYC Wiki is a knowledge base for the people who do
          anti-money-laundering, know-your-customer and financial-crime
          operations work — analysts, compliance officers, fraud teams and the
          students training to join them.
        </p>
        <p>
          The content is built from professional certification study guides:
          Fraud Prevention, Sanctions Screening, Counter-Terrorist Financing,
          Financial Intelligence Against Human Trafficking and the Certified
          KYC/CDD & Transaction Monitoring Analyst programme —{" "}
          {courses.length} courses, each broken into modules and chapters so
          you can browse by discipline rather than by page number.
        </p>
        <p>
          The guides teach principles and mechanisms first — but they do not
          shy away from the numbers that matter: ownership thresholds,
          reporting deadlines and filing mechanics are taught with their
          jurisdictional sources. Where rules change fast, each chapter notes
          when it was last reviewed and points to the regulator or source to
          verify.
        </p>
        <p className="text-sm text-muted">
          This site is educational material. It is not legal advice and does not
          state what the law requires of any particular organisation — always
          rely on the text of the law, regulator guidance and professional
          advice.
        </p>
      </div>
    </div>
  );
}
