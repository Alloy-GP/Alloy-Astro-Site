// src/components/pages/ResourceHubPage.tsx — /resources
// Template 4 (resources index). Copy from docs/redesign-handoff/site/resources.dc.html.
// Static component. The newsletter form is a separate island
// (~/components/modules/NewsletterSignup) passed in as `children` from the
// route so only the form hydrates.
import type { ReactNode } from 'react';
import { Eyebrow, Label, Btn, TextLink } from '~/components/rd/atoms';
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
  { kind: 'Strategy', ink: BLUE_INK, accent: BLUE, meta: '12 min read', title: 'CAM marketing strategy: the plan before the tactics', href: '/resources/cam-marketing-strategy' },
];

const LATEST: Resource[] = [
  { kind: 'AI search', ink: REACH_INK, accent: PINK, meta: '7 min read', title: 'Boards are asking ChatGPT who manages HOAs in their city. Is your firm the answer?', href: '/resources/cam-marketing-strategy' },
  { kind: 'Local', ink: BLUE_INK, accent: BLUE, meta: '5 min read', title: 'Why the map pack now decides your shortlist before the RFP does.', href: '/property-management-seo' },
  { kind: 'Tips', ink: MATCH_INK, accent: YELLOW, meta: 'Checklist', title: 'Five things a CAM firm can fix this quarter without an agency.', href: '/resources/cam-marketing-strategy' },
  { kind: 'Sales', ink: MATCH_INK, accent: YELLOW, meta: '8 min read', title: 'Closing one in four? Here’s what the firms at one in two do differently.', href: '/boardmatch/proposal-optimization' },
  { kind: 'Retention', ink: RETAIN_INK, accent: GREEN, meta: '6 min read', title: 'The renewal conversation starts eleven months early.', href: '/boardretain/newsletter-production' },
  { kind: 'Proof', ink: REACH_INK, accent: PINK, meta: 'Case study · 12 min', title: 'How one CAM partner went from chasing RFPs to inbound boards.', href: '/results/apex-cmg' },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <div
      className="rd-stack"
      style={{ background: '#fff', borderRadius: 10, borderLeft: `5px solid ${r.accent}`, padding: '26px 26px 22px 28px', boxShadow: 'var(--shadow-sm)', gap: 12 }}
    >
      <div className="rd-row rd-row--between">
        <span className="rd-label rd-label--12" style={{ color: r.ink }}>{r.kind}</span>
        <span className="rd-tiny rd-tiny--12">{r.meta}</span>
      </div>
      <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{r.title}</div>
      <div style={{ marginTop: 'auto' }}><TextLink href={r.href} size={12}>Read</TextLink></div>
    </div>
  );
}

export default function ResourceHubPage({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 64 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Resources</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 7.25vw, 84px)' }}>Field notes for <span className="rd-accent">CAM operators.</span></h1>
          </div>
          <p className="rd-intro">Guides, courses, and articles on how boards find, choose, and keep management companies — written by people who have run portfolios, not marketers guessing at the category.</p>
        </div>
      </section>

      {/* Featured guide + course + strategy */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--hero-wide rd-gap-20 rd-rule-top" style={{ paddingTop: 48 }}>
            <div className="rd-bg-purple rd-ink-white rd-stack rd-stack--18" style={{ borderRadius: 10, padding: 40, minHeight: 340 }}>
              <Label tone="yellow" size={12}>Featured guide</Label>
              <div className="rd-h2 rd-h2--sm">The HOA management software guide.</div>
              <p className="rd-body rd-body--16 rd-muted-85" style={{ maxWidth: 520 }}>Vantaca, AppFolio, Buildium, CINC and the rest — compared the way an operator compares them, with what each one means for boards, owners, and your marketing stack.</p>
              <Btn href="/resources/hoa-management-software-guide" size="sm" style={{ padding: '14px 22px', marginTop: 'auto', alignSelf: 'flex-start' }}>Read the guide</Btn>
            </div>
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
            <p className="rd-body">What’s changing in how boards search, shop, and decide — and what to do about it this quarter.</p>
          </div>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {LATEST.map((r) => <ResourceCard key={r.title} r={r} />)}
          </div>
          <div><TextLink href="/resources" size={12}>All articles</TextLink></div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-card rd-card--pad-lg rd-row rd-row--between rd-row--wrap" style={{ gap: 40 }}>
            <div className="rd-stack rd-stack--6">
              <Label tone="pink" size={12}>The Alloy briefing</Label>
              <div className="rd-title-22 rd-ink" style={{ fontSize: 24 }}>CAM growth, engineered — in your inbox.</div>
              <p className="rd-small rd-small--14">One short email every other Tuesday. Attract, close, keep. No fluff.</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
