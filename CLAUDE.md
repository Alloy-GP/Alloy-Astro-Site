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
│   ├── dialog.ts                    # native <dialog> modals: [data-dialog=id] opens, [data-dialog-close]/backdrop/Esc close — mounted from BaseLayout
│   ├── hero-story.ts                # homepage hero: the three search moments play one at a time (type → pop / think → slide / search → match); html.js gate
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
│   └── metros.ts                    # Partner office metros (claimed, 15-mi radius — office list owed by client) + open metros, claimStatus() — used by /api/metro
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
│   │   ├── HeroStatic.astro         # Homepage hero wrapper (static): the HeroCard slot IS the hero — banner copy removed 2026-10-01
│   │   ├── Shells.tsx               # LEGACY shells (PageHero, CtaBand, …) — still imported by landing-page code; do not use for new work
│   │
│   ├── modules/                     # Interactive islands + self-contained modules
│   │   ├── HeroCard.tsx             # Homepage hero card 2b (STATIC): three search moments → "Your Company" → payoff → availability slot + guarantee
│   │   ├── MetroCheck.tsx           # "Is your metro still open?" island inside HeroCard (client:load): metro or ZIP → /api/metro?q= → Open/Claimed
│   │   ├── NetworkLeadsChart.tsx    # Homepage "Network leads" column chart with ⓘ tooltips (client:visible)
│   │   ├── NewsletterSignup.tsx     # /resources newsletter form (client:idle) → /api/subscribe
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
│   │   ├── ContactPage.tsx          # /contact — THE "Claim your market" destination (form island → /api/contact; prefills ?metro= & ?intent=claim|waitlist)
│   │   ├── GrowthModeledPage.tsx    # /growth-modeled (mounts ROICalculator)
│   │   ├── LegalPages.tsx           # /privacy-policy, /terms-conditions (copy verbatim)
│   │   ├── FindYourPathPage.tsx, GrowthPortalPage.tsx   # standalone landing pages (outside the redesign)
│   │
│   ├── AccentBar.tsx, AnimatedNumber.tsx, Button.tsx, EngineLoop.tsx, Eyebrow.tsx, Icon.tsx, PillarMark.tsx, Tag.tsx  # legacy atoms (Icon still used)
│
└── pages/                           # Astro routes — thin shells
    ├── index.astro                  → HeroStatic › HeroCard › MetroCheck island; HomePage + NetworkLeadsChart slot
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
    ├── boardstart.astro, cam-growth-portal.astro, find-your-path.astro   # landing pages (hideHeader/hideFooter), untouched by the redesign
    └── api/ {lead,contact,subscribe,metro,newsletters,ping,thinktank}.ts # endpoints (metro: ?q= ZIP | "City, ST" | city via Zippopotam/Nominatim; newsletters: issues JSON; ?raw=1 diagnostics)
```

**Retired in the redesign (now 301s in `astro.config.mjs`):** `/our-approach*`, `/we-know-cam`, `/about/we-know-cam`, `/resource-hub*`, `/courses*` (10 lessons + quiz), `/services/social-media-marketing-for-hoa-management-companies`, `/services/hoa-newsletter-production`, `/hoa-cam-marketing-services`, `/groundwork`, `/hoa-board-education-programs`, `/strategic-review-request`, `/boardreach/local-pack-optimization`, `/results/rise-amg`, and (2026-10-01) **`/get-started` → `/contact`** — every "Claim your market" CTA now points at `/contact`.

---

## Page Templates (from the handoff)

| # | Template | Where |
|---|---|---|
| 1 | Homepage | `HeroStatic.astro` + `modules/HeroCard.tsx` (+ `MetroCheck` island) + `HomePage.tsx` |
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

Islands inside a static page component are passed as `children` from the route (`<YourPage><Form client:load /></YourPage>`, e.g. `<HeroCard><MetroCheck client:load /></HeroCard>`).

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
- **Hover states (site-wide):** pink btn → `#c12a60`, press `#a82451` + 1px down · dark btn → purple-90 · outline → fills purple · text links → pink + underline offset 4px (yellow on purple) · cards → translateY(-2px) + shadow-md + border-strong · chips → purple border, pink text · footer links → yellow.

**Light sections:** every off-white `<section class="rd-bg-off">` (alias `.section-light`) carries the textured treatment — grain, 2px five-color rule, purple wash — from layered `background-image`s; an off-white block directly following another keeps only the grain. Don't stack an off-white spacer above an off-white section unless you want that behavior.

**Mobile** follows `docs/redesign-handoff/docs/mobile-spec.md` (prototype: `site/Mobile Spec.dc.html`). ≤980: header becomes a 60px bar with a compact "Claim" CTA + 44px burger → full-height panel (two-level System accordion, System + BoardReach open by default, About · Contact · FAQ row, pinned CTA); every `rd-grid--*` collapses to one column. ≤720: gutters 20, sections 56 (hero 48), H1 42–46 / H2 34 / H3 23 / body 16, buttons full-width, inputs 16px, stat bands 2-col (lone third stat spans; `.rd-statband--compact` stays 3-up), steps 2×2, chips + secondary news cards become edge-bleed snap rails, breadcrumbs collapse to one "‹ Parent" link (`.rd-breadcrumb-parent`), hub system card → 3-up tiles, build cards → rows, tiers stack with the popular one first, compare tables scroll with a sticky first column, footer columns → accordions, the article TOC → sticky "On this page · n of N" bar (`lib/mobile.ts`), and a pink sticky "Claim your market" bar appears after the hero CTA scrolls away (hidden near forms/footer; never on /get-started, /contact). Hooks: `rd-network`, `rd-news-rail`, `rd-threeup--engines`, `rd-grid--stats`, `rd-grid--team`, `rd-form-grid`, `rd-gs-hero`, `rd-compare-card`. Prefer `rd-grid--*` classes over inline `gridTemplateColumns` so grids stack. QA: `node .context/mobile-qa.mjs <url> 390 844 [out.png]` (overflow / <16px inputs / small tap targets); `node .context/eval.mjs <url> <w> <h> "<js>"` evaluates JS in headless Chrome.

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
- **Staging:** `stg.alloygp.co` is bound to the `staging` branch; `dev.alloygp.co` to `skyleralloygp/site-redesign`. After every push to the redesign branch also run `git push origin skyleralloygp/site-redesign:staging` (fast-forward; `staging` was merged into the redesign with `-s ours` on 2026-10-01). Non-production deploys are `noindex,nofollow` automatically via `VERCEL_ENV` in `BaseLayout.astro`.
- Update this file's tree + changelog when routes or shared pieces change; log client decisions in `docs/redesign-handoff/OPEN-QUESTIONS.md`.

---

## Changelog

| Date | Change |
|---|---|
| 2026-05 → 2026-09-22 | Pre-redesign history (initial Astro site, service pages, sitemap plugin, LCP fixes, Match HOA backlinks) — see git log on `main`. |
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
