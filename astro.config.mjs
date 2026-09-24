// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITEMAP_ROUTES = new Set([
  '/', '/about', '/about/testimonials',
  '/boardmatch', '/boardmatch/groundwork', '/boardmatch/proposal-optimization', '/boardmatch/rfp-response-system', '/boardmatch/sales-messaging',
  '/boardreach', '/boardreach/email-marketing', '/boardreach/hoa-management-branding', '/boardreach/hoa-social-media-marketing',
  '/boardreach/hoa-website-design', '/boardreach/print-production', '/boardreach/property-management-lead-generation',
  '/boardretain', '/boardretain/annual-report-production', '/boardretain/board-education', '/boardretain/newsletter-production',
  '/boardretain/reputation-management', '/boardretain/thought-leadership',
  '/boardsuite', '/careers', '/contact', '/faq', '/get-started', '/growth-modeled', '/partners', '/pricing', '/privacy-policy',
  '/property-management-seo', '/resources', '/resources/cam-marketing-strategy', '/resources/courses', '/resources/courses/trust-building',
  '/resources/hoa-management-software-guide', '/results', '/results/apex-cmg', '/services', '/terms-conditions',
  // Campaign landing pages (indexable today; not part of the redesign)
  '/boardstart', '/cam-growth-portal',
]);

