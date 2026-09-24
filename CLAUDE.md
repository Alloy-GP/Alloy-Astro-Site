# CLAUDE.md — Alloy Growth Partners Astro Site

This file is the authoritative reference for anyone (human or AI) working on this codebase. Read it before touching any file. Update it whenever the architecture changes.

---

## Project Overview

**Framework:** Astro 5 with `output: 'server'` (SSR), deployed to Vercel  
**React:** `@astrojs/react` integration; all interactive components use `client:load` or `client:visible`  
**TypeScript:** Strict mode, `exactOptionalPropertyTypes: true` — see gotchas below  
**Site:** https://alloygp.co  
**Routing:** File-based via `src/pages/`. No client-side router.  

---

## File Tree — Annotated

```
src/
│
├── styles/                          # Design system CSS — load order matters
│   ├── colors_and_type.css          # FOUNDATION: all CSS custom properties (colors, type, spacing, motion)
│   ├── site.css                     # COMPONENTS: buttons, cards, sections, layout, hero, tags, utility classes
│   ├── chrome.css                   # CHROME: site header, footer, nav, login button
│   └── courses.css                  # SCOPED: course pages only
│
├── lib/
│   ├── tokens.ts                    # JS color constants (PURPLE, PINK, YELLOW, BLUE, GREEN, BLUE_DEEP) — mirrors CSS vars
│   └── nav.ts                       # Site navigation config (NAV array) — source of truth for all nav items
│
├── layouts/
│   └── BaseLayout.astro             # Single root layout: <html>, <head>, SiteHeader, <main><slot/></main>, SiteFooter
│
├── components/
│   │
│   ├── chrome/                      # Site infrastructure — do not modify for page work
│   │   ├── SiteHeader.tsx           # Fixed sticky nav, mega-menus, login button, active state
│   │   └── SiteFooter.tsx           # Dark footer with 5-color AccentBar, links, copyright
│   │
│   ├── sections/                    # Reusable page-level building blocks
│   │   ├── Shells.tsx               # PRIMARY SHELLS: PageHero, CtaBand, PillarCard, ServiceList, CaseStudyDivider, DurationRibbon
│   │   └── Hero.tsx                 # Homepage-specific hero variants (refined, pov, engineered, proof, exclusivity)
│   │
│   ├── modules/                     # Complex self-contained interactive modules
│   │   ├── AuditQuiz.tsx            # Interactive growth audit quiz
│   │   ├── CaseStudyDivider.tsx     # Standalone case study header with timeline ribbon
│   │   ├── MarketChecker.tsx        # Market availability checker tool
│   │   ├── MicroHoaCaseStudy.tsx    # Small HOA case study callout module
│   │   ├── ResourceHub.tsx          # Resource hub listing component
│   │   ├── RiseCaseStudy.tsx        # RISE AMG case study module
│   │   ├── ROICalculator.tsx        # ROI calculator tool
│   │   └── SystemDiagram.tsx        # BoardSuite system diagram visualization
│   │
│   ├── pages/                       # ONE component per page — page content only, no layout
│   │   ├── AboutPage.tsx            # /about
│   │   ├── AISearchArticle.tsx      # /resource-hub/ai-search-for-cam
│   │   ├── ApproachPage.tsx         # /our-approach (overview)
│   │   ├── ArticleShell.tsx         # Shared shell for long-form resource hub articles
│   │   ├── BoardEdPage.tsx          # /boardretain/board-education
│   │   ├── BoardMatchPage.tsx       # /our-approach/boardmatch
│   │   ├── BoardReachPage.tsx       # /our-approach/boardreach
│   │   ├── BoardRetainPage.tsx      # /our-approach/boardretain
│   │   ├── BoardSuitePage.tsx       # /boardsuite
│   │   ├── CamMarketingPage.tsx     # /boardreach (canonical); /hoa-cam-marketing-services → redirect
│   │   ├── ContactPage.tsx          # /contact + /get-started
│   │   ├── CoursesPage.tsx          # /resources/courses (listing)
│   │   ├── CourseTrustBuildingPage.tsx       # /resources/courses/trust-building
│   │   ├── CourseTrustBuildingLessonPage.tsx # /courses/trust-building-lesson
│   │   ├── CourseTrustBuildingQuizPage.tsx   # /courses/trust-building-quiz
│   │   ├── FAQPage.tsx              # /faq
│   │   ├── GroundworkPage.tsx       # /boardmatch/groundwork (canonical); /groundwork → redirect
│   │   ├── GrowthModeledPage.tsx    # /growth-modeled
│   │   ├── HomePage.tsx             # /
│   │   ├── LegalPages.tsx           # /privacy-policy, /terms-conditions
│   │   ├── MarketingStrategyArticle.tsx # /resource-hub/cam-marketing-strategy
│   │   ├── ResourceHubPage.tsx      # /resources (canonical); /resource-hub → redirect
│   │   ├── ResultsPage.tsx          # /results
│   │   ├── RiseDeepCaseStudy.tsx    # /results/rise-amg
│   │   ├── SeoPage.tsx              # /property-management-seo
│   │   ├── ServiceAnnualReportPage.tsx  # /boardretain/annual-report-production
│   │   ├── ServiceBrandingPage.tsx      # /boardreach/hoa-management-branding
│   │   ├── ServiceEmailMarketingPage.tsx # /boardreach/email-marketing
│   │   ├── ServiceNewsletterPage.tsx    # /boardretain/newsletter-production (canonical)
│   │   ├── ServicePrintProductionPage.tsx # /boardreach/print-production
│   │   ├── ServiceReputationManagementPage.tsx # /boardretain/reputation-management
│   │   ├── ServiceSocialMediaPage.tsx   # /services/social-media-marketing-for-hoa-management-companies
│   │   ├── ServicesPage.tsx         # /services (overview)
│   │   ├── PricingPage.tsx              # /pricing
│   │   ├── ServiceLeadGenerationPage.tsx # /boardreach/property-management-lead-generation
│   │   ├── TestimonialsPage.tsx     # /about/testimonials
│   │   └── WeKnowCamPage.tsx        # /about/we-know-cam (canonical); /we-know-cam → redirect
│   │
│   │   # Shared UI atoms (used inside page components and shells)
│   ├── AccentBar.tsx                # Five-color horizontal stripe (pink/yellow/blue/green/purple)
│   ├── AnimatedNumber.tsx           # IntersectionObserver count-up animation
│   ├── Button.tsx                   # Brand button (primary, secondary, ghost, dark)
│   ├── EngineLoop.tsx               # Animated SVG pillar motif (reach/match/retain)
│   ├── Eyebrow.tsx                  # Small uppercase kicker label with optional line
│   ├── Icon.tsx                     # Stroke-based SVG icon library (30+ icons)
│   ├── PillarMark.tsx               # Duotone pillar marks + ServiceMark + PillarIcon
│   └── Tag.tsx                      # Pill-shaped color label
│
└── pages/                           # Astro routes — thin shells that wrap page components
    ├── 404.astro
    ├── about.astro                  → AboutPage
    ├── boardsuite.astro             → BoardSuitePage
    ├── contact.astro                → ContactPage
    ├── faq.astro                    → FAQPage
    ├── get-started.astro            → ContactPage  (replaces /strategic-review-request)
    ├── growth-modeled.astro         → GrowthModeledPage
    ├── hoa-cam-marketing-services.astro   → (legacy; redirects to /boardreach)
    ├── index.astro                  → HomePage
    ├── our-approach.astro           → ApproachPage
    ├── pricing.astro                → PricingPage
    ├── privacy-policy.astro         → LegalPages
    ├── property-management-seo.astro → SeoPage
    ├── results.astro                → ResultsPage
    ├── services.astro               → ServicesPage
    ├── strategic-review-request.astro  (legacy; redirects to /get-started)
    ├── terms-conditions.astro       → LegalPages
    ├── about/
    │   ├── testimonials.astro       → TestimonialsPage
    │   └── we-know-cam.astro        → WeKnowCamPage  (canonical)
    ├── boardreach/
    │   ├── index.astro                       → CamMarketingPage  (canonical /boardreach)
    │   ├── hoa-management-branding.astro     → ServiceBrandingPage  (canonical; /boardreach/branding redirects here)
    │   ├── email-marketing.astro             → ServiceEmailMarketingPage
    │   ├── print-production.astro            → ServicePrintProductionPage
    │   └── property-management-lead-generation.astro → ServiceLeadGenerationPage
    ├── boardmatch/
    │   └── groundwork.astro         → GroundworkPage  (canonical)
    ├── boardretain/
    │   ├── annual-report-production.astro → ServiceAnnualReportPage
    │   ├── board-education.astro    → BoardEdPage  (canonical)
    │   ├── newsletter-production.astro → ServiceNewsletterPage  (canonical)
    │   └── reputation-management.astro → ServiceReputationManagementPage
    ├── courses/
    │   ├── trust-building.astro     → (legacy; redirects to /resources/courses/trust-building)
    │   ├── trust-building-lesson.astro → CourseTrustBuildingLessonPage
    │   └── trust-building-quiz.astro   → CourseTrustBuildingQuizPage
    ├── our-approach/
    │   ├── boardmatch.astro         → BoardMatchPage
    │   ├── boardreach.astro         → BoardReachPage
    │   └── boardretain.astro        → BoardRetainPage
    ├── resource-hub/
    │   ├── ai-search-for-cam.astro  → AISearchArticle
    │   └── cam-marketing-strategy.astro → MarketingStrategyArticle
    ├── resources/
    │   ├── index.astro              → ResourceHubPage  (canonical)
    │   └── courses/
    │       ├── index.astro          → CoursesPage  (canonical)
    │       └── trust-building.astro → CourseTrustBuildingPage  (canonical)
    ├── results/
    │   └── rise-amg.astro           → RiseDeepCaseStudy
    └── services/
        ├── hoa-newsletter-production.astro → (legacy; redirects to /boardretain/newsletter-production)
        └── social-media-marketing-for-hoa-management-companies.astro → ServiceSocialMediaPage
```

