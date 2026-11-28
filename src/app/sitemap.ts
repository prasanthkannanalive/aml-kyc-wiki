import type { MetadataRoute } from "next";
import { courses } from "@/lib/content";
import { enforcementCases } from "@/lib/cases";
import { listChapters } from "@/lib/chapters";
import { disciplines } from "@/lib/disciplines";
import { news, research } from "@/lib/editorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aml-kyc-wiki.vercel.app";
  const routes: MetadataRoute.Sitemap = [
    "",
    "/courses",
    "/paths",
    "/training",
    "/cases",
    "/regulators",
    "/stack",
    "/interview-prep",
    "/leaderboard",
    "/glossary",
    "/disciplines",
    "/playground",
    "/cheatsheets",
    "/typologies",
    "/banking",
    "/walkthrough",
    "/sandbox",
    "/exams",
    "/review",
    "/labs",
    "/teams",
    "/sar-writer",
    "/doc-spotter",
    "/filing",
    "/tools",
    "/job-simulation",
    "/careers",
    "/resources",
    "/library",
    "/arcade",
    "/challenge",
    "/tech",
    "/about",
    "/privacy",
    "/terms",
    "/pricing",
    "/contact",
    "/news",
    "/research",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  for (const d of disciplines) {
    routes.push({
      url: `${base}/disciplines/${d.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const c of courses) {
    routes.push({
      url: `${base}/courses/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    routes.push({
      url: `${base}/training/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const ch of listChapters(c.slug)) {
      routes.push({
        url: `${base}/courses/${c.slug}/chapters/${ch.num}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const c of enforcementCases) {
    routes.push({
      url: `${base}/cases/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const a of news) {
    routes.push({
      url: `${base}/news/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const a of research) {
    routes.push({
      url: `${base}/research/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  return routes;
}
