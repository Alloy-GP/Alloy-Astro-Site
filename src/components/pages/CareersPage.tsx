// src/components/pages/CareersPage.tsx — /careers
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/careers.dc.html.
import type { CSSProperties } from 'react';
import { Eyebrow, ArrowIcon } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

const ROLES = [
  { title: 'Fractional BD Lead (Groundwork)', summary: 'Prospect and qualify boards for one CAM firm in one metro. CAM or B2B services sales background.', type: 'Full-time · Remote' },
  { title: 'Content Strategist, CAM', summary: 'Write for boards. Articles, newsletters, proposals, courses. You know what a reserve study is or can learn fast.', type: 'Full-time · Remote' },
  { title: 'Local SEO Specialist', summary: 'Google Business Profiles, citations, service-area pages, AI-search structure. Multi-location experience preferred.', type: 'Contract to hire' },
];

const typeStyle: CSSProperties = { fontSize: 12, color: 'var(--alloy-pink)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 4 };

export default function CareersPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Careers</Eyebrow>
            <h1 className="rd-h1">Build the growth engine <span className="rd-accent">for an industry that needs one.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>Small team, one industry, real accountability. If you’ve worked in or around community management and can write, sell, or build, we want to hear from you.</p>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-grid rd-grid--prose rd-rule-top" style={{ paddingTop: 48 }}>
            <div className="rd-stack rd-stack--18">
              <Eyebrow tone="purple">Open roles</Eyebrow>
              <h2 className="rd-h2">Three seats.</h2>
              <p className="rd-body" style={LH}>Remote-first, Austin-anchored. Every role touches clients directly.</p>
            </div>
            <div className="rd-stack">
              {ROLES.map((r) => (
                <a
                  key={r.title}
                  href="/contact"
                  className="rd-rule-bottom rd-ink"
                  style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, padding: '26px 0', textDecoration: 'none', alignItems: 'center' }}
                >
                  <div className="rd-stack rd-stack--6">
                    <h3 className="rd-h4">{r.title}</h3>
                    <p className="rd-small rd-small--14" style={LH}>{r.summary}</p>
                    <div style={typeStyle}>{r.type}</div>
                  </div>
                  <ArrowIcon size={18} stroke={2} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
