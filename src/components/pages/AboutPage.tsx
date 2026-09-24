// src/components/pages/AboutPage.tsx
// Ported from pages.jsx AboutPage().
import Eyebrow from '~/components/Eyebrow';
import AccentBar from '~/components/AccentBar';
import Icon from '~/components/Icon';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

export default function AboutPage() {
  // Each partner gets a designed gradient card with an icon representing their role
  // — not a "photo placeholder" — until real headshots are commissioned.
  const partners = [
    { name: 'Skyler Nelson', role: 'Managing Partner · Marketing', color: PINK,
      icon: 'target', roleLabel: 'Marketing',
      bio: 'Spent years inside HOA management running marketing — knows what boards search for, what makes a proposal land, and what fails.' },
    { name: 'Justin Guenther', role: 'Managing Partner · Learning & Development', color: YELLOW,
      icon: 'book', roleLabel: 'Learning & Development',
      bio: 'Built training and education programs inside a management company. Translates that capability into authority content no other agency can produce.' },
    { name: 'Cameron Lange', role: 'Managing Partner · Executive', color: GREEN,
      icon: 'compass', roleLabel: 'Executive',
      bio: 'Operated at the executive level inside CAM. Brings the operator\'s view of growth, retention, and what really drives portfolio value.' },
  ];

  return (
    <>
      <section className="hero bg-ivory">
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ padding: '80px 32px 64px' }}>
          <div style={{ maxWidth: 900 }}>
            <Eyebrow>Who we are</Eyebrow>
            <h1 className="display-xl" style={{ margin: '16px 0 22px', color: PURPLE }}>
              Built by three CAM operators who got <span style={{ color: PINK }}>tired of watching firms grow by accident.</span>
            </h1>
            <p className="lead">35+ combined years inside a community association management company — running marketing, learning &amp; development, and executive operations. Alloy is the agency we wished existed when we were inside.</p>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {partners.map((p, i) => (
              <div key={i} className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: `5px solid ${p.color}` }}>
                {/* Role card — designed graphic, not a photo placeholder. The icon represents
                    each partner's domain (target = marketing, book = L&D, compass = executive).
                    Replace with real headshots when they're commissioned. */}
                <div style={{
                  aspectRatio: '1 / 1', borderRadius: 12,
                  background: `linear-gradient(135deg, ${p.color} 0%, ${PURPLE} 130%)`,
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: 22,
                }}>
                  {/* Subtle radial highlight + bottom darken for depth */}
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.28) 100%)' }} aria-hidden="true"></div>

                  {/* Monogram — small, top-right, watermark-like */}
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff',
                      letterSpacing: '0.02em', opacity: 0.85,
                      background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(4px)',
                      borderRadius: 999, padding: '4px 10px', border: '1px solid rgba(255,255,255,0.18)',
                    }}>{p.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>

                  {/* Icon — centered hero element, the visual focus */}
                  <div style={{ position: 'relative', flex: 1, display: 'grid', placeItems: 'center' }} aria-hidden="true">
                    <div style={{
                      width: 96, height: 96, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)',
                      display: 'grid', placeItems: 'center', color: '#fff',
                    }}>
                      <Icon name={p.icon} size={48} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Role caption — bottom-left, tasteful, replaces the "Photo placeholder" text */}
                  <div style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)' }}>
                    {p.roleLabel}
                  </div>
                </div>
                <div>
                  <div className="display-md" style={{ fontSize: 22, color: PURPLE, margin: '8px 0 4px' }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: p.color === YELLOW ? '#8a6d12' : p.color === GREEN ? '#2c6a62' : PINK, marginBottom: 12 }}>{p.role}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{p.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <div>
              <Eyebrow onDark>Why we exist</Eyebrow>
              <h2 className="display-lg" style={{ color: '#fff', margin: '16px 0 0' }}>The problems we kept seeing — every CAM firm, every market.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { h: 'Broken growth engine', d: 'Referrals are unpredictable. Shared lead platforms send the same prospect to five competitors. Websites talk to residents, not boards.' },
                { h: 'Owner-dependent sales', d: 'Growth stalls when the owner can\'t personally drive every deal. The business is one missed week away from a flat quarter.' },
                { h: 'Proposal fatigue', d: 'Strong operators losing bids to firms with better positioning, better discovery, better proposals — not better service.' },
                { h: 'Manager-transition churn', d: 'Associations leaving after a community manager change because there\'s no system holding the relationship together.' },
              ].map(p => (
                <div key={p.h} style={{ borderLeft: `3px solid ${PINK}`, paddingLeft: 20 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>{p.h}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{p.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <Eyebrow noLine>Our discipline</Eyebrow>
          <h2 className="display-lg" style={{ margin: '16px auto 14px', color: PURPLE, maxWidth: 700 }}>Strategic. Direct. Insider. Encouraging. Human.</h2>
          <p className="lead" style={{ margin: '0 auto 0' }}>Five voice pillars that show up in every recommendation, every deliverable, every meeting. We lead with frameworks. We say what we mean. We speak the CAM language. We lift, never lecture. And we're never robotic.</p>
        </div>
      </section>
    </>
  );
}
