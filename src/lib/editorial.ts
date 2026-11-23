export interface Article {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tag: string;
  mins: number;
  body: string[];
}

export const news: Article[] = [
  {
    slug: "kyc-cdd-tm-analyst-launch",
    title: "New certification track: KYC/CDD & Transaction Monitoring Analyst",
    dek: "Six modules, 36 chapters — the operational core of AML work from customer onboarding to SAR filing.",
    date: "2026-11-20",
    tag: "Product",
    mins: 3,
    body: [
      "AML/KYC Wiki has launched its fourth certification track: the Certified KYC/CDD & Transaction Monitoring Analyst — badge AML-Operations Core.",
      "The programme covers the day-to-day disciplines that sit between onboarding and the regulator: the risk-based approach and customer lifecycle, individual KYC and PEPs, corporate KYB and ultimate beneficial ownership, transaction monitoring mechanics and typologies, alert investigation and evidence gathering, and SAR/STR narrative writing.",
      "Every module ends with a five-question knowledge check, and the course closes with a 10-question final assessment — pass mark 70% — that issues a course-completion badge.",
      "Content is grounded in primary sources: FATF Recommendations and guidance, Wolfsberg statements, FinCEN advisories, the FFIEC manual, EBA risk-factor guidelines and FIU-IND rules — all linked from the course page and mirrored in the Document Library.",
    ],
  },
  {
    slug: "fatf-mutual-evaluation-vasp-focus",
    title: "FATF mutual evaluations sharpen focus on VASP compliance gaps",
    dek: "Latest evaluation reports show crypto service providers still lagging on travel rule and STR quality — with direct consequences for correspondent banking access.",
    date: "2026-11-18",
    tag: "Regulation",
    mins: 6,
    body: [
      "Financial Action Task Force mutual evaluation reports published this quarter continue to flag virtual asset service providers as the weakest segment of AML/CFT supervision. Evaluators found recurring gaps in travel-rule implementation, suspicious-activity reporting quality, and risk assessments for anonymous or unhosted wallets.",
      "The pattern matters beyond crypto. Banks and payment firms relying on VASPs for fiat on- and off-ramps are being told by supervisors to evidence enhanced due diligence on those counterparties — pushing VASP risk ratings upward across the board.",
      "For compliance teams, the practical takeaway is that 'we rely on the VASP's controls' is no longer a defensible position. Expect examiners to ask for your own travel-rule reconciliation, wallet-screening coverage, and escalation metrics.",
      "The FATF's targeted update on virtual assets is expected early next year, and supervisors have signalled it will be used as the benchmark for national rulemaking. Firms with dormant crypto-exposure policies should treat the next quarter as a remediation window.",
    ],
  },
  {
    slug: "sanctions-screening-ai-alert-triage",
    title: "AI-assisted alert triage moves from pilot to production in sanctions teams",
    dek: "Early industry reports describe significant auto-disposition rates on name-matching alerts as LLM-based triage tools clear validation.",
    date: "2026-11-12",
    tag: "Technology",
    mins: 5,
    body: [
      "Sanctions screening teams at several global banks have moved LLM-assisted alert triage from sandbox to production, with early results showing a substantial share of false-positive alerts dispositioned without human touch — vendors and early adopters cite figures in the 40–60% range, though independent validation is still thin.",
      "The architecture is deliberately conservative: the model reads the alert, the underlying list entry, and the customer record, then proposes a disposition with a written rationale. Analysts approve or reject — nothing is auto-closed. Regulators have signalled acceptance of this human-in-the-loop model provided the rationale quality is auditable.",
      "The real bottleneck has shifted. With matching noise reduced, teams report that escalation quality — not alert volume — now determines queue health. Writing defensible rationales has become the scarcest skill in screening operations.",
      "Vendor watch: expect consolidation as screening platforms bolt on triage modules, and expect supervisors to ask for model-risk documentation on the disposition proposals themselves.",
    ],
  },
  {
    slug: "cft-de-risking-ngos-report",
    title: "New report links NGO de-risking to measurable drops in remittance access",
    dek: "New research quantifies how counter-terrorist-financing compliance is shrinking correspondent banking corridors for humanitarian payments.",
    date: "2026-11-05",
    tag: "Policy",
    mins: 7,
    body: [
      "Humanitarian agencies and compliance researchers have published analysis indicating that NGO payment corridors have contracted significantly over the past five years, with CFT-related de-risking widely cited as a primary driver.",
      "The report echoes long-standing FATF concern about Recommendation 8 — the requirement that non-profit organisations not be abused for terrorist financing — and the over-compliance it induces. Banks, unable to distinguish legitimate charity flows from abuse patterns, respond by exiting entire corridors.",
      "Proposed mitigations cluster around three ideas: shared due-diligence utilities for the NGO sector, regulator-sanctioned 'safe harbour' corridors for vetted humanitarian organisations, and better typology data so banks can tell the difference between a zakat transfer and a TF funnel.",
      "Compliance officers should note the examination angle: supervisors are increasingly asking how firms document the decision to de-risk, not just the decision itself.",
    ],
  },
  {
    slug: "trade-based-laundering-customs-data",
    title: "Customs data partnerships give banks a new window into trade-based laundering",
    dek: "Pilot programmes matching bank payment data against customs declarations are surfacing invoice manipulation patterns invisible to transaction monitoring.",
    date: "2026-10-29",
    tag: "Investigations",
    mins: 6,
    body: [
      "A small number of banks and customs authorities are running pilots that match trade-finance payment flows against customs declarations in near-real time — flagging discrepancies in invoice values, commodity descriptions, and counterparties that classic transaction monitoring cannot see.",
      "Trade-based money laundering has long been considered the preserve of bespoke investigations because it requires documentary evidence. The new data partnerships are changing that: over-invoicing by 8–15% on repeated shipments is now surfacing as an automated alert type.",
      "Privacy and data-sharing frameworks remain the gating issue. Early pilots rely on aggregated, anonymised feeds rather than raw customs records, and legal teams are still negotiating what 'anonymised' means for beneficial-ownership-level data.",
      "For analysts, the skill implication is straightforward: understanding Incoterms, bill-of-lading chains and HS codes is moving from 'nice to have' to operationally relevant in trade-finance monitoring.",
    ],
  },
];

