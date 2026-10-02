# Mobile spec — alloygp.co rebuild

Design reference: `site/Mobile Spec.dc.html` (open in a browser; frames are 390px wide, one per template, accordions are live). This document is the contract; the file is the picture.

**Breakpoints (keep the repo's existing ones):** `980px` nav collapse · `720px` layout · `480px` compact. All rules below apply at `≤720px` unless noted. Write them in `src/styles/mobile.css` — never in `site.css` / `chrome.css`. Prefer class hooks over the existing `[style*="grid-template-columns:…"]` attribute selectors; add classes to the new components as you build them so the attribute hacks can be retired.

## Global rules
| Token | Desktop | Mobile ≤720 |
|---|---|---|
| Gutter | 40px | **20px** |
| Section padding | 96px (hero 104) | **56px** (hero top 48, breadcrumb pages 16) |
| Content grid | 1160 max, 2–4 cols | **1 column**, `gap` 24–28 |
| H1 | 72–88px/900/.95 | **42–46px**/900/**.98**/-.03em (hub 46, home 44, service 42, article 38) |
| H2 | 56px/900/1 | **34px**/900/**1.02**/-.025em (secondary H2 26–30) |
| H3 | 26–32px/700 | **23–24px**/700/1.2 |
| Intro / lede | 18–20px | **16–17px**/1.55 |
| Body | 17px/1.6 | **16px**/1.6 (articles 1.65) |
| Big stats | 48–56px | **36px** in bands, **28–32px** inline; suffix stays `.5em` |
| Numerals (01/02) | 40–56px | **30–40px** |
| Eyebrow | 14px + 28×3 rule | **12px** + **24×3** rule |
| Buttons | inline, 16px 28px | **full width**, `padding:16px`, centered, `display:block`; ghost link below primary, centered, `padding:12px` |
| Tap targets | — | **≥44px** everywhere (rows 52–56px) |
| Form inputs | 14px text | **16px** text, `padding:14px` (≥48px tall) — prevents iOS zoom |
| Cards | 28–36px padding | **20–22px** padding, radius 10 unchanged |
| Hover states | per README | keep (they're harmless on touch); add `:active` = press state on buttons |
| Motion | per `alloy-motion.js` | unchanged; `data-rise` stagger 90→**60ms**; respect `prefers-reduced-motion` |

Horizontal rails (news cards, "More in" chips, comparison table) use `overflow-x:auto; margin:0 -20px; padding:0 20px; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch` — they bleed to the viewport edge.

## Header (`SiteHeader.tsx`) — frame 1a
- `≤980px`: height **60px**, padding `0 20px`, logo **24px**. Right cluster: compact pink CTA **"Claim"** (11px/700 uppercase, `padding:11px 14px`, radius 10) + **44×44** burger (3 bars 22×2px, 7px apart, `#381c4f`; morphs to X — reuse `.burger-bar-*` + `.is-open`).
- Panel: full-height under the header (`position:fixed; top:60px; inset-x:0; bottom:0; overflow:auto`), white, **4px five-color bar** on top, `padding:8px 20px 0`. Enter `mobileNavIn` 320ms emphasis; exit `mobileNavOut` 280ms. Lock body scroll while open. Esc / route change closes.
- Top-level rows: **The System ▾ · Results · Pricing · Resources** — 18px/700 purple, `min-height:56px`, 1px `#e8e4ef` bottom border.
- **The System** is a two-level accordion (replaces hover dropdown): tapping the row toggles (text + chevron go pink when open). Inside: eyebrow "THREE ENGINES" (11px/.12em/#555), three engine rows (**52px**, 10px color dot `#d9356e`/`#b8942a`/`#3f8f83`, title 16/700, sub 12px #555 "Attract · Get found before boards shop", chevron 16px). One engine open at a time; open row bg `#f8f7fc` radius 10. Expanded list (indent 36px): "Engine overview →" 12px uppercase in engine color, then services 15px/500 with 1px dividers, `padding:11px 0`. Below: BoardSuite purple tile (same as desktop, `padding:14px`).
- **Defaults on open:** The System expanded, BoardReach expanded.
- Secondary links row: About · Contact · FAQ (14px/500 #555).
- Panel footer pinned to the bottom (`margin-top:auto`, border-top): full-width pink **"Claim your market"** + 12px caption "One CAM firm per metro. Thirty minutes tells you if yours is open."
- Data: same `docs/nav-data.json`.

## Sticky bottom CTA bar — frame 1b
Mobile only (`≤720`). Pink `#d9356e`, `position:fixed; left:8px; right:8px; bottom:8px`, radius 10, `padding:14px 16px`, shadow `0 8px 24px rgba(217,53,110,.35)`. Left: "CLAIM YOUR MARKET" 13px/700/.1em + caption "One CAM firm per metro" 11px 85%. Right: Lucide `arrow-right` 20px. Links to `/get-started`.
Show after the hero's primary CTA leaves the viewport (IntersectionObserver on the hero button); hide while the footer or any form is in view; never on `/get-started` or `/contact`. Enter: `translateY(100%)→0`, 320ms emphasis. Add `padding-bottom:72px` to `<main>` on pages where it's active so content isn't covered.

## Template rules

### 1. Homepage — frame 1b
Order unchanged. Hero: H1 44 → lede → stacked CTAs → **metro checker card** (`padding:22px 20px`). Dashboard tiles stay **2-up** (`gap:8px`, numbers 28px, charts 36px tall), dots below; map 120px tall; ZIP input 16px + "Check" button. Purple MatchHOA band: **copy first**, then the bar card (bars 160px tall, numbers 34px), then stacked CTA + MatchHOA logo (34px, centered). Ledger: stat rows (14px label / 32px number, `padding:20px`) then chart card. "What you get": three engines become **tappable rows** — grid `52px 1fr`, numeral 32px spanning 3 rows, eyebrow/title 22px/body 14px — linking to each hub. CTA block stacks (19px headline, full-width button). News: featured card full width; two secondary cards in a **280px snap rail**; webinar card stacks date tile + copy, then email field over full-width "Save my seat". Bottom padding 110px for the sticky bar.

### 2. Engine hub — frame 1c
Hero: eyebrow → H1 46 → lede 17 → stacked CTAs → **"The system" card** compressed to a **3-up tile row** (`display:grid; grid-template-columns:1.4fr 1fr 1fr; gap:8px`, children `min-width:0; overflow-wrap:anywhere`; current engine pink, numeral 20px, name 13px, "You are here"; others `rgba(255,255,255,.08)` and link to the sibling hubs), footnote 12px.
Outcomes: `border-top` then intro, each outcome `padding:36px 0` with border-bottom: numeral 40 → title 24 → body 15 → "WHAT BUILDS IT" eyebrow → **service cards as full-width rows** (`padding:16px 18px`, border 1px, radius 10, title 16/700 + sub 13px, trailing `arrow-right` 18px). No 2-col card grid.
Proof band: `grid 1fr 1fr; gap 28px 20px`, 3px yellow left rules, last stat `grid-column:span 2`. "What it costs to wait" stacks. CTA card stacks.

### 3. Service page — frame 1d
Breadcrumb collapses to a single **"‹ {Engine}" back link** (13px/500 #555, 44px tall, Lucide `chevron-left`). Hero: eyebrow → H1 42 → lede 16 → stacked CTAs → **hero visual below** (map-pack mock compressed: search bar, 72px map, 3 result rows with 38px avatars; sibling-services card on other services as a stacked list). Stat band: 2-col, third stat spans with a top hairline. Prose rows: h3 23 over paragraphs, `padding:36px 0`. "What's included": intro then **single-column** checklist (Lucide `check` pink 18px). "How it works": **2×2 grid** (`gap:0 20px`, numerals 30, titles 17, body 13). **FAQ → accordion**: rows `min-height:56px`, question 16/700, Lucide `plus` 18px rotating 45° when open, answer 15px/1.6 with 20px bottom padding; **first item open by default**; one open at a time; render all answers in the DOM (hidden via `max-height`/`hidden` attr, not removed) so FAQPage schema and crawlers see them. "More in {Engine}" → **chip rail** (horizontal scroll, `white-space:nowrap`). CTA card stacks.

### 4. Index pages — frame 1e
**Pricing:** tiers stack, **Growth (purple, POPULAR tag inline right of the title) first**, then Foundation, Scale (outlined, secondary button). Comparison table: wrapper `overflow-x:auto; padding:0 20px`, inner `min-width:520px`, **first column 170px `position:sticky; left:0`** with matching bg; "Swipe →" hint at 11px right of the heading. Four rules → 2×2. FAQ accordion as §3.
**BoardSuite:** same tier rules. **Services index:** service cards single column, grouped under engine eyebrows. **Results:** 4 headline stats → 2×2 (36px); case cards stack, charts full width; disclosure band stacks. **Get Started:** **form first**, then the three steps, then the 30·90·1 strip (stays 3-up, 28px numerals, 12px labels).

### 5. Article / guide — frame 1f
Back link as §3. Hero: eyebrow (engine/topic color) → H1 38 → lede 16 → byline (32px avatar). **TOC → sticky bar**: `position:sticky; top:60px; z-index:4`, 52px tall, white 95% + 12px blur, hairlines top/bottom, Lucide `list` icon + "ON THIS PAGE" (12px/.12em) left; progress "{n} of {total}" 12px + chevron right. Tapping opens the jump list in place (46px rows, 2-digit pink numeral 13px, current section pink/700, `mobileNavIn` 240ms); closes on selection. Section ids **unchanged** (trust-building keeps the lesson slugs). Body: numeral 30 → h3 23 → 16px/1.65 paragraphs, 40px between sections. Purple "Want this done?" card renders **inline after the second section** (desktop sidebar card). Quiz full width inside `#knowledge-check`.

### 6. Editorial — frame 1g
Hero stacks eyebrow → H1 44 → lede. Stat bands with ≤3 short stats stay **3-up** (30px numbers, 12px labels); anything longer goes 2-col. Team grid **2-up** with square photo placeholders. Testimonials single column. FAQ page uses the §3 accordion. Contact / Get Started forms: labels 12px/700 uppercase #555, fields 16px text `padding:14px` radius 8, short paired fields 2-up, submit full width pink, disclaimer 12px centered below. Growth Modeled: mount the existing `ROICalculator` — it already has `≤720` rules in `growth-portal.css`. Legal: prose only, 16px/1.65.

## Footer (`SiteFooter.tsx`) — frame 1h
`≤720`: 6px accent bar; brand block `padding:40px 20px 24px` (48px icon tile, 20px headline, 13px contact) + **full-width pink CTA**. The five link columns become **accordion rows** (`min-height:52px`, yellow `#f5d880` 12px/700/.12em uppercase heading, 16px chevron rotating 180°, 1px `rgba(255,255,255,.12)` dividers). Links 15px, `padding:10px 0`, white 90%. **All collapsed on load**; collapse visually only (links stay in the DOM). Bottom bar stacks and centers: Terms · Privacy row first, then © line, 11px uppercase 60%.

## Component checklist
- [x] `SiteHeader.tsx` — mobile panel w/ two-level System accordion, compact CTA, burger morph (2026-10-01; panel styles in `chrome.css`, breakpoints in `mobile.css`)
- [x] Sticky CTA bar — static markup in `BaseLayout.astro` (`.rd-sticky-cta`, omitted on /get-started + /contact) + observers in `src/lib/mobile.ts` (no island needed)
- [x] FAQ accordion — `FaqList` in `rd/atoms.tsx` renders native `<details name>` on every breakpoint (client asked for accordions on desktop too, 2026-10-01); answers stay in the DOM
- [x] Article TOC — `.rd-toc` markup unchanged; `src/lib/mobile.ts` builds the sticky bar + "n of N" progress + jump list ≤720 and moves the purple card inline after section 2
- [x] `SiteFooter.tsx` — five `.site-footer-block` rows, collapsed ≤720 (toggle in `mobile.ts`), mobile-only brand CTA + "{Engine} overview" links
- [x] Compare tables — `.rd-table-wrap` ≤720: Swipe → hint, 520px min, sticky first column (pricing card hook `.rd-compare-card`)
- [x] `mobile.css` — rd-* section rewritten to the tokens above; new class hooks `rd-network`, `rd-news-rail`, `rd-threeup--engines`, `rd-grid--stats`, `rd-grid--team`, `rd-form-grid`, `rd-gs-hero`, `rd-statband--compact`, `rd-breadcrumb-parent`. Legacy attribute selectors remain for the untouched landing pages only.
- [~] QA — `node .context/mobile-qa.mjs <url> 390 844 [out.png]` (headless Chrome, CDP): 0 horizontal overflow at 390 and 360 on /, service, hub, pricing, article, about, get-started, results, faq, testimonials; every text input 16px. Still owed: real-device pass (iOS Safari / Android Chrome) and Lighthouse mobile runs — not possible in the build sandbox.
