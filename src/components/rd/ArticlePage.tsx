// src/components/rd/ArticlePage.tsx
// Template 5 (article / guide), data-driven: renders an ArticleData object from src/data/articles/.
// Layout mirrors MarketingStrategyArticle / AISearchArticle (breadcrumb, two-column hero with byline,
// sticky TOC + CTA card, numbered sections, keep-reading cards, CTA bar) and adds the pieces the
// collections cluster needs: byline disclosure, definition callouts, fill-in worksheets, source tables,
// an in-article FAQ (FAQPage schema comes from lib/article-page.ts) and visible [PROOF: …] placeholders.
// Static: no client directive.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, ArrowIcon, FaqList } from '~/components/rd/atoms';
import { PINK, YELLOW, BLUE, GREEN, REACH_INK, MATCH_INK, RETAIN_INK } from '~/lib/tokens';
import type { ArticleData, Block, ReadingTone } from '~/data/articles/types';
import { AUTHOR, readMinutes } from '~/lib/article-page';

const TONES: Record<ReadingTone, { ink: string; accent: string }> = {
  reach: { ink: REACH_INK, accent: PINK },
  match: { ink: MATCH_INK, accent: YELLOW },
  retain: { ink: RETAIN_INK, accent: GREEN },
  blue: { ink: '#4a86ad', accent: BLUE },
};

/** The brief's exact line for pages that name HOA 48; a shorter one for the rest of the cluster. */
const DISCLOSURE = {
  named: "Alloy's partners operate HOA 48, a pre-legal collections company referenced on this page.",
  short: "Alloy's partners operate HOA 48, a pre-legal collections company.",
};

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/** Inline markup → React: **bold** and [label](href). External links open in a new tab. */
export function inline(s: string): ReactNode {
  return s.split(TOKEN).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const m = part.match(LINK);
    if (m) {
      const [, label, href] = m as unknown as [string, string, string];
      return /^https?:\/\//.test(href)
        ? <a key={i} href={href} target="_blank" rel="noopener">{label}</a>
        : <a key={i} href={href}>{label}</a>;
    }
    return part;
  });
}

const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p': return <p>{inline(b.s)}</p>;
    case 'h3': return <h3>{inline(b.s)}</h3>;
    case 'ul': return <ul>{b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}</ul>;
    case 'ol': return <ol>{b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}</ol>;
    case 'callout':
      return <blockquote className="rd-article-callout">{b.label ? <strong>{b.label}</strong> : null}{b.label ? ' ' : null}{inline(b.s)}</blockquote>;
    case 'note': return <p className="rd-article-note">{inline(b.s)}</p>;
    case 'proof':
      return (
        <div className="rd-proof-placeholder" role="note">
          <span className="rd-label rd-label--12">Proof placeholder · fill before indexing</span>
          <p>[PROOF: {b.s}]</p>
        </div>
      );
    case 'worksheet':
      return (
        <div className="rd-worksheet">
          <div className="rd-title-16 rd-ink">{b.title}</div>
          {b.rows.map((r, i) => (
            <div key={i} className="rd-ws-row">
              <div className="rd-stack rd-stack--6">
                <span className="rd-ws-label">{inline(r.label)}</span>
                {r.hint ? <span className="rd-ws-hint">{inline(r.hint)}</span> : null}
              </div>
              <span className="rd-ws-blank" aria-hidden="true" />
            </div>
          ))}
          {b.result ? (
            <div className="rd-ws-row rd-ws-row--result">
              <span className="rd-ws-label">{inline(b.result)}</span>
              <span className="rd-ws-blank" aria-hidden="true" />
            </div>
          ) : null}
          {b.note ? <p className="rd-ws-note">{inline(b.note)}</p> : null}
        </div>
      );
    case 'table':
      return (
        <div className="rd-stack rd-stack--10">
          <div className="rd-table-wrap">
            <table className="rd-table">
              {b.caption ? <caption>{b.caption}</caption> : null}
              <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{inline(cell)}</th> : <td key={j}>{inline(cell)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note ? <p className="rd-article-note">{inline(b.note)}</p> : null}
        </div>
      );
    case 'cta':
      return (
        <div className="rd-article-cta">
          <p>{inline(b.s)}</p>
          <Btn href={b.href} variant="dark" size="sm">{b.label}</Btn>
        </div>
      );
  }
}

