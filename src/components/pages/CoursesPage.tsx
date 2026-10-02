// src/components/pages/CoursesPage.tsx — /resources/courses
// Template 4 (resources index). Copy from docs/redesign-handoff/site/resources-courses.dc.html.
// Static — no client directive. The only live course is the single-page
// trust-building guide; no links to the retired /courses/* lesson routes.
//
// Below the catalog: "How the courses work", "Why this course" + objectives, and the
// curriculum — restored from the pre-redesign page and the course's own lesson data.
import { Eyebrow, Label, LinkLabel, ArrowIcon, Btn, Checklist } from '~/components/rd/atoms';

const COURSE_URL = '/resources/courses/trust-building';

const HOW_IT_WORKS = [
  { title: 'Self-paced', body: 'One page per course. Read it in one sitting or jump to the section you need — every section has its own link.' },
  { title: 'Free', body: 'No login, no email. The trust-building course ends with five quick questions you score yourself.' },
  { title: 'Built for operators', body: 'Written for CAM owners and operators who don’t have an afternoon to spare. Each course runs 30–90 minutes and comes from the frameworks we use inside paid engagements.' },
];

const OBJECTIVES = [
  'Define reviews, testimonials, and case studies in CAM terms',
  'Explain why boards weigh each signal differently',
  'Read your reviews the way a board does — recency, volume, balance, responses',
  'Spot the difference between forgettable praise and a testimonial that moves a board',
  'Structure a case study around challenge, solution, and results',
  'Place each signal where boards look during a decision',
];

// Section ids + titles match CourseTrustBuildingPage (TITLES / TOC); modules follow
// moduleLabel in ~/data/courseTrustBuilding. Summaries condensed from each lesson's meta.
const MODULES: Array<{ label: string; summary: string; sections: Array<{ id: string; title: string }> }> = [
  { label: 'Module 1 · Introduction', summary: 'What trust signals are, and why fiduciary duty, high stakes, and personal stake make boards lean on proof.', sections: [
    { id: 'intro', title: 'Intro to trust-building' },
    { id: 'why-trust-signals-matter', title: 'Why trust signals matter to HOA boards' },
  ] },
  { label: 'Module 2 · Reviews', summary: 'Reviews are the first signal boards see. Homeowner and board member reviews both count, and not every review carries the same weight.', sections: [
    { id: 'what-reviews-are', title: 'What reviews are — and why they carry weight' },
    { id: 'reviews-extra-factors', title: 'Reviews: extra factors that influence impact' },
  ] },
  { label: 'Module 3 · Testimonials', summary: 'Testimonials are curated board voices, more targeted than reviews. Specificity, authenticity, format, and placement decide whether one lands.', sections: [
    { id: 'what-testimonials-are', title: 'What testimonials are — and why they stand out' },
    { id: 'testimonials-extra-factors', title: 'Testimonials: extra factors that influence impact' },
  ] },
  { label: 'Module 4 · Case studies', summary: 'Case studies tell the full story. That depth matters most when a board is making the final, high-stakes call.', sections: [
    { id: 'what-case-studies-are', title: 'What case studies are — and why they convince' },
    { id: 'case-studies-extra-factors', title: 'Case studies: extra factors that influence impact' },
  ] },
  { label: 'Module 5 · Wrap-up', summary: 'How the three signals work together, where to place them, and the steps to a trust system that stays current.', sections: [
    { id: 'recapping-trust-signals', title: 'Recapping the three trust signals' },
    { id: 'from-proof-to-persuasion', title: 'From proof to persuasion: using trust signals effectively' },
    { id: 'knowledge-check', title: 'Knowledge check' },
  ] },
];

