// src/components/pages/NewsletterArchivePage.tsx — /resources/newsletter
// Every sent issue of The Alloy Briefing, newest first, grouped by year, server-paginated.
// Static component; the signup form arrives as `children` (island) from the route.
import type { ReactNode } from 'react';
import { formatIssueDate, type NewsletterIssue } from '~/lib/newsletter-issue';
import { Eyebrow, Label, Breadcrumb, ArrowIcon } from '~/components/rd/atoms';

export const PAGE_SIZE = 24;

interface Props {
  issues: NewsletterIssue[];   // this page's slice
  page: number;                // 1-based
  pages: number;
  total: number;
  children?: ReactNode;
}

export default function NewsletterArchivePage({ issues, page, pages, total, children }: Props) {
  const byYear = new Map<string, NewsletterIssue[]>();
  for (const i of issues) {
    const y = i.sentAt ? String(new Date(i.sentAt).getFullYear()) : 'Undated';
    byYear.set(y, [...(byYear.get(y) ?? []), i]);
  }
  const href = (p: number) => (p <= 1 ? '/resources/newsletter' : `/resources/newsletter?page=${p}`);

  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap"><Breadcrumb items={[{ label: 'Resources', href: '/resources' }, { label: 'Newsletter', href: '/resources/newsletter' }]} /></div>
      </section>

      <section className="rd-section rd-section--after-crumb" style={{ paddingBottom: 64 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide" style={{ alignItems: 'start' }}>
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Resources · Newsletter</Eyebrow>
            <h1 className="rd-h1">The Alloy <span className="rd-accent">Briefing.</span></h1>
            <p className="rd-intro rd-max-560">Attract, close, keep, in your inbox. Every issue we’ve sent, newest first.</p>
          </div>
          <div className="rd-card rd-card--pad-lg rd-nl-card" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="rd-stack rd-stack--6" style={{ marginBottom: 20 }}>
              <Label tone="pink" size={12}>Subscribe</Label>
              <div className="rd-title-22 rd-ink" style={{ fontSize: 24 }}>Get the next issue.</div>
            </div>
            {children}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-row rd-row--between rd-row--wrap">
            <Label>{total} issue{total === 1 ? '' : 's'}</Label>
            {pages > 1 ? <Label>Page {page} of {pages}</Label> : null}
          </div>

          {issues.length === 0 ? (
            <p className="rd-body">The archive is loading. Try again in a moment.</p>
          ) : (
            [...byYear.entries()].map(([year, list]) => (
              <div key={year} className="rd-stack rd-stack--14">
                <h2 className="rd-h3">{year}</h2>
                <ul className="rd-arch">
                  {list.map((i) => (
                    <li key={i.id}>
                      <a href={i.url} target="_blank" rel="noopener" className="rd-arch-row">
                        <span className="rd-arch-date">{formatIssueDate(i.sentAt)}</span>
                        <span className="rd-arch-main">
                          <span className="rd-arch-title">{i.title}</span>
                          {i.preview ? <span className="rd-arch-preview">{i.preview}</span> : null}
                        </span>
                        <span className="rd-arch-arrow"><ArrowIcon size={16} stroke={2} /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          {pages > 1 ? (
            <nav className="rd-row rd-row--between" aria-label="Archive pages">
              {page > 1 ? <a href={href(page - 1)} className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline">← Newer</a> : <span />}
              {page < pages ? <a href={href(page + 1)} className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline">Older →</a> : <span />}
            </nav>
          ) : null}
        </div>
      </section>
    </div>
  );
}
