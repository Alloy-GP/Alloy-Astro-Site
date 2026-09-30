// src/lib/newsletters.ts
// Recent sent newsletter issues from Mailchimp (campaign archive), for /resources.
// Server-only. Cached in-module for 10 minutes; any failure (no keys, API down) → [].
import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NewsletterIssue } from './newsletter-issue';
export type { NewsletterIssue } from './newsletter-issue';
export { formatIssueDate } from './newsletter-issue';

// Dev-server only: lets the section be designed without Mailchimp keys. Never used in builds.
const DEV_SAMPLE: NewsletterIssue[] = [
  { id: 'dev-1', title: 'Boards are asking ChatGPT who manages HOAs. Are you the answer?', preview: '', sentAt: '2026-09-16T14:00:00Z', url: 'https://mailchi.mp/alloygp/sample-1' },
  { id: 'dev-2', title: 'The map pack decides your shortlist before the RFP does', preview: '', sentAt: '2026-09-02T14:00:00Z', url: 'https://mailchi.mp/alloygp/sample-2' },
  { id: 'dev-3', title: 'Closing one in four? What the one-in-two firms do differently', preview: '', sentAt: '2026-08-19T14:00:00Z', url: 'https://mailchi.mp/alloygp/sample-3' },
  { id: 'dev-4', title: 'The renewal conversation starts eleven months early', preview: '', sentAt: '2026-08-05T14:00:00Z', url: 'https://mailchi.mp/alloygp/sample-4' },
];

const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; issues: NewsletterIssue[] } | null = null;

const FIELDS = ['campaigns.id', 'campaigns.send_time', 'campaigns.archive_url', 'campaigns.long_archive_url', 'campaigns.settings.subject_line', 'campaigns.settings.title', 'campaigns.settings.preview_text', 'total_items'];

function normalize(campaigns: any[]): NewsletterIssue[] {
  const issues: NewsletterIssue[] = campaigns
    .map((c: any) => ({
      id: String(c.id),
      title: (c.settings?.subject_line || c.settings?.title || '').trim(),
      preview: (c.settings?.preview_text || '').trim(),
      sentAt: c.send_time ?? '',
      url: c.long_archive_url || c.archive_url || '',
    }))
    .filter((i) => i.title && i.url)
    .sort((a, b) => (b.sentAt > a.sentAt ? 1 : b.sentAt < a.sentAt ? -1 : 0));
  // Resends reuse the subject line — keep only the newest of each.
  const seen = new Set<string>();
  return issues.filter((i) => { const k = i.title.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
}

/** Every sent issue (regular + A/B), newest first. Cached 10 min per server instance. */
export async function getAllIssues(): Promise<NewsletterIssue[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.issues;
  const apiKey = import.meta.env.MAILCHIMP_API_KEY;
  const server = import.meta.env.MAILCHIMP_SERVER_PREFIX;
  if (!apiKey || !server) return import.meta.env.DEV ? DEV_SAMPLE : [];
  try {
    mailchimp.setConfig({ apiKey, server });
    const all: any[] = [];
    const PAGE = 100;
    for (let offset = 0; offset < 1000; offset += PAGE) {
      const res = await mailchimp.campaigns.list({ status: 'sent', sortField: 'send_time', sortDir: 'DESC', count: PAGE, offset, fields: FIELDS });
      const rows = res?.campaigns ?? [];
      all.push(...rows);
      if (rows.length < PAGE || all.length >= (res?.total_items ?? 0)) break;
    }
    const issues = normalize(all);
    cache = { at: Date.now(), issues };
    return issues;
  } catch (err) {
    console.error('Mailchimp campaigns.list failed:', (err as any)?.response?.body ?? err);
    return cache?.issues ?? [];
  }
}

/** The newest `limit` issues (used by /resources). */
export async function getRecentIssues(limit = 5): Promise<NewsletterIssue[]> {
  return (await getAllIssues()).slice(0, limit);
}
