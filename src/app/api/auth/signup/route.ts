import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      password.length < 8 ||
      !email.includes("@")
    ) {
      return NextResponse.json(
        { error: "Valid email and password (min 8 chars) required." },
        { status: 400 }
      );
    }
    if (await getUserByEmail(email)) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }
    const { salt, hash } = hashPassword(password);
    const user = await createUser({
      email: email.toLowerCase(),
      name: typeof name === "string" && name.trim() ? name.trim() : email.split("@")[0],
      salt,
      hash,
    });
    await setSessionCookie(user.id);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch {
    return NextResponse.json({ error: "Signup failed." }, { status: 500 });
  }
}
