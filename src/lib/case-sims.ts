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
];
