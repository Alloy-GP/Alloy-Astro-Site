// src/components/pages/GroundworkPage.tsx
import Eyebrow from '~/components/Eyebrow';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { BigStat } from '~/components/sections/Hero';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

export default function GroundworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Add-on · Groundwork"
        h1={<>Fractional business development.<br/>We don't just generate leads — <span style={{ color: PINK }}>we work them.</span></>}
        sub="Alloy actively prospects on your behalf, qualifies board-level conversations, and hands off ready-to-close opportunities to your team. A name and phone number isn't a sales asset. A qualified prospect with full context is."
        dark
        sideStat={
          <div>
            <Eyebrow onDark>The numbers</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 22 }}>
              <BigStat color={PINK} label="Qualified-to-close rate" value="40‑60%" sub="target conversion" onDark />
              <BigStat color={YELLOW} label="YoY opportunities" value="1,580%" sub="month-over-month" onDark />
              <BigStat color={GREEN} label="Owner BD hours saved" value="20+/wk" sub="back to the business" onDark />
            </div>
          </div>
        }
      />
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { num: '01', h: 'Identify', d: 'Custom prospect lists built from board-rotation timing, RFP signals, and association-level fit.' },
              { num: '02', h: 'Outreach', d: 'Multi-channel cadences — email, LinkedIn, direct mail, phone — with messaging keyed to board pain.' },
              { num: '03', h: 'Qualify', d: 'Discovery conversations that test fit, urgency, decision authority, and budget — before your team gets involved.' },
              { num: '04', h: 'Hand off', d: 'Warm intro to your BD with full context, decision criteria, and a recommended next move.' },
            ].map(s => (
              <div key={s.num} className="card card-pad">
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: PINK, fontSize: 12, letterSpacing: '0.14em', marginBottom: 10 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand headline="Tired of working leads yourself?" sub="Add Groundwork to BoardSuite and get your time back. 30-min call to scope your market." />
    </>
  );
}
