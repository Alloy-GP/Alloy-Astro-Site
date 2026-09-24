import { useState } from 'react';
import type { CSSProperties } from 'react';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ─── Inline FAQ atom ────────────────────────────────────────────────────────

interface FAQItemProps {
  q: string;
  a: string;
  bordered?: boolean;
  accent?: string;
}

function FAQItem({ q, a, bordered = false, accent = PINK }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: bordered ? '1px solid var(--border-subtle)' : undefined,
        padding: '20px 0',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 16,
            color: PURPLE,
            lineHeight: 1.35,
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: open ? accent : 'var(--alloy-light-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 200ms',
            marginTop: 2,
          }}
        >
          <Icon
            name={open ? 'x' : 'plus'}
            size={13}
            color={open ? '#fff' : PURPLE}
            strokeWidth={2.5}
          />
        </span>
      </button>
      {open && (
        <p
          style={{
            margin: '14px 0 0',
            fontSize: 15,
            color: 'var(--alloy-body-gray)',
            lineHeight: 1.65,
            maxWidth: 680,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Hero mockup ────────────────────────────────────────────────────────────

function PrintMaterialsMockup() {
  return (
    <div
      style={{ position: 'relative', maxWidth: 480, transform: 'rotate(-1deg)' }}
    >
      {/* Proposal */}
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          style={{ padding: '20px 22px', background: PURPLE, color: '#fff' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: YELLOW,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              fontWeight: 700,
            }}
          >
            Proposal · Cypress Lakes HOA
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 22,
              color: '#fff',
              marginTop: 6,
              lineHeight: 1.1,
            }}
          >
            A management partnership built on transparency.
          </div>
        </div>
        <div style={{ padding: '18px 22px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 8,
            }}
          >
            {[
              { k: '$2.4M', v: 'Reserves managed' },
              { k: '97%', v: 'Renewal rate' },
              { k: '4 hr', v: 'Response time' },
            ].map((s) => (
              <div
                key={s.v}
                style={{
                  background: '#fafaff',
                  borderRadius: 6,
                  padding: '10px 8px',
                  textAlign: 'center' as const,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 16,
                    color: PURPLE,
                    lineHeight: 1,
                  }}
                >
                  {s.k}
                </div>
                <div style={{ fontSize: 9, color: '#777', marginTop: 4 }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Signage card */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: -24,
          background: GREEN,
          color: PURPLE,
          padding: '10px 14px',
          borderRadius: 8,
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
          transform: 'rotate(8deg)',
          zIndex: 4,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.14em',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
          }}
        >
          On-property
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 14,
            marginTop: 2,
          }}
        >
          Pool Hours
        </div>
      </div>
      {/* Mailer */}
      <div
        style={{
          position: 'absolute',
          bottom: -30,
          left: -20,
          background: '#fff',
          padding: '10px 14px',
          borderRadius: 8,
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
          transform: 'rotate(-6deg)',
          zIndex: 2,
          border: `2px solid ${PINK}`,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: PINK,
            letterSpacing: '0.14em',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
          }}
        >
          Direct mail
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 13,
            color: PURPLE,
            marginTop: 2,
          }}
        >
          Annual meeting · April 12
        </div>
      </div>
    </div>
  );
}

// ─── Page component ─────────────────────────────────────────────────────────

