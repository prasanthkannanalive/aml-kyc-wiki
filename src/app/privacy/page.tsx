import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AML/KYC Wiki collects, uses and protects your data — accounts, progress tracking and cookies.",
};

const UPDATED = "November 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-faint">Last updated: {UPDATED}</p>

      <div className="mt-8 space-y-8 text-sm leading-7 text-body">
        <section>
          <h2 className="text-lg font-semibold text-ink">What we collect</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Account data</strong> — if you sign
              up: your email address, display name, and a hashed password
              (we never store plaintext passwords).
            </li>
            <li>
              <strong className="text-ink">Progress data</strong> — chapters
              viewed, lessons completed, quiz and exam results, tied to your
              account so you can resume learning.
            </li>
            <li>
              <strong className="text-ink">Usage analytics</strong> — anonymous
              counters of page and chapter views used to rank popular content.
            </li>
            <li>
              <strong className="text-ink">Local storage</strong> — your
              language preference, arcade progress and exam badges are stored
              in your browser only.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What we don&apos;t collect</h2>
          <p>
            We do not collect payment details (the site is free), government
            ID, or any customer due-diligence data. The sandbox and case
            studies use fictional scenarios only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How we use it</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>To provide accounts, progress tracking and resume features.</li>
            <li>To rank content on the leaderboard and improve the material.</li>
            <li>To keep the service secure (rate-limiting abuse, session integrity).</li>
          </ul>
          <p className="mt-3">
            We do not sell your data, share it with advertisers, or use it for
            profiling. Anonymous view counters cannot be tied back to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Cookies</h2>
          <p>
            We use one essential cookie — a signed session token that keeps you
            logged in (30 days, httpOnly). No advertising or third-party
            tracking cookies are set. Language preference uses browser local
            storage, not cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Data storage & security</h2>
          <p>
            Account and progress data is stored in a managed Redis database
            operated by our hosting provider (Vercel/Upstash) with encryption
            in transit and at rest. Passwords are salted and hashed with
            scrypt. Session tokens are HMAC-signed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Your rights</h2>
          <p>
            You can delete your account at any time from your{" "}
            <Link href="/profile" className="text-emerald-400 hover:underline">
              profile page
            </Link>{" "}
            — this removes your email, progress and session data. For data
            access or deletion requests, contact the site operator.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Third-party links</h2>
          <p>
            The document library and course sources link to external
            regulators and publishers (FATF, FinCEN, Wolfsberg, FFIEC, etc.).
            Their privacy practices are governed by their own policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Changes</h2>
          <p>
            We may update this policy; material changes will be noted on this
            page with a new date. Continued use after changes constitutes
            acceptance.
          </p>
        </section>
      </div>
    </div>
  );
}
