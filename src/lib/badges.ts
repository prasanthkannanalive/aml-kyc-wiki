// Achievement badge definitions — evaluated client-side from progress signals.

export interface BadgeDef {
  id: string;
  title: string;
  desc: string;
  /** which tier color */
  tier: "bronze" | "silver" | "gold";
}

export const badges: BadgeDef[] = [
  { id: "first-steps", title: "First Steps", desc: "Read your first chapter", tier: "bronze" },
  { id: "bookworm", title: "Bookworm", desc: "Read 10 chapters", tier: "bronze" },
  { id: "scholar", title: "Scholar", desc: "Read 25 chapters", tier: "silver" },
  { id: "course-finisher", title: "Course Finisher", desc: "Complete every chapter in a course", tier: "silver" },
  { id: "kyc-master", title: "KYC Specialist", desc: "Complete 50%+ of the KYC/CDD/TM certification course", tier: "gold" },
  { id: "exam-pass", title: "Certified Ready", desc: "Pass the final exam (70%+)", tier: "gold" },
  { id: "simulator", title: "Shift Survivor", desc: "Score 70%+ in a job simulation", tier: "silver" },
  { id: "arcade-daily", title: "Daily Player", desc: "Play all 5 arcade games in one day", tier: "bronze" },
  { id: "arcade-streak", title: "On a Roll", desc: "3-day arcade streak", tier: "silver" },
  { id: "polymath", title: "Polymath", desc: "Make progress in 3+ different courses", tier: "bronze" },
];

export const TIER_STYLE: Record<BadgeDef["tier"], string> = {
  bronze: "border-amber-700/50 bg-amber-700/10 text-amber-300",
  silver: "border-slate-400/40 bg-slate-400/10 text-slate-300",
  gold: "border-yellow-400/50 bg-yellow-400/10 text-yellow-300",
};
