// src/components/pages/HomePage.tsx — everything on "/" below the hero.
// Static (no client directive). Copy from docs/redesign-handoff/site/index.dc.html.
// The network-leads chart island arrives as the named slot `chart` from index.astro.
import type { ReactNode } from 'react';
import { ENGINES } from '~/lib/nav';
import { Eyebrow, TextLink, LinkLabel, CtaBar, Label, Btn } from '~/components/rd/atoms';

// Trust-bar partner logos — mono (black-on-transparent) versions in public/assets/trust/, softened via .rd-trustbar-items img.
// Color/white originals sit beside them (*-color.png, think-tank-white.svg). Client 2026-10-02: Peak replaces "BBB Accredited",
// Think Tank HOA replaces "35+ years CAM ops", the CAI member logo replaces the "CAI Member" text, Innovia gets its better logo,
// Vantaca + CINC added. Footprints are matched (Think Tank at 28px tall is the reference) via .rd-trustbar-logo--* heights.
const TRUST_LOGOS = [
  { key: 'peak', src: '/assets/trust/peak.png', alt: 'Peak Executive Academy', w: 747, h: 169 },
  { key: 'cai', src: '/assets/trust/cai.png', alt: 'Member of Community Associations Institute', w: 469, h: 196 },
  { key: 'innovia', src: '/assets/trust/innovia.png', alt: 'Innovia Co-op', w: 352, h: 169 },
  { key: 'thinktank', src: '/assets/trust/think-tank.svg', alt: 'Think Tank HOA', w: 712, h: 134 },
  { key: 'vantaca', src: '/assets/trust/vantaca.png', alt: 'Vantaca', w: 1200, h: 347 },
  { key: 'cinc', src: '/assets/trust/cinc.png', alt: 'CINC Systems', w: 1200, h: 448 },
] as const;

const ENGINE_BLURB: Record<string, string> = {
  reach: 'Boards find you before they start shopping. Local SEO, AI search, content, ads.',
  match: 'Conversations become signed contracts. Proposals, RFP system, fractional BD.',
  retain: 'The portfolio you have stays yours. Board education, reputation, newsletters.',
};


