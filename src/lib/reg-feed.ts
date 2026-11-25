// Regulatory news feed — pulls FATF / FinCEN / AML headlines via Google News
// RSS, cached in-memory. Falls back to curated items if feeds are unreachable.

export interface FeedItem {
  title: string;
  link: string;
  source: string;
  date: string;
}

const QUERIES = [
  "FATF money laundering",
  "FinCEN AML sanctions",
  "EU AMLA anti-money laundering",
];

const FALLBACK: FeedItem[] = [
  {
    title: "FATF publishes updated mutual evaluation methodology",
    link: "https://www.fatf-gafi.org",
    source: "FATF",
    date: new Date().toISOString(),
  },
  {
    title: "AML authorities increase scrutiny of crypto travel rule compliance",
    link: "https://www.fatf-gafi.org",
    source: "FATF",
    date: new Date().toISOString(),
  },
];

let cache: { at: number; items: FeedItem[] } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function parseRss(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) && items.length < 40) {
    const block = m[1];
    const title = /<title>([\s\S]*?)<\/title>/.exec(block)?.[1];
    const link = /<link>([\s\S]*?)<\/link>/.exec(block)?.[1];
    const pub = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(block)?.[1];
    const src = /<source[^>]*>([\s\S]*?)<\/source>/.exec(block)?.[1];
    if (title && link) {
      items.push({
        title: decode(title).trim(),
        link: decode(link).trim(),
        source: src ? decode(src).trim() : "News",
        date: pub ? decode(pub).trim() : "",
      });
    }
  }
  return items;
}

export async function getRegFeed(): Promise<FeedItem[]> {
  if (cache && Date.now() - cache.at < TTL) return cache.items;
  try {
    const results = await Promise.allSettled(
      QUERIES.map(async (q) => {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
        const res = await fetch(url, {
          headers: { "User-Agent": "aml-kyc-wiki/1.0" },
          signal: AbortSignal.timeout(8000),
          next: { revalidate: 3600 },
        } as RequestInit);
        if (!res.ok) throw new Error("feed error");
        return parseRss(await res.text());
      })
    );
    const items = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, 12);
    if (items.length === 0) throw new Error("empty feed");
    cache = { at: Date.now(), items };
    return items;
  } catch {
    return FALLBACK;
  }
}
