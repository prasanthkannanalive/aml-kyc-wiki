import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the AML/KYC Wiki knowledge base and certification study guides.",
};

const UPDATED = "November 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-faint">Last updated: {UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-7 text-body">
        <section>
          <h2 className="text-lg font-semibold text-ink">Educational purpose</h2>
          <p>
            AML/KYC Wiki is an educational knowledge base. All content —
            including course chapters, case studies, sandbox scenarios and
            interview questions — is for learning purposes only. It is{" "}
            <strong className="text-ink">not legal, regulatory or professional
            advice</strong>. Always verify requirements against the issuing
            regulator&apos;s current publications and consult qualified counsel
            for your obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">No accreditation</h2>
          <p>
            Course-completion badges issued by the final assessments are
            knowledge-base credentials only. They are not accreditations,
            certifications or qualifications recognised by any regulator,
            employer or professional body.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Acceptable use</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Do not scrape, bulk-download or republish the content.</li>
            <li>Do not use the site to provide regulated AML/KYC services — it is a learning resource, not a compliance tool.</li>
            <li>Do not attempt to access other users&apos; accounts or data.</li>
            <li>Do not submit unlawful, harmful or misleading content.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Intellectual property</h2>
          <p>
            Original text, design and code on this site are the property of the
            operator. Quoted or summarised regulatory material remains the
            property of its publishers; third-party documents are linked to
            their sources rather than redistributed. You may link to pages and
            quote brief excerpts with attribution.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Accounts</h2>
          <p>
            You are responsible for your account credentials and activity.
            Provide accurate registration information. We may suspend accounts
            that abuse the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Subscription &amp; billing</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Plans.</strong> Paid plans (Pro,
              Team) are billed in advance on a monthly or annual cycle and
              renew automatically until cancelled.
            </li>
            <li>
              <strong className="text-ink">Cancellation.</strong> You may
              cancel at any time from your account page; access continues
              until the end of the current paid period. No partial-period
              refunds except as stated below.
            </li>
            <li>
              <strong className="text-ink">Refunds.</strong> First-time Pro
              subscriptions carry a 7-day money-back guarantee. Team plans
              invoiced annually are refundable pro-rata within 14 days of
              purchase. Renewals are non-refundable once the billing period
              has started.
            </li>
            <li>
              <strong className="text-ink">Price changes.</strong> If prices
              change, we will notify you at least 30 days before the new price
              applies to your renewal. You may cancel before renewal to avoid
              the new price.
            </li>
            <li>
              <strong className="text-ink">Non-payment.</strong> If a payment
              fails, we will retry and notify you; accounts may be downgraded
              to the free tier or suspended if billing remains unresolved.
            </li>
            <li>
              <strong className="text-ink">Taxes.</strong> Prices exclude
              applicable taxes unless stated; VAT/GST may be added based on
              your billing location.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Availability & liability</h2>
          <p>
            The site is provided &quot;as is&quot; without warranties of any
            kind. To the maximum extent permitted by law, the operator is not
            liable for indirect or consequential damages arising from use of
            the content — including reliance on it for compliance decisions.
            Regulatory rules change; always confirm against primary sources.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes</h2>
          <p>
            We may update these terms; the date above reflects the latest
            revision. Continued use after changes constitutes acceptance.
          </p>
        </section>
      </div>
    </div>
  );
}
