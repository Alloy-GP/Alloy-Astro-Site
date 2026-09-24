// src/components/pages/AboutPage.tsx — /about
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/about.dc.html.
// Absorbs /about/we-know-cam: the "Why CAM-only" section carries the prototype copy plus the
// WeKnowCam proofs and the Alloy-vs-generic-agency comparison (formerly WeKnowCamPage.tsx).
// Team section keeps the real partner names/roles/bios and the designed role card
// (monogram + role icon) in place of the prototype's photo placeholders.
import type { CSSProperties } from 'react';
import Icon from '~/components/Icon';
import { Eyebrow, Label, StatBand, CtaBar } from '~/components/rd/atoms';
import type { StatItem } from '~/data/services/types';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

/** Editorial pages set body copy at 1.65 (rd-body/rd-intro default to 1.6, rd-small to 1.55). */
const LH: CSSProperties = { lineHeight: 1.65 };

const STATS: StatItem[] = [
  { value: 35, suffix: '+ years', note: 'Combined CAM operations experience across the partners' },
  { value: 1, suffix: 'industry', note: 'Community association management. Nothing else.' },
  { value: 1, suffix: 'firm per metro', note: 'Locked by contract for the life of the engagement' },
];

// From WeKnowCamPage — "35+ yrs" is omitted here because the stat band directly below carries it.
const PROOFS: Array<{ k: string; v: string; tone: 'pink' | 'yellow' | 'green' }> = [
  { k: 'Inside ops', v: 'Marketing, learning, and executive functions — not from a brochure, from running them.', tone: 'pink' },
  { k: 'CAI Member', v: "Engaged with the Community Associations Institute, the industry's governing body.", tone: 'yellow' },
  { k: 'Operator-built', v: 'Every framework forged inside a real CAM firm before it became a deliverable.', tone: 'green' },
];

// From WeKnowCamPage — "The honest comparison".
const VERSUS = [
  { dim: 'Industry knowledge', us: "We've run CAM ops. We know AAR, AGR, manager-load math, and proposal anatomy.", them: 'Generic playbook adapted from B2B SaaS or local-services campaigns.' },
  { dim: 'Conflict of interest', us: 'One CAM firm per metro, by contract. Your strategy stays yours.', them: 'Same agency works with three competing firms in one city.' },
  { dim: 'Sales handoff', us: 'Groundwork prospects, qualifies, hands off with full context.', them: 'A web form lead. Good luck closing it.' },
  { dim: 'Retention strategy', us: 'BoardRetain protects existing portfolio with education, SOPs, comms.', them: "Retention isn't on the agency's roadmap." },
  { dim: 'Time to results', us: 'Engineered ramp — first signals in 90 days, compound by month 12.', them: "Month-to-month volume metrics that don't tie to revenue." },
];

// Real partners (carried from the pre-redesign AboutPage). A partner renders a headshot when `photo`
// is set; otherwise the designed role card stands in until a headshot is supplied.
// `photo` = /assets/team/<slug> (a .jpg + .webp pair, 800×1000, 4:5). Partners without one get the RoleCard graphic.
const PARTNERS: Array<{ name: string; role: string; color: string; icon: string; roleLabel: string; bio: string; photo?: string }> = [
  { name: 'Skyler Nelson', role: 'Managing Partner · Marketing', color: PINK, icon: 'target', roleLabel: 'Marketing',
    photo: '/assets/team/skyler-nelson',
    bio: 'Spent years inside HOA management running marketing — knows what boards search for, what makes a proposal land, and what fails.' },
  { name: 'Justin Guenther', role: 'Managing Partner · Learning & Development', color: YELLOW, icon: 'book', roleLabel: 'Learning & Development',
    bio: 'Built training and education programs inside a management company. Translates that capability into authority content no other agency can produce.' },
  { name: 'Cameron Lange', role: 'Managing Partner · Executive', color: GREEN, icon: 'compass', roleLabel: 'Executive',
    bio: "Operated at the executive level inside CAM. Brings the operator's view of growth, retention, and what really drives portfolio value." },
];

const RULES = [
  { h: 'One CAM firm per market.', d: 'When you hire us, your competitor can’t. Ask your current agency if they’d agree to that.' },
  { h: 'All-in pricing.', d: 'The number you see is the number you pay. No rate cards, no scope surprises.' },
  { h: 'Twelve months minimum.', d: 'Growth compounds. We don’t take engagements too short to prove it.' },
  { h: 'Outcomes, not deliverables.', d: 'Lead volume, win rate, retention — reported quarterly. Not blog-post counts.' },
];

const roleStyle: CSSProperties = { fontSize: 13, color: 'var(--alloy-pink)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 2 };

function PhotoCard({ src, name }: { src: string; name: string }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={`${name}, headshot`}
        width={800}
        height={1000}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: '4 / 5', width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10, display: 'block', background: 'var(--alloy-light-gray)' }}
      />
    </picture>
  );
}

