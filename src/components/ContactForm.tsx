"use client";

import { useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "prasanthkannanlive@gmail.com";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[AML/KYC Wiki] ${form.topic}`)}&body=${body}`;
    setSent(true);
  };

  const input =
    "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder-faint outline-none transition-colors focus:border-emerald-400";
  const label = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} placeholder="Your name" />
          </label>
          <label className="block">
            <span className={label}>Email</span>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} placeholder="you@company.com" />
          </label>
        </div>
        <label className="block">
          <span className={label}>Topic</span>
          <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={input}>
            <option>General question</option>
            <option>Billing & subscriptions</option>
            <option>Team / enterprise enquiry</option>
            <option>Technical support</option>
            <option>Content correction</option>
            <option>Partnership</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>Message</span>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={input}
            placeholder="How can we help?"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-300"
        >
          Send message
        </button>
        {sent && (
          <p className="text-sm text-emerald-300">
            Your email app should open with the message pre-filled — hit send there to deliver it.
          </p>
        )}
      </form>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-line bg-surface/60 p-5">
          <h3 className="text-sm font-semibold text-ink">Direct email</h3>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block break-all font-mono text-sm text-emerald-400 hover:underline">
            {CONTACT_EMAIL}
          </a>
          <p className="mt-2 text-xs leading-5 text-muted">
            For billing issues, enterprise sales, technical support or content corrections.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface/60 p-5">
          <h3 className="text-sm font-semibold text-ink">Common questions</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-muted">
            <li>· Plans &amp; billing → <Link href="/pricing" className="text-emerald-400 hover:underline">Pricing</Link></li>
            <li>· Data &amp; privacy → <Link href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link></li>
            <li>· Account deletion → <Link href="/profile" className="text-emerald-400 hover:underline">Profile page</Link></li>
            <li>· Find an answer → <Link href="/search" className="text-emerald-400 hover:underline">Search the knowledge base</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
