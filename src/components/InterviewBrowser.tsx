"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { InterviewSection } from "@/lib/content";
import { glossary } from "@/lib/content";

// ---- keyword highlighting ----

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const TERM_RE = new RegExp(
  glossary
    .map((g) => escapeRe(g.term).replace(/ /g, "\\s+"))
    .sort((a, b) => b.length - a.length)
    .join("|"),
  "gi"
);
const ACR_RE = /\b[A-Z][A-Z0-9/&-]{1,}\b/g;
const BOUND = /[A-Za-z0-9_]/;

function highlight(text: string): React.ReactNode[] {
  const hits: { start: number; end: number }[] = [];
  for (const re of [TERM_RE, ACR_RE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const start = m.index;
      const end = start + m[0].length;
      const before = start > 0 ? text[start - 1] : "";
      const after = end < text.length ? text[end] : "";
      if (BOUND.test(before) || BOUND.test(after)) continue;
      hits.push({ start, end });
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  // drop overlaps (earlier/longer wins)
  const kept: { start: number; end: number }[] = [];
  let lastEnd = -1;
  for (const h of hits) {
    if (h.start < lastEnd) continue;
    kept.push(h);
    lastEnd = h.end;
  }
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  kept.forEach((h, i) => {
    if (h.start > pos) nodes.push(text.slice(pos, h.start));
    nodes.push(
      <mark
        key={i}
        className="rounded bg-emerald-400/20 px-1 py-0.5 font-medium text-emerald-700 dark:text-emerald-300"
      >
        {text.slice(h.start, h.end)}
      </mark>
    );
    pos = h.end;
  });
  if (pos < text.length) nodes.push(text.slice(pos));
  return nodes;
}

// ---- animated section icons ----

const ICONS: Record<string, React.ReactNode> = {
  foundations: (
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H15v9H6.5A2.5 2.5 0 0 0 4 14.5v-9Z" />
  ),
  "screening-sanctions": (
    <path d="M8 2.5 3.5 4.5v4c0 3 1.9 5.4 4.5 6.5 2.6-1.1 4.5-3.5 4.5-6.5v-4L8 2.5Z" />
  ),
  "kyc-cdd": (
    <>
      <rect x="2.5" y="4" width="11" height="8.5" rx="1.5" />
      <circle cx="6" cy="8" r="1.4" />
      <path d="M4.2 11c.4-1 1-1.5 1.8-1.5s1.4.5 1.8 1.5M10.5 7h2.5M10.5 9.5h2.5" />
    </>
  ),
  "frameworks-reporting": (
    <>
      <path d="M8 2.5v11M3.5 13.5h9" />
      <path d="M8 4.5 5 7M8 4.5l3 2.5M8 8l-3 2.5M8 8l3 2.5" />
    </>
  ),
  "typologies-alerts": (
    <>
      <path d="M8 2.5 14 12.5H2L8 2.5Z" />
      <path d="M8 6.5v3M8 11.2v.3" />
    </>
  ),
};

function SectionIcon({ slug }: { slug: string }) {
  return (
    <motion.span
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg bg-emerald-400/20"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        width="17"
        height="17"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative"
      >
        {ICONS[slug] ?? ICONS.foundations}
      </svg>
    </motion.span>
  );
}

// ---- animated per-answer concept icons ----

type Concept = { label: string; hint: string; paths: React.ReactNode };

const CONCEPTS: { re: RegExp; c: Concept }[] = [
  {
    re: /money launder|laundering|placement|layering|integration|proceeds of crime/i,
    c: {
      label: "The laundering cycle",
      hint: "Picture the three stages: placement → layering → integration.",
      paths: <path d="M2.5 8h3l2-3.5 3 7 2-3.5h2.5" />,
    },
  },
  {
    re: /hawala|hundi|underground|remittance|money transfer/i,
    c: {
      label: "Value without the wire",
      hint: "Hawala moves value through trusted brokers — no bank transfer at all.",
      paths: (
        <>
          <path d="M3 5.5h8M9 3l2.5 2.5L9 8" />
          <path d="M13 10.5H5M7 8l-2.5 2.5L7 13" />
        </>
      ),
    },
  },
  {
    re: /sanction|ofac|embargo|sdn list|denied person|export control/i,
    c: {
      label: "The sanctions shield",
      hint: "Screening = matching every name against restricted lists.",
      paths: (
        <path d="M8 2.5 3.5 4.5v4c0 3 1.9 5.4 4.5 6.5 2.6-1.1 4.5-3.5 4.5-6.5v-4L8 2.5Z" />
      ),
    },
  },
  {
    re: /kyc|know your customer|customer due diligence|\bcdd\b|\bedd\b|onboard|identity verif/i,
    c: {
      label: "Know the customer",
      hint: "KYC means verifying who the customer really is — not just their paperwork.",
      paths: (
        <>
          <rect x="2.5" y="4" width="11" height="8.5" rx="1.5" />
          <circle cx="6" cy="8" r="1.4" />
          <path d="M4.2 11c.4-1 1-1.5 1.8-1.5s1.4.5 1.8 1.5M10.5 7h2.5M10.5 9.5h2.5" />
        </>
      ),
    },
  },
  {
    re: /\bsar\b|\bstr\b|\bctr\b|suspicious activity|suspicious transaction|report(ing)? (to|a|the)|fiu|goaml|fintrac|norc/i,
    c: {
      label: "The confidential report",
      hint: "A SAR/STR goes to the FIU — confidential, and never shared with the customer.",
      paths: (
        <>
          <path d="M3.5 14V3" />
          <path d="M3.5 4h8l-2 3 2 3h-8" />
        </>
      ),
    },
  },
  {
    re: /pep|politically exposed|head of state|minister|official/i,
    c: {
      label: "The powerful person",
      hint: "PEPs need enhanced scrutiny — their position invites abuse of influence.",
      paths: (
        <>
          <circle cx="8" cy="5.5" r="2.5" />
          <path d="M3.5 13.5c.8-2.6 2.4-4 4.5-4s3.7 1.4 4.5 4" />
        </>
      ),
    },
  },
  {
    re: /structur|smurf|threshold|just below|velocity/i,
    c: {
      label: "Splitting to hide",
      hint: "Structuring = breaking one sum into many small ones to dodge thresholds.",
      paths: (
        <>
          <circle cx="5" cy="8" r="2.2" />
          <circle cx="11" cy="5.5" r="2.2" />
          <circle cx="11" cy="10.5" r="2.2" />
          <path d="M7 8h1.6" />
        </>
      ),
    },
  },
  {
    re: /\bubo\b|beneficial owner|ownership|shareholder|director/i,
    c: {
      label: "Follow the owners",
      hint: "A UBO is the real person behind the ownership chain — find them, verify them.",
      paths: (
        <>
          <circle cx="8" cy="4" r="1.6" />
          <circle cx="4" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <path d="M8 5.6V8M8 8 4 10.4M8 8l4 2.4" />
        </>
      ),
    },
  },
  {
    re: /fatf|fufs|mutual evaluation|grey list|blacklist|jurisdiction/i,
    c: {
      label: "The global standard",
      hint: "FATF sets the AML standards that countries and banks are measured against.",
      paths: (
        <>
          <circle cx="8" cy="8" r="5.5" />
          <path d="M2.5 8h11M8 2.5c-3 3.5-3 7.5 0 11M8 2.5c3 3.5 3 7.5 0 11" />
        </>
      ),
    },
  },
  {
    re: /alert|red flag|typolog|monitoring|rule-based|false positive/i,
    c: {
      label: "The warning sign",
      hint: "Alerts are signals, not proof — most need triage before they mean anything.",
      paths: (
        <>
          <path d="M8 2.5 14 12.5H2L8 2.5Z" />
          <path d="M8 6.5v3M8 11.2v.3" />
        </>
      ),
    },
  },
  {
    re: /shell compan|front compan|offshore|tax haven|spv|nominee|bearer share/i,
    c: {
      label: "The empty building",
      hint: "Shell and front companies exist to hide who really owns the money.",
      paths: (
        <>
          <path d="M3 14V5l5-2.5V14" />
          <path d="M8 14V9h5v5" />
          <path d="M2 14h12M5.5 7h1M5.5 9.5h1M10.5 11.5h1" />
        </>
      ),
    },
  },
  {
    re: /tipping.?off|tipping off|disclos|confidential|no-tipping/i,
    c: {
      label: "The locked door",
      hint: "Telling the customer about a report is itself an offence in most regimes.",
      paths: (
        <>
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
        </>
      ),
    },
  },
  {
    re: /correspondent bank|nostro|vostro|settlement|clearing|swift/i,
    c: {
      label: "The chain of banks",
      hint: "Money crosses borders through correspondent accounts — each bank must trust the next.",
      paths: (
        <>
          <path d="M8 2.5v11M3.5 13.5h9" />
          <path d="M8 4.5 5 7M8 4.5l3 2.5M8 8l-3 2.5M8 8l3 2.5" />
        </>
      ),
    },
  },
];

const DEFAULT_CONCEPT: Concept = {
  label: "Key idea",
  hint: "Focus on the mechanism — what actually happens to the money or the customer.",
  paths: (
    <>
      <path d="M8 2.5a4 4 0 0 0-2.3 7.3c.6.5 1 1.3 1 2.2h2.6c0-.9.4-1.7 1-2.2A4 4 0 0 0 8 2.5Z" />
      <path d="M6.5 13.5h3" />
    </>
  ),
};

function conceptFor(text: string): Concept {
  for (const { re, c } of CONCEPTS) if (re.test(text)) return c;
  return DEFAULT_CONCEPT;
}

function ConceptBadge({ concept }: { concept: Concept }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -18, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 }}
      className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-3.5"
    >
      <motion.span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {concept.paths}
        </svg>
      </motion.span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          {concept.label}
        </p>
        <p className="mt-1 text-sm leading-6 text-muted">{concept.hint}</p>
      </div>
    </motion.div>
  );
}

