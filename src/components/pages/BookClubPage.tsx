// src/components/pages/BookClubPage.tsx — /book-club
// HOA Leader Book Club signup page in the site's rd-* system: editorial hero with the form card on the right
// (the /contact layout), textured off-white three-up, purple band with three fact cards, steps, host
// section, CTA bar. Copy is the client's book club block + "Where is this going next?" card from the Growth
// Engine handoff (cai-growth.html, 2026-10-08); nothing claimed beyond it. The form island
// (modules/BookClubForm.tsx) arrives as `children` from the route.
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow, H1, HeroCtas, SectionHead, Steps, CtaBar, Label, Btn } from '~/components/rd/atoms';

const CALENDAR_URL = 'https://calendar.app.google/ssQ22vSCJC38Cy8QA';
const LH: CSSProperties = { lineHeight: 1.65 };

const PERKS = [
  { title: 'One idea, worked for our industry.', body: 'Not a summary. What it changes at a management company.' },
  { title: 'An AI tool every session.', body: 'Like the Growth Engine walk-through from the retreat. Run your firm through it and leave with your version.' },
  { title: 'Your people.', body: 'Owners and leaders who know the work, so every example lands.' },
];

const PROOF = [
  { value: '$199', unit: 'a month', note: 'The value of a seat. Included.' },
  { value: '1', unit: 'hour', note: 'Per session. Nothing to read, nothing to prep.' },
  { value: '3', unit: 'things', note: 'Every session: one idea, one AI tool, your people.' },
];

const STEPS = [
  { title: 'Save your seat', body: 'Your name, your company, and the senior leaders you want in the room. It takes a minute.' },
  { title: 'Cameron emails the details', body: 'You and every leader you added get the when and the where.' },
  { title: 'Show up for an hour', body: 'One idea, one AI tool, people who know the work. Nothing to read, nothing to prep.' },
];

export default function BookClubPage({ children }: { children?: ReactNode }) {
  return (
    <div>
      {/* Hero: copy + CTAs left, the seats form card right (the /contact composition) */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 88 }}>
        <div className="rd-wrap rd-grid rd-grid--hero" style={{ alignItems: 'start' }}>
          <div className="rd-stack rd-stack--32">
            <Eyebrow>HOA Leader Book Club · From Alloy</Eyebrow>
            <H1 accent="run management companies.">One hour with people who</H1>
            <p className="rd-intro rd-intro--19">
              Nothing to read, nothing to prep. One idea worked for our industry, an AI tool to run your firm through, and a room of owners and leaders who know the work.
            </p>
            <HeroCtas primary={{ label: 'Save your seat', href: '#seats' }} secondary={{ label: 'Book 20 minutes with Cameron', href: CALENDAR_URL }} />
            <div className="rd-row rd-row--wrap" style={{ gap: 10 }}>
              <span className="rd-tag">$199 a month value · included</span>
              <span className="rd-tag">Seats for your senior leaders · included</span>
            </div>
          </div>
          <div id="seats" className="rd-card rd-card--off contact-form-card rd-stack" style={{ padding: 36, gap: 22, scrollMarginTop: 130 }}>
            {children}
          </div>
        </div>
      </section>

      {/* Three things, every session */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <SectionHead eyebrow="Every session" h2="Three things," accent="every time." />
          <div className="rd-threeup" data-reveal data-rise>
            {PERKS.map((p, i) => (
              <div key={p.title} className="rd-stack" style={{ gap: 14 }}>
                <span className="rd-numeral">{String(i + 1).padStart(2, '0')}</span>
                <span className="rd-title-26 rd-ink" style={{ fontWeight: 700 }}>{p.title}</span>
                <span className="rd-small" style={{ lineHeight: 1.55, display: 'block' }}>{p.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purple band: bring your leaders + proof tiles */}
      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--2" style={{ alignItems: 'center', gap: 64 }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">Included with your seat</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm" style={{ color: '#fff' }}>Bring the leaders you are developing.</h2>
            <p className="rd-body" style={{ color: 'var(--alloy-on-purple)' }}>
              Your seat is included because you were at the retreat. So are seats for the senior leaders you are developing. Add them when you save your seat and Cameron emails everyone the details.
            </p>
            <div><Btn href="#seats" variant="yellow" className="rd-btn--inline">Save your seat</Btn></div>
          </div>
          {/* Three facts as translucent cards (client: no yellow rules, a little smaller) */}
          <div data-reveal data-rise className="rd-grid rd-grid--3" style={{ gap: 14 }}>
            {PROOF.map((s) => (
              <div key={s.unit} className="rd-inset rd-stack" style={{ gap: 10, padding: '22px 20px' }}>
                <div className="rd-stat-num rd-stat-num--unit" style={{ fontSize: 36 }}>
                  {s.value}<span className="rd-stat-unit rd-accent--yellow" style={{ display: 'block', fontSize: 24, marginTop: 2 }}>{s.unit}</span>
                </div>
                <div className="rd-stat-note" style={{ fontSize: 13, lineHeight: 1.45 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rd-section">
        <div className="rd-wrap rd-stack rd-stack--40">
          <SectionHead eyebrow="How it works" h2="Save your seat," accent="then show up." />
          <Steps steps={STEPS} />
        </div>
      </section>

      {/* Host */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack" style={{ gap: 14 }}>
            <img src="/assets/team/cameron-lange.jpg" alt="Cameron Lange, headshot" width={240} height={240} loading="lazy" decoding="async"
              style={{ width: '100%', maxWidth: 240, height: 'auto', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 10, display: 'block', background: 'var(--alloy-light-gray)' }} />
            <div>
              <div className="rd-title-18">Cameron Lange</div>
              <Label>Alloy Growth Partners</Label>
            </div>
          </div>
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Your host</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Where is this going next?</h2>
            <p className="rd-body" style={LH}>
              I keep time open for conversations with owners and executives about where their firm is headed. Growth goals, the number you are chasing, the constraint that keeps showing up, whatever you are weighing. No pitch and no deck, just the conversation.
            </p>
            <p className="rd-body" style={LH}>
              We work with community association management companies on the growth side of the business: who you go after, how the pipeline runs, and whether the doors you win stay. The bar we hold ourselves to is doubling your bottom line in three years.
            </p>
            <div><Btn href={CALENDAR_URL} variant="outline" className="rd-btn--inline">Book 20 minutes</Btn></div>
          </div>
        </div>
      </section>

      {/* Closing CTA (no link to the Growth Engine tool: gated resource, client 2026-10-08) */}
      <section className="rd-section rd-section--tight">
        <div className="rd-wrap rd-stack rd-stack--24">
          <CtaBar text="Seats for your senior leaders are included. Save yours." label="Save your seat" href="#seats" />
        </div>
      </section>
    </div>
  );
}
