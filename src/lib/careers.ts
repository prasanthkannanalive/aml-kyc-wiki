// Career ladder data for the AML/KYC compliance track.

export interface CareerRole {
  slug: string;
  level: "Entry" | "Mid" | "Senior";
  title: string;
  aliases: string;
  responsibilities: string[];
  requirements: string[];
  certifications: string[];
  /** readiness gate: overall qualification % needed to be "role-ready" */
  readyAt: number;
  /** optional course that must have meaningful progress */
  keyCourse?: string;
  /** who holds the final call at this level */
  authority: string;
  /** recommended course slugs for this role, in order */
  courses?: string[];
}

export const careerRoles: CareerRole[] = [
  {
    slug: "kyc-analyst",
    level: "Entry",
    title: "KYC / CDD Analyst",
    aliases: "KYC Analyst · Client Onboarding Analyst · CDD Reviewer",
    responsibilities: [
      "Run customer onboarding checks — verify identity, screen sanctions and PEPs",
      "Complete and refresh CDD files; chase missing documentation",
      "Apply risk ratings and route high-risk cases to EDD",
      "Maintain audit-ready case notes and KYC records",
    ],
    requirements: [
      "Bachelor's degree — finance, accounting, law, criminology or business",
      "Strong attention to detail and process discipline",
      "Excel proficiency; comfort with case-management systems",
      "No prior compliance experience needed — graduate schemes exist",
    ],
    certifications: ["ICA Certificate in AML/CTF (entry-level boost)", "Site knowledge base + final exam badge"],
    readyAt: 15,
    keyCourse: "kyc-cdd-tm-analyst",
    authority: "Recommends only — every decision routes upward",
    courses: ["kyc-cdd-tm-analyst"],
  },
  {
    slug: "alert-analyst",
    level: "Entry",
    title: "Alert / Transaction Monitoring Analyst",
    aliases: "TM Analyst · Alert Triage Analyst · Monitoring Analyst",
    responsibilities: [
      "Work the transaction-monitoring alert queue",
      "Investigate alerts against typologies and customer profiles",
      "Write dispositions — false positive, escalate, or refer for SAR",
      "Feed tuning feedback to the model team",
    ],
    requirements: [
      "Analytical degree or equivalent; pattern-recognition aptitude",
      "Ability to write clear, factual investigation notes",
      "Basic SQL or data skills increasingly expected",
      "Sandbox + job-simulation practice strongly recommended",
    ],
    certifications: ["CAMS (preferred for mid roles)", "ICA AML/CTF Certificate"],
    readyAt: 20,
    keyCourse: "fraud-prevention",
    authority: "Recommends only — dispositions go to a senior or MLRO",
    courses: ["kyc-cdd-tm-analyst", "fraud-prevention"],
  },
  {
    slug: "sanctions-analyst",
    level: "Entry",
    title: "Sanctions Screening Analyst",
    aliases: "Screening Analyst · Name-Match Analyst · Sanctions Investigator",
    responsibilities: [
      "Clear name-match hits on payments, wires and onboarding",
      "Document true/false positive decisions with evidence",
      "Escalate potential sanctions matches to MLRO",
      "Maintain screening-list and rule-quality feedback",
    ],
    requirements: [
      "Detail-oriented; comfortable with fuzzy matching logic",
      "Understanding of sanctions regimes (OFAC, EU, UN, UK)",
      "Calm under queue pressure — hits are time-sensitive",
    ],
    certifications: ["ICA Certificate in Sanctions Compliance", "ICA AML/CTF Certificate"],
    readyAt: 15,
    keyCourse: "sanctions-screening",
    authority: "Recommends only — potential matches escalate to MLRO",
    courses: ["sanctions-screening"],
  },
  {
    slug: "senior-analyst",
    level: "Mid",
    title: "Senior Analyst / Team Lead",
    aliases: "Lead Analyst · Senior Investigator · QA Analyst",
    responsibilities: [
      "Handle complex alerts and approve junior dispositions",
      "Run deeper SAR/STR investigations end-to-end",
      "Second-line QA — sample filings and grade quality",
      "Coach juniors; contribute to rule tuning",
    ],
    requirements: [
      "2–5 years AML/KYC experience OR a recognized certification",
      "SQL/data skills for TM roles; regulatory writing",
      "UK roles may require SC-level vetting on the MLRO track",
      "Demonstrated SAR-quality writing samples",
    ],
    certifications: ["CAMS", "ICA AML/CTF Diploma", "ACFE CFE (investigations)", "CISA (QA/audit path)"],
    readyAt: 40,
    authority: "Recommends — validates junior work; cannot approve exits",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "fraud-prevention"],
  },
  {
    slug: "sar-investigator",
    level: "Mid",
    title: "SAR / STR Investigator",
    aliases: "Financial Crime Investigator · SAR Analyst",
    responsibilities: [
      "Own investigations from alert to filing decision",
      "Gather evidence: KYC files, transaction histories, OSINT",
      "Draft SAR/STR narratives that survive regulator QA",
      "Prepare packages for MLRO sign-off",
    ],
    requirements: [
      "3+ years investigations or AML analysis",
      "CAMS or ICA AML/CTF strongly preferred",
      "Knowledge of filing regimes (US SAR, UK DAML, national FIUs)",
      "Written communication at regulatory standard",
    ],
    certifications: ["CAMS", "Advanced CAMS", "ICA AML/CTF Diploma"],
    readyAt: 50,
    keyCourse: "kyc-cdd-tm-analyst",
    authority: "Drafts the filing — MLRO owns the file-off decision",
    courses: ["kyc-cdd-tm-analyst", "fraud-prevention", "financial-intelligence-trafficking"],
  },
  {
    slug: "edd-analyst",
    level: "Mid",
    title: "EDD Analyst — High-Risk Customers",
    aliases: "Enhanced Due Diligence Analyst · PEP Analyst",
    responsibilities: [
      "Run EDD on high-risk, PEP and complex-ownership customers",
      "Verify source of wealth and source of funds",
      "Maintain PEP files including RCAs and post-tenure risk",
      "Adverse-media and OSINT assessments",
    ],
    requirements: [
      "Strong CDD foundation + investigation skills",
      "PEP regime knowledge (domestic vs foreign, UK reg 35)",
      "Beneficial-ownership unwrapping — trusts, nominees, layers",
    ],
    certifications: ["CAMS", "ICA AML/CTF", "ICA Sanctions/PEP short courses"],
    readyAt: 45,
    keyCourse: "kyc-cdd-tm-analyst",
    authority: "Recommends — EDD outcome feeds the MLRO decision",
    courses: ["kyc-cdd-tm-analyst"],
  },
  {
    slug: "deputy-mlro",
    level: "Senior",
    title: "Deputy MLRO",
    aliases: "Deputy Money Laundering Reporting Officer · Compliance Manager",
    responsibilities: [
      "Cover MLRO duties — pre-clear filings, quality-check SARs",
      "Liaise with the FIU and external auditors",
      "Maintain the AML policy framework and training",
      "Report to the MLRO/board on program health",
    ],
    requirements: [
      "5–8 years AML experience with SAR/STR ownership",
      "CAMS or ICA qualification effectively expected",
      "Regulatory interface experience (FIU, exams, audits)",
      "People management or senior-analyst background",
    ],
    certifications: ["CAMS", "Advanced CAMS", "ICA AML/CTF Advanced Diploma", "CPA/ACCA helps"],
    readyAt: 65,
    authority: "Acts for MLRO — pre-clears filings under MLRO authority",
    courses: ["kyc-cdd-tm-analyst", "sanctions-screening", "counter-terrorist-financing", "trade-based-laundering"],
  },
  {
    slug: "mlro",
    level: "Senior",
    title: "MLRO / Nominated Officer / BSA Officer",
    aliases: "Money Laundering Reporting Officer · BSA Officer · Nominated Officer (UK)",
    responsibilities: [
      "Statutory accountability for the AML program",
      "Personally approve every SAR/STR filing",
      "Own the FIU relationship and regulatory exams",
      "Report program health to the board/audit committee",
    ],
    requirements: [
      "8–12+ years financial-crime compliance",
      "Proven SAR/STR filing record and regulator experience",
      "CAMS/ICA qualification — table stakes at this level",
      "UK: SC-level vetting; US: BSA Officer experience",
      "Direct FIU/regulator interface strongly preferred",
    ],
    certifications: ["CAMS", "Advanced CAMS", "ICA Advanced Diploma", "jurisdiction-specific MLRO training"],
    readyAt: 85,
    authority: "FIRST FINAL CALL — personally approves SARs, exits, program",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing", "trade-based-laundering", "fraud-prevention", "virtual-asset-compliance", "financial-intelligence-trafficking"],
  },
  {
    slug: "head-fincrime",
    level: "Senior",
    title: "Head of Financial Crime / FinCrime",
    aliases: "Head of AML · Financial Crime Director · VP Financial Crime",
    responsibilities: [
      "Own the whole function — onboarding, TM, investigations, sanctions",
      "Design and tune the monitoring program",
      "Lead cross-border regulatory strategy",
      "Manage teams and budget; board-level reporting",
    ],
    requirements: [
      "10+ years with leadership scope",
      "Multi-jurisdiction program experience",
      "CAMS + management track record",
      "Vendor/model-risk and data-analytics fluency",
    ],
    certifications: ["CAMS", "Advanced CAMS", "ICA Advanced Diploma", "MBA or equivalent leadership signal"],
    readyAt: 90,
    authority: "Second — owns program outcomes and risk appetite",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing", "trade-based-laundering", "fraud-prevention", "virtual-asset-compliance", "financial-intelligence-trafficking"],
  },
  {
    slug: "cco",
    level: "Senior",
    title: "Chief Compliance Officer (CCO)",
    aliases: "Chief Compliance Officer · Group Compliance Head",
    responsibilities: [
      "Own all compliance — AML, conduct, regulatory reporting",
      "Advisory to executive committee and board",
      "Regulatory strategy across jurisdictions",
      "Organizational design and culture",
    ],
    requirements: [
      "15+ years compliance leadership",
      "AML depth + broader regulatory breadth",
      "Board presence and regulatory credibility",
      "Typically requires advanced degrees or equivalent",
    ],
    certifications: ["CAMS + broader compliance certs", "ICA/ACAMS advanced tracks", "jurisdiction-specific CCO requirements"],
    readyAt: 95,
    authority: "Third — compliance sign-off to the board",
    courses: ["sanctions-screening", "kyc-cdd-tm-analyst", "counter-terrorist-financing", "trade-based-laundering", "fraud-prevention", "virtual-asset-compliance", "financial-intelligence-trafficking"],
  },
];

