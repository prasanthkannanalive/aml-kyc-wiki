"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { animate, stagger } from "animejs";
import { t, type Lang } from "@/lib/i18n-dict";

gsap.registerPlugin(MotionPathPlugin);

const STAGES = [
  {
    key: "placement",
    title: "Placement",
    desc: "Dirty money enters the financial system — smurfing, shell accounts, cash deposits, trade invoices.",
  },
  {
    key: "layering",
    title: "Layering",
    desc: "Transactions shatter the audit trail — wires, trades, crypto hops and front companies move value across borders.",
  },
  {
    key: "integration",
    title: "Integration",
    desc: "Clean-looking money rejoins the economy — property, luxury assets, invoices and 'legitimate' investments.",
  },
];

const DUR = 2.2; // seconds per stage

export default function LaunderingFlow({ lang }: { lang: Lang }) {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // anime.js — gentle staggered "breathe" on the stage icons
    const anim = animate(el.querySelectorAll(".flow-icon"), {
      scale: [1, 1.12, 1],
      duration: 2200,
      delay: stagger(240),
      loop: true,
      ease: "easeInOut",
    });

    // GSAP — travelling dots along the flow path + synced stage activation
    const dots = gsap.utils.toArray<SVGCircleElement>(".flow-dot", el);
    dots.forEach((d, i) => {
      gsap.to(d, {
        motionPath: {
          path: "#flow-path",
          align: "#flow-path",
          alignOrigin: [0.5, 0.5],
        },
        duration: DUR * 3,
        repeat: -1,
        ease: "none",
        delay: (DUR * 3 * i) / dots.length,
      });
    });

    const setActive = (i: number) => {
      cards.current.forEach((c, j) =>
        c?.classList.toggle("flow-active", j === i)
      );
    };
    const tl = gsap.timeline({ repeat: -1, defaults: { duration: DUR } });
    tl.call(() => setActive(0))
      .call(() => setActive(1), undefined, DUR)
      .call(() => setActive(2), undefined, DUR * 2)
      .to({}, { duration: DUR }); // hold on last stage

    return () => {
      anim?.pause?.();
      tl.kill();
      gsap.killTweensOf(dots);
    };
  }, []);

  return (
    <div ref={root}>
      <div className="grid gap-4 md:grid-cols-3">
        {STAGES.map((s, i) => (
          <div
            key={s.key}
            ref={(n) => {
              cards.current[i] = n;
            }}
            className="flow-card rounded-2xl border border-line bg-surface/60 p-5 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <span className="flow-icon flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-bold text-emerald-400">
                {i + 1}
              </span>
              <h3 className="font-semibold text-ink">{s.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* animated flow diagram */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface/40 px-2 py-6">
        <svg viewBox="0 0 800 90" className="h-24 w-full" fill="none">
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#34d399" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#34d399" stopOpacity="0.9" />
              <stop offset="1" stopColor="#34d399" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            id="flow-path"
            d="M 20 45 C 140 10, 240 80, 380 45 S 620 10, 780 45"
            stroke="url(#flowGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
          />
          <circle className="flow-dot" r="5" fill="#34d399" opacity="0.95" />
          <circle className="flow-dot" r="4" fill="#6ee7b7" opacity="0.7" />
          <circle className="flow-dot" r="3.5" fill="#a7f3d0" opacity="0.5" />
        </svg>
        <div className="flex justify-between px-4 pb-2 text-[11px] uppercase tracking-widest text-faint">
          <span>Criminal proceeds</span>
          <span>Laundered funds</span>
        </div>
      </div>

      <Link
        href="/courses/fraud-prevention/chapters/1.1"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
      >
        {t(lang, "concept.cta")} →
      </Link>
    </div>
  );
}
