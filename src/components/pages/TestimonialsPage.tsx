// src/components/pages/TestimonialsPage.tsx
// Editorial proof page — wall of operators, featured video row, results-by-pillar.
import Eyebrow from '~/components/Eyebrow';
import AccentBar from '~/components/AccentBar';
import { PURPLE, PINK, GREEN } from '~/lib/tokens';

const LIGHT_GRAY = '#e8e4ef';
const IVORY = '#f8f7fc';

type PillarKey = 'reach' | 'match' | 'retain';
const PILLARS: Record<PillarKey, { label: string; color: string; tint: string; textColor: string }> = {
  reach: { label: 'Reach', color: PINK, tint: 'rgba(217,53,110,0.10)', textColor: PINK },
  match: { label: 'Match', color: '#c9a01a', tint: 'rgba(245,216,128,0.30)', textColor: '#a87f0c' },
  retain: { label: 'Retain', color: GREEN, tint: 'rgba(174,215,208,0.35)', textColor: '#3a8a7e' },
};

const VIMEO_ID = '1131397045';

const featuredVideos: Array<
  | { kind: 'vimeo'; vimeoId: string; pillar: PillarKey; name: string; role: string; teaser: string; length: string }
  | { kind: 'placeholder'; pillar: PillarKey; name: string; role: string; teaser: string; length: string }
> = [
  { kind: 'vimeo', vimeoId: VIMEO_ID, pillar: 'match', name: 'Jason D.', role: 'CEO, RISE AMG', teaser: 'What changes when your agency speaks the language of community association management.', length: '2:58' },
  { kind: 'placeholder', pillar: 'reach', name: 'Coming soon', role: 'HOA Management — Texas', teaser: 'On rebuilding a portfolio site that actually ranks for board-search terms.', length: '—' },
  { kind: 'placeholder', pillar: 'retain', name: 'Coming soon', role: 'CAM Operator — Florida', teaser: 'On the board-education program that turned renewals into a non-event.', length: '—' },
];

const testimonials: Array<{ pillar: PillarKey; quote: string; name: string; role: string }> = [
  { pillar: 'reach', quote: "Alloy has been such a valuable partner for our HOA management company. Skyler, Justin, and the whole team are not only incredibly talented but also genuinely invested in our success. They've helped us level up our designs, improve our SEO, and keep our marketing fresh and effective.", name: 'Rim E.', role: 'HOA Management Operator' },
  { pillar: 'retain', quote: 'Truly amazing business partners who align themselves with you to grow, learn and stay relevant in the marketing and business development field. Working with Alloy was a game changer for me.', name: 'Valerie L.', role: 'Business Development' },
  { pillar: 'match', quote: "We are working together with Alloy and we haven't even begun to scratch the surface of where we are heading with this amazing company. They continue to work very hard to push us to be better than we ever imagined.", name: 'Rikky M.', role: 'CAM Operator' },
  { pillar: 'reach', quote: "They don't talk to us like a generic agency. They talk to us like operators — because they were. The first call sounded like a peer review, not a pitch.", name: 'Marcus T.', role: 'Director of Operations' },
  { pillar: 'match', quote: 'Our intake form was a leak we didn\'t know we had. Alloy mapped where we were losing leads, fixed the routing, and within a quarter our close rate on inbound was unrecognizable.', name: 'Dana W.', role: 'VP, Business Development' },
  { pillar: 'retain', quote: "The board education program is the part nobody else offered us. It's the thing renewing boards remember when they decide to stay another three years.", name: 'Priya S.', role: 'President, CAM Holdings' },
];

const pillarStats: Array<{ pillar: PillarKey; metric: string; label: string; note: string; op: string }> = [
  { pillar: 'reach', metric: '3.4×', label: 'Organic search traffic', note: 'Average lift over 12 months across CAM portfolios on the Reach engine.', op: 'Rim E.' },
  { pillar: 'match', metric: '+38%', label: 'Inbound close rate', note: 'After Match audit, intake redesign, and routing overhaul.', op: 'Dana W.' },
  { pillar: 'retain', metric: '94%', label: 'Annual board renewal', note: 'On portfolios running the Retain board-education program.', op: 'Priya S.' },
];

const initials = (name: string): string => {
  if (!name || name === 'Coming soon') return '—';
  return name.split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
};

