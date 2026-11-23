"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";

export interface SuggestItem {
  title: string;
  subtitle: string;
  href: string;
  kind: string;
  text: string;
}

const KIND_STYLE: Record<string, string> = {
  Course: "bg-emerald-400/10 text-emerald-300",
  Chapter: "bg-sky-400/10 text-sky-300",
  Question: "bg-amber-400/10 text-amber-300",
  Term: "bg-violet-400/10 text-violet-300",
  Case: "bg-red-400/10 text-red-300",
  Discipline: "bg-cyan-400/10 text-cyan-300",
  Tool: "bg-fuchsia-400/10 text-fuchsia-300",
  Document: "bg-orange-400/10 text-orange-300",
};

export default function SearchBox({ items, placeholder }: { items: SuggestItem[]; placeholder: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return items
      .map((item) => {
        const hay = `${item.title} ${item.subtitle} ${item.text}`.toLowerCase();
        const score = terms.reduce(
          (s, t) => s + (item.title.toLowerCase().includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0),
          0
        );
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }, [q, items]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={boxRef} className="relative" onBlur={() => setTimeout(() => setOpen(false), 150)}>
      <form onSubmit={submit}>
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setHi(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
            if (e.key === "Enter" && open && results[hi]) {
              e.preventDefault();
              setOpen(false);
              router.push(results[hi].href);
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder-muted outline-none transition-colors focus:border-emerald-400"
        />
      </form>
      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No matches — press Enter for full search.</p>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={r.href + r.title}>
                  <Link
                    href={r.href}
                    onMouseEnter={() => setHi(i)}
                    className={`flex items-start gap-3 px-4 py-2.5 transition-colors ${i === hi ? "bg-emerald-400/10" : ""}`}
                  >
                    <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${KIND_STYLE[r.kind] ?? "bg-surface-2 text-muted"}`}>
                      {r.kind}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-ink">{r.title}</span>
                      <span className="block truncate text-xs text-muted">{r.subtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={submit}
                  className="w-full border-t border-line px-4 py-2.5 text-left text-xs font-medium text-emerald-400 hover:bg-emerald-400/5"
                >
                  See all results for “{q.trim()}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
