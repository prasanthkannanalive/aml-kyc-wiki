// Guided site walkthrough — the onboarding path for a first-time visitor.

export interface WalkStep {
  slug: string;
  title: string;
  tagline: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
}

export const WALKTHROUGH_STEPS: WalkStep[] = [
  {
    slug: "start-here",
    title: "Start here — pick your goal",
    tagline: "Two minutes decides your whole route through the site.",
    body: "AML/KYC knowledge is broad. The site is organised so you can enter at the depth you need — read a chapter for a quick answer, or run the full certification track for a credential. Everything below is reachable from the nav, but this order is the one we'd recommend.",
    points: [
      "Quick answer needed? → Glossary, Regulator pages, Library",
      "Interview or exam soon? → Interview Prep + Mock Exams",
      "Building a career? → Pick a Learning Path",
      "Hands-on practice? → Playground is the hub",
    ],
    href: "/paths",
    cta: "See learning paths",
  },
  {
    slug: "courses",
    title: "Courses — the certification tracks",
    tagline: "Seven full programs, each ending in a verifiable certificate.",
    body: "Each course is a structured certification track: modules, chapters with worked scenarios, end-of-module quizzes and a final exam. Pass the final at 70%+ and you get an AMLK- certificate anyone can verify at /verify.",
    points: [
      "Sanctions Screening, KYC/CDD/TM, Fraud Prevention, CTF, TBML, Virtual Asset Compliance, FI Trafficking",
      "Every chapter opens with an animated scenario card showing the concept as a live diagram",
      "Module context strip orients you before each chapter's deep dive",
      "Estimated hours shown per module — plan around your schedule",
    ],
    href: "/courses",
    cta: "Browse courses",
  },
  {
    slug: "paths",
    title: "Learning Paths — role-based sequences",
    tagline: "Ordered course bundles that mirror how real teams are staffed.",
    body: "Paths group courses into job-shaped sequences — AML Analyst, Fraud Analyst, Sanctions Specialist, Crypto Compliance, FIU Intelligence, Trade Finance, and US Regulatory Frameworks (BSA/FinCEN/OFAC). Finish every course in a path and a printable path certificate unlocks.",
    points: [
      "Each path page shows per-course progress for signed-in users",
      "Path certificate lists each course's verified cert link",
      "Matches how hiring managers describe role requirements",
    ],
    href: "/paths",
    cta: "Explore paths",
  },
  {
    slug: "playground",
    title: "Playground — every interactive in one place",
    tagline: "The hub for hands-on AML practice.",
    body: "Playground gathers every interactive experience: 100 hard decision scenarios, 14 guided case-file simulations aligned to the course curriculum, the alert sandbox, transaction data lab, mock exams, daily review, job simulation and the arcade.",
    points: [
      "100 scenarios across 10 typologies with difficulty ratings — judgment training",
      "Case-file sims: evidence lands step by step, you make the call, see the filing",
      "Filter sims by course — each course has its own two cases",
      "Daily Challenge: five fixed calls a day, same worldwide, on a live leaderboard",
    ],
    href: "/playground",
    cta: "Enter playground",
  },
  {
    slug: "field-craft",
    title: "Field Craft — the production skills",
    tagline: "Writing the SAR, spotting the fake document, filing in six jurisdictions.",
    body: "Three labs train what the job actually requires: drafting SAR narratives scored against model answers, finding red flags hidden among decoys in realistic documents, and step-by-step filing walkthroughs for US BSA, UK DAML, EU goAML, Canada, India and Singapore.",
    points: [
      "/sar-writer — fact-coverage scoring on real case briefs",
      "/doc-spotter — 5 real issues hidden among 4 plausible decoys per document",
      "/filing — deadlines, channels and examiner traps per regime",
    ],
    href: "/playground",
    cta: "Try field craft",
  },
  {
    slug: "sandbox-labs",
    title: "Sandbox & Data Lab — analyst tooling",
    tagline: "Triage alerts and tune detection rules like a real TM team.",
    body: "The Alert Sandbox gives you a queue of transaction-monitoring alerts to disposition. The Transaction Data Lab generates a synthetic ledger with planted typologies — you build structuring, velocity, layering and counterparty rules and watch what fires, including alert-rate tuning.",
    points: [
      "Sandbox: disposition alerts the way a TM analyst does",
      "Data lab: ~215 transactions, 8 customers, planted structuring/mule/layering patterns",
      "CSV export of alerts — same artifacts real investigations start from",
    ],
    href: "/labs",
    cta: "Open the data lab",
  },
  {
    slug: "assess",
    title: "Exams & Daily Review — prove retention",
    tagline: "Timed mock papers and spaced repetition.",
    body: "The Mock Exam Simulator runs real-exam conditions — 20 randomized questions, 15-minute timer, per-module score breakdown — mixed across all courses or scoped to one (deep-linkable from any course page). Daily Review pulls 10 questions from every course you've touched, with a streak tracker.",
    points: [
      "Pass marks and timing match certification conditions",
      "Per-module breakdown shows exactly where to revise",
      "Review streaks keep retention honest between study sessions",
    ],
    href: "/exams",
    cta: "Start a mock exam",
  },
  {
    slug: "credentials",
    title: "Credentials — badges, certs, verification",
    tagline: "What you earn, and how an employer checks it.",
    body: "Progress earns badges (bronze to gold). Passing a course final exam issues an AMLK- certificate stored server-side and verifiable at /verify/[id] — share the link on your resume or LinkedIn. The /stack page maps these to vendor credentials like CCCA, CAMS and ICA.",
    points: [
      "10 achievement badges tracking reading, exams, sims and streaks",
      "Certificates are verifiable — no PDF to forge",
      "Leaderboard shows streaks and weekly activity",
    ],
    href: "/leaderboard",
    cta: "See the leaderboard",
  },
  {
    slug: "reference",
    title: "Reference — glossary, library, regulators",
    tagline: "The lookup layer for definitions, documents and frameworks.",
    body: "Glossary defines 60+ terms. The Library hosts 38 primary-source PDFs — FATF papers, FFIEC exam manual, Wolfsberg guidance — with source links. Regulator pages explain the AML/CFT program pillars, FATF lists, major reforms (AMLA, DORA, eIDAS, BOI, 314) and a live regulatory news feed.",
    points: [
      "Regulators page: program pillars + FATF grey/black lists + reform timeline",
      "Library documents are the actual source PDFs, not summaries",
      "Global search covers every page, course, case and tool",
    ],
    href: "/regulators",
    cta: "Open regulators",
  },
  {
    slug: "community",
    title: "Community — teams, careers, interview prep",
    tagline: "Learn with others and convert knowledge into offers.",
    body: "Study Teams let a cohort share a join code and track each other's progress. Interview Prep runs the question banks employers actually use. Careers maps roles to the courses that evidence them, and Cases walks real enforcement actions.",
    points: [
      "Teams: create a cohort, share a code, see member progress",
      "Interview prep organized by section with model answers",
      "Enforcement cases show what violations actually cost",
    ],
    href: "/teams",
    cta: "Set up a team",
  },
  {
    slug: "daily",
    title: "Make it daily — the retention loop",
    tagline: "The features that turn reading into competence.",
    body: "The site is designed around return visits: the Daily Challenge drops five scenario calls at midnight UTC onto a global leaderboard, daily review pulls spaced-repetition questions, the arcade resets five brain games, and streaks track on the leaderboard. Ten minutes a day across challenge + review + one scenario beats a weekend binge — that's spaced repetition working as intended.",
    points: [
      "Daily Challenge: same five questions for everyone, submit to today's board",
      "Daily Review streak counts consecutive days",
      "Arcade resets daily — five quick games",
      "New content lands across news, research and playground",
    ],
    href: "/challenge",
    cta: "Play today's challenge",
  },
];
