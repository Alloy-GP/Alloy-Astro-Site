// src/components/pages/WeKnowCamPage.tsx
// Ported from pages-extra.jsx WeKnowCamPage().
import Eyebrow from '~/components/Eyebrow';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

export default function WeKnowCamPage() {
  const proofs = [
    { color: PINK, k: '35+ yrs', v: 'Combined CAM operator experience across our three managing partners.' },
    { color: YELLOW, k: 'Inside ops', v: 'Marketing, learning, and executive functions — not from a brochure, from running them.' },
    { color: GREEN, k: 'CAI Member', v: "Engaged with the Community Associations Institute, the industry's governing body." },
    { color: BLUE, k: 'Operator-built', v: 'Every framework forged inside a real CAM firm before it became a deliverable.' },
  ];
  const versus = [
    { dim: 'Industry knowledge', us: "We've run CAM ops. We know AAR, AGR, manager-load math, and proposal anatomy.", them: 'Generic playbook adapted from B2B SaaS or local-services campaigns.' },
    { dim: 'Conflict of interest', us: 'One CAM firm per metro, by contract. Your strategy stays yours.', them: 'Same agency works with three competing firms in one city.' },
    { dim: 'Sales handoff', us: 'Groundwork prospects, qualifies, hands off with full context.', them: 'A web form lead. Good luck closing it.' },
    { dim: 'Retention strategy', us: 'BoardRetain protects existing portfolio with education, SOPs, comms.', them: "Retention isn't on the agency's roadmap." },
    { dim: 'Time to results', us: 'Engineered ramp — first signals in 90 days, compound by month 12.', them: "Month-to-month volume metrics that don't tie to revenue." },
  ];
  return (
    <>
      <PageHero
        eyebrow="We-Know-CAM™"
        h1={<>Generic agencies <span style={{ color: PINK }}>guess.</span><br/>Alloy <span style={{ color: PINK }}>knows.</span></>}
        sub="The CAM industry has its own language, its own buying cycle, its own board dynamics. An agency that doesn't already know that wastes the first six months learning. We don't have a learning curve."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {proofs.map(p => (
              <div key={p.k} style={{ borderTop: `4px solid ${p.color}`, paddingTop: 20 }}>
                <div className="display-md" style={{ fontSize: 36, color: PURPLE, lineHeight: 1, marginBottom: 12 }}>{p.k}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.55 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>What changes when your agency speaks CAM.</h2>
          </div>
          <div className="svc-compare-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ color: YELLOW }}>Alloy</div>
              <div style={{ opacity: 0.6 }}>Generic agency</div>
            </div>
            {versus.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#333', lineHeight: 1.55 }}>{row.us}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
