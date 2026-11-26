// Guided case-file simulations — the Eagle-style workflow:
// evidence → follow the trail → decide → record rationale → escalate.

export interface CaseStep {
  kind: "evidence" | "decision" | "trail" | "note";
  title: string;
  body: string;
  /** decision steps only */
  choices?: { label: string; correct: boolean; feedback: string }[];
}

export interface CaseSim {
  slug: string;
  title: string;
  course: string; // course slug this sim trains
  domain: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  blurb: string;
  steps: CaseStep[];
  outcome: {
    filed: string;
    rationale: string;
  };
}

export const CASE_SIMS: CaseSim[] = [
  {
    slug: "structuring-ring",
    title: "The Structuring Ring",
    course: "kyc-cdd-tm-analyst",
    domain: "Transaction monitoring",
    difficulty: 4,
    blurb: "Nine sub-threshold deposits, one beneficiary, one question: coincidence or construction?",
    steps: [
      {
        kind: "evidence",
        title: "Alert fires — velocity × structuring",
        body: "TM alert: customer 'Nova Retail' made 9 cash deposits totalling $87,300 over 12 days. Every deposit is $8,900–$9,900 — all below the $10,000 CTR line. No prior cash activity in 3 years of history.",
      },
      {
        kind: "trail",
        title: "Follow the money",
        body: "Within 48h of the last deposit, the full balance wires to a single beneficiary: 'Logistics Plus LLC' — a first-time counterparty in a FATF grey-list jurisdiction. The wire is exactly $87,300. No fees, no splits.",
      },
      {
        kind: "evidence",
        title: "Customer profile",
        body: "Nova Retail is a registered sole trader, declared revenue ~$4k/month. KYC is clean. The owner is cooperative but vague: 'big inventory purchase, paid in cash because the supplier only takes cash.'",
      },
      {
        kind: "decision",
        title: "Do you file?",
        body: "You have: structuring pattern, implausible cash explanation, immediate full-balance outward wire, grey-list beneficiary. What's the correct disposition?",
        choices: [
          { label: "Close — amounts are small and CTRs aren't required under $10k", correct: false, feedback: "CTR thresholds don't define suspicion. Nine engineered deposits is structuring by definition." },
          { label: "SAR — structuring + immediate outward wire meets the suspicion standard", correct: true, feedback: "Correct. The pattern, the explanation gap and the instant consolidation all point the same way." },
          { label: "EDD only — ask for supplier invoice first", correct: false, feedback: "You can do both — but the SAR clock runs on suspicion, not on completing EDD. File now, enrich later." },
          { label: "CTR — file currency reports retroactively", correct: false, feedback: "Each deposit was under threshold so no CTR obligation arose — but the structuring is itself the reportable conduct." },
        ],
      },
      {
        kind: "note",
        title: "Narrative draft",
        body: "Your SAR narrative writes itself: 9 deposits of $8,900–$9,900 (aggregate $87,300) inconsistent with declared revenue; full balance wired within 48h to first-time beneficiary in a FATF grey-list jurisdiction; customer explanation uncorroborated.",
      },
      {
        kind: "decision",
        title: "Escalate or close?",
        body: "SAR drafted. Do you also exit the relationship?",
        choices: [
          { label: "File SAR and continue monitoring — one case isn't a pattern yet", correct: false, feedback: "A first confirmed structuring SAR usually warrants at minimum enhanced monitoring; exit depends on risk appetite and corroboration." },
          { label: "File SAR, apply enhanced monitoring, refer to MLRO for exit decision", correct: true, feedback: "Correct — the analyst files the facts; the MLRO owns the relationship decision. Document both." },
          { label: "File SAR and close account immediately", correct: false, feedback: "Closing can look like tipping-off if done carelessly, and destroys future intelligence value. Escalate, don't improvise." },
          { label: "Don't file — too little evidence", correct: false, feedback: "The suspicion standard is 'knowing or suspecting' — you don't need proof of laundering to file." },
        ],
      },
    ],
    outcome: {
      filed: "SAR filed within 30 days (US) — subject, activity period, aggregate amount, counterparty, and the structuring arithmetic.",
      rationale: "Deposits engineered just below the CTR line + implausible source + immediate consolidation to a grey-list beneficiary = classic placement-then-layering. The SAR is the analyst's job; the exit decision belongs to the MLRO.",
    },
  },
  {
    slug: "sanctions-name-match",
    title: "The Name That Isn't",
    course: "sanctions-screening",
    domain: "Sanctions screening",
    difficulty: 5,
    blurb: "A 94% name match on the SDN list. Same name, different life — or the most expensive false positive you'll ever dismiss?",
    steps: [
      {
        kind: "evidence",
        title: "Screening hit — 94% match",
        body: "New corporate onboarding: 'Volkov Trading LLC' triggers a sanctions screening hit at 94% against 'Volkov, Dmitri' — an SDN-listed arms dealer. Your screening tool auto-escalates hits above 90%.",
      },
      {
        kind: "evidence",
        title: "Subject profile",
        body: "Volkov Trading LLC: incorporated in Delaware, beneficial owner 'Dmitri Volkov', DOB 14/03/1979, Ukrainian-Canadian dual national, prior career in agricultural commodities. Expected monthly flow: $200k.",
      },
      {
        kind: "trail",
        title: "Pull the SDN record",
        body: "The SDN entry: 'Volkov, Dmitri — DOB 02/11/1961, Russian national, addresses in Moscow and Cyprus, tied to defense exports.' Same surname, same first name — everything else differs.",
      },
      {
        kind: "decision",
        title: "True match or false positive?",
        body: "How do you disposition this hit?",
        choices: [
          { label: "True match — same name on SDN means blocked", correct: false, feedback: "Sanctions apply to identified persons/entities, not names. DOB, nationality and addresses all diverge — but you must document the analysis, not just dismiss." },
          { label: "False positive — document DOB/nationality/address divergence and clear with evidence", correct: true, feedback: "Correct. True-match analysis uses corroborating identifiers. Document everything — a dismissed hit without rationale is an examiner finding." },
          { label: "Freeze immediately pending investigation", correct: false, feedback: "Blocking a non-designated person on a name-only match is itself a compliance failure — over-compliance has real costs and legal exposure." },
          { label: "Escalate to OFAC for a determination", correct: false, feedback: "You have enough identifiers to resolve this internally — OFAC doesn't adjudicate your customer matches." },
        ],
      },
      {
        kind: "note",
        title: "What could have changed the answer",
        body: "If the DOB had been missing, or the customer had refused to provide it, the hit could NOT be cleared on name divergence alone — the missing identifier becomes the risk. PEP/adverse-media screening and SoW corroboration still apply to the actual customer.",
      },
      {
        kind: "decision",
        title: "Onboarding decision",
        body: "Match cleared as false positive. Proceed?",
        choices: [
          { label: "Standard onboarding — false positive means no risk", correct: false, feedback: "A cleared sanctions hit removes one risk — it says nothing about the customer's business risk. CDD/EDD still applies." },
          { label: "Onboard with standard CDD + adverse-media/PEP screening + document the false-positive rationale", correct: true, feedback: "Correct — each control answers a different question. Document the dismissal so the next reviewer doesn't re-litigate it." },
          { label: "Decline — the optics are bad", correct: false, feedback: "Over-declining on documented false positives is de-risking by another name — regulators frown on it too." },
          { label: "Onboard but flag for annual EDD forever", correct: false, feedback: "Unwarranted perpetual EDD wastes resources; risk rating should follow actual risk, not screening history." },
        ],
      },
    ],
    outcome: {
      filed: "No SAR — no suspicious activity. Screening disposition documented: false positive on divergent DOB, nationality and addresses.",
      rationale: "True-match analysis requires corroborating identifiers, not name similarity. The 94% score measured string similarity; the investigation measured identity. Document both the match and the dismissal.",
    },
  },
  {
    slug: "tbml-invoice",
    title: "The Over-Invoiced Container",
    course: "trade-based-laundering",
    domain: "Trade-based ML",
    difficulty: 4,
    blurb: "$480k for 'textiles' that market data says are worth $200k. The paperwork is perfect. That's the problem.",
    steps: [
      {
        kind: "evidence",
        title: "LC presentation",
        body: "Your trade-finance customer presents documents for a $480,000 letter of credit: 'men's cotton garments' to a buyer in a high-risk jurisdiction. Invoice, B/L and insurance cert all appear compliant.",
      },
      {
        kind: "trail",
        title: "Run the numbers",
        body: "Trade data shows comparable garments trade at $195k–$210k for this volume/route. The invoice is ~2.3× market. The freight forwarder on the B/L was incorporated 6 weeks ago. Payment routes via a third-country bank unrelated to the buyer.",
      },
      {
        kind: "evidence",
        title: "Customer history",
        body: "Your customer has 4 years of clean LC history — but their average invoice is $90k, and this is their first shipment to this buyer/jurisdiction. The buyer was introduced by 'a partner' last month.",
      },
      {
        kind: "decision",
        title: "Honour the documents?",
        body: "Documents comply with the LC terms. The red flags are in the commercial substance. What's the move?",
        choices: [
          { label: "Pay — documents comply, compliance is about paperwork", correct: false, feedback: "Strict documentary compliance is exactly what TBML exploits — the fraud lives between the documents and the economics." },
          { label: "Hold payment, request independent verification of goods/value/end-user, SAR on the over-invoicing pattern", correct: true, feedback: "Correct. Over-invoicing at 2.3× market + new forwarder + payment rerouting is a TBML cluster — verify independently and report." },
          { label: "Pay half, hold half pending clarification", correct: false, feedback: "Splitting payment doesn't fix the underlying issue — the full proceeds may be tainted; partial payment can still be facilitating." },
          { label: "Reject documents on a technicality", correct: false, feedback: "Inventing documentary discrepancies to avoid the real issue is worse — it hides the TBML signal from the FIU." },
        ],
      },
      {
        kind: "note",
        title: "Why over-invoicing matters",
        body: "Over-invoicing moves the *difference* — $270k here — as apparently legitimate trade payment. It's how sanctioned actors, criminals and tax evaders convert illicit value into 'export revenue'. The invoice is the laundering instrument.",
      },
      {
        kind: "decision",
        title: "Aftermath",
        body: "Verification reveals the 'garments' were never manufactured — the container held scrap. The buyer is a shell. Your customer claims they were also deceived. Now what?",
        choices: [
          { label: "Close file — customer was deceived too", correct: false, feedback: "Victim status doesn't end the SAR obligation — the attempted TBML transaction itself is reportable." },
          { label: "SAR documenting the attempted over-invoicing + exit the customer + preserve all trade documents", correct: true, feedback: "Correct. Attempted laundering is reportable; the document trail is your evidence package." },
          { label: "SAR but keep the customer — they were fooled", correct: false, feedback: "If the customer plausibly didn't know, that's an MLRO judgment — but the relationship risk is now documented either way." },
          { label: "No SAR — nothing was paid", correct: false, feedback: "Attempted TBML still meets the reporting standard — the scheme was detected before completion, which is the system working." },
        ],
      },
    ],
    outcome: {
      filed: "SAR on attempted TBML — over-invoiced invoice, fictitious goods, new forwarder, payment rerouting. Trade documents preserved for examiner review.",
      rationale: "TBML hides in the gap between documentary compliance and economic reality. Market-price verification is the control that sees it.",
    },
  },
  {
    slug: "crypto-peel-chain",
    title: "The Peel Chain Delivery",
    course: "virtual-asset-compliance",
    domain: "Virtual assets",
    difficulty: 5,
    blurb: "Funds arrive from a mixer via nine hops of peeling. The customer says 'trading profits'. The chain says otherwise.",
    steps: [
      {
        kind: "evidence",
        title: "On-chain alert",
        body: "Blockchain analytics flags incoming funds to your customer's deposit address: origin traces to a known mixer, then through a peel chain — 9 hops, each forwarding ~85% onward — before consolidating at the customer's address over 3 days.",
      },
      {
        kind: "trail",
        title: "Read the pattern",
        body: "Peel chains exist to break deterministic tracing — each hop sends most funds forward and retains a small 'peel' amount. The 85% ratio and hop timing are characteristic of automated peeling services, not organic trading.",
      },
      {
        kind: "evidence",
        title: "Customer explanation",
        body: "Customer (KYC'd 2 months ago, IT consultant) claims the funds are 'profits from a DeFi yield farm I joined'. Cannot name the protocol, provide wallet screenshots, or explain the 9-hop structure. Expected monthly income on KYC: $8k. Deposit: $140k.",
      },
      {
        kind: "decision",
        title: "SAR or exculpate?",
        body: "On-chain evidence says mixer-sourced. Customer explanation is uncorroborated. Disposition?",
        choices: [
          { label: "No SAR — crypto is pseudonymous, can't prove illicit origin", correct: false, feedback: "The standard is suspicion, not proof. Mixer provenance + peel-chain structuring + implausible explanation = reportable." },
          { label: "SAR — mixer provenance, automated peeling and uncorroborated source-of-funds claim", correct: true, feedback: "Correct. On-chain evidence IS evidence — the SAR documents what the chain shows and what the customer claimed." },
          { label: "Decline the deposit silently", correct: false, feedback: "Refusing without reporting wastes the intelligence — the mixer→peel→exchange path is exactly what FIUs map." },
          { label: "Ask the customer for proof first, then decide", correct: false, feedback: "You can request info AND file — but suspicion already exists; waiting for perfect proof is how laundering completes." },
        ],
      },
      {
        kind: "note",
        title: "The Travel Rule angle",
        body: "The customer's counterparty hops mostly occur below Travel Rule thresholds — but TR thresholds govern data exchange, not suspicion. The chain-level pattern is the story the SAR tells.",
      },
      {
        kind: "decision",
        title: "Relationship decision",
        body: "SAR filed. The customer wants to withdraw the full $140k to self-hosted wallets. Do you allow it?",
        choices: [
          { label: "Allow — it's their crypto once converted", correct: false, feedback: "Allowing withdrawal of suspected-laundering proceeds compounds the problem — consider restraining pending MLRO/legal guidance." },
          { label: "Restraining review by MLRO/legal — possible SAR 'continuing activity' obligations if funds keep moving", correct: true, feedback: "Correct. Post-SAR fund movements may need to be reported as continuing activity — get guidance before releasing." },
          { label: "Allow but flag the withdrawal addresses", correct: false, feedback: "Flagging without restraining lets tainted funds exit — the decision needs MLRO involvement, not just a note." },
          { label: "Freeze permanently", correct: false, feedback: "Permanent freeze without legal process is unlawful restraint — escalate properly." },
        ],
      },
    ],
    outcome: {
      filed: "SAR on suspected laundering — mixer origin, peel-chain layering, uncorroborated source of funds. Withdrawal held for MLRO review.",
      rationale: "In crypto investigations the chain is the witness. Peeling patterns are automation signatures; customer narratives must corroborate or the gap itself is evidence.",
    },
  },
  {
    slug: "pep-nominee",
    title: "The Son's New Account",
    course: "kyc-cdd-tm-analyst",
    domain: "PEP & corruption",
    difficulty: 4,
    blurb: "A PEP's adult son opens an account two weeks after dad's was declined. Same address. Different name. Coincidence?",
    steps: [
      {
        kind: "evidence",
        title: "Application flagged",
        body: "New account: 'Daniel Mercer', 24, 'music producer'. Screening shows no PEP hit. But your onboarding data shows the residential address matches a declined PEP application from 2 weeks ago — 'Marcus Mercer', former deputy minister.",
      },
      {
        kind: "trail",
        title: "Connect the dots",
        body: "Address is a large family home. Daniel's declared employer is 'Mercer Holdings' — the same family conglomerate. Expected flow: $150k/month 'production income'. The PEP's EDD was declined for uncorroborated source of wealth.",
      },
      {
        kind: "evidence",
        title: "The declined file",
        body: "Marcus Mercer's file: PEP status (former, 18 months post-office), declared wealth $40m 'family business', refused to provide ownership docs, adverse media on corruption investigations in his home country. Declined — not exited, since he was never onboarded.",
      },
      {
        kind: "decision",
        title: "Is Daniel a nominee?",
        body: "No direct PEP link in screening. Shared address, shared employer, timing. What's your read?",
        choices: [
          { label: "No link — screening is clean, onboard normally", correct: false, feedback: "Screening matches names, not networks. The contextual cluster — address, employer, timing — is the nominee signature." },
          { label: "Presumptive nominee — decline and SAR on suspected PEP proxy onboarding", correct: true, feedback: "Correct. When a declined high-risk PEP's family member mirrors the profile, treat as nominee attempt until proven otherwise." },
          { label: "EDD Daniel and decide later", correct: false, feedback: "EDD gathers facts, but the nominee presumption may already meet SAR threshold — file and EDD in parallel." },
          { label: "Just decline — no report needed", correct: false, feedback: "A nominee onboarding attempt for a corruption-exposed PEP is exactly what SARs exist for." },
        ],
      },
      {
        kind: "note",
        title: "The RCA logic",
        body: "PEP rules extend to close associates and family members — not because of guilt by relation, but because corrupt PEPs route assets through family. The son's 'music production' income claim needs the same SoW/SoF scrutiny the father's failed.",
      },
      {
        kind: "decision",
        title: "Dispositive action",
        body: "You decline Daniel's application. What completes the file?",
        choices: [
          { label: "Decline only — nothing proceeds, nothing to report", correct: false, feedback: "The attempt itself is the intelligence — FIUs track nominee networks precisely through declined-then-reapplied patterns." },
          { label: "Decline + SAR documenting the nominee pattern + link to the declined PEP file", correct: true, feedback: "Correct. The SAR connects Daniel's attempt to Marcus's declined file — that's network intelligence, not just a declined application." },
          { label: "Decline + watch for future applications", correct: false, feedback: "Passive watching misses the point — the SAR is what lets the FIU connect this to the broader Mercer network." },
          { label: "Approve with restrictions", correct: false, feedback: "Restrictions don't fix a nominee presumption — the account shouldn't exist in this form." },
        ],
      },
    ],
    outcome: {
      filed: "SAR on suspected nominee onboarding — declined PEP's family member mirroring profile at shared address/employer within 2 weeks.",
      rationale: "PEP scrutiny exists because corrupt officials use family as cutouts. Screening names won't catch this — the address, employer and timing cluster is the detection.",
    },
  },
  {
    slug: "trade-misinvoice",
    title: "The Invoice Mill",
    course: "trade-based-laundering",
    domain: "TBML & trade",
    difficulty: 5,
    blurb: "Forty consulting invoices a month, one mailbox, one registration agent. Beautiful invoices. Zero substance.",
    steps: [
      {
        kind: "evidence",
        title: "Payment pattern alert",
        body: "Your corporate customer paid 40 overseas 'consultants' last month — $800–$1,200 each, all on the same day, all by wire. Total: $38k/month, consistent for 6 months. Customer is a domestic logistics firm with $200k/month revenue.",
      },
      {
        kind: "trail",
        title: "Entity resolution",
        body: "All 40 consultants share one registered agent and one mailbox address in a secrecy jurisdiction. None have websites, staff, or verifiable business activity. Each 'consultant' was incorporated within the same 90-day window.",
      },
      {
        kind: "evidence",
        title: "Business rationale check",
        body: "Customer claims 'fractional expert network for surge projects'. No contracts produced. No deliverables described. The logistics firm's margins don't support $456k/year in consulting spend — that's 23% of revenue.",
      },
      {
        kind: "decision",
        title: "What's really happening?",
        body: "The pattern is consistent and formulaic. Your assessment?",
        choices: [
          { label: "Legitimate outsourcing — small invoices are below scrutiny", correct: false, feedback: "40 identical-structure payments to shells is the opposite of below scrutiny — it's an invoice mill at scale." },
          { label: "Invoice mill layering — SAR, freeze pending review, preserve entity-resolution evidence", correct: true, feedback: "Correct. Micro-invoices to shell consultants is TBML/service-invoicing layering — the aggregation is the scheme." },
          { label: "EDD the customer, no report yet", correct: false, feedback: "The pattern is already suspicious — EDD can run alongside the SAR, not instead of it." },
          { label: "Report the consultants to their jurisdiction", correct: false, feedback: "Your obligation runs to your FIU — foreign shell reporting isn't your channel." },
        ],
      },
      {
        kind: "note",
        title: "Why mills work",
        body: "Each invoice is small enough to look routine; the volume creates the laundering. $456k/year of 'consulting' converts unexplained value into deductible business expense — the customer may be the victim OR the architect. The SAR covers the pattern; intent is for investigators.",
      },
      {
        kind: "decision",
        title: "Customer cooperation",
        body: "When questioned, the customer's CFO produces retroactively 'created' contracts — all dated last week, all identical template, all naming the same 5 consultants (not the 40 paid). What now?",
        choices: [
          { label: "Accept — they produced documents", correct: false, feedback: "Backdated identical contracts are evidence of cover-up, not cooperation — the mismatch between paid consultants and contracted ones proves it." },
          { label: "SAR addendum documenting the fabricated documentation + exit review", correct: true, feedback: "Correct. Superseding SAR detail strengthens the filing — fabricated docs post-alert is consciousness-of-guilt evidence." },
          { label: "Ignore — they tried, that's something", correct: false, feedback: "Fabricated evidence after an alert is aggravating, not mitigating." },
          { label: "File SAR only on the original pattern", correct: false, feedback: "The new evidence belongs in the file — update the SAR narrative with the document fabrication." },
        ],
      },
    ],
    outcome: {
      filed: "SAR on invoice-mill layering — 40 shell consultants, shared infrastructure, fabricated post-alert documentation.",
      rationale: "TBML's quietest form: thousands of plausible micro-payments that aggregate into serious value movement. Aggregation is the detection — never assess the invoice, assess the pattern.",
    },
  },
  {
    slug: "grandparent-scam",
    title: "The Grandparent Scam",
    course: "fraud-prevention",
    domain: "Authorized push payment fraud",
    difficulty: 3,
    blurb: "A distressed customer wires £42,000 to a 'grandson's lawyer' — and swears it's legitimate. Is it?",
    steps: [
      {
        kind: "evidence",
        title: "The wire",
        body: "Customer, age 78, walks into a branch with a pre-filled transfer form: £42,000 to 'Hargreaves & Sons Solicitors', reference 'urgent family matter'. She is calm but insistent. The beneficiary account was opened 9 days ago.",
      },
      {
        kind: "evidence",
        title: "The red flags",
        body: "The solicitor firm has no web presence, no SRA registration match, and its account received £310k in 11 days from 23 different elderly customers — every transfer tagged 'legal fees'. This is a mule solicitor account, a classic APP fraud convergence point.",
      },
      {
        kind: "note",
        title: "Why she can't see it",
        body: "The scammer coached her for weeks: 'your grandson was arrested, bail needs £42k, don't tell anyone or the deal collapses.' APP fraud is authorized — she genuinely believes it. Your job isn't to convince her; it's to slow the money and protect her.",
      },
      {
        kind: "decision",
        title: "Branch response",
        body: "The transfer hasn't been sent yet. What's the correct first action?",
        choices: [
          { label: "Process it — she has capacity and confirmed three times", correct: false, feedback: "Capacity to consent isn't the issue — inducement voids consent. And the firm is unregistered; the payment is going to criminals." },
          { label: "Pause the transfer, verify the firm independently, raise an APP fraud alert", correct: true, feedback: "Correct. Delay + verification is the last intervention point before the money is gone." },
          { label: "Refuse outright and report her for suspicious activity", correct: false, feedback: "She's the victim, not the suspect. Refusing without engaging wastes the recovery window." },
          { label: "Process it but flag for SAR review later", correct: false, feedback: "Once sent, recovery odds collapse — APP refunds depend on speed. Act now." },
        ],
      },
      {
        kind: "decision",
        title: "After the pause",
        body: "Verification fails — no such firm. She's distressed and the 'grandson' calls mid-conversation. Do you proceed?",
        choices: [
          { label: "Proceed — she confirmed again on the phone", correct: false, feedback: "The caller is the scammer. A second confirmation from a coached victim is not evidence." },
          { label: "Cancel, file the fraud report, refer to the firm's MLRO + law enforcement", correct: true, feedback: "Correct. Cancel the payment, document the mule account, report to Action Fraud/NCA — the beneficiary account is now intelligence." },
          { label: "Let her decide — it's her money", correct: false, feedback: "Firms have a duty to prevent APP fraud; 'customer insisted' is not a defence when red flags are this dense." },
          { label: "Transfer to a different account 'to be safe'", correct: false, feedback: "Don't improvise — cancel and escalate through the proper fraud channel." },
        ],
      },
    ],
    outcome: {
      filed: "APP fraud report + SAR on the beneficiary mule account (23 victims, £310k in 11 days).",
      rationale: "The analyst's skill is recognising convergence: one mule account collecting 'legal fees' from dozens of elderly customers is infrastructure, not a coincidence. Catch it at the branch, before the wire leaves.",
    },
  },
  {
    slug: "mule-network",
    title: "The Mule With Two Phones",
    course: "fraud-prevention",
    domain: "Money mule networks",
    difficulty: 4,
    blurb: "One customer, 200 small incoming transfers, money out within hours. What's he actually doing?",
    steps: [
      {
        kind: "evidence",
        title: "Pattern on the account",
        body: "TM flags customer 'Dev K.' — 187 incoming Faster Payments totalling £94,200 in 30 days from 160+ distinct senders, mostly £300–£800 each. Funds leave within 2–4 hours, typically to 2–3 crypto on-ramps.",
      },
      {
        kind: "evidence",
        title: "What Dev says",
        body: "He's a student who 'helps people move money for a small fee'. He shows two phones: one personal, one 'for work'. On the work phone, a chat thread of payment instructions — sender name, exact amount, destination — arriving minutes before each transfer.",
      },
      {
        kind: "note",
        title: "The typology",
        body: "This is a money mule — knowingly or not — inside a fraud distribution network. The 'fee' is usually a few percent; the senders are APP fraud victims. Dev may be coerced, deceived, or complicit — the account pattern is identical.",
      },
      {
        kind: "decision",
        title: "Disposition",
        body: "What do you do with Dev's account?",
        choices: [
          { label: "Close the account — he's obviously complicit", correct: false, feedback: "Closure assumes guilt you can't prove. He may be a coerced student — the 'work phone' pattern is used on vulnerable people too." },
          { label: "SAR + enhanced monitoring + preserve the instruction chat as evidence", correct: true, feedback: "Correct. The account is laundering infrastructure regardless of Dev's intent — file on the activity, let investigators sort out culpability." },
          { label: "No SAR — he's a victim too", correct: false, feedback: "Mule accounts ARE the laundering mechanism. The SAR covers the activity; victim status doesn't exempt the filing." },
          { label: "Ask Dev to stop and keep the account open", correct: false, feedback: "Keeping a live mule account benefits the network. Restrict and escalate." },
        ],
      },
      {
        kind: "decision",
        title: "The bigger picture",
        body: "Entity resolution shows Dev's forwarding destinations match 3 other flagged accounts. What does that tell you?",
        choices: [
          { label: "Coincidence — small numbers overlap", correct: false, feedback: "Shared on-ramp destinations across 'independent' mules is network topology, not coincidence." },
          { label: "A mule network converging on shared cash-out points — escalate as a cluster, not 4 cases", correct: true, feedback: "Correct. Entity resolution turns single alerts into network intelligence — one SAR covering the cluster beats four isolated filings." },
          { label: "Dev is innocent — networks can't be proven", correct: false, feedback: "You're not proving intent — you're documenting a laundering pattern for investigators." },
          { label: "Close all 4 accounts immediately", correct: false, feedback: "Same error at scale — restrict, preserve evidence, file one cluster SAR." },
        ],
      },
    ],
    outcome: {
      filed: "Cluster SAR — mule network, shared crypto off-ramps, instruction-chat evidence preserved.",
      rationale: "Mule detection is pattern-first: fan-in from many victims, rapid fan-out to cash-out, network convergence via shared destinations. The person matters less than the topology.",
    },
  },
  {
    slug: "charity-front",
    title: "The Charity That Isn't",
    course: "counter-terrorist-financing",
    domain: "NPO abuse",
    difficulty: 4,
    blurb: "A registered charity collects cash donations and wires them to a 'partner NGO' in a conflict zone. Where's the problem?",
    steps: [
      {
        kind: "evidence",
        title: "The account",
        body: "'Hope Relief Foundation' — registered charity, 14 months old. Receives ~£60k/month in cash deposits at a single branch, always just under CTR thresholds, always same two depositors. Wires 90% out monthly to 'MedAid Partners' in a FATF grey-list jurisdiction.",
      },
      {
        kind: "evidence",
        title: "The paper trail",
        body: "No website, no staff listing, registered address is a mailbox service. The 'partner NGO' has no web presence either. Cash donation envelopes are pre-numbered — donations appear staged, not organic.",
      },
      {
        kind: "note",
        title: "Why NPOs attract abuse",
        body: "Charities are trusted, lightly scrutinised, and cash-friendly — ideal for placing and consolidating funds. FATF Recommendation 8 requires NPO-specific protections; abuse doesn't require the charity to be fake, only its finances to be.",
      },
      {
        kind: "decision",
        title: "Initial assessment",
        body: "The charity is a customer in good standing — donations are legal income. What's the right response?",
        choices: [
          { label: "Nothing — donations are legal and charities are protected", correct: false, feedback: "Legal income isn't the question — the question is whether the money reaches its stated purpose." },
          { label: "EDD on the charity: governance, beneficiaries, partner verification", correct: true, feedback: "Correct. NPO risk assessment asks: who controls it, where does money go, can you verify the partner?" },
          { label: "Close the account — obviously a front", correct: false, feedback: "You can't prove front status yet — and closing a registered charity without evidence creates its own problems." },
          { label: "Report to the charity regulator only", correct: false, feedback: "Regulator referral may be right, but YOUR obligation to your FIU runs independently — don't outsource the decision." },
        ],
      },
      {
        kind: "decision",
        title: "The partner question",
        body: "EDD reveals 'MedAid Partners' shares a director with Hope Relief — the 'partner' is a shell owned by the charity's own founder. Funds are commingled; no project documentation exists. Now what?",
        choices: [
          { label: "SAR — self-dealing charity + staged cash + grey-list corridor is TF/ML pattern", correct: true, feedback: "Correct. Founder-controlled 'partner', unverifiable beneficiaries, staged donations — this is abuse infrastructure, whether or not a terrorist group is named." },
          { label: "Watch for another quarter — give them time to comply", correct: false, feedback: "The pattern is already established; delay lets the corridor keep moving." },
          { label: "Freeze and let police sort it out", correct: false, feedback: "You file intelligence; freezing without legal authority is beyond your role — escalate to MLRO." },
          { label: "Accept a 'we're investigating internally' letter", correct: false, feedback: "Internal letters don't change the money flows — the SAR documents what the account actually does." },
        ],
      },
    ],
    outcome: {
      filed: "SAR — NPO abuse pattern: staged cash collection, founder self-dealing via shell partner, grey-list corridor transfers.",
      rationale: "CTF through NPOs doesn't look like terrorism — it looks like a badly-run charity. The detection skill is asking whether money reaches beneficiaries, not whether the paperwork is in order.",
    },
  },
  {
    slug: "trafficking-remittance",
    title: "The Remittance That Isn't Family",
    course: "financial-intelligence-trafficking",
    domain: "Human trafficking indicators",
    difficulty: 5,
    blurb: "Weekly remittances to one corridor, senders who can't explain the recipients. Coincidence — or a network?",
    steps: [
      {
        kind: "evidence",
        title: "Cluster alert",
        body: "FinCEN-style analysis flags 14 accounts sending regular remittances (£200–£500 weekly) to recipients in a known trafficking corridor. Senders are young women, many recently opened accounts, several sharing registered addresses.",
      },
      {
        kind: "evidence",
        title: "What the senders say",
        body: "Interviews (where obtainable) are scripted and near-identical: 'sending money home to my mother.' But recipient names don't match — some recipients are men, some are the same person across 'different families'. Two senders gave the same mother's maiden name.",
      },
      {
        kind: "note",
        title: "Why this matters",
        body: "Trafficking victims' earnings are often controlled by traffickers who remit them out — the 'family' story is cover. Shared addresses + scripted stories + mismatched recipients = possible coercion infrastructure, not 14 independent families.",
      },
      {
        kind: "decision",
        title: "The senders may be victims",
        body: "If these women are trafficking victims, what's the correct compliance posture?",
        choices: [
          { label: "SAR immediately on all 14 — the pattern is clear", correct: true, feedback: "Correct — SAR covers the activity. Victim status affects enforcement response, not your reporting duty." },
          { label: "Don't file — they're victims, reporting could endanger them", correct: false, feedback: "Your FIU shares trafficking intelligence with victim-protection channels; non-reporting hides the network." },
          { label: "Close the accounts to protect them", correct: false, feedback: "Closing may cut their only link to help — and destroys evidence. Report, refer to victim services." },
          { label: "Wait for more evidence — one cluster isn't enough", correct: false, feedback: "Scripted stories + shared addresses + mismatched recipients IS the evidence pattern." },
        ],
      },
      {
        kind: "decision",
        title: "The recipient side",
        body: "Two recipients received from 5+ 'different families' — £3,800/month total, withdrawn as cash within hours. Likely what?",
        choices: [
          { label: "A busy family member — plausible innocent explanation", correct: false, feedback: "Five unrelated 'families' sending to one person is aggregation, not family." },
          { label: "Aggregation point — the trafficker collecting victim remittances", correct: true, feedback: "Correct. Cash-out within hours + multi-source inflow = collection layer. SARs on both ends link the network." },
          { label: "Charity collecting donations", correct: false, feedback: "No charity would receive 'family remittances' from unrelated young women." },
          { label: "Ignore — recipient side is another FIU's problem", correct: false, feedback: "Cross-border networks need both ends documented — your SAR is the input that lets theirs connect." },
        ],
      },
    ],
    outcome: {
      filed: "SARs on senders + aggregation-point recipients — possible trafficking remittance network.",
      rationale: "FIHT detection is contextual: the transactions look like ordinary remittances. The signal is in the stories not matching the topology — scripted narratives, shared addresses, cash-out speed.",
    },
  },
  {
    slug: "unhosted-wallet",
    title: "The Unhosted Wallet",
    course: "virtual-asset-compliance",
    domain: "Travel Rule & unhosted wallets",
    difficulty: 4,
    blurb: "Customer wants to send 12 BTC to a wallet with no VASP behind it. Do you let it go?",
    steps: [
      {
        kind: "evidence",
        title: "The request",
        body: "Verified customer requests withdrawal of 12 BTC (~$840k) to a self-hosted wallet address. Enhanced due diligence already done — source of funds is documented trading profits. No counterparty VASP exists to request Travel Rule data from.",
      },
      {
        kind: "evidence",
        title: "The wallet",
        body: "On-chain analysis: the address has received funds from 3 mixers and 1 sanctioned exchange cluster. It has never sent to a known exchange. First deposit was 6 weeks ago — same week the customer opened their account.",
      },
      {
        kind: "note",
        title: "The regulatory reality",
        body: "Unhosted wallets sit in a Travel Rule gap — there's no VASP to verify the counterparty. FATF and most regulators require enhanced scrutiny: verify ownership/control where possible, assess ML/TF risk, and you may still have to decline or file.",
      },
      {
        kind: "decision",
        title: "Can you process it?",
        body: "Source of funds is documented, customer is verified — what's the blocker?",
        choices: [
          { label: "Nothing — Travel Rule only applies VASP-to-VASP", correct: false, feedback: "The gap doesn't remove your ML/TF obligations — a mixer-tainted destination with no accountable party is a risk finding, not a loophole." },
          { label: "EDD the wallet: ownership proof, purpose, risk assessment — then decide", correct: true, feedback: "Correct. Unhosted ≠ prohibited, but you must be able to answer 'who controls this and why does it matter?'" },
          { label: "Auto-block all unhosted wallets", correct: false, feedback: "Blanket bans fail legitimate users — self-custody is legal. Risk-based, not absolute." },
          { label: "Process it and file SAR 'just in case'", correct: false, feedback: "SAR needs actual suspicion — 'just in case' isn't a standard. Do the EDD first." },
        ],
      },
      {
        kind: "decision",
        title: "The EDD result",
        body: "Customer can't prove wallet ownership — 'a friend set it up for me'. The address received mixer funds AFTER the customer's account opened. What's your call?",
        choices: [
          { label: "Proceed — SoF documentation covers it", correct: false, feedback: "SoF covers the BTC's origin, not the destination's risk — and 'a friend' can't explain mixer inflows." },
          { label: "Decline the withdrawal + SAR — unexplained third-party control of a mixer-linked destination", correct: true, feedback: "Correct. You can't verify control, the destination is tainted, and the timing is wrong. Decline, document, file." },
          { label: "Ask for a second wallet instead", correct: false, feedback: "Destination-shopping doesn't fix the control problem — and looks like evasion." },
          { label: "Escalate to compliance for a one-off approval", correct: false, feedback: "Escalation is fine, but the facts (no control proof + mixer + timing) don't support approval." },
        ],
      },
    ],
    outcome: {
      filed: "SAR — attempted withdrawal to mixer-linked unhosted wallet with unverifiable third-party control.",
      rationale: "The Travel Rule gap is a risk-assessment problem, not a free pass. When you can't establish who controls the destination and the chain shows mixer inflows, 'compliant processing' isn't an option.",
    },
  },
  {
    slug: "shell-kyb",
    title: "The Corporate Customer With No Paper Trail",
    course: "kyc-cdd-tm-analyst",
    domain: "KYB & beneficial ownership",
    difficulty: 4,
    blurb: "A 'consulting LLC' wants a business account. The registry shows 4 layers of holding companies and zero humans. How deep do you dig?",
    steps: [
      {
        kind: "evidence",
        title: "The application",
        body: "'Meridian Global Consulting LLC' applies for a business account expecting $2M/month flows. Registry extract: incorporated 3 weeks ago in a secrecy jurisdiction, sole activity 'management consulting'. No website, no employees listed, registered agent is a formation mill.",
      },
      {
        kind: "evidence",
        title: "The ownership chain",
        body: "Shareholder: 'Harbour Holdings Ltd' (Panama). Its shareholder: 'Blue Crest Trust' (Cook Islands). The trust's protector and beneficiary are both listed as 'the Trustee' — a corporate service provider. No natural person appears anywhere in the structure.",
      },
      {
        kind: "note",
        title: "Why this fails KYB",
        body: "CDD/KYB requires identifying the beneficial owner — the natural person who ultimately owns or controls. A structure engineered so no human is visible isn't 'complex', it's designed to defeat identification. Expect high-risk jurisdiction + no operating history + no verifiable business = decline or EDD that can't complete.",
      },
      {
        kind: "decision",
        title: "What's the correct outcome?",
        body: "The customer provides the registry documents — they're all genuine, all properly filed. Do you have enough to onboard?",
        choices: [
          { label: "Yes — documents are authentic, that's what KYB requires", correct: false, feedback: "Authentic documents describing an opaque structure still fail the beneficial-ownership requirement." },
          { label: "No — no natural-person UBO can be identified; decline or require restructuring", correct: true, feedback: "Correct. When the structure exists to hide ownership, EDD can't cure it — decline and document why." },
          { label: "Onboard with 'high risk' rating and monitor", correct: false, feedback: "You can't rate a risk you can't identify — no UBO means no risk rating is possible." },
          { label: "Accept a 'declaration of beneficial ownership' form", correct: false, feedback: "A self-declaration naming 'the Trustee' isn't a natural person — it's the same opacity with a signature." },
        ],
      },
      {
        kind: "decision",
        title: "Post-decline",
        body: "Customer resubmits with a 'UBO declaration' naming a nominee director in Estonia who 'controls' everything. Registry shows the nominee signs for 40 companies. Accept?",
        choices: [
          { label: "Accept — a named person is a UBO", correct: false, feedback: "A nominee signing for 40 companies isn't a beneficial owner — they're a cut-out. Beneficial ownership means economic interest/control, not a signature." },
          { label: "Decline — nominee chains don't satisfy UBO; document and consider SAR if deception was deliberate", correct: true, feedback: "Correct. The pattern (layers + nominee + secrecy jurisdictions + no operating business) may itself be suspicious enough to report." },
          { label: "Split the difference — onboard with $10k limits", correct: false, feedback: "Limits don't fix unidentified ownership — they just cap the exposure while the risk remains." },
          { label: "Ask for the nominee's source of wealth", correct: false, feedback: "The nominee's wealth is irrelevant — the question is who actually owns Meridian." },
        ],
      },
    ],
    outcome: {
      filed: "Declined onboarding — no identifiable natural-person UBO; SAR considered given deliberate opacity pattern.",
      rationale: "KYB isn't paperwork collection — it's answering 'who actually owns this?' When every layer is designed to prevent that answer, the correct outcome is refusal, not creative onboarding.",
    },
  },
  {
    slug: "vessel-ownership",
    title: "The Ship That Isn't Who It Says",
    course: "sanctions-screening",
    domain: "Vessel screening & ownership",
    difficulty: 5,
    blurb: "A tanker delivers your customer's cargo. The registered owner is clean — but three layers down, the money leads somewhere sanctioned.",
    steps: [
      {
        kind: "evidence",
        title: "The transaction",
        body: "Customer (a commodities trader) pays $2.3M for a cargo shipment. Beneficiary: 'Pacific Star Shipping Ltd' — flag of convenience registry, clean on sanctions lists. Payment is for freight + cargo value.",
      },
      {
        kind: "evidence",
        title: "Ownership digging",
        body: "Registry shows owner: 'Oceanic Holdings SA' — clean. But payment records show Pacific Star's management company is 'Volga Maritime Services', a known sanctions-evasion facilitator. The vessel's AIS history shows it dark for 11 days near a sanctioned port.",
      },
      {
        kind: "note",
        title: "The 50% rule and beyond",
        body: "OFAC's 50% rule: entities owned 50%+ by sanctioned parties are blocked even if not listed. But modern evasion uses layered structures, flag changes and management-company cut-outs — the listed name is often the cleanest part of the chain.",
      },
      {
        kind: "decision",
        title: "Is this a match?",
        body: "Pacific Star isn't on any list. Its direct owner isn't sanctioned. What's the screening verdict?",
        choices: [
          { label: "Clear — not on the list, pay it", correct: false, feedback: "List-only screening misses ownership laundering. Management company + AIS gap + flag-of-convenience = investigate." },
          { label: "High-risk — escalate for ownership/control verification before payment", correct: true, feedback: "Correct. The question isn't 'is it listed' but 'who actually controls this vessel and the money'." },
          { label: "Block immediately — suspicious enough", correct: false, feedback: "You have indicators, not proof — escalate to get the ownership picture before deciding." },
          { label: "Pay and file SAR if it turns out bad", correct: false, feedback: "Payment to a potentially sanctioned-linked vessel can't be undone — resolve before releasing funds." },
        ],
      },
      {
        kind: "decision",
        title: "The smoking gun",
        body: "Deeper digging shows Oceanic Holdings' sole shareholder is a trust whose protector is an SDN-designated individual (a sanctioned Russian oligarch's associate). Under the 50% rule, is Pacific Star blocked?",
        choices: [
          { label: "No — the trust breaks the ownership chain", correct: false, feedback: "Trusts don't break chains — look through to the controller. A sanctioned protector + management facilitator + AIS gap = the vessel is a sanctions asset." },
          { label: "Yes — blocked ownership means blocked payments; freeze + SAR", correct: true, feedback: "Correct. The payment would benefit a sanctioned party through layered ownership — block, preserve evidence, file." },
          { label: "Ask the customer to confirm it's not sanctioned", correct: false, feedback: "Customer representations don't override your own ownership analysis." },
          { label: "Partial payment — 50% to be safe", correct: false, feedback: "There's no 'safe half' — the entire payment benefits the blocked structure." },
        ],
      },
    ],
    outcome: {
      filed: "Payment blocked + SAR — vessel payment to entity under sanctioned ownership via trust layer; AIS gap suggests sanctions-evasion routing.",
      rationale: "Modern sanctions screening is ownership archaeology: the list match is the start, not the end. Flags change, managers are cut-outs, and the real controller sits three layers down a trust.",
    },
  },
  {
    slug: "trade-diversion",
    title: "The Container That Changed Flags",
    course: "trade-based-laundering",
    domain: "Trade diversion & export control",
    difficulty: 4,
    blurb: "A shipment of 'agricultural equipment' transits a sanctioned jurisdiction overnight. Legally it left clean — where's the problem?",
    steps: [
      {
        kind: "evidence",
        title: "The shipment",
        body: "Customer exports 'precision agricultural machinery' worth $890k to a buyer in a neutral country. Documents: commercial invoice, packing list, certificate of origin — all clean. Route: origin → sanctioned-jurisdiction port → neutral destination, 36-hour transit.",
      },
      {
        kind: "evidence",
        title: "The cargo",
        body: "HS codes on the invoice say 'harvesting machinery'. But the freight forwarder's manifest lists 'dual-use electronic components' — a category requiring export licence for the transit state. The container seals were photographed broken at the transit port.",
      },
      {
        kind: "note",
        title: "Why transits matter",
        body: "Sanctions and export controls attach to goods AND routes. 'Made in clean country, sold to clean buyer' doesn't help if the cargo transits an embargoed port or contains controlled components — diversion is the oldest TBML trick.",
      },
      {
        kind: "decision",
        title: "Documentary assessment",
        body: "All your customer's documents are in order. The forwarder's manifest is the only flag. What's your move?",
        choices: [
          { label: "Process — customer's documents are clean, that's their responsibility", correct: false, feedback: "You finance the shipment — 'customer's paperwork' doesn't transfer your exposure when you hold the manifest." },
          { label: "Hold disbursement pending resolution of the manifest discrepancy", correct: true, feedback: "Correct. Conflicting cargo descriptions + broken seals + sanctioned transit = don't fund until resolved." },
          { label: "File SAR immediately — it's obviously diversion", correct: false, feedback: "You have indicators, not proof — hold funds, verify, then decide whether suspicion meets threshold." },
          { label: "Reduce the payment to cover 'risk'", correct: false, feedback: "Partial payment doesn't cure a controlled-goods problem — it just shares the liability." },
        ],
      },
      {
        kind: "decision",
        title: "What the customer says",
        body: "Customer claims the manifest is 'a clerical error' and produces an amended invoice — but the HS codes still show dual-use components, and the seal photos are timestamped before his 'correction'. Now what?",
        choices: [
          { label: "Accept — they corrected it, move on", correct: false, feedback: "Amended paperwork after a hold is a classic cover-up pattern — the codes didn't change because they can't." },
          { label: "SAR — falsified documentation + sanctions-transit attempt = reportable", correct: true, feedback: "Correct. Falsified docs post-escalation is consciousness-of-guilt — that's SAR-grade evidence." },
          { label: "Terminate relationship only, no report", correct: false, feedback: "Exiting doesn't discharge your reporting duty — the attempted diversion is the reportable conduct." },
          { label: "Report to the transit state's authorities", correct: false, feedback: "Your FIU channel covers your jurisdiction's obligations — foreign reporting is parallel, not instead." },
        ],
      },
    ],
    outcome: {
      filed: "SAR — trade diversion attempt via falsified HS codes + sanctioned-jurisdiction transit; disbursement held then cancelled.",
      rationale: "TBML and sanctions evasion converge at the document layer: clean invoices, dirty manifests, and paperwork that changes after you ask questions.",
    },
  },
];
