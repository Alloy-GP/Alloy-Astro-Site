// src/components/pages/MarketingStrategyArticle.tsx — /resources/cam-marketing-strategy
// Template 5 — article. Layout + hero/TOC/aside copy from
// docs/redesign-handoff/site/resources-cam-marketing-strategy.dc.html.
// Body = the prototype's five sections merged with ALL of the pre-redesign
// article copy (the SEO asset): "Why volume fails", "The 18-month shape",
// "The two failure modes" are the live sections, interleaved by topic.
// Static — no client directive needed.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, ArrowIcon } from '~/components/rd/atoms';
import { PINK, GREEN, REACH_INK, RETAIN_INK } from '~/lib/tokens';

const TOC: Array<{ id: string; label: string }> = [
  { id: 'start-with-the-board', label: 'Start with the board, not the channel' },
  { id: 'why-volume-fails', label: 'Why volume fails' },
  { id: 'three-engines', label: 'Three engines, one plan' },
  { id: 'the-18-month-shape', label: 'The 18-month shape' },
  { id: 'the-calendar', label: 'The CAM calendar is your editorial calendar' },
  { id: 'measure-inquiries', label: 'Measure inquiries, not impressions' },
  { id: 'two-failure-modes', label: 'The two failure modes' },
  { id: 'one-firm-per-metro', label: 'Why exclusivity changes the math' },
];

const KEEP_READING = [
  { kind: 'Guide', ink: REACH_INK, accent: PINK, meta: 'Long read', title: 'The HOA management software guide.', href: '/resources/hoa-management-software-guide' },
  { kind: 'Course', ink: RETAIN_INK, accent: GREEN, meta: '10 sections', title: 'Trust building for CAM firms.', href: '/resources/courses/trust-building' },
  { kind: 'Proof', ink: REACH_INK, accent: PINK, meta: 'Case study · 12 min', title: 'How one CAM partner went from chasing RFPs to inbound boards.', href: '/results/apex-cmg' },
];

function Section({ id, title, children }: { id: string; title: ReactNode; children: ReactNode }) {
  const n = TOC.findIndex((t) => t.id === id) + 1;
  return (
    <section id={id} className="rd-article-section">
      <div className="rd-article-head" style={{ gap: 14 }}>
        <span className="rd-numeral rd-numeral--36">{String(n).padStart(2, '0')}</span>
        <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function MarketingStrategyArticle() {
  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: 'Resources', href: '/resources' }, { label: 'CAM marketing strategy', href: '/resources/cam-marketing-strategy' }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Strategy</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 5.9vw, 68px)' }}>CAM marketing strategy: <span className="rd-accent">the plan before the tactics.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>How community association management companies should think about growth before they buy a single channel.</p>
            <div className="rd-tiny rd-w-500">{TOC.length} sections · 12 min read</div>
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
            <Section id="start-with-the-board" title="Start with the board, not the channel">
              <p>Most CAM marketing plans start with tactics: we need a blog, we need LinkedIn, we need ads. Strategy starts earlier: which boards, in which metro, at which moment in their contract cycle, and what do they need to believe to choose you? Answer that and the channels pick themselves.</p>
            </Section>

            <Section id="why-volume-fails" title="Why volume fails">
              <p>If you’ve owned a CAM firm for any meaningful time, you’ve heard the same advice from a dozen agencies and consultants: do more marketing. Run more ads. Post more on LinkedIn. Send more email. The premise is that <em>volume</em> is the lever. It isn’t. <strong>System</strong> is the lever.</p>
              <p>Volume without system is a rounding error. You spend more, get marginally more leads, those leads hit the same broken proposal anatomy and the same overworked owner-operator, and your close rate stays where it was. The math doesn’t move.</p>
              <p>System is what fixes the close rate. System is what fixes the retention rate. System is what makes the marketing investment compound instead of recurring as a monthly expense.</p>
              <blockquote>“More marketing doesn’t grow CAM firms. Engineered marketing does.”</blockquote>
            </Section>

            <Section id="three-engines" title="Three engines, one plan">
              <p>Attract, close, keep. Every marketing dollar belongs to one of them, and most firms overspend on the first and ignore the third. A plan that puts a third of the effort into retention usually outperforms one that puts all of it into leads — because a kept association is a referral engine, and referrals make Attract cheaper.</p>
            </Section>

            <Section id="the-18-month-shape" title="The 18-month shape">
              <p><strong>Months 0–3: diagnostic and foundation.</strong> Audit the three engines (attract, close, keep). Identify the binding constraint. Most CAM firms find their close engine is broken before they need more leads. Fix that first.</p>
              <p><strong>Months 3–6: foundation execution.</strong> Authority content goes live. Proposal anatomy gets rebuilt. SOPs get documented. Reputation systems get installed. Nothing visible yet — and that’s the point. Foundations don’t headline.</p>
              <p><strong>Months 6–12: signal in market.</strong> Inbound starts arriving. Win rates climb on outbound. Reviews accumulate. Boards begin returning to your education library. The first compound effects show up.</p>
              <p><strong>Months 12–18: pipeline pressure.</strong> The system is producing more qualified opportunities than the firm can comfortably absorb. Hiring conversations begin from a position of demand strength, not desperation.</p>
            </Section>

            <Section id="the-calendar" title="The CAM calendar is your editorial calendar">
              <p>Budget season. Annual meetings. Insurance renewals. Contract reviews. Boards think about management in a predictable rhythm; your content, your email, and your outreach should follow it. A reserve-study guide in March lands; the same guide in August is noise.</p>
            </Section>

            <Section id="measure-inquiries" title="Measure inquiries, not impressions">
              <p>Traffic and followers are inputs. Board inquiries, proposal requests, and meetings booked are outputs. Wire attribution before you spend — forms, phone lines, calendar links — so every quarter you know what produced conversations and what produced charts.</p>
            </Section>

            <Section id="two-failure-modes" title="The two failure modes">
              <p>Most CAM growth efforts fail in one of two ways. <strong>Mode A: agency-driven volume push without system.</strong> Spend climbs, results stay flat, owner concludes “marketing doesn’t work in our industry.” <strong>Mode B: heroic owner sales effort.</strong> One person carries everything, growth is a function of their personal calendar, and the business is one missed quarter from a flat year.</p>
              <p>Engineered growth is neither. It’s the boring discipline of fixing the engine that’s actually broken, then the next one, then the next one — until growth stops requiring heroics.</p>
            </Section>

            <Section id="one-firm-per-metro" title="Why exclusivity changes the math">
              <p>An agency running the same playbook for two firms in one metro is competing with itself, and you’re paying for the draw. One firm per metro means the strategy, the intel, and the lost-deal lessons all compound in your favor. Ask whoever you’re considering whether they’d turn down your competitor. Then ask for it in writing.</p>
            </Section>
          </article>
        </div>
      </section>

      {/* Keep reading */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--24">
          <Label>Keep reading</Label>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {KEEP_READING.map((k) => (
              <a key={k.href} href={k.href} className="rd-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `5px solid ${k.accent}`, padding: '26px 26px 22px 28px' }}>
                <div className="rd-row rd-row--between">
                  <span className="rd-label rd-label--12" style={{ color: k.ink }}>{k.kind}</span>
                  <span className="rd-tiny rd-tiny--12">{k.meta}</span>
                </div>
                <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{k.title}</div>
                <span className="rd-link rd-link--12" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Read <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes tells you which engine to fix first — and whether your metro is open." />
        </div>
      </section>
    </div>
  );
}
