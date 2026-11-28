import { NextRequest, NextResponse } from "next/server";
import { consumeProCode, setUserPlan } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// POST { code } — redeem a one-time Pro code onto the signed-in account.
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Sign in to redeem a code." },
        { status: 401 }
      );
    }
    const { code } = await req.json();
    if (typeof code !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const valid = await consumeProCode(code);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Invalid or already-used code." },
        { status: 400 }
      );
    }
    await setUserPlan(user.id, "pro");
    return NextResponse.json({ ok: true, plan: "pro" });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