export interface DecisionStep {
  step: string;
  actor: string;
  decides: string;
  call: string;
}

/** The escalation chain — who actually decides, bottom to top. */
export const decisionChain: DecisionStep[] = [
  {
    step: "01",
    actor: "Analyst — KYC / TM / Screening",
    decides: "Flags alerts, dispositions cases, completes CDD files",
    call: "Recommends only — no final call",
  },
  {
    step: "02",
    actor: "Senior Analyst / SAR Investigator / EDD",
    decides: "Complex alerts, SAR drafts, EDD files, junior QA",
    call: "Recommends — cannot approve exits or sign filings alone",
  },
  {
    step: "03",
    actor: "MLRO / BSA Officer / Nominated Officer",
    decides: "Files or declines SARs, approves exits, owns the program",
    call: "FIRST FINAL CALL — personally liable to the regulator",
  },
  {
    step: "04",
    actor: "Head of Financial Crime",
    decides: "Program strategy, risk appetite, budget, team design",
    call: "Second — owns program outcomes",
  },
  {
    step: "05",
    actor: "Chief Compliance Officer",
    decides: "All-compliance sign-off, regulatory strategy, board reporting",
    call: "Third — signs the compliance attestation",
  },
  {
    step: "06",
    actor: "Board / Audit Committee",
    decides: "Approves risk appetite, oversees the MLRO, receives reports",
    call: "Ultimate accountability — can remove the MLRO",
  },
];

