"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ChapterContent from "./ChapterContent";
import ModuleExplorer from "./ModuleExplorer";
import type { Scenario } from "@/lib/scenarios";
import { t, ti, type Lang } from "@/lib/i18n-dict";

type Chapter = {
  num: string;
  title: string;
  moduleNum?: number;
  moduleTitle?: string;
  startPage?: number;
  endPage?: number;
  body: string;
  scenarios: Scenario[];
};

type CourseMeta = {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  provider: string;
  level: string;
};

export default function TrainingPlayer({
  course,
  chapters,
  doneChapters,
  startNum,
  lang,
}: {
  course: CourseMeta;
  chapters: Chapter[];
  doneChapters: string[];
  startNum?: string;
  lang: Lang;
}) {
  const [currentNum, setCurrentNum] = useState(startNum ?? chapters[0]?.num);
  const [done, setDone] = useState<Set<string>>(new Set(doneChapters));
  const [menuOpen, setMenuOpen] = useState(false);
  const tracked = useRef<Set<string>>(new Set());

  const current = chapters.find((c) => c.num === currentNum) ?? chapters[0];
  const index = chapters.findIndex((c) => c.num === current?.num);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null;

  // group chapters by module for the menu
  const modules = useMemo(() => {
    const map = new Map<number, { title: string; items: Chapter[] }>();
    for (const ch of chapters) {
      const key = ch.moduleNum ?? 0;
      const m = map.get(key) ?? { title: ch.moduleTitle ?? "General", items: [] };
      m.items.push(ch);
      map.set(key, m);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [chapters]);

  const pct = chapters.length ? Math.round((done.size / chapters.length) * 100) : 0;
  const isDone = done.has(current?.num ?? "");

  // module intro — show the interactive overview when landing on a module's first chapter
  const currentModule = modules.find(([, m]) =>
    m.items.some((c) => c.num === current?.num)
  );
  const isModuleStart =
    !!currentModule && currentModule[1].items[0]?.num === current?.num;

  // track chapter view once per lesson opened
  useEffect(() => {
    if (!current) return;
    const key = `${course.slug}/${current.num}`;
    if (tracked.current.has(key)) return;
    tracked.current.add(key);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "chapter", id: key }),
    }).catch(() => {});
  }, [current, course.slug]);

  function openChapter(num: string) {
    setCurrentNum(num);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }

  async function toggleComplete() {
    if (!current) return;
    const id = `${course.slug}/${current.num}`;
    const completing = !done.has(current.num);
    // optimistic update
    setDone((s) => {
      const n = new Set(s);
      if (completing) n.add(current.num);
      else n.delete(current.num);
      return n;
    });
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "complete", id }),
      });
    } catch {
      // revert on failure
      setDone((s) => {
        const n = new Set(s);
        if (completing) n.delete(current.num);
        else n.add(current.num);
        return n;
      });
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-line bg-surface/60 px-4 py-2.5">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-md border border-line px-2.5 py-1 text-sm text-muted hover:text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link href="/training" className="text-sm text-muted hover:text-ink">
          {t(lang, "train.back")}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-ink">
            {course.title}
          </div>
          <div className="text-xs text-muted">
            {course.code} · {ti(lang, "train.lessonof", { i: index + 1, n: chapters.length })}
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-medium text-emerald-300">{pct}%</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar menu */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r border-line bg-surface pt-16 transition-transform lg:static lg:z-auto lg:w-72 lg:translate-x-0 lg:pt-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {t(lang, "train.menu")}
            </div>
            {modules.map(([num, mod]) => (
              <div key={num} className="mb-4">
                <div className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-300/80">
                  {ti(lang, "train.module", { n: num })} · {mod.title}
                </div>
                <ul className="space-y-0.5">
                  {mod.items.map((ch) => {
                    const active = ch.num === current?.num;
                    const isChDone = done.has(ch.num);
                    return (
                      <li key={ch.num}>
                        <button
                          onClick={() => openChapter(ch.num)}
                          className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                            active
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "text-body hover:bg-surface-2 hover:text-ink"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                              isChDone
                                ? "border-emerald-400 bg-emerald-400 text-emerald-950"
                                : active
                                  ? "border-emerald-400 text-emerald-300"
                                  : "border-line text-muted"
                            }`}
                          >
                            {isChDone ? "✓" : ch.num.split(".")[1]}
                          </span>
                          <span className="leading-snug">{ch.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
        {menuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* content */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          {current && (
            <article className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
              <div className="mb-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
                {ti(lang, "train.module", { n: current.moduleNum ?? 0 })} · {current.moduleTitle}
              </div>
              {isModuleStart && currentModule && (
                <div className="mb-6">
                  <ModuleExplorer
                    key={`${course.slug}-m${currentModule[0]}`}
                    slug={course.slug}
                    moduleNum={currentModule[0]}
                    moduleTitle={currentModule[1].title}
                    chapters={[]}
                    defaultOpen
                    hideChapters
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold tracking-tight text-ink">
                {current.num} — {current.title}
              </h1>
              <div className="mt-1 text-xs text-muted">
                {current.startPage != null &&
                  ti(lang, "train.sourcepp", {
                    a: current.startPage,
                    b: current.endPage ?? current.startPage,
                  })}
              </div>

              <div className="mt-6">
                <ChapterContent markdown={current.body} />
              </div>

              {/* lesson check — scenario questions from the source guide */}
              {current.scenarios.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold text-ink">
                    {t(lang, "train.lessoncheck")}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {t(lang, "train.lessonchecksub")}
                  </p>
                  <div className="mt-4 space-y-4">
                    {current.scenarios.map((s, i) => (
                      <ScenarioCard key={i} scenario={s} index={i} lang={lang} />
                    ))}
                  </div>
                </div>
              )}

              {/* lesson footer */}
              <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                <button
                  onClick={() => prev && openChapter(prev.num)}
                  disabled={!prev}
                  className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-body transition-colors hover:border-emerald-400/40 hover:text-ink disabled:opacity-40"
                >
                  {t(lang, "train.prev")}
                </button>
                <button
                  onClick={toggleComplete}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    isDone
                      ? "border border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10"
                      : "bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                  }`}
                >
                  {isDone ? t(lang, "train.completedundo") : t(lang, "train.markcomplete")}
                </button>
                <button
                  onClick={() => next && openChapter(next.num)}
                  disabled={!next}
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-300 disabled:opacity-40"
                >
                  {next ? t(lang, "train.next") : t(lang, "train.finished")}
                </button>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}

function ScenarioCard({
  scenario,
  index,
  lang,
}: {
  scenario: Scenario;
  index: number;
  lang: Lang;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-xl border border-line bg-surface/60 p-5">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
          {ti(lang, "train.scenario", { i: index + 1 })}
        </span>
        <span className="text-xs font-medium text-muted">{scenario.title}</span>
      </div>
      <p className="mt-3 text-sm leading-7 text-body">{scenario.situation}</p>
      <p className="mt-3 text-sm font-semibold text-ink">
        {scenario.question}
      </p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 rounded-lg border border-emerald-400/50 px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-400/10"
        >
          {t(lang, "train.reveal")}
        </button>
      ) : (
        <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
            {t(lang, "train.modelanswer")}
          </div>
          <p className="mt-2 text-sm leading-7 text-body">{scenario.answer}</p>
        </div>
      )}
    </div>
  );
}