export default function CoursesPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Courses</Eyebrow>
            <h1 className="rd-h1">Short courses for <span className="rd-accent">boards and CAM teams.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>Self-paced, free, and written by operators. Take them yourself, or hand them to the boards you manage.</p>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--hero-wide rd-gap-20 rd-rule-top" style={{ paddingTop: 48 }}>
            <a href="/resources/courses/trust-building" className="rd-tile rd-ink-white" style={{ padding: 40, gap: 18, minHeight: 300 }}>
              <Label tone="yellow" size={12}>Course · 10 sections</Label>
              <div className="rd-h2 rd-h2--sm">Trust building for CAM firms.</div>
              <p className="rd-body rd-body--16 rd-muted-85" style={{ maxWidth: 520 }}>Reviews, testimonials, and case studies — how boards weigh them, and how to build a system that keeps them current.</p>
              <span className="rd-link rd-link--12 rd-link--white" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Start the course <ArrowIcon /></span>
            </a>
            <div className="rd-stack rd-gap-20">
              <div className="rd-card rd-card--off rd-stack rd-stack--10" style={{ padding: 26 }}>
                <Label size={12}>Coming next</Label>
                <div className="rd-h4">New board member orientation</div>
                <p className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>The first 90 days on an HOA board — for the volunteers you manage.</p>
              </div>
              <a href="/boardretain/board-education" className="rd-card rd-card--off rd-card-link rd-stack--10" style={{ padding: 26 }}>
                <Label size={12}>For your firm</Label>
                <div className="rd-h4">Branded board education</div>
                <p className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>Courses like these, in your name, for the boards you manage.</p>
                <div><LinkLabel>Board Education Programs</LinkLabel></div>
              </a>
            </div>
          </div>

          {/* How the courses work */}
          <div className="rd-stack rd-stack--32" style={{ marginTop: 80 }}>
            <div className="rd-stack rd-stack--18">
              <Eyebrow tone="purple">How the courses work</Eyebrow>
              <h2 className="rd-h2 rd-h2--sm">An hour now. <span className="rd-accent">Months of compounding later.</span></h2>
            </div>
            <div className="rd-threeup">
              {HOW_IT_WORKS.map((h) => (
                <div key={h.title}>
                  <h3 className="rd-h4">{h.title}</h3>
                  <p className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>{h.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why this course + objectives */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Why this course</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Boards pick the safe, proven choice.</h2>
          </div>
          <div className="rd-stack rd-stack--24">
            <p className="rd-body" style={{ lineHeight: 1.65 }}>A board hands its management firm the community’s finances, property values, and peace of mind. Before it does, members look for proof. Reviews, testimonials, and case studies are the three signals you can generate yourself, through the boards and homeowners you already serve. They speak in the customer’s voice, and they often tip the scales when a board is comparing firms.</p>
            <p className="rd-body" style={{ lineHeight: 1.65 }}>Without them, even a strong proposal or a polished website feels incomplete. This course covers what each signal is, why boards read them differently, and where each one belongs in your marketing and sales process.</p>
            <div className="rd-stack rd-stack--10 rd-rule-top" style={{ paddingTop: 28 }}>
              <Label>When you finish, you can</Label>
              <Checklist items={OBJECTIVES} />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Curriculum</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Ten sections and a knowledge check.</h2>
            <p className="rd-body" style={{ lineHeight: 1.65 }}>Five modules on one page, about 45 minutes end to end. Start at the top, or open the section you need.</p>
            <div><Btn href={COURSE_URL} className="rd-btn--inline">Start the course</Btn></div>
          </div>
          <div className="rd-stack rd-stack--40">
            {MODULES.map((m) => (
              <div key={m.label} className="rd-stack rd-stack--10">
                <Label tone="purple" size={12}>{m.label}</Label>
                <p className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>{m.summary}</p>
                <div className="rd-toc-list">
                  {m.sections.map((sec) => {
                    const n = MODULES.flatMap((x) => x.sections).findIndex((x) => x.id === sec.id) + 1;
                    return (
                      <a key={sec.id} href={`${COURSE_URL}#${sec.id}`}>
                        <span>{String(n).padStart(2, '0')}</span>
                        <span>{sec.title}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
