// Daily Challenge — one fixed set of 5 AML scenario questions per day,
// deterministic from the date so every visitor worldwide gets the same run.
// Pool mixes alert dispositions, typology recognition and regulatory dates.

import {
  DISPO_BANK,
  RUSH_BANK,
  TIME_BANK,
  dayOfYear,
  mulberry32,
  pickDaily,
} from "./arcade";

export interface ChallengeQuestion {
  q: string;
  options: string[];
  answer: string;
  why?: string;
}

interface RawItem {
  q: string;
  options: string[];
  answer: string;
  why?: string;
}

const BANK: RawItem[] = [
  ...DISPO_BANK.map((d) => ({
    q: d.scenario,
    options: d.options,
    answer: d.answer,
    why: d.why,
  })),
  ...RUSH_BANK.map((r) => ({
    q: `Which typology fits — ${r.clue}?`,
    options: r.options,
    answer: r.answer,
  })),
  ...TIME_BANK.map((t) => ({
    q: `In which year did this happen — ${t.event}?`,
    options: t.options.map(String),
    answer: String(t.year),
  })),
];

export const CHALLENGE_QUESTIONS_PER_DAY = 5;

export function challengeDay(now = new Date()): {
  day: string;
  questions: ChallengeQuestion[];
} {
  const day = now.toISOString().slice(0, 10);
  const doy = dayOfYear(now);
  const picked = pickDaily(BANK, doy, CHALLENGE_QUESTIONS_PER_DAY, 11);
  const questions = picked.map((item, i) => {
    const rnd = mulberry32(doy * 131 + i * 17 + 5);
    const options = [...item.options];
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(rnd() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    return { q: item.q, options, answer: item.answer, why: item.why };
  });
  return { day, questions };
}
