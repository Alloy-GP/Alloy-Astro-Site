// src/components/pages/GrowthModeledPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import ROICalculator from '~/components/modules/ROICalculator';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

export default function GrowthModeledPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineered growth, modeled"
        h1={<>See your growth model.<br/>Then we build the real one together.</>}
        sub="Move three sliders and watch year-one impact reshape in real time. The same model we use in every diagnostic call — sized to your portfolio, your fees, your churn baseline."
      />
      <section className="section section-white">
        <div className="container">
          <ROICalculator />
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
            <ModelNote color={PINK} num="01" title="The lift assumption" body="3.2× new contracts is modeled on Apex CMG*'s 535% lead intake increase, normalized to a typical CAM close rate. Conservative against our top quartile." />
            <ModelNote color={GREEN} num="02" title="The retention assumption" body="A 30% reduction on a 12% baseline churn rate. Engineered through BoardRetain — board education, satisfaction systems, reputation, communications cadence." />
            <ModelNote color={YELLOW} num="03" title="The fee assumption" body="Annual fee = doors × cost-per-door × 12. Tune each slider to match your portfolio. Most CAM firms run between $14–$28 per door per month." />
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
            <div>
              <Eyebrow>What this isn't</Eyebrow>
              <h2 className="display-lg" style={{ margin: '16px 0 16px', color: PURPLE }}>An estimate, not a quote.</h2>
              <p className="lead" style={{ marginBottom: 20 }}>The model gives you a directional answer in 30 seconds. The diagnostic call gives you a real one.</p>
              <p style={{ color: '#555', lineHeight: 1.65, marginBottom: 16 }}>Real outcomes depend on engagement scope, market dynamics, current sales motion, and what's already working. Some firms see the modeled lift inside 12 months; others take 18. A handful exceed it. None of that shows up in a slider.</p>
              <p style={{ color: '#555', lineHeight: 1.65 }}>Use this to decide whether the conversation is worth having. If the year-one number is meaningful to your business, the next step is a 30-minute call where we pressure-test it against your actual data.</p>
            </div>
            <div style={{ background: PURPLE, borderRadius: 16, padding: '40px 44px', color: '#fff', boxShadow: '0 24px 60px rgba(56,28,79,0.18)' }}>
              <Eyebrow onDark noLine>What you'll leave with</Eyebrow>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'A custom model sized to your real portfolio, fees, and churn — not the slider defaults.',
                  'An honest read on which engine — Reach, Match, or Retain — is the constraint right now.',
                  'Confirmation that your metro is open (or a heads-up that a competitor is already in conversation).',
                  'A 90-day plan and 18-month arc, with the lift assumptions stress-tested against your baseline.',
                ].map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 999, background: PINK, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12 }}>{i + 1}</div>
                    <span style={{ fontSize: 15, lineHeight: 1.55 }}>{s}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">Build my real model</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand
        headline="Numbers on a slider, then numbers on a contract."
        sub="The slider gives you a feel. The diagnostic call gives you a plan. 30 minutes — no pitch."
      />
    </>
  );
}

function ModelNote({ color, num, title, body }: { color: string; num: string; title: string; body: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '32px 28px', border: '1px solid var(--border-subtle)', borderTop: `4px solid ${color}` }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color, letterSpacing: '0.06em' }}>{num}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: PURPLE, letterSpacing: '-0.01em', margin: '8px 0 12px', lineHeight: 1.25 }}>{title}</div>
      <p style={{ margin: 0, color: '#555', fontSize: 14, lineHeight: 1.65 }}>{body}</p>
    </div>
  );
}