---

## How to Add a New Page

**Every new page requires exactly two new files. Do not modify anything else.**

1. **`src/components/pages/YourPageName.tsx`** — The page component. Contains all sections and content. Imports from shared components and shells only.

2. **`src/pages/your-url-slug.astro`** — The Astro route. Thin wrapper only:

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import YourPageName from '~/components/pages/YourPageName';
---
<BaseLayout
  title="Page Title | Alloy GP"
  description="Meta description here."
  pageId="services"
>
  <YourPageName client:load />
</BaseLayout>
```

**`pageId`** controls which nav item highlights as active. Valid values: `home`, `about`, `services`, `boardsuite`, `approach`, `resources`.

**Service detail pages** live under pillar subdirectories: `src/pages/boardreach/`, `src/pages/boardretain/`. Legacy paths under `src/pages/services/` remain for backwards compatibility.

**Sitemap is automatic.** The `@astrojs/sitemap` integration (`astro.config.mjs`) auto-generates `/sitemap-index.xml` + `/sitemap-0.xml` on every build from the route tree. Do NOT add new URLs to `public/sitemap.xml` — that file is being phased out and will be deleted once the plugin output is verified in production. If the new page needs a non-default priority or changefreq, edit the `serialize` callback in `astro.config.mjs`.

---

## Design System — Colors

### CSS Custom Properties (source: `colors_and_type.css`)

**Primary Brand**
| Variable | Hex | Use |
|---|---|---|
| `--alloy-purple` | `#381c4f` | Primary brand — backgrounds, headers, authority |
| `--alloy-purple-deep` | `#290d41` | Wordmark, footers, darkest surfaces |
| `--alloy-pink` | `#d9356e` | Primary accent — CTAs, energy, pull quotes |

