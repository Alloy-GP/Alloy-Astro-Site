// src/components/pages/RiseDeepCaseStudy.tsx — /results/apex-cmg
// (Filename kept from the pre-rename "RISE AMG" study; also rendered by the
// legacy /results/rise-amg route.)
//
// Template 5 — article / case study. Hero, 4-stat strip, the four prose
// blocks and the CTA copy come from docs/redesign-handoff/site/results-apex-cmg.dc.html.
// The prototype set those four blocks as .9fr/1.3fr prose rows; they are
// presented here in the article template (sticky TOC + 720px column) so ALL
// of the pre-redesign case-study copy — before/after table, system map,
// 18-month build, engines, deliverables, both quotes, disclosure — fits the
// same page as numbered, id'd sections. Static — no client directive needed.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, StatNumber } from '~/components/rd/atoms';
import { PINK, YELLOW, BLUE, GREEN, REACH_INK, MATCH_INK, RETAIN_INK } from '~/lib/tokens';

// ---------------------------------------------------------------------------
// Content (carried over verbatim from the pre-redesign case study)
// ---------------------------------------------------------------------------
const BEFORE_AFTER = [
  { label: 'Pipeline', before: 'Sporadic RFPs from referrals. Volume tied to who-knew-who.', after: 'Steady inbound from boards searching for management. Pipeline you can model.' },
  { label: 'Search visibility', before: 'Page 2–3 for the queries boards actually run.', after: 'Top three for primary metro + cited inside AI search answers.' },
  { label: 'Authority', before: 'Capable team, but invisible outside referral circle.', after: 'Quoted in trade press. Speaking at chapter events. Boards arrive pre-sold.' },
  { label: 'Proposal process', before: 'Customized from scratch each time. Lost on price, not fit.', after: "Standardized template + discovery script. Boards see Apex CMG's thinking, not just rates." },
  { label: 'Retention', before: 'Annual churn assumed inevitable. No board feedback loop.', after: 'Onboarding + board education curriculum. Renewals are a conversation, not a re-pitch.' },
  { label: 'BD motion', before: 'Owner-led, episodic, dependent on calendar gaps.', after: 'Groundwork BD running concurrent outreach to qualified, exclusive territories.' },
];

