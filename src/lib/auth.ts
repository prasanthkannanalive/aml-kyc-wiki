import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getUserById, type User } from "@/lib/db";

const SECRET =
  process.env.AUTH_SECRET ??
  "amlkyc-wiki-dev-secret-change-me-in-production";
const COOKIE = "aml_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function hashPassword(password: string, salt?: string) {
  const s = salt ?? crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, s, 64).toString("hex");
  return { salt: s, hash };
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const test = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return test.length === expected.length && crypto.timingSafeEqual(test, expected);
}

function sign(userId: string) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(userId)
    .digest("hex");
}

export function makeSessionToken(userId: string) {
  return `${userId}.${sign(userId)}`;
}

export async function setSessionCookie(userId: string) {
  const store = await cookies();
  store.set(COOKIE, makeSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSessionUser(): Promise<User | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  const [userId, sig] = token.split(".");
  if (!userId || !sig) return null;
  const expected = sign(userId);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return (await getUserById(userId)) ?? null;
}
