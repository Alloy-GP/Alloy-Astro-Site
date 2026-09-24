// src/components/pages/BoardReachPage.tsx
// Ported from pages.jsx BoardReachPage().
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import EngineLoop from '~/components/EngineLoop';
import { BigStat } from '~/components/sections/Hero';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

export default function BoardReachPage() {
  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div className="hero-grid-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="pillar-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <EngineLoop pillar="reach" active={true} size={48} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  BoardReach™ · Attract
                </span>
              </div>
              <h1 className="display-xl" style={{ margin: '20px 0 22px', color: '#fff' }}>
                Get found <span style={{ color: YELLOW }}>before</span><br/>boards start shopping.
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 32 }}>
                Authority positioning, local SEO, AI search visibility, and demand generation engineered for the CAM industry. We turn your CAM firm into the answer boards reach for.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/strategic-review-request">Talk attract strategy</Button>
                <Button variant="secondary" onDark href="/services">See all engines</Button>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 32 }}>
              <Eyebrow onDark>Apex CMG* · 18 months</Eyebrow>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 22 }}>
                <BigStat color={PINK} label="Lead intake" value="535%" sub="vs prior baseline" onDark />
                <BigStat color={YELLOW} label="Proposal requests" value="3×" sub="growth" onDark />
                <BigStat color={GREEN} label="YoY opportunities" value="1,580%" sub="month over month" onDark />
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
            {[
              { h: 'Local SEO & GEO', d: 'Per-location optimization, GBP buildout, AI search citation strategy across Perplexity, ChatGPT, Gemini, and Google AI Overviews.', href: '/property-management-seo' },
              { h: 'Authority content', d: 'Pillar pages, micro-courses, and SEO blog content engineered for board-stage search intent. Educate boards before competitors do.' },
              { h: 'Paid acquisition', d: 'Google Ads, retargeting, and conversion-rate optimization. Setup, ongoing management, and quarterly rebalancing.' },
              { h: 'Email & newsletter', d: 'Branded templates, segmentation, drip nurtures, and an editorial calendar that keeps your CAM firm in front of every prospect.', href: '/boardreach/email-marketing' },
              { h: 'Social cadence', d: 'Founder thought-leadership ghostwriting, ~20 posts/month across channels, content repurposing from every long-form piece.', href: '/services/social-media-marketing-for-hoa-management-companies' },
              { h: 'Demand gen assets', d: 'Lead magnets, mailers, tradeshow suites, video scripts and explainer reels. Every asset is built for board-stage decision-making.' },
              { h: 'Brand identity', d: 'Logo, visual system, messaging architecture, and brand guidelines. The foundation every other marketing investment runs on.', href: '/boardreach/hoa-management-branding' },
            ].map((c, i) => {
              const inner = (
                <div className="card card-pad pillar-card pillar-card-reach" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.2 }}>{c.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, flex: 1 }}>{c.d}</div>
                  {c.href && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: PINK, fontFamily: 'var(--font-display)', letterSpacing: '0.02em', marginTop: 4 }}>
                      Learn more <Icon name="arrow-right" size={14} color={PINK} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              );
              return c.href
                ? <a key={i} href={c.href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
                : <div key={i}>{inner}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow noLine>What it costs to wait</Eyebrow>
            <h2 className="display-lg" style={{ margin: '16px auto 12px', color: PURPLE, maxWidth: 700 }}>Every quarter without authority is a quarter of accidental growth.</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Boards now research CAM firms across Google, AI search, LinkedIn, and review sites before the first call. The firms that show up — with real authority — win the meeting.</p>
          </div>
          <div style={{ background: PURPLE, color: '#fff', borderRadius: 16, padding: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, marginBottom: 6, letterSpacing: '-0.018em' }}>Ready to be the answer, not an option?</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>30-min diagnostic. No pitch — just where the leaks are.</div>
            </div>
            <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
          </div>
        </div>
      </section>
    </>
  );
}
