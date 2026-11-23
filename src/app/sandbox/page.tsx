import type { Metadata } from "next";
import AlertSandbox, { type SandboxScenario } from "@/components/AlertSandbox";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alert Sandbox",
  description:
    "Hands-on KYC analyst sandbox — mock alerts, onboarding and SAR scenarios with disposition feedback.",
};

const SCENARIOS: SandboxScenario[] = [
  {
    id: "1042",
    title: "Structuring across three branches",
    alert:
      "Rule S-114 fired: 6 cash deposits of $9,400–$9,800 within 4 days at three different branches, all just under the $10,000 CTR threshold.",
    facts: [
      "Customer: 'QuickCash Solutions', registered 11 months ago, claims to run a food truck",
      "Deposits made by three different individuals, each depositing for 'a friend'",
      "No prior cash activity on the account; funds withdrawn same-day via wire to a Nevada LLC",
      "Customer could not explain the business purpose when contacted",
    ],
    options: [
      {
        label: "Close as false positive — amounts are under the reporting threshold",
        feedback:
          "Wrong. The threshold is exactly what the pattern is designed around. Six sub-threshold deposits by different people, same-week, same-day withdrawal — this is textbook structuring. The CTR threshold doesn't make it safe; it makes it suspicious.",
      },
      {
        label: "Escalate to case and prepare SAR/STR",
        correct: true,
        feedback:
          "Correct. Multiple red flags converge: structuring below threshold, third-party depositors, immediate outbound wires to an opaque entity, and an unexplained business profile. This meets the suspicion threshold — investigate and likely file.",
      },
      {
        label: "Request updated KYC documents and close",
        feedback:
          "Partial credit at best. Refreshing KYC is reasonable as a parallel step, but closing the alert without investigation ignores active structuring. KYC refresh doesn't explain why three different people deposited cash for a food-truck account.",
      },
      {
        label: "Flag for fraud team — possible account takeover",
        feedback:
          "Wrong team. The deposits were made in person by different individuals who claimed to act for friends — this is placement-layer laundering behaviour, not unauthorised account access. Route to ML investigation, not fraud.",
      },
    ],
  },
  {
    id: "2077",
    title: "Payroll-sized velocity on a dormant account",
    alert:
      "Rule V-208 fired: dormant account (no activity 14 months) received 40 inbound wires totalling $1.9M in 72 hours, then 38 outbound wires to 31 different jurisdictions.",
    facts: [
      "Customer: 'Meridian Trade Holdings', Cyprus entity, opened 3 years ago",
      "Account was dormant since onboarding; no stated expected activity profile",
      "Inbound wires from 9 unrelated companies in 6 countries",
      "Outbound wires went to high-risk corridors incl. sanctioned-region banks",
      "No supporting invoices or contracts produced when asked",
    ],
    options: [
      {
        label: "Escalate to case — possible TBML / layering",
        correct: true,
        feedback:
          "Correct. Dormant account + sudden high-velocity multi-source inflows + fan-out to many jurisdictions + sanctioned-corridor exposure + no commercial justification = classic layering. This needs a full investigation and almost certainly a SAR/STR.",
      },
      {
        label: "Close — large trade companies move money quickly",
        feedback:
          "Dangerous assumption. Trade companies move money, but not like this: 9 unrelated senders, 31 unrelated recipients, no documentation, dormant profile. Velocity without an economic story is the definition of a red flag.",
      },
      {
        label: "Sanctions screen the counterparties and close if clean",
        feedback:
          "Screening is necessary but not sufficient. Even if no counterparty is listed, the pattern itself — unexplained pass-through — warrants escalation. Clean screening ≠ clean activity.",
      },
      {
        label: "Ask the customer to explain, then close either way",
        feedback:
          "Customer outreach is a valid step but not a disposition. If the explanation is unsatisfactory — and here none was produced — the alert escalates. You can't outsource the decision to the subject of the alert.",
      },
    ],
  },
  {
    id: "3315",
    title: "Charity donation pattern",
    alert:
      "Rule C-77 fired: registered charity received 15 donations of $4,500–$4,900 in one week, each from a different donor, all cash deposits at branches.",
    facts: [
      "Customer: 'Helpline Foundation', registered NGO, 6-year relationship",
      "Donations consistent with their published fundraising campaigns",
      "Donors gave names and contact details; several are repeat donors",
      "Funds mostly retained in account; small disbursements to known programme vendors",
      "Charity is on your institution's PEP-adjacent watchlist for founder's political role",
    ],
    options: [
      {
        label: "Escalate immediately — PEP-linked charity is high risk",
        feedback:
          "Over-triage. The PEP connection raises the risk rating but doesn't convert legitimate fundraising into suspicion. The activity is consistent with the charity's stated purpose, donors are identifiable, and disbursements match known vendors. Apply EDD (enhanced monitoring, senior sign-off) — don't treat presence of risk as presence of suspicion.",
      },
      {
        label: "Close as false positive — pattern matches legitimate fundraising",
        correct: true,
        feedback:
          "Correct disposition — with a caveat. The activity is explained by the charity's campaigns, but because the founder is politically exposed, the right action is: document the rationale, apply enhanced ongoing monitoring, and ensure the PEP link is reflected in the risk rating. 'False positive' here means 'explained', not 'ignored'.",
      },
      {
        label: "SAR/STR — donations just under $5,000 look like structuring",
        feedback:
          "Wrong. There's no $5,000 CTR-style threshold for charity donations in most regimes, and the pattern (many small donors) is the *expected* shape of charitable giving — the opposite of structuring (one actor splitting money). Reporting legitimate donations wastes FIU resources and can damage a real NGO.",
      },
      {
        label: "Freeze the account pending review",
        feedback:
          "Disproportionate. Freezing a registered charity's account disrupts legitimate humanitarian work — the exact de-risking harm the FATF warns about. Enhanced monitoring and documentation are proportionate; account freezing requires specific legal grounds you don't have here.",
      },
    ],
  },
  {
    id: "4091",
    title: "Crypto off-ramp then immediate cash-out",
    alert:
      "Rule X-19 fired: personal account received 22 crypto exchange payouts (converted to fiat) totalling $340k over 10 days, then withdrew 95% in cash across 4 branches within 48 hours of each credit.",
    facts: [
      "Customer: 'Daniel O.', declared occupation: unemployed student",
      "Crypto sources included two unregistered exchanges and one mixing-service-adjacent platform",
      "Cash withdrawals made in denominations consistent with darknet-market purchase patterns",
      "No prior banking history; account opened 6 weeks ago",
      "Customer became evasive when asked about crypto source",
    ],
    options: [
      {
        label: "Close — crypto trading is legal in our jurisdiction",
        feedback:
          "Legality of crypto isn't the issue — the *pattern* is. Unregistered/mixing-adjacent sources + rapid full cash-out + implausible income profile + evasion = classic layering through VASPs. 'It's legal' answers the wrong question.",
      },
      {
        label: "Escalate to case and prepare SAR/STR",
        correct: true,
        feedback:
          "Correct. The convergence is strong: anonymous crypto sources (mixers are a primary TBML/ML typology), immediate cash extraction defeating the trace, income inconsistency, and customer evasion. This is a textbook VASP-layering case for investigation and likely reporting.",
      },
      {
        label: "Close — cash withdrawals are the customer's right",
        feedback:
          "Customers can withdraw cash, but the *combination* here — source, speed, amount, profile — is what makes it suspicious. Rights don't neutralise suspicious-activity analysis; they just mean you document carefully before acting.",
      },
      {
        label: "Refer to fraud team — possible scam victim",
        feedback:
          "Consider it, but the evidence points away from victimhood: the account holder is converting and extracting, not being defrauded. Scam-victim patterns show inbound scam proceeds, not outbound crypto-to-cash layering. If anything, this profile fits money-mule or laundering behaviour.",
      },
    ],
  },
  {
    id: "5120",
    title: "Invoice-backed trade payment",
    alert:
      "Rule T-31 fired: $480k wire to a first-time beneficiary in Vietnam, flagged because invoice amount is 3.2x the historical average for this product line.",
    facts: [
      "Customer: 'Apex Textiles Ltd', 8-year customer, documented import business",
      "Beneficiary: 'Saigon Fabrics Co', new payee, verified Vietnamese company registry",
      "Invoice provided: 40,000 units cotton fabric @ $12/unit = $480,000 — matches wire exactly",
      "Apex's declared annual import volume historically ~$1.5M; this single payment is 32% of annual",
      "Product (raw cotton) is a known TBML-adjacent commodity but the invoice is internally consistent",
      "Shipment docs show goods departed port 3 weeks before payment",
    ],
    options: [
      {
        label: "Close as explained — invoice, registry and shipping docs all reconcile",
        correct: true,
        feedback:
          "Correct — this is the healthy outcome of a good alert. Everything reconciles: real beneficiary, matching invoice, real shipment, consistent commodity. The 3.2x deviation is explained by a new supplier relationship. Document the rationale (invoice #, BL reference, registry check) so the next reviewer sees the work — 'explained' dispositions still need evidence.",
      },
      {
        label: "Escalate — first-time beneficiary to Vietnam is inherently high risk",
        feedback:
          "Geography raises inherent risk but doesn't create suspicion. Vietnamese textile suppliers are ordinary business for a textile importer. When the commercial documentation is complete and consistent, escalating burns investigation capacity that real cases need.",
      },
      {
        label: "SAR/STR — possible TBML over-invoicing",
        feedback:
          "The classic TBML check is whether the *invoice value* matches the *goods' real value* — and nothing here suggests over-invoicing: quantity, unit price, and product are internally consistent for cotton fabric. Reporting a fully documented legitimate trade payment is exactly the false-positive noise SAR regimes are designed to filter out.",
      },
      {
        label: "Request source of funds documentation before releasing payment",
        feedback:
          "SoF verification applies to the *customer's* funding of the payment — and an 8-year trading company paying its own supplier invoice from operating revenue doesn't trigger enhanced SoF. This is disproportionate friction on a documented transaction.",
      },
    ],
  },
  {
    id: "kyc-01",
    title: "KYC onboarding — the polished application",
    alert:
      "New business onboarding: 'Meridian Trade Holdings Ltd' applies for a corporate account. Documents are impeccable — certified registry extract, MOA, board resolution, lease. But the application form lists a sole director who is also the sole shareholder of the parent company two layers up.",
    facts: [
      "Registry shows parent 'Atlas Holdings' incorporated 3 weeks before Meridian",
      "Atlas's registered address is a virtual office shared by 400+ companies",
      "Declared annual turnover: $12M; the parent's website shows no trading activity",
      "Requested products: multi-currency accounts + trade finance lines",
    ],
    options: [
      {
        label: "Approve — all required documents are certified and match the registry",
        feedback:
          "Documents can be perfect and the customer still be a shell. Certified paperwork proves the entity exists, not that it's real. A parent incorporated weeks earlier, a mailbox address, $12M claimed turnover with no visible activity — the risk is in the structure, not the paperwork.",
      },
      {
        label: "Decline outright — virtual office address is an automatic reject",
        feedback:
          "Too blunt. Virtual offices are legitimate for many real businesses. The answer isn't rejection on one factor — it's escalation: the mismatch between claimed scale and observable activity needs investigation, not a blanket rule.",
      },
      {
        label: "Apply EDD: unwrap ownership to the natural person, corroborate source of wealth, verify trading activity",
        correct: true,
        feedback:
          "Correct. This is KYB done properly — look through the layers to the UBO, corroborate the $12M turnover claim against observable evidence, and treat the freshly-incorporated parent at a mailbox address as a risk signal requiring explanation. EDD either resolves it or gives you a defensible decline.",
      },
      {
        label: "Approve with standard monitoring — onboarding checks are complete",
        feedback:
          "Standard monitoring won't catch this early enough. The risk profile here (opaque ownership, claimed scale, trade finance appetite) puts it outside standard onboarding regardless of document completeness.",
      },
    ],
  },
  {
    id: "ubo-01",
    title: "UBO unwrapping — who actually owns this?",
    alert:
      "KYB file review: customer 'Pacific Crest Trading' is owned 100% by 'Silverline Holdings BVI'. Silverline is owned 60% by 'Delta Trust' (a Jersey trust) and 40% by 'R. Okafor'. Delta Trust's deed names settlor 'J. Marchetti' and two discretionary beneficiaries.",
    facts: [
      "No individual appears on Pacific Crest's shareholder register",
      "Trust deed is confidential — beneficiaries take no fixed entitlement",
      "R. Okafor is a PEP (foreign, former minister)",
      "Expected activity: high-value commodity trading, USD/EUR flows",
    ],
    options: [
      {
        label: "UBO is R. Okafor — he owns 40% of the intermediate holder",
        feedback:
          "Wrong arithmetic and wrong logic. Okafor's 40% of Silverline doesn't pass through Delta Trust's 60% — his effective stake in Pacific Crest is 40%, not a clean UBO finding. More importantly, the trust layer means ownership isn't the only route: the settlor and beneficiaries may exercise control without owning anything.",
      },
      {
        label: "No UBO can be identified — file as unresolved and proceed",
        feedback:
          "You can't proceed on 'unresolved.' FATF expects you to look through trusts to settlors, trustees, protectors and beneficiaries with control. An unresolved structure with a foreign PEP in the chain and confidential trust paperwork is an EDD case at minimum — and possibly a decline.",
      },
      {
        label: "Escalate to EDD: identify trust settlor/beneficiaries, treat Okafor as PEP-linked, require source of wealth for all natural persons behind the structure",
        correct: true,
        feedback:
          "Correct. UBO analysis covers control, not just percentages: the settlor J. Marchetti and discretionary beneficiaries are in scope even without fixed entitlements. Okafor's PEP status taints the whole chain. Every natural person behind the structure needs source-of-wealth corroboration before this account should open.",
      },
      {
        label: "The trustee is the UBO — it legally owns the shares",
        feedback:
          "Legal ownership ≠ beneficial ownership. That's the entire point of UBO rules — the trustee holds title, but the beneficial owners are the natural persons behind the trust. Stopping at the trustee defeats the exercise.",
      },
    ],
  },
  {
    id: "sar-01",
    title: "SAR narrative — which draft would survive review?",
    alert:
      "You must write the SAR narrative for the Meridian Trade Holdings investigation: 14 structuring-pattern cash deposits, rapid pass-through to three jurisdictions, and a customer who became evasive when asked about source of funds.",
    facts: [
      "Deposits: 14 × ~$9,600–$9,900 over 9 days, all under the $10k CTR line",
      "Funds wired out within 24h to entities in three countries",
      "Customer initially claimed 'consulting revenue', then stopped responding",
      "No legitimate explanation found after RFI and OSINT checks",
    ],
    options: [
      {
        label: "'Customer is laundering money. File SAR immediately.'",
        feedback:
          "Too conclusory — and 'laundering money' asserts guilt. SARs report suspicion, not proof. A reviewer can't test a one-line assertion against the evidence; the narrative must show the facts that generated the suspicion.",
      },
      {
        label: "Chronological facts with exact figures — dates, amounts, counterparties, the CTR-threshold pattern, the pass-through timing, and what the customer said when asked",
        correct: true,
        feedback:
          "Correct. The FinCEN 'complete and sufficient' standard wants the who-what-when-where-why-how: exact amounts, dates, the pattern relative to thresholds, timing of outflows, and the customer's shifting explanations. Let the facts carry the suspicion — that's what makes the SAR actionable for investigators.",
      },
      {
        label: "Focus only on the customer's unresponsiveness — that's the strongest evidence",
        feedback:
          "Evasion is corroborating colour, not the core. The core is the transaction pattern: sub-threshold structuring plus same-day pass-through to opaque entities. A narrative that omits the money trail buries the lead.",
      },
      {
        label: "Include speculation about what the funds might be for — drugs, terrorism — to emphasise severity",
        feedback:
          "Speculation without evidence weakens the filing and can misdirect investigators. Report what the transactions show; typology speculation belongs in the analysis section clearly labelled as such, not asserted as fact.",
      },
    ],
  },
];

export default function SandboxPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Alert Sandbox</h1>
      <p className="mt-3 text-muted">
        Eight mock scenarios across the KYC analyst lifecycle — onboarding, UBO
        unwrapping, alert triage and SAR writing. Read the facts, choose your
        action, and see why.{" "}
        <Link href="/resources" className="text-emerald-400 hover:text-emerald-300">
          Need the disposition framework? →
        </Link>
      </p>
      <div className="mt-8">
        <AlertSandbox scenarios={SCENARIOS} />
      </div>
      <p className="mt-8 text-sm text-faint">
        Simulated scenarios for training only — no real customer data.
      </p>
    </div>
  );
}
