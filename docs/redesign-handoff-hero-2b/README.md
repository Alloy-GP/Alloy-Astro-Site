# Handoff: Homepage hero card — option 2b (final) · bottom section revised to 4a

## What changed in this revision (Oct 2, 2026)
1. **Bottom section → option 4a.** Divider and microcopy removed. One lavender panel holds the metro check (combined input + "Check" button) on the left and the guarantee on the right. Guarantee is now a five-color ring badge (SVG, no text) + "Your growth covers our fees. Guaranteed." + terms link. The old purple/gold "24 MO" block is gone.
2. **Answer rows → option 6a.** The three dark purple "Your Company" blocks are replaced by light rows in each channel's tint with purple text and a small YOU tag. Referral chip moved from pink to yellow so pink is CTA-only.

## Overview
Replaces the rotating channel-metrics card in the homepage hero on alloygp.co. The card tells one story from the HOA board's point of view: a board searches three ways (Google map pack, AI assistant, referral network), finds the same company every time, and the visitor is asked whether their metro is still open — backed by the pays-for-itself guarantee.

## About the design files
`reference/hero-card-2b.html` is a **design reference built in HTML** — intended look and behavior, not shippable code. Recreate it in the Astro/React codebase using its patterns. `HeroCard.tsx` is a starting-point port in the repo's inline-style convention (see `HomePage.tsx`); check it against `~/lib/tokens`, `Icon`, and `Button` before merging. `mobile.css.snippet` holds the breakpoint rules and hover/focus states.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final.

## Where it goes
- `src/components/sections/Hero.tsx` — the `layout="split"` right column currently renders the stats card (`statsHero`). Replace it with `<HeroCard />`; delete the rotation logic and dots.
- `HeroStatic.astro` (LCP path, `hideHero`) — the card's heading is an h2; the page h1 stays in the left hero column.
- `onCheck(metro)` → wire to the existing `MarketChecker` lookup (`src/components/modules/MarketChecker.tsx`) or route to `/strategic-review-request?metro=…`.
- `/guarantee` — new page for the terms link (or point at the existing terms location).

## Desktop layout (≥ 721px; designed at 960px wide)
Card: white, 1px `#e8e4ef`, radius 24, padding 40, shadow `0 6px 18px rgba(56,28,79,0.08)`. Column, gap 26.

1. Eyebrow + headline (gap 18). Headline spans the card, max-width 760. Nothing sits beside it.
2. Search story panel — lavender `#f3f0f8`, radius 18, padding 18; inside, grid `repeat(auto-fit, minmax(220px,1fr))`, gap 14, three white cards.
3. Payoff line — 24px.
4. **Bottom panel (revised, option 4a)** — one lavender panel `#f3f0f8`, radius 18, padding 26×28; grid `minmax(0,1.25fr) minmax(0,1fr)`, gap 40, align center. No divider above it.
   - Left (column, gap 14): heading row (heading left, "Live" right, space-between) → combined field (white, 1px `#e8e4ef`, radius 12, padding 6, flex gap 8: borderless input + pink "Check" button). No microcopy.
   - Right: guarantee row — 1px `#ddd6e6` left rule, padding-left 32; badge 64px + two lines (headline + terms link).

## Mobile (≤ 720px)
Card padding 22, radius 20, gap 18. Headline 26px. Payoff 20px. Story cards stack (auto-fit). Bottom panel padding 20, stacks (gap 20): heading row (heading 20px + live label) → combined field (unchanged) → **guarantee beneath**, left rule swapped for a 1px top rule, badge 52px. See `mobile.css.snippet`.

## Specs
Font: `var(--font-display)` (Gotham; Poppins fallback).