// ---- role / difficulty tagging ----

type Level = "L1" | "L2" | "Lead";
type Filter = "all" | Level | "scenario";

const LEAD_RE = /quality assurance|\bqa\b|audit|team lead|manage|management|policy|policies|regulator|regulatory|model risk|testing|second line|governance|compliance program/i;
const L2_RE = /walk me through|how would you|scenario|disposition|investigat|\bsar\b|\bstr\b|narrative|escalat|case file|unusual|alert|deep dive|complex|typolog|layering|draft|file a|reporting decision/i;
const SCENARIO_RE = /walk me through|imagine|scenario|a customer|your (customer|client|bank|manager|team)|you are the|pressure/i;

function levelFor(item: { q: string; a: string; level?: Level }): Level {
  if (item.level) return item.level;
  const text = `${item.q} ${item.a}`;
  if (LEAD_RE.test(text)) return "Lead";
  if (L2_RE.test(text)) return "L2";
  return "L1";
}

function isScenario(item: { q: string; a: string }, sectionSlug: string): boolean {
  return sectionSlug === "scenario-prompts" || SCENARIO_RE.test(`${item.q} ${item.a}`);
}

function matches(item: { q: string; a: string; level?: Level }, s: InterviewSection, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "scenario") return isScenario(item, s.slug);
  return levelFor(item) === filter;
}