export default function ServicePrintProductionPage() {
  const includes = [
    {
      icon: 'edit',
      h: 'Proposal templates',
      d: 'Designed proposal system — cover, narrative pages, financial overview, scope, fee schedule, exhibits. Editable in Word, InDesign, or Google Docs depending on your team.',
    },
    {
      icon: 'feather',
      h: 'Pitch + sales decks',
      d: 'Designed slide template library: capabilities deck, RFP response deck, board presentation, annual report deck, transition deck. Plug-and-play for the manager.',
    },
    {
      icon: 'globe',
      h: 'On-property signage',
      d: 'Pool rules, gate codes, amenity hours, construction notices, way-finding, parking. The signage system that boards never have to redesign on the fly.',
    },
    {
      icon: 'compass',
      h: 'Direct mail + collateral',
      d: 'Annual meeting notices, special-assessment letters, election ballots, welcome packets, board recruitment flyers. Print-ready, mail-house-formatted, every spec.',
    },
    {
      icon: 'shield',
      h: 'Stationery system',
      d: 'Letterhead, envelopes, business cards, name badges, lanyards. The day-one operations kit for new hires and new properties.',
    },
    {
      icon: 'layers',
      h: 'Vehicle + uniform design',
      d: "Truck wraps, polos, hard hats, equipment decals. The visual system that makes your maintenance crew read as your maintenance crew — not 'some guy in a truck.'",
    },
    {
      icon: 'sparkles',
      h: 'Print procurement',
      d: 'Vetted vendor relationships for digital, offset, large-format, mail-house. We RFP, manage proofs, manage QC, manage delivery. You sign off; we ship.',
    },
    {
      icon: 'bar-chart',
      h: 'Inventory + reorder system',
      d: 'Centralized print library with reorder triggers. When stationery runs low, signage gets damaged, or a new property onboards — one form, two-day turnaround.',
    },
    {
      icon: 'zap',
      h: 'Rush production',
      d: "On-call 48-hour turnaround for board emergencies: special-assessment notice, capital project signage, crisis homeowner mailer. We've shipped 200+ rush jobs without a missed deadline.",
    },
  ];

  const stats = [
    {
      color: PINK,
      k: '67%',
      v: "of CAM operators report 'whoever's free' is who designs their next mailer or signage piece. Quality varies by mood.",
      src: 'Alloy CAM operator survey, 2026',
    },
    {
      color: YELLOW,
      k: '31%',
      v: "median markup CAM firms pay using ad-hoc local printers vs. Alloy's vetted vendor network. Volume + relationships move the number.",
      src: 'Alloy procurement benchmark',
    },
    {
      color: GREEN,
      k: '48 hr',
      v: 'median rush turnaround Alloy hits on board-emergency jobs (special assessments, capital project notices, crisis mailers).',
      src: 'Alloy SLA standard',
    },
    {
      color: BLUE,
      k: '24',
      v: 'print and signage surfaces a working CAM firm needs at any given time. Most firms have templates for two or three.',
      src: 'Alloy print scope',
    },
  ];

  const beforeAfter = [
    {
      dim: 'Proposal',
      before: 'Word doc reformatted every time, cover from 2018',
      after: 'Designed proposal system, plug-and-play for any RFP',
    },
    {
      dim: 'Decks',
      before: 'Manager builds the night before',
      after: 'Template library — capabilities, RFP, board, annual',
    },
    {
      dim: 'Signage',
      before: 'Print shop down the street, font-of-the-month',
      after: 'Standardized system, every property reads as one firm',
    },
    {
      dim: 'Mail',
      before: 'Generic vendor templates, no brand presence',
      after: 'Designed mailers, mail-house spec, brand-consistent',
    },
    {
      dim: 'Vehicles',
      before: 'Magnetic logo on a white truck',
      after: 'Designed wrap system, branded uniforms, equipment decals',
    },
    {
      dim: 'Procurement',
      before: "Whoever's free finds a printer and hopes",
      after: 'Vetted vendor network, RFP-managed, QC\'d, on-time',
    },
    {
      dim: 'Reorders',
      before: 'Out-of-stock crisis every quarter',
      after: 'Inventory system, reorder triggers, two-day turnaround',
    },
  ];

  const process = [
    {
      num: '01',
      h: 'Audit',
      d: 'Inventory every print and signage surface in use. Identify the gaps, the damaged, the off-brand, and the missing. Two weeks.',
    },
    {
      num: '02',
      h: 'System',
      d: 'Designed templates for every surface, on your existing brand. Vendor network onboarded. Inventory and reorder process documented.',
    },
    {
      num: '03',
      h: 'Stock',
      d: 'Initial production run: proposals, decks, signage, stationery, vehicle wraps, uniforms. Delivered to office and properties on a phased schedule.',
    },
    {
      num: '04',
      h: 'Sustain',
      d: 'Reorder triggers monitored. New property onboarding kit auto-generated. Rush jobs handled on a 48-hour SLA. Annual review of system fit.',
    },
  ];

  const faqs = [
    {
      q: 'Do you do the printing or just the design?',
      a: "Both — and that's the point. Print procurement is where most CAM firms leak the most money: ad-hoc local printers, no volume leverage, no QC. Alloy manages the full chain: design, vendor RFP, proofs, QC, mail-house coordination, delivery. You get one invoice, one accountable team, and a 31% median markup savings vs. running it yourself.",
    },
    {
      q: 'Can we use our existing printer?',
      a: "Yes — about a third of clients have a printer relationship they want to keep. We design to their specs, hand off print-ready files, and stay out of the procurement chain. Pricing adjusts accordingly.",
    },
    {
      q: "What's the minimum engagement?",
      a: "We'll do single-piece projects — a one-off RFP response, a special-assessment mailer, a signage refresh. But the math really works when there's a system: $4K–$8K/mo retainer covers ongoing template maintenance, rush jobs, reorders, and quarterly print audits across a portfolio.",
    },
    {
      q: 'How fast can you turn around a rush job?',
      a: "Standard rush is 48 hours from approved file to delivered piece for digital print and small-format signage. Mail-house and large-format runs 5–7 business days. We've shipped 200+ rush jobs across the network without a missed deadline.",
    },
    {
      q: 'How does this fit with BoardSuite?',
      a: "Print is the BoardMatch (Win) and BoardRetain (Keep) workhorse. Proposals win RFPs; mailers, signage, and annual reports keep boards happy with what they bought. Brand identity sets the system; print production keeps it executing across 24 surfaces, every day, without your team having to think about it.",
    },
  ];

  const colors = [PINK, YELLOW, GREEN, BLUE] as string[];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="hero"
        style={{
          background: PURPLE,
          color: '#fff',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: BLUE,
                    boxShadow: '0 0 0 4px rgba(106,160,224,0.20)',
                  }}
                ></span>
                <Eyebrow onDark noLine>
                  Foundation · Print Production
                </Eyebrow>
              </div>
              <h1
                className="display-xl"
                style={{ margin: '0 0 22px', color: '#fff' }}
              >
                Stop redesigning{' '}
                <span style={{ color: PINK }}>the same proposal</span>
                <br />
                <span style={{ color: YELLOW }}>every time</span> a board
                calls.
              </h1>
              <p
                className="lead on-dark"
                style={{ marginBottom: 28, maxWidth: 600 }}
              >
                A working CAM firm needs 24 print and signage surfaces at any
                given time — proposals, decks, mailers, signage, stationery,
                uniforms, vehicle wraps. Most firms have templates for two or
                three, and &ldquo;whoever&apos;s free&rdquo; handles the rest.
                Alloy runs the system: design, procurement, QC, and 48-hour
                rush production.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                  marginBottom: 28,
                }}
              >
                <Button variant="primary" arrow href="/strategic-review-request">
                  Audit my print stack
                </Button>
                <Button variant="secondary" onDark href="#what-you-get">
                  What&apos;s included
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.10)',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { k: 'Surfaces', v: '24' },
                  { k: 'Cost savings', v: '31%' },
                  { k: 'Rush SLA', v: '48 hr' },
                ].map((s) => (
                  <div key={s.k}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        color: '#fff',
                        fontSize: 22,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.55)',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        marginTop: 2,
                      }}
                    >
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                height: 540,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '8% 4% 8% 4%',
                  background:
                    'radial-gradient(ellipse at center, rgba(106,160,224,0.20) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              ></div>
              <div style={{ width: '82%' }}>
                <PrintMaterialsMockup />
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* ── Stats band ───────────────────────────────────────────────────── */}
      <section
        className="section section-ivory"
        style={{ paddingTop: 72, paddingBottom: 72 }}
      >
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why this matters</Eyebrow>
            <h2
              className="display-lg"
              style={{ margin: '14px 0 0', color: PURPLE }}
            >
              The numbers behind a real print system.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.k}
                style={{ borderTop: `4px solid ${s.color}`, paddingTop: 22 }}
              >
                <div
                  className="display-md"
                  style={{
                    fontSize: 56,
                    color: PURPLE,
                    lineHeight: 0.95,
                    marginBottom: 12,
                    letterSpacing: '-0.025em',
                    fontWeight: 800,
                  }}
                >
                  {s.k}
                </div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.55 }}>
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: '#999',
                    letterSpacing: '0.08em',
                    marginTop: 12,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {s.src}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────────────── */}
      <section id="what-you-get" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2
              className="display-lg"
              style={{ margin: '14px 0 0', color: PURPLE }}
            >
              The complete print production engine.
            </h2>
          </div>
          <ServiceList color={BLUE} items={includes} />
        </div>
      </section>

      {/* ── Before / After ───────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2
              className="display-lg"
              style={{ margin: '14px 0 0', color: PURPLE }}
            >
              Ad-hoc vs. an actual system.
            </h2>
          </div>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.6fr 1.6fr',
                padding: '16px 24px',
                background: PURPLE,
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>Most CAM firms</div>
              <div style={{ color: YELLOW }}>Alloy print system</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div
                key={row.dim}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.6fr 1.6fr',
                  padding: '20px 24px',
                  borderTop: i ? '1px solid var(--border-subtle)' : 'none',
                  gap: 24,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: PURPLE,
                    fontSize: 14,
                  }}
                >
                  {row.dim}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#888',
                    lineHeight: 1.55,
                    fontStyle: 'italic',
                  }}
                >
                  {row.before}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#222',
                    lineHeight: 1.55,
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}
                >
                  <Icon
                    name="check"
                    size={16}
                    color={BLUE}
                    strokeWidth={2.5}
                    style={{ flexShrink: 0, marginTop: 2 } as CSSProperties}
                  />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we run it</Eyebrow>
            <h2
              className="display-lg"
              style={{ margin: '14px 0 0', color: '#fff' }}
            >
              From audit to running system in{' '}
              <span style={{ color: YELLOW }}>60 days.</span>
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
          >
            {process.map((s, i) => (
              <div
                key={s.num}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderTop: `3px solid ${colors[i]}`,
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    color: colors[i],
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    marginBottom: 12,
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="display-md"
                  style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}
                >
                  {s.h}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.70)',
                    lineHeight: 1.6,
                  }}
                >
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2
              className="display-lg"
              style={{ margin: '14px auto 0', color: PURPLE }}
            >
              What CAM operators actually ask.
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {faqs.map((f, i) => (
              <FAQItem
                key={i}
                q={f.q}
                a={f.a}
                bordered={true}
                accent={BLUE}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Ready to see your print stack on one page?"
        sub="30 minutes. We'll audit every proposal, mailer, sign, and template you've shipped this year — and show you the system gap and the procurement leak."
      />
    </>
  );
}
