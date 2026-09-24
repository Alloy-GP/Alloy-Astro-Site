// src/components/pages/ResultsPage.tsx — /results
// Template 4d — results index. Copy from docs/redesign-handoff/site/results.dc.html.
// Motion: headline stats rise + count; each case card is its own reveal root
// (line chart draws, bars grow, mini stats rise + count).
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow, H1, TextLink, StatNumber, CtaBar } from '~/components/rd/atoms';

const HEADLINE_STATS: Array<{ value: number; prefix?: string; suffix: string; note: string; rule: 'pink' | 'yellow' | 'blue' | 'green' }> = [
  { value: 535, suffix: '%', note: 'Lead intake increase · 3-year partner', rule: 'pink' },
  { value: 3, suffix: '×', note: 'Proposal request growth · 3-year partner', rule: 'yellow' },
  { value: 405, prefix: '+', suffix: '%', note: 'Monthly inquiries · 7-month partner', rule: 'blue' },
  { value: 40, suffix: '–60%', note: 'Groundwork qualified-to-close', rule: 'green' },
];

// No rd-proof-item--blue variant exists yet; mirror the other 4px variants inline.
const BLUE_RULE: CSSProperties = { borderLeftColor: 'var(--alloy-blue)', borderLeftWidth: 4, paddingLeft: 16 };

const BARS: Array<{ m: string; v: number }> = [
  { m: 'Sep', v: 18 },
  { m: 'Oct', v: 35 },
  { m: 'Nov', v: 52 },
  { m: 'Dec', v: 57 },
  { m: 'Jan', v: 72 },
  { m: 'Feb', v: 74 },
  { m: 'Mar', v: 91 },
];

function MiniStat({ value, prefix, suffix, label }: { value: number; prefix?: string; suffix: string; label: string }) {
  return (
    <div>
      <div className="rd-stat-num" style={{ fontSize: 32 }}>
        <span data-count={value} data-prefix={prefix ?? ''}>{(prefix ?? '') + value.toLocaleString('en-US')}</span>
        <span className="rd-stat-suffix">{suffix}</span>
      </div>
      <div className="rd-tiny rd-tiny--12" style={{ marginTop: 4 }}>{label}</div>
    </div>
  );
}

function ChartBox({ title, range, gap, children }: { title: string; range: string; gap: number; children: ReactNode }) {
  return (
    <div style={{ background: 'var(--alloy-off-white)', borderRadius: 8, padding: 20 }}>
      <div className="rd-row rd-row--between rd-w-500" style={{ fontSize: 12, color: 'var(--alloy-body-gray)', marginBottom: gap }}>
        <span>{title}</span>
        <span>{range}</span>
      </div>
      {children}
    </div>
  );
}

function LineChart() {
  return (
    <svg viewBox="0 0 480 220" width="100%" style={{ display: 'block', overflow: 'visible' }} role="img" aria-label="Lead intake, indexed, rising steadily over 36 months">
      <line x1="0" y1="180" x2="480" y2="180" style={{ stroke: 'var(--border-subtle)' }} />
      <line x1="0" y1="119" x2="480" y2="119" style={{ stroke: 'var(--border-subtle)' }} />
      <line x1="0" y1="59" x2="480" y2="59" style={{ stroke: 'var(--border-subtle)' }} />
      <polyline
        data-draw
        pathLength={1}
        fill="none"
        style={{ stroke: 'var(--alloy-purple)' }}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points="0,176 60,172 120,174 170,166 220,150 280,128 340,96 400,64 450,34 480,12"
      />
      <circle data-pop cx="480" cy="12" r="6" style={{ fill: 'var(--alloy-pink)' }} />
    </svg>
  );
}

function BarChart() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 230 }} role="img" aria-label="Monthly inquiries, September to March: 18, 35, 52, 57, 72, 74, 91">
      {BARS.map((b, i) => {
        const last = i === BARS.length - 1;
        return (
          <div key={b.m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
            <div
              data-bar-h
              style={{
                ['--bar-h' as string]: `${+(b.v * 2.2).toFixed(1)}px`,
                width: '100%',
                background: last ? 'var(--alloy-pink)' : 'var(--alloy-purple)',
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 6,
                overflow: 'hidden',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
              } as CSSProperties}
            >
              {b.v}
            </div>
            <div className="rd-w-500" style={{ fontSize: 11, color: 'var(--alloy-body-gray)' }}>{b.m}</div>
          </div>
        );
      })}
    </div>
  );
}

