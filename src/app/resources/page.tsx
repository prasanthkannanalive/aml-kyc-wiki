import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Templates & Checklists",
  description:
    "Practical AML/KYC job aids — SAR narrative template, CDD and EDD checklists, alert disposition framework and TM tuning checklist.",
};

const SAR_TEMPLATE = `SUSPICIOUS ACTIVITY REPORT — NARRATIVE TEMPLATE

1. SUBJECT(S)
   Full legal name(s), date(s) of birth, nationality, occupation,
   account number(s), address(es), ID document type & number.
   For entities: legal name, registration number, jurisdiction,
   registered & operating addresses, UBOs.

2. INSTITUTION
   Reporting entity name, branch/office, BSA/AML compliance contact,
   date report prepared, preparer name & role.

3. SUMMARY OF SUSPICIOUS ACTIVITY
   What happened, when it started, when it was detected.
   State the suspicion in one paragraph an examiner can read first.

4. DETAILED NARRATIVE (chronological)
   - Dates, times, amounts, currencies, counterparties
   - Channels used (branch, wire, ACH, card, crypto, trade finance)
   - Pattern description: structuring, layering, rapid movement,
     round-tripping, trade mis-invoicing, mule behaviour
   - Source of funds/wealth as understood
   - Any prior alerts, cases or SARs on the subject

5. WHY IT IS SUSPICIOUS
   Link each fact to the typology or red flag it matches.
   Explain what legitimate explanation was considered and rejected.

6. TRANSACTION SCHEDULE
   Date | Amount | Currency | From | To | Reference | Why suspicious

7. ATTACHMENTS / SUPPORTING DOCUMENTS
   KYC file, ID copies, statements, correspondence, screening results.

8. REVIEW & ATTESTATION
   Prepared by / Reviewed by / Approved by (MLRO or delegate),
   dates, and confirmation no tipping-off occurred.`;

const CDD_CHECKLIST = `CUSTOMER DUE DILIGENCE — ONBOARDING CHECKLIST

IDENTITY VERIFICATION
[ ] Government photo ID verified (passport / national ID / driving licence)
[ ] Proof of address within 3 months (utility bill / bank statement)
[ ] ID document authenticity checked (hologram, UV, MRZ where applicable)
[ ] Sanctions & PEP screening completed on customer + connected parties
[ ] Adverse media search completed and reviewed

BUSINESS / LEGAL VERIFICATION
[ ] Certificate of incorporation / registration obtained
[ ] Registered office vs operating address verified
[ ] Business licence / sector permits checked where applicable
[ ] Company registry search (Companies House / MCA / local equivalent)
[ ] Website / online presence cross-checked

OWNERSHIP & CONTROL
[ ] UBO(s) identified per jurisdiction threshold (typically 25% or 10%)
[ ] Ownership chain traced through intermediaries to natural persons
[ ] Directors / authorised signatories identified & ID-verified
[ ] Trust / foundation / SPV structures mapped (if applicable)
[ ] Nominee arrangements investigated

RISK ASSESSMENT
[ ] Customer risk rating assigned (Low / Medium / High)
[ ] Risk factors documented: jurisdiction, PEP status, sector,
    product type, expected activity, source of funds/wealth
[ ] EDD triggered where required (PEP, high-risk jurisdiction, complex structure)
[ ] Ongoing monitoring frequency set per rating

COMPLETION
[ ] File notes complete & signed off
[ ] Periodic review date scheduled
[ ] System risk rating matches manual assessment`;

const EDD_CHECKLIST = `ENHANCED DUE DILIGENCE — PEP & HIGH-RISK CHECKLIST

WHEN EDD IS REQUIRED
[ ] Customer or connected party is a PEP / RP / domestic PEP family member
[ ] High-risk jurisdiction (FATF grey/black list or internal list)
[ ] Complex ownership (trusts, foundations, multi-jurisdiction chains)
[ ] Unusual product or corridor for the customer profile
[ ] Adverse media or prior regulatory issues found

SOURCE OF WEALTH & FUNDS
[ ] Source of wealth documented with evidence (not just declaration)
[ ] Source of funds for intended activity explained
[ ] Expected transaction profile agreed (volumes, corridors, products)
[ ] For PEPs: senior management approval obtained BEFORE onboarding
[ ] Politically exposed close associates / family members screened

ONGOING CONTROLS
[ ] Enhanced transaction monitoring rules applied
[ ] Review frequency increased (e.g., 6-monthly vs annual)
[ ] Senior approval required for large/atypical transactions
[ ] Adverse media re-screen scheduled
[ ] File flagged for MLRO visibility`;

