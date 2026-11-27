import type { Metadata } from "next";
import Link from "next/link";
import { FI_TYPES, EXAM_REGIMES, COUNTRY_AML, BANKING_FACTS } from "@/lib/banking";

export const metadata: Metadata = {
  title: "Banking Systems & Examination Regimes — Worldwide AML/KYC",
  description:
    "How the world's financial system actually works under AML/KYC — institution types, correspondent banking, internal vs external examinations, and the regulator/FIU/supervisor stack for the main jurisdictions.",
};

export default function BankingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Systems reference
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Banking systems &amp; examination regimes
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        The plumbing under every AML/KYC role — who the institutions are, how
        examinations actually work, and which regulator, FIU and filing regime
        applies in each major jurisdiction.
      </p>

      {/* core facts */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BANKING_FACTS.map((f) => (
          <div key={f.k} className="rounded-xl border border-line bg-surface/50 p-4">
            <p className="text-sm font-bold text-ink">{f.k}</p>
            <p className="mt-1.5 text-xs leading-5 text-muted">{f.v}</p>
          </div>
        ))}
      </div>

      {/* FI types */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Types of institutions</h2>
        <p className="mt-1 text-sm text-muted">Each carries a different AML risk profile.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FI_TYPES.map((fi) => (
            <div key={fi.name} className="rounded-xl border border-line bg-surface/50 p-4">
              <h3 className="text-sm font-bold text-ink">{fi.name}</h3>
              <p className="mt-1 text-xs text-muted">{fi.what}</p>
              <p className="mt-2 border-t border-line/60 pt-2 text-[11px] leading-4 text-body">
                <span className="font-semibold text-emerald-300">AML angle: </span>
                {fi.amlAngle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* exam regimes */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Internal vs external examinations</h2>
        <p className="mt-1 text-sm text-muted">
          Internal audit tests the program year-round; external exams are the
          regulator&apos;s independent assessment — the ones that decide
          enforcement.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-medium">Jurisdiction</th>
                <th className="px-5 py-3.5 font-medium">Internal layer</th>
                <th className="px-5 py-3.5 font-medium">External exam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {EXAM_REGIMES.map((e) => (
                <tr key={e.jurisdiction} className="transition-colors hover:bg-surface-2/50">
                  <td className="px-5 py-4 font-semibold text-ink">{e.jurisdiction}</td>
                  <td className="px-5 py-4 text-body">{e.internal}</td>
                  <td className="px-5 py-4 text-muted">{e.external}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">
          US examiners work from the{" "}
          <Link href="/library" className="text-emerald-400 hover:underline">
            FFIEC BSA/AML Examination Manual
          </Link>{" "}
          — the actual document they test against.
        </p>
      </section>

      {/* country AML stack */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Jurisdiction quick reference</h2>
        <p className="mt-1 text-sm text-muted">
          Law · FIU · supervisor · filing rule — the four things an analyst
          needs before touching a cross-border case.{" "}
          <Link href="/regulators" className="text-emerald-400 hover:underline">
            Full regulator directory →
          </Link>
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2/60 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3.5 font-medium">Country</th>
                <th className="px-5 py-3.5 font-medium">Core law</th>
                <th className="px-5 py-3.5 font-medium">FIU</th>
                <th className="px-5 py-3.5 font-medium">Supervisor</th>
                <th className="px-5 py-3.5 font-medium">Filing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {COUNTRY_AML.map((c) => (
                <tr key={c.country} className="transition-colors hover:bg-surface-2/50">
                  <td className="px-5 py-4 font-semibold text-ink">{c.country}</td>
                  <td className="px-5 py-4 text-body">{c.law}</td>
                  <td className="px-5 py-4 text-muted">{c.fiu}</td>
                  <td className="px-5 py-4 text-muted">{c.supervisor}</td>
                  <td className="px-5 py-4 text-muted">{c.filing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
