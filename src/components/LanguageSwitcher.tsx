"use client";

import { useRouter } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n-dict";

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter();

  const set = (code: string) => {
    document.cookie = `lang=${code};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = code;
    router.refresh();
  };

  return (
    <select
      value={lang}
      onChange={(e) => set(e.target.value)}
      aria-label="Language"
      className="h-9 rounded-lg border border-line bg-surface px-2 text-sm text-muted outline-none focus:border-emerald-400"
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