const DISPOSITION_FRAMEWORK = `ALERT DISPOSITION FRAMEWORK

EVERY ALERT GETS ONE OF THESE OUTCOMES — RECORD THE REASON.

1. FALSE POSITIVE — legitimate activity, rule/tuning issue
   Action: document why, feed back to TM team for threshold tuning.

2. EXPLAINED — activity unusual but customer provided satisfactory
   explanation and documentation (source of funds, invoice, contract)
   Action: file note + set review date; do NOT close permanently
   if pattern recurs.

3. ESCALATE TO CASE — cannot be resolved at alert stage; needs
   investigation, enhanced monitoring or MLRO input
   Action: open case, assign investigator, preserve evidence.

4. SAR/STR CANDIDATE — facts meet the "know / suspect" threshold
   Action: prepare SAR/STR narrative; file within regulatory deadline;
   NO tipping-off to customer.

5. REFER TO OTHER TEAM — fraud, sanctions breach, tax, or credit risk
   rather than ML — route correctly, don't sit on it.

6. CUSTOMER OUTREACH — legitimate but needs updated KDD
   Action: request refreshed source of funds / business justification.

QUALITY CHECKS BEFORE CLOSING ANY ALERT
[ ] Looked at the full relationship, not just the flagged transaction
[ ] Considered counterparty, corridor and timing patterns
[ ] Checked whether this is part of a series (velocity test)
[ ] Reasoning documented — a colleague could repeat your logic
[ ] Disposition chosen from the list above, not free text`;

const TM_TUNING_CHECKLIST = `TRANSACTION MONITORING — RULE TUNING CHECKLIST

BEFORE CHANGING ANY THRESHOLD
[ ] Measure current precision: alerts reviewed / true positives found
[ ] Identify false-positive drivers (payroll day, rent, known corridors)
[ ] Whitelist only with documented justification + expiry date
[ ] Test the change on historical data first (back-test)
[ ] Record old vs new threshold and expected alert-volume impact

TUNING LEVERS (in order of preference)
1. Exclusions & whitelists — known legitimate patterns
2. Thresholds — adjust amounts / counts / velocity windows
3. Segmentation — different rules per customer risk rating or product
4. Composite rules — require 2+ signals (amount AND corridor AND timing)
5. Model-based scoring — for mature programmes only

RED FLAGS YOUR RULES SHOULD CATCH
[ ] Structuring just below reporting thresholds
[ ] Rapid in-and-out movement (pass-through / mule pattern)
[ ] Activity inconsistent with stated business or KYC profile
[ ] Dormant account suddenly active with large flows
[ ] Third-party funding / payments to unrelated parties
[ ] Sanctioned/high-risk corridor exposure
[ ] Crypto off-ramp then cash withdrawal patterns`;


const UBO_WORKSHEET = `UBO OWNERSHIP WORKSHEET
=============================
Entity name: ________________________________  Jurisdiction: ____________
Registration no.: ____________________________  Registry checked: ________

OWNERSHIP CHAIN (list each layer, top-down)
--------------------------------------------
Layer 1 — Legal owner(s):
  Name: _______________  Type: [ ] Individual  [ ] Entity
  % held: ______  Jurisdiction: ______  Registry ref: ______

Layer 2 — Look-through required? [ ] Yes  [ ] No
  Name: _______________  % held: ______

Layer 3 — Look-through required? [ ] Yes  [ ] No
  Name: _______________  % held: ______

THRESHOLD TEST
--------------
Direct ownership >= 25%?  [ ] Yes -> UBO identified
Indirect ownership >= 25%? (multiply % at each layer)
  Calculation: ______% x ______% = ______%
  Meets threshold?  [ ] Yes  [ ] No -> continue unwrapping

CONTROL-BASED UBO (where ownership < threshold)
----------------------------------------------
Any person exercising control via: [ ] voting rights  [ ] board appointment
  [ ] veto rights  [ ] other dominant influence
  Name: _______________  Basis: ____________________

RED FLAGS / UNRESOLVED
----------------------
[ ] Bearer shares   [ ] Nominee directors   [ ] Trust/foundation opacity
[ ] Jurisdiction non-cooperative   [ ] Refusal to provide documents
Action taken: ________________________________________________
EDD triggered? [ ] Yes  [ ] No    Analyst: ______  Date: ______
`;

