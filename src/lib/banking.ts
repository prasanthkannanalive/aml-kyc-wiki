// Worldwide banking systems, examination regimes and jurisdiction AML/KYC
// quick reference — the "how the system works" layer under the courses.

export interface FiType {
  name: string;
  what: string;
  amlAngle: string;
}

export const FI_TYPES: FiType[] = [
  {
    name: "Retail / commercial banks",
    what: "Deposits, lending, payments for individuals and businesses",
    amlAngle: "Full BSA/AML stack — CTRs, SARs, CDD, TM, sanctions screening",
  },
  {
    name: "Correspondent banks",
    what: "Provide USD/EUR clearing and payments for foreign banks",
    amlAngle: "Nested corridors, de-risking, respondent due diligence — highest AML exposure per dollar",
  },
  {
    name: "Private / wealth banks",
    what: "High-net-worth clients, trusts, complex structures",
    amlAngle: "PEP-heavy, SoW/SoF documentation, TBML via trade finance",
  },
  {
    name: "Money services / MSBs",
    what: "Money transmitters, check cashers, prepaid issuers",
    amlAngle: "High-risk channel — structuring, mule accounts, weak KYC historically",
  },
  {
    name: "Digital banks / fintechs",
    what: "App-only banks, neobanks, payment firms",
    amlAngle: "Fast onboarding vs CDD depth; app fraud, synthetic ID, mule networks",
  },
  {
    name: "Crypto VASPs / CASPs",
    what: "Exchanges, custodians, wallet providers",
    amlAngle: "Travel Rule, mixers, unhosted wallets, chain analytics",
  },
];

export interface ExamRegime {
  jurisdiction: string;
  internal: string;
  external: string;
}

export const EXAM_REGIMES: ExamRegime[] = [
  { jurisdiction: "United States", internal: "1st line: BSA Officer + compliance; 2nd line: internal audit", external: "FFIEC BSA/AML exam manual — interagency (Fed, OCC, FDIC, NCUA) + FinCEN 314 testing" },
  { jurisdiction: "United Kingdom", internal: "MLRO + compliance monitoring; operational audit", external: "PRA (prudential) + FCA (conduct) + NCA/POCA testing; OFSI enforcement" },
  { jurisdiction: "European Union", internal: "Local AML officer + internal audit per member state", external: "National supervisors (BaFin, ACPR, DNB, MAS-equivalents) under AMLD6 → AMLA single rulebook" },
  { jurisdiction: "Canada", internal: "Compliance officer + internal audit", external: "OSFI (prudential) + FINTRAC examiners; PCMLTFA reviews" },
  { jurisdiction: "India", internal: "KYC/AML cell + internal audit", external: "RBI inspection + FIU-IND oversight; PMLA compliance checks" },
  { jurisdiction: "Singapore", internal: "Compliance + internal audit", external: "MAS inspection + external audit; TTFCA/PS Act enforcement" },
  { jurisdiction: "Australia", internal: "AML/CTF compliance officer + audit", external: "AUSTRAC enforcement + APRA prudential review; AML/CTF Act 2006" },
  { jurisdiction: "Switzerland", internal: "AML officer + internal audit", external: "FINMA enforcement + SRO audits for non-bank financial intermediaries" },
  { jurisdiction: "Hong Kong", internal: "AML officer + audit", external: "HKMA on-site examination + SFC for securities; AMLO 2012" },
  { jurisdiction: "UAE", internal: "MLRO + internal audit", external: "CBUAE + goAML reporting; AMLA-aligned federal framework" },
];

export interface CountryAml {
  country: string;
  law: string;
  fiu: string;
  supervisor: string;
  filing: string;
}

export const COUNTRY_AML: CountryAml[] = [
  { country: "United States", law: "BSA 1970 + PATRIOT Act", fiu: "FinCEN", supervisor: "FFIEC agencies + FinCEN", filing: "SAR 30 days · CTR >$10k · 314(a)/(b)" },
  { country: "United Kingdom", law: "MLR 2017 + POCA 2002 + SAMLA 2018", fiu: "UKFIU (NCA)", supervisor: "FCA + PRA + OFSI", filing: "SAR via DAML · consent regime · strict liability" },
  { country: "European Union", law: "AMLD6 → AMLA single rulebook (2025–27)", fiu: "National FIUs via goAML", supervisor: "AMLA Authority + national supervisors", filing: "National SAR formats · Travel Rule CASPs" },
  { country: "Canada", law: "PCMLTFA + Proceeds of Crime Act", fiu: "FINTRAC", supervisor: "OSFI + FINTRAC", filing: "STR 'as soon as practicable' — no fixed 30-day" },
  { country: "India", law: "PMLA 2002", fiu: "FIU-IND", supervisor: "RBI + ED", filing: "STR 7 days · CTR ₹10L/₹50L thresholds" },
  { country: "Singapore", law: "Terrorism Act + PS Act + TTFCA", fiu: "STRO (Suspicious Transaction Reporting Office)", supervisor: "MAS", filing: "STR 5 days · sanctions TFS 1 day" },
  { country: "Australia", law: "AML/CTF Act 2006", fiu: "AUSTRAC", supervisor: "AUSTRAC + APRA", filing: "SMR/TTR thresholds · ongoing customer due diligence" },
  { country: "Switzerland", law: "AMLO + CDB 20 (banks)", fiu: "MROS", supervisor: "FINMA + SROs", filing: "SAR to MROS · 20-day blocking rule" },
  { country: "Hong Kong", law: "AMLO 2012", fiu: "JFIU (Customs & Excise)", supervisor: "HKMA + SFC", filing: "STR to JFIU · no tipping off" },
  { country: "UAE", law: "Federal AML law + goAML", fiu: "UAE FIU (goAML)", supervisor: "CBUAE + local regulators", filing: "STR/SAR via goAML · real-time sanctions" },
];

export const BANKING_FACTS: { k: string; v: string }[] = [
  { k: "Nostro / vostro / loro", v: "Nostro = your account at their bank; vostro = their view of your account; loro = the third bank's account" },
  { k: "Nested corridors", v: "Payment routed through multiple correspondents — each hop adds opacity and risk" },
  { k: "De-risking", v: "Banks exiting correspondent relationships over AML cost — drives activity to less-regulated channels" },
  { k: "Three lines of defence", v: "1st line operations owns controls; 2nd line compliance challenges/tests; 3rd line internal audit verifies independently" },
  { k: "Internal vs external exam", v: "Internal audit tests the program continuously; external exams (FFIEC, PRA/FCA, MAS…) are the regulator's independent assessment" },
];
