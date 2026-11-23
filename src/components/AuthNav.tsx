"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Me {
  id: string;
  email: string;
  name: string;
}

export default function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<Me | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .finally(() => setLoaded(true));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  };

  if (!loaded) return <div className="h-8 w-20" />;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
        >
          {user.name.split(" ")[0]}
        </Link>
        <button
          onClick={logout}
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-emerald-400 px-3.5 py-1.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-300"
      >
        Sign up
      </Link>
    </div>
  );
}
