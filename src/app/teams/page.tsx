import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { getTeams, getAllProgress, getUsers, type TeamRecord } from "@/lib/db";
import TeamManager from "@/components/TeamManager";
import CopyButton from "@/components/CopyButton";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Study Teams — AML/KYC Wiki",
  description:
    "Create a study cohort, share a join code, and track member progress across every AML/KYC course.",
};
export const dynamic = "force-dynamic";

function memberStats(uid: string, progress: Record<string, Record<string, string>>, nameFor: Map<string, string>) {
  const p = progress[uid] ?? {};
  const chapters = Object.keys(p).filter((k) => k.startsWith("chapter:")).length;
  const done = Object.keys(p).filter((k) => k.startsWith("done:")).length;
  const times = Object.values(p).filter((v) => typeof v === "string").map(Date.parse);
  const last = times.length ? new Date(Math.max(...times)).toISOString().slice(0, 10) : "—";
  return { name: nameFor.get(uid) ?? `Reader ${uid.slice(0, 6)}`, chapters, done, last };
}

export default async function TeamsPage() {
  const user = await getSessionUser();
  const teams = user ? (await getTeams()).filter((t) => t.members.includes(user.id)) : [];
  const progress = user ? await getAllProgress() : {};
  const users = user ? await getUsers() : [];
  const nameFor = new Map(users.map((u) => [u.id, u.name || u.email]));

  const teamCards = teams.map((t: TeamRecord) => {
    const members = t.members
      .map((uid) => memberStats(uid, progress, nameFor))
      .sort((a, b) => b.chapters + b.done - (a.chapters + a.done));
    const totalChapters = members.reduce((s, m) => s + m.chapters, 0);
    return { team: t, members, totalChapters };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <ViewTracker type="search" id="teams" />
      <h1 className="text-3xl font-bold tracking-tight">Study Teams</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Run a cohort through the courses together — create a team, share the
        code, and see who&apos;s keeping pace. Progress is tracked for signed-in
        members as they read chapters and complete lessons.
      </p>

      {!user ? (
        <div className="mt-8 rounded-xl border border-line bg-surface/50 p-8 text-center">
          <p className="text-sm text-muted">Sign in to create or join a study team.</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
          >
            Sign in
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <TeamManager />
          </div>

          {teamCards.length === 0 ? (
            <p className="mt-8 text-sm text-muted">
              You&apos;re not in any teams yet — create one above or ask a
              teammate for their code.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {teamCards.map(({ team, members, totalChapters }) => (
                <div key={team.id} className="overflow-hidden rounded-2xl border border-line">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2/50 px-5 py-4">
                    <div>
                      <h2 className="font-semibold text-ink">{team.name}</h2>
                      <p className="mt-0.5 text-xs text-muted">
                        {members.length} member{members.length === 1 ? "" : "s"} · {totalChapters} chapters read collectively
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted">Join code:</span>
                      <CopyButton
                        text={team.code}
                        className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 font-mono text-sm font-bold tracking-widest text-emerald-300 transition-colors hover:bg-emerald-400/20"
                      />
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line/60 text-left text-[10px] uppercase tracking-wide text-muted">
                        <th className="px-5 py-2.5 font-medium">Member</th>
                        <th className="px-5 py-2.5 text-right font-medium">Chapters read</th>
                        <th className="px-5 py-2.5 text-right font-medium">Lessons done</th>
                        <th className="px-5 py-2.5 text-right font-medium">Last active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {members.map((m, i) => (
                        <tr key={i} className="hover:bg-surface-2/40">
                          <td className="px-5 py-3 font-medium text-ink">{m.name}</td>
                          <td className="px-5 py-3 text-right font-mono text-body">{m.chapters}</td>
                          <td className="px-5 py-3 text-right font-mono text-muted">{m.done}</td>
                          <td className="px-5 py-3 text-right font-mono text-xs text-muted">{m.last}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
