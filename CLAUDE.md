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
│   ├── mobile.css                   # ALL responsive rules (980 / 720 / 480) — contract: docs/redesign-handoff/docs/mobile-spec.md. Never put media queries anywhere else.
│   ├── courses.css                  # legacy course styling (no longer imported by any route)
│   └── growth-portal.css            # /cam-growth-portal landing page only
│
├── lib/
│   ├── nav.ts                       # NAV DATA: PRIMARY, CTA, LOGIN (growth.alloygp.co), ENGINES (3 engines × services), BOARDSUITE_TILE, DROPDOWN_FOOTER, MOBILE_*, FOOTER + helpers
│   ├── search-index.ts              # SEARCH_INDEX (services/hubs from nav.ts + static pages) + searchIndex(query) scorer
│   ├── tokens.ts                    # JS color constants (PURPLE, PINK, YELLOW, BLUE, GREEN, BLUE_DEEP, REACH_INK, MATCH_INK, RETAIN_INK, ENGINE_INK)
│   ├── motion.ts                    # Scroll-reveal runtime (data-reveal contract) — mounted once from BaseLayout
│   ├── mobile.ts                    # ≤720 enhancements (footer accordions, sticky CTA bar observers, article TOC bar + progress) — mounted from BaseLayout
│   ├── hero-map.ts                  # homepage map reacts to the metro check: listens for `alloy:metro` (from MetroCheck) → zoom/fade while checking, swap in /api/map image for the metro, pin label "Your Company · City" — mounted from BaseLayout
│   ├── dialog.ts                    # native <dialog> modals: [data-dialog=id] opens, [data-dialog-close]/backdrop/Esc close — mounted from BaseLayout
│   ├── map-tiles.ts                 # SERVER: renderMetroMap(lat,lng) — stitches OSM z12 tiles → grayscale/lifted → cream (#fdfbf5) multiply WebP (sharp); used by /api/map and .context/gen-map.mjs
│   ├── newsletters.ts               # SERVER: Mailchimp campaign archive → NewsletterIssue[] (getAllIssues / getRecentIssues, 10-min cache)
│   ├── newsletter-issue.ts          # client-safe NewsletterIssue type + formatIssueDate
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
│   └── metros.ts                    # Partner offices (20 addresses from the client, 2026-10-02; claimed = within 15 mi) + open metros, claimStatus() — used by /api/metro
│
├── layouts/
│   └── BaseLayout.astro             # <html>, <head> (SEO, fonts, analytics), SiteHeader (island), <main>, SiteFooter (static), motion <script>
│
├── components/
│   ├── chrome/
│   │   ├── SiteHeader.tsx           # Fixed header: logo · The System ▾ · Results · Pricing · Resources · search · Log in ↗ · [Claim your market]; two-level dropdown; mobile panel
│   │   ├── SiteSearch.tsx           # Header search: icon button (desktop) / row (mobile panel) + native <dialog>; ⌘K, ↑↓↵; index from lib/search-index.ts
│   │   └── SiteFooter.tsx           # Purple footer: brand col + BoardReach / BoardMatch+BoardRetain / Company / Resources + legal bar
│   │
│   ├── rd/                          # REDESIGN BUILDING BLOCKS — use these first
│   │   ├── atoms.tsx                # Eyebrow, Label, H1, SectionHead, Btn, TextLink, HeroCtas, Breadcrumb, ChipRow, StatNumber, StatBand,
│   │   │                            #   ProseRows, Checklist, Steps, FaqList, CtaBar, SiblingCard, icons (ArrowIcon, ChevronRightIcon, CheckIcon, PlusIcon)
│   │   ├── ServicePage.tsx          # Template 3 — renders a ServicePageData object (all 15 service pages)
│   │   └── HubPage.tsx              # Template 2 — renders a HubPageData object (the 3 engine hubs)
│   │
│   ├── sections/
│   │   ├── HeroStatic.astro         # Homepage hero wrapper (static): the HeroMap slot IS the hero
│   │   ├── Shells.tsx               # LEGACY shells (PageHero, CtaBand, …) — still imported by landing-page code; do not use for new work
│   │
│   ├── modules/                     # Interactive islands + self-contained modules
│   │   ├── HeroMap.tsx              # Homepage hero 7a v2 (STATIC): copy + metro card (MetroCheck slot + guarantee row) | cream street map (`.rd-hm-map-layer` zooms/re-centres via lib/hero-map.ts) with Google / ChatGPT / referral callouts pointing at the #1 pin; guarantee-terms <dialog>; exports Glyph + GuaranteeBadge
│   │   ├── MetroCheck.tsx           # Metro card header band + one fixed 58px row (client:load island inside HeroMap): Idle field → Checking (spinner, pill CHECKING) → Result Open (Get my report → /contact?metro&intent=report) / Claimed (Join waitlist) + reset; unknown input = Open; dispatches `alloy:metro`
│   │   ├── NetworkLeadsChart.tsx    # Homepage "Network leads" column chart with ⓘ tooltips (client:visible)
│   │   ├── NewsletterSignup.tsx     # Alloy Briefing form (client:idle) → /api/subscribe; on /resources (source resources-page) and the homepage (`newsletter` slot, source home-page)
│   │   ├── TrustBuildingQuiz.tsx    # Knowledge check at the end of the trust-building guide (client:visible)
│   │   ├── ROICalculator.tsx        # Growth Modeled tool (unchanged)
│   │   └── GrowthPortal / BoardStart pieces live inside their landing-page components
│   │
│   ├── pages/                       # ONE component per non-templated page — content only, no layout
│   │   ├── HomePage.tsx             # /  (below the hero; the chart island arrives as named slot `chart`)
│   │   ├── BoardSuitePage.tsx       # /boardsuite            ServicesPage.tsx   # /services
│   │   ├── PricingPage.tsx          # /pricing (exports PRICING_FAQ)   ResultsPage.tsx  # /results
│   │   ├── ResourceHubPage.tsx      # /resources (recent issues via `issues` prop)   CoursesPage.tsx  # /resources/courses
│   │   ├── NewsletterArchivePage.tsx # /resources/newsletter — every sent issue, by year, 24/page (?page=N)
│   │   ├── CourseTrustBuildingPage.tsx  # /resources/courses/trust-building (11 anchored sections + quiz)
│   │   ├── MarketingStrategyArticle.tsx # /resources/cam-marketing-strategy
│   │   ├── AISearchArticle.tsx      # /resources/ai-search-for-cam (restored live article, copy verbatim)
│   │   ├── HOASoftwareGuide.tsx     # /resources/hoa-management-software-guide
│   │   ├── RiseDeepCaseStudy.tsx    # /results/apex-cmg
│   │   ├── AboutPage.tsx, TestimonialsPage.tsx, PartnersPage.tsx, CareersPage.tsx, FAQPage.tsx
│   │   ├── ContactPage.tsx          # /contact — THE "Claim your market" destination (form island → /api/contact; prefills ?metro= & ?intent=report|claim|waitlist → topic "Get my market report" / "Claim my market")
│   │   ├── GrowthModeledPage.tsx    # /growth-modeled (mounts ROICalculator)
│   │   ├── LegalPages.tsx           # /privacy-policy, /terms-conditions (copy verbatim)
│   │   ├── FindYourPathPage.tsx, GrowthPortalPage.tsx   # standalone landing pages (outside the redesign)
│   │
│   ├── AccentBar.tsx, AnimatedNumber.tsx, Button.tsx, EngineLoop.tsx, Eyebrow.tsx, Icon.tsx, PillarMark.tsx, Tag.tsx  # legacy atoms (Icon still used)
│
└── pages/                           # Astro routes — thin shells
    ├── index.astro                  → HeroStatic › HeroMap › MetroCheck island; HomePage + NetworkLeadsChart (`chart`) + NewsletterSignup (`newsletter`) slots
    ├── boardsuite.astro, services.astro, pricing.astro, results.astro
    ├── about.astro, about/testimonials.astro, partners.astro, careers.astro, faq.astro, contact.astro, growth-modeled.astro
    ├── privacy-policy.astro, terms-conditions.astro, 404.astro
    ├── property-management-seo.astro            → ServicePage (data: property-management-seo)
    ├── boardreach/index.astro                   → HubPage (data: hubs/boardreach)
    ├── boardreach/{hoa-website-design,hoa-management-branding,hoa-social-media-marketing,email-marketing,property-management-lead-generation,print-production}.astro
    ├── boardmatch/index.astro                   → HubPage (hubs/boardmatch)
    ├── boardmatch/{groundwork,proposal-optimization,rfp-response-system,sales-messaging}.astro
    ├── boardretain/index.astro                  → HubPage (hubs/boardretain)
    ├── boardretain/{board-education,newsletter-production,reputation-management,thought-leadership,annual-report-production}.astro
    ├── resources/index.astro (fetches getRecentIssues), resources/newsletter.astro (getAllIssues, paginated), resources/cam-marketing-strategy.astro, resources/ai-search-for-cam.astro, resources/hoa-management-software-guide.astro
    ├── resources/courses/index.astro, resources/courses/trust-building.astro
    ├── results/apex-cmg.astro
    ├── boardstart.astro, cam-growth-portal.astro, find-your-path.astro   # landing pages (hideHeader/hideFooter, noindex, not in sitemap/nav — client 2026-10-01), untouched by the redesign
    └── api/ {lead,contact,subscribe,metro,map,newsletters,ping,thinktank}.ts # endpoints (map: ?lat&lng → 768px muted street-map WebP, CDN-cached 30d; metro: ?q= ZIP | "City, ST" | city via Zippopotam/Nominatim; newsletters: issues JSON; ?raw=1 diagnostics)