**Secondary**
| Variable | Hex | Use |
|---|---|---|
| `--alloy-yellow` | `#f5d880` | Highlights, stats, secondary energy |
| `--alloy-blue` | `#a1c8e7` | Trust, calm, secondary info |
| `--alloy-green` | `#aed7d0` | Growth, retention, success |

**Neutrals**
| Variable | Hex | Use |
|---|---|---|
| `--alloy-white` | `#ffffff` | Surfaces |
| `--alloy-off-white` | `#f8f7fc` | Page backgrounds |
| `--alloy-light-gray` | `#e8e4ef` | Borders, dividers |
| `--alloy-body-gray` | `#555555` | Body copy |

**Tints (hover/press/surface states)**
```
--alloy-purple-90: #4c3361    --alloy-purple-80: #604a74    --alloy-purple-tint: #ece8f1
--alloy-pink-hover: #c12a60   --alloy-pink-press: #a82451   --alloy-pink-tint: #fbe2eb
--alloy-yellow-tint: #fbf2d6  --alloy-blue-tint: #dcecf7    --alloy-green-tint: #def0ec
```

**Semantic tokens**
```
--fg-1: #1a0a26          highest contrast, display headlines
--fg-2: var(--alloy-purple)   section headers
--fg-3: var(--alloy-body-gray) body text
--fg-muted: #8a8395      captions, helper text
--bg-page: var(--alloy-off-white)
--bg-dark: var(--alloy-purple)
--border-subtle: var(--alloy-light-gray)
--border-strong: #c9c1d6
```

### JS Token Constants (`src/lib/tokens.ts`)

Use these in React component inline styles instead of hardcoding hex values:

```typescript
import { PURPLE, PINK, YELLOW, BLUE, GREEN, BLUE_DEEP } from '~/lib/tokens';

PURPLE   = '#381c4f'   // --alloy-purple
PINK     = '#d9356e'   // --alloy-pink
YELLOW   = '#f5d880'   // --alloy-yellow
BLUE     = '#a1c8e7'   // --alloy-blue
GREEN    = '#aed7d0'   // --alloy-green
BLUE_DEEP = '#0d2d45'  // Service page hero dark — dark of the Alloy blue hue
```

**Rule:** Always import from `~/lib/tokens` for inline styles. Always use `var(--alloy-*)` in CSS classes. Never hardcode hex values in either place.

---

## Design System — Typography

**Font families (CSS variables)**
```
--font-display: "Gotham", "Poppins", "Helvetica Neue", Arial, sans-serif
--font-body:    "Gotham", "Poppins", "Helvetica Neue", Arial, sans-serif
--font-mono:    "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace
```

Gotham is loaded from `/public/fonts/` (weights 300, 400, 500, 700, 800, 900). Poppins is the digital substitute from Google Fonts.

**Type scale**
```
--fs-display: 38px   --fs-h1: 32px    --fs-h2: 28px    --fs-h3: 22px
--fs-h4: 20px        --fs-body: 16px  --fs-small: 14px --fs-caption: 13px
--fs-button: 13px
```

**Line heights:** `--lh-tight: 1.1` | `--lh-snug: 1.25` | `--lh-normal: 1.5` | `--lh-relaxed: 1.65`

**Letter spacing:** `--ls-tight: -0.01em` | `--ls-normal: 0` | `--ls-wide: 0.06em` | `--ls-button: 0.10em`

**Utility type classes (from `site.css`)**
```
.display-xxl   .display-xl   .display-lg   .display-md   .lead   .lead.on-dark
```

---

## Design System — Spacing, Radius, Shadow, Motion

**Spacing scale**
```
--space-1: 4px   --space-2: 8px   --space-3: 12px  --space-4: 16px  --space-5: 24px
--space-6: 32px  --space-7: 48px  --space-8: 64px  --space-9: 96px
```

**Border radius**
```
--radius-sm: 4px   --radius-md: 8px   --radius-lg: 10px (card default)
--radius-xl: 16px  --radius-pill: 999px
```

**Shadows** (purple-tinted, "warm professional")
```
--shadow-xs:   0 1px 2px rgba(56, 28, 79, 0.06)
--shadow-sm:   0 2px 6px rgba(56, 28, 79, 0.08)
--shadow-md:   0 6px 18px rgba(56, 28, 79, 0.10)
--shadow-lg:   0 16px 40px rgba(56, 28, 79, 0.14)
--shadow-pink: 0 8px 24px rgba(217, 53, 110, 0.25)   ← pink CTA/badge elevation
```

**Motion**
```
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)   standard transitions
--ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1)    entrance / emphasis

--dur-fast: 120ms   quick feedback (hover state shifts)
--dur-base: 200ms   standard (fades, slides)
--dur-slow: 320ms   prominent reveals
```

---

## Design System — Layout Classes

```css
.container         { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
.container-narrow  { max-width: 960px;  margin: 0 auto; padding: 0 32px; }

.section           { padding: 96px 0; }
.section-tight     { padding: 64px 0; }
.section-white     { background: #fff; }
.section-ivory     { background: var(--alloy-off-white); }
.section-dark      { background: var(--alloy-purple); color: #fff; }
.section-purple-deep { background: var(--alloy-purple-deep); color: #fff; }
.section-mint      { background: #ecf3f0; }
```

**Responsive breakpoint:** `@media (max-width: 720px)` is the primary mobile breakpoint. `prefers-reduced-motion` is respected.

---

## Shared Component API Reference

