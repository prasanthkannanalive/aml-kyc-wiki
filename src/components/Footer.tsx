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
  "virtual-asset-compliance": "/courses/virtual-asset-compliance",
  "trade-based-laundering": "/courses/trade-based-laundering",
  glossary: "/glossary",
};

const GROUPS: { key: string; links: [string, string][] }[] = [
  {
    key: "footer.learn",
    links: [
      ["nav.courses", "/courses"],
      ["nav.training", "/training"],
      ["nav.disciplines", "/disciplines"],
      ["nav.library", "/library"],
      ["nav.resources", "/resources"],
      ["nav.stack", "/stack"],
      ["nav.glossary", "/glossary"],
    ],
  },
  {
    key: "footer.practice",
    links: [
      ["nav.sandbox", "/sandbox"],
      ["nav.exams", "/exams"],
      ["nav.review", "/review"],
      ["nav.tools", "/tools"],
      ["nav.simulation", "/job-simulation"],
      ["nav.arcade", "/arcade"],
      ["nav.cases", "/cases"],
      ["nav.interview", "/interview-prep"],
    ],
  },
  {
    key: "footer.community",
    links: [
      ["nav.careers", "/careers"],
      ["nav.leaderboard", "/leaderboard"],
      ["nav.regulators", "/regulators"],
      ["nav.news", "/news"],
      ["nav.research", "/research"],
      ["nav.about", "/about"],
    ],
  },
];

const DISCIPLINES_GROUP = "footer.disciplines";

export default async function Footer() {
  const lang = await getLang();
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-6">
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
        {GROUPS.map((g) => (
          <div key={g.key}>
            <h3 className="text-sm font-semibold text-ink">{t(lang, g.key)}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {g.links.map(([lk, href]) => (
                <li key={href}>
                  <Link className="hover:text-ink" href={href}>
                    {t(lang, lk)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-semibold text-ink">{t(lang, DISCIPLINES_GROUP)}</h3>
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
        <div className="mb-2 flex justify-center gap-4">
          <Link href="/pricing" className="hover:text-muted">Pricing</Link>
          <Link href="/contact" className="hover:text-muted">Contact</Link>
          <Link href="/privacy" className="hover:text-muted">Privacy</Link>
          <Link href="/terms" className="hover:text-muted">Terms</Link>
        </div>
        {t(lang, "footer.note")}
        {lang !== "en" && (
          <span className="mt-1 block">{t(lang, "footer.langnote")}</span>
        )}
      </div>
    </footer>
  );
}
