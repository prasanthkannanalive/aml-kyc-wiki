// SAR narrative writing exercises — case brief → draft → scored feedback.

export interface SarExercise {
  slug: string;
  title: string;
  domain: string;
  brief: string;
  /** phrases the model narrative must convey (keyword coverage check) */
  keywords: string[];
  model: string;
  checklist: string[];
}

export const SAR_EXERCISES: SarExercise[] = [
  {
    slug: "structuring-wire",
    title: "Draft the SAR — structuring ring",
    domain: "Transaction monitoring",
    brief:
      "Case file: Customer 'Nova Retail' (sole trader, declared revenue ~$4k/month) made 9 cash deposits of $8,900–$9,900 totalling $87,300 over 12 days — all below the $10,000 CTR threshold. Within 48h of the last deposit the full balance wired to 'Logistics Plus LLC', a first-time counterparty in a FATF grey-list jurisdiction. Customer claims an 'inventory purchase' paid in cash on supplier request; no invoice produced. You have filed the SAR; write the narrative.",
    keywords: [
      "nova retail", "87,300", "9,900", "12 days", "logistics plus",
      "grey", "48", "ctr", "10,000", "structur", "inventory",
      "first-time", "sole trader", "suspicious",
    ],
    model:
      "Between [dates], Nova Retail (sole trader, declared monthly revenue approximately $4,000) conducted nine cash deposits totalling $87,300, each between $8,900 and $9,900 — all deliberately below the $10,000 currency transaction reporting threshold. The customer had no prior cash-deposit activity in three years of relationship history. Within 48 hours of the final deposit, the entire balance of $87,300 was wired to Logistics Plus LLC, a first-time counterparty located in a FATF grey-list jurisdiction. The customer stated the funds were for an 'inventory purchase' payable in cash at supplier request but produced no invoice or corroborating documentation. The pattern of engineered sub-threshold deposits followed by immediate full-balance consolidation to an opaque foreign beneficiary is consistent with structuring and placement of illicit proceeds. Suspicious activity is reported pursuant to the firm's SAR policy; no transaction was processed with knowledge of illicit origin.",
    checklist: [
      "Who — subject identity and customer type stated",
      "What — the suspicious activity described specifically (amounts, dates, pattern)",
      "When — the activity period or dates given",
      "Where — counterparty/jurisdiction identified",
      "Why suspicious — the analyst's reasoning, not just facts",
      "Customer explanation noted and its lack of corroboration",
      "No speculative claims — facts and suspicion only",
    ],
  },
  {
    slug: "pep-nominee",
    title: "Draft the SAR — nominee onboarding",
    domain: "PEP & corruption",
    brief:
      "Case file: 'Daniel Mercer', 24, applied for an account claiming 'music producer' income of $150k/month. Screening showed no PEP hit. However: his residential address matches a PEP application declined 14 days earlier — 'Marcus Mercer', former deputy minister, declined for uncorroborated source of wealth ($40m claimed, adverse media on corruption investigations). Daniel's declared employer 'Mercer Holdings' is the same family conglomerate. Application declined. Write the SAR narrative on the suspected nominee onboarding attempt.",
    keywords: [
      "daniel", "mercer", "marcus", "14", "address", "music producer",
      "150,000", "merc", "deputy minister", "nominee", "family",
      "declined", "corruption", "40", "proxy", "suspicious",
    ],
    model:
      "On [date], an individual identifying as Daniel Mercer, age 24, applied to open an account claiming employment as a 'music producer' with expected monthly income of $150,000. No PEP match was returned on sanctions/PEP screening. However, onboarding review identified that the applicant's residential address is identical to that of a separate application submitted 14 days earlier by Marcus Mercer, a former deputy minister whose application was declined for uncorroborated source of wealth (claimed $40 million; adverse media identified regarding corruption investigations). The applicant's declared employer, Mercer Holdings, is the same family conglomerate associated with the declined PEP application. The convergence of shared address, shared employer, mirrored profile and timing — two weeks after the PEP decline — is consistent with a nominee or proxy onboarding attempt on behalf of a politically exposed person with unresolved corruption exposure. The application was declined and the attempted onboarding is reported as suspicious activity.",
    checklist: [
      "Both individuals identified and linked",
      "The timing relationship stated (14 days post-decline)",
      "Shared address and employer documented",
      "PEP's own status and decline reason referenced",
      "Nominee/proxy assessment explained",
      "Action taken (decline) recorded",
    ],
  },
  {
    slug: "tbml-overinvoice",
    title: "Draft the SAR — attempted TBML",
    domain: "Trade-based ML",
    brief:
      "Case file: Your trade-finance customer presented LC documents for $480,000 — 'men's cotton garments' to a buyer in a high-risk jurisdiction. Market comparables: $195k–$210k. Invoice ~2.3× market. Freight forwarder incorporated 6 weeks ago. Payment routed via unrelated third-country bank. Independent verification found the container held scrap; buyer is a shell; customer claims they were deceived. Write the SAR narrative on the attempted over-invoicing.",
    keywords: [
      "480,000", "cotton", "garment", "195", "210", "2.3", "market",
      "freight forwarder", "6 weeks", "third-country", "scrap",
      "shell", "over-invoic", "tbml", "attempted", "suspicious",
    ],
    model:
      "On [date], the customer presented letter-of-credit documents for $480,000 describing 'men's cotton garments' consigned to a buyer in a high-risk jurisdiction. Trade-data comparables for identical volume and route indicate a market value of $195,000–$210,000 — the invoice representing approximately 2.3 times market value, consistent with over-invoicing. Additional red flags included a freight forwarder incorporated six weeks prior and payment routing through a third-country bank unrelated to the buyer. Payment was held pending verification. Independent inspection subsequently determined the container held scrap material rather than garments, and the buyer was identified as a shell entity. The customer states they were unaware of the scheme. The attempted transaction is consistent with trade-based money laundering through invoice over-valuation; attempted TBML is reportable notwithstanding non-completion. All trade documents are preserved for examiner review.",
    checklist: [
      "Invoice value vs market value quantified",
      "Supporting red flags listed (forwarder, payment routing)",
      "Verification outcome stated (scrap, shell buyer)",
      "Attempted-not-completed distinction made",
      "Customer's claim noted without endorsing it",
      "Documents preserved for examiner",
    ],
  },
];
