// src/components/pages/TestimonialsPage.tsx — /about/testimonials
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/about-testimonials.dc.html.
// Restored from the pre-redesign page: the full Rim E. review, the Valerie L. / Rikky M. quotes
// (attributed as the old page did), and the Jason D. / RISE AMG Vimeo video. The old page's
// Marcus T. / Dana W. / Priya S. quotes are left out until the client confirms they are real.
import type { CSSProperties } from 'react';
import { Eyebrow, Btn, CtaBar } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

interface Quote { quote: string; who: string; context: string; featured?: boolean }

const QUOTES: Quote[] = [
  { featured: true, quote: 'Alloy has been such a valuable partner for our HOA management company. Skyler, Justin, and the whole team are not only incredibly talented but also genuinely invested in our success. They’ve helped us level up our designs, improve our SEO, and keep our marketing fresh and effective.', who: 'Rim E.', context: 'HOA management operator' },
  { quote: 'We went from chasing RFPs to having boards reach out directly.', who: 'CEO', context: 'Alloy CAM partner · 3-year engagement' },
  { quote: 'We finally stopped guessing where leads came from — and watched the system compound.', who: 'Principal', context: 'Alloy CAM partner · 7-month engagement' },
  { quote: 'The proposal rebuild alone changed our close rate. Boards started asking about the transition plan instead of the fee.', who: 'Owner', context: 'Alloy CAM partner' },
  { quote: 'Our managers actually use the board education library. Renewals got quieter.', who: 'Director of Operations', context: 'Alloy CAM partner' },
];

/** Partner reviews carried over verbatim from the pre-redesign quote wall. */
const PARTNER_QUOTES: Array<{ quote: string; who: string; context: string }> = [
  { quote: 'Truly amazing business partners who align themselves with you to grow, learn and stay relevant in the marketing and business development field. Working with Alloy was a game changer for me.', who: 'Valerie L.', context: 'Business Development' },
  { quote: 'We are working together with Alloy and we haven’t even begun to scratch the surface of where we are heading with this amazing company. They continue to work very hard to push us to be better than we ever imagined.', who: 'Rikky M.', context: 'CAM Operator' },
];

const VIMEO_ID = '1131397045';

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

      {/* Video — Jason D., RISE AMG */}
      <section id="video" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Operator stories</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Hear it from them.</h2>
            <p className="rd-body" style={LH}>Jason D. runs RISE AMG. In under three minutes, he covers what changes when your agency speaks the language of community association management.</p>
          </div>
          <figure className="rd-stack rd-stack--14" style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: 'var(--alloy-purple)', boxShadow: 'var(--shadow-md)' }}>
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}`}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Jason D., CEO of RISE AMG, on working with Alloy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <figcaption className="rd-tiny">
              <strong className="rd-ink">Jason D.</strong> · CEO, RISE AMG · 2:58
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Partner reviews (pre-redesign quote wall) */}
      <section className="rd-section">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-stack rd-stack--18 rd-max-720">
            <Eyebrow tone="purple">The quote wall</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Different operators. Same verdict.</h2>
            <p className="rd-body" style={LH}>Growth doesn’t come from one lever pulled hard. It comes from all three engines pulled together.</p>
          </div>
          <div className="rd-grid rd-grid--2 rd-gap-20">
            {PARTNER_QUOTES.map((q) => (
              <figure key={q.who} className="rd-card rd-card--off" style={{ margin: 0, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <blockquote style={{ margin: 0, fontWeight: 500, fontSize: 17, lineHeight: 1.45, color: 'var(--alloy-purple)', textWrap: 'pretty' }}>
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

      {/* CTA — pre-redesign "Want to be next?" close */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Want to be next? One CAM company per market. Thirty minutes, no pitch — and you’ll know if yours is still open." />
        </div>
      </section>
    </div>
  );
}
