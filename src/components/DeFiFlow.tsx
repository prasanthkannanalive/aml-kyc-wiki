"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/*
 * DeFi flow explorer — DeFiLlama-style token/contract interaction graph.
 * Nodes are wallets, routers, pools and bridges; edges carry token amounts.
 * "Play flow" animates token packets along each hop while the side panel
 * shows the exact contract interaction that moved the funds.
 */

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  kind: "wallet" | "router" | "pool" | "bridge" | "cex";
  token?: string; // token badge e.g. "USDC"
}

interface Edge {
  from: string;
  to: string;
  label: string;
  call: string; // the contract interaction
  detail: string;
  risk: "low" | "med" | "high";
}

const NODES: Node[] = [
  { id: "w1", x: 70, y: 130, label: "0x7a3f…91c2", sub: "User wallet", kind: "wallet", token: "USDC" },
  { id: "r1", x: 230, y: 130, label: "Uniswap V3 Router", sub: "0xE592…A2bA", kind: "router" },
  { id: "p1", x: 390, y: 60, label: "USDC/WETH 0.05%", sub: "pool 0x88e6…6047", kind: "pool", token: "WETH" },
  { id: "p2", x: 390, y: 200, label: "WETH/USDT 0.3%", sub: "pool 0x4e68…CF48", kind: "pool", token: "USDT" },
  { id: "b1", x: 560, y: 130, label: "Stargate bridge", sub: "0x77b2…3fD2", kind: "bridge" },
  { id: "w2", x: 740, y: 130, label: "0xbb12…e8f0", sub: "CEX deposit addr", kind: "cex", token: "USDT" },
];

const EDGES: Edge[] = [
  {
    from: "w1", to: "r1",
    label: "approve 50,000 USDC",
    call: "USDC.approve(router, 50000e6)",
    detail: "Unlimited-approval red flag pattern — the wallet grants the router max spend. Common in DeFi but abused by drainer contracts.",
    risk: "med",
  },
  {
    from: "r1", to: "p1",
    label: "swap 50k USDC → 21.4 WETH",
    call: "router.exactInputSingle({tokenIn: USDC, tokenOut: WETH, fee: 500, amountIn: 50000e6})",
    detail: "Single-hop swap through the 0.05% fee tier. Slippage set 0.5% — output 21.4 WETH at ~$2,336/ETH.",
    risk: "low",
  },
  {
    from: "p1", to: "r1", // drawn as p1 -> p2 visually via router note
    label: "LP reposition",
    call: "nonfungiblePositionManager.increaseLiquidity({token0: WETH, token1: USDT})",
    detail: "Actually flows WETH into the WETH/USDT pool — the router rebalances through the second pool, fragmenting the trail across two contracts.",
    risk: "med",
  },
  {
    from: "p2", to: "b1",
    label: "bridge 21.0 WETH → Arb",
    call: "stargate.sendToken(SEND, 21000000000000000000, dstEid, receiver)",
    detail: "LayerZero-backed bridge sends 21 WETH to an Arbitrum address — a chain-hop that breaks naive same-chain analytics.",
    risk: "high",
  },
  {
    from: "b1", to: "w2",
    label: "land as 20.9k USDT",
    call: "oft.receive() → USDT.transfer(cexDeposit, 20900e6)",
    detail: "Bridge output auto-swaps to USDT and lands on a known exchange deposit address — the off-ramp.",
    risk: "high",
  },
];

// visual edges: p1->r1 is odd; redraw as router fan. Simplify edge paths:
const PATHS: { d: string; edge: Edge }[] = [
  { d: "M 118 130 L 178 130", edge: EDGES[0] },           // w1 -> r1
  { d: "M 278 118 C 320 80, 350 70, 382 66", edge: EDGES[1] }, // r1 -> p1
  { d: "M 398 96 C 420 130, 420 170, 398 194", edge: EDGES[2] }, // p1 -> p2 (down)
  { d: "M 442 200 C 480 190, 510 160, 552 140", edge: EDGES[3] }, // p2 -> b1
  { d: "M 608 130 L 692 130", edge: EDGES[4] },           // b1 -> w2
];

const KIND_STYLE: Record<Node["kind"], { fill: string; stroke: string; chip: string }> = {
  wallet: { fill: "#1e293b", stroke: "#38bdf8", chip: "text-sky-300" },
  router: { fill: "#1c1917", stroke: "#a78bfa", chip: "text-violet-300" },
  pool: { fill: "#0c1a14", stroke: "#34d399", chip: "text-emerald-300" },
  bridge: { fill: "#1c1206", stroke: "#fbbf24", chip: "text-amber-300" },
  cex: { fill: "#1a0f14", stroke: "#fb7185", chip: "text-rose-300" },
};

