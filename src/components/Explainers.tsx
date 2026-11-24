import Link from "next/link";
import LottiePlayer from "@/components/LottiePlayer";
import UboGraph from "@/components/explainers/UboGraph";
import TmFlow from "@/components/explainers/TmFlow";
import ScrollReveal from "@/components/fx/ScrollReveal";
import { getLang, t } from "@/lib/i18n";

const EXPLAINERS = [
  {
    key: "money",
    src: "/animations/custom-flow.json",
    href: "/courses/counter-terrorist-financing/chapters/1.1",
  },
  {
    key: "sanctions",
    src: "/animations/custom-shield.json",
    href: "/courses/sanctions-screening/chapters/6.1",
  },
  {
    key: "kyc",
    src: "/animations/custom-kyc.json",
    href: "/courses/financial-intelligence-trafficking/chapters/3.2",
  },
  {
    key: "fraud",
    src: "/animations/custom-alert.json",
    href: "/courses/fraud-prevention/chapters/6.1",
  },
  {
    key: "ubo",
    viz: "ubo" as const,
    href: "/courses/kyc-cdd-tm-analyst/chapters/3.5",
  },
  {
    key: "tm",
    viz: "tm" as const,
    href: "/courses/kyc-cdd-tm-analyst/chapters/4.1",
  },
] as const;

export default async function Explainers() {
  const lang = await getLang();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <ScrollReveal>
        <h2 className="text-2xl font-bold tracking-tight">
          {t(lang, "explainer.title")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {t(lang, "explainer.sub")}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLAINERS.map((e) => (
            <Link
              key={e.key}
              href={e.href}
              className="group flex flex-col rounded-2xl border border-line bg-surface/50 p-5 transition-all hover:border-emerald-400/40 hover:bg-surface"
            >
              <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl bg-background/60">
                {"viz" in e && e.viz === "ubo" ? (
                  <UboGraph />
                ) : "viz" in e && e.viz === "tm" ? (
                  <TmFlow />
                ) : (
                  <LottiePlayer src={"src" in e ? e.src : ""} className="h-32 w-32" />
                )}
              </div>
              <h3 className="mt-4 font-semibold text-ink">
                {t(lang, `explainer.${e.key}.title`)}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-muted">
                {t(lang, `explainer.${e.key}.desc`)}
              </p>
              <span className="mt-3 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                {t(lang, "explainer.learn")} →
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