const RFI_TEMPLATE = `REQUEST FOR INFORMATION (RFI)
=============================
To: [Customer / counterparty contact name]
From: [Your name, team]
Date: ______   Ref: [Case/alert ID]
Response due: ______ (allow reasonable time, state the date)

PURPOSE
-------
We are conducting a review of activity on account [masked/account ref].
To complete our assessment we require the following information.
(Do NOT disclose that a suspicious activity report exists or is contemplated —
tipping-off is an offence in most jurisdictions.)

SPECIFIC REQUESTS
-----------------
1. Explain the purpose of the following transactions:
   [date] [amount] [counterparty] [reference]
   [date] [amount] [counterparty] [reference]

2. Provide supporting documentation for the above, e.g.:
   [ ] invoices / contracts   [ ] proof of delivery
   [ ] source of funds evidence   [ ] correspondence

3. Confirm the relationship between your organisation and
   [counterparty name]: ____________________________________

4. Provide your organisation's registration details and
   beneficial ownership information for [counterparty].

FORMAT & CONFIDENTIALITY
-------------------------
Please respond via [secure channel] by [date]. All information
provided will be used solely for compliance purposes and handled
confidentially. If you have questions about this request, contact
[MLRO/compliance mailbox] — do not discuss it with other parties.
`;

const SAR_DEADLINES = `SAR / STR FILING DEADLINES — QUICK REFERENCE
============================================
UNITED STATES (FinCEN SAR)
  Initial filing: 30 calendar days from detection
  Extension to 60 days if no subject identified
  CTR (cash > $10,000): 15 days — separate from SAR
  Continuing activity: new SAR every 90 days

UNITED KINGDOM (NCA / UKFIU)
  Obligation: "as soon as practicable" after knowledge/suspicion
  DAML consent request: NCA has 7 WORKING DAYS to respond
  Moratorium: up to 31 days total if NCA seeks more time
  Deemed consent if NCA silent after notice period
  MLRO authorises; tipping-off is a criminal offence

EUROPEAN UNION
  Deadline varies by member state (days to weeks)
  2024 AML package: AMLR single rulebook + AMLA (Frankfurt)
  Watch transposition timelines

INDIA (FIU-IND)
  STR due within 7 DAYS of concluding a transaction is suspicious
  Applies to all reporting entities (PMLA Rule 8)
  File via FIU-IND portal in prescribed format

INTERNAL SLA REMINDER
---------------------
Statutory clocks start at DETECTION, not at filing.
Build internal SLAs shorter than the legal deadline.
`;

const PRODUCTION_ORDER = `PRODUCTION ORDER / LEGAL REQUEST — RESPONSE CHECKLIST
=============================================================
RECEIVED
  [ ] Verify the order is genuine and properly authorised
      (court order? prosecutor? regulator? — check issuing body)
  [ ] Identify scope: date range, accounts, entities, data types
  [ ] Identify deadline and format requirements
  [ ] Notify MLRO / legal / compliance immediately

PRESERVATION
  [ ] Issue litigation hold — stop routine deletion of relevant data
  [ ] Preserve: account records, KYC files, TM alerts & dispositions,
      SAR/STR copies (internal only — do NOT disclose SAR existence),
      emails, system logs, RFI correspondence

COLLECTION
  [ ] Assign a single owner for the response
  [ ] Collect responsive material with clear provenance
  [ ] Review for privilege / confidentiality before production
  [ ] Do NOT include other customers' data unless ordered
  [ ] Do NOT tip off the subject of the order

PRODUCTION
  [ ] Deliver in the required format by the deadline
  [ ] Keep a record of what was produced and when
  [ ] Log the request and outcome in the compliance register

AFTER
  [ ] Confirm receipt/acknowledgement
  [ ] Close the hold if appropriate; retain records per policy
  [ ] Debrief: any process gaps to fix?
`;


const SAMPLE_SAR = `SAMPLE SAR NARRATIVE — WORKED EXAMPLE (FICTIONAL)
====================================================
This is what a complete, sufficient narrative looks like. All names,
figures and entities are invented for training.

SUBJECT: Meridian Trade Holdings Ltd (customer since 03/2024)
ACCOUNT: Business current account ••••4471
REPORTING PERIOD: 14–28 June
FILED BY: [Analyst name], reviewed by MLRO [name]

NARRATIVE
--------
Between 14 and 22 June, the subject made 14 cash deposits totalling
USD 134,700 across two branches. Each deposit was between USD 9,600
and USD 9,900 — all below the USD 10,000 CTR threshold. Deposits were
made by four different individuals who stated the cash belonged to
"a friend". The customer had no prior cash activity.

Within 24 hours of each deposit, equivalent funds were wired to three
previously unseen entities in Latvia, Cyprus and the UAE. The stated
purpose on the account is "international consulting", but the customer
provided no contracts or invoices when asked.

On 25 June the relationship manager asked for source-of-funds
documentation. The customer initially claimed "consulting revenue"
but could not identify any clients. After a follow-up RFI, the
customer stopped responding.

Open-source checks found the registered office is a virtual-office
address shared by 400+ companies, and the parent company was
incorporated three weeks before the customer.

ASSESSMENT
----------
The pattern — repeated sub-threshold cash deposits by third parties,
same-day pass-through to opaque entities, and evasive responses —
is consistent with structuring and layering. No legitimate business
purpose for the activity has been identified.

WHAT WAS CHECKED
----------------
[x] KYC/UBO file reviewed — ownership chain unresolved, nominee layer
[x] Transaction history reviewed — no prior legitimate activity
[x] OSINT/registry checks — virtual office, recently incorporated parent
[x] RFI sent 25 June — no substantive response
[x] Counterparty screening — no matches, but entities opaque

FOLLOW-UP
---------
Account under enhanced monitoring. No tipping-off: customer has not
been told a report exists or is contemplated.
`;

