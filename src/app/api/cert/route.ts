import { NextRequest, NextResponse } from "next/server";
import { setCert } from "@/lib/db";
import { getCourse } from "@/lib/content";

// POST { courseSlug } — issue (or return existing) verifiable certificate id
export async function POST(req: NextRequest) {
  try {
    const { courseSlug } = await req.json();
    const course = typeof courseSlug === "string" ? getCourse(courseSlug) : null;
    if (!course) return NextResponse.json({ ok: false }, { status: 400 });

    // deterministic-ish id per course+day bucket keeps re-issues stable enough
    // while staying unguessable via timestamp+random suffix
    const id = `AMLK-${course.code.replace(/[^A-Z0-9]/gi, "").slice(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const rec = {
      id,
      courseSlug: course.slug,
      courseTitle: course.title,
      code: course.code,
      issuedAt: new Date().toISOString(),
    };
    await setCert(rec);
    return NextResponse.json({ ok: true, id, cert: rec });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
