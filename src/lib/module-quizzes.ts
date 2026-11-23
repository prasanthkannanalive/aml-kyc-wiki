export interface ModuleQuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

// 5-question end-of-module checks, keyed by course slug then module num
export const MODULE_QUIZZES: Record<string, Record<number, ModuleQuizQuestion[]>> = {
  "kyc-cdd-tm-analyst": {
    1: [
      {
        q: "The risk-based approach requires the firm to:",
        options: [
          "Apply identical CDD to every customer regardless of risk",
          "Concentrate controls where ML/TF risk is highest, proportionate to the rating",
          "Only monitor high-risk customers and ignore the rest",
          "Avoid any risk assessment to keep onboarding fast",
        ],
        answer: 1,
      },
      {
        q: "Which factor is NOT typically part of a customer risk score?",
        options: [
          "Customer's country of residence",
          "Product or service being used",
          "Delivery channel (branch vs remote)",
          "Customer's favourite colour or hobby",
        ],
        answer: 3,
      },
      {
        q: "Inherent risk vs residual risk: residual risk is",
        options: [
          "The risk before any controls are applied",
          "The risk that remains after controls are applied",
          "The risk of the bank failing entirely",
          "The same as inherent risk — the terms are interchangeable",
        ],
        answer: 1,
      },
      {
        q: "Perpetual KYC (pKYC) differs from periodic refresh because it:",
        options: [
          "Only reviews customers once every five years",
          "Updates the file continuously on trigger events rather than fixed calendar cycles",
          "Eliminates the need for any documentation",
          "Applies only to corporate customers",
        ],
        answer: 1,
      },
      {
        q: "A customer is manually downgraded from high to low risk. The key control is:",
        options: [
          "No control needed — overrides are always allowed",
          "Documented rationale, segregation of duties, approval threshold and audit trail",
          "Just change the score and move on",
          "Tell the customer their risk rating improved",
        ],
        answer: 1,
      },
    ],
    2: [
      {
        q: "PEP status applies to:",
        options: [
          "Only heads of state",
          "Anyone entrusted with a prominent public function, plus RCAs and often PEP-owned entities",
          "Only foreign politicians",
          "Anyone who has ever held any government job",
        ],
        answer: 1,
      },
      {
        q: "Source of Funds vs Source of Wealth: SoF asks",
        options: [
          "How the customer got rich over their lifetime",
          "Where the specific funds in this transaction came from",
          "What the customer's salary is",
          "Whether the customer has a pension",
        ],
        answer: 1,
      },
      {
        q: "RCAs (relatives and close associates) matter because:",
        options: [
          "They are always criminals",
          "They can be conduits for the PEP's influence or unexplained wealth",
          "They are exempt from all checks",
          "They only matter for domestic PEPs",
        ],
        answer: 1,
      },
      {
        q: "Digital ID verification stack typically includes:",
        options: [
          "Just a selfie photo",
          "Document capture, chip verification, liveness detection, facial match and database checks",
          "Only a credit score",
          "A handwritten signature",
        ],
        answer: 1,
      },
      {
        q: "A foreign PEP customer cannot explain their source of wealth. The correct action is:",
        options: [
          "Onboard anyway — PEPs are protected",
          "Apply EDD, document the gap, and consider declining if risk cannot be managed",
          "Ignore the issue — it is not your problem",
          "File a SAR immediately without further checks",
        ],
        answer: 1,
      },
    ],
    3: [
      {
        q: "Ultimate beneficial ownership means identifying:",
        options: [
          "The person who signed the account opening form",
          "The natural person who ultimately owns or controls the entity",
          "The company's lawyer",
          "The bank's compliance officer",
        ],
        answer: 1,
      },
      {
        q: "A common UBO threshold in UK/EU/US regimes is:",
        options: ["5%", "10%", "25%", "50%"],
        answer: 2,
      },
      {
        q: "Indirect ownership calculation: Person owns 50% of HoldCo A, which owns 60% of OpCo B. Indirect ownership of B =",
        options: ["50%", "30%", "60%", "110%"],
        answer: 1,
      },
      {
        q: "Bearer shares are high-risk because:",
        options: [
          "They are always worthless",
          "Ownership is unknowable by design — whoever holds the certificate owns the shares",
          "They are illegal everywhere",
          "They only exist in the US",
        ],
        answer: 1,
      },
      {
        q: "When beneficial ownership cannot be established despite reasonable efforts, the firm should:",
        options: [
          "Onboard anyway without documentation",
          "Apply enhanced controls, document the failure, and consider declining",
          "Ignore it — some structures are just complex",
          "Ask the customer to sign a waiver",
        ],
        answer: 1,
      },
    ],
    4: [
      {
        q: "Structuring (smurfing) is:",
        options: [
          "Depositing large sums in one transaction",
          "Breaking large amounts into sub-threshold transactions to evade reporting",
          "Investing in structured products",
          "Paying employees in cash",
        ],
        answer: 1,
      },
      {
        q: "The most reliable way to detect structuring is:",
        options: [
          "Looking at single transactions only",
          "Aggregating amounts over rolling time windows and checking threshold proximity",
          "Asking the customer directly",
          "Checking credit scores",
        ],
        answer: 1,
      },
      {
        q: "Rapid movement of funds (pass-through) is characterised by:",
        options: [
          "Money sitting in accounts for months",
          "Funds arriving and leaving within hours or days with minimal retention",
          "Large one-time deposits with no follow-up",
          "Slow, steady salary payments",
        ],
        answer: 1,
      },
      {
        q: "TBML (trade-based money laundering) primarily uses:",
        options: [
          "Cash deposits at branches",
          "Mispriced invoices, phantom shipments and document fraud in trade finance",
          "Cryptocurrency mixers",
          "Hawala networks",
        ],
        answer: 1,
      },
      {
        q: "A transaction monitoring rule that has never been reviewed in three years is:",
        options: [
          "Perfectly fine — rules don't need changes",
          "A likely examiner finding — tuning must be documented and periodic",
          "Illegal",
          "Automatically approved by regulators",
        ],
        answer: 1,
      },
    ],
    5: [
      {
        q: "OSINT in AML investigations primarily uses:",
        options: [
          "Classified government databases",
          "Publicly available information: registries, court records, news, social media",
          "The customer's private browsing history",
          "Hacked databases",
        ],
        answer: 1,
      },
      {
        q: "Adverse media screening's main challenge is:",
        options: [
          "Finding too few results",
          "Separating material risk signals from noise — common names, old news, resolved matters",
          "Paying for the database",
          "Reading in foreign languages",
        ],
        answer: 1,
      },
      {
        q: "Counterparty analysis matters because:",
        options: [
          "All counterparties are criminals",
          "The network around an alert often reveals patterns invisible at the individual transaction level",
          "It is required by law in all jurisdictions",
          "It replaces the need for transaction monitoring",
        ],
        answer: 1,
      },
      {
        q: "A well-written RFI should be:",
        options: [
          "Vague and open-ended",
          "Specific about transactions and information needed, with a clear deadline, without tipping off",
          "A threat to close the account",
          "Sent only by registered mail",
        ],
        answer: 1,
      },
      {
        q: "Case documentation should be:",
        options: [
          "Reconstructed from memory after the fact",
          "Contemporaneous, factual, complete, consistent and preserved",
          "Only the final disposition",
          "Written in legal jargon",
        ],
        answer: 1,
      },
    ],
    6: [
      {
        q: "A SAR/STR is required when the firm has:",
        options: [
          "Proof beyond reasonable doubt of money laundering",
          "Knowledge or suspicion of money laundering or terrorist financing",
          "A customer complaint",
          "A routine audit finding",
        ],
        answer: 1,
      },
      {
        q: "The US FinCEN SAR deadline is:",
        options: ["7 days", "15 days", "30 days", "90 days"],
        answer: 2,
      },
      {
        q: "Tipping-off means:",
        options: [
          "Telling the customer their account is fine",
          "Disclosing to the customer that they are suspected or that a SAR has been filed",
          "Sharing information between compliance staff",
          "Reporting to the wrong FIU",
        ],
        answer: 1,
      },
      {
        q: "A SAR narrative should:",
        options: [
          "Accuse the customer of crimes",
          "State facts chronologically with exact figures, describing suspicion not guilt",
          "Be as short as possible",
          "Only include the analyst's opinion",
        ],
        answer: 1,
      },
      {
        q: "A production order from law enforcement requires the institution to:",
        options: [
          "Produce all customer data immediately",
          "Produce the specific documents ordered, within the deadline, after verifying authenticity and legal basis",
          "Tell the customer about the order",
          "Ignore it — it is not binding",
        ],
        answer: 1,
      },
    ],
  },
};

