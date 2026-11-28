// Technical skills map for AML/KYC roles — the programming and tooling
// layer that sits on top of the domain curriculum.

export interface TechArea {
  name: string;
  priority: "Core" | "High" | "Role-specific";
  points: string[];
}

export const TECH_AREAS: TechArea[] = [
  {
    name: "SQL",
    priority: "Core",
    points: [
      "Highest-priority skill — pull raw transaction logs, join KYC profiles with payment histories, and back-test rule thresholds directly against data.",
      "Complex JOINs across customer, account and transaction tables.",
      "Window functions — ROW_NUMBER, LAG/LEAD — to spot rapid velocity and structuring patterns SQL-side.",
      "GROUP BY / HAVING aggregations for threshold and cohort analysis.",
    ],
  },
  {
    name: "Python",
    priority: "Core",
    points: [
      "Automates repetitive work — data cleaning, parsing large CSV/JSON exports, batch checks.",
      "pandas + numpy for tabular transaction analysis; requests for calling sanctions and blockchain APIs.",
      "scikit-learn basics become relevant when you move into alert tuning and model evaluation.",
    ],
  },
  {
    name: "Advanced Excel & VBA",
    priority: "Core",
    points: [
      "Still a daily staple even in tech-forward banks — XLOOKUP, Pivot Tables and basic macros for ad-hoc reconciliation.",
      "Standard tool for packaging SAR/STR evidence extracts for reviewers and examiners.",
    ],
  },
  {
    name: "Crypto & Web3",
    priority: "Role-specific",
    points: [
      "Reading Solidity — not building dApps — lets you verify token contracts, spot honeypots, and trace DeFi liquidity pools and mixer interactions.",
      "Web3.js / Ethers.js or Python web3.py plus block-explorer APIs (Etherscan, Tronscan) for batch wallet balances, token approvals and cross-chain bridge transfers.",
      "Dune Analytics — SQL for blockchain — builds custom dashboards for wallet clustering and protocol outflows alongside Chainalysis/TRM Labs.",
    ],
  },
  {
    name: "RegTech, APIs & AI workflows",
    priority: "High",
    points: [
      "REST APIs, JSON payloads and webhooks — modern KYC and TM pipelines run on them; reading API logs is how you troubleshoot failed screening or biometric checks.",
      "Prompt engineering is now a compliance skill — LLMs summarise adverse media, draft SAR narratives and triage false positives; knowing how to structure prompts and validate outputs is a growing requirement.",
    ],
  },
  {
    name: "BI & visualisation",
    priority: "High",
    points: [
      "Power BI or Tableau for presenting alert conversion rates, false-positive metrics and typology trends to senior compliance officers and examiners.",
    ],
  },
];

export interface RoleTech {
  role: string;
  must: string;
  good: string;
}

export const ROLE_TECH: RoleTech[] = [
  {
    role: "L1/L2 Transaction Monitoring Analyst",
    must: "Advanced Excel, case management tools, basic SQL",
    good: "Python (pandas), Power BI",
  },
  {
    role: "TM Rule Tuning & Analytics",
    must: "Advanced SQL, Python, statistics",
    good: "R, machine-learning basics, Tableau",
  },
  {
    role: "Crypto / FinCrime Investigation",
    must: "SQL, block explorers, Chainalysis / TRM Labs",
    good: "Solidity (reading), Python web3.py, JSON/APIs",
  },
  {
    role: "Senior Analyst / MLRO-track",
    must: "SQL + Python fluency, BI dashboards, API literacy",
    good: "Prompt engineering for SAR drafting, model-risk basics",
  },
];

export const TECH_FACTS = [
  {
    k: "Where the bar sits",
    v: "L1/L2 alert review runs on Excel and case-management interfaces. SQL and Python separate candidates at senior analyst, rule-tuning and crypto-compliance levels.",
  },
  {
    k: "The highest-leverage pair",
    v: "SQL + Python — SQL to interrogate the data, Python to automate what you do to it repeatedly.",
  },
  {
    k: "Why it compounds",
    v: "Analysts who can query the transaction store directly tune rules faster, evidence SARs better and speak data to examiners — the exact skills RegTech and AI-augmented compliance teams hire for.",
  },
];

export const TECH_PRACTICE_LINKS = [
  { label: "Data Lab — synthetic transactions to query", href: "/labs" },
  { label: "Alert Sandbox — triage like a TM analyst", href: "/sandbox" },
  { label: "Virtual Asset Compliance course", href: "/courses/virtual-asset-compliance" },
  { label: "Compliance stack — the tools teams run", href: "/stack" },
];
