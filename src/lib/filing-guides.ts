// Jurisdiction filing walkthroughs — how a suspicious-activity report is
// actually filed in each regime: channel, fields, deadline, quirks.

export interface FilingStep {
  title: string;
  body: string;
  fields?: string[];
}

export interface FilingGuide {
  slug: string;
  regime: string;
  country: string;
  reportName: string;
  deadline: string;
  channel: string;
  steps: FilingStep[];
  gotchas: string[];
}

export const FILING_GUIDES: FilingGuide[] = [
  {
    slug: "us-sar",
    regime: "US — FinCEN",
    country: "United States",
    reportName: "Suspicious Activity Report (SAR)",
    deadline: "30 calendar days from initial detection (60 days if no subject identifiable)",
    channel: "FinCEN BSA E-Filing System",
    steps: [
      {
        title: "1 · Detect and decide",
        body: "The obligation triggers when staff 'know, suspect, or have reason to suspect' the activity involves or is designed to involve $2,000+ (or any amount for insider abuse / BSA violations). Document the decision — the SAR exists because suspicion existed, not because a crime was proven.",
      },
      {
        title: "2 · Complete the SAR form",
        body: "The form has fixed sections — you fill boxes, not essays:",
        fields: [
          "Filing institution block — your EIN and contact",
          "Subject information — name, address, TIN, DOB, account numbers, role (account owner, signer, beneficiary…)",
          "Activity information — date range, amount, IP addresses, location",
          "Suspicious activity types — checkbox typologies (structuring, money laundering, fraud, sanctions…)",
          "Narrative — the free-text section where the story lives (max ~20k chars)",
          "Filing institution contact — who the FIU calls",
        ],
      },
      {
        title: "3 · Write the narrative properly",
        body: "The narrative is where quality is judged: who the subject is, what happened, when, where the money went, why it's suspicious, and what the institution did. Use dates, amounts, account numbers — facts, not adjectives. 'John Doe is suspicious' fails; 'nine deposits of $8,900–$9,900 totalling $87,300 over 12 days, wired within 48h to Logistics Plus LLC in [jurisdiction]' works.",
      },
      {
        title: "4 · File and retain",
        body: "Submit via BSA E-Filing; keep the SAR and all supporting documents for 5 years. Confidentiality is absolute — tipping off the subject is a federal crime (31 USC 5321). SARs are not shared back with you — FinCEN may act on them silently.",
      },
    ],
    gotchas: [
      "Continuing activity: file a follow-up SAR every 90 days while the suspicious activity continues",
      "Joint filings exist for MSBs and multi-entity cases — coordinate before filing",
      "E-filing is mandatory for most institutions — paper SARs are essentially gone",
      "$2,000 threshold is for most activity; insider abuse and BSA violations have NO threshold",
    ],
  },
  {
    slug: "uk-sar",
    regime: "UK — NCA / UKFIU",
    country: "United Kingdom",
    reportName: "SAR + DAML request",
    deadline: "'As soon as practicable' — but DAML notice gives 7 working days + up to 31-day moratorium",
    channel: "SAR Online portal → UKFIU (NCA)",
    steps: [
      {
        title: "1 · The consent regime is different",
        body: "UK SARs aren't just reports — they're permission requests. If you know or suspect money laundering, you must file a SAR. If the transaction hasn't happened yet, you can seek 'consent' via a DAML (Defence Against Money Laundering) request — proceed only with NCA consent or after the moratorium expires.",
      },
      {
        title: "2 · Complete the SAR",
        body: "UKFIU's SAR Online form asks for subject details, the suspicion basis, and supporting information. The narrative expectations match the US — specific facts, dates, amounts, reasoning.",
      },
      {
        title: "3 · DAML mechanics",
        body: "For transactions you're considering: file the SAR with a DAML request. NCA has 7 working days to respond; if no response, a 31-day moratorium starts (extendable by court order). You may only proceed after consent or moratorium expiry — proceeding earlier is money-laundering offence territory.",
      },
      {
        title: "4 · Tipping-off is a crime",
        body: "Telling the customer a SAR exists — even indirectly ('we need more information about this payment') in ways that reveal the report — is a criminal offence under POCA. The MLRO handles all customer contact.",
      },
    ],
    gotchas: [
      "DAML is for transactions not yet completed; completed transactions just need the SAR",
      "The 31-day moratorium can be extended — don't assume expiry means proceed",
      "Failure to file when you knew or suspected = criminal offence for the individual MLRO, not just the firm",
      "UK has no fixed SAR deadline — 'as soon as practicable' means same-day for most cases",
    ],
  },
  {
    slug: "eu-goaml",
    regime: "EU / international — goAML",
    country: "European Union + 60+ countries",
    reportName: "STR via goAML",
    deadline: "Varies by member state — no single EU deadline until AMLR fully applies",
    channel: "goAML platform (used by EU FIUs + many others)",
    steps: [
      {
        title: "1 · Know your national wrapper",
        body: "goAML is the filing platform, not the law. Each member state sets its own deadline, thresholds and report types on top — a German STR, French STR and Dutch unusual-transaction report differ in detail even though they share the pipe.",
      },
      {
        title: "2 · goAML form structure",
        body: "The goAML form organises reports into structured sections: reporting entity, subject(s), the 'report' itself with typed fields for transactions, and a free-text narrative. Many FIUs accept XML/structured uploads for high-volume reporters.",
      },
      {
        title: "3 · The AMLR shift coming",
        body: "The EU's AML Regulation (directly applicable from 2027) plus AMLA supervision will harmonise definitions, thresholds and reporting — until then, national rules govern. Track the transposition status of your jurisdiction.",
      },
      {
        title: "4 · FIU-to-FIU exchange",
        body: "goAML connects to the Egmont Secure Web — your STR can be shared with other FIUs automatically. This is why accurate subject identifiers and transaction details matter: they enable cross-border matching.",
      },
    ],
    gotchas: [
      "goAML ≠ one rulebook — always check the member-state deadline, not just the platform",
      "Some FIUs require both an STR and a separate 'unusual transaction' report — check which applies",
      "AMLA's direct supervision of CASPs starts phasing in — crypto reporters face the biggest change",
      "Language requirements vary — some FIUs require reports in the national language",
    ],
  },
  {
    slug: "canada-str",
    regime: "Canada — FINTRAC",
    country: "Canada",
    reportName: "Suspicious Transaction Report (STR)",
    deadline: "'As soon as practicable' — the old 30-day rule was removed in 2021",
    channel: "FINTRAC web reporting",
    steps: [
      {
        title: "1 · The deadline trap",
        body: "FINTRAC removed the fixed 30-day deadline in 2021 — reports are now due 'as soon as practicable'. Most examiners interpret this as days, not weeks. The old 30-day habit is a compliance gap.",
      },
      {
        title: "2 · What triggers it",
        body: "You must report when you have reasonable grounds to suspect the transaction is related to ML/TF — regardless of amount. There's also a separate Large Virtual Currency Transaction Report (LVCTR, CAD $10k+) and EFT reporting regime.",
      },
      {
        title: "3 · The report itself",
        body: "FINTRAC's web form captures subject details, transaction specifics, and grounds for suspicion. Keep records for 5 years. Attempted transactions are reportable too.",
      },
      {
        title: "4 · Record-keeping duties",
        body: "Canada requires records on STRs filed AND on decisions NOT to file (with rationale). The 'we considered and decided against' documentation is what examiners test first.",
      },
    ],
    gotchas: [
      "No more 30-day rule — 'as soon as practicable' means file promptly",
      "LVCTRs are separate from STRs — a large crypto transaction needs both if suspicious",
      "Reasonable-grounds-to-suspect is a lower bar than proof — file on suspicion",
      "PCMLTFA applies to MSBs, casinos, dealers in precious metals — not just banks",
    ],
  },
  {
    slug: "india-str",
    regime: "India — FIU-IND",
    country: "India",
    reportName: "Suspicious Transaction Report (STR)",
    deadline: "Within 7 days of suspicion forming — the strictest fixed clock among major regimes",
    channel: "FIU-IND web portal",
    steps: [
      {
        title: "1 · The 7-day clock",
        body: "PMLA requires STR filing within 7 days of the suspicion arising — calendar days, not business days. Weekend and holiday timing matters operationally; a suspicion forming Friday effectively has 2 working days.",
      },
      {
        title: "2 · CTR vs STR",
        body: "Cash transactions over ₹10 lakh (and cash deposits over ₹50 lakh) require CTRs. STRs are for suspicious activity at ANY amount — there's no de minimis. The two regimes run in parallel.",
      },
      {
        title: "3 · Filing on the portal",
        body: "FIU-IND's web portal takes the STR in structured form: customer details, transaction details, grounds for suspicion, and supporting documents. Principal officers must certify filings.",
      },
      {
        title: "4 · The ED relationship",
        body: "FIU-IND shares intelligence with the Enforcement Directorate, which prosecutes under PMLA. Your STR feeds directly into ED investigations — accuracy and completeness matter for convictions.",
      },
    ],
    gotchas: [
      "7 days is unforgiving — build same-day escalation into your TM workflow",
      "Cash thresholds: CTR >₹10 lakh transactions, >₹50 lakh cash deposits — learn both",
      "STR has no amount threshold — small suspicious amounts still report",
      "PMLA covers securities, insurance, real estate, dealers in precious metals — not just banks",
    ],
  },
  {
    slug: "singapore-str",
    regime: "Singapore — STRO",
    country: "Singapore",
    reportName: "Suspicious Transaction Report (STR)",
    deadline: "≤5 business days (tightened July 2025); sanctions-related cases: 1 business day",
    channel: "STRO via goAML platform",
    steps: [
      {
        title: "1 · Among the tightest deadlines",
        body: "Singapore tightened STR deadlines to 5 business days in July 2025, with sanctions-related cases requiring filing within 1 business day. Plan same-day escalation — the window is smaller than most regimes.",
      },
      {
        title: "2 · CDSA framework",
        body: "Reports go to STRO (Suspicious Transaction Reporting Office) via goAML. The legal basis is the Corruption, Drug Trafficking and Other Serious Crimes Act — the suspicion standard is 'reasonable grounds to know or believe'.",
      },
      {
        title: "3 · Tipping-off prohibition",
        body: "Disclosing a suspicion or STR to the customer is an offence under CDSA. The MLRO/CO (Compliance Officer) handles all external communication.",
      },
      {
        title: "4 · MAS supervision",
        body: "MAS supervises the regime for financial institutions — filing failures are enforcement actions, not just exam findings. MAS publishes enforcement actions publicly.",
      },
    ],
    gotchas: [
      "5 business days is the outer limit — most cases should file same or next day",
      "Sanctions cases: 1 business day — know which applies before you file",
      "MAS enforcement is public — filing failures become reputational events",
      "goAML is the channel but CDSA is the law — the 5-day rule comes from guidelines, not the Act",
    ],
  },
];
