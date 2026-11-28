import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getQuizStats, recordQuizStats } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0 || items.length > 500) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const clean = items
      .filter(
        (it) =>
          it &&
          typeof it.key === "string" &&
          it.key.length <= 64 &&
          typeof it.ok === "boolean"
      )
      .map((it) => ({
        key: it.key,
        ok: it.ok,
        section: typeof it.section === "string" ? it.section.slice(0, 120) : undefined,
        course: typeof it.course === "string" ? it.course.slice(0, 80) : undefined,
      }));
    if (!clean.length) return NextResponse.json({ ok: false }, { status: 400 });

    const user = await getSessionUser();
    if (user) await recordQuizStats(user.id, clean);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ stats: {} });
  return NextResponse.json({ stats: await getQuizStats(user.id) });
}
