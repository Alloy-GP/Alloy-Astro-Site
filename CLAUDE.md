# CLAUDE.md — Alloy Growth Partners Astro Site

This file is the authoritative reference for anyone (human or AI) working on this codebase. Read it before touching any file. Update it whenever the architecture changes.

> **Redesign branch (2026-09).** This branch (`skyleralloygp/site-redesign`) carries the full alloygp.co rebuild from the design handoff in `docs/redesign-handoff/` (README = build spec, `docs/alloygp-sitemap.md` = URL/redirect spec, `site/*.dc.html` = clickable prototypes, `OPEN-QUESTIONS.md` = decisions still owed by the client). Every indexed page has been rebuilt on the `rd-*` system described below. Nothing here has merged to `main` yet.

---

## Project Overview

**Framework:** Astro 5 with `output: 'server'` (SSR), deployed to Vercel
**React:** `@astrojs/react`; most pages render React components *statically* (no `client:` directive). Only genuinely interactive pieces hydrate as islands.
**TypeScript:** Strict mode, `exactOptionalPropertyTypes: true` — see gotchas below
**Site:** https://alloygp.co
**Routing:** File-based via `src/pages/`. No client-side router.

---

## File Tree — Annotated

```
src/
├── styles/                          # Load order (BaseLayout): colors_and_type → site → chrome → redesign → mobile
│   ├── colors_and_type.css          # FOUNDATION: CSS custom properties (colors incl. --engine-*, type, spacing, motion) + @font-face
│   ├── site.css                     # LEGACY component layer (.btn, .card, .eyebrow, .container…) — still loaded; used by landing pages + a few modules
│   ├── chrome.css                   # SITE HEADER + FOOTER (fixed header, "The System" dropdown, burger/mobile nav, footer grid)
│   ├── redesign.css                 # PAGE SYSTEM: every `rd-*` class (layout, type, buttons, cards, stat bands, FAQ, motion states…)
│   ├── mobile.css                   # ALL responsive rules (980 / 720 / 480). Never put media queries anywhere else.
│   ├── courses.css                  # legacy course styling (no longer imported by any route)
│   └── growth-portal.css            # /cam-growth-portal landing page only
│
├── lib/
│   ├── nav.ts                       # NAV DATA: PRIMARY, CTA, ENGINES (3 engines × services), BOARDSUITE_TILE, DROPDOWN_FOOTER, FOOTER + helpers
│   ├── tokens.ts                    # JS color constants (PURPLE, PINK, YELLOW, BLUE, GREEN, BLUE_DEEP, REACH_INK, MATCH_INK, RETAIN_INK, ENGINE_INK)
│   ├── motion.ts                    # Scroll-reveal runtime (data-reveal contract) — mounted once from BaseLayout
│   └── schema.ts                    # JSON-LD builders: faqSchema, breadcrumbSchema, serviceSchema, articleSchema, courseSchema
│
├── config/site.ts                   # Site-wide SEO defaults (name, URL, OG image, org schema)
│
├── data/
│   ├── services/                    # ONE file per service page (ServicePageData) — copy lifted verbatim from the prototypes
│   │   ├── types.ts                 # ServicePageData / StatItem / ProseSection / Step / Cta
│   │   ├── property-management-seo.ts, email-marketing.ts, hoa-website-design.ts, … (15 services)
│   ├── hubs/                        # ONE file per engine hub (HubPageData): boardreach.ts, boardmatch.ts, boardretain.ts (+ types.ts)
│   ├── courseTrustBuilding.ts       # Lesson + quiz content for /resources/courses/trust-building
│   └── metros.ts                    # Partner metros (claimed) + open metros for the map, lock radius, claimStatus()
│
├── layouts/
│   └── BaseLayout.astro             # <html>, <head> (SEO, fonts, analytics), SiteHeader (island), <main>, SiteFooter (static), motion <script>
│
├── components/
│   ├── chrome/
│   │   ├── SiteHeader.tsx           # Fixed header: logo · The System ▾ · Results · Pricing · Resources · [Claim your market]; two-level dropdown; mobile nav
│   │   └── SiteFooter.tsx           # Purple footer: brand col + BoardReach / BoardMatch+BoardRetain / Company / Resources + legal bar
│   │
│   ├── rd/                          # REDESIGN BUILDING BLOCKS — use these first
│   │   ├── atoms.tsx                # Eyebrow, Label, H1, SectionHead, Btn, TextLink, HeroCtas, Breadcrumb, ChipRow, StatNumber, StatBand,
│   │   │                            #   ProseRows, Checklist, Steps, FaqList, CtaBar, SiblingCard, icons (ArrowIcon, ChevronRightIcon, CheckIcon, PlusIcon)
│   │   ├── ServicePage.tsx          # Template 3 — renders a ServicePageData object (all 15 service pages)
│   │   └── HubPage.tsx              # Template 2 — renders a HubPageData object (the 3 engine hubs)
│   │
│   ├── sections/
│   │   ├── HeroStatic.astro         # Homepage hero as static HTML (LCP); takes the HeroCard island as its slot
│   │   ├── Shells.tsx               # LEGACY shells (PageHero, CtaBand, …) — still imported by landing-page code; do not use for new work
│   │
│   ├── modules/                     # Interactive islands + self-contained modules
│   │   ├── HeroCard.tsx             # Homepage hero card (client:load): outcome-tile carousel + metro check (ZIP → /api/metro, OSM map strip)
│   │   ├── NetworkLeadsChart.tsx    # Homepage "Network leads" column chart with ⓘ tooltips (client:visible)
│   │   ├── WebinarSignup.tsx        # Homepage "Save my seat" email capture (client:visible) → /api/subscribe
│   │   ├── NewsletterSignup.tsx     # /resources newsletter form (client:idle) → /api/subscribe
│   │   ├── TrustBuildingQuiz.tsx    # Knowledge check at the end of the trust-building guide (client:visible)
│   │   ├── ROICalculator.tsx        # Growth Modeled tool (unchanged)
│   │   └── GrowthPortal / BoardStart pieces live inside their landing-page components
│   │
│   ├── pages/                       # ONE component per non-templated page — content only, no layout
│   │   ├── HomePage.tsx             # /  (below the hero; islands arrive as named slots `chart` + `webinar`)
│   │   ├── BoardSuitePage.tsx       # /boardsuite            ServicesPage.tsx   # /services
│   │   ├── PricingPage.tsx          # /pricing (exports PRICING_FAQ)   ResultsPage.tsx  # /results
│   │   ├── GetStartedPage.tsx       # /get-started (default = static shell; named export GetStartedForm = island → /api/lead)
│   │   ├── ResourceHubPage.tsx      # /resources             CoursesPage.tsx    # /resources/courses
│   │   ├── CourseTrustBuildingPage.tsx  # /resources/courses/trust-building (11 anchored sections + quiz)
│   │   ├── MarketingStrategyArticle.tsx # /resources/cam-marketing-strategy
│   │   ├── HOASoftwareGuide.tsx     # /resources/hoa-management-software-guide
│   │   ├── RiseDeepCaseStudy.tsx    # /results/apex-cmg
│   │   ├── AboutPage.tsx, TestimonialsPage.tsx, PartnersPage.tsx, CareersPage.tsx, FAQPage.tsx
│   │   ├── ContactPage.tsx          # /contact (form island → /api/contact)
│   │   ├── GrowthModeledPage.tsx    # /growth-modeled (mounts ROICalculator)
│   │   ├── LegalPages.tsx           # /privacy-policy, /terms-conditions (copy verbatim)
│   │   ├── FindYourPathPage.tsx, GrowthPortalPage.tsx   # standalone landing pages (outside the redesign)
│   │
│   ├── AccentBar.tsx, AnimatedNumber.tsx, Button.tsx, EngineLoop.tsx, Eyebrow.tsx, Icon.tsx, PillarMark.tsx, Tag.tsx  # legacy atoms (Icon still used)
│
└── pages/                           # Astro routes — thin shells
    ├── index.astro                  → HeroStatic + HeroCard island, HomePage + NetworkLeadsChart/WebinarSignup slots
    ├── boardsuite.astro, services.astro, pricing.astro, results.astro, get-started.astro
    ├── about.astro, about/testimonials.astro, partners.astro, careers.astro, faq.astro, contact.astro, growth-modeled.astro
    ├── privacy-policy.astro, terms-conditions.astro, 404.astro
    ├── property-management-seo.astro            → ServicePage (data: property-management-seo)
    ├── boardreach/index.astro                   → HubPage (data: hubs/boardreach)
    ├── boardreach/{hoa-website-design,hoa-management-branding,hoa-social-media-marketing,email-marketing,property-management-lead-generation,print-production}.astro
    ├── boardmatch/index.astro                   → HubPage (hubs/boardmatch)
    ├── boardmatch/{groundwork,proposal-optimization,rfp-response-system,sales-messaging}.astro
    ├── boardretain/index.astro                  → HubPage (hubs/boardretain)
    ├── boardretain/{board-education,newsletter-production,reputation-management,thought-leadership,annual-report-production}.astro
    ├── resources/index.astro, resources/cam-marketing-strategy.astro, resources/hoa-management-software-guide.astro
    ├── resources/courses/index.astro, resources/courses/trust-building.astro
    ├── results/apex-cmg.astro
    ├── boardstart.astro, cam-growth-portal.astro, find-your-path.astro   # landing pages (hideHeader/hideFooter), untouched by the redesign
    └── api/ {lead,contact,subscribe,metro,ping,thinktank}.ts             # endpoints
```

