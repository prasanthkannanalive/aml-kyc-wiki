import type { Metadata } from "next";
import Link from "next/link";
import { courses, totalChapters } from "@/lib/content";
import { listChapters } from "@/lib/chapters";
import { getSessionUser } from "@/lib/auth";
import { getProgress } from "@/lib/db";
import { getLang, t, ti } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Guided AML/KYC training sessions — work through certification courses chapter by chapter with progress tracking.",
};
export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const lang = await getLang();
  const user = await getSessionUser();
  const progress = user ? await getProgress(user.id) : {};
  const doneKeys = new Set(Object.keys(progress).filter((k) => k.startsWith("done:")));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{t(lang, "train.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t(lang, "train.sub")}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {courses.map((c) => {
          const nums = listChapters(c.slug).map((ch) => ch.num);
          const done = nums.filter((n) => doneKeys.has(`done:${c.slug}/${n}`)).length;
          const pct = nums.length ? Math.round((done / nums.length) * 100) : 0;
          return (
            <Link
              key={c.slug}
              href={`/training/${c.slug}`}
              className="group rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-emerald-400/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  {c.code}
                </span>
                <span className="text-xs text-muted">{c.level}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-ink group-hover:text-emerald-300">
                {c.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{c.tagline}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted">
                  <span>
                    {ti(lang, "train.chapterslessons", {
                      c: totalChapters(c),
                      l: nums.length,
                    })}
                  </span>
                  <span>
                    {done > 0 ? ti(lang, "train.pct", { pct }) : t(lang, "train.notstarted")}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 text-sm font-medium text-emerald-400">
                {done > 0 ? `${t(lang, "train.resume")} →` : `${t(lang, "train.start")} →`}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
