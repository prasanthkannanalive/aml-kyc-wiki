export interface Discipline {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  concepts: { name: string; desc: string }[];
  typologies: string[];
  links: { label: string; href: string }[];
}

export const disciplines: Discipline[] = [
  {
    slug: "cdd-kyb",
    title: "Customer Due Diligence & KYB",
    tagline: "Know Your Customer, Know Your Business, UBO tracing and Enhanced Due Diligence",
    overview:
      "CDD is the foundation of every AML programme: before you monitor a customer's transactions, you must know who they are, who owns them, and what risk they represent. KYB extends this to legal entities — companies, trusts, partnerships and foundations — where the real risk sits in the ownership chain, not the front door. The hard part isn't collecting documents; it's resolving beneficial ownership through layers of nominees, trusts and cross-border structures, and knowing when standard CDD stops being enough and Enhanced Due Diligence begins.",
    concepts: [
      { name: "CDD vs EDD", desc: "Standard due diligence for normal-risk customers; enhanced scrutiny — senior approval, source-of-wealth evidence, tighter monitoring — for PEPs, high-risk jurisdictions and complex structures." },
      { name: "KYB", desc: "Due diligence on the business itself: registry verification, licences, trading history, expected activity and the legitimacy of the stated business model." },
      { name: "UBO identification", desc: "Tracing natural persons behind corporate layers to the ownership/control threshold (commonly 25% or 10% depending on jurisdiction). Nominees, trusts and SPVs make this the hardest part of onboarding." },
      { name: "PEP status", desc: "Politically exposed persons — and their family members and close associates — require enhanced scrutiny because their position creates inherent corruption and abuse-of-funds risk." },
      { name: "Ongoing CDD", desc: "Due diligence isn't a one-time event: periodic reviews, trigger-based refreshes and transaction-pattern monitoring keep the customer risk rating honest." },
    ],
    typologies: [
      "Layered ownership hiding the true controller behind 4+ jurisdictions",
      "Nominee directors and bearer shares obscuring beneficial ownership",
      "Shell companies onboarded with falsified registry documents",
      "PEPs onboarding through family members or close associates",
      "Businesses misrepresenting their activity to access lower-risk products",
    ],
    links: [
      { label: "CDD onboarding checklist", href: "/resources" },
      { label: "EDD / PEP checklist", href: "/resources" },
      { label: "KYC/CDD certification course", href: "/courses/kyc-cdd-tm-analyst" },
      { label: "Module 2 — Individual KYC & PEPs", href: "/training/kyc-cdd-tm-analyst" },
      { label: "UBO & ownership glossary", href: "/glossary" },
    ],
  },
  {
    slug: "transaction-monitoring",
    title: "Transaction Monitoring & SAR/STR",
    tagline: "Rules, thresholds, alert triage and suspicious-activity reporting",
    overview:
      "Transaction monitoring is where theory meets the firehose: rules and models score millions of transactions to surface the handful worth a human look. The discipline isn't writing rules — it's running the alert queue: triaging false positives, tuning thresholds without killing detection, documenting reasoning an examiner can follow, and knowing the difference between 'unusual' and 'suspicious' well enough to decide when a SAR/STR is actually required.",
    concepts: [
      { name: "Rules vs models", desc: "Deterministic rules ask yes/no questions (amount > X AND corridor = Y). Models score probability from historical patterns. Mature programmes layer both." },
      { name: "Alert triage", desc: "The daily grind: every alert gets a disposition — false positive, explained, escalated, referred or reported — with documented reasoning." },
      { name: "Precision vs recall", desc: "Precision = share of alerts that were right. Recall = share of real fraud/ML caught. Tuning trades one for the other; blind tuning kills both." },
      { name: "SAR/STR narrative", desc: "The report that goes to the FIU: subject, chronology, typology linkage, why it's suspicious and what legitimate explanation was rejected. Quality of narrative determines investigative usefulness." },
      { name: "Tipping-off", desc: "Once suspicion forms, telling the customer is a criminal offence in most regimes — a constraint that shapes every customer conversation." },
    ],
    typologies: [
      "Structuring / smurfing just below reporting thresholds",
      "Rapid pass-through: funds in and out within hours (mule pattern)",
      "Velocity spikes inconsistent with the customer's business profile",
      "Dormant accounts activated for large, unexplained flows",
      "Fan-out payments to dozens of unrelated counterparties",
    ],
    links: [
      { label: "Try the alert sandbox", href: "/sandbox" },
      { label: "SAR narrative template", href: "/resources" },
      { label: "TM & typologies certification module", href: "/training/kyc-cdd-tm-analyst" },
      { label: "Module 4 — TM Mechanics & Typologies", href: "/courses/kyc-cdd-tm-analyst" },
      { label: "TM tuning checklist", href: "/resources" },
    ],
  },
  {
    slug: "vasp-crypto",
    title: "VASPs & Crypto Compliance",
    tagline: "Virtual asset service providers, Travel Rule, DeFi and blockchain red flags",
    overview:
      "Crypto broke the old compliance playbook: pseudonymous transfers, self-hosted wallets, decentralised exchanges and mixers that sever the audit trail entirely. VASPs — exchanges, custodians, wallet providers — now carry the same AML obligations as banks, plus crypto-specific rules like the FATF Travel Rule. The analytical edge comes from blockchain analytics: clustering addresses, identifying exchange hot wallets, and spotting layering through mixers, chain-hopping and instant exchangers.",
    concepts: [
      { name: "Travel Rule", desc: "FATF requirement that VASPs exchange originator/beneficiary information on transfers. Thresholds: FATF guidance uses USD/EUR 1,000 for transfers; the EU Transfer of Funds Regulation (2023/1113) applies with NO de-minimis threshold; the UK implemented its regime September 2023. The crypto equivalent of wire originator data." },
      { name: "VASP definition", desc: "Entities that exchange, transfer, safeguard or administer virtual assets — exchanges, custodial wallets, some DeFi front-ends and OTC desks." },
      { name: "Mixers & tumblers", desc: "Services that pool and re-distribute crypto to break traceability — a primary laundering typology and often sanctioned themselves." },
      { name: "Chain-hopping", desc: "Converting between blockchains (BTC→ETH→TRON→stablecoin) to break the analytical trail — each hop adds a layer." },
      { name: "KYT analytics", desc: "Know-Your-Transaction blockchain screening: clustering, exposure scoring, sanctions oracle checks on addresses in real time." },
    ],
    typologies: [
      "Fiat on-ramp → mixer → cross-chain hops → off-ramp cash-out",
      "Structuring crypto purchases just below KYC thresholds",
      "Sanctioned-jurisdiction exposure through nested VASPs",
      "DeFi protocol interactions to avoid VASP controls entirely",
      "Fake OTC desks laundering through 'investment' wrappers",
    ],
    links: [
      { label: "Virtual asset indicators chapter", href: "/courses/financial-intelligence-trafficking/chapters/2.3" },
      { label: "VASP & crypto glossary terms", href: "/glossary" },
      { label: "Sanctions screening course", href: "/courses/sanctions-screening" },
    ],
  },
  {
    slug: "tbml-correspondent",
    title: "TBML & Correspondent Banking",
    tagline: "Trade-based money laundering and nested payment corridors",
    overview:
      "Trade finance moves more illicit value than any other channel — and it's the hardest to see, because a fake invoice looks exactly like a real one. TBML exploits the gap between the financial flow and the physical goods: over/under-invoicing, phantom shipments, misdescribed commodities and multiple invoicing. Correspondent banking adds a second layer: nested relationships where your customer isn't your counterparty, and you inherit their risk whether you can see it or not.",
    concepts: [
      { name: "TBML mechanics", desc: "Value is moved by mispricing goods or faking shipments — the money follows the invoice, so falsifying the invoice falsifies the trail." },
      { name: "Over/under-invoicing", desc: "Declaring goods above or below real value to move the difference offshore — the oldest TBML trick and still the most common." },
      { name: "Phantom shipping", desc: "Documents for goods that never move — pure financial laundering wearing a trade costume." },
      { name: "Nested correspondents", desc: "Your respondent bank's customer accesses USD/EUR through layers of intermediaries — obscuring the true originator and beneficiary." },
      { name: "Trade finance controls", desc: "Document verification, shipping-line data, sanctions screening on all parties, and price benchmarking against market rates." },
    ],
    typologies: [
      "Third-country invoicing to obscure the real buyer/seller",
      "Back-to-back letters of credit with no underlying trade",
      "Commodities misdescribed to evade sanctions (e.g., oil, dual-use goods)",
      "Mirror trades routed through correspondent chains",
      "Over-invoicing combined with trade-based value transfer (TBVT)",
    ],
    links: [
      { label: "Troika Laundromat case study", href: "/cases/troika-laundromat" },
      { label: "Deutsche Bank mirror trades case", href: "/cases/deutsche-bank" },
      { label: "Trade finance & sanctions chapters", href: "/courses/sanctions-screening" },
      { label: "Correspondent banking glossary", href: "/glossary" },
    ],
  },
];

export function getDiscipline(slug: string) {
  return disciplines.find((d) => d.slug === slug);
}
