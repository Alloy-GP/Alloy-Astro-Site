# Handoff: Homepage hero card — option 2b (light)

## Overview
Replaces the rotating channel-metrics card in the homepage hero on alloygp.co. Instead of four stat tiles that read like an analytics dashboard, the card tells one story from the HOA board's point of view: a board searches three ways (Google map pack, AI assistant, referral network), finds the same company every time, and the visitor is asked whether their metro is still open.

## About the design files
`reference/hero-card-2b.html` is a **design reference built in HTML** — it shows intended look and behavior, not shippable code. Recreate it in the Astro/React codebase using existing patterns. `HeroCard.tsx` is a starting-point port written in the repo's inline-style convention (see `HomePage.tsx`); review it against `~/lib/tokens`, `Icon`, and `Button` before merging.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final. Match them.

## Where it goes
- `src/components/sections/Hero.tsx` — the `layout="split"` right column currently renders the stats card (`statsHero`). Replace that card with `<HeroCard />`. Remove the carousel/rotation logic and dots.
- `HeroStatic.astro` (LCP path, `hideHero` pattern) — the card's h2 is not the page h1; the page h1 stays in the left hero column. If the card is rendered server-side in the static hero, pass `hideHeadline` only if the headline is duplicated elsewhere.
- Hook `onCheck(metro)` into the existing `MarketChecker` lookup (`src/components/modules/MarketChecker.tsx`) or route to `/strategic-review-request?metro=…`.

## Layout (desktop ≥ 721px)
Card: white `#ffffff`, 1px border `#e8e4ef`, radius 24, padding 40, shadow `0 6px 18px rgba(56,28,79,0.08)`. Vertical flex, gap 26. Designed at 960px wide inside the hero's right column; fluid.

1. **Top row** — grid `minmax(0,1.3fr) minmax(0,1fr)`, gap 40, align end.
   - Left: eyebrow + headline, gap 18.
   - Right: context line, max-width 300, justified end, margin-bottom 6.
2. **Search story panel** — lavender `#f3f0f8`, radius 18, padding 18. Inside: grid `repeat(auto-fit, minmax(220px,1fr))`, gap 14, three white cards.
3. **Supporting line** (18px).
4. **Divider** — 1px `#e8e4ef`.
5. **Availability row** — grid `minmax(0,1fr) minmax(0,1.3fr)`, gap 24, align center. Left: heading + live label (gap 8). Right: input + button in a flex row, gap 10.

## Mobile (≤ 720px)
Padding 22, radius 20, gap 18. Top row stacks and the context line is hidden. Headline 26px. Availability row stacks; input and button go full-width, stacked. See `mobile.css.snippet`. The three story cards already stack via auto-fit.

## Components & specs
Font: `var(--font-display)` (Gotham; Poppins fallback).

| Element | Spec |
|---|---|
| Eyebrow | 12px / 700 / tracking 0.14em / uppercase / `#d9356e` / lh 1.6. Copy: "Growth partner for community association management companies, one per metro." |
| Headline (h2) | 42px / 700 / lh 1.08 / tracking −0.015em / `#381c4f` / max-width 540 / `text-wrap: balance`. Copy: "When a board in your city looks for a new management company, who do they find?" |
| Context line | 15.5px / 500 / lh 1.55 / `#555555`. Copy: "Boards look in three places. The answer should be the same in every one of them." |
| Story card | white, radius 14, padding 18, column gap 14, shadow `0 2px 6px rgba(56,28,79,0.08), 0 0 0 1px #e8e4ef` |
| Card label | 22px icon chip (radius 6, tinted bg, 12px Lucide glyph 2.5 stroke) + 11px / 700 / 0.12em / uppercase / `#381c4f`. Chips: Google `#e3eef8` + `#3f6f9e` (search); AI `#e1f0ec` + `#2f7a6a` (sparkles); Referral `#f9e1ea` + `#d9356e` (users) |
| Query pill / bubbles | bg `#f3f0f8`, 12.5px / 500 / `#555555`. Pill radius 999 padding 9×14; chat bubble radius `14 14 4 14` aligned right; board request radius 10 padding 11×14 (title 13px 700 `#381c4f`, meta 11.5px `#8C7A9E`) |
| **Answer block** (the focal element, ×3) | bg `#381c4f`, radius 10, padding 12×14, flex gap 10. Gold glyph `#F2D98A` 16px (map-pin / check). "Your Company" 14px / 700 / white. Trailing 11.5px / 700 / gold ("4.9", "Matched"). In the AI card it is inline: radius 8, padding 4×10, 13.5px |
| Skeleton rows | 10px dot + 8px bar, `#e8e4ef`, widths 62% / 48%, padding 6×14, aria-hidden |
| Supporting line | 18px / 500 / lh 1.5 / `#555555`; "only you" 700 `#381c4f`. Copy: "We make sure it's you, and only you in your market." |
| Availability heading | 26px / 700 / lh 1.15 / `#381c4f`. Copy: "Is your metro still open?" |
| Live label | 8px dot `#2f9e85` with `0 0 0 4px rgba(47,158,133,0.18)` ring + 13px / 500 / `#555555` "Live availability" |
| Input | h 56, radius 10, 1px `#c9c1d6`, padding 0 18, 15px / 500 / `#351C4B`; placeholder `#8C7A9E` "Enter your metro". Focus: 2px pink outline, 2px offset (brand rule) |
| Button | h 56, padding 0 26, radius 10, bg `#d9356e`, white, 13px / 700 / 0.1em / uppercase, shadow `0 8px 24px rgba(217,53,110,0.25)`. Hover `#c12a60`; press `#a82451` + translateY(1px). Label: "Check availability" |

## Interactions & behavior
- Static card — no rotation, no dots, no animation on load beyond the hero's existing entrance.
- Submit (button or Enter) → `onCheck(metro)`. Empty input: focus the field, don't submit. Result display is owned by whatever MarketChecker already does (open/claimed state).
- Optional: make the live dot pulse (opacity 1→0.4, 1.6s ease-in-out infinite) — not in the reference.

## Copy rules
Placeholder company name is "Your Company" in all three moments — do not substitute a real client. Board name "Oak Hollow HOA · 212 homes" and the competitor rows are illustrative; competitors are intentionally unnamed skeleton bars.

## Tokens used
Purple `#381c4f` · Pink `#d9356e` (hover `#c12a60`, press `#a82451`) · Gold `#F2D98A` · Lavender panel `#f3f0f8` · Border `#e8e4ef` / strong `#c9c1d6` · Body `#555555` · Muted `#8C7A9E` · Live green `#2f9e85` · Page `#f8f7fc`.
Radii: 24 (card), 18 (panel), 14 (story card), 10 (blocks, input, button), 8 (inline chip), 6 (icon chip). Spacing: 40 / 26 / 18 / 14 / 10 / 8.

## Assets
No images. Icons are Lucide outlines (search, sparkles, users, map-pin, check) — use the repo's `<Icon>` if those names exist.

## Files
- `HeroCard.tsx` — starting-point React port
- `mobile.css.snippet` — breakpoint rules for `src/styles/mobile.css`
- `reference/hero-card-2b.html` — standalone reference (open in a browser; uses system font if Gotham isn't installed)
- Source design: `Hero Card Options.dc.html` (option 2b) + `SearchStoryLight.dc.html` in this project
