# Handoff: Homepage hero — option 7a (map hero)

## Overview
Two-column hero for alloygp.co. Left: eyebrow, headline, one-line payoff, and the "Is your metro still open?" card with the guarantee. Right: a muted street map of the visitor's metro (Austin in the mock) with the three ways a board finds a management company layered on top — a Google local-pack card, a ChatGPT thread, and a referral-network notification — all pointing at the same #1 pin: Your Company.

Supersedes `design_handoff_hero_card_2b` (single-column card). Copy, type and spacing are final; the map tiles are a stand-in.

## Files
- `reference/hero-map-7a.html` — standalone reference, 1100px design width, stacks under 980px. Open in a browser.
- `chatgpt-icon.png` — drop the official OpenAI mark here (the mock used a public PNG; license the real asset).
- Source design: `Hero Map.dc.html` option 7a.

## Layout (desktop, ≥ 981px)
Card: white, 1px `#e8e4ef`, radius 24, padding 40, shadow `0 6px 18px rgba(56,28,79,.08)`. Grid `minmax(0,1fr) 560px`, gap 48, **align-items: stretch** — the map takes the left column's height (min 560).

**Left column** — flex column, `justify-content: space-between`, gap 28.
1. Eyebrow 12 / 700 / 0.14em / uppercase / `#b8902a`. "Growth partner for CAM companies · One per metro"
2. H2 44 / 700 / lh 1.06 / −0.015em / `#381c4f`, `text-wrap: balance`. "When a board in your city looks for a new HOA management company, **who do they find?**" — last clause `#d9356e`.
3. Payoff 18 / 500 / lh 1.5 / `#555555`. "Google, AI assistants, referral networks — boards check all three. We make sure it's you, and only you, in your market."
4. **Metro card** — bg `#f3f0f8`, radius 18, overflow hidden.
   - Header band: bg `#381c4f`, padding 18×24, space-between. Title 22 / 700 / white / −0.01em "Is your metro still open?". LIVE pill: 11 / 700 / 0.1em / uppercase / `#aed7d0`, bg `rgba(255,255,255,.08)`, padding 6 10 6 8, radius 999, 8px dot `#aed7d0` with ring `0 0 0 4px rgba(174,215,208,.22)`.
   - Body padding 20 24 24, gap 20.
   - Combined field: white, 1px `#e8e4ef`, radius 12, padding 6, flex gap 8. Input h44 borderless transparent, 15 / 500 / `#351C4B`, placeholder `#8C7A9E` "Enter your metro". Button h44, padding 0 20, radius 8, `#d9356e`, 12 / 700 / 0.1em uppercase "Check"; hover `#c12a60`, press `#a82451` + 1px down. Submit → existing MarketChecker lookup.
   - Guarantee row: 1px `#ddd6e6` top rule, padding-top 18, flex gap 14. Badge 48px SVG (see below). "Your growth covers our fees. Guaranteed." 14 / 700 / lh 1.25 / purple; link "See guarantee terms" 12.5 / 700 / purple underlined (offset 3), hover pink → `/guarantee`.

**Right column — map** (position relative, radius 18). Inner clip layer (radius 18, overflow hidden, bg `#ece8f2`, inset 1px `#e8e4ef` ring) holds the tiles + two overlays: `rgba(56,28,79,.08)` tint and `inset 0 0 60px rgba(56,28,79,.14)` vignette. Tiles are `filter: grayscale(1) brightness(1.04) contrast(.92)`. The outer layer is NOT clipped so the referral pill can overhang the right edge.

