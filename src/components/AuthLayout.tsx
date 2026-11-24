import Link from "next/link";
import Logo from "@/components/Logo";
import AuthForm from "@/components/AuthForm";

// Shared auth shell — one card for both /login and /signup with a mode tab.

export default function AuthLayout({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const tab = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`rounded-lg py-2 text-center text-sm font-medium transition-colors ${
        active ? "bg-emerald-400 text-zinc-950 shadow" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14 sm:py-20">
      <div className="rounded-3xl border border-line bg-surface/70 p-7 shadow-2xl shadow-black/20 backdrop-blur sm:p-9">
        <div className="flex flex-col items-center text-center">
          <Logo size={52} />
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isLogin
              ? "Sign in to track your reading progress across the knowledge base."
              : "Track chapters you read and build your compliance knowledge profile."}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-line bg-background/60 p-1">
          {tab("/login", "Sign in", isLogin)}
          {tab("/signup", "Create account", !isLogin)}
        </div>

        <div className="mt-6">
          <AuthForm
            mode={mode}
            googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            logtoEnabled={!!(process.env.LOGTO_ENDPOINT && process.env.LOGTO_APP_ID)}
          />
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] leading-5 text-faint">
        By continuing you agree to our{" "}
        <Link href="/terms" className="underline hover:text-muted">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-muted">Privacy Policy</Link>.
        Your progress syncs to your account across devices.
      </p>
    </div>
  );
}
