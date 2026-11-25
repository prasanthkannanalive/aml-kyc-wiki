export interface Chapter {
  num: string;
  title: string;
  page?: number;
}

export interface CourseModule {
  num: number;
  title: string;
  chapters: Chapter[];
  quiz?: { q: string; options: string[]; answer: number }[];
}

export interface Course {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  provider: string;
  accreditation?: string;
  description: string;
  audience: string[];
  level: "Foundation" | "Practitioner" | "Advanced";
  pages: number;
  modules: CourseModule[];
  outcomes: string[];
  reads: number;
  completions: number;
  featured?: boolean;
  lastReviewed?: string;
  jurisdictions?: string[];
  sources?: { module: string; items: { title: string; url: string; note?: string }[] }[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface LeaderboardEntry {
  rank: number;
  title: string;
  course: string;
  courseSlug: string;
  category: string;
  reads: number;
  completions: number;
  trend: "up" | "down" | "same";
  blurb: string;
  mins: number;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const categories: Category[] = [
  {
    slug: "fraud-prevention",
    name: "Fraud Prevention",
    description:
      "APP scams, account takeover, mules, card fraud, BEC and building an end-to-end fraud programme.",
    count: 41,
  },
  {
    slug: "sanctions-screening",
    name: "Sanctions Screening",
    description:
      "UN, OFAC, EU and UK regimes, list matching, alert disposition, and vessel screening.",
    count: 42,
  },
  {
    slug: "counter-terrorist-financing",
    name: "Counter-Terrorist Financing",
    description:
      "Why TF differs from money laundering, FATF and UNSCR frameworks, channels and detection.",
    count: 20,
  },
  {
    slug: "financial-intelligence",
    name: "Financial Intelligence",
    description:
      "Following the money in human trafficking: typologies, red flags, STRs and institutional frameworks.",
    count: 24,
  },
  {
    slug: "regulatory-frameworks",
    name: "Regulatory Frameworks",
    description:
      "FATF recommendations, UNSC resolutions, OFAC list families, EU and UK regimes, conflicts of law.",
    count: 18,
  },
  {
    slug: "glossary",
    name: "Glossary",
    description:
      "Plain-language definitions of AML, KYC, CDD, EDD, STR, PEP, UBO and the rest of the vocabulary.",
    count: 55,
  },
  {
    slug: "virtual-asset-compliance",
    name: "Virtual Asset Compliance",
    description:
      "Crypto AML: VASPs, the Travel Rule, on-chain tracing, mixers, exposure scoring and VASP operations.",
    count: 20,
  },
  {
    slug: "trade-based-laundering",
    name: "Trade-Based Laundering",
    description:
      "TBML techniques, invoice manipulation, documentary red flags and correspondent-banking exposure.",
    count: 16,
  },
];

export const courses: Course[] = [
  {
    slug: "fraud-prevention",
    code: "AML-Fraud",
    title: "Certified Fraud Prevention Analyst",
    tagline: "Anti-Fraud Certification — Study Guide",
    provider: "Independent certification prep",
    description:
      "A complete study guide for the person who has to deal with fraud inside a bank, a fintech or a payments firm — deciding whether a payment should be held, whether a pattern is a scheme, or what to say to a customer who has just lost their savings. Covers fraud fundamentals, the fraud risk management programme, external and internal fraud typologies, detection and analytics, investigation and response, and who bears the loss across UK, EU, US and other regimes.",
    audience: [
      "Fraud operations analysts",
      "Compliance, risk and audit staff",
      "Product, payments and technology teams",
      "Career movers into fraud work",
    ],
    level: "Practitioner",
    pages: 175,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 48210,
    completions: 6214,
    featured: true,
    outcomes: [
      "Distinguish fraud typologies and the language of loss",
      "Design and tune detection rules, models and alert queues",
      "Run investigations from alert to case and recovery",
      "Compare reimbursement and liability regimes across jurisdictions",
      "Build an end-to-end fraud prevention programme",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "FATF Recommendations — predicate offences & risk-based approach", url: "https://www.fatf-gafi.org" },
          { title: "UK Finance — Fraud Prevention Guide & APP fraud data", url: "https://www.ukfinance.org.uk" },
          { title: "Payment Systems Regulator — APP fraud reimbursement rules", url: "https://www.psr.org.uk" },
          { title: "US FinCEN — SAR guidance & fraud typologies", url: "https://www.fincen.gov" },
          { title: "ACFE — Fraud Examiners Manual (industry standard)", url: "https://www.acfe.com" },
          { title: "Wolfsberg Group — financial-crime guidance statements", url: "https://wolfsberg-group.org" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "Fraud fundamentals",
        chapters: [
          { num: "1.1", title: "What fraud is and what it is not" },
          { num: "1.2", title: "Why people commit fraud" },
          { num: "1.3", title: "Reading the numbers" },
          { num: "1.4", title: "Where fraud sits in a financial institution" },
          { num: "1.5", title: "The fraud lifecycle and the language of loss" },
        ],
      },
      {
        num: 2,
        title: "The fraud risk management programme",
        chapters: [
          { num: "2.1", title: "Governance and tone" },
          { num: "2.2", title: "Fraud risk assessment" },
          { num: "2.3", title: "Preventive and detective controls" },
          { num: "2.4", title: "Monitoring, metrics and improvement" },
          { num: "2.5", title: "The three lines and who owns fraud" },
          { num: "2.6", title: "Organisational liability for fraud" },
        ],
      },
      {
        num: 3,
        title: "External fraud",
        chapters: [
          { num: "3.1", title: "Authorised push payment scams" },
          { num: "3.2", title: "Account takeover and unauthorised payments" },
          { num: "3.3", title: "Money mules and mule accounts" },
          { num: "3.4", title: "Card fraud" },
          { num: "3.5", title: "Identity, application and first-party fraud" },
          { num: "3.6", title: "Business email compromise and corporate payment fraud" },
          { num: "3.7", title: "Cheque, deposit and other payment fraud" },
        ],
      },
      {
        num: 4,
        title: "Internal and third-party fraud",
        chapters: [
          { num: "4.1", title: "Occupational fraud and how it is classified" },
          { num: "4.2", title: "Expense, payroll and vendor fraud" },
          { num: "4.3", title: "Insider fraud in financial institutions" },
          { num: "4.4", title: "Third-party and outsourcing risk" },
          { num: "4.5", title: "Tips, hotlines and whistleblowing" },
        ],
      },
      {
        num: 5,
        title: "Detection and analytics",
        chapters: [
          { num: "5.1", title: "Detection strategy" },
          { num: "5.2", title: "Red flags and rules" },
          { num: "5.3", title: "Analytics and models" },
          { num: "5.4", title: "Alert management and tuning" },
          { num: "5.5", title: "Authentication, device and behavioural signals" },
          { num: "5.6", title: "Model risk, data and governance" },
        ],
      },
      {
        num: 6,
        title: "Investigation and response",
        chapters: [
          { num: "6.1", title: "From alert to case" },
          { num: "6.2", title: "Investigating" },
          { num: "6.3", title: "Dealing with customers" },
          { num: "6.4", title: "Recovery and loss mitigation" },
          { num: "6.5", title: "Reporting and information sharing" },
          { num: "6.6", title: "Learning from cases" },
        ],
      },
      {
        num: 7,
        title: "Regulation, liability and technology",
        chapters: [
          { num: "7.1", title: "Who bears the loss: the UK" },
          { num: "7.2", title: "The EU" },
          { num: "7.3", title: "The United States" },
          { num: "7.4", title: "Other regimes in brief" },
          { num: "7.5", title: "Comparing the regimes" },
          { num: "7.6", title: "AI, deepfakes and emerging fraud" },
          { num: "7.7", title: "Building a programme: bringing it together" },
        ],
      },
    ],
  },
  {
    slug: "sanctions-screening",
    code: "AML-Screening",
    title: "Certified Sanctions Screening Analyst",
    tagline: "Sanctions Screening — Study Guide",
    provider: "Independent certification prep",
    description:
      "Written for the person who works sanctions alerts, or who is about to. Covers what sanctions are and why they exist, who imposes them (UN, US, EU, UK and others), every category of measure, ownership and control rules including the 50 percent rule, how screening lists and matching engines actually work, alert disposition, and vessel and maritime screening including AIS evasion and the oil price cap.",
    audience: [
      "Sanctions screening analysts",
      "AML analysts moving into screening",
      "Trade compliance staff",
      "Onboarding and KYC teams",
    ],
    level: "Foundation",
    pages: 138,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 39880,
    completions: 5471,
    featured: true,
    outcomes: [
      "Explain UN, OFAC, EU and UK sanctions regimes and their reach",
      "Apply ownership, control and beneficial-ownership tests",
      "Tune screening thresholds and dispose of alerts with defensible rationales",
      "Screen vessels, read AIS data and recognise evasion techniques",
      "Distinguish sanctions screening from AML analysis",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "OFAC — Sanctions lists & SDN search", url: "https://ofac.treasury.gov" },
          { title: "UN Security Council — Consolidated Sanctions List", url: "https://main.un.org/securitycouncil/en/content/un-sc-consolidated-list" },
          { title: "EU — Consolidated sanctions list & Sanctions Map", url: "https://www.sanctionsmap.eu" },
          { title: "UK OFSI — Consolidated list & guidance", url: "https://www.gov.uk/government/organisations/office-of-financial-sanctions-implementation" },
          { title: "FATF — Recommendation 6 (targeted financial sanctions)", url: "https://www.fatf-gafi.org" },
          { title: "OFAC — 50% Rule & ownership guidance", url: "https://ofac.treasury.gov" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "What sanctions are and why they exist",
        chapters: [
          { num: "1.1", title: "What a sanction is" },
          { num: "1.2", title: "From embargoes to targeted measures" },
          { num: "1.3", title: "Why sanctions are imposed" },
          { num: "1.4", title: "Why targeting replaced embargoes" },
          { num: "1.5", title: "The cost of sanctions" },
        ],
      },
      {
        num: 2,
        title: "Who imposes sanctions",
        chapters: [
          { num: "2.1", title: "The United Nations" },
          { num: "2.2", title: "The United States" },
          { num: "2.3", title: "The OFAC list family" },
          { num: "2.4", title: "Reach: primary, secondary and the US nexus" },
          { num: "2.5", title: "The European Union and the United Kingdom" },
          { num: "2.6", title: "Other jurisdictions and conflicts of law" },
        ],
      },
      {
        num: 3,
        title: "Types of sanctions",
        chapters: [
          { num: "3.1", title: "Asset freezes and the making-available prohibition" },
          { num: "3.2", title: "Comprehensive and territorial measures" },
          { num: "3.3", title: "Sectoral and financial measures" },
          { num: "3.4", title: "Trade measures, arms embargoes and dual-use goods" },
          { num: "3.5", title: "Travel bans, transport and aviation measures" },
          { num: "3.6", title: "Correspondent banking and financial messaging" },
        ],
      },
      {
        num: 4,
        title: "Ownership, control and the 50 percent rule",
        chapters: [
          { num: "4.1", title: "Why ownership extends the freeze" },
          { num: "4.2", title: "The United States: the Fifty Percent Rule" },
          { num: "4.3", title: "The European Union test" },
          { num: "4.4", title: "The United Kingdom test" },
          { num: "4.5", title: "Working through a structure" },
          { num: "4.6", title: "Trusts, nominees and opaque structures" },
          { num: "4.7", title: "What screening cannot see" },
        ],
      },
      {
        num: 5,
        title: "Screening: lists, data and matching",
        chapters: [
          { num: "5.1", title: "Lists, sources and currency" },
          { num: "5.2", title: "How matching works" },
          { num: "5.3", title: "Names that break matching" },
          { num: "5.4", title: "Secondary identifiers" },
          { num: "5.5", title: "Thresholds and tuning" },
          { num: "5.6", title: "What screening misses" },
        ],
      },
      {
        num: 6,
        title: "Alert handling and investigation",
        chapters: [
          { num: "6.1", title: "Reading an alert" },
          { num: "6.2", title: "Discounting an individual" },
          { num: "6.3", title: "Discounting an entity" },
          { num: "6.4", title: "Escalation" },
          { num: "6.5", title: "Writing the rationale" },
          { num: "6.6", title: "When the match is real" },
        ],
      },
      {
        num: 7,
        title: "Vessel and maritime screening",
        chapters: [
          { num: "7.1", title: "Why vessels are screened" },
          { num: "7.2", title: "Vessel identity" },
          { num: "7.3", title: "AIS and dark activity" },
          { num: "7.4", title: "Evasion techniques" },
          { num: "7.5", title: "The oil price cap" },
          { num: "7.6", title: "Vessels in trade documents" },
        ],
      },
    ],
  },
  {
    slug: "counter-terrorist-financing",
    code: "AML-CTF",
    title: "Certified Counter-Terrorist Financing Analyst",
    tagline: "Counter-Terrorist Financing — Study Guide",
    provider: "Independent certification prep",
    description:
      "For the analyst who has to decide whether something in front of them is terrorist financing. Almost everything you already know about money laundering will mislead you here — TF runs in the opposite direction, moves sums too small to trip a threshold, and frequently uses money that was never criminal in the first place. Covers what TF is, where the money comes from, the FATF recommendations and UNSCR 1267/1373, informal value transfer, behavioural detection, reporting, tipping-off and de-risking.",
    audience: [
      "AML analysts",
      "Sanctions screening staff",
      "Compliance professionals",
      "Anyone moving into CFT work",
    ],
    level: "Advanced",
    pages: 78,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 27430,
    completions: 3892,
    featured: true,
    outcomes: [
      "Explain why TF is not money laundering and why AML controls miss it",
      "Apply FATF Recommendation 6/8 and UNSCR frameworks",
      "Recognise hawala, cash courier and virtual-asset channels",
      "Use behavioural and network indicators instead of thresholds",
      "Report suspicions and navigate tipping-off and de-risking rules",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "FATF — Recommendation 32 (CTF) & typology reports", url: "https://www.fatf-gafi.org" },
          { title: "UN Security Council — CTF resolutions (1373, 2462 & ISIL/Al-Qaida regime)", url: "https://main.un.org/securitycouncil/en" },
          { title: "Egmont Group — FIU-to-FIU information exchange", url: "https://egmontgroup.org" },
          { title: "US FinCEN — CTF advisories & SAR guidance", url: "https://www.fincen.gov" },
          { title: "UK NCA / UKFIU — SAR guidance for CTF", url: "https://www.nationalcrimeagency.gov.uk" },
          { title: "FATF/Egmont — TBML & NPO risk indicator reports", url: "https://www.fatf-gafi.org" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "What terrorist financing is",
        chapters: [
          { num: "1.1", title: "Why TF is not money laundering" },
          { num: "1.2", title: "Where the money comes from" },
          { num: "1.3", title: "The scale problem" },
          { num: "1.4", title: "Why AML controls miss it" },
        ],
      },
      {
        num: 2,
        title: "The international framework",
        chapters: [
          { num: "2.1", title: "FATF and the TF recommendations" },
          { num: "2.2", title: "UNSCR 1267 and 1373" },
          { num: "2.3", title: "Freezing without delay" },
          { num: "2.4", title: "Recommendation 8 and the non-profit problem" },
        ],
      },
      {
        num: 3,
        title: "How the money moves",
        chapters: [
          { num: "3.1", title: "Formal banking channels" },
          { num: "3.2", title: "Hawala and informal value transfer" },
          { num: "3.3", title: "Cash couriers and bulk cash" },
          { num: "3.4", title: "Trade, virtual assets and crowdfunding" },
        ],
      },
      {
        num: 4,
        title: "Detection",
        chapters: [
          { num: "4.1", title: "Why behaviour beats thresholds" },
          { num: "4.2", title: "Account and transaction indicators" },
          { num: "4.3", title: "Network indicators and the small cell" },
          { num: "4.4", title: "What indicators cannot do" },
        ],
      },
      {
        num: 5,
        title: "Response",
        chapters: [
          { num: "5.1", title: "Where CFT meets sanctions screening" },
          { num: "5.2", title: "Reporting a suspicion" },
          { num: "5.3", title: "Tipping off" },
          { num: "5.4", title: "De-risking, and the cost of getting this wrong" },
        ],
      },
    ],
  },
  {
    slug: "financial-intelligence-trafficking",
    code: "AML-FIHT",
    featured: true,
    title: "Financial Intelligence Against Human Trafficking",
    tagline: "FIHT Official e-Study Book — Version 2.1",
    provider: "Independent certification prep",
    description:
      "Human trafficking generates an estimated USD 150 billion annually in illegal proceeds that move through banks, money service businesses, fintech platforms and virtual asset service providers. This program bridges the gap between theory and applied detection — typologies and financial flow models, red flags in banking and crypto channels, STR writing and reporting protocols, international cooperation, and building an institutional anti-trafficking framework with an audit-ready 90-day playbook.",
    audience: [
      "AML, KYC and TM analysts",
      "Crypto compliance officers",
      "Fintech and VASP compliance teams",
      "Social-impact certification candidates",
    ],
    level: "Foundation",
    pages: 45,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 18960,
    completions: 2744,
    outcomes: [
      "Map trafficking typologies onto financial flow models",
      "Spot red flags in banking, fintech and virtual-asset channels",
      "Write defensible STRs and follow reporting protocols",
      "Build governance, risk assessment and a 90-day implementation roadmap",
      "Align controls with FATF, Egmont and UNODC expectations",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "FATF — Trade-based money laundering reports (with Egmont)", url: "https://www.fatf-gafi.org" },
          { title: "FinCEN — Funnel accounts advisory FIN-2014-A005", url: "https://www.fincen.gov" },
          { title: "UNODC — trafficking & financial flows reports", url: "https://www.unodc.org" },
          { title: "IFC — TBML techniques tip sheets", url: "https://www.ifc.org" },
          { title: "Wolfsberg Group — effective monitoring statements", url: "https://wolfsberg-group.org" },
          { title: "UKFIU — SAR best practice guidance", url: "https://www.nationalcrimeagency.gov.uk" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "Understanding Human Trafficking and Financial Flows",
        chapters: [
          { num: "1.1", title: "Defining Human Trafficking in the Context of Financial Crime" },
          { num: "1.2", title: "The Scale, Sectors, and Economics of Exploitation" },
          { num: "1.3", title: "The Role of Financial Systems in Enabling and Detecting Trafficking" },
          { num: "1.4", title: "Typologies and Financial Flow Models" },
          { num: "1.5", title: "Global Regulatory and Institutional Frameworks" },
          { num: "1.6", title: "Institutional Responsibilities and Data-Driven Detection" },
        ],
      },
      {
        num: 2,
        title: "Financial Indicators and Red Flags",
        chapters: [
          { num: "2.1", title: "Translating Human Trafficking Risks into Financial Behavior" },
          { num: "2.2", title: "Key Red Flags in Banking and FinTech Channels" },
          { num: "2.3", title: "Indicators in Virtual Asset and Cross-Border Channels" },
          { num: "2.4", title: "Case Studies: How Financial Patterns Revealed Human Trafficking" },
          { num: "2.5", title: "Escalation, STR Writing, and Reporting Protocols" },
          { num: "2.6", title: "Collaboration, Awareness, and Industry Initiatives" },
        ],
      },
      {
        num: 3,
        title: "Regulatory Obligations and International Cooperation",
        chapters: [
          { num: "3.1", title: "The Global Legal Foundation Against Human Trafficking" },
          { num: "3.2", title: "Institutional Obligations Under AML/CFT Frameworks" },
          { num: "3.3", title: "International Cooperation and Information Exchange Mechanisms" },
          { num: "3.4", title: "Public–Private Partnerships (PPPs) and Collaborative Models" },
          { num: "3.5", title: "Sanctions, Trade Compliance, and Financial Crime Convergence" },
          { num: "3.6", title: "Technology, RegTech, and Data Analytics for Detection" },
        ],
      },
      {
        num: 4,
        title: "Building an Institutional Anti-Trafficking Framework",
        chapters: [
          { num: "4.1", title: "Governance & Ownership: Turning Awareness into Accountable Controls" },
          { num: "4.2", title: "Risk Assessment & Control Library (Practical, Deployable)" },
          { num: "4.3", title: "Implementation Roadmap: 90-Day Playbook (Audit-Ready)" },
          { num: "4.4", title: "Training & Competency: Role-Based Model (accreditation-aligned)" },
          { num: "4.5", title: "Audit & Regulatory Exam Readiness (Evidence Pack)" },
          { num: "4.6", title: "Metrics, Model Risk & Continuous Improvement" },
        ],
      },
    ],
  },
  {
    slug: "kyc-cdd-tm-analyst",
    code: "AML-Operations Core",
    featured: true,
    title: "Certified KYC/CDD & Transaction Monitoring Analyst",
    tagline: "KYC · CDD/EDD · KYB · UBO · TM · SAR/STR — Practitioner Track",
    provider: "Independent certification prep",
    description:
      "The operational core of AML work: the day-to-day disciplines that sit between customer onboarding and the regulator. Six modules cover the risk-based approach and customer lifecycle, individual KYC and PEPs, corporate KYB and ultimate beneficial ownership, transaction monitoring mechanics and typologies, alert investigation and evidence gathering, and SAR/STR narrative writing — synthesising FATF, Wolfsberg, FinCEN, FFIEC and FIU-IND source material into one practitioner programme. The chapters are study notes distilled from roughly 150 pages of primary source guidance — the sources section maps every module to its references.",
    audience: [
      "L1 onboarding and alert analysts",
      "L2 investigators",
      "QA and team leads",
      "Compliance officers building analyst capability",
    ],
    level: "Practitioner",
    pages: 150,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 31540,
    completions: 4890,
    outcomes: [
      "Apply the risk-based approach across the full customer lifecycle",
      "Verify individual identity, including digital ID, liveness and PEP/RCAs",
      "Unwrap corporate structures to identify ultimate beneficial owners",
      "Operate transaction monitoring: rules, thresholds, typologies and tuning",
      "Investigate alerts with OSINT, adverse media and counterparty analysis",
      "Write SAR/STR narratives that survive regulatory review",
    ],
    modules: [
      {
        num: 1,
        title: "The Risk-Based Approach & Customer Lifecycle",
        chapters: [
          { num: "1.1", title: "The Risk-Based Approach: Foundations and Risk Scoring" },
          { num: "1.2", title: "Customer Risk Factors: Geography, Product and Channel" },
          { num: "1.3", title: "CDD, SDD and EDD: Matching Controls to Risk" },
          { num: "1.4", title: "The Customer Lifecycle: Onboarding to Exit" },
          { num: "1.5", title: "Perpetual KYC vs Periodic Refresh Cycles" },
          { num: "1.6", title: "Customer Risk Rating in Practice: Tiers, Triggers and Overrides" },
        ],
      },
      {
        num: 2,
        title: "Individual KYC & Politically Exposed Persons",
        chapters: [
          { num: "2.1", title: "Identity Verification and Document Authentication" },
          { num: "2.2", title: "Digital ID, Liveness Checks and Biometrics" },
          { num: "2.3", title: "Domestic vs Foreign PEPs: Classification and Risk" },
          { num: "2.4", title: "RCAs: Relatives and Close Associates" },
          { num: "2.5", title: "Source of Wealth vs Source of Funds" },
          { num: "2.6", title: "PEP EDD Workflow and Ongoing Monitoring" },
        ],
      },
      {
        num: 3,
        title: "Corporate KYC (KYB) & Ultimate Beneficial Ownership",
        chapters: [
          { num: "3.1", title: "Entity Verification and Corporate Registry Checks" },
          { num: "3.2", title: "Unwrapping Multi-Layered Holding Companies" },
          { num: "3.3", title: "Trusts and Foundations: Mapping Legal Arrangements" },
          { num: "3.4", title: "Nominee Directors, Bearer Shares and Intermediaries" },
          { num: "3.5", title: "UBO Thresholds: 10% vs 25% and Indirect Ownership" },
          { num: "3.6", title: "Unresolved Structures: Documentation and Escalation" },
        ],
      },
      {
        num: 4,
        title: "Transaction Monitoring Mechanics & Typologies",
        chapters: [
          { num: "4.1", title: "Monitoring Systems: Rule-Based vs Behavioural vs ML" },
          { num: "4.2", title: "Thresholds, Tuning and False-Positive Management" },
          { num: "4.3", title: "Structuring and Smurfing Detection" },
          { num: "4.4", title: "Rapid Movement of Funds and Funnel Accounts" },
          { num: "4.5", title: "Trade-Based Money Laundering Red Flags" },
          { num: "4.6", title: "Alert Coverage, Testing and System Assurance" },
        ],
      },
      {
        num: 5,
        title: "Alert Investigation & Evidence Gathering",
        chapters: [
          { num: "5.1", title: "The Investigation Workflow and Case Management" },
          { num: "5.2", title: "OSINT Techniques for AML Investigations" },
          { num: "5.3", title: "Adverse Media Screening: Signal vs Noise" },
          { num: "5.4", title: "Counterparty Analysis and Network Mapping" },
          { num: "5.5", title: "Requests for Information: Best Practices" },
          { num: "5.6", title: "Evidence Gathering and Case Documentation" },
        ],
      },
      {
        num: 6,
        title: "SAR/STR Narrative Writing & Regulatory Reporting",
        chapters: [
          { num: "6.1", title: "SAR/STR Fundamentals and the Five Ws + How" },
          { num: "6.2", title: "Narrative Writing: Structure, Facts and Plain Language" },
          { num: "6.3", title: "Filing Timelines Across Jurisdictions" },
          { num: "6.4", title: "Tipping-Off and SAR Confidentiality" },
          { num: "6.5", title: "Electronic Filing, Forms and Recordkeeping" },
          { num: "6.6", title: "Law Enforcement Requests and Production Orders" },
        ],
      },
    ],
    sources: [
      {
        module: "Module 1 — Risk-Based Approach & Customer Lifecycle",
        items: [
          { title: "FATF Recommendations (International Standards, 2012, updated)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/FATF%20Recommendations%202012.pdf.coredownload.inline.pdf" },
          { title: "FATF — Risk-Based Approach Guidance for the Banking Sector (2014)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Risk-Based-Approach-Banking-Sector.pdf.coredownload.pdf" },
          { title: "Basel Committee — Sound Management of ML/TF Risks (d505, 2020)", url: "https://www.bis.org/bcbs/publ/d505.pdf" },
          { title: "EBA — ML/TF Risk Factors Guidelines (consolidated)", url: "https://www.eba.europa.eu/sites/default/files/document_library/Publications/Guidelines/2023/EBA-GL-2023-03/1061654/Guidelines%20ML%20TF%20Risk%20Factors_conslidated.pdf.pdf" },
          { title: "Oracle — Dynamic CDD / Perpetual KYC", url: "https://www.oracle.com/a/ocom/docs/industries/financial-services/fs-dynamic-customer-due-diligence-kyc-br.pdf" },
          { title: "PwC — Perpetual KYC: A New Approach to Periodic Reviews", url: "https://www.pwc.com/sg/en/consulting/assets/pkyc-a-new-approach-to-periodic-reviews.pdf" },
          { title: "Themis + encompass — Perpetual KYC Whitepaper", url: "https://insights.encompasscorporation.com/hubfs/Content/Whitepapers,%20Ebooks/White%20Paper%20-%20Perpetual%20KYC%20%5BThemis%20and%20Encompass%5D.pdf" },
        ],
      },
      {
        module: "Module 2 — Individual KYC & PEPs",
        items: [
          { title: "FATF — PEP Guidance (R.12 & R.22, 2013)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Guidance-PEP-Rec12-22.pdf.coredownload.pdf" },
          { title: "FATF — Guidance on Digital ID (2020)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Guidance-on-Digital-Identity.pdf" },
          { title: "Wolfsberg — SoW & SoF FAQs (2020)", url: "https://www.lawscot.org.uk/media/32ihbwcv/wolfsberg-sow-and-sof-faqs-august-2020.pdf" },
          { title: "US Interagency — Joint Statement on PEPs (2020)", url: "https://www.fincen.gov/system/files/shared/PEP%20Interagency%20Statement_FINAL%20508.pdf" },
          { title: "Wolfsberg — PEP Guidance (2017)", url: "https://wolfsberg-group.org/news/wolfsberg-group-publication-statement-guidance-on-politically-exposed-persons-peps", note: "web page" },
        ],
      },
      {
        module: "Module 3 — KYB & UBO",
        items: [
          { title: "FATF — Beneficial Ownership of Legal Persons (R.24, 2023)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Guidance-Beneficial-Ownership-Legal-Persons.pdf.coredownload.pdf" },
          { title: "FATF — BO & Transparency of Legal Arrangements (R.25, 2024)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/Guidance-Beneficial-Ownership-Transparency-Legal-Arrangements.pdf.coredownload.inline.pdf" },
          { title: "FATF — Transparency & Beneficial Ownership (2014)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Guidance-beneficial-ownership-transparencyl.pdf" },
          { title: "FFIEC — BSA/AML Examination Manual, CDD/BO volume", url: "https://bsaaml.ffiec.gov/docs/manual/BSA_AML_Man_2014_v2_CDDBO.pdf" },
          { title: "FFIEC — BSA/AML Manual (current per-section PDFs)", url: "https://bsaaml.ffiec.gov/manual", note: "web page" },
          { title: "Wolfsberg — FAQs on Beneficial Ownership", url: "https://wolfsberg-group.org/resources/general", note: "resource library" },
        ],
      },
      {
        module: "Module 4 — Transaction Monitoring & Typologies",
        items: [
          { title: "Wolfsberg — Effective Monitoring for Suspicious Activity (2024)", url: "https://www.moneylaunderingnews.com/wp-content/uploads/sites/12/2024/07/Wolfsberg-Group-MSA-Statement-for-publication.pdf" },
          { title: "Wolfsberg — Second MSA Statement (2025)", url: "https://wolfsberg-group.org/news/the-wolfsberg-group-publishes-its-second-statement-on-effective-monitoring-for-suspicious-activity", note: "web page" },
          { title: "FATF/Egmont — TBML Risk Indicators (2021)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/reports/Trade-Based-Money-Laundering-Risk-Indicators.pdf" },
          { title: "FATF/Egmont — TBML Trends & Developments", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/reports/Trade-Based-Money-Laundering-Trends-and-Developments.pdf.coredownload.inline.pdf" },
          { title: "FinCEN — Funnel Accounts Advisory FIN-2014-A005", url: "https://www.fincen.gov/system/files/advisory/FIN-2014-A005.pdf" },
          { title: "IFC — TBML Techniques Tip Sheets", url: "https://www.ifc.org/content/dam/ifc/doclink/2023/tmbl-tipsheets.pdf" },
        ],
      },
      {
        module: "Module 5 — Alert Investigation & Evidence",
        items: [
          { title: "Wolfsberg — TM RFI Best Practice Guidance (2022)", url: "https://wolfsberg-group.org/news/publication-of-the-wolfsberg-rfi-best-practice-guidance", note: "web page" },
          { title: "Wolfsberg — Negative News Screening FAQs (2022)", url: "https://wolfsberg-group.org/news/publication-of-the-negative-news-screening-faqs", note: "web page" },
          { title: "FATF — New Technologies for AML/CFT (2021, OSINT/ML)", url: "https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Opportunities-Challenges-of-New-Technologies-for-AML-CFT.pdf.coredownload.pdf" },
        ],
      },
      {
        module: "Module 6 — SAR/STR & Reporting",
        items: [
          { title: "FinCEN — Complete & Sufficient SAR Narrative Guidance (2003)", url: "https://www.fincen.gov/system/files/shared/sarnarrcompletguidfinal_112003.pdf" },
          { title: "FinCEN — SAR Electronic Filing Instructions", url: "https://www.fincen.gov/system/files/shared/FinCEN%20SAR%20ElectronicFilingInstructions-%20Stand%20Alone%20doc.pdf" },
          { title: "UKFIU — Submitting Better Quality SARs v4.0 (reference)", url: "https://www.cilex.org.uk/wp-content/uploads/guidance_on_submitting_better_quality_sars_v4_0.pdf" },
          { title: "UKFIU — Current SAR Best Practice chapters", url: "https://www.gamblingcommission.gov.uk/licensees-and-businesses/notice/updated-sars-guidance-from-the-ukfiu", note: "web page" },
          { title: "UK Home Office — Circular 022/2015, SAR confidentiality & tipping-off", url: "https://www.gov.uk/government/publications/circular-0222015-money-laundering-the-confidentiality-and-sensitivity-of-suspicious-activity-reports-sars-and-the-identity-of-those-who-make-them", note: "web page" },
          { title: "FIU-IND — AML/CFT Guidelines for Reporting Entities (2023)", url: "https://fiuindia.gov.in/pdfs/AML_legislation/AMLCFTguidelines10032023.pdf" },
          { title: "FIU-IND — STR reporting format for banking companies", url: "https://fiuindia.gov.in/pdfs/downloads/SBA.pdf" },
        ],
      },
    ],
  },
  {
    slug: "virtual-asset-compliance",
    code: "AML-VAC",
    title: "Certified Virtual Asset Compliance Analyst",
    tagline: "Crypto & Virtual Asset AML — Study Guide",
    provider: "Independent certification prep",
    description:
      "Virtual assets move value differently from bank money — publicly, pseudonymously, across borders in minutes, and through rails that traditional transaction monitoring was never built to see. This guide covers the whole stack: what a virtual asset is and why it attracts financial crime, the FATF Travel Rule and global licensing regimes, how transactions, wallets and mixers actually work on-chain, how chain-analytics vendors trace and score exposure, what a VASP's compliance operation looks like end to end, and how investigations, seizures and enforcement really unfold.",
    audience: [
      "Crypto compliance officers",
      "VASP onboarding and monitoring analysts",
      "AML analysts moving into virtual assets",
      "Fintech and payments risk teams",
    ],
    level: "Practitioner",
    pages: 96,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 31540,
    completions: 4480,
    featured: true,
    outcomes: [
      "Explain how virtual assets, stablecoins and DeFi fit the AML perimeter",
      "Apply FATF R.15/16, the Travel Rule and MiCA-style licensing",
      "Read on-chain transactions and understand clustering and attribution",
      "Use chain-analytics exposure scoring in alert triage",
      "Run VASP onboarding, monitoring and SAR filing for crypto activity",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "FATF — Updated Guidance for a Risk-Based Approach to Virtual Assets (2021)", url: "https://www.fatf-gafi.org" },
          { title: "FATF — Virtual Asset Red Flag Indicators (2020)", url: "https://www.fatf-gafi.org" },
          { title: "FATF — Targeted Update on Virtual Assets (2024)", url: "https://www.fatf-gafi.org" },
          { title: "EU — MiCA Regulation (Markets in Crypto-Assets)", url: "https://eur-lex.europa.eu" },
          { title: "US FinCEN — Application of BSA Rules to Convertible Virtual Currency (2013)", url: "https://www.fincen.gov" },
          { title: "US FinCEN — Virtual Currency SAR & RFI guidance", url: "https://www.fincen.gov" },
          { title: "OFAC — Sanctions List Search & virtual-asset advisories", url: "https://ofac.treasury.gov" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "The virtual-asset landscape",
        chapters: [
          { num: "1.1", title: "What a virtual asset actually is" },
          { num: "1.2", title: "Why virtual assets attract financial crime" },
          { num: "1.3", title: "FATF Recommendations 15–16 and the VASP definition" },
          { num: "1.4", title: "Licensing regimes: MiCA, the US, UK and the Travel Rule" },
        ],
      },
      {
        num: 2,
        title: "How value moves on-chain",
        chapters: [
          { num: "2.1", title: "Keys, addresses and transaction anatomy" },
          { num: "2.2", title: "UTXO versus account models" },
          { num: "2.3", title: "The public ledger, clustering and attribution" },
          { num: "2.4", title: "Mixers, chain-hopping and privacy techniques" },
        ],
      },
      {
        num: 3,
        title: "On-chain analytics and tracing",
        chapters: [
          { num: "3.1", title: "How chain-analytics vendors work" },
          { num: "3.2", title: "Exposure scoring and risk ratings" },
          { num: "3.3", title: "Following the fiat off-ramp" },
          { num: "3.4", title: "Reconstructing a case end to end" },
        ],
      },
      {
        num: 4,
        title: "VASP compliance operations",
        chapters: [
          { num: "4.1", title: "Onboarding and CDD for crypto customers" },
          { num: "4.2", title: "Implementing the Travel Rule" },
          { num: "4.3", title: "Transaction monitoring rules for crypto" },
          { num: "4.4", title: "Filing SARs and STRs on virtual-asset activity" },
        ],
      },
      {
        num: 5,
        title: "Investigations, enforcement and the frontier",
        chapters: [
          { num: "5.1", title: "Seizures, forfeiture and exchange cooperation" },
          { num: "5.2", title: "Cross-border requests: MLATs and chain-data sharing" },
          { num: "5.3", title: "Typologies: ransomware, scams, darknet markets and sanctions evasion" },
          { num: "5.4", title: "The frontier: DeFi, unhosted wallets and what comes next" },
        ],
      },
    ],
  },
  {
    slug: "trade-based-laundering",
    code: "AML-TBML",
    title: "Trade-Based Money Laundering Analyst",
    tagline: "TBML Detection & Correspondent Risk — Study Guide",
    provider: "Independent certification prep",
    description:
      "Trade is the largest single channel through which illicit value crosses borders — and the hardest for banks to see, because the bank is usually only moving money against documents it cannot fully verify. This guide covers what trade-based money laundering is, why invoices and shipping documents are the weapon of choice, every major technique from over-invoicing to phantom shipments and services TBML, the documentary and network red flags that actually surface in files, how correspondent banks and open-account products create the blind spot, and how to build a TBML control programme that survives an audit.",
    audience: [
      "Trade finance and correspondent banking analysts",
      "AML analysts covering corporate clients",
      "Sanctions and dual-use compliance staff",
      "Risk and audit teams",
    ],
    level: "Practitioner",
    pages: 74,
    lastReviewed: "November 2026",
    jurisdictions: ["UK", "EU", "US", "India", "Global"],
    reads: 22110,
    completions: 3120,
    outcomes: [
      "Explain TBML techniques: invoicing manipulation, phantom shipments, services TBML",
      "Spot documentary, pricing and network red flags in trade files",
      "Understand the correspondent-banking and open-account blind spot",
      "Build monitoring rules and escalation paths for TBML",
      "Design an audit-ready TBML control programme",
    ],
    sources: [
      {
        module: "Core references & regulators",
        items: [
          { title: "FATF/Egmont — Trade-Based Money Laundering: Risk Indicators", url: "https://www.fatf-gafi.org" },
          { title: "FATF/Egmont — TBML Trends and Developments (2020)", url: "https://www.fatf-gafi.org" },
          { title: "IFC — TBML Techniques: A Reference Guide for Exporters", url: "https://www.ifc.org" },
          { title: "FinCEN — Trade-Based Money Laundering advisories", url: "https://www.fincen.gov" },
          { title: "ICC — Uniform Customs and Practice for Documentary Credits (UCP 600)", url: "https://iccwbo.org" },
          { title: "Wolfsberg — Correspondent Banking Due Diligence Questionnaire", url: "https://wolfsberg-group.org" },
        ],
      },
    ],
    modules: [
      {
        num: 1,
        title: "TBML fundamentals",
        chapters: [
          { num: "1.1", title: "What trade-based money laundering is" },
          { num: "1.2", title: "Why trade is the perfect laundering channel" },
          { num: "1.3", title: "The FATF/Egmont TBML reports and typologies" },
          { num: "1.4", title: "The trade finance lifecycle and where it breaks" },
        ],
      },
      {
        num: 2,
        title: "The techniques",
        chapters: [
          { num: "2.1", title: "Over-invoicing and under-invoicing" },
          { num: "2.2", title: "Phantom shipments and multiple invoicing" },
          { num: "2.3", title: "Misdescription, services and TBML in invoices" },
          { num: "2.4", title: "Goods-based laundering: commodities and free-trade zones" },
        ],
      },
      {
        num: 3,
        title: "Detection and red flags",
        chapters: [
          { num: "3.1", title: "Documentary red flags" },
          { num: "3.2", title: "Pricing and valuation red flags" },
          { num: "3.3", title: "Network and counterparty analysis" },
          { num: "3.4", title: "Building TBML monitoring rules" },
        ],
      },
      {
        num: 4,
        title: "Correspondent exposure and response",
        chapters: [
          { num: "4.1", title: "Open-account TBML and the correspondent blind spot" },
          { num: "4.2", title: "Documentary credits and LC fraud" },
          { num: "4.3", title: "Escalation, reporting and the law-enforcement interface" },
          { num: "4.4", title: "Building a TBML control programme" },
        ],
      },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function totalChapters(course: Course) {
  return course.modules.reduce((n, m) => n + m.chapters.length, 0);
}

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    title: "Authorised Push Payment Scams",
    course: "Certified Fraud Prevention Analyst",
    courseSlug: "fraud-prevention",
    category: "Fraud Prevention",
    reads: 12480,
    completions: 2104,
    trend: "up",
    blurb:
      "The customer does everything right in the technical sense — they authorise the payment. Why APP fraud reimbursement rules exist and how the scam actually works.",
    mins: 14,
  },
  {
    rank: 2,
    title: "The Fifty Percent Rule",
    course: "Certified Sanctions Screening Analyst",
    courseSlug: "sanctions-screening",
    category: "Sanctions Screening",
    reads: 11320,
    completions: 1877,
    trend: "up",
    blurb:
      "How US sanctions extend to entities owned 50% or more by designated persons — arithmetic that is stricter than it first appears.",
    mins: 11,
  },
  {
    rank: 3,
    title: "Why TF Is Not Money Laundering",
    course: "Certified Counter-Terrorist Financing Analyst",
    courseSlug: "counter-terrorist-financing",
    category: "Counter-Terrorist Financing",
    reads: 9870,
    completions: 1620,
    trend: "up",
    blurb:
      "The inversion at the heart of CFT: clean money moving toward an unlawful purpose, with no predicate offence and no layering to detect.",
    mins: 13,
  },
  {
    rank: 4,
    title: "Hawala and Informal Value Transfer",
    course: "Certified Counter-Terrorist Financing Analyst",
    courseSlug: "counter-terrorist-financing",
    category: "Counter-Terrorist Financing",
    reads: 8410,
    completions: 1298,
    trend: "same",
    blurb:
      "Trust-based value transfer that moves enormous sums worldwide — mostly lawful, occasionally not, and almost never visible to a transaction record.",
    mins: 12,
  },
  {
    rank: 5,
    title: "Money Mules and Mule Accounts",
    course: "Certified Fraud Prevention Analyst",
    courseSlug: "fraud-prevention",
    category: "Fraud Prevention",
    reads: 7920,
    completions: 1180,
    trend: "down",
    blurb:
      "Every scam and takeover ends in the same practical problem: someone else's account receiving the money. How mule networks are recruited and detected.",
    mins: 10,
  },
  {
    rank: 6,
    title: "Tipping Off",
    course: "Certified Counter-Terrorist Financing Analyst",
    courseSlug: "counter-terrorist-financing",
    category: "Counter-Terrorist Financing",
    reads: 7480,
    completions: 1105,
    trend: "up",
    blurb:
      "The prohibition on disclosure is stricter in terrorist financing than almost anywhere else in compliance — and the penalties are real.",
    mins: 9,
  },
  {
    rank: 7,
    title: "Names That Break Matching",
    course: "Certified Sanctions Screening Analyst",
    courseSlug: "sanctions-screening",
    category: "Sanctions Screening",
    reads: 6910,
    completions: 964,
    trend: "same",
    blurb:
      "Most false positives are not engine failures — they are the predictable consequence of transliteration, patronymics and punctuation.",
    mins: 12,
  },
  {
    rank: 8,
    title: "Indicators in Virtual Asset and Cross-Border Channels",
    course: "Financial Intelligence Against Human Trafficking",
    courseSlug: "financial-intelligence-trafficking",
    category: "Financial Intelligence",
    reads: 6540,
    completions: 912,
    trend: "up",
    blurb:
      "How trafficking proceeds move through VASPs and cross-border corridors — and the on-chain and off-chain patterns that give them away.",
    mins: 11,
  },
  {
    rank: 9,
    title: "Discounting an Entity",
    course: "Certified Sanctions Screening Analyst",
    courseSlug: "sanctions-screening",
    category: "Sanctions Screening",
    reads: 5980,
    completions: 847,
    trend: "same",
    blurb:
      "Entities fail differently from individuals. The identifiers that resolve a corporate match — and the ones that don't.",
    mins: 10,
  },
  {
    rank: 10,
    title: "What Indicators Cannot Do",
    course: "Certified Counter-Terrorist Financing Analyst",
    courseSlug: "counter-terrorist-financing",
    category: "Counter-Terrorist Financing",
    reads: 5470,
    completions: 780,
    trend: "down",
    blurb:
      "The honest limits of TF detection: why no indicator set catches everything, and what a sound decision looks like when you are wrong.",
    mins: 9,
  },
  {
    rank: 11,
    title: "UBO Thresholds: 10% vs 25% and Indirect Ownership",
    course: "Certified KYC/CDD & Transaction Monitoring Analyst",
    courseSlug: "kyc-cdd-tm-analyst",
    category: "KYC/CDD",
    reads: 8420,
    completions: 1150,
    trend: "up",
    blurb:
      "The most-asked technical question in KYB — which percentage makes someone a beneficial owner, and why control matters as much as ownership.",
    mins: 12,
  },
];

