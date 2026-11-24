// Interactive module overviews — one entry per course module.
// Key: `${courseSlug}/${moduleNum}`. Powers the ModuleExplorer cards on
// course pages and the training player.

export interface ModuleOverview {
  summary: string;
  points: string[];
}

export const MODULE_OVERVIEWS: Record<string, ModuleOverview> = {
  /* ---------- fraud-prevention ---------- */
  "fraud-prevention/1": {
    summary:
      "What fraud actually is — how it differs from error and money laundering — the psychology and economics behind it, the scale of the problem, and where fraud risk sits inside a financial institution.",
    points: ["Fraud vs error vs financial crime", "The fraud triangle: pressure, opportunity, rationalisation", "Fraud lifecycle: temptation → concealment → conversion"],
  },
  "fraud-prevention/2": {
    summary:
      "How a bank actually runs its fraud defence: governance and tone from the top, enterprise fraud risk assessment, the preventive and detective control mix, measurement, and the three-lines ownership model.",
    points: ["Board accountability & fraud risk appetite", "Risk assessment methodology", "Preventive vs detective vs corrective controls", "Fraud metrics & control testing"],
  },
  "fraud-prevention/3": {
    summary:
      "The external fraud typologies that hit customers and banks hardest — authorised push payment scams, account takeover, money mules, card fraud, identity and application fraud, BEC and payment fraud.",
    points: ["APP scams & the reimbursement regime", "Account takeover & unauthorised payments", "Money mule networks", "BEC & vendor payment fraud"],
  },
  "fraud-prevention/4": {
    summary:
      "Fraud committed from inside the perimeter or through suppliers — occupational fraud schemes, insider abuse in banks, third-party and outsourcing risk, and the whistleblowing channels that surface it.",
    points: ["Occupational fraud taxonomy (ACFE)", "Insider fraud in regulated firms", "Third-party concentration risk", "Hotlines, tips & non-retaliation"],
  },
  "fraud-prevention/5": {
    summary:
      "How detection actually works: detection strategy, rules and red flags, statistical models and AI, alert queue management and tuning, device/behavioural signals, and the model-risk governance around it all.",
    points: ["Rule-based vs model-based detection", "Alert tuning & false-positive economics", "Behavioural biometrics & device intelligence", "SR 11-7 style model risk management"],
  },
  "fraud-prevention/6": {
    summary:
      "The operational half of fraud work — turning an alert into a case, investigation technique, handling the customer through it, recovering losses, regulatory reporting and feeding lessons back into controls.",
    points: ["Alert-to-case triage & evidence standards", "Customer vulnerability & complaints", "Asset recovery & chargeback windows", "Fraud reporting & typology feedback loops"],
  },
  "fraud-prevention/7": {
    summary:
      "Who pays when fraud succeeds — the UK PSR reimbursement rules, EU and US regimes, organisational liability, and how regtech, AI and open banking are reshaping the fraud landscape.",
    points: ["UK PSR APP fraud reimbursement (Oct 2024)", "PSD3 / EU fraud liability shifts", "Regtech, AI agents & deepfake defence"],
  },

  /* ---------- sanctions-screening ---------- */
  "sanctions-screening/1": {
    summary:
      "The foundations — what sanctions are, the legal instruments behind them (UN, OFAC, EU, UK, UN), why they exist, and how they differ from AML goals.",
    points: ["Sanctions vs AML — different legal bases", "UN, US, EU and UK regimes", "Primary vs secondary sanctions"],
  },
  "sanctions-screening/2": {
    summary:
      "The issuers — UN Security Council, OFAC, EU Council, UK OFSI and others — how each programme is structured, extraterritorial reach, and the difference between list types.",
    points: ["OFAC SDN vs consolidated lists", "EU & UK autonomous regimes", "Sectoral vs comprehensive programmes"],
  },
  "sanctions-screening/3": {
    summary:
      "The instruments — asset freezes, trade embargoes, arms controls, travel bans and financial restrictions — what each prohibits and what ' dealings' means in practice.",
    points: ["Asset freeze & prohibition on making funds available", "Embargoes, export controls, transport bans", "Dealing with listed parties indirectly"],
  },
  "sanctions-screening/4": {
    summary:
      "The hard part — the 50 percent rule, aggregation of ownership, control tests, nominees and trusts, and how to identify entities that are 'owned or controlled' by listed parties.",
    points: ["50% ownership aggregation rule", "Control vs ownership tests", "Nominees, trusts & circumvention typologies"],
  },
  "sanctions-screening/5": {
    summary:
      "The engine room — list sources and formats, name-matching algorithms (fuzzy, phonetic, AI), data quality problems, and building a screening stack that doesn't drown analysts in false positives.",
    points: ["SDN, consolidated & proprietary lists", "Fuzzy matching, transliteration & aliases", "False-positive economics & tuning"],
  },
  "sanctions-screening/6": {
    summary:
      "The human side — alert queues, true/false positive adjudication, escalation to MLRO, regulatory reporting of matches, and keeping audit-ready records.",
    points: ["Alert adjudication standards", "Escalation & MLRO sign-off", "OFAC/EU/UK reporting mechanics"],
  },
  "sanctions-screening/7": {
    summary:
      "The niche specialty — vessel screening, IMO numbers, ship-to-ship transfers, flag-state evasion and maritime typologies used to evade oil and goods sanctions.",
    points: ["IMO numbers & AIS tracking", "Ship-to-ship & dark-fleet typologies", "OFAC maritime advisories"],
  },

  /* ---------- counter-terrorist-financing ---------- */
  "counter-terrorist-financing/1": {
    summary:
      "What terrorist financing is — how it differs from money laundering, why the amounts are often tiny, and the legal framework built after 9/11.",
    points: ["TF vs ML — intent vs concealment", "Small-sum, high-volume typologies", "Post-9/11 legal architecture"],
  },
  "counter-terrorist-financing/2": {
    summary:
      "The international regime — UNSCR 1373 and the FATF special recommendations on terrorist financing, domestic implementations, and how NPOs became the focus.",
    points: ["UNSCR 1373 & FATF R.IV-IX", "NPO abuse & risk-based regulation", "Domestic CTF legislation"],
  },
  "counter-terrorist-financing/3": {
    summary:
      "The movement of funds — cash couriers, hawala/hundi, charities as fronts, social media fundraising, and how terrorist groups finance operations.",
    points: ["Cash smuggling & courier networks", "Hawala & informal value transfer", "Crowdfunding & crypto rails"],
  },
  "counter-terrorist-financing/4": {
    summary:
      "Finding the money — TF detection indicators, NPO red flags, transaction patterns that distinguish TF from ordinary giving, and investigative leads.",
    points: ["TF red flags vs charitable giving", "NPO monitoring approaches", "From lead to intelligence"],
  },
  "counter-terrorist-financing/5": {
    summary:
      "The response side — freezing orders, asset seizure, international cooperation, and the tension between security action and due process.",
    points: ["Asset freezing mechanics", "MLATs & intelligence sharing", "Human rights & due-process limits"],
  },

  /* ---------- financial-intelligence-trafficking ---------- */
  "financial-intelligence-trafficking/1": {
    summary:
      "The trafficking-finance nexus — how human trafficking generates and moves money, the role of financial intelligence in disrupting it, and the victim-centred approach.",
    points: ["Trafficking business model & revenue", "FIU role in anti-trafficking", "Victim identification via finance"],
  },
  "financial-intelligence-trafficking/2": {
    summary:
      "The red flags — financial indicators of trafficking operations: recruitment fees, remittance patterns, hotel and transport spend, debt bondage signals and control typologies.",
    points: ["Recruitment & 'debt' fee patterns", "Remittance & funnel-account typologies", "Front businesses & money laundering overlap"],
  },
  "financial-intelligence-trafficking/3": {
    summary:
      "The obligations — FATF standards on trafficking, domestic reporting duties, international cooperation mechanisms, and how financial institutions fit into the anti-trafficking architecture.",
    points: ["FATF guidance on trafficking", "SAR/STR reporting pathways", "Cross-border cooperation & victim protection"],
  },
  "financial-intelligence-trafficking/4": {
    summary:
      "The institutional playbook — building an anti-trafficking compliance programme: governance, risk assessment, detection rules, training and partnerships with NGOs and law enforcement.",
    points: ["Programme design for trafficking risk", "NGO & LE partnership models", "Staff training & escalation"],
  },

  /* ---------- kyc-cdd-tm-analyst ---------- */
  "kyc-cdd-tm-analyst/1": {
    summary:
      "The risk-based approach — why regulators demand proportionate controls, the customer lifecycle from onboarding to exit, and how risk rating drives every downstream decision.",
    points: ["RBA as the core AML principle", "Customer lifecycle stages", "Risk rating → control intensity mapping"],
  },
  "kyc-cdd-tm-analyst/2": {
    summary:
      "Individual customers — identity verification, CDD documentation, PEP identification and enhanced due diligence for higher-risk individuals.",
    points: ["ID verification & documentary evidence", "PEP definitions & EDD triggers", "Source of funds vs source of wealth"],
  },
  "kyc-cdd-tm-analyst/3": {
    summary:
      "Business customers — KYB onboarding, corporate structures, and the hunt for ultimate beneficial owners through layered entities, trusts and nominees.",
    points: ["KYB documentation & registry checks", "UBO thresholds & aggregation", "Trusts, nominees & control tests"],
  },
  "kyc-cdd-tm-analyst/4": {
    summary:
      "Transaction monitoring mechanics — how rules and models score activity, the typology catalogue from structuring to TBML, and why monitoring is only as good as its tuning.",
    points: ["Rules vs models in TM", "Core typologies: structuring, layering, TBML", "Threshold design & calibration"],
  },
  "kyc-cdd-tm-analyst/5": {
    summary:
      "Alert investigation — turning a monitoring hit into an evidence-based disposition: gathering data, building timelines, applying red flags and documenting defensible decisions.",
    points: ["Alert triage & prioritisation", "Evidence gathering & timelines", "Disposition standards & QA"],
  },
  "kyc-cdd-tm-analyst/6": {
    summary:
      "Reporting — SAR/STR narrative craft, what FIUs actually need, jurisdictional filing mechanics, deadlines, and the quality bar that keeps reports useful.",
    points: ["Narrative structure & 'who/what/when/where/why'", "Filing channels & deadlines", "Continuing & updated reports"],
  },

  /* ---------- virtual-asset-compliance ---------- */
  "virtual-asset-compliance/1": {
    summary:
      "The landscape — what virtual assets are, why crypto attracts crime, the FATF framework (R.15/16, VASP definition) and how MiCA, FinCEN and FCA regimes differ.",
    points: ["VA taxonomy: coins, tokens, stablecoins, NFTs", "FATF VASP definition & R.15/16", "Travel Rule origins & thresholds"],
  },
  "virtual-asset-compliance/2": {
    summary:
      "How value actually moves — keys and addresses, transaction anatomy, UTXO vs account models, and why the public ledger is simultaneously transparent and pseudonymous.",
    points: ["Public/private keys & addresses", "UTXO vs account-based chains", "Transparency ≠ traceability"],
  },
  "virtual-asset-compliance/3": {
    summary:
      "The analytics craft — clustering algorithms, attribution heuristics, exposure scoring, fiat off-ramps, and reconstructing a full money trail from raw transactions.",
    points: ["Address clustering techniques", "Exposure scoring & risk categories", "Case reconstruction walkthrough"],
  },
  "virtual-asset-compliance/4": {
    summary:
      "Running a VASP compliance programme — crypto CDD, Travel Rule implementation, on-chain monitoring rules, and filing SARs for virtual-asset activity.",
    points: ["VASP onboarding & wallet screening", "Travel Rule data exchange", "Crypto SAR/STR specifics"],
  },
  "virtual-asset-compliance/5": {
    summary:
      "The enforcement frontier — asset seizure and forfeiture, MLATs, typology catalogue (ransomware, pig-butchering, darknet, sanctions evasion) and the DeFi/unhosted-wallet challenge.",
    points: ["Seizure, forfeiture & recovery", "Major VA typologies", "DeFi & unhosted wallets — the frontier"],
  },

  /* ---------- trade-based-laundering ---------- */
  "trade-based-laundering/1": {
    summary:
      "Why trade is the perfect laundering channel — TBML fundamentals, the FATF/Egmont research base, and how the trade finance lifecycle creates the blind spots criminals exploit.",
    points: ["TBML vs TBML-adjacent trade fraud", "FATF/Egmont typology reports", "The documentary blind spot"],
  },
  "trade-based-laundering/2": {
    summary:
      "The techniques — over/under-invoicing, phantom shipments, multiple invoicing, misdescription, trade in services, commodities manipulation and free-trade-zone abuse.",
    points: ["Invoice price manipulation", "Phantom & multiple invoicing", "Services TBML & FTZs"],
  },
  "trade-based-laundering/3": {
    summary:
      "Finding it — documentary red flags, pricing anomalies vs market benchmarks, counterparty network analysis, and the monitoring rules that surface TBML in transaction data.",
    points: ["Documentary red-flag checklist", "Price benchmarking & outliers", "Network & counterparty analysis"],
  },
  "trade-based-laundering/4": {
    summary:
      "Bank exposure — the open-account blind spot, letter-of-credit fraud, escalation and reporting duties, and what a trade-finance AML control programme actually looks like.",
    points: ["Open account vs documentary credits", "LC fraud typologies", "FIU reporting for trade finance"],
  },
};
