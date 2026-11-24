import crypto from "node:crypto";

// Logto OIDC helpers — plain fetch, no SDK dependency.
// Env: LOGTO_ENDPOINT (https://xxx.logto.app), LOGTO_APP_ID, LOGTO_APP_SECRET (confidential apps),
//      optional LOGTO_APP_TYPE=spa for public PKCE-only clients.

export function logtoEnabled() {
  return !!(process.env.LOGTO_ENDPOINT && process.env.LOGTO_APP_ID);
}

const ENDPOINT = () => process.env.LOGTO_ENDPOINT!.replace(/\/$/, "");
const APP_ID = () => process.env.LOGTO_APP_ID!;
const APP_SECRET = () => process.env.LOGTO_APP_SECRET;

export function redirectUri(origin: string) {
  return `${origin}/api/auth/logto/callback`;
}

function b64url(buf: Buffer | string) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export interface LogtoAuthRequest {
  url: string;
  cookieValue: string; // state|nonce|verifier packed for the callback cookie
}

export function buildAuthorizeRequest(origin: string): LogtoAuthRequest {
  const state = b64url(crypto.randomBytes(24));
  const nonce = b64url(crypto.randomBytes(24));
  const verifier = b64url(crypto.randomBytes(48));
  const challenge = b64url(crypto.createHash("sha256").update(verifier).digest());

  const params = new URLSearchParams({
    client_id: APP_ID(),
    redirect_uri: redirectUri(origin),
    response_type: "code",
    scope: "openid profile email",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  return {
    url: `${ENDPOINT()}/oidc/auth?${params.toString()}`,
    cookieValue: `${state}.${nonce}.${verifier}`,
  };
}

export interface LogtoUser {
  sub: string;
  email?: string;
  name?: string;
}

export async function exchangeCode(
  origin: string,
  code: string,
  verifier: string
): Promise<LogtoUser | null> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(origin),
    client_id: APP_ID(),
    code_verifier: verifier,
  });
  if (APP_SECRET()) body.set("client_secret", APP_SECRET()!);

  const tokenRes = await fetch(`${ENDPOINT()}/oidc/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!tokenRes.ok) return null;
  const tokens = (await tokenRes.json()) as { access_token?: string };
  if (!tokens.access_token) return null;

  const meRes = await fetch(`${ENDPOINT()}/oidc/me`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
    cache: "no-store",
  });
  if (!meRes.ok) return null;
  const me = (await meRes.json()) as LogtoUser;
  if (!me.sub) return null;
  return me;
}
