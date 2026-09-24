// src/components/pages/BoardRetainPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import EngineLoop from '~/components/EngineLoop';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, GREEN } from '~/lib/tokens';

export default function BoardRetainPage() {
  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div className="hero-grid-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="pillar-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <EngineLoop pillar="retain" active={true} size={48} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  BoardRetain™ · Keep
                </span>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Protect the portfolio<br/><span style={{ color: GREEN }}>you've already built.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 32 }}>
                A 12% churn rate quietly undoes a 20% growth rate. BoardRetain is the engine most CAM firms forget exists — and the one that quietly compounds enterprise value year after year.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/strategic-review-request">Talk retention</Button>
                <Button variant="secondary" onDark href="/services">See all engines</Button>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 32 }}>
              <Eyebrow onDark>Why associations leave</Eyebrow>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { k: 'Manager turnover', v: 'Relationship walks out with the manager.' },
                  { k: 'Communication gaps', v: 'Boards stop hearing from you between cycles.' },
                  { k: 'No education layer', v: 'Boards forget why you were the right choice.' },
                  { k: 'Reputation drift', v: 'Negative reviews compound; positive ones are rare.' },
                ].map(p => (
                  <div key={p.k} style={{ borderLeft: `3px solid ${GREEN}`, paddingLeft: 14 }}>
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
              { h: 'Board education', d: 'Branded learning programs for new and seated directors. The CAM firm boards trust to teach them is the one they keep.', href: '/hoa-board-education-programs' },
              { h: 'Satisfaction & feedback', d: 'Quarterly NPS surveys, structured feedback collection, and at-risk-account alerting before contracts come up.' },
              { h: 'SOP creation', d: 'Documented service standards — boards see consistency across every manager and every season.' },
              { h: 'Reputation management', d: 'Review-generation system + response playbook. Make happy boards loud and dissatisfied boards heard early.', href: '/boardretain/reputation-management' },
              { h: 'Communication strategy', d: 'Board-facing newsletters, quarterly portfolio reports, and proactive comms that keep you top-of-mind between meetings.', href: '/services/hoa-newsletter-production' },
              { h: 'Manager onboarding', d: 'Compress new-manager ramp-time and reduce client churn caused by manager transitions.' },
              { h: 'Annual report', d: 'Designed annual reports — narrative, charts, photography, multi-channel delivery. The most-forwarded board artifact you ship all year.', href: '/boardretain/annual-report-production' },
            ].map((c, i) => {
              const inner = (
                <div className="card card-pad pillar-card pillar-card-retain" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.2 }}>{c.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, flex: 1 }}>{c.d}</div>
                  {c.href && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: GREEN, fontFamily: 'var(--font-display)', letterSpacing: '0.02em', marginTop: 4 }}>
                      Learn more <Icon name="arrow-right" size={14} color={GREEN} strokeWidth={2.5} />
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
      <CtaBand headline="Stop losing accounts to manager turnover." sub="30 minutes. We'll audit your current retention motion and the leaks costing you." />
    </>
  );
}
