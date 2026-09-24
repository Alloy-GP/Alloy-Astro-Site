# Handoff: alloygp.co simplification — Astro rebuild

## Overview
A full redesign of alloygp.co for Alloy Growth Partners (CAM-only growth agency). Goals: a simpler site, a 4-item nav, sharper messaging led by **market exclusivity (one CAM firm per metro)**, and **zero SEO regression**. Scope: every indexed route on the site (40 pages), a shared header with a two-level "The System" dropdown, a shared footer, brand hover states, and scroll-triggered metric motion.

Target repo: **Alloy-GP/Alloy-Astro-Site** (Astro + React islands, Vercel). This handoff is written against that codebase as of commit `c3c47de` on `main`.

## About the design files
Everything in `site/` is a **design reference built in HTML** — a clickable prototype showing intended look, copy, layout, and behavior. It is **not** production code. The job is to recreate these designs inside the existing Astro codebase using its established patterns: `BaseLayout.astro`, page components in `src/components/pages/`, `SiteHeader.tsx` / `SiteFooter.tsx`, `nav.ts`, and the token stylesheet `src/styles/colors_and_type.css`.

Open `site/index.dc.html` in a browser and click through — every link resolves to another file in `site/`. Filenames map to routes (see table below).

## Fidelity
**High-fidelity.** Colors, type, spacing, radii, shadows, copy, and interactions are final. Recreate 1:1 on desktop. **Mobile is not designed** — apply the existing `mobile.css` patterns (stack grids to one column at ≤900px, header collapses to the existing burger menu, type steps down ~30% on H1/H2).

## Ground rules (SEO — non-negotiable)
1. **Every URL in the route table below must resolve 200 at the same path.** No trailing-slash changes. Internal links use the final URLs (note: current `nav.ts` has trailing slashes on service hrefs — normalize).
2. **Redirects ship in the same release as the pages**, via `astro.config.mjs` `redirects`. Full list is in `docs/alloygp-sitemap.md` §3. Key ones: `/our-approach` → `/boardsuite`; `/our-approach/board{reach,match,retain}` → `/board{reach,match,retain}`; `/about/we-know-cam` → `/about`; `/services/social-media-marketing-for-hoa-management-companies` → `/boardreach/hoa-social-media-marketing`; `/resource-hub/*` → `/resources/*`; `/resource-hub/ai-search-for-cam` → `/property-management-seo`; each `/courses/trust-building/lessons/<slug>` → `/resources/courses/trust-building#<slug>`. **Do not remove** any existing redirect in `astro.config.mjs` or `vercel.json`. No redirect chains.
3. **Dropped pages** (`/boardreach/local-pack-optimization`, `/boardreach/google-ads-ppc`) — remove routes and nav entries; add 301s to `/property-management-seo` only if GSC shows they were indexed.
4. **Titles / descriptions / canonical / schema** flow through `BaseLayout` props exactly as today. Keep the existing title pattern `[Service] for HOA Management Companies | Alloy GP` on service pages. One unique H1 per page. `pageSchema`: FAQPage on `/property-management-seo`, the three hubs, and every service page (they all have FAQ sections); Article on the two articles and the software guide; Course on trust-building.
5. Sitemap filter in `astro.config.mjs` lists only the routes in the table.
6. **Pre-launch:** crawl staging, confirm 0 new 404s and every route 200; note GSC baseline for top 20 pages.

