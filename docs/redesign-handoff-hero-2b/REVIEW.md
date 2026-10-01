# Hero card 2b — review notes (2026-10-01; v2 "final" BUILT the same day — see OPEN-QUESTIONS §27 for the calls made)

Handoff files are copied here verbatim from `hero Website redesign with SEO focus.zip`. `previews/` are the reference card
injected into the real redesign hero on the dev server (Gotham, live header), not the designer's renders:

- `as-specified-right-column-1440.png` — the card in today's 1.1fr/1fr split hero (right column ≈ 480px). The design is
  made for 960px: the three story cards stack, the 42px headline wraps to nine lines, the input collapses next to the button.
- `stacked-full-width-1440.png` — hero copy on top, card full width below. Fits as designed.
- `mobile-390.png` — card stacks as designed (≈1,300px tall; the whole hero ≈1,800px on a phone).

Decisions owed before building: (1) stacked hero vs. card-as-hero; (2) which copy survives (the hero and the card each carry
an eyebrow, a headline, a support line and a pink CTA); (3) metro input — ZIP (current `/api/metro`) vs. city name; result
state without the map; (4) illustrative "Your Company / Oak Hollow HOA / 4.9" mock content OK?; (5) mobile — stack or rail.
Handoff file names (`Hero.tsx`, `statsHero`, `MarketChecker.tsx`, `/strategic-review-request`) are pre-redesign; on this
branch they map to `HeroStatic.astro`, `HeroCard.tsx`, `/api/metro`, `/get-started`.

`HeroCard.handoff.tsx.txt` is the designer's sample port, renamed so the repo's type-check skips it (it fails `exactOptionalPropertyTypes`). The shipped component is `src/components/modules/HeroCard.tsx` + `MetroCheck.tsx`.
