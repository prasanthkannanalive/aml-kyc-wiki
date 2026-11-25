// Document red-flag spotter — realistic documents with planted issues.
// User selects which candidate findings are REAL issues; decoys are plausible
// but not actual problems.

export interface DocIssue {
  id: string;
  label: string;
  why: string;
}

export interface SpotterDoc {
  slug: string;
  title: string;
  kind: string;
  /** rendered document content — lines shown to the user */
  lines: string[];
  issues: DocIssue[]; // the REAL planted issues
  decoys: string[];   // plausible-sounding non-issues
}

export const SPOTTER_DOCS: SpotterDoc[] = [
  {
    slug: "lc-documents",
    title: "Letter of Credit document set",
    kind: "Trade finance",
    lines: [
      "COMMERCIAL INVOICE — INV-2025-0441",
      "Seller: Meridian Textiles Ltd, Istanbul",
      "Buyer: Gulf Horizon Trading, Dubai",
      "Goods: Men's cotton garments, 12,000 units",
      "Quantity: 12,000 units × $40.00 = $480,000",
      "Terms: 100% payment at sight",
      "BILL OF LADING — BL-7734-EG",
      "Vessel: MV Coral Star, voyage 118E",
      "Port of loading: Alexandria, Egypt",
      "Port of discharge: Jebel Ali, UAE",
      "Shipper: said to contain (STC) — no container numbers listed",
      "Freight forwarder: Delta Freight Services (incorporated 14 Feb 2025)",
      "INSURANCE CERTIFICATE — covers marine cargo, Institute Cargo Clauses (C)",
      "Certificate issued by buyer's own affiliate, 2 days before B/L date",
      "END-USER CERTIFICATE — 'final destination: UAE free zone, re-export prohibited'",
      "Beneficiary bank: Al-Rashid Exchange, Dubai (payment routed via Cayman Islands shell)",
    ],
    issues: [
      { id: "overinvoice", label: "Invoice value ~2.3× market price for declared goods", why: "Market comparables put this cargo at $195–210k — the $480k invoice is the over-invoicing red flag." },
      { id: "stc", label: "Bill of lading marked 'said to contain' with no container numbers", why: "STC + no container/voyage verifiability is the classic phantom-shipment indicator." },
      { id: "newforwarder", label: "Freight forwarder incorporated 6 weeks before shipment", why: "Brand-new logistics counterparties on first-time routes are TBML infrastructure." },
      { id: "affilcert", label: "Insurance certificate issued by buyer's affiliate, dated before the B/L", why: "Self-issued or affiliate-issued certificates are worthless as independent evidence." },
      { id: "paymentroute", label: "Payment routed via Cayman Islands shell unrelated to buyer", why: "Payment through opaque third-country entities obscures the true beneficiary." },
    ],
    decoys: [
      "Goods described as 'garments' instead of a more specific textile category",
      "Invoice uses EUR instead of USD denomination",
      "Certificate of insurance uses Institute Cargo Clauses (C) — the minimum cover level",
      "Vessel name 'MV Coral Star' sounds unusual",
    ],
  },
  {
    slug: "kyb-registry",
    title: "KYB corporate registry extract",
    kind: "Onboarding / KYB",
    lines: [
      "CERTIFICATE OF INCORPORATION — Orion Holdings Ltd",
      "Registered: 12 Jan 2024, jurisdiction: BVI",
      "Company number: 2087412",
      "REGISTERED AGENT: Harbour Corporate Services Ltd",
      "SHAREHOLDERS (per registry filing):",
      "  — Summit Capital Ltd (60%) — incorporated same day, same agent",
      "  — First Meridian Trust (40%) — bearer shares, no named holder",
      "DIRECTORS:",
      "  — James Whitfield (also director of 47 other BVI companies)",
      "REGISTERED OFFICE: Suite 4, Harbour House, Road Town",
      "No business activity declared on incorporation filing",
      "Customer's declared business: 'international commodity trading'",
      "Expected monthly transaction volume: $2.4m",
      "UBO declaration: 'withheld — commercially sensitive'",
    ],
    issues: [
      { id: "layeredshares", label: "60% shareholder is a same-day shell with the same agent", why: "Instant layered incorporation with identical agents is nominee ownership infrastructure." },
      { id: "bearershares", label: "40% held as bearer shares with no named holder", why: "Bearer shares exist specifically to defeat beneficial-ownership identification." },
      { id: "prolificdirector", label: "Director sits on 47 companies — classic nominee profile", why: "Serial directorship across dozens of shells is the standard nominee signature." },
      { id: "ubowithheld", label: "UBO declaration refused as 'commercially sensitive'", why: "UBO identification is a legal obligation, not a preference — refusal is an onboarding blocker." },
      { id: "volume", label: "$2.4m/month expected from a zero-activity shell", why: "Declared volume with no operating history, staff or premises is unexplained wealth territory." },
    ],
    decoys: [
      "Company incorporated in BVI — a common jurisdiction for holding companies",
      "Registered agent is a well-known corporate services firm",
      "Only 2 shareholders listed — some might expect more for a trading company",
      "No business activity declared 'on incorporation' — filings often lag",
    ],
  },
  {
    slug: "travel-rule",
    title: "Virtual asset transfer records",
    kind: "VASPs / Travel Rule",
    lines: [
      "ORIGINATOR VASP: QuickSwap Exchange (licensed, EU)",
      "ORIGINATOR CUSTOMER: 'Alex Chen', KYC tier 2",
      "TRANSFER: 0.85 BTC → self-hosted wallet 1A1z…",
      "VALUE: ~$48,000 equivalent",
      "TRAVEL RULE DATA:",
      "  — Originator name: omitted ('customer privacy preference')",
      "  — Originator account: omitted",
      "  — Beneficiary VASP: 'unknown — unhosted wallet'",
      "  — Beneficiary name: not collected",
      "TIMING: 23:47 UTC, Saturday",
      "PATTERN: 3rd transfer this week — $46k, $51k, $48k",
      "Each transfer just under exchange's enhanced-review threshold of $50k",
      "Customer's stated purpose: 'portfolio rebalancing'",
      "No travel-rule attestation obtained from receiving side",
    ],
    issues: [
      { id: "trmissing", label: "Travel Rule originator data omitted despite >€1,000 transfer", why: "TR requires originator name/account on qualifying transfers — 'privacy preference' isn't an exemption." },
      { id: "unhosted", label: "Beneficiary is an unhosted wallet — no VASP to receive TR data", why: "Unhosted wallets are the hardest Travel Rule edge — extra EDD is required." },
      { id: "subthreshold", label: "Three transfers engineered just under the $50k review threshold", why: "Repeated sub-threshold sizing is structuring — the pattern across transfers is the signal." },
      { id: "weekend", label: "All transfers at weekend late-night hours", why: "Timing patterns can indicate layering designed around review staffing." },
      { id: "purpose", label: "Vague purpose ('portfolio rebalancing') for $145k/week outflows", why: "Uncorroborated purpose statements on large recurring outflows demand SoF/SoW verification." },
    ],
    decoys: [
      "Transfer made on Saturday — some might think weekend = suspicious by itself",
      "BTC price volatility means USD values fluctuate",
      "Customer is KYC tier 2 — a fairly verified tier",
      "Unhosted wallets are common for self-custody enthusiasts",
    ],
  },
  {
    slug: "sar-draft",
    title: "Draft SAR narrative",
    kind: "Reporting",
    lines: [
      "SAR NARRATIVE DRAFT — analyst submission",
      "Subject: John Doe, account #4471",
      "Activity: 'John Doe made some transactions that looked",
      "suspicious to me. He is a bad person I think and",
      "probably laundering money. He wired $50,000 to a",
      "company in Dubai which is a bad place. He has been",
      "doing this for a while. Please investigate him.'",
      "Filed: 28 days after first alert",
      "Word count: 52",
      "No transaction dates, amounts breakdown, or counterparty details",
    ],
    issues: [
      { id: "vague", label: "'Some transactions that looked suspicious' — no specific activity described", why: "SARs must describe the suspicious activity specifically — dates, amounts, patterns — not impressions." },
      { id: "speculation", label: "'He is a bad person I think' — speculation, not evidence", why: "SARs report facts and suspicion of *activity* — character opinions are inadmissible noise." },
      { id: "missingwho", label: "No subject identifiers beyond name/account number", why: "Subject section needs DOB/address/ID — FIUs can't investigate 'John Doe'." },
      { id: "missingwhen", label: "No dates or activity period given", why: "The 'when' is mandatory — investigation needs the timeframe." },
      { id: "missingwhy", label: "No explanation of WHY the activity is suspicious", why: "The analyst's reasoning — the typology indicators — is the most valuable part of the narrative." },
      { id: "missingwhere", label: "Dubai mentioned but counterparty not identified", why: "Counterparty details (name, account, relationship) are needed for the FIU to follow the trail." },
    ],
    decoys: [
      "SAR was filed within 30 days — deadline met",
      "Narrative is short — some might think brevity is fine",
      "Subject name and account number ARE included",
      "$50,000 wire amount IS mentioned once",
    ],
  },
];
