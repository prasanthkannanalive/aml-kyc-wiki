import type { Metadata } from "next";
import Link from "next/link";
import { listLibrary, listLibraryLinks, libraryCategories } from "@/lib/library";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Document Library",
  description:
    "Downloadable AML/KYC source documents — FATF recommendations and guidance, FinCEN advisories, Wolfsberg statements, FIU-IND rules, FFIEC manual and certification study guides.",
};

export const dynamic = "force-dynamic";

const fmtSize = (kb: number) =>
  kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;

export default function LibraryPage() {
  const items = listLibrary();
  const links = listLibraryLinks();
  const categories = libraryCategories(items);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <ViewTracker type="search" id="library" />
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-body">Document Library</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Document Library
      </h1>
      <p className="mt-3 max-w-3xl leading-7 text-muted">
        Primary source documents behind the knowledge base — certification study
        guides, FATF standards, regulator guidance and industry statements.
        New documents added to the library appear here automatically.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c}
            href={`#cat-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-emerald-400/40 hover:text-ink"
          >
            {c}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          const anchor = `cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <section key={cat} id={anchor}>
              <h2 className="text-lg font-semibold text-ink">
                {cat}
                <span className="ml-2 text-sm font-normal text-faint">
                  {catItems.length} document{catItems.length === 1 ? "" : "s"}
                </span>
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catItems.map((d) => (
                  <article
                    key={d.file}
                    id={d.file}
                    className="group flex flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-emerald-400/40 scroll-mt-24"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-400/10 text-red-400">
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 1.5h5.5L13 5v9.5H4V1.5Z" />
                          <path d="M9.5 1.5V5H13" />
                        </svg>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                          Local copy
                        </span>
                        <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                          {fmtSize(d.sizeKb)}
                        </span>
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-6 text-ink">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-5 text-muted">
                      {d.description}
                    </p>
                    {d.source && (
                      <a
                        href={d.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[11px] text-faint underline-offset-2 hover:text-emerald-300 hover:underline"
                      >
                        © source publisher — view original ↗
                      </a>
                    )}
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`/resources/${d.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg bg-emerald-400 px-3 py-2 text-center text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
                      >
                        Open PDF
                      </a>
                      <a
                        href={`/resources/${d.file}`}
                        download={d.title}
                        className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-emerald-400/40 hover:text-ink"
                      >
                        Download
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {links.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold text-ink">
            Web guidance &amp; regulator pages
            <span className="ml-2 text-sm font-normal text-faint">
              {links.length} external source{links.length === 1 ? "" : "s"}
            </span>
          </h2>
          <p className="mt-1 text-sm text-muted">
            Sources that live on the publisher&apos;s site — not hosted locally.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((d) => (
              <article
                key={d.url}
                className="group flex flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-colors hover:border-emerald-400/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6.5 9.5 9.5 6.5M7 4.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M9 11.5l-1 1a3.5 3.5 0 0 1-5-5l1-1" />
                    </svg>
                  </span>
                  <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                    {d.category}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-6 text-ink">
                  {d.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-5 text-muted">
                  {d.description}
                </p>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-lg border border-line px-3 py-2 text-center text-xs font-medium text-muted transition-colors hover:border-emerald-400/40 hover:text-ink"
                >
                  Open source →
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      <p className="mt-12 rounded-xl border border-line bg-surface/50 p-4 text-xs leading-6 text-muted">
        Documents are hosted for educational reference. FATF and Wolfsberg
        publications remain © their respective publishers — local copies are
        provided for study convenience with attribution and a link to the
        original; please consult the publisher&apos;s site for authoritative
        versions and licensing terms. FinCEN/FFIEC (US federal) and UKFIU
        (Open Government Licence) documents are public-sector publications.
        Always verify requirements against the issuing regulator&apos;s current
        publications. Course guides are study aids; regulator documents are the authoritative
        sources.
      </p>
    </div>
  );
}
