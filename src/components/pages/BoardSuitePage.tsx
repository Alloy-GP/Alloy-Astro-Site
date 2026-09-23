// src/components/pages/BoardSuitePage.tsx — /boardsuite
// Template 4a — the integrated system page. Copy from docs/redesign-handoff/site/boardsuite.dc.html.
import { ENGINES } from '~/lib/nav';
import { Eyebrow, HeroCtas, TextLink, SectionHead, StatNumber, CtaBar, ChevronRightIcon, Label } from '~/components/rd/atoms';

const ENGINE_COPY: Record<string, string> = {
  reach: 'Boards find you before they start shopping — on the map, in Google, in the AI answer, and on LinkedIn. Every inquiry is attributed from day one.',
  match: 'Closing one in four? You should be at one in two. The proposal, the RFP response, the sales language, and — when you need it — a fractional BD lead who has sat on the other side of the table.',
  retain: 'Protect the portfolio you already built. Educated boards renew; informed owners complain less; a firm with a reputation gets referred. Retention is the cheapest growth you have.',
};

const TIERS = [
  { name: 'Foundation', sub: 'Under 1,500 doors. Brand, website, local SEO, reviews.' },
  { name: 'Growth', sub: '1,500–5,000 doors. All three engines running.', popular: true },
  { name: 'Scale', sub: '5,000+ doors, multi-market. Fractional BD, dedicated operator.' },
];

export default function BoardSuitePage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 88 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--32">
            <Eyebrow>BoardSuite™ · The full system</Eyebrow>
            <h1 className="rd-h1 rd-h1--lg" style={{ fontSize: 84 }}>Three engines. One playbook. <span className="rd-accent">Your market.</span></h1>
            <p className="rd-intro rd-intro--19">Most agencies sell one lever. BoardSuite runs attract, close, and keep as a single connected system — one accountable team, one metro, one CAM company. Attract feeds Close. Close feeds Keep. Keep feeds the referrals that make Attract cheaper.</p>
            <HeroCtas secondary={{ label: 'See pricing', href: '/pricing' }} />
          </div>
          <div className="rd-stack" style={{ gap: 12 }}>
            {ENGINES.map((e, i) => (
              <a key={e.key} href={e.href} className={`rd-engine-tile rd-engine-tile--${e.key}`}>
                <div>
                  <div className="rd-engine-tile-stage">{e.stage}</div>
                  <div className="rd-engine-tile-brand">{e.title}</div>
                </div>
                <span className="rd-engine-tile-num">{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How the engines connect */}
      <section className="rd-section" style={{ padding: '0 0 40px' }}>
        <div className="rd-wrap rd-stack rd-stack--6 rd-rule-top" style={{ paddingTop: 64 }}>
          <Eyebrow tone="purple">How the engines connect</Eyebrow>
          <h2 className="rd-h2">Why one system beats three vendors.</h2>
          {ENGINES.map((e, i) => (
            <div key={e.key} className="rd-engine-row">
              <div className="rd-stack" style={{ gap: 12 }}>
                <div className="rd-engine-row-head">
                  <span className={`rd-numeral rd-numeral--${e.key}`} style={{ fontSize: 44 }}>{String(i + 1).padStart(2, '0')}</span>
                  <Label tone={e.key} size={12}>{e.stage}</Label>
                </div>
                <div className="rd-engine-row-brand">{e.title}</div>
                <p className="rd-small">{ENGINE_COPY[e.key]}</p>
                <div style={{ marginTop: 6 }}><TextLink href={e.href} size={12}>Engine overview</TextLink></div>
              </div>
              <div className="rd-pill-grid">
                {e.services.map((s) => (
                  <a key={s.href} href={s.href} className="rd-pill-link"><span>{s.label}</span><ChevronRightIcon /></a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack" style={{ gap: 36 }}>
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">Three tiers, scoped to your portfolio.</h2>
            <p className="rd-body">All-in retainers, billed monthly, no rate cards. The Strategic Review tells you which one maps to your doors and your metro.</p>
          </div>
          <div data-reveal data-rise className="rd-tiers">
            {TIERS.map((t) => (
              <div key={t.name} className={`rd-tier${t.popular ? ' rd-tier--popular' : ''}`}>
                <div className="rd-tier-head">
                  <div className="rd-tier-name">{t.name}</div>
                  {t.popular ? <span className="rd-tier-popular">Popular</span> : null}
                </div>
                <div className="rd-tier-sub">{t.sub}</div>
              </div>
            ))}
          </div>
          <div><TextLink href="/pricing" size={12}>Compare everything on the pricing page</TextLink></div>
        </div>
      </section>

      {/* Market exclusivity */}
      <section className="rd-section rd-bg-purple">
        <div className="rd-wrap rd-grid" style={{ gridTemplateColumns: '1fr 1.1fr', alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">Market exclusivity</Eyebrow>
            <h2 className="rd-h2" style={{ color: '#fff' }}>One CAM company per metro. Yours, or your competitor’s.</h2>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-body" style={{ color: '#fff', opacity: .85 }}>When you partner with Alloy, no competing CAM firm in your service area can engage us — for the life of the engagement. Your strategy, your messaging, your competitive intel, protected by contract.</p>
            <div className="rd-bullets">
              <div className="rd-bullet">No conflicts of interest, ever</div>
              <div className="rd-bullet">Competitive analysis in every quarterly review</div>
              <div className="rd-bullet">First access to new capabilities</div>
              <div className="rd-bullet">Lost-deal post-mortems — we follow what happened</div>
            </div>
            <div style={{ marginTop: 8 }}><TextLink href="/get-started" tone="white" size={12}>Check if your metro is open</TextLink></div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="rd-section" style={{ paddingBottom: 40 }}>
        <div className="rd-wrap rd-grid rd-grid--2" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow>One Alloy CAM partner · 3 years</Eyebrow>
            <h2 className="rd-h2">What the full system produced.</h2>
            <div style={{ marginTop: 8 }}><TextLink href="/results" size={12}>See all results</TextLink></div>
          </div>
          <div data-reveal data-rise className="rd-proof">
            <div className="rd-proof-item rd-proof-item--pink"><StatNumber stat={{ value: 535, suffix: '%', note: '' }} /><div className="rd-tiny" style={{ marginTop: 8 }}>lead intake</div></div>
            <div className="rd-proof-item rd-proof-item--yellow"><StatNumber stat={{ value: 3, suffix: '×', note: '' }} /><div className="rd-tiny" style={{ marginTop: 8 }}>proposal requests</div></div>
            <div className="rd-proof-item rd-proof-item--green"><StatNumber stat={{ value: 40, suffix: '–60%', note: '' }} /><div className="rd-tiny" style={{ marginTop: 8 }}>qualified to closed</div></div>
          </div>
        </div>
      </section>

      <div style={{ height: 56 }} />
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes tells you which engine to fix first. If your metro is open, we lock it in." />
        </div>
      </section>
    </div>
  );
}