## Route → design file map
| Route | Design file |
|---|---|
| `/` | `site/index.dc.html` |
| `/about` | `site/about.dc.html` |
| `/about/testimonials` | `site/about-testimonials.dc.html` |
| `/boardmatch` | `site/boardmatch.dc.html` |
| `/boardmatch/groundwork` | `site/boardmatch-groundwork.dc.html` |
| `/boardmatch/proposal-optimization` | `site/boardmatch-proposal-optimization.dc.html` |
| `/boardmatch/rfp-response-system` | `site/boardmatch-rfp-response-system.dc.html` |
| `/boardmatch/sales-messaging` | `site/boardmatch-sales-messaging.dc.html` |
| `/boardreach` | `site/boardreach.dc.html` |
| `/boardreach/email-marketing` | `site/boardreach-email-marketing.dc.html` |
| `/boardreach/hoa-management-branding` | `site/boardreach-hoa-management-branding.dc.html` |
| `/boardreach/hoa-social-media-marketing` | `site/boardreach-hoa-social-media-marketing.dc.html` |
| `/boardreach/hoa-website-design` | `site/boardreach-hoa-website-design.dc.html` |
| `/boardreach/print-production` | `site/boardreach-print-production.dc.html` |
| `/boardreach/property-management-lead-generation` | `site/boardreach-property-management-lead-generation.dc.html` |
| `/boardretain` | `site/boardretain.dc.html` |
| `/boardretain/annual-report-production` | `site/boardretain-annual-report-production.dc.html` |
| `/boardretain/board-education` | `site/boardretain-board-education.dc.html` |
| `/boardretain/newsletter-production` | `site/boardretain-newsletter-production.dc.html` |
| `/boardretain/reputation-management` | `site/boardretain-reputation-management.dc.html` |
| `/boardretain/thought-leadership` | `site/boardretain-thought-leadership.dc.html` |
| `/boardsuite` | `site/boardsuite.dc.html` |
| `/careers` | `site/careers.dc.html` |
| `/contact` | `site/contact.dc.html` |
| `/faq` | `site/faq.dc.html` |
| `/get-started` | `site/get-started.dc.html` |
| `/growth-modeled` | `site/growth-modeled.dc.html` |
| `/partners` | `site/partners.dc.html` |
| `/pricing` | `site/pricing.dc.html` |
| `/privacy-policy` | `site/privacy-policy.dc.html` |
| `/property-management-seo` | `site/property-management-seo.dc.html` |
| `/resources` | `site/resources.dc.html` |
| `/resources/cam-marketing-strategy` | `site/resources-cam-marketing-strategy.dc.html` |
| `/resources/courses` | `site/resources-courses.dc.html` |
| `/resources/courses/trust-building` | `site/resources-courses-trust-building.dc.html` |
| `/resources/hoa-management-software-guide` | `site/resources-hoa-management-software-guide.dc.html` |
| `/results` | `site/results.dc.html` |
| `/results/apex-cmg` | `site/results-apex-cmg.dc.html` |
| `/services` | `site/services.dc.html` |
| `/terms-conditions` | `site/terms-conditions.dc.html` |

Shared: `site/SiteHeader.dc.html`, `site/SiteFooter.dc.html`, `site/alloy-motion.js`.

## Site chrome

### Header (`SiteHeader.tsx` — rework)
- Sticky, `rgba(255,255,255,.92)` + `backdrop-filter: blur(12px)`, 1px bottom border `#e8e4ef`. Inner: max-width 1160, padding 18px 40px, logo 30px tall left, nav right.
- **Nav (4 items + CTA, replaces the current 5 mega menus):** The System ▾ · Results · Pricing · Resources · **[Claim Your Market]**. 14px/500, purple `#381c4f`; active item = pink text + 2px pink bottom border; hover = pink, 120ms. Remove the search button and "Log in" link from the header unless the client asks to keep them (not in design).
- **CTA button:** pink `#d9356e`, white, Gotham 700 12px uppercase 0.10em tracking, padding 12px 20px, radius 10. Hover `#c12a60`; press `#a82451` + translateY(1px).
- **"The System" dropdown — two-level.** Trigger on hover (and focus). Panel: absolute below header, full-width white, 4px five-color accent bar at top (pink, yellow, blue, green, purple), shadow `0 16px 40px rgba(56,28,79,.14)`. Inner grid `340px 1fr`, gap 40, padding 28px 40px 32px.
  - **Left column** (border-right 1px `#e8e4ef`): eyebrow "THREE ENGINES" (11px/700/.12em, `#555`), then three engine rows — each is an `<a>` to the hub: 10px color dot (`#d9356e` / `#b8942a` / `#3f8f83`), title 16px/700, sub 12px `#555` ("Attract · Get found before boards shop"), chevron-right 16px that fades/slides in when active. Active row bg `#f8f7fc`, radius 8, padding 12px 14px. **Hovering a row sets the active engine; on open, active resets to BoardReach.** Below: BoardSuite tile — purple bg, white, radius 10, padding 16px 14px, title 14px/700 "BoardSuite™ — all three, in unison", sub 12px 75% opacity. Hover bg `#4c3361`.
  - **Right column:** header row = "{ENGINE} · {STAGE}" eyebrow in the engine color + "Engine overview →" text link right. Then a 2-col grid (gap 8px 24px) of service links: label 15px/700 purple, sub 12.5px `#555`, padding 12px 14px, radius 8, hover bg `#f8f7fc`. Footer row (border-top): "Not sure which engine is leaking? Thirty minutes tells you." + "Claim your market →" pink link.
  - **Motion:** panel enters with `opacity 0→1, translateY(-8px)→0, scaleY(.98)→1`, 320ms `cubic-bezier(0.16,1,0.3,1)`, transform-origin top. Right pane cross-fades on engine change: `opacity 0→1, translateY(6px)→0`, 200ms `cubic-bezier(0.2,0.8,0.2,1)` (key the pane on engine id). Close has a 120ms grace delay on mouse-leave.
  - **Data:** replace the `NAV` structure in `nav.ts` with the engine/service list in `docs/nav-data.json` (this handoff). Service subtitles are final copy.

