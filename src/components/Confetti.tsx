"use client";

import { useEffect, useState } from "react";

const COLORS = ["#34d399", "#6ee7b7", "#fbbf24", "#f472b6", "#60a5fa", "#a78bfa", "#f87171"];

export default function Confetti({ fire }: { fire: number }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; dur: number; color: string; size: number; round: boolean }[]>([]);

  useEffect(() => {
    if (!fire) return;
    const arr = Array.from({ length: 60 }, (_, i) => ({
      id: fire * 1000 + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 1.8,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 7,
      round: Math.random() > 0.6,
    }));
    const t0 = setTimeout(() => setPieces(arr), 0);
    const t = setTimeout(() => setPieces([]), 5000);
    return () => { clearTimeout(t0); clearTimeout(t); };
  }, [fire]);

  if (!pieces.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
