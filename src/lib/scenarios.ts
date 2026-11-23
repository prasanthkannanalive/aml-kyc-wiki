import fs from "node:fs";
import path from "node:path";

export interface Scenario {
  title: string;
  situation: string;
  question: string;
  answer: string;
}

const root = path.join(process.cwd(), "content", "scenarios.json");

let cache: Record<string, Record<string, Scenario[]>> | null = null;

function load(): Record<string, Record<string, Scenario[]>> {
  if (cache) return cache;
  let data: Record<string, Record<string, Scenario[]>> = {};
  try {
    data = JSON.parse(fs.readFileSync(root, "utf8"));
  } catch {
    // missing file → no scenarios
  }
  cache = data;
  return data;
}

export function getScenarios(slug: string, num: string): Scenario[] {
  return load()[slug]?.[num] ?? [];
}
