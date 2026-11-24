// Job-simulation scenarios: a guided analyst shift with scored decisions.

export interface SimOption {
  label: string;
  correct?: boolean;
  partial?: boolean;
  feedback: string;
}

export interface SimStep {
  id: string;
  title: string;
  narrative: string;
  facts?: string[];
  options: SimOption[];
}

export interface Simulation {
  slug: string;
  title: string;
  role: string;
  tagline: string;
  level: "Junior" | "Associate" | "Senior";
  minutes: number;
  category: "shift" | "filing";
  steps: SimStep[];
}

export const simulations: Simulation[] = [
  {
    slug: "first-alert",
    title: "Your First Alert",
    role: "Junior AML Analyst — Day Shift",
    tagline: "A structuring alert lands on your queue at 9:02 AM. Work it like a real analyst would.",
    level: "Junior",
    minutes: 12,
    category: "shift",
    steps: [
      {
        id: "queue",
        title: "09:02 — The alert queue",
        narrative:
          "You log in. Three alerts are open: (A) a PEP name-match hit on a low-risk savings customer, (B) a structuring pattern on a 14-month-old business account, (C) a sanctions fuzzy-match on an international wire. Your team lead says: 'Work them in order of actual risk, not queue order.'",
        options: [
          {
            label: "Work A first — PEP hits are always highest priority",
            feedback:
              "Not quite. PEP status raises the risk rating, but a true sanctions match or active structuring carries more immediate ML/TF risk. Triage is about risk, not alphabet.",
          },
          {
            label: "Work B first — structuring is active, ongoing criminal activity",
            correct: true,
            feedback:
              "Correct. Active structuring means money is moving NOW. PEP and sanctions hits need resolution, but an in-progress layering scheme is time-sensitive — the funds may be gone before you finish the others.",
          },
          {
            label: "Work C first — sanctions matches are legally urgent",
            partial: true,
            feedback:
              "Partially right — true sanctions matches are urgent. But this is a fuzzy match needing investigation, while B shows a confirmed behavioural pattern. In practice you'd timebox the fuzzy match and work the confirmed pattern first.",
          },
        ],
      },
      {
        id: "profile",
        title: "09:20 — Pull the customer profile",
        narrative:
          "Alert B: 'QuickCash Solutions LLC'. Business account opened 14 months ago, claimed business: food-truck catering. Six cash deposits of $9,400–$9,800 over 4 days across three branches, each just under the $10,000 CTR threshold. All funds withdrawn same-day by wire to a Nevada shell LLC.",
        facts: [
          "Deposits made by three different individuals, each saying they deposit 'for a friend'",
          "No prior cash activity; business is 14 months old",
          "Same-day outbound wires to an opaque Nevada entity",
          "Customer could not explain the business purpose when phoned",
        ],
        options: [
          {
            label: "Document the red flags: structuring, third-party depositors, pass-through wires, unexplained profile",
            correct: true,
            feedback:
              "Exactly. In your alert narrative you'd list each red flag with dates and amounts — the SAR/STR narrative is built from these documented facts, not gut feel.",
          },
          {
            label: "Note 'possible structuring' and move to the next alert",
            feedback:
              "Too thin. 'Possible structuring' without the supporting facts won't survive QA review — and you haven't checked KYC freshness, adverse media, or ownership yet.",
          },
          {
            label: "Close as false positive — deposits are legal amounts",
            feedback:
              "Wrong. Each deposit is legal, but the PATTERN is the offence — six sub-threshold deposits by different people with same-day pass-through is textbook structuring. Legality of each transaction doesn't legitimise the scheme.",
          },
        ],
      },
      {
        id: "kyc",
        title: "09:45 — KYC refresh",
        narrative:
          "Before escalating, you refresh the KYC file. The beneficial owner listed is 'D. Marsh', a Nevada resident. Corporate registry shows QuickCash was incorporated 3 weeks before the account opened, using a registered-agent address.",
        options: [
          {
            label: "Flag it — newly formed entity, nominee-style registration, owner can't be verified",
            correct: true,
            feedback:
              "Right. The entity was essentially created to move money. Add 'recently incorporated shelf entity' and 'unverifiable beneficial owner' to your red-flag list — these strengthen the SAR narrative.",
          },
          {
            label: "KYC is fine — the owner is listed, so CDD is complete",
            feedback:
              "Listing a name isn't verification. CDD requires verifying the owner actually exists and controls the business — a registered-agent shell with an unreachable owner fails that test.",
          },
          {
            label: "Reject the customer outright without escalation",
            feedback:
              "Premature. Offboarding may be right eventually, but suspicious activity already occurred — the bank may still have a reporting obligation. Escalate first, let the MLRO decide disposition.",
          },
        ],
      },
      {
        id: "adverse",
        title: "10:15 — Open-source check",
        narrative:
          "You run an adverse-media/OSINT check on 'D. Marsh' and 'QuickCash Solutions'. No news hits on the names — but the Nevada shell LLC receiving the wires ('Vertex Pay LLC') was flagged in a 2024 FinCEN alert on trade-based money laundering.",
        options: [
          {
            label: "Record it — counterparty linked to a known ML typology; include in escalation",
            correct: true,
            feedback:
              "Good catch — that's what OSINT is for. The outbound counterparty being a known typology vehicle transforms 'suspicious pattern' into 'suspicious pattern with a documented laundering conduit'.",
          },
          {
            label: "Ignore it — no hits on the customer's own name",
            feedback:
              "Missed signal. Adverse media isn't just about the customer — counterparties matter. A wire destination flagged in a FinCEN alert is exactly the kind of connective tissue investigators look for.",
          },
        ],
      },
      {
        id: "escalate",
        title: "10:40 — Escalation decision",
        narrative:
          "Your investigation summary: structuring pattern, third-party depositors, same-day pass-through wires, unverifiable shell ownership, counterparty linked to a TBML alert. Time to escalate to the MLRO.",
        options: [
          {
            label: "Escalate with full documentation — recommend SAR/STR filing",
            correct: true,
            feedback:
              "Correct call. You have converging red flags meeting the suspicion threshold. The MLRO decides filing, but your job is to hand over clean, complete analysis.",
          },
          {
            label: "Keep monitoring for 30 more days to gather more evidence",
            feedback:
              "Risky. The money already moved — waiting lets the trail go cold. Suspicion threshold is met; 'more evidence' isn't required before escalating, and delay can itself be a compliance failure.",
          },
          {
            label: "Close the alert — you've done enough investigation",
            feedback:
              "No. The evidence points toward suspicion, not away from it. Closing now would be a disposition error — and potentially a willful blind-eye problem if it surfaces later.",
          },
        ],
      },
      {
        id: "sar",
        title: "14:00 — Drafting the SAR",
        narrative:
          "The MLRO agrees: file. You're drafting the narrative. What MUST it contain to survive QA?",
        options: [
          {
            label: "Who/what/when/where: parties, account activity, dates, amounts, red flags, and why it's suspicious",
            correct: true,
            feedback:
              "Right — a SAR narrative answers: who is involved, what happened, when, where the funds went, and WHY you suspect ML. Vague narratives get returned by FinCEN/UKFIU QA.",
          },
          {
            label: "A short note saying 'customer structured transactions'",
            feedback:
              "Too thin — that's a label, not a narrative. Investigators and QA need the facts: amounts, dates, pattern, counterparties, and your reasoning.",
          },
          {
            label: "Every detail including the customer's favourite colour",
            feedback:
              "Over-inclusive is also an error — SARs should contain relevant facts, not padding. Focused, factual, complete.",
          },
        ],
      },
      {
        id: "deadline",
        title: "14:30 — The clock starts",
        narrative:
          "The MLRO confirms filing. Your firm operates under US rules (SAR) — the detection date you recorded was Monday. Today is Thursday of the same week.",
        options: [
          {
            label: "File within 30 days of initial detection — calendar the deadline now",
            correct: true,
            feedback:
              "Correct — US SAR is due within 30 days of initial detection (60 if no subject identified). Continuing SARs follow every 90 days while activity continues. Deadlines are calendar days, and missed ones are exam findings.",
          },
          {
            label: "File 'as soon as practicable' whenever the team gets to it",
            feedback:
              "That's the UK SAR standard, not the US rule — and even in the UK, 'as soon as practicable' has DAML mechanics behind it. Know your jurisdiction's actual deadline.",
          },
          {
            label: "No deadline — file when the investigation closes",
            feedback:
              "Wrong — the deadline runs from detection, not from investigation completion. Investigations can take months; the SAR can't wait for a final answer.",
          },
        ],
      },
      {
        id: "confidential",
        title: "15:00 — Tipping-off check",
        narrative:
          "Before you file, the customer's relationship manager calls: 'Hey, QuickCash is asking why their wires were delayed. What do I tell them?'",
        options: [
          {
            label: "'We're conducting a routine review — I can't discuss account details.' Then document the contact.",
            correct: true,
            feedback:
              "Right — SAR confidentiality prohibits tipping off the subject. A neutral holding response plus documentation is the standard. The RM should also be reminded of the wall.",
          },
          {
            label: "Tell the RM it's a structuring investigation so they can manage the client",
            feedback:
              "That's tipping off — a criminal offence in both US and UK regimes. The customer could destroy evidence or move funds. Confidentiality is absolute here.",
          },
          {
            label: "Tell the customer directly so they're not surprised",
            feedback:
              "Worse — direct tipping off to the subject is exactly what the offence prohibits. Never confirm or deny a report exists.",
          },
        ],
      },
      {
        id: "qa",
        title: "16:30 — QA review",
        narrative:
          "QA reviews your SAR before filing. Your narrative included: alert rule fired, deposit pattern with exact amounts/dates, third-party depositors, KYC findings, OSINT hit on counterparty, escalation chain. QA signs off.",
        options: [
          {
            label: "File it — complete, factual, deadline met",
            correct: true,
            feedback:
              "That's a clean SAR lifecycle: detect → investigate → document → escalate → file → protect confidentiality. This is what the job actually looks like.",
          },
          {
            label: "Add more detail — more is always better",
            feedback:
              "Not necessarily — QA passed it because it was complete and relevant. Padding adds noise; good SARs are precise.",
          },
        ],
      },
      {
        id: "wrap",
        title: "17:00 — Debrief",
        narrative:
          "End of shift. Your team lead reviews your work: correct prioritisation, documented red flags, proper escalation, deadline tracked, confidentiality maintained. You handled your first alert like a professional.",
        options: [
          {
            label: "Ask what you'd do differently — and log the case study for your portfolio",
            correct: true,
            feedback:
              "That's the analyst mindset — every case teaches. Real AML careers are built on exactly this loop: alert → investigation → filing → review.",
          },
          {
            label: "Move on — alerts don't teach anything",
            feedback:
              "They do — pattern recognition is the core skill. Analysts who review their dispositions get better faster.",
          },
        ],
      },
    ],
  },
  {
    slug: "onboarding-risk",
    title: "The Suspicious Onboarding",
    role: "Associate AML Analyst — Client Onboarding",
    tagline: "A new corporate customer wants a trade-finance facility. The risk rating won't rate itself.",
    level: "Associate",
    minutes: 10,
    category: "shift",
    steps: [
      {
        id: "intake",
        title: "New application — Meridian Trading Ltd",
        narrative:
          "A UK-registered company applies for a £2M trade-finance facility. Declared business: 'import/export of electronic components'. Directors: two Lithuanian nationals. Requested products: correspondent trade finance + multi-currency accounts. No website, no premises, no employees listed.",
        options: [
          {
            label: "High inherent risk — shell-like profile, trade finance, opaque ownership, no verifiable operations",
            correct: true,
            feedback:
              "Correct first instinct. Trade finance + opaque entity + unverifiable operations is a classic TBML/high-risk profile. The risk rating starts high until evidence proves otherwise.",
          },
          {
            label: "Standard risk — it's a UK company, UK is low-risk",
            feedback:
              "Wrong — incorporation jurisdiction is only ONE risk factor. The entity profile (no employees, no premises, nominee-style structure) can outweigh a 'clean' country.",
          },
          {
            label: "Low risk — the application looks professional",
            feedback:
              "Professional paperwork proves nothing — shells are professionally made. Risk rating follows verifiable facts, not presentation.",
          },
        ],
      },
      {
        id: "ubo",
        title: "Ownership unwrapping",
        narrative:
          "Meridian's shareholder is 'Baltic Holdings OU' (Estonia). Its shareholder is 'Caspian Trust' — a discretionary trust with no listed beneficiaries. The trust deed names a protector in Dubai.",
        options: [
          {
            label: "EDD mandatory — UBO cannot be identified; trust layer + protector in higher-risk jurisdiction",
            correct: true,
            feedback:
              "Right — when ownership can't be unwrapped to a natural person, that's not a reason to relax, it's a reason to escalate. Unidentifiable UBO in a trust structure is a high-risk EDD trigger.",
          },
          {
            label: "Accept the trust deed — it names a protector, that's enough",
            feedback:
              "A protector isn't a beneficial owner — they control the trust, not own it. Beneficial ownership requires the natural persons who ultimately own/control. A protector in Dubai is a red flag, not a solution.",
          },
          {
            label: "Standard CDD is fine — trust structures are normal",
            feedback:
              "Normal ≠ low-risk. Trusts are legitimate, but an opaque discretionary trust with no visible beneficiaries in a trade-finance application needs EDD, not SDD.",
          },
        ],
      },
      {
        id: "edd",
        title: "Enhanced due diligence",
        narrative:
          "EDD requires: source of wealth for the controllers, source of funds for the facility, business rationale for the trade flows, and senior management approval. The customer provides: a bank statement showing €4M from 'investment returns' and a generic trade contract.",
        options: [
          {
            label: "Reject — 'investment returns' with no verifiable source is insufficient for a £2M facility",
            correct: true,
            feedback:
              "Defensible. EDD demands verifiable SoW/SoF — vague 'investment returns' plus a generic contract doesn't meet the bar for this risk profile. Declining high-risk business is a valid outcome.",
          },
          {
            label: "Accept — they provided documents, that's what EDD asks for",
            feedback:
              "Documents ≠ verification. EDD requires the documents to actually substantiate the claims — 'investment returns' needs evidence of the investments, not just a statement.",
          },
          {
            label: "Onboard with restrictions — small limits until trust is proven",
            partial: true,
            feedback:
              "Possible middle path — but only if the bank's policy allows onboarding unverified UBOs at all. For most regimes, an unidentifiable UBO in a high-risk product is a decline or committee decision, not a limit.",
          },
        ],
      },
      {
        id: "pep",
        title: "The PEP surprise",
        narrative:
          "While verifying directors, screening returns a hit: one Lithuanian director matches a PEP database — former deputy minister, left office 18 months ago. Domestic PEP under your UK-regulated entity's MLR obligations.",
        options: [
          {
            label: "Apply PEP measures — since Jan 2024 UK domestic PEPs are lower risk than foreign, but still need documented risk assessment + senior approval",
            correct: true,
            feedback:
              "Nuanced and correct. UK MLR reg 35 treats domestic PEPs as lower risk than foreign PEPs — but 'lower' isn't 'none'. You still document the assessment, apply proportionate EDD, and get senior sign-off.",
          },
          {
            label: "Ignore it — he's no longer in office",
            feedback:
              "PEP status continues at least 12 months after leaving office — and 18 months out, the risk-based tail may still apply. 'Former' doesn't mean 'clear'.",
          },
          {
            label: "Treat as foreign PEP — maximum EDD regardless",
            feedback:
              "Overkill and factually wrong — he's a Lithuanian national but the classification depends on the office held, not nationality. And UK rules specifically differentiate domestic vs foreign PEP risk since 2024.",
          },
        ],
      },
      {
        id: "decision",
        title: "The committee decision",
        narrative:
          "Your EDD package goes to the onboarding committee: opaque trust ownership, unverifiable SoW, PEP director, trade-finance product, no operating footprint. The customer is pressing for a decision this week.",
        options: [
          {
            label: "Recommend decline — risk cannot be mitigated to an acceptable level",
            correct: true,
            feedback:
              "The disciplined answer. When EDD can't resolve the risk questions — who owns it, where the money comes from, why the structure exists — the risk-based approach says don't onboard. A documented decline is a compliance success, not a lost sale.",
          },
          {
            label: "Onboard with enhanced monitoring — give the customer the benefit of the doubt",
            feedback:
              "Benefit of the doubt isn't a compliance standard. You couldn't verify UBO, SoW or business rationale — that's not residual risk, that's unidentified risk.",
          },
          {
            label: "Delay indefinitely — keep the file open but don't decide",
            feedback:
              "Indecision isn't a control. Files can't sit in limbo — the customer either meets the risk appetite or doesn't. Document the decision.",
          },
        ],
      },
      {
        id: "record",
        title: "Documentation",
        narrative:
          "The committee declines the application. What must you document to make this auditable?",
        options: [
          {
            label: "Full EDD findings, risk rating rationale, committee decision, and decline reason — all timestamped",
            correct: true,
            feedback:
              "Exactly — the file must show WHY you declined, not just THAT you did. Regulators and QA review declined applications too; the reasoning is the audit trail.",
          },
          {
            label: "Just mark 'declined' in the system",
            feedback:
              "A bare 'declined' flag is unauditable — six months later nobody can reconstruct why. Document the risk factors, the EDD gaps, and the decision rationale.",
          },
          {
            label: "Delete the file — declined customers shouldn't be kept",
            feedback:
              "Wrong — declined-application records must be retained per record-keeping rules. The file IS the evidence of a sound process.",
          },
        ],
      },
      {
        id: "debrief",
        title: "Debrief",
        narrative:
          "Your team lead reviews the file: clean risk assessment, proper EDD escalation, correct PEP analysis, well-documented decline. 'That's how you handle a high-risk onboarding — the decline IS the compliance win.'",
        options: [
          {
            label: "Note the pattern — opaque ownership + trade finance + PEP = future alert profile",
            correct: true,
            feedback:
              "That's systems thinking — the onboarding decision shapes tomorrow's alert queue. Analysts who connect the dots between onboarding and monitoring get promoted.",
          },
          {
            label: "Move on — onboarding is separate from monitoring",
            feedback:
              "They're the same system — bad onboarding creates future alerts; good onboarding prevents them. The lifecycle is continuous.",
          },
        ],
      },
    ],
  },

  /* ============ SAR/STR FILING SIMULATIONS — BY JURISDICTION ============ */

  {
    slug: "us-sar-filing",
    title: "File the SAR — United States",
    role: "BSA Officer — US Bank",
    tagline: "FinCEN rules: 30-day clock, BSA e-filing, no consent regime, absolute SAR confidentiality.",
    level: "Associate",
    minutes: 8,
    category: "filing",
    steps: [
      {
        id: "clock",
        title: "The 30-day clock",
        narrative:
          "Your investigation concludes Monday that a customer's structuring meets the suspicion threshold. The subject IS identified. When is the SAR due?",
        options: [
          {
            label: "Within 30 calendar days of initial detection",
            correct: true,
            feedback:
              "Correct — US SAR is due within 30 days of initial detection. If no subject is identified, it extends to 60 days. Deadlines are calendar days, not business days.",
          },
          {
            label: "Within 15 business days",
            feedback:
              "That's closer to Australia's TTR or Canada's old LCTR timing — US SAR is 30 CALENDAR days from detection.",
          },
          {
            label: "When the investigation fully closes",
            feedback:
              "Wrong — the clock runs from detection, not investigation completion. Investigations take months; SARs can't wait.",
          },
        ],
      },
      {
        id: "channel",
        title: "Filing channel",
        narrative: "Time to file. Where does a US SAR go?",
        options: [
          {
            label: "FinCEN BSA E-Filing system",
            correct: true,
            feedback:
              "Right — US SARs file electronically through FinCEN's BSA E-Filing. There's no consent/regulator-approval step like the UK's DAML — you file directly.",
          },
          {
            label: "Request consent from FinCEN first (DAML-style)",
            feedback:
              "No consent regime in the US — the SAR is confidential and filed directly. Consent requests are a UK POCA mechanism.",
          },
          {
            label: "Local FBI field office",
            feedback:
              "SARs go to FinCEN, not law enforcement. FinCEN disseminates to agencies as needed.",
          },
        ],
      },
      {
        id: "confidential",
        title: "SAR confidentiality",
        narrative:
          "A senior RM asks: 'Did we file anything on the Delgado account? The customer is asking why wires were held.' What do you say?",
        options: [
          {
            label: "'I can't confirm or discuss any filing. Please route customer questions through me.'",
            correct: true,
            feedback:
              "Correct — SAR confidentiality prohibits disclosing that a report exists (the 'existence of a SAR' is itself protected). A neutral redirect plus documentation is standard.",
          },
          {
            label: "'Yes, we filed — tell them to stop the suspicious activity'",
            feedback:
              "Tipping off — disclosing a SAR's existence is prohibited under the BSA and can be a criminal offence. Never confirm or deny.",
          },
          {
            label: "Say nothing and hope they don't ask again",
            feedback:
              "Silence without a holding response leaves the RM guessing — and they may inadvertently tip the customer off. Give the neutral script.",
          },
        ],
      },
      {
        id: "continuing",
        title: "Continuing activity",
        narrative:
          "Two months after your SAR, the same customer resumes structuring — new deposits, same pattern. What's required?",
        options: [
          {
            label: "File a continuing SAR every 90 days while activity continues",
            correct: true,
            feedback:
              "Right — a continuing SAR is due every 90 days for ongoing suspicious activity. Each one updates FinCEN on what happened since the last filing.",
          },
          {
            label: "Nothing — the original SAR covers it",
            feedback:
              "Wrong — the original SAR covers what you knew THEN. New suspicious activity requires a continuing SAR; 'covered' isn't a defence.",
          },
          {
            label: "Wait until the pattern stops, then file one final SAR",
            feedback:
              "The 90-day clock doesn't wait for the activity to end — continuing SARs run while suspicion continues.",
          },
        ],
      },
      {
        id: "ctr",
        title: "The CTR that tags along",
        narrative:
          "While reviewing, you notice the customer also made a $14,000 cash deposit last week — over the CTR threshold but not suspicious on its own. Separate obligation?",
        options: [
          {
            label: "Yes — file a CTR within 15 days; CTRs are transaction-based, SARs are suspicion-based",
            correct: true,
            feedback:
              "Exactly — CTR is a threshold report (≥$10k cash, 15-day deadline), SAR is suspicion-based (30 days). They're separate obligations that often coexist.",
          },
          {
            label: "No — the SAR covers all reporting",
            feedback:
              "Wrong — SAR and CTR are independent obligations. A transaction can require both; filing one doesn't satisfy the other.",
          },
          {
            label: "Only if it looks suspicious",
            feedback:
              "CTR is threshold-based — suspicion isn't required. $14k cash triggers it regardless.",
          },
        ],
      },
    ],
  },

  {
    slug: "uk-daml-filing",
    title: "File the SAR — United Kingdom",
    role: "MLRO — UK Building Society",
    tagline: "POCA rules: 'as soon as practicable', the DAML consent regime, 31-day moratorium, tipping-off offence.",
    level: "Senior",
    minutes: 10,
    category: "filing",
    steps: [
      {
        id: "types",
        title: "Two kinds of report",
        narrative:
          "A customer wants to withdraw £180,000 in cash tomorrow. You suspect it's criminal property but the customer has a plausible explanation pending verification. Which UK mechanism applies?",
        options: [
          {
            label: "A 'no-consent request' (DAML) — seek NCA consent before the transaction proceeds",
            correct: true,
            feedback:
              "Right — when you need permission NOT to proceed (or protection for proceeding), you file a DAML request. A standard SAR reports suspicion; a no-consent request asks the NCA to decide on the transaction.",
          },
          {
            label: "A standard SAR only — same thing",
            feedback:
              "Different instruments. A SAR reports suspicion; a no-consent request triggers the statutory moratorium that legally stops the transaction while the NCA decides.",
          },
          {
            label: "Freeze the account unilaterally for 30 days",
            feedback:
              "You can't freeze on suspicion alone — restrictions come from a refused DAML or a court restraint order, not a bank decision.",
          },
        ],
      },
      {
        id: "daml-clock",
        title: "The DAML clock",
        narrative:
          "You submit the DAML request Monday morning. When must the NCA respond, and what's the maximum delay?",
        options: [
          {
            label: "7 working days for a decision; moratorium can run up to 31 days; silence = deemed consent",
            correct: true,
            feedback:
              "Correct — the NCA has 7 working days to give notice of its decision. If no decision comes, consent is deemed after the notice period; the moratorium period can extend up to 31 days total from the request.",
          },
          {
            label: "30 calendar days, then auto-approval",
            feedback:
              "That's the US SAR deadline transplanted — UK DAML uses working days for the notice period and a 31-day moratorium cap.",
          },
          {
            label: "NCA has unlimited time to decide",
            feedback:
              "No — the 7-working-day notice period and 31-day moratorium cap exist precisely so customers aren't frozen indefinitely.",
          },
        ],
      },
      {
        id: "timing",
        title: "'As soon as practicable'",
        narrative:
          "For a standard UK SAR (not a DAML), what's the deadline?",
        options: [
          {
            label: "As soon as practicable — there's no fixed day count, but delay must be justified",
            correct: true,
            feedback:
              "Right — UK SARs are due 'as soon as practicable'. There's no 30-day rule; the test is whether you filed promptly once suspicion crystallised. Sitting on a SAR is itself an offence risk.",
          },
          {
            label: "Exactly 30 days like the US",
            feedback:
              "UK has no fixed deadline — 'as soon as practicable' is the standard, tested against the facts. Don't import US timing.",
          },
          {
            label: "Within 7 working days to match the DAML notice period",
            feedback:
              "The 7 working days is the NCA's response window for DAMLs, not your SAR filing deadline.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off — s.333 POCA",
        narrative:
          "During the DAML moratorium, the customer calls: 'Where's my money? The branch says there's a delay.' What can you tell them?",
        options: [
          {
            label: "'There's a routine compliance review in progress' — nothing about the NCA or any report",
            correct: true,
            feedback:
              "Correct — tipping off (s.333 POCA) is a criminal offence covering ANY disclosure that might prejudice an investigation. Even hinting at an NCA involvement is dangerous.",
          },
          {
            label: "'We're waiting for the NCA to respond' — it's their money, they deserve to know",
            feedback:
              "That's tipping off — disclosing the NCA's involvement prejudices the investigation and is a s.333 offence. Customer entitlement doesn't override it.",
          },
          {
            label: "Tell them fully — transparency builds trust",
            feedback:
              "Transparency doesn't apply to SARs — the entire regime is built on confidentiality. Trust is preserved by NOT tipping off.",
          },
        ],
      },
      {
        id: "refusal",
        title: "NCA refuses consent",
        narrative:
          "Day 5: the NCA refuses consent to the £180k withdrawal. What happens next?",
        options: [
          {
            label: "The transaction cannot proceed; moratorium protections apply; consider law-enforcement engagement",
            correct: true,
            feedback:
              "Right — a refused consent means the bank can't allow the transaction. The refusal itself may be disclosed internally on a need-to-know basis, and you document everything.",
          },
          {
            label: "Proceed anyway — the customer hasn't been charged with anything",
            feedback:
              "No — refused consent legally bars the transaction. Proceeding anyway exposes the bank and the officer personally.",
          },
          {
            label: "Wait 31 days then release the funds automatically",
            feedback:
              "Deemed consent only applies when the NCA is SILENT past the notice period. An explicit refusal is a refusal — funds stay frozen.",
          },
        ],
      },
    ],
  },

  {
    slug: "canada-fintrac",
    title: "File the STR — Canada",
    role: "Compliance Officer — Canadian Credit Union",
    tagline: "FINTRAC rules: 'as soon as practicable', LCTR 15 days, terrorist property immediately, no consent regime.",
    level: "Associate",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "The deadline changed",
        narrative:
          "You determine Thursday that a wire pattern gives reasonable grounds to suspect ML. When must the STR reach FINTRAC?",
        options: [
          {
            label: "As soon as practicable — the old 30-day limit was replaced in 2021",
            correct: true,
            feedback:
              "Correct — since June 2021, Canadian STRs are due 'as soon as practicable' after establishing reasonable grounds, not within 30 days. Some delay is allowed but must be justified.",
          },
          {
            label: "Within 30 days — the classic FINTRAC rule",
            feedback:
              "Outdated — the 30-day rule was replaced by 'as soon as practicable' in 2021. Still commonly misquoted.",
          },
          {
            label: "Within 15 calendar days",
            feedback:
              "15 days is the Large Cash Transaction Report threshold timing, not the STR deadline.",
          },
        ],
      },
      {
        id: "property",
        title: "Terrorist property is different",
        narrative:
          "Separately, a customer tries to send funds to an entity on the consolidated sanctions list. Deadline?",
        options: [
          {
            label: "Immediately — Listed Person or Entity Property Reports are due on discovery",
            correct: true,
            feedback:
              "Right — terrorist property/listed entity reports are due IMMEDIATELY upon discovery, not 'as soon as practicable'. Sanctions-linked property jumps the queue.",
          },
          {
            label: "As soon as practicable like the STR",
            feedback:
              "Property reports involving listed persons/entities are 'immediate' — a stricter standard than STR.",
          },
          {
            label: "Within 15 days with the LCTR",
            feedback:
              "LCTR timing applies to large cash transactions, not terrorist property reports.",
          },
        ],
      },
      {
        id: "lctr",
        title: "The LCTR",
        narrative:
          "A customer deposits $12,000 cash (CAD) in one transaction. Reporting obligation?",
        options: [
          {
            label: "Large Cash Transaction Report within 15 calendar days",
            correct: true,
            feedback:
              "Correct — LCTR for cash ≥$10,000 CAD, due within 15 calendar days. Multiple transactions within 24h are aggregated for the threshold.",
          },
          {
            label: "STR within as soon as practicable",
            feedback:
              "$12k cash triggers the LCTR threshold — no suspicion needed. STR is for suspicious transactions, a different test.",
          },
          {
            label: "Nothing under $15,000",
            feedback:
              "Canadian threshold is $10,000 CAD, not $15,000 — and it applies to cash, aggregated over 24 hours.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off",
        narrative:
          "After filing the STR, the member asks why their account was flagged. Your response?",
        options: [
          {
            label: "'We can't discuss the reasons for any account review' — and remind staff of the prohibition",
            correct: true,
            feedback:
              "Right — Canada's PCMLTFA prohibits disclosing that an STR was made. A neutral holding response plus internal reminder is the standard.",
          },
          {
            label: "Explain the suspicious patterns — transparency",
            feedback:
              "Disclosing STR existence or grounds is prohibited — it can prejudice the investigation and expose the member.",
          },
          {
            label: "Tell them 'FINTRAC is looking at you'",
            feedback:
              "That's tipping off with extra steps — never disclose the report or the regulator's involvement.",
          },
        ],
      },
      {
        id: "record",
        title: "Record keeping",
        narrative: "How long must the STR documentation be retained?",
        options: [
          {
            label: "5 years from the date of the transaction",
            correct: true,
            feedback:
              "Correct — Canadian reporting records (including STRs and supporting docs) are retained for 5 years.",
          },
          {
            label: "7 years like the US BSA",
            feedback:
              "7 years is the US standard — Canada is 5 years for AML records.",
          },
          {
            label: "3 years",
            feedback:
              "Too short — Canadian AML records require 5 years.",
          },
        ],
      },
    ],
  },

  {
    slug: "australia-austrac",
    title: "File the SMR — Australia",
    role: "AML Analyst — Australian Bank",
    tagline: "AUSTRAC rules: SMR 3 business days (24h for terrorism), TTR 10 days, AUSTRAC Online.",
    level: "Associate",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "The SMR clock",
        narrative:
          "You form a suspicion on reasonable grounds about a customer's transactions on Monday. When is the Suspicious Matter Report due?",
        options: [
          {
            label: "Within 3 business days — or 24 hours if terrorism financing is suspected",
            correct: true,
            feedback:
              "Correct — SMRs are due within 3 business days of forming the suspicion, compressing to 24 hours where TF is suspected. Tight deadlines are the Australian way.",
          },
          {
            label: "Within 15 business days",
            feedback:
              "15 days was the old internal-investigation guideline — the statutory SMR deadline is 3 business days (24h for TF).",
          },
          {
            label: "Within 30 days like the US SAR",
            feedback:
              "US timing again — AUSTRAC SMR is much tighter: 3 business days.",
          },
        ],
      },
      {
        id: "ttr",
        title: "Threshold vs suspicious",
        narrative:
          "A customer deposits A$12,000 in physical cash. What's required?",
        options: [
          {
            label: "TTR within 10 business days — threshold reports are separate from SMRs",
            correct: true,
            feedback:
              "Right — physical currency ≥A$10k triggers a TTR within 10 business days. SMRs are suspicion-based; TTRs are threshold-based. Electronic transfers don't count — it's physical cash only.",
          },
          {
            label: "SMR within 3 days",
            feedback:
              "Only if you ALSO suspect something. The TTR obligation is automatic at the threshold — no suspicion required.",
          },
          {
            label: "Nothing — it's under A$15,000",
            feedback:
              "Australian threshold is A$10,000 physical currency — and foreign currency equivalents count.",
          },
        ],
      },
      {
        id: "channel",
        title: "Where it goes",
        narrative: "You lodge the SMR through…",
        options: [
          {
            label: "AUSTRAC Online",
            correct: true,
            feedback:
              "Correct — all AUSTRAC reports go through the AUSTRAC Online portal. Even if you can't identify the offender, the SMR must still be lodged.",
          },
          {
            label: "Local police",
            feedback:
              "SMRs go to AUSTRAC (the FIU), which refers to law enforcement as needed — not directly to police.",
          },
          {
            label: "APRA",
            feedback:
              "APRA is the prudential regulator, not the FIU — AUSTRAC handles financial intelligence.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off",
        narrative:
          "The customer asks why their transactions were 'flagged for review'. What can staff say?",
        options: [
          {
            label: "'Routine review' — disclosing an SMR's existence is an offence under the AML/CTF Act",
            correct: true,
            feedback:
              "Right — tipping off about an SMR is a criminal offence in Australia. Staff should be trained on the neutral script.",
          },
          {
            label: "Explain the suspicious indicators",
            feedback:
              "Prohibited — you can't disclose that an SMR was made or the grounds for it.",
          },
          {
            label: "Say nothing at all",
            feedback:
              "A neutral holding response is better than silence — but never confirm an SMR exists.",
          },
        ],
      },
      {
        id: "no-id",
        title: "No identified offender",
        narrative:
          "Your suspicion relates to a pattern but you can't identify who the offender is. Do you still file?",
        options: [
          {
            label: "Yes — SMRs are required even without an identified offender or victim",
            correct: true,
            feedback:
              "Correct — AUSTRAC explicitly requires SMRs even when you can't identify the offender. Suspicion of the ACTIVITY is enough.",
          },
          {
            label: "No — need a name first",
            feedback:
              "Wrong — the obligation attaches to the suspicion, not the identification. Unidentified suspicious activity is still reportable.",
          },
          {
            label: "Only if police ask",
            feedback:
              "SMR obligations are proactive — you don't wait for law enforcement to ask.",
          },
        ],
      },
    ],
  },

  {
    slug: "singapore-stro",
    title: "File the STR — Singapore",
    role: "Compliance Analyst — Singapore Bank",
    tagline: "MAS rules: STR to STRO within 5 business days (1 day for sanctions), updated July 2025.",
    level: "Associate",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "The 5-day rule",
        narrative:
          "Your investigation establishes suspicion on a Tuesday. When must the STR reach STRO under current MAS rules?",
        options: [
          {
            label: "Within 5 business days of suspicion being established",
            correct: true,
            feedback:
              "Correct — since July 2025, MAS requires STRs within 5 business days of suspicion being established (previously 15 business days for internal review). Sanctions-related cases: 1 business day.",
          },
          {
            label: "Within 15 business days",
            feedback:
              "Outdated — MAS tightened this to 5 business days in mid-2025. The 15-day figure was the old internal-review guideline.",
          },
          {
            label: "As soon as practicable with no fixed limit",
            feedback:
              "MAS now prescribes 5 business days — 'promptly' has a number attached.",
          },
        ],
      },
      {
        id: "sanctions",
        title: "Sanctions fast-track",
        narrative:
          "The suspicion involves a party acting on behalf of a sanctioned individual. Deadline?",
        options: [
          {
            label: "As soon as possible, no later than 1 business day",
            correct: true,
            feedback:
              "Right — sanctioned parties and those acting on their behalf get the accelerated 1-business-day STR timeline.",
          },
          {
            label: "5 business days like everything else",
            feedback:
              "Sanctions cases are carved out — 1 business day, not 5.",
          },
          {
            label: "Immediately or not at all",
            feedback:
              "Close — 'as soon as possible, no later than 1 business day'. Not literally instantaneous, but the fastest statutory window.",
          },
        ],
      },
      {
        id: "channel",
        title: "Where it goes",
        narrative: "The STR is filed to…",
        options: [
          { label: "STRO — the Suspicious Transaction Reporting Office", correct: true, feedback: "Correct — Singapore STRs go to STRO, which sits under the Commercial Affairs Department / police. Note: the old requirement to send a duplicate to MAS was removed in 2025 — copies go to MAS only on request." },
          { label: "MAS directly", feedback: "MAS is the supervisor, not the FIU — STRs go to STRO." },
          { label: "Commercial Affairs Department only", feedback: "STRO is the reporting office — CAD houses it but the destination is STRO." },
        ],
      },
      {
        id: "supplementary",
        title: "New suspicion emerges",
        narrative:
          "Three weeks after filing, fresh alerts suggest additional suspicious activity by the same customer. What do you do?",
        options: [
          {
            label: "Assess whether a supplementary STR is warranted and file promptly",
            correct: true,
            feedback:
              "Right — new suspicion on the same customer means evaluating a supplementary STR. Singapore guidance expects FIs to assess and file further STRs for new suspicion.",
          },
          {
            label: "Nothing — already reported",
            feedback:
              "An STR covers what you knew when you filed. New suspicion is a new obligation.",
          },
          {
            label: "Wait for the next periodic review",
            feedback:
              "STR timelines are event-driven, not review-cycle-driven — new suspicion triggers its own deadline.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off",
        narrative:
          "The customer asks why their account is 'under review'. The compliant response?",
        options: [
          {
            label: "'Routine account review' — never confirm or deny an STR",
            correct: true,
            feedback:
              "Correct — MAS notices prohibit tipping off. Neutral responses only.",
          },
          {
            label: "'We filed a suspicious transaction report'",
            feedback:
              "Direct tipping off — a breach of the AML/CFT notices and potentially an offence.",
          },
          {
            label: "Tell the compliance team to handle it directly",
            feedback:
              "Escalating doesn't change the rule — the customer-facing response must stay neutral.",
          },
        ],
      },
    ],
  },

  {
    slug: "hong-kong-jfiu",
    title: "File the STR — Hong Kong",
    role: "MLRO — HK Financial Institution",
    tagline: "JFIU rules: 'as soon as practicable', STREAMS 2 e-filing, no threshold, criminal penalty for non-filing.",
    level: "Associate",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "No fixed deadline",
        narrative:
          "Hong Kong law requires STRs 'as soon as practicable'. Your suspicion arose Friday afternoon. When do you file?",
        options: [
          {
            label: "By Monday/Tuesday at latest — 'as soon as practicable' means days, not weeks",
            correct: true,
            feedback:
              "Right — HK has no fixed day count, but JFIU expects reports within days. A Friday suspicion should be filed by early the following week, not 'when convenient'.",
          },
          {
            label: "Within 30 days",
            feedback:
              "That's US SAR timing — HK uses 'as soon as practicable', which JFIU interprets as prompt, days-level filing.",
          },
          {
            label: "End of the monthly reporting cycle",
            feedback:
              "STRs are event-driven, not batched monthly — delay of weeks would breach 'as soon as practicable'.",
          },
        ],
      },
      {
        id: "channel",
        title: "STREAMS 2",
        narrative: "How does the STR reach the JFIU?",
        options: [
          {
            label: "Electronically via STREAMS 2 — XML upload or web form (HK e-cert required)",
            correct: true,
            feedback:
              "Correct — STREAMS 2 is mandatory for regulated entities. Email/fax/post submission was discontinued. Non-regulated persons use a different route.",
          },
          {
            label: "Email to jfiu@police.gov.hk",
            feedback:
              "Email submission was discontinued for regulated entities under STREAMS 2 — that route is now only for non-regulated reporters.",
          },
          {
            label: "Post to police headquarters",
            feedback:
              "Paper filing was phased out — STREAMS 2 is the only channel for regulated entities.",
          },
        ],
      },
      {
        id: "threshold",
        title: "No minimum amount",
        narrative:
          "A suspicious HK$1,500 transaction — tiny amount, but clear structuring indicators. Reportable?",
        options: [
          {
            label: "Yes — no minimum threshold; suspicion is the test, not amount",
            correct: true,
            feedback:
              "Correct — HK STRs have no de minimis. A suspicious $1,500 transaction is as reportable as a suspicious $1.5M one.",
          },
          {
            label: "No — under the reporting threshold",
            feedback:
              "There is no threshold for STRs — only CTR-type reports have amounts. Suspicion alone triggers the duty.",
          },
          {
            label: "Only if it exceeds HK$10,000",
            feedback:
              "No such threshold exists for suspicious transaction reports in HK.",
          },
        ],
      },
      {
        id: "penalty",
        title: "The penalty for silence",
        narrative: "What does failing to report an STR expose the reporter to in HK?",
        options: [
          {
            label: "HK$50,000 fine and 3 months' imprisonment",
            correct: true,
            feedback:
              "Correct — under OSCO/DTROP/UNATMO, failing to report known or suspected criminal property is a criminal offence: fine up to HK$50,000 and imprisonment up to 3 months.",
          },
          {
            label: "A warning letter",
            feedback:
              "Non-reporting is a criminal offence, not an administrative slap — personal liability attaches.",
          },
          {
            label: "Civil penalty only",
            feedback:
              "It's criminal — fine AND imprisonment.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off",
        narrative:
          "The customer asks if 'anything unusual' is happening with their account. Response?",
        options: [
          {
            label: "Neutral holding response — tipping off is a separate offence under Cap. 615",
            correct: true,
            feedback:
              "Right — HK has a specific tipping-off offence (Cap. 615). Never confirm or hint at a report.",
          },
          {
            label: "Confirm the STR was filed",
            feedback:
              "Tipping off — criminal offence regardless of intent.",
          },
          {
            label: "Hint that 'authorities are involved'",
            feedback:
              "Even hinting is tipping off — the statute covers disclosures that might prejudice an investigation.",
          },
        ],
      },
    ],
  },

  {
    slug: "japan-jafic",
    title: "File the STR — Japan",
    role: "Compliance Officer — Japanese Bank",
    tagline: "APTCP rules: 'prompt' filing under Article 8, FSA/JAFIC channels, 7-year records, strict tipping-off.",
    level: "Associate",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "'Promptly' under APTCP",
        narrative:
          "Under Japan's Act on Punishment of Organised Crimes (APTCP) Article 8, when must specified business operators file an STR?",
        options: [
          {
            label: "Promptly (迅速に) — without delay once suspicion is established",
            correct: true,
            feedback:
              "Correct — Japan uses 'promptly' rather than a fixed day count. JAFIC/FSA guidance expects STRs without delay; sitting on suspicion is itself a violation.",
          },
          {
            label: "Within 30 days",
            feedback:
              "Japan doesn't use the US 30-day rule — the statutory standard is 'promptly'.",
          },
          {
            label: "Within 5 business days like Singapore",
            feedback:
              "Singapore's 5-day rule is MAS-specific — Japan's APTCP uses 'promptly'.",
          },
        ],
      },
      {
        id: "channel",
        title: "Where it goes",
        narrative:
          "A bank's STR goes to which authority?",
        options: [
          {
            label: "The competent authority — FSA's designated financial information centre for banks, JAFIC (NPA) for other specified operators",
            correct: true,
            feedback:
              "Right — financial institutions file to the FSA-designated centre; other specified business operators (dealers, lawyers, accountants) file to JAFIC under the National Police Agency.",
          },
          {
            label: "All STRs go to JAFIC",
            feedback:
              "JAFIC handles non-financial specified operators — banks file through the FSA channel.",
          },
          {
            label: "Local police station",
            feedback:
              "STRs go to the designated FIU channel, not local police — though JAFIC sits under the NPA.",
          },
        ],
      },
      {
        id: "method",
        title: "Filing method",
        narrative: "FSA actively promotes which filing channel?",
        options: [
          {
            label: "Electronic filing via e-Gov application system",
            correct: true,
            feedback:
              "Correct — FSA has pushed electronic filing through the e-Gov system to strengthen information management. Paper/media submission is being phased toward e-filing.",
          },
          {
            label: "Registered mail only",
            feedback:
              "FSA prefers and promotes e-filing — mail is the legacy fallback.",
          },
          {
            label: "Fax",
            feedback:
              "FSA channels are e-Gov electronic, physical media, or registered mail — fax isn't the promoted route.",
          },
        ],
      },
      {
        id: "records",
        title: "Record retention",
        narrative:
          "How long must transaction and identification records be kept under APTCP?",
        options: [
          { label: "7 years", correct: true, feedback: "Correct — APTCP requires specified business operators to retain CDD and transaction records for 7 years." },
          { label: "5 years", feedback: "5 years is Canada's standard — Japan's APTCP requires 7." },
          { label: "10 years", feedback: "Japan's requirement is 7 years." },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off",
        narrative:
          "A customer asks why their account is under 'enhanced review'. Your response?",
        options: [
          {
            label: "Neutral response — disclosing STR-related information to the customer is prohibited",
            correct: true,
            feedback:
              "Correct — Japan prohibits tipping off on suspicious transaction reports. Neutral holding language only.",
          },
          {
            label: "Confirm an STR was filed",
            feedback:
              "Tipping off — prohibited and potentially criminal.",
          },
          {
            label: "Say 'the police asked us to check'",
            feedback:
              "That reveals enforcement involvement — still tipping off.",
          },
        ],
      },
    ],
  },

  {
    slug: "uae-goaml",
    title: "File the STR — UAE",
    role: "MLRO — UAE Bank",
    tagline: "UAE rules: 'immediately and without delay' via goAML, no threshold, criminal penalties, legal privilege carve-out.",
    level: "Senior",
    minutes: 7,
    category: "filing",
    steps: [
      {
        id: "deadline",
        title: "'Immediately and without delay'",
        narrative:
          "Under UAE Cabinet Resolution 134/2025 Article 18, when must a suspicious transaction be reported?",
        options: [
          {
            label: "Immediately and without delay — through the FIU's electronic system (goAML)",
            correct: true,
            feedback:
              "Correct — UAE law says 'immediately and without delay', no minimum threshold, regardless of transaction value. Failure to report immediately is a federal crime.",
          },
          {
            label: "Within 30 days",
            feedback:
              "UAE's standard is 'immediately and without delay' — no fixed day count, and it's stricter than most regimes.",
          },
          {
            label: "Within 5 business days",
            feedback:
              "That's Singapore's MAS timeline — UAE uses 'immediately and without delay'.",
          },
        ],
      },
      {
        id: "penalty",
        title: "The penalty",
        narrative: "Failing to report an STR in the UAE exposes the reporter to…",
        options: [
          {
            label: "Fine of AED 100,000–1,000,000 and/or imprisonment",
            correct: true,
            feedback:
              "Correct — under UAE AML law, failure to report suspicion is a federal crime: minimum AED 100k, maximum AED 1M fine and/or imprisonment. Among the harshest in the region.",
          },
          {
            label: "Administrative warning",
            feedback:
              "It's a criminal offence, not administrative — personal liability for managers and employees.",
          },
          {
            label: "License review only",
            feedback:
              "Criminal penalties apply — fine AND imprisonment are on the table.",
          },
        ],
      },
      {
        id: "privilege",
        title: "Legal privilege carve-out",
        narrative:
          "A lawyer learns of suspicious activity while defending a client in court. Must they file an STR?",
        options: [
          {
            label: "No — legal professionals are exempt for information obtained in the course of legal advice/defence",
            correct: true,
            feedback:
              "Correct — UAE law exempts lawyers, notaries and auditors for information obtained under professional privilege in legal proceedings/advice. One of the few explicit carve-outs.",
          },
          {
            label: "Yes — all professions report equally",
            feedback:
              "Wrong — UAE explicitly exempts legal professionals acting under privilege. It's a designed carve-out, not a gap.",
          },
          {
            label: "Only if the client consents",
            feedback:
              "The exemption isn't consent-based — it's privilege-based for qualifying legal work.",
          },
        ],
      },
      {
        id: "channel",
        title: "goAML",
        narrative: "STRs are submitted through…",
        options: [
          { label: "The FIU's electronic system — goAML", correct: true, feedback: "Correct — UAE FIU uses goAML, the same platform used by many FIUs globally. Reports go 'via the electronic system of the FIU or any other approved means'." },
          { label: "CBUAE directly", feedback: "The FIU receives STRs — CBUAE is the prudential regulator, not the FIU." },
          { label: "Local police", feedback: "goAML is the channel — the FIU then refers to enforcement." },
        ],
      },
      {
        id: "threshold",
        title: "No threshold",
        narrative:
          "A suspicious AED 500 transaction — reportable?",
        options: [
          {
            label: "Yes — 'regardless of their value' per Article 18",
            correct: true,
            feedback:
              "Correct — UAE law explicitly says reports apply 'regardless of their value'. No de minimis exists.",
          },
          {
            label: "No — under the threshold",
            feedback:
              "UAE has no minimum — 'regardless of their value' is explicit.",
          },
          {
            label: "Only if it exceeds AED 50,000",
            feedback:
              "No such threshold — all suspicious transactions report.",
          },
        ],
      },
    ],
  },

  {
    slug: "eu-filing",
    title: "File the STR — European Union",
    role: "MLRO — EU Bank (cross-border)",
    tagline: "No single EU deadline — national FIUs, goAML-style platforms, AMLR single rulebook coming.",
    level: "Senior",
    minutes: 8,
    category: "filing",
    steps: [
      {
        id: "fragmented",
        title: "No single EU deadline",
        narrative:
          "Your bank operates in Germany, France and the Netherlands. A suspicion arises on a cross-border transaction. What's the filing deadline?",
        options: [
          {
            label: "It depends on each member state's national law — there's no single EU deadline",
            correct: true,
            feedback:
              "Correct — the EU has no harmonised STR deadline. Each member state sets its own rules for its national FIU. You file per-jurisdiction based on where the suspicion arose.",
          },
          {
            label: "30 days EU-wide",
            feedback:
              "No EU-wide deadline exists — member states set their own. 'EU AML rules' is a patchwork until the AMLR fully applies.",
          },
          {
            label: "As soon as practicable everywhere",
            feedback:
              "Some states use 'without delay', others have specific timelines — it's not uniform 'as soon as practicable'.",
          },
        ],
      },
      {
        id: "channels",
        title: "National channels",
        narrative:
          "Match the FIU to the country: where do STRs go in each?",
        options: [
          {
            label: "Germany → goAML, France → TRACFIN, Netherlands → FIU-NL",
            correct: true,
            feedback:
              "Correct — Germany uses goAML (shared platform), France uses TRACFIN, Netherlands uses FIU-NL. Each member state has its own FIU and filing system.",
          },
          {
            label: "All to a single EU FIU in Frankfurt",
            feedback:
              "The EU AML Authority (AMLA) in Frankfurt is coming — but it supervises, it doesn't receive STRs. National FIUs still handle filings.",
          },
          {
            label: "All to Europol",
            feedback:
              "Europol isn't the STR recipient — national FIUs are.",
          },
        ],
      },
      {
        id: "amlr",
        title: "The AMLR shift",
        narrative:
          "What's changing with the EU's 2024 AML package?",
        options: [
          {
            label: "AMLR creates a single rulebook directly applicable in all member states; AMLA supervises significant obliged entities",
            correct: true,
            feedback:
              "Right — the 2024 package (AMLR + AMLD6 + AMLA regulation) creates a directly-applicable single rulebook and establishes AMLA in Frankfurt to supervise high-risk entities directly. Phased application through 2027.",
          },
          {
            label: "Nothing — EU AML rules are frozen",
            feedback:
              "The 2024 package is the biggest EU AML overhaul in a decade — it's phasing in now.",
          },
          {
            label: "AMLA replaces all national FIUs",
            feedback:
              "AMLA supervises — national FIUs still receive STRs. The architecture is dual-layer, not replacement.",
          },
        ],
      },
      {
        id: "tipping",
        title: "Tipping-off across borders",
        narrative:
          "The same customer operates in all three countries. Can you tell them an STR was filed?",
        options: [
          {
            label: "No — tipping-off is prohibited across all member states",
            correct: true,
            feedback:
              "Correct — all EU member states prohibit tipping off on STRs. The prohibition travels with the report regardless of which FIU received it.",
          },
          {
            label: "Yes in France but not Germany",
            feedback:
              "Tipping-off prohibitions are universal across the EU — no member state permits it.",
          },
          {
            label: "Only if the customer is in a low-risk country",
            feedback:
              "Risk rating doesn't affect tipping-off — it's prohibited everywhere.",
          },
        ],
      },
      {
        id: "which-fiu",
        title: "Which FIU?",
        narrative:
          "A German customer wires funds through your French branch to a Dutch counterparty. Where does the STR go?",
        options: [
          {
            label: "Typically the FIU of the member state where the reporting entity is established / where the suspicion arose — per national rules",
            correct: true,
            feedback:
              "Right — the reporting obligation attaches to the entity and the member state whose law applies. Cross-border cases follow the entity's home FIU rules plus any local requirements — this is genuinely complex and entity-specific.",
          },
          {
            label: "All three FIUs get a copy",
            feedback:
              "Not automatic — you file per the applicable national law; some regimes require copies to other FIUs, others don't.",
          },
          {
            label: "Only the customer's home FIU",
            feedback:
              "The obligation is on the reporting entity, not the customer's jurisdiction.",
          },
        ],
      },
    ],
  },
];
