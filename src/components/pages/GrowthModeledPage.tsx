// src/components/pages/GrowthModeledPage.tsx — /growth-modeled
// Template 6 (Editorial). Page shell (hero + CTA bar) from
// docs/redesign-handoff/site/growth-modeled.dc.html; assumption notes and "An estimate,
// not a quote" restored from the pre-redesign page. The prototype's placeholder box is where the
// existing interactive tool (src/components/modules/ROICalculator.tsx) mounts, unchanged.
//
// The shell itself is static. src/pages/growth-modeled.astro passes the calculator in as a
// hydrated child (`<ROICalculator client:load />`) so only the tool ships JS; if no child is
// passed, the calculator is rendered directly (hydrate the whole page in that case).
import type { CSSProperties, ReactNode } from 'react';
import ROICalculator from '~/components/modules/ROICalculator';
import { Eyebrow, CtaBar, TextLink } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

// The three model notes from the pre-redesign page, checked against ROICalculator's constants
// (3.2× lift on a 5%-of-associations baseline, 30% off 12% churn, doors × $/door × 12).
const ASSUMPTIONS = [
  { title: 'The lift assumption', body: '3.2× new contracts is modeled on Apex CMG*’s 535% lead intake increase, normalized to a typical CAM close rate. Conservative against our top quartile. “Today” assumes you win new contracts equal to 5% of the associations you manage.' },
  { title: 'The retention assumption', body: 'A 30% reduction on a 12% baseline churn rate. Engineered through BoardRetain: board education, satisfaction systems, reputation, communications cadence.' },
  { title: 'The fee assumption', body: 'Annual fee = doors × cost-per-door × 12. Most CAM firms run between $14–$28 per door per month. Year-one impact is new contracts plus associations retained, times that fee.' },
];

export default function GrowthModeledPage({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Growth modeled</Eyebrow>
            <h1 className="rd-h1">What does year one look like <span className="rd-accent">for your portfolio?</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>Three sliders: associations, doors, cost per door. New contracts, churn prevented, and year-one revenue, modeled on Alloy partner benchmarks.</p>
          </div>
        </div>
      </section>

      {/* Tool (existing ROICalculator, unchanged) */}
      <section id="model" className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          {children ?? <ROICalculator />}
        </div>
      </section>

      {/* Assumptions — what the numbers above are built on */}
      <section id="assumptions" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-stack rd-stack--18 rd-max-720">
            <Eyebrow>The assumptions</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">What the sliders assume.</h2>
          </div>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {ASSUMPTIONS.map((a, i) => (
              <div key={a.title} className="rd-card rd-card--pad rd-stack rd-stack--14">
                <span className="rd-numeral rd-numeral--36">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="rd-h4">{a.title}</h3>
                <p className="rd-small" style={LH}>{a.body}</p>
              </div>
            ))}
          </div>
          <div className="rd-row rd-row--wrap" style={{ gap: 16 }}>
            <p className="rd-tiny rd-tiny--12">* Client name and identifying details changed. Results are real and on file.</p>
            <TextLink href="/results/apex-cmg" size={11}>Read the case study</TextLink>
          </div>
        </div>
      </section>

      {/* What this isn't */}
      <section className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="purple">What this isn’t</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">An estimate, not a quote.</h2>
            <p className="rd-intro" style={LH}>The model gives you a directional answer in 30 seconds. The Strategic Review gives you a real one.</p>
          </div>
          <div className="rd-stack rd-stack--18">
            <p className="rd-body" style={LH}>Real outcomes depend on engagement scope, market dynamics, current sales motion, and what’s already working. Some firms see the modeled lift inside 12 months; others take 18. A handful exceed it. None of that shows up in a slider.</p>
            <p className="rd-body" style={LH}>Use this to decide whether the conversation is worth having. If the year-one number is meaningful to your business, the next step is a 30-minute call where we pressure-test it against your actual data.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Want the real number? The Strategic Review builds the model on your actual portfolio." />
        </div>
      </section>
    </div>
  );
}
