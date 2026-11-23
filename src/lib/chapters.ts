import fs from "node:fs";
import path from "node:path";
import { getCourse, totalChapters, type Course } from "@/lib/content";

export interface ChapterMeta {
  num: string;
  title: string;
  moduleNum?: number;
  moduleTitle?: string;
  file: string;
  startPage?: number;
  endPage?: number;
}

interface ManifestEntry {
  num: string;
  file: string;
  startPage?: number;
  endPage?: number;
}

const chaptersRoot = path.join(process.cwd(), "content", "chapters");

function readManifest(slug: string): ManifestEntry[] {
  try {
    const raw = fs.readFileSync(
      path.join(chaptersRoot, "manifest.json"),
      "utf8"
    );
    return (JSON.parse(raw) as Record<string, ManifestEntry[]>)[slug] ?? [];
  } catch {
    return [];
  }
}

function chapterTitle(course: Course, num: string): string {
  if (num === "0.0") return "Introduction & how to use this guide";
  for (const m of course.modules) {
    const ch = m.chapters.find((c) => c.num === num);
    if (ch) return ch.title;
  }
  return num;
}

function moduleInfo(course: Course, num: string) {
  if (num === "0.0") return { moduleNum: 0, moduleTitle: "Front matter" };
  const major = num.split(".")[0];
  const m = course.modules.find((mod) => String(mod.num) === major);
  return m ? { moduleNum: m.num, moduleTitle: m.title } : {};
}

/** All readable chapters for a course, in order (0.0 intro first). */
export function listChapters(slug: string): ChapterMeta[] {
  const course = getCourse(slug);
  if (!course) return [];
  return readManifest(slug).map((e) => ({
    num: e.num,
    title: chapterTitle(course, e.num),
    file: e.file,
    startPage: e.startPage,
    endPage: e.endPage,
    ...moduleInfo(course, e.num),
  }));
}

export function getChapter(slug: string, num: string): ChapterMeta | undefined {
  return listChapters(slug).find((c) => c.num === num);
}

export function readChapterBody(slug: string, num: string): string | null {
  const meta = getChapter(slug, num);
  if (!meta) return null;
  try {
    return fs.readFileSync(
      path.join(chaptersRoot, slug, meta.file),
      "utf8"
    );
  } catch {
    return null;
  }
}

export function estimateMins(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export { totalChapters };