export const glossary: GlossaryTerm[] = [
  { term: "AML", definition: "Anti-Money Laundering — the framework of controls that detect and report the laundering of criminal proceeds.", category: "Core" },
  { term: "KYC", definition: "Know Your Customer — the process of verifying a customer's identity and assessing their risk before and during the relationship.", category: "Core" },
  { term: "CDD", definition: "Customer Due Diligence — the baseline identity and risk checks required for every customer.", category: "Core" },
  { term: "EDD", definition: "Enhanced Due Diligence — deeper scrutiny applied to higher-risk customers, products or jurisdictions.", category: "Core" },
  { term: "STR / SAR", definition: "Suspicious Transaction Report / Suspicious Activity Report — the filing made to a financial intelligence unit when activity gives rise to suspicion.", category: "Reporting" },
  { term: "PEP", definition: "Politically Exposed Person — an individual holding or having held a prominent public function, subject to enhanced scrutiny.", category: "Core" },
  { term: "UBO", definition: "Ultimate Beneficial Owner — the natural person who ultimately owns or controls a legal entity, typically via 25%+ ownership or control.", category: "Ownership" },
  { term: "FATF", definition: "Financial Action Task Force — the intergovernmental body that sets the global AML/CFT standards measured by mutual evaluations.", category: "Frameworks" },
  { term: "OFAC", definition: "Office of Foreign Assets Control — the US Treasury office that administers sanctions programmes and the Specially Designated Nationals list.", category: "Frameworks" },
  { term: "UNSCR", definition: "UN Security Council Resolution — binding resolutions, notably 1267 and 1373, that impose terrorism-related sanctions and obligations.", category: "Frameworks" },
  { term: "Tipping off", definition: "The offence of disclosing to a customer or third party that a suspicion is being reported — prohibited under most AML regimes.", category: "Reporting" },
  { term: "De-risking", definition: "The withdrawal of services from whole customer categories judged too risky — a legitimate but costly response to financial-crime exposure.", category: "Core" },
  { term: "Hawala", definition: "An informal value transfer system based on trust and a network of brokers, moving value without funds physically crossing borders.", category: "Channels" },
  { term: "Money mule", definition: "A person who transfers or receives criminal proceeds on behalf of others, wittingly or unwittingly.", category: "Fraud" },
  { term: "APP fraud", definition: "Authorised Push Payment fraud — scams that trick a customer into authorising a payment themselves.", category: "Fraud" },
  { term: "Account takeover", definition: "Unauthorised access to and control of a customer's account, typically via credential theft or social engineering.", category: "Fraud" },
  { term: "BEC", definition: "Business Email Compromise — fraud that hijacks or impersonates business email to redirect corporate payments.", category: "Fraud" },
  { term: "Sanctions screening", definition: "The process of checking customers, counterparties and transactions against sanctions lists before and during the relationship.", category: "Sanctions" },
  { term: "Asset freeze", definition: "A sanctions measure prohibiting dealings with, or making funds available to, a designated party.", category: "Sanctions" },
  { term: "Making available", definition: "The prohibition on providing funds or economic resources to a designated person — broader than a payment.", category: "Sanctions" },
  { term: "50 percent rule", definition: "The US test under which entities owned 50% or more by one or more designated persons are themselves treated as designated.", category: "Sanctions" },
  { term: "VASP", definition: "Virtual Asset Service Provider — an entity providing crypto exchange, transfer or custody services, now within FATF AML scope.", category: "Channels" },
  { term: "CFT", definition: "Counter-Terrorist Financing — the controls aimed at detecting and reporting funding intended for terrorism.", category: "Core" },
  { term: "Predicate offence", definition: "The underlying crime whose proceeds are laundered — required for money laundering but absent in terrorist financing.", category: "Core" },
  { term: "Layering", definition: "Moving illicit funds through complex transactions to obscure their origin — the core technique money laundering must use and TF often avoids.", category: "Core" },
  { term: "FIU", definition: "Financial Intelligence Unit — the national agency that receives and analyses STRs/SARs.", category: "Frameworks" },
  { term: "Egmont Group", definition: "The international network of FIUs that enables secure information exchange between units.", category: "Frameworks" },
  { term: "RegTech", definition: "Regulatory technology — tools that automate compliance monitoring, screening and reporting.", category: "Core" },
  { term: "AIS", definition: "Automatic Identification System — vessel tracking data used in maritime sanctions monitoring.", category: "Sanctions" },
  { term: "Dark activity", definition: "Suspicious gaps or anomalies in AIS transmissions that may indicate sanctions evasion at sea.", category: "Sanctions" },
  { term: "Beneficial ownership", definition: "The natural persons who ultimately own or control a customer — distinct from legal ownership on paper.", category: "Ownership" },
  { term: "Nominee", definition: "A person or entity holding legal title on behalf of another, often obscuring beneficial ownership.", category: "Ownership" },
  { term: "SDN list", definition: "Specially Designated Nationals list — the OFAC list of parties subject to US sanctions restrictions.", category: "Frameworks" },
  { term: "Secondary sanctions", definition: "Sanctions exposure for non-US parties dealing with sanctioned targets where a US nexus exists.", category: "Frameworks" },
  { term: "Non-profit organisation risk", definition: "The FATF-recognised vulnerability of NPOs to terrorist financing abuse and over-compliance responses.", category: "Frameworks" },
  { term: "KYB", definition: "Know Your Business — due diligence on a corporate or entity customer: legal existence, ownership chain, directors and the business itself.", category: "Core" },
  { term: "SDD", definition: "Simplified Due Diligence — reduced checks permitted only for demonstrably low-risk customers, products or jurisdictions.", category: "Core" },
  { term: "pKYC", definition: "Perpetual KYC — continuous, event-driven customer risk reassessment replacing calendar-based periodic reviews.", category: "Core" },
  { term: "SoW", definition: "Source of Wealth — the origin of a customer's overall wealth, corroborated for higher-risk customers.", category: "Core" },
  { term: "SoF", definition: "Source of Funds — the origin of the specific funds in a transaction or account, distinct from overall wealth.", category: "Core" },
  { term: "RCA", definition: "Relative or Close Associate — family members and close business associates of a PEP who attract similar scrutiny.", category: "Core" },
  { term: "RFI", definition: "Request for Information — a structured ask to a customer or counterparty for documents or explanations during an investigation.", category: "Core" },
  { term: "TBML", definition: "Trade-Based Money Laundering — laundering through mis-invoicing, phantom shipments or false documentation in trade finance.", category: "Channels" },
  { term: "DAML", definition: "Defence Against Money Laundering — the UK mechanism where seeking NCA consent gives a statutory defence; 7-working-day notice, 31-day maximum moratorium.", category: "Reporting" },
  { term: "CTR", definition: "Currency Transaction Report — the US filing for cash transactions over $10,000, separate from a SAR.", category: "Reporting" },
  { term: "MLRO / nominated officer", definition: "Money Laundering Reporting Officer — the senior individual who reviews and authorises SAR/STR filings.", category: "Reporting" },
  { term: "Structuring / smurfing", definition: "Splitting transactions into amounts just below reporting thresholds to evade detection — a core typology.", category: "Channels" },
  { term: "Funnel account", definition: "An account receiving many small deposits that are then consolidated and moved on — classic layering.", category: "Channels" },
  { term: "Adverse media", definition: "Negative news about a person or entity indicating possible financial crime, fraud or sanctions exposure — a screening input.", category: "Screening" },
  { term: "OSINT", definition: "Open-Source Intelligence — publicly available information used to corroborate identity, ownership and risk during investigations.", category: "Core" },
  { term: "Bearer share", definition: "A share certificate conferring ownership without naming a holder — historically used to hide beneficial ownership.", category: "Ownership" },
  { term: "Liveness", definition: "A biometric check confirming a real person is present during remote identity verification, defeating photo/video spoofing.", category: "Core" },
  { term: "Production order", definition: "A court or prosecutor order compelling a firm to produce documents or information for an investigation.", category: "Reporting" },
  { term: "Placement", definition: "The first money-laundering stage — introducing illicit funds into the financial system.", category: "Core" },
  { term: "Integration", definition: "The final money-laundering stage — re-entering laundered funds into the legitimate economy as apparently clean assets.", category: "Core" },
  { term: "AMLA Authority", definition: "The EU's Anti-Money Laundering Authority (Frankfurt) — direct EU supervisor for the highest-risk obliged entities, including CASPs, under the phased AMLR framework.", category: "Frameworks" },
  { term: "DORA", definition: "Digital Operational Resilience Act — EU rules for ICT risk management, incident reporting and resilience testing across financial entities, including crypto firms.", category: "Frameworks" },
  { term: "eIDAS 2.0", definition: "The EU digital identity framework enabling EUDI Wallets — cryptographically verified identity attributes that may replace document-based remote KYC.", category: "Frameworks" },
  { term: "BOI register", definition: "Beneficial Ownership Information register — public or restricted databases of who really owns legal entities, under CTA/AMLD5/6 reforms.", category: "Ownership" },
  { term: "FATF grey list", definition: "Jurisdictions under increased FATF monitoring for strategic AML/CFT deficiencies — customers connected to them attract enhanced due diligence.", category: "Frameworks" },
  { term: "FinCEN 314(a)/(b)", definition: "US information-sharing channels: 314(a) circulates law-enforcement requests to banks; 314(b) permits institutions to share ML/TF information with each other.", category: "Reporting" },
  { term: "CASP", definition: "Crypto-Asset Service Provider — the EU/MiCA term for exchanges, custodians and transfer services, now squarely inside AML obligations.", category: "Channels" },
  { term: "Travel Rule", definition: "FATF Recommendation 16 — originator and beneficiary information must accompany qualifying transfers; thresholds differ by jurisdiction (US $3k, EU none, UK £1k).", category: "Channels" },
];

