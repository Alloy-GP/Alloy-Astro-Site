// src/components/pages/TestimonialsPage.tsx — /about/testimonials
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/about-testimonials.dc.html.
import type { CSSProperties } from 'react';
import { Eyebrow, Btn } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

interface Quote { quote: string; who: string; context: string; featured?: boolean }

const QUOTES: Quote[] = [
  { featured: true, quote: 'Alloy has been such a valuable partner for our HOA management company. Skyler, Justin, and the whole team are not only incredibly talented but also genuinely invested in our success.', who: 'Rim E.', context: 'HOA management operator' },
  { quote: 'We went from chasing RFPs to having boards reach out directly.', who: 'CEO', context: 'Alloy CAM partner · 3-year engagement' },
  { quote: 'We finally stopped guessing where leads came from — and watched the system compound.', who: 'Principal', context: 'Alloy CAM partner · 7-month engagement' },
  { quote: 'The proposal rebuild alone changed our close rate. Boards started asking about the transition plan instead of the fee.', who: 'Owner', context: 'Alloy CAM partner' },
  { quote: 'Our managers actually use the board education library. Renewals got quieter.', who: 'Director of Operations', context: 'Alloy CAM partner' },
];

function Stars() {
  return (
    <div role="img" aria-label="5 out of 5 stars" style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} aria-hidden="true" style={{ color: 'var(--alloy-pink)', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Testimonials</Eyebrow>
            <h1 className="rd-h1">What CAM operators say <span className="rd-accent">after the first year.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>Verified partners, in their words. Firms are named where they’ve agreed; metros are not.</p>
          </div>
        </div>
      </section>

      {/* Quote grid */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--2 rd-gap-20 rd-rule-top" style={{ paddingTop: 48 }}>
            {QUOTES.map((q) => (
              <figure
                key={q.quote}
                className="rd-card"
                style={{ margin: 0, padding: q.featured ? 36 : 28, display: 'flex', flexDirection: 'column', gap: 16, ...(q.featured ? { gridColumn: '1 / -1' } : {}) }}
              >
                <Stars />
                <blockquote
                  style={{ margin: 0, fontWeight: q.featured ? 700 : 500, fontSize: q.featured ? 26 : 17, lineHeight: 1.35, color: 'var(--alloy-purple)', textWrap: 'pretty' }}
                >
                  “{q.quote}”
                </blockquote>
                <figcaption className="rd-tiny" style={{ marginTop: 'auto' }}>
                  <strong className="rd-ink">{q.who}</strong> · {q.context}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Proof band */}
      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--2" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">The numbers behind the quotes</Eyebrow>
            <h2 className="rd-h2" style={{ color: '#fff' }}>Proof, disclosed.</h2>
          </div>
          <div className="rd-stack rd-stack--18">
            <p className="rd-body" style={{ color: '#fff', opacity: 0.85 }}>Every result we publish is a contracted client outcome measured against a pre-engagement baseline. Read them with the timeframes attached.</p>
            <div><Btn href="/results" className="rd-btn--inline" style={{ boxShadow: 'none' }}>See the results</Btn></div>
          </div>
        </div>
      </section>
    </div>
  );
}
