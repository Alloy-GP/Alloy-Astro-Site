// src/components/pages/ServiceHOAWebsiteDesignPage.tsx
import { useState, Fragment } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

function FAQItem({ q, a, bordered, accent }: { q: string; a: string; bordered?: boolean; accent?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: bordered ? '1px solid var(--border-subtle)' : undefined }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: PURPLE, lineHeight: 1.3 }}>{q}</span>
        <Icon name={open ? 'x' : 'plus'} size={18} color={accent || PINK} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ paddingBottom: 20, fontSize: 15, color: '#444', lineHeight: 1.7 }}>{a}</div>
      )}
    </div>
  );
}

function BrowserMockup({ branded = true }: { branded?: boolean }) {
  const accent = branded ? PINK : '#999';
  return (
    <div style={{
      background: branded ? '#fff' : '#fbfbfb',
      borderRadius: 10,
      boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)',
      width: '100%',
      maxWidth: 480,
      overflow: 'hidden',
      transform: branded ? 'rotate(-1deg)' : 'rotate(1.5deg)',
      fontFamily: 'var(--font-body)',
      position: 'relative' as const,
      border: branded ? 'none' : '1px solid #ddd',
    }}>
      {/* Browser chrome */}
      <div style={{ padding: '10px 14px', background: branded ? '#f4f0fa' : '#ececec', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#fb6c5b' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#f8bb3e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#5dc850' }}></span>
        </div>
        <div style={{
          flex: 1, marginLeft: 12,
          background: '#fff',
          padding: '5px 12px',
          borderRadius: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 10, color: '#666',
          border: '1px solid #e0e0e0',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: branded ? '#19c37d' : '#999', fontSize: 9 }}>{branded ? '🔒' : '⚠'}</span>
          {branded ? 'cornerstonepm.com' : 'midwestcam-2014.com/index.html'}
        </div>
      </div>

      {branded ? (
        <>
          <div style={{ padding: '24px 22px 20px', background: `linear-gradient(160deg, ${PURPLE} 0%, #4a2766 100%)`, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: '#fff' }}>CORNERSTONE</div>
              <div style={{ display: 'flex', gap: 10, fontSize: 9, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                <span>For Boards</span><span>For Homeowners</span><span>About</span>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 8 }}>
              The CAM partner Austin boards trust.
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 12 }}>
              412 communities. 18 years. Reserve transparency every quarter.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ background: PINK, color: '#fff', padding: '5px 10px', borderRadius: 4, fontSize: 9, fontWeight: 700 }}>Request a proposal →</div>
              <div style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '5px 10px', borderRadius: 4, fontSize: 9 }}>For boards</div>
            </div>
          </div>
          <div style={{ padding: '14px 22px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, background: '#fafaff', borderBottom: '1px solid #eee' }}>
            {[{ k: '412', l: 'Communities' }, { k: '18 yrs', l: 'Founded 2008' }, { k: '98%', l: 'Renewal rate' }].map(s => (
              <div key={s.k}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: PURPLE, lineHeight: 1 }}>{s.k}</div>
                <div style={{ fontSize: 8, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 22px 18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', letterSpacing: '0.10em', fontWeight: 700, textTransform: 'uppercase' as const, marginBottom: 8 }}>Free for boards</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { c: BLUE,  label: 'RFP scorecard' },
                { c: GREEN, label: 'Reserve checklist' },
              ].map(r => (
                <div key={r.label} style={{
                  padding: 10,
                  background: '#fff',
                  border: '1px solid #eee',
                  borderTop: `3px solid ${r.c}`,
                  borderRadius: 6,
                  fontSize: 10,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: PURPLE,
                }}>{r.label} →</div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: '16px 18px', background: '#3a5a8a', color: '#fff', borderBottom: '3px solid #2a456a' }}>
            <div style={{ fontFamily: 'Times, serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Midwest CAM Group</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>"Serving HOA communities since 2014"</div>
          </div>
          <div style={{ padding: '12px 18px', background: '#f5f5f5', borderBottom: '1px solid #ddd', fontSize: 9, color: '#666', display: 'flex', gap: 16 }}>
            <span>Home</span><span>About Us</span><span>Services</span><span>Contact Us</span><span style={{ color: '#3a5a8a' }}>Owner Login</span>
          </div>
          <div style={{ padding: '20px 18px', background: '#fff', textAlign: 'center' }}>
            <div style={{ width: '100%', height: 80, background: '#ddd', borderRadius: 4, marginBottom: 14, display: 'grid', placeItems: 'center', color: '#999', fontSize: 11, fontFamily: 'Times, serif', fontStyle: 'italic' }}>
              [Stock photo: aerial neighborhood]
            </div>
            <div style={{ fontFamily: 'Times, serif', fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 6 }}>Welcome to Midwest CAM Group</div>
            <div style={{ fontSize: 10, color: '#666', lineHeight: 1.55, marginBottom: 12 }}>
              We are a full-service property management company dedicated to serving the needs of homeowner associations throughout the region…
            </div>
            <div style={{ display: 'inline-block', background: '#3a5a8a', color: '#fff', padding: '5px 12px', fontSize: 10 }}>Contact Us</div>
          </div>
          <div style={{ padding: '10px 18px', borderTop: '1px solid #eee', fontSize: 9, color: '#aaa', textAlign: 'center' }}>
            © 2014 Midwest CAM Group · Powered by HOAsites™
          </div>
        </>
      )}
    </div>
  );
}

function AudienceMap() {
  const audiences = [
    {
      c: PINK,
      who: 'Researching boards',
      stage: 'Top of funnel',
      need: 'Authority signal in 5 seconds',
      what: 'Hero with portfolio scale, claimed metro tag, trust line. Boards bounce in 8s if they don\'t see proof.',
    },
    {
      c: YELLOW,
      who: 'Active RFP boards',
      stage: 'Mid funnel',
      need: 'Differentiation + proof',
      what: 'Case studies, testimonial cards, proposal-request flow with a calendar booking — not \'we\'ll get back to you.\'',
    },
    {
      c: GREEN,
      who: 'Current homeowners',
      stage: 'Retention',
      need: 'Self-service portal access',
      what: 'One-click portal login. Maintenance forms. Document downloads. The thing that takes 30 manager-call-minutes every week off the table.',
    },
    {
      c: BLUE,
      who: 'Hiring candidates',
      stage: 'Talent',
      need: 'Why-work-here signal',
      what: 'Careers page that doesn\'t read like a Craigslist post. Operator culture, values, career path — boards judge you by who they meet.',
    },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
      {audiences.map(a => (
        <div key={a.who} style={{
          background: '#fff',
          border: '1px solid var(--border-subtle)',
          borderTop: `4px solid ${a.c}`,
          borderRadius: 12,
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: a.c, letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 700 }}>{a.stage}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: PURPLE, lineHeight: 1.25 }}>{a.who}</div>
          <div style={{ paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 4 }}>What they need</div>
            <div style={{ fontSize: 12, color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 10 }}>{a.need}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 4 }}>What we build</div>
            <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>{a.what}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServiceHOAWebsiteDesignPage() {
  const includes = [
    { icon: 'compass',   h: 'Discovery + audience map',       d: 'We map the four visitors your site has to convert: researching boards, active RFPs, homeowners, and talent. Every page has a primary audience and a measurable job.' },
    { icon: 'edit',      h: 'Conversion-led copy',            d: 'Written by CAM-fluent editors — not generic agency copywriters who think \'community\' means apartments. Every headline has a verb and a buyer-stage anchor.' },
    { icon: 'feather',   h: 'Brand-system design',            d: 'A design system, not a one-off page. Type, color, components, and patterns documented so future pages stay on-brand for years — without re-engaging us.' },
    { icon: 'layers',    h: 'CMS-backed pages',               d: 'WordPress (block editor) or Astro/headless. Either way, your team can publish updates without a developer. We pick the stack to fit your team\'s actual capacity.' },
    { icon: 'sparkles',  h: 'Lead-capture forms',             d: 'Calendar booking, RFP intake, downloadable assets, gated guides. Connected to your CRM (or BoardSuite). Every form is scored — no \'thanks, we\'ll be in touch.\'' },
    { icon: 'zap',       h: 'Performance + Core Web Vitals',  d: 'Sub-2s LCP, perfect-100 Lighthouse on the templates that matter. Slow CAM sites are losing leads in the first 3 seconds — we benchmark before and after.' },
    { icon: 'search',    h: 'SEO + GEO foundation',           d: 'Schema, semantic markup, internal-link graph, citation hooks. Your new site is discoverable in Google AND quotable by ChatGPT/Perplexity from day one.' },
    { icon: 'shield',    h: 'Accessibility + compliance',     d: 'WCAG 2.2 AA. Keyboard nav, screen-reader labels, color-contrast verified. CAM serves seniors and disabled homeowners — accessibility isn\'t optional, and lawsuits are real.' },
    { icon: 'bar-chart', h: 'Analytics + dashboard',          d: 'GA4, Search Console, and a CAM-shaped reporting dashboard. Lead-source, by-page conversion, by-stage funnel. The metrics that actually move the business — not vanity sessions.' },
  ];

  const stats = [
    { color: PINK,   k: '8 sec',   v: 'median time a board director spends on a CAM site before bouncing if authority isn\'t immediate.', src: 'Hotjar session data, multi-CAM' },
    { color: YELLOW, k: '62%',     v: 'of CAM site visits in 2026 happen on mobile. Most CAM sites still don\'t pass mobile Core Web Vitals.', src: 'Google CrUX dataset, May 2026' },
    { color: GREEN,  k: '3.2×',    v: 'median lift in proposal-request submissions when sites are rebuilt around the four-audience model.', src: 'Alloy benchmark, post-launch' },
    { color: BLUE,   k: '60–90',   v: 'days from kickoff to launch on a standard portfolio (5–12 page site, full system, full content).', src: 'Alloy delivery cadence' },
  ];

  const process = [
    { num: '01', h: 'Discover',  d: 'Stakeholder interviews, competitor audit, audience map, content inventory. Two weeks of listening before any pixel moves.' },
    { num: '02', h: 'Design',    d: 'Brand system, sitemap, wireframes, key page designs. Reviewed by your leadership and the operators closest to the buyer. Zero \'designer guesses.\'' },
    { num: '03', h: 'Develop',   d: 'CMS build, content migration, integrations (CRM, calendaring, portal SSO). Staging environment your team reviews live.' },
    { num: '04', h: 'Deploy',    d: 'Launch, redirects, search-console handoff, analytics calibration, training session for your team. 90-day post-launch optimization included.' },
  ];

  const processColors = [PINK, YELLOW, GREEN, BLUE] as string[];

  const beforeAfter = [
    { dim: 'Primary audience',     before: '\'Property owners\' (vague)',                    after: 'Researching boards, active RFPs, homeowners, talent' },
    { dim: 'Hero',                 before: 'Stock aerial photo + \'Welcome to…\'',            after: 'Authority signal in 5 seconds — scale, claim, trust line' },
    { dim: 'Lead capture',         before: 'Contact form → inbox → cold',                    after: 'Calendar booking, scored intake, CRM-routed in &lt; 24 hrs' },
    { dim: 'Mobile',               before: 'Squeezed desktop layout, slow LCP',              after: 'Mobile-first, sub-2s LCP, perfect Lighthouse' },
    { dim: 'Homeowner self-serve', before: 'Paper forms + manager phone calls',              after: 'One-click portal SSO, doc downloads, maint forms' },
    { dim: 'AI / search',          before: 'Default WordPress theme markup',                 after: 'Schema stack + entity graph, cited by LLMs' },
    { dim: 'Updates',              before: 'Email the agency every time a comma changes',    after: 'Block editor, your team publishes without a developer' },
  ];

  const faqs = [
    {
      q: 'WordPress, Astro, or something else?',
      a: 'We build on whatever fits your team\'s capacity. WordPress with a structured block setup is the right answer for most CAM firms — your marketing person can publish pages without a dev. For larger firms with engineering capacity, headless Astro or Next.js gives speed and AI-search advantages. We\'ll recommend in the discovery phase, not before.',
    },
    {
      q: 'Can you redesign without rebuilding?',
      a: 'Sometimes. If the existing site has clean structure and CMS, we can rebrand and reorganize without a full rebuild. But most CAM sites we see are 2014–2018 vintage with structural problems no skin can fix. The audit tells us. About one in four engagements ends up redesign-only.',
    },
    {
      q: 'Do you handle the homeowner portal?',
      a: 'We integrate with your portal (Vantaca, AppFolio, CINC, FrontSteps, AssociaCONNECT, etc.) — single-sign-on links, deep links to maintenance forms, document download paths. We don\'t build the portal itself. That\'s a different category of software.',
    },
    {
      q: 'How much does it cost?',
      a: 'Standard 5–12 page CAM site engagements range from $25K–$75K depending on integrations, content scope, and brand-system depth. We don\'t ship template-shop sites — every CAM firm gets a designed, written, engineered build. Scope and number on a 30-min call after the audit.',
    },
    {
      q: 'Can we keep our current branding?',
      a: 'Yes. We can build the site to your existing identity, or refresh elements that aren\'t working. A full rebrand is a separate engagement (Branding for HOA Management Companies). Most CAM firms start with a site refresh and discover what their brand needs to do along the way.',
    },
    {
      q: 'What about hosting and ongoing maintenance?',
      a: 'We launch on Vercel (Astro/Next) or a managed WordPress host (WP Engine, Kinsta) of your choice. Ongoing maintenance — security updates, content refreshes, performance monitoring — is bundled into BoardSuite tiers, or available as a standalone retainer.',
    },
    {
      q: 'How does this fit with BoardSuite?',
      a: 'Your website is the surface every BoardSuite engine touches. Lead-gen channels send traffic here. AI-search citations point boards here. Authority content lives here. Without a website that converts, the engines fill a leaky bucket. Most BoardSuite engagements include a website build or refresh in the first 90 days.',
    },
  ];

  const engineFeatures = [
    { c: PINK,   label: 'Reach lands traffic on a converting surface', note: 'SEO, GEO, and outbound channels send boards to pages built to convert — not stock-aerial brochures.' },
    { c: YELLOW, label: 'Match closes faster off the proposal page',   note: 'Boards arriving for an RFP land on a page that pre-sells before the proposal even opens.' },
    { c: GREEN,  label: 'Retain saves manager time on the portal',     note: 'Homeowners self-serve through the portal instead of clogging manager inboxes with the same five questions.' },
    { c: BLUE,   label: 'Talent sees a firm worth joining',            note: 'Careers page that converts the operators boards meet — your hiring fixes itself by the second quarter.' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: BLUE, boxShadow: 'rgba(161,200,231,0.20) 0 0 0 4px' }}></span>
                <Eyebrow onDark noLine>BoardReach™ · HOA Website Design &amp; Development</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Your website is the <span style={{ color: PINK }}>first proposal</span> a board reads.<br />
                Most CAM firms <span style={{ color: YELLOW }}>fail it.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                Boards spend 8 seconds judging your firm before they decide whether to keep reading. Stock aerials and "welcome to" copy lose them. Alloy designs and builds CAM-specific sites engineered for the four audiences your site actually has — and the conversions your firm actually needs.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const, marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">Audit my current site</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' as const }}>
                {[
                  { k: 'Lift',   v: '3.2×' },
                  { k: 'LCP',    v: '< 2s' },
                  { k: 'Launch', v: '60–90 days' },
                ].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser comparison */}
            <div style={{ position: 'relative', height: 580, display: 'grid', placeItems: 'center', overflow: 'visible' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(161,200,231,0.20) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ position: 'absolute', left: '0%', top: '6%', width: '70%', opacity: 0.55, filter: 'saturate(0.6)' }}>
                <BrowserMockup branded={false} />
              </div>
              <div style={{ position: 'absolute', right: '-2%', bottom: '0%', width: '82%' }}>
                <BrowserMockup branded={true} />
              </div>
              <div style={{
                position: 'absolute', left: '-2%', top: '0%',
                background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                padding: '6px 12px', borderRadius: 999,
                fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                border: '1px solid rgba(255,255,255,0.15)',
                transform: 'rotate(-3deg)',
                backdropFilter: 'blur(4px)',
              }}>
                Most CAM sites · 2014 vintage
              </div>
              <div style={{
                position: 'absolute', right: '0%', top: '44%',
                background: '#fff', color: PURPLE, padding: '8px 14px', borderRadius: 999,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                boxShadow: '0 12px 30px rgba(0,0,0,0.30)',
                transform: 'rotate(5deg)',
                display: 'flex', alignItems: 'center', gap: 8,
                zIndex: 5,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK }}></span>
                Built by Alloy
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* THE PROBLEM FRAME */}
      <section className="section section-white" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 820 }}>
            <Eyebrow>Why CAM websites fail</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>The site that <span style={{ color: PINK }}>looks fine to your team</span> is invisible to the boards you want.</h2>
            <p className="lead">Most CAM sites were built for the wrong audience, in the wrong year, with the wrong stack. They communicate "we exist" — when boards need them to communicate "we're who you've been looking for."</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { c: PINK,   eyebrow: 'The audience problem', h: 'Built for \'property owners\' — but boards are buying.', d: 'A board director and a homeowner have completely different jobs on your site. One is evaluating a half-million-dollar contract. The other wants the pool hours. Most CAM sites serve neither well because they treat them as the same visitor.' },
              { c: YELLOW, eyebrow: 'The stack problem',    h: 'Five-year-old WordPress theme + a contact form.',       d: 'The site loads slowly, fails Core Web Vitals, isn\'t crawled by AI search, and routes leads into a generic inbox. Every one of those is a leak. Together they make even a great firm look generic.' },
              { c: GREEN,  eyebrow: 'The proof problem',    h: 'No scale signal, no specifics, no story.',             d: 'Boards judge you in 8 seconds. \'We\'ve been serving HOAs since 2014\' is not a signal. 412 communities, three RISE-style case studies, and a real-name reference from a board president — that\'s a signal.' },
            ].map(b => (
              <div key={b.h} style={{ background: '#fafaff', borderRadius: 14, padding: 32, borderTop: `4px solid ${b.c}` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: b.c, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 12 }}>{b.eyebrow}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: PURPLE, lineHeight: 1.2, letterSpacing: '-0.018em', marginBottom: 14 }}>{b.h}</div>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: 0 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The numbers behind a rebuild</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Why operators rebuild — and what it returns.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 22 }}>
                <div className="display-md" style={{ fontSize: 56, color: PURPLE, lineHeight: 0.95, marginBottom: 12, letterSpacing: '-0.025em', fontWeight: 800 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.55 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.08em', marginTop: 12, textTransform: 'uppercase' as const, fontWeight: 600 }}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE MAP */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 820 }}>
            <Eyebrow>The four-audience model</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>Your site has <span style={{ color: PINK }}>four visitors.</span> Each needs a different page to do a different job.</h2>
            <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 720 }}>
              Build for one audience and the others bounce. Build for "everyone" and no one converts. Every page in an Alloy CAM site has a primary audience and a measurable job.
            </p>
          </div>
          <AudienceMap />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="what-you-get" className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete website system, designed and built by Alloy.</h2>
          </div>
          <ServiceList color={PINK} items={includes} />
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Generic CAM site vs. Alloy-built CAM site.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>Generic CAM site (template + contact form)</div>
              <div style={{ color: YELLOW }}>Alloy-built CAM site</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: row.before }}></div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span dangerouslySetInnerHTML={{ __html: row.after }}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we build it</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From kickoff to launch in <span style={{ color: YELLOW }}>60–90 days.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderTop: `3px solid ${processColors[i]}`,
                borderRadius: 12, padding: 28,
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: processColors[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, padding: 24, background: 'rgba(245,216,128,0.08)', border: '1px dashed rgba(245,216,128,0.30)', borderRadius: 10, display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: YELLOW, lineHeight: 1, flexShrink: 0 }}>90</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
              <strong style={{ color: '#fff' }}>days from kickoff to launch on a standard 5–12 page site.</strong>{' '}
              Discovery in weeks 1–2. Design in weeks 3–5. Build in weeks 6–10. Launch and optimization in weeks 11–13. Larger sites scope to 4–5 months.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT FITS BOARDSUITE */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'center' }}>
            <div>
              <Eyebrow>Where it lives</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 18px', color: PURPLE }}>The surface every engine touches.</h2>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                Your website is where every <strong style={{ color: PURPLE }}>BoardReach</strong> channel lands traffic, where every <strong style={{ color: PURPLE }}>BoardMatch</strong> proposal references back, and where every <strong style={{ color: PURPLE }}>BoardRetain</strong> homeowner self-serves. Without a site that converts, the engines fill a leaky bucket.
              </p>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
                Most BoardSuite engagements include a website build or refresh in the first 90 days for exactly this reason — fix the surface before you pour traffic into it.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                <Button variant="primary" arrow href="/boardsuite">See BoardSuite</Button>
                <Button variant="ghost" arrow href="/our-approach">Our approach →</Button>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 32, border: '1px solid var(--border-subtle)', boxShadow: '0 16px 48px rgba(56,28,79,0.08)' }}>
              <Eyebrow noLine>How a CAM site compounds across the engines</Eyebrow>
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 16px', alignItems: 'center' }}>
                {engineFeatures.map((f, i) => (
                  <Fragment key={f.label}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 999, background: f.c, boxShadow: `0 0 0 4px ${f.c}33` }}></div>
                      {i < engineFeatures.length - 1 && <div style={{ width: 2, height: 22, background: 'var(--border-subtle)' }}></div>}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE }}>{f.label}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{f.note}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>What CAM operators actually ask.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} bordered={true} accent={PINK} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to see what your site is actually doing?"
        sub="30 minutes. We'll audit your current site against the four-audience model, run Core Web Vitals live, and show you what a board director sees in their first 8 seconds."
      />
    </>
  );
}
