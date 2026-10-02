// GET /api/newsletters            → { issues: NewsletterIssue[] } (what /resources renders)
// GET /api/newsletters?raw=1      → recent campaigns of every type/status (diagnostics; public campaign metadata only)
import type { APIRoute } from 'astro';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { getRecentIssues } from '~/lib/newsletters';

export const GET: APIRoute = async ({ url }) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400' };
  if (url.searchParams.get('raw') === '1') {
    const apiKey = import.meta.env.MAILCHIMP_API_KEY, server = import.meta.env.MAILCHIMP_SERVER_PREFIX;
    if (!apiKey || !server) return new Response(JSON.stringify({ error: 'no keys' }), { status: 500, headers });
    try {
      mailchimp.setConfig({ apiKey, server });
      const res = await mailchimp.campaigns.list({ count: 25, sortField: 'create_time', sortDir: 'DESC' });
      const rows = (res?.campaigns ?? []).map((c: any) => ({ id: c.id, type: c.type, status: c.status, send_time: c.send_time, create_time: c.create_time, subject: c.settings?.subject_line, title: c.settings?.title, archive: c.long_archive_url || c.archive_url }));
      return new Response(JSON.stringify({ total: res?.total_items, rows }, null, 1), { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err?.response?.body ?? String(err) }), { status: 502, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    }
  }
  const issues = await getRecentIssues(parseInt(url.searchParams.get('limit') ?? '5', 10) || 5);
  return new Response(JSON.stringify({ issues }), { status: 200, headers });
};
