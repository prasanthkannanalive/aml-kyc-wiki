// Synthetic on-chain dataset for the SQL playground — Dune-style schema.
// Mirrors real Dune tables: raw transaction rows with block_time,
// addresses, value, token and chain columns.

export interface ChainTxn {
  tx_hash: string;
  block_number: number;
  block_time: string; // "YYYY-MM-DD HH:MM"
  from_address: string;
  to_address: string;
  value: number;
  token: string;
  chain: string;
}

export const PEEL_ADDRS = [
  "0xWhale01",
  "0xPeel01",
  "0xPeel02",
  "0xPeel03",
  "0xPeel04",
  "0xPeel05",
  "0xPeel06",
  "0xPeel07",
  "0xPeel08",
];
export const MIXER_ADDR = "0xTornado01";
export const DORMANT_WHALE = "0xDormantWhale";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TOKENS = ["ETH", "USDC", "USDT"];
const CHAINS = ["ethereum", "polygon", "arbitrum"];
const RANDOM_ADDRS = [
  "0xUserA21", "0xUserB87", "0xUserC04", "0xUserD55", "0xUserE19",
  "0xUserF92", "0xUserG33", "0xUserH76", "0xDeFiPool1", "0xDeFiPool2",
  "0xBridgeX", "0xExchangeHot1",
];

const START = Date.UTC(2025, 0, 1);
const DAY = 86400000;

function ts(ms: number) {
  return new Date(ms).toISOString().slice(0, 16).replace("T", " ");
}

export function generateChain(seed: number): ChainTxn[] {
  const rnd = mulberry32(seed);
  const rows: ChainTxn[] = [];
  let n = 0;
  const push = (
    offsetMs: number,
    from: string,
    to: string,
    value: number,
    token = "ETH",
    chain = "ethereum"
  ) => {
    rows.push({
      tx_hash: `0x${(seed * 100000 + n++).toString(16).padStart(8, "0")}${Math.floor(rnd() * 1e8).toString(16)}`,
      block_number: 22000000 + Math.floor(offsetMs / DAY) * 7200 + Math.floor(rnd() * 500),
      block_time: ts(START + offsetMs),
      from_address: from,
      to_address: to,
      value: Math.round(value * 10000) / 10000,
      token,
      chain,
    });
  };

  // baseline noise: ~150 ordinary transfers
  for (let i = 0; i < 150; i++) {
    push(
      Math.floor(rnd() * 30) * DAY + Math.floor(rnd() * DAY),
      RANDOM_ADDRS[Math.floor(rnd() * RANDOM_ADDRS.length)],
      RANDOM_ADDRS[Math.floor(rnd() * RANDOM_ADDRS.length)],
      rnd() * 4 + 0.05,
      TOKENS[Math.floor(rnd() * TOKENS.length)],
      CHAINS[Math.floor(rnd() * CHAINS.length)]
    );
  }

  // typology 1 — peeling chain: Whale01 → Peel01..Peel08, ~88% forwarded each hop
  let amt = 120;
  for (let i = 0; i < PEEL_ADDRS.length - 1; i++) {
    const from = PEEL_ADDRS[i];
    const to = PEEL_ADDRS[i + 1];
    push(i * 2 * DAY + Math.floor(rnd() * DAY), from, to, amt);
    amt = Math.round(amt * 0.88 * 100) / 100;
    // occasional small change output back to noise pool
    if (i % 3 === 0)
      push(i * 2 * DAY + DAY / 2, from, RANDOM_ADDRS[i % RANDOM_ADDRS.length], amt * 0.12);
  }
  // final peel consolidates to an exchange hot wallet
  push(16 * DAY, "0xPeel08", "0xExchangeHot1", amt, "ETH", "ethereum");

  // typology 2 — mixer exposure: 4 depositors send to Tornado01, funds withdrawn to fresh addrs
  const depositors = ["0xUserA21", "0xUserC04", "0xUserF92", "0xUserH76"];
  depositors.forEach((d, i) => {
    push((5 + i * 2) * DAY + rnd() * DAY, d, MIXER_ADDR, 8 + rnd() * 20, "ETH");
    push((6 + i * 2) * DAY + rnd() * DAY, MIXER_ADDR, `0xFreshOut${i}`, 7 + rnd() * 18, "ETH");
  });

  // typology 3 — dormant whale wakes up: no activity for ~20 days then bursts
  push(2 * DAY, DORMANT_WHALE, "0xDeFiPool1", 40, "USDC", "ethereum");
  for (let i = 0; i < 5; i++)
    push((22 + i) * DAY + i * 3600000, DORMANT_WHALE, `0xFreshOut${i + 4}`, 15 + rnd() * 10, "USDC", "ethereum");

  return rows.sort((a, b) => a.block_time.localeCompare(b.block_time));
}
