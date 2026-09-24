// src/components/pages/ServiceBrandingPage.tsx
// Branding for HOA Management Companies — /boardreach/hoa-management-branding
import { useState } from 'react';
import AccentBar from '~/components/AccentBar';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

function BrandSystemMockup() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)', overflow: 'hidden', maxWidth: 480, transform: 'rotate(-1deg)' }}>
      <div style={{ padding: '14px 18px', background: PURPLE, color: '#fff' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: YELLOW, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Cornerstone PM · Brand system v1.0</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff', marginTop: 4 }}>The complete identity</div>
      </div>
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ background: '#fafaff', padding: '20px 16px', borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: PURPLE, letterSpacing: '-0.02em' }}>CORNERSTONE</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>Property Management</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Palette</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 12 }}>
          {[PURPLE, PINK, YELLOW, GREEN, '#0d2d45'].map((c, i) => (
            <div key={i} style={{ aspectRatio: '1 / 1', background: c, borderRadius: 4 }}></div>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Type</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div style={{ padding: 10, border: '1px solid #eee', borderRadius: 6 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: PURPLE, lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', letterSpacing: '0.10em', marginTop: 4 }}>SORA · DISPLAY</div>
          </div>
          <div style={{ padding: 10, border: '1px solid #eee', borderRadius: 6 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 18, color: PURPLE, lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', letterSpacing: '0.10em', marginTop: 4 }}>MANROPE · BODY</div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Applied to 24 surfaces</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['Web', 'Email', 'Newsletter', 'Proposal', 'Annual report', 'Social', 'Signage', 'Vehicle', 'Stationery', 'Slide deck'].map(s => (
            <span key={s} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: PURPLE, background: '#f4f0fa', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, bordered, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em' }}>
        <span>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)', color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0 }}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && <div className="reveal" style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>{a}</div>}
    </div>
  );
}

export default function ServiceBrandingPage() {
  const includes = [
    { icon: 'search',    h: 'Brand discovery',              d: 'Stakeholder interviews, competitor audit, market positioning. The strategic foundation — before any design moves.' },
    { icon: 'compass',   h: 'Positioning + messaging',      d: 'Why your firm exists, who it\'s for, what it stands against. Tagline, elevator pitch, voice principles. Documented and operator-tested.' },
    { icon: 'feather',   h: 'Logo + identity mark',         d: 'Primary mark, secondary marks, monograms. Built in vector, every format you need. Designed to read at 16px and 16ft.' },
    { icon: 'layers',    h: 'Color + type system',          d: 'Primary palette, accents, hierarchy rules. Type pairing for display, body, and UI. Tokens documented for web, print, and presentation.' },
    { icon: 'edit',      h: 'Voice + copy guide',           d: 'How your firm sounds. Examples for board comms, homeowner ops, sales, and crisis. Editorial guardrails — not corporate-speak.' },
    { icon: 'sparkles',  h: 'Component + pattern library',  d: 'Buttons, cards, badges, photo treatments, icon system. The Lego pieces every future deliverable is built from.' },
    { icon: 'globe',     h: 'Application across surfaces',  d: 'Website, email, newsletter, proposal, annual report, social, signage, vehicles, stationery, slide deck. 24 surfaces designed and templated.' },
    { icon: 'shield',    h: 'Brand guidelines doc',         d: '60–80 page operator-grade guide. Logo lockups, color tokens, type stack, voice, photography, do\'s-and-don\'ts. The reference your team uses for years.' },
    { icon: 'bar-chart', h: 'Rollout plan',                 d: '90-day phased rollout: high-impact surfaces first (web, proposal, email), legacy surfaces last. We don\'t disappear after the logo reveal.' },
  ];

  const stats = [
    { color: PINK,   k: '8 sec', v: 'median time a board director spends judging a CAM firm\'s brand before bouncing — site, email, or proposal cover.', src: 'Hotjar session data, multi-CAM' },
    { color: YELLOW, k: '73%',   v: 'of CAM firms have not refreshed brand identity in 8+ years. Generic regional templates are the norm — and look the same.', src: 'Alloy market scan, 2026' },
    { color: GREEN,  k: '2.4×',  v: 'median proposal-to-close lift when CAM firms move from default-template branding to a designed identity system.', src: 'Alloy benchmark, post-rebrand' },
    { color: BLUE,   k: '24',    v: 'surfaces a CAM firm has to look consistent across. Most firms have a logo and that\'s it — every other surface is invented in the moment.', src: 'Alloy brand scope' },
  ];

  const beforeAfter = [
    { dim: 'Identity',    before: 'Logo from 2014, no system around it',            after: 'Complete identity system — logo, palette, type, voice' },
    { dim: 'Surfaces',    before: 'Website looks one way, proposal another',        after: '24 surfaces designed and templated to one system' },
    { dim: 'Voice',       before: '\'Whoever wrote it\' tone',                      after: 'Documented voice principles, editorial examples' },
    { dim: 'Photography', before: 'Stock aerials and clip art',                     after: 'Photo direction, art direction, treatment guides' },
    { dim: 'Templates',   before: 'Re-invented every time something is needed',     after: 'Library covers proposals, emails, decks, docs, social' },
    { dim: 'Consistency', before: 'Operator hopes for the best',                    after: 'Design system enforced across team and vendors' },
    { dim: 'Rollout',     before: 'New logo, then radio silence',                   after: '90-day phased rollout, high-impact surfaces first' },
  ];

  const process = [
    { num: '01', h: 'Discover', d: 'Stakeholder interviews, market audit, competitive landscape, positioning workshop. Strategy before design.' },
    { num: '02', h: 'Define',   d: 'Positioning, voice, design principles, brand brief. Reviewed and approved by leadership before any pixel moves.' },
    { num: '03', h: 'Design',   d: 'Identity system: logo, palette, type, photography, components. Three directions reviewed; one refined and finalized.' },
    { num: '04', h: 'Deploy',   d: '24 surfaces designed and templated. Brand guidelines doc. 90-day phased rollout managed by Alloy.' },
  ];

  const faqs = [
    { q: 'How long does a CAM rebrand take?', a: 'Standard engagements run 12–16 weeks from kickoff to brand-guide delivery, plus a 90-day rollout. Larger firms with more surfaces (multiple sub-brands, multi-region operations) scope to 5–6 months. We don\'t ship in 4 weeks — that\'s a logo refresh, not a brand system.' },
    { q: 'What does it cost?', a: 'Standard CAM brand engagements range from $40K–$120K depending on scope (logo + system only vs. full surface rollout) and operations size. Number on a 30-min call after the discovery scope is set.' },
    { q: 'Can you just refresh our logo?', a: 'Yes — we\'ll do logo-only engagements for clients who already have a working system. But we\'ll tell you honestly if a logo refresh on a broken system will paint over rust. About one in three discovery calls turns into \'fix the system before the logo.\'' },
    { q: 'We have an in-house designer. Can they handle the rollout?', a: 'Yes — that\'s actually the cleanest setup. We deliver the system; your designer applies it. We hand off design tokens, Figma files, source files, and a written rollout playbook. We\'re available for 90 days post-delivery as a sounding board.' },
    { q: 'How does this fit with BoardSuite?', a: 'Brand is the foundation under every BoardSuite engine. Without a coherent identity, BoardReach lands traffic on visually generic pages, BoardMatch sends proposals that look like everyone else\'s, and BoardRetain communicates with homeowners in a voice that\'s invented every time. Most BoardSuite engagements that don\'t already have a strong brand start here.' },
  ];

  const colors = [PINK, YELLOW, GREEN, BLUE] as string[];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: YELLOW, boxShadow: '0 0 0 4px rgba(245,216,128,0.20)' }}></span>
                <Eyebrow onDark noLine>Foundation · Branding for CAM</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Your brand is the <span style={{ color: PINK }}>first proposal.</span><br/>
                Make it look like the <span style={{ color: YELLOW }}>last firm standing.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                73% of CAM firms haven't refreshed their identity in 8+ years. They look like every other regional firm — because they use the same templates. Alloy designs the complete identity system: 24 surfaces, one voice, built to read at 16px and 16ft.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">Audit my brand</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' }}>
                {[{ k: 'Lift', v: '2.4×' }, { k: 'Surfaces', v: '24' }, { k: 'Timeline', v: '12–16 wks' }].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(245,216,128,0.20) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '82%' }}><BrandSystemMockup /></div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The numbers behind a designed identity.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 22 }}>
                <div className="display-md" style={{ fontSize: 56, color: PURPLE, lineHeight: 0.95, marginBottom: 12, letterSpacing: '-0.025em', fontWeight: 800 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.55 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.08em', marginTop: 12, textTransform: 'uppercase', fontWeight: 600 }}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-you-get" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete identity system.</h2>
          </div>
          <ServiceList color={YELLOW} items={includes} />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Default templates vs. designed identity.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div><div style={{ opacity: 0.6 }}>Most CAM brands</div><div style={{ color: YELLOW }}>Alloy brand system</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={YELLOW} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we build it</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From discovery to rollout in <span style={{ color: YELLOW }}>12–16 weeks.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderTop: `3px solid ${colors[i]}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: colors[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>What CAM operators actually ask.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} bordered={i > 0} accent={YELLOW} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to audit how your brand reads?"
        sub="30 minutes. We'll review your website, proposal cover, email signature, and social — and show you the gap between what you look like and what you sound like."
      />
    </>
  );
}
