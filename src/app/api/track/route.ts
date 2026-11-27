import { NextRequest, NextResponse } from "next/server";
import { bumpStat, recordProgress } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const ALLOWED = new Set(["course", "chapter", "interview", "glossary", "search", "complete", "quiz", "exam", "sandbox", "sim", "arcade", "challenge"]);

export async function POST(req: NextRequest) {
  try {
    const { type, id } = await req.json();
    if (typeof type !== "string" || !ALLOWED.has(type) || typeof id !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const key = `${type}:${id}`;
    const count = await bumpStat(key);

    const user = await getSessionUser();
    if (user) {
      if (type === "chapter") await recordProgress(user.id, `chapter:${id}`);
      if (type === "complete") await recordProgress(user.id, `done:${id}`);
    }

    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
