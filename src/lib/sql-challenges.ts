// SQL playground challenges — run against the Data Lab synthetic datasets.
// Each challenge has a scenario, a reference query; user results are
// compared to the reference result set.

export interface SqlChallenge {
  id: string;
  title: string;
  /** Analyst roleplay framing — the "real" scenario. */
  scenario: string;
  dataset: "bank" | "chain";
  prompt: string;
  hint: string;
  /** Reference SQL producing the expected result set (run in the same engine). */
  referenceSql: string;
  explain: string;
  /** Optional link to try the pattern on the real platform. */
  tryOn?: { label: string; url: string };
}

export const SQL_CHALLENGES: SqlChallenge[] = [
  // ---------- bank ledger scenarios ----------
  {
    id: "volume-by-customer",
    title: "Who moves the most money?",
    scenario:
      "You are a TM analyst at a mid-size bank. Management wants the customer concentration report before the quarterly AML committee — which clients dominate payment flows?",
    dataset: "bank",
    prompt:
      "List each customer's total transaction volume (all types), highest first. Show customer name and total volume.",
    hint: "GROUP BY customer, SUM(amount), ORDER BY total DESC.",
    referenceSql:
      "SELECT customer, SUM(amount) AS total_volume FROM transactions GROUP BY customer ORDER BY total_volume DESC",
    explain:
      "GROUP BY collapses rows per customer; SUM(amount) totals volume; ORDER BY ... DESC ranks them. In AML this is the 'who are my biggest movers' question.",
  },
  {
    id: "structuring-band",
    title: "Spot the structuring band",
    scenario:
      "A branch manager flags 'Nova Retail' — five cash deposits landed just under the reporting line within a week. Pull every transaction sitting in the suspicious band.",
    dataset: "bank",
    prompt:
      "Find all deposit transactions between $9,000 and $9,999 — the classic sub-$10k structuring band. Show date, customer, amount.",
    hint: "WHERE type = 'deposit' AND amount BETWEEN 9000 AND 9999.",
    referenceSql:
      "SELECT ts, customer, amount FROM transactions WHERE type = 'deposit' AND amount BETWEEN 9000 AND 9999 ORDER BY ts",
    explain:
      "Structuring hides just under reporting thresholds. A BETWEEN filter on the band surfaces candidates instantly — the first query every AML analyst writes.",
  },
  {
    id: "repeat-structurer",
    title: "Who keeps skirting the threshold?",
    scenario:
      "One-off sub-threshold deposits are noise; repetition is the signal. Build the aggregate view: which customers keep depositing just under $10k?",
    dataset: "bank",
    prompt:
      "Find customers with 3 or more deposit transactions under $10,000. Show customer and their deposit count.",
    hint: "GROUP BY customer + HAVING COUNT(*) >= 3, filtered to deposits under 10000.",
    referenceSql:
      "SELECT customer, COUNT(*) AS deposits FROM transactions WHERE type = 'deposit' AND amount < 10000 GROUP BY customer HAVING COUNT(*) >= 3 ORDER BY deposits DESC",
    explain:
      "HAVING filters after aggregation — WHERE alone can't express '3 or more'. This is the smurfing signature: repetition below the line.",
  },
  {
    id: "velocity-day",
    title: "Busiest day on the books",
    scenario:
      "A fraud alert mentions 'unusual activity on a Tuesday'. Find the single busiest day in the dataset — then check which customers drove it.",
    dataset: "bank",
    prompt:
      "Find the single calendar day with the most transactions, and show how many transactions happened that day.",
    hint: "GROUP BY date(ts), COUNT(*), ORDER BY count DESC LIMIT 1. Use date(ts) to bucket timestamps.",
    referenceSql:
      "SELECT date(ts) AS day, COUNT(*) AS txns FROM transactions GROUP BY day ORDER BY txns DESC LIMIT 1",
    explain:
      "date(ts) buckets timestamps into days; GROUP BY + COUNT finds the peak. Velocity spikes often precede laundering events.",
  },
  {
    id: "round-layering",
    title: "Round-number layering",
    scenario:
      "Trade finance flagged 'Kite Logistics' — eight transfers of suspiciously round amounts to a new subsidiary. List every round-amount transfer in the book.",
    dataset: "bank",
    prompt:
      "List transfer transactions of exactly $25,000, $50,000, $75,000 or $100,000 — round amounts often signal layering. Show customer, counterparty, amount.",
    hint: "WHERE type = 'transfer' AND amount IN (25000, 50000, 75000, 100000).",
    referenceSql:
      "SELECT customer, counterparty, amount FROM transactions WHERE type = 'transfer' AND amount IN (25000, 50000, 75000, 100000) ORDER BY ts",
    explain:
      "Layering moves funds in clean round amounts through intermediaries. IN (...) filters exact values; amount % 5000 = 0 catches all round thousands.",
  },
  {
    id: "new-counterparty",
    title: "First-seen counterparties",
    scenario:
      "Onboarding data marks some counterparties as first-seen this month. Mule networks love fresh relationships — pull every transaction touching one.",
    dataset: "bank",
    prompt:
      "List transactions flagged as first-seen counterparties (is_new_cp = 1). Show customer, counterparty, amount, channel.",
    hint: "WHERE is_new_cp = 1 — the dataset already flags first sightings.",
    referenceSql:
      "SELECT customer, counterparty, amount, channel FROM transactions WHERE is_new_cp = 1 ORDER BY ts",
    explain:
      "New counterparties are a standard red flag — mule accounts and layering often route through fresh relationships. In production this flag comes from a counterparty-age lookup.",
  },

  // ---------- on-chain / Dune-style scenarios ----------
  {
    id: "chain-peel-trace",
    title: "Trace the peeling chain",
    scenario:
      "Chain analytics flagged 0xWhale01 — a wallet that received a large position and started peeling it through fresh addresses. Reconstruct the flow hop by hop, exactly like a Dune dashboard query.",
    dataset: "chain",
    prompt:
      "List every transfer sent FROM the whale or any peel-chain address (0xWhale01, 0xPeel01–0xPeel08), in time order. Show block_time, from_address, to_address, value.",
    hint: "WHERE from_address = '0xWhale01' OR from_address LIKE '0xPeel%' ORDER BY block_time.",
    referenceSql:
      "SELECT block_time, from_address, to_address, value FROM chain_transactions WHERE from_address = '0xWhale01' OR from_address LIKE '0xPeel%' ORDER BY block_time",
    explain:
      "A peeling chain moves value through sequential addresses, each forwarding ~90%. LIKE '0xPeel%' reconstructs the whole path in one query — the same pattern analysts run on ethereum.transactions in Dune.",
    tryOn: { label: "Try on Dune ↗", url: "https://dune.com" },
  },
  {
    id: "chain-mixer-exposure",
    title: "Who used the mixer?",
    scenario:
      "Compliance tagged 0xTornado01 as a high-risk mixer. Your exchange needs the counterparty list for its travel-rule review — who sent funds in, and where did withdrawals land?",
    dataset: "chain",
    prompt:
      "List all transfers INTO the mixer (to_address = '0xTornado01') and all transfers OUT of it. Show block_time, from_address, to_address, value, token.",
    hint: "WHERE to_address = '0xTornado01' OR from_address = '0xTornado01' ORDER BY block_time.",
    referenceSql:
      "SELECT block_time, from_address, to_address, value, token FROM chain_transactions WHERE to_address = '0xTornado01' OR from_address = '0xTornado01' ORDER BY block_time",
    explain:
      "Mixers pool and redistribute funds to break the trail. Screening both directions exposes depositors and fresh withdrawal addresses — on Dune this is a standard etherscan-style query.",
    tryOn: { label: "Try on Dune ↗", url: "https://dune.com" },
  },
  {
    id: "chain-usdc-movers",
    title: "Stablecoin whales",
    scenario:
      "The risk team wants the top USDC senders across all chains this month — stablecoins are the preferred laundering rail. Rank addresses by total USDC sent.",
    dataset: "chain",
    prompt:
      "Find the top 5 addresses by total USDC sent (token = 'USDC'). Show from_address and total value sent.",
    hint: "WHERE token = 'USDC' GROUP BY from_address ORDER BY total DESC LIMIT 5.",
    referenceSql:
      "SELECT from_address, SUM(value) AS total_sent FROM chain_transactions WHERE token = 'USDC' GROUP BY from_address ORDER BY total_sent DESC LIMIT 5",
    explain:
      "Stablecoins combine price stability with instant settlement — ideal for illicit movement. GROUP BY + SUM + LIMIT is the universal 'top movers' pattern across every chain dataset.",
    tryOn: { label: "Try on Dune ↗", url: "https://dune.com" },
  },
  {
    id: "chain-dormant-wake",
    title: "Dormant whale wakes up",
    scenario:
      "A wallet dormant for ~3 weeks suddenly burst into activity — classic compromised-key or sold-wallet pattern. Find every transaction it sent after day 20.",
    dataset: "chain",
    prompt:
      "List all transfers sent by 0xDormantWhale after January 21, 2025. Show block_time, to_address, value, token.",
    hint: "WHERE from_address = '0xDormantWhale' AND block_time >= '2025-01-21' ORDER BY block_time.",
    referenceSql:
      "SELECT block_time, to_address, value, token FROM chain_transactions WHERE from_address = '0xDormantWhale' AND block_time >= '2025-01-21' ORDER BY block_time",
    explain:
      "Dormancy-then-activity is a behavioural red flag in both banking and chain analytics. Text timestamps compare lexicographically — ISO dates make range filters trivial.",
    tryOn: { label: "Try on Dune ↗", url: "https://dune.com" },
  },
];