function CaseCard({ num, numTone, tag, tagClass, title, body, chart, stats, quote, by, link }: {
  num: string;
  numTone?: 'match';
  tag: string;
  tagClass: string;
  title: string;
  body: string;
  chart: ReactNode;
  stats: Array<{ value: number; prefix?: string; suffix: string; label: string }>;
  quote: string;
  by: string;
  link: { label: string; href: string };
}) {
  return (
    <div data-reveal className="rd-card rd-stack" style={{ padding: 32, gap: 22 }}>
      <div className="rd-row rd-row--between">
        <span className={`rd-numeral${numTone ? ` rd-numeral--${numTone}` : ''}`}>{num}</span>
        <span className={tagClass}>{tag}</span>
      </div>
      <h3 className="rd-h3">{title}</h3>
      <p className="rd-small">{body}</p>
      {chart}
      <div data-rise className="rd-row rd-row--wrap" style={{ gap: 32, alignItems: 'flex-start' }}>
        {stats.map((s) => (
          <MiniStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} {...(s.prefix ? { prefix: s.prefix } : {})} />
        ))}
      </div>
      <blockquote className="rd-rule-top rd-w-500 rd-ink" style={{ margin: 0, padding: '18px 0 0', fontSize: 16, lineHeight: 1.5 }}>
        {quote}
        <div className="rd-tiny rd-tiny--12" style={{ marginTop: 6 }}>{by}</div>
      </blockquote>
      <div><TextLink href={link.href} size={12}>{link.label}</TextLink></div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Results</Eyebrow>
            <H1 size="lg" accent="No vanity metrics.">Real numbers.</H1>
          </div>
          <p className="rd-intro rd-intro--19">Every result on this page is a contracted client outcome — measured against the pre-engagement baseline, verified, and disclosed in the spirit it was earned. Firms are anonymized; the numbers are not.</p>
        </div>
      </section>

      {/* Headline stats */}
      <section className="rd-section" style={{ padding: '0 0 96px' }}>
        {/* data-reveal sits one level up: the rise CSS matches [data-rise] as a descendant of the root. */}
        <div className="rd-wrap" data-reveal>
          <div data-rise className="rd-grid rd-grid--4 rd-rule-top" style={{ gap: 28, paddingTop: 40 }}>
            {HEADLINE_STATS.map((s) => (
              <div key={s.note} className={`rd-proof-item${s.rule !== 'blue' ? ` rd-proof-item--${s.rule}` : ''}`} style={s.rule === 'blue' ? BLUE_RULE : undefined}>
                <StatNumber stat={{ value: s.value, suffix: s.suffix, note: s.note, ...(s.prefix ? { prefix: s.prefix } : {}) }} />
                <div className="rd-tiny" style={{ marginTop: 8, lineHeight: 1.4 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack" style={{ gap: 56 }}>
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">The same system, at both ends of the curve.</h2>
            <p className="rd-body">One firm we’ve run for three years. Another we deployed in seven months. Same playbook, different starting points. Both compounding.</p>
          </div>
          <div className="rd-grid rd-grid--2 rd-gap-20">
            <CaseCard
              num="01"
              tag="3-year engagement"
              tagClass="rd-tag rd-tag--purple"
              title="The long climb."
              body="Regional CAM firm, referral-dependent, RFP-chasing. BoardSuite full system: technical SEO and AI-search rebuild, 14 pillar articles, proposal redesign, Groundwork BD, board education curriculum."
              chart={<ChartBox title="Lead intake, indexed" range="36 months" gap={10}><LineChart /></ChartBox>}
              stats={[
                { value: 535, suffix: '%', label: 'lead intake' },
                { value: 3, suffix: '×', label: 'proposals' },
                { value: 1580, suffix: '%', label: 'YoY opportunities' },
              ]}
              quote="“We went from chasing RFPs to having boards reach out directly.”"
              by="CEO · Alloy CAM partner"
              link={{ label: 'Read the full story', href: '/results/apex-cmg' }}
            />
            <CaseCard
              num="02"
              numTone="match"
              tag="7-month engagement"
              tagClass="rd-tag"
              title="The short sprint."
              body="Small-association specialists. BoardSuite Steady: niche-segment SEO and GEO targeting, channel diversification across Google, Bing, directories, and direct — with source attribution wired up from day one."
              chart={<ChartBox title="Monthly inquiries" range="Sep → Mar" gap={14}><BarChart /></ChartBox>}
              stats={[
                { value: 405, prefix: '+', suffix: '%', label: 'monthly inquiries' },
                { value: 5, suffix: '+', label: 'attributed channels' },
                { value: 7, suffix: '/7', label: 'months of growth' },
              ]}
              quote="“We finally stopped guessing where leads came from — and watched the system compound.”"
              by="Principal · Alloy CAM partner"
              link={{ label: 'Request a diagnostic', href: '/get-started' }}
            />
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="rd-section rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--2" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--14">
            <Eyebrow tone="yellow">The disclosure</Eyebrow>
            <h2 className="rd-h2" style={{ color: '#fff', fontSize: 'clamp(28px, 4.4vw, 44px)' }}>We don’t promise results. We disclose them.</h2>
          </div>
          <p className="rd-body" style={{ color: '#fff', opacity: .85 }}>The numbers above are what engineered systems produced for specific CAM firms over specific timeframes. Your starting point, market, and execution discipline all matter. We choose depth over volume — new engagements get the same rigor and earn the same disclosure. We’ll be honest about what’s realistic in your diagnostic call.</p>
        </div>
      </section>

      <div className="rd-spacer-96 rd-bg-off" />
      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes tells you which engine to fix first — and whether your metro is still open." />
        </div>
      </section>
    </div>
  );
}
