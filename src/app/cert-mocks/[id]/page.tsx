import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CERT_MOCKS, getCertMock } from "@/lib/cert-mocks";
import CertMockRunner from "@/components/CertMockRunner";

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
      <div className="mt-8">
        <CertMockRunner mock={mock} />
      </div>
    </div>
  );
}
