// Regulatory frameworks & reform landscape — the cross-cutting regimes that
// sit above any single jurisdiction: the AML/CFT program pillars every
// obliged entity must run, the FATF listing system, and the major reforms
// reshaping compliance (AMLA, DORA, eIDAS 2.0, BOI registers, 314 sharing).

/* ---------------- AML/CFT program pillars ---------------- */

export const AML_CFT_PILLARS = [
  {
    n: "1",
    title: "Governance & MLRO",
    desc: "Board-approved AML policy, a designated Money Laundering Reporting Officer with direct board access, and documented accountability for the whole program.",
    exam: "Almost every certification asks who owns the program — answer: senior management + MLRO, not the analyst.",
  },
  {
    n: "2",
    title: "Risk assessment",
    desc: "Enterprise ML/TF risk assessment refreshed on trigger events — customers, products, channels, geographies — feeding a risk-based control mix.",
    exam: "RBA is the FATF cornerstone: controls must be proportionate to risk, not one-size-fits-all.",
  },
  {
    n: "3",
    title: "CDD / EDD & KYB",
    desc: "Customer due diligence at onboarding and refresh, beneficial-ownership identification for legal entities, and enhanced measures for high-risk customers.",
    exam: "CDD is the front door; EDD triggers (PEP, sanctions adjacency, high-risk jurisdiction) are the classic exam scenarios.",
  },
  {
    n: "4",
    title: "Monitoring & screening",
    desc: "Ongoing transaction monitoring, sanctions/PEP/adverse-media screening, and alert investigation with documented disposition and escalation.",
    exam: "Ongoing monitoring — not just onboarding — is what FATF Mutual Evaluations test hardest.",
  },
  {
    n: "5",
    title: "Reporting & record keeping",
    desc: "Suspicious-activity reporting within national deadlines, CTR/LCTR where applicable, and retention of CDD records and transaction data (typically 5 years).",
    exam: "Know the filing deadline for the jurisdiction AND the retention period — both are favourite short-answer questions.",
  },
  {
    n: "6",
    title: "Independent testing & training",
    desc: "Periodic independent audit of the AML program plus role-based staff training — regulators expect evidence both happen on a cycle.",
    exam: "Independent testing should be genuinely independent — internal audit or external consultant, not the compliance team grading itself.",
  },
];

/* ---------------- FATF listing system ---------------- */

export const FATF_LISTS = [
  {
    list: "Jurisdictions under increased monitoring",
    tag: "Grey list",
    tone: "amber",
    desc: "FATF identifies strategic AML/CFT deficiencies and commits the jurisdiction to an action plan. Firms must apply enhanced due diligence to customers and transactions linked to listed countries — and document why.",
    note: "Listing is dynamic — jurisdictions move on and off as reforms land (e.g., Nigeria exited in late 2025, UAE exited 2024).",
  },
  {
    list: "High-risk jurisdictions subject to a call for action",
    tag: "Blacklist",
    tone: "red",
    desc: "The most severe listing — FATF calls on members to apply countermeasures (enhanced scrutiny or, in some cases, restrictive measures). Customers from these jurisdictions are effectively unbankable through normal channels.",
    note: "Small list, high impact — treat any nexus as a potential declinature or EDD escalation.",
  },
  {
    list: "Jurisdictions with strategic deficiencies",
    tag: "Monitoring",
    tone: "sky",
    desc: "Jurisdictions under enhanced FATF monitoring but not yet subject to a call for action — regimes maturing, worth tracking for roadmap signals.",
    note: "Membership and listing status change at each FATF plenary — always verify the current list before relying on it.",
  },
] as const;

/* ---------------- major reforms timeline ---------------- */

export const REFORMS = [
  {
    when: "2024–2027",
    title: "EU AMLA — the EU's AML authority",
    body: "The Anti-Money Laundering Authority (Frankfurt) becomes the direct EU supervisor for the highest-risk obliged entities — crypto-asset service providers first — with a single EU rulebook (AMLR) replacing 27 national regimes. Phased entry into force through 2027.",
    impact: "CASPs face direct EU supervision for the first time; national discretion shrinks.",
    courses: ["virtual-asset-compliance", "kyc-cdd-tm-analyst"],
  },
  {
    when: "2025",
    title: "DORA — digital operational resilience",
    body: "The EU Digital Operational Resilience Act applies uniform ICT risk-management, incident-reporting, resilience-testing and third-party oversight rules to financial entities — including CASPs.",
    impact: "Crypto firms must evidence operational resilience, not just AML controls.",
    courses: ["virtual-asset-compliance"],
  },
  {
    when: "2024–",
    title: "eIDAS 2.0 / EUDI Wallet",
    body: "EU digital identity wallets let citizens share verified attributes (name, DOB, address) with relying parties under eIDAS — the likely future rails for remote KYC across Europe.",
    impact: "Identity verification shifts from document scraping to cryptographic attribute sharing.",
    courses: ["kyc-cdd-tm-analyst"],
  },
  {
    when: "2021–",
    title: "Beneficial ownership registers",
    body: "CTA/BOI reporting in the US, UK Economic Crime Act reforms to Companies House, and EU AMLD5/6 public-register access rules all push 'who really owns this entity' to the centre of CDD/KYB.",
    impact: "UBO identification is no longer optional — registries, filings and access rules differ per jurisdiction.",
    courses: ["kyc-cdd-tm-analyst"],
  },
  {
    when: "Standing",
    title: "FinCEN 314(a) / 314(b) sharing",
    body: "314(a): FinCEN circulates law-enforcement requests to banks, which must search and report matches. 314(b): institutions may share ML/TF information with each other to detect and report — subject to confidentiality safeguards.",
    impact: "Information sharing is lawful and encouraged — but only through the statutory channels.",
    courses: ["kyc-cdd-tm-analyst"],
  },
  {
    when: "Ongoing",
    title: "Travel Rule expansion",
    body: "FATF Recommendation 16 requires originator/beneficiary information on transfers ≥€1,000 (or USD equivalent). Jurisdictions implement differently — US $3,000 threshold, EU no threshold, UK £1,000 — and unhosted wallets remain the hard edge.",
    impact: "VASPs must collect, transmit and reconcile counterparty data on every qualifying transfer.",
    courses: ["virtual-asset-compliance"],
  },
];
