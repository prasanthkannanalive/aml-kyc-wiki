"use client";

import { useEffect } from "react";

export default function ViewTracker({
  type,
  id,
}: {
  type: "course" | "chapter" | "interview" | "glossary" | "search";
  id: string;
}) {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    }).catch(() => {});
  }, [type, id]);
  return null;
}
