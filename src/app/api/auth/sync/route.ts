import { NextRequest, NextResponse } from "next/server";
import { mergeSyncMeta, type SyncMeta } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// Merge guest (localStorage) achievement signals into the signed-in account
// so progress follows the user across devices — "one roof".

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const body = (await req.json()) as Partial<SyncMeta>;
    const incoming: SyncMeta = {
      exam: body.exam === true ? true : undefined,
      sims:
        body.sims && typeof body.sims === "object"
          ? Object.fromEntries(
              Object.entries(body.sims)
                .filter(([, v]) => typeof v === "number" && isFinite(v))
                .map(([k, v]) => [String(k).slice(0, 60), Math.max(0, Math.min(100, v as number))])
            )
          : undefined,
      arcade:
        body.arcade && typeof body.arcade === "object"
          ? {
              streak: Math.max(0, Math.min(3650, Math.floor(body.arcade.streak ?? 0))),
              games: Math.max(0, Math.min(5, Math.floor(body.arcade.games ?? 0))),
            }
          : undefined,
    };
    const merged = await mergeSyncMeta(user.id, incoming);
    return NextResponse.json({ ok: true, meta: merged });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
