import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CERT_MOCKS, getCertMock } from "@/lib/cert-mocks";
import { getSessionUser } from "@/lib/auth";
import CertMockRunner from "@/components/CertMockRunner";
import ProCheckout from "@/components/ProCheckout";

export function generateStaticParams() {
  return CERT_MOCKS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mock = getCertMock(id);
  if (!mock) return {};
  return {
    title: `${mock.cert} Mock — AML/KYC Wiki`,
    description: `Full-length ${mock.format.toLowerCase()} practice mock with explanations.`,
  };
}

export default async function CertMockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mock = getCertMock(id);
  if (!mock) notFound();

  const user = await getSessionUser();
  const isPro = user?.plan === "pro" || user?.plan === "team";
  const gated = mock.pro === true && !isPro;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/cert-mocks"
        className="font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        ← All certification mocks
      </Link>
      <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        {mock.body}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{mock.cert}</h1>
      <p className="mt-2 text-sm text-muted">
        {mock.format} · Fee: {mock.fee} · {mock.questions.length} questions
      </p>
      <p className="mt-1 text-xs text-faint">
        Practice simulation only — completing this mock does not issue the
        certification.
      </p>

      {gated ? (
        <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 sm:p-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Pro feature
          </p>
          <h2 className="mt-1 text-lg font-bold text-ink">
            This certification mock is part of Pro
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {user
              ? "Upgrade to Pro to unlock full-length certification mocks with timed conditions, section-wise scoring and per-option explanations."
              : "Sign in and upgrade to Pro to unlock full-length certification mocks with timed conditions, section-wise scoring and per-option explanations."}
          </p>
          <div className="mt-5">
            <ProCheckout />
          </div>
          {!user && (
            <p className="mt-4 text-xs text-muted">
              <Link href="/signup" className="text-emerald-400 hover:underline">
                Create a free account
              </Link>{" "}
              first if you don&apos;t have one.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <CertMockRunner mock={mock} />
        </div>
      )}
    </div>
  );
}
