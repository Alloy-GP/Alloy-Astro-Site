// src/components/pages/ServiceProposalOptimizationPage.tsx
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

export default function ServiceProposalOptimizationPage() {
  const beforeAfter = [
    { label: 'Pages',                  before: 42,      after: 18,    color: PINK },
    { label: 'Time to write',          before: '16 hrs', after: '4 hrs', color: YELLOW },
    { label: 'Selection-meeting hits', before: '31%',   after: '62%', color: GREEN },
    { label: 'Win rate (warm RFPs)',   before: '22%',   after: '47%', color: BLUE },
  ];

  const symptoms = [
    { i: 'x', c: PINK, h: 'Looks like everyone else\'s',    d: 'Same fee table, same staff bios, same generic \'why we\'re different\' page. Boards literally can\'t tell you apart from the other three.' },
    { i: 'x', c: PINK, h: 'Buried answers',                 d: 'The thing the board actually cares about — fee transparency, transition plan, response time SLAs — is on page 31, after the company history.' },
    { i: 'x', c: PINK, h: 'No differentiation hierarchy',   d: 'Every advantage gets the same weight. Boards skim, latch onto whatever\'s on top, and forget the rest.' },
    { i: 'x', c: PINK, h: 'Sales-led, not board-led',       d: 'Reads like a salesperson wrote it for another salesperson. Boards detect this in 90 seconds.' },
  ];

  const phases = [
    { n: '01', c: PINK,   h: 'Audit your last five proposals', d: 'We pull win/loss data, identify which sections boards actually engaged with, and benchmark structure against the four competitors who keep beating you. You\'ll know your win-rate baseline by phase end.' },
    { n: '02', c: YELLOW, h: 'Build the differentiation engine', d: 'Three to five proof points, ranked by how much they move boards in selection meetings — not by what your team thinks is impressive. Every claim gets a defensible source.' },
    { n: '03', c: GREEN,  h: 'Restructure for the board reader', d: 'New table of contents, new opener, new fee disclosure, new transition plan. Half the page count. Twice the signal density. Built so a board member who skims gets the answer in 90 seconds.' },
    { n: '04', c: BLUE,   h: 'Templatize + train', d: 'Master template with locked layout, plug-in copy blocks for portfolio specifics, and a 30-minute training so your BD team produces consistent proposals without us in the loop.' },
    { n: '05', c: PURPLE, h: 'Optimize quarterly', d: 'We track win/loss data on every proposal that goes out, run quarterly tweaks based on what\'s working, and keep the template aligned with how the market is selecting.' },
  ];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: YELLOW, boxShadow: `0 0 0 4px ${YELLOW}40` }}></span>
                <Eyebrow onDark noLine>BoardMatch™ · Proposal Optimization</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Your proposal isn't a quote.<br />
                <span style={{ color: YELLOW }}>It's a selection meeting</span> in a binder.
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 32, maxWidth: 600 }}>
                Boards don't pick the best management firm. They pick the firm whose proposal best argued it was the best. We rebuild yours into a document engineered to win the room you're not in.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
                <Button variant="primary" arrow href="/strategic-review-request">Audit my last five proposals</Button>
                <Button variant="ghost" onDark href="/boardmatch/rfp-response-system">See RFP Response →</Button>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 24, border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: YELLOW, letterSpacing: '0.16em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 14 }}>Typical 90-day shift</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {beforeAfter.map(b => (
                  <div key={b.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 14, borderLeft: `3px solid ${b.color}` }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 6 }}>{b.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{b.after}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>{b.before}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* SYMPTOMS */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 720 }}>
            <Eyebrow color={PINK}>Why proposals lose</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>
              Four ways yours might be losing rooms <span style={{ color: PINK }}>you'll never see.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {symptoms.map(s => (
              <div key={s.h} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)', display: 'flex', gap: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${s.c}15`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={s.i} size={18} color={s.c} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="display-md" style={{ fontSize: 18, color: PURPLE, marginBottom: 8 }}>{s.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FIVE-PHASE REBUILD */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow>The rebuild</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Five phases. 90 days. <span style={{ color: PINK }}>Win-rate on the other side.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            {phases.map((p, i) => (
              <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 32, padding: '28px 0', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                <div>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: p.c, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '0.04em' }}>{p.n}</div>
                </div>
                <div>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, marginBottom: 10 }}>{p.h}</div>
                  <div style={{ fontSize: 15, color: '#555', lineHeight: 1.7, maxWidth: 760 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark color={YELLOW}>Deliverables</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>What lands in your hands.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { i: 'layers',   c: PINK,   h: 'Master proposal template', d: 'InDesign + Word, locked layout, modular content blocks. Sized for 18 pages, scales to 28 max.' },
              { i: 'compass',  c: YELLOW, h: 'Differentiation playbook', d: 'Three to five ranked proof points with sourcing, talk tracks, and selection-meeting framings.' },
              { i: 'shield',   c: GREEN,  h: 'Fee disclosure framework', d: 'Transparent, board-readable fee table that turns \'expensive\' into \'priced for the work\'.' },
              { i: 'workflow', c: BLUE,   h: 'BD team training',         d: '30-minute live + 90-minute Loom library. Your team produces consistent output without us.' },
              { i: 'trending', c: PURPLE, h: 'Win/loss tracker',         d: 'Lightweight CRM-friendly tracker so you actually know what\'s working by category, not by gut.' },
              { i: 'calendar', c: PINK,   h: 'Quarterly tune-up',        d: 'We re-benchmark, re-test the opener, and refresh proof points each quarter as your portfolio grows.' },
            ].map(d => (
              <div key={d.h} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: `3px solid ${d.c}`, borderRadius: 12, padding: 24 }}>
                <Icon name={d.i} size={22} color={d.c} strokeWidth={2} />
                <div className="display-md" style={{ fontSize: 18, color: '#fff', margin: '14px 0 8px' }}>{d.h}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{d.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR / NOT */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div style={{ background: '#fff', borderRadius: 14, padding: 36, border: `2px solid ${GREEN}`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: 24, background: GREEN, color: PURPLE, padding: '5px 14px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>Right fit</div>
              <h3 className="display-md" style={{ margin: '10px 0 18px', color: PURPLE }}>This works for you if…</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'You\'re winning under 30% of warm proposals you respond to.',
                  'Your team writes from scratch each time, or copies the last one.',
                  'You can name three competitors but can\'t articulate how you\'re meaningfully different.',
                  'Your last proposal was over 30 pages, and you\'re not sure that\'s right.',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: '#333', lineHeight: 1.6 }}>
                    <Icon name="check" size={16} color={GREEN} strokeWidth={3} style={{ flexShrink: 0, marginTop: 4 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 36, border: '1px solid var(--border-subtle)', opacity: 0.85 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 18 }}>Probably not a fit</div>
              <h3 className="display-md" style={{ margin: '0 0 18px', color: '#888' }}>Skip this if…</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'You don\'t actually respond to proposals — you only do referral business.',
                  'Your win rate is already 60%+ and the volume is fine.',
                  'You need someone to ghostwrite each individual proposal (we build systems, not ghostwriters).',
                  'Leadership isn\'t aligned on who you are — fix positioning first.',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: '#777', lineHeight: 1.6 }}>
                    <Icon name="x" size={16} color="#ccc" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            <FAQItem bordered accent={PINK} q="Is this the same thing as your RFP Response service?"
              a="Related but different. Proposal Optimization rebuilds the system — your master template, differentiation, fee model, training. RFP Response is a sprint engagement: we author one specific high-stakes proposal end-to-end. Most operators do Optimization first, then bring in Response only for portfolios over 800 doors or strategic accounts." />
            <FAQItem bordered accent={YELLOW} q="What if our proposal already looks great?"
              a="Looks and wins are different things. Beautiful proposals lose all the time because the differentiation logic is wrong, the fee disclosure spooks boards, or the answer-to-question ratio is off. We audit win rate, not aesthetics. If your win rate is already 50%+ and the volume's fine, we'll tell you to skip this." />
            <FAQItem bordered accent={GREEN} q="How is this different from a designer making it pretty?"
              a="A designer fixes layout. We fix selection-meeting outcomes. Strategy first (what should your three differentiators actually be?), then structure (what order do boards want answers?), then design. Most CAM proposals fail before the designer ever opens the file." />
            <FAQItem bordered accent={BLUE} q="What's the realistic timeline?"
              a="Audit + strategy: 3 weeks. Rebuild: 5 weeks. Training + first live deployment: 2 weeks. So 90 days from kickoff to first proposal going out the door in the new system. Win-rate signal becomes statistically meaningful around month 5–6." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Stop sending proposals that lose to firms with worse operations."
        sub="The Strategic Review pulls your last five proposals and shows you exactly where boards drop off. 30 minutes, no obligation, written diagnosis you keep."
      />
    </>
  );
}
