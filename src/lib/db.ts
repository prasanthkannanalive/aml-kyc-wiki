import fs from "node:fs";
import path from "node:path";
import { listChapters } from "./chapters";

const dataDir = path.join(process.cwd(), "data");

/* ------------------------------------------------------------------ */
/* Storage backend                                                     */
/*                                                                     */
/* When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set we   */
/* use Upstash Redis (serverless-safe). Otherwise we fall back to the  */
/* local JSON files under data/ — fine for development and reads of    */
/* bundled data, but writes do not persist on Vercel without Redis.    */
/* ------------------------------------------------------------------ */

const KV_URL = process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const kvEnabled = () => Boolean(KV_URL && KV_TOKEN);

/** Read command — all args go in the path. */
async function kvGet<T>(...args: string[]): Promise<T | null> {
  try {
    const res = await fetch(`${KV_URL}/${args.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

/** Write command — args in path; optional JSON body for value commands. */
async function kvPost<T>(args: string[], body?: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${KV_URL}/${args.map(encodeURIComponent).join("/")}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

const K = {
  users: "aml:users", // set of user ids
  user: (id: string) => `aml:user:${id}`,
  emailIdx: (email: string) => `aml:email:${email.toLowerCase()}`,
  progress: (id: string) => `aml:progress:${id}`,
  stats: "aml:stats", // hash field -> count
  sync: (id: string) => `aml:sync:${id}`, // guest-achievement sync blob
  cert: (id: string) => `aml:cert:${id}`, // verifiable course certificate
  teams: "aml:teams", // JSON doc: TeamRecord[]
};

/* ------------------------- JSON fallback --------------------------- */

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, file),
      JSON.stringify(data, null, 2)
    );
  } catch {
    // read-only filesystem (e.g. serverless) — degrade gracefully
  }
}

/* ----------------------------- stats ------------------------------- */

export interface StatsStore {
  [key: string]: number;
}

export async function getStat(key: string): Promise<number> {
  if (kvEnabled()) {
    const v = await kvGet<string>("HGET", K.stats, key);
    return v ? parseInt(v, 10) : 0;
  }
  return readJson<StatsStore>("stats.json", {})[key] ?? 0;
}

export async function bumpStat(key: string): Promise<number> {
  if (kvEnabled()) {
    const v = await kvPost<number>(["HINCRBY", K.stats, key, "1"]);
    return v ?? 1;
  }
  const stats = readJson<StatsStore>("stats.json", {});
  stats[key] = (stats[key] ?? 0) + 1;
  writeJson("stats.json", stats);
  return stats[key];
}

export async function getAllStats(): Promise<StatsStore> {
  if (kvEnabled()) {
    const all = await kvGet<Record<string, string>>("HGETALL", K.stats);
    const out: StatsStore = {};
    for (const [k, v] of Object.entries(all ?? {})) out[k] = parseInt(v, 10) || 0;
    return out;
  }
  return readJson<StatsStore>("stats.json", {});
}

/* ----------------------------- users ------------------------------- */

export interface User {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  createdAt: string;
}

async function kvGetUser(id: string): Promise<User | null> {
  const raw = await kvGet<string>("GET", K.user(id));
  return raw ? (JSON.parse(raw) as User) : null;
}

export async function getUsers(): Promise<User[]> {
  if (!kvEnabled()) return readJson<User[]>("users.json", []);
  const ids = (await kvGet<string[]>("SMEMBERS", K.users)) ?? [];
  const users = await Promise.all(ids.map(kvGetUser));
  return users.filter((u): u is User => u !== null);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  if (kvEnabled()) {
    const id = await kvGet<string>("GET", K.emailIdx(email));
    return id ? ((await kvGetUser(id)) ?? undefined) : undefined;
  }
  return (await getUsers()).find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserById(id: string): Promise<User | undefined> {
  if (kvEnabled()) return (await kvGetUser(id)) ?? undefined;
  return (await getUsers()).find((u) => u.id === id);
}

export async function createUser(u: Omit<User, "id" | "createdAt">): Promise<User> {
  const user: User = {
    ...u,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  if (kvEnabled()) {
    await kvPost(["SET", K.user(user.id)], JSON.stringify(user));
    await kvPost(["SET", K.emailIdx(user.email)], user.id);
    await kvPost(["SADD", K.users, user.id]);
  } else {
    const users = await getUsers();
    users.push(user);
    writeJson("users.json", users);
  }
  return user;
}

/* ---------------------------- progress ----------------------------- */

export type ProgressStore = Record<string, Record<string, string>>;

export async function getProgress(userId: string): Promise<Record<string, string>> {
  if (kvEnabled()) {
    const raw = await kvGet<string>("GET", K.progress(userId));
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  }
  return readJson<ProgressStore>("progress.json", {})[userId] ?? {};
}

export async function recordProgress(userId: string, chapterKey: string) {
  if (kvEnabled()) {
    const cur = await getProgress(userId);
    cur[chapterKey] = new Date().toISOString();
    await kvPost(["SET", K.progress(userId)], JSON.stringify(cur));
    return;
  }
  const all = readJson<ProgressStore>("progress.json", {});
  all[userId] = all[userId] ?? {};
  all[userId][chapterKey] = new Date().toISOString();
  writeJson("progress.json", all);
}

export async function getAllProgress(): Promise<ProgressStore> {
  if (!kvEnabled()) return readJson<ProgressStore>("progress.json", {});
  const ids = (await kvGet<string[]>("SMEMBERS", K.users)) ?? [];
  const out: ProgressStore = {};
  await Promise.all(
    ids.map(async (id) => {
      const p = await getProgress(id);
      if (Object.keys(p).length) out[id] = p;
    })
  );
  return out;
}

/* ---------------------- achievement sync meta ---------------------- */

export interface SyncMeta {
  exam?: boolean;
  sims?: Record<string, number>;
  arcade?: { streak: number; games: number };
  updatedAt?: string;
}

export async function getSyncMeta(userId: string): Promise<SyncMeta | null> {
  if (kvEnabled()) {
    const raw = await kvGet<string>("GET", K.sync(userId));
    return raw ? (JSON.parse(raw) as SyncMeta) : null;
  }
  const all = readJson<Record<string, SyncMeta>>("sync.json", {});
  return all[userId] ?? null;
}

export async function mergeSyncMeta(userId: string, incoming: SyncMeta): Promise<SyncMeta> {
  const cur = (await getSyncMeta(userId)) ?? {};
  const merged: SyncMeta = {
    exam: cur.exam || incoming.exam || undefined,
    sims: { ...(cur.sims ?? {}) },
    arcade: {
      streak: Math.max(cur.arcade?.streak ?? 0, incoming.arcade?.streak ?? 0),
      games: Math.max(cur.arcade?.games ?? 0, incoming.arcade?.games ?? 0),
    },
    updatedAt: new Date().toISOString(),
  };
  for (const [k, v] of Object.entries(incoming.sims ?? {})) {
    merged.sims![k] = Math.max(merged.sims![k] ?? 0, v);
  }
  if (!merged.exam) delete merged.exam;
  if (kvEnabled()) {
    await kvPost(["SET", K.sync(userId)], JSON.stringify(merged));
  } else {
    const all = readJson<Record<string, SyncMeta>>("sync.json", {});
    all[userId] = merged;
    writeJson("sync.json", all);
  }
  return merged;
}

/* -------------------------- certificates --------------------------- */

export interface CertRecord {
  id: string;
  courseSlug: string;
  courseTitle: string;
  code: string;
  issuedAt: string;
}

export async function getCert(id: string): Promise<CertRecord | null> {
  if (kvEnabled()) {
    const raw = await kvGet<string>("GET", K.cert(id));
    return raw ? (JSON.parse(raw) as CertRecord) : null;
  }
  const all = readJson<Record<string, CertRecord>>("certs.json", {});
  return all[id] ?? null;
}

export async function setCert(rec: CertRecord): Promise<void> {
  if (kvEnabled()) {
    await kvPost(["SET", K.cert(rec.id)], JSON.stringify(rec));
    return;
  }
  const all = readJson<Record<string, CertRecord>>("certs.json", {});
  all[rec.id] = rec;
  writeJson("certs.json", all);
}

/* ----------------------------- teams ------------------------------- */

export interface TeamRecord {
  id: string;
  name: string;
  code: string;
  createdBy: string;
  createdAt: string;
  members: string[]; // user ids
}

const TEAM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function genTeamCode(): string {
  let s = "";
  for (let i = 0; i < 6; i++)
    s += TEAM_CODE_ALPHABET[Math.floor(Math.random() * TEAM_CODE_ALPHABET.length)];
  return s;
}

export async function getTeams(): Promise<TeamRecord[]> {
  if (kvEnabled()) {
    const raw = await kvGet<string>("GET", K.teams);
    return raw ? (JSON.parse(raw) as TeamRecord[]) : [];
  }
  return readJson<TeamRecord[]>("teams.json", []);
}

export async function saveTeams(teams: TeamRecord[]): Promise<void> {
  if (kvEnabled()) {
    await kvPost(["SET", K.teams], JSON.stringify(teams));
    return;
  }
  writeJson("teams.json", teams);
}

/* --------------------- live engagement helpers --------------------- */

/** Live read count for a course: course-level + all chapter views. */
export async function getCourseReads(slug: string): Promise<number> {
  const stats = await getAllStats();
  const nums = new Set(listChapters(slug).map((c) => c.num));
  let total = stats[`course:${slug}`] ?? 0;
  for (const n of nums) total += stats[`chapter:${slug}/${n}`] ?? 0;
  return total;
}

/** Distinct users who completed at least one chapter of a course. */
export async function getCourseCompletions(slug: string): Promise<number> {
  const progress = await getAllProgress();
  const prefix = `done:${slug}/`;
  return Object.values(progress).filter((p) =>
    Object.keys(p).some((k) => k.startsWith(prefix))
  ).length;
}