export interface InterviewQA {
  q: string;
  a: string;
  level?: "L1" | "L2" | "Lead";
}

export interface InterviewSection {
  slug: string;
  title: string;
  description: string;
  items: InterviewQA[];
}

export const interviewSections: InterviewSection[] = [
  {
    slug: "foundations",
    title: "Foundations: ML, AML & CTF",
    description: "The core definitions every AML/KYC interview starts with.",
    items: [
      {
        q: "What is money laundering?",
        a: "Converting illegal money into legal money through financial transactions. Examples of predicate crimes: drug trafficking, illegal arms sales, smuggling, gambling. Live example often cited: the Commonwealth Games scam (2010), a ₹70,000 crore fraud.",
      },
      {
        q: "What are the three stages of money laundering?",
        a: "Placement — depositing criminal proceeds into the financial system. Layering — concealing the criminal origin of the proceeds. Integration — using the criminal proceeds for personal benefit.",
      },
      {
        q: "What is AML?",
        a: "Anti-Money Laundering — the framework of controls banks and financial institutions use to monitor customer transactions daily, in real time, for risk. It rests on three pillars: KYC (Know Your Customer), Transaction Monitoring, and Suspicious Activity Reporting.",
      },
      {
        q: "What is CTF?",
        a: "Counter-Terrorist Financing — the process of preventing terrorist financing activities.",
      },
      {
        q: "What is terrorist financing?",
        a: "Providing financial support to individual terrorists or terrorist organisations. The funds can be legitimate (\"white\") or illicit (\"black\") money — which is the key difference from money laundering.",
      },
      {
        q: "What is the difference between money laundering and terrorist financing?",
        a: "Source of funds: ML uses criminal proceeds; TF uses criminal or legitimate funds. Motivation: ML seeks financial profit; TF seeks ideology, publicity or political power. Timing: ML occurs after the criminal act; TF supports future illegal acts. Unlawfulness: for ML it is the origin of dirty funds; for TF it is the intended use. Amounts: ML typically involves huge sums; TF involves smaller or minimal amounts.",
      },
      {
        q: "What is transaction monitoring?",
        a: "Monitoring a customer's account transactions — including current and historical data — to build a clear picture of customer activity and detect suspicious patterns.",
      },
      {
        q: "What is structuring / smurfing?",
        a: "Structuring is making bank deposits in a specific pattern to avoid triggering an alert. Smurfing is breaking a large transaction into smaller transactions kept below the reporting threshold.",
      },
      {
        q: "What are shell companies and front companies?",
        a: "A shell company is an incorporated company with no significant assets or operations; to launder money it pretends to perform services that would reasonably require cash payments. A front company is a legitimate-looking business used by criminal organisations to launder income and provide plausible cover for illegal activities such as illegal gambling, extortion, trafficking, smuggling and prostitution.",
      },
      {
        q: "What are bearer shares?",
        a: "Shares with no recorded ultimate beneficial owner — traded without records and by physical possession of the security, making ownership untraceable.",
      },
      {
        q: "What is the difference between bribery and corruption?",
        a: "Bribery is offering money or an inducement. Corruption is the misuse of power or position for private gain.",
      },
      {
        q: "What is tipping off?",
        a: "Informing the customer about the investigation of an AML offence — prohibited under most AML regimes.",
      },
    ],
  },
  {
    slug: "screening-sanctions",
    title: "Screening & Sanctions",
    description: "Lists, tools, regimes and the red flags interviewers probe.",
    items: [
      {
        q: "What is screening?",
        a: "The checks performed before opening a new account to ensure the customer's identity does not match a person with a known criminal background or a banned entity such as a terrorist individual or organisation.",
      },
      {
        q: "What screening tools are commonly used?",
        a: "World Check — PEP identification, regulatory and imprisonment news. LexisNexis Diligence and RDC (Regulatory Data Corp) — negative news and adverse media.",
      },
      {
        q: "What kinds of mismatches appear on screening hits?",
        a: "Name mismatch, DOB/age mismatch or date-of-incorporation mismatch, country mismatch, biography mismatch, and gender mismatch.",
      },
      {
        q: "What is a PEP?",
        a: "A Politically Exposed Person — someone entrusted with a prominent public function. A PEP presents higher risk of involvement in bribery and corruption by virtue of their position and influence.",
      },
      {
        q: "What is FCCR?",
        a: "Financial Crime Risk Calculating Model — the risk calculator used to determine a client's risk rating at onboarding or periodic review.",
      },
      {
        q: "What are sanctions?",
        a: "Restrictions imposed on a country or person. Types include individual, economic, diplomatic, military, environmental and sports sanctions; commonly grouped as international, trade, economic, sports and military measures.",
      },
      {
        q: "What is a sanction policy?",
        a: "The document that outlines how an organisation will adhere to sanctions laws, both domestically and internationally — an essential part of fighting financial crime.",
      },
      {
        q: "What are typical sanctioned countries?",
        a: "Examples cited: Balkans, Belarus, Burma, Côte d'Ivoire, Cuba, DR Congo, Iran, Iraq, Liberia, North Korea, Sudan, Syria, Zimbabwe. UN-sanctioned countries/contexts include Afghanistan, Central African Republic, DRC, North Korea, Iran, ISIL/Al-Qaida, Libya, Mali, Somalia, Sudan and Yemen.",
      },
      {
        q: "Which industries are considered high risk?",
        a: "Banking, currency exchange (MSBs), money transfer/remittance, payments, casinos and gaming, investment, real estate/construction, insurance, and precious metals.",
      },
      {
        q: "What are typical KYC red flags?",
        a: "Complex ownership structures with no legitimate economic cause; unexplained changes in instructions, especially last-minute ones; parties located in high-risk countries; relatives or close associates of PEPs; assets bought in cash and quickly used as loan collateral; unusual funding sources; refusal to provide information, data or documents.",
      },
    ],
  },
  {
    slug: "kyc-cdd",
    title: "KYC, CDD & Onboarding",
    description: "The largest interview block — process, documents, roles and risk rating.",
    items: [
      {
        q: "What is KYC?",
        a: "Know Your Customer — the process by which banks and financial institutions obtain information about a customer's identity and address.",
      },
      {
        q: "Why is KYC important?",
        a: "It mitigates reputational risk (danger to the name), operational risk (failed internal processes), legal risk (breach of laws), regulatory risk (failing to comply with standards), liability risk, financial risk (cost) and concentration risk (all eggs in one basket).",
      },
      {
        q: "What are the types of KYC?",
        a: "Onboarding, periodic/regular review, event-driven review (changes in corporate structure, ownership or top management; adverse media; business or geographic expansion), and offboarding.",
      },
      {
        q: "What are the components of a KYC policy?",
        a: "Customer Acceptance Policy, Customer Identification Program (CIP), monitoring of transactions, and risk management.",
      },
      {
        q: "Who are the key parties in a KYC team?",
        a: "Maker (analyst/senior analyst), Checker (QC — four-eye), SME (subject matter expert), QA (quality assurance — six-eye), Compliance, Business Unit/Front Office, and Relationship Manager.",
      },
      {
        q: "What are the risk pillars?",
        a: "Geography, industry, customer, product and channel. Risk indicators include country risk, nature of the client's business, ownership type, products and services provided, and negative news, sanctions news and PEP status.",
      },
      {
        q: "What is the KYC process formula?",
        a: "KYC = CIP (Customer Identification Program) + CDD + EDD.",
      },
      {
        q: "What is onboarding?",
        a: "The process of opening an account with the bank for the first time.",
      },
      {
        q: "How often are periodic reviews done?",
        a: "Based on the client's risk rating: low-risk clients roughly every 3 years, medium-risk every 2 years, high-risk annually. Tenure varies bank to bank.",
      },
      {
        q: "What is the full KYC process?",
        a: "IDD (Initial Due Diligence / gap analysis — steps: gap analysis, client outreach), then CDD (full document analysis, then screenings: World Check, LexisNexis Diligence, FCCR risk rating), then EDD only if the client is rated high risk.",
      },
      {
        q: "What is CIP?",
        a: "Customer Identification Program — the first phase of KYC: gathering primary information about the client before onboarding (pre-onboarding).",
      },
      {
        q: "What are the types of due diligence?",
        a: "SDD (Simplified Due Diligence) — roughly every 5 years for very low-risk customers. CDD — identifying customers and verifying they are who they say they are: document analysis, screenings, risk rating. EDD — deeper checks for higher-risk customers (e.g., PEPs), done yearly: ownership threshold 10%+, source of funds, source of wealth of UBOs, ID and address copies of UBOs, compliance approvals.",
      },
      {
        q: "What is IDD?",
        a: "Initial Due Diligence — also called gap analysis. Analysing initial documents available in public sources and identifying the gaps needed to complete KYC checks.",
      },
      {
        q: "What are correspondent banks?",
        a: "Domestic banks established to provide services to a bank or financial institution in another country — money transfers, currency exchange, trade paperwork and commercial transactions.",
      },
      {
        q: "What is an offshore bank?",
        a: "A bank regulated under an international (often offshore) licence, usually prohibited from doing business in its jurisdiction of establishment. Less regulation and transparency historically made offshore accounts attractive for hiding undeclared income.",
      },
      {
        q: "What documents are commonly required from a client?",
        a: "Full legal name, certificate of incorporation, registered and business addresses, MOA & AOA, source of funds/wealth, registered number and date, nature of business, list of directors/key controllers/authorised signatories with ID and verification, complete ownership structure, tax information, and audited financial reports.",
      },
      {
        q: "What products and services are typically offered?",
        a: "Custody, foreign exchange, correspondent banking, trade finance, debt securities, bonds and stocks.",
      },
      {
        q: "What are the common connected parties to a client?",
        a: "Directors, controllers, shareholders, auditors and authorised signatories. Controllers typically include the Chairman, CEO, CFO, COO and similar officers.",
      },
      {
        q: "What customer types exist and what documents apply?",
        a: "Individuals — photo ID and address proof. Proprietorship/sole trader — registration certificate, shop & establishment licence, tax returns, VAT certificate, utility bills. Partnership — registration certificate, partnership deed, partner IDs, attorney authorisation. Companies — certificate of incorporation, MOA & AOA, board resolution, utility bills, power of attorney. PIV/SPV — ADV form, IAPD document, investment manager details. Funds — prospectus/offerings memorandum naming fund manager, administrator, board and distributors. Trusts/associations/clubs — trust deed, registration certificate, tax ID, power of attorney, trustee/beneficiary lists, resolutions, bye-laws, founder/manager proofs. NPOs — voluntary certificate, registered address. NBFIs and banks — licence, regulation proof, Wolfsberg questionnaire, Patriot Act certificate. Government bodies and mutual funds/chit funds also appear.",
      },
      {
        q: "What is a state-owned entity (SOE)?",
        a: "Any entity more than 50% owned by a government.",
      },
      {
        q: "What are MOA and AOA?",
        a: "MOA (Memorandum of Association) — filed with the registrar at incorporation; contains the fundamental conditions of incorporation. AOA (Articles of Association) — specifies the regulations for a company's operations, its purpose, how tasks are accomplished, director appointment and financial record handling.",
      },
      {
        q: "What are the ownership thresholds by risk rating?",
        a: "Low and medium risk — 25% or more. High risk — 10% or more.",
      },
      {
        q: "What is the difference between IBO and UBO?",
        a: "IBO is the Intermediate Beneficial Owner; UBO is the Ultimate Beneficial Owner. Example: Infosys BPM is wholly owned by Infosys Limited, which is wholly owned by Narayana Murthy — Infosys Limited is the IBO, Murthy the UBO. Note: a UBO should be an individual or government, not an entity.",
      },
      {
        q: "What is a UBO?",
        a: "An individual who, alone or with others, directly or indirectly (including through trusts, resident or non-resident), holds beneficial interest of at least 10% in EDD cases and 25% in CDD cases.",
      },
      {
        q: "What are authorised signatories?",
        a: "The people who can sign bank-related documents on behalf of clients — often found in board resolutions; may include directors.",
      },
      {
        q: "What is a power of attorney?",
        a: "A legal document giving someone the right to make financial or business decisions on another's behalf.",
      },
      {
        q: "What are tax havens?",
        a: "Jurisdictions providing offshore banking services that allow individuals and businesses to avoid paying income tax in their country of residence — e.g., Switzerland, Panama, Luxembourg, Cayman Islands, Bermuda, British Virgin Islands, Netherlands.",
      },
      {
        q: "Which tax forms apply to which clients?",
        a: "US-incorporated clients — Form W-9. Non-US clients — Form W8-BEN-E or W8-IMY. CRS form applies to all locations.",
      },
      {
        q: "What is the TI CPI?",
        a: "Transparency International's Corruption Perceptions Index — countries ranked by perceived levels of public-sector corruption from expert assessments and opinion surveys.",
      },
      {
        q: "What is source of wealth vs source of funds?",
        a: "Source of wealth is the origin of a customer's entire wealth — the volume expected and how it was acquired (inheritance, lottery, dividends, interest, property sale proceeds, overall net worth). Source of funds refers to the origin of the particular funds or monetary instruments that are the subject of the transaction (salary, commission, fees, wages).",
      },
      {
        q: "What are KYC registries and regulators?",
        a: "A registry is a centralised repository of KYC records where documents are stored under a unique registration number. Regulators aim to prevent financial crime through regulations requiring KYC checks at onboarding and ongoing transaction follow-up. A regulated entity is licensed by the financial regulator of its country — e.g., UK: Companies House; India: Ministry of Corporate Affairs.",
      },
      {
        q: "What are SPVs and PIVs?",
        a: "An SPV (Special Purpose Vehicle) is an orphan company created to isolate risk and reallocate assets to investors — property investments are typically held in SPVs. A PIV (Private Investment Vehicle) pools investments to move money from present to future — securities, real assets like gold, and real estate.",
      },
      {
        q: "What are the three lines of defence in AML?",
        a: "1st line — client-facing business staff, onboarding or CDD teams. 2nd line — AML compliance staff. 3rd line — internal audit.",
      },
      {
        q: "What is perpetual KYC (pKYC) and how does it differ from periodic review?",
        level: "L2",
        a: "pKYC continuously reassesses customer risk using event triggers — transactions, adverse media, data changes, life events — rather than waiting for a calendar-based review date. It replaces the 'refresh everything every N years' model with risk-prioritised, event-driven updates, cutting cost while improving coverage of emerging risk.",
      },
      {
        q: "A customer owns 40% of HoldCo A, which owns 60% of OpCo B. Is the customer a UBO of OpCo B under a 25% indirect threshold?",
        level: "L2",
        a: "Indirect ownership = 40% × 60% = 24% — just under 25%, so not a UBO on ownership alone. But check control-based tests: voting rights, board appointment, veto or dominant influence can still make them a UBO. Also verify whether intermediate layers have other owners that change the calculation, and document the maths either way.",
      },
      {
        q: "What is an RFI and what makes one effective?",
        level: "L1",
        a: "A Request for Information asks a customer or counterparty for documents or explanations during an investigation. An effective RFI is specific (names transactions and dates), bounded (clear deadline and format), non-accusatory (avoids tipping-off), and gives a secure response channel. Vague RFIs waste time and tip off the subject.",
      },
      {
        q: "Walk me through a DAML request in the UK.",
        level: "Lead",
        a: "When a UK firm knows or suspects money laundering and wants to proceed with a transaction, it submits a SAR to the NCA asking for consent — a DAML request. The NCA has 7 working days (the notice period) to respond; if it stays silent, consent is deemed given. If it needs more time it can extend to a maximum 31-day moratorium. The MLRO reviews and authorises the filing; tipping-off the customer is a criminal offence throughout.",
      },
      {
        q: "What is the difference between source of wealth and source of funds?",
        level: "L1",
        a: "Source of wealth is the origin of a customer's overall wealth — salary history, business proceeds, inheritance — and is corroborated for higher-risk customers. Source of funds is the origin of the specific money in a transaction or account. A customer can have legitimate wealth but suspicious funds, or vice versa — EDD often requires both.",
      },
    ],
  },
  {
    slug: "frameworks-reporting",
    title: "Frameworks, Regulators & Reporting",
    description: "SARs, STRs, CTRs and the regulators of every major jurisdiction.",
    items: [
      {
        q: "What is SAR?",
        a: "Suspicious Activity Report — a document financial institutions must file with FinCEN (US) following a suspected incident of money laundering or fraud.",
      },
      {
        q: "What is STR?",
        a: "Suspicious Transaction Report — filed by a financial institution to the local Financial Intelligence Unit when a transaction relates to criminal activity. Typically filed within 7 days of the transaction.",
      },
      {
        q: "What is CTR?",
        a: "Cash Transaction Report — banks must submit details of all cash transactions involving more than $10,000. Filed within 15 days of the transaction.",
      },
      {
        q: "What is OFAC?",
        a: "Office of Foreign Assets Control — the US regulator that administerates and enforces trade and economic sanctions.",
      },
      {
        q: "What is FATCA?",
        a: "Foreign Account Tax Compliance Act — designed to prevent tax evasion by US citizens holding assets in foreign financial institutions.",
      },
      {
        q: "What is FinCEN?",
        a: "Financial Crimes Enforcement Network — a bureau of the US Department of the Treasury that collects and analyses financial transaction information to combat domestic and international money laundering, terrorist financing and other financial crimes.",
      },
      {
        q: "What is the USA PATRIOT Act?",
        a: "Officially the Uniting and Strengthening America by Providing Appropriate Tools Required to Intercept and Obstruct Terrorism Act. Section 312 requires US financial institutions to perform due diligence (and sometimes enhanced due diligence) on correspondent accounts for foreign financial institutions and private banking accounts for non-US persons.",
      },
      {
        q: "What is the Bank Secrecy Act (BSA)?",
        a: "Requires all US financial institutions to keep records of cash purchases of negotiable instruments and report transactions over $10,000.",
      },
      {
        q: "What is FATF?",
        a: "Financial Action Task Force — designs and promotes policies to combat ML/TF, sets standards for a coordinated global response, and works to stop funding for weapons of mass destruction.",
      },
      {
        q: "What are the Wolfsberg Group and Egmont Group?",
        a: "The Wolfsberg Group is an association of thirteen global banks developing frameworks and guidance for managing financial-crime risk, promoting public-private engagement. The Egmont Group similarly promotes engagement between public and private sectors in fighting financial crime (it is the network of financial intelligence units).",
      },
      {
        q: "Who regulates in the USA?",
        a: "The Federal Reserve Board, Office of the Comptroller of the Currency, FDIC, Office of Thrift Supervision, CFTC (Commodity Futures Trading Commission), FINRA, state bank regulators and state insurance regulators.",
      },
      {
        q: "Who regulates in India?",
        a: "RBI (Reserve Bank of India), SEBI, IRDA, PFRDA and NABARD.",
      },
      {
        q: "Who regulates in the UK?",
        a: "FCA (Financial Conduct Authority), Financial Reporting Council, Institute of Chartered Accountants in England and Wales, ORCIC, Payment Systems Regulator (PSR), The Pensions Regulator, and PRA (Prudential Regulation Authority).",
      },
      {
        q: "Who regulates in Australia?",
        a: "APRA (Australian Prudential Regulation Authority), ASIC, the Reserve Bank of Australia, and the Australian Treasury.",
      },
      {
        q: "Who regulates in Germany, the Netherlands and Hong Kong?",
        a: "Germany — BaFin (Federal Financial Supervisory Authority). Netherlands — AFM (Autoriteit Financiële Markten). Hong Kong — Securities & Futures Commission, Insurance Authority, and Monetary Authority.",
      },
    ],
  },
  {
    slug: "typologies-alerts",
    title: "Typologies & Transaction Alerts",
    description: "The money-movement patterns and alert types interviewers ask about.",
    items: [
      {
        q: "What are common AML typologies?",
        a: "Currency exchanges/cash conversion, cash couriers/cash smuggling, smurfing/structuring, use of credit cards/cheques/promissory notes, purchase of portable valuables (gems, precious metals), purchase of valuable assets (real estate, luxury vehicles, racehorses), wire transfers, hawala/hundi, gaming (casinos, internet gambling), non-profit organisations, shell/front companies, offshore bank accounts, identity fraud, and use of gatekeepers like lawyers, auditors and brokers.",
      },
      {
        q: "How are transaction monitoring alerts generated?",
        a: "Based on typologies and scenarios (sequences of events). There are three categories: rule-based alerts, behaviour-based alerts and list-checking alerts.",
      },
      {
        q: "What are the main types of transaction monitoring alerts?",
        a: "1. Structuring (rule-based) — multiple transactions in consecutive days to avoid the reporting threshold. 2. Velocity (rule-based) — incoming transfer quickly followed by outgoing transfer; the account acts as a pass-through for layering. 3. Unusual account activity (behaviour-based) — high turnover unusual for that customer; begins once account age exceeds ~4 months. 4. Unusual specific transaction activity — e.g., unusual international/domestic wires, ATM or cash activity, debit card activity. 5. Monetary instruments alerts — purchaser side (multiple instruments over threshold/quantity) and beneficiary side (multiple instruments to the same payee). 6. High-risk country / tax haven transactions — sending or receiving currency to or from high-risk or tax-haven countries. 7. Expected behaviour — actual activity exceeds the expected activity profile.",
      },
    ],
  },
  {
    slug: "scenario-prompts",
    title: "Scenario Prompts",
    description:
      "Walk-through questions that test how you actually work an alert, a file or a difficult conversation — the format senior interviewers prefer.",
    items: [
      {
        q: "Walk me through a PEP alert disposition.",
        level: "L2",
        a: "Confirm the match is the same person — name, date of birth, nationality, ID numbers — not just a similar name. If confirmed, classify domestic vs foreign PEP and the customer's relationship to them (family, close associate, entity owned by them). Check whether the customer's profile and expected activity justify the relationship; run adverse-media and sanctions checks. Decide: false positive (document why), true positive with acceptable risk (apply EDD — source of funds/wealth, senior approval, enhanced monitoring), or decline/exit. Write the rationale so a reviewer could reconstruct your reasoning without asking you, and never tip the customer off.",
      },
      {
        q: "A customer is structuring cash deposits just below the reporting threshold. Walk me through your response.",
        level: "L2",
        a: "First verify the pattern: multiple deposits in consecutive days, each below the threshold, possibly across branches or accounts linked to the same customer or associates. Check whether the amounts cluster just under the limit — the signature of structuring rather than coincidence. Review the customer's expected activity and source of funds. Do not confront the customer — that risks tipping off and destroying evidence. Escalate to your MLRO/senior analyst, document every transaction, and if the facts support suspicion, file the required report (SAR/STR) within the statutory deadline. Preserve records; the pattern itself is the evidence.",
      },
      {
        q: "You are the L1 analyst. An alert shows a dormant account receiving a large wire and forwarding most of it within hours. What do you do?",
        level: "L1",
        a: "Treat it as a possible pass-through — the classic layering pattern. Gather the basics first: who sent the funds, who received them, is the beneficiary related to the sender, does the activity fit the customer's profile, and has this happened before? Check open-source and internal data on both parties. If it is a one-off with a plausible explanation (e.g., invoice payment), document and close as false positive. If the pattern repeats, the parties are unknown, or the customer cannot explain the source — escalate with a complete timeline. Your job at L1 is accurate facts and a clean handover, not the final decision.",
      },
      {
        q: "How do you handle a sanctions fuzzy match where the name is common but the date of birth differs?",
        level: "L2",
        a: "Do not dismiss it on one field alone. Compare all available attributes: full name variants, DOB, nationality, ID/passport numbers, addresses, aliases, and the payment details themselves (country, bank, purpose). A common name with a different DOB is often a false positive — but check whether the listed entry has aliases, alternate spellings, or partial DOBs that could still match. Document every attribute you compared and why you concluded match or no-match. Weak rationales like 'name is common, different DOB' have been criticised by examiners; strong ones list each field tested.",
      },
      {
        q: "A relationship manager pressures you to close an alert quickly without documentation. What do you do?",
        level: "Lead",
        a: "The disposition must rest on evidence, not seniority. Explain — calmly and specifically — what is missing from the file and what risk an undocumented closure creates for the bank. Escalate through your line: QA/MLRO or compliance leadership. Most regulators expect documented challenge; a file closed under pressure without rationale is a finding waiting to happen. If the pressure continues, use your firm's escalation or whistleblowing channel. Never fabricate a rationale to satisfy a deadline — that converts a weak alert into a false statement.",
      },
      {
        q: "Walk me through drafting a SAR narrative for suspected layering.",
        level: "L2",
        a: "Structure it as: who (customer details, account numbers), what (the specific transactions with dates, amounts, counterparties), why suspicious (the pattern — rapid in-out movement, structuring, mismatch with expected activity), and what you did (KYC refresh, adverse media, escalation). Use chronological order, exact figures, and plain language — examiners and investigators read these years later. State facts, not conclusions you cannot support: 'the account received USD 48,000 and forwarded USD 46,500 within 3 hours on three occasions' beats 'the customer is laundering money'. Include what remains unknown — that is often the most useful part.",
      },
      {
        q: "QA returns your alert disposition because the rationale is insufficient. How do you respond?",
        level: "Lead",
        a: "Treat it as coaching, not punishment — QA exists to make your work defensible. Re-open the file, identify exactly which facts the reviewer says are missing or unsupported, and strengthen the rationale: add the transaction timeline, the comparison against expected activity, the checks you ran, and why alternatives were rejected. If you genuinely cannot support the original disposition, correct it — that is what the process is for. Track repeat QA comments; a pattern usually means a training gap, not a character flaw.",
      },
      {
        q: "A fintech customer wants to serve a high-risk jurisdiction corridor. Walk me through your EDD approach.",
        level: "L2",
        a: "First question: is this within our risk appetite — if not, decline with a clear, non-discriminatory rationale. If yes, EDD before onboarding or product launch: identify the corridor's typologies, verify the partner's licences and AML programme in that jurisdiction, obtain source of funds/wealth for the business model, map the settlement flows, and set enhanced monitoring rules plus lower thresholds. Get senior approval documented. Build in periodic review — corridors change risk fast. The deliverable is a risk assessment that lets a reviewer see you understood the exposure, not just the revenue.",
      },
    ],
  },
];