### Footer (`SiteFooter.tsx` — simplify)
Purple `#381c4f`, 6px accent bar on top. Grid `1.6fr 1fr 1fr 1fr 1fr`, gap 40, padding 56px 40px 28px, 13px. Col 1: 48px icon mark on white 10px-radius tile, "Growth engineered exclusively for CAM." 18px/700, contact block 75% opacity. Cols 2–5 headings 11px/700/.12em uppercase yellow `#f5d880`: BoardReach (7 services) · BoardMatch (4) + BoardRetain (5) stacked · Company (About, BoardSuite, All services, Testimonials, Pricing, Careers, Partners, Contact) · Resources (Resource Hub, Results, Courses, Software Guide, Growth Modeled, FAQ). Links white 90% opacity → yellow on hover. Bottom bar 11px uppercase .08em 60% opacity, border-top `rgba(255,255,255,.12)`, Terms · Privacy.

## Page templates
Six templates cover all 40 pages. Each design file is the source of truth for exact layout; the notes below are the structural contract.

### 1. Homepage — `site/index.dc.html`
Sections in order: hero (headline + copy left; **metro checker** right — ZIP input → "thinking" state ~1.6s → Available / Not available with CTA; mock geocode in the prototype, wire to a real lookup) → purple band with 3 engines → **MatchHOA metric** (3 vs 10 bars) → **partner ledger** (3 stats + drawn line chart) → "What you get in your metro" (3 engines) → latest news / webinar → CTA → footer. Reuse existing `MarketChecker.tsx` logic; restyle to design.

### 2. Engine hub — `boardreach`, `boardmatch`, `boardretain`
Hero `1.25fr .85fr`: eyebrow, H1 80px/900 (two-tone: second clause pink), 19px intro, primary + ghost CTA; right = purple "The system" card listing the 3 engines with current one highlighted in pink ("you are here"). Then "Three outcomes" — three rows (`.9fr 1.3fr`, border-bottom): 56px pink numeral, 32px/700 title, 16px body left; "WHAT BUILDS IT" eyebrow + 2-col grid of service cards right. Then purple proof band (3 stats with 3px yellow left rules), "What it costs to wait" (`#f8f7fc`), CTA bar, footer.

### 3. Service page — `property-management-seo`, all `boardreach/*`, `boardmatch/*`, `boardretain/*`
Breadcrumb (The System / Engine / Service) → hero `1.2fr .9fr` (eyebrow, H1 72–76px two-tone, 18px intro, CTAs; right = sibling-services card or, on SEO page, the map-pack mock) → purple 3-stat band → long-form prose rows (`.9fr 1.3fr`, h3 28px + 17px paragraphs, border-bottom) → "What's included" 2-col checklist (pink check icons; use Lucide `check`) → "How it works" 4 steps (pink 40px numerals, right rules) on `#f8f7fc` → FAQ list → "More in {Engine}" chip row → CTA bar → footer. Word count target 900+ (1,800+ on SEO page). **Copy is final-draft; client will review claims.**

### 4. Index pages — `boardsuite`, `services`, `pricing`, `results`, `get-started`
See files. Pricing tiers: Foundation / **Growth** (purple, "POPULAR" yellow tag) / Scale; comparison table below; four rules; FAQ. Results: 4 headline stats, two case cards with charts (line + bars), disclosure band. Get Started: form right (wire to existing `/api/lead`), 3 steps left, 30 · 90 · 1 strip.

### 5. Article / guide — `resources/*`, `results/apex-cmg`
Breadcrumb → hero `1.3fr .9fr` → body grid `300px 1fr`: sticky TOC (jump links, border-bottom rows) + purple "Want this done?" card left; article max-width 720 right, each section `id`'d with 36px pink numeral + h3 26px. Trust-building guide **must keep the old lesson slugs as section ids** (`intro`, `why-trust-signals-matter`, `what-reviews-are`, `reviews-extra-factors`, `what-testimonials-are`, `testimonials-extra-factors`, `what-case-studies-are`, `case-studies-extra-factors`, `recapping-trust-signals`, `from-proof-to-persuasion`, `knowledge-check`) so lesson redirects land on anchors. Port the existing quiz component into `#knowledge-check`.

