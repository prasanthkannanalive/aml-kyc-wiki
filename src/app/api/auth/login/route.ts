import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await getUserByEmail(String(email ?? ""));
    if (!user || !verifyPassword(String(password ?? ""), user.salt, user.hash)) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    await setSessionCookie(user.id);
    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
