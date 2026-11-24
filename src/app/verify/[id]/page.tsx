import Link from "next/link";
import type { Metadata } from "next";
import { getCert } from "@/lib/db";

export const metadata: Metadata = {
  title: "Verify Certificate — AML/KYC Wiki",
  description: "Verify an AML/KYC Wiki course-completion certificate.",
};

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = await getCert(id.toUpperCase());

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      {cert ? (
        <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent p-8 text-center sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Certificate of completion
          </p>
          <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
            {cert.courseTitle}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted">{cert.code}</p>

          <div className="mx-auto mt-8 max-w-md rounded-xl border border-line bg-surface/60 p-6">
            <p className="text-xs uppercase tracking-wider text-muted">
              Awarded to the learner who passed the final assessment
            </p>
            <p className="mt-3 break-all font-mono text-lg font-bold text-ink">
              {cert.id}
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted">
              <span>
                Issued{" "}
                {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3">
            <span className="text-emerald-400">✓</span>
            <p className="text-xs text-emerald-300">
              Verified — this certificate was issued by AML/KYC Wiki and the
              record matches our registry.
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-muted">
            This is a course-completion credential issued by this knowledge
            base. It is not an external accreditation or government licence.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/5 p-10 text-center">
          <p className="text-4xl">✕</p>
          <h1 className="mt-3 text-xl font-bold text-ink">
            Certificate not found
          </h1>
          <p className="mt-2 text-sm text-muted">
            No certificate with ID <span className="font-mono">{id}</span> exists
            in our registry. Check the ID and try again.
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/courses"
          className="text-sm font-medium text-emerald-400 underline-offset-2 hover:underline"
        >
          Browse courses →
        </Link>
      </div>
    </div>
  );
}
