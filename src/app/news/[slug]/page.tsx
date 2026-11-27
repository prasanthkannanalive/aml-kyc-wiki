import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "@/lib/editorial";

export function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = news.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.dek } : {};
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = news.find((x) => x.slug === slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    author: { "@type": "Organization", name: "AML/KYC Wiki" },
    publisher: { "@type": "Organization", name: "AML/KYC Wiki" },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/news" className="hover:text-ink">News</Link>
      </nav>
      <div className="mt-8 flex items-center gap-3 text-xs text-muted">
        <span className="rounded bg-emerald-400/10 px-2 py-0.5 font-medium text-emerald-300">
          {a.tag}
        </span>
        <span>{a.date}</span>
        <span>{a.mins} min read</span>
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {a.title}
      </h1>
      <p className="mt-3 text-lg text-body">{a.dek}</p>
      <div className="mt-8 space-y-5">
        {a.body.map((p, i) => (
          <p key={i} className="leading-8 text-body">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
