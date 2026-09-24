import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

export default function CareersPage() {
  const roles = [
    { team: 'Strategy',    title: 'Senior Strategist, CAM Practice',       type: 'Full-time · Remote (US)',  summary: 'Lead BoardSuite engagements end-to-end. 8+ years marketing strategy, ideally with HOA/property management or related vertical operators.', color: PINK },
    { team: 'Design',      title: 'Senior Brand Designer',                 type: 'Full-time · Remote (US)',  summary: 'Identity systems for CAM operators. Print + digital fluency. Portfolio with at least three full brand systems shipped.', color: YELLOW },
    { team: 'Editorial',   title: 'Senior Editor, Vertical Content',       type: 'Full-time · Remote (US)',  summary: 'Translate reserve studies, financials, and ops data into copy boards and homeowners actually read. 5+ years editorial leadership.', color: GREEN },
    { team: 'Engineering', title: 'Full-Stack Engineer (Web + Marketing)', type: 'Full-time · Remote (US)',  summary: 'Build and ship the platforms behind BoardSuite — sites, portals, instrumentation. React, Next, Node, analytics. Five years+.', color: BLUE },
    { team: 'Operations',  title: 'Account Manager, CAM Portfolio',        type: 'Full-time · Remote (US)',  summary: 'Run multi-property engagements across 5–8 client firms. CAM industry background strongly preferred.', color: PINK },
    { team: 'Operations',  title: 'Print Production Manager',              type: 'Contract → FT · Hybrid',  summary: 'Vendor management, QC, mail-house coordination across 24-surface print systems. Ops-mind, calm in rush jobs.', color: YELLOW },
  ];

  const principles = [
    { h: 'Operators first, always',        d: "Every artifact we ship gets pressure-tested by someone who's actually run a CAM portfolio. If it doesn't pass that test, it doesn't ship." },
    { h: 'Plain English is the standard',  d: "We translate reserve studies, ops data, and CC&R legalese into copy real humans read. If you can't explain it to a board chair in two sentences, you don't understand it yet." },
    { h: 'Ship the system, not the asset', d: "We don't deliver one-off deliverables. We deliver engines — templates, playbooks, vendor networks, reorder triggers — that keep running after we leave the room." },
    { h: 'Disagree, then commit',          d: "Pre-decision: argue the case hard, with data, with everyone in the room. Post-decision: row in the same direction. We don't relitigate by Slack." },
    { h: 'Quiet excellence',               d: "We let the work do the talking. No thought leadership for the sake of it. No conference circuit unless we're saying something new." },
    { h: 'Time off is non-negotiable',     d: "Unlimited PTO with a 4-week minimum floor. Burnout is an operational failure, not a virtue." },
  ];

  const benefits = [
    { icon: 'shield',    h: 'Health, dental, vision',     d: 'Premium plans, 100% covered for employee, 80% for dependents. HSA option with $2K annual employer contribution.' },
    { icon: 'compass',   h: 'Remote-first, async-default', d: 'Distributed team across the US. Two in-person offsites per year. No mandatory return-to-office. Ever.' },
    { icon: 'feather',   h: '4-week PTO floor',            d: "Unlimited PTO with a 4-week annual minimum. Manager confirms you've taken at least four weeks off — that's the floor, not the ceiling." },
    { icon: 'sparkles',  h: 'Learning budget',             d: '$3K/yr for conferences, courses, books, coaching. Plus paid CAI dues for anyone working in the practice.' },
    { icon: 'bar-chart', h: '401(k) + match',              d: '4% match, vested immediately. Roth and traditional options. Low-fee Vanguard index funds.' },
    { icon: 'globe',     h: 'Parental leave',              d: '16 weeks fully-paid for primary, 8 weeks for secondary. Phased return at 50%/75%/100% for the first month back.' },
  ];

  const process = [
    { num: '01', h: 'Apply',           d: 'Send a short note + resume to careers@alloygp.co. No cover letter required, but tell us what you\'re working on right now and why.' },
    { num: '02', h: 'Conversation',    d: '30-min call with the hiring manager. We\'re trying to understand your work, not interrogate you. Ask us anything.' },
    { num: '03', h: 'Working session', d: 'Paid 2-hour working session on a real (anonymized) problem from our pipeline. We see how you think; you see how we work.' },
    { num: '04', h: 'Decision',        d: 'Reference calls + offer within 7 days of the working session. We don\'t drag this out. Yes or no, fast.' },
  ];

  const principleColors = [PINK, YELLOW, GREEN, BLUE, PINK, YELLOW] as string[];
  const benefitColors   = [PINK, YELLOW, GREEN, BLUE, PINK, YELLOW] as string[];
  const processColors   = [PINK, YELLOW, GREEN, BLUE] as string[];

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
                <span style={{ width: 8, height: 8, borderRadius: 999, background: GREEN, boxShadow: '0 0 0 4px rgba(141,211,151,0.20)' }}></span>
                <Eyebrow onDark noLine>Careers at Alloy</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Build the <span style={{ color: PINK }}>marketing engine</span><br />
                for an industry <span style={{ color: YELLOW }}>nobody serves well.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                Alloy works with CAM and HOA management firms — a $9B vertical run by smart operators
                using marketing tools built for everyone but them. We ship the brand systems, the lead
                engines, and the retention infrastructure that move the actual numbers. If you want to
                build something that compounds, you&apos;ll find it here.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="#open-roles">See open roles</Button>
                <Button variant="secondary" onDark href="#how-we-work">How we work</Button>
              </div>
            </div>
            <div style={{ position: 'relative', height: 480, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '10% 4%', background: 'radial-gradient(ellipse at center, rgba(141,211,151,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '82%' }}>
                {[
                  { c: PINK,   k: 'Distributed', v: 'Team across 11 states' },
                  { c: YELLOW, k: '4-wk floor',  v: 'Mandatory annual PTO' },
                  { c: GREEN,  k: '$3K/yr',       v: 'Learning budget' },
                  { c: BLUE,   k: '16 wk',        v: 'Primary parental leave' },
                ].map((s) => (
                  <div
                    key={s.v}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderTop: `3px solid ${s.c}`,
                      borderRadius: 12,
                      padding: 22,
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.02em' }}>{s.k}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* ── Principles ───────────────────────────────────────────────────── */}
      <section id="how-we-work" className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>
              Six principles that show up in everything we ship.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {principles.map((p, i) => (
              <div
                key={p.h}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: 28,
                  border: '1px solid var(--border-subtle)',
                  borderTop: `3px solid ${principleColors[i]}`,
                }}
              >
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 12 }}>{p.h}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────────────────────────── */}
      <section id="open-roles" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>Open roles</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>
              We&apos;re hiring across strategy, design, editorial, and engineering.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-subtle)' }}>
            {roles.map((r) => (
              <div
                key={r.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 200px auto',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: r.color, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{r.team}</div>
                <div>
                  <div className="display-md" style={{ fontSize: 20, color: PURPLE, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.55 }}>{r.summary}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#777', letterSpacing: '0.06em' }}>{r.type}</div>
                <Button variant="secondary" arrow href={`mailto:careers@alloygp.co?subject=Application: ${r.title}`}>Apply</Button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 24, background: 'var(--alloy-off-white)', borderRadius: 12, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
            <strong style={{ color: PURPLE }}>Don&apos;t see your role?</strong> We&apos;re always open to conversations with
            strategists, designers, and operators who&apos;ve worked in or alongside the property management industry.
            Email <a href="mailto:careers@alloygp.co" style={{ color: PINK, fontWeight: 600 }}>careers@alloygp.co</a> with
            what you&apos;re working on.
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Benefits that match the work.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {benefits.map((b, i) => (
              <div
                key={b.h}
                style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: benefitColors[i] + '22',
                    display: 'grid',
                    placeItems: 'center',
                    marginBottom: 18,
                  }}
                >
                  <Icon name={b.icon} size={22} color={benefitColors[i]} strokeWidth={2} />
                </div>
                <div className="display-md" style={{ fontSize: 20, color: PURPLE, marginBottom: 8 }}>{b.h}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>Hiring process</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>
              From first email to offer in <span style={{ color: YELLOW }}>2 weeks.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div
                key={s.num}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderTop: `3px solid ${processColors[i]}`,
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: processColors[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Want to build the marketing engine for a $9B industry?"
        sub="Email careers@alloygp.co with what you're working on. Real responses, not auto-replies."
      />
    </>
  );
}