### `Button` (`src/components/Button.tsx`)

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';  // default: 'primary'
  children: ReactNode;       // required
  href?: string;             // renders <a> if provided, else <button>
  arrow?: boolean;           // adds → via ::after; default false
  size?: 'sm' | 'md';        // default 'md'
  onDark?: boolean;          // inverts colors for dark backgrounds; default false
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}
```

Generates class string: `btn btn-{variant} [btn-arrow] [btn-sm] [on-dark]`

### `Eyebrow` (`src/components/Eyebrow.tsx`)

```typescript
interface EyebrowProps {
  children: ReactNode;       // required
  noLine?: boolean;          // suppress ::before accent line; default false
  onDark?: boolean;          // yellow text on dark bg; default false
  color?: string;            // override color inline
  className?: string;
}
```

Renders `<div class="eyebrow [no-line] [on-dark]">`. Used above every section headline.

### `Icon` (`src/components/Icon.tsx`)

```typescript
interface IconProps {
  name: string;              // required — see icon list below
  size?: number;             // default 24px
  color?: string;            // default 'currentColor'
  strokeWidth?: number;      // default 1.5
  style?: CSSProperties;
}
```

**Available icons:** `target`, `compass`, `handshake`, `shield`, `trending`, `arrow-right`, `arrow-down`, `check`, `x`, `menu`, `map-pin`, `layers`, `workflow`, `mail`, `phone`, `play`, `search`, `sparkles`, `book`, `calendar`, `lock`, `calculator`, `zap`, `puzzle`, `users`, `clock`, `circle-dot`, `binoculars`, `file-sig`, `repeat`, `bar-chart`, `edit`, `feather`, `send`, `archive`, `globe`, `layout`, `plus`, `pencil`

All icons: 24×24 viewBox, stroke-based (no fill), `strokeLinecap: round`, `strokeLinejoin: round`.

### `Tag` (`src/components/Tag.tsx`)

```typescript
interface TagProps {
  children: ReactNode;       // required
  color?: 'pink' | 'yellow' | 'green' | 'blue' | 'purple';  // default 'pink'
}
```

Renders `<span class="tag tag-{color}">`. Pill-shaped inline label. Note: when passing a dynamic color value, cast with `as any` if needed to satisfy TypeScript.

### `AccentBar` (`src/components/AccentBar.tsx`)

```typescript
interface AccentBarProps {
  height?: number;           // default 6px
  animated?: boolean;        // staggered pulse animation; default false
  className?: string;
}
```

Five equal segments in order: pink, yellow, blue, green, purple.

### `PillarMark` (`src/components/PillarMark.tsx`)

```typescript
// Default export
interface PillarMarkProps {
  pillar: 'reach' | 'match' | 'retain';  // required
  size?: number;                          // default 56px
  color?: string;                         // override accent color
  accent?: string;                        // override fill tint
}

