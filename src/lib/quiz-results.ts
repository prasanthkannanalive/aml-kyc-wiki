// Client-side helper: records per-question quiz outcomes.
// Mirrors stats to localStorage (works logged-out) and posts to
// /api/quiz-results for logged-in persistence.

export interface QuizResultItem {
  key: string;
  ok: boolean;
  section?: string;
  course?: string;
}

export interface LocalQuizStat {
  c: number; // correct count
  w: number; // wrong count
  s?: string; // section label
  course?: string;
}

const LS_KEY = "aml-quizstats";

export function recordQuizResults(
  items: QuizResultItem[],
  course?: string
) {
  if (!items.length) return;
  try {
    const cur = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}") as Record<
      string,
      LocalQuizStat
    >;
    for (const it of items) {
      const e = cur[it.key] ?? { c: 0, w: 0 };
      if (it.ok) e.c += 1;
      else e.w += 1;
      if (it.section) e.s = it.section;
      if (it.course ?? course) e.course = it.course ?? course;
      cur[it.key] = e;
    }
    localStorage.setItem(LS_KEY, JSON.stringify(cur));
  } catch {
    /* storage unavailable */
  }
  fetch("/api/quiz-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).catch(() => {});
}

export function localQuizStats(): Record<string, LocalQuizStat> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}") as Record<
      string,
      LocalQuizStat
    >;
  } catch {
    return {};
  }
}

/** True when a question's history marks it as weak (accuracy < 60%, min 1 try). */
export function isWeakStat(s: LocalQuizStat | undefined): boolean {
  if (!s || s.c + s.w === 0) return false;
  return s.c / (s.c + s.w) < 0.6;
}
