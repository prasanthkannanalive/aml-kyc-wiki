export interface CaseMistake {
  title: string;
  detail: string;
}

export interface EnforcementCase {
  slug: string;
  org: string;
  headline: string;
  country: string;
  year: number;
  fineUsd: number | null; // headline penalty in USD, for ranking
  penalty: string;
  typologies: string[];
  status: string;
  people: string[];
  regulator: string;
  rootFailure: string;
  analystAngle: string;
  summary: string;
  mistakes: CaseMistake[];
  lessons: string[];
  study?: { label: string; href: string }[];
}

export const enforcementCases: EnforcementCase[] = [
  {
    slug: "bnp-paribas",
    study: [
      { label: "Sanctions screening course", href: "/courses/sanctions-screening" },
    { label: "US sanctions framework chapter", href: "/courses/sanctions-screening/chapters/4.2" },
    ],
    org: "BNP Paribas",
    headline: "Sanctions evasion through US dollar clearing",
    country: "France",
    year: 2014,
    fineUsd: 8.9e9,
    penalty: "$8.9 billion — largest financial-crime penalty ever at the time",
    typologies: ["Sanctions evasion", "Wire stripping", "US correspondent banking"],
    status: "Resolved — guilty plea, monitorship imposed",
    people: ["BNP Paribas SA (entity)", "US DOJ, Treasury OFAC, Manhattan DA"],
    regulator: "US DOJ, Treasury OFAC, Manhattan DA, Federal Reserve",
    rootFailure: "Wire-room controls stripped country names from USD payment messages before they reached the sanctions filter — the primary screening input was corrupted at source.",
    analystAngle: "Wire messages naming sanctioned countries stripped before USD clearing — a sanctions-screening analyst comparing originating vs. beneficiary fields, or monitoring USD volume by corridor, would have flagged it years earlier.",
    summary:
      "BNP Paribas, then the world's largest bank by assets, systematically processed billions of dollars in transactions for clients in Sudan, Cuba and Iran — all US-sanctioned jurisdictions. Staff removed or altered wire-transfer information so payments would not trigger sanctions filters, and routed them through US correspondent accounts to access the dollar system.",
    mistakes: [
      {
        title: "Deliberate evasion, not weak controls",
        detail:
          "Investigators found the conduct was systemic and intentional: compliance staff were instructed to strip client and country identifiers from wires. This was not a monitoring gap — it was the business model for a sanctioned-markets desk.",
      },
      {
        title: "Dollar clearing as the enforcement hook",
        detail:
          "Every payment touched US correspondent accounts, giving US authorities jurisdiction. The case became the landmark demonstration that any bank clearing USD is inside the US regulatory perimeter, whatever its home country.",
      },
      {
        title: "Decade of prior warnings",
        detail:
          "US authorities had flagged BNP's Iran/Sudan activity for years before 2014. Internal audit had identified issues that were not escalated to the board — a classic three-lines-of-defence failure.",
      },
    ],
    lessons: [
      "Sanctions exposure follows the currency, not the headquarters — USD clearing makes any bank answerable to OFAC.",
      "Audit findings that never reach the board are not findings; escalation paths must be tested, not assumed.",
      "Fines of this size reprice legal risk: post-2014, sanctions compliance became a board-level metric across global banks.",
    ],
  },
  {
    slug: "goldman-1mdb",
    study: [
      { label: "PEP & EDD chapter", href: "/courses/kyc-cdd-tm-analyst/chapters/2.6" },
    { label: "Corruption typologies", href: "/courses/financial-intelligence-trafficking" },
    ],
    org: "Goldman Sachs / 1MDB",
    headline: "The 1MDB sovereign fund fraud",
    country: "Malaysia / USA",
    year: 2020,
    fineUsd: 5.0e9,
    penalty: "$5B+ in global settlements; billions laundered",
    typologies: ["Corruption", "Money laundering", "PEP exposure", "Trade-based laundering"],
    status: "Convictions secured; mastermind Jho Low remains a fugitive",
    people: ["Jho Low (fugitive)", "Goldman Sachs (entity)", "Najib Razak (former PM, convicted)", "Tim Leissner (former Goldman banker, pleaded guilty)"],
    regulator: "US DOJ, SEC, FinCEN, Federal Reserve",
    rootFailure: "No effective CDD on 1MDB-related accounts; PEP and shell-entity red flags were never escalated to compliance.",
    analystAngle: "PEP connections (Jho Low's political ties), fictitious KYC on 1MDB accounts, and wires to shell entities in high-risk jurisdictions — standard CDD red flags ignored at onboarding.",
    summary:
      "Malaysian sovereign wealth fund 1MDB raised ~$6.5B in bonds that were largely siphoned off through shell companies and fraudulent valuations. Goldman Sachs underwrote the deals, earned ~$600M in fees, and ignored repeated internal and external red flags — a case that fused investment-banking conflicts, AML failures and head-of-state corruption.",
    mistakes: [
      {
        title: "Conflict of interest was the product",
        detail:
          "Goldman simultaneously advised 1MDB and its counterparties, took fees on both sides, and let a banker (Tim Leissner) personally partner with Jho Low on side deals — the '3G' joint venture that moved billions offshore.",
      },
      {
        title: "Due diligence theatre",
        detail:
          "KYC files were thin or backdated after the fact. Investigators found beneficial-ownership documentation was created or altered once scrutiny began — onboarding was treated as paperwork, not verification.",
      },
      {
        title: "PEP and adverse-media blindness",
        detail:
          "The fund's political protection (Prime Minister Najib Razak) and Low's lavish, unexplained wealth were visible for years. Screening tools flagged names; nobody connected the dots because no one was assigned to.",
      },
    ],
    lessons: [
      "When the client is a head of state or their proxy, EDD is not optional — it is the entire engagement.",
      "Fees that dwarf market norms are themselves a red flag; pricing anomalies belong in the risk file.",
      "Side deals between staff and clients convert compliance risk into personal criminal exposure.",
    ],
  },
  {
    slug: "danske-estonia",
    study: [
      { label: "KYB & UBO module", href: "/training/kyc-cdd-tm-analyst" },
    { label: "TBML red flags", href: "/courses/kyc-cdd-tm-analyst/chapters/4.5" },
    ],
    org: "Danske Bank (Estonian branch)",
    headline: "The non-resident portfolio laundering scandal",
    country: "Denmark / Estonia",
    year: 2018,
    fineUsd: 2.0e9,
    penalty: "~$2B in global settlements; €200B+ in suspicious flows",
    typologies: ["Trade-based laundering", "Shell companies", "High-risk jurisdictions"],
    status: "CEO resigned; branch closed; US deferred prosecution",
    people: ["Thomas Borgen (CEO, resigned)", "Howard Wilkinson (whistleblower)", "Danske Bank Estonia (entity)"],
    regulator: "Danish FSA, US DOJ, Estonian authorities",
    rootFailure: "Branch-level alerts on non-resident flows were dismissed by HQ; no independent UBO verification or jurisdiction risk escalation.",
    analystAngle: "Non-resident accounts with no meaningful business, structuring-sized flows through a branch that local staff flagged but HQ dismissed — whistleblower escalation and UBO checks would have exposed it.",
    summary:
      "Danske Bank's Estonian branch processed roughly €200 billion for non-resident customers — many shell companies with no discernible business — between 2007 and 2015. Much of it was suspected proceeds of Russian organised crime. The scandal surfaced only after a whistleblower went public, and remains one of the largest money-laundering episodes ever measured.",
    mistakes: [
      {
        title: "The whistleblower was ignored for years",
        detail:
          "British businessman Howard Wilkinson raised concerns about the Estonian portfolio as early as 2013. Internal investigations dismissed him; he only broke the story publicly in 2017. An ignored internal warning is the single most expensive control failure on record.",
      },
      {
        title: "No beneficial-ownership verification",
        detail:
          "Thousands of corporate customers were opened with nominee structures and no verification of who ultimately owned them. UBO checks were effectively absent in the highest-risk book the bank had.",
      },
      {
        title: "Branch autonomy defeated group oversight",
        detail:
          "Estonia operated with weak local governance and its own compliance culture. Group-level AML reporting aggregated away the anomalies — the numbers were visible only when someone looked at the branch, not the total.",
      },
    ],
    lessons: [
      "Non-resident portfolios generate outsized risk per euro — they need dedicated, sampled review, not pooled averages.",
      "Every whistleblower report needs a documented, independent disposition; 'we looked and it was fine' must be provable.",
      "Correspondent banking and agent relationships launder jurisdiction risk: know where your customers' money actually goes.",
    ],
  },
  {
    slug: "hsbc",
    study: [
      { label: "AML programme failures", href: "/cases" },
    { label: "CDD fundamentals", href: "/courses/kyc-cdd-tm-analyst/chapters/1.3" },
    ],
    org: "HSBC",
    headline: "Deferred prosecution for cartel and sanctions laundering",
    country: "UK / USA",
    year: 2012,
    fineUsd: 1.92e9,
    penalty: "$1.92 billion DPA — then-record US penalty",
    typologies: ["Drug-cartel money laundering", "Sanctions", "Shell banks", "Weak SAR filing"],
    status: "Deferred prosecution; monitorship; later further penalties",
    people: ["HSBC Holdings (entity)", "US DOJ, OCC, Fed", "Stephen Green (chairman era)"],
    regulator: "US DOJ, FinCEN, UK FCA",
    rootFailure: "Front-line staff accepted bulk-cash cartel deposits without questions; SARs were filed as 'defensive' narratives that disclosed nothing.",
    analystAngle: "Cartel cash deposits structured through Mexican branches with complicit staff — front-line staff ignoring bulk-cash red flags and SAR quality (filings that said nothing) were the failures.",
    summary:
      "US investigators found HSBC's US and Mexico operations had laundered hundreds of millions for Mexican drug cartels, processed transactions for sanctioned countries including Iran and Libya, and maintained accounts for shell banks in the Cayman Islands. HSBC admitted the conduct and entered a deferred prosecution agreement — a landmark moment for AML enforcement.",
    mistakes: [
      {
        title: "SARs filed but useless",
        detail:
          "HSBC filed thousands of suspicious activity reports, but investigators found many lacked the context that made them suspicious — volume without narrative. Filing SARs to satisfy a metric is not monitoring.",
      },
      {
        title: "Mexico operations ignored group policy",
        detail:
          "The Mexican unit's AML programme was a decade behind group standards. Cash-heavy business, trade finance gaps, and no local money-laundering officer accountability let cartel proceeds flow through US accounts.",
      },
      {
        title: "Commercial interests overrode compliance",
        detail:
          "Internal documents showed business teams pressuring compliance to approve high-risk relationships — including sanctioned-country business worth billions in revenue. Revenue concentration in risky books is a governance red flag.",
      },
    ],
    lessons: [
      "A SAR is only as good as its narrative; quality metrics must measure usefulness to investigators, not filing counts.",
      "Subsidiary AML programmes need local accountability — group policy documents do not enforce themselves.",
      "When a business line's revenue depends on customers no one else will touch, that dependency is the risk.",
    ],
  },
  {
    slug: "standard-chartered",
    study: [
      { label: "High-risk jurisdictions", href: "/courses/kyc-cdd-tm-analyst/chapters/1.2" },
    ],
    org: "Standard Chartered",
    headline: "Repeated sanctions breaches — the 'repeat offender' case",
    country: "UK / USA",
    year: 2019,
    fineUsd: 1.1e9,
    penalty: "$1.1B (2019) on top of $340M (2012) and earlier settlements",
    typologies: ["Sanctions evasion", "Iran transactions", "Trade finance"],
    status: "Resolved — multiple DPAs across a decade",
    people: ["Standard Chartered (entity)", "US DOJ, OFAC, NY DFS", "Peter Sands (CEO during 2019 case)"],
    regulator: "US DOJ, Treasury OFAC, NY DFS",
    rootFailure: "Repeat sanctions breaches continued after a prior settlement — customer jurisdiction risk was managed by willful blindness via UAE intermediaries.",
    analystAngle: "Repeat sanctions violations after a prior monitorship — customers in Iran/Sudan routed through UAE entities; correspondent due diligence on nested relationships was absent.",
    summary:
      "Standard Chartered spent the 2010s as the textbook repeat offender: processing billions in transactions for Iranian clients through US banks in apparent violation of sanctions, despite an earlier 2012 deferred prosecution for the same conduct. The 2019 resolution — over $1.1B with a monitorship — followed evidence that violations continued after the bank had promised to reform.",
    mistakes: [
      {
        title: "Promise without mechanism",
        detail:
          "After the 2012 DPA the bank committed to exit Iran business. Investigators found the exit was nominal — transactions were restructured through intermediaries and third-party payments rather than stopped.",
      },
      {
        title: "Trade-finance blind spots",
        detail:
          "Letters of credit and trade transactions were processed without verifying underlying parties. Structured trade can disguise sanctioned-party involvement, yet screening focused on the applicant, not the goods or end beneficiaries.",
      },
      {
        title: "Board-level optimism vs compliance reality",
        detail:
          "Leaked documents showed executives downplaying the scale of the problem internally while negotiating with regulators externally — the gap between what boards are told and what compliance knows is itself a finding.",
      },
    ],
    lessons: [
      "A DPA is a contract, not a cure — post-settlement conduct is monitored and re-punished.",
      "Sanctions exits must be verified at transaction level, including restructuring and third-party routing.",
      "Repeat violations are treated as evidence of institutional failure, not isolated errors — the penalty escalates accordingly.",
    ],
  },
  {
    slug: "wirecard",
    study: [
      { label: "Entity verification & UBO", href: "/courses/kyc-cdd-tm-analyst/chapters/3.1" },
    { label: "Audit & evidence", href: "/courses/kyc-cdd-tm-analyst/chapters/5.6" },
    ],
    org: "Wirecard AG",
    headline: "The €1.9B that never existed",
    country: "Germany",
    year: 2020,
    fineUsd: null,
    penalty: "€1.9B missing; insolvency; founder convicted",
    typologies: ["Fraud", "Regulatory capture", "Auditor failure"],
    status: "Founder convicted; executives convicted; BaFin fined €10M",
    people: ["Markus Braun (CEO, convicted)", "BaFin (regulator, sanctioned critics)", "EY (auditor)"],
    regulator: "BaFin, Munich prosecutor, EY (auditor)",
    rootFailure: "Regulator-supervision capture; third-party trustee balances were never independently confirmed or reconciled.",
    analystAngle: "Regulator captured by the company it supervised; €1.9B 'missing' trustee accounts never verified — an analyst demanding independent confirmation of trustee balances would have caught it.",
    summary:
      "Wirecard, a German payments firm, reported €1.9 billion in cash reserves that did not exist — allegedly fabricated through a web of Philippine shell accounts. The fraud survived years of short-seller reports and journalist investigations because the regulator (BaFin) investigated the critics instead of the company. It collapsed in June 2020.",
    mistakes: [
      {
        title: "The regulator policed the whistleblowers",
        detail:
          "BaFin responded to fraud allegations by banning short-selling in Wirecard stock, filing complaints against journalists and short-sellers, and reportedly tipping the company off. A captured regulator is worse than no regulator — it lends false assurance.",
      },
      {
        title: "Auditor verification failure",
        detail:
          "EY signed off on balances held in accounts that could not be independently confirmed. Third-party confirmations were accepted without verifying the confirming entity's legitimacy — a basic audit control skipped for a marquee client.",
      },
      {
        title: "No independent verification path",
        detail:
          "Wirecard's 'trustee' accounts in the Philippines were opaque by design. Analysts who tried to verify them found the structure made verification impossible — and the company used that opacity as a shield.",
      },
    ],
    lessons: [
      "Regulatory independence is a control: when supervisors attack critics, markets lose their early-warning system.",
      "Bank confirmations and third-party evidence must be verified for authenticity, not merely collected.",
      "Opaque trustee structures deserve enhanced scrutiny — inability to verify is itself a red flag, not an excuse.",
    ],
  },
  {
    slug: "deutsche-mirror",
    study: [
      { label: "Sanctions screening course", href: "/courses/sanctions-screening" },
    { label: "Mirror trading typology", href: "/disciplines/tbml-correspondent" },
    ],
    org: "Deutsche Bank",
    headline: "Mirror trades used to move Russian money",
    country: "Germany / Russia",
    year: 2017,
    fineUsd: 630e6,
    penalty: "$630M across US and New York authorities",
    typologies: ["Sanctions evasion", "Trade-based laundering", "Mirror trades"],
    status: "Resolved — guilty plea in New York, monitorship",
    people: ["Deutsche Bank AG (entity)", "US DOJ, NY DFS"],
    regulator: "US DOJ, NY DFS, FinCEN",
    rootFailure: "Mirror trades routed through London evaded sanctions monitoring because desks were not aggregated for cross-book pattern detection.",
    analystAngle: "Mirror trades routing Russian client orders through London to avoid sanctions — matching buy/sell legs across desks with identical timing/size is a detectable pattern.",
    summary:
      "Between 2011 and 2015, Deutsche Bank's Moscow office executed 'mirror trades': Russian clients bought securities in rubles while the bank simultaneously sold identical securities in London for dollars — effectively converting rubles to dollars while evading Russia's capital controls and concealing client identities from US sanctions screening.",
    mistakes: [
      {
        title: "Geographically split compliance",
        detail:
          "The Moscow desk operated under Russian rules while the London leg sat in a different compliance universe. No single control saw the whole transaction — the classic cross-border mirror-trade gap.",
      },
      {
        title: "Client anonymity by design",
        detail:
          "Mirror trades were executed for anonymous or obscured principals. The bank's own systems could not identify who ultimately owned the positions — yet the desk generated substantial fees from the opacity.",
      },
      {
        title: "Capital-controls arbitrage as a product",
        detail:
          "The desk marketed the structure as legitimate tax/capital planning. Compliance treated it as a product question rather than a sanctions question until US authorities reframed it.",
      },
    ],
    lessons: [
      "Any structure that splits a transaction across jurisdictions must be reviewed as one transaction — mirrored legs are a single economic event.",
      "Anonymity is the product here: when clients pay for not being known, enhanced due diligence is mandatory.",
      "Capital-controls evasion and sanctions evasion are the same typology wearing different clothes.",
    ],
  },
  {
    slug: "wachovia",
    study: [
      { label: "Correspondent banking hub", href: "/disciplines/tbml-correspondent" },
    { label: "TBML & trade finance", href: "/courses/kyc-cdd-tm-analyst/chapters/4.5" },
    ],
    org: "Wachovia Bank",
    headline: "Cartel cash through US bank accounts",
    country: "USA / Mexico",
    year: 2010,
    fineUsd: 160e6,
    penalty: "$160M penalties; forfeiture; DPA",
    typologies: ["Drug-cartel money laundering", "Bulk cash smuggling", "Trade finance"],
    status: "Resolved — DPA and forfeiture",
    people: ["Wachovia (now Wells Fargo)", "US DOJ, DEA", "Mexican cartels (Zetas, Gulf)"],
    regulator: "US DOJ, FinCEN, OCC",
    rootFailure: "Cash-intensive accounts from high-risk Mexican corridors lacked enhanced due diligence or source-of-funds checks.",
    analystAngle: "Bulk cash from Mexican cartel smuggled over the border deposited with minimal questions — cash-intensive business profiles without commensurate revenue was the tell.",
    summary:
      "US investigators found Wachovia had processed at least $420 billion in dollar transfers for Mexican exchange houses — several tied to the Zetas and Gulf cartels — including bulk cash shipments moved across the border with minimal scrutiny. The bank's AML programme was described by its own investigators as 'an afterthought'.",
    mistakes: [
      {
        title: "AML as an afterthought",
        detail:
          "Wachovia's compliance function was understaffed and outgunned: a handful of analysts monitored hundreds of billions in flows. Investigators documented alerts that were never investigated and SARs filed without follow-up.",
      },
      {
        title: "Exchange-house blind spot",
        detail:
          "Mexican exchange houses (casas de cambio) moved billions in cash with minimal KYC. Wachovia treated them as ordinary commercial customers rather than high-risk money transmitters requiring EDD.",
      },
      {
        title: "Volume overwhelmed the model",
        detail:
          "Monitoring rules generated thousands of alerts the team could not clear. When alert volume exceeds investigation capacity, the system's real output is noise — and the noise was documented for years.",
      },
    ],
    lessons: [
      "Money-service businesses and exchange houses are inherently higher-risk; EDD is the baseline, not the exception.",
      "Alert backlogs are a control failure with a timestamp — capacity must be sized to flow, not to budget.",
      "Bulk cash crossing borders is a typology, not a statistic; it deserves its own monitoring scenario.",
    ],
  },
  {
    slug: "riggs",
    study: [
      { label: "Individual KYC & PEPs", href: "/courses/kyc-cdd-tm-analyst/chapters/2.1" },
    { label: "Sanctions screening course", href: "/courses/sanctions-screening" },
    ],
    org: "Riggs Bank",
    headline: "The bank that banked the world's pariahs",
    country: "USA",
    year: 2005,
    fineUsd: 25e6,
    penalty: "$25M civil penalty (FinCEN + OCC); $16M criminal fine (2005 guilty plea); forced sale to PNC",
    typologies: ["Terrorism financing exposure", "Weak CDD", "Correspondent banking"],
    status: "Resolved — bank sold to PNC (2005)",
    people: ["Riggs Bank (entity)", "OCC", "FinCEN", "Robert L. Allbritton (chairman & CEO, resigned Mar 2004)"],
    regulator: "US Senate PS&I subcommittee, OCC",
    rootFailure: "Bearer-share and numbered-account products served pariah regimes with no meaningful CIP or ongoing monitoring.",
    analystAngle: "Banked pariah regimes with bearer shares and numbered accounts; broke $1.9M of Pinochet funds into cashier's checks to evade controls — a landmark failure of PATRIOT Act implementation (CIP itself came from §326, 2001-03).",
    summary:
      "Riggs Bank, a small Washington DC institution, became the preferred bank for sanctioned regimes, arms dealers and shadowy regimes — including accounts linked to Augusto Pinochet's circle and the Saudi embassy. A 2004 Senate investigation ('Money Laundering and Foreign Corruption: Does the Winnebago Go in Reverse?') exposed systemic due-diligence failures: the bank broke $1.9M of Pinochet-linked funds into smaller cashier's checks to conceal control. Riggs paid a $25M civil penalty, pleaded guilty in 2005 to failing to file SARs ($16M criminal fine), and was forced to sell to PNC.",
    mistakes: [
      {
        title: "Clientele defined by exclusion",
        detail:
          "Riggs actively courted customers other banks refused — sanctioned governments, arms traffickers, PEPs. Its business model was regulatory arbitrage: serve whom others won't, pocket the fees, ignore the risk.",
      },
      {
        title: "No genuine KYC function",
        detail:
          "Investigators found accounts opened for entities with no verifiable address, no discoverable ownership, and names that matched sanctions lists — yet the bank's 'due diligence' consisted of collecting documents, not analysing them.",
      },
      {
        title: "Washington relationships as cover",
        detail:
          "As the city's oldest bank, Riggs enjoyed political access that discouraged scrutiny. Reputational capital became a substitute for compliance capital — until a Senate report made that trade explicit.",
      },
    ],
    lessons: [
      "A client base built entirely of rejected customers is a risk concentration, not a niche.",
      "Political and community standing does not reduce AML obligations — it can increase them.",
      "Riggs became the Senate's textbook example of PATRIOT Act implementation failure — the law existed, the bank simply didn't follow it.",
    ],
  },
  {
    slug: "credit-suisse-mozambique",
    study: [
      { label: "PEP EDD workflow", href: "/courses/kyc-cdd-tm-analyst/chapters/2.6" },
    { label: "Corruption & trade finance", href: "/courses/financial-intelligence-trafficking" },
    ],
    org: "Credit Suisse (Mozambique desk)",
    headline: "The 'tuna bonds' arranged by bankers",
    country: "Switzerland / Mozambique",
    year: 2016,
    fineUsd: 475e6,
    penalty: "~$475M+ in settlements; $2B loan fraud underlying",
    typologies: ["Corruption", "Fraud", "PEP exposure", "Trade finance abuse"],
    status: "Settlements reached; criminal convictions in Mozambique/US",
    people: ["Credit Suisse (entity)", "Mozambican officials (convicted)", "Jean Boustani (former Credit Suisse banker, convicted in NY)"],
    regulator: "US DOJ, SEC, Mozambique prosecutors",
    rootFailure: "Conflicted arrangement of sovereign debt with no independent credit assessment or disclosure of bank's role.",
    analystAngle: "'Tuna bonds' hidden debt arranged by Credit Suisse bankers — conflicts of interest, no independent credit assessment, proceeds diverted to officials' pockets.",
    summary:
      "Credit Suisse arranged and underwrote $2 billion in 'tuna bond' loans to Mozambique state entities, with fees and margins that far exceeded market norms. Investigators found the transactions benefited politically connected insiders and that the bank's compliance failed to identify the corruption risk — the first major case where a global bank faced criminal exposure for arranging, not just laundering, corruption proceeds.",
    mistakes: [
      {
        title: "Arranger turned principal",
        detail:
          "Credit Suisse didn't just process the loans — it structured them, marketed them to investors, and earned extraordinary fees. When a bank's revenue depends on a deal it also has a duty to police, the conflict must be managed explicitly.",
      },
      {
        title: "PEP network ignored",
        detail:
          "The borrowing entities were linked to senior Mozambican officials and their associates. Adverse media and PEP connections were available; the Mozambique desk treated the relationship as a sovereign mandate rather than a corruption risk.",
      },
      {
        title: "Fees as the tell",
        detail:
          "The margins on the tuna bonds were multiples of comparable sovereign deals. Internal pricing benchmarks flagged the anomaly; the response was to treat it as a commercial win rather than a risk signal.",
      },
    ],
    lessons: [
      "Arranging and underwriting corrupt deals is laundering's upstream twin — facilitation is prosecutable.",
      "Sovereign and state-entity mandates require the same PEP and adverse-media scrutiny as private clients.",
      "Pricing anomalies are free risk signals — a fee that can't be explained by market terms must be explained by risk.",
    ],
  },
  {
    slug: "ftx-alameda",
    study: [
      { label: "Customer lifecycle & exit", href: "/courses/kyc-cdd-tm-analyst/chapters/1.4" },
    { label: "VASPs & crypto hub", href: "/disciplines/vasp-crypto" },
    ],
    org: "FTX / Alameda Research",
    headline: "The crypto exchange that became a laundering machine",
    country: "USA / Bahamas",
    year: 2022,
    fineUsd: null,
    penalty: "Bankruptcy; founder sentenced to 25 years",
    typologies: ["VASP failure", "Fraud", "Missing AML programme", "Customer-fund misuse"],
    status: "Founder convicted; bankruptcy estate recovering assets",
    people: ["Sam Bankman-Fried (founder, convicted)", "Caroline Ellison (Alameda CEO, pleaded guilty)", "FTX (entity)"],
    regulator: "US DOJ, SEC, CFTC",
    rootFailure: "No AML programme, no segregation of customer funds, and no KYC on related-party trading — governance void.",
    analystAngle: "No AML programme at all — commingled customer funds, no KYC on related parties, fake collateral — governance failure visible to anyone asking 'where is customer money?'",
    summary:
      "FTX, once valued at $32B, collapsed in November 2022 after revealing that customer funds had been lent to Alameda Research — its own trading arm — and used for venture bets, political donations and real estate. Beyond the fraud, FTX had virtually no functioning AML programme: no transaction monitoring, no sanctions screening at scale, and customer assets commingled with proprietary funds.",
    mistakes: [
      {
        title: "No AML programme at all",
        detail:
          "FTX operated as a money transmitter without a basic compliance stack: no effective sanctions screening on deposits/withdrawals, no suspicious-activity process, and no segregation between customer and corporate assets. Regulators had warned for years.",
      },
      {
        title: "Velocity and structuring blindness",
        detail:
          "Alameda moved billions through FTX accounts with patterns that would trigger standard monitoring — round-tripping, wash trading, rapid in/out flows. There was no system to see it because there was no system.",
      },
      {
        title: "Regulatory arbitrage as strategy",
        detail:
          "FTX headquartered in the Bahamas specifically to avoid US AML obligations, while marketing itself as 'the safest' exchange. The jurisdictional choice was itself a statement about which rules it intended to ignore.",
      },
    ],
    lessons: [
      "A VASP without transaction monitoring is a laundering service with a logo — screening and monitoring are existential, not optional.",
      "Customer-fund commingling converts a fraud problem into an AML catastrophe: you cannot monitor what you cannot segregate.",
      "Choosing a lax jurisdiction does not remove obligations — it removes the excuse.",
    ],
  },
  {
    slug: "swedbank",
    study: [
      { label: "KYB onboarding", href: "/courses/kyc-cdd-tm-analyst/chapters/3.1" },
    { label: "Baltic corridor typologies", href: "/courses/sanctions-screening" },
    ],
    org: "Swedbank",
    headline: "Baltic non-resident laundering, Danske's neighbour",
    country: "Sweden / Estonia / Latvia",
    year: 2020,
    fineUsd: 600e6,
    penalty: "~$600M+ in provisions and penalties (reported)",
    typologies: ["Non-resident portfolio laundering", "Shell companies", "Trade-based laundering"],
    status: "Resolved — CEO replaced, monitorship, provisions booked",
    people: ["Swedbank (entity)", "Swedish FSA", "Birgitte Bonnesen (CEO, replaced)"],
    regulator: "US DOJ, Swedish FSA, Baltic prosecutors",
    rootFailure: "Baltic non-resident flows lacked UBO verification and jurisdiction risk limits, mirroring the Danske failure pattern.",
    analystAngle: "Non-resident portfolio flows through Baltic subsidiaries mirroring Danske — high-risk jurisdiction customers with opaque ownership and pass-through activity.",
    summary:
      "Following the Danske scandal, journalists and regulators found Swedbank's Baltic branches had run a similar non-resident business — thousands of shell-company customers moving tens of billions with weak verification. Swedbank set aside roughly SEK 6 billion in provisions, replaced its CEO and paid penalties across Nordic regulators.",
    mistakes: [
      {
        title: "Same model, same blindness",
        detail:
          "Swedbank's Baltic non-resident portfolio mirrored Danske's: nominee shareholders, post-office-box addresses, no visible business activity. The industry treated the Danske revelations as a Danske problem, not a business-model problem.",
      },
      {
        title: "Internal warnings again ignored",
        detail:
          "Employees had flagged the non-resident book internally for years. As with Danske, concerns were absorbed by local management rather than escalated — suggesting a systemic governance pattern, not isolated error.",
      },
      {
        title: "Profit concentration in the riskiest book",
        detail:
          "The Baltic operations contributed outsized profits relative to their size. When a unit's returns are anomalous, the anomaly is usually the risk being mispriced.",
      },
    ],
    lessons: [
      "A scandal at a peer bank is a prompt to audit your own equivalent book — not to assume you're different.",
      "Local management filtering bad news is the most common pre-scandal pattern across every Baltic case.",
      "Provision size is a confession: when a bank reserves hundreds of millions, the control failure was already known internally.",
    ],
  },
  {
    slug: "fbme",
    study: [
      { label: "Shell company red flags", href: "/courses/kyc-cdd-tm-analyst/chapters/3.1" },
    { label: "Correspondent banking", href: "/disciplines/tbml-correspondent" },
    ],
    org: "FBME Bank",
    headline: "The bank designated for terrorist financing",
    country: "Tanzania / Lebanon",
    year: 2015,
    fineUsd: 37e6,
    penalty: "$37M+ forfeiture (reported); OFAC designation",
    typologies: ["Proliferation financing", "Terrorist financing", "Shell ownership"],
    status: "Resolved — assets forfeited, bank sold",
    people: ["FBME Bank (entity)", "US Treasury OFAC", "Tadzhetdinov family (owners)"],
    regulator: "US Treasury OFAC, FinCEN",
    rootFailure: "Beneficial ownership could not be established; opaque Lebanese shareholding and nominee structures went unchallenged.",
    analystAngle: "Terrorist-financing exposure via Lebanese shareholders and opaque ownership — beneficial ownership could not be established; the bank was designated and collapsed.",
    summary:
      "FBME Bank, based in Tanzania but controlled by Lebanese interests, was designated by OFAC in 2015 for providing financial services to individuals and entities tied to terrorist organisations and proliferation networks. The bank's ownership was deliberately opaque — a chain of offshore holding companies that itself became the compliance story.",
    mistakes: [
      {
        title: "Ownership opacity as strategy",
        detail:
          "FBME's true owners were concealed behind layered offshore entities. Banks and regulators could not establish who ultimately controlled the institution — an unacceptable state for a bank holding customer deposits.",
      },
      {
        title: "Servicing sanctioned networks knowingly",
        detail:
          "Investigators found the bank processed transactions for parties linked to designated terrorist and proliferation networks. The conduct appears to have been a business choice, not a monitoring failure.",
      },
      {
        title: "Correspondent access despite risk",
        detail:
          "FBME retained correspondent banking relationships that gave it access to the US financial system for years after its risk profile was knowable — showing how slowly de-risking propagates through payment chains.",
      },
    ],
    lessons: [
      "If you cannot identify your bank's ultimate owner, you cannot bank it — ownership opacity is disqualifying, not merely high-risk.",
      "Terrorist-financing exposure is not limited to conflict zones; the typology follows the customer, not the postcode.",
      "De-risking decisions by correspondents are a market control — losing access is itself an enforcement outcome.",
    ],
  },
  {
    slug: "lt-bank",
    study: [
      { label: "Mirror trades & TBML", href: "/courses/kyc-cdd-tm-analyst/chapters/4.5" },
    { label: "Sanctions evasion", href: "/courses/sanctions-screening" },
    ],
    org: "LT Bank",
    headline: "Cyprus bank fined for sanctioned-country processing",
    country: "Cyprus",
    year: 2021,
    fineUsd: 9e6,
    penalty: "$9M OFAC penalty (reported)",
    typologies: ["Sanctions evasion", "Sudan/Iran transactions", "Correspondent banking"],
    status: "Resolved — OFAC settlement, compliance undertakings",
    people: ["LT Bank (entity)", "US Treasury OFAC"],
    regulator: "US Treasury OFAC, Cyprus CBC",
    rootFailure: "Nested correspondent relationships masked Sudanese/Iranian end-customers; no transparency on underlying parties.",
    analystAngle: "Processed USD payments for Sudanese clients through nested correspondents — sanctions exposure hidden behind layered payment chains.",
    summary:
      "OFAC determined that LT Bank, a Cypriot bank, had processed hundreds of transactions for clients in Sudan and Iran — jurisdictions under comprehensive US sanctions — including payments involving blocked persons. The bank settled for approximately $9 million and agreed to compliance undertakings, illustrating how mid-tier banks remain exposed to US jurisdiction through USD clearing.",
    mistakes: [
      {
        title: "Sanctions screening gaps at onboarding",
        detail:
          "Customers connected to sanctioned countries were onboarded without adequate screening or ongoing monitoring. OFAC found the bank lacked systems to identify sanctioned-party involvement in its payment flows.",
      },
      {
        title: "Correspondent relationships as blind spots",
        detail:
          "Transactions were processed through correspondent channels where sanctions exposure was assumed to sit with the intermediary. Every bank in the chain owns its own screening obligation.",
      },
    ],
    lessons: [
      "US sanctions jurisdiction reaches any bank touching USD — size and domicile provide no shelter.",
      "Correspondent intermediaries do not absorb your screening duty; each institution must know its own customers.",
      "Sanctions programmes fail at onboarding as often as at transaction monitoring — both layers must be tested.",
    ],
  },
  {
    slug: "troika-laundromat",
    study: [
      { label: "TBML & correspondent hub", href: "/disciplines/tbml-correspondent" },
    { label: "Trade-based laundering", href: "/courses/financial-intelligence-trafficking" },
    ],
    org: "Troika Laundromat network",
    headline: "The $4.8B Russian money laundromat",
    country: "Moldova / Latvia / Russia",
    year: 2019,
    fineUsd: null,
    penalty: "No bank convicted; scheme dismantled, ~$4.8B moved",
    typologies: ["Trade-based laundering", "Shell companies", "Mirror contracts"],
    status: "Scheme exposed by OCCRP/FT; banks closed or restructured",
    people: ["OCCRP & FT investigators", "Unicapital (Moldova)", "Latvian banks involved", "Russian beneficiaries (unnamed in reporting)"],
    regulator: "US DOJ, FBI, ICIJ (journalism)",
    rootFailure: "Trade finance lacked verification of invoice-vs-shipment consistency; fictitious invoices moved billions unchecked.",
    analystAngle: "$4.8B moved through fictitious trade invoices across shell companies — documents that didn't reconcile with any real goods; trade-finance analysts checking invoice-vs-shipment consistency would catch it.",
    summary:
      "Between 2010 and 2013, a network of Moldovan and Latvian banks and shell companies moved roughly $4.8 billion out of Russia using fictitious trade contracts — 'mirror contracts' where import and export paperwork offset each other. The scheme was exposed by an OCCRP/Financial Times investigation in 2019, leading to bank closures and regulatory action across the region.",
    mistakes: [
      {
        title: "Fictitious trade as the core mechanism",
        detail:
          "The network generated fake import/export contracts to justify cross-border transfers. Banks processed trade finance without verifying goods, counterparties, or the economic logic of the transactions.",
      },
      {
        title: "Nested shell structures",
        detail:
          "Layers of Moldovan and Latvian companies obscured the Russian beneficial owners. UBO verification stopped at the first corporate layer — a recurring failure across all laundromat cases.",
      },
      {
        title: "Journalism as the detection layer",
        detail:
          "The scheme was found by reporters analysing leaked data, not by bank monitoring or regulators. When internal controls are absent, the only remaining control is public scrutiny — which arrives after the money is gone.",
      },
    ],
    lessons: [
      "Trade-based laundering is the highest-value typology per unit of effort — verify the goods, not just the paperwork.",
      "Mirror/fictitious contracts deserve dedicated scenario rules: round-tripping trade flows are inherently suspicious.",
      "Beneficial-ownership checks must penetrate every corporate layer, or the first shell becomes the alibi.",
    ],
  },
  {
    slug: "wells-fargo",
    study: [
      { label: "Fake accounts & pressure sales", href: "/courses/fraud-prevention" },
    { label: "Control environment", href: "/courses/fraud-prevention/chapters/2.1" },
    ],
    org: "Wells Fargo",
    headline: "The $3B settlement for a broken control culture",
    country: "USA",
    year: 2020,
    fineUsd: 3.0e9,
    penalty: "$3B DOJ/SEC settlement; asset cap; executive bans",
    typologies: ["Governance failure", "Consumer harm", "Cross-selling abuse", "Weak accountability"],
    status: "Resolved — monitorship; billions in remediation; Fed asset cap",
    people: ["Wells Fargo (entity)", "US DOJ, SEC, Fed", "Former CEO John Stumpf (banned)"],
    regulator: "US DOJ, CFPB, OCC, city attorneys",
    rootFailure: "Sales incentives overrode control culture — accounts opened without consent, controls bypassed, whistleblowers ignored.",
    analystAngle: "Fake-accounts scandal: staff opened millions of unauthorised accounts to hit sales targets — a governance/culture failure where controls existed but incentives overrode them.",
    summary:
      "Wells Fargo's fake-accounts scandal — employees opening millions of unauthorised accounts to hit sales targets — became the defining US governance failure of the 2010s. The 2020 $3 billion settlement resolved consumer-harm, securities and governance charges, and the Federal Reserve capped the bank's assets until its controls were rebuilt.",
    mistakes: [
      {
        title: "Incentives ate the controls",
        detail:
          "Frontline staff gamed metrics because compensation was tied to account openings, not customer outcomes. When the measurement system rewards the abuse, detection systems become the enemy of the measured.",
      },
      {
        title: "Ethics lines were reported and ignored",
        detail:
          "Employees raised concerns internally for years; the bank's own investigations repeatedly found problems that were minimised or buried. The gap between 'we looked' and 'we acted' defined the scandal.",
      },
      {
        title: "Accountability stopped below the top",
        detail:
          "Thousands of frontline employees were fired while senior executives largely escaped consequence — until regulators imposed an asset cap that made governance a balance-sheet issue.",
      },
    ],
    lessons: [
      "Control culture is set by what happens to managers when controls fail — not by the policy document.",
      "Metric-driven organisations need metric-independent audit: someone must ask whether the number itself is the fraud.",
      "Consumer-harm failures and AML failures share a root cause — both are 'the control existed but nobody owned the outcome'.",
    ],
  },
];

export function getCase(slug: string): EnforcementCase | undefined {
  return enforcementCases.find((c) => c.slug === slug);
}
