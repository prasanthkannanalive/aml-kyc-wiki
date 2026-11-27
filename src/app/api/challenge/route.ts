import { NextRequest, NextResponse } from "next/server";
import { getChallengeBoard, submitChallenge } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { CHALLENGE_QUESTIONS_PER_DAY } from "@/lib/challenge";

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const ANON_KEY_RE = /^a:[a-zA-Z0-9-]{8,64}$/;

function bad() {
  return NextResponse.json({ ok: false }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const day =
    req.nextUrl.searchParams.get("day") ??
    new Date().toISOString().slice(0, 10);
  if (!DAY_RE.test(day)) return bad();
  const board = await getChallengeBoard(day);
  return NextResponse.json({ ok: true, day, board: board.slice(0, 50) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { day, name, score, key } = body ?? {};
    if (typeof day !== "string" || !DAY_RE.test(day)) return bad();
    if (
      typeof score !== "number" ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > CHALLENGE_QUESTIONS_PER_DAY
    ) {
      return bad();
    }

    // Signed-in users are identified by session — client-supplied keys ignored.
    const user = await getSessionUser();
    const playerKey = user
      ? `u:${user.id}`
      : typeof key === "string" && ANON_KEY_RE.test(key)
        ? key
        : null;
    if (!playerKey) return bad();

    const display = (
      user?.name ??
      (typeof name === "string" ? name : "")
    )
      .trim()
      .slice(0, 24);

    const { board, rank } = await submitChallenge(day, {
      key: playerKey,
      name: display || "Player",
      score,
      ts: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, board: board.slice(0, 50), rank });
  } catch {
    return bad();
  }
}