**Retired in the redesign (now 301s in `astro.config.mjs`):** `/our-approach*`, `/we-know-cam`, `/about/we-know-cam`, `/resource-hub*`, `/courses*` (10 lessons + quiz), `/services/social-media-marketing-for-hoa-management-companies`, `/services/hoa-newsletter-production`, `/hoa-cam-marketing-services`, `/groundwork`, `/hoa-board-education-programs`, `/strategic-review-request`, `/boardreach/local-pack-optimization`, `/boardreach/google-ads-ppc`, `/results/rise-amg`.

---

## Page Templates (from the handoff)

| # | Template | Where |
|---|---|---|
| 1 | Homepage | `HeroStatic.astro` + `HomePage.tsx` |
| 2 | Engine hub | `rd/HubPage.tsx` + `data/hubs/*.ts` |
| 3 | Service page | `rd/ServicePage.tsx` + `data/services/*.ts` |
| 4 | Index pages | `BoardSuitePage`, `ServicesPage`, `PricingPage`, `ResultsPage`, `GetStartedPage` |
| 5 | Article / guide | `ResourceHubPage`, `MarketingStrategyArticle`, `HOASoftwareGuide`, `CoursesPage`, `CourseTrustBuildingPage`, `RiseDeepCaseStudy` |
| 6 | Editorial | `AboutPage`, `TestimonialsPage`, `PartnersPage`, `CareersPage`, `FAQPage`, `ContactPage`, `GrowthModeledPage`, `LegalPages` |

