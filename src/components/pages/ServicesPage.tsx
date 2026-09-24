// src/components/pages/ServicesPage.tsx
// Ported from pages.jsx ServicesPage().
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Tag from '~/components/Tag';
import AccentBar from '~/components/AccentBar';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

export default function ServicesPage() {
  const pillars = [
    {
      id: 'boardreach', color: PINK, colorTint: 'var(--alloy-pink-tint)', icon: 'binoculars',
      brand: 'BoardReach™', label: 'Attract', h: 'Get found before boards start shopping.',
      exploreHref: '/our-approach/boardreach',
      services: [
        { label: 'Local SEO & GEO (AI search)' },
        { label: 'Content marketing & pillar pages' },
        { label: 'Google Ads / PPC' },
        { label: 'Website development' },
        { label: 'Email & newsletter',              href: '/boardreach/email-marketing' },
        { label: 'Social media cadence',            href: '/services/social-media-marketing-for-hoa-management-companies' },
        { label: 'Lead magnets' },
        { label: 'Mailers & print',                 href: '/boardreach/print-production' },
      ],
    },
    {
      id: 'boardmatch', color: YELLOW, colorTint: 'var(--alloy-yellow-tint)', icon: 'file-sig',
      brand: 'BoardMatch™', label: 'Close', h: 'Turn conversations into signed contracts.',
      exploreHref: '/our-approach/boardmatch',
      services: [
        { label: 'Proposal optimization' },
        { label: 'Sales messaging & UVP' },
        { label: 'BD training sessions',            href: '/groundwork' },
        { label: 'Follow-up email sequences' },
        { label: 'Shared board portal' },
        { label: 'RFP system & templates' },
        { label: 'Touch-point audit' },
        { label: 'Referral network development' },
      ],
    },
    {
      id: 'boardretain', color: GREEN, colorTint: 'var(--alloy-green-tint)', icon: 'shield',
      brand: 'BoardRetain™', label: 'Keep', h: 'Protect the portfolio you have.',
      exploreHref: '/our-approach/boardretain',
      services: [
        { label: 'Board education programs',        href: '/hoa-board-education-programs' },
        { label: 'Satisfaction & feedback systems' },
        { label: 'SOP creation' },
        { label: 'Reputation management',           href: '/boardretain/reputation-management' },
        { label: 'Communication strategy',          href: '/services/hoa-newsletter-production' },
        { label: 'Staff onboarding' },
        { label: 'Role-based training' },
        { label: 'Homeowner Happiness Plans' },
      ],
    },
  ];

  return (
    <>
      <section className="hero bg-ivory">
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ padding: '80px 32px 64px' }}>
          <Eyebrow>Services</Eyebrow>
          <h1 className="display-xl" style={{ margin: '16px 0 18px', maxWidth: 900, color: PURPLE }}>One growth partner. Three engines.<br/>Every service engineered for CAM.</h1>
          <p className="lead">Every Alloy service ladders up to BoardSuite — the integrated system that aligns attract, close, and keep into a single playbook for one CAM company per market.</p>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {pillars.map(p => (
              <div key={p.id} className="card card-pad" style={{ borderTop: `5px solid ${p.color}`, borderLeft: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: p.colorTint, color: PURPLE, display: 'grid', placeItems: 'center' }}>
                    <Icon name={p.icon} size={24} />
                  </div>
                  <Tag color={p.color === PINK ? 'pink' : p.color === YELLOW ? 'yellow' : 'green'}>{p.label}</Tag>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: PURPLE, letterSpacing: '-0.018em', lineHeight: 1.1 }}>{p.brand}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: PURPLE, lineHeight: 1.3 }}>{p.h}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.services.map(s => (
                    <li key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#555' }}>
                      <Icon name="check" size={16} color={p.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      {s.href
                        ? <a href={s.href} style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }} onMouseOver={e => (e.currentTarget.style.color = p.color)} onMouseOut={e => (e.currentTarget.style.color = '#555')}>{s.label}</a>
                        : <span>{s.label}</span>
                      }
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                  <Button variant="ghost" arrow href={p.exploreHref} size="sm">Explore {p.brand}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Eyebrow onDark>BoardSuite™</Eyebrow>
            <h2 className="display-lg" style={{ margin: '16px auto 14px', color: '#fff', maxWidth: 800 }}>The integrated system.<br/>Three tiers, one philosophy.</h2>
            <p className="lead on-dark" style={{ margin: '0 auto' }}>Tier defines execution speed and the pace of results — not what's accessible. Pricing is custom and engagement-dependent.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { name: 'Steady', color: BLUE, sub: 'Single-location CAM firms getting started.', points: ['Full BoardSuite playbook', 'Quarterly strategy session', 'Standard execution timeline'] },
              { name: 'Accelerate', color: PINK, sub: 'Growth-focused firms ready to scale.', featured: true, points: ['Everything in Steady +', 'Market exclusivity', 'Accelerated execution', 'Priority strategy access', 'Competitive analysis'] },
              { name: 'Ascend', color: YELLOW, sub: 'Multi-location regional / national.', points: ['Everything in Accelerate +', 'Multi-market execution', '2 locations included', 'Advanced expansion strategies'] },
            ].map(t => (
              <div key={t.name} style={{
                background: t.featured ? '#fff' : 'rgba(255,255,255,0.04)',
                color: t.featured ? PURPLE : '#fff',
                border: `1px solid ${t.featured ? 'transparent' : 'rgba(255,255,255,0.10)'}`,
                borderTop: `5px solid ${t.color}`,
                borderRadius: 12, padding: 32,
                position: 'relative',
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
          <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, opacity: 0.6 }}>
            All services available to all tiers — tier defines pace, not access. Pricing is custom and engagement-dependent.
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <div style={{ background: '#fff', borderRadius: 16, padding: 0, overflow: 'hidden', boxShadow: '0 16px 48px rgba(56,28,79,0.10)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '48px 52px' }}>
              <Eyebrow>Add-on · Groundwork</Eyebrow>
              <h2 className="display-md" style={{ margin: '14px 0 14px', color: PURPLE }}>Fractional business development.<br/>We don't just generate leads — we work them.</h2>
              <p style={{ color: '#555', lineHeight: 1.65, fontSize: 15, marginBottom: 24 }}>Alloy actively prospects on your behalf, qualifies board leads, and hands them off ready for your team to close. A name and phone number isn't a sales asset. A qualified prospect with context is.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 28 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, letterSpacing: '-0.025em', color: PINK, lineHeight: 0.9 }}>40‑60%</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4, fontWeight: 600 }}>Target conversion rate</div>
                </div>
                <div style={{ height: 60, width: 1, background: 'var(--border-subtle)' }}></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, letterSpacing: '-0.025em', color: PURPLE, lineHeight: 0.9 }}>1,580%</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4, fontWeight: 600 }}>YoY opportunity growth</div>
                </div>
              </div>
              <Button variant="primary" arrow href="/strategic-review-request">Add Groundwork</Button>
            </div>
            <div style={{ background: 'linear-gradient(160deg, #f5d880 0%, #d9356e 100%)', display: 'grid', placeItems: 'center', padding: 40 }}>
              <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 16px 40px rgba(0,0,0,0.20)', maxWidth: 320 }}>
                <Eyebrow>Process</Eyebrow>
                {[
                  { num: '01', label: 'Prospect', desc: 'Targeted outreach to qualified boards' },
                  { num: '02', label: 'Qualify', desc: 'Discovery, fit, urgency, decision authority' },
                  { num: '03', label: 'Hand off', desc: 'Warm intro with full context to your BD' },
                ].map(s => (
                  <div key={s.num} style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: PINK, fontSize: 14, letterSpacing: '0.1em' }}>{s.num}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
