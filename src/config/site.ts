/**
 * src/config/site.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for site-wide SEO defaults.
 * BaseLayout.astro imports from here. Never hardcode these values elsewhere.
 *
 * To override on a per-page basis, pass the relevant prop to <BaseLayout>:
 *   title, description, ogImage, ogType, robots, pageSchema
 */

export const SITE = {
  /** Canonical base URL — no trailing slash */
  url: 'https://alloygp.co',

  /** Display name for og:site_name and JSON-LD */
  name: 'Alloy Growth Partners',

  /** Twitter/X handle — used for twitter:site */
  twitterHandle: '@alloygp',

  /** Default og:locale */
  locale: 'en_US',

  /** Fallback title when no page-specific title is passed */
  defaultTitle: 'Alloy: One growth partner. Three engines. Exclusively CAM.',

  /**
   * Fallback description. In practice every page should declare its own.
   * This is the last-resort safety net.
   */
  defaultDescription:
    'Alloy engineers growth for CAM firms through three connected engines: ' +
    'BoardReach, BoardMatch, BoardRetain. Run as one playbook with market exclusivity.',

  /**
   * Default OG image — absolute path from /public.
   * Override per page by passing ogImage="/assets/your-image.png" to BaseLayout.
   * Dimensions: 1200×630px, PNG.
   */
  defaultOgImage: '/assets/alloy-og.png',

  /** OG image dimensions (kept here so BaseLayout meta stays in sync) */
  ogImageWidth: '1200',
  ogImageHeight: '630',

  /** Organization JSON-LD — emitted on every page */
  org: {
    type: 'ProfessionalService',
    telephone: '+1-210-845-5989',
    email: 'contact@alloygp.co',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    addressCountry: 'US',
    areaServed: 'United States',
    priceRange: '$$$',
    logo: 'https://alloygp.co/assets/alloy-logo-full-color.svg',
    /** Social profiles (client, 2026-10-02) → Organization `sameAs` + footer links */
    sameAs: [
      'https://www.linkedin.com/company/alloycreatives',
      'https://www.facebook.com/alloygp/',
      'https://www.instagram.com/alloygrowthpartners',
    ],
  },

  /** IndexNow key (Bing / Copilot / ChatGPT search index). Key file lives at /public/<key>.txt. */
  indexNowKey: '64aa5ce7cd166c6a743f44b8e7463f9c',
} as const;
