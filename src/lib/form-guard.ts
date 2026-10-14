// src/lib/form-guard.ts — SERVER-ONLY spam guard shared by every form endpoint
// (/api/contact, /api/lead, /api/subscribe, /api/book-club, /api/thinktank).
//
// Added 2026-10-14 after a run of Russian-language link spam posted straight at /api/contact
// (name = "Вам перевод … https://…top/…", gibberish message). Two problems: the team got every
// one of them, and the confirmation email relayed the payload to whatever address the bot typed,
// which turned the site into a spam relay. The client half lives in
// src/components/modules/FormGuard.tsx (React forms) and inline in src/lib/book-club-form.js and
// src/assets/thinktank.html (plain JS forms).
//
// Layers, in the order they run. All free, no third-party service, nothing to configure:
//   1. Honeypot: every form renders a visually hidden `website` field. People never see it, bots
//      that fill every input fill it. Hits get a silent 200 and nothing is sent.
//   2. Same-origin: the Origin (or Referer) host must be one of ours. Scripts that POST straight
//      at the endpoint send neither, or send somebody else's.
//   3. Fill time: the form reports how long it was open (`elapsed`, ms, measured client-side so
//      clock skew cannot matter). No JavaScript → no field → bot. Under 2 s → bot.
//   4. Content: non-Latin scripts, URLs or long digit runs in a name, spam TLDs, link-stuffed or
//      gibberish messages, a message that just repeats the name.
//   5. Rate limit: per form, 5 submissions per 10 minutes per IP and 3 per email address (a form
//      can raise the IP allowance: the Think Tank card is used at events where a room shares one
//      IP). In-memory, so per warm serverless instance: enough to blunt a burst, not a hard ceiling.
//
// Plus helpers every endpoint uses so the emails stay safe: esc() for HTML, safeFirstName() /
// safeEcho() so a confirmation email never carries attacker text, subjectLine() so a header cannot
// be injected, field() / textField() for capped, trimmed input.
//
// Escalation if spam still gets through: Cloudflare Turnstile (free, PUBLIC_TURNSTILE_SITE_KEY +
// TURNSTILE_SECRET_KEY, verify at challenges.cloudflare.com/turnstile/v0/siteverify) or Vercel's
// Firewall rate-limit / bot rules on /api/*. See docs/ops/form-spam.md.

export const HONEYPOT_FIELD = 'website';
export const ELAPSED_FIELD = 'elapsed';
export const MIN_FILL_MS = 2000;
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
export const DEFAULT_FALLBACK_EMAIL = 'contact@alloygp.co';

const OWN_HOSTS = new Set(['alloygp.co', 'www.alloygp.co', 'stg.alloygp.co', 'dev.alloygp.co']);
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_PER_IP = 5;
const RATE_MAX_PER_EMAIL = 3;

export type GuardVerdict =
  | { ok: true; ip: string }
  | { ok: false; ip: string; reason: string; status: number; error: string; silent: boolean };

export interface GuardOptions {
  /** Label for the log line, e.g. "contact". */
  form: string;
  /** The raw body: the honeypot and elapsed fields are read from here. */
  data: FormData | Record<string, unknown>;
  /** Already-validated requester email (rate-limit key). */
  email?: string;
  /** The person's name: gets the stricter name rules. */
  name?: string;
  /** Free-text fields to screen (message, company, goal, address…). */
  text?: string[];
  /** Where a wrongly blocked person should write. */
  fallbackEmail?: string;
  /** Per-form rate-limit allowances per 10 minutes (defaults: 5 per IP, 3 per email). */
  limits?: { ip?: number; email?: number };
}

/** Shape of what we need from Astro's APIContext (clientAddress is a getter that can throw). */
export interface GuardContext {
  request: Request;
  clientAddress?: string;
}

/* ------------------------------------------------------------------ */
/* Main entry                                                          */
/* ------------------------------------------------------------------ */

