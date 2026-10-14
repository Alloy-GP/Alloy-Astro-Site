// node scripts/form-guard-test.mjs
// Exercises src/lib/form-guard.ts directly (Node 24 strips the types itself; no build needed).
// Covers every layer with the real spam sample from 2026-10-14 plus legitimate copy that must pass.
import assert from 'node:assert/strict';
import {
  EMAIL_RE, guardSubmission, looksGibberish, nonLatinShare, resetRateLimits,
  safeEcho, safeFirstName, spamSignal, subjectLine,
} from '../src/lib/form-guard.ts';

const ORIGIN = 'https://alloygp.co';
const OK_HEADERS = { origin: ORIGIN, host: 'alloygp.co', 'x-forwarded-for': '203.0.113.5' };
const req = (headers = {}) => new Request('https://alloygp.co/api/contact', { method: 'POST', headers });
const fd = (obj) => { const f = new FormData(); for (const [k, v] of Object.entries(obj)) f.append(k, String(v)); return f; };
const good = { name: 'Jane Doe', email: 'jane@example.com', message: 'We manage 40 associations in Austin and want to grow.', website: '', elapsed: '8000' };

function run(data = {}, headers = OK_HEADERS, extra = {}) {
  resetRateLimits();
  const d = { ...good, ...data };
  return guardSubmission({ request: req(headers) }, { form: 'test', data: fd(d), email: d.email, name: d.name, text: [d.message], ...extra });
}

let n = 0;
const t = (label, fn) => { fn(); n++; console.log('✓', label); };

