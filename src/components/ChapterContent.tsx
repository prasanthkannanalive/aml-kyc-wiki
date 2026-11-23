// inline markdown: **bold**, `code`, *italic*
function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
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
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ChapterContent({ markdown }: { markdown: string }) {
  // strip a leading "# Title" — the page already renders the chapter title
  const body = markdown.replace(/^#\s+[^\n]+\n+/, "");
  const raw = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < raw.length) {
    const text = raw[i];
    if (text.startsWith("- ")) {
      const items: string[] = [];
      while (i < raw.length && raw[i].startsWith("- ")) {
        for (const l of raw[i].split("\n")) {
          const t = l.replace(/^- /, "").trim();
          if (t) items.push(t);
        }
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc space-y-1.5 pl-6 text-body">
          {items.map((it, j) => (
            <li key={j} className="leading-7">
              {inline(it)}
            </li>
          ))}
        </ul>
      );
      continue;
    }
    if (text.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="pt-4 font-mono text-sm font-semibold text-emerald-300">
          {inline(text.slice(4))}
        </h3>
      );
    } else if (text.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="pt-2 text-lg font-semibold text-ink">
          {inline(text.slice(3))}
        </h2>
      );
    } else {
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
