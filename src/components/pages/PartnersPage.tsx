import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import AccentBar from '~/components/AccentBar';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

export default function PartnersPage() {
  const techPartners = [
    { cat: 'Portfolio mgmt',  name: 'Vantaca',              desc: 'Direct integration: financials, reserve, work orders, owner data feeding annual reports and dashboards.', color: PINK },
    { cat: 'Portfolio mgmt',  name: 'AppFolio',             desc: 'Owner portal SSO, work order data, payment records — pulled into reporting and homeowner comms.', color: PINK },
    { cat: 'Portfolio mgmt',  name: 'Buildium',             desc: 'Reporting + owner data integration. Synced into newsletter audiences and annual reports.', color: PINK },
    { cat: 'Portfolio mgmt',  name: 'CINC Systems',         desc: 'Financial + reserve study integration for board reporting and annual report production.', color: PINK },
    { cat: 'Email + portal',  name: 'TownSq',               desc: 'Resident communication platform. We design the templates and run the editorial; the platform delivers.', color: YELLOW },
    { cat: 'Email + portal',  name: 'FrontSteps',           desc: 'Owner portal integration for engagement reporting, branded skinning, and content delivery.', color: YELLOW },
    { cat: 'Email + portal',  name: 'Smartwebs',            desc: 'Email + portal integration for board comms, newsletters, and annual report distribution.', color: YELLOW },
    { cat: 'Reserve study',   name: 'Association Reserves', desc: 'Reserve study data feeds directly into annual reports, homeowner comms, and board dashboards.', color: GREEN },
    { cat: 'Reserve study',   name: 'Reserve Advisors',     desc: 'Visualization templates for funded-percent, project schedule, and special-assessment risk.', color: GREEN },
    { cat: 'Insurance',       name: 'Cline Wood',           desc: 'Coordinated comms for insurance changes, claims, and coverage updates to homeowners.', color: BLUE },
    { cat: 'Insurance',       name: 'USI Insurance',        desc: 'Branded homeowner communication for renewals, certificates, and coverage transparency.', color: BLUE },
    { cat: 'Web + analytics', name: 'Vercel + Posthog',     desc: 'Site infrastructure and instrumentation. Every BoardSuite engagement runs on this stack.', color: BLUE },
  ];

  const agencyPartners: { name: string; desc: string; href?: string; cta?: string }[] = [
    { name: 'Reserve study referral network', desc: 'Three reserve-study firms we recommend by region. We manage handoff; they keep the technical work; you get a coordinated client experience.' },
    { name: 'Legal counsel network',          desc: 'Vetted CC&R, transition, and HOA-litigation counsel in 12 metros. We coordinate; they handle the legal work; you get one project manager.' },
    { name: 'Accounting + audit firms',       desc: 'Five CAM-specialized accounting firms in our network. Joint engagements for portfolio-wide audit, transition, and financial review.' },
    { name: 'PR + crisis comms',              desc: 'When a story breaks beyond marketing — local news, regulatory, litigation — we hand off cleanly to specialist crisis firms we trust.' },
    { name: 'Board matchmaking',              desc: "Boards find Alloy looking for a manager, not a marketer. We send them to Match HOA — a free concierge service that screens management companies against the community's needs and delivers a shortlist of two or three vetted matches. Boards get a clean process; the firms on the shortlist get a warm, qualified introduction.", href: 'https://matchhoa.com', cta: 'Visit Match HOA' },
  ];

  const philosophy = [
    { h: "We don't resell software",      d: 'No reseller margins, no kickbacks, no incentives that bend our recommendation. We tell you what fits your portfolio. Period.' },
    { h: 'We integrate where it matters', d: 'Direct API integrations with the major CAM platforms means data flows from your operations into your marketing without manual lift. No double entry.' },
    { h: 'You own the relationships',     d: 'Every vendor we bring in works for you, not Alloy. You get the contracts, the access, the data. We manage the project; you keep the assets.' },
    { h: 'Honest handoffs',               d: "When the right answer is a specialist outside our scope — reserve study, legal, audit, PR — we hand off cleanly with full context. No throwing files over the wall." },
  ];

  const philosophyColors = [PINK, YELLOW, GREEN, BLUE] as string[];
  const becomeColors     = [PINK, YELLOW, GREEN] as string[];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="hero"
        style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}
      >
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: BLUE, boxShadow: '0 0 0 4px rgba(106,160,224,0.20)' }}></span>
                <Eyebrow onDark noLine>Partners</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The <span style={{ color: PINK }}>infrastructure</span> behind every<br />
                BoardSuite <span style={{ color: YELLOW }}>engagement.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                Alloy works inside the CAM stack you already run. Direct integrations with the major
                portfolio-management, owner-portal, and reserve-study platforms. Vetted referral
                networks for legal, accounting, and crisis. We don&apos;t resell software — we make
                sure the marketing engine plugs into your operations cleanly.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="#tech-partners">Tech partners</Button>
                <Button variant="secondary" onDark href="#become-a-partner">Become a partner</Button>
              </div>
            </div>
            <div style={{ position: 'relative', height: 480, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '10% 4%', background: 'radial-gradient(ellipse at center, rgba(106,160,224,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, width: '82%' }}>
                {['Vantaca', 'AppFolio', 'Buildium', 'CINC', 'TownSq', 'FrontSteps', 'Smartwebs', 'Reserves', 'Vercel'].map((n) => (
                  <div
                    key={n}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 10,
                      padding: '18px 12px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: 13,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* ── Philosophy ───────────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>How we partner</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>
              Four principles that keep partnerships honest.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {philosophy.map((p, i) => (
              <div
                key={p.h}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: 32,
                  border: '1px solid var(--border-subtle)',
                  borderTop: `3px solid ${philosophyColors[i]}`,
                }}
              >
                <div className="display-md" style={{ fontSize: 24, color: PURPLE, marginBottom: 12 }}>{p.h}</div>
                <div style={{ fontSize: 15, color: '#444', lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech partners ────────────────────────────────────────────────── */}
      <section id="tech-partners" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>Technology partners</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The CAM stack we plug into.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {techPartners.map((t) => (
              <div
                key={t.name}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: 24,
                  border: '1px solid var(--border-subtle)',
                  borderTop: `3px solid ${t.color}`,
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: t.color, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>{t.cat}</div>
                <div className="display-md" style={{ fontSize: 18, color: PURPLE, marginBottom: 8 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.55 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Referral networks ────────────────────────────────────────────── */}
      <section id="referral-networks" className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>Referral networks</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Specialist firms we hand off to.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {agencyPartners.map((a) => (
              <div
                key={a.name}
                style={{
                  background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)',
                  ...(a.href ? { gridColumn: '1 / -1', borderLeft: `5px solid ${PINK}` } : {}),
                }}
              >
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 10 }}>{a.name}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6, maxWidth: 760 }}>{a.desc}</div>
                {a.href && (
                  <a href={a.href} target="_blank" rel="noopener" className="btn btn-secondary btn-sm btn-arrow" style={{ marginTop: 18 }}>
                    {a.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a partner ─────────────────────────────────────────────── */}
      <section id="become-a-partner" className="section section-dark">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Eyebrow onDark noLine>Become a partner</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 16px', color: '#fff' }}>
              Building something CAM operators need?
            </h2>
            <p className="lead on-dark" style={{ maxWidth: 640, margin: '0 auto' }}>
              We partner with software platforms, specialist consultancies, and adjacent agencies that
              share our operator-first standard. If your work fits, we&apos;d like to talk.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              { h: 'Software platforms',  d: "Portfolio management, accounting, owner portals, reserve, communications. We integrate, we don't resell." },
              { h: 'Specialist firms',    d: 'Reserve study, legal, accounting, PR, insurance. Vetted, regional networks where mutual referrals make sense.' },
              { h: 'Adjacent agencies',   d: "Brand, web, video, photography. Where Alloy doesn't go deep and a specialist would serve our client better." },
            ].map((p, i) => (
              <div
                key={p.h}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderTop: `3px solid ${becomeColors[i]}`,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div className="display-md" style={{ fontSize: 18, color: '#fff', marginBottom: 10 }}>{p.h}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" arrow href="mailto:partners@alloygp.co?subject=Partnership inquiry">
              Email partners@alloygp.co
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Want to see how we plug into your CAM stack?"
        sub="30 minutes. We'll walk through the integrations, the data flow, and the operational handoffs — and tell you honestly where Alloy fits and where it doesn't."
      />
    </>
  );
}