t('legit submission passes', () => assert.equal(run().ok, true));
t('honeypot filled → silent 200', () => { const v = run({ website: 'http://x.top' }); assert.equal(v.ok, false); assert.equal(v.silent, true); assert.equal(v.status, 200); });
t('no Origin/Referer → 403', () => { const v = run({}, { host: 'alloygp.co' }); assert.equal(v.status, 403); assert.match(v.reason, /^origin:none/); });
t('foreign Origin → 403', () => { const v = run({}, { origin: 'https://evil.example', host: 'alloygp.co' }); assert.equal(v.status, 403); assert.equal(v.reason, 'origin:evil.example'); });
t('Origin "null" → 403', () => assert.equal(run({}, { origin: 'null', host: 'alloygp.co' }).status, 403));
t('Referer fallback from www works', () => assert.equal(run({}, { referer: 'https://www.alloygp.co/contact', host: 'alloygp.co' }).ok, true));
t('staging, preview and localhost origins work', () => {
  assert.equal(run({}, { origin: 'https://stg.alloygp.co', host: 'stg.alloygp.co' }).ok, true);
  assert.equal(run({}, { origin: 'https://alloy-astro-site-git-x.vercel.app', host: 'alloy-astro-site-git-x.vercel.app' }).ok, true);
  assert.equal(run({}, { origin: 'http://localhost:4321', host: 'localhost:4321' }).ok, true);
});
t('missing elapsed (no JS) → 400', () => { const v = run({ elapsed: '' }); assert.equal(v.status, 400); assert.equal(v.reason, 'no-elapsed'); });
t('elapsed under 2 s → 400', () => { const v = run({ elapsed: '350' }); assert.equal(v.status, 400); assert.equal(v.reason, 'fast:350ms'); });
t('the 2026-10-14 spam sample → content block', () => {
  const v = run({ name: 'Вам перевод 133235 руб. получить тут https://kunirtyrt.top/H5EpmOV44Q#qlwRwS', email: 'valdemarx53@gmail.com', message: 'g3ulwNN 6jXB ovpVXEu 3sKokdR XNha ygdfZrQ' });
  assert.equal(v.status, 400); assert.match(v.reason, /^content:/);
});
t('gibberish message on its own', () => assert.equal(spamSignal({ name: 'John Smith', text: ['g3ulwNN 6jXB ovpVXEu 3sKokdR XNha ygdfZrQ'] }), 'gibberish'));
t('URL in the name', () => assert.equal(spamSignal({ name: 'Get paid at https://example.com/x' }), 'name-url'));
t('domain in the name', () => assert.equal(spamSignal({ name: 'kunirtyrt.top/H5EpmOV44Q' }), 'name-url'));
t('digit run in the name', () => assert.equal(spamSignal({ name: 'John 133235 Smith' }), 'name-digits'));
t('Cyrillic name', () => assert.equal(spamSignal({ name: 'Вам перевод' }), 'name-script'));
t('Cyrillic message', () => assert.equal(spamSignal({ name: 'John', text: ['Вам перевод получить тут'] }), 'script'));
t('spam TLD in the message', () => assert.equal(spamSignal({ text: ['claim here kunirtyrt.top/abc'] }), 'spam-tld'));
t('link-stuffed message', () => assert.equal(spamSignal({ text: ['see http://a.com http://b.com http://c.com'] }), 'links'));
t('message that just repeats the name', () => assert.equal(spamSignal({ name: 'John Smith', text: ['John Smith'] }), 'name-equals-text'));
t('legitimate copy passes', () => {
  for (const m of [
    'Hi, I own ABC Management in Austin, TX. We manage 40 HOAs and want to grow. Our site is www.abcmgmt.com.',
    'Reaching out about: Claim my market\nCompany: Peak CAM',
    "I'd like a market report for my metro.\n\nReaching out about: Get my market report",
    'We use CINC and Vantaca. COVID19 changed our PowerPoint habits. Q3report attached?',
    'Metro: Austin, TX\nI’d like to claim my market.',
    '1234 Main St, Austin, TX 78701',
    'Old Fashioned, Bulleit',
    'Growth Portal walkthrough request · interested in: Growth plan · primary market: Denver, CO',
  ]) assert.equal(spamSignal({ name: 'José María O’Neil-Smith', text: [m] }), null, m);
});
t('accented names are Latin', () => assert.equal(nonLatinShare('Zoë Müller-Łukasz'), 0));
t('product codes alone are not gibberish', () => assert.equal(looksGibberish('COVID19 changed our PowerPoint Q3report'), false));
t('rate limit: 6th hit from one IP → 429', () => {
  resetRateLimits();
  const ctx = { request: req({ origin: ORIGIN, host: 'alloygp.co', 'x-forwarded-for': '198.51.100.9' }) };
  for (let i = 0; i < 5; i++) assert.equal(guardSubmission(ctx, { form: 't', data: fd(good), email: `u${i}@example.com`, name: good.name, text: [good.message] }).ok, true);
  const v = guardSubmission(ctx, { form: 't', data: fd(good), email: 'u9@example.com', name: good.name, text: [good.message] });
  assert.equal(v.status, 429); assert.equal(v.reason, 'rate:ip');
});
t('rate limit: 4th hit for one email → 429', () => {
  resetRateLimits();
  const at = (ip) => ({ request: req({ origin: ORIGIN, host: 'alloygp.co', 'x-forwarded-for': ip }) });
  for (let i = 0; i < 3; i++) assert.equal(guardSubmission(at(`10.0.0.${i}`), { form: 't', data: fd(good), email: 'same@example.com', name: good.name, text: [good.message] }).ok, true);
  const v = guardSubmission(at('10.0.0.99'), { form: 't', data: fd(good), email: 'same@example.com', name: good.name, text: [good.message] });
  assert.equal(v.status, 429); assert.equal(v.reason, 'rate:email');
});
t('JSON bodies (Think Tank) work', () => {
  resetRateLimits();
  const v = guardSubmission({ request: req({ origin: ORIGIN, host: 'alloygp.co' }) }, { form: 't', data: { website: '', elapsed: 5000 }, email: 'a@b.co', name: 'Ann', text: ['Old Fashioned'] });
  assert.equal(v.ok, true);
});
t('clientAddress getter that throws is tolerated', () => {
  resetRateLimits();
  const ctx = { request: req(OK_HEADERS), get clientAddress() { throw new Error('not available'); } };
  assert.equal(guardSubmission(ctx, { form: 't', data: fd(good), email: good.email, name: good.name, text: [good.message] }).ok, true);
});
t('email helpers', () => {
  assert.equal(safeFirstName('Вам перевод https://x.top'), 'there');
  assert.equal(safeFirstName('Jane Doe'), 'Jane');
  assert.equal(safeFirstName("O'Brien-Smith jr"), "O'Brien-Smith");
  assert.equal(safeFirstName('', ''), '');
  assert.equal(safeEcho('Peak CAM', 'your company'), 'Peak CAM');
  assert.equal(safeEcho('visit www.x.top now', 'your company'), 'your company');
  assert.equal(subjectLine('a\r\nBcc: x@y.z\n b'), 'a Bcc: x@y.z b');
  assert.ok(EMAIL_RE.test('a@b.co'));
  assert.ok(!EMAIL_RE.test('a@b'));
});

console.log(`\n${n} checks passed`);