function RoleCard({ name, color, icon, roleLabel }: { name: string; color: string; icon: string; roleLabel: string }) {
  const monogram = name.split(' ').map((n) => n[0]).join('');
  return (
    // Designed graphic in the prototype's 4:5 photo slot. Icon = the partner's domain
    // (target = marketing, book = L&D, compass = executive). Swap for <img> headshots later.
    <div
      style={{
        aspectRatio: '4 / 5', borderRadius: 10, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${color} 0%, ${PURPLE} 130%)`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 22,
      }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.28) 100%)' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '0.02em', opacity: 0.85,
            background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '4px 10px',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {monogram}
        </span>
      </div>
      <div aria-hidden="true" style={{ position: 'relative', flex: 1, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', display: 'grid', placeItems: 'center', color: '#fff' }}>
          <Icon name={icon} size={48} strokeWidth={1.5} />
        </div>
      </div>
      <div style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)' }}>
        {roleLabel}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>About Alloy</Eyebrow>
            <h1 className="rd-h1">Operators first. <span className="rd-accent">Marketers second.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>Alloy was built by people who ran CAM portfolios and got tired of agencies that didn’t know what a reserve study was. We only work in community association management. We only take one firm per metro. That’s the whole model.</p>
          </div>
        </div>
      </section>

      {/* Why CAM-only (absorbs /about/we-know-cam) */}
      <section id="why-cam-only" className="rd-section">
        <div className="rd-wrap rd-stack" style={{ gap: 72 }}>
          <div className="rd-grid rd-grid--prose">
            <div className="rd-stack rd-stack--18">
              <Eyebrow tone="purple">Why CAM-only</Eyebrow>
              <h2 className="rd-h2">Generic agencies guess. <span className="rd-accent">We know.</span></h2>
              <p className="rd-small" style={LH}>The CAM industry has its own language, its own buying cycle, its own board dynamics. An agency that doesn't already know that wastes the first six months learning. We don't have a learning curve.</p>
            </div>
            <div className="rd-stack rd-stack--18">
              <p className="rd-body" style={LH}>An agency that also does dentists and restaurants learns your industry on your retainer. We already know which queries boards type, which directories matter, what a transition plan has to say, and why the renewal decision is made eleven months early.</p>
              <p className="rd-body" style={LH}>Every process we run — SEO, proposals, newsletters, board education — was built for CAM and nothing else. There is no template we adapt from another category. There is no other category.</p>
              <p className="rd-body" style={LH}>It also means we can’t hide. If a firm in your metro is growing, boards know who’s behind it. That accountability is the point.</p>
              <div className="rd-grid rd-grid--3 rd-gap-24" style={{ paddingTop: 18 }}>
                {PROOFS.map((p) => (
                  <div key={p.k} className={`rd-proof-item rd-proof-item--${p.tone}`}>
                    <div className="rd-title-18">{p.k}</div>
                    <p className="rd-tiny" style={{ marginTop: 8 }}>{p.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rd-stack rd-stack--24">
            <div className="rd-stack rd-stack--10">
              <Label>The honest comparison</Label>
              <h3 className="rd-h3">What changes when your agency speaks CAM.</h3>
            </div>
            <div className="rd-card rd-table-wrap">
              <table className="rd-table" style={{ minWidth: 640 }}>
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Dimension</th>
                    <th style={{ width: '39%', color: 'var(--alloy-pink)' }}>Alloy</th>
                    <th style={{ width: '39%' }}>Generic agency</th>
                  </tr>
                </thead>
                <tbody>
                  {VERSUS.map((r) => (
                    <tr key={r.dim}>
                      <td><strong>{r.dim}</strong></td>
                      <td>{r.us}</td>
                      <td className="rd-td-muted">{r.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap">
          <StatBand stats={STATS} />
        </div>
      </section>

      {/* The partners */}
      <section id="partners" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <Eyebrow>The partners</Eyebrow>
          <div className="rd-grid rd-grid--3" style={{ gap: 32 }}>
            {PARTNERS.map((p) => (
              <div key={p.name} className="rd-stack" style={{ gap: 12 }}>
                {p.photo ? <PhotoCard src={p.photo} name={p.name} /> : <RoleCard name={p.name} color={p.color} icon={p.icon} roleLabel={p.roleLabel} />}
                <div>
                  <div className="rd-title-18">{p.name}</div>
                  <div style={roleStyle}>{p.role}</div>
                </div>
                <p className="rd-small rd-small--14" style={LH}>{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="rd-h2">Four rules.</h2>
          </div>
          <div className="rd-stack">
            {RULES.map((r, i) => (
              <div key={r.h} className="rd-rule-bottom" style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, padding: '24px 0' }}>
                <span className="rd-numeral" style={{ fontSize: 32 }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="rd-stack rd-stack--6">
                  <div className="rd-h4">{r.h}</div>
                  <p className="rd-small" style={LH}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes with an operator, not a sales rep. If your metro is open, we’ll say so." />
        </div>
      </section>
    </div>
  );
}