Overlays (positions relative to the 560-wide map box; z-order back→front):
| Element | Position | Spec |
|---|---|---|
| Competitor dots ×2 | 86%/12%, 58%/46% | 10px circle `#8C7A9E`, 2px white border, shadow `0 2px 6px rgba(56,28,79,.3)` |
| #1 pin | 70%/22% (centered) | 34px circle `#381c4f`, 3px white border, "1" 14 / 800 / `#f5d880`; label chip below (gap 6) "Your Company" 12 / 700 white on purple, padding 5 10, radius 8. Pulse ring: 18px, 2px `#d9356e`, `heroPulse 1.8s ease-out infinite` (scale .6→2.6, opacity .8→0) |
| Google card (z2) | left 24, top 28, w 272 | white, radius 16, padding 16, gap 12, shadow `0 24px 48px -12px rgba(56,28,79,.28), 0 2px 6px rgba(56,28,79,.08), 0 0 0 1px #e8e4ef`. Header: Google "G" 18px + "GOOGLE SEARCH" 11 / 700 / 0.12em. Query pill bg `#f3f0f8` radius 999 padding 8 12, 12 / 500 / `#555555`. Result row: bg `#e3eef8`, radius 10, padding 10 10 10 12, gap 8 — 20px purple circle "1", "Your Company" 13 / 700 purple (nowrap), "4.9" 11 / 700 purple 70%, YOU tag 9 / 800 / 0.1em white on purple, padding 3 6, radius 6, margin-left auto. Two skeleton rows (10px dot + 8px bar `#e8e4ef`, 62% / 48%) |
| ChatGPT thread (z3) | left 140, bottom 36, w 300 | Column gap 8. Question bubble right-aligned, max 86%, white, radius `18 18 4 18`, padding 10 14, eyebrow "ASKED CHATGPT" 9.5 / 700 / 0.12em / `#8C7A9E`, text 12.5 / 500 / purple. Reply: 30px white avatar with ChatGPT mark (24px) and 3px `#e1f0ec` ring; bubble white radius `4 18 18 18`, padding 10 14 12, label "CHATGPT · ANSWER" 9.5 / 700 / 0.12em / `#2f7a6a` with 10px sparkles; body 12.5 / 500 / `#555555` with "Your Company" as a chip (bg `#e1f0ec`, purple 700, padding 2 7, radius 6). Both bubbles use the card shadow |
| Referral pill (z4) | right −28, top 300, w 272 | bg `#381c4f`, radius 999, padding 8 18 8 8, gap 12, card shadow. 36px `#f5d880` circle with 16px users icon (purple). Text: "REFERRAL · OAK HOLLOW HOA" 9.5 / 700 / 0.12em / `#f5d880`; "Matched with Your Company" 13 / 700 white, ellipsis |
| Attribution | right 10, top 6 | 9 / 500 / `#8C7A9E` — required if OSM tiles are used |

### Guarantee badge (SVG, viewBox 0 0 100 100)
Five arcs r46, stroke 5, round caps, `stroke-dasharray="48 241"`, group rotated −142°, each arc +72° from the last, colors in order purple `#381c4f`, pink `#d9356e`, yellow `#f5d880`, blue `#a1c8e7`, green `#aed7d0`. Disc r35 `#381c4f`. Check `M36 51l9 9 19-20`, `#f5d880`, stroke 6, round. No text.

## Mobile (≤ 980px)
Grid collapses to one column, gap 28, card padding 24. H2 32px. Map fixed at 520px tall below the metro card; referral pill pulls back inside (right 16). Callout positions otherwise unchanged. Under ~600px consider hiding the two competitor dots and shrinking the ChatGPT thread to w 260.

## Map — production notes
- The reference uses raw OpenStreetMap tiles (rate-limited, no SLA, attribution required). Ship with a styled provider instead — Mapbox/MapTiler light style, desaturated, or a single static map image per metro — and drop the OSM credit.
- Center on the visitor's metro when known (IP or saved choice); default Austin. Keep zoom ≈ 12 so streets read as texture, not detail.
- Map is decorative: `aria-hidden`, no pan/zoom, no pointer events.

## Interactions
- Pin pulse is the only motion. Honor `prefers-reduced-motion` (disable the pulse).
- Metro form: Enter or Check → `onCheck(metro)`; empty input focuses the field.
- No hover states on map callouts.

## Brand / legal
- Google "G" and the ChatGPT mark are third-party trademarks used to depict where boards search. Use official assets per each brand's guidelines and have legal review before launch.
- Guarantee wording is a public promise — confirm with legal.
- "Your Company", "Austin", "Oak Hollow HOA · 212 homes" are illustrative placeholders.

## Tokens
Purple `#381c4f` · Pink `#d9356e` (hover `#c12a60`, press `#a82451`) · Yellow `#f5d880` · Gold text `#b8902a` · Green `#aed7d0` / tint `#e1f0ec` / text `#2f7a6a` · Blue tint `#e3eef8` · Lavender `#f3f0f8` · Map bg `#ece8f2` · Border `#e8e4ef` / `#ddd6e6` · Body `#555555` · Muted `#8C7A9E`.
Radii 24 / 18 / 16 / 12 / 10 / 8 / 6 / 999. Font: Gotham (Poppins fallback).
