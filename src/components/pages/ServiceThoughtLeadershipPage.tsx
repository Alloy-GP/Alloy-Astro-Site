// src/components/pages/ServiceThoughtLeadershipPage.tsx
import { useState } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { CtaBand } from '~/components/sections/Shells';
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

function TLEvidenceRow({ c, label, value, sub }: { c: string; label: string; value: string; sub: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 20, borderLeft: `3px solid ${c}` }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

export default function ServiceThoughtLeadershipPage() {
  const channels = [
    { i: 'book',     c: PINK,   h: 'Long-form essays',   d: 'Four to six per year. The pieces operators forward inside management circles. Co-written with you, ghostwritten when needed, always with your name.' },
    { i: 'users',    c: YELLOW, h: 'Speaking circuit',   d: 'We pitch CAI, NAR, regional summits, and operator roundtables. Two to four landed talks per year, with rehearsal.' },
    { i: 'phone',    c: GREEN,  h: 'Podcast tour',       d: 'Six to eight episodes a year on industry shows that boards and operators actually listen to. We pitch, prep, and follow up.' },
    { i: 'trending', c: BLUE,   h: 'Original research',  d: 'One annual benchmark report. Survey-driven. Cited. The thing people quote a year later when arguing about fees.' },
    { i: 'compass',  c: PURPLE, h: 'Industry POVs',      d: 'Quarterly stance pieces — fee transparency, reserve study practices, AI in CAM. Picks fights worth picking.' },
    { i: 'layers',   c: PINK,   h: 'Newsletter',         d: 'Monthly. 800 words. Goes to boards, operators, and adjacent industry. Builds the audience that buys nothing today and everything in three years.' },
  ];

  const cadence = [
    { q: 'Q1', c: PINK,   items: ['Annual benchmark report launch', 'Two long-form essays', 'One keynote pitch', 'Three podcast bookings'] },
    { q: 'Q2', c: YELLOW, items: ['Two industry POVs', 'One co-authored essay with a board member', 'Newsletter cadence locked in', 'Speaking debut'] },
    { q: 'Q3', c: GREEN,  items: ['Mid-year benchmark refresh', 'Two long-form essays', 'Two podcast appearances', 'First conference panel'] },
    { q: 'Q4', c: BLUE,   items: ['Year-end retrospective piece', 'Industry predictions essay', 'Speaking pitches for next year locked', 'Audience report to leadership'] },
  ];

  const colors = [PINK, YELLOW, GREEN, BLUE] as string[];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: BLUE, boxShadow: `0 0 0 4px ${BLUE}40` }}></span>
                <Eyebrow onDark noLine>BoardRetain™ · Thought Leadership</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Become the firm boards <span style={{ color: BLUE }}>quote in meetings</span> before you ever pitch them.
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 32, maxWidth: 600 }}>
                We turn your principals into voices the industry actually hears — through essays, research, podcasts, and stages. Not content marketing. Industry leadership, executed at the cadence and quality that buys you a decade of inbound.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
                <Button variant="primary" arrow href="/strategic-review-request">Map our positioning</Button>
                <Button variant="ghost" onDark href="/boardmatch/sales-messaging">See Sales Messaging →</Button>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 16 }}>Year 1 typical outcomes</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <TLEvidenceRow c={PINK}   label="Inbound proposal requests" value="3.2×"  sub="Versus pre-program baseline, by month 12." />
                <TLEvidenceRow c={YELLOW} label="Speaking invitations"      value="14"    sub="Across CAI chapters, regional summits, and operator events." />
                <TLEvidenceRow c={GREEN}  label="Earned press placements"   value="7"     sub="Trade publications + two general-business mentions." />
                <TLEvidenceRow c={BLUE}   label="Newsletter audience"       value="4,200" sub="Boards, operators, and adjacent decision makers." />
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* PHILOSOPHY */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <Eyebrow color={PINK}>Philosophy</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 22px', color: PURPLE }}>Most CAM <span style={{ color: PINK }}>"thought leadership"</span> is just blog posts in a fedora.</h2>
              <p className="lead" style={{ marginBottom: 18, color: '#444' }}>
                Real thought leadership picks fights. It takes positions the industry argues with. It produces research nobody else is willing to fund. It puts your operators on stages where boards are sitting in row three.
              </p>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7 }}>
                We've placed 200+ pieces with industry trade publications, ghostwritten three industry-defining annual reports, and put CAM principals on stage at every major regional summit. We know what gets read, what gets argued with, and what gets you remembered. The rest is just SEO confetti.
              </p>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 36, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 16 }}>What this is not</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  "A blog full of '5 tips for...' posts written by an SEO contractor",
                  "Vendor-sponsored 'industry insights' that read like ad copy",
                  'LinkedIn posts ghostwritten by an agency with no CAM experience',
                  'A whitepaper PDF that nobody downloads or reads',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: '#555', lineHeight: 1.6 }}>
                    <Icon name="x" size={16} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow color={YELLOW}>Channels</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Six surfaces. <span style={{ color: BLUE }}>Run together.</span></h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 720, color: '#444' }}>
              The compounding works because they reinforce each other. The benchmark report becomes the keynote. The keynote becomes the podcast. The podcast becomes the essay. The essay becomes the proposal opener.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {channels.map(ch => (
              <div key={ch.h} style={{ background: 'var(--alloy-off-white)', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)', borderTop: `4px solid ${ch.c}` }}>
                <Icon name={ch.i} size={22} color={ch.c} strokeWidth={2} />
                <div className="display-md" style={{ fontSize: 20, color: PURPLE, margin: '14px 0 10px' }}>{ch.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{ch.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CADENCE */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark color={YELLOW}>What year one looks like</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>Quarterly cadence.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {cadence.map((q, qi) => (
              <div key={q.q} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderTop: `4px solid ${colors[qi]}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: colors[qi], letterSpacing: '-0.02em', marginBottom: 16 }}>{q.q}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {q.items.map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                      <span style={{ color: colors[qi], flexShrink: 0 }}>—</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>You bring the ideas. <span style={{ color: GREEN }}>We bring the leverage.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { n: '01', c: PINK,   h: 'Monthly idea capture',      d: '90 minutes with your principal. We pull the operating tensions, the contrarian observations, and the war stories that became theses. Recording becomes raw material.' },
              { n: '02', c: YELLOW, h: 'We do the writing',          d: "First drafts, full structure, all sourcing. You react. You don't write. The byline is yours; the labor is ours." },
              { n: '03', c: GREEN,  h: 'Distribution + repurposing', d: 'We pitch every piece to the right outlets, repurpose for newsletter, podcast bookings, and conference proposals. One idea, six surfaces.' },
            ].map(p => (
              <div key={p.n} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: p.c, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>{p.n}</div>
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 10 }}>{p.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>Before you ask.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <FAQItem bordered accent={PINK}   q="What's the realistic timeline to see business impact?" a="Inbound starts shifting around month 9. Selection-meeting framing — boards saying 'I read your piece on...' — starts happening month 6. The annual benchmark report is the inflection. Don't sign up for this if you need leads in 90 days; sign up if you want a moat in three years." />
            <FAQItem bordered accent={YELLOW} q="What if our principals don't want to write?" a="They don't have to. Most don't. We capture in conversation, draft, and bring it back for reaction. The voice gets locked in by month two. By month four, we're producing pieces in your principal's voice with 30 minutes of their time per piece." />
            <FAQItem bordered accent={GREEN}  q="Is this just ghostwriting?" a="No. Ghostwriting is one tool. The strategy — what positions to take, which fights to pick, which research to fund, which stages to chase — is the actual product. Ghostwriting without strategy is just outsourced blog posts." />
            <FAQItem bordered accent={BLUE}   q="What's the investment?" a="Year-one programs run $9k–$16k per month depending on cadence and channel mix. Year two settles into a steady-state retainer, usually 30% lower as the engine matures. We scope it on the intake call, not by gut feel." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="The firms boards remember are the ones boards keep hearing from."
        sub="Strategic Review maps your current voice surface area, your competitors', and the gap. 30 minutes, written diagnosis, no obligation."
      />
    </>
  );
}