export function guardSubmission(ctx: GuardContext, opts: GuardOptions): GuardVerdict {
  const ip = clientIp(ctx);
  const fallback = opts.fallbackEmail ?? DEFAULT_FALLBACK_EMAIL;
  const reject = (reason: string, status: number, error: string, silent = false): GuardVerdict =>
    ({ ok: false, ip, reason, status, error, silent });

  // 1. Honeypot: only a bot fills a field nobody can see.
  if (readField(opts.data, HONEYPOT_FIELD)) return reject('honeypot', 200, '', true);

  // 2. Same-origin: the browser tells us where the POST came from; scripts do not.
  const origin = originHost(ctx.request);
  if (!origin.allowed) {
    return reject(`origin:${origin.host || 'none'}`, 403, `This request was blocked. Email ${fallback} and a person will reply.`);
  }

  // 3. Fill time, measured by the page itself.
  const elapsedRaw = readField(opts.data, ELAPSED_FIELD);
  const elapsed = /^\d{1,12}$/.test(elapsedRaw) ? Number(elapsedRaw) : Number.NaN;
  if (!Number.isFinite(elapsed)) {
    return reject('no-elapsed', 400, `This form needs JavaScript to send. If it keeps failing, email ${fallback}.`);
  }
  if (elapsed < MIN_FILL_MS) return reject(`fast:${elapsed}ms`, 400, 'That was quick. Give it a second and send again.');

  // 4. Content.
  const signal = spamSignal({ ...(opts.name !== undefined ? { name: opts.name } : {}), ...(opts.text ? { text: opts.text } : {}) });
  if (signal) {
    return reject(`content:${signal}`, 400, `Something in that submission tripped our spam filter. Email ${fallback} and a person will reply.`);
  }

  // 5. Rate limit (records the hit when it passes).
  const limited = rateLimited(opts.form, ip, opts.email, opts.limits);
  if (limited) return reject(`rate:${limited}`, 429, 'Too many submissions from here just now. Please try again in a few minutes.');

  return { ok: true, ip };
}

