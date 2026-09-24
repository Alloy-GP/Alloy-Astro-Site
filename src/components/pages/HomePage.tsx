// src/components/pages/HomePage.tsx — everything on "/" below the hero.
// Static (no client directive). Copy from docs/redesign-handoff/site/index.dc.html.
// Islands are passed in as named slots from index.astro: `chart` (NetworkLeadsChart) and `webinar` (WebinarSignup).
import type { ReactNode } from 'react';
import { ENGINES } from '~/lib/nav';
import { Eyebrow, TextLink, CtaBar, Label, Btn, ArrowIcon } from '~/components/rd/atoms';

const ENGINE_BLURB: Record<string, string> = {
  reach: 'Boards find you before they start shopping. Local SEO, AI search, content, ads.',
  match: 'Conversations become signed contracts. Proposals, RFP system, fractional BD.',
  retain: 'The portfolio you have stays yours. Board education, reputation, newsletters.',
};


export default function HomePage({ chart, webinar }: { chart?: ReactNode; webinar?: ReactNode }) {
  return (
    <div className="rd-page">
      {/* Network leads · MatchHOA */}
      <section className="rd-section rd-bg-purple" style={{ padding: '80px 0' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-11" style={{ gap: 64, alignItems: 'stretch' }}>
          {chart}
          <div className="rd-stack rd-stack--18" style={{ justifyContent: 'center' }}>
            <Eyebrow tone="yellow">Network leads · MatchHOA</Eyebrow>
            <h2 className="rd-h2 rd-h2--44" style={{ color: '#fff' }}>We run the place boards go to find their next management company.</h2>
            <p className="rd-body" style={{ color: '#fff', opacity: .85, lineHeight: 1.55 }}>Boards submit on MatchHOA. In your metro, every one goes to you.</p>
            <div className="rd-row rd-row--wrap" style={{ gap: 22, paddingTop: 6 }}>
              <Btn href="/get-started" className="rd-btn--inline">Claim your market</Btn>
              <a href="https://matchhoa.com" className="rd-link rd-link--12" style={{ color: 'var(--alloy-yellow)' }} target="_blank" rel="noopener">matchhoa.com <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner ledger */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--48">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">The partner ledger.</h2>
            <p className="rd-body" style={{ lineHeight: 1.55 }}>One CAM company, one metro, three years in. This is what the exclusivity bought them.</p>
          </div>
          <div className="rd-grid rd-grid--2 rd-gap-20">
            <div data-reveal data-stagger className="rd-ledger">
              <div className="rd-ledger-row"><span className="rd-ledger-label">Lead intake vs. prior baseline</span><span className="rd-ledger-num"><span data-count="535" data-prefix="+">+535</span><span className="rd-stat-suffix">%</span></span></div>
              <div className="rd-ledger-row"><span className="rd-ledger-label">Proposal requests</span><span className="rd-ledger-num"><span data-count="3">3</span><span className="rd-stat-suffix">×</span></span></div>
              <div className="rd-ledger-row"><span className="rd-ledger-label">Qualified → closed</span><span className="rd-ledger-num"><span data-count="40">40</span><span className="rd-stat-suffix">–60%</span></span></div>
              <div className="rd-ledger-quote">“We went from chasing RFPs to having boards reach out directly.” <span className="rd-ink-body" style={{ fontWeight: 400 }}>— CEO, Alloy CAM partner</span></div>
            </div>
            <div data-reveal className="rd-card rd-card--pad rd-stack rd-stack--14">
              <div className="rd-row rd-row--between rd-tiny rd-tiny--12 rd-w-500"><span>Lead intake, indexed</span><span>Year 1 → Year 3</span></div>
              <svg viewBox="0 0 500 260" width="100%" style={{ display: 'block', overflow: 'visible', flex: 1 }} role="img" aria-label="Lead intake trend, year one to year three, rising sharply after Alloy engagement">
                <line x1="0" y1="220" x2="500" y2="220" stroke="#e8e4ef" /><line x1="0" y1="150" x2="500" y2="150" stroke="#e8e4ef" /><line x1="0" y1="80" x2="500" y2="80" stroke="#e8e4ef" /><line x1="0" y1="10" x2="500" y2="10" stroke="#e8e4ef" />
                <rect x="70" y="0" width="430" height="220" fill="rgba(245,216,128,.18)" data-fade />
                <text x="78" y="26" fontSize="11" fontWeight="700" fill="#381c4f" fontFamily="Gotham,sans-serif">WITH ALLOY</text>
                <polyline fill="none" stroke="#381c4f" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" points="0,214 35,212 70,211 120,200 170,184 230,160 290,128 350,94 410,60 460,36 500,20" pathLength={1} data-draw />
                <circle cx="500" cy="20" r="6" fill="#d9356e" data-pop />
                <text x="0" y="248" fontSize="11" fill="#555" fontFamily="Gotham,sans-serif">Year 1</text><text x="228" y="248" fontSize="11" fill="#555" fontFamily="Gotham,sans-serif">Year 2</text><text x="462" y="248" fontSize="11" fill="#555" fontFamily="Gotham,sans-serif">Year 3</text>
              </svg>
              <div><TextLink href="/results/apex-cmg" size={12}>Read the full case study</TextLink></div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="rd-section">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">What you get in your metro.</h2>
            <p className="rd-body" style={{ lineHeight: 1.55 }}>Attract, close, keep — run as one playbook, by one partner, for one CAM company in your market.</p>
          </div>
          <div className="rd-threeup">
            {ENGINES.map((e, i) => (
              <div key={e.key}>
                <span className={`rd-numeral rd-numeral--${e.key}`}>{String(i + 1).padStart(2, '0')}</span>
                <Label tone={e.key} size={12}>{e.stage}</Label>
                <a href={e.href} className="rd-title-26 rd-a" style={{ fontWeight: 700 }}>{e.title}</a>
                <div className="rd-small" style={{ lineHeight: 1.55 }}>{ENGINE_BLURB[e.key]}</div>
              </div>
            ))}
          </div>
          <CtaBar text="Not sure which engine is leaking? Thirty minutes, and we’ll tell you." />
        </div>
      </section>

      {/* News + webinar */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">What’s changing in CAM growth right now.</h2>
            <p className="rd-body" style={{ lineHeight: 1.55 }}>Search is moving to AI answers, boards are shopping locally first, and most CAM sites weren’t built for either. Here’s what we’re seeing and what to do about it.</p>
          </div>
          <div className="rd-news-grid">
            <article className="rd-news-card rd-news-card--lead">
              <div className="rd-row rd-row--between"><Label tone="pink" size={12}>AI search</Label><span className="rd-tiny rd-tiny--12">7 min read</span></div>
              <h3 className="rd-h3">Boards are asking ChatGPT who manages HOAs in their city. Is your firm the answer?</h3>
              <p className="rd-small" style={{ lineHeight: 1.55 }}>AI answers pull from a handful of sources — reviews, local citations, and pages that actually explain what you do. Most CAM sites give them nothing to quote. Three fixes you can make this month.</p>
              <div className="rd-mt-auto"><TextLink href="/property-management-seo" size={12}>Read the field note</TextLink></div>
            </article>
            <article className="rd-news-card rd-news-card--blue">
              <div className="rd-row rd-row--between"><span className="rd-label rd-label--12" style={{ color: '#4a86ad' }}>Local</span><span className="rd-tiny rd-tiny--12">5 min</span></div>
              <h3 className="rd-title-22">Why the map pack now decides your shortlist before the RFP does.</h3>
              <p className="rd-small rd-small--14" style={{ lineHeight: 1.55 }}>Boards check Google Maps first. If you’re not in the top three for your metro, you’re not in the conversation.</p>
              <div className="rd-mt-auto"><TextLink href="/property-management-seo" size={12}>Read</TextLink></div>
            </article>
            <article className="rd-news-card rd-news-card--yellow">
              <div className="rd-row rd-row--between"><Label tone="match" size={12}>Tips</Label><span className="rd-tiny rd-tiny--12">Checklist</span></div>
              <h3 className="rd-title-22">Five things a CAM firm can fix this quarter without an agency.</h3>
              <p className="rd-small rd-small--14" style={{ lineHeight: 1.55 }}>Review velocity, service-area pages, a proposal that answers the board’s real question. Small, unglamorous, effective.</p>
              <div className="rd-mt-auto"><TextLink href="/resources/cam-marketing-strategy" size={12}>Get the list</TextLink></div>
            </article>
          </div>
          <div className="rd-webinar">
            <div className="rd-row" style={{ gap: 24 }}>
              <div className="rd-date-tile">
                <div className="rd-label rd-label--yellow">Oct</div>
                <div className="rd-date-tile-day">14</div>
              </div>
              <div className="rd-stack rd-stack--6">
                <Label tone="pink" size={12}>Live webinar · 45 min</Label>
                <div className="rd-title-22 rd-ink">AI search for CAM: how boards find management companies in 2026</div>
                <div className="rd-small rd-small--14">For owners and BD leads. Recording sent to everyone who registers.</div>
              </div>
            </div>
            {webinar}
          </div>
        </div>
      </section>
    </div>
  );
}
