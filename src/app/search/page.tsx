import type { Metadata } from "next";
import { Suspense } from "react";
import { courses, glossary, interviewSections } from "@/lib/content";
import { enforcementCases } from "@/lib/cases";
import { disciplines } from "@/lib/disciplines";
import { listChapters } from "@/lib/chapters";
import { listLibrary } from "@/lib/library";
import { REGULATORS } from "@/lib/regulators";
import { VENDORS, LAYERS } from "@/lib/compliance-stack";
import SearchBrowser, { type SearchItem } from "@/components/SearchBrowser";
import SearchBox from "@/components/SearchBox";

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
      title: "Interactive Tools — risk calculator, UBO calculator, SAR timer",
      subtitle: "Interactive · calculators",
      href: "/tools",
      kind: "Tool",
      text: "CDD customer risk calculator, beneficial ownership threshold calculator and SAR/STR filing deadline timer.",
    },
    {
      title: "AML/KYC Job Simulation — analyst shift roleplay",
      subtitle: "Interactive · scored decisions",
      href: "/job-simulation",
      kind: "Tool",
      text: "Simulated AML analyst shifts: alert triage, KYC/EDD, adverse media, SAR drafting and filing decisions with scored feedback.",
    },
    {
      title: "AML/KYC Careers — roles, requirements, certifications",
      subtitle: "Guide · career ladder",
      href: "/careers",
      kind: "Tool",
      text: "AML/KYC career paths from entry analyst to MLRO/CCO — responsibilities, requirements, certifications and a personal readiness tracker.",
    },
    {
      title: "Templates & Checklists",
      subtitle: "Resources · job aids",
      href: "/resources",
      kind: "Tool",
      text: "SAR narrative template, CDD checklist, EDD PEP checklist, alert disposition framework, TM tuning checklist.",
    }
  );

  items.push({
    title: "Regulatory Bodies — FIUs & AML supervisors by country",
    subtitle: "Directory · 16 jurisdictions",
    href: "/regulators",
    kind: "Tool",
    text: "Financial intelligence units and AML regulators by country — legal framework, filing channel, deadline style and regime maturity.",
  });

  for (const r of REGULATORS) {
    items.push({
      title: `${r.country} — ${r.fiu.split("—")[0].trim()}`,
      subtitle: `Regulator · ${r.tier} regime`,
      href: `/regulators#${r.code.toLowerCase()}`,
      kind: "Regulator",
      text: `${r.regulator} ${r.law} ${r.filing} ${r.deadline} ${r.note} ${r.fatf}`,
    });
  }

  items.push(
    {
      title: "Pricing — Free, Pro & Team plans",
      subtitle: "Page · subscriptions",
      href: "/pricing",
      kind: "Tool",
      text: "Subscription tiers for AML/KYC Wiki — free courses and tools, Pro simulations and exams, Team seats.",
    },
    {
      title: "Contact & Support",
      subtitle: "Page · billing, help, enterprise",
      href: "/contact",
      kind: "Tool",
      text: "Reach the AML/KYC Wiki team — billing issues, subscriptions, technical support and content corrections.",
    }
  );

  items.push({
    title: "Compliance Stack Landscape — AML vendors & platforms",
    subtitle: "Directory · blockchain analytics, KYC screening, certifications",
    href: "/stack",
    kind: "Tool",
    text: "The platforms compliance teams use — Chainalysis, TRM Labs, Elliptic, CipherTrace, World-Check and more — plus the SAR workflow and certifications like CCCA.",
  });

  for (const v of VENDORS) {
    items.push({
      title: v.name,
      subtitle: `Vendor · ${LAYERS.find((l) => l.key === v.layer)!.label}`,
      href: `/stack#vendor-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      kind: "Vendor",
      text: `${v.tagline} ${v.caps.join(" ")} ${v.cert ?? ""} ${v.seenIn ?? ""}`,
    });
  }

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
      <div className="mt-6">
        <SearchBox
          items={items}
          placeholder="Search — try 'hawala', 'EDD', 'sanctions', 'STR'…"
        />
      </div>
      <div className="mt-8">
        <Suspense>
          <SearchBrowser items={items} />
        </Suspense>
      </div>
    </div>
  );
}
