// src/components/pages/RiseDeepCaseStudy.tsx
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

// Asset hint - assets are served from /assets/...
const ASSET = (p: string) => '/' + p.replace(/^\//, '');

export default function RiseDeepCaseStudyPage() {
  return (
    <>
      <RiseHero />
      <RiseBeforeAfter />
      <RiseSystemMap />
      <RiseTimeline />
      <RiseEngines />
      <RiseDeliverables />
      <RiseClosingQuote />
      <RiseDisclosure />
      <CtaBand />
    </>
  );
}

function RiseHero() {
  return (
    <section className="section section-purple-deep" style={{ paddingTop: 88, paddingBottom: 72, position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <Eyebrow onDark color={YELLOW}>Signature case study · 18 months · BoardSuite Accelerate</Eyebrow>
            <h1 className="display-xl" style={{ color: '#fff', margin: '20px 0 24px', letterSpacing: '-0.025em' }}>
              How Apex CMG<sup style={{ fontSize: '0.45em', verticalAlign: 'super', opacity: 0.7 }}>*</sup> went from <span style={{ color: PINK }}>chasing RFPs</span> to <span style={{ color: YELLOW }}>boards reaching out directly.</span>
            </h1>
            <p className="lead on-dark" style={{ maxWidth: 640, marginBottom: 36 }}>
              In 2022, Apex CMG was growing organically — winning the deals their referral network put in front of them, losing the ones that needed a system. By month 18, they were turning down associations that didn't fit their portfolio.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button variant="primary" arrow href="/strategic-review-request">Build the same system</Button>
              <Button variant="secondary" onDark href="/results">All case studies</Button>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '28px 28px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>The contracted outcome</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <RiseHeroStat color={PINK} value="+535%" label="lead intake increase" />
              <RiseHeroStat color={YELLOW} value="3×" label="proposal request growth" />
              <RiseHeroStat color={GREEN} value="+1,580%" label="YoY monthly opportunities" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiseHeroStat({ color, value, label }: { color: string; value: string; label: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 38, lineHeight: 1, letterSpacing: '-0.02em', color: '#fff' }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function RiseBeforeAfter() {
  const rows = [
    { label: 'Pipeline', before: 'Sporadic RFPs from referrals. Volume tied to who-knew-who.', after: 'Steady inbound from boards searching for management. Pipeline you can model.' },
    { label: 'Search visibility', before: 'Page 2–3 for the queries boards actually run.', after: 'Top three for primary metro + cited inside AI search answers.' },
    { label: 'Authority', before: 'Capable team, but invisible outside referral circle.', after: 'Quoted in trade press. Speaking at chapter events. Boards arrive pre-sold.' },
    { label: 'Proposal process', before: 'Customized from scratch each time. Lost on price, not fit.', after: "Standardized template + discovery script. Boards see Apex CMG's thinking, not just rates." },
    { label: 'Retention', before: 'Annual churn assumed inevitable. No board feedback loop.', after: 'Onboarding + board education curriculum. Renewals are a conversation, not a re-pitch.' },
    { label: 'BD motion', before: 'Owner-led, episodic, dependent on calendar gaps.', after: 'Groundwork BD running concurrent outreach to qualified, exclusive territories.' },
  ];
  return (
    <section className="section section-white">
      <div className="container">
        <div style={{ marginBottom: 36, maxWidth: 720 }}>
          <Eyebrow>Before · after</Eyebrow>
          <h2 className="display-lg" style={{ margin: '14px 0 14px', color: PURPLE }}>Same team. Same market.<br/>Different operating system.</h2>
          <p className="lead">Nothing about Apex CMG's people changed. What changed is the system underneath them — and what that system makes possible.</p>
        </div>
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', background: 'var(--alloy-off-white)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#888' }}>Dimension</div>
            <div style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#a86a7e', borderLeft: '1px solid var(--border-subtle)' }}>Before Alloy</div>
            <div style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#3a7a6b', borderLeft: '1px solid var(--border-subtle)' }}>After</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
              <div style={{ padding: '22px 20px', fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 15 }}>{r.label}</div>
              <div style={{ padding: '22px 20px', color: '#666', fontSize: 14, lineHeight: 1.6, borderLeft: '1px solid var(--border-subtle)', background: 'rgba(217,53,110,0.025)' }}>{r.before}</div>
              <div style={{ padding: '22px 20px', color: '#333', fontSize: 14, lineHeight: 1.6, borderLeft: '1px solid var(--border-subtle)', background: 'rgba(174,215,208,0.18)' }}>{r.after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiseSystemMap() {
  return (
    <section className="section section-purple-deep">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow onDark color={YELLOW}>The mid-engagement quote</Eyebrow>
            <h2 className="display-lg on-dark" style={{ margin: '16px 0 24px', letterSpacing: '-0.02em' }}>
              "I stopped explaining what we do. The website does it. The articles do it. The boards arrive already convinced."
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, border: '2px solid var(--alloy-yellow)', flexShrink: 0, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: '0.04em' }}>MG</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 14 }}>Marcus G.</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>CEO, Apex CMG* · month 9</div>
              </div>
            </div>
          </div>
          <RiseSystemDiagram />
        </div>
      </div>
    </section>
  );
}

function RiseSystemDiagram() {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.2/1', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14, padding: 32 }}>
      <svg viewBox="0 0 600 500" width="100%" style={{ display: 'block' }} aria-label="The Apex CMG growth system: three engines feeding one revenue motion">
        <defs>
          <pattern id="riseGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="600" height="500" fill="url(#riseGrid)" />
        <g>
          <circle cx="300" cy="250" r="78" fill="#381c4f" stroke="#f5d880" strokeWidth="2" />
          <text x="300" y="240" textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" letterSpacing="0.16em" fontWeight="800" fill="#f5d880">Apex CMG</text>
          <text x="300" y="258" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="#fff">growth</text>
          <text x="300" y="274" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="#fff">operating system</text>
        </g>
        <RiseEngineNode cx={140} cy={130} color="#d9356e" label="ATTRACT" sub="Boards find Apex CMG first" />
        <RiseEngineNode cx={460} cy={130} color="#f5d880" label="AUTHORITY" sub="Pre-sold before pitch" />
        <RiseEngineNode cx={300} cy={420} color="#aed7d0" label="CLOSE & KEEP" sub="Wins → renewals" />
        <path d="M 195 165 Q 240 200 240 220" fill="none" stroke="#d9356e" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <path d="M 405 165 Q 360 200 360 220" fill="none" stroke="#f5d880" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <path d="M 300 380 L 300 330" fill="none" stroke="#aed7d0" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <RiseChannelTag x={50} y={70} label="Local SEO" color="#d9356e" />
        <RiseChannelTag x={50} y={185} label="GEO / AI search" color="#d9356e" />
        <RiseChannelTag x={500} y={70} label="Trade press" color="#f5d880" />
        <RiseChannelTag x={500} y={185} label="Speaking" color="#f5d880" />
        <RiseChannelTag x={140} y={460} label="Proposal redesign" color="#aed7d0" />
        <RiseChannelTag x={420} y={460} label="Onboarding system" color="#aed7d0" />
      </svg>
    </div>
  );
}

function RiseEngineNode({ cx, cy, color, label, sub }: { cx: number; cy: number; color: string; label: string; sub: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="56" fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth="1.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" letterSpacing="0.18em" fontWeight="800" fill={color}>{label}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fill="rgba(255,255,255,0.65)">{sub}</text>
    </g>
  );
}

function RiseChannelTag({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const w = Math.max(80, label.length * 6.5 + 20);
  return (
    <g transform={`translate(${x - w / 2}, ${y - 12})`}>
      <rect width={w} height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
      <text x={w / 2} y="16" textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)" letterSpacing="0.04em">{label}</text>
    </g>
  );
}

function RiseTimeline() {
  const phases = [
    { label: 'Months 0–3', title: 'Diagnostic & foundation', color: PINK, headline: 'Tear it down to the studs.', bullets: [
      'Full market and competitive audit — service area mapped, every competing CAM firm scored.',
      'Technical SEO rebuild: site architecture, page speed, schema markup, internal linking.',
      'Discovery process redesign: a real intake script, not a brochure.',
      'Baseline analytics + attribution wired up — so every later metric has a real before-state.',
    ]},
    { label: 'Months 3–6', title: 'Authority & visibility', color: YELLOW, headline: 'Become findable. Become quotable.', bullets: [
      'Pillar content campaign: 14 cornerstone articles answering the questions boards search.',
      'Google Business Profile rebuild + 40+ targeted local citations.',
      'GEO / AI-search optimization — Apex CMG began appearing inside ChatGPT and Perplexity answers.',
      'First trade press placements + chapter speaking slots booked.',
    ]},
    { label: 'Months 6–12', title: 'Compounding inbound', color: GREEN, headline: 'The flywheel turns.', bullets: [
      'Lead intake crossed 4× baseline. Inbound mix flipped: more boards searching, fewer cold approaches.',
      'Proposal template overhaul — discovery → diagnosis → engineered plan, not a price sheet.',
      "Groundwork BD launched on qualified, exclusive territories the inbound wasn't reaching.",
      'Quarterly business review cadence locked in — wins, losses, and what to rebuild next.',
    ]},
    { label: 'Months 12–18', title: 'Engineered, not lucky', color: BLUE, headline: 'Selectivity, not scarcity.', bullets: [
      'Lead intake landed at +535%. Proposal requests at 3×. Monthly opportunities at +1,580% YoY.',
      'Onboarding + board education curriculum live — renewals stopped being a re-pitch.',
      "Apex CMG began declining associations that weren't a portfolio fit.",
      "Operating system documented and run by Apex CMG's team — Alloy moved into strategic-partner cadence.",
    ]},
  ];
  return (
    <section className="section section-ivory">
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <Eyebrow>The 18-month build</Eyebrow>
          <h2 className="display-lg" style={{ margin: '14px 0 14px', color: PURPLE }}>Phase by phase. No shortcuts.</h2>
          <p className="lead">Engineered growth is a sequence. You can't run authority before you've built findability. You can't scale BD before you've fixed the proposal. Here's how the work actually stacked.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {phases.map((p, i) => (
            <div key={p.label} style={{ background: '#fff', borderRadius: 14, padding: '32px 32px', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 24px rgba(56,28,79,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: p.color }}></div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: p.color, lineHeight: 1, letterSpacing: '-0.02em' }}>0{i + 1}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888' }}>{p.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 17, marginTop: 2 }}>{p.title}</div>
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: PURPLE, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 18px' }}>{p.headline}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', gap: 12, color: '#444', fontSize: 14, lineHeight: 1.55 }}>
                    <span style={{ color: p.color, fontWeight: 800, flexShrink: 0, fontFamily: 'var(--font-display)' }}>·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiseEngines() {
  const engines = [
    { name: 'Attract', color: PINK, tagline: 'Boards find Apex CMG before they start shopping.', summary: 'Local SEO, GEO/AI-search, content engine, and paid media — coordinated, not stacked.', tactics: [
      { k: 'Technical SEO rebuild', v: 'Site architecture, schema, internal linking, page speed under 1.4s.' },
      { k: 'Local + GEO / AI search', v: 'Top-3 local visibility for primary metro; cited in AI search answers.' },
      { k: 'Pillar content engine', v: '14 cornerstone articles + 60+ supporting pieces across 18 months.' },
      { k: 'Paid + retargeting', v: 'Conversion-engineered Google Ads on board-stage queries; retargeting on unfit visitors deprioritized.' },
    ]},
    { name: 'Authority', color: YELLOW, tagline: 'Boards arrive pre-sold.', summary: 'Trade press, speaking, and earned media that turn a competent firm into the obvious choice.', tactics: [
      { k: 'Trade press placements', v: 'Quoted in industry publications across the engagement window.' },
      { k: 'Chapter speaking', v: 'Local CAI chapter slots — board members hearing Apex CMG in the room before reading them online.' },
      { k: 'Proprietary methodology framing', v: "Apex CMG's approach packaged into named frameworks boards can repeat." },
      { k: 'Owner thought-leadership cadence', v: 'Monthly LinkedIn + newsletter pieces from the CEO chair, not the marketing seat.' },
    ]},
    { name: 'Close', color: GREEN, tagline: 'More leads, plus a higher hit rate.', summary: 'Proposal redesign, discovery process, and Groundwork BD — so what walks in actually walks across the line.', tactics: [
      { k: 'Discovery script + diagnosis call', v: "Replaced 'send us your RFP' with a real intake — boards leave the call already engaged." },
      { k: 'Proposal template rebuild', v: "Apex CMG's thinking, the engineered plan, the people. Not a rate card." },
      { k: 'Groundwork BD outreach', v: "Targeted, market-exclusive territory outreach concurrent with inbound — net-new pipeline that wasn't searching yet." },
      { k: 'Lost-deal post-mortems', v: "Every loss reviewed; pattern-matched into the next quarter's playbook." },
    ]},
    { name: 'Keep', color: BLUE, tagline: "Renewals that aren't re-pitches.", summary: 'Onboarding, board education, and feedback loops that turn a year-one client into a five-year reference.', tactics: [
      { k: 'First-90-days onboarding system', v: "Documented sequence — boards know what's happening when, no surprises." },
      { k: 'Board education curriculum', v: 'Quarterly sessions on governance, vendor management, reserves — boards get smarter; Apex CMG gets credit.' },
      { k: 'Satisfaction + signal monitoring', v: 'Quarterly board pulse + early-warning indicators on accounts at risk.' },
      { k: 'Reference & referral motion', v: 'Happy boards talk to other boards — engineered, not assumed.' },
    ]},
  ];
  return (
    <section className="section section-white">
      <div className="container">
        <div style={{ marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow>What we built, by engine</Eyebrow>
          <h2 className="display-lg" style={{ margin: '14px 0 14px', color: PURPLE }}>Four engines. One system. Connected on purpose.</h2>
          <p className="lead">Each engine has its own playbook. The point isn't running them in parallel — it's running them so they compound.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {engines.map(e => (
            <div key={e.name} style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(56,28,79,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>
                <div style={{ padding: '32px 32px', background: 'var(--alloy-off-white)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ width: 36, height: 4, background: e.color, borderRadius: 2, marginBottom: 14 }}></div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800, color: '#888', marginBottom: 8 }}>Engine</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, color: PURPLE, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{e.name}</h3>
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.55, margin: '0 0 12px', fontStyle: 'italic' }}>{e.tagline}</p>
                  <p style={{ color: '#444', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{e.summary}</p>
                </div>
                <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  {e.tactics.map(t => (
                    <div key={t.k} style={{ borderTop: `2px solid ${e.color}`, paddingTop: 12 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE, marginBottom: 6 }}>{t.k}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.55 }}>{t.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiseDeliverables() {
  const categories = [
    { color: PINK, name: 'Content & SEO', items: ['14 cornerstone pillar articles', '60+ supporting articles & FAQs', 'Full technical SEO rebuild', 'Schema markup across the site', 'Google Business Profile + 40+ citations', 'AI-search optimization (GEO)'] },
    { color: YELLOW, name: 'Authority & PR', items: ['Trade press placement strategy', 'Chapter speaking calendar', 'CEO thought-leadership cadence', 'Newsletter program', 'Earned-media follow-up system'] },
    { color: GREEN, name: 'Conversion & BD', items: ['Discovery / diagnosis script', 'Proposal template rebuild', 'Lost-deal review cadence', 'Groundwork BD outreach', 'CRM + attribution wiring'] },
    { color: BLUE, name: 'Retention', items: ['First-90-days onboarding system', 'Board education curriculum', 'Quarterly satisfaction pulse', 'Reference & referral motion'] },
  ];
  return (
    <section className="section section-mint">
      <div className="container">
        <div style={{ marginBottom: 40, maxWidth: 720 }}>
          <Eyebrow color="#3a7a6b">What got built</Eyebrow>
          <h2 className="display-lg" style={{ margin: '14px 0 14px', color: PURPLE }}>The artifacts behind the numbers.</h2>
          <p className="lead">Engineered growth leaves a trail. Here's the inventory of systems, content, and processes Apex CMG now owns and operates.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {categories.map(c => (
            <div key={c.name} style={{ background: '#fff', borderRadius: 12, padding: '24px 22px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: c.color }}></div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>{c.name}</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map(item => (
                  <li key={item} style={{ fontSize: 13.5, color: '#444', lineHeight: 1.5, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: 8, width: 6, height: 1, background: c.color }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RiseClosingQuote() {
  return (
    <section className="section section-white">
      <div className="container-narrow">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <Eyebrow noLine>Where they are now</Eyebrow>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, color: PURPLE, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '20px 0 24px' }}>
            "We don't think about lead flow anymore. We think about which boards we want to take on next year. That's a completely different problem to have."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, border: '2px solid var(--alloy-pink)', flexShrink: 0, background: 'var(--alloy-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: '0.04em' }}>MG</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>Marcus G.</div>
              <div style={{ fontSize: 12, color: '#888' }}>CEO, Apex CMG* · post-engagement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiseDisclosure() {
  return (
    <section className="section section-ivory" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-narrow">
        <div style={{ background: PURPLE, color: '#fff', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <Eyebrow onDark noLine>The honest disclosure</Eyebrow>
          <p className="lead on-dark" style={{ margin: '16px auto 0', maxWidth: 720 }}>Apex CMG's results are real, contracted, and measured against their pre-engagement baseline. They are also one firm, in one market, with the discipline to execute the system month after month. Your starting point and execution pace will produce different numbers. We'll model honest expectations during your diagnostic.</p>
        </div>
        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>
          * Client name and identifying details changed to protect confidentiality. Results are real and on file.
        </p>
      </div>
    </section>
  );
}
