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
];
