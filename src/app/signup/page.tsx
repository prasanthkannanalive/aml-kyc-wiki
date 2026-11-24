import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-20">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
        <svg width="26" height="26" viewBox="0 0 16 16" fill="none" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6.5" cy="5.5" r="2.5" />
          <path d="M2.5 13.5c.8-2.6 2.2-4 4-4s3.2 1.4 4 4" />
          <path d="M11 6.5v4M13 8.5h-4" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted">
        Track chapters you read and build your compliance knowledge profile.
      </p>
      <div className="mt-8">
        <AuthForm mode="signup" googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        Already registered?{" "}
        <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}
