"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

/**
 * One-shot entrance timeline for the homepage hero.
 * Targets elements marked with .hero-anim-* classes rendered by the page.
 */
export default function HeroIntro() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-anim-badge", { y: 16, opacity: 0, duration: 0.5 })
        .from(".hero-anim-title", { y: 34, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-anim-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-anim-cta", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
        .from(".hero-anim-stat", { y: 20, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  return null;
}
