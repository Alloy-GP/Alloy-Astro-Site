// src/components/pages/CourseTrustBuildingPage.tsx — /resources/courses/trust-building
// Template 5 — one long-form guide replacing the 10-lesson course + quiz.
// Layout + hero/TOC/aside/related-service copy from
// docs/redesign-handoff/site/resources-courses-trust-building.dc.html.
// Section bodies = each lesson's FULL content from ~/data/courseTrustBuilding
// (not summarized). Section ids are the old lesson slugs so the 301s from
// /courses/trust-building/lessons/<slug> land on the right anchor.
//
// Static component. The knowledge check is a separate island
// (~/components/modules/TrustBuildingQuiz, client:visible) passed in as
// `children` from the route and rendered inside #knowledge-check.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, TextLink, ArrowIcon } from '~/components/rd/atoms';
import { LESSONS } from '~/data/courseTrustBuilding';
import { PINK, BLUE, REACH_INK } from '~/lib/tokens';

// Label ink for blue-accented cards (the prototype's #4a86ad). Not yet a token.
const BLUE_INK = '#4a86ad';

/** Section titles from the prototype TOC, keyed by the (mandatory) lesson slug. */
const TITLES: Record<string, string> = {
  'intro': 'Intro to trust-building',
  'why-trust-signals-matter': 'Why trust signals matter to HOA boards',
  'what-reviews-are': 'What reviews are — and why they carry weight',
  'reviews-extra-factors': 'Reviews: extra factors that influence impact',
  'what-testimonials-are': 'What testimonials are — and why they stand out',
  'testimonials-extra-factors': 'Testimonials: extra factors that influence impact',
  'what-case-studies-are': 'What case studies are — and why they convince',
  'case-studies-extra-factors': 'Case studies: extra factors that influence impact',
  'recapping-trust-signals': 'Recapping the three trust signals',
  'from-proof-to-persuasion': 'From proof to persuasion: using trust signals effectively',
};

const TOC: Array<{ id: string; label: string }> = [
  ...LESSONS.map((l) => ({ id: l.slug, label: TITLES[l.slug] ?? l.title })),
  { id: 'knowledge-check', label: 'Knowledge check' },
];

const KEEP_READING = [
  { kind: 'Guide', ink: REACH_INK, accent: PINK, meta: 'Long read', title: 'The HOA management software guide.', href: '/resources/hoa-management-software-guide' },
  { kind: 'Strategy', ink: BLUE_INK, accent: BLUE, meta: '12 min', title: 'CAM marketing strategy: the plan before the tactics.', href: '/resources/cam-marketing-strategy' },
  { kind: 'Proof', ink: REACH_INK, accent: PINK, meta: 'Case study · 12 min', title: 'How one CAM partner went from chasing RFPs to inbound boards.', href: '/results/apex-cmg' },
];

/**
 * Restyle a lesson's stored HTML for the rd-article column. Content is
 * untouched; only the wrappers change:
 *   <h2>                  → <h3 class="rd-h4"> (section title is the h2)
 *   div.pull-quote        → <blockquote> (.rd-article blockquote)
 *   div.takeaways block   → off-white rd card with pink label + title
 * Runs at SSR only (this component ships no client JS).
 */
function lessonHtml(html: string): string {
  return html
    .replace(/<h2>/g, '<h3 class="rd-h4" style="margin-top:14px">')
    .replace(/<\/h2>/g, '</h3>')
    .replace(/<div class="pull-quote">([\s\S]*?)<\/div>/g, '<blockquote>$1</blockquote>')
    .replace(
      /<div class="takeaways">\s*<div class="takeaways-eyebrow">([\s\S]*?)<\/div>\s*<div class="takeaways-title">([\s\S]*?)<\/div>\s*<ul>([\s\S]*?)<\/ul>\s*<\/div>/g,
      (_m, eyebrow: string, title: string, items: string) =>
        '<div class="rd-card rd-card--off rd-stack rd-stack--10" style="padding:22px 24px;margin-top:6px">' +
        `<div class="rd-label rd-label--12 rd-label--pink">${eyebrow}</div>` +
        `<div class="rd-title-18">${title}</div>` +
        `<ul style="font-size:15px;line-height:1.6">${items}</ul>` +
        '</div>',
    )
    .trim();
}

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

export default function CourseTrustBuildingPage({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[
            { label: 'Resources', href: '/resources' },
            { label: 'Courses', href: '/resources/courses' },
            { label: 'Trust building', href: '/resources/courses/trust-building' },
          ]} />
        </div>
      </section>

      {/* Hero */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Course · Self-paced</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 5.9vw, 68px)' }}>Trust building for CAM firms: <span className="rd-accent">reviews, testimonials, case studies.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>The complete guide — ten sections, one page. How HOA boards weigh the three proof signals, and how to build a system that keeps them current.</p>
            <div className="rd-tiny rd-w-500">10 sections · ~45 min</div>
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
            {LESSONS.map((l) => (
              <Section key={l.slug} id={l.slug} title={TITLES[l.slug] ?? l.title}>
                <div className="rd-stack rd-stack--18" dangerouslySetInnerHTML={{ __html: lessonHtml(l.bodyHtml) }} />
                {l.slug === 'from-proof-to-persuasion' ? (
                  <div className="rd-card rd-card--off rd-stack" style={{ padding: '22px 24px', gap: 8 }}>
                    <Label tone="pink" size={12}>Related service</Label>
                    <div className="rd-title-18" style={{ fontSize: 17 }}>Reputation Management</div>
                    <div className="rd-small rd-small--14" style={{ lineHeight: 1.65 }}>The review system, the responses, and the monitoring — built into your managers’ workflow.</div>
                    <div><TextLink href="/boardretain/reputation-management" size={12}>See the service</TextLink></div>
                  </div>
                ) : null}
              </Section>
            ))}

            <Section id="knowledge-check" title="Knowledge check">
              <p>Five quick questions on what you just read. No login, no email — score yourself.</p>
              {children}
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
