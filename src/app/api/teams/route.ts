import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getTeams, saveTeams, genTeamCode, type TeamRecord } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });

    const { action, name, code } = await req.json();
    const teams = await getTeams();

    if (action === "create") {
      const teamName = typeof name === "string" && name.trim() ? name.trim().slice(0, 60) : "Study group";
      let c = genTeamCode();
      while (teams.some((t) => t.code === c)) c = genTeamCode();
      const team: TeamRecord = {
        id: crypto.randomUUID(),
        name: teamName,
        code: c,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        members: [user.id],
      };
      teams.push(team);
      await saveTeams(teams);
      return NextResponse.json({ ok: true, team });
    }

    if (action === "join") {
      const c = typeof code === "string" ? code.trim().toUpperCase() : "";
      const team = teams.find((t) => t.code === c);
      if (!team) return NextResponse.json({ ok: false, error: "not-found" }, { status: 404 });
      if (!team.members.includes(user.id)) {
        team.members.push(user.id);
        await saveTeams(teams);
      }
      return NextResponse.json({ ok: true, team });
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
