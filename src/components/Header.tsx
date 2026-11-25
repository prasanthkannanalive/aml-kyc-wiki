import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import AuthNav from "@/components/AuthNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import NavMenu, { type NavGroup } from "@/components/NavMenu";
import { getLang, t } from "@/lib/i18n";

export default async function Header() {
  const lang = await getLang();
  const L = (k: string) => t(lang, k);

  const groups: NavGroup[] = [
    {
      label: L("nav.learn"),
      items: [
        { href: "/courses", label: L("nav.courses") },
        { href: "/paths", label: L("nav.paths") },
        { href: "/training", label: L("nav.training") },
        { href: "/disciplines", label: L("nav.disciplines") },
        { href: "/library", label: L("nav.library") },
      ],
    },
    {
      label: L("nav.practice"),
      items: [
        { href: "/playground", label: L("nav.playground") },
        { href: "/sandbox", label: L("nav.sandbox") },
        { href: "/exams", label: L("nav.exams") },
        { href: "/review", label: L("nav.review") },
        { href: "/labs", label: "Data Lab" },
        { href: "/tools", label: L("nav.tools") },
        { href: "/job-simulation", label: L("nav.simulation") },
        { href: "/arcade", label: L("nav.arcade") },
      ],
    },
    {
      label: L("nav.explore"),
      items: [
        { href: "/cases", label: L("nav.cases") },
        { href: "/regulators", label: L("nav.regulators") },
        { href: "/stack", label: L("nav.stack") },
        { href: "/interview-prep", label: L("nav.interview") },
        { href: "/careers", label: L("nav.careers") },
        { href: "/resources", label: L("nav.resources") },
        { href: "/leaderboard", label: L("nav.leaderboard") },
        { href: "/teams", label: "Teams" },
        { href: "/news", label: L("nav.news") },
        { href: "/research", label: L("nav.research") },
        { href: "/glossary", label: L("nav.glossary") },
        { href: "/about", label: L("nav.about") },
        { href: "/pricing", label: "Pricing" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="text-lg font-semibold tracking-tight">
            AML<span className="text-emerald-400">/</span>KYC Wiki
          </span>
        </Link>

        <form action="/search" method="get" className="hidden flex-1 max-w-xs md:block">
          <input
            type="search"
            name="q"
            placeholder={`${L("nav.search")}…`}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400"
          />
        </form>

        <div className="flex items-center gap-3">
          <NavMenu groups={groups} />
          <LanguageSwitcher lang={lang} />
          <ThemeToggle />
          <MobileNav groups={groups} searchLabel={L("nav.search")} menuLabel={L("nav.menu")} />
          <AuthNav />
          <Link
            href="/courses"
            className="hidden rounded-lg bg-emerald-400 px-3.5 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300 lg:block"
          >
            {L("nav.browse")}
          </Link>
        </div>
      </div>
    </header>
  );
}
