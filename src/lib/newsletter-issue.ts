// src/lib/newsletter-issue.ts — client-safe type + formatter shared by the page component
// and the server-side fetcher (src/lib/newsletters.ts imports the Mailchimp SDK; keep it out of components).
export interface NewsletterIssue {
  id: string;
  title: string;
  preview: string;
  sentAt: string; // ISO
  url: string;    // hosted archive page
}

export function formatIssueDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
