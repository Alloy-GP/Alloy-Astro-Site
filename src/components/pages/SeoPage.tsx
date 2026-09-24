// src/components/pages/SeoPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE } from '~/lib/tokens';

export default function SeoPage() {
  return (
    <>
      <PageHero
        eyebrow="Service · SEO & AI search"
        h1={<>Property management SEO<br/>built for the <span style={{ color: PINK }}>AI-search era.</span></>}
        sub="When boards ask ChatGPT 'which CAM firm should we use in Austin?' — does it cite you? Local SEO and GEO (generative engine optimization) engineered specifically for community association management."
        dark
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <Eyebrow>How AI search changes the game</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 18px', color: PURPLE }}>The first answer wins. The next nine don't matter.</h2>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 20 }}>Traditional SEO put you on page one. AI search gives boards <em>one answer</em>. If you're not it, you don't exist. The firms cited by ChatGPT, Perplexity, Gemini, and Google AI Overviews are winning meetings before competitors know there was a search.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Schema.org structured data (LocalBusiness, FAQ, Service) tuned for AI consumption',
                  'Authority content that AI engines reliably cite — not generic blog posts',
                  "Per-metro pillar pages with depth that thin competitor content can't match",
                  'Citation tracking across all major AI surfaces, monthly',
                  'Topic authority mapping — be the source AI returns to',
                ].map(s => (
                  <li key={s} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#444' }}>
                    <Icon name="check" size={18} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: PURPLE, color: '#fff', borderRadius: 16, padding: 32 }}>
              <Eyebrow onDark>Citation result</Eyebrow>
              <div style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Perplexity query</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 22, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 8, lineHeight: 1.4 }}>"What's the best CAM firm for a 200-unit HOA in Phoenix?"</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Cited sources</div>
              {[
                { n: '1', name: 'Apex CMG · About', color: YELLOW },
                { n: '2', name: 'Apex CMG · Service area', color: YELLOW },
                { n: '3', name: 'Phoenix HOA blog · 2024', color: PINK },
                { n: '4', name: 'BBB Accredited business listing', color: BLUE },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: s.color, color: PURPLE, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12 }}>{s.n}</div>
                  <div style={{ fontSize: 14 }}>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand headline="Want to be the answer AI cites?" sub="30 minutes. We'll show you what AI surfaces about your firm today and what we'd change first." />
    </>
  );
}