export const featuredReads = [
  {
    title: "Why TF Is Not Money Laundering",
    course: "Counter-Terrorist Financing",
    courseSlug: "counter-terrorist-financing",
    mins: 13,
    tag: "Most read this week",
    blurb:
      "TF runs in the opposite direction, moves sums too small to trip a threshold, and frequently uses money that was never criminal in the first place.",
  },
  {
    title: "The Fifty Percent Rule",
    course: "Sanctions Screening",
    courseSlug: "sanctions-screening",
    mins: 11,
    tag: "Essential reading",
    blurb:
      "Entities owned 50% or more by designated persons are treated as designated — even though they appear on no list.",
  },
  {
    title: "Hawala and Informal Value Transfer",
    course: "Counter-Terrorist Financing",
    courseSlug: "counter-terrorist-financing",
    mins: 12,
    tag: "Deep dive",
    blurb:
      "Value moves on trust, not on wire transfers — which is exactly why transaction monitoring misses it.",
  },
  {
    title: "Unwrapping UBO Chains",
    course: "KYC/CDD & TM Analyst",
    courseSlug: "kyc-cdd-tm-analyst",
    mins: 14,
    tag: "New this month",
    blurb:
      "How to trace indirect ownership through layered holdings, trusts and nominees — and where the 10% and 25% thresholds actually bite.",
  },
  {
    title: "Indicators in Virtual Asset Channels",
    course: "Financial Intelligence",
    courseSlug: "financial-intelligence-trafficking",
    mins: 11,
    tag: "New this month",
    blurb:
      "On-chain patterns, mixers and cross-border corridors that reveal trafficking proceeds in VASP flows.",
  },
  {
    title: "Writing the Rationale",
    course: "Sanctions Screening",
    courseSlug: "sanctions-screening",
    mins: 10,
    tag: "Practitioner focus",
    blurb:
      "The rationale is the only part of your work that survives — how to write alert dispositions that hold up years later.",
  },
  {
    title: "De-risking and Its Cost",
    course: "Counter-Terrorist Financing",
    courseSlug: "counter-terrorist-financing",
    mins: 9,
    tag: "Policy watch",
    blurb:
      "The response that feels safest — cutting whole customer categories — carries its own regulatory and humanitarian cost.",
  },
];
