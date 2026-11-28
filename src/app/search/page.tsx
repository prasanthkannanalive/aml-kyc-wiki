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
      title: "Learning Paths — role-based course sequences",
      subtitle: "Guided · curated paths",
      href: "/paths",
      kind: "Course",
      text: "Role-based learning paths: AML analyst, fraud analyst, sanctions specialist, crypto compliance, FIU intelligence and trade finance — ordered courses with a path certificate.",
    },
    {
      title: "Cheat Sheets — quick recap of every course",
      subtitle: "Reference · one-page recaps",
      href: "/cheatsheets",
      kind: "Tool",
      text: "Printable-style quick recaps for all seven AML/KYC courses — key distinctions, numbers that matter, traps to remember — plus the practice toolkit reference for sandbox, labs, exams and field craft.",
    },
    {
      title: "Typologies Cheat Sheet — ML, fraud & sanctions evasion",
      subtitle: "Reference · typology patterns",
      href: "/typologies",
      kind: "Tool",
      text: "Every major money-laundering, fraud and sanctions-evasion typology — placement, layering, integration, fraud, evasion and emerging — with how each works and what an analyst sees, plus quick-reference glossary terms.",
    },
    {
      title: "Banking Systems & Examination Regimes — worldwide AML/KYC",
      subtitle: "Reference · jurisdictions & exams",
      href: "/banking",
      kind: "Tool",
      text: "Worldwide banking and financial systems under AML/KYC — institution types, correspondent banking, internal vs external examination regimes, and the law/FIU/supervisor/filing stack for the main jurisdictions.",
    },
    {
      title: "Website Walkthrough — guided tour of everything",
      subtitle: "Guide · site orientation",
      href: "/walkthrough",
      kind: "Tool",
      text: "An 11-step interactive tour of the AML/KYC Wiki — courses, learning paths, playground simulations, field-craft labs, exams, credentials, reference material and community features.",
    },
    {
      title: "Playground — 100 challenging AML scenarios + all interactive tools",
      subtitle: "Interactive · scenario judgment",
      href: "/playground",
      kind: "Tool",
      text: "100 hard AML/KYC decision scenarios across 10 typologies with difficulty ratings, plus links to every interactive experience: sandbox, data lab, exams, review, tools, simulations, arcade.",
    },
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
      title: "Daily Challenge — five AML calls, one leaderboard",
      subtitle: "Interactive · daily competition",
      href: "/challenge",
      kind: "Tool",
      text: "Five fixed AML scenario questions per day, same for everyone worldwide — submit your score to today's leaderboard and build a streak.",
    },
    {
      title: "Tech Skills — SQL, Python, Web3 & RegTech for AML roles",
      subtitle: "Reference · technical track",
      href: "/tech",
      kind: "Tool",
      text: "The programming layer AML/KYC roles hire for: SQL window functions and joins, Python pandas automation, Excel/VBA, Solidity reading and blockchain APIs, RegTech/AI workflows and BI — mapped to each role level.",
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
      title: "Mock Exam Simulator — timed practice papers",
      subtitle: "Assessment · timed exams",
      href: "/exams",
      kind: "Tool",
      text: "Timed randomized mock exams across all AML/KYC courses — mixed papers or per-course, 15-minute timer, per-module score breakdown.",
    },
    {
      title: "Certification Mock Exams — IIBF, NISM, CAMS",
      subtitle: "Assessment · certification prep",
      href: "/cert-mocks",
      kind: "Tool",
      text: "Full-length certification mocks — IIBF AML/KYC (120 Qs/2h/60%), NISM Series XXIV (50 Qs/1h/50%), ACAMS CAMS (120 Qs/3.5h/75 correct) — with per-option explanations.",
    },
    {
      title: "Daily Review — spaced repetition",
      subtitle: "Assessment · daily quiz",
      href: "/review",
      kind: "Tool",
      text: "Ten random questions from every course's module banks for spaced-repetition review, with a daily streak tracker.",
    },
    {
      title: "Transaction Data Lab — rule tuning sandbox",
      subtitle: "Interactive · synthetic data",
      href: "/labs",
      kind: "Tool",
      text: "Build AML detection rules — structuring, velocity, large amounts, layering — and run them against a synthetic transaction dataset to see alerts fire.",
    },
    {
      title: "Study Teams — cohort progress tracking",
      subtitle: "Community · group learning",
      href: "/teams",
      kind: "Tool",
      text: "Create a study team with a shareable join code and track member progress across all AML/KYC courses.",
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
    },
    {
      title: "SAR Writing Practice — narrative drafting exercises",
      subtitle: "Field craft · scored drafts",
      href: "/sar-writer",
      kind: "Tool",
      text: "Draft suspicious-activity report narratives from real case briefs — structuring, nominee onboarding, TBML — with fact-coverage scoring and model answers.",
    },
    {
      title: "Document Red-Flag Spotter — issue detection",
      subtitle: "Field craft · spot the problems",
      href: "/doc-spotter",
      kind: "Tool",
      text: "Spot planted red flags in realistic LC documents, KYB registry extracts, Travel Rule records and SAR drafts — hidden among plausible decoys.",
    },
    {
      title: "Filing Walkthroughs — SAR/STR by jurisdiction",
      subtitle: "Field craft · filing guides",
      href: "/filing",
      kind: "Tool",
      text: "How suspicious-activity reports are filed in the US, UK, EU, Canada, India and Singapore — deadlines, channels, form fields and examiner traps.",
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
