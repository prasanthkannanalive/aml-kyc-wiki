import Link from "next/link";
import { getLang, t } from "@/lib/i18n";
import Logo from "@/components/Logo";
import { categories } from "@/lib/content";

const CAT_HREF: Record<string, string> = {
  "fraud-prevention": "/courses/fraud-prevention",
  "sanctions-screening": "/courses/sanctions-screening",
  "counter-terrorist-financing": "/courses/counter-terrorist-financing",
  "financial-intelligence": "/courses/financial-intelligence-trafficking",
  "regulatory-frameworks": "/courses",
  glossary: "/glossary",
};

export default async function Footer() {
  const lang = await getLang();
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-lg font-semibold">
              AML<span className="text-emerald-400">/</span>KYC Wiki
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            {t(lang, "footer.tagline")}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">{t(lang, "footer.explore")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" href="/courses">{t(lang, "nav.courses")}</Link></li>
            <li><Link className="hover:text-ink" href="/training">{t(lang, "nav.training")}</Link></li>
            <li><Link className="hover:text-ink" href="/disciplines">{t(lang, "nav.disciplines")}</Link></li>
            <li><Link className="hover:text-ink" href="/sandbox">{t(lang, "nav.sandbox")}</Link></li>
            <li><Link className="hover:text-ink" href="/resources">{t(lang, "nav.resources")}</Link></li>
            <li><Link className="hover:text-ink" href="/library">{t(lang, "nav.library")}</Link></li>
            <li><Link className="hover:text-ink" href="/arcade">{t(lang, "nav.arcade")}</Link></li>
            <li><Link className="hover:text-ink" href="/cases">{t(lang, "nav.cases")}</Link></li>
            <li><Link className="hover:text-ink" href="/interview-prep">{t(lang, "nav.interview")}</Link></li>
            <li><Link className="hover:text-ink" href="/leaderboard">{t(lang, "nav.leaderboard")}</Link></li>
            <li><Link className="hover:text-ink" href="/glossary">{t(lang, "nav.glossary")}</Link></li>
            <li><Link className="hover:text-ink" href="/news">{t(lang, "nav.news")}</Link></li>
            <li><Link className="hover:text-ink" href="/research">{t(lang, "nav.research")}</Link></li>
            <li><Link className="hover:text-ink" href="/about">{t(lang, "nav.about")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink">{t(lang, "footer.disciplines")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link className="hover:text-ink" href={CAT_HREF[c.slug] ?? "/courses"}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line/80 py-6 text-center text-xs text-faint">
        {t(lang, "footer.note")}
        {lang !== "en" && (
          <span className="mt-1 block">{t(lang, "footer.langnote")}</span>
        )}
      </div>
    </footer>
  );
}