// deterministic shuffle keyed by seed so SSR/CSR agree
function seededOrder<T>(arr: T[], seed: number, key: (x: T) => string): T[] {
  if (seed === 0) return arr;
  return [...arr].sort((a, b) => {
    const ha = hash(key(a) + ":" + seed);
    const hb = hash(key(b) + ":" + seed);
    return ha - hb;
  });
}
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ---- accordion ----

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All questions" },
  { id: "L1", label: "L1 · Alert Analyst" },
  { id: "L2", label: "L2 · Investigator" },
  { id: "Lead", label: "QA / Team Lead" },
  { id: "scenario", label: "Scenario prompts" },
];

export default function InterviewBrowser({
  sections,
}: {
  sections: InterviewSection[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [seed, setSeed] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [closed, setClosed] = useState<Set<string>>(new Set());

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        items: seededOrder(
          s.items.filter(
            (i) =>
              matches(i, s, filter) &&
              (!q || i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q))
          ),
          seed,
          (i) => i.q
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [query, sections, filter, seed]);

  const total = results.reduce((n, s) => n + s.items.length, 0);

  return (
    <div>
      <div className="sticky top-16 z-40 -mx-4 border-b border-line/60 bg-background/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setClosed(new Set());
          }}
          placeholder="Search questions — try 'UBO', 'STR', 'hawala', 'EDD'…"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder-muted outline-none transition-colors focus:border-emerald-400"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                setClosed(new Set());
                setOpen(null);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.id
                  ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                  : "border-line bg-surface text-muted hover:border-emerald-400/40 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setSeed((s) => s + 1)}
            title="Shuffle question order"
            className="ml-auto flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-emerald-400/40 hover:text-ink"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 3.5h3l4 5h2M1.5 8.5h3l1.5-2M8.5 3.5l2 2-2 2" />
            </svg>
            Shuffle
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          {total} question{total === 1 ? "" : "s"}
          {filter !== "all" ? ` · ${FILTERS.find((f) => f.id === filter)?.label}` : ""}
          {query ? ` for “${query}”` : ""}
        </p>
      </div>

      <div className="mt-8 space-y-10">
        {results.length === 0 && (
          <p className="rounded-xl border border-line bg-surface/50 p-6 text-sm text-muted">
            No questions match that search.
          </p>
        )}
        {results.map((s) => (
          <section key={s.slug}>
            <div className="flex items-center gap-3">
              <SectionIcon slug={s.slug} />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
                  {s.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted">{s.description}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {s.items.map((item) => {
                const key = `${s.slug}:${item.q}`;
                const searching = query.trim().length > 0;
                const isOpen = searching ? !closed.has(key) : open === key;
                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-xl border border-line bg-surface/50"
                  >
                    <button
                      onClick={() => {
                        if (searching) {
                          setClosed((prev) => {
                            const n = new Set(prev);
                            if (n.has(key)) n.delete(key);
                            else n.add(key);
                            return n;
                          });
                        } else {
                          setOpen(open === key ? null : key);
                        }
                      }}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2/50"
                    >
                      <span className="font-medium text-ink">{item.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-muted"
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line/60 px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2">
                                <motion.span
                                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                                  transition={{ duration: 1.6, repeat: Infinity }}
                                />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                                Answer
                              </span>
                            </div>
                            <p className="mt-2.5 text-sm leading-7 text-muted">
                              {highlight(item.a)}
                            </p>
                            <ConceptBadge concept={conceptFor(`${item.q} ${item.a}`)} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
