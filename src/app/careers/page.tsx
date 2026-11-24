import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { getProgress } from "@/lib/db";
import { courses } from "@/lib/content";
import { listChapters } from "@/lib/chapters";
import { careerRoles, certifications } from "@/lib/careers";
import CareerReadiness from "@/components/CareerReadiness";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "AML/KYC Careers — Roles, Requirements & Certifications",
  description:
    "The AML/KYC compliance career ladder — entry analyst to MLRO/CCO: responsibilities, requirements, certifications and a personal readiness tracker.",
};
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const user = await getSessionUser();
  const progress = user ? await getProgress(user.id) : {};
  const readKeys = Object.keys(progress);

  const perCourse = courses.map((c) => {
    const nums = new Set(listChapters(c.slug).map((ch) => ch.num));
    const read = readKeys.filter((k) => {
      const [type, rest] = k.split(":");
      if (type !== "chapter") return false;
      const [s, n] = rest.split("/");
      return s === c.slug && nums.has(n);
    }).length;
    const done = readKeys.filter((k) => {
      const [type, rest] = k.split(":");
      if (type !== "done") return false;
      const [s, n] = rest.split("/");
      return s === c.slug && nums.has(n);
    }).length;
    return { slug: c.slug, title: c.title, read, done, total: nums.size };
  });

  const levels: { key: CareerLevelKey; title: string; blurb: string }[] = [
    { key: "Entry", title: "Entry level — 0–2 years", blurb: "Learn the queue. Master CDD, alert triage and filing basics." },
    { key: "Mid", title: "Mid level — 2–5 years", blurb: "Own investigations. SAR/STR quality, EDD, second-line QA." },
    { key: "Senior", title: "Senior & leadership — 5+ years", blurb: "Statutory accountability, program design, regulator interface." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">AML/KYC Careers</h1>
      <p className="mt-3 max-w-3xl text-muted">
        The compliance career ladder — from first alert queue to MLRO. What each
        role does, what employers actually ask for, and which certifications
        carry weight. Your readiness score below is computed from your real
        progress on this site.
      </p>
      <ViewTracker type="search" id="careers" />

      <div className="mt-8">
        <CareerReadiness perCourse={perCourse} loggedIn={!!user} />
      </div>

      {/* ladder */}
      {levels.map((lv) => {
        const roles = careerRoles.filter((r) => r.level === lv.key);
        return (
          <section key={lv.key} className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight">{lv.title}</h2>
            <p className="mt-1 text-sm text-muted">{lv.blurb}</p>
            <div className="mt-6 space-y-5">
              {roles.map((r) => (
                <article key={r.slug} className="rounded-2xl border border-line bg-surface/60 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-emerald-400">{r.aliases}</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                      {r.level}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-3">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Day to day</h4>
                      <ul className="mt-2 space-y-1.5">
                        {r.responsibilities.map((x) => (
                          <li key={x} className="flex gap-2 text-sm leading-6 text-body">
                            <span className="text-emerald-400">▸</span>{x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">To get hired</h4>
                      <ul className="mt-2 space-y-1.5">
                        {r.requirements.map((x) => (
                          <li key={x} className="flex gap-2 text-sm leading-6 text-body">
                            <span className="text-sky-400">▸</span>{x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Certifications that help</h4>
                      <ul className="mt-2 space-y-1.5">
                        {r.certifications.map((x) => (
                          <li key={x} className="flex gap-2 text-sm leading-6 text-body">
                            <span className="text-violet-400">▸</span>{x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* certifications */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Certification guide</h2>
        <p className="mt-1 text-sm text-muted">
          Honest weighting — CAMS and ICA dominate; everything else is situational.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-medium">Certification</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">Issuer</th>
                <th className="px-5 py-3.5 font-medium">Why it helps</th>
                <th className="px-5 py-3.5 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {certifications.map((c) => (
                <tr key={c.cert} className="transition-colors hover:bg-surface-2/50">
                  <td className="px-5 py-4 font-medium text-ink">{c.cert}</td>
                  <td className="hidden px-5 py-4 text-muted md:table-cell">{c.issuer}</td>
                  <td className="px-5 py-4 text-body">{c.value}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] text-muted">{c.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 text-center">
        <h2 className="text-xl font-bold text-ink">Ready to practice?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          The certification course, sandbox scenarios and job simulations on this
          site map directly to the skills these roles test.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/courses/kyc-cdd-tm-analyst" className="rounded-xl bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 hover:scale-[1.02] transition-transform">
            Start the certification course
          </Link>
          <Link href="/job-simulation" className="rounded-xl border border-line px-5 py-2 text-sm font-medium text-ink hover:border-emerald-400/50">
            Try a job simulation
          </Link>
          <Link href="/interview-prep" className="rounded-xl border border-line px-5 py-2 text-sm font-medium text-ink hover:border-emerald-400/50">
            Interview prep
          </Link>
        </div>
      </section>
    </div>
  );
}

type CareerLevelKey = "Entry" | "Mid" | "Senior";