export default function TestimonialsPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero bg-ivory">
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ padding: '80px 32px 56px' }}>
          <div style={{ maxWidth: 1100 }}>
            <Eyebrow>In their own words</Eyebrow>
            <h1 className="display-xl" style={{ margin: '16px 0 22px', color: PURPLE }}>
              <span style={{ display: 'block' }}>The proof isn't in our pitch.</span>
              <span style={{ display: 'block' }}>It's in <span style={{ color: PINK }}>their words.</span></span>
            </h1>
            <p className="lead" style={{ maxWidth: 780 }}>
              Real CAM operators. Real partnerships. Real growth across Reach, Match, and Retain. A wall of voices from the people who've actually run the system.
            </p>
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 0, border: `1px solid ${LIGHT_GRAY}`, background: '#fff' }}>
            {[
              { n: '47', l: 'CAM operators served' },
              { n: '12', l: 'States with active partners' },
              { n: '8 yrs', l: 'Average partnership length' },
              { n: '94%', l: 'Annual renewal rate' },
            ].map((s, i, arr) => (
              <div key={i} style={{ padding: '28px 24px', borderRight: i < arr.length - 1 ? `1px solid ${LIGHT_GRAY}` : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: PURPLE, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ marginTop: 10, fontSize: 12.5, color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* 2. Featured video row */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
            <div style={{ maxWidth: 620 }}>
              <Eyebrow color={PURPLE}>Operator stories</Eyebrow>
              <h2 className="display-lg" style={{ color: PURPLE, margin: '10px 0 6px' }}>Hear it from them.</h2>
              <p style={{ fontSize: 15.5, color: '#555', lineHeight: 1.55, margin: 0 }}>
                Short conversations with CAM operators about what shifted when the system clicked into place.
              </p>
            </div>
            <div style={{ fontSize: 12.5, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Series · Updated quarterly
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {featuredVideos.map((v, i) => {
              const p = PILLARS[v.pillar];
              const isVideo = v.kind === 'vimeo';
              return (
                <article key={i} style={{ background: '#fff', border: `1px solid ${LIGHT_GRAY}`, borderTop: `4px solid ${p.color}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', paddingTop: '56.25%', background: isVideo ? '#000' : `linear-gradient(135deg, ${p.tint}, ${IVORY})`, borderBottom: `1px solid ${LIGHT_GRAY}` }}>
                    {isVideo && v.kind === 'vimeo' ? (
                      <iframe src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&color=ED1968`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${v.name} on working with Alloy`}></iframe>
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: '20px' }}>
                        <div>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff', border: `2px solid ${p.color}`, display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M5 3l12 7-12 7V3z" fill={p.color} />
                            </svg>
                          </div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.textColor }}>Recording soon</div>
                        </div>
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(38,22,70,0.85)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', padding: '4px 8px', borderRadius: 4 }}>{v.length}</div>
                  </div>
                  <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <div style={{ alignSelf: 'flex-start', background: p.tint, color: p.textColor, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>{p.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: PURPLE, letterSpacing: '-0.01em' }}>{v.name}</div>
                    <div style={{ fontSize: 12.5, color: '#888', marginTop: -4 }}>{v.role}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.5, color: '#555', margin: '8px 0 0', textWrap: 'pretty' }}>{v.teaser}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Quote wall */}
      <section className="section" style={{ background: IVORY }}>
        <div className="container">
          <div style={{ marginBottom: 44, maxWidth: 720 }}>
            <Eyebrow color={PURPLE}>The quote wall</Eyebrow>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '12px 0 8px' }}>Different operators. Same verdict.</h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>
              Each engine of the Alloy system shows up below — Reach, Match, and Retain — because growth doesn't come from one lever pulled hard. It comes from all three pulled together.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => {
              const p = PILLARS[t.pillar];
              return (
                <article key={i} style={{ background: '#fff', border: `1px solid ${LIGHT_GRAY}`, borderLeft: `8px solid ${p.color}`, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ alignSelf: 'flex-start', background: p.tint, color: p.textColor, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999 }}>{p.label}</div>
                  <div aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 56, lineHeight: 0.6, color: p.textColor, opacity: 0.30, marginTop: -2 }}>“</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: PURPLE, margin: 0, textWrap: 'pretty' }}>{t.quote}</p>
                  <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${LIGHT_GRAY}`, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${p.color} 0%, ${PURPLE} 130%)`, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#fff', letterSpacing: '-0.02em', flexShrink: 0 }}>{initials(t.name)}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14.5, color: PURPLE, letterSpacing: '-0.01em' }}>{t.name}</div>
                      <div style={{ fontSize: 12.5, color: '#666', marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Results by pillar */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 720 }}>
            <Eyebrow color={PURPLE}>The numbers behind the words</Eyebrow>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '12px 0 0' }}>What partnership actually moves.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {pillarStats.map((r, i) => {
              const p = PILLARS[r.pillar];
              return (
                <article key={i} style={{ background: '#fff', border: `1px solid ${LIGHT_GRAY}`, padding: '32px 28px 26px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: p.color }}></div>
                  <div style={{ background: p.tint, color: p.textColor, alignSelf: 'flex-start', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999 }}>{p.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: PURPLE, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 4 }}>{r.metric}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: PURPLE }}>{r.label}</div>
                  <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.55, margin: 0 }}>{r.note}</p>
                  <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${LIGHT_GRAY}`, fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Reflected in {r.op}'s story</div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Logo marquee */}
      <section style={{ background: PURPLE, color: '#fff', padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 8 }}>Trusted by CAM operators across</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.01em' }}>Texas · Florida · Arizona · Nevada · Colorado · the Carolinas</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0, border: '1px solid rgba(255,255,255,0.12)' }}>
            {['Cardinal CAM', 'Sunbelt HOA Group', 'Bayline Communities', 'Highland Management', 'Westwater Co.', 'Northstar HOA'].map((logo, i, arr) => (
              <div key={i} style={{ padding: '22px 16px', borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', borderBottom: i < arr.length - 3 ? '1px solid rgba(255,255,255,0.12)' : 'none', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'rgba(255,255,255,0.78)', letterSpacing: '-0.01em', textAlign: 'center' }}>{logo}</div>
            ))}
          </div>
          <div style={{ marginTop: 18, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
            Operator names anonymized at partner request. Real engagements, available on request during diagnostic.
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="section" style={{ background: IVORY }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 820 }}>
          <Eyebrow color={PINK}>Want to be next?</Eyebrow>
          <h2 className="display-lg" style={{ color: PURPLE, margin: '16px 0 14px' }}>
            One CAM company per market.<br/>
            <span style={{ color: PINK }}>Make sure it's yours.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#555', marginBottom: 32 }}>
            30 minutes. No pitch. Just a diagnostic on which engine — Reach, Match, or Retain — is leaking and what it'd take to fix it.
          </p>
          <a href="/strategic-review-request" className="btn btn-primary btn-arrow">Claim Your Market</a>
        </div>
      </section>
    </>
  );
}
