"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts up to `to` when scrolled into view (no animation-lib dependency). */
export default function AnimatedCounter({
  to,
  format = "plain",
}: {
  to: number;
  format?: "plain" | "locale";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    started.current = true;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        setVal(Math.round(easeOut(p) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {format === "locale" ? val.toLocaleString() : val}
    </span>
  );
}