### Adding a service page
1. Add the service to the right engine in `src/lib/nav.ts` (`ENGINES[].services`) — this drives the header dropdown, footer, breadcrumbs, sibling card and "More in {Engine}" chips.
2. Create `src/data/services/<slug>.ts` exporting a `ServicePageData` (see `property-management-seo.ts` as the exemplar; `h1` / `h1Accent` / optional `h1Tail` split the two-tone headline).
3. Create `src/pages/<engine>/<slug>.astro` modeled on `src/pages/property-management-seo.astro`: `pageId="system"`, `pageSchema=[faqSchema, serviceSchema, breadcrumbSchema]`, `<ServicePage data={data} />` with **no** client directive.
4. Add the route to `SITEMAP_ROUTES` in `astro.config.mjs`.

### Adding any other page
Build the component in `src/components/pages/` from `rd-*` classes and `rd/atoms`, following `BoardSuitePage.tsx` / `ServicesPage.tsx`. Route shell:

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import YourPage from '~/components/pages/YourPage';
---
<BaseLayout title="…" description="…" pageId="system">
  <YourPage />            <!-- static; add an island only for interactive parts -->
</BaseLayout>
```

Islands inside a static page component are passed as `children` from the route (`<YourPage><Form client:load /></YourPage>`).

**`pageId`** values: `home` · `system` (services, hubs, boardsuite, get-started) · `results` · `pricing` · `resources` · omit for About/Contact/FAQ/legal. (Legacy values `services`/`boardsuite`/`approach` still map to `system`.)

---

## Design System

### Tokens (`colors_and_type.css`, mirrored in `lib/tokens.ts`)
Brand: `--alloy-purple #381c4f` · `--alloy-purple-deep #290d41` · `--alloy-pink #d9356e` (hover `#c12a60`, press `#a82451`) · `--alloy-yellow #f5d880` · `--alloy-blue #a1c8e7` · `--alloy-green #aed7d0` · off-white `#f8f7fc` · border `#e8e4ef` · border-strong `#c9c1d6` · body `#555` · purple-90 `#4c3361`.
**Engine ink (readable on white):** `--engine-reach #d9356e` · `--engine-match #b8942a` · `--engine-retain #3f8f83`. **Success:** `--success #16a34a` (hover `#15803d`). **Map base:** `--map-base #2a1440`.
Radius 10 (cards, buttons) / 8 (chips, fields). Shadows `--shadow-sm/md/lg/pink`. Easing `--ease-standard` (120ms hover / 200ms state), `--ease-emphasis` (320ms+ reveals).

