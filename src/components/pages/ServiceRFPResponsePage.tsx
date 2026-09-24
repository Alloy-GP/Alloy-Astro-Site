// src/components/pages/ServiceRFPResponsePage.tsx
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

export default function ServiceRFPResponsePage() {
  const timeline = [
    { d: 'Day 0',     c: PINK,   h: 'Intake call',             dt: '60 minutes. We pull the RFP, the board profile, the incumbent, and what you actually know about the room.' },
    { d: 'Day 1–3',   c: YELLOW, h: 'Strategy memo',           dt: 'Three-page memo: who\'s voting, what they care about, what the incumbent screwed up, where you win and where you flank.' },
    { d: 'Day 4–10',  c: GREEN,  h: 'Draft + design',          dt: 'Full proposal authored and designed. You see one mid-draft for sanity-check, then a final review.' },
    { d: 'Day 11–13', c: BLUE,   h: 'Refinement',              dt: 'Two rounds of edits. We sit with you and harden the numbers, the references, the bios.' },
    { d: 'Day 14',    c: PURPLE, h: 'Selection-meeting prep',  dt: 'Two-hour live coaching with whoever\'s presenting. Talk tracks, objection prep, the three slides that matter.' },
  ];

  const useCases = [
    { c: PINK,   sz: '800+ doors',   t: 'Large master-planned RFPs',            d: 'Multi-incumbent decisions where boards weigh five firms over six weeks.' },
    { c: YELLOW, sz: '$2M+ revenue', t: 'Strategic conversion targets',          d: 'Self-managed associations or competitor accounts you\'ve been chasing for two years.' },
    { c: GREEN,  sz: 'Luxury',       t: 'High-amenity HOAs and condos',          d: 'Boards that expect concierge tone, polished references, and proof of operations at altitude.' },
    { c: BLUE,   sz: 'Mixed-use',    t: 'Commercial-residential portfolios',     d: 'Where the proposal has to speak to both a board and a sponsor without splitting the difference.' },
  ];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 80 }}>
          <div style={{ maxWidth: 920 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK, boxShadow: `0 0 0 4px ${PINK}40` }}></span>
              <Eyebrow onDark noLine>BoardMatch™ · RFP Response</Eyebrow>
            </div>
            <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
              You have <span style={{ color: PINK }}>14 days</span> to win the<br />account that changes your year.
            </h1>
            <p className="lead on-dark" style={{ marginBottom: 32, maxWidth: 720 }}>
              We author and design the proposal end-to-end. Strategy memo, fee modeling, transition plan, board-meeting coaching — by people who've sat through 200+ CAM selection meetings. One sprint, one outcome: you walk in to the room with a document that's already arguing for you.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
              <Button variant="primary" arrow href="/strategic-review-request">Send us the RFP →</Button>
              <Button variant="ghost" onDark href="/boardmatch/proposal-optimization">Or rebuild the system →</Button>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* WHEN TO USE */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 44, maxWidth: 760 }}>
            <Eyebrow color={PINK}>When to call us</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>This is for the <span style={{ color: PINK }}>strategic ones.</span></h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 680, color: '#444' }}>
              We don't take every RFP. We take the ones where losing means twelve months of regret and winning re-anchors your portfolio.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {useCases.map(u => (
              <div key={u.t} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)', borderTop: `4px solid ${u.c}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div className="display-md" style={{ fontSize: 20, color: PURPLE }}>{u.t}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: u.c, background: `${u.c}15`, padding: '4px 10px', borderRadius: 999 }}>{u.sz}</div>
                </div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{u.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow>The 14-day sprint</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>How it actually goes.</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 90, top: 24, bottom: 24, width: 2, background: 'var(--border-subtle)' }} />
            {timeline.map(s => (
              <div key={s.d} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: '20px 0', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700 }}>{s.d}</div>
                </div>
                <div style={{ position: 'relative', paddingLeft: 0 }}>
                  <div style={{ position: 'absolute', left: -98, top: 4, width: 16, height: 16, borderRadius: 999, background: s.c, border: '3px solid var(--alloy-off-white)', zIndex: 2 }}></div>
                  <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 6 }}>{s.h}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65, maxWidth: 720 }}>{s.dt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark color={YELLOW}>What you walk in with</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>One proposal. <span style={{ color: YELLOW }}>Built to win this room.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { i: 'compass',  c: PINK,   h: 'Strategy memo',          d: 'Three pages on the room: voters, motivations, incumbent failure modes, where you flank and where you press.' },
              { i: 'layers',   c: YELLOW, h: 'Full proposal',          d: 'Authored and designed. 18–24 pages. Ready to print, ready to bind, ready to send.' },
              { i: 'shield',   c: GREEN,  h: 'Fee model',              d: 'Transparent, defensible pricing built around your actual operating cost — not pulled from your last template.' },
              { i: 'workflow', c: BLUE,   h: 'Transition plan',        d: 'Week-by-week onboarding from contract signing through first board meeting. Boards take this seriously, so we do too.' },
              { i: 'users',    c: PURPLE, h: 'Reference + bio kit',    d: 'Three handpicked references coached on what to say. Bios that read like operators, not LinkedIn summaries.' },
              { i: 'trending', c: PINK,   h: 'Selection-meeting prep', d: 'Two-hour live coaching. Talk tracks, the three slides that matter, the four objections you will get and how to handle them.' },
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

      {/* PRICING NOTE */}
      <section className="section section-ivory">
        <div className="container-narrow">
          <div style={{ background: '#fff', borderRadius: 14, padding: 44, border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <Eyebrow color={GREEN}>Investment</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>Fixed fee. Quoted per RFP.</h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 28px' }}>
              We scope each engagement on the proposal's complexity — portfolio size, number of voters, depth of incumbent research required. Most engagements land between $14k and $32k. We tell you the number on the intake call before either side commits.
            </p>
            <Button variant="primary" arrow href="/strategic-review-request">Get a quote on your RFP →</Button>
            <div style={{ marginTop: 24, fontSize: 13, color: '#888' }}>If we don't think we're the right fit for your specific RFP, we'll say so on the intake call.</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>Before you send the RFP.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <FAQItem bordered accent={PINK} q="Why not just use our internal team?"
              a="Use them when you can. We come in when the stakes outrun your bandwidth — when your BD lead is also running three other proposals, when the RFP demands a level of strategy and design your team doesn't produce in two weeks, or when losing this account costs you more than the engagement." />
            <FAQItem bordered accent={YELLOW} q="Will this proposal look like every other proposal you write?"
              a="No. The strategy memo and the proposal are built around this specific board, this specific competitive set, and this specific portfolio. Visual system inherits your brand if you have one — and we'll fix the brand on the way through if it's hurting you, no extra charge for light cleanup." />
            <FAQItem bordered accent={GREEN} q="Can you guarantee we'll win?"
              a="No, and you should be skeptical of anyone who does. We can guarantee the proposal is materially better than what you would have submitted, that the fee model is defensible, and that the team walking into the meeting is prepared. Win rate on the engagements we take is 64% — but we choose engagements where the underlying fit is real." />
            <FAQItem bordered accent={BLUE} q="What if the RFP deadline is sooner than 14 days?"
              a="We've done it in 9. Below 9 days, we'll talk honestly about whether the work is good enough to justify your check. Under 6 days, we usually decline." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Send us the RFP. We'll tell you within 48 hours whether it's worth chasing."
        sub="No-obligation intake call. We read it, you bring context, we tell you the truth about whether you can win it and what it would take."
      />
    </>
  );
}
