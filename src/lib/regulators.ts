// Regulatory bodies directory — which FIU/regulator handles AML in each
// jurisdiction, the legal framework, filing channel and regime maturity.
// Deadline styles verified against regulator guidance; "as soon as
// practicable" is shown honestly rather than as a fixed day count.

export type RegTier = "advanced" | "established" | "developing";

export interface Regulator {
  country: string;
  code: string;
  regulator: string; // primary AML supervisor / FIU
  fiu: string; // financial intelligence unit
  law: string; // primary legislation
  filing: string; // reporting channel
  deadline: string; // deadline style (honest — not always a fixed day count)
  tier: RegTier;
  fatf: string; // FATF status note
  sim?: string; // matching job-simulation slug
  note: string;
}

export const TIER_META: Record<RegTier, { label: string; pct: number; cls: string; desc: string }> = {
  advanced: {
    label: "Advanced",
    pct: 100,
    cls: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
    desc: "Mature regime — structured e-filing, dedicated FIU analytics, active enforcement",
  },
  established: {
    label: "Established",
    pct: 65,
    cls: "text-sky-300 border-sky-400/40 bg-sky-400/10",
    desc: "Functional regime — core obligations in force, enforcement capacity growing",
  },
  developing: {
    label: "Developing",
    pct: 35,
    cls: "text-amber-300 border-amber-400/40 bg-amber-400/10",
    desc: "Emerging framework — newer legislation, capacity still building",
  },
};

