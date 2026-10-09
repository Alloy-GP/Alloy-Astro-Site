// src/lib/article-page.ts
// Helpers for the data-driven article pages (src/components/rd/ArticlePage.tsx):
// JSON-LD (Article with a Person author + BreadcrumbList + FAQPage) and word/read-time counts.
import { SITE } from '~/config/site';
import { articleSchema, breadcrumbSchema, faqSchema } from '~/lib/schema';
import type { ArticleData, Block } from '~/data/articles/types';

/** Author of the collections cluster (brief, 2026-10-08). LinkedIn URL is owed by the client; `sameAs` is omitted until it arrives. */
export const AUTHOR = {
  name: 'Cameron Lange',
  jobTitle: 'Managing Partner',
  org: SITE.name,
  linkedIn: '' as string, // TODO(client): Cameron Lange's LinkedIn profile URL → Person.sameAs
};

export function authorPerson() {
  return {
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: `${SITE.url}/about`,
    worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    ...(AUTHOR.linkedIn ? { sameAs: [AUTHOR.linkedIn] } : {}),
  };
}

const MARKUP = /\*\*|\[([^\]]+)\]\([^)\s]+\)/g;
export const stripMarkup = (s: string) => s.replace(MARKUP, (_m, label: string | undefined) => label ?? '');

function blockText(b: Block): string {
  switch (b.t) {
    case 'p': case 'h3': case 'note': case 'proof': return b.s;
    case 'callout': return `${b.label ?? ''} ${b.s}`;
    case 'cta': return `${b.s} ${b.label}`;
    case 'ul': case 'ol': return b.items.join(' ');
    case 'worksheet': return [b.title, ...b.rows.map((r) => `${r.label} ${r.hint ?? ''}`), b.result ?? '', b.note ?? ''].join(' ');
    case 'table': return [b.caption ?? '', ...b.head, ...b.rows.flat(), b.note ?? ''].join(' ');
  }
}

/** Visible words on the page (H1, answer, body, FAQ, next steps). Used for the read-time line and the length check. */
export function articleWords(d: ArticleData): number {
  const parts = [
    `${d.h1} ${d.h1Accent ?? ''}`, d.answer,
    ...(d.lead ?? []).map(blockText),
    ...d.sections.flatMap((s) => [s.h2, ...s.blocks.map(blockText)]),
    ...(d.faq ?? []).flatMap((f) => [f.q, f.a]),
    ...(d.next ?? []),
  ];
  return (stripMarkup(parts.join(' ')).match(/\S+/g) ?? []).length;
}

export const readMinutes = (d: ArticleData) => Math.max(1, Math.round(articleWords(d) / 220));

/** Article + BreadcrumbList (+ FAQPage when the page renders a FAQ). */
export function articlePageSchema(d: ArticleData) {
  const article = {
    ...articleSchema({
      headline: stripMarkup(`${d.h1}${d.h1Accent ? ` ${d.h1Accent}` : ''}`),
      description: d.description,
      url: d.path,
      datePublished: d.published,
      ...(d.updated ? { dateModified: d.updated } : {}),
    }),
    author: authorPerson(),
    inLanguage: 'en-US',
  };
  const crumbs = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: d.parent.label, href: d.parent.href },
    { name: d.crumb, href: d.path },
  ]);
  return d.faq && d.faq.length ? [article, crumbs, faqSchema(d.faq)] : [article, crumbs];
}
