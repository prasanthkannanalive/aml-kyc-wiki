import type { Metadata } from "next";
import Link from "next/link";
import ViewTracker from "@/components/ViewTracker";
import ProCheckout from "@/components/ProCheckout";

export const metadata: Metadata = {
  title: "Pricing — AML/KYC Wiki",
  description:
    "Free tier plus Pro and Team plans for AML/KYC courses, simulations, tools and the compliance stack landscape.",
};
export const dynamic = "force-dynamic";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Everything you need to explore the knowledge base",
    cta: { label: "Start free", href: "/signup" },
    features: [
      "All 7 certification courses & 200+ chapters",
      "Animated scenario cards on every chapter",
      "Module quizzes & knowledge checks",
      "Leaderboard, glossary, news & research",
      "Compliance stack landscape & regulators directory",
      "Community support via contact page",
    ],
    missing: ["Job simulation scored shifts", "Alert sandbox scenarios", "Final exams & course badges", "Priority support"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month · $96/year (save 33%)",
    tagline: "For analysts preparing for roles & certifications",
    cta: { label: "Get Pro — pay with Airtm", href: "#get-pro" },
    features: [
      "Everything in Free",
      "Job simulation — scored analyst shifts",
      "Alert sandbox with disposition feedback",
      "Final exams & verifiable course badges",
      "SAR/STR deadline timer & all interactive tools",
      "Priority email support",
    ],
    missing: [],
    highlight: true,
  },
  {
    name: "Team",
    price: "Custom",
    period: "per seat · annual",
    tagline: "For compliance teams & training departments",
    cta: { label: "Talk to us", href: "/contact" },
    features: [
      "Everything in Pro",
      "Team seats with shared progress dashboard",
      "Custom onboarding tracks per role",
      "SSO / SAML and admin controls",
      "Invoice billing & PO support",
      "Dedicated onboarding call",
    ],
    missing: [],
    highlight: false,
  },
];

const FAQ = [
  {
    q: "How do I pay for Pro?",
    a: "Crypto via Airtm — hit 'Pay with Airtm' below, send $12 (monthly) or $96 (yearly), and include your account email as the note. We activate Pro and send a one-time redeem code within 24 hours. Card payments via Stripe are on the roadmap.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — subscriptions auto-renew monthly or annually and can be cancelled from your account page at any time. Access continues until the end of the paid period.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 7-day money-back guarantee on first-time Pro subscriptions. Team plans are invoiced and refundable pro-rata within 14 days of purchase.",
  },
  {
    q: "Do course badges count as certifications?",
    a: "No — badges are knowledge-base credentials showing you completed the material. They are not accredited qualifications. See our Terms.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Learn free, practice paid. Every course chapter, quiz and the full
          compliance stack landscape stay free — Pro unlocks the simulations,
          exams and tools that mirror real analyst work.
        </p>
      </div>
      <ViewTracker type="search" id="pricing" />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              t.highlight
                ? "border-emerald-400/50 bg-emerald-400/5 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]"
                : "border-line bg-surface/60"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-0.5 text-[11px] font-bold text-zinc-950">
                MOST POPULAR
              </span>
            )}
            <h2 className="text-lg font-bold text-ink">{t.name}</h2>
            <p className="mt-0.5 text-xs text-muted">{t.tagline}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-ink">{t.price}</span>
              <span className="ml-1 text-sm text-muted">{t.period}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-body">
                  <span className="mt-0.5 text-emerald-400">✓</span> {f}
                </li>
              ))}
              {t.missing.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-faint">
                  <span className="mt-0.5 text-zinc-600">—</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.cta.href}
              className={`mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${
                t.highlight
                  ? "bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
                  : "border border-line text-ink hover:border-emerald-400/40"
              }`}
            >
              {t.cta.label}
            </Link>
          </div>
        ))}
      </div>

      <ProCheckout />

      <p className="mt-6 text-center text-xs text-faint">
        Crypto payments via Airtm · card checkout (Stripe) coming soon · cancel anytime · prices in USD · see{" "}
        <Link href="/terms" className="text-emerald-400 hover:underline">Terms</Link> &{" "}
        <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy</Link>
      </p>

      <section className="mx-auto mt-14 max-w-2xl">
        <h2 className="text-lg font-semibold text-ink">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line bg-surface/50 p-4">
              <summary className="cursor-pointer text-sm font-medium text-ink marker:text-emerald-400">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
