// src/components/pages/BoardMatchPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import EngineLoop from '~/components/EngineLoop';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, YELLOW } from '~/lib/tokens';

export default function BoardMatchPage() {
  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div className="hero-grid-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="pillar-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <EngineLoop pillar="match" active={true} size={48} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  BoardMatch™ · Close
                </span>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Turn conversations<br/>into <span style={{ color: YELLOW }}>signed contracts.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 32 }}>
                Strong operators losing bids to firms with better positioning, better discovery, better proposals. BoardMatch fixes the close — without changing what makes your service great.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/strategic-review-request">Talk close strategy</Button>
                <Button variant="secondary" onDark href="/services">See all engines</Button>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 32 }}>
              <Eyebrow onDark>Where deals leak</Eyebrow>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { k: 'Generic discovery', v: 'Asked 6 questions. Boards expect 26.' },
                  { k: 'Template proposals', v: 'Read like every other firm in the RFP.' },
                  { k: 'No follow-up system', v: '73% of lost deals had zero touches after week 2.' },
                  { k: 'Owner-only sales', v: 'Pipeline collapses when the owner is unavailable.' },
                ].map(p => (
                  <div key={p.k} style={{ borderLeft: `3px solid ${YELLOW}`, paddingLeft: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 14 }}>{p.k}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>{p.v}</div>
                  </div>
                ))}
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
              { h: 'Proposal optimization', d: 'Anatomy review, narrative rebuild, pricing presentation, and an RFP-response template that wins.' },
              { h: 'Sales messaging & UVP', d: "Re-position your firm against the three real competitors boards consider — and the 'do nothing' option." },
              { h: 'BD training', d: 'Discovery, qualification, objection-handling, and follow-up cadences for your owner-operator and any BD staff.', href: '/groundwork' },
              { h: 'Follow-up sequences', d: 'Built-out post-meeting nurture: 8-touch, 14-day cadences keyed to where the prospect went silent.' },
              { h: 'Shared board portal', d: 'A branded portal where prospects can review your proposal, ask questions, and access references — async and on their timeline.' },
              { h: 'RFP system & templates', d: 'Win-rate-tested RFP response framework. Plug-and-play sections for differentiation, pricing, transition, and references.' },
            ].map((c, i) => {
              const inner = (
                <div className="card card-pad pillar-card pillar-card-match" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.2 }}>{c.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, flex: 1 }}>{c.d}</div>
                  {c.href && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: YELLOW, fontFamily: 'var(--font-display)', letterSpacing: '0.02em', marginTop: 4 }}>
                      Learn more <Icon name="arrow-right" size={14} color={YELLOW} strokeWidth={2.5} />
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
      <CtaBand headline="Closing 1 in 4? You should be at 1 in 2." sub="30 minutes. We'll audit your current proposal anatomy and discovery process — no pitch." />
    </>
  );
}