export default function HomePage({ chart }: { chart?: ReactNode }) {
  return (
    <div className="rd-page">
      {/* Trust bar */}
      <section className="rd-trustbar" aria-label="Trusted by">
        <div className="rd-wrap rd-trustbar-inner">
          <div className="rd-trustbar-label">Trusted by CAM operators across</div>
          <ul className="rd-trustbar-items">
            {TRUST_LOGOS.map((l) => (
              <li key={l.key}><img className={`rd-trustbar-logo rd-trustbar-logo--${l.key}`} src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Network leads · MatchHOA */}
      <section className="rd-section rd-bg-purple rd-network" style={{ padding: '80px 0' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-11" style={{ gap: 64, alignItems: 'stretch' }}>
          {chart}
          <div className="rd-stack rd-stack--18" style={{ justifyContent: 'center' }}>
            <Eyebrow tone="yellow">Network leads · MatchHOA</Eyebrow>
            <h2 className="rd-h2 rd-h2--44" style={{ color: '#fff' }}>We run the place boards go to find their next HOA management company.</h2>
            <p className="rd-body" style={{ color: '#fff', opacity: .85, lineHeight: 1.55 }}>Boards submit on MatchHOA. In your metro, every one goes to you.</p>
            <div className="rd-row rd-row--wrap" style={{ gap: 22, paddingTop: 6 }}>
              <Btn href="/contact" className="rd-btn--inline">Claim your market</Btn>
              <a href="https://matchhoa.com" className="rd-logo-link" target="_blank" rel="noopener" title="matchhoa.com">
                <img src="/assets/match-hoa-white.svg" alt="MatchHOA" width={110} height={44} loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner ledger — client 2026-10-02: the section argues authority → stand out → growth; the ledger is the proof */}
      <section className="rd-section rd-bg-off rd-ledger-section">
        <div className="rd-wrap rd-stack rd-stack--48">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">Become the authority in your market. <span className="rd-accent">Growth follows.</span></h2>
            <p className="rd-body" style={{ lineHeight: 1.55 }}>Own the search results, the AI answers and the referral network in your metro, and you stop looking like one option among ten. Boards stop comparing and start calling. Here’s what that looked like for one CAM company, one metro, three years in.</p>
          </div>
          <div className="rd-grid rd-grid--2 rd-gap-20">
            <div data-reveal data-stagger className="rd-ledger">
              <div className="rd-ledger-row"><span className="rd-ledger-label">Inbound board leads vs. the year before</span><span className="rd-ledger-num"><span data-count="535" data-prefix="+">+535</span><span className="rd-stat-suffix">%</span></span></div>
              <div className="rd-ledger-row"><span className="rd-ledger-label">Proposal requests</span><span className="rd-ledger-num"><span data-count="3">3</span><span className="rd-stat-suffix">×</span></span></div>
              <div className="rd-ledger-row"><span className="rd-ledger-label">Qualified leads that closed</span><span className="rd-ledger-num"><span data-count="45">45</span><span className="rd-stat-suffix">% avg</span></span></div>
              <div className="rd-ledger-quote">“We went from chasing RFPs to having boards reach out directly.” <span className="rd-ink-body" style={{ fontWeight: 400 }}>— CEO, Alloy CAM partner</span></div>
            </div>
            <div data-reveal className="rd-card rd-card--pad rd-stack rd-stack--14">
              <div className="rd-row rd-row--between rd-tiny rd-tiny--12 rd-w-500"><span>Inbound board leads, indexed</span><span>Year 1 → Year 3</span></div>
              <svg viewBox="0 0 500 260" width="100%" style={{ display: 'block', overflow: 'visible', flex: 1 }} role="img" aria-label="Inbound board leads, year one to year three, rising sharply after the Alloy engagement">
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
          {/* Whole block is the link (≤720 it becomes a tappable 52px/1fr row — mobile.css) */}
          <div className="rd-threeup rd-threeup--engines">
            {ENGINES.map((e, i) => (
              <a key={e.key} href={e.href} className="rd-engine-item">
                <span className={`rd-numeral rd-numeral--${e.key}`}>{String(i + 1).padStart(2, '0')}</span>
                <Label tone={e.key} size={12}>{e.stage}</Label>
                <span className="rd-title-26 rd-ink" style={{ fontWeight: 700 }}>{e.title}</span>
                <span className="rd-small" style={{ lineHeight: 1.55, display: 'block' }}>{ENGINE_BLURB[e.key]}</span>
              </a>
            ))}
          </div>
          <CtaBar text="Not sure which engine is leaking? Thirty minutes, and we’ll tell you." />
        </div>
      </section>

      {/* From the resource hub — real pieces only (client, 2026-10-01: no placeholder articles, no event block) */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">What’s changing in CAM growth right now.</h2>
            <p className="rd-body" style={{ lineHeight: 1.55 }}>Search is moving to AI answers, boards are shopping locally first, and most CAM sites weren’t built for either. Three pieces from the resource hub on what to do about it.</p>
          </div>
          <div className="rd-news-grid">
            <a href="/resources/ai-search-for-cam" className="rd-news-card rd-news-card--lead rd-card-link">
              <img className="rd-news-img" src="/assets/resources/ai-search-for-cam-card.jpg" alt="" width={800} height={447} loading="lazy" decoding="async" />
              <div className="rd-row rd-row--between"><Label tone="pink" size={12}>AI search</Label><span className="rd-tiny rd-tiny--12">3 min read</span></div>
              <h3 className="rd-h3">How CAM firms win in AI search.</h3>
              <p className="rd-small" style={{ lineHeight: 1.55 }}>ChatGPT, Perplexity, Gemini, and Google AI Overviews now answer board questions before your website does. The firms cited are winning meetings competitors don’t even know happened.</p>
              <div className="rd-mt-auto"><LinkLabel>Read the article</LinkLabel></div>
            </a>
            {/* ≤720: the two secondary cards scroll in a 280px snap rail; desktop: display: contents */}
            <div className="rd-news-rail">
            <a href="/resources/cam-marketing-strategy" className="rd-news-card rd-news-card--blue rd-card-link">
              <div className="rd-row rd-row--between"><span className="rd-label rd-label--12" style={{ color: '#4a86ad' }}>Strategy</span><span className="rd-tiny rd-tiny--12">12 min</span></div>
              <h3 className="rd-title-22">CAM marketing strategy: the plan before the tactics.</h3>
              <p className="rd-small rd-small--14" style={{ lineHeight: 1.55 }}>Why “do more marketing” fails, and what an engineered, system-first growth plan looks like over 18 months.</p>
              <div className="rd-mt-auto"><LinkLabel>Read</LinkLabel></div>
            </a>
            <a href="/resources/hoa-management-software-guide" className="rd-news-card rd-news-card--yellow rd-card-link">
              <div className="rd-row rd-row--between"><Label tone="match" size={12}>Guide</Label><span className="rd-tiny rd-tiny--12">Long read</span></div>
              <h3 className="rd-title-22">The HOA management software guide.</h3>
              <p className="rd-small rd-small--14" style={{ lineHeight: 1.55 }}>Platforms, pricing tiers, the nine features that decide renewal, and a 14-question RFP you can send to every vendor.</p>
              <div className="rd-mt-auto"><LinkLabel>Read the guide</LinkLabel></div>
            </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