### Heavy weight rule
The handoff specifies Gotham **900**. This site maps 800 → Gotham-Black and 900 → Gotham-Ultra, so every "900" in the design is **800** here (`.rd-h1`, `.rd-h2`, `.rd-numeral`, `.rd-stat-num` already do this). Never write `font-weight: 900`.

### `rd-*` class system (`redesign.css`) — the short list
- **Layout:** `.rd-wrap` (1160 + 40px gutters) · `.rd-section` (96px) `--hero` (104 top) `--tight` (56) `--band` (88) `--flush` · `.rd-bg-off` `.rd-bg-purple` · `.rd-grid` + `--hero` (1.2fr .9fr) `--hero-wide` (1.3fr .9fr) `--hub` (1.25fr .85fr) `--prose` (.9fr 1.3fr) `--article` (300px 1fr) `--2/--3/--4` `--end` · `.rd-stack--6…48` · `.rd-row(--between/--wrap)`
- **Type:** `.rd-h1` 76 (`--xl` 90, `--lg` 80, `--md` 72, `--sm` 56) · `.rd-h2` 56 (`--sm` 40) · `.rd-h3` 28 (`--sm` 26, `--lg` 32) · `.rd-h4` 20 · `.rd-intro` 18 (`--lg` 20, `--19`) · `.rd-body` 17 · `.rd-small` 15 (`--14`) · `.rd-tiny` 13 (`--12`) · `.rd-eyebrow` (+ `--purple/--yellow/--gray/--reach/--match/--retain`, `--noline`) · `.rd-label` 11 (`--12`, tones) · `.rd-numeral` 40 (`--56/--36`, tones) · `.rd-stat-num` 48 (`--52/--40`) + `.rd-stat-suffix` · `.rd-accent` (pink span)
- **Actions:** `.rd-btn` (+ `--dark --outline --white --yellow --sm --xs --block --inline`) · `.rd-link` (+ `--pink --white --12 --11 --pad`) · `.rd-a` (inline link) · `.rd-chip(s)`
- **Surfaces:** `.rd-card` (+ `--pad --pad-lg --pad-sm --off --purple --hover`) · `.rd-panel-dark` · `.rd-inset` · `.rd-tile` · `.rd-tag` · `.rd-dot` · rules `.rd-rule-top/-bottom/-right`, `.rd-divider`
- **Blocks:** `.rd-breadcrumb` · `.rd-statband(--4)` + `.rd-stat` · `.rd-prose-row` · `.rd-outcome` · `.rd-service-cards/.rd-builds` · `.rd-checklist` + `.rd-check` · `.rd-steps(--3)` + `.rd-step` · `.rd-threeup(--dark)` · `.rd-faq` (static list or `<details>` accordion) · `.rd-cta-bar` · `.rd-table(-wrap)` · `.rd-field(-label/-group)` · `.rd-article`, `.rd-toc` · `.rd-aside-card`, `.rd-system-card`, `.rd-proof`, `.rd-engine-tile`, `.rd-pill-link`, `.rd-tiers`, `.rd-bullets`, `.rd-services-grid`, homepage pieces (`.rd-metro`, `.rd-map*`, `.rd-ledger*`, `.rd-news-*`, `.rd-webinar`)
- **Hover states (site-wide):** pink btn → `#c12a60`, press `#a82451` + 1px down · dark btn → purple-90 · outline → fills purple · text links → pink + underline offset 4px (yellow on purple) · cards → translateY(-2px) + shadow-md + border-strong · chips → purple border, pink text · footer links → yellow.

