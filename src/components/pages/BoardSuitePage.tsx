// src/components/pages/BoardSuitePage.tsx
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { PageHero, CtaBand, PillarCard } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

interface Tier {
  name: string;
  color: string;
  sub: string;
  featured?: boolean;
  points: string[];
}

export default function BoardSuitePage() {
  const tiers: Tier[] = [
    { name: 'Steady', color: BLUE, sub: 'Single-location CAM firms getting started.', points: ['Full BoardSuite playbook', 'Quarterly strategy session', 'Standard execution timeline', 'Market exclusivity (single market)'] },
    { name: 'Accelerate', color: PINK, sub: 'Growth-focused firms ready to scale.', featured: true, points: ['Everything in Steady +', 'Accelerated execution', 'Priority strategy access', 'Competitive analysis', 'Lost-deal post-mortems'] },
    { name: 'Ascend', color: YELLOW, sub: 'Multi-location regional / national.', points: ['Everything in Accelerate +', 'Multi-market execution', '2 locations included', 'Advanced expansion strategies', 'Acquisition-ready GTM'] },
  ];
  return (
    <>
      <PageHero
        eyebrow="BoardSuite™"
        h1={<>The integrated growth system<br/>for <span style={{ color: PINK }}>community association management.</span></>}
        sub="Three engines — BoardReach, BoardMatch, BoardRetain — engineered into one connected playbook. Tier defines pace. Market exclusivity is non-negotiable. One CAM company per metro."
      />
      <section className="section section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {tiers.map(t => (
              <div key={t.name} style={{
                background: t.featured ? '#fff' : 'rgba(255,255,255,0.04)',
                color: t.featured ? PURPLE : '#fff',
                border: `1px solid ${t.featured ? 'transparent' : 'rgba(255,255,255,0.10)'}`,
                borderTop: `5px solid ${t.color}`,
                borderRadius: 12, padding: 32, position: 'relative',
                boxShadow: t.featured ? '0 24px 60px rgba(0,0,0,0.30)' : 'none',
              }}>
                {t.featured && <div style={{ position: 'absolute', top: -12, right: 24, background: PINK, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999 }}>Most chosen</div>}
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 8 }}>{t.name}</div>
                <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>{t.sub}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.points.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 10, fontSize: 14 }}>
                      <Icon name="check" size={16} color={t.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 28 }}>
                  <Button variant={t.featured ? 'primary' : 'secondary'} onDark={!t.featured} size="sm" href="/strategic-review-request">Discuss {t.name}</Button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, opacity: 0.6, color: '#fff' }}>
            All capabilities available to all tiers — tier defines pace, not access. Pricing is custom and engagement-dependent.
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <Eyebrow>Inside the system</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The three engines, working as one.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <PillarCard color={PINK} brand="BoardReach™" label="Attract" headline="Get found before boards start shopping." items={['Local SEO & GEO', 'Authority content', 'Paid acquisition', 'Email & newsletter', 'Demand gen assets']} href="/our-approach/boardreach" />
            <PillarCard color={YELLOW} brand="BoardMatch™" label="Close" headline="Turn conversations into signed contracts." items={['Proposal optimization', 'Sales messaging & UVP', 'BD training', 'Shared board portal', 'RFP system']} href="/our-approach/boardmatch" />
            <PillarCard color={GREEN} brand="BoardRetain™" label="Keep" headline="Protect the portfolio you have." items={['Board education', 'Satisfaction systems', 'SOP creation', 'Reputation management', 'Communication strategy']} href="/our-approach/boardretain" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
