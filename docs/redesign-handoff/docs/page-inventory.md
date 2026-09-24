# alloygp.co rebuild — checklist (aligned to uploads/alloygp-sitemap.md)

**Navigable prototype:** open `site/index.dc.html`. One file per route in `site/` — filename = Astro route with `/` → `-` (e.g. `boardreach-email-marketing.dc.html` → `/boardreach/email-marketing`). Shared `SiteHeader` / `SiteFooter` = Astro layout components.

Legend: [x] designed · [ ] to do · (3a) clone engine hub · (3b) clone service page · (ED) editorial template · (AR) article template · (LG) long-form guide template

## 1. Templates
- [x] Homepage (1c)
- [x] Header + System dropdown (2d)
- [x] Results (2a) · Pricing (2b) · Get Started (2c)
- [x] Engine hub (3a)
- [x] Service page, long-form (3b)
- [x] BoardSuite system page (4a)
- [x] Service index (4b)
- [x] Resources hub (4c)
- [x] Article page (AR)
- [x] Long-form guide with jump-link TOC (LG) — trust-building
- [x] Editorial page (ED) — about, contact, faq, careers, partners, testimonials
- [ ] Mobile pass

## 2. Pages — KEEP / EXPAND on same URL
- [x] / — 1c
- [x] /boardsuite — 4a (absorbs /our-approach)
- [x] /services — 4b
- [x] /pricing — 2b
- [x] /results — 2a
- [x] /results/apex-cmg — 2a case-study variant
- [x] /get-started — 2c
- [x] /boardreach — 3a (absorbs /our-approach/boardreach)
- [x] /boardmatch — 3a, NEW (absorbs /our-approach/boardmatch)
- [x] /boardretain — 3a, NEW (absorbs /our-approach/boardretain)
- [x] /property-management-seo — 3b (absorbs /resource-hub/ai-search-for-cam), 1,800+ words
- [x] /resources — 4c
- [x] /resources/hoa-management-software-guide — LG
- [x] /resources/cam-marketing-strategy — AR (MOVE from /resource-hub/)
- [x] /resources/courses — 4c variant
- [x] /resources/courses/trust-building — LG, 4–5k words, anchors = old lesson slugs
- [x] /about — ED (absorbs /about/we-know-cam)
- [x] /about/testimonials · /partners · /careers · /faq · /contact — ED
- [x] /growth-modeled — KEEP (existing interactive)
- [x] /privacy-policy · /terms-conditions — plain

## 3. BoardReach service pages (3b) — 6
- [x] /boardreach/hoa-website-design
- [x] /boardreach/hoa-management-branding
- [x] /boardreach/property-management-lead-generation
- [x] /boardreach/hoa-social-media-marketing — MOVE from /services/social-media-marketing-for-hoa-management-companies
- [x] /boardreach/email-marketing
- [x] /boardreach/print-production

## 4. BoardMatch service pages (3b) — 4
- [x] /boardmatch/proposal-optimization
- [x] /boardmatch/rfp-response-system
- [x] /boardmatch/sales-messaging
- [x] /boardmatch/groundwork — EXPAND to 900+ words, unique H1

## 5. BoardRetain service pages (3b) — 5
- [x] /boardretain/newsletter-production
- [x] /boardretain/annual-report-production
- [x] /boardretain/reputation-management
- [x] /boardretain/thought-leadership
- [x] /boardretain/board-education — EXPAND to 900+ words

## 6. Dropped (never launched) — no redirect needed unless already indexed
- [x] /boardreach/local-pack-optimization — content folded into /property-management-seo
- [x] /boardreach/google-ads-ppc — folded into /property-management-seo / lead-gen

## 7. Redirects — apply AFTER destination pages are live (see spec §3 for full list)
- [ ] /our-approach → /boardsuite; /our-approach/board* → /board*
- [ ] /about/we-know-cam → /about
- [ ] Social media + cam-marketing-strategy MOVEs
- [ ] /resource-hub/ai-search-for-cam → /property-management-seo
- [ ] 10 lessons + quiz → /resources/courses/trust-building#anchor
- [ ] Legacy routes in astro.config and vercel.json untouched; no chains

## 8. Nav (decided)
- [x] 4 items + CTA: The System▾ · Results · Pricing · Resources · Claim Your Market
- [x] BoardSuite lives as the tile inside the dropdown; About in footer (toggle available)

## 9. Per-page SEO checklist
- [ ] Same URL (no trailing slash), same title pattern `[Service] for HOA Management Companies | Alloy GP`, same meta, same canonical
- [ ] One unique H1 per page; "Three engines. One playbook. Your market." only on /boardsuite
- [ ] FAQ schema on /property-management-seo, the three hubs, all EXPAND service pages; Article schema on guide + articles
- [ ] Every service page links up to its hub and across to 2–3 siblings; every hub links to /boardsuite and /get-started
- [ ] Internal links use final URLs; nav /resources/ → /resources
- [ ] Sitemap lists only spec §1 URLs

## 10. Pre-launch
- [ ] Crawl old site → URL list saved
- [ ] Build all EXPAND/NEW pages on staging
- [ ] Crawl staging → 0 new 404s, every spec URL 200
- [ ] GSC baseline for top 20 pages
- [ ] Launch + flip redirects same release
- [ ] +30 days: GSC check