export default function ArticlePage({ data: d }: { data: ArticleData }) {
  const toc = [
    ...d.sections.map((s) => ({ id: s.id, label: s.h2 })),
    ...(d.faq && d.faq.length ? [{ id: 'faq', label: 'Frequently asked questions' }] : []),
    ...(d.next && d.next.length ? [{ id: 'next-steps', label: 'Next steps' }] : []),
  ];
  const num = (id: string) => String(toc.findIndex((t) => t.id === id) + 1).padStart(2, '0');
  const mins = readMinutes(d);

  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: d.parent.label, href: d.parent.href }, { label: d.crumb, href: d.path }]} />
        </div>
      </section>

      {/* Hero: H1 left, the direct answer + byline right */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 5.4vw, 64px)' }}>
              {d.h1}{d.h1Accent ? <> <span className="rd-accent">{d.h1Accent}</span></> : null}
            </h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>{d.answer}</p>
            <div className="rd-tiny rd-w-500">
              By {AUTHOR.name}, {AUTHOR.org} · Published <time dateTime={d.published}>{fmtDate(d.published)}</time>
              {d.updated && d.updated !== d.published ? <> · Updated <time dateTime={d.updated}>{fmtDate(d.updated)}</time></> : null}
              {' '}· {toc.length} sections · {mins} min read
            </div>
            {d.disclosure !== 'none' ? <p className="rd-article-disclosure">{DISCLOSURE[d.disclosure]}</p> : null}
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
                {toc.map((t) => <a key={t.id} href={`#${t.id}`}>{t.label}</a>)}
              </div>
            </nav>
            <div className="rd-bg-purple rd-ink-white rd-stack" style={{ borderRadius: 10, padding: 22, gap: 12, marginTop: 6 }}>
              <div className="rd-title-16">Growing a management company?</div>
              <p className="rd-tiny rd-muted-80">Thirty minutes with a CAM operator. Written 90-day plan, yours to keep.</p>
              <Btn href="/contact" size="xs">Talk to Alloy</Btn>
            </div>
          </aside>

          <article className="rd-article" style={{ minWidth: 0 }}>
            {d.lead && d.lead.length ? (
              <div className="rd-article-section">
                {d.lead.map((b, i) => <BlockView key={i} b={b} />)}
              </div>
            ) : null}

            {d.sections.map((s) => (
              <section key={s.id} id={s.id} className="rd-article-section">
                <div className="rd-article-head" style={{ gap: 14 }}>
                  <span className="rd-numeral rd-numeral--36">{num(s.id)}</span>
                  <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{s.h2}</h2>
                </div>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
            ))}

            {d.faq && d.faq.length ? (
              <section id="faq" className="rd-article-section">
                <div className="rd-article-head" style={{ gap: 14 }}>
                  <span className="rd-numeral rd-numeral--36">{num('faq')}</span>
                  <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>Frequently asked questions</h2>
                </div>
                <FaqList items={d.faq} group={`faq-${d.crumb.replace(/\W+/g, '-').toLowerCase()}`} />
              </section>
            ) : null}

            {d.next && d.next.length ? (
              <section id="next-steps" className="rd-article-section">
                <div className="rd-article-head" style={{ gap: 14 }}>
                  <span className="rd-numeral rd-numeral--36">{num('next-steps')}</span>
                  <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>Next steps</h2>
                </div>
                {d.next.map((p, i) => <p key={i}>{inline(p)}</p>)}
              </section>
            ) : null}
          </article>
        </div>
      </section>

      {/* Keep reading */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--24">
          <Label>Keep reading</Label>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {d.keepReading.map((k) => {
              const tone = TONES[k.tone ?? 'reach'];
              return (
                <a key={k.href} href={k.href} className="rd-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `5px solid ${tone.accent}`, padding: '26px 26px 22px 28px' }}>
                  <div className="rd-row rd-row--between">
                    <span className="rd-label rd-label--12" style={{ color: tone.ink }}>{k.kind}</span>
                    <span className="rd-tiny rd-tiny--12">{k.meta}</span>
                  </div>
                  <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{k.title}</div>
                  <span className="rd-link rd-link--12" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Read <ArrowIcon /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text={d.cta.text} {...(d.cta.label ? { label: d.cta.label } : {})} {...(d.cta.href ? { href: d.cta.href } : {})} />
        </div>
      </section>
    </div>
  );
}