| Element | Spec |
|---|---|
| Eyebrow | 12px / 700 / 0.14em / uppercase / **`#b8902a`** (dark gold — brand gold `#F2D98A` fails contrast on white) / lh 1.6. Copy: "Growth partner for CAM companies · One per metro" (no period) |
| Headline (h2) | 42px / 700 / lh 1.08 / −0.015em / `#381c4f` / max-width 760 / `text-wrap: balance`. Copy: "When a board in your city looks for a new management company, who do they find?" |
| Story card | white, radius 14, padding 18, column gap 14, shadow `0 2px 6px rgba(56,28,79,0.08), 0 0 0 1px #e8e4ef` |
| Card label | 22px icon chip (radius 6, 12px Lucide glyph 2.5 stroke) + 11px / 700 / 0.12em / uppercase / `#381c4f`. Chips: Google `#e3eef8` + `#3f6f9e` (search); AI `#e1f0ec` + `#2f7a6a` (sparkles); Referral `#faf0d2` + `#8a6a10` (users) — moved off pink so pink stays CTA-only |
| Query pill | bg `#f3f0f8`, radius 999, padding 9×14, 12.5px / 500 / `#555555`. "hoa management company near me" |
| Chat bubble | bg `#f3f0f8`, radius `14 14 4 14`, right-aligned, max-width 92%. "Who's the best HOA management company in Austin?" |
| Board request | bg `#f3f0f8`, radius 10, padding 11×14. "Oak Hollow HOA" 13px 700 `#381c4f`; "212 homes · Seeking new management" 11.5px `#8C7A9E` |
| **Answer row** (×3, the focal element — revised, option 6a) | bg = the card's chip tint (Google `#e3eef8`, AI `#e1f0ec`, Referral `#faf0d2`), radius 10, padding `12 10 12 12`, flex gap 8, no border. "Your Company" 14px / 700 / `#381c4f`, nowrap, flex none. Trailing 11.5px / 700 / purple at 70% opacity, nowrap, `min-width:0; overflow:hidden; text-overflow:ellipsis` (the only shrinkable child — it ellipsizes first on narrow cards). Right end: **YOU tag** — 9.5px / 800 / 0.1em / white on `#381c4f`, padding 4×7, radius 6, margin-left auto. Google: 22px purple circle "1" (12px / 800 / white) + "4.9". AI: 16px purple sparkles + "Top choice". Referral: 16px purple check + "Matched" |
| AI answer sentence | under the block, 12.5px / 500 / lh 1.55 / `#555555`: "A top choice, known for local experience and strong reviews." |
| Skeleton rows | 10px dot + 8px bar `#e8e4ef`, widths 62% / 48%, aria-hidden |
| Payoff line | 24px / 700 / lh 1.3 / −0.01em / `#381c4f`. "We make sure it's you, and only you, in your market." (comma after "only you") |
| Bottom panel | bg `#f3f0f8`, radius 18, padding 26×28 (20 mobile) |
| Availability heading | 22px / 700 / lh 1.15 / `#381c4f`. "Is your metro still open?" |
| Live label | 8px dot `#2f9e85` + ring `0 0 0 4px rgba(47,158,133,0.18)`; 12.5px / 500 / `#555555` "Live" |
| Combined field | white, 1px `#e8e4ef`, radius 12, padding 6, flex gap 8. Input: h 44, no border, transparent, padding 0 12, 15px / 500 / `#351C4B`; placeholder `#8C7A9E` "Enter your metro" |
| Button | h 44, padding 0 20, radius 8, `#d9356e`, white, 12px / 700 / 0.1em / uppercase, no shadow. Hover `#c12a60`; press `#a82451` + 1px down. "Check". The only pink on the card |
| **Guarantee row** | flex, align center, gap 16; 1px `#ddd6e6` left rule + padding-left 32 (mobile: top rule instead). Badge 64px (52 mobile) — SVG, viewBox 100: five 5px arcs r46 (dash `48 241`, base rotate −142°, then +72° each) in purple/pink/yellow/blue/green, purple disc r35, gold `#f5d880` check `M36 51l9 9 19-20` 6 stroke. No text on the badge. Text column gap 4: "Your growth covers our fees. Guaranteed." 15px / 700 / lh 1.25 / `#381c4f`; link "See guarantee terms" 12.5px / 700 / purple, underlined (offset 3), hover pink → `/guarantee` |
| Focus | 2px `#d9356e` outline, 2px offset |

## Interactions & behavior
- Static card — no rotation, dots, or load animation beyond the hero's existing entrance.
- Submit (button or Enter) → `onCheck(metro)`. Empty input: focus the field, don't submit. Open/claimed result display is owned by MarketChecker.
- "See guarantee terms" is a normal link.

## Copy rules
"Your Company" is the placeholder in all three cards — never a real client. "Austin", "Oak Hollow HOA · 212 homes" are illustrative. Competitors are unnamed skeleton bars on purpose. Guarantee wording is a public promise — confirm with legal before launch.

## Tokens
Purple `#381c4f` · Pink `#d9356e` (hover `#c12a60`, press `#a82451`) · Gold `#F2D98A` · Gold text `#b8902a` · Lavender `#f3f0f8` · Border `#e8e4ef` / strong `#c9c1d6` · Body `#555555` · Muted `#8C7A9E` · On-purple `#D9CCE6` · Live `#2f9e85`.
Radii 24 / 18 / 14 / 10 / 6. Gaps 56 / 26 / 18 / 14 / 10 / 8.

## Assets
No images. Icons: Lucide outlines (search, sparkles, users, check) — use the repo's `<Icon>` if available.

## Files
- `HeroCard.tsx` — React port (desktop + mobile via the CSS snippet)
- `mobile.css.snippet` — breakpoint, hover, focus rules
- `reference/hero-card-2b.html` — standalone reference; resize the window below 720px to see the mobile layout
- Source design: `Hero Card Options.dc.html` option 2b + `SearchStory2b.dc.html`; bottom section from option 4a (Turn 4); answer rows from option 6a (Turn 6)
