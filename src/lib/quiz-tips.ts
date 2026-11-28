// Shared "what to improve" tips keyed by topic-section keywords.
// Used by cert mocks, course quizzes, review sessions and exam sims.

export const IMPROVEMENT_TIPS: Record<string, string> = {
  "Risk-Based Approach": "Re-read the RBA chapters — SDD vs EDD triggers, risk scoring inputs, and when controls must match risk.",
  "pKYC": "Review the pKYC vs periodic-refresh chapter — event triggers, continuous signals, and why fixed cycles are being replaced.",
  "EDD": "Deep-dive EDD/PEP chapters — senior approval, source-of-wealth corroboration, adverse media, RCAs.",
  "PEP": "Revisit the PEP/EDD chapter — foreign vs domestic vs international PEPs and the RCAs rule.",
  "KYB": "Study the KYB/UBO chapters — indirect ownership multiplication, 25% thresholds, bearer shares, nominee red flags.",
  "UBO": "Study the KYB/UBO chapters — indirect ownership multiplication, 25% thresholds, bearer shares, nominee red flags.",
  "Ownership": "Review ownership-aggregation rules — direct + indirect multiplication, the 50% rule, and evasion via layering.",
  "Trade Finance": "Read the TBML typology chapter — over/under-invoicing, phantom shipments, black-hole corridors.",
  "TBML": "Read the trade-based-laundering course — invoice fraud typologies, price benchmarking, correspondent exposure.",
  "Typologies": "Work through /typologies and the mule-account chapters — funnel, pass-through, smurfing patterns.",
  "Mule": "Review mule-account typologies — funnel accounts, money mules in fraud and ML, recruitment red flags.",
  "Investigation": "Practise investigation craft — well-formed RFIs, evidence preservation, five-Ws documentation.",
  "RFI": "Practise investigation craft — specific RFIs with deadlines, no tipping-off, complete documentation.",
  "Reporting": "Revisit the reporting chapters — PMLA Rule 8 (7-day STR), CTR ₹10L, CBWTR ₹5L, monthly deadlines.",
  "PMLA": "Re-read PMLA/FIU-IND chapters — thresholds, deadlines, definitions, scheduled offences.",
  "FIU-IND": "Focus on reporting mechanics — STR vs CTR vs NTR vs CBWTR vs CCR, deadlines, formats.",
  "SAR": "Practise in /sar-writer — five Ws, chronology, suspicion-not-guilt framing, continuing reports.",
  "STR": "Revisit reporting rules — 7-day STR window (India), 30-day SAR (US), UK 'as soon as practicable'.",
  "Fraud Fundamentals": "Re-read fraud fundamentals — fraud triangle, pressure/opportunity/rationalisation.",
  "Payment Fraud": "Study APP/payment fraud — authorised push payment scam mechanics and reimbursement rules.",
  "Governance": "Review the three-lines model and MLRO accountability chapters — first/second/third line duties.",
  "Fraud Types": "Survey fraud typologies — expense, payroll, procurement, cyber-enabled fraud schemes.",
  "Detection": "Work the analytics chapters + /labs — rule tuning, false-positive management, behavioural baselines.",
  "Response": "Review incident-response chapters — containment first, evidence preservation, escalation paths.",
  "Regulatory": "Study jurisdiction modules — UK PSR reimbursement, US BSA, EU AMLD differences.",
  "Liability": "Read enforcement cases — TD Bank, Binance — institutional and personal liability for failures.",
  "Sanctions Fundamentals": "Re-read sanctions basics — smart vs comprehensive sanctions, targeting logic.",
  "UN": "Study the UN sanctions framework — UNSCR binding force, consolidated lists, member-state obligations.",
  "Jurisdictions": "Compare sanctions authorities — UN, OFAC, EU, OFSI, UN domestic implementations.",
  "Implementation": "Review sanctions implementation — asset freezes, prohibitions, licensing, reporting duties.",
  "Screening": "Drill screening technology — fuzzy matching, name variants, true vs false positive resolution.",
  "Match Resolution": "Review match-resolution workflows — freeze on confirmed match, no tipping-off, escalation.",
  "Maritime": "Study maritime evasion — dark fleet AIS gaps, ship-to-ship transfers, flag-of-convenience risk.",
  "TF Fundamentals": "Re-read CTF basics — how TF differs from ML, sources and methods.",
  "FATF": "Study FATF recommendations + grey/black lists — mutual evaluations, compliance effects.",
  "Hawala": "Review informal value transfer — hawala mechanics, TBML connections, detection challenges.",
  "NPO": "Study NPO abuse — charity exploitation, donor abuse, regulatory safeguards.",
  "Detection Challenges": "Work the detection chapters — why TF is harder to spot than ML, low-value structuring.",
  "Freezing": "Review asset-freezing regimes — UN 1267/1373, domestic implementation, timelines.",
  "Cooperation": "Read the international-cooperation chapters — FIU networks, Egmont, mutual legal assistance.",
  "List-Based": "Drill list-screening workflows — UN/OFAC/EU/OFSI lists, match handling, freeze duties.",
  "Trafficking Economics": "Study trafficking economics — revenue models, sectors, exploitation types.",
  "Flow Typologies": "Review trafficking flow typologies — placement through cash-heavy fronts, layering via mules.",
  "Tracing": "Work tracing-methodology chapters — flow reconstruction, counterparty analysis, evidence gaps.",
  "Red Flags": "Survey trafficking red flags — victim account control, seasonal patterns, front businesses.",
  "Victim": "Review victim-account indicators — third-party control, coercion signals, SAR obligations.",
  "Obligations": "Re-read FI obligation chapters — SAR/STR duties for trafficking suspicions.",
  "Global Cooperation": "Study cross-border trafficking cooperation — FIU channels, NGO partnerships, victim protection.",
  "Asset Recovery": "Review asset-recovery frameworks — confiscation, restitution to victims, cross-border enforcement.",
  "Prevention": "Read prevention-framework chapters — awareness, reporting lines, public-private partnerships.",
  "Escalation": "Review escalation protocols — when and how to escalate trafficking suspicions internally and to authorities.",
  "VASP": "Re-read the VASP chapters — FATF R.15 definition, licensing, Travel Rule scope.",
  "Travel Rule": "Study the Travel Rule — originator/beneficiary data, thresholds, VASP-to-VASP exchange.",
  "Asset Risk": "Review crypto risk factors — stablecoin velocity, privacy coins, high-risk corridors.",
  "Analytics": "Work on-chain analytics — clustering, peel chains, mixer identification, attribution limits.",
  "Obfuscation": "Study laundering typologies — mixers, chain-hopping, peeling chains, cross-chain bridges.",
  "KYC/CDD": "Revisit CDD chapters — VASP onboarding, wallet screening, ongoing monitoring duties.",
  "Monitoring": "Review crypto transaction-monitoring — rule tuning, chain analytics integration, alert handling.",
  "DeFi": "Read the DeFi chapter — disintermediation, smart-contract risk, regulatory grey zones.",
  "NFT": "Review NFT risk — wash trading, pseudonymous transfers, valuation fraud.",
  "Scale": "Study TBML scale data — why trade is the largest laundering channel globally.",
  "Invoice Fraud": "Deep-dive invoice-fraud typologies — over/under-invoicing, phantom shipments, multiple invoicing.",
  "Benchmarks": "Review analytics chapters — price benchmarking, HS-code analysis, document verification.",
  "Correspondent": "Study correspondent-bank TBML exposure — nested relationships, limited visibility, EDD.",
  "SEBI": "Review SEBI AML/CFT framework + market-abuse chapters — UCC, KRA-KYC, UBO 25% threshold, market red flags.",
  "Market": "Review SEBI AML/CFT framework + market-abuse chapters — UCC, KRA-KYC, UBO 25% threshold, market red flags.",
  "Digital Assets": "Review virtual-asset + sanctions chapters — Travel Rule, mixers, chain-hopping, VASP obligations.",
  "FATF Lists": "Study the regulators page + FATF chapters — grey/black lists, R.10/16/20/30-32.",
  "Mixed Review": "Mixed-paper miss — revisit your lowest section above and re-take the related module checks.",
  "General": "Revisit the relevant course chapters and re-take the module quiz for this topic.",
  "Crypto": "Review virtual-asset + sanctions chapters — Travel Rule, mixers, chain-hopping, VASP obligations.",
  "Response & Controls": "Review TBML response controls — trade-finance controls, document checks, escalation.",
  "Controls": "Review TBML response controls — trade-finance controls, document checks, escalation.",
};

/** Pick the best tip for a section name by longest keyword match. */
export function tipForSection(section: string): string {
  let best = "";
  let bestLen = 0;
  for (const [key, tip] of Object.entries(IMPROVEMENT_TIPS)) {
    if (section.includes(key) && key.length > bestLen) {
      best = tip;
      bestLen = key.length;
    }
  }
  return (
    best ||
    "Revisit the relevant course chapters and re-take the module quiz for this topic."
  );
}
