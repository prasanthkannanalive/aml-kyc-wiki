import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { exchangeCode, logtoEnabled } from "@/lib/logto";

// Logto OIDC callback — verifies state, exchanges the code, then maps the
// Logto identity onto our user store by email (one roof: same account as
// email/Google sign-in) and sets our session cookie.

const COOKIE = "logto_oidc";

export async function GET(req: NextRequest) {
  const fail = () => NextResponse.redirect(new URL("/login?error=logto", req.url));
  if (!logtoEnabled()) return fail();

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const saved = req.cookies.get(COOKIE)?.value;
  if (!code || !state || !saved) return fail();

  const [savedState, , verifier] = saved.split(".");
  if (state !== savedState || !verifier) return fail();

  try {
    const me = await exchangeCode(req.nextUrl.origin, code, verifier);
    if (!me?.email) return fail();

    const email = me.email.toLowerCase();
    let user = await getUserByEmail(email);
    if (!user) {
      const { salt, hash } = hashPassword(crypto.randomUUID() + crypto.randomUUID());
      user = await createUser({
        email,
        name: me.name?.trim() || email.split("@")[0],
        salt,
        hash,
      });
    }
    await setSessionCookie(user.id);
    const res = NextResponse.redirect(new URL("/profile", req.url));
    res.cookies.delete(COOKIE);
    return res;
  } catch {
    return fail();
  }
}
