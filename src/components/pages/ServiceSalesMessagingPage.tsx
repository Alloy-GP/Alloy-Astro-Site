// src/components/pages/ServiceSalesMessagingPage.tsx
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

function MessagePillar({ n, c, h, before, after }: { n: string; c: string; h: string; before: string; after: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: c, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{n}</div>
        <div className="display-md" style={{ fontSize: 18, color: PURPLE }}>{h}</div>
      </div>
      <div style={{ marginBottom: 14, padding: 14, background: 'var(--alloy-off-white)', borderRadius: 8, borderLeft: '3px solid #ccc' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 6 }}>What CAM teams say</div>
        <div style={{ fontSize: 13, color: '#777', fontStyle: 'italic', lineHeight: 1.55 }}>"{before}"</div>
      </div>
      <div style={{ padding: 14, background: `${c}10`, borderRadius: 8, borderLeft: `3px solid ${c}` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: c, letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 6 }}>What we'd write</div>
        <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, fontWeight: 500 }}>"{after}"</div>
      </div>
    </div>
  );
}

export default function ServiceSalesMessagingPage() {
  const pillars = [
    {
      n: '01', c: PINK, h: 'The 30-second answer',
      before: 'We\'re a full-service community management company serving HOAs across the state with white-glove service and a dedicated team approach.',
      after: 'We run mid-luxury HOAs in the 200–600 door range. Boards bring us in when their last manager went silent on capital projects.',
    },
    {
      n: '02', c: YELLOW, h: 'The differentiation',
      before: 'Our people are our biggest differentiator. We have low turnover and high client satisfaction.',
      after: 'Every community gets two named operators — a manager and a backup — both of whom know your reserves study before your first meeting.',
    },
    {
      n: '03', c: GREEN, h: 'The proof',
      before: 'We\'ve been in business 18 years and manage thousands of doors across multiple states.',
      after: 'Last year we won 7 conversions from the three largest competitors in this market. Two of those boards spoke at our annual summit.',
    },
    {
      n: '04', c: BLUE, h: 'The objection answer',
      before: 'Yes, our fees are slightly higher than some competitors, but you get what you pay for in this industry.',
      after: 'We\'re priced 12–18% above the regional average. Boards switching to us reduce special assessments by an average of 23% in year two. Math is on the table at our intro meeting.',
    },
  ];

  const surfaces = [
    { i: 'phone',   c: PINK,   h: 'Cold-outbound openers',    d: 'Three opener variants per persona, each tested against industry-typical reply rates.' },
    { i: 'users',   c: YELLOW, h: 'Discovery question bank',  d: 'Eight questions that surface buying signals, ranked by which ones get incumbents fired.' },
    { i: 'shield',  c: GREEN,  h: 'Objection-response cards', d: 'The eleven objections that come up in 90% of selection meetings, with three response framings each.' },
    { i: 'compass', c: BLUE,   h: 'Selection-meeting deck',   d: '12-slide deck. Modular. Built to be presented in 25 minutes with 5 minutes of Q&A buffer.' },
    { i: 'layers',  c: PURPLE, h: 'Email + LinkedIn library', d: '12 follow-up templates and 6 LinkedIn DMs that don\'t read like sales drips.' },
    { i: 'book',    c: PINK,   h: 'Onboarding doc for BD hires', d: 'Day-one through day-90 onboarding so new hires sound like veterans by month two.' },
  ];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 80 }}>
          <div style={{ maxWidth: 920 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: GREEN, boxShadow: `0 0 0 4px ${GREEN}40` }}></span>
              <Eyebrow onDark noLine>BoardMatch™ · Sales Messaging</Eyebrow>
            </div>
            <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
              Your BD team is saying <span style={{ color: GREEN }}>five different things</span><br />about who you are.
            </h1>
            <p className="lead on-dark" style={{ marginBottom: 32, maxWidth: 720 }}>
              We rebuild the narrative — the 30-second answer, the differentiation, the proof, the objection responses. One coherent story your team tells the same way in cold calls, board meetings, and proposals. Not website copy. The actual words humans say.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
              <Button variant="primary" arrow href="/strategic-review-request">Audit how my team talks</Button>
              <Button variant="ghost" onDark href="/boardmatch/proposal-optimization">Pair with Proposal Optimization →</Button>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* THE FOUR PILLARS */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow>The four pillars</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>What we rewrite, in <span style={{ color: PINK }}>plain English.</span></h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 720, color: '#444' }}>
              Most CAM messaging fails at the same four moments. Here's what your team probably says now versus what it could say.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {pillars.map(p => <MessagePillar key={p.n} {...p} />)}
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <Eyebrow color={YELLOW}>How we get there</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Six weeks to a story your team can actually tell.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { n: 'Week 1–2', c: PINK,   h: 'Listen',     d: 'We sit in on five sales calls, three board interviews, and a portfolio walkthrough. We\'re listening for the gap between what you do and what you say.' },
              { n: 'Week 3–4', c: YELLOW, h: 'Strategize', d: 'We map your differentiation against the three competitors who keep beating you, and write the four pillars in five drafts. You react. We rewrite.' },
              { n: 'Week 5–6', c: GREEN,  h: 'Equip',      d: 'Pillars get translated into the surfaces your team uses every day — opener scripts, objection cards, the 12-slide deck. Live training to land it.' },
            ].map(p => (
              <div key={p.n} style={{ background: 'var(--alloy-off-white)', borderRadius: 12, padding: 28, border: `2px solid ${p.c}30` }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: p.c, letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 10 }}>{p.n}</div>
                <div className="display-md" style={{ fontSize: 26, color: PURPLE, marginBottom: 12 }}>{p.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SURFACES — DELIVERABLES */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark color={YELLOW}>Surfaces we write for</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>Wherever your team opens its mouth.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {surfaces.map(s => (
              <div key={s.h} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: `3px solid ${s.c}`, borderRadius: 12, padding: 24 }}>
                <Icon name={s.i} size={22} color={s.c} strokeWidth={2} />
                <div className="display-md" style={{ fontSize: 18, color: '#fff', margin: '14px 0 8px' }}>{s.h}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 32, maxWidth: 720 }}>
            <Eyebrow color={BLUE}>Pairs with</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>What this enables downstream.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { c: PINK,   h: 'Proposal Optimization', d: 'Sales messaging is the source of truth. Proposal templates inherit pillars, fee logic, and proof points.', href: '/boardmatch/proposal-optimization' },
              { c: YELLOW, h: 'Branding for CAM',       d: 'If the brand can\'t carry the new message, we fix the brand. Most of the time we don\'t have to.',          href: '/boardreach/hoa-management-branding' },
              { c: GREEN,  h: 'RFP Response',           d: 'When a strategic RFP lands, we author it using the messaging system you already paid us to build.',          href: '/boardmatch/rfp-response-system' },
            ].map(r => (
              <a key={r.h} href={r.href} style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)', borderTop: `4px solid ${r.c}`, textDecoration: 'none', display: 'block' }}>
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 10 }}>{r.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 14 }}>{r.d}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: r.c, letterSpacing: '0.10em', textTransform: 'uppercase' as const }}>Read more →</div>
              </a>
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
            <FAQItem bordered accent={PINK} q="Is this just website copywriting?"
              a="No. Website copy is one downstream surface — and not the most important one. We write the words humans say in cold calls, on first appointments, in selection meetings, and when handling objections. The website inherits the language, but the website is the smallest part of the system." />
            <FAQItem bordered accent={YELLOW} q="What if our positioning isn't actually clear yet?"
              a="Then this engagement spends more time in the Listen and Strategize phases. We'll surface the positioning ambiguity in week one — most CAM operators have three implicit positionings fighting each other. The output is a single clear story, not five clever ones." />
            <FAQItem bordered accent={GREEN} q="How is this different from a brand strategist?"
              a="Brand strategists work in customer adjectives — premium, trusted, modern. We work in the actual sentences your team will say at 11 a.m. on a Tuesday in front of a board. There's overlap, but our output is operational, not aspirational." />
            <FAQItem bordered accent={BLUE} q="Will this work if our team turns over a lot?"
              a="Better, actually. The whole point of putting the messaging in writing is so a new BD hire sounds like a veteran by month two. We build the onboarding doc with that explicitly in mind." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Most CAM companies sound the same. The ones who don't, win."
        sub="Strategic Review pulls a sales call, a proposal, and your website. We tell you in 30 minutes whether the story you're telling is the story boards are buying."
      />
    </>
  );
}
