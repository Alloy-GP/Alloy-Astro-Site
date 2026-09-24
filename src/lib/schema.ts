// src/lib/schema.ts
// JSON-LD builders for BaseLayout's `pageSchema` prop.

import { SITE } from '~/config/site';

export interface FaqItem { q: string; a: string }

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; href?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: new URL(c.href, SITE.url).toString() } : {}),
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: new URL(opts.url, SITE.url).toString(),
    serviceType: opts.serviceType ?? opts.name,
    areaServed: 'United States',
    provider: { '@type': SITE.org.type, name: SITE.name, url: SITE.url },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: new URL(opts.url, SITE.url).toString(),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: new URL(opts.image ?? SITE.defaultOgImage, SITE.url).toString(),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.org.logo },
    },
  };
}

export function courseSchema(opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: new URL(opts.url, SITE.url).toString(),
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT45M',
    },
  };
}
