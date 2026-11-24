"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { pickVariant, ACCENT, DIAGRAMS } from "@/components/ChapterScenario";
import { MODULE_OVERVIEWS } from "@/lib/module-overviews";

export interface ModuleChapter {
  num: string;
  title: string;
  href: string;
}

/*
 * Interactive module explainer — animated archetype diagram + plain-language
 * summary + key points + clickable chapter map. Collapsed by default on
 * course pages; can render expanded (e.g. first chapter of a module in
 * the training player).
 */
export default function ModuleExplorer({
  slug,
  moduleNum,
  moduleTitle,
  chapters,
  defaultOpen = false,
  hideChapters = false,
}: {
  slug: string;
  moduleNum: number;
  moduleTitle: string;
  chapters: ModuleChapter[];
  defaultOpen?: boolean;
  hideChapters?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const ov = MODULE_OVERVIEWS[`${slug}/${moduleNum}`];
  const variant = pickVariant(`${moduleTitle} ${ov?.summary ?? ""}`);
  const accent = ACCENT[variant];
  const Diagram = DIAGRAMS[variant];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface/60"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400/15 font-mono text-[11px] font-bold text-emerald-300">
            {moduleNum}
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">{moduleTitle}</span>
            <span className="block text-[11px] text-muted">
              {chapters.length} chapters{ov ? " · interactive overview" : ""}
            </span>
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="text-faint"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-line/60 px-4 py-4">
              {ov && (
                <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
                  <div>
                    <p className="text-sm leading-6 text-body">{ov.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ov.points.map((p) => (
                        <span
                          key={p}
                          className="rounded-md border border-line bg-surface-2/60 px-2 py-1 text-[11px] text-muted"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="relative flex h-32 items-center justify-center overflow-hidden rounded-lg border border-line/60"
                    style={{ background: `linear-gradient(135deg, ${accent}10, transparent)` }}
                  >
                    <Diagram accent={accent} />
                  </div>
                </div>
              )}
              {!hideChapters && chapters.length > 0 && (
              <div className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-faint">
                  Chapters in this module
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chapters.map((c) => (
                    <Link
                      key={c.num}
                      href={c.href}
                      className="group flex items-center gap-1.5 rounded-lg border border-line bg-surface-2/50 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-emerald-400/40 hover:text-ink"
                    >
                      <span className="font-mono text-[10px] text-emerald-400/80">{c.num}</span>
                      <span className="max-w-56 truncate">{c.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
