#!/usr/bin/env node
// scripts/gen-policy-outline-pdf.mjs — renders the branded "HOA collection policy: sample outline" PDF
// (public/assets/collections/hoa-collection-policy-outline.pdf) from the outline in
// src/data/articles/collection-policy.ts, so the download and the page never drift.
// Run: node scripts/gen-policy-outline-pdf.mjs   (needs google-chrome; Gotham from public/fonts)
import { readFileSync, writeFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const { data } = await import(resolve(ROOT, 'src/data/articles/collection-policy.ts'));
const section = data.sections.find((s) => s.id === 'sample-outline');
const callout = section.blocks.find((b) => b.t === 'callout');
const items = section.blocks.find((b) => b.t === 'ol').items;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// [label, e.g. examples] → a blank to write on, followed by the label and examples as a muted hint.
const inline = (s) => esc(s).replace(/\[([^\]]+)\]/g, (_m, inner) => `<span class="fill"><span class="blank"></span> <span class="hint">${inner}</span></span>`);
const rows = items.map((it) => {
  const m = it.match(/^\*\*(.+?)\*\*\s*(.*)$/s);
  return { title: m ? m[1] : '', body: m ? m[2] : it };
});
const logo = readFileSync(resolve(ROOT, 'public/assets/alloy-logo-full-color.svg'), 'utf8');
const font = (file) => `file://${resolve(ROOT, 'public/fonts', file)}`;
const PAGE_URL = 'alloygp.co/resources/collections/collection-policy';

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>HOA collection policy: a sample outline | Alloy</title>
<style>
@font-face { font-family: Gotham; font-weight: 400; src: url("${font('Gotham-Book.woff2')}") format("woff2"); }
@font-face { font-family: Gotham; font-weight: 500; src: url("${font('Gotham-Medium.woff2')}") format("woff2"); }
@font-face { font-family: Gotham; font-weight: 700; src: url("${font('Gotham-Bold.woff2')}") format("woff2"); }
@font-face { font-family: Gotham; font-weight: 800; src: url("${font('Gotham-Black.woff2')}") format("woff2"); }
@page { size: Letter; margin: 0.7in 0.8in 0.75in; }
:root { --purple: #381c4f; --pink: #d9356e; --yellow: #f5d880; --off: #f8f7fc; --border: #e8e4ef; --body: #555; --muted: #8c7a9e; }
html, body { margin: 0; padding: 0; }
body { font-family: Gotham, "Helvetica Neue", Arial, sans-serif; color: var(--body); font-size: 10pt; line-height: 1.5; }
.hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; border-bottom: 1px solid var(--border); margin-bottom: 22px; }
.hdr svg { height: 26px; width: auto; }
.hdr .tag { font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.ftr { margin-top: 10px; font-size: 7.5pt; color: var(--muted); display: flex; justify-content: space-between; }
.eyebrow { font-size: 8.5pt; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--pink); margin: 0 0 10px; }
h1 { font-family: Gotham; font-weight: 800; font-size: 24pt; line-height: 1.08; letter-spacing: -.01em; color: var(--purple); margin: 0 0 10px; }
h1 .accent { color: var(--pink); }
.intro { font-size: 10.5pt; line-height: 1.5; color: var(--body); margin: 0 0 14px; max-width: 6.2in; }
.callout { background: var(--off); border-left: 3px solid var(--pink); border-radius: 0 8px 8px 0; padding: 10px 14px; margin: 0 0 14px; color: var(--purple); font-size: 9.5pt; }
.callout strong { font-weight: 700; }
.row { display: grid; grid-template-columns: 0.5in 1fr; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border); break-inside: avoid; }
.row:last-of-type { border-bottom: 0; }
.num { font-family: Gotham; font-weight: 800; font-size: 16pt; line-height: 1; color: var(--pink); padding-top: 2px; }
.row h2 { font-size: 11.5pt; font-weight: 700; color: var(--purple); margin: 0 0 3px; line-height: 1.3; }
.row p { margin: 0; }
.fill { white-space: nowrap; }
.blank { display: inline-block; width: 0.85in; border-bottom: 1.2px solid var(--purple); vertical-align: -3px; margin: 0 2px 0 1px; background: var(--yellow); height: 11px; border-radius: 2px 2px 0 0; }
.hint { color: var(--muted); font-size: 8.5pt; }
.next { break-inside: avoid; margin-top: 16px; background: var(--purple); color: #fff; border-radius: 10px; padding: 16px 18px; }
.next .label { font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); margin: 0 0 8px; }
.next h3 { margin: 0 0 8px; font-size: 13pt; font-weight: 700; color: #fff; }
.next ol { margin: 0 0 10px 18px; padding: 0; color: #e9e2f1; }
.next li { margin: 0 0 3px; }
.next p { margin: 0; color: #e9e2f1; font-size: 9.5pt; }
.next .cta { display: inline-block; margin-top: 10px; background: var(--pink); color: #fff; font-weight: 700; font-size: 9pt; letter-spacing: .06em; text-transform: uppercase; padding: 8px 14px; border-radius: 6px; text-decoration: none; }
.legal { margin-top: 12px; font-size: 7.5pt; line-height: 1.45; color: var(--muted); border-top: 1px solid var(--border); padding-top: 8px; break-inside: avoid; }
</style></head><body>
<div class="hdr">${logo}<span class="tag">HOA collection policy · Sample outline</span></div>
<p class="eyebrow">Collections</p>
<h1>HOA collection policy: <span class="accent">a sample outline.</span></h1>
<p class="intro">Eleven sections a manager can draft from. Fill in a blank for each association; the examples beside them are illustrations, not recommendations. The governing documents and applicable law set every number. The full article, with the five-point check for the policy you already have, is at ${PAGE_URL}.</p>
<div class="callout"><strong>${esc(callout.label)}</strong> ${esc(callout.s)}</div>
${rows.map((r, i) => `<div class="row"><div class="num">${String(i + 1).padStart(2, '0')}</div><div><h2>${esc(r.title.replace(/\.$/, ''))}</h2><p>${inline(r.body)}</p></div></div>`).join('\n')}
<div class="next">
  <p class="label">What to do with this outline</p>
  <h3>Draft, review, adopt.</h3>
  <ol>
    <li>Run the five checks on the policy you already have (policy versus practice, trigger versus law, legal basis for every charge, payment plans, reporting).</li>
    <li>Draft from the sections above and fill every blank with the board.</li>
    <li>Send the draft to the association's attorney to confirm the legal requirements, the policy language and the legal basis, limits and notices for every charge.</li>
    <li>Bring a one-page summary to the board and ask for a resolution adopting the policy, with a review date one year out.</li>
  </ol>
  <p>Alloy helps management companies review operations, evaluate options and coordinate implementation. The association's attorney reviews legal requirements, policy language and fee authority.</p>
  <a class="cta" href="https://alloygp.co/contact?intent=collections">Review your collections process · alloygp.co/contact</a>
</div>
<p class="legal">This outline provides general operational education, not legal advice. Requirements vary by jurisdiction and association. Have the association's attorney review collection policies, notices, agreements and charges before implementation. Alloy's partners have a financial interest in a pre-legal collections business; this outline recommends a process, not a provider.</p>
<div class="ftr"><span>© 2026 Alloy Growth Partners · ${PAGE_URL}</span><span>General operational education, not legal advice</span></div>
</body></html>`;

const tmp = mkdtempSync(resolve(tmpdir(), 'outline-'));
const htmlPath = resolve(tmp, 'outline.html'); writeFileSync(htmlPath, html);
const out = resolve(ROOT, 'public/assets/collections/hoa-collection-policy-outline.pdf');
execFileSync('google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', `--user-data-dir=${resolve(tmp, 'prof')}`, '--no-pdf-header-footer', `--print-to-pdf=${out}`, `file://${htmlPath}`], { stdio: 'ignore', timeout: 90000 });
rmSync(tmp, { recursive: true, force: true });
console.log(`wrote ${out} (${statSync(out).size} bytes)`);
