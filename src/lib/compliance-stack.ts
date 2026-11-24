// Compliance stack landscape — the platforms analysts and compliance teams
// actually use, grouped by layer. Blockchain-analytics vendors reflect what
// appears in managed-services job postings (Guidehouse et al.); KYC/screening
// vendors reflect standard VASP onboarding stacks. Certifications are the
// credentials recruiters name in JDs.

export type StackLayer = "analytics" | "kyc" | "workflow";

export interface StackVendor {
  name: string;
  layer: StackLayer;
  tagline: string;
  caps: string[];
  cert?: string; // certification the vendor offers / recruiters ask for
  seenIn?: string; // where it shows up in practice
}

export const LAYERS: { key: StackLayer; label: string; desc: string; cls: string }[] = [
  {
    key: "analytics",
    label: "Blockchain analytics",
    desc: "Trace funds on-chain, score wallet exposure, map clusters — the evidence layer for SARs",
    cls: "text-sky-300 border-sky-400/40 bg-sky-400/10",
  },
  {
    key: "kyc",
    label: "KYC / CDD & screening",
    desc: "Identity verification, PEP/sanctions and adverse-media screening at onboarding and refresh",
    cls: "text-violet-300 border-violet-400/40 bg-violet-400/10",
  },
  {
    key: "workflow",
    label: "Case & filing workflow",
    desc: "Alert queues, investigation case management and SAR/STR drafting inside the TMS",
    cls: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
  },
];

export const VENDORS: StackVendor[] = [
  // ---- blockchain analytics ----
  {
    name: "Chainalysis",
    layer: "analytics",
    tagline: "The market leader — Reactor for investigations, KYT for real-time monitoring",
    caps: [
      "Wallet & VASP exposure scoring across 20+ risk categories",
      "Reactor graph investigations — follow funds hop-by-hop",
      "KYT real-time alerting on customer transactions",
      "Sanctions list integration incl. OFAC, EU, UK",
    ],
    cert: "CCCA — Chainalysis Certified Crypto Compliance Associate",
    seenIn: "Named in Guidehouse and Big-4 crypto-compliance job posts; the most-requested platform cert",
  },
  {
    name: "TRM Labs",
    layer: "analytics",
    tagline: "Blockchain intelligence built for compliance ops — strong alert enrichment",
    caps: [
      "Risk scoring across chains with typology detection",
      "Enriches TMS alerts with counterparty & cluster context",
      "Sanctions & darknet exposure mapping",
      "Investigations platform with collaborative case files",
    ],
    seenIn: "Guidehouse roles integrate TRM findings into TM alert reviews for VASP clients",
  },
  {
    name: "Elliptic",
    layer: "analytics",
    tagline: "Wallet screening and exposure analytics — often run alongside the other two",
    caps: [
      "Real-time wallet screening at onboarding & payout",
      "Exposure scores to illicit categories (mixer, darknet, fraud)",
      "Cluster/entity mapping for counterparty risk",
      "API-first — embeds directly into exchange flows",
    ],
    seenIn: "Used by Guidehouse alongside Chainalysis and TRM for multi-tool investigations",
  },
  {
    name: "CipherTrace (Mastercard)",
    layer: "analytics",
    tagline: "Crypto tracing acquired by Mastercard — strong in fraud & scam investigations",
    caps: [
      "Transaction tracing across UTXO and account chains",
      "Scam & ransomware attribution datasets",
      "Integrates with Mastercard's crime-prevention network",
      "KYT + investigations tooling for banks entering crypto",
    ],
    seenIn: "Referenced in Guidehouse crypto-AML assessment engagements",
  },
  {
    name: "Crystal (by Bitfury)",
    layer: "analytics",
    tagline: "Explorer-style investigation tool popular with law-enforcement adjacent teams",
    caps: [
      "Visual graph exploration of wallet clusters",
      "Address/entity attribution",
      "Free explorer tier for analysts learning on-chain tracing",
    ],
    seenIn: "Common in LE and smaller compliance teams",
  },
  {
    name: "Scorechain",
    layer: "analytics",
    tagline: "Mid-market analytics — popular with smaller VASPs and regional exchanges",
    caps: [
      "Wallet screening & transaction monitoring",
      "Travel Rule data exchange support",
      "Cost-effective entry point vs the big three",
    ],
  },

  // ---- KYC / CDD & screening ----
  {
    name: "Refinitiv World-Check",
    layer: "kyc",
    tagline: "The incumbent PEP / sanctions / adverse-media database",
    caps: [
      "PEP and sanctioned-party screening at onboarding",
      "Adverse-media and watchlist profiles",
      "Periodic rescreening across the customer base",
    ],
    seenIn: "Standard screening layer behind VASP KYC stacks",
  },
  {
    name: "LexisNexis Risk Solutions",
    layer: "kyc",
    tagline: "Screening + identity data for regulated onboarding",
    caps: [
      "Sanctions, PEP and adverse-media screening",
      "Business registry and entity verification data",
      "Ongoing monitoring feeds",
    ],
  },
  {
    name: "ComplyAdvantage",
    layer: "kyc",
    tagline: "API-first continuous screening — strong fit for digital-first VASPs",
    caps: [
      "Real-time PEP/sanctions/adverse-media screening API",
      "Continuous monitoring of the customer base",
      "Crypto-native risk data integrations",
    ],
  },
  {
    name: "Onfido",
    layer: "kyc",
    tagline: "Identity verification — document + liveness + biometric matching",
    caps: [
      "ID document verification with tamper detection",
      "Liveness / selfie-match checks",
      "Watchlist screening hooks at the IDV layer",
    ],
  },
  {
    name: "Jumio",
    layer: "kyc",
    tagline: "Enterprise IDV — strong in regulated crypto and gaming onboarding",
    caps: [
      "Document, biometric and database verification",
      "Workflow orchestration for KYC/EDD journeys",
      "Compliance reporting hooks",
    ],
  },
  {
    name: "Socure",
    layer: "kyc",
    tagline: "Digital identity & fraud signals — popular with US fintechs and MSBs",
    caps: [
      "Synthetic identity & fraud scoring",
      "KYC data aggregation from multiple bureaus",
      "Real-time onboarding decisions",
    ],
  },
];