// Named exports
ReachMark({ color?, size?, accent? })    // standalone reach SVG
MatchMark({ color?, size?, accent? })    // standalone match SVG
RetainMark({ color?, size?, accent? })   // standalone retain SVG
ServiceMark({ name, color?, accent?, size? })  // duotone service icon (name = icon key)
PillarIcon({ pillar?, name, size? })     // ServiceMark with pillar-matched palette
```

### `AnimatedNumber` (`src/components/AnimatedNumber.tsx`)

```typescript
interface AnimatedNumberProps {
  value: number;             // target number
  suffix?: string;           // e.g. '%', '+', 'x'
  prefix?: string;           // e.g. '$'
  duration?: number;         // ms; default 1200
}
```

Counts up from 0 once element enters viewport (IntersectionObserver, 0.4 threshold).

### `EngineLoop` (`src/components/EngineLoop.tsx`)

```typescript
interface EngineLoopProps {
  pillar?: 'reach' | 'match' | 'retain';  // default 'reach'
  active?: boolean;                        // default false; full opacity + speed when true
  size?: number;                           // default 44px
}
```

Animated ambient SVG. Inactive state: 0.55 opacity, 0.5× animation speed, white stroke.

---

## Page Shell Components (`src/components/sections/Shells.tsx`)

These are the primary building blocks for new pages. Always prefer these over custom markup.

### `PageHero`

```typescript
interface PageHeroProps {
  eyebrow: ReactNode;        // required — kicker text above h1
  h1: ReactNode;             // required — main heading (can include JSX spans)
  sub?: ReactNode;           // subheading / description
  dark?: boolean;            // purple bg + white text; default false
  bg?: string;               // custom dark background color (overrides dark prop)
  image?: string;            // triggers 2-col layout
  sideStat?: ReactNode;      // right column content (card-styled)
}
```

When `bg` or `dark` is set: `isDark = true`, text turns white, Eyebrow goes `onDark`. Always ends with `<AccentBar height={6} />`.

**For service pages:** Use `bg={BLUE_DEEP}` or `bg={PURPLE}` (not `dark={true}`) to set a custom background.

**Custom heroes:** When a page needs a hero with non-standard layout (e.g., side mockup, embedded stats bar), build it inline in the page component rather than using `PageHero`. See `ServiceNewsletterPage.tsx` for an example.

### `CtaBand`

```typescript
interface CtaBandProps {
  headline?: string;         // default: "Three engines. One playbook. Your market."
  sub?: string;              // default: "Attract, close, and keep..."
  primary?: string;          // default: "Claim Your Market"
  primaryHref?: string;      // default: "/strategic-review-request"
}
```

Dark gradient section (purple → deep), centered layout, primary + secondary ("Explore the system") buttons. Always use this at page bottom. Override `headline` and `sub` per page.

### `PillarCard`

```typescript
interface PillarCardProps {
  color: string;             // top border accent (use PINK, YELLOW, GREEN from tokens)
  brand: string;             // large bold brand name e.g. "BoardReach™"
  label: string;             // Tag label
  headline: string;          // card subheading
  items: string[];           // bullet list (rendered with check icons)
  href?: string;             // optional "Learn more" link
  pillar?: 'reach' | 'match' | 'retain';  // auto-detected from color if omitted
  tint?: string;             // (defined, unused)
  icon?: string;             // (defined, unused)
}
```

### `ServiceList`

```typescript
interface ServiceListProps {
  items: Array<{ h: string; d: string; icon?: string }>;
  color?: string;            // default PINK; determines pillar class
  pillar?: 'reach' | 'match' | 'retain';
}
```

Renders a 3-column grid of `.pillar-card` tiles. Items: `h` = heading, `d` = description, `icon` = currently unused. Use for "What's included" / feature list sections. Works well with 9 items (3×3 grid).

### `CaseStudyDivider` / `DurationRibbon`

Both exported from `Shells.tsx` (and also available as `modules/CaseStudyDivider.tsx`). Used in case study pages to render a header with a 36-month timeline progress bar.

---

## CSS Classes Reference

### Cards
```
.card             base card (white bg, radius-lg, shadow-xs, border)
.card:hover       elevates (shadow-md, translateY -2px)
.card-pad         adds 32px padding
.card-accent-pink/yellow/blue/green/purple   left border accent (5px)
.pillar-card      left border accent (pillar-colored); full-border on hover
.pillar-card-reach / -match / -retain        pillar color variants
```

### Buttons
```
.btn-primary      pink bg, white text, pink shadow
.btn-secondary    white bg, purple border/text → purple bg on hover
.btn-ghost        transparent, purple text → pink on hover
.btn-dark         purple bg, white text
.btn-arrow        adds → via ::after
.btn-sm           smaller padding (10px 18px), 11px font
.on-dark          modifier for secondary/ghost on dark backgrounds
```

### Hero
```
.hero             full-width section (dark bg default)
.hero.bg-ivory    light ivory bg
.hero.bg-deep     purple-deep bg
.hero-inner       constrained inner wrapper with padding
.hero-bg-grid     subtle grid texture overlay (absolute positioned)
```

### Tags / Eyebrows
```
.tag              pill label (font-display, 700, 11px, uppercase, wide spacing)
.tag-pink/yellow/blue/green/purple/dark
.eyebrow          uppercase kicker with ::before pink line
.eyebrow.no-line  suppress the line
.eyebrow.on-dark  yellow text instead of pink
```

---

## Pillar System

Every product, service, and visual element maps to one of three pillars:

| Pillar | Stage | Color | Token | CSS Class |
|---|---|---|---|---|
| **BoardReach™** | Attract | Pink `#d9356e` | `PINK` | `.pillar-card-reach` |
| **BoardMatch™** | Convert | Yellow `#f5d880` | `YELLOW` | `.pillar-card-match` |
| **BoardRetain™** | Keep | Green `#aed7d0` | `GREEN` | `.pillar-card-retain` |

- PillarMark colors (slightly different from main palette): reach `#d9356e`, match `#d4a916`, retain `#7eb8af`
- When building new service pages, identify which pillar the service belongs to and use its color for accents, `ServiceList color`, and any `Tag` components.

---

## BaseLayout Props

```typescript
interface Props {
  title: string;             // required — <title> tag
  description: string;       // required — meta description + OG
  pageId?: string | null;    // active nav highlight: 'home'|'about'|'services'|'boardsuite'|'approach'|'resources'
  headerTheme?: 'light' | 'purple';  // default 'light'
  animatedBar?: boolean;     // footer accent bar animation; default true
  hideHeader?: boolean;      // omit SiteHeader; default false
  hideFooter?: boolean;      // omit SiteFooter; default false (focused landing pages)
}
```

---

## TypeScript Gotchas

**`exactOptionalPropertyTypes: true`** — You cannot pass `prop={maybeUndefined}` when the prop is optional. Use conditional spread instead:

