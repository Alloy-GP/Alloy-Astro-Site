# Handoff: Site header — option 1d (utility strip)

## What changes vs. the live header
1. **New 36px purple utility strip** above the main bar, right-aligned: **Search** and **Client log in** (user glyph, not the door/arrow icon).
2. **Search icon and "Log in" removed from the main bar.** Main bar is logo · nav · one pink CTA.
3. **No underline on the active nav item.** Active state is color only (pink). Remove the 2px bottom border.

Everything else (logo size, nav labels, CTA, mega-menu) is unchanged.

## Files
- `reference/header-1d.html` — standalone reference (drop `alloy-logo-full-color.svg` beside it).
- Source design: `Header Options.dc.html` option 1d.

## Spec
**Utility strip**
- bg `#381c4f`, height 36, inner max-width 1160 / padding 0 40, content right-aligned, gap 24.
- Items 12px / 500, icon 13px Lucide (`search`, `user`), gap 7.
- Search: `#D9CCE6`, hover white. Client log in: white / 700.
- Divider between them: 1 × 14px, `rgba(255,255,255,.18)`.
- Strip is part of the sticky header (scrolls with it). If header height is a concern on scroll, collapse the strip after 80px of scroll — optional.

**Main bar**
- White, 1px `#e8e4ef` bottom border. Inner max-width 1160, padding 18 40, space-between.
- Logo 30px tall, links home.
- Nav 14px / 500 / `#381c4f`, gap 32. Active + hover: `#d9356e`. **No border-bottom.** "The System" keeps the 12px chevron (gap 5) and opens the existing mega-menu.
- CTA: pink primary, 12px / 700 / 0.1em uppercase, padding 12 20, radius 10. Hover `#c12a60`, press `#a82451` + 1px down.

**Mobile (≤ 900px)**
- Keep the utility strip (it's where login lives). Nav collapses to the existing hamburger; CTA stays visible if width allows, else moves into the drawer.

## Routes
`/search` (or open the site search palette), `/login` (client portal), existing nav routes unchanged.

## Accessibility
- Utility links have visible text, so no aria-label needed.
- Focus: 2px pink outline, 2px offset, on all links (on the purple strip use white outline).
- Active nav item: add `aria-current="page"` since the underline cue is gone.