export const certifications = [
  { cert: "CAMS — Certified AML Specialist", issuer: "ACAMS (US)", value: "Most recognized global AML credential; expected at mid-senior level", level: "Mid+" },
  { cert: "ICA AML/CTF Qualifications", issuer: "International Compliance Association (UK)", value: "Levelled pathway (Certificate → Diploma → Advanced); strong in UK/EU", level: "Entry → Senior" },
  { cert: "Advanced CAMS", issuer: "ACAMS", value: "Senior/leadership differentiator on top of CAMS", level: "Senior" },
  { cert: "ICA Certificate in Sanctions Compliance", issuer: "ICA", value: "Direct fit for sanctions-screening roles", level: "Entry–Mid" },
  { cert: "ACFE CFE — Fraud Examiner", issuer: "ACFE", value: "Fraud investigations, dispute/asset-recovery adjacent roles", level: "Mid" },
  { cert: "CISA / CIA", issuer: "ISACA / IIA", value: "QA, internal audit and second-line paths", level: "Mid" },
  { cert: "CPA / ACCA", issuer: "Accounting bodies", value: "Finance credibility — helps in banking and audit-facing roles", level: "All" },
  { cert: "ACAMS CKYCA / CTMA", issuer: "ACAMS", value: "Associate-level entry credentials — no experience prerequisite, earn credits toward CAMS; the on-ramp US banks actually recognise", level: "US & Global: Entry" },
  { cert: "ABA Certificate in BSA & AML Compliance", issuer: "American Bankers Association", value: "Self-paced US banking-law certificate; stepping stone to the CAFP exam", level: "US: Entry" },
  { cert: "FIBA AMLCA", issuer: "FIBA (FIU partnership)", value: "Recognised across US banks, correspondent teams and Latin American institutions", level: "US / LatAm: Entry–Mid" },
  { cert: "CISI Level 3 Award in Combating Financial Crime", issuer: "CISI (SFCCA partnership)", value: "Favoured by UK investment banks, wealth managers and brokerages; jurisdiction variants for Singapore/HK", level: "UK / SG / HK: Entry–Mid" },
  { cert: "ACAMS CAFCA / CCAS", issuer: "ACAMS", value: "Fintech and cryptoasset specialist credentials — the pair EU crypto/fintech compliance teams screen for", level: "Global fintech/crypto: Entry" },
  { cert: "NISM Series-XXIV — AML & CFT in Securities Markets", issuer: "NISM (India)", value: "PMLA rules + SEBI guidelines + STR filing — the standard credential for Indian broking, wealth and investment-banking compliance roles", level: "India: Entry–Mid" },
  { cert: "NISM-IFSCA-01 — AML/CFT in the IFSC", issuer: "NISM (India)", value: "60-minute remote-proctored exam for GIFT City / international financial services — valued by global banking hubs operating out of IFSCs", level: "India IFSC: Mid" },
  { cert: "SCI GRC / AML tracks", issuer: "Saudi Compliance Institute", value: "Regional credential for DIFC/ADGM and Saudi market compliance roles alongside CAMS/ICA", level: "Middle East: Mid" },
  { cert: "IIBF Certification — Functions/Basics of Banking (IT & BPO)", issuer: "IIBF (India)", value: "Targets IT/BPO banking-operations staff handling KYC remediation and account servicing — the credential for ops-side AML work in Indian banks", level: "India: Entry" },
];
