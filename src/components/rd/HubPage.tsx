// src/components/rd/HubPage.tsx
// Template 2 — engine hub (/boardreach, /boardmatch, /boardretain). Data-driven.
// Sections: hero (1.25fr .85fr + "The system" card) → Three outcomes → purple proof
// band → "What it costs to wait" → optional FAQ → CTA bar.
import type { HubPageData } from '~/data/hubs/types';
import { ENGINES, getEngine } from '~/lib/nav';
import { Eyebrow, H1, HeroCtas, Label, SectionHead, StatNumber, TextLink, FaqList, CtaBar, ArrowIcon } from './atoms';

export default function HubPage({ data }: { data: HubPageData }) {
  const engine = getEngine(data.engine);

  return (
    <div className="rd-page">
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 88 }}>
        <div className="rd-wrap rd-grid rd-grid--hub">
          <div className="rd-stack rd-stack--32">
            <Eyebrow tone={data.engine}>{data.eyebrow}</Eyebrow>
            <H1 size="lg" accent={data.h1Accent}>{data.h1}</H1>
            <p className="rd-intro rd-intro--19">{data.intro}</p>
            <HeroCtas secondary={data.secondaryCta ?? { label: 'See all three engines', href: '/services' }} />
          </div>
          <div className="rd-system-card">
            <Label tone="yellow" size={12}>The system</Label>
            <div className="rd-system-rows">
              {ENGINES.map((e, i) => {
                const here = e.key === data.engine;
                return (
                  <a key={e.key} href={e.href} className={`rd-system-row${here ? ' is-active' : ''}`} aria-current={here ? 'page' : undefined}>
                    <div>
                      <div className="rd-system-row-title">{e.title}</div>
                      <div className="rd-system-row-sub">{e.stage}{here ? ' · you are here' : ''}</div>
                    </div>
                    <span className="rd-system-row-num">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                );
              })}
            </div>
            <div className="rd-system-note">{data.systemNote}</div>
          </div>
        </div>
      </section>

      <section className="rd-section" style={{ padding: '0 0 40px' }}>
        <div className="rd-wrap rd-stack rd-stack--6 rd-rule-top" style={{ paddingTop: 64 }}>
          <Eyebrow tone="purple">{data.outcomes.eyebrow}</Eyebrow>
          <h2 className="rd-h2">{data.outcomes.h2}</h2>
          {data.outcomes.items.map((o, i) => (
            <div key={i} className="rd-outcome" style={i === data.outcomes.items.length - 1 ? { borderBottom: 0 } : undefined}>
              <div className="rd-outcome-left" style={{ gap: 16 }}>
                <span className={`rd-numeral rd-numeral--56 rd-numeral--${data.engine}`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="rd-h3 rd-h3--lg">{o.title}</h3>
                <p className="rd-body rd-body--16">{o.body}</p>
              </div>
              <div className="rd-stack rd-stack--14">
                <Label>What builds it</Label>
                <div className="rd-builds">
                  {o.services.map((s) => (
                    <a key={s.href} href={s.href} className="rd-build-card">
                      <div className="rd-build-card-head">
                        <span>{s.label}</span>
                        <ArrowIcon size={16} stroke={2} />
                      </div>
                      <div className="rd-build-card-sub">{s.sub}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rd-section rd-section--band rd-bg-purple">
        <div className="rd-wrap rd-grid" style={{ gridTemplateColumns: '1fr 1.1fr', alignItems: 'center' }}>
          <div className="rd-stack rd-stack--18">
            <Eyebrow tone="yellow">{data.proof.eyebrow}</Eyebrow>
            <h2 className="rd-h2" style={{ color: '#fff' }}>{data.proof.h2}</h2>
            <div><TextLink href={data.proof.link.href} tone="white" size={12}>{data.proof.link.label}</TextLink></div>
          </div>
          <div data-reveal data-rise className="rd-proof">
            {data.proof.stats.map((s, i) => (
              <div key={i} className="rd-proof-item">
                <StatNumber stat={s} size={52} />
                <div className="rd-stat-note">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingBottom: 40 }}>
        <div className="rd-wrap rd-grid rd-grid--2 rd-grid--end">
          <SectionHead eyebrow={data.wait.eyebrow} tone={data.engine} h2={data.wait.h2} {...(data.wait.h2Accent ? { accent: data.wait.h2Accent } : {})} />
          <p className="rd-body">{data.wait.body}</p>
        </div>
      </section>

      {data.faq ? (
        <section className="rd-section rd-bg-off" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <div className="rd-wrap rd-grid rd-grid--prose">
            <SectionHead eyebrow={data.faq.eyebrow ?? 'Questions'} tone={data.engine} h2={data.faq.h2 ?? 'Plain answers.'} />
            <FaqList items={data.faq.items} />
          </div>
        </section>
      ) : null}

      <div className="rd-bg-off" style={{ height: 56 }} />
      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text={data.cta.text} {...(data.cta.label ? { label: data.cta.label } : {})} {...(data.cta.href ? { href: data.cta.href } : {})} />
        </div>
      </section>
    </div>
  );
}
