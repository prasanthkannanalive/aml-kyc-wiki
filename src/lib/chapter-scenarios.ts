// One-line realistic scenario per chapter — rendered as an animated
// "scenario card" at the top of every chapter page. Key: `${courseSlug}/${num}`.

export const CHAPTER_SCENARIOS: Record<string, string> = {
  /* ---------------- KYC / CDD / TM ANALYST ---------------- */
  "kyc-cdd-tm-analyst/0.0":
    "It's your first week as a KYC analyst — a queue of onboarding files, a risk matrix on the wall, and a senior asking 'how risky is this customer, really?'",
  "kyc-cdd-tm-analyst/1.1":
    "A cash-intensive cash-and-carry applies for an account — the RBA says your controls should match the risk, but how do you actually score it?",
  "kyc-cdd-tm-analyst/1.2":
    "A customer from a high-risk jurisdiction wants trade-finance products through a mobile-only channel — geography, product and channel all push the rating up.",
  "kyc-cdd-tm-analyst/1.3":
    "A mid-risk corporate client triggers an adverse-media hit — does simplified CDD suffice, or does the event force a move to enhanced due diligence?",
  "kyc-cdd-tm-analyst/1.4":
    "A long-standing customer suddenly changes ownership, opens new products and increases wire volume — the lifecycle never really ends at onboarding.",
  "kyc-cdd-tm-analyst/1.5":
    "A customer onboarded three years ago now transacts ten times the original volume — periodic refresh says 'not yet', perpetual KYC says 'look now'.",
  "kyc-cdd-tm-analyst/1.6":
    "A 'low-risk' retail customer starts sending €40k wires weekly — an override is needed, but who signs it off and what evidence goes in the file?",
  "kyc-cdd-tm-analyst/2.1":
    "A passport scan and a selfie arrive for onboarding — is the document genuine, is the face live, and does the name match the registry record?",
  "kyc-cdd-tm-analyst/2.2":
    "A remote applicant verifies identity via a phone liveness check — no branch visit, no physical document. What can digital ID actually prove?",
  "kyc-cdd-tm-analyst/2.3":
    "A new director is listed as a 'domestic PEP' — a former junior minister. Domestic PEP rules tightened in 2024; does the file need EDD?",
  "kyc-cdd-tm-analyst/2.4":
    "A proposed signer is the brother-in-law of a serving foreign minister — RCAs sit in a grey zone between customer and PEP.",
  "kyc-cdd-tm-analyst/2.5":
    "A wealthy client claims £2M 'from investments' — source of funds is the wire itself; source of wealth is the decade of trading gains behind it.",
  "kyc-cdd-tm-analyst/2.6":
    "A foreign PEP wants a private-banking account — EDD means senior-management approval, source-of-wealth evidence and ongoing monitoring.",
  "kyc-cdd-tm-analyst/3.1":
    "A UK Ltd applies — Companies House shows two corporate shareholders and a filing history that doesn't match the claimed turnover.",
  "kyc-cdd-tm-analyst/3.2":
    "HoldCo A owns 60% of HoldCo B which owns 40% of the applicant — unwrapping three layers to find the natural person behind it all.",
  "kyc-cdd-tm-analyst/3.3":
    "A Jersey discretionary trust owns the applicant — beneficiaries are unnamed, protector is a law firm. Who is the beneficial owner?",
  "kyc-cdd-tm-analyst/3.4":
    "A Panamanian entity lists a nominee director and bearer shares — the registry tells you nothing about who actually controls it.",
  "kyc-cdd-tm-analyst/3.5":
    "Person X holds 20% directly and 10% through a subsidiary — direct vs indirect thresholds decide whether X is a UBO at all.",
  "kyc-cdd-tm-analyst/3.6":
    "After three registry pulls and a refused information request, the ownership chain dead-ends at a foundation — document it and escalate.",
  "kyc-cdd-tm-analyst/4.1":
    "A rule fires on 2% of transactions — 900 alerts a day, 95% false positives. Rule-based, behavioural or ML — which engine fits?",
  "kyc-cdd-tm-analyst/4.2":
    "Deposits of $9,400 land every Friday — the $10k CTR threshold is obvious; the tuning question is what else should trigger.",
  "kyc-cdd-tm-analyst/4.3":
    "Five tellers' accounts each receive exactly $9,500 in cash on the same day — classic smurfing pattern the rules should catch.",
  "kyc-cdd-tm-analyst/4.4":
    "Funds arrive from 30 accounts and leave within hours to a single beneficiary — a funnel account moving money too fast to hide.",
  "kyc-cdd-tm-analyst/4.5":
    "An invoice for 'consulting services' is 4x market rate from a sanctioned-adjacent jurisdiction — trade-based laundering hides in paperwork.",
  "kyc-cdd-tm-analyst/4.6":
    "The monitoring model was never tested against last year's laundering cases — coverage gaps mean real typologies slip through.",
  "kyc-cdd-tm-analyst/5.1":
    "An alert lands at 9:02 AM — pull the customer file, the transaction window, the KYC refresh date and prior dispositions before deciding.",
  "kyc-cdd-tm-analyst/5.2":
    "A company registered at a virtual-office address shares a phone number with 14 dissolved entities — OSINT connects the dots.",
  "kyc-cdd-tm-analyst/5.3":
    "Adverse media shows the customer's director was arrested for fraud — but the article is 8 years old and charges were dropped. Signal or noise?",
  "kyc-cdd-tm-analyst/5.4":
    "The counterparty's account received funds from 12 entities later sanctioned — network mapping reveals the hub the rules can't see.",
  "kyc-cdd-tm-analyst/5.5":
    "Investigators need the customer's source-of-wealth documents — the RFI must be specific enough to get usable evidence, not boilerplate.",
  "kyc-cdd-tm-analyst/5.6":
    "The case hinges on three screenshots and a wire confirmation — evidence must be preserved, timestamped and QA-reviewed.",
  "kyc-cdd-tm-analyst/6.1":
    "You have the facts — who, what, when, where, why, how — but the SAR narrative must say it in plain language an FIU analyst can act on.",
  "kyc-cdd-tm-analyst/6.2":
    "'Suspicious activity observed' tells the FIU nothing — a good narrative reads like a story: customer, pattern, red flags, your conclusion.",
  "kyc-cdd-tm-analyst/6.3":
    "Suspicion formed on a Friday — the US clock says 30 days, Singapore says 5 business days, Canada says 'practicable'. Jurisdiction changes everything.",
  "kyc-cdd-tm-analyst/6.4":
    "The customer calls asking why their wire is delayed — 'our team is reviewing your account' is tipping-off. What can you actually say?",
  "kyc-cdd-tm-analyst/6.5":
    "The SAR form has 40 fields — subject data, transaction details, narrative, supporting docs. E-filing rejects incomplete or malformed submissions.",
  "kyc-cdd-tm-analyst/6.6":
    "Law enforcement requests transaction records under a production order — what can be disclosed, to whom, and on what legal basis?",

  /* ---------------- SANCTIONS SCREENING ---------------- */
  "sanctions-screening/0.0":
    "A payment hits your queue flagged 'possible sanctions match' — before you can clear it, you need to know what sanctions even are.",
  "sanctions-screening/1.1":
    "A UN-listed terrorist financier's assets must be frozen — but what exactly does 'sanctioned' legally mean for a bank?",
  "sanctions-screening/1.2":
    "In the 1990s, sanctions meant trade embargoes on whole countries — today they're scalpel strikes on named individuals and vessels.",
  "sanctions-screening/1.3":
    "A regime is sanctioned for weapons proliferation — the goal is changing behaviour, but the tool is freezing the money that funds it.",
  "sanctions-screening/1.4":
    "Comprehensive embargoes hurt civilians more than regimes — targeted sanctions aim at the decision-makers and their enablers instead.",
  "sanctions-screening/1.5":
    "Sanctions evasion routes money through third countries — the cost isn't just compliance spend, it's driving business underground.",
  "sanctions-screening/2.1":
    "The UN Security Council lists a terrorist entity — every member state must implement it, but each writes its own domestic law.",
  "sanctions-screening/2.2":
    "OFAC issues a new designation on a Russian oligarch — US persons must comply instantly, but what about your bank in Frankfurt?",
  "sanctions-screening/2.3":
    "SDN, SSI, FSE, CAP, NS-MBS — five OFAC list families, each with different prohibitions. Which one did that name just hit?",
  "sanctions-screening/2.4":
    "A French bank processes a euro payment for a sanctioned person — no US nexus, no USD. Does US sanctions law even apply?",
  "sanctions-screening/2.5":
    "The EU and UK both sanction the same individual but maintain separate lists with different criteria — dual-listed or divergent?",
  "sanctions-screening/2.6":
    "US sanctions forbid dealing with Country X; Country X's own law forbids complying with US sanctions — whose rule wins?",
  "sanctions-screening/3.1":
    "A sanctioned entity's account shows a pending wire — asset freeze means no transactions, and 'making available' funds is itself an offence.",
  "sanctions-screening/3.2":
    "Country-wide sanctions ban most dealings with Iran — but humanitarian exemptions exist. Where's the line?",
  "sanctions-screening/3.3":
    "Sectoral sanctions target Russian banks' capital-market access — not a full freeze, but specific transactions are now prohibited.",
  "sanctions-screening/3.4":
    "A dual-use goods shipment to a sanctioned destination — export controls and financial sanctions overlap in the paperwork.",
  "sanctions-screening/3.5":
    "A sanctioned official's private jet is denied landing rights — travel bans and transport measures extend sanctions beyond banks.",
  "sanctions-screening/3.6":
    "A correspondent bank processes a SWIFT payment touching a sanctioned party — messaging data carries the screening burden.",
  "sanctions-screening/4.1":
    "A company is 49% owned by a sanctioned person — under the threshold, or does 'control' matter more than percentage?",
  "sanctions-screening/4.2":
    "OFAC's 50% Rule: entities owned ≥50% by sanctioned parties are treated as sanctioned themselves — even if unlisted.",
  "sanctions-screening/4.3":
    "The EU applies an 'ownership and control' test — a 30% stake with board control can still trigger the freeze.",
  "sanctions-screening/4.4":
    "The UK's test combines ownership thresholds with control factors — the same structure can be caught in London but not Frankfurt.",
  "sanctions-screening/4.5":
    "TopCo → HoldCo → Subsidiary → Target — walk the chain layer by layer to find where sanctioned ownership actually sits.",
  "sanctions-screening/4.6":
    "A discretionary trust holds the shares — beneficiaries unnamed, protector invisible. Screening can't see through what isn't declared.",
  "sanctions-screening/4.7":
    "A customer passes screening clean — but adverse media links them to a sanctioned network. Screening sees names, not relationships.",
  "sanctions-screening/5.1":
    "Your screening tool ingests OFAC, EU, UN and local lists — but a list updated yesterday isn't in last month's data feed.",
  "sanctions-screening/5.2":
    "'Mohammed Ali' matches 40 list entries — matching engines score on name, DOB, nationality and fuzzy variants.",
  "sanctions-screening/5.3":
    "'Al-Saud' vs 'Al Saud' vs 'Alsaud' — transliteration variants defeat naive exact-match screening.",
  "sanctions-screening/5.4":
    "Two individuals share a name — DOB, nationality, address and ID numbers break the tie that names can't.",
  "sanctions-screening/5.5":
    "Threshold at 80% catches everything — including every 'John Smith'. Tune the threshold or drown in false positives.",
  "sanctions-screening/5.6":
    "A sanctioned person uses a shell company and a nominee — no name ever appears on a list. Screening can't catch what it can't see.",
  "sanctions-screening/6.1":
    "Alert: 'Vladimir Putin' vs customer 'Voldemort Putin' — read the alert fields before assuming it's noise or signal.",
  "sanctions-screening/6.2":
    "Discount the individual: DOB differs by 20 years, nationality mismatches, no adverse media — document why it's a false positive.",
  "sanctions-screening/6.3":
    "Discount the entity: registry shows unrelated beneficial owners, no control links — but verify, don't assume.",
  "sanctions-screening/6.4":
    "The match is ambiguous — escalate to the sanctions team with your findings rather than clearing or blocking alone.",
  "sanctions-screening/6.5":
    "Your disposition says 'false positive' — but the rationale must show what you checked, or QA will bounce it back.",
  "sanctions-screening/6.6":
    "DOB, nationality and address all match — this is a true match. Freeze, don't tip off, and escalate immediately.",
  "sanctions-screening/7.1":
    "A tanker loads oil at a sanctioned port — vessels are the sanctions evasion highway, so they're screened like accounts.",
  "sanctions-screening/7.2":
    "The vessel's IMO number is static but its name changes — identity screening needs more than the name on the hull.",
  "sanctions-screening/7.3":
    "AIS goes dark for 6 hours mid-voyage — 'dark activity' near a sanctioned port is itself a red flag.",
  "sanctions-screening/7.4":
    "Ship-to-ship transfers at sea, flag hopping, renamed vessels — evasion techniques exploit every gap in tracking.",
  "sanctions-screening/7.5":
    "Russian oil sells at $70/barrel — the price cap only works if you can prove the price paid, not just the cargo.",
  "sanctions-screening/7.6":
    "A bill of lading names the vessel, the consignee and the bank — trade documents carry the screening trail.",

  /* ---------------- COUNTER-TERRORIST FINANCING ---------------- */
  "counter-terrorist-financing/0.0":
    "Your AML systems flag structuring and layering — but a £500 transfer to a 'charity' won't trigger any of them.",
  "counter-terrorist-financing/1.1":
    "Money laundering hides profit; terrorist financing hides intent — small amounts, legitimate-looking channels, urgent timelines.",
  "counter-terrorist-financing/1.2":
    "Terrorist funds come from donations, crime, state sponsors and businesses — often commingled with legitimate money.",
  "counter-terrorist-financing/1.3":
    "The 9/11 attacks cost ~$500k — tiny amounts move through normal banking. Scale-based AML misses them entirely.",
  "counter-terrorist-financing/1.4":
    "A structured monitoring system catches smurfing — but a donor giving £200/month to a front charity looks perfectly normal.",
  "counter-terrorist-financing/2.1":
    "FATF Recommendation 8 targets non-profit abuse — charities are exploited for their legitimacy, not their size.",
  "counter-terrorist-financing/2.2":
    "UNSCR 1373 requires states to criminalise terrorist financing — but each country implements it differently.",
  "counter-terrorist-financing/2.3":
    "A listed entity's funds must be frozen 'without delay' — but what counts as delay when the bank's systems take 48 hours?",
  "counter-terrorist-financing/2.4":
    "A charity's funds are diverted to a terrorist group — donor intent was legitimate, but the money ended up financing attacks.",
  "counter-terrorist-financing/3.1":
    "A suspect wires money through a normal bank account — formal channels offer speed and legitimacy that informal systems can't.",
  "counter-terrorist-financing/3.2":
    "Hawala transfers money without moving it — a broker in Dubai pays a recipient in Somalia based on trust, not records.",
  "counter-terrorist-financing/3.3":
    "A courier carries €50k in cash across three borders — bulk cash smuggling bypasses every digital monitoring system.",
  "counter-terrorist-financing/3.4":
    "Crowdfunding platforms and crypto wallets move small amounts at scale — trade and virtual assets offer anonymity.",
  "counter-terrorist-financing/4.1":
    "A customer sends small amounts to multiple recipients weekly — no single transaction breaches a threshold, but the pattern matters.",
  "counter-terrorist-financing/4.2":
    "Account opened with minimal documentation, rapid transactions, no economic purpose — behavioural indicators beat amount thresholds.",
  "counter-terrorist-financing/4.3":
    "Twelve accounts share a device, IP and beneficiary pattern — the 'small cell' of a funding network is invisible account-by-account.",
  "counter-terrorist-financing/4.4":
    "Indicators flag suspicious patterns — but they can't prove intent, and legitimate donors can look identical to facilitators.",
  "counter-terrorist-financing/5.1":
    "A customer matches a sanctions list AND shows TF indicators — CFT screening and AML monitoring converge at the same alert.",
  "counter-terrorist-financing/5.2":
    "Suspicion of TF must be reported — but the bar is different: intent matters more than amount, and 'without delay' may apply.",
  "counter-terrorist-financing/5.3":
    "A compliance officer mentions 'we reported them' to a colleague — even casual tipping-off can compromise an investigation.",
  "counter-terrorist-financing/5.4":
    "A bank exits a whole customer segment to avoid TF risk — de-risking protects the bank but pushes money into unmonitored channels.",

  /* ---------------- FRAUD PREVENTION ---------------- */
  "fraud-prevention/0.0":
    "Your bank loses £2M to fraud this year — but is it organized crime, a rogue employee, or a customer who authorized the payment themselves?",
  "fraud-prevention/1.1":
    "A customer authorizes a £30k payment to a 'supplier' — the payment is genuine, the supplier is fake. Is that fraud?",
  "fraud-prevention/1.2":
    "A CFO is pressured by a fake CEO email to pay an invoice — pressure, opportunity and rationalization: the fraud triangle in action.",
  "fraud-prevention/1.3":
    "Fraud losses hit £190 billion globally — but the real number is unknowable because most fraud is never reported.",
  "fraud-prevention/1.4":
    "Fraud sits across three lines — operations prevent it, risk assesses it, audit verifies the controls actually work.",
  "fraud-prevention/1.5":
    "A fraud starts with a phishing email, moves through account takeover, ends in money laundering — the lifecycle has stages.",
  "fraud-prevention/2.1":
    "The board says 'fraud is everyone's problem' — but without a named owner and budget, tone alone prevents nothing.",
  "fraud-prevention/2.2":
    "Your fraud risk assessment says APP scams are the biggest threat — but the control budget still sits in card fraud.",
  "fraud-prevention/2.3":
    "Prevention stops fraud before it happens; detection catches it after — most institutions over-invest in detection.",
  "fraud-prevention/2.4":
    "Fraud losses are up 15% — but alert volumes are up 40%. More alerts aren't more detection; they're more noise.",
  "fraud-prevention/2.5":
    "First line owns the controls, second line challenges them, third line audits — who actually owns fraud risk?",
  "fraud-prevention/2.6":
    "A company fails to prevent fraud — 'we had controls' isn't a defence if the controls were inadequate or ignored.",
  "fraud-prevention/3.1":
    "A customer gets a call from 'their bank' asking to move money to a safe account — the classic APP scam.",
  "fraud-prevention/3.2":
    "A customer's credentials are stolen via phishing — the fraudster logs in and changes the payee details before the real payment.",
  "fraud-prevention/3.3":
    "A student's account receives £500 from an unknown sender, then transfers it out — mule accounts are the recruitment pipeline.",
  "fraud-prevention/3.4":
    "A card-not-present transaction from a new device in a new country — card fraud exploits the gap between authorization and delivery.",
  "fraud-prevention/3.5":
    "A fraudster applies for credit using a stolen identity — synthetic identities blend real and fake data to pass checks.",
  "fraud-prevention/3.6":
    "A fake CEO emails the CFO asking for an urgent payment — BEC exploits authority and urgency, not technical vulnerabilities.",
  "fraud-prevention/3.7":
    "A cheque is altered after deposit — deposit fraud exploits the gap between presentation and clearing.",
  "fraud-prevention/4.1":
    "An employee submits inflated expenses for two years — occupational fraud is the largest fraud category by value.",
  "fraud-prevention/4.2":
    "A vendor submits duplicate invoices — vendor fraud exploits weak approval controls and poor reconciliation.",
  "fraud-prevention/4.3":
    "A bank employee approves fraudulent loans for personal gain — insider fraud is the hardest to detect because they know the controls.",
  "fraud-prevention/4.4":
    "Your fraud controls depend on a third-party payment processor — outsourcing doesn't outsource the risk.",
  "fraud-prevention/4.5":
    "An employee notices irregularities but fears retaliation — a hotline with real protection is the cheapest control you have.",
  "fraud-prevention/5.1":
    "Fraud detection strategy starts with knowing your threat landscape — you can't detect what you haven't mapped.",
  "fraud-prevention/5.2":
    "Transactions at unusual times, new payees, velocity spikes — red flags are the raw material of detection rules.",
  "fraud-prevention/5.3":
    "A gradient-boosted model scores fraud risk in milliseconds — but only if the training data isn't poisoned by past fraud.",
  "fraud-prevention/5.4":
    "1,000 fraud alerts a day, 3 analysts — alert management is the bottleneck that determines whether detection works.",
  "fraud-prevention/5.5":
    "Device fingerprinting, behavioral biometrics, velocity checks — authentication signals build the fraud risk picture.",
  "fraud-prevention/5.6":
    "Your fraud model was trained on last year's fraud patterns — concept drift means it's already obsolete.",
  "fraud-prevention/6.1":
    "An alert fires on a suspicious transaction — the journey from alert to case involves triage, investigation and decision.",
  "fraud-prevention/6.2":
    "The investigator pulls transaction history, device data and customer contact records — evidence must be preserved before it's gone.",
  "fraud-prevention/6.3":
    "A customer calls to report fraud — how you handle that call determines whether they trust you enough to help recover funds.",
  "fraud-prevention/6.4":
    "The fraudster's account received the funds — recovery means freezing the mule account before the money moves again.",
  "fraud-prevention/6.5":
    "The case closes — but the fraud pattern should feed back into detection rules, training and customer warnings.",
  "fraud-prevention/6.6":
    "A major fraud hits the news — the post-incident review asks: what did we know, when did we know it, and why didn't we act?",
  "fraud-prevention/7.1":
    "A UK customer loses £50k to APP fraud — the PSR reimbursement rules say who pays: sender, receiving bank, or the customer.",
  "fraud-prevention/7.2":
    "The EU's PSD2 shifts liability for unauthorized payments — but authorized push payments sit in a grey zone.",
  "fraud-prevention/7.3":
    "US Regulation E covers unauthorized transfers but not authorized scams — the liability gap is a policy debate.",
  "fraud-prevention/7.4":
    "Other regimes take different approaches — some mandate reimbursement, others place the loss on the customer.",
  "fraud-prevention/7.5":
    "The UK reimburses APP fraud up to £85k; the EU has no blanket rule; the US leaves it to contract — compare the regimes.",
  "fraud-prevention/7.6":
    "A deepfake CFO video call authorizes a £25M payment — AI-enabled fraud is arriving faster than controls can adapt.",
  "fraud-prevention/7.7":
    "Your fraud programme covers detection, investigation and customer redress — but is it coherent, funded and owned?",

  /* ---------------- FINANCIAL INTELLIGENCE / TRAFFICKING ---------------- */
  "financial-intelligence-trafficking/0.0":
    "A compliance team learns trafficking funds move through their accounts — but the red flags look nothing like money laundering.",
  "financial-intelligence-trafficking/1.1":
    "Trafficking victims' earnings are laundered by traffickers — the crime is exploitation, but the financial trail is the detection path.",
  "financial-intelligence-trafficking/1.2":
    "Trafficking generates $150 billion annually — hotels, transport, advertising and recruitment all touch the financial system.",
  "financial-intelligence-trafficking/1.3":
    "A victim's wages go to a 'guardian' account — the financial system enables trafficking by processing the proceeds.",
  "financial-intelligence-trafficking/1.4":
    "Funds flow through fake job agencies, escort services and remittance corridors — typologies map the movement.",
  "financial-intelligence-trafficking/1.5":
    "UN Protocol, US TVPA, EU directives — the legal framework obliges institutions to detect and report trafficking-linked finance.",
  "financial-intelligence-trafficking/1.6":
    "Your transaction monitoring can flag trafficking patterns — but only if the data science team knows what to look for.",
  "financial-intelligence-trafficking/2.1":
    "A 'nanny' service deposits wages into accounts controlled by others — the financial behavior reveals exploitation.",
  "financial-intelligence-trafficking/2.2":
    "Multiple small deposits, shared devices, sudden account closures — banking red flags for trafficking are subtle.",
  "financial-intelligence-trafficking/2.3":
    "Crypto wallets and cross-border remittances move trafficking proceeds — virtual assets add a layer of anonymity.",
  "financial-intelligence-trafficking/2.4":
    "A case study: hotel payments, transport bookings and remittances traced back to a trafficking ring — patterns revealed the network.",
  "financial-intelligence-trafficking/2.5":
    "Suspicion of trafficking-linked finance must be reported — the STR narrative must connect the financial pattern to the crime.",
  "financial-intelligence-trafficking/2.6":
    "Banks, NGOs and law enforcement share trafficking indicators — public-private collaboration improves detection.",
  "financial-intelligence-trafficking/3.1":
    "The Palermo Protocol criminalizes trafficking — but financial institutions need to know what conduct triggers reporting.",
  "financial-intelligence-trafficking/3.2":
    "AML/CFT obligations extend to trafficking proceeds — suspicious activity reports can cover trafficking-linked finance.",
  "financial-intelligence-trafficking/3.3":
    "FIUs share trafficking intelligence across borders — a pattern in London may connect to a ring in Bangkok.",
  "financial-intelligence-trafficking/3.4":
    "Public-private partnerships share typologies and red flags — industry collaboration beats isolated detection.",
  "financial-intelligence-trafficking/3.5":
    "Sanctions on trafficking networks and trade compliance on exploitative goods — CFT and sanctions converge.",
  "financial-intelligence-trafficking/3.6":
    "Machine learning models trained on trafficking indicators — but the data is sparse and the labels are uncertain.",
  "financial-intelligence-trafficking/4.1":
    "Trafficking awareness is rising — but without governance, it's just a poster on the wall.",
  "financial-intelligence-trafficking/4.2":
    "Your control library needs trafficking-specific red flags — generic AML controls miss the exploitation signals.",
  "financial-intelligence-trafficking/4.3":
    "A 90-day playbook: assess risk, deploy controls, train staff, test detection — implementation roadmap.",
  "financial-intelligence-trafficking/4.4":
    "Front-line staff need role-based training — tellers see different signals than investigators.",
  "financial-intelligence-trafficking/4.5":
    "Regulators will ask for evidence — your trafficking controls need documentation, testing and audit trails.",
  "financial-intelligence-trafficking/4.6":
    "Metrics: alerts generated, cases confirmed, STRs filed — measure what matters, not just activity.",

  /* ---------------- KYC/CDD/TM already covered above ---------------- */
};
