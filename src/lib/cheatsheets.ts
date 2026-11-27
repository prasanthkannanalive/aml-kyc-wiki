// Quick-recap cheat sheets — one printable-style card per course + practice.
// Distilled for the "30-second review" before an interview, exam or shift.

export interface CheatRow {
  k: string;
  v: string;
}

export interface CheatSection {
  title: string;
  rows: CheatRow[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  accent: string; // tailwind border/text accent
  sections: CheatSection[];
}

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    slug: "sanctions-vs-name-screening",
    title: "Sanctions Screening vs Name Screening",
    subtitle: "The distinction interviewers probe first — transactions vs customers.",
    href: "/courses/sanctions-screening",
    cta: "Sanctions course",
    accent: "border-sky-400/40 text-sky-300",
    sections: [
      {
        title: "Side by side",
        rows: [
          { k: "Core question", v: "Sanctions: \"Can this money move?\" · Name: \"Who is this customer?\"" },
          { k: "What is screened", v: "Sanctions: payments, trades, banks, countries, vessels, free text · Name: customers, UBOs, signers, related parties" },
          { k: "Lists checked", v: "Sanctions: sanctions lists only (OFAC SDN, UN, EU, UK) · Name: sanctions + PEPs + adverse media + internal watchlists" },
          { k: "When", v: "Sanctions: real time, before releasing payment · Name: onboarding + batch rescreening on list/data changes" },
          { k: "On a hit", v: "Sanctions: hold → clear if false → block/reject + report · Name: review → EDD, higher risk rating, or exit" },
          { k: "Error tolerance", v: "Sanctions: near zero — OFAC strict liability, no intent needed · Name: risk-based, time to investigate" },
        ],
      },
      {
        title: "Shared practices",
        rows: [
          { k: "Matching", v: "Fuzzy matching for spelling, transliteration, aliases" },
          { k: "Reality", v: "High false-positive volume — threshold tuning is the job" },
          { k: "Documentation", v: "Every cleared hit needs a written rationale" },
          { k: "Depth", v: "Look through ownership — surface names lie (50% rule)" },
        ],
      },
      {
        title: "Numbers that matter",
        rows: [
          { k: "US reporting", v: "Blocked property → OFAC within 10 business days; annual report by 30 Sep" },
          { k: "50% rule", v: "Entity ≥50% owned by blocked persons is blocked automatically — never appears on a list" },
          { k: "OFSI", v: "UK: ownership + separate control test; strict civil liability since 2022" },
          { k: "Retention", v: "OFAC records: 10 years (extended from 5, effective Mar 2025)" },
        ],
      },
    ],
  },
  {
    slug: "kyc-cdd-tm",
    title: "KYC / CDD / Transaction Monitoring",
    subtitle: "Onboarding to alert — the operational core.",
    href: "/courses/kyc-cdd-tm-analyst",
    cta: "KYC course",
    accent: "border-emerald-400/40 text-emerald-300",
    sections: [
      {
        title: "CDD essentials",
        rows: [
          { k: "CDD", v: "Identify + verify customer, understand purpose, ongoing monitoring" },
          { k: "KYB", v: "Corporate onboarding — UBO must be a natural person; nominee chains fail" },
          { k: "EDD", v: "High-risk, PEPs, complex ownership — SoW/SoF documented" },
          { k: "Risk rating", v: "Customer × product × geography × channel — drives CDD depth" },
        ],
      },
      {
        title: "Monitoring & reporting (US)",
        rows: [
          { k: "CTR", v: ">$10,000 cash in/out per day — file within 15 days" },
          { k: "SAR", v: "Suspicion standard, not proof — file within 30 days (60 if no suspect)" },
          { k: "Structuring", v: "Sub-threshold deposits engineered to avoid CTRs = reportable itself" },
          { k: "Retention", v: "BSA records 5 years; SARs kept 5 years" },
        ],
      },
      {
        title: "Trap to remember",
        rows: [
          { k: "The analyst's limit", v: "You file facts + suspicion; MLRO owns the relationship decision" },
          { k: "Tipping off", v: "Never tell the customer a SAR exists — it's a crime" },
        ],
      },
    ],
  },
  {
    slug: "fraud-prevention",
    title: "Fraud Prevention",
    subtitle: "External, internal and authorised-push-payment fraud.",
    href: "/courses/fraud-prevention",
    cta: "Fraud course",
    accent: "border-rose-400/40 text-rose-300",
    sections: [
      {
        title: "Taxonomy",
        rows: [
          { k: "Fraud vs error vs ML", v: "Intent separates fraud; deception separates it from error" },
          { k: "APP fraud", v: "Customer authorises the payment — coerced consent; reimbursement rules apply (UK PSR Oct 2024)" },
          { k: "Mules", v: "Fan-in from many victims → rapid fan-out to cash-out; may be coerced or complicit" },
          { k: "Occupational", v: "Insider schemes — ACFE fraud triangle: pressure, opportunity, rationalisation" },
        ],
      },
      {
        title: "Detection craft",
        rows: [
          { k: "Alert economics", v: "False-positive rate is a cost — tune rules, don't just add them" },
          { k: "Convergence", v: "One mule account collecting from dozens of victims = infrastructure, not coincidence" },
          { k: "Intervention point", v: "Last chance is BEFORE the wire leaves — delay + verify" },
        ],
      },
    ],
  },
  {
    slug: "counter-terrorist-financing",
    title: "Counter-Terrorist Financing",
    subtitle: "Why TF detection differs from money-laundering detection.",
    href: "/courses/counter-terrorist-financing",
    cta: "CTF course",
    accent: "border-violet-400/40 text-violet-300",
    sections: [
      {
        title: "Core distinctions",
        rows: [
          { k: "ML vs TF", v: "ML hides illicit value; TF moves often-clean money for a purpose — amounts can be small" },
          { k: "NPO risk", v: "Charities trusted + cash-friendly — FATF Recommendation 8 requires specific controls" },
          { k: "Funnel accounts", v: "Many small senders → one collector → cash-out = aggregation typology" },
        ],
      },
      {
        title: "Mechanics",
        rows: [
          { k: "FinCEN 314(a)", v: "Law enforcement asks institutions to search for a target — monthly lists" },
          { k: "314(b)", v: "Institution-to-institution sharing with FinCEN safe harbour" },
          { k: "Threshold", v: "Suspicion of TF support is reportable regardless of amount" },
        ],
      },
    ],
  },
  {
    slug: "trade-based-laundering",
    title: "Trade-Based Laundering",
    subtitle: "The laundering that hides inside legitimate commerce.",
    href: "/courses/trade-based-laundering",
    cta: "TBML course",
    accent: "border-amber-400/40 text-amber-300",
    sections: [
      {
        title: "Techniques",
        rows: [
          { k: "Over/under-invoicing", v: "Invoice value ≠ goods value — the difference is the laundered amount" },
          { k: "Multiple invoicing", v: "Same goods invoiced repeatedly to multiply payments" },
          { k: "Fictitious goods/services", v: "Paper transactions with no real movement — 'consulting' shells" },
          { k: "Trade diversion", v: "Clean docs, dirty route — transits, flags, HS-code falsification" },
        ],
      },
      {
        title: "Detection craft",
        rows: [
          { k: "Assess the pattern", v: "Never the single invoice — aggregation and repetition are the signal" },
          { k: "Documentary vs economic", v: "Paper compliance isn't economic reality — cross-check manifests, prices, routes" },
          { k: "Post-alert docs", v: "Backdated 'corrections' after a hold = consciousness of guilt" },
        ],
      },
    ],
  },
  {
    slug: "virtual-asset-compliance",
    title: "Virtual Asset Compliance",
    subtitle: "VASP duties, Travel Rule and on-chain reality.",
    href: "/courses/virtual-asset-compliance",
    cta: "VA course",
    accent: "border-cyan-400/40 text-cyan-300",
    sections: [
      {
        title: "Core obligations",
        rows: [
          { k: "VASP/CASP", v: "Same AML duties as banks — registration, CDD, monitoring, SARs" },
          { k: "Travel Rule", v: "Originator/beneficiary data must travel with transfers over threshold — VASP-to-VASP only" },
          { k: "Unhosted wallets", v: "No VASP to verify — EDD on ownership/control or decline" },
        ],
      },
      {
        title: "On-chain signals",
        rows: [
          { k: "Mixers", v: "Obfuscation layer — tainted inflows + unverifiable control = decline + SAR" },
          { k: "Peel chains", v: "Layering on-chain — small repeated hops to cash-out" },
          { k: "Timing", v: "Destination wallet created same week as account = red flag" },
        ],
      },
    ],
  },
  {
    slug: "financial-intelligence",
    title: "Financial Intelligence / Trafficking",
    subtitle: "When transactions look normal but the stories don't match.",
    href: "/courses/financial-intelligence-trafficking",
    cta: "FIHT course",
    accent: "border-fuchsia-400/40 text-fuchsia-300",
    sections: [
      {
        title: "Detection mindset",
        rows: [
          { k: "Context over amounts", v: "Remittances look ordinary — scripted stories, shared addresses, mismatched recipients are the signal" },
          { k: "Victim vs perpetrator", v: "Senders may be coerced victims — SAR covers activity; victim status doesn't exempt filing" },
          { k: "Aggregation points", v: "One recipient collecting from many 'unrelated families' = collection layer" },
        ],
      },
      {
        title: "Craft",
        rows: [
          { k: "Link the network", v: "Cross-border cases need both ends — your SAR is the input that connects theirs" },
          { k: "Preserve evidence", v: "Instruction chats, address records, timing — the topology is the proof" },
        ],
      },
    ],
  },
  {
    slug: "practice-toolkit",
    title: "Practice Toolkit — Sandbox, Labs & Exams",
    subtitle: "The quick reference for every interactive on the site.",
    href: "/playground",
    cta: "Playground",
    accent: "border-emerald-400/40 text-emerald-300",
    sections: [
      {
        title: "The tools",
        rows: [
          { k: "100 scenarios", v: "/playground — judgment drills across 10 typologies, rated 1–5" },
          { k: "14 case sims", v: "Guided evidence → decision → filing; 2 per course, filterable" },
          { k: "Alert sandbox", v: "/sandbox — disposition a TM alert queue like a real analyst" },
          { k: "Data lab", v: "/labs — tune structuring/velocity/layering rules on a synthetic ledger" },
        ],
      },
      {
        title: "Assessment",
        rows: [
          { k: "Mock exams", v: "/exams — 20 questions, 15 min, 70% pass, per-module breakdown" },
          { k: "Daily review", v: "/review — 10 spaced-repetition questions + streak" },
          { k: "Certificates", v: "Pass a course final (70%+) → verifiable AMLK- cert at /verify" },
        ],
      },
      {
        title: "Field craft",
        rows: [
          { k: "SAR writer", v: "/sar-writer — draft narratives scored on fact coverage" },
          { k: "Doc spotter", v: "/doc-spotter — 5 real issues hidden among 4 decoys per document" },
          { k: "Filing guides", v: "/filing — US BSA, UK DAML, EU goAML, Canada, India, Singapore" },
        ],
      },
    ],
  },
];
