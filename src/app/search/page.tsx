import type { Metadata } from "next";
import { Suspense } from "react";
import { courses, glossary, interviewSections } from "@/lib/content";
import { enforcementCases } from "@/lib/cases";
import { disciplines } from "@/lib/disciplines";
import { listChapters } from "@/lib/chapters";
import { listLibrary } from "@/lib/library";
import SearchBrowser, { type SearchItem } from "@/components/SearchBrowser";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the AML/KYC knowledge base — courses, chapters, interview questions and glossary terms.",
};

export default function SearchPage() {
  const items: SearchItem[] = [];

  for (const c of courses) {
    items.push({
      title: c.title,
      subtitle: `${c.code} · ${c.tagline}`,
      href: `/courses/${c.slug}`,
      kind: "Course",
      text: `${c.description} ${c.outcomes.join(" ")}`,
    });
    for (const ch of listChapters(c.slug)) {
      items.push({
        title: `${ch.num} ${ch.title}`,
        subtitle: `${c.code} · ${ch.moduleTitle ?? ""}`,
        href: `/courses/${c.slug}/chapters/${ch.num}`,
        kind: "Chapter",
        text: `${ch.title} ${ch.moduleTitle ?? ""}`,
      });
    }
  }

  for (const s of interviewSections) {
    for (const i of s.items) {
      items.push({
        title: i.q,
        subtitle: `Interview prep · ${s.title}`,
        href: "/interview-prep",
        kind: "Question",
        text: `${i.a} ${s.title}`,
      });
    }
  }

  for (const c of enforcementCases) {
    items.push({
      title: c.org,
      subtitle: `Case · ${c.headline} (${c.year})`,
      href: `/cases/${c.slug}`,
      kind: "Case",
      text: `${c.summary} ${c.mistakes.map((m) => m.title).join(" ")} ${c.typologies.join(" ")}`,
    });
  }

  for (const d of disciplines) {
    items.push({
      title: d.title,
      subtitle: `Discipline · ${d.tagline}`,
      href: `/disciplines/${d.slug}`,
      kind: "Discipline",
      text: `${d.overview} ${d.concepts.map((c) => c.name).join(" ")} ${d.typologies.join(" ")}`,
    });
  }

  items.push(
    {
      title: "Alert Sandbox — TM triage simulation",
      subtitle: "Interactive · hands-on practice",
      href: "/sandbox",
      kind: "Tool",
      text: "Interactive transaction monitoring alert triage simulation with mock alerts and dispositions.",
    },
    {
      title: "AML Arcade — daily brain games",
      subtitle: "Interactive · daily puzzles",
      href: "/arcade",
      kind: "Tool",
      text: "Daily AML brain games: typology sorting, word puzzles, timed recognition, regulatory dates and alert dispositions.",
    },
    {
      title: "Templates & Checklists",
      subtitle: "Resources · job aids",
      href: "/resources",
      kind: "Tool",
      text: "SAR narrative template, CDD checklist, EDD PEP checklist, alert disposition framework, TM tuning checklist.",
    }
  );

  for (const d of listLibrary()) {
    items.push({
      title: d.title,
      subtitle: `Document · ${d.category} · PDF`,
      href: `/library#${d.file}`,
      kind: "Document",
      text: `${d.description} ${d.category} ${d.file}`,
    });
  }

  for (const t of glossary) {
    items.push({
      title: t.term,
      subtitle: `Glossary · ${t.category}`,
      href: "/glossary",
      kind: "Term",
      text: t.definition,
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Search the Knowledge Base</h1>
      <p className="mt-2 text-sm text-muted">
        {items.length} entries — courses, chapters, interview questions, glossary terms.
      </p>
      <form action="/search" method="get" className="mt-6">
        <input
          type="search"
          name="q"
          placeholder="Search — try 'hawala', 'EDD', 'sanctions', 'STR'…"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder-muted outline-none transition-colors focus:border-emerald-400"
        />
      </form>
      <div className="mt-8">
        <Suspense>
          <SearchBrowser items={items} />
        </Suspense>
      </div>
    </div>
  );
}
