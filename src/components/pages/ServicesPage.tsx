// src/components/pages/ServicesPage.tsx — /services
// Template 4b — service index. Copy from docs/redesign-handoff/site/services.dc.html.
import { ENGINES } from '~/lib/nav';
import type { EngineKey } from '~/lib/nav';
import { Eyebrow, TextLink, Btn, ChevronRightIcon, Label } from '~/components/rd/atoms';

// One paragraph per engine: what it fixes, when to start there. First line of each is the
// pre-redesign /services headline; the rest is lifted from the old page's service lists
// and the "Not sure where to start?" band below.
const ENGINE_BLURB: Record<EngineKey, string> = {
  reach: 'Get found before boards start shopping. Boards check Google, the map pack, AI answers, and review sites before they call anyone. BoardReach puts your firm in those results, in your metro, with a site and brand that turn the visit into an inquiry. Start here when referrals slow and inbound is thin.',
  match: 'Turn conversations into signed contracts. You get the meetings and RFPs. Boards still pick someone else. BoardMatch rebuilds what they judge you on (proposal, RFP response, sales language) and adds a fractional BD lead when you need one. Start here when you lose at the proposal stage.',
  retain: 'Protect the portfolio you have. Retention is your cheapest growth, and the least managed. BoardRetain covers board education, newsletters, annual reports, and reputation. The work that keeps you visible between meetings. Start here when boards leave at renewal or take it out to bid.',
};

export default function ServicesPage() {
  return (
    <div className="rd-page">
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 64 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>The System · All services</Eyebrow>
            <h1 className="rd-h1 rd-h1--lg">Seventeen services. <span className="rd-accent">Three engines.</span> One partner.</h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro">Every service below is built for community association management and nothing else. Take one to fix a leak, or run all three engines as BoardSuite.</p>
            <div><TextLink href="/boardsuite" size={12}>How the engines connect</TextLink></div>
          </div>
        </div>
      </section>

      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-services-grid">
            {ENGINES.map((e, i) => (
              <div key={e.key} className="rd-services-col">
                <div className="rd-services-col-head">
                  <span className={`rd-numeral rd-numeral--36 rd-numeral--${e.key}`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <Label tone={e.key}>{e.stage}</Label>
                    <div className="rd-title-22 rd-ink">{e.title}</div>
                  </div>
                </div>
                <p className="rd-small" style={{ lineHeight: 1.65 }}>{ENGINE_BLURB[e.key]}</p>
                <div className="rd-services-list">
                  {e.services.map((s) => (
                    <a key={s.href} href={s.href}><span>{s.label}</span><ChevronRightIcon /></a>
                  ))}
                </div>
                <div className="rd-mt-auto" style={{ paddingTop: 8 }}><TextLink href={e.href} size={12}>All of {e.title}</TextLink></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap rd-grid rd-grid--2" style={{ alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">Not sure where to start?</Eyebrow>
            <h2 className="rd-h2" style={{ color: '#fff' }}>Most firms are leaking in one engine, not three.</h2>
          </div>
          <div className="rd-stack rd-stack--18">
            <p className="rd-body" style={{ color: '#fff', opacity: .85 }}>Referrals slowing means Attract. Losing at the proposal stage means Close. Boards leaving at renewal means Keep. Thirty minutes with a CAM operator tells you which, and what to fix first.</p>
            <div><Btn href="/contact" className="rd-btn--inline">Claim your market</Btn></div>
          </div>
        </div>
      </section>
    </div>
  );
}