**Light sections:** every off-white `<section class="rd-bg-off">` (alias `.section-light`) carries the textured treatment — grain, 2px five-color rule, purple wash — from layered `background-image`s; an off-white block directly following another keeps only the grain. Don't stack an off-white spacer above an off-white section unless you want that behavior.

Mobile is not designed; `mobile.css` collapses every `rd-grid--*` to one column ≤980px, steps type down (H1 → 54 / 42 / 36), stacks stat bands and steps, and makes tables scroll. Prefer `rd-grid--*` classes over inline `gridTemplateColumns` so grids stack.

---

## Motion contract (`lib/motion.ts` + `redesign.css`)

Mark a root with `data-reveal`; it fires once at 30% visibility (IntersectionObserver; MutationObserver picks up late islands; `prefers-reduced-motion` skips animation).
- `data-rise` / `data-stagger` — children fade + rise in sequence (may sit on the root itself or a descendant)
- `data-count="535" data-prefix="+" data-suffix="%"` — count-up; **render the final text server-side**
- `data-grow` + inline `--grow: 30%` (optional `--grow-delay`) — bar width · `data-bar-h` + `--bar-h` — bar height
- `data-draw` on an SVG path/polyline **with `pathLength="1"`** — draws in · `data-pop` — scales in after · `data-fade` — fades in late
States are CSS classes (`.am-prep`, `.am-in`) so React hydration can't wipe them.

---

## Chrome

**Header (`SiteHeader.tsx`, island `client:load`):** fixed, white 92% + blur, 67px tall (`body.has-fixed-header` pads for it). Nav from `nav.ts` `PRIMARY` + `CTA`. "The System" opens on hover/focus, resets to BoardReach on open, closes 120ms after mouse-leave or on Escape; right pane is keyed on engine for the cross-fade. ≤980px: burger → full-screen `.site-mobile-nav` with per-engine accordions. No search, no login (dropped per design; see OPEN-QUESTIONS §3).
**Footer (`SiteFooter.tsx`, static):** columns from `nav.ts` (`ENGINES` + `FOOTER`). Uses `alloy-logomark.svg` (not the 215 KB PNG).

---

## SEO rules (non-negotiable)

- Every canonical route must return 200 at the same path, no trailing slash. Internal links use final URLs.
- **Titles/descriptions on existing URLs are unchanged** from the pre-redesign site (zero regression). New routes (`/boardmatch`, `/boardretain`) use the prototype titles.
- Schema via `pageSchema`: FAQPage wherever a FAQ is visible; Service + BreadcrumbList on service pages; Article on articles + software guide; Course on trust-building. Never emit FAQ schema for Q&As that aren't rendered.
- Redirects live in `astro.config.mjs` (146 rules, no chains, no removed rules — legacy targets were re-pointed to final URLs). Wildcards stay in `vercel.json`. A redirect and a page must never share a path.
- Sitemap = `SITEMAP_ROUTES` allowlist in `astro.config.mjs`. Add new routes there.
- Pre-launch: crawl the preview, confirm every canonical route 200 and every legacy path 301 to a 200.

---

## BaseLayout Props

