// src/components/pages/ApproachPage.tsx
import SystemDiagram from '~/components/modules/SystemDiagram';
import { PageHero, CtaBand, PillarCard } from '~/components/sections/Shells';
import { PINK, YELLOW, GREEN } from '~/lib/tokens';

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        h1={<>Most agencies sell one lever.<br/>Alloy <span style={{ color: PINK }}>engineers all three.</span></>}
        sub="Attract pulls boards toward you. Close turns interest into contracts. Keep protects what you've built. Run separately, they leak. Run as one system — BoardSuite — they compound."
      />
      <section className="section section-dark">
        <div className="container">
          <SystemDiagram onLearn="/our-approach/boardreach" />
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <PillarCard color={PINK} brand="BoardReach™" label="Attract" headline="Get found before boards start shopping." items={['Local SEO & GEO', 'Authority content', 'Paid acquisition', 'Demand gen assets']} href="/our-approach/boardreach" />
            <PillarCard color={YELLOW} brand="BoardMatch™" label="Close" headline="Turn conversations into signed contracts." items={['Proposal optimization', 'Sales messaging', 'BD training', 'Shared board portal']} href="/our-approach/boardmatch" />
            <PillarCard color={GREEN} brand="BoardRetain™" label="Keep" headline="Protect the portfolio you have." items={['Board education', 'Satisfaction systems', 'SOP creation', 'Reputation management']} href="/our-approach/boardretain" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
