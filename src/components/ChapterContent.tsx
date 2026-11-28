import { glossary } from "@/lib/content";

// inline markdown: **bold**, `code`, *italic* + glossary term popovers

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const TERM_RE = new RegExp(
  glossary
    .map((g) => escapeRe(g.term).replace(/ /g, "\\s+"))
    .sort((a, b) => b.length - a.length)
    .join("|"),
  "gi"
);
const DEF = new Map(glossary.map((g) => [g.term.toLowerCase(), g.definition]));
const BOUND = /[A-Za-z0-9_]/;

function termNodes(text: string, keyBase: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let k = keyBase;
  TERM_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TERM_RE.exec(text))) {
    const start = m.index;
    const end = start + m[0].length;
    const before = start > 0 ? text[start - 1] : "";
    const after = end < text.length ? text[end] : "";
    if (BOUND.test(before) || BOUND.test(after)) continue;
    const def = DEF.get(m[0].toLowerCase().replace(/\s+/g, " "));
    if (!def) continue;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <span key={k++} className="group relative inline">
        <button
          type="button"
          className="cursor-help border-b border-dotted border-emerald-400/60 font-medium text-emerald-300 underline-offset-2 hover:text-emerald-200"
        >
          {m[0]}
        </button>
        <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-64 -translate-x-1/2 rounded-xl border border-line bg-surface-2 p-3 text-left text-xs font-normal normal-case leading-5 text-body shadow-xl group-hover:block group-focus-within:block">
          {def}
          <span className="mt-1.5 block text-[10px] text-muted">Tap glossary for more →</span>
        </span>
      </span>
    );
    last = end;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function inline(text: string, k0 = 0): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = k0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(...termNodes(text.slice(last, m.index), k));
    k += 100;
    const tok = m[0];
    if (tok.startsWith("**")) {
      nodes.push(
        <strong key={k++} className="font-semibold text-ink">
          {tok.slice(2, -2)}
        </strong>
      );
    } else if (tok.startsWith("`")) {
      nodes.push(
        <code
          key={k++}
          className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[0.85em] text-emerald-300"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(<em key={k++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(...termNodes(text.slice(last), k));
  return nodes;
}

const CALLOUT_STYLES: Record<string, { label: string; cls: string; chip: string }> = {
  "exam trap": {
    label: "Exam trap",
    cls: "border-amber-400/40 bg-amber-400/5",
    chip: "bg-amber-400/15 text-amber-300",
  },
  "common mistake": {
    label: "Common mistake",
    cls: "border-red-400/40 bg-red-400/5",
    chip: "bg-red-400/15 text-red-300",
  },
  "why it matters": {
    label: "Why it matters",
    cls: "border-sky-400/40 bg-sky-400/5",
    chip: "bg-sky-400/15 text-sky-300",
  },
  "field note": {
    label: "Field note",
    cls: "border-violet-400/40 bg-violet-400/5",
    chip: "bg-violet-400/15 text-violet-300",
  },
  "pro tip": {
    label: "Pro tip",
    cls: "border-emerald-400/40 bg-emerald-400/5",
    chip: "bg-emerald-400/15 text-emerald-300",
  },
  "remember": {
    label: "Remember",
    cls: "border-line bg-surface/60",
    chip: "bg-surface-2 text-muted",
  },
};

function Callout({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^>\s?/, "").trim())
    .filter(Boolean);
  const first = lines[0] ?? "";
  const m = first.match(/^\*\*([^*]+):?\*\*\s*(.*)$/);
  const labelKey = m ? m[1].trim().toLowerCase() : "";
  const style = CALLOUT_STYLES[labelKey];
  const bodyLines = style ? [m![2], ...lines.slice(1)] : lines;
  return (
    <div className={`rounded-xl border p-4 ${style?.cls ?? "border-line bg-surface/50"}`}>
      {style && (
        <span
          className={`mb-2 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest ${style.chip}`}
        >
          {style.label}
        </span>
      )}
      <div className="space-y-1.5 text-sm leading-6 text-body">
        {bodyLines.filter(Boolean).map((l, j) => (
          <p key={j}>{inline(l)}</p>
        ))}
      </div>
    </div>
  );
}

const RECAP_RE = /takeaways|what to take/i;

export default function ChapterContent({ markdown }: { markdown: string }) {
  // strip a leading "# Title" — the page already renders the chapter title
  const body = markdown.replace(/^#\s+[^\n]+\n+/, "");
  const raw = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let recap = false;

  while (i < raw.length) {
    const text = raw[i];
    if (text.startsWith("> ")) {
      blocks.push(<Callout key={key++} text={text} />);
      i++;
      continue;
    }
    if (text.startsWith("- ")) {
      const items: string[] = [];
      while (i < raw.length && raw[i].startsWith("- ")) {
        for (const l of raw[i].split("\n")) {
          const t = l.replace(/^- /, "").trim();
          if (t) items.push(t);
        }
        i++;
      }
      const list = (
        <ul className="list-disc space-y-1.5 pl-6 text-body">
          {items.map((it, j) => (
            <li key={j} className="leading-7">
              {inline(it)}
            </li>
          ))}
        </ul>
      );
      blocks.push(
        recap ? (
          <div
            key={key++}
            className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-5"
          >
            <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              Recap
            </p>
            {list}
          </div>
        ) : (
          <div key={key++}>{list}</div>
        )
      );
      continue;
    }
    if (text.startsWith("### ")) {
      recap = false;
      blocks.push(
        <h3 key={key++} className="pt-4 font-mono text-sm font-semibold text-emerald-300">
          {inline(text.slice(4))}
        </h3>
      );
    } else if (text.startsWith("## ")) {
      const heading = text.slice(3);
      recap = RECAP_RE.test(heading);
      blocks.push(
        recap ? (
          <p
            key={key++}
            className="pt-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400"
          >
            {inline(heading)}
          </p>
        ) : (
          <h2 key={key++} className="pt-2 text-lg font-semibold text-ink">
            {inline(heading)}
          </h2>
        )
      );
    } else {
      recap = false;
      blocks.push(
        <p key={key++} className="leading-8 text-body">
          {inline(text)}
        </p>
      );
    }
    i++;
  }

  return <div className="space-y-4">{blocks}</div>;
}
