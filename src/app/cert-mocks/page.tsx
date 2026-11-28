import type { Metadata } from "next";
import Link from "next/link";
import { CERT_MOCKS } from "@/lib/cert-mocks";

export const metadata: Metadata = {
  title: "Certification Mock Exams — AML/KYC Wiki",
  description:
    "Full-length certification mocks for the IIBF AML/KYC certificate, NISM Series XXIV, and the ACAMS CAMS — plus an operations & tooling readiness mock — real exam format, timed, with per-option explanations on review.",
};

export default function CertMocksPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Certification prep
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Certification mock exams
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Full-length mocks built to the real exam specs — question count, time
        limit, and pass mark — for the three credentials AML/KYC professionals
        actually sit for, plus a job-readiness mock covering the platforms and
        workflows employers ask about (Actimize, Verafin, Quantexa, Chainalysis,
        SAR/STR support, QA). Every question includes a per-option explanation
        on review. Certification mocks do not issue credentials.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERT_MOCKS.map((m) => (
          <Link
            key={m.id}
            href={`/cert-mocks/${m.id}`}
            className="group flex flex-col rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-emerald-400/50"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                {m.body}
              </p>
              {m.pro ? (
                <span className="shrink-0 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
                  Pro
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-faint">
                  Free
                </span>
              )}
            </div>
            <h2 className="mt-1 text-base font-bold leading-6 text-ink group-hover:text-emerald-300">
              {m.cert}
            </h2>
            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-faint">Fee</dt>
                <dd className="text-right text-muted">{m.fee}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-faint">Format</dt>
                <dd className="text-right text-muted">{m.format}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-faint">Questions</dt>
                <dd className="text-muted">{m.questions.length} MCQs</dd>
              </div>
            </dl>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors group-hover:bg-emerald-400/20">
              Start mock →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-line bg-surface/50 p-5">
        <h2 className="text-sm font-bold text-ink">How the mocks work</h2>
        <ul className="mt-2 space-y-1.5 text-xs leading-5 text-muted">
          <li>
            <span className="font-semibold text-ink">Real conditions</span> —
            full question count and the actual exam duration, with a live timer
            that auto-submits at zero.
          </li>
          <li>
            <span className="font-semibold text-ink">Real pass marks</span> —
            IIBF 60%, NISM 50%, CAMS 75 correct answers.
          </li>
          <li>
            <span className="font-semibold text-ink">Teach-back review</span> —
            after submitting, every question expands into per-option
            explanations: why the right answer is right and why each distractor
            is wrong.
          </li>
          <li>
            <span className="font-semibold text-ink">Question map</span> — jump
            to any question via the numbered palette; unanswered questions
            count as wrong, just like the real exam.
          </li>
        </ul>
      </div>

      <p className="mt-8 text-xs leading-5 text-muted">
        Want quicker drills? The{" "}
        <Link href="/exams" className="text-emerald-400 hover:underline">
          course mock simulator
        </Link>{" "}
        runs 20-question timed papers across all seven courses. The mocks
        above are the full certification-length versions.
      </p>
    </div>
  );
}
