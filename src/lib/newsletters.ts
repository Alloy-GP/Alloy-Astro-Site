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

export async function getRecentIssues(limit = 5): Promise<NewsletterIssue[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.issues.slice(0, limit);
  const apiKey = import.meta.env.MAILCHIMP_API_KEY;
  const server = import.meta.env.MAILCHIMP_SERVER_PREFIX;
  if (!apiKey || !server) return import.meta.env.DEV ? DEV_SAMPLE.slice(0, limit) : [];
  try {
    mailchimp.setConfig({ apiKey, server });
    const res = await mailchimp.campaigns.list({
      status: 'sent',
      type: 'regular',
      sortField: 'send_time',
      sortDir: 'DESC',
      count: Math.max(limit, 10),
      fields: ['campaigns.id', 'campaigns.send_time', 'campaigns.archive_url', 'campaigns.long_archive_url', 'campaigns.settings.subject_line', 'campaigns.settings.title', 'campaigns.settings.preview_text'],
    });
    const issues: NewsletterIssue[] = (res?.campaigns ?? [])
      .map((c: any) => ({
        id: String(c.id),
        title: (c.settings?.subject_line || c.settings?.title || '').trim(),
        preview: (c.settings?.preview_text || '').trim(),
        sentAt: c.send_time ?? '',
        url: c.long_archive_url || c.archive_url || '',
      }))
      .filter((i: NewsletterIssue) => i.title && i.url);
    cache = { at: Date.now(), issues };
    return issues.slice(0, limit);
  } catch (err) {
    console.error('Mailchimp campaigns.list failed:', (err as any)?.response?.body ?? err);
    return cache?.issues.slice(0, limit) ?? [];
  }
}
