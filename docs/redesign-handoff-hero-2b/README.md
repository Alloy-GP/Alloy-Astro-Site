# Handoff: Homepage hero card — option 2b (final)

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
4. Divider 1px `#e8e4ef`.
5. Bottom row — grid `minmax(0,1.3fr) minmax(0,1fr)`, gap 56, align start.
   - Left (column, gap 14): heading row (heading left, "Live availability" right, space-between) → input + button (flex, gap 10) → microcopy.
   - Right: guarantee block.

## Mobile (≤ 720px)
Card padding 22, radius 20, gap 18. Headline 26px. Payoff 20px. Story cards stack (auto-fit). Bottom row stacks: heading row (heading 20px + live label) → input (52) → button full-width (52) → microcopy → **guarantee directly beneath**. Guarantee gold side narrows to 64px. See `mobile.css.snippet`.

## Specs
Font: `var(--font-display)` (Gotham; Poppins fallback).

| Element | Spec |
|---|---|
| Eyebrow | 12px / 700 / 0.14em / uppercase / **`#b8902a`** (dark gold — brand gold `#F2D98A` fails contrast on white) / lh 1.6. Copy: "Growth partner for CAM companies · One per metro" (no period) |
| Headline (h2) | 42px / 700 / lh 1.08 / −0.015em / `#381c4f` / max-width 760 / `text-wrap: balance`. Copy: "When a board in your city looks for a new management company, who do they find?" |
| Story card | white, radius 14, padding 18, column gap 14, shadow `0 2px 6px rgba(56,28,79,0.08), 0 0 0 1px #e8e4ef` |
| Card label | 22px icon chip (radius 6, 12px Lucide glyph 2.5 stroke) + 11px / 700 / 0.12em / uppercase / `#381c4f`. Chips: Google `#e3eef8` + `#3f6f9e` (search); AI `#e1f0ec` + `#2f7a6a` (sparkles); Referral `#f9e1ea` + `#d9356e` (users) |
| Query pill | bg `#f3f0f8`, radius 999, padding 9×14, 12.5px / 500 / `#555555`. "hoa management company near me" |
| Chat bubble | bg `#f3f0f8`, radius `14 14 4 14`, right-aligned, max-width 92%. "Who's the best HOA management company in Austin?" |
| Board request | bg `#f3f0f8`, radius 10, padding 11×14. "Oak Hollow HOA" 13px 700 `#381c4f`; "212 homes · Seeking new management" 11.5px `#8C7A9E` |
| **Answer block** (×3, the focal element) | bg `#381c4f`, **3px gold left border**, radius 10, padding `12 14 12 12`, flex gap 10. "Your Company" 14px / 700 / white. Gold glyph 16px. Trailing 11.5px / 700 / gold. Google: 22px gold circle "1" (12px / 800 / purple) + 14px pin (margin-left −4) + "4.9". AI: sparkles + "Top choice". Referral: check + "Matched" |
| AI answer sentence | under the block, 12.5px / 500 / lh 1.55 / `#555555`: "A top choice, known for local experience and strong reviews." |
| Skeleton rows | 10px dot + 8px bar `#e8e4ef`, widths 62% / 48%, aria-hidden |
| Payoff line | 24px / 700 / lh 1.3 / −0.01em / `#381c4f`. "We make sure it's you, and only you, in your market." (comma after "only you") |
| Availability heading | 26px / 700 / lh 1.15 / `#381c4f`. "Is your metro still open?" |
| Live label | 8px dot `#2f9e85` + ring `0 0 0 4px rgba(47,158,133,0.18)`; 13px / 500 / `#555555` "Live availability" |
| Input | h 56, radius 10, 1px `#c9c1d6`, padding 0 18, 15px / 500 / `#351C4B`; placeholder `#8C7A9E` "Enter your metro" |
| Button | h 56, padding 0 26, radius 10, `#d9356e`, white, 13px / 700 / 0.1em / uppercase, shadow `0 8px 24px rgba(217,53,110,0.25)`. Hover `#c12a60`; press `#a82451` + 1px down. "Check availability". The only pink on the card |
| Microcopy | 13px / 500 / lh 1.5 / `#8C7A9E`. "See if your metro is open and who boards find there today." |
| **Guarantee block** | flex, radius 14, overflow hidden, bg `#381c4f`. Left side: 72px wide (64 mobile), bg `#F2D98A`, centered column: 26px check (purple, 3 stroke) + "24 MO" 9px / 800 / 0.08em / purple. Body padding 16×18, gap 5: "Pays for itself. Guaranteed." 15px / 700 / white; "If new business doesn't cover our fee within 24 months, we refund the difference." 12px / 500 / lh 1.45 / `#D9CCE6`; link "See guarantee terms" 12px / 700 / gold, underlined (offset 3), hover white → `/guarantee` |
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
No images. Icons: Lucide outlines (search, sparkles, users, map-pin, check) — use the repo's `<Icon>` if available.

## Files
- `HeroCard.tsx` — React port (desktop + mobile via the CSS snippet)
- `mobile.css.snippet` — breakpoint, hover, focus rules
- `reference/hero-card-2b.html` — standalone reference; resize the window below 720px to see the mobile layout
- Source design: `Hero Card Options.dc.html` option 2b + `SearchStory2b.dc.html`
