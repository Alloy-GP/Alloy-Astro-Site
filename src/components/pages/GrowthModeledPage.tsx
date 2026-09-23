// src/components/pages/GrowthModeledPage.tsx — /growth-modeled
// Template 6 (Editorial). Page shell (hero + CTA bar) from
// docs/redesign-handoff/site/growth-modeled.dc.html. The prototype's placeholder box is where the
// existing interactive tool (src/components/modules/ROICalculator.tsx) mounts, unchanged.
//
// The shell itself is static. src/pages/growth-modeled.astro passes the calculator in as a
// hydrated child (`<ROICalculator client:load />`) so only the tool ships JS; if no child is
// passed, the calculator is rendered directly (hydrate the whole page in that case).
import type { CSSProperties, ReactNode } from 'react';
import ROICalculator from '~/components/modules/ROICalculator';
import { Eyebrow, CtaBar } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

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
            <p className="rd-intro" style={LH}>Three sliders — associations, doors, cost per door. New contracts, churn prevented, and year-one revenue, modeled on Alloy partner benchmarks.</p>
          </div>
        </div>
      </section>

      {/* Tool (existing ROICalculator, unchanged) */}
      <section id="model" className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          {children ?? <ROICalculator />}
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
