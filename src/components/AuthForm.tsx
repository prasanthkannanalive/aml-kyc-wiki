"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const ICONS = {
  user: (
    <path d="M8 8a2.6 2.6 0 1 0 0-5.2A2.6 2.6 0 0 0 8 8Zm-5.2 7.2c.9-2.7 2.7-4 5.2-4s4.3 1.3 5.2 4" />
  ),
  mail: (
    <>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="m2.8 4.5 5.2 4 5.2-4" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </>
  ),
  eye: (
    <>
      <path d="M1.5 8s2.2-3.5 6.5-3.5S14.5 8 14.5 8s-2.2 3.5-6.5 3.5S1.5 8 1.5 8Z" />
      <circle cx="8" cy="8" r="1.8" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M1.5 8s2.2-3.5 6.5-3.5c1.4 0 2.6.4 3.6 1M14.5 8s-2.2 3.5-6.5 3.5c-1.4 0-2.6-.4-3.6-1" />
      <path d="m3 13 10-10" />
    </>
  ),
  arrow: <path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5" />,
};

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
    >
      {children}
    </svg>
  );
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: { client_id: string; callback: (r: { credential: string }) => void }) => void;
          renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
        };
      };
    };
  }
}

// push localStorage achievement signals to the account after sign-in
function syncGuestProgress() {
  try {
    const exam = localStorage.getItem("aml-kyc-final-exam:kyc-cdd-tm-analyst") === "passed";
    const sims: Record<string, number> = {};
    try {
      const raw = localStorage.getItem("aml-sim-v1");
      if (raw) {
        const d = (JSON.parse(raw) as { done?: Record<string, number> }).done ?? {};
        Object.assign(sims, d);
      }
    } catch {}
    let arcade: { streak: number; games: number } | undefined;
    try {
      const raw = localStorage.getItem("aml-arcade-v1");
      if (raw) {
        const a = JSON.parse(raw) as { done?: Record<string, number>; streak?: number };
        arcade = { streak: a.streak ?? 0, games: Object.keys(a.done ?? {}).length };
      }
    } catch {}
    if (!exam && !Object.keys(sims).length && !arcade) return;
    fetch("/api/auth/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam, sims, arcade }),
    }).catch(() => {});
  } catch {}
}

export default function AuthForm({
  mode,
  googleClientId,
}: {
  mode: "login" | "signup";
  googleClientId?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleErr, setGoogleErr] = useState("");
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!googleClientId || !googleBtnRef.current || typeof window === "undefined") return;
    const render = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (resp) => {
          setGoogleErr("");
          setLoading(true);
          try {
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: resp.credential }),
            });
            if (!res.ok) {
              const d = await res.json().catch(() => ({}));
              setGoogleErr(d.error ?? "Google sign-in failed.");
              return;
            }
            syncGuestProgress();
            router.push("/profile");
            router.refresh();
          } finally {
            setLoading(false);
          }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        width: googleBtnRef.current.offsetWidth || 320,
        text: mode === "login" ? "signin_with" : "signup_with",
      });
    };
    if (window.google) {
      render();
    } else {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
  }, [googleClientId, mode, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      syncGuestProgress();
      router.push("/profile");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-4 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400";

  return (
    <form onSubmit={submit} className="space-y-4">
      {googleClientId && (
        <>
          <div ref={googleBtnRef} className="flex min-h-[44px] justify-center" />
          {googleErr && <p className="text-center text-sm text-red-400">{googleErr}</p>}
          <div className="flex items-center gap-3 text-xs text-faint">
            <span className="h-px flex-1 bg-line" />
            or continue with email
            <span className="h-px flex-1 bg-line" />
          </div>
        </>
      )}
      {mode === "signup" && (
        <div>
          <label className="mb-1.5 block text-sm text-muted">Display name</label>
          <div className="relative">
            <FieldIcon>{ICONS.user}</FieldIcon>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className={inputCls}
            />
          </div>
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-sm text-muted">Email</label>
        <div className="relative">
          <FieldIcon>{ICONS.mail}</FieldIcon>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-muted">Password</label>
        <div className="relative">
          <FieldIcon>{ICONS.lock}</FieldIcon>
          <input
            type={showPw ? "text" : "password"}
            required
            minLength={mode === "signup" ? 8 : 1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"}
            className={`${inputCls} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-muted"
          >
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {showPw ? ICONS.eyeOff : ICONS.eye}
            </svg>
          </button>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-50"
      >
        {loading ? (
          "Please wait…"
        ) : (
          <>
            {mode === "login" ? "Sign in" : "Create account"}
            <motion.svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {ICONS.arrow}
            </motion.svg>
          </>
        )}
      </motion.button>
    </form>
  );
}