const PHASES = [
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

const ENGINE_BLOCKS = [
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

const DELIVERABLES = [
  { color: PINK, name: 'Content & SEO', items: ['14 cornerstone pillar articles', '60+ supporting articles & FAQs', 'Full technical SEO rebuild', 'Schema markup across the site', 'Google Business Profile + 40+ citations', 'AI-search optimization (GEO)'] },
  { color: YELLOW, name: 'Authority & PR', items: ['Trade press placement strategy', 'Chapter speaking calendar', 'CEO thought-leadership cadence', 'Newsletter program', 'Earned-media follow-up system'] },
  { color: GREEN, name: 'Conversion & BD', items: ['Discovery / diagnosis script', 'Proposal template rebuild', 'Lost-deal review cadence', 'Groundwork BD outreach', 'CRM + attribution wiring'] },
  { color: BLUE, name: 'Retention', items: ['First-90-days onboarding system', 'Board education curriculum', 'Quarterly satisfaction pulse', 'Reference & referral motion'] },
];

// Left-rule colors per the prototype (pink / yellow / blue / green). There is
// no rd-proof-item--blue variant, so the blue rule is set inline.
const STATS: Array<{ value: number; suffix: string; note: string; rule: string; ruleColor?: string }> = [
  { value: 535, suffix: '%', note: 'lead intake vs. baseline', rule: 'rd-proof-item--pink' },
  { value: 3, suffix: '×', note: 'proposal requests', rule: 'rd-proof-item--yellow' },
  { value: 1580, suffix: '%', note: 'YoY opportunities', rule: 'rd-proof-item--purple', ruleColor: 'var(--alloy-blue)' },
  { value: 40, suffix: '–60%', note: 'qualified to closed', rule: 'rd-proof-item--green' },
];

// Readable-on-white ink for the phase accent colors. #4a86ad = the prototype's
// blue label ink (not yet a token).
const INK: Record<string, string> = { [PINK]: REACH_INK, [YELLOW]: MATCH_INK, [GREEN]: RETAIN_INK, [BLUE]: '#4a86ad' };

const TOC: Array<{ id: string; label: string }> = [
  { id: 'the-situation', label: 'The situation' },
  { id: 'before-after', label: 'Before · after' },
  { id: 'what-we-built', label: 'What we built' },
  { id: 'the-18-month-build', label: 'The 18-month build' },
  { id: 'by-engine', label: 'What we built, by engine' },
  { id: 'what-got-built', label: 'What got built' },
  { id: 'what-changed', label: 'What changed' },
  { id: 'where-they-are-now', label: 'Where they are now' },
  { id: 'what-wed-tell-another-firm', label: 'What we’d tell another firm' },
  { id: 'disclosure', label: 'The honest disclosure' },
];

// ---------------------------------------------------------------------------
// Local building blocks
// ---------------------------------------------------------------------------
function Section({ id, label, title, children }: { id: string; label?: string; title: ReactNode; children: ReactNode }) {
  const n = TOC.findIndex((t) => t.id === id) + 1;
  return (
    <section id={id} className="rd-article-section">
      {label ? <Label>{label}</Label> : null}
      <div className="rd-article-head" style={{ gap: 14 }}>
        <span className="rd-numeral rd-numeral--36">{String(n).padStart(2, '0')}</span>
        <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <div className="rd-row" style={{ gap: 14 }}>
      <div aria-hidden="true" style={{ width: 48, height: 48, borderRadius: 999, flex: 'none', background: 'var(--alloy-purple)', border: '2px solid var(--alloy-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, letterSpacing: '.04em' }}>MG</div>
      <div>
        <div className="rd-title-15">{name}</div>
        <div className="rd-tiny rd-tiny--12">{role}</div>
      </div>
    </div>
  );
}

function SystemDiagram() {
  return (
    <div className="rd-bg-purple" style={{ borderRadius: 10, padding: 24 }}>
      <svg viewBox="0 0 600 500" width="100%" style={{ display: 'block' }} role="img" aria-label="The Apex CMG growth system: three engines feeding one revenue motion">
        <defs>
          <pattern id="apexGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="500" fill="url(#apexGrid)" />
        <g>
          <circle cx="300" cy="250" r="78" fill="#381c4f" stroke="#f5d880" strokeWidth="2" />
          <text x="300" y="240" textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" letterSpacing="0.16em" fontWeight="800" fill="#f5d880">Apex CMG</text>
          <text x="300" y="258" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="#fff">growth</text>
          <text x="300" y="274" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="#fff">operating system</text>
        </g>
        <EngineNode cx={140} cy={130} color="#d9356e" label="ATTRACT" sub="Boards find Apex CMG first" />
        <EngineNode cx={460} cy={130} color="#f5d880" label="AUTHORITY" sub="Pre-sold before pitch" />
        <EngineNode cx={300} cy={420} color="#aed7d0" label="CLOSE & KEEP" sub="Wins → renewals" />
        <path d="M 195 165 Q 240 200 240 220" fill="none" stroke="#d9356e" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <path d="M 405 165 Q 360 200 360 220" fill="none" stroke="#f5d880" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <path d="M 300 380 L 300 330" fill="none" stroke="#aed7d0" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        <ChannelTag x={50} y={70} label="Local SEO" color="#d9356e" />
        <ChannelTag x={50} y={185} label="GEO / AI search" color="#d9356e" />
        <ChannelTag x={500} y={70} label="Trade press" color="#f5d880" />
        <ChannelTag x={500} y={185} label="Speaking" color="#f5d880" />
        <ChannelTag x={140} y={460} label="Proposal redesign" color="#aed7d0" />
        <ChannelTag x={420} y={460} label="Onboarding system" color="#aed7d0" />
      </svg>
    </div>
  );
}

function EngineNode({ cx, cy, color, label, sub }: { cx: number; cy: number; color: string; label: string; sub: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="56" fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth="1.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" letterSpacing="0.18em" fontWeight="800" fill={color}>{label}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fill="rgba(255,255,255,0.65)">{sub}</text>
    </g>
  );
}

function ChannelTag({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const w = Math.max(80, label.length * 6.5 + 20);
  return (
    <g transform={`translate(${x - w / 2}, ${y - 12})`}>
      <rect width={w} height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
      <text x={w / 2} y="16" textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)" letterSpacing="0.04em">{label}</text>
    </g>
  );
}

function Dot({ color, top = 7 }: { color: string; top?: number }) {
  return <span aria-hidden="true" className="rd-dot rd-dot--8" style={{ background: color, marginTop: top }} />;
}

export default function RiseDeepCaseStudy() {
  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: 'Results', href: '/results' }, { label: 'Case study', href: '/results/apex-cmg' }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Case study · 3-year engagement</Eyebrow>
            <h1 className="rd-h1">From chasing RFPs to <span className="rd-accent">inbound boards.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>A regional CAM firm, referral-dependent and RFP-chasing, eighteen months into a full BoardSuite engagement. Firm name withheld at the partner’s request; the numbers are theirs.</p>
            <div className="rd-tiny rd-w-500">12 min read · Updated quarterly</div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div data-reveal data-rise className="rd-grid rd-grid--4 rd-rule-top" style={{ gap: 28, paddingTop: 40 }}>
            {STATS.map((s) => (
              <div key={s.note} className={`rd-proof-item ${s.rule}`} style={s.ruleColor ? { borderLeftColor: s.ruleColor } : undefined}>
                <StatNumber stat={{ value: s.value, suffix: s.suffix, note: s.note }} />
                <div className="rd-tiny" style={{ marginTop: 8 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap rd-grid rd-grid--article rd-gap-80">
          <aside className="rd-toc">
            <nav className="rd-stack" aria-label="On this page" style={{ gap: 13 }}>
              <Label>On this page</Label>
              <div className="rd-toc-list" style={{ borderTop: 0 }}>
                {TOC.map((t) => <a key={t.id} href={`#${t.id}`}>{t.label}</a>)}
              </div>
            </nav>
            <div className="rd-bg-purple rd-ink-white rd-stack" style={{ borderRadius: 10, padding: 22, gap: 12, marginTop: 6 }}>
              <div className="rd-title-16">Want this done for your firm?</div>
              <p className="rd-tiny rd-muted-80">Thirty minutes with a CAM operator. Written 90-day plan, yours to keep.</p>
              <Btn href="/get-started" size="xs">Claim your market</Btn>
            </div>
          </aside>

          <article className="rd-article" style={{ minWidth: 0 }}>
            <Section id="the-situation" title="The situation">
              <p>Roughly 90 associations, growth flat for three years, every new contract from a referral or an RFP the firm found late. No attribution, a website built for owner logins, a proposal that read like every competitor’s.</p>
            </Section>

            <Section id="before-after" label="Before · after" title="Same team. Same market. Different operating system.">
              <p>Nothing about Apex CMG’s people changed. What changed is the system underneath them — and what that system makes possible.</p>
              <div className="rd-table-wrap" style={{ border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                <table className="rd-table" style={{ fontSize: 14 }}>
                  <colgroup><col style={{ width: '22%' }} /><col /><col /></colgroup>
                  <thead>
                    <tr style={{ background: 'var(--alloy-off-white)' }}>
                      <th scope="col" style={{ fontSize: 11 }}>Dimension</th>
                      <th scope="col" style={{ fontSize: 11, color: REACH_INK }}>Before Alloy</th>
                      <th scope="col" style={{ fontSize: 11, color: RETAIN_INK }}>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BEFORE_AFTER.map((r) => (
                      <tr key={r.label}>
                        <td style={{ fontWeight: 700 }}>{r.label}</td>
                        <td className="rd-td-muted" style={{ background: 'rgba(217,53,110,0.025)', lineHeight: 1.6 }}>{r.before}</td>
                        <td style={{ background: 'rgba(174,215,208,0.18)', lineHeight: 1.6 }}>{r.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="what-we-built" title="What we built">
              <p>Year one: technical SEO and AI-search rebuild, Google Business Profile system, fourteen pillar articles, and the website rebuilt for boards. Year two: proposal redesign, sales messaging, and Groundwork fractional BD. Year three: board education curriculum and newsletter production to lock in renewals.</p>
              <SystemDiagram />
            </Section>

            <Section id="the-18-month-build" label="The 18-month build" title="Phase by phase. No shortcuts.">
              <p>Engineered growth is a sequence. You can’t run authority before you’ve built findability. You can’t scale BD before you’ve fixed the proposal. Here’s how the work actually stacked.</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {PHASES.map((p, i) => (
                  <div key={p.label} className="rd-card rd-card--pad-sm rd-stack rd-stack--14" style={{ borderTop: `4px solid ${p.color}` }}>
                    <div className="rd-row" style={{ alignItems: 'baseline', gap: 12 }}>
                      <span className="rd-numeral" style={{ fontSize: 28, color: INK[p.color] }}>0{i + 1}</span>
                      <div>
                        <div className="rd-label">{p.label}</div>
                        <div className="rd-title-15">{p.title}</div>
                      </div>
                    </div>
                    <h3 className="rd-h4">{p.headline}</h3>
                    <div className="rd-stack rd-stack--10">
                      {p.bullets.map((b) => (
                        <div key={b} className="rd-row" style={{ alignItems: 'flex-start', gap: 10 }}>
                          <Dot color={p.color} />
                          <span className="rd-small rd-small--14">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="by-engine" label="What we built, by engine" title="Four engines. One system. Connected on purpose.">
              <p>Each engine has its own playbook. The point isn’t running them in parallel — it’s running them so they compound.</p>
              <div className="rd-stack" style={{ gap: 16 }}>
                {ENGINE_BLOCKS.map((e) => (
                  <div key={e.name} className="rd-card rd-card--pad rd-stack rd-stack--18">
                    <div className="rd-stack rd-stack--6">
                      <div aria-hidden="true" style={{ width: 36, height: 4, background: e.color, borderRadius: 2, marginBottom: 8 }} />
                      <span className="rd-label">Engine</span>
                      <h3 className="rd-h3">{e.name}</h3>
                      <div className="rd-small" style={{ fontStyle: 'italic' }}>{e.tagline}</div>
                      <div className="rd-small rd-small--14">{e.summary}</div>
                    </div>
                    <div className="rd-grid rd-grid--2" style={{ gap: 18 }}>
                      {e.tactics.map((t) => (
                        <div key={t.k} className="rd-stack rd-stack--6" style={{ borderTop: `2px solid ${e.color}`, paddingTop: 12 }}>
                          <div className="rd-title-15">{t.k}</div>
                          <div className="rd-tiny">{t.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="what-got-built" label="What got built" title="The artifacts behind the numbers.">
              <p>Engineered growth leaves a trail. Here’s the inventory of systems, content, and processes Apex CMG now owns and operates.</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {DELIVERABLES.map((c) => (
                  <div key={c.name} className="rd-card rd-card--pad-sm rd-stack rd-stack--14">
                    <div className="rd-row" style={{ gap: 10 }}>
                      <Dot color={c.color} top={0} />
                      <span className="rd-label rd-label--12 rd-label--purple">{c.name}</span>
                    </div>
                    <div className="rd-stack rd-stack--10">
                      {c.items.map((item) => (
                        <div key={item} className="rd-row" style={{ alignItems: 'flex-start', gap: 10 }}>
                          <span aria-hidden="true" style={{ flex: 'none', width: 8, height: 2, background: c.color, marginTop: 9 }} />
                          <span className="rd-small rd-small--14">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="what-changed" title="What changed">
              <p>Lead intake up 535% against the pre-engagement baseline. Proposal requests tripled. Boards began contacting the firm directly, before an RFP — the firm’s words: “We went from chasing RFPs to having boards reach out directly.”</p>
              <Label>The mid-engagement quote</Label>
              <blockquote>“I stopped explaining what we do. The website does it. The articles do it. The boards arrive already convinced.”</blockquote>
              <Attribution name="Marcus G." role="CEO, Apex CMG* · month 9" />
            </Section>

            <Section id="where-they-are-now" title="Where they are now">
              <blockquote style={{ fontSize: 24, lineHeight: 1.35, fontWeight: 700 }}>“We don’t think about lead flow anymore. We think about which boards we want to take on next year. That’s a completely different problem to have.”</blockquote>
              <Attribution name="Marcus G." role="CEO, Apex CMG* · post-engagement" />
            </Section>

            <Section id="what-wed-tell-another-firm" title="What we’d tell another firm">
              <p>Attribution first, or you won’t know what worked. The website is a board tool, not an owner tool. And retention work in year three is what made years one and two stick.</p>
            </Section>

            <Section id="disclosure" title="The honest disclosure">
              <div className="rd-bg-purple" style={{ borderRadius: 10, padding: 32 }}>
                <p style={{ color: '#fff', opacity: 0.9 }}>Apex CMG’s results are real, contracted, and measured against their pre-engagement baseline. They are also one firm, in one market, with the discipline to execute the system month after month. Your starting point and execution pace will produce different numbers. We’ll model honest expectations during your diagnostic.</p>
              </div>
              <div className="rd-tiny rd-tiny--12">* Client name and identifying details changed to protect confidentiality. Results are real and on file.</div>
            </Section>
          </article>
        </div>
      </section>

      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes tells you which engine to fix first — and whether your metro is still open." />
        </div>
      </section>
    </div>
  );
}
