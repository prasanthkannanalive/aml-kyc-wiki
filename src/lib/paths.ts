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
