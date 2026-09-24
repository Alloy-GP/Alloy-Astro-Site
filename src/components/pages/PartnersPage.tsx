// src/components/pages/PartnersPage.tsx — /partners
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/partners.dc.html
// (hero, the three directory rows, CTA bar). The pre-redesign partner content — integration
// detail, referral networks (incl. the Match HOA card + outbound link, section id
// "referral-networks"), partnering principles, and "become a partner" — is carried forward
// below the directory in the same .9fr / 1.3fr editorial row layout.
import type { CSSProperties } from 'react';
import { Eyebrow, Label, CtaBar, Btn, ArrowIcon } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

/* ── Prototype directory rows ──────────────────────────────────────────── */
const DIRECTORY: Array<{ h: string; d: string; items: string[] }> = [
  { h: 'Management platforms', d: 'We build inquiry, review, and newsletter integrations against these.', items: ['Vantaca', 'AppFolio', 'Buildium', 'CINC Systems', 'TOPS', 'Frontsteps'] },
  { h: 'Industry', d: 'Where we show up, sponsor, and speak.', items: ['CAI National', 'CAI Austin Chapter', 'Better Business Bureau', 'MatchHOA'] },
  { h: 'Referral partners', d: 'Attorneys, reserve specialists, insurance brokers, and bankers who work with boards.', items: ['Association law firms', 'Reserve study providers', 'Insurance brokers', 'Community banking'] },
];

/* ── Carried forward from the pre-redesign PartnersPage ────────────────── */
const TECH: Array<{ cat: string; items: Array<{ name: string; desc: string }> }> = [
  { cat: 'Portfolio mgmt', items: [
    { name: 'Vantaca', desc: 'Direct integration: financials, reserve, work orders, owner data feeding annual reports and dashboards.' },
    { name: 'AppFolio', desc: 'Owner portal SSO, work order data, payment records — pulled into reporting and homeowner comms.' },
    { name: 'Buildium', desc: 'Reporting + owner data integration. Synced into newsletter audiences and annual reports.' },
    { name: 'CINC Systems', desc: 'Financial + reserve study integration for board reporting and annual report production.' },
  ] },
  { cat: 'Email + portal', items: [
    { name: 'TownSq', desc: 'Resident communication platform. We design the templates and run the editorial; the platform delivers.' },
    { name: 'FrontSteps', desc: 'Owner portal integration for engagement reporting, branded skinning, and content delivery.' },
    { name: 'Smartwebs', desc: 'Email + portal integration for board comms, newsletters, and annual report distribution.' },
  ] },
  { cat: 'Reserve study', items: [
    { name: 'Association Reserves', desc: 'Reserve study data feeds directly into annual reports, homeowner comms, and board dashboards.' },
    { name: 'Reserve Advisors', desc: 'Visualization templates for funded-percent, project schedule, and special-assessment risk.' },
  ] },
  { cat: 'Insurance', items: [
    { name: 'Cline Wood', desc: 'Coordinated comms for insurance changes, claims, and coverage updates to homeowners.' },
    { name: 'USI Insurance', desc: 'Branded homeowner communication for renewals, certificates, and coverage transparency.' },
  ] },
  { cat: 'Web + analytics', items: [
    { name: 'Vercel + Posthog', desc: 'Site infrastructure and instrumentation. Every BoardSuite engagement runs on this stack.' },
  ] },
];

const REFERRALS: Array<{ name: string; desc: string; href?: string; cta?: string }> = [
  { name: 'Reserve study referral network', desc: 'Three reserve-study firms we recommend by region. We manage handoff; they keep the technical work; you get a coordinated client experience.' },
  { name: 'Legal counsel network', desc: 'Vetted CC&R, transition, and HOA-litigation counsel in 12 metros. We coordinate; they handle the legal work; you get one project manager.' },
  { name: 'Accounting + audit firms', desc: 'Five CAM-specialized accounting firms in our network. Joint engagements for portfolio-wide audit, transition, and financial review.' },
  { name: 'PR + crisis comms', desc: 'When a story breaks beyond marketing — local news, regulatory, litigation — we hand off cleanly to specialist crisis firms we trust.' },
  { name: 'Board matchmaking', desc: "Boards find Alloy looking for a manager, not a marketer. We send them to Match HOA — a free concierge service that screens management companies against the community's needs and delivers a shortlist of two or three vetted matches. Boards get a clean process; the firms on the shortlist get a warm, qualified introduction.", href: 'https://matchhoa.com', cta: 'Visit Match HOA' },
];

const PRINCIPLES = [
  { h: "We don't resell software", d: 'No reseller margins, no kickbacks, no incentives that bend our recommendation. We tell you what fits your portfolio. Period.' },
  { h: 'We integrate where it matters', d: 'Direct API integrations with the major CAM platforms means data flows from your operations into your marketing without manual lift. No double entry.' },
  { h: 'You own the relationships', d: 'Every vendor we bring in works for you, not Alloy. You get the contracts, the access, the data. We manage the project; you keep the assets.' },
  { h: 'Honest handoffs', d: 'When the right answer is a specialist outside our scope — reserve study, legal, audit, PR — we hand off cleanly with full context. No throwing files over the wall.' },
];

