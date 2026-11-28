export interface ModuleQuizQuestion {
  q: string;
  options: string[];
  answer: number;
  /** One note per option (same order as `options`): why it is correct or why it is wrong. */
  explain?: string[];
}

// 5-question end-of-module checks, keyed by course slug then module num
export const MODULE_QUIZZES: Record<string, Record<number, ModuleQuizQuestion[]>> = {
  "kyc-cdd-tm-analyst": {
    1: [
      {
        q: "The risk-based approach requires the firm to:",
        options: [
          "Apply identical CDD to every customer regardless of risk",
          "Concentrate controls where ML/TF risk is highest, proportionate to the rating",
          "Only monitor high-risk customers and ignore the rest",
          "Avoid any risk assessment to keep onboarding fast",
        ],
        answer: 1,
        explain: [
          "Wrong — identical CDD to everyone is the opposite of risk-based; it wastes effort on low-risk customers and under-controls high-risk ones.",
          "Correct — the RBA directs the strongest controls (EDD, enhanced monitoring) to the highest-risk customers and lighter controls to low-risk ones.",
          "Wrong — every customer still needs baseline CDD; 'ignore the rest' skips legal obligations.",
          "Wrong — skipping risk assessment defeats the entire approach; you cannot be risk-based without assessing risk.",
        ],
      },
      {
        q: "Which factor is NOT typically part of a customer risk score?",
        options: [
          "Customer's country of residence",
          "Product or service being used",
          "Delivery channel (branch vs remote)",
          "Customer's favourite colour or hobby",
        ],
        answer: 3,
        explain: [
          "Wrong — geography is a core risk driver (sanctions exposure, corruption levels, tax havens).",
          "Wrong — product risk (e.g., private banking vs a basic current account) is fundamental to scoring.",
          "Wrong — non-face-to-face channels carry higher impersonation and mule-account risk.",
          "Correct — hobbies and preferences have no bearing on ML/TF risk; scores use objective risk factors only.",
        ],
      },
      {
        q: "Inherent risk vs residual risk: residual risk is",
        options: [
          "The risk before any controls are applied",
          "The risk that remains after controls are applied",
          "The risk of the bank failing entirely",
          "The same as inherent risk — the terms are interchangeable",
        ],
        answer: 1,
        explain: [
          "Wrong — that describes inherent risk, the starting point before controls.",
          "Correct — residual risk = inherent risk minus the mitigating effect of controls (EDD, monitoring, screening).",
          "Wrong — firm failure is operational/credit risk, a different risk taxonomy.",
          "Wrong — the terms are distinct stages: inherent first, then controls reduce it to residual.",
        ],
      },
      {
        q: "Perpetual KYC (pKYC) differs from periodic refresh because it:",
        options: [
          "Only reviews customers once every five years",
          "Updates the file continuously on trigger events rather than fixed calendar cycles",
          "Eliminates the need for any documentation",
          "Applies only to corporate customers",
        ],
        answer: 1,
        explain: [
          "Wrong — pKYC is more frequent and event-driven, not less frequent.",
          "Correct — pKYC refreshes the file when triggers fire (PEP status change, adverse media, unusual activity) instead of waiting for a calendar date.",
          "Wrong — documentation is still required; the trigger mechanism changes, not the evidence standard.",
          "Wrong — pKYC applies to all customer types, retail and corporate alike.",
        ],
      },
      {
        q: "A customer is manually downgraded from high to low risk. The key control is:",
        options: [
          "No control needed — overrides are always allowed",
          "Documented rationale, segregation of duties, approval threshold and audit trail",
          "Just change the score and move on",
          "Tell the customer their risk rating improved",
        ],
        answer: 1,
        explain: [
          "Wrong — manual overrides are exactly what examiners test; they need controls, not permission.",
          "Correct — a defensible downgrade needs written rationale, maker-checker approval, and an audit trail.",
          "Wrong — an undocumented score change is a classic exam finding.",
          "Wrong — customer notification is not a control on the rating itself.",
        ],
      },
    ],
    2: [
      {
        q: "PEP status applies to:",
        options: [
          "Only heads of state",
          "Anyone entrusted with a prominent public function, plus RCAs and often PEP-owned entities",
          "Only foreign politicians",
          "Anyone who has ever held any government job",
        ],
        answer: 1,
        explain: [
          "Wrong — too narrow: senior officials, legislators, judges, SOE executives and their families all count.",
          "Correct — PEP = prominent public function + RCAs; many regimes extend to entities they own or control.",
          "Wrong — domestic PEPs are covered too, not just foreign ones.",
          "Wrong — 'any government job' is overbroad; the function must be prominent (senior policy-making level).",
        ],
      },
      {
        q: "Source of Funds vs Source of Wealth: SoF asks",
        options: [
          "How the customer got rich over their lifetime",
          "Where the specific funds in this transaction came from",
          "What the customer's salary is",
          "Whether the customer has a pension",
        ],
        answer: 1,
        explain: [
          "Wrong — that's source of wealth (lifetime accumulation), not source of funds.",
          "Correct — SoF = origin of the specific money being transacted; SoW = how they accumulated wealth overall.",
          "Wrong — salary could be a source of funds, but the question asks for the definition.",
          "Wrong — pension status is a detail, not the concept being tested.",
        ],
      },
      {
        q: "RCAs (relatives and close associates) matter because:",
        options: [
          "They are always criminals",
          "They can be conduits for the PEP's influence or unexplained wealth",
          "They are exempt from all checks",
          "They only matter for domestic PEPs",
        ],
        answer: 1,
        explain: [
          "Wrong — RCAs aren't presumed guilty; they're risk channels, not convicted criminals.",
          "Correct — family/business associates can move a PEP's illicit proceeds or exert influence on their behalf.",
          "Wrong — the opposite: RCAs typically trigger enhanced scrutiny.",
          "Wrong — foreign PEP RCAs matter most, but domestic PEP associates count too.",
        ],
      },
      {
        q: "Digital ID verification stack typically includes:",
        options: [
          "Just a selfie photo",
          "Document capture, chip verification, liveness detection, facial match and database checks",
          "Only a credit score",
          "A handwritten signature",
        ],
        answer: 1,
        explain: [
          "Wrong — a selfie alone is trivially spoofable; liveness and document checks are needed.",
          "Correct — layered verification: authenticity of the document, chip data, live capture, facial match, sanctions/PEP DB checks.",
          "Wrong — credit score measures creditworthiness, not identity.",
          "Wrong — signatures are easily forged and don't verify the person.",
        ],
      },
      {
        q: "A foreign PEP customer cannot explain their source of wealth. The correct action is:",
        options: [
          "Onboard anyway — PEPs are protected",
          "Apply EDD, document the gap, and consider declining if risk cannot be managed",
          "Ignore the issue — it is not your problem",
          "File a SAR immediately without further checks",
        ],
        answer: 1,
        explain: [
          "Wrong — PEP status increases scrutiny; there's no 'protection' from CDD.",
          "Correct — unexplained wealth + PEP = classic ML indicator. EDD first, decline if unresolvable.",
          "Wrong — unexplained source of wealth for a PEP is precisely your problem.",
          "Wrong — a SAR needs suspicion of ML/TF; inability to explain wealth alone isn't automatic grounds, and checks should come first.",
        ],
      },
    ],
    3: [
      {
        q: "Ultimate beneficial ownership means identifying:",
        options: [
          "The person who signed the account opening form",
          "The natural person who ultimately owns or controls the entity",
          "The company's lawyer",
          "The bank's compliance officer",
        ],
        answer: 1,
        explain: [
          "Wrong — the signer may be an employee, nominee or agent, not the owner.",
          "Correct — UBO = the natural person(s) who ultimately own or control the entity, through direct or indirect stakes.",
          "Wrong — counsel advises the company; they don't own it.",
          "Wrong — the compliance officer is internal to the firm, not the customer.",
        ],
      },
      {
        q: "A common UBO threshold in UK/EU/US regimes is:",
        options: ["5%", "10%", "25%", "50%"],
        answer: 2,
        explain: [
          "5% — too low; would sweep in passive minority investors and create noise.",
          "10% — used in some regimes, but not the common benchmark.",
          "Correct — 25% is the widely used ownership threshold (FATF-aligned regimes).",
          "50% — misses controllers below half ownership; a 30% holder can still control.",
        ],
      },
      {
        q: "Indirect ownership calculation: Person owns 50% of HoldCo A, which owns 60% of OpCo B. Indirect ownership of B =",
        options: ["50%", "30%", "60%", "110%"],
        answer: 1,
        explain: [
          "50% — that's the stake in HoldCo A, not the indirect stake in B.",
          "Correct — multiply the chain: 50% × 60% = 30%.",
          "60% — that's HoldCo's stake in OpCo, not what the person ultimately owns.",
          "110% — impossible; multiplying fractions always gives a smaller number.",
        ],
      },
      {
        q: "Bearer shares are high-risk because:",
        options: [
          "They are always worthless",
          "Ownership is unknowable by design — whoever holds the certificate owns the shares",
          "They are illegal everywhere",
          "They only exist in the US",
        ],
        answer: 1,
        explain: [
          "Wrong — bearer shares can carry real value; the problem is anonymity, not worthlessness.",
          "Correct — no register names the owner, so UBO is impossible to establish — deliberate opacity.",
          "Wrong — legality varies by jurisdiction; the AML risk is the anonymity itself.",
          "Wrong — bearer shares exist in many jurisdictions, not just the US.",
        ],
      },
      {
        q: "When beneficial ownership cannot be established despite reasonable efforts, the firm should:",
        options: [
          "Onboard anyway without documentation",
          "Apply enhanced controls, document the failure, and consider declining",
          "Ignore it — some structures are just complex",
          "Ask the customer to sign a waiver",
        ],
        answer: 1,
        explain: [
          "Wrong — onboarding with no UBO fails the core CDD obligation.",
          "Correct — document the efforts, apply enhanced controls, and decline if risk can't be managed.",
          "Wrong — complexity isn't an exemption from UBO requirements.",
          "Wrong — a customer-signed waiver doesn't satisfy the firm's regulatory duty.",
        ],
      },
    ],
    4: [
      {
        q: "Structuring (smurfing) is:",
        options: [
          "Depositing large sums in one transaction",
          "Breaking large amounts into sub-threshold transactions to evade reporting",
          "Investing in structured products",
          "Paying employees in cash",
        ],
        answer: 1,
        explain: [
          "Wrong — a single large deposit would itself be reportable; the evasion is in splitting it.",
          "Correct — deliberately keeping each transaction below reporting thresholds is structuring/smurfing.",
          "Wrong — 'structured products' is an unrelated finance term; this is deliberate threshold evasion.",
          "Wrong — legitimate payroll isn't evasion; structuring is intentional threshold avoidance.",
        ],
      },
      {
        q: "The most reliable way to detect structuring is:",
        options: [
          "Looking at single transactions only",
          "Aggregating amounts over rolling time windows and checking threshold proximity",
          "Asking the customer directly",
          "Checking credit scores",
        ],
        answer: 1,
        explain: [
          "Wrong — each split transaction looks innocent alone; the pattern only emerges in aggregate.",
          "Correct — sum deposits over days/weeks per customer; totals near or crossing thresholds reveal structuring.",
          "Wrong — customers being structured won't self-report the evasion.",
          "Wrong — credit score has nothing to do with transaction pattern analysis.",
        ],
      },
      {
        q: "Rapid movement of funds (pass-through) is characterised by:",
        options: [
          "Money sitting in accounts for months",
          "Funds arriving and leaving within hours or days with minimal retention",
          "Large one-time deposits with no follow-up",
          "Slow, steady salary payments",
        ],
        answer: 1,
        explain: [
          "Wrong — that's dormant/idle funds, the opposite of pass-through.",
          "Correct — pass-through accounts move money in and out almost immediately; the account is a conduit, not a destination.",
          "Wrong — a lone deposit without movement isn't the velocity pattern being described.",
          "Wrong — steady salary is expected, explainable income — not suspicious velocity.",
        ],
      },
      {
        q: "TBML (trade-based money laundering) primarily uses:",
        options: [
          "Cash deposits at branches",
          "Mispriced invoices, phantom shipments and document fraud in trade finance",
          "Cryptocurrency mixers",
          "Hawala networks",
        ],
        answer: 1,
        explain: [
          "Wrong — cash deposits are placement-stage typology, not trade-based.",
          "Correct — TBML launders value through falsified trade documents: over/under-invoicing, phantom shipments, duplicate bills.",
          "Wrong — mixers are a crypto typology.",
          "Wrong — hawala is informal value transfer, related but distinct from TBML.",
        ],
      },
      {
        q: "A transaction monitoring rule that has never been reviewed in three years is:",
        options: [
          "Perfectly fine — rules don't need changes",
          "A likely examiner finding — tuning must be documented and periodic",
          "Illegal",
          "Automatically approved by regulators",
        ],
        answer: 1,
        explain: [
          "Wrong — rules decay as typologies and customer behaviour change; 'if it ain't broke' isn't a control.",
          "Correct — regulators expect documented periodic tuning; an unreviewed rule is a classic finding.",
          "Wrong — not illegal per se, but a serious control weakness examiners flag.",
          "Wrong — regulators don't pre-approve rules; the firm owns tuning quality.",
        ],
      },
    ],
    5: [
      {
        q: "OSINT in AML investigations primarily uses:",
        options: [
          "Classified government databases",
          "Publicly available information: registries, court records, news, social media",
          "The customer's private browsing history",
          "Hacked databases",
        ],
        answer: 1,
        explain: [
          "Wrong — classified databases aren't open source and usually aren't accessible to analysts.",
          "Correct — OSINT = open-source intelligence: company registries, court filings, news, social media, sanctions lists.",
          "Wrong — private browsing history is neither public nor lawful to use.",
          "Wrong — using hacked data is illegal and inadmissible; investigations must stay lawful.",
        ],
      },
      {
        q: "Adverse media screening's main challenge is:",
        options: [
          "Finding too few results",
          "Separating material risk signals from noise — common names, old news, resolved matters",
          "Paying for the database",
          "Reading in foreign languages",
        ],
        answer: 1,
        explain: [
          "Wrong — usually the problem is too many hits, not too few.",
          "Correct — 'John Smith' hits generate noise; the skill is judging recency, relevance and materiality.",
          "Wrong — cost is an operational issue, not the analytical challenge.",
          "Wrong — translation is solvable; relevance judgement is the real skill.",
        ],
      },
      {
        q: "Counterparty analysis matters because:",
        options: [
          "All counterparties are criminals",
          "The network around an alert often reveals patterns invisible at the individual transaction level",
          "It is required by law in all jurisdictions",
          "It replaces the need for transaction monitoring",
        ],
        answer: 1,
        explain: [
          "Wrong — overbroad; most counterparties are legitimate businesses.",
          "Correct — looking upstream/downstream (who funds whom) exposes mule networks and layering chains.",
          "Wrong — it's a best-practice technique, not a universal legal mandate.",
          "Wrong — it complements transaction monitoring; it doesn't replace it.",
        ],
      },
      {
        q: "A well-written RFI should be:",
        options: [
          "Vague and open-ended",
          "Specific about transactions and information needed, with a clear deadline, without tipping off",
          "A threat to close the account",
          "Sent only by registered mail",
        ],
        answer: 1,
        explain: [
          "Wrong — vague RFIs waste the customer's time and look evasive.",
          "Correct — cite the specific transactions, state what you need and by when, and avoid revealing suspicion.",
          "Wrong — threats damage the relationship and can constitute tipping-off.",
          "Wrong — secure email/portal is fine; format matters less than content and safety.",
        ],
      },
      {
        q: "Case documentation should be:",
        options: [
          "Reconstructed from memory after the fact",
          "Contemporaneous, factual, complete, consistent and preserved",
          "Only the final disposition",
          "Written in legal jargon",
        ],
        answer: 1,
        explain: [
          "Wrong — memory reconstruction isn't reliable evidence and won't survive scrutiny.",
          "Correct — document as you investigate: facts, timestamps, sources, decisions and rationale.",
          "Wrong — the reasoning trail matters as much as the outcome.",
          "Wrong — plain, precise language is what reviewers and FIUs need.",
        ],
      },
    ],
    6: [
      {
        q: "A SAR/STR is required when the firm has:",
        options: [
          "Proof beyond reasonable doubt of money laundering",
          "Knowledge or suspicion of money laundering or terrorist financing",
          "A customer complaint",
          "A routine audit finding",
        ],
        answer: 1,
        explain: [
          "Wrong — the threshold is suspicion, not proof; waiting for certainty means never filing.",
          "Correct — knowledge OR suspicion triggers the duty; you don't need evidence of a crime.",
          "Wrong — complaints aren't SAR triggers unless they evidence ML/TF suspicion.",
          "Wrong — audit findings are internal issues; SARs need ML/TF suspicion.",
        ],
      },
      {
        q: "The US FinCEN SAR deadline is:",
        options: ["7 days", "15 days", "30 days", "90 days"],
        answer: 2,
        explain: [
          "7 days — that's the India STR window (PMLA), not the US.",
          "15 days — not the US deadline; some other regimes use ~5 working days.",
          "Correct — 30 calendar days from initial detection (SAR filing, continuing reports as needed).",
          "90 days — far too long; regulators expect prompt filing.",
        ],
      },
      {
        q: "Tipping-off means:",
        options: [
          "Telling the customer their account is fine",
          "Disclosing to the customer that they are suspected or that a SAR has been filed",
          "Sharing information between compliance staff",
          "Reporting to the wrong FIU",
        ],
        answer: 1,
        explain: [
          "Wrong — reassuring the customer isn't the offence; it's just poor practice if insincere.",
          "Correct — tipping-off = revealing suspicion or a SAR filing to the subject; it's a criminal offence in most regimes.",
          "Wrong — internal sharing within compliance is permitted and necessary.",
          "Wrong — wrong FIU is an error to fix, not tipping-off.",
        ],
      },
      {
        q: "A SAR narrative should:",
        options: [
          "Accuse the customer of crimes",
          "State facts chronologically with exact figures, describing suspicion not guilt",
          "Be as short as possible",
          "Only include the analyst's opinion",
        ],
        answer: 1,
        explain: [
          "Wrong — accusations exceed the suspicion standard and can expose the firm to defamation claims.",
          "Correct — chronological facts, exact amounts/dates, 'appears suspicious because…' — suspicion, not proven guilt.",
          "Wrong — too thin to be actionable; the FIU needs enough detail to investigate.",
          "Wrong — opinion without underlying facts is useless to investigators.",
        ],
      },
      {
        q: "A production order from law enforcement requires the institution to:",
        options: [
          "Produce all customer data immediately",
          "Produce the specific documents ordered, within the deadline, after verifying authenticity and legal basis",
          "Tell the customer about the order",
          "Ignore it — it is not binding",
        ],
        answer: 1,
        explain: [
          "Wrong — scope is limited to what the order specifies; bulk data dumps aren't required.",
          "Correct — verify the order is genuine and legally issued, produce the specified documents by the deadline.",
          "Wrong — tipping-off rules generally prohibit alerting the subject.",
          "Wrong — court/LE orders are legally binding; ignoring them is an offence.",
        ],
      },
    ],
  },
};

