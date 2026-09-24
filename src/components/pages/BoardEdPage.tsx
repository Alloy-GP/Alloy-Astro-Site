// src/components/pages/BoardEdPage.tsx
import { PageHero, CtaBand, ServiceList } from '~/components/sections/Shells';
import { YELLOW, PINK } from '~/lib/tokens';

export default function BoardEdPage() {
  return (
    <>
      <PageHero
        eyebrow="Service · Board education"
        h1={<>Board education programs<br/>that turn your firm into <span style={{ color: PINK }}>the trusted authority.</span></>}
        sub="Branded learning libraries, micro-courses, and board onboarding programs that position your CAM company as the educational resource boards return to year after year."
      />
      <section className="section section-white">
        <div className="container">
          <ServiceList color={YELLOW} items={[
            { h: 'Branded learning library', d: 'On-demand video and PDF library covering board fundamentals — your logo, your voice, your authority.' },
            { h: 'Micro-courses', d: '5-lesson sequences boards can complete in a week. Drives email opt-ins and creates ongoing engagement.' },
            { h: 'New-board-member onboarding', d: 'First-90-days curriculum that gets new directors competent and loyal to your firm.' },
            { h: 'Webinar program', d: 'Quarterly live sessions with replay assets, drip nurture, and lead capture built in.' },
            { h: 'Compliance updates', d: 'Branded explainers when state laws change — boards forward your email instead of googling.' },
            { h: 'Manager onboarding & training', d: 'SOP libraries and role-based curricula that compress new-manager ramp-time and reduce turnover.' },
          ]} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
