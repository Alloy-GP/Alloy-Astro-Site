// src/components/pages/ResultsPage.tsx
import Eyebrow from '~/components/Eyebrow';
import RiseCaseStudy from '~/components/modules/RiseCaseStudy';
import MosaicCmgCaseStudy from '~/components/modules/MicroHoaCaseStudy';
import CaseStudyDivider from '~/components/modules/CaseStudyDivider';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

export default function ResultsPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Results"
        h1={<>Real numbers. <span style={{ color: PINK }}>Real CAM firms.</span><br/>No vanity metrics.</>}
        sub="Every result on this page is a contracted client outcome — measured against their pre-engagement baseline, verified, and disclosed in the spirit it was earned."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <Eyebrow>Two engagements · Two horizons</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 14px', color: PURPLE, maxWidth: '22ch' }}>The same engineered system, working at both ends of the curve.</h2>
            <p style={{ color: '#555', fontSize: 17, lineHeight: 1.6, maxWidth: '62ch', margin: '0 auto' }}>
              We don't need a wall of logos to make the case. One firm we've worked with for three years. Another we deployed in seven months. Same playbook. Different starting points. Both compounding.
            </p>
          </div>

          <CaseStudyDivider
            number="01" title="The long climb" kicker="3-year engagement"
            duration="3 yr" durationDetail="Three years of compounding"
            color={PINK} colorDeep="#a02152" ribbonFill={1}
          />
          <RiseCaseStudy />

          <div style={{ margin: '56px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, maxWidth: 480 }}>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,28,79,0.25))' }}></div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24,
              color: PURPLE, letterSpacing: '-0.02em', fontStyle: 'italic', opacity: 0.4,
            }}>vs.</div>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(56,28,79,0.25), transparent)' }}></div>
          </div>

          <CaseStudyDivider
            number="02" title="The short sprint" kicker="7-month engagement"
            duration="7 mo" durationDetail="Seven months of focused deployment"
            color={GREEN} colorDeep="#2c6a62" ribbonFill={7 / 36}
          />
          <MosaicCmgCaseStudy />

          <div style={{ marginTop: 40, textAlign: 'center', fontSize: 13, color: '#888', fontStyle: 'italic' }}>
            We choose depth over volume. New engagements get the same diagnostic rigor — and earn the same kind of disclosure.
          </div>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Eyebrow>Highlights across engagements</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>What engineered growth looks like.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { color: PINK, k: '535%', v: 'Lead intake increase, Apex CMG*, 3 years' },
              { color: YELLOW, k: '3×', v: 'Proposal request growth, Apex CMG*' },
              { color: GREEN, k: '+405%', v: 'Monthly inquiries growth, Mosaic CMG, 7 months' },
              { color: BLUE, k: '40‑60%', v: 'Groundwork qualified-to-close conversion' },
            ].map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 18 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: PURPLE, lineHeight: 0.95, letterSpacing: '-0.025em', marginBottom: 10 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ background: PURPLE, color: '#fff', borderRadius: 16, padding: 48, textAlign: 'center' }}>
            <Eyebrow onDark noLine>The disclosure</Eyebrow>
            <p className="lead on-dark" style={{ margin: '16px auto 0', maxWidth: 720 }}>We don't promise results. The numbers above are what engineered systems produced for specific CAM firms over specific timeframes. Your starting point, market, and execution discipline all matter. We'll be honest about what's realistic in your diagnostic call.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