const ADVERSE_MEDIA = `ADVERSE MEDIA ASSESSMENT — WORKED FRAMEWORK
==============================================
Screening hit: "John Smith" — possible match on PEP/crime news.

STEP 1 — IS IT THE SAME PERSON?
-------------------------------
Compare: DOB, nationality, location, employment history, photo/age.
Hit article: John Smith, 58, former MP, convicted of fraud 2019,
Manchester UK.
Customer: John Smith, DOB 14/03/1966 (age 59), accountant, Leeds UK,
onboarded 2022.
Verdict: POSSIBLE match — age close, name common, location differs.
Needs further verification before deciding.

STEP 2 — IS THE NEWS MATERIAL?
------------------------------
Ask: does it indicate financial crime, fraud, sanctions, or
integrity issues relevant to ML/TF risk?
- "MP attacked in Parliament" -> NOT material
- "Company director fined for accounting fraud" -> MATERIAL
- "Mentioned in fraud investigation" -> MATERIAL until resolved

STEP 3 — DISPOSITION
--------------------
- Confirmed same person + material news -> EDD, PEP/crime risk rating,
  senior approval, enhanced monitoring
- Confirmed different person -> false positive, document rationale
- Unresolvable identity -> treat as higher risk pending verification

WORKED VERDICT (example)
------------------------
Article subject confirmed DIFFERENT person (DOB mismatch, different
career). Disposition: false positive — name match only. Rationale:
common name, DOB and employment history inconsistent, no other
identifiers match. Reviewed by [QA].
`;

const TOOLS = [
  { title: "SAR / STR Narrative", body: SAR_TEMPLATE, tag: "Reporting" },
  { title: "CDD Onboarding Checklist", body: CDD_CHECKLIST, tag: "KYC" },
  { title: "EDD / PEP Checklist", body: EDD_CHECKLIST, tag: "KYC" },
  { title: "Alert Disposition Framework", body: DISPOSITION_FRAMEWORK, tag: "Operations" },
  { title: "TM Rule Tuning Checklist", body: TM_TUNING_CHECKLIST, tag: "Monitoring" },
  { title: "UBO Ownership Worksheet", body: UBO_WORKSHEET, tag: "KYC" },
  { title: "RFI Template", body: RFI_TEMPLATE, tag: "Investigation" },
  { title: "SAR Deadline Quick-Reference", body: SAR_DEADLINES, tag: "Reporting" },
  { title: "Production Order Checklist", body: PRODUCTION_ORDER, tag: "Legal" },
  { title: "Sample SAR Narrative (worked)", body: SAMPLE_SAR, tag: "Reporting" },
  { title: "Adverse Media Assessment", body: ADVERSE_MEDIA, tag: "Investigation" },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Templates & Checklists</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Practical job aids for daily AML/KYC work — copy them into your case
        management system or print them for shift handovers. Adapt thresholds
        and fields to your institution&apos;s policy and local regulation.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {TOOLS.map((tool) => (
          <section
            key={tool.title}
            className="flex flex-col rounded-2xl border border-line bg-surface/50"
          >
            <div className="flex items-center justify-between border-b border-line/60 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  {tool.tag}
                </span>
                <h2 className="font-semibold text-ink">{tool.title}</h2>
              </div>
              <CopyButton text={tool.body} />
            </div>
            <pre className="flex-1 overflow-x-auto whitespace-pre-wrap px-5 py-4 font-mono text-xs leading-6 text-muted">
              {tool.body}
            </pre>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-faint">
        Educational templates only — always follow your institution&apos;s
        approved policies and the text of the applicable law.
      </p>
    </div>
  );
}
