"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface SearchItem {
  title: string;
  subtitle: string;
  href: string;
  kind: "Course" | "Chapter" | "Question" | "Term" | "Case" | "Discipline" | "Tool" | "Document" | "Regulator" | "Vendor";
  text: string;
}

export default function SearchBrowser({ items }: { items: SearchItem[] }) {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").toLowerCase();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return items
      .map((item) => {
        const hay = `${item.title} ${item.subtitle} ${item.text}`.toLowerCase();
        const score = terms.reduce(
          (s, t) => s + (item.title.toLowerCase().includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0),
          0
        );
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 60)
      .map((r) => r.item);
  }, [q, items]);

  const kindColor: Record<SearchItem["kind"], string> = {
    Course: "bg-emerald-400/10 text-emerald-300",
    Chapter: "bg-sky-400/10 text-sky-300",
    Question: "bg-amber-400/10 text-amber-300",
    Term: "bg-violet-400/10 text-violet-300",
    Case: "bg-red-400/10 text-red-300",
    Discipline: "bg-cyan-400/10 text-cyan-300",
    Tool: "bg-fuchsia-400/10 text-fuchsia-300",
    Document: "bg-orange-400/10 text-orange-300",
    Regulator: "bg-teal-400/10 text-teal-300",
    Vendor: "bg-indigo-400/10 text-indigo-300",
  };

  return (
    <div>
      {!q.trim() ? (
        <p className="rounded-xl border border-line bg-surface/50 p-6 text-sm text-muted">
          Type a query above to search across courses, chapters, interview
          questions and the glossary — e.g. “hawala”, “EDD”, “50 percent rule”.
        </p>
      ) : results.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface/50 p-6 text-sm text-muted">
          No results for “{params.get("q")}”. Try a broader term.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">
            {results.length} result{results.length === 1 ? "" : "s"} for “
            {params.get("q")}”
          </p>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.href + r.title}>
                <Link
                  href={r.href}
                  className="flex items-start gap-4 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-emerald-400/40"
                >
                  <span
                    className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-[11px] font-medium ${kindColor[r.kind]}`}
                  >
                    {r.kind}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">
                      {r.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted">
                      {r.subtitle}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