export default defineConfig({
  site: 'https://alloygp.co',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      // Filter out:
      //   1. API endpoints (form handlers under /api/*)
      //   2. Legacy URL routes that exist only to Astro.redirect() to a canonical URL.
      //      Astro's build picks them up as "routes", but they should never be in the
      //      sitemap — Google would see a 301 and drop them anyway.
      // Allowlist: only the canonical routes from the redesign route table (docs/redesign-handoff/README.md)
      // plus the two indexable campaign landing pages that predate the redesign. Everything else —
      // API endpoints, noindex pages, legacy paths — stays out.
      filter: (page) => {
        const path = page.replace('https://alloygp.co', '').replace(/\/$/, '') || '/';
        return SITEMAP_ROUTES.has(path);
      },
      // Emit a per-page changefreq + priority that roughly mirrors the
      // hand-maintained public/sitemap.xml we used to keep:
      //   - homepage / get-started: highest priority
      //   - service & approach pages: 0.85
      //   - results, about, resources: 0.75
      //   - course lessons + legal: lower
      // Note: Google largely ignores these hints, but matching prior values
      // keeps continuity with the old static sitemap for any tools that read them.
      serialize: (item) => {
        const url = item.url.replace('https://alloygp.co', '');
        if (url === '' || url === '/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (url === '/get-started') {
          item.changefreq = 'monthly';
          item.priority = 0.95;
        } else if (url === '/pricing' || url.startsWith('/boardsuite')) {
          item.changefreq = 'monthly';
          item.priority = 0.9;
        } else if (
          url.startsWith('/boardreach') ||
          url.startsWith('/boardmatch') ||
          url.startsWith('/boardretain') ||
          url.startsWith('/our-approach') ||
          url.startsWith('/services')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.85;
        } else if (url.startsWith('/resources') || url.startsWith('/resource-hub')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (url.startsWith('/results') || url.startsWith('/about')) {
          item.changefreq = 'monthly';
          item.priority = 0.75;
        } else if (url.startsWith('/courses')) {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        } else if (url === '/terms-conditions' || url === '/privacy-policy') {
          item.priority = 0.3;
          // omit changefreq for legal — matches prior sitemap
          delete item.changefreq;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  prefetch: { prefetchAll: true },
  security: { checkOrigin: false },
  build: {
    // 'always' embeds all CSS as inline <style> tags — eliminates the render-blocking
    // external stylesheet link that Astro generates with 'auto'. Total bytes are the same
    // but the browser doesn't block paint waiting for an external CSS request.
    inlineStylesheets: 'always',
  },
  redirects: {
    '/index.html': '/',
    // Growth Portal landing page renamed → /cam-growth-portal
    '/growth-portal': '/cam-growth-portal',
    '/about.html': '/about',
    '/about/testimonials.html': '/about/testimonials',
    '/we-know-cam.html': '/about',
    '/contact.html': '/contact',
    '/strategic-review-request.html': '/get-started',
    '/services.html': '/services',
    '/hoa-cam-marketing-services.html': '/boardreach',
    '/services/newsletter-production-for-hoa-management': '/boardretain/newsletter-production',
    // Catch the short-form branding URL — actual page is /boardreach/hoa-management-branding
    '/boardreach/branding': '/boardreach/hoa-management-branding',
    '/property-management-seo.html': '/property-management-seo',
    '/hoa-board-education-programs.html': '/boardretain/board-education',
    '/groundwork.html': '/boardmatch/groundwork',
    '/boardsuite.html': '/boardsuite',
    '/our-approach.html': '/boardsuite',
    '/our-approach/boardreach.html': '/boardreach',
    '/our-approach/boardmatch.html': '/boardmatch',
    '/our-approach/boardretain.html': '/boardretain',
    '/resource-hub.html': '/resources',
    '/resource-hub/ai-search-for-cam.html': '/property-management-seo',
    '/resource-hub/cam-marketing-strategy.html': '/resources/cam-marketing-strategy',
    '/courses.html': '/resources/courses',
    // Legacy lesson route → new lesson system
    '/courses/trust-building-lesson': '/resources/courses/trust-building',
    // Old WordPress course URLs → new clean URLs
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies': '/resources/courses/trust-building',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/intro-to-trust-building-for-cam-firms-reviews-testimonials-case-studies': '/resources/courses/trust-building#intro',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/why-trust-signals-matter-to-hoa-boards': '/resources/courses/trust-building#why-trust-signals-matter',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-reviews-are-and-why-they-carry-weight': '/resources/courses/trust-building#what-reviews-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/reviews-extra-factors-that-influence-impact': '/resources/courses/trust-building#reviews-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-testimonials-are-and-why-they-stand-out': '/resources/courses/trust-building#what-testimonials-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/testimonials-extra-factors-that-influence-impact': '/resources/courses/trust-building#testimonials-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-case-studies-are-and-why-they-convince': '/resources/courses/trust-building#what-case-studies-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/case-studies-extra-factors-that-influence-impact': '/resources/courses/trust-building#case-studies-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/recapping-the-3-trust-signals': '/resources/courses/trust-building#recapping-trust-signals',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/from-proof-to-persuasion-using-trust-signals-effectively': '/resources/courses/trust-building#from-proof-to-persuasion',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/quizzes/check-your-learning-trust-building-for-cam-firms-reviews-testimonials-case-studies': '/resources/courses/trust-building#knowledge-check',
    // ─────────────────────────────────────────────
    // Redesign (2026-09) — docs/redesign-handoff/docs/alloygp-sitemap.md §3
    // Every legacy path 301s straight to its final URL (no chains).
    // ─────────────────────────────────────────────
    '/our-approach': '/boardsuite',
    '/our-approach/boardreach': '/boardreach',
    '/our-approach/boardmatch': '/boardmatch',
    '/our-approach/boardretain': '/boardretain',
    '/about/we-know-cam': '/about',
    '/we-know-cam': '/about',
    '/services/social-media-marketing-for-hoa-management-companies': '/boardreach/hoa-social-media-marketing',
    '/services/hoa-newsletter-production': '/boardretain/newsletter-production',
    '/hoa-cam-marketing-services': '/boardreach',
    '/groundwork': '/boardmatch/groundwork',
    '/hoa-board-education-programs': '/boardretain/board-education',
    '/strategic-review-request': '/get-started',
    '/resource-hub': '/resources',
    '/resource-hub/cam-marketing-strategy': '/resources/cam-marketing-strategy',
    '/resource-hub/ai-search-for-cam': '/property-management-seo',
    '/courses': '/resources/courses',
    '/courses/trust-building': '/resources/courses/trust-building',
    '/courses/trust-building/lessons/intro': '/resources/courses/trust-building#intro',
    '/courses/trust-building/lessons/why-trust-signals-matter': '/resources/courses/trust-building#why-trust-signals-matter',
    '/courses/trust-building/lessons/what-reviews-are': '/resources/courses/trust-building#what-reviews-are',
    '/courses/trust-building/lessons/reviews-extra-factors': '/resources/courses/trust-building#reviews-extra-factors',
    '/courses/trust-building/lessons/what-testimonials-are': '/resources/courses/trust-building#what-testimonials-are',
    '/courses/trust-building/lessons/testimonials-extra-factors': '/resources/courses/trust-building#testimonials-extra-factors',
    '/courses/trust-building/lessons/what-case-studies-are': '/resources/courses/trust-building#what-case-studies-are',
    '/courses/trust-building/lessons/case-studies-extra-factors': '/resources/courses/trust-building#case-studies-extra-factors',
    '/courses/trust-building/lessons/recapping-trust-signals': '/resources/courses/trust-building#recapping-trust-signals',
    '/courses/trust-building/lessons/from-proof-to-persuasion': '/resources/courses/trust-building#from-proof-to-persuasion',
    '/courses/trust-building-quiz': '/resources/courses/trust-building#knowledge-check',
    '/learn/is-online-employee-training-too-much': '/resources/courses/trust-building',
    // Dropped pages (never fully launched, but were in the nav + sitemap so they've been crawled)
    '/boardreach/local-pack-optimization': '/property-management-seo',
    '/boardreach/google-ads-ppc': '/boardreach/property-management-lead-generation',

    '/results.html': '/results',
    '/results/rise-amg.html': '/results/apex-cmg',
    '/results/rise-amg': '/results/apex-cmg',
    '/faq.html': '/faq',
    '/terms-conditions.html': '/terms-conditions',
    '/privacy-policy.html': '/privacy-policy',

    // ─────────────────────────────────────────────
    // Legacy 404s from WordPress migration (May 2026)
    // Source: alloygp_seo_tracker_may2026.xlsx
    // Wildcard patterns (/history/*, /courses/outsmarting-ai-search/*) → vercel.json
    // ─────────────────────────────────────────────

    // WordPress date archives (treating as 301 — 410 not supported in Astro redirects)
    '/2025/08/01': '/resources',
    '/2025/08/17': '/resources',
    '/2025/09/21': '/resources',

    // Standalone old pages
    '/about-alloy': '/about',
        '/academy': '/resources/courses',
    '/austin-texas': '/about',
    '/boardappeal-audit-client-intake': '/get-started',
    '/boardappeal-audit': '/get-started',
    '/boardretain-hoa-client-retention': '/boardretain',
    '/boardsuite-service': '/boardsuite',
    '/boardsuite-vs-a-la-carte': '/boardsuite',
    '/directory/d49c9008': '/',
    '/growth-audit': '/get-started',
    '/services-hub': '/services',
    '/solution/leads': '/boardreach/property-management-lead-generation',
    '/when-to-choose-a-la-carte-services': '/services',
    '/when-to-choose-boardsuite': '/boardsuite',

    // WordPress category archives (exact match — each has a unique target)
    '/category/blogs': '/resources',
    '/category/boardmatch': '/boardmatch',
    '/category/boardreach': '/boardreach',
    '/category/boardretain': '/boardretain',
    '/category/boardsuite': '/boardsuite',
    '/category/cam-marketing': '/resources',
    '/category/community-management': '/resources',
    '/category/hoa-marketing': '/resources',
    '/category/nuturing': '/resources',
    '/category/reputation': '/boardretain/reputation-management',
    '/category/sales-tools': '/boardmatch/groundwork',
    '/category/seo': '/property-management-seo',
    '/category/team': '/about',
    '/category/uncategorized': '/resources',
    '/category/website': '/boardreach',

    // WordPress custom taxonomy: focus (each has a unique target)
    '/focus/advertising-ads': '/boardreach/property-management-lead-generation',
    '/focus/communication': '/boardretain/newsletter-production',
    '/focus/content-branding': '/services',
    '/focus/nurturing': '/boardreach/email-marketing',
    '/focus/partnership': '/about',
    '/focus/retention': '/boardretain',
    '/focus/sales': '/boardmatch',
    '/focus/seo': '/property-management-seo',
    '/focus/social': '/boardreach/hoa-social-media-marketing',
    '/focus/training': '/boardretain/board-education',

    // Old course page (different from /courses/outsmarting-ai-search wildcard in vercel.json)
    '/courses/geo-tactics-for-cam-leverage-reddit-quora-wikipedia-for-ai-visibility': '/resources/courses',

    // Legacy service pages
    '/services/ai-search-optimization-for-hoa-cam-companies': '/property-management-seo',
    '/services/board-education-programs-to-reduce-turnover': '/boardretain/board-education',
    '/services/board-portal-development-for-hoa-communication': '/boardsuite',
    '/services/business-developer-training-for-hoa-proposals': '/boardmatch/groundwork',
    '/services/client-satisfaction-feedback-systems-for-cam-firms': '/boardretain/reputation-management',
    '/services/content-marketing-for-hoa-management-companies': '/services',
    '/services/conversion-rate-optimization-for-cam-company-websites': '/services',
    '/services/email-marketing-for-hoa-management-cam-companies': '/boardreach/email-marketing',
    '/services/follow-up-content-email-sequences-for-boards': '/boardreach/email-marketing',
    '/services/hoa-management-google-ads-ppc-management': '/boardreach/property-management-lead-generation',
    '/services/marketing-strategy-campaign-planning-for-cam-companies': '/resources/cam-marketing-strategy',
    '/services/organic-local-seo-for-cam-companies': '/property-management-seo',
    '/services/proposal-optimization-for-hoa-management-companies': '/boardmatch/groundwork',
    '/services/reputation-review-management-for-cam-firms': '/boardretain/reputation-management',
    '/services/role-based-training-for-hoa-managers-staff': '/boardretain/board-education',
    '/services/sales-messaging-uvp-development-for-cam-firms': '/boardmatch/groundwork',
    '/services/shared-board-portal-setup-training': '/boardsuite',
    '/services/standard-operating-procedure-sop-creation-for-cam-teams': '/services',
    '/services/vendor-partnership-marketing-for-hoa-managers': '/services',
    '/services/video-marketing-for-hoa-management-services': '/boardreach/hoa-social-media-marketing',
    '/services/website-development': '/boardreach',

    // Old blog / article pages
    '/beyond-pizza-parties-what-community-managers-actually-need-to-feel-supported': '/resources',
    '/cam-marketing-without-increasing-ad-spend': '/resources',
    '/how-todays-boards-evaluate-hoa-management-companies-and-what-theyre-not-telling-you': '/resources',
    '/how-youtube-and-video-content-boost-seo-and-ai-reach': '/resources',
    '/the-10-website-elements-hoa-boards-actually-care-about-in-2025': '/boardreach',
    '/the-hidden-side-of-seo': '/property-management-seo',
    '/why-growing-cam-firms-invest-in-their-people-first': '/resources',
    '/why-hoa-management-companies-need-specialized-marketing': '/about',
    '/why-your-hoa-blog-isnt-bringing-in-new-business': '/resources',
  },
});
