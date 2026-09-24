// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) => {
        if (page.includes('/api/')) return false;
        // Standalone, unlinked, noindex walkthrough — keep it out of the sitemap.
        if (page.replace(/\/$/, '') === 'https://alloygp.co/find-your-path') return false;
        const legacyRedirectRoutes = [
          'https://alloygp.co/groundwork',
          'https://alloygp.co/hoa-board-education-programs',
          'https://alloygp.co/hoa-cam-marketing-services',
          'https://alloygp.co/strategic-review-request',
          'https://alloygp.co/we-know-cam',
          'https://alloygp.co/services/hoa-newsletter-production',
          'https://alloygp.co/resource-hub',
          'https://alloygp.co/courses',
          'https://alloygp.co/courses/trust-building',
        ];
        // Normalize trailing slash for the comparison
        return !legacyRedirectRoutes.includes(page.replace(/\/$/, ''));
      },
      // Dynamic routes (e.g. /courses/trust-building/lessons/[lesson]) aren't
      // auto-enumerated by the plugin. Add them explicitly so they get indexed.
      customPages: [
        'https://alloygp.co/courses/trust-building/lessons/intro',
        'https://alloygp.co/courses/trust-building/lessons/why-trust-signals-matter',
        'https://alloygp.co/courses/trust-building/lessons/what-reviews-are',
        'https://alloygp.co/courses/trust-building/lessons/reviews-extra-factors',
        'https://alloygp.co/courses/trust-building/lessons/what-testimonials-are',
        'https://alloygp.co/courses/trust-building/lessons/testimonials-extra-factors',
        'https://alloygp.co/courses/trust-building/lessons/what-case-studies-are',
        'https://alloygp.co/courses/trust-building/lessons/case-studies-extra-factors',
        'https://alloygp.co/courses/trust-building/lessons/recapping-trust-signals',
        'https://alloygp.co/courses/trust-building/lessons/from-proof-to-persuasion',
      ],
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
    '/we-know-cam.html': '/we-know-cam',
    '/contact.html': '/contact',
    '/strategic-review-request.html': '/strategic-review-request',
    '/services.html': '/services',
    '/hoa-cam-marketing-services.html': '/hoa-cam-marketing-services',
    '/services/newsletter-production-for-hoa-management': '/boardretain/newsletter-production',
    // Catch the short-form branding URL — actual page is /boardreach/hoa-management-branding
    '/boardreach/branding': '/boardreach/hoa-management-branding',
    '/property-management-seo.html': '/property-management-seo',
    '/hoa-board-education-programs.html': '/hoa-board-education-programs',
    '/groundwork.html': '/groundwork',
    '/boardsuite.html': '/boardsuite',
    '/our-approach.html': '/our-approach',
    '/our-approach/boardreach.html': '/our-approach/boardreach',
    '/our-approach/boardmatch.html': '/our-approach/boardmatch',
    '/our-approach/boardretain.html': '/our-approach/boardretain',
    '/resource-hub.html': '/resource-hub',
    '/resource-hub/ai-search-for-cam.html': '/resource-hub/ai-search-for-cam',
    '/resource-hub/cam-marketing-strategy.html': '/resource-hub/cam-marketing-strategy',
    '/courses.html': '/courses',
    // Legacy lesson route → new lesson system
    '/courses/trust-building-lesson': '/courses/trust-building/lessons/intro',
    // Old WordPress course URLs → new clean URLs
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies': '/courses/trust-building',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/intro-to-trust-building-for-cam-firms-reviews-testimonials-case-studies': '/courses/trust-building/lessons/intro',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/why-trust-signals-matter-to-hoa-boards': '/courses/trust-building/lessons/why-trust-signals-matter',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-reviews-are-and-why-they-carry-weight': '/courses/trust-building/lessons/what-reviews-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/reviews-extra-factors-that-influence-impact': '/courses/trust-building/lessons/reviews-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-testimonials-are-and-why-they-stand-out': '/courses/trust-building/lessons/what-testimonials-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/testimonials-extra-factors-that-influence-impact': '/courses/trust-building/lessons/testimonials-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/what-case-studies-are-and-why-they-convince': '/courses/trust-building/lessons/what-case-studies-are',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/case-studies-extra-factors-that-influence-impact': '/courses/trust-building/lessons/case-studies-extra-factors',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/recapping-the-3-trust-signals': '/courses/trust-building/lessons/recapping-trust-signals',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/lessons/from-proof-to-persuasion-using-trust-signals-effectively': '/courses/trust-building/lessons/from-proof-to-persuasion',
    '/courses/trust-building-for-cam-firms-reviews-testimonials-case-studies/quizzes/check-your-learning-trust-building-for-cam-firms-reviews-testimonials-case-studies': '/courses/trust-building-quiz',
    // Note: /hoa-cam-marketing-services, /groundwork, /hoa-board-education-programs,
    // /we-know-cam, /resource-hub, /courses, /courses/trust-building,
    // /strategic-review-request, /services/hoa-newsletter-production
    // are all handled by Astro.redirect() in their respective .astro files.
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
    '/boardmatch': '/our-approach/boardmatch',
    '/academy': '/resources/courses',
    '/austin-texas': '/about',
    '/boardappeal-audit-client-intake': '/get-started',
    '/boardappeal-audit': '/get-started',
    '/boardretain-hoa-client-retention': '/our-approach/boardretain',
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
    '/category/boardmatch': '/our-approach/boardmatch',
    '/category/boardreach': '/boardreach',
    '/category/boardretain': '/our-approach/boardretain',
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
    '/focus/advertising-ads': '/boardreach/google-ads-ppc',
    '/focus/communication': '/boardretain/newsletter-production',
    '/focus/content-branding': '/services',
    '/focus/nurturing': '/boardreach/email-marketing',
    '/focus/partnership': '/about',
    '/focus/retention': '/our-approach/boardretain',
    '/focus/sales': '/our-approach/boardmatch',
    '/focus/seo': '/property-management-seo',
    '/focus/social': '/services/social-media-marketing-for-hoa-management-companies',
    '/focus/training': '/boardretain/board-education',

    // Old course page (different from /courses/outsmarting-ai-search wildcard in vercel.json)
    '/courses/geo-tactics-for-cam-leverage-reddit-quora-wikipedia-for-ai-visibility': '/resources/courses',

    // Legacy service pages
    '/services/ai-search-optimization-for-hoa-cam-companies': '/resource-hub/ai-search-for-cam',
    '/services/board-education-programs-to-reduce-turnover': '/boardretain/board-education',
    '/services/board-portal-development-for-hoa-communication': '/boardsuite',
    '/services/business-developer-training-for-hoa-proposals': '/boardmatch/groundwork',
    '/services/client-satisfaction-feedback-systems-for-cam-firms': '/boardretain/reputation-management',
    '/services/content-marketing-for-hoa-management-companies': '/services',
    '/services/conversion-rate-optimization-for-cam-company-websites': '/services',
    '/services/email-marketing-for-hoa-management-cam-companies': '/boardreach/email-marketing',
    '/services/follow-up-content-email-sequences-for-boards': '/boardreach/email-marketing',
    '/services/hoa-management-google-ads-ppc-management': '/boardreach/google-ads-ppc',
    '/services/marketing-strategy-campaign-planning-for-cam-companies': '/resource-hub/cam-marketing-strategy',
    '/services/organic-local-seo-for-cam-companies': '/boardreach/local-pack-optimization',
    '/services/proposal-optimization-for-hoa-management-companies': '/boardmatch/groundwork',
    '/services/reputation-review-management-for-cam-firms': '/boardretain/reputation-management',
    '/services/role-based-training-for-hoa-managers-staff': '/boardretain/board-education',
    '/services/sales-messaging-uvp-development-for-cam-firms': '/boardmatch/groundwork',
    '/services/shared-board-portal-setup-training': '/boardsuite',
    '/services/standard-operating-procedure-sop-creation-for-cam-teams': '/services',
    '/services/vendor-partnership-marketing-for-hoa-managers': '/services',
    '/services/video-marketing-for-hoa-management-services': '/services/social-media-marketing-for-hoa-management-companies',
    '/services/website-development': '/boardreach',

    // Old blog / article pages
    '/beyond-pizza-parties-what-community-managers-actually-need-to-feel-supported': '/resources',
    '/cam-marketing-without-increasing-ad-spend': '/resources',
    '/how-todays-boards-evaluate-hoa-management-companies-and-what-theyre-not-telling-you': '/resources',
    '/how-youtube-and-video-content-boost-seo-and-ai-reach': '/resources',
    '/the-10-website-elements-hoa-boards-actually-care-about-in-2025': '/boardreach',
    '/the-hidden-side-of-seo': '/property-management-seo',
    '/why-growing-cam-firms-invest-in-their-people-first': '/resources',
    '/why-hoa-management-companies-need-specialized-marketing': '/we-know-cam',
    '/why-your-hoa-blog-isnt-bringing-in-new-business': '/resources',
  },
});