### 6. Editorial — `about`, `about/testimonials`, `partners`, `careers`, `faq`, `contact`, `growth-modeled`, legal
Hero `1.3fr .9fr` (eyebrow, H1 76px, intro right) → content grids per file. About team bios/photos are placeholders. Growth Modeled: mount the existing `ROICalculator`/`GrowthModeledPage` tool unchanged in the placeholder box. Legal: existing copy verbatim.

## Design tokens (all in `colors_and_type.css` already)
- Purple `#381c4f` · Pink `#d9356e` (hover `#c12a60`, press `#a82451`) · Yellow `#f5d880` · Blue `#a1c8e7` · Green `#aed7d0` · Off-white `#f8f7fc` · Border `#e8e4ef` · Border-strong `#c9c1d6` · Body `#555` · Purple-90 `#4c3361`. Engine label colors on white: `#d9356e` / `#b8942a` / `#3f8f83`.
- Type: Gotham. H1 72–88px/900/.95/-.03em; H2 56px/900/1/-.025em; H3 26–28px/700; body 17px/400/1.6; small 14–15px; eyebrow 14px/700/.14em uppercase with a 28×3px colored rule left; labels 11–12px/700/.12em uppercase. Big stats 48–52px/900 with suffix (%, ×, +) at `.5em` 700.
- Layout: content max-width 1160, section padding 96px 40px (hero 104px top), grid gaps 64–80.
- Radius 10 (cards, buttons), 8 (chips, fields). Shadows: sm `0 2px 6px rgba(56,28,79,.08)`, md `0 6px 18px rgba(56,28,79,.10)`, lg `0 16px 40px rgba(56,28,79,.14)`, pink `0 8px 24px rgba(217,53,110,.25)`.
- Easing: standard `cubic-bezier(0.2,0.8,0.2,1)` 120ms hover / 200ms state; emphasis `cubic-bezier(0.16,1,0.3,1)` 320ms+ reveals.

## Hover states (site-wide)
Primary pink btn → `#c12a60`, press `#a82451` + 1px down · Dark purple btn → `#4c3361` · Secondary outlined → fills purple, white text · Text links → pink + underline offset 4px (yellow on purple) · Cards/tiles → translateY(-2px), shadow sm→md, border → `#c9c1d6` · Chips → border purple, text pink · Footer links → yellow. All 120ms standard ease.

## Motion (`alloy-motion.js` → one Astro `<script>` in BaseLayout or a small React hook)
Scroll-triggered, fires once at 30% visibility, emphasis ease, no bounces. Data-attribute contract (see file):
- `data-reveal` marks a root · `data-rise` staggers children (opacity+14px, 520ms, 90ms apart) · `data-count="535" data-prefix="+"` counts up (cubic ease-out, ≤1.6s, locale-formatted) · `data-grow="30%"` grows bar width · `data-bar-h="200px"` grows bar height · `data-draw` on an SVG polyline draws via `pathLength=1` dashoffset 1600ms · `data-pop` scales in an endpoint dot after 1.7s · `data-fade` fades a band.
Applied on: homepage MatchHOA bars + ledger, results stats/cards/charts, every purple stat band and proof strip, pricing/boardsuite tiers, get-started 30·90·1 strip. Existing `AnimatedNumber.tsx` can be extended to cover `data-count`.

## Assets
- `assets/alloy-logo-full-color.svg`, `assets/alloy-icon-1500.png` — already in `/public/assets`.
- Fonts: Gotham Book/Medium/Bold/Black woff2 — already in `/public/fonts`.
- Icons: use Lucide (`arrow-right`, `chevron-right`, `chevron-down`, `check`, `search`, `plus`). The prototype uses inline SVG equivalents and a few `→` glyphs in link text — replace glyphs with the icon per the brand guide.
- Photos: none in the design; About team photos are placeholders.

## Suggested build order
1. `nav.ts` + `SiteHeader.tsx` + `SiteFooter.tsx` (unblocks every page)
2. Service page template → build `/property-management-seo`, then clone for 15 services
3. Engine hub template → 3 hubs
4. Homepage, BoardSuite, Services, Pricing, Results, Get Started
5. Article template → 3 resources + case study; courses index; trust-building (merge lesson content from `src/data/courseTrustBuilding.ts`)
6. Editorial pages, legal, growth-modeled mount
7. Redirects + sitemap + schema audit → staging crawl → launch

## Files in this handoff
- `site/` — 42 HTML prototypes + `alloy-motion.js` (open `index.dc.html`)
- `assets/`, `fonts/` — required by the prototypes
- `docs/alloygp-sitemap.md` — the URL/redirect spec (source of truth for routes)
- `docs/page-inventory.md` — build checklist
- `docs/nav-data.json` — final header/footer link data
