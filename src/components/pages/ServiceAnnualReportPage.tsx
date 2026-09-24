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

function AnnualReportMockup() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow:
          '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        maxWidth: 480,
        transform: 'rotate(-1deg)',
      }}
    >
      <div
        style={{
          padding: '20px 22px 16px',
          background: PURPLE,
          color: '#fff',
        }}
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
          Cypress Lakes HOA · 2025
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
          Annual Report
        </div>
        <div
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}
        >
          Reserve health · Operations · Year ahead
        </div>
      </div>
      <div style={{ padding: '16px 22px 18px' }}>
        {/* Section: Reserve */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: '#999',
              letterSpacing: '0.10em',
              textTransform: 'uppercase' as const,
              fontWeight: 700,
            }}
          >
            01 · Reserve health
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 14,
              color: GREEN,
            }}
          >
            87% funded
          </div>
        </div>
        <div
          style={{
            background: '#f4f0fa',
            height: 8,
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 14,
          }}
        >
          <div
            style={{ background: GREEN, height: '100%', width: '87%' }}
          ></div>
        </div>
        {/* Section: Operations */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: '#999',
            letterSpacing: '0.10em',
            textTransform: 'uppercase' as const,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          02 · Operations
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            { k: '342', v: 'Work orders' },
            { k: '4 hr', v: 'Avg response' },
            { k: '97%', v: 'Closed < 7d' },
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
        {/* Section: Year ahead */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: '#999',
            letterSpacing: '0.10em',
            textTransform: 'uppercase' as const,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          03 · 2026 priorities
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { c: PINK, t: 'Roof replacement — Phase 2 (Bldg C–E)' },
            { c: YELLOW, t: 'Pool deck refinish + ADA compliance' },
            { c: GREEN, t: 'Reserve study refresh (5-yr)' },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                fontSize: 11,
                color: '#333',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: r.c,
                  flexShrink: 0,
                }}
              ></span>
              {r.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page component ─────────────────────────────────────────────────────────

export default function ServiceAnnualReportPage() {
  const includes = [
    {
      icon: 'search',
      h: 'Data extraction + interview',
      d: 'We pull from your accounting system, work-order log, reserve study, and meeting minutes — then interview your manager and board chair to surface the story behind the numbers.',
    },
    {
      icon: 'edit',
      h: 'Editorial structure',
      d: 'Year in review, reserve health, operations performance, capital projects, year-ahead priorities. The structure boards expect, written so homeowners actually read it.',
    },
    {
      icon: 'bar-chart',
      h: 'Designed financials',
      d: 'Reserve funding, income vs. budget, capital spend by category, special-assessment risk. Charts that pass a CFO check and a 30-second skim.',
    },
    {
      icon: 'feather',
      h: 'Plain-English narrative',
      d: 'Translation of CC&R, reserve study, and audit language into a homeowner-readable story. Boards stop fielding "what does this mean" calls.',
    },
    {
      icon: 'layers',
      h: 'Photography + visuals',
      d: 'On-property photography of capital projects, common areas, and community life. The corporate-aerial cliché replaced with imagery that proves the work.',
    },
    {
      icon: 'compass',
      h: 'Board chair letter',
      d: 'Ghost-written letter from the board chair — voice-matched, fact-checked, signed off. The piece that humanizes the document.',
    },
    {
      icon: 'globe',
      h: 'Print + digital delivery',
      d: 'Print-ready PDF for mail, web-optimized PDF for portal, accessible HTML for the website, social tiles for the highlight reel. One report, every channel.',
    },
    {
      icon: 'shield',
      h: 'Compliance review',
      d: 'Legal sign-off on disclosures, reserve language, and forward-looking statements. We work with your counsel; you sign with confidence.',
    },
    {
      icon: 'sparkles',
      h: 'Annual meeting deck',
      d: 'Companion slide deck for the annual meeting — same data, same design system, presentation-ready. Saves your manager the all-nighter.',
    },
  ];

  const stats = [
    {
      color: PINK,
      k: '12%',
      v: 'median open rate on a generic, text-only annual report packet mailed to homeowners. Most never get read.',
      src: 'Alloy CAM operator survey, 2026',
    },
    {
      color: YELLOW,
      k: '68%',
      v: 'engagement rate (open + scroll) on a designed annual report sent through the homeowner portal. The format moves the needle — not the content.',
      src: 'Alloy benchmark, post-engagement',
    },
    {
      color: GREEN,
      k: '−41%',
      v: 'reduction in "I don\'t understand my dues" homeowner inquiries to the manager in the 60 days following annual report distribution.',
      src: 'Apex CMG* case study, 2025',
    },
    {
      color: BLUE,
      k: '1.7×',
      v: 'lift in board renewal probability when the annual report is designed and narrated vs. compliance-only.',
      src: 'Alloy retention model',
    },
  ];

  const beforeAfter = [
    {
      dim: 'Format',
      before: 'Stapled packet, 11pt Arial, photocopied',
      after: 'Designed report — print, web, social, accessible HTML',
    },
    {
      dim: 'Voice',
      before: 'CC&R legalese and reserve-study jargon',
      after: 'Plain English narrative, ghost-written board chair letter',
    },
    {
      dim: 'Financials',
      before: 'Spreadsheet print-out',
      after: 'Designed charts, CFO-grade and skim-friendly',
    },
    {
      dim: 'Photography',
      before: 'Stock aerials, no proof of work',
      after: 'On-property imagery of completed capital projects',
    },
    {
      dim: 'Distribution',
      before: 'Mailed once, never opened',
      after: 'Multi-channel: portal, web, email, social, print',
    },
    {
      dim: 'Annual meeting',
      before: 'Manager builds the deck the night before',
      after: 'Companion deck included, presentation-ready',
    },
    {
      dim: 'Outcome',
      before: 'Compliance check-the-box',
      after: 'Retention asset — boards forward it to other boards',
    },
  ];

  const process = [
    {
      num: '01',
      h: 'Intake',
      d: 'Data pull, accounting export, reserve study, meeting minutes. Manager + board chair interviews. Two weeks.',
    },
    {
      num: '02',
      h: 'Outline',
      d: 'Editorial structure, narrative arc, key visualizations approved before any design starts. Board chair signs off on outline.',
    },
    {
      num: '03',
      h: 'Design',
      d: 'Two design directions reviewed; one refined. Photography commissioned where needed. Compliance review with counsel.',
    },
    {
      num: '04',
      h: 'Deliver',
      d: 'Print-ready PDF, web PDF, accessible HTML, social tiles, annual meeting deck. Distribution playbook included.',
    },
  ];

  const faqs = [
    {
      q: 'How is this different from our compliance-required annual disclosure?',
      a: 'We layer on top of your compliance disclosure — we don\'t replace it. Required state and CC&R disclosures are reproduced verbatim per your counsel. The Alloy work is the narrative wrapper, the design system, and the multi-channel distribution that turns the legal document into something homeowners read.',
    },
    {
      q: 'Who writes it?',
      a: 'Alloy editorial team writes; your manager and board chair are interviewed and quoted. The board chair letter is ghost-written and voice-matched, then approved verbatim before publication. We don\'t put words in board mouths — we shape the words they already use into a piece they\'re proud to sign.',
    },
    {
      q: 'What\'s the timeline?',
      a: 'Standard production runs 6–8 weeks from intake to delivered files. We recommend kicking off 10 weeks before your annual meeting. Rush production (4 weeks) available with a surcharge — but we\'ll tell you honestly if it\'s worth it.',
    },
    {
      q: 'Can you do this for a single property or only firm-wide?',
      a: 'Both. Single-property reports run $8K–$18K depending on scope and photography. Firm-wide programs (10+ properties on a templated system) drop to $4K–$8K per property after the system is built. Most ROI is in the firm-wide model.',
    },
    {
      q: 'How does this fit with BoardSuite?',
      a: 'Annual reports are a BoardRetain (Keep) flagship. They\'re the single most-forwarded artifact a board sends to other boards — which means they double as a BoardReach (Attract) tool. Operators running this program report 1.7× higher board renewal probability and meaningful inbound from other associations.',
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
                    background: GREEN,
                    boxShadow: '0 0 0 4px rgba(141,211,151,0.20)',
                  }}
                ></span>
                <Eyebrow onDark noLine>
                  BoardRetain · Annual Report Production
                </Eyebrow>
              </div>
              <h1
                className="display-xl"
                style={{ margin: '0 0 22px', color: '#fff' }}
              >
                The annual report is your{' '}
                <span style={{ color: PINK }}>most-forwarded</span> board
                artifact.
                <br />
                Make sure it&apos;s{' '}
                <span style={{ color: YELLOW }}>worth forwarding.</span>
              </h1>
              <p
                className="lead on-dark"
                style={{ marginBottom: 28, maxWidth: 600 }}
              >
                Most CAM firms ship a stapled packet that 88% of homeowners
                never open. The boards that get a designed annual report —
                narrative, charts, photography, multi-channel distribution —
                see 1.7× higher renewal probability. It&apos;s the single
                highest-leverage retention artifact you ship all year.
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
                  Get a sample report
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
                  { k: 'Engagement', v: '68%' },
                  { k: 'Renewal', v: '1.7×' },
                  { k: 'Timeline', v: '6–8 wks' },
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
                    'radial-gradient(ellipse at center, rgba(141,211,151,0.20) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              ></div>
              <div style={{ width: '82%' }}>
                <AnnualReportMockup />
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
              The numbers behind designed annual reports.
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
              The complete annual report engine.
            </h2>
          </div>
          <ServiceList color={GREEN} items={includes} />
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
              Compliance packet vs. retention asset.
            </h2>
          </div>
          <div
            className="svc-compare-wrap"
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
              <div style={{ color: YELLOW }}>Alloy annual report</div>
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
                    color={GREEN}
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
              From data pull to delivered files in{' '}
              <span style={{ color: YELLOW }}>6–8 weeks.</span>
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
                accent={GREEN}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Want to see what a designed annual report looks like?"
        sub="30 minutes. We'll send you our reference report, walk through how the engagement runs, and price your portfolio on the call."
      />
    </>
  );
}