```typescript
// ❌ Wrong — TS error if badge can be undefined
<Component badge={badge} />

// ✓ Correct
<Component {...(badge ? { badge } : {})} />
```

**`CSSProperties` for dynamic style objects with inline style props:**

```typescript
import type { CSSProperties } from 'react';
// When passing style to Icon or elements that expect CSSProperties:
style={{ flexShrink: 0, marginTop: 2 } as CSSProperties}
```

**Import path alias:** Always use `~/` for imports from `src/`:
```typescript
import Button from '~/components/Button';
import { PURPLE } from '~/lib/tokens';
```

---

## Page Anatomy — Standard Pattern

New service pages and most content pages follow this section order:

1. **Hero** — `PageHero` with dark bg (use `bg={BLUE_DEEP}` or `bg={PURPLE}`) or custom hero section
2. **Audience/Intro** — Who this is for, framing copy
3. **Stats Band** — 3–4 data points with colored top borders
4. **Visual/Calendar Section** — Chart, calendar, diagram, or editorial system
5. **What's Included** — `ServiceList` (9 items, 3 cols) or deliverable cards (2-col grid)
6. **Comparison** — Before/After table or 2-col contrast section
7. **Process** — 3–4 step flow with `section-dark` background
8. **How It Fits** — Where this lives in BoardSuite system
9. **FAQ** — Accordion (use `FAQItem` pattern from `FAQPage.tsx`)
10. **`CtaBand`** — Always last, with page-specific headline/sub

---

## Brand Vocabulary (CAM/HOA Industry)

Always use:
- **"boards"** — not "clients" or "customers" (boards are the HOA board members)
- **"associations"** or **"communities"** — not "properties"
- **"CAM companies"** or **"management firms"** — not "property management companies"
- **"win more boards"** / **"retain associations"** — not "acquire customers"
- **"portfolio"** — the collection of associations a CAM firm manages
- **"managers"** — the staff at the CAM company who service boards

---

## Redirects

Managed in `astro.config.mjs` under `redirects`. Current service-page redirects:
```
/services/newsletter-production-for-hoa-management  →  /services/hoa-newsletter-production
/boardreach/branding                                →  /boardreach/hoa-management-branding
```

When adding new service pages that replace old Claude Design URLs, add redirects here.

---

## Rules for AI Tools

**When adding a new page:**
- Create `src/components/pages/NewPageName.tsx` (content)
- Create `src/pages/path/slug.astro` (route shell)
- Do NOT modify `BaseLayout.astro`, `SiteHeader.tsx`, `SiteFooter.tsx`, `Shells.tsx`, `Button.tsx`, or any other shared component
- Do NOT create new shared components — document any gaps here instead

**If a shared component is missing something a new page needs:**
- Implement it inline in the page component file
- Document it here as a future extraction candidate

**When this file goes stale:**
- Update the file tree section when adding pages
- Update component API tables when prop interfaces change
- Add new token values when `tokens.ts` is updated

---

## Changelog

