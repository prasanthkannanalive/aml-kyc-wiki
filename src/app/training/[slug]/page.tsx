import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse } from "@/lib/content";
import { listChapters, readChapterBody } from "@/lib/chapters";
import { getScenarios } from "@/lib/scenarios";
import { getSessionUser } from "@/lib/auth";
import { getProgress } from "@/lib/db";
import { getLang } from "@/lib/i18n";
import TrainingPlayer from "@/components/TrainingPlayer";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  // the player renders the same chapter text as the course chapter pages — keep it out of the index
  return c
    ? {
        title: `Training: ${c.title}`,
        robots: { index: false, follow: true },
      }
    : {};
}

export default async function TrainingSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const metas = listChapters(slug);
  const chapters = metas
    .map((m) => ({
      num: m.num,
      title: m.title,
      moduleNum: m.moduleNum,
      moduleTitle: m.moduleTitle,
      startPage: m.startPage,
      endPage: m.endPage,
      body: readChapterBody(slug, m.num) ?? "",
      scenarios: getScenarios(slug, m.num),
    }))
    .filter((c) => c.body.length > 0);

  const user = await getSessionUser();
  const lang = await getLang();
  const progress = user ? await getProgress(user.id) : {};
  const done = Object.keys(progress)
    .filter((k) => k.startsWith(`done:${slug}/`))
    .map((k) => k.slice(`done:${slug}/`.length));

  // resume at first incomplete chapter
  const firstOpen = chapters.find((c) => !done.includes(c.num)) ?? chapters[0];

  return (
    <TrainingPlayer
      course={{
        slug: course.slug,
        code: course.code,
        title: course.title,
        tagline: course.tagline,
        provider: course.provider,
        level: course.level,
      }}
      chapters={chapters}
      doneChapters={done}
      startNum={firstOpen?.num ?? chapters[0]?.num}
      lang={lang}
    />
  );
}
