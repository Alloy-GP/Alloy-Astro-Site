// src/components/pages/CoursesPage.tsx — /resources/courses
// Template 4 (resources index). Copy from docs/redesign-handoff/site/resources-courses.dc.html.
// Static — no client directive. The only live course is the single-page
// trust-building guide; no links to the retired /courses/* lesson routes.
import { Eyebrow, Label, TextLink, ArrowIcon } from '~/components/rd/atoms';

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
              <div className="rd-card rd-card--off rd-stack rd-stack--10" style={{ padding: 26 }}>
                <Label size={12}>For your firm</Label>
                <div className="rd-h4">Branded board education</div>
                <p className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>Courses like these, in your name, for the boards you manage.</p>
                <div><TextLink href="/boardretain/board-education" size={12}>Board Education Programs</TextLink></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
