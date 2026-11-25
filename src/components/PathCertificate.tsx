"use client";

import { useState, useSyncExternalStore } from "react";
export interface PathCourse {
  slug: string;
  title: string;
  code: string;
}

// Re-checks localStorage whenever exam/cert events fire or storage changes.
function subscribe(cb: () => void) {
  window.addEventListener("aml-exam-pass", cb);
  window.addEventListener("aml-cert-issued", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("aml-exam-pass", cb);
    window.removeEventListener("aml-cert-issued", cb);
    window.removeEventListener("storage", cb);
  };
}

export default function PathCertificate({
  pathTitle,
  courses,
  totalChapters,
}: {
  pathTitle: string;
  courses: PathCourse[];
  totalChapters: number;
}) {
  // courses[i].done / certId read from localStorage
  const snap = useSyncExternalStore(
    subscribe,
    () =>
      courses
        .map((c) => ({
          slug: c.slug,
          title: c.title,
          code: c.code,
          passed: (() => {
            try {
              return localStorage.getItem(`aml-kyc-final-exam:${c.slug}`) === "passed";
            } catch {
              return false;
            }
          })(),
          certId: (() => {
            try {
              return localStorage.getItem(`aml-cert:${c.slug}`) ?? "";
            } catch {
              return "";
            }
          })(),
        })),
    () => courses.map((c) => ({ slug: c.slug, title: c.title, code: c.code, passed: false, certId: "" }))
  );

  const [name, setName] = useState("");
  const doneCount = snap.filter((c) => c.passed).length;
  const allDone = doneCount === courses.length;

  return (
    <div className="rounded-2xl border border-line bg-surface/50 p-6">
      <h3 className="text-sm font-semibold text-ink">Path certificate</h3>
      <p className="mt-1 text-xs leading-5 text-muted">
        Pass the final exam in every course on this path to unlock a printable
        certificate naming the whole path. Each course also issues its own
        verifiable certificate.
      </p>

      <div className="mt-4 space-y-1.5">
        {snap.map((c) => (
          <div key={c.slug} className="flex items-center justify-between rounded-lg border border-line/60 bg-background/40 px-3 py-2 text-xs">
            <span className="font-medium text-ink">{c.title}</span>
            <span className="flex items-center gap-2">
              {c.passed ? (
                c.certId ? (
                  <a href={`/verify/${c.certId}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-400 hover:underline">
                    ✓ cert
                  </a>
                ) : (
                  <span className="font-semibold text-emerald-400">✓ passed</span>
                )
              ) : (
                <span className="text-faint">not passed</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {allDone && (
        <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-5 print:border-0 print:bg-transparent">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Certificate of completion
          </p>
          <p className="mt-2 text-sm text-muted">This certifies that</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full rounded-lg border border-line bg-background/60 px-3 py-2 text-center font-serif text-xl text-ink placeholder:text-faint print:border-0 print:bg-transparent"
          />
          <p className="mt-2 text-sm text-muted">has completed the learning path</p>
          <p className="mt-1 text-lg font-bold text-ink">{pathTitle}</p>
          <p className="mt-1 text-xs text-muted">
            {courses.length} courses · {totalChapters} chapters · all final exams passed
          </p>
          <div className="mt-4 flex gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-300"
            >
              Print / save PDF
            </button>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-faint print:block">
            Issued by AML/KYC Wiki · {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
            Course-completion credential — not an accredited qualification.
          </p>
        </div>
      )}
    </div>
  );
}
