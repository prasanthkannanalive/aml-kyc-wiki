"use client";

import { useState } from "react";
import Link from "next/link";

const AIRTM_URL = "https://airtm.me/prasanth36zqf2vg";
// Set to the owner's UPI ID (e.g. name@okhdfcbank) to enable India payments.
const UPI_ID = "";
const UPI_MONTHLY_INR = 999;
const UPI_YEARLY_INR = 7999;

function upiLink(amountInr: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: "AML/KYC Wiki Pro",
    am: String(amountInr),
    cu: "INR",
    tn: `Pro ${amountInr === UPI_MONTHLY_INR ? "monthly" : "yearly"}`,
  });
  return `upi://pay?${params.toString()}`;
}

export default function ProCheckout() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<
    "idle" | "busy" | "done" | "error" | "auth"
  >("idle");
  const [msg, setMsg] = useState("");

  const redeem = async () => {
    if (!code.trim() || state === "busy") return;
    setState("busy");
    setMsg("");
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const j = await res.json();
      if (res.status === 401) {
        setState("auth");
        setMsg("Sign in first — codes attach to your account.");
        return;
      }
      if (!j?.ok) {
        setState("error");
        setMsg(j?.error ?? "Redemption failed — check the code.");
        return;
      }
      setState("done");
      setMsg("Pro activated — welcome aboard.");
    } catch {
      setState("error");
      setMsg("Network error — try again.");
    }
  };

  return (
    <div
      id="get-pro"
      className="mt-10 scroll-mt-24 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/10 to-transparent p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-ink">Get Pro with Airtm</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Pro is <span className="font-semibold text-ink">$12/month</span> or{" "}
        <span className="font-semibold text-ink">$96/year</span> (save 33%).
        Pay in crypto via Airtm — we&apos;ll activate your account and send a
        one-time redeem code within 24 hours.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={AIRTM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
        >
          Pay with Airtm →
        </a>
        <span className="text-xs text-faint">
          airtm.me/prasanth36zqf2vg · include your account email as the note
        </span>
      </div>

      {UPI_ID && (
        <div className="mt-5 rounded-xl border border-line bg-surface/60 p-4">
          <p className="text-sm font-semibold text-ink">
            Pay via UPI — India
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            ₹{UPI_MONTHLY_INR.toLocaleString("en-IN")}/month or ₹
            {UPI_YEARLY_INR.toLocaleString("en-IN")}/year. Pay from any UPI app
            (GPay, PhonePe, Paytm, BHIM) to{" "}
            <span className="font-mono font-semibold text-emerald-300">
              {UPI_ID}
            </span>{" "}
            — include your account email as the note, then redeem your code
            below.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={upiLink(UPI_MONTHLY_INR)}
              className="rounded-lg border border-emerald-400/50 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20"
            >
              Pay ₹{UPI_MONTHLY_INR.toLocaleString("en-IN")} monthly
            </a>
            <a
              href={upiLink(UPI_YEARLY_INR)}
              className="rounded-lg border border-emerald-400/50 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20"
            >
              Pay ₹{UPI_YEARLY_INR.toLocaleString("en-IN")} yearly
            </a>
          </div>
        </div>
      )}

      <div className="mt-6 border-t border-line/60 pt-5">
        <p className="text-sm font-semibold text-ink">Have a code?</p>
        <p className="mt-1 text-xs text-muted">
          Redeem it on your signed-in account to activate Pro instantly.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="PRO-XXXX-XXXX"
            maxLength={13}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 font-mono text-sm tracking-wider text-ink placeholder:text-faint focus:border-emerald-400/60 focus:outline-none sm:max-w-xs"
          />
          <button
            onClick={redeem}
            disabled={state === "busy" || !code.trim()}
            className="rounded-lg border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/20 disabled:opacity-40"
          >
            {state === "busy" ? "Redeeming…" : "Redeem code"}
          </button>
        </div>
        {msg && (
          <p
            className={`mt-2 text-xs ${
              state === "done" ? "text-emerald-300" : "text-red-400"
            }`}
          >
            {msg}
            {state === "auth" && (
              <>
                {" "}
                <Link href="/login" className="underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
