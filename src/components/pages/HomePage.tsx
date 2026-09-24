// src/components/pages/HomePage.tsx
// Homepage. Ported from pages.jsx HomePage().
// Tweaks removed — defaults are baked in: heroVariant=refined, heroLayout=split,
// colorMode=deep, density=editorial, animatedBar=true, statsHero=true.
import Hero from '~/components/sections/Hero';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import SystemDiagram from '~/components/modules/SystemDiagram';
import RiseCaseStudy from '~/components/modules/RiseCaseStudy';
import AuditQuiz from '~/components/modules/AuditQuiz';
import MarketChecker from '~/components/modules/MarketChecker';
import ResourceHub from '~/components/modules/ResourceHub';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

interface HomePageProps {
  /**
   * When true the Hero component is suppressed — the Astro page layer renders
   * HeroStatic.astro instead so the h1 appears in initial HTML without being
   * wrapped in a React island. This moves LCP from ~2,450 ms (hydration time)
   * to initial HTML parse/paint.
   */
  hideHero?: boolean;
}

export default function HomePage({ hideHero = false }: HomePageProps) {
  return (
    <>
      {!hideHero && <Hero variant="refined" layout="split" color="deep" animatedBar={true} statsHero={true} />}

      {/* Trust band */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '32px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE }}>Trusted by CAM operators across</div>
          <div className="home-trust-items" style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap', color: '#888', fontWeight: 600 }}>
            {['Apex CMG*', 'BBB Accredited', 'CAI Member', 'Austin · Phoenix · Denver', '35+ years CAM ops'].map((s) => (
              <div key={s} style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: PURPLE, fontWeight: 600, letterSpacing: '-0.005em' }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* The system */}
      <section className="section section-ivory">
        <div className="container">
          <div className="home-2col-intro" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'end', marginBottom: 40 }}>
            <div>
              <Eyebrow>The Alloy system</Eyebrow>
              <h2 className="display-lg" style={{ color: PURPLE, margin: '16px 0 0' }}>Three engines.<br/>One growth partner.</h2>
            </div>
            <p className="lead">Most agencies sell one lever. Alloy engineers all three — attract, close, keep — into a connected system, and runs them as one playbook for one CAM company per market.</p>
          </div>
          <div className="home-system-card" style={{ background: PURPLE, borderRadius: 16, padding: '48px 44px', boxShadow: '0 24px 60px rgba(56,28,79,0.20)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }}></div>
            <div style={{ position: 'relative' }}>
              <SystemDiagram onLearn="/our-approach/boardreach" />
            </div>
          </div>
        </div>
      </section>

      {/* Apex CMG Case Study */}
      <section className="section section-white">
        <div className="container">
          <div className="home-2col-intro" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'end', marginBottom: 48 }}>
            <div>
              <Eyebrow>Proof, not promises</Eyebrow>
              <h2 className="display-lg" style={{ margin: '16px 0 0', color: PURPLE }}>What 18 months looked like for Apex CMG*.</h2>
            </div>
            <p className="lead">A regional CAM firm. A broken growth engine. One BoardSuite Accelerate engagement. Numbers don't lie — and they're not statistical outliers, they're what engineered growth produces.</p>
          </div>
          <RiseCaseStudy />
        </div>
      </section>

      {/* Audit Quiz */}
      <section className="section section-mint">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Eyebrow noLine color="#3a7a6b">Self-diagnostic</Eyebrow>
            <h2 className="display-lg" style={{ margin: '16px auto 16px', color: PURPLE, maxWidth: 700 }}>How engineered is your growth, really?</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Four questions. Honest answers. We'll show you where the leaks are — and which engine to fix first.</p>
          </div>
          <AuditQuiz />
        </div>
      </section>

      {/* Market Exclusivity */}
      <section className="section section-white">
        <div className="container">
          <div className="home-2col-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <Eyebrow>Market exclusivity</Eyebrow>
              <h2 className="display-lg" style={{ margin: '16px 0 20px', color: PURPLE }}>One CAM company per metro.<br/>Yours, or your competitor's.</h2>
              <p className="lead" style={{ marginBottom: 24 }}>When you partner with Alloy, no competing CAM firm in your service area can engage us. Your strategy, your messaging, your competitive intel — protected by contract.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['No conflicts of interest, ever.', 'Competitive analysis in every quarterly review.', 'First access to new capabilities and tools.', 'Lost-deal post-mortems — we follow what happened.'].map((s) => (
                  <li key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: '#444' }}>
                    <Icon name="check" size={18} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div style={{ padding: '20px 24px', background: '#fff', border: '1px solid var(--border-subtle)', borderLeft: `4px solid ${YELLOW}`, borderRadius: 8, fontStyle: 'italic', color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.5 }}>
                "Ask your current agency if they'd stop working with your competitor."
              </div>
            </div>
            <MarketChecker />
          </div>
        </div>
      </section>

      {/* ROI teaser */}
      <section className="section section-ivory">
        <div className="container">
          <div className="home-roi-card" style={{ background: PURPLE, borderRadius: 16, padding: '56px 56px', color: '#fff', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'center', boxShadow: '0 24px 60px rgba(56,28,79,0.20)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 90% 10%, rgba(217,53,110,0.25) 0%, transparent 55%)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'relative' }}>
              <Eyebrow onDark noLine>Engineered growth, modeled</Eyebrow>
              <h2 className="display-lg" style={{ margin: '16px 0 16px', color: '#fff' }}>What does year one look like for your portfolio?</h2>
              <p className="lead on-dark" style={{ marginBottom: 24, opacity: 0.85 }}>Three sliders — associations, doors, cost-per-door. Watch new contracts, churn prevented, and year-one revenue reshape in real time. Modeled on Apex CMG* benchmarks.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/growth-modeled">See your model</Button>
                <Button variant="secondary" onDark href="/strategic-review-request">Build the real one</Button>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <TeaserStat color={PINK} label="New contracts" value="3.2×" />
              <TeaserStat color={GREEN} label="Churn cut" value="−30%" />
              <TeaserStat color={YELLOW} label="Year-one upside" value="$1M+" />
              <TeaserStat color="#a1c8e7" label="Sliders" value="3" />
            </div>
          </div>
        </div>
      </section>

      {/* POV */}
      <section style={{ background: '#fff', padding: '88px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-narrow" style={{ textAlign: 'center', position: 'relative' }}>
          <div aria-hidden="true" style={{ width: 48, height: 4, background: PINK, margin: '0 auto 28px', borderRadius: 2 }}></div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.2, letterSpacing: '-0.02em', textWrap: 'balance', color: PURPLE }}>
            "A growth plan you can't model<br/>
            <span style={{ background: 'linear-gradient(180deg, transparent 62%, var(--alloy-yellow) 62%, var(--alloy-yellow) 92%, transparent 92%)', padding: '0 4px' }}>is just a wish with a deck behind it.</span>"
          </div>
          <div style={{ marginTop: 22, color: '#555', fontSize: 15, lineHeight: 1.6, maxWidth: '52ch', margin: '22px auto 0' }}>
            That's why we put the model on a page. Three sliders, real assumptions, year-one numbers — before any pitch.
          </div>
          <div style={{ marginTop: 24 }}>
            <Button variant="secondary" arrow href="/growth-modeled">Open the model</Button>
          </div>
          <div style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, opacity: 0.55 }}>
            The Alloy POV
          </div>
        </div>
      </section>

      {/* Resource Hub */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Eyebrow>From the Alloy desk</Eyebrow>
              <h2 className="display-lg" style={{ margin: '16px 0 0', color: PURPLE }}>Insights, courses & field guides<br/>built for CAM operators.</h2>
            </div>
            <Button variant="secondary" arrow>All resources</Button>
          </div>
          <ResourceHub />
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, #381c4f 0%, #290d41 100%)', padding: '100px 0', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(217,53,110,0.30) 0%, transparent 60%)' }}></div>
        <div className="container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
          <Eyebrow onDark noLine>Ready when you are</Eyebrow>
          <h2 className="display-xl" style={{ margin: '16px auto 18px', color: '#fff', maxWidth: 1000 }}>Three engines. One playbook.<br/>Your market.</h2>
          <p className="lead on-dark" style={{ margin: '0 auto 32px' }}>Attract, close, and keep — engineered as one connected system. 30 minutes tells you which engine to fix first. If your metro is open, we'll lock it in.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
            <Button variant="secondary" onDark href="/services">Explore the system</Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Small color-coded stat used in the home-page ROI teaser card
function TeaserStat({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: '20px 18px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}