export const REGULATORS: Regulator[] = [
  {
    country: "United States",
    code: "US",
    regulator: "FinCEN (FIU) · federal banking regulators (OCC, FDIC, Fed) · IRS-CI",
    fiu: "FinCEN — Financial Crimes Enforcement Network",
    law: "Bank Secrecy Act (BSA) · USA PATRIOT Act · AMLA 2020",
    filing: "BSA E-Filing System",
    deadline: "SAR 30 days (60 days if no subject) · CTR 15 days · continuing SARs 90 days",
    tier: "advanced",
    fatf: "FATF member since 1989",
    sim: "us-sar-filing",
    note: "Strictest fixed-deadline regime — missing SAR deadlines is a per-count violation.",
  },
  {
    country: "United Kingdom",
    code: "UK",
    regulator: "FCA · PRA · NCA (UKFIU for SARs)",
    fiu: "UK Financial Intelligence Unit (UKFIU, part of NCA)",
    law: "Proceeds of Crime Act 2002 (POCA) · MLR 2017",
    filing: "SAR to UKFIU · DAML request for consent",
    deadline: "DAML: 7-working-day notice + up to 31-day moratorium · 'as soon as practicable'",
    tier: "advanced",
    fatf: "FATF member since 1988",
    sim: "uk-daml-filing",
    note: "Consent regime — proceeding without consent after DAML expiry is a tipping-off risk area.",
  },
  {
    country: "Canada",
    code: "CA",
    regulator: "FINTRAC · OSFI · provincial securities regulators",
    fiu: "FINTRAC — Financial Transactions and Reports Analysis Centre",
    law: "PCMLTFA · PCMLTFRs (amended 2021)",
    filing: "FINTRAC web reporting",
    deadline: "'As soon as practicable' — 30-day rule replaced in 2021 · LCTR 15 days",
    tier: "advanced",
    fatf: "FATF member since 1989",
    sim: "canada-fintrac",
    note: "Common trap: many still cite the old 30-day STR deadline — it no longer exists.",
  },
  {
    country: "Australia",
    code: "AU",
    regulator: "AUSTRAC (single AML regulator for all sectors)",
    fiu: "AUSTRAC — Australian Transaction Reports and Analysis Centre",
    law: "AML/CTF Act 2006",
    filing: "AUSTRAC Online",
    deadline: "SMR 3 business days (24h terrorism) · TTR 10 business days (physical cash ≥A$10k)",
    tier: "advanced",
    fatf: "FATF member since 1989",
    sim: "australia-austrac",
    note: "TTRs cover physical currency only — electronic transfers don't trigger them.",
  },
  {
    country: "Singapore",
    code: "SG",
    regulator: "MAS · police (CDSA enforcement)",
    fiu: "STRO — Suspicious Transaction Reporting Office",
    law: "Corruption, Drug Trafficking and Other Serious Crimes Act (CDSA)",
    filing: "STRO via goAML platform",
    deadline: "STR ≤5 business days (tightened July 2025) · sanctions cases 1 business day",
    tier: "advanced",
    fatf: "FATF member since 1991",
    sim: "singapore-stro",
    note: "One of the shortest filing windows among developed markets — plan same-day escalation.",
  },
  {
    country: "Hong Kong",
    code: "HK",
    regulator: "HKMA · SFC · Customs (sector supervisors)",
    fiu: "JFIU — Joint Financial Intelligence Unit",
    law: "Anti-Money Laundering and Counter-Terrorist Financing Ordinance (AMLO)",
    filing: "STREAMS (STR) · goAML (other reports)",
    deadline: "'As soon as practicable' — days not weeks · no amount threshold",
    tier: "advanced",
    fatf: "FATF member via China; assessed under APG",
    sim: "hong-kong-jfiu",
    note: "Non-filing carries HK$50k fine + 3 months imprisonment for responsible officers.",
  },
  {
    country: "Japan",
    code: "JP",
    regulator: "FSA (banks) · JAFIC (non-bank operators)",
    fiu: "JAFIC — Japan Financial Intelligence Center (NPA)",
    law: "Act on Prevention of Transfer of Criminal Proceeds",
    filing: "e-Gov filing · FSA channel for banks",
    deadline: "'Promptly' under APTCP Art. 8 — no fixed statutory day count",
    tier: "advanced",
    fatf: "FATF member since 2000",
    sim: "japan-jafic",
    note: "Dual-channel regime: banks report via FSA; DNFBPs and others via JAFIC.",
  },
  {
    country: "European Union",
    code: "EU",
    regulator: "National supervisors + new AMLA (Frankfurt, phased 2025–2027)",
    fiu: "National FIUs — TracFin (FR), FIU-NL, goAML network",
    law: "AMLD6 · AMLR (directly applicable 2027) · AMLD6 national transposition",
    filing: "National FIU channels — mostly goAML",
    deadline: "No single EU deadline — national rules apply until AMLR full effect",
    tier: "advanced",
    fatf: "Member states are FATF members; EU-level harmonisation via AMLA",
    sim: "eu-filing",
    note: "AMLA becomes the direct EU supervisor for high-risk obliged entities from 2027.",
  },
  {
    country: "Switzerland",
    code: "CH",
    regulator: "FINMA · cantonal prosecutors",
    fiu: "MROS — Money Laundering Reporting Office Switzerland",
    law: "AMLA (Anti-Money Laundering Act)",
    filing: "MROS-goAML",
    deadline: "'Without delay' — no fixed day count",
    tier: "advanced",
    fatf: "FATF member since 1992",
    note: "Historically strong secrecy culture — post-2015 reforms significantly expanded scope.",
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    regulator: "CBUAE (banks) · free-zone regulators (DIFC, ADGM) · DNFBP supervisors",
    fiu: "UAE FIU — goAML platform",
    law: "Federal Decree-Law 20/2018 · AML cabinet resolutions",
    filing: "goAML",
    deadline: "'Immediately and without delay' — regardless of transaction value",
    tier: "advanced",
    fatf: "FATF member since 2024 (after grey-list exit)",
    sim: "uae-goaml",
    note: "No de minimis threshold — even small suspicious amounts must be reported.",
  },
  {
    country: "India",
    code: "IN",
    regulator: "RBI · SEBI · IRDAI (sector regulators) · ED (enforcement)",
    fiu: "FIU-IND — Financial Intelligence Unit-India",
    law: "PMLA 2002 · PML Rules 2005 (as amended)",
    filing: "FIU-IND web portal (STR / CTR)",
    deadline: "STR within 7 days of suspicion · CTR >₹10 lakh / ~₹50 lakh cash",
    tier: "established",
    fatf: "FATF observer; mutual evaluation 2023 rated largely compliant",
    note: "7-day STR clock is unforgiving — weekend/holiday counting matters operationally.",
  },
  {
    country: "South Africa",
    code: "ZA",
    regulator: "SARB (prudential) · FIC (FIU)",
    fiu: "FIC — Financial Intelligence Centre",
    law: "FICA 2001 (as amended by FICA Amendment Acts)",
    filing: "FIC web reporting",
    deadline: "'As soon as practicable' after suspicion arises",
    tier: "established",
    fatf: "FATF member since 2003",
    note: "Domestic PEP regime expanded significantly under 2022 amendments.",
  },
  {
    country: "Brazil",
    code: "BR",
    regulator: "BCB · CVM · sector regulators",
    fiu: "COAF — Council for Financial Activities Supervision",
    law: "Law 9.613/1998 · Law 12.683/2012",
    filing: "SISCOAF / COAF systems",
    deadline: "'Without delay' — no fixed day count",
    tier: "established",
    fatf: "FATF member since 2000",
    note: "Pix instant-payment rails have made real-time monitoring a strategic priority.",
  },
  {
    country: "Mexico",
    code: "MX",
    regulator: "CNBV · SHCP · UIF",
    fiu: "UIF — Unidad de Inteligencia Financiera",
    law: "LFPIORPI (2019 reform) · secondary provisions",
    filing: "UIF electronic systems",
    deadline: "Varies by report type — 'as soon as possible' for suspicious ops",
    tier: "developing",
    fatf: "FATF member since 2006; mutual evaluation follow-up ongoing",
    note: "2020 FATF MER flagged strategic deficiencies; reforms since then expanded obliged sectors.",
  },
  {
    country: "Nigeria",
    code: "NG",
    regulator: "CBN · SEC · sector regulators",
    fiu: "NFIU — Nigerian Financial Intelligence Unit",
    law: "Money Laundering (Prevention and Prohibition) Act 2022",
    filing: "NFIU goAML-based portal",
    deadline: "'Promptly' — no fixed day count in primary law",
    tier: "developing",
    fatf: "FATF grey list 2023–2025; exited October 2025",
    note: "Recent grey-list exit drove major legislative upgrades — regime maturing fast.",
  },
  {
    country: "Kenya",
    code: "KE",
    regulator: "CBK · CMA · IRA",
    fiu: "FRC — Financial Reporting Centre",
    law: "Proceeds of Crime and Anti-Money Laundering Act 2009 (POCAMLA)",
    filing: "FRC online reporting",
    deadline: "'As soon as practicable' after forming suspicion",
    tier: "developing",
    fatf: "FATF observer via ESAAMLG",
    note: "Mobile-money heavy economy — agent/network AML controls are the key frontier.",
  },
];

/* -------------------- enforcement pipeline stages -------------------- */

export const ENFORCEMENT_STAGES = [
  {
    n: "1",
    title: "Detection",
    desc: "Obliged entity identifies suspicion via monitoring, screening or staff report.",
  },
  {
    n: "2",
    title: "Internal escalation",
    desc: "MLRO/compliance reviews, decides filing obligation, preserves tipping-off controls.",
  },
  {
    n: "3",
    title: "FIU filing",
    desc: "SAR/STR/SMR submitted via national channel — deadline rules apply.",
  },
  {
    n: "4",
    title: "FIU analysis",
    desc: "Financial intelligence unit analyses, connects networks, disseminates to LEAs.",
  },
  {
    n: "5",
    title: "Investigation & enforcement",
    desc: "Law enforcement investigates; prosecutors bring charges; regulators sanction failures.",
  },
] as const;
