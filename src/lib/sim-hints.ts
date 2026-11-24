// Hint text per simulation step — key: "<scenario-slug>/<step-id>"

export const simHints: Record<string, string> = {
  // ---- Your First Alert ----
  "first-alert/queue":
    "Think about which alert involves money moving right now versus something that can wait for review.",
  "first-alert/profile":
    "List every fact that would look suspicious to a regulator reading the file later — amounts, timing, parties.",
  "first-alert/kyc":
    "A name on file isn't the same as a verified owner. Ask: could this entity exist just to move money?",
  "first-alert/adverse":
    "Adverse media isn't only about the customer's own name — follow the money to the counterparty.",
  "first-alert/escalate":
    "When red flags converge, the analyst's job is clean documentation — not waiting for certainty.",
  "first-alert/sar":
    "A SAR answers: who, what, when, where, and WHY it's suspicious. Anything less gets returned by QA.",
  "first-alert/deadline":
    "US SAR: 30 calendar days from detection (60 if no subject). The clock starts at detection, not at filing decision.",
  "first-alert/confidential":
    "The existence of a SAR is itself confidential — you can neither confirm nor deny a report.",
  "first-alert/qa":
    "QA checks completeness and relevance — precise beats padded.",
  "first-alert/wrap":
    "Every case is a learning rep — pattern recognition is the core analyst skill.",

  // ---- Suspicious Onboarding ----
  "onboarding-risk/intake":
    "Risk rating follows verifiable facts, not paperwork quality. Look at structure, product and footprint.",
  "onboarding-risk/ubo":
    "A trust with no visible beneficiaries isn't ownership — it's opacity. Who actually owns this?",
  "onboarding-risk/edd":
    "EDD requires evidence that SUBSTANTIATES claims — 'investment returns' needs the investments, not just a statement.",
  "onboarding-risk/pep":
    "UK rule since Jan 2024: domestic PEPs are LOWER risk than foreign — but lower isn't none. 12+ months tail applies.",
  "onboarding-risk/decision":
    "When EDD can't resolve who owns it, where money comes from, or why the structure exists — decline is a compliance win.",
  "onboarding-risk/record":
    "The file must show WHY you declined — reasoning is the audit trail, not just the outcome.",
  "onboarding-risk/debrief":
    "Onboarding decisions shape tomorrow's alert queue — connect the lifecycle dots.",

  // ---- US ----
  "us-sar-filing/clock":
    "US SAR deadline runs from INITIAL DETECTION in calendar days — 30 normally, 60 without an identified subject.",
  "us-sar-filing/channel":
    "US files directly to FinCEN via BSA E-Filing — there's no consent step like the UK's DAML.",
  "us-sar-filing/confidential":
    "Under the BSA, even the EXISTENCE of a SAR is protected — never confirm or deny.",
  "us-sar-filing/continuing":
    "Suspicion continuing = new reporting obligation every 90 days while it lasts.",
  "us-sar-filing/ctr":
    "CTR is threshold-based (≥$10k cash, 15 days); SAR is suspicion-based (30 days). Separate obligations.",

  // ---- UK ----
  "uk-daml-filing/types":
    "UK has two instruments: a SAR reports suspicion; a no-consent request asks the NCA to decide on a specific transaction.",
  "uk-daml-filing/daml-clock":
    "NCA notice period = 7 WORKING days; moratorium max 31 days; silence past notice = deemed consent.",
  "uk-daml-filing/timing":
    "UK SARs are 'as soon as practicable' — no fixed day count, but delay must be justified.",
  "uk-daml-filing/tipping":
    "s.333 POCA makes tipping off a crime — even implying an NCA involvement can prejudice an investigation.",
  "uk-daml-filing/refusal":
    "Deemed consent only applies when the NCA is SILENT. An explicit refusal bars the transaction.",

  // ---- Canada ----
  "canada-fintrac/deadline":
    "Since June 2021, Canadian STRs are 'as soon as practicable' — the 30-day rule is outdated.",
  "canada-fintrac/property":
    "Terrorist property / listed-entity reports are due IMMEDIATELY — stricter than STR.",
  "canada-fintrac/lctr":
    "LCTR: ≥$10,000 CAD cash, aggregated over 24 hours, due within 15 calendar days.",
  "canada-fintrac/tipping":
    "Canada prohibits disclosing that an STR was made — neutral holding response only.",
  "canada-fintrac/record":
    "Canadian AML records: 5 years retention.",

  // ---- Australia ----
  "australia-austrac/deadline":
    "SMR = 3 business days; compresses to 24 hours for terrorism financing suspicion.",
  "australia-austrac/ttr":
    "TTR: physical currency ≥A$10k only — electronic transfers don't count. 10 business days.",
  "australia-austrac/channel":
    "All AUSTRAC reports go through AUSTRAC Online — and file even without an identified offender.",
  "australia-austrac/tipping":
    "Disclosing an SMR's existence is an offence under the AML/CTF Act.",
  "australia-austrac/no-id":
    "SMR obligation attaches to the SUSPICION, not to identifying a person — file anyway.",

  // ---- Singapore ----
  "singapore-stro/deadline":
    "MAS tightened STR filing to 5 business days after suspicion established (July 2025) — sanctions cases get 1 day.",
  "singapore-stro/sanctions":
    "Sanctioned parties and those acting for them: STR within 1 business day.",
  "singapore-stro/channel":
    "STRs go to STRO; the old automatic MAS duplicate copy was removed in 2025 — MAS gets copies only on request.",
  "singapore-stro/supplementary":
    "New suspicion = assess and file a supplementary STR on its own timeline — don't wait for review cycles.",
  "singapore-stro/tipping":
    "MAS notices prohibit tipping off — neutral responses only.",

  // ---- Hong Kong ----
  "hong-kong-jfiu/deadline":
    "'As soon as practicable' = days, not weeks — a Friday suspicion should file by early next week.",
  "hong-kong-jfiu/channel":
    "STREAMS 2 is mandatory for regulated entities — email/fax/post were discontinued.",
  "hong-kong-jfiu/threshold":
    "No minimum amount — a suspicious HK$1,500 transaction is as reportable as a large one.",
  "hong-kong-jfiu/penalty":
    "Non-reporting is a criminal offence: HK$50,000 fine + up to 3 months imprisonment.",
  "hong-kong-jfiu/tipping":
    "Cap. 615 is a specific tipping-off offence — even hints that prejudice an investigation count.",

  // ---- Japan ----
  "japan-jafic/deadline":
    "APTCP Art. 8 says 'promptly' — no fixed days, but delay itself is the violation.",
  "japan-jafic/channel":
    "Banks file to the FSA-designated centre; other specified operators file to JAFIC (NPA).",
  "japan-jafic/method":
    "FSA actively promotes e-Gov electronic filing — it's the direction of travel.",
  "japan-jafic/records":
    "APTCP record retention: 7 years.",
  "japan-jafic/tipping":
    "Japan prohibits tipping off on STRs — neutral holding responses only.",

  // ---- UAE ----
  "uae-goaml/deadline":
    "Article 18: 'immediately and without delay' via goAML — the strictest phrasing in the set.",
  "uae-goaml/penalty":
    "Failure to report immediately: AED 100,000–1,000,000 fine and/or imprisonment — criminal, personal.",
  "uae-goaml/privilege":
    "UAE explicitly exempts lawyers/notaries for information obtained under legal privilege — a designed carve-out.",
  "uae-goaml/channel":
    "goAML is the FIU's system — CBUAE supervises banks but doesn't receive STRs.",
  "uae-goaml/threshold":
    "'Regardless of their value' — no de minimis in UAE law.",

  // ---- EU ----
  "eu-filing/fragmented":
    "No EU-wide STR deadline — each member state's national law governs its FIU.",
  "eu-filing/channels":
    "Germany → goAML, France → TRACFIN, Netherlands → FIU-NL. National FIUs, national systems.",
  "eu-filing/amlr":
    "The 2024 package: AMLR = directly-applicable single rulebook; AMLA (Frankfurt) supervises high-risk entities — phased through 2027.",
  "eu-filing/tipping":
    "Tipping-off prohibitions exist in every member state — universal, not jurisdiction-dependent.",
  "eu-filing/which-fiu":
    "The reporting entity's establishment/member-state law drives the obligation — cross-border cases are entity-specific.",
};