export default function DeFiFlow() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1); // active edge index
  const [sel, setSel] = useState(0);

  const play = () => {
    setPlaying(true);
    setStep(0);
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      if (i >= PATHS.length) {
        setStep(PATHS.length);
        setPlaying(false);
        clearInterval(iv);
      } else {
        setStep(i);
        setSel(i);
      }
    }, 1500);
  };

  const edge = PATHS[Math.min(Math.max(sel, 0), PATHS.length - 1)].edge;
  const node = NODES.find((n) => n.id === (PATHS[Math.min(Math.max(sel, 0), PATHS.length - 1)].edge.to))!;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/40">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 bg-surface/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-xs font-medium text-muted">defi trace · USDC → WETH → USDT · chain-hop to Arbitrum</span>
        </div>
        <button
          onClick={play}
          disabled={playing}
          className="rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
        >
          {playing ? "Tracing…" : step >= PATHS.length ? "↻ Replay flow" : "▶ Play flow"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* graph */}
        <div className="p-4">
          <svg viewBox="0 0 810 270" className="w-full">
            {/* edges */}
            {PATHS.map((p, i) => {
              const active = i < step;
              return (
                <g key={i}>
                  <motion.path
                    d={p.d}
                    fill="none"
                    stroke={active ? "#34d399" : "#3f3f46"}
                    strokeWidth={active ? 2 : 1.2}
                    strokeDasharray="5 4"
                    initial={false}
                    animate={active ? { strokeDashoffset: [0, -18] } : {}}
                    transition={active ? { repeat: Infinity, duration: 0.9, ease: "linear" } : {}}
                    opacity={active ? 0.9 : 0.5}
                  />
                  {active && (
                    <circle r="4" fill="#6ee7b7">
                      <animateMotion dur="1.4s" repeatCount="indefinite" path={p.d} />
                    </circle>
                  )}
                  {/* edge label */}
                  <text
                    x={EDGE_LABEL_POS[i][0]}
                    y={EDGE_LABEL_POS[i][1]}
                    textAnchor="middle"
                    className="fill-zinc-400"
                    fontSize="9"
                  >
                    {p.edge.label}
                  </text>
                </g>
              );
            })}

            {/* nodes */}
            {NODES.map((n) => {
              const s = KIND_STYLE[n.kind];
              const visited = PATHS.findIndex((p) => p.edge.to === n.id || p.edge.from === n.id) < step;
              return (
                <g
                  key={n.id}
                  onClick={() => {
                    const ei = PATHS.findIndex((p) => p.edge.to === n.id || p.edge.from === n.id);
                    if (ei >= 0) setSel(ei);
                  }}
                  className="cursor-pointer"
                  opacity={visited || playing ? 1 : 0.55}
                >
                  <rect
                    x={n.x - 62}
                    y={n.y - 30}
                    width="124"
                    height="60"
                    rx="10"
                    fill={s.fill}
                    stroke={visited || playing ? s.stroke : "#3f3f46"}
                    strokeWidth={visited || playing ? 1.6 : 1}
                  />
                  {n.token && (
                    <circle cx={n.x - 48} cy={n.y - 16} r="9" fill={s.stroke} opacity="0.25" />
                  )}
                  {n.token && (
                    <text x={n.x - 48} y={n.y - 13} textAnchor="middle" fontSize="7" fontWeight="bold" fill={s.stroke}>
                      {n.token.slice(0, 4)}
                    </text>
                  )}
                  <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#e4e4e7">
                    {n.label.length > 16 ? n.label.slice(0, 15) + "…" : n.label}
                  </text>
                  <text x={n.x} y={n.y + 10} textAnchor="middle" fontSize="8" fill="#a1a1aa">
                    {n.sub}
                  </text>
                  <text x={n.x} y={n.y + 23} textAnchor="middle" fontSize="7" fontWeight="700" className={s.chip}>
                    {n.kind.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-center text-[10px] text-faint">
            Animated packets = token transfers · click a node to inspect the interaction
          </p>
        </div>

        {/* interaction detail panel */}
        <div className="border-t border-line/70 bg-surface/30 p-4 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={sel}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-faint">
                Contract interaction {sel + 1} of {PATHS.length}
              </div>
              <code className="mt-2 block break-all rounded-lg border border-line bg-zinc-950/70 px-3 py-2 font-mono text-[11px] leading-5 text-emerald-300">
                {edge.call}
              </code>
              <div className="mt-2 text-xs font-medium text-ink">{edge.label}</div>
              <p className="mt-2 text-xs leading-5 text-body">{edge.detail}</p>
              <span
                className={`mt-3 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${
                  edge.risk === "high"
                    ? "border-red-400/40 bg-red-400/10 text-red-300"
                    : edge.risk === "med"
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                      : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                }`}
              >
                {edge.risk} risk
              </span>
              <div className="mt-3 rounded-lg border border-line bg-surface-2/40 p-3">
                <div className="text-[9px] font-semibold uppercase tracking-wide text-faint">Next node</div>
                <div className="mt-1 font-mono text-[11px] text-ink">{node.label}</div>
                <div className="text-[10px] text-muted">{node.sub}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// label positions along each edge (viewBox coords)
const EDGE_LABEL_POS: [number, number][] = [
  [148, 118],
  [330, 55],
  [430, 165],
  [505, 185],
  [650, 118],
];