/** Logs the block and builds the response. Silent verdicts (honeypot) look like success to the bot. */
export function rejectionResponse(form: string, verdict: Extract<GuardVerdict, { ok: false }>, about: Record<string, string> = {}): Response {
  const detail = Object.entries(about)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${JSON.stringify(v.slice(0, 60))}`)
    .join(' ');
  console.warn(`[form-guard] ${form} blocked (${verdict.reason}) ip=${verdict.ip}${detail ? ' ' + detail : ''}`);
  if (verdict.silent) return json({ success: true }, 200);
  return json({ error: verdict.error }, verdict.status);
}

/* ------------------------------------------------------------------ */
/* Content heuristics                                                  */
/* ------------------------------------------------------------------ */

const URL_RE = /https?:\/\/|www\./gi;
// A name is a name: no scheme, no www, no domain ending in a common TLD.
const NAME_URL_RE = /https?:\/\/|www\.|\.(com|net|org|info|biz|co|io|me|us|site|online|shop|store|club|live|top|xyz|ru)(?=[/\s?#]|$)/i;
// TLDs that are essentially never legitimate in a CAM contact form.
const SPAM_TLD_RE = /\.(top|xyz|icu|buzz|click|cfd|sbs|bond|rest|monster|quest|lol|pics|ru|su)(?=[/\s?#:]|$)/i;

/** Returns a short reason when the text looks machine-generated, null when it reads as human. */
export function spamSignal(input: { name?: string; text?: string[] }): string | null {
  const name = (input.name ?? '').trim();
  if (name) {
    if (name.length > 120) return 'name-length';
    if (NAME_URL_RE.test(name)) return 'name-url';
    if (/\d{3,}/.test(name)) return 'name-digits';
    if (nonLatinShare(name) >= 0.3) return 'name-script';
  }
  for (const raw of input.text ?? []) {
    const t = (raw ?? '').trim();
    if (!t) continue;
    if (nonLatinShare(t) >= 0.3) return 'script';
    if (SPAM_TLD_RE.test(t)) return 'spam-tld';
    if ((t.match(URL_RE)?.length ?? 0) >= 3) return 'links';
    if (looksGibberish(t)) return 'gibberish';
    if (name && t === name) return 'name-equals-text';
  }
  return null;
}

/** Share of letters that are not Latin script (0 when there are fewer than 3 letters). Accents are Latin. */
export function nonLatinShare(s: string): number {
  let letters = 0;
  let nonLatin = 0;
  for (const ch of s) {
    if (!/\p{L}/u.test(ch)) continue;
    letters++;
    if (!/\p{Script=Latin}/u.test(ch)) nonLatin++;
  }
  return letters >= 3 ? nonLatin / letters : 0;
}

/**
 * Random-token detector: tokens of 5+ letters/digits that mix digits with letters ("g3ulwNN") or
 * have two or more internal capitals after a lowercase letter ("ygdfZrQ"; "PowerPoint" has one).
 * Flags only when at least three such tokens make up half or more of the qualifying tokens, so a
 * real message that mentions "COVID19" or a product code is fine.
 */
export function looksGibberish(t: string): boolean {
  const tokens = t.split(/\s+/).filter((w) => /^[A-Za-z0-9]{5,}$/.test(w));
  if (tokens.length < 3) return false;
  let odd = 0;
  for (const w of tokens) {
    const hasDigit = /\d/.test(w);
    const hasLetter = /[A-Za-z]/.test(w);
    const internalCaps = w.match(/[a-z][A-Z]/g)?.length ?? 0;
    if ((hasDigit && hasLetter) || internalCaps >= 2) odd++;
  }
  return odd >= 3 && odd / tokens.length >= 0.5;
}

/* ------------------------------------------------------------------ */
/* Origin, IP, rate limit                                              */
/* ------------------------------------------------------------------ */

function originHost(request: Request): { host: string; allowed: boolean } {
  const src = request.headers.get('origin') || request.headers.get('referer') || '';
  let host = '';
  try {
    host = src ? new URL(src).host.toLowerCase() : '';
  } catch {
    host = '';
  }
  if (!host) return { host, allowed: false };
  const own = (request.headers.get('host') ?? '').toLowerCase();
  const allowed =
    (own !== '' && host === own) ||
    OWN_HOSTS.has(host) ||
    host.endsWith('.vercel.app') ||
    /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  return { host, allowed };
}

function clientIp(ctx: GuardContext): string {
  try {
    if (ctx.clientAddress) return ctx.clientAddress;
  } catch {
    /* clientAddress is unavailable outside SSR requests */
  }
  const h = ctx.request.headers;
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('x-real-ip')?.trim() || 'unknown';
}

const hits = new Map<string, number[]>();

/** Returns the limited key kind ("ip" | "email") or null; records the hit when allowed. Buckets are per form. */
function rateLimited(form: string, ip: string, email?: string, limits?: { ip?: number; email?: number }): string | null {
  const now = Date.now();
  const keys: Array<[string, number]> = [];
  if (ip && ip !== 'unknown') keys.push([`ip:${form}:${ip}`, limits?.ip ?? RATE_MAX_PER_IP]);
  if (email) keys.push([`email:${form}:${email.trim().toLowerCase()}`, limits?.email ?? RATE_MAX_PER_EMAIL]);
  for (const [key, max] of keys) {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    hits.set(key, recent);
    if (recent.length >= max) return key.split(':')[0] ?? 'ip';
  }
  for (const [key] of keys) hits.get(key)?.push(now);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return null;
}

/** Test hook: forget every recorded hit. */
export function resetRateLimits(): void {
  hits.clear();
}

/* ------------------------------------------------------------------ */
/* Field + email helpers shared by the endpoints                       */
/* ------------------------------------------------------------------ */

function readField(data: FormData | Record<string, unknown>, key: string): string {
  if (data instanceof FormData) return (data.get(key)?.toString() ?? '').trim();
  const v = data[key];
  return v === undefined || v === null ? '' : String(v).trim();
}

/** Single-line field: whitespace collapsed, trimmed, capped. */
export const field = (data: FormData, key: string, max: number): string =>
  (data.get(key)?.toString() ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Multi-line field: newlines normalised, trimmed, capped. */
export const textField = (data: FormData, key: string, max: number): string =>
  (data.get(key)?.toString() ?? '').replace(/\r\n?/g, '\n').replace(/[^\S\n]+/g, ' ').trim().slice(0, max);

export const json = (body: Record<string, unknown>, status: number): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

/** One line for an email subject: no CR/LF/control characters, capped. */
export const subjectLine = (s: string, max = 100): string =>
  s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

/** First word of a name if it reads as a name (Latin letters, apostrophe, hyphen, dot), else the fallback. */
export function safeFirstName(name: string, fallback = 'there'): string {
  const first = name.trim().split(/\s+/)[0] ?? '';
  return /^\p{Script=Latin}[\p{Script=Latin}'’.-]{0,39}$/u.test(first) ? first : fallback;
}

/** Short free text we are willing to echo back to the requester (no links, no @, Latin, ≤ 80 chars). */
export function safeEcho(s: string, fallback: string): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (!t || t.length > 80) return fallback;
  if (/https?:\/\/|www\.|@|\.[a-z]{2,}(?=[/\s?#]|$)/i.test(t)) return fallback;
  if (nonLatinShare(t) > 0) return fallback;
  return t;
}
