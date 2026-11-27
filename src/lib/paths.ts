import { listChapters, readChapterBody, estimateMins } from "./chapters";
import { getCourse } from "./content";

// Curated learning paths — role-based sequences through the course catalog.
// Modeled on how candidates actually move: screening → CDD → monitoring → reporting.

export interface LearningPath {
  slug: string;
  title: string;
  tagline: string;
  audience: string;
  courses: string[]; // course slugs, in recommended order
  /** key into COUNTRY_AML (src/lib/banking.ts) for jurisdiction paths */
  country?: string;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: "aml-analyst",
    title: "AML Analyst",
    tagline: "Screening, due diligence and the decisions that follow an alert — from first principles to writing the report.",
    audience: "Anyone working an AML desk, or moving onto one from operations or customer service.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "fraud-prevention"],
  },
  {
    slug: "fraud-analyst",
    title: "Fraud Analyst",
    tagline: "How fraud is detected, what the common scams actually look like, and how a case is worked from alert to outcome.",
    audience: "Fraud analysts and operations teams, and AML people meeting fraud for the first time.",
    courses: ["fraud-prevention", "kyc-cdd-tm-analyst"],
  },
  {
    slug: "sanctions-specialist",
    title: "Sanctions Specialist",
    tagline: "Why a name matches, why it does not, and how ownership and control are used to get around a list.",
    audience: "Screening analysts, and anyone who has to defend a match or a dismissal.",
    courses: ["sanctions-screening", "counter-terrorist-financing", "trade-based-laundering"],
  },
  {
    slug: "crypto-compliance",
    title: "Crypto Compliance Analyst",
    tagline: "VASP obligations, on-chain tracing, Travel Rule and the SARs that crypto cases produce.",
    audience: "Compliance hires at exchanges, custodians, fintechs and the consultancies that staff them.",
    courses: ["virtual-asset-compliance", "kyc-cdd-tm-analyst", "sanctions-screening"],
  },
  {
    slug: "fiu-intelligence",
    title: "Financial Intelligence Analyst",
    tagline: "Following the money across borders — trafficking, terrorism financing and the intelligence craft.",
    audience: "FIU analysts, financial-crime investigators and law-enforcement financial investigators.",
    courses: ["financial-intelligence-trafficking", "counter-terrorist-financing", "trade-based-laundering"],
  },
  {
    slug: "us-regulatory-frameworks",
    title: "US Regulatory Frameworks",
    tagline: "BSA, FinCEN and OFAC in practice — CTRs, SARs, E-Filing, list matching and the exam manual examiners use.",
    audience: "US-based analysts and candidates who need to evidence BSA/FinCEN/OFAC experience on a resume.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
  },
  {
    slug: "india-compliance",
    title: "India Compliance (PMLA / FIU-IND / SEBI)",
    country: "India",
    tagline: "PMLA obligations, STR filing to FIU-IND, CTR thresholds and SEBI-facing securities compliance — the Indian market track.",
    audience: "Indian bank, NBFC, fintech and broking compliance roles — pairs with NISM Series-XXIV / IIBF credentials.",
    courses: ["kyc-cdd-tm-analyst", "sanctions-screening", "counter-terrorist-financing"],
  },
  {
    slug: "us-compliance",
    title: "US Compliance (BSA / FinCEN / OFAC)",
    tagline: "BSA program pillars, SAR/CTR filing to FinCEN, OFAC sanctions and the FFIEC exam manual — the US market track.",
    audience: "US bank, fintech and MSB compliance roles — pairs with CAMS/CCCA credentials.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "United States",
  },
  {
    slug: "uk-compliance",
    title: "UK Compliance (MLR / OFSI / NCA)",
    tagline: "MLR 2017 obligations, DAML consent regime, OFSI strict liability and the FCA/PRA examination stack.",
    audience: "UK banking, e-money and crypto firm compliance — pairs with ICA qualifications.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "United Kingdom",
  },
  {
    slug: "eu-compliance",
    title: "EU Compliance (AMLD / goAML / AMLA)",
    tagline: "AMLD6 obligations, national FIU filing via goAML, CASP rules and the AMLA single-rulebook transition.",
    audience: "EU credit institutions, fintechs and CASPs across member states.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "European Union",
  },
  {
    slug: "canada-compliance",
    title: "Canada Compliance (PCMLTFA / FINTRAC)",
    tagline: "PCMLTFA obligations, 'as soon as practicable' STR filing, travel-rule and OSFI examination expectations.",
    audience: "Canadian banks, MSBs and fintechs — FINTRAC registration is mandatory.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "Canada",
  },
  {
    slug: "singapore-compliance",
    title: "Singapore Compliance (MAS / TTFCA)",
    tagline: "MAS Notice requirements, 5-day STR filing, 1-day targeted-financial-sanctions reporting and VASP licensing.",
    audience: "Singapore banks, payment firms and licensed VASPs.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "Singapore",
  },
  {
    slug: "australia-compliance",
    title: "Australia Compliance (AML/CTF Act / AUSTRAC)",
    tagline: "AML/CTF Act obligations, SMR/TTR reporting, enrolment and ongoing customer due diligence under AUSTRAC.",
    audience: "Australian banks, remitters and newly-captured DNFBPs.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "Australia",
  },
  {
    slug: "uae-compliance",
    title: "UAE Compliance (Federal AML / goAML / CBUAE)",
    tagline: "Federal AML framework, real-time goAML reporting, VARA-regulated virtual assets and CBUAE supervision.",
    audience: "UAE banks, free-zone financial firms and VARA-licensed VASPs.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "UAE",
  },
  {
    slug: "switzerland-compliance",
    title: "Switzerland Compliance (AMLO / FINMA / MROS)",
    tagline: "AMLO obligations for banks and financial intermediaries, MROS reporting and the 20-day blocking rule.",
    audience: "Swiss banks, trustees and financial intermediaries under FINMA/SRO oversight.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "Switzerland",
  },
  {
    slug: "hongkong-compliance",
    title: "Hong Kong Compliance (AMLO / HKMA / JFIU)",
    tagline: "AMLO 2012 obligations, STR filing to JFIU, HKMA vetting and SFC-regulated securities AML.",
    audience: "HK banks, brokers and fintechs — AMLO applies to banks and securities.",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing"],
    country: "Hong Kong",
  },
  {
    slug: "trade-finance-compliance",
    title: "Trade Finance Compliance",
    tagline: "TBML detection, correspondent risk and the documentary trail behind trade-based laundering.",
    audience: "Trade-finance operations, documentary compliance and correspondent-banking analysts.",
    courses: ["trade-based-laundering", "kyc-cdd-tm-analyst", "sanctions-screening"],
  },
];

export function getPath(slug: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.slug === slug);
}

const minsCache = new Map<string, number>();

/** Total estimated minutes across all chapters of a course. */
export function courseMins(slug: string): number {
  const hit = minsCache.get(slug);
  if (hit !== undefined) return hit;
  let total = 0;
  for (const ch of listChapters(slug)) {
    const body = readChapterBody(slug, ch.num);
    if (body) total += estimateMins(body);
  }
  minsCache.set(slug, total);
  return total;
}

export function pathStats(slug: string) {
  const p = getPath(slug);
  if (!p) return null;
  const courses = p.courses
    .map((s) => {
      const c = getCourse(s);
      return c ? { ...c, mins: courseMins(s), chapters: listChapters(s).length } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
  const totalMins = courses.reduce((s, c) => s + c.mins, 0);
  const totalChapters = courses.reduce((s, c) => s + c.chapters, 0);
  return { path: p, courses, totalMins, totalChapters };
}
