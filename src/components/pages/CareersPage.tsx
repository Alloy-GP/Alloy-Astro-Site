// src/components/pages/CareersPage.tsx — /careers
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/careers.dc.html.
// Principles, benefits, hiring process and the careers@ address restored from the
// pre-redesign page (copy tightened). Benefit specifics are the old page's — confirm before launch.
import type { CSSProperties } from 'react';
import { Eyebrow, ArrowIcon, Steps, CtaBar } from '~/components/rd/atoms';

const CAREERS_EMAIL = 'careers@alloygp.co';

const LH: CSSProperties = { lineHeight: 1.65 };

const ROLES = [
  { title: 'Fractional BD Lead (Groundwork)', summary: 'Prospect and qualify boards for one CAM firm in one metro. CAM or B2B services sales background.', type: 'Full-time · Remote' },
  { title: 'Content Strategist, CAM', summary: 'Write for boards. Articles, newsletters, proposals, courses. You know what a reserve study is or can learn fast.', type: 'Full-time · Remote' },
  { title: 'Local SEO Specialist', summary: 'Google Business Profiles, citations, service-area pages, AI-search structure. Multi-location experience preferred.', type: 'Contract to hire' },
];

const PRINCIPLES = [
  { title: 'Operators first, always', body: 'Everything we ship gets pressure-tested by someone who has run a CAM portfolio. If it doesn’t pass that test, it doesn’t ship.' },
  { title: 'Plain English is the standard', body: 'We turn reserve studies, ops data, and CC&R legalese into copy people read. If you can’t explain it to a board chair in two sentences, you don’t understand it yet.' },
  { title: 'Ship the system, not the asset', body: 'No one-off deliverables. We build engines (templates, playbooks, vendor networks, reorder triggers) that keep running after we leave the room.' },
  { title: 'Disagree, then commit', body: 'Before a decision, argue the case hard, with data, with everyone in the room. After it, row in the same direction. We don’t relitigate in Slack.' },
  { title: 'Quiet excellence', body: 'The work does the talking. No conference circuit unless we have something new to say.' },
];

const BENEFITS = [
  { title: 'Health, dental, vision', body: 'Premium plans, 100% covered for you and 80% for dependents. HSA option with a $2K annual employer contribution.' },
  { title: 'Remote-first, async-default', body: 'A distributed team across the US. Two in-person offsites a year. No mandatory return-to-office.' },
  { title: '4-week PTO floor', body: 'Unlimited PTO with a four-week annual minimum. Your manager confirms you took it. That’s the floor, not the ceiling.' },
  { title: 'Learning budget', body: '$3K a year for conferences, courses, books, and coaching. Paid CAI dues for anyone working in the practice.' },
  { title: '401(k) + match', body: '4% match, vested immediately. Roth and traditional options in low-fee Vanguard index funds.' },
  { title: 'Parental leave', body: '16 weeks fully paid for the primary caregiver, 8 for the secondary. A phased return at 50/75/100% for the first month back.' },
];

const HIRING = [
  { title: 'Apply', body: `Send a short note and your resume to ${CAREERS_EMAIL}. No cover letter. Tell us what you’re working on right now, and why.` },
  { title: 'Conversation', body: 'Thirty minutes with the hiring manager. We want to understand your work, not interrogate you. Ask us anything.' },
  { title: 'Working session', body: 'A paid two-hour session on a real, anonymized problem from our pipeline. We see how you think; you see how we work.' },
  { title: 'Decision', body: 'Reference calls and an offer within 7 days of the working session. We don’t drag it out. Yes or no, fast.' },
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
                  href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(r.title)}`}
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

      {/* How we work */}
      <section id="how-we-work" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Five principles that show up in everything we ship.</h2>
          </div>
          <div className="rd-stack rd-rule-top">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rd-stack rd-stack--6 rd-rule-bottom" style={{ padding: '24px 0' }}>
                <h3 className="rd-h4">{p.title}</h3>
                <p className="rd-small" style={LH}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="rd-section">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">Benefits that match the work.</h2>
          </div>
          <div className="rd-grid rd-grid--3" style={{ gap: '0 40px' }}>
            {BENEFITS.map((b) => (
              <div key={b.title} className="rd-stack rd-stack--10 rd-rule-top" style={{ padding: '24px 0 32px' }}>
                <h3 className="rd-h4">{b.title}</h3>
                <p className="rd-small rd-small--14" style={LH}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we hire */}
      <section id="hiring-process" className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--48">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>How we hire</Eyebrow>
            <h2 className="rd-h2 rd-h2--sm">From first email to offer in <span className="rd-accent">2 weeks.</span></h2>
          </div>
          <Steps steps={HIRING} />
          <CtaBar
            text={<>Don’t see your role? Email {CAREERS_EMAIL} with what you’re working on.</>}
            label="Email us"
            href={`mailto:${CAREERS_EMAIL}`}
          />
        </div>
      </section>
    </div>
  );
}
