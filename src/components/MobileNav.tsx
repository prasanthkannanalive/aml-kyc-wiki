"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavGroup } from "@/components/NavMenu";


export default function MobileNav({
  groups,
  searchLabel,
  menuLabel,
}: {
  groups: NavGroup[];
  searchLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={menuLabel}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {open ? (
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[80vh] overflow-y-auto border-b border-line bg-background px-4 pb-6 pt-4">
          <form action="/search" method="get" className="mb-3">
            <input
              type="search"
              name="q"
              placeholder={`${searchLabel}…`}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder-faint outline-none focus:border-emerald-400"
            />
          </form>
          <nav className="flex flex-col gap-4">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {g.label}
                </div>
                <div className="flex flex-col gap-0.5">
                  {g.items.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm text-body hover:bg-surface-2"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