export const research: Article[] = [
  {
    slug: "tf-detection-beyond-thresholds",
    title: "Counter-terrorist financing detection: why behaviour beats thresholds",
    dek: "A field guide to the indicators that actually carry information when the amounts are too small and the money is too clean.",
    date: "2026-10-20",
    tag: "Deep dive",
    mins: 12,
    body: [
      "Terrorist financing defeats most AML machinery for structural reasons, not technical ones. The sums are small, the source funds are often lawful, and there is no layering to detect — the offence is complete when funds are provided with the intention or knowledge of terrorist use.",
      "This means value-based detection is close to useless. A $200 remittance is not suspicious because of its amount; it is suspicious because of who sends it, to whom, how often, and in what pattern relative to the sender's ordinary life.",
      "The indicators that carry real information are therefore relational and behavioural: small cells of accounts transacting only with each other; remittance senders with no familial or commercial explanation for the corridor; timing clusters around known attack anniversaries; sudden behavioural shifts in long-dormant accounts.",
      "The honest caveat, and the reason the credential exists: no indicator set catches everything. A sound TF programme documents what it cannot see, tunes for precision rather than recall, and treats every disposition as defensible reasoning rather than a score.",
    ],
  },
  {
    slug: "beneficial-ownership-screening-limits",
    title: "What sanctions screening cannot see: the limits of ownership analysis",
    dek: "Nominees, trusts and layered structures still defeat list matching — a practical map of where the fifty-percent rule ends.",
    date: "2026-10-08",
    tag: "Frameworks",
    mins: 10,
    body: [
      "Sanctions ownership rules — the US Fifty Percent Rule, the EU aggregation test, the UK control analysis — are powerful but bounded. They answer 'is this entity owned by a designated person?' They cannot answer 'who really benefits?' when the structure is built to hide that.",
      "Trusts are the canonical gap. A discretionary trust can separate legal title, beneficial enjoyment and control across three or more parties, none of whom may appear on a shareholder register. Nominee arrangements do the same with companies.",
      "The practical response is layered: registry-sourced ownership data where available, adverse-media and OSINT for the individuals behind opaque structures, and documented risk acceptance where the cost of perfect visibility exceeds the risk.",
      "Screening teams should treat 'no match found' as 'no match found in the data we screened' — a materially different statement. The rationale field exists precisely to record which sources were checked and which blind spots remain.",
    ],
  },
];