```

**Retired in the redesign (now 301s in `astro.config.mjs`):** `/our-approach*`, `/we-know-cam`, `/about/we-know-cam`, `/resource-hub*`, `/courses*` (10 lessons + quiz), `/services/social-media-marketing-for-hoa-management-companies`, `/services/hoa-newsletter-production`, `/hoa-cam-marketing-services`, `/groundwork`, `/hoa-board-education-programs`, `/strategic-review-request`, `/boardreach/local-pack-optimization`, `/results/rise-amg`, and (2026-10-01) **`/get-started` → `/contact`** — every "Claim your market" CTA now points at `/contact`.

---

## Page Templates (from the handoff)

| # | Template | Where |
|---|---|---|
| 1 | Homepage | `HeroStatic.astro` + `modules/HeroMap.tsx` (+ `MetroCheck` island) + `HomePage.tsx` |
| 2 | Engine hub | `rd/HubPage.tsx` + `data/hubs/*.ts` |
| 3 | Service page | `rd/ServicePage.tsx` + `data/services/*.ts` |
| 4 | Index pages | `BoardSuitePage`, `ServicesPage`, `PricingPage`, `ResultsPage` |
| 5 | Article / guide | `ResourceHubPage`, `MarketingStrategyArticle`, `AISearchArticle`, `HOASoftwareGuide`, `CoursesPage`, `CourseTrustBuildingPage`, `RiseDeepCaseStudy` |
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

Islands inside a static page component are passed as `children` from the route (`<YourPage><Form client:load /></YourPage>`, e.g. `<HeroMap><MetroCheck client:load /></HeroMap>`).

**`pageId`** values: `home` · `system` (services, hubs, boardsuite) · `results` · `pricing` · `resources` · omit for About/Contact/FAQ/legal. (Legacy values `services`/`boardsuite`/`approach` still map to `system`.)

---

## Design System

### Tokens (`colors_and_type.css`, mirrored in `lib/tokens.ts`)
Brand: `--alloy-purple #381c4f` · `--alloy-purple-deep #290d41` · `--alloy-pink #d9356e` (hover `#c12a60`, press `#a82451`) · `--alloy-yellow #f5d880` · `--alloy-blue #a1c8e7` · `--alloy-green #aed7d0` · off-white `#f8f7fc` · border `#e8e4ef` · border-strong `#c9c1d6` · body `#555` · purple-90 `#4c3361`.
**Engine ink (readable on white):** `--engine-reach #d9356e` · `--engine-match #b8942a` · `--engine-retain #3f8f83`. **Success:** `--success #16a34a` (hover `#15803d`). **Hero card 2b:** `--alloy-gold #f2d98a` (fill) · `--alloy-gold-ink #b8902a` (text on white) · `--alloy-lavender #f3f0f8` · `--alloy-muted-ink #8c7a9e` · `--alloy-on-purple #d9cce6` · `--live #2f9e85`.
Radius 10 (cards, buttons) / 8 (chips, fields). Shadows `--shadow-sm/md/lg/pink`. Easing `--ease-standard` (120ms hover / 200ms state), `--ease-emphasis` (320ms+ reveals).

### Heavy weight rule
The handoff specifies Gotham **900**. This site maps 800 → Gotham-Black and 900 → Gotham-Ultra, so every "900" in the design is **800** here (`.rd-h1`, `.rd-h2`, `.rd-numeral`, `.rd-stat-num` already do this). Never write `font-weight: 900`.

### `rd-*` class system (`redesign.css`) — the short list
- **Layout:** `.rd-wrap` (1160 + 40px gutters) · `.rd-section` (96px) `--hero` (104 top) `--tight` (56) `--band` (88) `--flush` · `.rd-bg-off` `.rd-bg-purple` · `.rd-grid` + `--hero` (1.2fr .9fr) `--hero-wide` (1.3fr .9fr) `--hub` (1.25fr .85fr) `--prose` (.9fr 1.3fr) `--article` (300px 1fr) `--2/--3/--4` `--end` · `.rd-stack--6…48` · `.rd-row(--between/--wrap)`
- **Type:** `.rd-h1` 76 (`--xl` 90, `--lg` 80, `--md` 72, `--sm` 56) · `.rd-h2` 56 (`--sm` 40) · `.rd-h3` 28 (`--sm` 26, `--lg` 32) · `.rd-h4` 20 · `.rd-intro` 18 (`--lg` 20, `--19`) · `.rd-body` 17 · `.rd-small` 15 (`--14`) · `.rd-tiny` 13 (`--12`) · `.rd-eyebrow` (+ `--purple/--yellow/--gray/--reach/--match/--retain`, `--noline`) · `.rd-label` 11 (`--12`, tones) · `.rd-numeral` 40 (`--56/--36`, tones) · `.rd-stat-num` 48 (`--52/--40`) + `.rd-stat-suffix` · `.rd-accent` (pink span)
- **Actions:** `.rd-btn` (+ `--dark --outline --white --yellow --sm --xs --block --inline`) · `.rd-link` (+ `--pink --white --12 --11 --pad`) · `.rd-a` (inline link) · `.rd-chip(s)`
- **Surfaces:** `.rd-card` (+ `--pad --pad-lg --pad-sm --off --purple --hover`) · `.rd-panel-dark` · `.rd-inset` · `.rd-tile` · `.rd-tag` · `.rd-dot` · rules `.rd-rule-top/-bottom/-right`, `.rd-divider`
- **Blocks:** `.rd-breadcrumb` · `.rd-statband(--4)` + `.rd-stat` · `.rd-prose-row` · `.rd-outcome` · `.rd-service-cards/.rd-builds` · `.rd-checklist` + `.rd-check` · `.rd-steps(--3)` + `.rd-step` · `.rd-threeup(--dark)` · `.rd-faq` (static list or `<details>` accordion) · `.rd-cta-bar` · `.rd-table(-wrap)` · `.rd-field(-label/-group)` · `.rd-article`, `.rd-toc` · `.rd-aside-card`, `.rd-system-card`, `.rd-proof`, `.rd-engine-tile`, `.rd-pill-link`, `.rd-tiers`, `.rd-bullets`, `.rd-services-grid`, homepage pieces (`.rd-metro`, `.rd-map*`, `.rd-ledger*`, `.rd-news-*`, `.rd-webinar`)
- **Card links:** a card that navigates is the `<a>` itself — `.rd-card-link` (lift −2px, shadow-md, inner `.rd-link` label turns pink) with `LinkLabel` for the "Read →" text. Never nest an `<a>` inside a card link.
- **Hover states (site-wide):** pink btn → `#c12a60`, press `#a82451` + 1px down · dark btn → purple-90 · outline → fills purple · text links → pink + underline offset 4px (yellow on purple) · cards → translateY(-2px) + shadow-md + border-strong · chips → purple border, pink text · footer links → yellow.

**Light sections:** every off-white `<section class="rd-bg-off">` (alias `.section-light`) carries the textured treatment — grain, 2px five-color rule, purple wash — from layered `background-image`s; an off-white block directly following another keeps only the grain. Don't stack an off-white spacer above an off-white section unless you want that behavior.

**Mobile** follows `docs/redesign-handoff/docs/mobile-spec.md` (prototype: `site/Mobile Spec.dc.html`). ≤980: header becomes a 60px bar with a compact "Claim" CTA + 44px burger → full-height panel (two-level System accordion, System + BoardReach open by default, About · Contact · FAQ row, pinned CTA); every `rd-grid--*` collapses to one column. ≤720: gutters 20, sections 56 (hero 48), H1 42–46 / H2 34 / H3 23 / body 16, buttons full-width, inputs 16px, stat bands 2-col (lone third stat spans; `.rd-statband--compact` stays 3-up), steps 2×2, chips + secondary news cards become edge-bleed snap rails, breadcrumbs collapse to one "‹ Parent" link (`.rd-breadcrumb-parent`), hub system card → 3-up tiles, build cards → rows, the map hero stacks (copy → metro card → 460–520px map with callouts pulled inside), tiers stack with the popular one first, compare tables scroll with a sticky first column, footer columns → accordions, the article TOC → sticky "On this page · n of N" bar (`lib/mobile.ts`), and a pink sticky "Claim your market" bar appears after the hero CTA scrolls away (hidden near forms/footer; never on /get-started, /contact). Hooks: `rd-network`, `rd-news-rail`, `rd-threeup--engines`, `rd-grid--stats`, `rd-grid--team`, `rd-form-grid`, `rd-gs-hero`, `rd-compare-card`. Prefer `rd-grid--*` classes over inline `gridTemplateColumns` so grids stack. QA: `node .context/mobile-qa.mjs <url> 390 844 [out.png]` (overflow / <16px inputs / small tap targets); `node .context/eval.mjs <url> <w> <h> "<js>"` evaluates JS in headless Chrome.

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

**Header (`SiteHeader.tsx`, island `client:load`):** fixed, white 92% + blur, 67px tall (`body.has-fixed-header` pads for it). Nav from `nav.ts` `PRIMARY` + `CTA`. "The System" opens on hover/focus, resets to BoardReach on open, closes 120ms after mouse-leave or on Escape; right pane is keyed on engine for the cross-fade. ≤980px: burger → full-screen `.site-mobile-nav` with per-engine accordions. Search (icon → `<dialog>`, ⌘K) and the partner-portal **Log in** link (growth.alloygp.co, new tab, icon + text with `flex: none` so it never clips) were restored 2026-10-01 at the client's request; ≤980 both live in the panel (search row on top, Log in in the secondary row).
**Footer (`SiteFooter.tsx`, static):** columns from `nav.ts` (`ENGINES` + `FOOTER`). Uses `alloy-logomark.svg` (not the 215 KB PNG).

---

## SEO rules (non-negotiable)

- Every canonical route must return 200 at the same path, no trailing slash. Internal links use final URLs.
- **Titles/descriptions on existing URLs are unchanged** from the pre-redesign site (zero regression). New routes (`/boardmatch`, `/boardretain`) use the prototype titles. **One deliberate exception (client, 2026-10-01):** the homepage title/description now target "marketing for HOA management companies" (`Marketing for HOA Management Companies | Alloy Growth Partners`); the H1 is the hero question with "HOA management company" in it.
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
**Sticky positioning:** never put `overflow` on `<body>` (only `html { overflow-x: hidden }`) — a non-visible overflow on body turns it into the scroll container and silently kills every `position: sticky` (article TOCs, mobile TOC bar). Fixed 2026-10-01.

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
- **Pre-launch sweep:** `node .context/launch-audit.mjs [stg] [live]` — live-sitemap URLs → 200/one-hop 301, title/description/word-count regression vs live, every redirect rule, internal links, images, H1 count, canonical, JSON-LD validity, FAQ schema ↔ visible FAQ, duplicates, favicons/og. Mobile: loop `.context/mobile-qa.mjs` over `SITEMAP_ROUTES`.
- **Staging:** `stg.alloygp.co` is bound to the `staging` branch; `dev.alloygp.co` to `skyleralloygp/site-redesign`. After every push to the redesign branch also run `git push origin skyleralloygp/site-redesign:staging` (fast-forward; `staging` was merged into the redesign with `-s ours` on 2026-10-01). Non-production deploys are `noindex,nofollow` automatically via `VERCEL_ENV` in `BaseLayout.astro`.
- Update this file's tree + changelog when routes or shared pieces change; log client decisions in `docs/redesign-handoff/OPEN-QUESTIONS.md`.

---

## Changelog

| Date | Change |
|---|---|
| 2026-05 → 2026-09-22 | Pre-redesign history (initial Astro site, service pages, sitemap plugin, LCP fixes, Match HOA backlinks) — see git log on `main`. |
| 2026-10-02 | **Client roster into the metro checker**: `CLAIMED_METROS` is now the 20 partner office addresses the client supplied (geocoded; firm names in comments only) — placeholder cities gone. **45% avg close rate everywhere** (Results stat, case study, Groundwork + RFP service stats and prose, BoardMatch FAQ, Groundwork meta description — deliberate) replacing the 40–60% range. Guarantee wording approved by the client; BBB mentions stay. ChatGPT mark supplied and placed (`public/assets/chatgpt-mark.png`, avatar + answer label). |
| 2026-10-02 | **Map "Emerging PE firm" signal** (`docs/redesign-handoff-hero-7a/ADDENDUM-pe-signal.md`): yellow halo + slower 2.4s pulse ring + purple core with a trending-up glyph and a yellow tag at left max(12%, 90px) / top 46% of the map (`.rd-hm-pe*`, z 2, static across checks, reduced-motion stops the ring). Phones show the marker only. Label wording is a placeholder per the addendum. |
| 2026-10-02 | **Homepage newsletter band** (client): `.rd-home-nl` purple band under the "What's changing" news cards — Alloy Briefing copy + "Browse past issues" and the same `NewsletterSignup` island as /resources (slot `newsletter`, source `home-page`). |
| 2026-10-02 | **"What you get in your metro"** intro names the three engines of growth (BoardReach attracts, BoardMatch closes, BoardRetain keeps) so the "which engine is leaking?" CTA reads in context (client). |
| 2026-10-02 | **AI-search article featured image** (client-supplied illustration → `public/assets/resources/ai-search-for-cam{,-card,-og}.jpg`, 1600 / 800 / 1200×630): `.rd-article-cover` between the article hero and body, `og:image` + Article schema `image` on the route, and the homepage lead news card shows it (`.rd-news-img`, bleeds to the card edge). Ledger "Qualified leads that closed" → **45% avg** (client; Results, case study, Groundwork and RFP pages still state the 40–60% target range). |
| 2026-10-02 | **Homepage ledger section** (client: "The partner ledger" was weak): H2 → "Become the authority in your market. Growth follows." with a body that argues own the results/AI answers/referrals → stand out → boards call; the ledger stats are the proof (labels clarified: "Inbound board leads vs. the year before", "Qualified leads that closed"; chart caption "Inbound board leads, indexed"). Numbers unchanged (illustrative, client decision §29). |
| 2026-10-02 | **Trust bar** (client, two rounds): now six mono logos in `public/assets/trust/` (Peak Executive Academy, Member of CAI, Innovia's better logo, Think Tank HOA, Vantaca, CINC) driven by `TRUST_LOGOS` in `HomePage.tsx`; "BBB Accredited", "35+ years CAM ops" and the "CAI Member" text are gone. Label sits above the row (six marks don't fit beside it); logos spread with `space-between`, footprints matched to Think Tank at 28px via `.rd-trustbar-logo--*` heights (desktop / ≤980 / ≤720). Color originals kept as `*-color.png`; old `innovia-coop*.png` removed. BBB still appears in the Contact credentials line and the footer contact line (`nav.ts`). |
| 2026-10-02 | **Hero copy** (client): open-market button → "Get my report" (no glyph); payoff line now asks how the firm stacks up against the competition in what boards find, instead of "we make sure it's you, and only you". Metro field focus cue moved from a square ring on the input to the field's own pink border. Contact form gains a **"Get my market report"** topic (client) — the open-market button sends `intent=report`, which selects it and prefills the message; "Claim my market" stays (default, legacy `intent=claim`, and the waitlist). **Callouts follow the search** (client): the ChatGPT question/answer and the referral pill ("Referral · {City} board", was "Oak Hollow HOA") name the searched city via `.rd-hm-city` spans; the pill grows to 340px for long names. |
| 2026-10-02 | **Hero 7a v2** (`docs/redesign-handoff-hero-7a/` README = v2 delta, `README-v1-full-spec.md`): metro card is three states in one fixed 58px row — Idle field → Checking (button spinner, pill CHECKING yellow) → Result row (dot · name stack with ellipsis · **Get my report** green (client wording, no glyph; spec said "Reserve it") / **Join waitlist** purple · reset) with `rdResultIn` entrance; helper text gone; pills LIVE/CHECKING/OPEN/CLAIMED. The map now responds: `lib/hero-map.ts` listens for `alloy:metro` from `MetroCheck` → layer scales 1.1 / fades while checking, then swaps in the metro's own map from new **`/api/map?lat&lng`** (`lib/map-tiles.ts`: OSM z12 tiles → grayscale → cream multiply, sharp, memo + 30-day CDN cache) and the pin label reads "Your Company · City". Map tint is now cream (`#fdfbf5` multiply, ring `#ece9e0`, dots `#b8ad99`, no veil/vignette); Austin default regenerated with the same recipe (`node --experimental-strip-types .context/gen-map.mjs`). Unknown input → Open with the typed string title-cased, map stays. Reduced motion: no zoom / entrance. |
| 2026-10-02 | **Hero 7a — map hero** (`docs/redesign-handoff-hero-7a/`, supersedes card 2b): two columns — copy + metro card (purple header band with LIVE pill, combined field, guarantee badge row) and a muted street map (`public/assets/map/austin.webp`, generated from OSM tiles by `.context/gen-map.mjs`) with Google / ChatGPT / referral callouts pointing at the #1 pin (pulse is the only motion). `HeroMap.tsx` replaces `HeroCard.tsx`; `lib/hero-story.ts` + the `html.js` gate removed. Classes `rd-hm-*` / `rd-mc-*`. Open items: per-visitor metro needs a map key; ChatGPT avatar is a sparkle until the official mark is licensed. |
| 2026-10-02 | **Hero card rev. (4a + 6a)** from the client's "home edit" handoff: tinted answer rows with YOU tags (referral chip yellow), one lavender bottom panel with a combined metro field (`.rd-hc-field` + `.rd-hc-check`) and the guarantee badge row (`GuaranteeBadge`, no text); divider + idle microcopy gone. |
| 2026-10-02 | **Guarantee → "The floor · 1×"** copy (hero card, modal, FAQ); the card is now white with the client's seal (inline SVG `GuaranteeSeal` in HeroCard: five-color arcs, purple disc, ring text, gold check) instead of the gold "THE FLOOR · 1×" box. **iOS menu fix:** mobile panel portaled to `<body>` — Safari treats the header's `backdrop-filter` as a containing block for `position: fixed`, so the panel had no height on iPhones. |
| 2026-10-02 | **Launch sweep** (`.context/launch-audit.mjs`): 59 live URLs → all 200 or one-hop 301 on stg; 146 redirects clean (only legacy `.html` sources take 2 hops because Vercel `cleanUrls` strips `.html` first); no broken links/images; valid schema; 42/42 routes clean at 390px; production build passes; generated sitemap = 42 routes. Fixes: stale `public/sitemap.xml` deleted + robots.txt line dropped, `/sitemap.xml` → `/sitemap-index.xml` redirect in vercel.json (GSC's old submission keeps resolving); results case cards regain their "what we built" lists. |
| 2026-10-01 | **Full-card links**: `.rd-card-link` (lift + inner label reacts) + `LinkLabel` atom (span twin of TextLink). Resources cards + featured guide, homepage news cards, results case cards, the courses "Branded board education" card and the linked partner card are now whole-card links — no nested anchors. |
| 2026-10-01 | **Sticky fix**: `body { overflow-x: hidden }` (site.css) removed — it broke `position: sticky` site-wide, so the article/course TOC sidebar never stuck on desktop and the mobile TOC bar never stuck either. `html` keeps the horizontal clip. |
| 2026-10-01 | **Hub FAQs**: 5 Q&As per engine hub in `data/hubs/*.ts` (`faq`), FAQPage schema added to the three hub routes. |
| 2026-10-01 | **Landing pages** `/boardstart` + `/cam-growth-portal` → `robots="noindex,follow"` and removed from `SITEMAP_ROUTES` (client: keep live, don't index, don't put in nav). |
| 2026-10-01 | **Header search + Log in restored** (`SiteSearch.tsx`, `lib/search-index.ts`, `LOGIN` in nav.ts) — client wanted both back with a login that doesn't clip. Second video ("Jeff Harman – CMGT Testimonial", 5:05, Vimeo 1230353437 with its privacy hash) added to **/about/testimonials** beside the CEO video — the client meant that page, not About. |
| 2026-10-01 | **/get-started retired** (client): page + `GetStartedPage.tsx` deleted, 301 → `/contact`, five legacy rules re-pointed (no chains), out of the sitemap; all CTAs/`nav.ts` CTA/sticky bar/hero links → `/contact`; Contact form gains a "Claim my market" topic (default) and prefills from `?metro=`/`?intent=`. **About**: stat band uses the yellow-unit treatment (`StatBand unit` / `StatNumber unit` → `.rd-stat-num--unit`), (video first landed here by mistake; it lives on /about/testimonials). |
| 2026-10-01 | **Homepage SEO + hero polish**: H1 is now the hero question with "HOA management company" (eyebrow is a plain pink label); title → `Marketing for HOA Management Companies | Alloy Growth Partners` + new description (deliberate); purple-band H2 says "HOA management company". Whole guarantee card is the terms button (lifts on hover). `lib/hero-story.ts`: staged, subtle animation of the three moments (BaseLayout adds `html.js` + a 3s un-hide safety net). Statistics audit applied (§29). |
| 2026-10-01 | **Hero = the card.** Banner copy (keyword eyebrow, "Attract the right boards…", intro, CTAs) removed at the client's request; the card's eyebrow now carries the page H1 "Marketing for HOA Management Companies" (keyword unchanged), the card question stays the h2. Sticky mobile CTA keys off the card's button. |
| 2026-10-01 | **Guarantee terms modal** (`lib/dialog.ts`, `.rd-dialog*`): the hero card's "See guarantee terms" opens a native `<dialog>` with the condition (the firm runs the programs Alloy puts in place); `/faq#guarantee` stays as the no-JS fallback and matches. Exclusivity radius 30 → **15 miles** around partner office addresses (list owed by client). Mock card content approved by client. |
| 2026-10-01 | **Hero card 2b** (`docs/redesign-handoff-hero-2b/`, final): outcomes carousel + vector map replaced by the static "three search moments" card with the pays-for-itself guarantee; hero recomposed (copy in two columns, card full width below — the card is designed at 960px). New `MetroCheck` island; `/api/metro` accepts `q=` metro **or** ZIP (Zippopotam city endpoint for "City, ST", Nominatim fallback, own metro list last). Removed `data/us-map.ts`, `lib/albers.ts`, `.context/gen-us-map.mjs`. FAQ gains an anchored `#guarantee` entry (the card's terms link) and "Do you guarantee results?" was rewritten to match — **guarantee wording needs legal sign-off before launch** (launch checklist #15). `/get-started` prefills `?metro=` / `?intent=waitlist`. |
| 2026-10-01 | **Real content only**: webinar block + `WebinarSignup` removed (no event scheduled); homepage news cards and `/resources` Latest now link only to real pieces; live article *How CAM Firms Win in AI Search* restored at `/resources/ai-search-for-cam` (`AISearchArticle.tsx`, original title/description, `/resource-hub/ai-search-for-cam` → there). |
| 2026-10-01 | **Mobile build** per `docs/redesign-handoff/docs/mobile-spec.md`: header panel rewrite (`SiteHeader`), footer accordion blocks (`SiteFooter`), `lib/mobile.ts` (footer toggles, sticky CTA, TOC bar), `mobile.css` rd-* section rewritten, class hooks on Home/Results/GetStarted/Contact/About/Pricing, `Breadcrumb` marks the parent crumb, `StatBand` gains `compact`, soft hyphen in hub system-row titles. QA tooling `.context/mobile-qa.mjs`, `.context/eval.mjs`. |
| 2026-10-01 | **Launch Q&A**: tiers Steady/Accelerate/Ascend; Google Ads & PPC page restored; FAQs are `<details>` accordions site-wide (`FaqList`); case-study client and video kept anonymous; testimonials reduced to the two client-confirmed quotes. **Favicons**: `public/favicon.ico` + `favicon-48/96.png` + `apple-touch-icon.png` + `icon-192/512.png` + `site.webmanifest` (generated by `.context/gen-favicons.mjs` from `assets/alloy-icon-1500.png`), linked from BaseLayout alongside the SVG. |
| 2026-09-30 | **Newsletter**: `/resources` gets an Alloy Briefing section (recent issues from Mailchimp + first-name/email signup, subscribers tagged `newsletter` + source); new `/resources/newsletter` archive page (all sent issues incl. A/B sends, grouped by year, 24/page, `?page=N` noindexed); `/api/newsletters`; footer Resources column links Newsletter. Trust bar under the hero (BBB · CAI · Innovia logo · 35+ yrs). About: Skyler headshot. |
| 2026-09-24 | **Homepage update** from `docs/redesign-handoff-homepage/`: new hero outcomes card (`HeroCard.tsx` — two-page tile carousel + 150px metro map strip with metro dots, pin drop, result pill; replaces `MetroChecker.tsx`), Network-leads column chart with tooltips (`NetworkLeadsChart.tsx`) replacing the MatchHOA bars, ledger copy/chart to Year 1→3, textured light sections site-wide, `--success` token, shared `data/metros.ts` used by `/api/metro`. Hero grid 1.1fr/1fr. Off-white spacers folded into CTA sections in `ServicePage`/`HubPage`. |
| 2026-09-23 | **Site redesign build (branch `skyleralloygp/site-redesign`).** Added `docs/redesign-handoff/` (prototypes + specs + OPEN-QUESTIONS). New `nav.ts` data model (4-item nav, engines/services). Rewrote `SiteHeader`/`SiteFooter` + `chrome.css`. Added `redesign.css` (`rd-*` system), `lib/motion.ts`, `lib/schema.ts`, engine ink tokens, chevron icons. Added `rd/atoms.tsx`, `rd/ServicePage.tsx`, `rd/HubPage.tsx`; 15 service data files + 3 hub data files. Rebuilt all 40 canonical pages; new `/boardmatch`, `/boardretain`, `/boardreach/hoa-social-media-marketing`, `/resources/cam-marketing-strategy`. Homepage: static hero + `MetroChecker` (new `/api/metro`, Zippopotam + prefix fallback, 30-mi lock radius) + `WebinarSignup`. Trust-building course collapsed to one anchored guide + `TrustBuildingQuiz`. `astro.config.mjs`: sitemap allowlist, 146 chain-free redirects, dropped `/boardmatch` redirect. Deleted 20 legacy routes and 36 unused components. |