```typescript
interface Props {
  title: string; description: string;
  pageId?: string | null;           // home | system | results | pricing | resources | null
  headerTheme?: 'light' | 'purple'; // accepted, ignored (single header theme)
  animatedBar?: boolean;            // footer accent bar pulse; default true
  hideHeader?: boolean; hideFooter?: boolean;   // landing pages
  ogType?: 'website' | 'article'; ogImage?: string; robots?: string;
  pageSchema?: Record<string, unknown> | Record<string, unknown>[];
}
```

---

## TypeScript Gotchas

**`exactOptionalPropertyTypes: true`** — never pass `prop={maybeUndefined}`; use a conditional spread: `<C {...(x ? { x } : {})} />`. Data files must omit optional keys rather than set `undefined`.
**CSS variables in style props:** `style={{ ['--grow' as string]: '30%' } as CSSProperties}`.
**Import alias:** always `~/` for `src/`.

---

## Brand Vocabulary (CAM/HOA Industry)

**boards** (not clients/customers) · **associations / communities** (not properties) · **CAM companies / management firms** · **win more boards / retain associations** · **portfolio** · **managers**. Engines: **BoardReach™ (Attract)** · **BoardMatch™ (Close)** · **BoardRetain™ (Keep)**; **BoardSuite™** = all three.

---

## Rules for AI Tools

- Build new pages from `rd-*` classes and `rd/atoms`; extend `redesign.css` (desktop) + `mobile.css` (responsive) rather than adding inline one-offs. Don't create parallel class systems.
- Service pages are **data**, not components: edit `src/data/services/*.ts`.
- Keep existing titles/descriptions unless the change is deliberate SEO work.
- Landing pages (`/boardstart`, `/cam-growth-portal`, `/find-your-path`) are self-contained; leave them alone.
- Don't run `pkill -f` patterns that appear in your own shell command (it kills the shell). Kill Chrome with `killall chrome`.
- Screenshots: `node .context/shot.mjs <url> <out.png> [w] [h] [full 0|1]` (CDP; needs the dev server on :4321).
- Update this file's tree + changelog when routes or shared pieces change; log client decisions in `docs/redesign-handoff/OPEN-QUESTIONS.md`.

---

## Changelog

| Date | Change |
|---|---|
| 2026-05 → 2026-09-22 | Pre-redesign history (initial Astro site, service pages, sitemap plugin, LCP fixes, Match HOA backlinks) — see git log on `main`. |
| 2026-09-24 | **Homepage update** from `docs/redesign-handoff-homepage/`: new hero outcomes card (`HeroCard.tsx` — two-page tile carousel + 150px metro map strip with metro dots, pin drop, result pill; replaces `MetroChecker.tsx`), Network-leads column chart with tooltips (`NetworkLeadsChart.tsx`) replacing the MatchHOA bars, ledger copy/chart to Year 1→3, textured light sections site-wide, `--success` token, shared `data/metros.ts` used by `/api/metro`. Hero grid 1.1fr/1fr. Off-white spacers folded into CTA sections in `ServicePage`/`HubPage`. |
| 2026-09-23 | **Site redesign build (branch `skyleralloygp/site-redesign`).** Added `docs/redesign-handoff/` (prototypes + specs + OPEN-QUESTIONS). New `nav.ts` data model (4-item nav, engines/services). Rewrote `SiteHeader`/`SiteFooter` + `chrome.css`. Added `redesign.css` (`rd-*` system), `lib/motion.ts`, `lib/schema.ts`, engine ink tokens, chevron icons. Added `rd/atoms.tsx`, `rd/ServicePage.tsx`, `rd/HubPage.tsx`; 15 service data files + 3 hub data files. Rebuilt all 40 canonical pages; new `/boardmatch`, `/boardretain`, `/boardreach/hoa-social-media-marketing`, `/resources/cam-marketing-strategy`. Homepage: static hero + `MetroChecker` (new `/api/metro`, Zippopotam + prefix fallback, 30-mi lock radius) + `WebinarSignup`. Trust-building course collapsed to one anchored guide + `TrustBuildingQuiz`. `astro.config.mjs`: sitemap allowlist, 146 chain-free redirects, dropped `/boardmatch` redirect. Deleted 20 legacy routes and 36 unused components. |
