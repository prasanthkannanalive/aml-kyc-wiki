// Stable key for a quiz question — derived from its text so the same
// question maps to the same key across module checks, mocks and review.
export function quizKey(q: string): string {
  const s = q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = (Math.imul(h2, 31) + c) >>> 0;
  }
  return `q${h1.toString(36)}${h2.toString(36)}`;
}
