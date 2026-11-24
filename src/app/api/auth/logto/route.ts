import { NextRequest, NextResponse } from "next/server";
import { buildAuthorizeRequest, logtoEnabled } from "@/lib/logto";

// Starts the Logto OIDC flow: sets a short-lived state cookie and redirects
// to the Logto sign-in page.

const COOKIE = "logto_oidc";

export async function GET(req: NextRequest) {
  if (!logtoEnabled()) {
    return NextResponse.redirect(new URL("/login?error=logto", req.url));
  }
  const { url, cookieValue } = buildAuthorizeRequest(req.nextUrl.origin);
  const res = NextResponse.redirect(url);
  res.cookies.set(COOKIE, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/",
  });
  return res;
}
