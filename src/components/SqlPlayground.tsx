"use client";

import { useEffect, useRef, useState } from "react";
import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import { generate } from "@/components/DataLab";
import { generateChain } from "@/lib/chain-data";
import { SQL_CHALLENGES, type SqlChallenge } from "@/lib/sql-challenges";

const SEED = 42;

let SQL_PROMISE: Promise<SqlJsStatic> | null = null;
function getSql() {
  if (!SQL_PROMISE)
    SQL_PROMISE = initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  return SQL_PROMISE;
}

const fmtTs = (ms: number) =>
  new Date(ms).toISOString().slice(0, 16).replace("T", " ");

interface QueryResult {
  columns: string[];
  values: unknown[][];
}

function normRows(values: unknown[][]): string[] {
  return values.map((r) => r.map((v) => String(v)).join("|"));
}

const SCHEMA_HINT: Record<SqlChallenge["dataset"], string> = {
  bank: "transactions(id, ts, customer, counterparty, type, amount, currency, channel, is_new_cp)",
  chain:
    "chain_transactions(tx_hash, block_number, block_time, from_address, to_address, value, token, chain)",
};

export default function SqlPlayground() {
  const [ready, setReady] = useState(false);
  const [dbErr, setDbErr] = useState("");
  const dbRef = useRef<Database | null>(null);
  const [chIdx, setChIdx] = useState(0);
  const [sql, setSql] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [verdict, setVerdict] = useState<"idle" | "pass" | "fail">("idle");
  const [err, setErr] = useState("");
  const [expectedCount, setExpectedCount] = useState<number | null>(null);
  const [passed, setPassed] = useState<Set<string>>(new Set());

  const challenge: SqlChallenge = SQL_CHALLENGES[chIdx];
  const bankCount = SQL_CHALLENGES.filter((c) => c.dataset === "bank").length;

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const SQL = await getSql();
        const db = new SQL.Database();

        // bank ledger table
        db.run(
          "CREATE TABLE transactions (id INTEGER, ts TEXT, customer TEXT, counterparty TEXT, type TEXT, amount REAL, currency TEXT, channel TEXT, is_new_cp INTEGER)"
        );
        const stmt = db.prepare(
          "INSERT INTO transactions VALUES (?,?,?,?,?,?,?,?,?)"
        );
        for (const t of generate(SEED)) {
          stmt.run([
            t.id,
            fmtTs(t.ts),
            t.customer,
            t.counterparty,
            t.type,
            t.amount,
            t.currency,
            t.channel,
            t.isNewCp ? 1 : 0,
          ]);
        }
        stmt.free();

        // on-chain table (Dune-style)
        db.run(
          "CREATE TABLE chain_transactions (tx_hash TEXT, block_number INTEGER, block_time TEXT, from_address TEXT, to_address TEXT, value REAL, token TEXT, chain TEXT)"
        );
        const cstmt = db.prepare(
          "INSERT INTO chain_transactions VALUES (?,?,?,?,?,?,?,?)"
        );
        for (const t of generateChain(SEED)) {
          cstmt.run([
            t.tx_hash,
            t.block_number,
            t.block_time,
            t.from_address,
            t.to_address,
            t.value,
            t.token,
            t.chain,
          ]);
        }
        cstmt.free();

        if (!dead) {
          dbRef.current = db;
          setReady(true);
        }
      } catch (e) {
        if (!dead) setDbErr(String(e));
      }
    })();
    return () => {
      dead = true;
    };
  }, []);

  const pick = (i: number) => {
    setChIdx(i);
    setSql("");
    setResult(null);
    setVerdict("idle");
    setErr("");
    setExpectedCount(null);
  };

  const run = () => {
    const db = dbRef.current;
    if (!db || !sql.trim() || busy) return;
    setBusy(true);
    setErr("");
    setVerdict("idle");
    setResult(null);
    try {
      const res = db.exec(sql);
      if (!res.length || !res[0].values.length) {
        setResult({ columns: res[0]?.columns ?? [], values: [] });
        setErr("Query ran but returned no rows.");
        setBusy(false);
        return;
      }
      const got = res[0];
      setResult({ columns: got.columns, values: got.values });
      const exp = db.exec(challenge.referenceSql)[0];
      setExpectedCount(exp.values.length);
      const gotNorm = normRows(got.values).sort();
      const expNorm = normRows(exp.values).sort();
      const ok =
        gotNorm.length === expNorm.length &&
        gotNorm.every((r, i) => r === expNorm[i]);
      setVerdict(ok ? "pass" : "fail");
      if (ok) setPassed((p) => new Set(p).add(challenge.id));
    } catch (e) {
      setErr(String(e).replace(/^Error:\s*/i, ""));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/5 to-transparent p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Hands-on playground
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink">
            Investigation scenarios — write the query, crack the case
          </h2>
          <p className="mt-1 text-sm text-muted">
            Two live datasets in an in-browser SQLite engine: the bank ledger
            from the Data Lab, and a Dune-style on-chain table. Each challenge
            is a real analyst scenario — your SQL is checked against the
            reference answer.
          </p>
        </div>
        {ready && (
          <span className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] text-muted">
            {passed.size}/{SQL_CHALLENGES.length} solved
          </span>
        )}
      </div>

      {!ready && !dbErr && (
        <p className="mt-6 text-sm text-muted">Loading SQL engine…</p>
      )}
      {dbErr && (
        <p className="mt-6 text-sm text-red-400">
          SQL engine failed to load: {dbErr}
        </p>
      )}

      {ready && (
        <>
          {/* challenge picker */}
          <div className="mt-5 space-y-2">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-faint">
              Bank ledger scenarios ({bankCount})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SQL_CHALLENGES.map((c, i) =>
                c.dataset === "bank" ? (
                  <button
                    key={c.id}
                    onClick={() => pick(i)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      i === chIdx
                        ? "border-emerald-400/60 bg-emerald-400/10 text-ink"
                        : "border-line bg-surface/60 text-muted hover:border-emerald-400/40 hover:text-ink"
                    }`}
                  >
                    {passed.has(c.id) ? "✓ " : ""}
                    {c.title}
                  </button>
                ) : null
              )}
            </div>
            <p className="pt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-faint">
              On-chain scenarios — Dune-style ({SQL_CHALLENGES.length - bankCount})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SQL_CHALLENGES.map((c, i) =>
                c.dataset === "chain" ? (
                  <button
                    key={c.id}
                    onClick={() => pick(i)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      i === chIdx
                        ? "border-sky-400/60 bg-sky-400/10 text-ink"
                        : "border-line bg-surface/60 text-muted hover:border-sky-400/40 hover:text-ink"
                    }`}
                  >
                    {passed.has(c.id) ? "✓ " : ""}
                    ⛓ {c.title}
                  </button>
                ) : null
              )}
            </div>
          </div>

          {/* scenario + prompt */}
          <div className="mt-5 rounded-xl border border-line bg-surface/60 p-4">
            <p
              className={`text-[10px] font-mono font-semibold uppercase tracking-widest ${
                challenge.dataset === "chain" ? "text-sky-400" : "text-emerald-400"
              }`}
            >
              {challenge.dataset === "chain"
                ? "On-chain investigation · Dune-style"
                : "Bank investigation"}
            </p>
            <p className="mt-1.5 text-sm italic leading-6 text-body">
              {challenge.scenario}
            </p>
            <p className="mt-2 text-sm font-semibold text-ink">{challenge.prompt}</p>
            <p className="mt-2 font-mono text-[11px] text-faint">
              hint: {challenge.hint}
            </p>
          </div>

          {/* editor */}
          <textarea
            value={sql}
            onChange={(e) => {
              setSql(e.target.value);
              setVerdict("idle");
              setResult(null);
              setErr("");
            }}
            spellCheck={false}
            placeholder={
              challenge.dataset === "chain"
                ? "SELECT block_time, from_address, to_address, value\nFROM chain_transactions\nWHERE ..."
                : "SELECT customer, SUM(amount) AS total\nFROM transactions\nGROUP BY customer\nORDER BY total DESC"
            }
            className="mt-4 h-32 w-full resize-y rounded-xl border border-line bg-zinc-950/80 p-4 font-mono text-xs leading-5 text-emerald-200 outline-none placeholder:text-faint/50 focus:border-emerald-400/50"
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={busy || !sql.trim()}
              className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-300 disabled:opacity-40"
            >
              {busy ? "Running…" : "▶ Run query"}
            </button>
            <button
              onClick={() => pick(chIdx)}
              className="rounded-lg border border-line px-4 py-2 text-xs font-medium text-muted hover:text-ink"
            >
              Clear
            </button>
            {challenge.tryOn && (
              <a
                href={challenge.tryOn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-sky-400 hover:underline"
              >
                {challenge.tryOn.label}
              </a>
            )}
            <span className="text-[11px] text-faint">
              Table:{" "}
              <code className="font-mono">{SCHEMA_HINT[challenge.dataset]}</code>
            </span>
          </div>

          {/* verdict */}
          {verdict === "pass" && (
            <div className="mt-4 rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-4">
              <p className="text-sm font-semibold text-emerald-300">
                ✓ Case cracked — your result set matches the reference exactly.
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">{challenge.explain}</p>
              {chIdx < SQL_CHALLENGES.length - 1 ? (
                <button
                  onClick={() => pick(chIdx + 1)}
                  className="mt-3 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
                >
                  Next scenario →
                </button>
              ) : (
                <p className="mt-3 text-xs font-semibold text-emerald-300">
                  🏆 All scenarios solved — you&apos;re ready for real data.
                </p>
              )}
            </div>
          )}
          {verdict === "fail" && (
            <div className="mt-4 rounded-lg border border-amber-400/40 bg-amber-400/10 p-4">
              <p className="text-sm font-semibold text-amber-300">
                Not quite — expected {expectedCount} row
                {expectedCount === 1 ? "" : "s"}.
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Check your WHERE filters, aggregation and ordering. The hint
                above points at the pattern.
              </p>
            </div>
          )}
          {err && (
            <p className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 p-3 font-mono text-xs text-red-300">
              {err}
            </p>
          )}

          {/* results */}
          {result && result.values.length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-2/60 text-left text-[10px] uppercase tracking-wide text-muted">
                    {result.columns.map((c) => (
                      <th key={c} className="px-3 py-2 font-medium">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {result.values.slice(0, 50).map((r, i) => (
                    <tr key={i} className="hover:bg-surface-2/40">
                      {r.map((v, j) => (
                        <td key={j} className="px-3 py-1.5 font-mono text-muted">
                          {String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.values.length > 50 && (
                <p className="border-t border-line px-3 py-2 text-[11px] text-faint">
                  Showing 50 of {result.values.length} rows
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