export const FINAL_EXAM: Record<string, ModuleQuizQuestion[]> = {
  "kyc-cdd-tm-analyst": [
    {
      q: "Under the risk-based approach, simplified due diligence (SDD) is appropriate when:",
      options: [
        "The customer asks for it politely",
        "The customer, product and jurisdiction are demonstrably low-risk",
        "The onboarding team is busy",
        "The customer has been a client for over a year",
      ],
      answer: 1,
    },
    {
      q: "pKYC differs from periodic review because it:",
      options: [
        "Reviews every customer every year",
        "Uses event-driven triggers and continuous risk signals instead of fixed calendar cycles",
        "Eliminates the need for any CDD",
        "Only applies to corporate customers",
      ],
      answer: 1,
    },
    {
      q: "A foreign PEP customer is onboarding. Which is NOT typically required under EDD?",
      options: [
        "Senior management approval",
        "Source of wealth corroboration",
        "Skipping adverse media screening because PEPs are already known",
        "Enhanced ongoing monitoring",
      ],
      answer: 2,
    },
    {
      q: "Person A owns 50% of HoldCo, which owns 60% of Target Co. Person A's indirect stake in Target Co is:",
      options: ["30%", "60%", "45%", "15%"],
      answer: 0,
    },
    {
      q: "Which is a TBML red flag in trade finance?",
      options: [
        "Over-invoicing goods to move excess value across borders",
        "A customer paying invoices on time",
        "Using a domestic bank account",
        "Keeping invoices for seven years",
      ],
      answer: 0,
    },
    {
      q: "A funnel account is best described as:",
      options: [
        "An account used to collect many small deposits that are then consolidated and moved elsewhere",
        "A dormant account reopened after years",
        "A joint account with two signatories",
        "An account held by a funnel-marketing firm",
      ],
      answer: 0,
    },
    {
      q: "When writing an RFI during an investigation, you should NOT:",
      options: [
        "Name the specific transactions being queried",
        "State a clear response deadline",
        "Hint that a suspicious activity report has been filed",
        "Provide a secure response channel",
      ],
      answer: 2,
    },
    {
      q: "Under PMLA Rule 8 (India), an STR must be filed within:",
      options: [
        "30 days of the transaction",
        "7 days of concluding the transaction is suspicious",
        "15 days of detection",
        "There is no deadline",
      ],
      answer: 1,
    },
    {
      q: "In the UK DAML regime, if the NCA does not respond within the 7-working-day notice period:",
      options: [
        "Consent is refused",
        "Consent is deemed to have been given",
        "The transaction must be blocked permanently",
        "The firm must refile",
      ],
      answer: 1,
    },
    {
      q: "A good SAR narrative should:",
      options: [
        "State facts chronologically with exact figures, describing suspicion rather than proven guilt",
        "Only list the analyst's conclusions",
        "Be as brief as possible regardless of detail",
        "Accuse the customer of specific crimes",
      ],
      answer: 0,
    },
  ],
};
