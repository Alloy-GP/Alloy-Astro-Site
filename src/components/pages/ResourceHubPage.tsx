// src/components/pages/ResourceHubPage.tsx — /resources
// Template 4 (resources index). Copy from docs/redesign-handoff/site/resources.dc.html.
// Static component. The newsletter form is a separate island
// (~/components/modules/NewsletterSignup) passed in as `children` from the
// route so only the form hydrates.
import type { ReactNode } from 'react';
import { formatIssueDate, type NewsletterIssue } from '~/lib/newsletter-issue';
import { Eyebrow, Label, TextLink, LinkLabel, ArrowIcon } from '~/components/rd/atoms';
import { PINK, YELLOW, BLUE, GREEN, REACH_INK, MATCH_INK, RETAIN_INK } from '~/lib/tokens';

// Label ink for blue-accented cards (the prototype's #4a86ad). Not yet a token.
const BLUE_INK = '#4a86ad';

interface Resource {
  kind: string;
  ink: string;
  accent: string;
  meta: string;
  title: string;
  href: string;
}

const SIDE: Resource[] = [
  { kind: 'Course', ink: RETAIN_INK, accent: GREEN, meta: 'Self-paced · 10 sections', title: 'Trust building for CAM firms: reviews, testimonials, case studies', href: '/resources/courses/trust-building' },
  { kind: 'Strategy', ink: BLUE_INK, accent: BLUE, meta: '12 min read', title: 'Marketing an HOA management company: the plan before the tactics', href: '/resources/cam-marketing-strategy' },
];

// Real pieces only (client, 2026-10-01: no placeholder articles). Add new articles here as they publish.
const LATEST: Resource[] = [
  { kind: 'AI search', ink: REACH_INK, accent: PINK, meta: '3 min read', title: 'How CAM firms win in AI search.', href: '/resources/ai-search-for-cam' },
  { kind: 'Strategy', ink: BLUE_INK, accent: BLUE, meta: '12 min read', title: 'Marketing an HOA management company: the plan before the tactics.', href: '/resources/cam-marketing-strategy' },
  { kind: 'Guide', ink: MATCH_INK, accent: YELLOW, meta: 'Long read', title: 'Best HOA management software (2026): platforms, pricing, and the RFP.', href: '/resources/hoa-management-software-guide' },
  { kind: 'Course', ink: RETAIN_INK, accent: GREEN, meta: 'Self-paced · 10 sections', title: 'Trust building for CAM firms: reviews, testimonials, case studies.', href: '/resources/courses/trust-building' },
  { kind: 'Proof', ink: REACH_INK, accent: PINK, meta: 'Case study · 12 min', title: 'How one CAM partner went from chasing RFPs to inbound boards.', href: '/results/apex-cmg' },
  { kind: 'Briefing', ink: BLUE_INK, accent: BLUE, meta: 'Newsletter archive', title: 'Every issue of the Alloy Briefing, by year.', href: '/resources/newsletter' },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      className="rd-card-link"
      style={{ background: '#fff', borderRadius: 10, borderLeft: `5px solid ${r.accent}`, padding: '26px 26px 22px 28px', boxShadow: 'var(--shadow-sm)', gap: 12 }}
    >
      <div className="rd-row rd-row--between">
        <span className="rd-label rd-label--12" style={{ color: r.ink }}>{r.kind}</span>
        <span className="rd-tiny rd-tiny--12">{r.meta}</span>
      </div>
      <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{r.title}</div>
      <div style={{ marginTop: 'auto' }}><LinkLabel>Read</LinkLabel></div>
    </a>
  );
}

export default function ResourceHubPage({ children, issues = [] }: { children?: ReactNode; issues?: NewsletterIssue[] }) {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 64 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Resources</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 7.25vw, 84px)' }}>Field notes for <span className="rd-accent">CAM operators.</span></h1>
          </div>
          <p className="rd-intro">Guides, courses, and articles on how boards find, choose, and keep management companies. Written by people who have run portfolios, not marketers guessing at the category.</p>
        </div>
      </section>

      {/* Featured guide + course + strategy */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--hero-wide rd-gap-20 rd-rule-top" style={{ paddingTop: 48 }}>
            <a href="/resources/hoa-management-software-guide" className="rd-card-link rd-bg-purple rd-ink-white rd-stack--18" style={{ borderRadius: 10, padding: 40, minHeight: 340 }}>
              <Label tone="yellow" size={12}>Featured guide</Label>
              <div className="rd-h2 rd-h2--sm">Best HOA management software: the 2026 buyer’s guide.</div>
              <p className="rd-body rd-body--16 rd-muted-85" style={{ maxWidth: 520 }}>Vantaca, AppFolio, Buildium, CINC and the rest: compared the way an operator compares them, with what each one means for boards, owners, and your marketing stack.</p>
              <span className="rd-btn rd-btn--sm" style={{ padding: '14px 22px', marginTop: 'auto', alignSelf: 'flex-start' }}>Read the guide</span>
            </a>
            <div className="rd-stack rd-gap-20">
              {SIDE.map((r) => <ResourceCard key={r.title} r={r} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack" style={{ gap: 36 }}>
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">Latest.</h2>
            <p className="rd-body">What’s changing in how boards search, shop, and decide, and what to do about it this quarter.</p>
          </div>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {LATEST.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
        </div>
      </section>

      {/* Newsletter — The Alloy Briefing: recent issues from Mailchimp + signup */}
      <section id="newsletter" className="rd-section rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--hero-11" style={{ gap: 64, alignItems: 'start' }}>
          <div className="rd-stack rd-stack--24">
            <Eyebrow tone="yellow">The Alloy Briefing</Eyebrow>
            <h2 className="rd-h2 rd-h2--44" style={{ color: '#fff' }}>Our newsletter for CAM operators.</h2>
            <p className="rd-body" style={{ color: '#fff', opacity: .85, lineHeight: 1.55 }}>Attract, close, keep, in your inbox.</p>
            {issues.length > 0 ? (
              <div className="rd-stack rd-stack--14" style={{ marginTop: 8 }}>
                <Label tone="yellow">Recent issues</Label>
                <ul className="rd-nl-issues">
                  {issues.map((i) => (
                    <li key={i.id}>
                      <a href={i.url} target="_blank" rel="noopener" className="rd-nl-issue">
                        <span className="rd-nl-issue-title">{i.title}</span>
                        <span className="rd-nl-issue-meta">{formatIssueDate(i.sentAt)}<ArrowIcon size={12} /></span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div><TextLink href="/resources/newsletter" tone="white" size={12}>All issues</TextLink></div>
              </div>
            ) : null}
          </div>
          <div className="rd-card rd-card--pad-lg rd-nl-card">
            <div className="rd-stack rd-stack--6" style={{ marginBottom: 20 }}>
              <Label tone="pink" size={12}>Subscribe</Label>
              <div className="rd-title-22 rd-ink" style={{ fontSize: 24 }}>Get the next issue.</div>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
