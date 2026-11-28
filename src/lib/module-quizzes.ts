export interface ModuleQuizQuestion {
  q: string;
  options: string[];
  answer: number;
  /** One note per option (same order as `options`): why it is correct or why it is wrong. */
  explain?: string[];
  /** Topic section for categorised scoring (cert mocks). */
  section?: string;
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
  "fraud-prevention": {
    1: [
      {
        q: "The key difference between fraud and error is:",
        options: [
          "Fraud always involves large amounts of money",
          "Fraud requires intentional deception; error is an honest mistake",
          "Error is a crime, fraud is not",
          "They are legally identical terms",
        ],
        answer: 1,
        explain: [
          "Wrong — fraud can involve small amounts; intent, not size, defines it.",
          "Correct — fraud = deliberate deceit for gain; error = unintentional mistake.",
          "Wrong — reversed: fraud is the crime; error is usually not.",
          "Wrong — the distinction drives whether it's a conduct issue or a control failure.",
        ],
      },
      {
        q: "The fraud triangle consists of:",
        options: [
          "Pressure, opportunity, rationalization",
          "Money, motive, means",
          "Detect, deter, prosecute",
          "Prevent, detect, respond",
        ],
        answer: 0,
        explain: [
          "Correct — Cressey's triangle: perceived pressure, perceived opportunity, and the ability to rationalize.",
          "Wrong — that's a different (crime-fiction) framing, not the academic model.",
          "Wrong — that's an enforcement strategy, not the causes of fraud.",
          "Wrong — that's the fraud control lifecycle, not the fraudster's mindset.",
        ],
      },
      {
        q: "How does fraud differ from money laundering?",
        options: [
          "Fraud creates illicit funds through deception; laundering disguises funds that already exist",
          "They are the same offence in all jurisdictions",
          "Laundering is always larger in scale",
          "Fraud only happens inside banks",
        ],
        answer: 0,
        explain: [
          "Correct — fraud generates the illicit proceeds; laundering hides their origin afterwards.",
          "Wrong — distinct offences with different elements and often different agencies.",
          "Wrong — scale varies; the distinction is the source of funds, not size.",
          "Wrong — fraud happens everywhere: payroll, expenses, vendors, customers.",
        ],
      },
    ],
    2: [
      {
        q: "In the three lines model, fraud controls are primarily owned by:",
        options: [
          "Only the audit team",
          "First line (business) with second-line oversight and third-line assurance",
          "Only regulators",
          "Only the fraud team",
        ],
        answer: 1,
        explain: [
          "Wrong — audit assures the controls but doesn't own them day-to-day.",
          "Correct — first line owns and operates controls; second line (fraud/risk) sets standards and monitors; third line audits.",
          "Wrong — regulators supervise the framework; they don't operate controls.",
          "Wrong — a central fraud team can't own controls in every business unit.",
        ],
      },
      {
        q: "A fraud risk assessment primarily aims to:",
        options: [
          "Prosecute known fraudsters",
          "Identify where fraud could occur, how likely and how damaging, to prioritise controls",
          "Replace the need for transaction monitoring",
          "Set employee bonuses",
        ],
        answer: 1,
        explain: [
          "Wrong — prosecution is enforcement's job, not the assessment's.",
          "Correct — map fraud scenarios by inherent risk so controls go where exposure is highest.",
          "Wrong — fraud risk assessment complements detection; it doesn't replace it.",
          "Wrong — compensation is unrelated to risk assessment.",
        ],
      },
      {
        q: "A fraud hotline is best described as:",
        options: [
          "Preventive — it stops fraud before it happens",
          "Detective — it surfaces fraud that may already be occurring",
          "Both equally — it prevents and detects simultaneously",
          "Neither — it's just a communications channel",
        ],
        answer: 1,
        explain: [
          "Wrong — a hotline can't prevent fraud; it reports suspected fraud after the fact.",
          "Correct — hotlines are a detective control: they reveal what prevention missed.",
          "Wrong — controls are classified by when they act; reporting happens after the event.",
          "Wrong — it IS a control (detection plus deterrence through visibility), not just a channel.",
        ],
      },
    ],
    3: [
      {
        q: "APP (authorised push payment) fraud typically involves:",
        options: [
          "A criminal tricking a victim into sending money themselves",
          "Stealing card details to make payments",
          "Embezzling funds from inside a bank",
          "Fake invoices sent to suppliers only",
        ],
        answer: 0,
        explain: [
          "Correct — APP scams manipulate the victim into authorising the payment; no system is 'hacked'.",
          "Wrong — that's card-not-present fraud, a different typology.",
          "Wrong — insider fraud is internal; APP is external deception.",
          "Wrong — BEC is related but APP is broader (any scam inducing authorised payment).",
        ],
      },
      {
        q: "Money mule accounts are dangerous because they:",
        options: [
          "Are always owned by the fraudster",
          "Provide a cut-out layer that obscures the true source and destination of illicit funds",
          "Cannot receive payments",
          "Are automatically closed by banks",
        ],
        answer: 1,
        explain: [
          "Wrong — mules are often deceived or paid individuals, not the fraudster.",
          "Correct — mules break the audit trail: illicit money in, 'clean-looking' money out.",
          "Wrong — mules exist precisely to receive and forward payments.",
          "Wrong — many stay open for months; detection is the challenge.",
        ],
      },
      {
        q: "Business email compromise (BEC) relies primarily on:",
        options: [
          "Hacking the bank's payment system",
          "Deceiving staff into changing payment details or authorising fraudulent transfers via spoofed communication",
          "Counterfeit banknotes",
          "Insider access to the general ledger",
        ],
        answer: 1,
        explain: [
          "Wrong — BEC doesn't breach systems; it deceives people.",
          "Correct — spoofed CEO/vendor emails convince finance staff to redirect legitimate payments.",
          "Wrong — physical counterfeits are a different crime entirely.",
          "Wrong — classic BEC is external spoofing, not ledger access.",
        ],
      },
    ],
    4: [
      {
        q: "Under the ACFE classification, the three main categories of occupational fraud are:",
        options: [
          "Theft, bribery, cybercrime",
          "Asset misappropriation, corruption, financial statement fraud",
          "Payroll, expense, vendor fraud",
          "Internal, external, third-party fraud",
        ],
        answer: 1,
        explain: [
          "Wrong — those mix categories and typologies rather than the standard taxonomy.",
          "Correct — ACFE's trichotomy: stealing assets, abusing power for gain, and cooking the books.",
          "Wrong — those are schemes within asset misappropriation, not the top-level categories.",
          "Wrong — internal/external/third-party is a perpetrator classification, not ACFE's.",
        ],
      },
      {
        q: "Expense fraud is an example of:",
        options: [
          "Financial statement fraud",
          "Asset misappropriation",
          "Corruption",
          "External fraud",
        ],
        answer: 1,
        explain: [
          "Wrong — misstating financial statements is a different (and usually larger) category.",
          "Correct — expense fraud steals company assets via inflated claims — classic asset misappropriation.",
          "Wrong — corruption involves abusing power/position for personal gain (bribes, kickbacks).",
          "Wrong — occupational fraud is internal by definition.",
        ],
      },
      {
        q: "Third-party fraud risk matters because:",
        options: [
          "Vendors are always dishonest",
          "Your organisation can be harmed through the fraud or weak controls of partners, suppliers and outsourcers",
          "It only matters for regulated banks",
          "It replaces the need for internal controls",
        ],
        answer: 1,
        explain: [
          "Wrong — overbroad; the point is dependency risk, not assuming bad faith.",
          "Correct — you inherit counterparties' control failures; due diligence extends to them.",
          "Wrong — any organisation using third parties faces this risk.",
          "Wrong — third-party risk adds to, not replaces, your own control environment.",
        ],
      },
    ],
    5: [
      {
        q: "Fraud detection rules and scorecards primarily work by:",
        options: [
          "Prosecuting suspects automatically",
          "Flagging transactions or behaviours that match known fraud patterns for review",
          "Deleting suspicious records",
          "Approving all low-value payments",
        ],
        answer: 1,
        explain: [
          "Wrong — rules generate alerts; humans investigate. No automatic prosecution.",
          "Correct — rules/scorecards encode fraud patterns (velocity, anomalies) to surface cases for review.",
          "Wrong — detection never deletes evidence; it routes it for investigation.",
          "Wrong — blanket approval of low-value payments is a control gap, not detection.",
        ],
      },
      {
        q: "A high false-positive rate in fraud alerts means:",
        options: [
          "The system is working perfectly",
          "Analysts waste time on legitimate activity and may miss real fraud — the rules need tuning",
          "Fraud has been eliminated",
          "The rules should simply be loosened",
        ],
        answer: 1,
        explain: [
          "Wrong — high FP rate is a tuning problem, not success.",
          "Correct — alert fatigue hides real fraud; precision must improve via tuning and better features.",
          "Wrong — high FPs mean you're drowning in noise, not that fraud stopped.",
          "Wrong — loosening rules increases false negatives (missed fraud); tune intelligently.",
        ],
      },
      {
        q: "Behavioural analytics in fraud detection adds value by:",
        options: [
          "Replacing the need for rules entirely",
          "Establishing baselines of normal behaviour so deviations stand out",
          "Only working for large banks",
          "Removing the need for human review",
        ],
        answer: 1,
        explain: [
          "Wrong — analytics complements rules; it doesn't eliminate them.",
          "Correct — models learn 'normal' per user/device; anomalies like impossible travel get scored.",
          "Wrong — techniques scale to any dataset with enough transactions.",
          "Wrong — analytics prioritises alerts; humans still investigate and decide.",
        ],
      },
    ],
    6: [
      {
        q: "The first priority when a fraud case is confirmed is:",
        options: [
          "Publicly announcing the fraudster",
          "Containing the loss — stopping further payments, securing accounts and preserving evidence",
          "Waiting for the annual audit",
          "Firing the responsible employee immediately",
        ],
        answer: 1,
        explain: [
          "Wrong — publicity can tip off accomplices and destroy evidence.",
          "Correct — contain first (freeze, recall, secure), then investigate, then remediate.",
          "Wrong — fraud response can't wait for audit cycles.",
          "Wrong — employment action comes after facts are established.",
        ],
      },
      {
        q: "Preserving evidence in a fraud investigation matters because:",
        options: [
          "It's only needed for media coverage",
          "Logs, communications and transaction records are needed for internal action, law enforcement and civil recovery",
          "Courts never require it",
          "It slows down the investigation",
        ],
        answer: 1,
        explain: [
          "Wrong — evidence serves legal and recovery purposes, not publicity.",
          "Correct — chain of custody and intact logs underpin SARs, police referrals and insurance claims.",
          "Wrong — courts and FIUs routinely require documented evidence.",
          "Wrong — done right, preservation runs parallel to containment.",
        ],
      },
      {
        q: "Under the UK PSR APP fraud rules, reimbursement is generally:",
        options: [
          "Never required — the victim bears all loss",
          "Required up to a cap, split between sending and receiving firms, with a gross-negligence exemption",
          "Paid only by the government",
          "Automatic for any amount with no assessment",
        ],
        answer: 1,
        explain: [
          "Wrong — mandatory reimbursement applies (capped at £85k).",
          "Correct — PSR rules: send/receive split, cap, and gross-negligence exemption for the victim.",
          "Wrong — it's industry-funded via the payment firms, not the state.",
          "Wrong — claims are assessed; the negligence exemption exists to filter claims.",
        ],
      },
    ],
    7: [
      {
        q: "Corporate liability for fraud means:",
        options: [
          "Only individuals can ever be prosecuted",
          "The organisation itself can be fined or prosecuted for failing to prevent fraud by its staff or associated persons",
          "Companies are immune from fraud laws",
          "Liability only applies to banks",
        ],
        answer: 1,
        explain: [
          "Wrong — both individuals AND the entity can be liable.",
          "Correct — failure-to-prevent offences make firms criminally liable for associated persons' fraud.",
          "Wrong — the opposite; corporate criminal liability is a real and growing exposure.",
          "Wrong — any organisation can face corporate liability, not just banks.",
        ],
      },
      {
        q: "RegTech and AI in fraud prevention mainly help by:",
        options: [
          "Eliminating the need for staff",
          "Automating detection at scale, reducing false positives and spotting patterns humans can't",
          "Guaranteeing zero fraud",
          "Replacing regulators",
        ],
        answer: 1,
        explain: [
          "Wrong — technology augments analysts; it doesn't replace judgement or staff.",
          "Correct — ML scores millions of transactions and prioritises the riskiest for humans.",
          "Wrong — no system guarantees zero fraud; fraud adapts.",
          "Wrong — RegTech supports compliance; regulators still set the rules.",
        ],
      },
      {
        q: "Published 'fraud loss' figures typically measure:",
        options: [
          "Only proven convictions",
          "Confirmed and suspected fraud losses across reporting channels — an estimate, not a complete count",
          "Only internal fraud",
          "Exact audited figures for every firm",
        ],
        answer: 1,
        explain: [
          "Wrong — most fraud is never prosecuted; reported losses are far broader.",
          "Correct — figures aggregate reported/confirmed losses and are acknowledged undercounts.",
          "Wrong — figures cover external AND internal fraud.",
          "Wrong — they're estimates from surveys and reports, not audited exacts.",
        ],
      },
    ],
  },
  "sanctions-screening": {
    1: [
      {
        q: "Sanctions differ from embargoes primarily because sanctions:",
        options: [
          "Only apply to weapons",
          "Are targeted measures (asset freezes, travel bans) imposed for foreign-policy or security goals, often on specific persons/entities",
          "Are always total trade bans",
          "Only exist in the UN",
        ],
        answer: 1,
        explain: [
          "Wrong — sanctions cover financial, trade and travel measures, not just arms.",
          "Correct — modern sanctions are targeted (smart sanctions) at designated persons/entities for policy goals.",
          "Wrong — comprehensive embargoes exist but are the older, blunter tool.",
          "Wrong — many sanctions are imposed unilaterally (OFAC, OFSI, EU).",
        ],
      },
      {
        q: "The primary purpose of financial sanctions is to:",
        options: [
          "Raise government revenue",
          "Deny designated persons access to the international financial system and apply economic/political pressure",
          "Reward compliant banks",
          "Replace criminal prosecution",
        ],
        answer: 1,
        explain: [
          "Wrong — sanctions aren't a revenue tool.",
          "Correct — freezing assets and banning transactions pressures targets and cuts off their finances.",
          "Wrong — compliance is a legal obligation, not a reward scheme.",
          "Wrong — sanctions are preventive restrictions; prosecution is a separate track.",
        ],
      },
      {
        q: "A 'smart sanction' refers to:",
        options: [
          "A sanction imposed by artificial intelligence",
          "Targeted measures on specific individuals/entities rather than a whole country's economy",
          "A sanction that expires automatically",
          "Sanctions on technology companies only",
        ],
        answer: 1,
        explain: [
          "Wrong — 'smart' refers to precision targeting, not AI.",
          "Correct — post-1990s sanctions target designated persons/lists to avoid harming civilians.",
          "Wrong — expiry is a separate design choice, not what 'smart' means.",
          "Wrong — sectoral sanctions exist, but 'smart' = targeted vs comprehensive.",
        ],
      },
    ],
    2: [
      {
        q: "Which is NOT a major sanctions-imposing body?",
        options: [
          "The UN Security Council",
          "US OFAC and State Department",
          "The Basel Committee",
          "EU Council and HM Treasury/OFSI",
        ],
        answer: 2,
        explain: [
          "Wrong — UNSC resolutions are binding international sanctions.",
          "Wrong — OFAC administers US sanctions programmes.",
          "Correct — the Basel Committee sets banking standards (capital, risk); it doesn't impose sanctions.",
          "Wrong — EU and UK (OFSI) are major unilateral sanctions authorities.",
        ],
      },
      {
        q: "UN Security Council sanctions are binding on member states because:",
        options: [
          "They are voluntary guidelines",
          "UN Charter Chapter VII powers make them binding international law for member states",
          "Banks choose to follow them",
          "They only apply to UN staff",
        ],
        answer: 1,
        explain: [
          "Wrong — they're legally binding, not voluntary.",
          "Correct — Chapter VII resolutions obligate all member states to implement them domestically.",
          "Wrong — implementation is a legal duty, not a choice.",
          "Wrong — they apply to all persons/entities in member states.",
        ],
      },
      {
        q: "OFAC vs OFSI: the key distinction is:",
        options: [
          "OFAC is US; OFSI is UK",
          "They are the same office with two names",
          "OFSI only handles criminal cases",
          "OFAC only covers the EU",
        ],
        answer: 0,
        explain: [
          "Correct — OFAC = US Treasury's sanctions office; OFSI = UK HM Treasury's Office of Financial Sanctions Implementation.",
          "Wrong — different jurisdictions, different lists, different penalties.",
          "Wrong — OFSI handles UK civil sanctions enforcement broadly.",
          "Wrong — OFAC is US; the EU has its own regimes.",
        ],
      },
    ],
    3: [
      {
        q: "Asset freeze sanctions require institutions to:",
        options: [
          "Report the asset and leave it untouched",
          "Block dealings with the designated person's funds/property and report to the authority",
          "Confiscate the assets permanently for the government",
          "Ask the customer for permission first",
        ],
        answer: 1,
        explain: [
          "Wrong — freezing means prohibiting transactions, not just noting them.",
          "Correct — freeze = stop all dealings, hold the funds, report to OFAC/OFSI/FIU as required.",
          "Wrong — confiscation/forfeiture is a court process; freezing is a holding restriction.",
          "Wrong — customer consent is irrelevant; the obligation is statutory.",
        ],
      },
      {
        q: "A travel ban sanctions measure restricts:",
        options: [
          "Only air travel",
          "The designated person's movement across borders",
          "Only business travel",
          "Nothing — it's symbolic only",
        ],
        answer: 1,
        explain: [
          "Wrong — it covers all border crossings, not just flights.",
          "Correct — travel bans prevent designated persons from travelling internationally.",
          "Wrong — it applies to all purposes of travel.",
          "Wrong — it's enforced via border controls and INTERPOL notices; not merely symbolic.",
        ],
      },
      {
        q: "Sectoral sanctions differ from list-based sanctions because they:",
        options: [
          "Target entire sectors (e.g., energy, defence) of a country's economy rather than named individuals",
          "Only apply to individuals",
          "Never involve financial measures",
          "Are always temporary",
        ],
        answer: 0,
        explain: [
          "Correct — sectoral sanctions hit industries/sectors (e.g., Russian energy debt restrictions) without naming persons.",
          "Wrong — that's list-based (SDN) sanctions, the opposite.",
          "Wrong — sectoral sanctions are often financial (debt/equity restrictions).",
          "Wrong — duration varies by programme.",
        ],
      },
    ],
    4: [
      {
        q: "Under the '50 percent rule', an entity is sanctioned if:",
        options: [
          "It owns 50% of a sanctioned entity",
          "It is owned 50% or more (individually or in aggregate) by one or more sanctioned persons",
          "Its revenue is 50% from sanctioned trade",
          "It has 50 employees",
        ],
        answer: 1,
        explain: [
          "Wrong — direction matters: ownership OF the sanctioned party vs BY sanctioned parties.",
          "Correct — OFAC's 50% rule: ≥50% owned by sanctioned person(s) → the entity is itself sanctioned, even if unlisted.",
          "Wrong — revenue share isn't the test; ownership/control is.",
          "Wrong — headcount is irrelevant.",
        ],
      },
      {
        q: "Aggregating ownership under the 50 percent rule means:",
        options: [
          "Only the largest single shareholder counts",
          "Multiple sanctioned shareholders' stakes are combined when testing the 50% threshold",
          "Only direct ownership counts",
          "Indirect ownership is ignored",
        ],
        answer: 1,
        explain: [
          "Wrong — OFAC aggregates stakes of sanctioned owners.",
          "Correct — e.g., two SDNs owning 30% + 25% = 55% → entity is sanctioned.",
          "Wrong — both direct and indirect ownership count.",
          "Wrong — indirect (through intermediaries) ownership is explicitly included.",
        ],
      },
      {
        q: "A company 40% owned by a sanctioned person and 30% by a different sanctioned person is:",
        options: [
          "Not sanctioned — neither reaches 50% alone",
          "Sanctioned — combined 70% exceeds the threshold",
          "Sanctioned — any sanctioned shareholder triggers it",
          "Exempt because ownership is split",
        ],
        answer: 1,
        explain: [
          "Wrong — the rule aggregates multiple sanctioned owners, not just single ones.",
          "Correct — 40% + 30% = 70% ≥ 50% → the entity is blocked even though unlisted.",
          "Wrong — aggregation requires the 50% threshold; a single small holder alone wouldn't do it.",
          "Wrong — splitting ownership is exactly what the aggregation rule defeats.",
        ],
      },
    ],
    5: [
      {
        q: "Sanctions screening matches customer names against:",
        options: [
          "Only the firm's internal do-not-deal list",
          "Consolidated sanctions lists (UN, OFAC SDN, EU, OFSI) plus PEP and adverse-media data",
          "Only credit reference databases",
          "Only company registries",
        ],
        answer: 1,
        explain: [
          "Wrong — internal lists are additional; statutory screening covers government lists.",
          "Correct — screening spans UN/OFAC/EU/OFSI sanctions plus PEP and adverse-media sources.",
          "Wrong — credit data doesn't identify sanctioned persons.",
          "Wrong — registries show existence, not sanctions status.",
        ],
      },
      {
        q: "Fuzzy matching in sanctions screening exists to handle:",
        options: [
          "Perfect name matches only",
          "Name variations, transliterations, aliases and partial matches that exact matching would miss",
          "Only numeric identifiers",
          "Only email addresses",
        ],
        answer: 1,
        explain: [
          "Wrong — exact matching misses variants; fuzzy matching is the point.",
          "Correct — 'Mohammed Al-Rashid' vs 'Muhammad Al-Rasheed' needs fuzzy/algorithmic matching.",
          "Wrong — identifiers help but names remain the primary matching challenge.",
          "Wrong — screening keys on names and identifiers, not just emails.",
        ],
      },
      {
        q: "A high false-positive rate in sanctions screening is dangerous because:",
        options: [
          "It means the system is working well",
          "Analysts may miss a true match among the noise — alert fatigue is a compliance risk",
          "It makes screening cheaper",
          "Regulators prefer it",
        ],
        answer: 1,
        explain: [
          "Wrong — high FPs degrade quality; they don't indicate success.",
          "Correct — if analysts can't keep up, real sanctioned hits get buried — a strict-liability breach.",
          "Wrong — cost isn't the issue; miss risk is.",
          "Wrong — regulators penalise misses, not high FP rates (though both matter).",
        ],
      },
    ],
    6: [
      {
        q: "When a sanctions match is confirmed, the analyst should:",
        options: [
          "Close the account and inform the customer",
          "Freeze the account, reject the transaction, file the required report and NOT tip off the customer",
          "Process the transaction quickly",
          "Wait for the customer to explain themselves first",
        ],
        answer: 1,
        explain: [
          "Wrong — telling the customer risks tipping-off and premature closure loses evidence.",
          "Correct — freeze, reject, report to the authority (OFSI/OFAC), maintain confidentiality.",
          "Wrong — processing a sanctioned transaction is a strict-liability breach.",
          "Wrong — statutory duty acts immediately; customer explanation comes later via the authority.",
        ],
      },
      {
        q: "A 'true match' vs 'false positive' in screening is determined by:",
        options: [
          "Whether the names look similar",
          "Whether the identifiers (DOB, nationality, address, ID numbers) confirm it's the same person/entity",
          "Whether the customer is wealthy",
          "Whether the match came on a weekday",
        ],
        answer: 1,
        explain: [
          "Wrong — name similarity triggers the alert; identifiers resolve it.",
          "Correct — true match = same identity confirmed by corroborating data; false positive = different person.",
          "Wrong — wealth is irrelevant to identity matching.",
          "Wrong — timing has nothing to do with match validity.",
        ],
      },
      {
        q: "Documentation of a sanctions screening decision should include:",
        options: [
          "Only the final outcome",
          "The match details, identifiers checked, reasoning for true/false determination, and any reports filed",
          "Nothing — decisions are verbal",
          "Only the customer's name",
        ],
        answer: 1,
        explain: [
          "Wrong — the reasoning trail is what examiners and authorities review.",
          "Correct — full audit trail: what matched, what was checked, why it was dismissed or confirmed, what was reported.",
          "Wrong — undocumented decisions are indefensible.",
          "Wrong — far too thin to evidence a compliant decision.",
        ],
      },
    ],
    7: [
      {
        q: "Maritime sanctions screening is needed because:",
        options: [
          "Ships can't commit crimes",
          "Vessels owned/controlled by sanctioned persons or used for sanctioned trade (e.g., oil, weapons) are a sanctions-evasion channel",
          "Ports don't check documents",
          "Only cruise ships matter",
        ],
        answer: 1,
        explain: [
          "Wrong — vessels are used for sanctions evasion (dark fleet, ship-to-ship transfers).",
          "Correct — sanctioned states/entities move oil/weapons by ship; ownership, flag, AIS gaps are red flags.",
          "Wrong — port state control exists; the gap is verifying beneficial ownership and trade.",
          "Wrong — cargo/tanker vessels are the primary concern, not cruises.",
        ],
      },
      {
        q: "A 'dark fleet' or gap in AIS data for a vessel suggests:",
        options: [
          "Normal navigation",
          "Possible sanctions evasion — deliberately disabling tracking to hide voyages to sanctioned ports",
          "Better fuel efficiency",
          "A technical upgrade",
        ],
        answer: 1,
        explain: [
          "Wrong — AIS gaps are abnormal and warrant investigation.",
          "Correct — vessels going dark near sanctioned ports is a classic evasion indicator.",
          "Wrong — fuel efficiency doesn't require disabling tracking.",
          "Wrong — upgrades improve systems, not hide them.",
        ],
      },
      {
        q: "Ship-to-ship transfers are a sanctions risk because they:",
        options: [
          "Are always illegal",
          "Can obscure the origin/destination of cargo — moving sanctioned oil between vessels to hide its source",
          "Only happen in rivers",
          "Are required by maritime law",
        ],
        answer: 1,
        explain: [
          "Wrong — STS transfers are legal; the risk is their use to launder cargo origin.",
          "Correct — transferring cargo mid-ocean breaks the paper trail linking oil to sanctioned producers.",
          "Wrong — they happen worldwide at sea.",
          "Wrong — they're permitted practices; misuse is the issue.",
        ],
      },
    ],
  },
  "counter-terrorist-financing": {
    1: [
      {
        q: "Terrorist financing differs from money laundering in that it:",
        options: [
          "Only involves large sums",
          "Provides funds for terrorist acts or organisations — the source can be legitimate or illicit",
          "Always requires a prior crime",
          "Is the same thing with a different name",
        ],
        answer: 1,
        explain: [
          "Wrong — TF can involve small amounts; intent matters more than size.",
          "Correct — TF = funding terrorist purposes; the money may be clean or dirty.",
          "Wrong — legitimate income (charity, business) can be diverted to terrorism.",
          "Wrong — related but legally distinct offences.",
        ],
      },
      {
        q: "The 'three stages' model of terrorist financing typically refers to:",
        options: [
          "Placement, layering, integration",
          "Raising, moving, and using the funds",
          "Planning, executing, covering up",
          "Recruitment, training, deployment",
        ],
        answer: 1,
        explain: [
          "Wrong — that's the money laundering stages, not TF.",
          "Correct — TF framework: raise funds → move them covertly → use them for attacks/org support.",
          "Wrong — that's a generic crime lifecycle, not the financing model.",
          "Wrong — that's operational terrorism, not the finance chain.",
        ],
      },
      {
        q: "A key difference between ML and TF investigation is that TF:",
        options: [
          "Only matters for banks",
          "Often involves small amounts, legitimate sources and urgent time pressure to prevent attacks",
          "Never involves cross-border movement",
          "Is always handled by tax authorities",
        ],
        answer: 1,
        explain: [
          "Wrong — TF concerns all financial institutions and payment channels.",
          "Correct — small sums, 'clean' money (charity, trade) and speed make TF detection harder than ML.",
          "Wrong — TF routinely crosses borders.",
          "Wrong — FIUs and security agencies handle it, not tax authorities.",
        ],
      },
    ],
    2: [
      {
        q: "UNSCR 1373 (2001) primarily requires member states to:",
        options: [
          "Only monitor domestic banks",
          "Criminalise terrorist financing, freeze terrorist assets and cooperate internationally",
          "Ban all international trade",
          "Create a global police force",
        ],
        answer: 1,
        explain: [
          "Wrong — it mandates comprehensive legal measures, not just monitoring.",
          "Correct — post-9/11 resolution: criminalise TF, freeze assets of listed terrorists, share intelligence.",
          "Wrong — it targets terrorism financing, not trade.",
          "Wrong — it strengthens cooperation but doesn't create a supranational force.",
        ],
      },
      {
        q: "The FATF is best described as:",
        options: [
          "A UN enforcement agency",
          "An intergovernmental body that sets AML/CFT standards and monitors compliance through mutual evaluations",
          "A private bank consortium",
          "A sanctions list",
        ],
        answer: 1,
        explain: [
          "Wrong — FATF is independent of the UN; it sets standards, not enforcement.",
          "Correct — FATF issues the 40 Recommendations and peer-reviews countries' regimes.",
          "Wrong — it's governmental, not a bank consortium.",
          "Wrong — it's a standard-setter; lists are maintained by UN/OFAC etc.",
        ],
      },
      {
        q: "A FATF 'grey list' designation means:",
        options: [
          "The country is sanctioned",
          "The country has strategic deficiencies in its AML/CFT regime and is under increased monitoring",
          "The country has no financial system",
          "The country is banned from the UN",
        ],
        answer: 1,
        explain: [
          "Wrong — grey listing isn't sanctions; it's enhanced monitoring.",
          "Correct — grey list = strategic deficiencies, increased scrutiny, pressure to reform.",
          "Wrong — these are usually significant financial centres.",
          "Wrong — unrelated to UN membership.",
        ],
      },
    ],
    3: [
      {
        q: "Hawala is a terrorist financing risk because it:",
        options: [
          "It's a digital cryptocurrency",
          "It's an informal value-transfer system that moves money without physical fund transfers, leaving little paper trail",
          "It only works inside banks",
          "It's always illegal everywhere",
        ],
        answer: 1,
        explain: [
          "Wrong — hawala is a traditional informal network, not crypto.",
          "Correct — hawala transfers value via trust/broker networks with minimal documentation — ideal for TF.",
          "Wrong — it's precisely non-bank.",
          "Wrong — legality varies; it's often tolerated culturally but abused by terrorists.",
        ],
      },
      {
        q: "Charities and NGOs are vulnerable to terrorist financing because:",
        options: [
          "They are always criminal",
          "They handle cash, operate in conflict zones and can be infiltrated or diverted by terrorist groups",
          "They can't receive donations",
          "Only large NGOs are at risk",
        ],
        answer: 1,
        explain: [
          "Wrong — most are legitimate; vulnerability ≠ guilt.",
          "Correct — cash-heavy operations in high-risk areas + weak oversight = diversion risk.",
          "Wrong — donations are their core function.",
          "Wrong — small/local NGOs are often less monitored and equally vulnerable.",
        ],
      },
      {
        q: "Smurfing in the context of terrorist financing refers to:",
        options: [
          "A type of fish",
          "Breaking large amounts into smaller transactions to avoid detection thresholds",
          "Recruiting multiple operatives",
          "Using multiple bank accounts legitimately",
        ],
        answer: 1,
        explain: [
          "Wrong — 'smurfing' is financial structuring, not literal smurfs.",
          "Correct — structuring transfers to stay under reporting thresholds applies to TF too.",
          "Wrong — that's operational planning, not financing.",
          "Wrong — legitimate multi-account use isn't smurfing; evasion intent is key.",
        ],
      },
    ],
    4: [
      {
        q: "The main challenge in detecting terrorist financing vs money laundering is:",
        options: [
          "TF involves larger amounts",
          "TF often uses small amounts, legitimate sources and requires rapid response before attacks occur",
          "TF never crosses borders",
          "TF is easier to detect",
        ],
        answer: 1,
        explain: [
          "Wrong — TF typically involves smaller sums than ML.",
          "Correct — small amounts + 'clean' money + urgency = harder detection and less tolerance for delay.",
          "Wrong — TF is inherently cross-border.",
          "Wrong — it's generally harder, which is why it's a distinct discipline.",
        ],
      },
      {
        q: "Suspicious transaction reporting for TF differs from ML because:",
        options: [
          "No reporting is required",
          "There's often a lower threshold and urgency — reports may need to go to security agencies as well as FIUs",
          "Only banks can report",
          "Reports are optional",
        ],
        answer: 1,
        explain: [
          "Wrong — STR/SAR obligations apply to TF suspicion too.",
          "Correct — TF suspicions may trigger faster reporting and sharing with security/intelligence agencies.",
          "Wrong — all reporting entities have obligations.",
          "Wrong — reporting is mandatory, not optional.",
        ],
      },
      {
        q: "List-based screening for terrorist financing checks names against:",
        options: [
          "Only bank blacklists",
          "UN sanctions lists (ISIL/Al-Qaida), national terrorist lists and PEP data",
          "Only credit scores",
          "Only company registries",
        ],
        answer: 1,
        explain: [
          "Wrong — statutory screening uses official terrorist/sanctions lists.",
          "Correct — UNSC ISIL/Al-Qaida list, national designations (e.g., UK's proscribed organisations), plus PEP.",
          "Wrong — credit data doesn't identify terrorists.",
          "Wrong — registries show existence, not terrorist status.",
        ],
      },
    ],
    5: [
      {
        q: "When a terrorist financing suspicion is confirmed, the response should prioritise:",
        options: [
          "Slow, thorough documentation over speed",
          "Rapid freezing of assets and information sharing to prevent imminent attacks",
          "Waiting for the quarterly report",
          "Contacting the customer for comment first",
        ],
        answer: 1,
        explain: [
          "Wrong — speed matters; attacks don't wait for paperwork.",
          "Correct — TF response is time-critical: freeze fast, share intelligence, prevent harm.",
          "Wrong — can't wait for routine cycles when lives are at risk.",
          "Wrong — notification could tip off and endanger lives; authorities act first.",
        ],
      },
      {
        q: "Asset freezing for terrorist financing requires:",
        options: [
          "Court approval in every case first",
          "Immediate blocking of funds/property of listed terrorists or entities, with prompt reporting",
          "Customer consent",
          "Waiting 30 days",
        ],
        answer: 1,
        explain: [
          "Wrong — listing creates automatic freezing obligations; court orders aren't always needed first.",
          "Correct — designated persons' assets must be frozen immediately and reported.",
          "Wrong — statutory duty overrides consent.",
          "Wrong — delays can enable attacks; freezing is immediate.",
        ],
      },
      {
        q: "International cooperation in CTF is essential because:",
        options: [
          "Terrorists only operate domestically",
          "TF networks span borders — funds, operatives and attacks cross jurisdictions requiring intelligence sharing",
          "Each country handles its own terrorism only",
          "The UN does all the work",
        ],
        answer: 1,
        explain: [
          "Wrong — terrorist networks are inherently international.",
          "Correct — money, people and attacks cross borders; FIUs and security agencies must share rapidly.",
          "Wrong — that's the problem; unilateral approaches fail against transnational networks.",
          "Wrong — the UN sets frameworks; member states do the enforcement.",
        ],
      },
    ],
  },
  "financial-intelligence-trafficking": {
    1: [
      {
        q: "Human trafficking generates illicit revenue primarily through:",
        options: [
          "Drug sales only",
          "Exploitation of victims — forced labour, sexual exploitation, organ trafficking and related crimes",
          "Legitimate business profits",
          "Government grants",
        ],
        answer: 1,
        explain: [
          "Wrong — drugs are a separate crime; trafficking's revenue comes from exploiting people.",
          "Correct — trafficking profits come from exploiting victims: labour, sexual services, organs, begging.",
          "Wrong — legitimate profits aren't trafficking revenue.",
          "Wrong — government grants fund NGOs, not criminal networks.",
        ],
      },
      {
        q: "The financial flows of trafficking networks typically involve:",
        options: [
          "Only cash transactions",
          "A mix of cash, informal value transfer (hawala), front companies and digital payments to move proceeds",
          "Only bank transfers",
          "No financial activity at all",
        ],
        answer: 1,
        explain: [
          "Wrong — cash is common but not exclusive; networks diversify channels.",
          "Correct — trafficking finances move via cash, hawala, shell companies and increasingly digital rails.",
          "Wrong — informal systems and cash are heavily used alongside banks.",
          "Wrong — trafficking is a profit-driven crime; it has extensive financial flows.",
        ],
      },
      {
        q: "A key challenge in tracing trafficking proceeds is:",
        options: [
          "The amounts are always huge",
          "Proceeds are often commingled with legitimate business revenue and moved through front companies",
          "Trafficking has no financial element",
          "Banks don't process any transactions",
        ],
        answer: 1,
        explain: [
          "Wrong — amounts vary; the issue is obscuring origin, not size.",
          "Correct — front companies (massage parlours, agriculture, hospitality) launder exploitation revenue as 'business income'.",
          "Wrong — trafficking is fundamentally financial; exploitation is monetised.",
          "Wrong — banks process transactions; the challenge is detecting illicit commingling.",
        ],
      },
    ],
    2: [
      {
        q: "Common financial red flags for human trafficking include:",
        options: [
          "Large, consistent salary payments",
          "Multiple individuals sharing one bank account, third-party control of accounts, and cash-intensive small businesses",
          "Only cryptocurrency transactions",
          "No unusual activity",
        ],
        answer: 1,
        explain: [
          "Wrong — regular salaries are normal; trafficking victims often lack controlled finances.",
          "Correct — shared/controlled accounts, victims' wages going to handlers, and cash-heavy fronts are key indicators.",
          "Wrong — crypto is emerging but not the primary flag.",
          "Wrong — there ARE red flags; they're just often subtle.",
        ],
      },
      {
        q: "Third-party control of a trafficking victim's bank account is a red flag because it:",
        options: [
          "Is required by law",
          "Suggests the victim isn't in control of their earnings — a hallmark of exploitation",
          "Is standard banking practice",
          "Only happens with minors",
        ],
        answer: 1,
        explain: [
          "Wrong — no law requires handler control of victim accounts.",
          "Correct — when a 'boyfriend', 'employer' or family member controls the account, it signals exploitation.",
          "Wrong — account holders normally control their own accounts.",
          "Wrong — adults are trafficked too; control is the indicator, not age.",
        ],
      },
      {
        q: "Cash-intensive front businesses are suspicious in trafficking because they:",
        options: [
          "Are always illegal",
          "Can commingle exploitation proceeds with legitimate takings, making illicit revenue hard to isolate",
          "Don't need bank accounts",
          "Only exist in poor countries",
        ],
        answer: 1,
        explain: [
          "Wrong — cash businesses are legal; the issue is commingling.",
          "Correct — massage parlours, restaurants, farms generate cash that obscures which portion is illicit.",
          "Wrong — they still bank deposits; the challenge is untangling the mix.",
          "Wrong — they exist globally wherever trafficking operates.",
        ],
      },
    ],
    3: [
      {
        q: "Financial institutions' obligations for trafficking cases typically require:",
        options: [
          "Ignoring suspicious activity",
          "Reporting suspicious transactions to FIUs and cooperating with law enforcement investigations",
          "Only closing accounts",
          "Publicly naming suspects",
        ],
        answer: 1,
        explain: [
          "Wrong — ignoring SAR obligations is a compliance breach.",
          "Correct — report suspicious activity via STR/SAR and assist LE with production orders.",
          "Wrong — account closure may be part of response but reporting is the core duty.",
          "Wrong — naming suspects publicly could compromise investigations and victims.",
        ],
      },
      {
        q: "International cooperation is critical in trafficking cases because:",
        options: [
          "Trafficking is purely domestic",
          "Victims, traffickers and proceeds cross borders — requiring joint investigations and asset recovery across jurisdictions",
          "The UN handles everything",
          "Banks can't share information",
        ],
        answer: 1,
        explain: [
          "Wrong — trafficking is inherently transnational.",
          "Correct — victims move across borders, proceeds launder internationally, requiring FIU-to-FIU and police cooperation.",
          "Wrong — the UN sets frameworks; national agencies enforce.",
          "Wrong — secure information sharing between FIUs is standard practice.",
        ],
      },
      {
        q: "Asset recovery in trafficking cases aims to:",
        options: [
          "Punish the traffickers financially only",
          "Seize illicit proceeds to compensate victims and dismantle criminal networks' financial capacity",
          "Give money to the government",
          "Only recover from banks",
        ],
        answer: 1,
        explain: [
          "Wrong — recovery serves victims and dismantles networks, not just punishment.",
          "Correct — forfeiture returns proceeds to victims and starves networks of operational funds.",
          "Wrong — it's victim compensation and network disruption, not revenue.",
          "Wrong — proceeds hide in real estate, businesses, crypto — recovery is multi-channel.",
        ],
      },
    ],
    4: [
      {
        q: "An effective institutional anti-trafficking framework should include:",
        options: [
          "Only a poster campaign",
          "Staff training, transaction monitoring for trafficking indicators, escalation procedures and LE partnerships",
          "Only annual audits",
          "Nothing — it's a law enforcement problem only",
        ],
        answer: 1,
        explain: [
          "Wrong — awareness alone doesn't detect or respond to trafficking finance.",
          "Correct — framework = trained staff + monitoring rules + escalation paths + LE/FIU relationships.",
          "Wrong — audits check the framework; they don't constitute it.",
          "Wrong — financial institutions are on the front line of detecting trafficking finance.",
        ],
      },
      {
        q: "Staff training for trafficking awareness should focus on:",
        options: [
          "Only identifying traffickers visually",
          "Recognising financial red flags (controlled accounts, unusual cash patterns, victim vulnerability indicators)",
          "Memorising offender names",
          "Learning legal statutes only",
        ],
        answer: 1,
        explain: [
          "Wrong — staff see transactions, not victims; financial indicators are what they can spot.",
          "Correct — training teaches analysts the financial patterns: shared accounts, third-party control, cash fronts.",
          "Wrong — names change; patterns persist.",
          "Wrong — legal knowledge helps but practical indicator recognition is the skill.",
        ],
      },
      {
        q: "Escalation procedures for suspected trafficking should ensure:",
        options: [
          "Delays for thorough review",
          "Rapid reporting to compliance/LE while protecting victim confidentiality and safety",
          "Public disclosure",
          "Customer notification first",
        ],
        answer: 1,
        explain: [
          "Wrong — victims' safety can't wait for slow review.",
          "Correct — escalate quickly to MLRO/LE, protect victim identity, coordinate support services.",
          "Wrong — public disclosure endangers victims and compromises investigations.",
          "Wrong — tipping-off risks could alert traffickers and endanger victims.",
        ],
      },
    ],
  },
  "virtual-asset-compliance": {
    1: [
      {
        q: "A VASP (Virtual Asset Service Provider) is best defined as:",
        options: [
          "Any company using computers",
          "A business that exchanges, transfers, safekeeps or provides financial services involving virtual assets",
          "Only cryptocurrency miners",
          "Only NFT artists",
        ],
        answer: 1,
        explain: [
          "Wrong — VASP is a specific regulatory category for virtual-asset services.",
          "Correct — FATF defines VASPs as exchanges, transfer services, custodians and related financial services for virtual assets.",
          "Wrong — miners may or may not be VASPs depending on their activities.",
          "Wrong — NFT creators aren't necessarily VASPs; exchanges/custodians are.",
        ],
      },
      {
        q: "The Travel Rule for virtual assets requires VASPs to:",
        options: [
          "Only check passports",
          "Exchange originator/beneficiary information when transferring virtual assets above a threshold",
          "Only apply to Bitcoin",
          "Nothing — it's voluntary",
        ],
        answer: 1,
        explain: [
          "Wrong — the Travel Rule is about transaction data, not just identity documents.",
          "Correct — like wire transfers, VASP transfers above thresholds must carry sender/receiver data.",
          "Wrong — it applies to all covered virtual assets, not just BTC.",
          "Wrong — FATF Recommendation 16 makes it a compliance requirement.",
        ],
      },
      {
        q: "Stablecoins are considered higher risk in AML because they:",
        options: [
          "They're always scams",
          "They combine crypto's anonymity benefits with price stability, making them attractive for illicit transfers",
          "They can't be traced",
          "They're only used by criminals",
        ],
        answer: 1,
        explain: [
          "Wrong — many stablecoins are legitimate; risk is about their characteristics.",
          "Correct — stable value + crypto transferability = ideal for moving illicit funds without volatility.",
          "Wrong — they're traceable on-chain like other crypto.",
          "Wrong — legitimate uses exist (remittances, trading); criminals abuse them but don't own them.",
        ],
      },
    ],
    2: [
      {
        q: "On-chain analytics for AML primarily involves:",
        options: [
          "Guessing wallet owners",
          "Tracing transaction flows on public blockchains to identify clusters, mixers and sanctioned addresses",
          "Only checking email addresses",
          "Nothing — blockchain is anonymous",
        ],
        answer: 1,
        explain: [
          "Wrong — analytics clusters addresses and traces flows; it doesn't guess identities directly.",
          "Correct — every transaction is public; tools cluster wallets, follow flows, flag mixers/sanctioned addresses.",
          "Wrong — email isn't the analysis layer.",
          "Wrong — pseudonymous ≠ anonymous; on-chain data is fully visible.",
        ],
      },
      {
        q: "A cryptocurrency mixer (tumbler) is an AML red flag because it:",
        options: [
          "Makes transactions faster",
          "Deliberately obscures the transaction trail to hide the source of funds",
          "Is required by law",
          "Only works for small amounts",
        ],
        answer: 1,
        explain: [
          "Wrong — mixers add steps/delay, not speed.",
          "Correct — mixers pool and redistribute coins to break the on-chain link between source and destination.",
          "Wrong — mixers exist to evade tracing, not comply with law.",
          "Wrong — they're used for large amounts where obscuring origin matters most.",
        ],
      },
      {
        q: "Chain-hopping in crypto money laundering refers to:",
        options: [
          "Jumping between blockchains to break the transaction trail across networks",
          "Moving between exchange accounts",
          "Using different wallets on the same chain",
          "A type of trading strategy",
        ],
        answer: 0,
        explain: [
          "Correct — converting BTC→ETH→stablecoin across chains complicates tracing; analytics must follow cross-chain.",
          "Wrong — that's exchange hopping, a simpler form of layering.",
          "Wrong — same-chain wallet hops are easier to trace than cross-chain.",
          "Wrong — it's an evasion technique, not trading.",
        ],
      },
    ],
    3: [
      {
        q: "VASPs must apply KYC/CDD because:",
        options: [
          "Crypto is exempt from AML laws",
          "FATF standards and national laws (e.g., MiCA in EU) bring virtual-asset services under AML obligations",
          "Only banks need KYC",
          "It's voluntary best practice",
        ],
        answer: 1,
        explain: [
          "Wrong — crypto isn't exempt; VASPs are explicitly covered.",
          "Correct — FATF Recommendation 15 + MiCA + national laws impose full AML/CFT on VASPs.",
          "Wrong — VASPs have their own KYC obligations, separate from banks.",
          "Wrong — it's a legal requirement, not optional.",
        ],
      },
      {
        q: "Transaction monitoring for a crypto exchange would flag:",
        options: [
          "Only failed logins",
          "Deposits from mixers, sanctioned addresses, darknet markets and rapid layering patterns",
          "Only large trades",
          "Nothing — crypto can't be monitored",
        ],
        answer: 1,
        explain: [
          "Wrong — monitoring covers transaction patterns, not just security events.",
          "Correct — mixer deposits, sanctioned-address interactions and layering velocity are key alerts.",
          "Wrong — small frequent transactions can be just as suspicious as large ones.",
          "Wrong — every on-chain transaction is monitorable.",
        ],
      },
      {
        q: "The 'travel rule' challenge for VASPs is:",
        options: [
          "Too much data",
          "Exchanges must share counterparty data, but interoperability between different VASP systems is still developing",
          "No data exists",
          "Only applies to cash",
        ],
        answer: 1,
        explain: [
          "Wrong — the challenge is implementation, not data volume.",
          "Correct — VASPs must exchange originator/beneficiary info; cross-platform standardisation is the hurdle.",
          "Wrong — blockchain data is abundant; the gap is counterparty VASP info exchange.",
          "Wrong — it applies to virtual asset transfers, not cash.",
        ],
      },
    ],
    4: [
      {
        q: "DeFi (decentralised finance) complicates AML because:",
        options: [
          "It's illegal everywhere",
          "It removes central intermediaries — no VASP to enforce KYC on protocol-level transactions",
          "It's too slow",
          "It only uses stablecoins",
        ],
        answer: 1,
        explain: [
          "Wrong — DeFi operates in regulatory grey zones, not banned everywhere.",
          "Correct — smart contracts execute without a central entity; who bears AML duty is contested.",
          "Wrong — speed isn't the issue; disintermediation is.",
          "Wrong — DeFi uses many assets, not just stablecoins.",
        ],
      },
      {
        q: "NFTs raise AML concerns mainly because they:",
        options: [
          "They're always fraud",
          "They can be used for money laundering through wash trading, inflated prices and pseudonymous transfers",
          "They can't be sold",
          "They only exist on one platform",
        ],
        answer: 1,
        explain: [
          "Wrong — most NFTs are legitimate; the risk is their abuse for laundering.",
          "Correct — self-dealing, wash sales and pseudonymous transfers can disguise illicit funds as 'art sales'.",
          "Wrong — they're actively traded.",
          "Wrong — NFTs exist across many marketplaces and chains.",
        ],
      },
      {
        q: "The future of crypto AML compliance likely involves:",
        options: [
          "Banning all crypto",
          "Greater regulatory clarity (MiCA-style regimes), Travel Rule adoption, and better on-chain analytics",
          "No regulation needed",
          "Only self-regulation by exchanges",
        ],
        answer: 1,
        explain: [
          "Wrong — prohibition isn't the trajectory; regulated frameworks are emerging.",
          "Correct — MiCA, FATF standards and analytics tools are converging toward comprehensive VASP regulation.",
          "Wrong — regulation is expanding, not absent.",
          "Wrong — self-regulation supplements but doesn't replace statutory AML.",
        ],
      },
    ],
  },
  "trade-based-laundering": {
    1: [
      {
        q: "Trade-based money laundering (TBML) is best defined as:",
        options: [
          "Laundering through cryptocurrency exchanges",
          "Moving illicit value through international trade by manipulating trade documents and transactions",
          "Smuggling physical cash across borders",
          "Only laundering via shipping containers",
        ],
        answer: 1,
        explain: [
          "Wrong — crypto laundering is a different typology.",
          "Correct — TBML exploits trade finance: falsified invoices, mispricing, phantom shipments move value internationally.",
          "Wrong — TBML uses the trade system, not physical cash smuggling.",
          "Wrong — containers are one vector; the method is document/transaction manipulation.",
        ],
      },
      {
        q: "TBML is considered harder to detect than cash laundering because:",
        options: [
          "It involves smaller amounts",
          "It abuses legitimate trade flows and documentation, making illicit transactions appear normal",
          "It only happens in poor countries",
          "Banks don't process trade finance",
        ],
        answer: 1,
        explain: [
          "Wrong — TBML often involves large amounts.",
          "Correct — legitimate trade provides cover; falsified docs look like normal commerce.",
          "Wrong — it's global, especially in high-trade corridors.",
          "Wrong — banks finance trade constantly; the challenge is verifying the underlying reality.",
        ],
      },
      {
        q: "The FATF and Egmont Group estimate TBML accounts for what share of global money laundering?",
        options: [
          "Less than 1%",
          "A significant portion — often cited as the largest laundering method by value",
          "Exactly 50%",
          "It can't be estimated",
        ],
        answer: 1,
        explain: [
          "Wrong — estimates put TBML at a substantial share of global laundering.",
          "Correct — TBML is believed to move more value than any other laundering method due to trade volumes.",
          "Wrong — no fixed percentage; it's an estimate, not a precise figure.",
          "Wrong — it can be estimated through trade data analysis and investigations.",
        ],
      },
    ],
    2: [
      {
        q: "Over-invoicing in TBML involves:",
        options: [
          "Charging too little for goods",
          "Declaring goods at above market value to transfer excess funds to the seller abroad",
          "Only changing currency",
          "Delaying payment",
        ],
        answer: 1,
        explain: [
          "Wrong — that's under-invoicing; over-invoicing inflates the price.",
          "Correct — buyer pays inflated price; the 'excess' is illicit value transferred to the seller.",
          "Wrong — it's about falsifying the declared value, not currency.",
          "Wrong — timing isn't the mechanism; price falsification is.",
        ],
      },
      {
        q: "Phantom shipments in TBML refer to:",
        options: [
          "Real shipments with wrong labels",
          "Fictitious trade transactions where documents exist but no goods actually move",
          "Damaged goods",
          "Delayed shipments",
        ],
        answer: 1,
        explain: [
          "Wrong — phantom means no physical goods at all.",
          "Correct — fake bills of lading and invoices create the appearance of trade without moving anything — pure value transfer.",
          "Wrong — damage isn't the issue; non-existence is.",
          "Wrong — delays are operational; phantoms are fraudulent.",
        ],
      },
      {
        q: "Multiple invoicing in TBML means:",
        options: [
          "Sending one invoice",
          "Using several invoices for the same shipment to extract additional payments",
          "Paying in instalments",
          "Using different currencies",
        ],
        answer: 1,
        explain: [
          "Wrong — multiple means more than one, not fewer.",
          "Correct — duplicate/parallel invoices for one shipment allow extra 'payments' that are actually laundering.",
          "Wrong — instalments are legitimate; duplicate invoicing is fraud.",
          "Wrong — currency choice isn't the mechanism; duplicate billing is.",
        ],
      },
    ],
    3: [
      {
        q: "Key red flags for TBML in trade finance include:",
        options: [
          "Consistent pricing with market rates",
          "Significant deviations from market prices, high-risk jurisdictions, and unusual trade patterns",
          "Only large shipments",
          "Only air freight",
        ],
        answer: 1,
        explain: [
          "Wrong — market-consistent pricing is normal; deviations are the flag.",
          "Correct — price anomalies vs benchmarks, high-risk corridors, and inconsistent trade patterns signal TBML.",
          "Wrong — size isn't the indicator; pricing and routing are.",
          "Wrong — TBML uses all transport modes.",
        ],
      },
      {
        q: "Trade-based detection requires analysis of:",
        options: [
          "Only bank account balances",
          "Invoice prices vs market benchmarks, shipping documents, and the economic logic of the trade",
          "Only customer names",
          "Only payment dates",
        ],
        answer: 1,
        explain: [
          "Wrong — balances don't reveal trade manipulation.",
          "Correct — compare declared prices to market data, verify documents, assess whether the trade makes economic sense.",
          "Wrong — names alone don't detect TBML.",
          "Wrong — timing is secondary to price/document analysis.",
        ],
      },
      {
        q: "The 'black hole' countries in TBML are jurisdictions that:",
        options: [
          "Have no trade",
          "Have weak trade/transparency controls making them attractive for TBML routing",
          "Are all sanctioned",
          "Only export oil",
        ],
        answer: 1,
        explain: [
          "Wrong — they have trade; it's opaque trade.",
          "Correct — jurisdictions with weak customs/documentation oversight attract TBML as transit points.",
          "Wrong — not all are sanctioned; many are simply low-transparency.",
          "Wrong — they handle diverse goods, not just oil.",
        ],
      },
    ],
    4: [
      {
        q: "Correspondent banks face TBML risk because they:",
        options: [
          "They process all trade directly",
          "They provide trade finance to respondent banks without full visibility into underlying transactions",
          "They don't handle trade",
          "Only domestic banks use them",
        ],
        answer: 1,
        explain: [
          "Wrong — correspondents don't see underlying trades; respondents do.",
          "Correct — nested correspondent relationships mean the correspondent can't verify each trade's legitimacy.",
          "Wrong — trade finance flows through correspondent networks constantly.",
          "Wrong — cross-border trade inherently uses correspondents.",
        ],
      },
      {
        q: "Enhanced due diligence for high-risk trade corridors should include:",
        options: [
          "Ignoring the risk",
          "Verifying trade documentation, understanding the commercial rationale, and monitoring for price anomalies",
          "Only checking account balances",
          "Banning all trade",
        ],
        answer: 1,
        explain: [
          "Wrong — high-risk corridors need MORE scrutiny, not less.",
          "Correct — EDD for TBML = document verification, commercial logic assessment, price benchmarking, ongoing monitoring.",
          "Wrong — balances alone miss trade manipulation.",
          "Wrong — targeted EDD, not blanket bans, is proportionate.",
        ],
      },
      {
        q: "When TBML is suspected, the appropriate response is to:",
        options: [
          "Process the payment anyway",
          "Escalate for investigation, consider freezing, file suspicious activity reports and document thoroughly",
          "Ignore it — trade is complex",
          "Only warn the customer",
        ],
        answer: 1,
        explain: [
          "Wrong — processing suspected TBML breaches compliance obligations.",
          "Correct — escalate, potentially freeze, file SAR/STR, preserve documentation for investigators.",
          "Wrong — complexity is why TBML needs investigation, not dismissal.",
          "Wrong — warning alone is insufficient; reporting obligations apply.",
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
  "fraud-prevention": [
    {
      q: "The fraud triangle's three elements are:",
      options: [
        "Detect, deter, prosecute",
        "Pressure, opportunity, rationalization",
        "Money, motive, means",
        "Prevent, detect, respond",
      ],
      answer: 1,
      explain: [
        "Wrong — that's an enforcement lifecycle, not the fraudster's mindset.",
        "Correct — Cressey's triangle explains why people commit fraud.",
        "Wrong — that's a generic crime framing, not the fraud model.",
        "Wrong — that's the control framework, not the cause.",
      ],
    },
    {
      q: "APP fraud is dangerous because:",
      options: [
        "It requires hacking bank systems",
        "The victim authorises the payment themselves — no system breach needed",
        "It only affects businesses",
        "It's always detected immediately",
      ],
      answer: 1,
      explain: [
        "Wrong — APP scams manipulate people, not systems.",
        "Correct — social engineering convinces victims to send money willingly; controls must address the human layer.",
        "Wrong — consumers are equally targeted.",
        "Wrong — many APP scams succeed before detection.",
      ],
    },
    {
      q: "In the three lines model, the fraud team typically sits in:",
      options: [
        "First line — owning business controls",
        "Second line — setting standards, monitoring and challenging first-line controls",
        "Third line — internal audit",
        "Outside the organisation",
      ],
      answer: 1,
      explain: [
        "Wrong — first line owns day-to-day controls in the business.",
        "Correct — fraud/risk functions are second-line: they set the framework and oversee first-line execution.",
        "Wrong — third line audits the whole framework independently.",
        "Wrong — second-line functions are internal.",
      ],
    },
    {
      q: "Expense fraud is classified as:",
      options: ["Financial statement fraud", "Asset misappropriation", "Corruption", "External fraud"],
      answer: 1,
      explain: [
        "Wrong — that's misstating financials, a different category.",
        "Correct — expense fraud steals company assets — asset misappropriation.",
        "Wrong — corruption is abusing power for gain (bribes, kickbacks).",
        "Wrong — occupational fraud is internal.",
      ],
    },
    {
      q: "A high false-positive rate in fraud alerts is problematic because:",
      options: [
        "It means fraud is increasing",
        "Alert fatigue causes analysts to miss real fraud among the noise",
        "It saves money",
        "It's a sign of good detection",
      ],
      answer: 1,
      explain: [
        "Wrong — high FPs indicate tuning problems, not rising fraud.",
        "Correct — drowning in false alerts buries true positives; precision matters.",
        "Wrong — it wastes analyst time; it doesn't save money.",
        "Wrong — good detection balances precision and recall.",
      ],
    },
    {
      q: "When fraud is confirmed, the FIRST priority is:",
      options: [
        "Public announcement",
        "Containing the loss — freezing accounts, stopping payments, preserving evidence",
        "Firing staff",
        "Waiting for audit",
      ],
      answer: 1,
      explain: [
        "Wrong — publicity can tip off accomplices.",
        "Correct — contain first to stop further loss, then investigate and remediate.",
        "Wrong — employment action follows fact-finding.",
        "Wrong — fraud response is immediate, not audit-cycle.",
      ],
    },
    {
      q: "UK PSR APP fraud reimbursement requires:",
      options: [
        "Nothing — victims bear all loss",
        "Reimbursement up to a cap, split between sending and receiving firms, with negligence exemptions",
        "Only government payment",
        "Automatic full reimbursement always",
      ],
      answer: 1,
      explain: [
        "Wrong — mandatory reimbursement applies since Oct 2024.",
        "Correct — PSR rules allocate loss between firms with caps and a gross-negligence exemption.",
        "Wrong — it's industry-funded via payment firms.",
        "Wrong — claims are assessed; exemptions exist.",
      ],
    },
    {
      q: "Corporate liability for fraud means:",
      options: [
        "Only individuals are ever liable",
        "The organisation can be prosecuted for failing to prevent fraud by associated persons",
        "Companies can't be fined",
        "Only banks face liability",
      ],
      answer: 1,
      explain: [
        "Wrong — entities face criminal/civil liability too.",
        "Correct — failure-to-prevent offences make firms liable for associated persons' conduct.",
        "Wrong — corporate fines are standard.",
        "Wrong — liability applies to any organisation.",
      ],
    },
    {
      q: "Money mules are used in fraud because they:",
      options: [
        "Are always criminal masterminds",
        "Obscure the money trail — illicit funds in, 'clean' funds out",
        "Can't be traced",
        "Only work for banks",
      ],
      answer: 1,
      explain: [
        "Wrong — mules are often deceived or paid; they're cut-outs, not masterminds.",
        "Correct — mule accounts break the audit trail between criminal and victim funds.",
        "Wrong — they're traceable; that's why detection matters.",
        "Wrong — mules operate outside banking systems too.",
      ],
    },
    {
      q: "The best fraud detection approach combines:",
      options: [
        "Only manual reviews",
        "Rules, analytics, behavioural signals and human investigation working together",
        "Only AI with no humans",
        "Only customer reports",
      ],
      answer: 1,
      explain: [
        "Wrong — manual alone can't scale.",
        "Correct — layered detection: automated scoring + human judgement for the riskiest alerts.",
        "Wrong — AI needs human oversight for decisions and edge cases.",
        "Wrong — customer reports are one input, not the whole system.",
      ],
    },
  ],
  "sanctions-screening": [
    {
      q: "Smart sanctions are preferred over comprehensive embargoes because they:",
      options: [
        "Are easier to enforce",
        "Target specific persons/entities, reducing harm to civilian populations",
        "Cost less",
        "Require no monitoring",
      ],
      answer: 1,
      explain: [
        "Wrong — targeted sanctions can be harder to enforce precisely.",
        "Correct — post-Cold War shift to 'smart' sanctions aims at perpetrators, not whole economies.",
        "Wrong — cost isn't the design driver.",
        "Wrong — they still need screening and enforcement.",
      ],
    },
    {
      q: "UN Security Council sanctions bind member states through:",
      options: [
        "Voluntary adoption",
        "UN Charter Chapter VII — legally binding international obligations",
        "Bank policies",
        "Custom only",
      ],
      answer: 1,
      explain: [
        "Wrong — they're mandatory, not voluntary.",
        "Correct — Chapter VII resolutions create binding legal obligations for all member states.",
        "Wrong — banks implement them because law requires it.",
        "Wrong — they're treaty-based, not customary.",
      ],
    },
    {
      q: "OFAC is the sanctions authority of:",
      options: ["The UN", "The United States", "The European Union", "The UK"],
      answer: 1,
      explain: [
        "Wrong — the UN has its own sanctions committees.",
        "Correct — OFAC = US Treasury's Office of Foreign Assets Control.",
        "Wrong — the EU has its own sanctions regimes.",
        "Wrong — the UK uses OFSI (HM Treasury).",
      ],
    },
    {
      q: "An asset freeze requires institutions to:",
      options: [
        "Confiscate the funds permanently",
        "Block all dealings with designated funds and report to the authority",
        "Ask the customer first",
        "Ignore it if small",
      ],
      answer: 1,
      explain: [
        "Wrong — freezing holds funds; confiscation is a separate court process.",
        "Correct — freeze = prohibit transactions, hold funds, report to OFAC/OFSI.",
        "Wrong — statutory duty overrides consent.",
        "Wrong — no de minimis exemption for sanctioned assets.",
      ],
    },
    {
      q: "The 50 percent rule means an entity is sanctioned if:",
      options: [
        "It owns 50% of a sanctioned firm",
        "Sanctioned persons own ≥50% of it, individually or aggregated",
        "Its trade is 50% sanctioned",
        "It has 50 employees",
      ],
      answer: 1,
      explain: [
        "Wrong — direction matters: OWNED BY sanctioned parties.",
        "Correct — ≥50% ownership by sanctioned person(s), aggregated, triggers deemed sanctions status.",
        "Wrong — it's ownership, not trade volume.",
        "Wrong — headcount is irrelevant.",
      ],
    },
    {
      q: "Aggregating ownership under the 50% rule defeats attempts to:",
      options: [
        "Legitimately invest",
        "Evade sanctions by splitting ownership among multiple sanctioned shareholders",
        "Reduce taxes",
        "Hide company registration",
      ],
      answer: 1,
      explain: [
        "Wrong — legitimate investment isn't the target.",
        "Correct — two SDNs owning 30%+25% = 55% → entity blocked despite being unlisted.",
        "Wrong — it's a sanctions control, not tax.",
        "Wrong — ownership aggregation, not registration secrecy.",
      ],
    },
    {
      q: "Fuzzy matching in sanctions screening handles:",
      options: [
        "Only exact name matches",
        "Name variations, transliterations and aliases that exact matching misses",
        "Only numeric IDs",
        "Only email addresses",
      ],
      answer: 1,
      explain: [
        "Wrong — exact matching is what fuzzy matching improves upon.",
        "Correct — 'Mohammed' vs 'Muhammad', spelling variants need algorithmic matching.",
        "Wrong — IDs help but names remain primary.",
        "Wrong — screening keys on names and identifiers.",
      ],
    },
    {
      q: "A confirmed sanctions match requires the institution to:",
      options: [
        "Process the transaction",
        "Freeze, reject, report to the authority and not tip off the customer",
        "Ask the customer to explain",
        "Wait for the next audit",
      ],
      answer: 1,
      explain: [
        "Wrong — processing a sanctioned transaction is a strict-liability breach.",
        "Correct — freeze, reject, file report, maintain confidentiality.",
        "Wrong — statutory duty acts immediately.",
        "Wrong — sanctions breaches can't wait for audits.",
      ],
    },
    {
      q: "Dark fleet vessels and AIS gaps indicate:",
      options: [
        "Normal operations",
        "Possible sanctions evasion — hiding voyages to sanctioned ports or illicit cargo transfers",
        "Better fuel efficiency",
        "Technical upgrades",
      ],
      answer: 1,
      explain: [
        "Wrong — AIS gaps are abnormal and suspicious.",
        "Correct — disabling tracking near sanctioned ports is a classic evasion indicator.",
        "Wrong — fuel efficiency doesn't require going dark.",
        "Wrong — upgrades improve systems, not hide them.",
      ],
    },
    {
      q: "Ship-to-ship transfers are a sanctions risk because they:",
      options: [
        "Are always illegal",
        "Can obscure cargo origin — moving sanctioned oil between vessels to break the paper trail",
        "Only happen legally",
        "Are required by maritime law",
      ],
      answer: 1,
      explain: [
        "Wrong — STS is legal; misuse for sanctions evasion is the risk.",
        "Correct — mid-ocean transfers hide the link between sanctioned producers and buyers.",
        "Wrong — legality isn't the issue; the evasion use is.",
        "Wrong — they're permitted but monitored for abuse.",
      ],
    },
  ],
  "counter-terrorist-financing": [
    {
      q: "Terrorist financing differs from money laundering because:",
      options: [
        "It only involves large sums",
        "It funds terrorist acts — the money can be legitimately sourced",
        "It always requires prior crime",
        "It's identical to laundering",
      ],
      answer: 1,
      explain: [
        "Wrong — TF often involves small amounts.",
        "Correct — TF = providing funds for terrorism; source can be clean (charity, business) or dirty.",
        "Wrong — legitimate income can fund terrorism.",
        "Wrong — legally distinct offences.",
      ],
    },
    {
      q: "The FATF's role is to:",
      options: [
        "Enforce sanctions directly",
        "Set AML/CFT standards and peer-review country compliance",
        "Run a police force",
        "Maintain sanctions lists",
      ],
      answer: 1,
      explain: [
        "Wrong — FATF sets standards; enforcement is national.",
        "Correct — FATF issues 40 Recommendations and conducts mutual evaluations.",
        "Wrong — it's a standards body, not police.",
        "Wrong — lists are maintained by UN/OFAC/OFSI etc.",
      ],
    },
    {
      q: "A FATF grey list means:",
      options: [
        "The country is sanctioned",
        "Strategic AML/CFT deficiencies — under increased monitoring and pressure to reform",
        "No financial system",
        "Banned from UN",
      ],
      answer: 1,
      explain: [
        "Wrong — grey listing isn't sanctions.",
        "Correct — enhanced monitoring + technical assistance demands until deficiencies resolve.",
        "Wrong — these are significant financial centres.",
        "Wrong — unrelated to UN membership.",
      ],
    },
    {
      q: "Hawala is a TF risk because it:",
      options: [
        "It's a cryptocurrency",
        "It's an informal value-transfer system with minimal documentation — ideal for moving funds covertly",
        "It only works in banks",
        "It's always illegal",
      ],
      answer: 1,
      explain: [
        "Wrong — hawala is a traditional trust-based network, not crypto.",
        "Correct — value moves via broker networks with little paper trail.",
        "Wrong — it's precisely non-bank.",
        "Wrong — legality varies; abuse by terrorists is the issue.",
      ],
    },
    {
      q: "Charities are vulnerable to TF because they:",
      options: [
        "They're always criminal",
        "They handle cash in conflict zones and can be infiltrated or diverted by terrorist groups",
        "They can't receive money",
        "Only big NGOs are at risk",
      ],
      answer: 1,
      explain: [
        "Wrong — most are legitimate; vulnerability ≠ guilt.",
        "Correct — cash-heavy ops in high-risk areas + weak oversight = diversion risk.",
        "Wrong — donations are their function.",
        "Wrong — small/local NGOs are often less monitored.",
      ],
    },
    {
      q: "The main TF detection challenge vs ML is:",
      options: [
        "TF involves bigger amounts",
        "Small amounts, legitimate sources and urgent time pressure before attacks",
        "TF never crosses borders",
        "TF is easier to detect",
      ],
      answer: 1,
      explain: [
        "Wrong — TF is typically smaller-scale.",
        "Correct — small 'clean' amounts + speed requirement make detection harder.",
        "Wrong — TF is inherently cross-border.",
        "Wrong — it's generally harder, hence a distinct discipline.",
      ],
    },
    {
      q: "TF asset freezing must be:",
      options: [
        "Delayed for court approval",
        "Immediate — listed terrorists' assets blocked at once and reported",
        "Subject to customer consent",
        "Optional",
      ],
      answer: 1,
      explain: [
        "Wrong — listing creates automatic freezing duties.",
        "Correct — freeze immediately; delays can enable attacks.",
        "Wrong — statutory duty overrides consent.",
        "Wrong — it's mandatory, not optional.",
      ],
    },
    {
      q: "International CTF cooperation is essential because:",
      options: [
        "Terrorism is domestic only",
        "Networks, funds and attacks span borders — requiring rapid intelligence sharing",
        "The UN does everything",
        "Banks can't cooperate",
      ],
      answer: 1,
      explain: [
        "Wrong — terrorist networks are transnational.",
        "Correct — money, people and attacks cross borders; FIU/security cooperation is critical.",
        "Wrong — member states enforce; UN coordinates.",
        "Wrong — secure FIU-to-FIU sharing is standard.",
      ],
    },
    {
      q: "Smurfing in TF context means:",
      options: [
        "A cartoon character",
        "Breaking large amounts into sub-threshold transactions to avoid detection",
        "Recruiting operatives",
        "Using multiple accounts legitimately",
      ],
      answer: 1,
      explain: [
        "Wrong — it's financial structuring.",
        "Correct — same evasion technique as ML structuring, applied to TF.",
        "Wrong — that's operational, not financial.",
        "Wrong — legitimate multi-account use isn't smurfing; evasion intent is key.",
      ],
    },
    {
      q: "List-based TF screening checks against:",
      options: [
        "Only bank blacklists",
        "UN ISIL/Al-Qaida lists, national terrorist designations and PEP data",
        "Only credit scores",
        "Only registries",
      ],
      answer: 1,
      explain: [
        "Wrong — statutory screening uses official lists.",
        "Correct — UNSC lists + national proscribed-organisation lists + PEP screening.",
        "Wrong — credit data doesn't identify terrorists.",
        "Wrong — registries show existence, not status.",
      ],
    },
  ],
  "financial-intelligence-trafficking": [
    {
      q: "Trafficking revenue comes primarily from:",
      options: ["Drug sales", "Exploiting victims — forced labour, sexual exploitation, organs", "Legitimate profits", "Government grants"],
      answer: 1,
      explain: [
        "Wrong — drugs are separate; trafficking monetises human exploitation.",
        "Correct — profits derive from exploiting victims across multiple forms.",
        "Wrong — legitimate income isn't trafficking revenue.",
        "Wrong — grants fund NGOs, not criminals.",
      ],
    },
    {
      q: "Trafficking financial flows typically use:",
      options: ["Only cash", "Cash, hawala, front companies and digital payments", "Only banks", "No finance"],
      answer: 1,
      explain: [
        "Wrong — cash is common but not exclusive.",
        "Correct — networks diversify across informal and formal channels.",
        "Wrong — informal systems are heavily used.",
        "Wrong — it's a profit crime with extensive flows.",
      ],
    },
    {
      q: "A key tracing challenge is that proceeds are often:",
      options: ["Always huge", "Commingled with legitimate business revenue via front companies", "Nonexistent", "Only in crypto"],
      answer: 1,
      explain: [
        "Wrong — size isn't the issue; obscuring origin is.",
        "Correct — fronts (parlours, farms, hospitality) launder exploitation revenue as business income.",
        "Wrong — trafficking is fundamentally financial.",
        "Wrong — crypto is emerging but not exclusive.",
      ],
    },
    {
      q: "Red flags for trafficking include:",
      options: ["Regular salary payments", "Shared/controlled accounts, third-party account control, cash-intensive fronts", "Only crypto", "No activity"],
      answer: 1,
      explain: [
        "Wrong — regular salaries are normal.",
        "Correct — victims' wages controlled by handlers, shared accounts, cash-heavy fronts are key indicators.",
        "Wrong — crypto is emerging, not primary.",
        "Wrong — red flags exist but are subtle.",
      ],
    },
    {
      q: "Third-party control of a victim's account signals:",
      options: ["Legal requirement", "The victim isn't in control of their earnings — exploitation", "Normal practice", "Only minors"],
      answer: 1,
      explain: [
        "Wrong — no law requires handler control.",
        "Correct — 'boyfriend'/employer controlling accounts indicates exploitation.",
        "Wrong — account holders normally control their own accounts.",
        "Wrong — adults are trafficked; control is the indicator.",
      ],
    },
    {
      q: "FI obligations for trafficking require:",
      options: ["Ignoring suspicion", "Reporting to FIUs and cooperating with LE", "Only closing accounts", "Public naming"],
      answer: 1,
      explain: [
        "Wrong — ignoring SAR obligations breaches compliance.",
        "Correct — report suspicious activity and assist law enforcement.",
        "Wrong — closure may be part of response; reporting is the duty.",
        "Wrong — public naming compromises investigations.",
      ],
    },
    {
      q: "Trafficking cases need international cooperation because:",
      options: ["They're domestic", "Victims, traffickers and proceeds cross borders", "UN does all", "Banks can't share"],
      answer: 1,
      explain: [
        "Wrong — trafficking is transnational.",
        "Correct — cross-border movement of people and funds requires joint investigation.",
        "Wrong — national agencies enforce.",
        "Wrong — FIU-to-FIU sharing is standard.",
      ],
    },
    {
      q: "Asset recovery in trafficking aims to:",
      options: ["Only punish", "Seize proceeds to compensate victims and dismantle networks", "Fund government", "Only bank assets"],
      answer: 1,
      explain: [
        "Wrong — it serves victims and network disruption.",
        "Correct — forfeiture compensates victims and starves criminal operations.",
        "Wrong — it's victim restitution, not revenue.",
        "Wrong — proceeds hide in real estate, businesses, crypto.",
      ],
    },
    {
      q: "An anti-trafficking framework should include:",
      options: ["Only posters", "Training, monitoring, escalation and LE partnerships", "Only audits", "Nothing"],
      answer: 1,
      explain: [
        "Wrong — awareness alone doesn't detect finance.",
        "Correct — trained staff + monitoring + escalation + LE relationships.",
        "Wrong — audits verify; they don't constitute the framework.",
        "Wrong — institutions are on the front line.",
      ],
    },
    {
      q: "Trafficking escalation should prioritise:",
      options: ["Slow review", "Rapid reporting while protecting victim confidentiality", "Public disclosure", "Customer notification"],
      answer: 1,
      explain: [
        "Wrong — victim safety can't wait.",
        "Correct — escalate fast to MLRO/LE, protect identity, coordinate support.",
        "Wrong — public disclosure endangers victims.",
        "Wrong — tipping-off risks alert traffickers.",
      ],
    },
  ],
  "virtual-asset-compliance": [
    {
      q: "A VASP is:",
      options: ["Any tech company", "A business providing exchange/transfer/custody services for virtual assets", "Only miners", "Only NFT artists"],
      answer: 1,
      explain: [
        "Wrong — VASP is a specific regulatory category.",
        "Correct — FATF defines VASPs as virtual-asset service providers under AML obligations.",
        "Wrong — miners may not be VASPs depending on activity.",
        "Wrong — creators aren't necessarily VASPs.",
      ],
    },
    {
      q: "The Travel Rule requires VASPs to:",
      options: ["Check passports only", "Exchange originator/beneficiary data on transfers above threshold", "Only apply to BTC", "Nothing"],
      answer: 1,
      explain: [
        "Wrong — it's about transaction data, not just ID.",
        "Correct — like wire transfers, virtual-asset transfers carry counterparty information.",
        "Wrong — applies to all covered assets.",
        "Wrong — FATF R.16 makes it mandatory.",
      ],
    },
    {
      q: "Stablecoins are higher AML risk because they:",
      options: ["They're scams", "Combine price stability with crypto transferability — ideal for illicit moves", "Untraceable", "Only criminal"],
      answer: 1,
      explain: [
        "Wrong — many are legitimate; risk is in the characteristics.",
        "Correct — stable value + crypto rails = attractive for moving illicit funds.",
        "Wrong — they're on-chain traceable.",
        "Wrong — legitimate uses exist; criminals abuse them.",
      ],
    },
    {
      q: "On-chain analytics works by:",
      options: ["Guessing owners", "Tracing public blockchain flows to cluster wallets and flag mixers/sanctioned addresses", "Checking emails", "Nothing — anonymous"],
      answer: 1,
      explain: [
        "Wrong — it clusters and traces, not guesses.",
        "Correct — every transaction is public; analytics follows flows and flags risk.",
        "Wrong — analysis is on-chain, not email.",
        "Wrong — pseudonymous ≠ anonymous.",
      ],
    },
    {
      q: "Mixers are AML red flags because they:",
      options: ["Speed transactions", "Deliberately obscure the transaction trail to hide fund sources", "Are legal requirements", "Only small amounts"],
      answer: 1,
      explain: [
        "Wrong — mixers add obfuscation, not speed.",
        "Correct — they pool and redistribute to break on-chain links.",
        "Wrong — they exist to evade tracing.",
        "Wrong — used most for large amounts.",
      ],
    },
    {
      q: "Chain-hopping in laundering refers to:",
      options: ["Exchange hopping", "Moving across blockchains to break the trail", "Same-chain wallets", "Trading strategy"],
      answer: 1,
      explain: [
        "Wrong — that's simpler exchange hopping.",
        "Correct — cross-chain conversion (BTC→ETH→stablecoin) complicates tracing.",
        "Wrong — same-chain hops are easier to trace.",
        "Wrong — it's evasion, not trading.",
      ],
    },
    {
      q: "VASPs need KYC because:",
      options: ["Crypto is exempt", "FATF standards and laws like MiCA impose AML obligations", "Only banks need it", "Voluntary"],
      answer: 1,
      explain: [
        "Wrong — crypto isn't exempt.",
        "Correct — FATF R.15 + MiCA + national laws require full AML on VASPs.",
        "Wrong — VASPs have their own obligations.",
        "Wrong — it's legally mandatory.",
      ],
    },
    {
      q: "Crypto monitoring should flag:",
      options: ["Failed logins only", "Mixer deposits, sanctioned addresses, darknet markets, layering patterns", "Only large trades", "Nothing"],
      answer: 1,
      explain: [
        "Wrong — monitoring covers transaction patterns.",
        "Correct — mixer/sanctioned/darknet interactions and velocity are key alerts.",
        "Wrong — small frequent txns can be equally suspicious.",
        "Wrong — all on-chain txns are monitorable.",
      ],
    },
    {
      q: "DeFi complicates AML because:",
      options: ["It's illegal", "Smart contracts remove central intermediaries — no VASP to enforce KYC", "Too slow", "Only stablecoins"],
      answer: 1,
      explain: [
        "Wrong — it's a regulatory grey zone, not banned.",
        "Correct — disintermediation raises the question of who bears AML duty.",
        "Wrong — speed isn't the issue.",
        "Wrong — DeFi uses diverse assets.",
      ],
    },
    {
      q: "NFT AML risk comes from:",
      options: ["Always fraud", "Wash trading, inflated prices and pseudonymous transfers enabling laundering", "Can't be sold", "One platform"],
      answer: 1,
      explain: [
        "Wrong — most are legitimate; abuse is the risk.",
        "Correct — self-dealing and pseudonymous sales can disguise illicit funds.",
        "Wrong — they're actively traded.",
        "Wrong — NFTs span many marketplaces.",
      ],
    },
  ],
  "trade-based-laundering": [
    {
      q: "TBML is:",
      options: ["Crypto laundering", "Moving illicit value through trade by manipulating documents and transactions", "Cash smuggling", "Only containers"],
      answer: 1,
      explain: [
        "Wrong — crypto is separate.",
        "Correct — TBML exploits trade finance via falsified invoices and phantom shipments.",
        "Wrong — it uses the trade system, not physical smuggling.",
        "Wrong — the method is document manipulation.",
      ],
    },
    {
      q: "TBML is hard to detect because it:",
      options: ["Small amounts", "Abuses legitimate trade flows making illicit transactions appear normal", "Only poor countries", "No banks"],
      answer: 1,
      explain: [
        "Wrong — it often involves large amounts.",
        "Correct — legitimate trade provides cover; falsified docs look normal.",
        "Wrong — it's global in high-trade corridors.",
        "Wrong — banks process trade finance constantly.",
      ],
    },
    {
      q: "TBML may be the largest laundering method because:",
      options: ["It's proven exactly", "Trade volumes are enormous and mostly unmonitored for AML", "Banks report it all", "It's new"],
      answer: 1,
      explain: [
        "Wrong — it's an estimate, not proven exact.",
        "Correct — global trade dwarfs other channels; verification of underlying reality is hard.",
        "Wrong — most TBML goes undetected/unreported.",
        "Wrong — it's been around for decades.",
      ],
    },
    {
      q: "Over-invoicing transfers value by:",
      options: ["Undercharging", "Declaring goods above market value so excess payment moves to the seller", "Currency only", "Delaying"],
      answer: 1,
      explain: [
        "Wrong — that's under-invoicing.",
        "Correct — inflated price means the 'excess' is illicit value to the seller.",
        "Wrong — it's price falsification.",
        "Wrong — timing isn't the mechanism.",
      ],
    },
    {
      q: "Phantom shipments are:",
      options: ["Mislabeled goods", "Fictitious transactions — documents exist but no goods move", "Damaged goods", "Delayed"],
      answer: 1,
      explain: [
        "Wrong — phantom means non-existent goods.",
        "Correct — fake bills of lading create trade appearance without moving anything.",
        "Wrong — damage isn't the issue.",
        "Wrong — delays are operational.",
      ],
    },
    {
      q: "Multiple invoicing involves:",
      options: ["One invoice", "Several invoices for the same shipment extracting extra payments", "Instalments", "Currencies"],
      answer: 1,
      explain: [
        "Wrong — multiple means more than one.",
        "Correct — duplicate invoices for one shipment allow extra 'payments' = laundering.",
        "Wrong — instalments are legitimate.",
        "Wrong — currency isn't the mechanism.",
      ],
    },
    {
      q: "TBML red flags include:",
      options: ["Market-consistent pricing", "Price deviations, high-risk jurisdictions, unusual trade patterns", "Large shipments", "Air freight"],
      answer: 1,
      explain: [
        "Wrong — consistent pricing is normal.",
        "Correct — anomalies vs benchmarks, risky corridors, inconsistent patterns signal TBML.",
        "Wrong — size isn't the indicator.",
        "Wrong — all transport modes are used.",
      ],
    },
    {
      q: "TBML detection requires comparing:",
      options: ["Only balances", "Invoice prices vs market benchmarks and verifying trade documents", "Only names", "Only dates"],
      answer: 1,
      explain: [
        "Wrong — balances don't reveal manipulation.",
        "Correct — price benchmarking + document verification + commercial logic assessment.",
        "Wrong — names alone don't detect TBML.",
        "Wrong — timing is secondary.",
      ],
    },
    {
      q: "Correspondent banks' TBML exposure comes from:",
      options: ["Processing all trades", "Providing finance without visibility into underlying transactions", "No trade", "Domestic only"],
      answer: 1,
      explain: [
        "Wrong — correspondents don't see underlying trades.",
        "Correct — nested relationships mean limited visibility into each transaction's legitimacy.",
        "Wrong — trade flows through correspondent networks.",
        "Wrong — cross-border trade inherently uses them.",
      ],
    },
    {
      q: "TBML response should include:",
      options: ["Process anyway", "Escalate, consider freezing, file SAR/STR, document thoroughly", "Ignore", "Warn only"],
      answer: 1,
      explain: [
        "Wrong — processing suspected TBML breaches compliance.",
        "Correct — escalate, freeze if needed, report, preserve evidence.",
        "Wrong — complexity requires investigation.",
        "Wrong — reporting obligations apply.",
      ],
    },
  ],
};
