// Money-laundering / fraud / sanctions-evasion typologies — the cheat-sheet
// layer. Each entry: what it is, how it works, what an analyst sees.

export interface Typology {
  name: string;
  how: string;
  signals: string;
}

export interface TypologyGroup {
  slug: string;
  title: string;
  blurb: string;
  accent: string;
  typologies: Typology[];
}

export const TYPOLOGY_GROUPS: TypologyGroup[] = [
  {
    slug: "placement",
    title: "Placement — getting cash into the system",
    blurb: "Layer 1 of the classic model — converting physical value into account balances.",
    accent: "text-sky-300 border-sky-400/40",
    typologies: [
      { name: "Structuring / smurfing", how: "Breaking amounts into sub-threshold deposits to avoid CTRs", signals: "9 × $8,900–$9,900 deposits; engineered just under $10k" },
      { name: "Bulk cash smuggling", how: "Physically moving currency across borders or into cash-intensive fronts", signals: "Trade misinvoicing for 'services'; cash couriers; funnel accounts" },
      { name: "Cash-intensive business", how: "Using a real business (salon, restaurant, car wash) to commingle illicit cash", signals: "Cash deposits far above declared revenue; no matching till records" },
      { name: "Gambling/casino junkets", how: "Buying chips with illicit cash, minimal play, cashing out 'winnings'", signals: "Buy-in ≫ play; structured chip purchases; junket account transfers" },
      { name: "Trade misinvoicing", how: "Over/under-invoicing goods to move value through trade payments", signals: "Invoice price deviates >20% from market; phantom shipments" },
    ],
  },
  {
    slug: "layering",
    title: "Layering — obscuring the trail",
    blurb: "Layer 2 — chains of transactions designed to break the audit trail.",
    accent: "text-violet-300 border-violet-400/40",
    typologies: [
      { name: "Shell company chains", how: "Layered corporate ownership to hide beneficial ownership", signals: "Nominee directors, secrecy jurisdictions, no operating history" },
      { name: "Invoice mills", how: "Many fabricated micro-invoices to shell consultants — aggregation is the scheme", signals: "40+ identical-structure payments; retroactive 'contracts' after alert" },
      { name: "Crypto peel chains", how: "On-chain layering — small repeated hops through wallets/mixers", signals: "Mixer inflows; hop chains; exchange cash-out timing" },
      { name: "TBML layering", how: "Trade transactions themselves create the layers (over/under-invoicing loops)", signals: "Circular trade flows; same goods re-invoiced" },
      { name: "Real estate layering", how: "Property bought through layered entities, sold to integrate", signals: "Opaque ownership; price ≠ market; quick flips" },
      { name: "Funnel accounts", how: "Many senders → one collector → onward transfer", signals: "Unrelated 'families' paying one recipient; scripted explanations" },
    ],
  },
  {
    slug: "integration",
    title: "Integration — re-entering the legitimate economy",
    blurb: "Layer 3 — the point where laundered money looks clean again.",
    accent: "text-emerald-300 border-emerald-400/40",
    typologies: [
      { name: "Front businesses", how: "Illicit funds become 'revenue' of a real or fake business", signals: "Revenue inconsistent with activity; owner lifestyle ≠ declared income" },
      { name: "Luxury assets", how: "Buying art, jewellery, yachts, private jets", signals: "Asset purchases unrelated to declared wealth; nominee buyers" },
      { name: "Loan-back schemes", how: "Illicit money lent back via 'legitimate' loans from controlled entities", signals: "Loans from opaque lenders; repayments exceed business logic" },
      { name: "Digital asset cash-out", how: "Crypto → fiat via exchanges, P2P, or OTC desks", signals: "New wallets; mixer exposure; exchange deposit patterns" },
    ],
  },
  {
    slug: "fraud",
    title: "Fraud typologies",
    blurb: "Deception-based value transfer — overlaps AML but has its own mechanics.",
    accent: "text-rose-300 border-rose-400/40",
    typologies: [
      { name: "APP fraud", how: "Customer is deceived into authorising the payment themselves", signals: "New payee; coercion scripts; 'family emergency' stories; mule beneficiary" },
      { name: "Account takeover", how: "Credentials stolen → unauthorised transactions", signals: "New device/location; password resets; SIM-swap indicators" },
      { name: "Money mules", how: "Accounts that receive fraud proceeds and forward them for a fee", signals: "Fan-in from many senders; rapid fan-out; 'work phone' instruction chats" },
      { name: "BEC", how: "Business email compromise — fake invoices/CEO fraud", signals: "New bank details on vendor payments; lookalike domains" },
      { name: "Synthetic identity", how: "Fabricated identity combining real + fake data for credit fraud", signals: "Thin file; SSN issued recently; address inconsistencies" },
      { name: "First-party fraud", how: "Customer lies on application — overstates income/assets", signals: "Declared income implausible; rapid credit seeking" },
    ],
  },
  {
    slug: "sanctions-evasion",
    title: "Sanctions evasion",
    blurb: "Getting around designated-party controls — the screening analyst's nemesis.",
    accent: "text-amber-300 border-amber-400/40",
    typologies: [
      { name: "Ownership layering", how: "Hide designated ownership behind nominees/trusts/front companies", signals: "50% rule violations; trust protectors; cascade ownership" },
      { name: "Name variations", how: "Transliteration, initials, middle names to defeat exact match", signals: "Fuzzy-match near hits; DOB/nationality mismatches on true-match analysis" },
      { name: "Vessel/flag evasion", how: "Flag changes, dark AIS periods, management-company cut-outs", signals: "AIS gaps; flag-of-convenience registries; shared managers" },
      { name: "Third-country routing", how: "Route through non-sanctioned intermediaries to obscure origin/destination", signals: "Unusual corridor patterns; transshipment hubs" },
      { name: "Trade diversion", how: "Controlled goods rerouted via clean jurisdictions with falsified docs", signals: "HS-code mismatches; broken seals; amended invoices post-hold" },
    ],
  },
  {
    slug: "emerging",
    title: "Emerging typologies",
    blurb: "New laundering surfaces — examiners and typology feeds track these closely.",
    accent: "text-fuchsia-300 border-fuchsia-400/40",
    typologies: [
      { name: "NFT wash trading", how: "Self-trading NFTs to fake volume and launder value", signals: "Same wallet buy/sell; floor-price manipulation; no external buyers" },
      { name: "Metaverse assets", how: "Virtual land/items as value stores and transfer layers", signals: "Cross-platform asset flows; unverifiable valuations" },
      { name: "Carbon credit fraud", how: "Fake or double-counted carbon credits as tradeable value", signals: "Duplicate serial numbers; registry mismatches" },
      { name: "DeFi Ponzi schemes", how: "Fake yield protocols draining deposits", signals: "Guaranteed returns; unaudited contracts; anonymous teams" },
      { name: "Privacy coins", how: "Monero/Zcash for untraceable transfer", signals: "Exchange inflows from privacy-coin swaps; no chain visibility" },
      { name: "Trade-based crypto", how: "Crypto payments for trade to bypass banking controls", signals: "Invoice settled in crypto; wallet counterparty opaque" },
    ],
  },
];
