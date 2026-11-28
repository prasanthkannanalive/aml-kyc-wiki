// SQL playground challenges — run against the Data Lab synthetic dataset.
// Each challenge has a reference query; user results are compared to it.

export interface SqlChallenge {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  /** Reference SQL producing the expected result set (run in the same engine). */
  referenceSql: string;
  explain: string;
}

export const SQL_CHALLENGES: SqlChallenge[] = [
  {
    id: "volume-by-customer",
    title: "Who moves the most money?",
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
    prompt:
      "List transfer transactions of exactly $25,000, $50,000, $75,000 or $100,000 — round amounts often signal layering. Show customer, counterparty, amount.",
    hint: "WHERE type = 'transfer' AND amount IN (25000, 50000, 75000, 100000).",
    referenceSql:
      "SELECT customer, counterparty, amount FROM transactions WHERE type = 'transfer' AND amount IN (25000, 50000, 75000, 100000) ORDER BY ts",
    explain:
      "Layering moves funds in clean round amounts through intermediaries. IN (...) filters exact values; % 5000 = 0 catches all round thousands.",
  },
  {
    id: "new-counterparty",
    title: "First-seen counterparties",
    prompt:
      "List transactions flagged as first-seen counterparties (is_new_cp = 1). Show customer, counterparty, amount, channel.",
    hint: "WHERE is_new_cp = 1 — the dataset already flags first sightings.",
    referenceSql:
      "SELECT customer, counterparty, amount, channel FROM transactions WHERE is_new_cp = 1 ORDER BY ts",
    explain:
      "New counterparties are a standard red flag — mule accounts and layering often route through fresh relationships. In production this flag comes from a counterparty-age lookup.",
  },
];
