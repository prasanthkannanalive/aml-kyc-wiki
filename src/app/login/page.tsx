import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-20">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10">
        <svg width="26" height="26" viewBox="0 0 16 16" fill="none" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2.5 13 4.5v3.5c0 2.8-2 4.9-5 6-3-1.1-5-3.2-5-6V4.5L8 2.5Z" />
          <path d="m5.5 8 1.7 1.7L10.5 6.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">
        Sign in to track your reading progress across the knowledge base.
      </p>
      <div className="mt-8">
        <AuthForm
          mode="login"
          googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          logtoEnabled={!!(process.env.LOGTO_ENDPOINT && process.env.LOGTO_APP_ID)}
        />
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        No account?{" "}
        <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">
          Create one
        </Link>
      </p>
    </div>
  );
}
