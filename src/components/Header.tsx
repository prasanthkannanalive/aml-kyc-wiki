import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import AuthNav from "@/components/AuthNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { getLang, t } from "@/lib/i18n";

export default async function Header() {
  const lang = await getLang();
  const links = [
    { href: "/courses", label: t(lang, "nav.courses") },
    { href: "/training", label: t(lang, "nav.training") },
    { href: "/disciplines", label: t(lang, "nav.disciplines") },
    { href: "/sandbox", label: t(lang, "nav.sandbox") },
    { href: "/tools", label: t(lang, "nav.tools") },
    { href: "/job-simulation", label: t(lang, "nav.simulation") },
    { href: "/careers", label: t(lang, "nav.careers") },
    { href: "/cases", label: t(lang, "nav.cases") },
    { href: "/interview-prep", label: t(lang, "nav.interview") },
    { href: "/resources", label: t(lang, "nav.resources") },
    { href: "/library", label: t(lang, "nav.library") },
    { href: "/arcade", label: t(lang, "nav.arcade") },
    { href: "/leaderboard", label: t(lang, "nav.leaderboard") },
    { href: "/news", label: t(lang, "nav.news") },
    { href: "/research", label: t(lang, "nav.research") },
    { href: "/glossary", label: t(lang, "nav.glossary") },
    { href: "/about", label: t(lang, "nav.about") },
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
            placeholder={`${t(lang, "nav.search")}…`}
            className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400"
          />
        </form>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-4 text-sm text-muted xl:flex">
            {links.slice(0, 9).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher lang={lang} />
          <ThemeToggle />
          <MobileNav links={links} searchLabel={t(lang, "nav.search")} menuLabel={t(lang, "nav.menu")} />
          <AuthNav />
          <Link
            href="/courses"
            className="hidden rounded-lg bg-emerald-400 px-3.5 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300 lg:block"
          >
            {t(lang, "nav.browse")}
          </Link>
        </div>
      </div>
    </header>
  );
}
