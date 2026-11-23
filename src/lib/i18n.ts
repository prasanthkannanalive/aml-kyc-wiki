import { cookies } from "next/headers";
import { dict, type Lang } from "@/lib/i18n-dict";

export { LANGS, t, ti } from "@/lib/i18n-dict";
export type { Lang } from "@/lib/i18n-dict";

export async function getLang(): Promise<Lang> {
  try {
    const store = await cookies();
    const l = store.get("lang")?.value;
    return l === "es" || l === "hi" ? l : "en";
  } catch {
    return "en";
  }
}

export function tr(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}
