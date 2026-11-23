// Daily-seeded puzzle data for the AML Arcade.
// Everything is deterministic from the day-of-year so every visitor gets the same run.

export function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickDaily<T>(arr: T[], day: number, count: number, seedSalt = 0): T[] {
  const rnd = mulberry32(day * 7919 + seedSalt * 104729);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

// ---------- Game 1: Sort the Signal (connections-style) ----------

export interface SortGroup {
  name: string;
  hint: string;
  cards: string[];
}

export const SORT_SETS: SortGroup[][] = [
  [
    { name: "Placement signals", hint: "Getting dirty money into the system", cards: ["Structuring cash deposits", "Casino chip purchases", "Money-order smurfing", "Funnel account deposits"] },
    { name: "Layering signals", hint: "Moving money to hide its origin", cards: ["Rapid pass-through wires", "Round-tripping funds", "Mispriced trade invoices", "Shell-to-shell transfers"] },
    { name: "PEP & CDD risks", hint: "Customer risk that demands EDD", cards: ["Foreign PEP onboarding", "Unresolvable UBO chain", "Bearer-share company", "Nominee director structure"] },
    { name: "Reporting duties", hint: "What the firm must file or avoid", cards: ["SAR filing triggers", "CTR cash threshold", "Tipping-off prohibition", "90-day continuing SAR"] },
  ],
  [
    { name: "Fraud typologies", hint: "Deception for financial gain", cards: ["APP scam reimbursement", "Account takeover", "Business email compromise", "Mule account recruitment"] },
    { name: "Sanctions evasion", hint: "Getting around restricted lists", cards: ["Fuzzy-match name changes", "Front-company payments", "Nested correspondent accounts", "Vessel flag-switching"] },
    { name: "Crypto red flags", hint: "Virtual asset laundering indicators", cards: ["Mixer/tumbler use", "Chain-hopping across chains", "Unlicensed VASP on-ramp", "DeFi protocol layering"] },
    { name: "TBML indicators", hint: "Trade documents that don't add up", cards: ["Over-invoiced shipments", "Phantom shipping docs", "Unusual transhipment routes", "Third-party trade payments"] },
  ],
];

// ---------- Game 2: AMLdle (wordle-style) ----------

export const AML_WORDS = [
  "FRAUD", "SHELL", "BRIBE", "GRAFT", "MONEY", "WATCH", "BLOCK", "ALERT",
  "CRIME", "THEFT", "SMURF", "MULES", "LAYER", "PLACE", "VAULT", "CRYPT",
  "TOKEN", "PONZI", "HEIST", "FIXER", "FLOWS", "BUSTED", "AUDIT", "SCAMS",
];

// ---------- Game 3: Typology Rush ----------

export interface RushItem {
  clue: string;
  answer: string;
  options: string[];
}

export const RUSH_BANK: RushItem[] = [
  { clue: "Deposits split into amounts just under the reporting threshold", answer: "Structuring", options: ["Structuring", "Layering", "Integration", "Placement"] },
  { clue: "Funds arriving and leaving an account within hours", answer: "Pass-through", options: ["Pass-through", "Smurfing", "Hawala", "TBML"] },
  { clue: "A politically exposed person's spouse opens an account", answer: "RCA risk", options: ["RCA risk", "Sanctions hit", "CTR trigger", "EDD waiver"] },
  { clue: "Invoices priced far above market value to move money", answer: "Over-invoicing", options: ["Over-invoicing", "Under-invoicing", "Phantom shipping", "Round-tripping"] },
  { clue: "A dormant account suddenly moves large sums", answer: "Velocity spike", options: ["Velocity spike", "Seasonal pattern", "Payroll cycle", "Dividend income"] },
  { clue: "Multiple family members each deposit small cash amounts", answer: "Smurfing", options: ["Smurfing", "Laundromat", "Front company", "Nested account"] },
  { clue: "Trade documents exist but the goods were never shipped", answer: "Phantom shipment", options: ["Phantom shipment", "Over-invoicing", "Mispricing", "Transhipment fraud"] },
  { clue: "Customer cannot explain the source of a large wire", answer: "Unexplained wealth", options: ["Unexplained wealth", "Tax evasion", "Credit risk", "Interest income"] },
  { clue: "Funds sent through several shell companies in sequence", answer: "Layering", options: ["Layering", "Placement", "Integration", "Smurfing"] },
  { clue: "A PEP-owned company applies for corporate banking", answer: "PEP-linked entity", options: ["PEP-linked entity", "Sanctions match", "High-risk corridor", "Dormant account"] },
  { clue: "Cash-intensive business deposits daily takings matching declared revenue", answer: "Expected activity", options: ["Expected activity", "Structuring", "Placement", "Layering"] },
  { clue: "Account receives funds from many unrelated sources then redistributes", answer: "Funnel account", options: ["Funnel account", "Mule account", "Shell company", "Nested correspondent"] },
];

// ---------- Game 4: Time Warp (regulatory dates) ----------

export interface TimeItem {
  event: string;
  year: number;
  options: number[];
}

export const TIME_BANK: TimeItem[] = [
  { event: "US Bank Secrecy Act enacted", year: 1970, options: [1970, 1986, 2001, 2010] },
  { event: "FATF founded by G7", year: 1989, options: [1989, 1995, 2001, 2012] },
  { event: "EU First Money Laundering Directive", year: 1991, options: [1991, 2001, 2005, 2015] },
  { event: "US PATRIOT Act expands AML duties", year: 2001, options: [1995, 2001, 2008, 2016] },
  { event: "EU Third AML Directive", year: 2005, options: [2001, 2005, 2013, 2018] },
  { event: "US Dodd-Frank Act (FinCEN enhancements)", year: 2010, options: [2008, 2010, 2013, 2018] },
  { event: "FATF issues revised 40 Recommendations", year: 2012, options: [2008, 2012, 2017, 2021] },
  { event: "EU Fifth AML Directive (crypto brought in)", year: 2018, options: [2015, 2018, 2020, 2023] },
  { event: "UK Money Laundering Regulations 2017", year: 2017, options: [2013, 2017, 2019, 2022] },
  { event: "EU Sixth AML Directive criminalises ML", year: 2018, options: [2015, 2018, 2020, 2021] },
];

// ---------- Game 5: Disposition (alert triage calls) ----------

export interface DispoItem {
  scenario: string;
  answer: string;
  options: string[];
  why: string;
}

export const DISPO_BANK: DispoItem[] = [
  { scenario: "Salaried customer deposits exactly their monthly salary, nothing else all quarter", answer: "False positive", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "Activity matches the recorded expected profile exactly — the alert rule is misfiring on normal payroll." },
  { scenario: "Customer makes 14 cash deposits of $9,600 across 3 days at different branches", answer: "File SAR", options: ["False positive", "Escalate to L2", "File SAR", "Request ID refresh"], why: "Classic structuring — sub-threshold deposits clustered in time and geography. The pattern itself is the evidence." },
  { scenario: "A foreign PEP's adult child applies for a premium account", answer: "Trigger EDD", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "RCAs inherit PEP status — source of funds/wealth, senior approval and enhanced monitoring before onboarding." },
  { scenario: "Alert shows wires to a company the customer says is their employer, but registry shows it was dissolved last year", answer: "Escalate to L2", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "Customer's explanation contradicts public records — needs deeper investigation before disposition." },
  { scenario: "Cash deposits from a registered restaurant match declared daily takings within 10%", answer: "False positive", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "Cash-intensive business behaving exactly as declared — document the comparison and close." },
  { scenario: "Dormant account receives $200k wire and forwards $198k within 2 hours to a high-risk jurisdiction", answer: "File SAR", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "Pass-through layering with unexplained source — rapid movement plus high-risk corridor supports suspicion." },
  { scenario: "New corporate customer has an ownership chain ending in a trust in a secrecy jurisdiction that won't disclose beneficiaries", answer: "Trigger EDD", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "Unresolved beneficial ownership requires documented good-faith effort plus enhanced controls or decline." },
  { scenario: "Customer asks 'is this about money laundering?' after their wire was delayed for review", answer: "Escalate to L2", options: ["False positive", "Escalate to L2", "File SAR", "Trigger EDD"], why: "The question suggests they may already suspect scrutiny — check whether anyone tipped them off; handle via MLRO." },
];