// ---- how the stack fits the SAR workflow ----

export interface StackStage {
  n: number;
  title: string;
  desc: string;
  tools: string[]; // vendor names feeding this stage
}

export const SAR_PIPELINE: StackStage[] = [
  {
    n: 1,
    title: "Alert fires in the TMS",
    desc: "Transaction monitoring rules flag unusual patterns — velocity spikes, structuring, counterparty hits.",
    tools: ["ComplyAdvantage", "LexisNexis"],
  },
  {
    n: 2,
    title: "On-chain enrichment",
    desc: "The alert is enriched with blockchain exposure — mixer, darknet, sanctioned-address or high-risk cluster hits.",
    tools: ["Chainalysis", "TRM Labs", "Elliptic", "CipherTrace"],
  },
  {
    n: 3,
    title: "Investigation & evidence",
    desc: "Analyst traces funds hop-by-hop in Reactor/Forensics, maps clusters, builds the money trail.",
    tools: ["Chainalysis Reactor", "TRM Investigations", "Crystal"],
  },
  {
    n: 4,
    title: "KYC / EDD refresh",
    desc: "Customer re-screened for PEP, sanctions, adverse media and beneficial ownership ahead of the filing.",
    tools: ["World-Check", "Jumio", "Socure"],
  },
  {
    n: 5,
    title: "SAR/STR narrative & filing",
    desc: "On-chain evidence substantiates the suspicious-activity narrative; filed to the FIU (FinCEN, NCA, FIU-IND…).",
    tools: ["TMS case management", "BSA E-Filing / goAML"],
  },
];

export const CERTIFICATIONS = [
  {
    name: "CCCA",
    issuer: "Chainalysis",
    desc: "Certified Crypto Compliance Associate — the credential crypto-compliance job posts name most often",
    href: "/courses/virtual-asset-compliance",
  },
  {
    name: "CAMS",
    issuer: "ACAMS",
    desc: "Certified Anti-Money Laundering Specialist — the generalist gold standard across all AML roles",
    href: "/careers",
  },
  {
    name: "ICA",
    issuer: "ICA",
    desc: "International Compliance Association certificate — strong for UK/EU-facing roles",
    href: "/careers",
  },
];
