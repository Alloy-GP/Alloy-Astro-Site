// src/components/rd/ServicePage.tsx
// Template 3 — long-form service page. Data-driven: pass a ServicePageData object.
// Sections: breadcrumb → hero (1.2fr .9fr) → purple 3-stat band → prose rows →
// What's included → How it works → FAQ → "More in {Engine}" chips → CTA bar.
import type { ServicePageData } from '~/data/services/types';
import { getEngine, siblingServices } from '~/lib/nav';
import { Breadcrumb, Eyebrow, H1, HeroCtas, StatBand, ProseRows, SectionHead, Checklist, Steps, FaqList, ChipRow, CtaBar, SiblingCard } from './atoms';

function SeoMapMock() {
  const Star = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#f5b400" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: '-1px', margin: '0 2px' }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  );
  const row = (name: string, meta: string, status: string, you = false) => (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, borderRadius: 8, background: you ? '#fff' : 'transparent', boxShadow: you ? 'var(--shadow-md)' : 'none' }}>
      <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 8, background: you ? 'var(--alloy-pink)' : 'var(--alloy-light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>{you ? 'You' : ''}</div>
      <div className="rd-stack" style={{ gap: 4, flex: 1 }}>
        <div className="rd-title-15">{name}</div>
        <div className="rd-tiny rd-tiny--12">{meta.split('★')[0]}<Star />{meta.split('★')[1]}</div>
        <div className="rd-tiny rd-tiny--12 rd-w-500" style={{ color: you ? 'var(--engine-retain)' : undefined }}>{status}</div>
      </div>
    </div>
  );
  return (
    <div className="rd-card rd-card--off rd-card--pad-sm rd-stack rd-stack--10" aria-hidden="true">
      <div className="rd-row" style={{ gap: 10, background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '12px 14px', fontSize: 14, fontWeight: 500, color: 'var(--alloy-purple)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#381c4f" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        hoa management company near me
      </div>
      <div style={{ height: 110, borderRadius: 8, background: 'var(--alloy-light-gray)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg,transparent 0 38px,rgba(56,28,79,.06) 38px 39px),repeating-linear-gradient(0deg,transparent 0 38px,rgba(56,28,79,.06) 38px 39px)' }} />
        <div style={{ position: 'absolute', left: '46%', top: '38%', width: 16, height: 16, borderRadius: '50%', background: 'var(--alloy-pink)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,.25)' }} />
        <div style={{ position: 'absolute', left: '24%', top: '60%', width: 10, height: 10, borderRadius: '50%', background: 'var(--alloy-purple)', border: '2px solid #fff' }} />
        <div style={{ position: 'absolute', left: '70%', top: '28%', width: 10, height: 10, borderRadius: '50%', background: 'var(--alloy-purple)', border: '2px solid #fff' }} />
      </div>
      <div className="rd-stack" style={{ gap: 4 }}>
        {row('Your CAM firm', '4.9 ★ · 212 reviews · HOA management company', 'Open · Responds within an hour', true)}
        {row('Competitor A', '4.4 ★ · 61 reviews · HOA management company', 'Open')}
        {row('Competitor B', '4.1 ★ · 38 reviews · HOA management company', 'Open')}
      </div>
    </div>
  );
}

export default function ServicePage({ data }: { data: ServicePageData }) {
  const engine = getEngine(data.engine);
  const siblings = siblingServices(data.engine, data.href);
  const aside = data.heroAside ?? 'siblings';

  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: 'The System', href: '/services' }, { label: engine.title, href: engine.href }, { label: data.name, href: data.href }]} />
        </div>
      </section>

      <section className="rd-section rd-section--after-crumb">
        <div className="rd-wrap rd-grid rd-grid--hero">
          <div className="rd-stack" style={{ gap: 30 }}>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <H1 size={data.h1Size === 'lg' ? 'base' : 'md'} accent={data.h1Accent} {...(data.h1Tail ? { tail: data.h1Tail } : {})}>{data.h1}</H1>
            <p className="rd-intro">{data.intro}</p>
            <HeroCtas {...(data.primaryCta ? { primary: data.primaryCta } : {})} {...(data.secondaryCta ? { secondary: data.secondaryCta } : {})} />
          </div>
          {aside === 'seo-map' ? (
            <SeoMapMock />
          ) : (
            <SiblingCard engineTitle={engine.title} engineStage={engine.stage} engineHref={engine.href} tone={data.engine} links={siblings} />
          )}
        </div>
      </section>

      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap"><StatBand stats={data.stats} columns={3} /></div>
      </section>

      <section className="rd-section rd-section--flush">
        <div className="rd-wrap"><ProseRows sections={data.sections} /></div>
      </section>

      <section className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <SectionHead eyebrow={data.included.eyebrow ?? "What's included"} tone="purple" h2={data.included.h2} intro={data.included.intro} />
          <Checklist items={data.included.items} />
        </div>
      </section>

      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">{data.process.h2}</h2>
            <p className="rd-body">{data.process.intro}</p>
          </div>
          <Steps steps={data.process.steps} />
        </div>
      </section>

      <section className="rd-section">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <SectionHead eyebrow={data.faq.eyebrow ?? 'Questions'} h2={data.faq.h2 ?? 'Plain answers.'} />
          <FaqList items={data.faq.items} />
        </div>
      </section>

      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <ChipRow label={`More in ${engine.title}`} chips={siblings.map((s) => ({ label: s.label, href: s.href }))} all={{ label: `All of ${engine.title}`, href: engine.href }} />
        </div>
      </section>

      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text={data.cta.text} {...(data.cta.label ? { label: data.cta.label } : {})} {...(data.cta.href ? { href: data.cta.href } : {})} />
        </div>
      </section>
    </div>
  );
}
