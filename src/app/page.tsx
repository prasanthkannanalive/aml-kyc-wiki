import Link from "next/link";
import { categories, courses, featuredReads, interviewSections, leaderboard, totalChapters } from "@/lib/content";
import CourseCard from "@/components/CourseCard";
import HeroIntro from "@/components/fx/HeroIntro";
import ScrollReveal from "@/components/fx/ScrollReveal";
import AnimatedCounter from "@/components/fx/AnimatedCounter";
import LaunderingFlow from "@/components/fx/LaunderingFlow";
import Explainers from "@/components/Explainers";
import { getLang, t } from "@/lib/i18n";
import { getSessionUser } from "@/lib/auth";
import { getProgress, getCourseReads } from "@/lib/db";
import { getCourse } from "@/lib/content";
import { disciplines } from "@/lib/disciplines";

export default async function Home() {
  const lang = await getLang();
  const featured = courses.filter((c) => c.featured);
  const readCounts = Object.fromEntries(
    await Promise.all(courses.map(async (c) => [c.slug, await getCourseReads(c.slug)]))
  );

  // resume banner — most recently viewed chapter across all courses
  const user = await getSessionUser();
  let resume: { slug: string; title: string } | null = null;
  if (user) {
    const prog = await getProgress(user.id);
    let bestKey = "";
    let bestTs = "";
    for (const [k, v] of Object.entries(prog)) {
      if (k.startsWith("chapter:") && v > bestTs) {
        bestTs = v;
        bestKey = k;
      }
    }
    if (bestKey) {
      const slug = bestKey.slice("chapter:".length).split("/")[0];
      const c = getCourse(slug);
      if (c) resume = { slug, title: c.title };
    }
  }
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line/60">
        <HeroIntro />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="hero-anim-badge text-sm font-medium uppercase tracking-widest text-emerald-400">
            {t(lang, "hero.badge")}
          </p>
          <h1 className="hero-anim-title mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t(lang, "hero.title")}
          </h1>
          <p className="hero-anim-sub mt-5 max-w-2xl text-lg leading-8 text-muted">
            {t(lang, "hero.sub")}
          </p>
          <form action="/search" method="get" className="hero-anim-cta mt-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface/70 px-4 py-3 shadow-lg shadow-black/5 backdrop-blur transition-colors focus-within:border-emerald-400/60">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-faint">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m12.5 12.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder={t(lang, "hero.search.ph")}
                className="w-full bg-transparent text-sm text-ink placeholder-faint outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
              >
                {t(lang, "nav.search")}
              </button>
            </div>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="hero-anim-cta rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
            >
              {t(lang, "hero.explore")}
            </Link>
            <Link
              href="/leaderboard"
              className="hero-anim-cta rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-muted"
            >
              {t(lang, "hero.leaderboard")}
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: courses.length, l: t(lang, "home.stats.courses") },
              { n: courses.reduce((s, c) => s + totalChapters(c), 0), l: t(lang, "home.stats.chapters") },
              { n: courses.reduce((s, c) => s + c.pages, 0), l: t(lang, "home.stats.pages") },
              { n: categories.length, l: t(lang, "home.stats.categories") },
            ].map((s) => (
              <div key={s.l} className="hero-anim-stat">
                <div className="text-2xl font-bold text-emerald-400">
                  <AnimatedCounter to={s.n} format={s.n > 999 ? "locale" : "plain"} />
                </div>
                <div className="mt-1 text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How money laundering works — animated explainer */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
          <h2 className="text-2xl font-bold tracking-tight">{t(lang, "concept.title")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{t(lang, "concept.sub")}</p>
          <div className="mt-6">
            <LaunderingFlow lang={lang} />
          </div>
        </ScrollReveal>
      </section>

      {/* Animated explainers */}
      <Explainers />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{t(lang, "home.categories")}</h2>
          <Link href="/courses" className="text-sm text-emerald-400 hover:text-emerald-300">
            {t(lang, "home.viewall")} →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "glossary" ? "/glossary" : `/courses`}
              className="rounded-2xl border border-line bg-surface/50 p-5 transition-all hover:border-emerald-400/40 hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">{cat.name}</h3>
                <span className="text-xs text-muted">{cat.count} entries</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{cat.description}</p>
            </Link>
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* Practice disciplines */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Practice disciplines</h2>
            <p className="mt-2 text-sm text-muted">
              Focused operating guides for the AML/KYC disciplines behind the courses.
            </p>
          </div>
          <Link href="/disciplines" className="text-sm text-emerald-400 hover:text-emerald-300">
            All disciplines →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((d) => (
            <Link
              key={d.slug}
              href={`/disciplines/${d.slug}`}
              className="rounded-2xl border border-line bg-surface/50 p-5 transition-all hover:border-emerald-400/40 hover:bg-surface"
            >
              <h3 className="font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted line-clamp-3">{d.overview}</p>
            </Link>
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* Interactive practice */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <ScrollReveal>
        <h2 className="text-2xl font-bold tracking-tight">Learn by doing</h2>
        <p className="mt-2 text-sm text-muted">
          Interactive tools, simulations and daily games — not just reading.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/job-simulation",
              title: "Job Simulation",
              sub: "Work a real analyst shift — triage alerts, run EDD, file SARs. Every decision scored.",
              tag: "Roleplay",
            },
            {
              href: "/tools",
              title: "Interactive Tools",
              sub: "CDD risk calculator, UBO threshold calculator and SAR deadline timer — run them in your browser.",
              tag: "Calculators",
            },
            {
              href: "/sandbox",
              title: "Alert Sandbox",
              sub: "Work mock KYC, UBO and SAR scenarios and get instant disposition feedback.",
              tag: "Simulation",
            },
            {
              href: "/arcade",
              title: "AML Arcade",
              sub: "Five daily brain games — typology sorting, AMLdle, timed recognition and more.",
              tag: "Daily games",
            },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-2xl border border-line bg-surface/50 p-5 transition-all hover:border-emerald-400/40 hover:bg-surface"
            >
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                {t.tag}
              </span>
              <h3 className="mt-2 font-semibold text-ink group-hover:text-emerald-300">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{t.sub}</p>
            </Link>
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* Featured courses */}
      <section className="border-y border-line/60 bg-surface/30">
        <ScrollReveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{t(lang, "home.courses")}</h2>
          <p className="mt-2 text-sm text-muted">
            {t(lang, "home.courses.sub")}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} liveReads={readCounts[c.slug]} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Training sessions */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <ScrollReveal>
        <Link
          href="/training"
          className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/10 to-transparent p-8 transition-colors hover:border-emerald-400/60 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {t(lang, "training.banner.title")}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {t(lang, "training.banner.sub")}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors group-hover:bg-emerald-300">
            {t(lang, "training.banner.cta")} →
          </span>
        </Link>
        </ScrollReveal>
      </section>

      {/* Enforcement cases banner */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
        <Link
          href="/cases"
          className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-400/30 bg-gradient-to-r from-red-400/10 to-transparent p-8 transition-colors hover:border-red-400/60 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {t(lang, "cases.banner.title")}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {t(lang, "cases.banner.sub")}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-red-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors group-hover:bg-red-300">
            {t(lang, "cases.banner.cta")} →
          </span>
        </Link>
        </ScrollReveal>
      </section>

      {/* Resume last lesson */}
      {resume && (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <Link
            href={`/training/${resume.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/10 to-transparent px-5 py-4 transition-colors hover:border-emerald-400/60"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5V3.5A1.5 1.5 0 0 1 4.5 2H13v9.5H4.5A1.5 1.5 0 0 0 3 13V8.5Z" />
                  <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H13" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Resume training
                </p>
                <p className="text-sm font-medium text-ink">{resume.title} — pick up where you left off</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-400 transition-transform group-hover:translate-x-1">
              Continue →
            </span>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
        <Link
          href="/interview-prep"
          className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/10 to-transparent p-8 transition-colors hover:border-emerald-400/60 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {t(lang, "interview.banner.title")}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {interviewSections.reduce((n, s) => n + s.items.length, 0)}{" "}
              {t(lang, "interview.banner.sub")}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors group-hover:bg-emerald-300">
            {t(lang, "interview.banner.cta")} →
          </span>
        </Link>
        </ScrollReveal>
      </section>

      {/* Leaderboard + featured reads */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ScrollReveal>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight">{t(lang, "home.mostreads")}</h2>
              <Link href="/leaderboard" className="text-sm text-emerald-400 hover:text-emerald-300">
                {t(lang, "home.fulleaderboard")} →
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {leaderboard.slice(0, 5).map((e) => (
                <Link
                  key={e.title}
                  href={`/courses/${e.courseSlug}`}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-emerald-400/40"
                >
                  <span className="w-8 text-center text-lg font-bold text-faint">
                    {e.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-medium text-ink">{e.title}</h3>
                      <span
                        className={`text-xs ${
                          e.trend === "up"
                            ? "text-emerald-400"
                            : e.trend === "down"
                              ? "text-red-400"
                              : "text-muted"
                        }`}
                      >
                        {e.trend === "up" ? "▲" : e.trend === "down" ? "▼" : "—"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {e.category} · {e.reads.toLocaleString()} reads · {e.mins} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">{t(lang, "home.featured")}</h2>
            <div className="mt-6 space-y-4">
              {featuredReads.map((r) => (
                <Link
                  key={r.title}
                  href={`/courses/${r.courseSlug}`}
                  className="block rounded-xl border border-line bg-surface/50 p-5 transition-colors hover:border-emerald-400/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-emerald-400">
                      {r.tag}
                    </span>
                    <span className="text-xs text-muted">{r.mins} min read</span>
                  </div>
                  <h3 className="mt-2 font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{r.blurb}</p>
                  <p className="mt-2 text-xs text-muted">{r.course} course</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
