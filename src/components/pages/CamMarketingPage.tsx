// src/components/pages/CamMarketingPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK } from '~/lib/tokens';

export default function CamMarketingPage() {
  const services = [
    { h: 'Local SEO & GEO',       d: 'Per-location optimization, GBP buildout, AI-search citation strategy across Perplexity, ChatGPT, Gemini, Google AI Overviews.' },
    { h: 'Content marketing',      d: 'Pillar pages, board-stage SEO blogs, micro-courses. Educate boards before competitors do.' },
    { h: 'Paid acquisition',       d: 'Google Ads, retargeting, conversion-rate optimization. Setup, ongoing management, quarterly rebalancing.' },
    { h: 'Email & newsletter',     d: 'Branded templates, segmentation, drip nurtures, editorial calendar that keeps you in front of prospects.',                                            href: '/boardreach/email-marketing' },
    { h: 'Social cadence',         d: 'Founder thought-leadership, ~20 posts/month across channels, content repurposing from every long-form piece.',                                       href: '/services/social-media-marketing-for-hoa-management-companies' },
    { h: 'Demand gen assets',      d: 'Lead magnets, mailers, tradeshow suites, video scripts, explainer reels — every asset built for board-stage decision-making.' },
    { h: 'Website development',    d: 'Conversion-engineered sites that talk to boards (not residents), with proper SEO architecture and AI-search structured data.' },
    { h: 'Editorial planning',     d: 'Quarterly themes, monthly briefs, weekly publishing — a content operation that runs without you.' },
    { h: 'Reputation management',  d: 'Review generation systems, response playbooks, proactive sentiment monitoring across Google, Yelp, BBB.',                                            href: '/boardretain/reputation-management' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Service · CAM marketing"
        h1={<>Marketing services<br/>engineered for <span style={{ color: PINK }}>community association management.</span></>}
        sub="Every channel, every asset, every campaign — built specifically for CAM. No retrofitted SaaS playbooks. No 'we'll figure out your industry as we go.' We know the buying cycle because we lived it."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <Eyebrow>What's included</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The full marketing stack.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {services.map((s, i) => {
              const inner = (
                <div className="card card-pad pillar-card pillar-card-reach" style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
                  <div className="display-md" style={{ fontSize: 20, color: PURPLE, lineHeight: 1.2 }}>{s.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, flex: 1 }}>{s.d}</div>
                  {s.href && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: PINK, fontFamily: 'var(--font-display)', letterSpacing: '0.02em', marginTop: 4 }}>
                      Learn more <Icon name="arrow-right" size={14} color={PINK} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              );
              return s.href
                ? <a key={i} href={s.href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
                : <div key={i}>{inner}</div>;
            })}
          </div>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <Eyebrow noLine>The principle</Eyebrow>
          <h2 className="display-lg" style={{ margin: '14px auto 14px', color: PURPLE, maxWidth: 720 }}>"More marketing" doesn't grow CAM firms. <span style={{ color: PINK }}>Engineered marketing</span> does.</h2>
          <p className="lead" style={{ margin: '0 auto' }}>Every asset and every channel ladders up to one playbook — BoardSuite — so attract, close, and keep all reinforce each other instead of fragmenting your message.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