| Date | Change |
|---|---|
| 2026-05 | Initial file created |
| 2026-05 | Added `ServiceNewsletterPage.tsx` + `services/hoa-newsletter-production.astro` |
| 2026-05 | Added `BLUE_DEEP` token to `tokens.ts` |
| 2026-05 | Added `bg` prop to `PageHero` in `Shells.tsx` |
| 2026-05 | Added `.DS_Store` to `.gitignore` |
| 2026-05 | Added login button to `SiteHeader.tsx` + `.btn-login` to `chrome.css` |
| 2026-05 | Expanded Services nav to 4 items per pillar; moved Social Media to BoardReach |
| 2026-05 | Added 6 icon cases to `SiteHeader.tsx` `ResourceIcon` switch |
| 2026-05 | Added `ServiceSocialMediaPage.tsx` + `ServiceReputationManagementPage.tsx` + `ServiceEmailMarketingPage.tsx` + `ServiceBrandingPage.tsx` + `ServiceAnnualReportPage.tsx` + `ServicePrintProductionPage.tsx` |
| 2026-05 | Added `PricingPage.tsx` + `src/pages/pricing.astro` (`/pricing`) |
| 2026-05 | Added `ServiceLeadGenerationPage.tsx` + `src/pages/boardreach/property-management-lead-generation.astro` |
| 2026-05 | Added `boardreach/` + `boardretain/` + `boardmatch/` route subdirectories with 7 new Astro routes |
| 2026-05 | Rewrote `nav.ts` to align with sitemap canonical URLs; updated `SiteHeader.tsx` CTA to `/get-started` |
| 2026-05 | Moved Pricing into About nav dropdown; removed as standalone nav item |
| 2026-05 | Added canonical routes: `/boardreach/`, `/boardmatch/groundwork`, `/boardretain/board-education`, `/boardretain/newsletter-production`, `/about/we-know-cam`, `/resources/`, `/resources/courses/`, `/resources/courses/trust-building`, `/get-started` |
| 2026-05 | Added redirects in `astro.config.mjs` from all legacy URLs to new canonical paths |
| 2026-05-27 | Fixed `/pricing` broken link to `/boardreach/branding` → now points to `/boardreach/hoa-management-branding`; added 301 redirect for the short-form URL as a safety net; updated file-tree (`branding.astro` was renamed `hoa-management-branding.astro`) |
| 2026-05-27 | Added 18 missing pages to `public/sitemap.xml` (5 service pages, /partners, /careers, 11 course/lesson pages) — went from 39 to 57 URLs |
| 2026-05-27 | Installed `@astrojs/sitemap` (^3.7.3) and configured it in `astro.config.mjs` with a `serialize` callback that mirrors prior priority/changefreq values. Plugin auto-generates `/sitemap-index.xml` from the route tree on every build, eliminating sitemap drift. Static `public/sitemap.xml` retained as fallback until plugin output is verified in production; after that, delete `public/sitemap.xml` and update `robots.txt` to point at `/sitemap-index.xml`. Also bumped starter-template's `@astrojs/sitemap` from ^3.0.0 to ^3.7.3 for consistency. |
| 2026-05-27 | Mobile LCP fix: replaced the 215 KB `alloy-icon-1500.png` favicon + login icon with the 6.9 KB `alloy-logomark.svg`. Edits to `BaseLayout.astro` (favicon link, type=image/svg+xml) and `SiteHeader.tsx` (login button icon). Page weight 627 KB → 416 KB; median mobile LCP 5.0 s → 4.5 s; best-case 100/100 LCP 1.0 s. The 215 KB icon was loading at high priority and saturating mobile bandwidth at page-start. |
| 2026-05-27 | `/about` team cards: removed the literal "Photo placeholder" overlay text. Replaced the giant-initials block with a designed role card — small frosted monogram (SN/JG/CL) in the top-right, large role icon centered (`target` for marketing, `book` for L&D, `compass` for executive), tasteful role caption bottom-left. Keeps the brand gradient. Swap to real `<img>` headshots when commissioned without restructuring the card. Added `icon` + `roleLabel` fields to the partners config in `AboutPage.tsx`. |
| 2026-06-08 | Added `/boardstart` — BoardStart™ CAM Marketing Starter landing page (`src/pages/boardstart.astro`, image at `public/assets/cam-operator.jpg`). Self-contained vanilla HTML/CSS/JS inside `BaseLayout`; all styles scoped under `.boardstart-page` / `.bs-*`. Locked variants via top-of-file consts: `HERO='outcome'`, `PRICING='tiers'`. Built as a **focused landing page**: runs with `hideHeader hideFooter` and ships its own minimal chrome — a pinned brand-bar (`.bs-lp-header`, `position:fixed` because the global `overflow-x:hidden` on html/body breaks `position:sticky`; logo + single CTA, no nav) and a slim footer (`.bs-lp-footer`, logo + short tagline left, copyright + Privacy/Terms right via `margin-left:auto`). The header CTA (`.bs-lp-cta`) is hidden on load and slides in from the right once an IntersectionObserver sees the hero form scroll out of view. Hero "Get the details" form is front-end only (wire the `.bs-form` submit handler to a CRM/email). Not in `nav.ts`. |
| 2026-06-08 | Added `hideFooter?: boolean` prop to `BaseLayout.astro` (mirrors `hideHeader`; default false). Lets a page suppress the global `SiteFooter` and supply its own — used by `/boardstart`. |
| 2026-09-22 | Added outbound links to Match HOA (matchhoa.com, free board-to-manager matchmaking concierge) in three contextual spots: new "I'm on an HOA board…" question in the FAQ Industry-fit group (`FAQPage.tsx`; `QA.a` widened from `string` to `ReactNode`), a full-width "Board matchmaking" card in the Partners referral-networks section (`PartnersPage.tsx`; section now has `id="referral-networks"`), and a fifth "Board matchmaking platforms" channel card on the Lead Generation page (`ServiceLeadGenerationPage.tsx`; section now has `id="channel-economics"`, grid switched from fixed 4-col to `auto-fit minmax(200px)` so it stacks on mobile). All links are followed, `target=_blank rel=noopener`. |
