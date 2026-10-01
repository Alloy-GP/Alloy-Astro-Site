// src/components/pages/TestimonialsPage.tsx — /about/testimonials
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/about-testimonials.dc.html.
// Only client-confirmed testimonials are shown (Rim E. and Valerie L., supplied verbatim 2026-10-01) plus the
// partner-CEO Vimeo video (anonymized). The prototype's placeholder quotes and the old page's unverified
// quotes (Rikky M., Marcus T., Dana W., Priya S.) are left out until the client confirms they are real.
import type { CSSProperties } from 'react';
import { Eyebrow, Btn, CtaBar } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

interface Quote { quote: string; who: string; context: string }

const QUOTES: Quote[] = [
  { quote: 'Alloy has been such a valuable partner for our HOA management company. Skyler, Justin, and the whole team are not only incredibly talented but also genuinely invested in our success. They’ve helped us level up our designs, improve our SEO, and keep our marketing fresh and effective.', who: 'Rim E.', context: 'HOA Management Operator' },
  { quote: 'Truly amazing business partners who align themselves with you to grow, learn and stay relevant in the marketing and business development field. Working with Alloy was a game changer for me.', who: 'Valerie L.', context: 'Business Development' },
];

const VIMEO_ID = '1131397045';

function Stars() {
  return (
    <div role="img" aria-label="5 out of 5 stars" style={{ display: 'flex', gap: 3, color: 'var(--alloy-pink)' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
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
            <p className="rd-intro" style={LH}>Real partners, in their words. We publish first names and roles; firms and metros stay private.</p>
          </div>
        </div>
      </section>

      {/* Quote grid */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--2 rd-gap-20 rd-rule-top" style={{ paddingTop: 48 }}>
            {QUOTES.map((q) => (
              <figure key={q.who} className="rd-card" style={{ margin: 0, padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Stars />
                <blockquote style={{ margin: 0, fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: 'var(--alloy-purple)', textWrap: 'pretty' }}>
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

      {/* Video — partner CEO (kept anonymous per client, 2026-10-01) */}
      <section id="video" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Operator stories</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Hear it from them.</h2>
            <p className="rd-body" style={LH}>The CEO of an Alloy CAM partner, in under three minutes, on what changes when your agency speaks the language of community association management.</p>
          </div>
          <figure className="rd-stack rd-stack--14" style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: 'var(--alloy-purple)', boxShadow: 'var(--shadow-md)' }}>
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}`}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="A CAM company CEO on working with Alloy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <figcaption className="rd-tiny">
              <strong className="rd-ink">CEO, Alloy CAM partner</strong> · 2:58
            </figcaption>
          </figure>
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