export const FINAL_EXAM: Record<string, ModuleQuizQuestion[]> = {
  "kyc-cdd-tm-analyst": [
    {
      q: "Under the risk-based approach, simplified due diligence (SDD) is appropriate when:",
      options: [
        "The customer asks for it politely",
        "The customer, product and jurisdiction are demonstrably low-risk",
        "The onboarding team is busy",
        "The customer has been a client for over a year",
      ],
      answer: 1,
      explain: [
        "Wrong — customer preference doesn't determine the risk rating.",
        "Correct — SDD applies only where risk is demonstrably low across all dimensions.",
        "Wrong — operational convenience is never a basis for reducing CDD.",
        "Wrong — tenure alone doesn't prove low risk; risk is reassessed continuously.",
      ],
    },
    {
      q: "pKYC differs from periodic review because it:",
      options: [
        "Reviews every customer every year",
        "Uses event-driven triggers and continuous risk signals instead of fixed calendar cycles",
        "Eliminates the need for any CDD",
        "Only applies to corporate customers",
      ],
      answer: 1,
      explain: [
        "Wrong — that's periodic review, the model pKYC replaces.",
        "Correct — pKYC refreshes on triggers (PEP change, adverse media, unusual activity) rather than fixed dates.",
        "Wrong — CDD is still required; only the refresh mechanism changes.",
        "Wrong — pKYC applies across customer types.",
      ],
    },
    {
      q: "A foreign PEP customer is onboarding. Which is NOT typically required under EDD?",
      options: [
        "Senior management approval",
        "Source of wealth corroboration",
        "Skipping adverse media screening because PEPs are already known",
        "Enhanced ongoing monitoring",
      ],
      answer: 2,
      explain: [
        "Wrong — senior management approval IS a standard EDD requirement for PEPs.",
        "Wrong — corroborating source of wealth IS required; 'already known' doesn't substitute for evidence.",
        "Correct — skipping adverse media is NOT allowed; PEP status makes media screening more important, not less.",
        "Wrong — enhanced ongoing monitoring IS a core EDD measure.",
      ],
    },
    {
      q: "Person A owns 50% of HoldCo, which owns 60% of Target Co. Person A's indirect stake in Target Co is:",
      options: ["30%", "60%", "45%", "15%"],
      answer: 0,
      explain: [
        "Correct — multiply the ownership chain: 50% × 60% = 30%.",
        "60% — that's HoldCo's stake in Target, not A's indirect stake.",
        "45% — wrong multiplication; indirect ownership compounds through each layer.",
        "15% — wrong calculation.",
      ],
    },
    {
      q: "Which is a TBML red flag in trade finance?",
      options: [
        "Over-invoicing goods to move excess value across borders",
        "A customer paying invoices on time",
        "Using a domestic bank account",
        "Keeping invoices for seven years",
      ],
      answer: 0,
      explain: [
        "Correct — over/under-invoicing transfers value via falsified trade documents — the core TBML technique.",
        "Wrong — paying on time is normal, expected behaviour.",
        "Wrong — domestic accounts aren't inherently suspicious in trade finance.",
        "Wrong — record retention is good practice, not a red flag.",
      ],
    },
    {
      q: "A funnel account is best described as:",
      options: [
        "An account used to collect many small deposits that are then consolidated and moved elsewhere",
        "A dormant account reopened after years",
        "A joint account with two signatories",
        "An account held by a funnel-marketing firm",
      ],
      answer: 0,
      explain: [
        "Correct — funnel accounts aggregate many small deposits (often mule proceeds) then sweep them onward.",
        "Wrong — that's a dormant/reactivated account, a different pattern.",
        "Wrong — joint accounts have multiple authorised signatories; that's not the typology.",
        "Wrong — 'funnel' describes fund flows, not a business type.",
      ],
    },
    {
      q: "When writing an RFI during an investigation, you should NOT:",
      options: [
        "Name the specific transactions being queried",
        "State a clear response deadline",
        "Hint that a suspicious activity report has been filed",
        "Provide a secure response channel",
      ],
      answer: 2,
      explain: [
        "Wrong — naming specific transactions is required for a useful RFI.",
        "Wrong — a deadline is good practice; it keeps the investigation moving.",
        "Correct — hinting at a SAR is tipping-off, which is prohibited.",
        "Wrong — a secure channel protects both the customer and the integrity of the inquiry.",
      ],
    },
    {
      q: "Under PMLA Rule 8 (India), an STR must be filed within:",
      options: [
        "30 days of the transaction",
        "7 days of concluding the transaction is suspicious",
        "15 days of detection",
        "There is no deadline",
      ],
      answer: 1,
      explain: [
        "30 days — that's the US SAR window, not India.",
        "Correct — PMLA Rule 8: 7 days from concluding the transaction is suspicious.",
        "15 days — wrong regime; India's window is tighter.",
        "Wrong — PMLA Rule 8 sets an explicit 7-day deadline.",
      ],
    },
    {
      q: "In the UK DAML regime, if the NCA does not respond within the 7-working-day notice period:",
      options: [
        "Consent is refused",
        "Consent is deemed to have been given",
        "The transaction must be blocked permanently",
        "The firm must refile",
      ],
      answer: 1,
      explain: [
        "Wrong — silence isn't refusal; it's deemed consent.",
        "Correct — under the DAML regime, no NCA response within 7 working days = consent deemed given.",
        "Wrong — the transaction may proceed; it's not blocked.",
        "Wrong — no refile needed; deemed consent is the outcome.",
      ],
    },
    {
      q: "A good SAR narrative should:",
      options: [
        "State facts chronologically with exact figures, describing suspicion rather than proven guilt",
        "Only list the analyst's conclusions",
        "Be as brief as possible regardless of detail",
        "Accuse the customer of specific crimes",
      ],
      answer: 0,
      explain: [
        "Correct — chronological facts + exact figures + 'suspicion' framing gives the FIU what it needs.",
        "Wrong — conclusions without facts can't be investigated or defended.",
        "Wrong — too thin to be actionable; detail matters.",
        "Wrong — accusations exceed the suspicion standard and create legal exposure.",
      ],
    },
  ],
};
