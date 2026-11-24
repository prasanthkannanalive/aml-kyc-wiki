"use client";

import Link from "next/link";
import { useState } from "react";

export interface NavGroup {
  label: string;
  items: { href: string; label: string }[];
}

export default function NavMenu({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <nav className="hidden items-center gap-1 text-sm text-muted xl:flex">
      {groups.map((g, gi) => (
        <div
          key={g.label}
          className="relative"
          onMouseEnter={() => setOpen(gi)}
          onMouseLeave={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(open === gi ? null : gi)}
            aria-expanded={open === gi}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 transition-colors hover:text-ink ${open === gi ? "text-ink" : ""}`}
          >
            {g.label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open === gi ? "rotate-180" : ""}`}>
              <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open === gi && (
            <div className="absolute left-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border border-line bg-surface py-1.5 shadow-2xl">
              {g.items.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(null)}
                  className="block px-4 py-2 text-sm text-body transition-colors hover:bg-emerald-400/10 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
