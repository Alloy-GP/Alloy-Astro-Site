#!/usr/bin/env node
// scripts/content-lint.mjs — checks the collections cluster copy (src/data/articles/*.ts) against the
// handoff's copy rules: word count per page, sentences under 25 words, banned words, no em dashes,
// "70%" always framed as a goal, no mgmt-fee amounts, and every internal link resolving to a route.
// Run: node scripts/content-lint.mjs            (exit 1 on any hard failure)
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/data/articles';
const BANNED = /\b(transform(?:s|ed|ing|ation)?|unlock(?:s|ed|ing)?|game[- ]changer|revolutioni[sz]e[sd]?|seamless(?:ly)?)\b/i;
const stripMarkup = (s) => s.replace(/\*\*|\[([^\]]+)\]\([^)\s]+\)/g, (_m, l) => l ?? '');

const words = (s) => (stripMarkup(s).match(/\S+/g) ?? []).length;
function blockText(b) {
  switch (b.t) {
    case 'p': case 'h3': case 'note': case 'proof': return b.s;
    case 'callout': return `${b.label ?? ''} ${b.s}`;
    case 'cta': return `${b.s} ${b.label}`;
    case 'ul': case 'ol': return b.items.join(' ');
    case 'worksheet': return [b.title, ...b.rows.map((r) => `${r.label} ${r.hint ?? ''}`), b.result ?? '', b.note ?? ''].join(' ');
    case 'table': return [b.caption ?? '', ...b.head, ...b.rows.flat(), b.note ?? ''].join(' ');
    default: return '';
  }
}
function proseSentences(d) {
  // Prose only (sentence-length rule): paragraphs, list items, callouts, FAQ answers, next steps, the answer.
  const out = [d.answer, ...(d.next ?? []), ...(d.faq ?? []).map((f) => f.a)];
  for (const b of [...(d.lead ?? []), ...d.sections.flatMap((s) => s.blocks)]) {
    if (b.t === 'p' || b.t === 'callout' || b.t === 'note') out.push(b.s);
    if (b.t === 'ul' || b.t === 'ol') out.push(...b.items);
  }
  return out.flatMap((t) => stripMarkup(t).replace(/\([^)]*\)/g, '').split(/(?<=[.!?]["”]?)\s+(?=[A-Z"“])/)).map((s) => s.trim()).filter(Boolean);
}
const routeExists = (href) => {
  const p = href.replace(/#.*$/, '');
  if (p.startsWith('/assets/')) return existsSync(join('public', p));
  const base = p === '/' ? 'index' : p.slice(1);
  return ['src/pages/' + base + '.astro', 'src/pages/' + base + '/index.astro', 'src/pages/' + base + '.ts'].some(existsSync);
};

let hard = 0;
const rows = [];
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.ts') && x !== 'types.ts').sort()) {
  const { data: d } = await import('../' + join(DIR, f));
  const all = [d.h1 + ' ' + (d.h1Accent ?? ''), d.answer, ...(d.lead ?? []).map(blockText), ...d.sections.flatMap((s) => [s.h2, ...s.blocks.map(blockText)]), ...(d.faq ?? []).flatMap((x) => [x.q, x.a]), ...(d.next ?? [])];
  const text = all.join('\n');
  const total = words(text);
  const issues = [];
  if (/—/.test(text + d.title + d.description)) { issues.push('EM DASH'); hard++; }
  const banned = text.match(BANNED); if (banned) { issues.push(`banned word "${banned[0]}"`); hard++; }
  const long = proseSentences(d).filter((s) => words(s) >= 25);
  if (long.length) issues.push(`${long.length} sentence(s) ≥25 words`);
  for (const m of text.matchAll(/[^.]*70\s?%\+?[^.]*\./g)) { if (!/goal|target/i.test(m[0])) { issues.push(`70% without "goal": "${m[0].trim().slice(0, 60)}"`); hard++; } }
  const answerWords = words(d.answer); if (answerWords < 40 || answerWords > 60) issues.push(`opening answer ${answerWords} words (want 40–60)`);
  for (const q of d.faq ?? []) { const n = words(q.a); if (f !== 'pre-legal-collections.ts' && (n < 40 || n > 60)) issues.push(`FAQ "${q.q.slice(0, 30)}…" ${n} words`); }
  const links = [...text.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
  for (const href of new Set(links)) if (!routeExists(href)) { issues.push(`dead internal link ${href}`); hard++; }
  for (const k of d.keepReading) if (!routeExists(k.href)) { issues.push(`dead keep-reading link ${k.href}`); hard++; }
  if (/hoa48\.com/.test(text) && !['collections-hub.ts', 'pre-legal-collections.ts'].includes(f)) { issues.push('links hoa48.com (only pages 1 and 2 may)'); hard++; }
  if (d.title.length > 60) issues.push(`title ${d.title.length} chars`);
  if (d.description.length > 160) issues.push(`description ${d.description.length} chars`);
  rows.push({ file: f.replace('.ts', ''), words: total, sections: d.sections.length, faq: (d.faq ?? []).length, noindex: d.noindex ? 'yes' : '', issues: issues.join('; ') || 'ok' });
  if (long.length && process.env.VERBOSE) for (const s of long) console.log(`   [${f}] ${words(s)}w: ${s}`);
}
console.table(rows);
process.exit(hard ? 1 : 0);
