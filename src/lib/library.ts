import fs from "node:fs";
import path from "node:path";

export interface LibraryItem {
  file: string;
  title: string;
  description: string;
  category: string;
  sizeKb: number;
  source?: string;
}

interface LibraryMeta {
  title?: string;
  description?: string;
  category?: string;
  source?: string;
}

const resourcesDir = path.join(process.cwd(), "public", "resources");
const metaPath = path.join(process.cwd(), "content", "library.json");

function readMeta(): Record<string, LibraryMeta> {
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } catch {
    return {};
  }
}

function autoTitle(file: string): string {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/\.coredownload(\.inline)?$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** All downloadable resources — scans public/resources live, so new PDFs appear automatically. */
export function listLibrary(): LibraryItem[] {
  const meta = readMeta();
  let files: string[] = [];
  try {
    files = fs.readdirSync(resourcesDir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  } catch {
    return [];
  }
  return files
    .map((file) => {
      const m = meta[file] ?? {};
      const stat = fs.statSync(path.join(resourcesDir, file));
      return {
        file,
        title: m.title ?? autoTitle(file),
        description: m.description ?? "Source document from the AML/KYC knowledge base.",
        category: m.category ?? "Reference",
        sizeKb: Math.round(stat.size / 1024),
        source: m.source,
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
}

export function libraryCategories(items: LibraryItem[]): string[] {
  return [...new Set(items.map((i) => i.category))].sort();
}

export interface LibraryLink {
  title: string;
  description: string;
  category: string;
  url: string;
}

const linksPath = path.join(process.cwd(), "content", "library-links.json");

/** External guidance pages that can't be hosted as local PDFs. */
export function listLibraryLinks(): LibraryLink[] {
  try {
    return JSON.parse(fs.readFileSync(linksPath, "utf8"));
  } catch {
    return [];
  }
}