const PARTNER_TYPES = [
  { h: 'Software platforms', d: "Portfolio management, accounting, owner portals, reserve, communications. We integrate, we don't resell." },
  { h: 'Specialist firms', d: 'Reserve study, legal, accounting, PR, insurance. Vetted, regional networks where mutual referrals make sense.' },
  { h: 'Adjacent agencies', d: "Brand, web, video, photography. Where Alloy doesn't go deep and a specialist would serve our client better." },
];

/* Prototype tile: off-white, centered name, 72px min height. */
const tileStyle: CSSProperties = {
  border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '22px 18px', minHeight: 72, boxSizing: 'border-box',
  display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
  fontWeight: 700, fontSize: 14, color: 'var(--alloy-purple)', background: 'var(--alloy-off-white)',
};

function RowHead({ h, d }: { h: string; d: string }) {
  return (
    <div className="rd-stack rd-stack--10">
      <h3 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{h}</h3>
      <p className="rd-small" style={LH}>{d}</p>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Partners</Eyebrow>
            <h1 className="rd-h1">The CAM stack <span className="rd-accent">we work inside.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>Platforms we integrate with, associations we belong to, and referral partners who send boards our way. If you serve CAM firms and want to work together, start below.</p>
          </div>
        </div>
      </section>

      {/* Directory (prototype) */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-stack rd-rule-top" style={{ gap: 56, paddingTop: 48 }}>
            {DIRECTORY.map((row) => (
              <div key={row.h} className="rd-grid rd-grid--prose">
                <RowHead h={row.h} d={row.d} />
                <div className="rd-grid rd-grid--3" style={{ gap: 12 }}>
                  {row.items.map((name) => <div key={name} style={tileStyle}>{name}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology partners — integration detail */}
      <section id="tech-partners" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack" style={{ gap: 48 }}>
          <div className="rd-grid rd-grid--prose">
            <div className="rd-stack rd-stack--18">
              <Eyebrow tone="purple">Technology partners</Eyebrow>
              <h2 className="rd-h2 rd-h2--sm">The CAM stack we plug into.</h2>
            </div>
            <p className="rd-body" style={LH}>Alloy works inside the CAM stack you already run. Direct integrations with the major portfolio-management, owner-portal, and reserve-study platforms. Vetted referral networks for legal, accounting, and crisis. We don&apos;t resell software — we make sure the marketing engine plugs into your operations cleanly.</p>
          </div>
          <div className="rd-stack rd-rule-top">
            {TECH.map((group) => (
              <div key={group.cat} className="rd-grid rd-grid--prose rd-rule-bottom" style={{ padding: '32px 0' }}>
                <Label tone="purple" size={12}>{group.cat}</Label>
                <div className="rd-grid rd-grid--2" style={{ gap: 12 }}>
                  {group.items.map((t) => (
                    <div key={t.name} className="rd-card rd-card--pad-sm rd-stack" style={{ gap: 6 }}>
                      <div className="rd-title-16 rd-ink">{t.name}</div>
                      <p className="rd-tiny">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral networks */}
      <section id="referral-networks" className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Referral networks</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Specialist firms we hand off to.</h2>
          </div>
          <div className="rd-grid rd-grid--2" style={{ gap: 16 }}>
            {REFERRALS.map((a) => (
              <div
                key={a.name}
                className="rd-card rd-card--pad rd-stack"
                style={{ gap: 10, ...(a.href ? { gridColumn: '1 / -1', borderLeft: '5px solid var(--alloy-pink)' } : {}) }}
              >
                <h3 className="rd-title-18">{a.name}</h3>
                <p className="rd-small rd-small--14">{a.desc}</p>
                {a.href ? (
                  <div style={{ marginTop: 8 }}>
                    <a href={a.href} target="_blank" rel="noopener" className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline" style={{ gap: 8 }}>
                      {a.cta}
                      <ArrowIcon />
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we partner */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>How we partner</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Four principles that keep partnerships honest.</h2>
          </div>
          <div className="rd-stack">
            {PRINCIPLES.map((p, i) => (
              <div key={p.h} className="rd-rule-bottom" style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, padding: '24px 0' }}>
                <span className="rd-numeral" style={{ fontSize: 32 }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="rd-stack rd-stack--6">
                  <div className="rd-h4">{p.h}</div>
                  <p className="rd-small" style={LH}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section id="become-a-partner" className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">Become a partner</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm" style={{ color: '#fff' }}>Building something CAM operators need?</h2>
            <p className="rd-body" style={{ color: '#fff', opacity: 0.85 }}>We partner with software platforms, specialist consultancies, and adjacent agencies that share our operator-first standard. If your work fits, we&apos;d like to talk.</p>
            <div style={{ marginTop: 8 }}>
              <Btn href="mailto:partners@alloygp.co?subject=Partnership inquiry" className="rd-btn--inline">Email partners@alloygp.co</Btn>
            </div>
          </div>
          <div className="rd-stack rd-stack--10">
            {PARTNER_TYPES.map((p) => (
              <div key={p.h} className="rd-inset rd-stack" style={{ gap: 6 }}>
                <div className="rd-title-18" style={{ color: '#fff' }}>{p.h}</div>
                <p className="rd-small rd-small--14" style={{ color: '#fff', opacity: 0.75 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Serve CAM firms? Let’s talk about referrals." label="Contact us" href="/contact" />
        </div>
      </section>
    </div>
  );
}
