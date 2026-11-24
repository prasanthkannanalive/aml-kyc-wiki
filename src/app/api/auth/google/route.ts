import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";

// Google Identity Services ID-token sign-in.
// Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID (the OAuth 2.0 Web client ID).

interface GooglePayload {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: "Google sign-in is not configured." }, { status: 503 });
    }
    const { credential } = await req.json();
    if (typeof credential !== "string" || !credential) {
      return NextResponse.json({ error: "Missing credential." }, { status: 400 });
    }

    const info = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
      { cache: "no-store" }
    );
    if (!info.ok) {
      return NextResponse.json({ error: "Google sign-in failed." }, { status: 401 });
    }
    const payload = (await info.json()) as GooglePayload;
    const verified = payload.email_verified === true || payload.email_verified === "true";
    if (
      payload.aud !== clientId ||
      (payload.iss !== "accounts.google.com" && payload.iss !== "https://accounts.google.com") ||
      !payload.email ||
      !verified
    ) {
      return NextResponse.json({ error: "Google sign-in failed." }, { status: 401 });
    }

    const email = payload.email.toLowerCase();
    let user = await getUserByEmail(email);
    if (!user) {
      // one-roof provisioning: first Google sign-in creates the account
      const { salt, hash } = hashPassword(crypto.randomUUID() + crypto.randomUUID());
      user = await createUser({
        email,
        name: payload.name?.trim() || email.split("@")[0],
        salt,
        hash,
      });
    }
    await setSessionCookie(user.id);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch {
    return NextResponse.json({ error: "Google sign-in failed." }, { status: 500 });
  }
}
