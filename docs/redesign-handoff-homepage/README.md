# Handoff: alloygp.co Homepage (final)

Supersedes the homepage section of `design_handoff_alloygp_rebuild/README.md`. Everything else in that package (nav, footer, templates, SEO rules, redirects) still applies.

## About the design file
`site/index.dc.html` is a **design reference built in HTML** — a working prototype, not production code. Recreate it in the Astro codebase as `HomePage.tsx` (or split into modules under `src/components/modules/`) inside `BaseLayout`. Open the file in a browser and scroll; every interaction described below is live in it.

## Fidelity
High-fidelity, desktop. Mobile not designed — stack every two-column grid at ≤900px; the hero card goes full-width under the H1.

## Page structure (top → bottom)
1. Header (shared `SiteHeader`)
2. **Hero** — headline + outcomes card with metro map
3. **Network leads** (purple band) — column chart + copy
4. **Partner ledger** (light, textured) — 3 stats + line chart
5. **What you get in your metro** — three engines
6. **Latest** — news / webinar
7. CTA bar
8. Footer (shared `SiteFooter`)

Sections 5–7 are unchanged from the earlier handoff; see the file.

---

## 1. Hero
Grid `1.1fr 1fr`, gap 72, `align-items:center`, padding 104px 40px 96px, white bg.

**Left**
- H1 80px / 900 / .95 / -.03em, purple: "Attract the right boards. Match their needs. <pink>Retain their business.</pink>"
- Body 20px/400/1.5 `#555`, max-width 560: "You know how to manage. We handle the growth — and we only do it for CAM. No dentists, no SaaS, no distractions. One firm per metro, so boards reach you before they shop."
- Buttons: primary pink **Claim your market** → `/get-started`; ghost text link **See what's inside →** → `/boardsuite`.

**Right — the outcomes card** (purple `#381c4f`, radius 10, padding 28px 30px, shadow lg, white text). Three stacked blocks, gap 18:

### 1a. Header row
Eyebrow "YOUR METRO. YOUR GROWTH." (12px/700/.14em yellow `#f5d880`) · right: "One partner per market" (11px, 65% opacity).

### 1b. Outcome tiles — two-up carousel
- Two pages, each a `1fr 1fr` grid (gap 10) of two tiles. Page A: **Paid leads** + **Organic + local**. Page B: **AI exposure** + **Network leads**.
- Auto-rotates every **4200ms** once the card has scrolled into view; **pauses on hover**; two dots below (active = 20×6 yellow pill, inactive = 6×6 30% white) click to jump.
- Page enter animation: `opacity 0→1, translateX(18px)→0`, 420ms `cubic-bezier(0.16,1,0.3,1)`.
- Tile: `rgba(255,255,255,.07)`, radius 8, padding 20px 22px, **fixed height 188px** (prevents layout shift between pages), flex column gap 14. Eyebrow 11px/700/.12em uppercase in the tile color · number 38px/900 + 12px label · 56px chart slot.

| Tile | Color | Number | Label | Chart | Reveal motion |
|---|---|---|---|---|---|
| Paid leads | pink `#d9356e` | counts 0→**28** | inquiries | 12 bars (values 3,5,4,8,9,12,14,13,18,21,24,28), last bar white | bars grow from baseline, 700ms, 45ms stagger |
| Organic + local | blue `#a1c8e7` | **#9 → #3** countdown | on the map | polyline 0,40 20,38 40,30 60,26 80,16 100,10 120,4 + white end dot | line draws via pathLength 1400ms; dot pops at 1500ms |
| AI exposure | yellow | counts 0→**4**/4 | AI engines | 2×2 pills: ChatGPT · Gemini · Perplexity · Google | pills light up (border+text yellow, bg 18% yellow) 400ms, 200ms stagger |
| Network leads | green `#aed7d0` | counts 0→**10** | boards | two labeled bars: **MHOA** (green, 100%) / **GA** (muted, 30%) | widths grow 800/1000ms |

Counters use cubic ease-out (`1-(1-p)^3`); durations 900–1300ms. All reveal once, triggered by IntersectionObserver at 35% visibility on the card.

### 1c. Metro check (below a 1px 14%-white divider, padding-top 18)
- Row: "Is your metro still open?" (14px/700) · right: status label (11px, 65%): *Live availability* / *Checking…* / *Open* / *Claimed*.
- **Map strip**: 150px tall, radius 8, overflow hidden, bg `#2a1440`. OpenStreetMap raster tiles (`tile.openstreetmap.org/{z}/{x}/{y}.png`, 256px), `filter: grayscale(1) contrast(1.05)`. Overlays: gradient `rgba(56,28,79,.35)→.55` top→bottom; inset shadow `inset 0 0 40px rgba(42,20,64,.9)` vignette; "© OpenStreetMap" 8px 45% bottom-left. **Production: swap the mock ZIP table for a real ZIP→metro lookup and a claimed-metros list from the CMS.**
  - **Idle**: view lat 37.8, lng -96.5, zoom 3 (whole US). Metro dots projected onto the map: claimed = 7px pink with 4px 25%-pink halo; open = 5px 55% white.
  - **Loading** (1600ms mock): tile layer scales to 1.12 and dims to 60% (900ms emphasis ease); centered white 18px dot with pulsing yellow ring.
  - **Result**: view zooms to metro (zoom 10), pin at center — 14px, status-colored, 3px white border, drops in (`translateY(-24px) scale(.6)→0/1`, 500ms) with a pulse ring; **result pill** slides up over the bottom of the map (white, radius 8, padding 9px 10px 9px 14px, shadow, 380ms enter, 120ms delay): status dot + metro name (13px/700) + "· open" / "· claimed" (12px `#555`) — then **Claim it** (success green `#16a34a`, hover `#15803d`, check icon, green glow) or **Waitlist** (purple, hover `#4c3361`) and a ✕ that resets.
  - Status colors: open `#16a34a`, claimed `#d9356e`. **`#16a34a` is a new semantic "success" token — add to `colors_and_type.css`.**
- Input row: ZIP input (white, radius 8, padding 12px 14px, 14px/500, numeric, max 5) + **Check** (pink, 11px uppercase, padding 12px 18px). Enter key submits.

---

## 2. Network leads (purple band)
Padding 80px 40px. Grid `1.1fr 1fr`, gap 64, `align-items:stretch`. **Chart left, copy right.**

**Chart card** (`rgba(255,255,255,.07)`, radius 10, padding 28px 32px 24px, fills column height)
- Header: eyebrow "BOARD LEADS PER MONTH, SAME METRO" (yellow) · "Illustrative" (11px 60%).
- Chart area: fixed **220px** tall, two columns (`1fr 1fr`, gap 28), 1px 18%-white baseline. Each column: number (44px/900) sitting on top of a bar (max-width 140, radius 8 8 0 0). Left bar 28% white → **30%** height, number **3** at 85% opacity. Right bar green `#aed7d0` → **100%**, number **10** green. Heights animate from 0 on scroll-in (900ms / 1100ms, 100/250ms delay). Numbers count up.
- Labels under each column, centered: "YOUR OWN PAID ADS" + ⓘ / "You pay per click." · "MATCHHOA NETWORK" (green) + ⓘ / "Included. Yours alone." (13px/700).
- **Tooltips** on the ⓘ (18px Lucide `info`): open above, centered on the icon, 300px wide, white, radius 10, padding 16px 18px, 14px/500 purple, shadow `0 16px 40px rgba(0,0,0,.3)`, 12px caret; enter `opacity 0→1, translateY(8px)→0` 240ms emphasis ease. Copy:
  - Paid ads: "Average board leads a CAM firm gets running its own Google Ads with an active budget. Paid for, one click at a time."
  - Network: "Boards we bring in through MatchHOA and hand to you at no cost — included as an Alloy partner. Nobody else in your market can buy them."

**Copy right** (vertically centered): eyebrow "NETWORK LEADS · MATCHHOA" (yellow, 28×3 rule) · H2 44px/900 "We run the place boards go to find their next management company." · 17px 85%: "Boards submit on MatchHOA. In your metro, every one goes to you." · row: primary pink **Claim your market** + the **MatchHOA wordmark** (`assets/match-hoa-white.svg`, 44px tall, white, links to matchhoa.com in a new tab, 90% opacity → 100% + 1px lift on hover). No text link.

---

## 3. Partner ledger (light section, textured)
Padding 96px 40px. Background: `#f8f7fc` + film grain overlay (SVG feTurbulence, baseFrequency .9, 2 octaves, tinted purple, **6% opacity**, 160px tile) + 2px five-color accent rule at top + wash `linear-gradient(180deg, rgba(56,28,79,.05) 0, transparent 140px)`. This texture treatment applies to **every** `#f8f7fc` section site-wide — implement once as a `.section-light` class.

- Header grid: H2 56px/900 "The partner ledger." · 17px `#555`: "One CAM company, one metro, three years in. This is what the exclusivity bought them."
- Two cards (`1fr 1fr`, gap 20), white, radius 10, border `#e8e4ef`:
  - **Ledger rows** (padding 26px 28px, 1px dividers), each fades/rises in sequence (480ms, 110ms stagger) with counting numbers 40px/900: "Lead intake vs. prior baseline" **+535%** · "Proposal requests" **3×** · "Qualified → closed" **40–60%** · quote row: "We went from chasing RFPs to having boards reach out directly." — CEO, Alloy CAM partner. Suffixes (%, ×, –60%) at .5em/700.
  - **Chart card** (padding 28): label row "Lead intake, indexed" · "Year 1 → Year 3". SVG 500×260: 4 gridlines; yellow 18% band `x=70 → 500` labeled "WITH ALLOY" (fades in at 900ms); line `0,214 35,212 70,211 120,200 170,184 230,160 290,128 350,94 410,60 460,36 500,20` purple 3.5px draws left→right 1600ms; pink end dot pops at 1700ms; axis labels Year 1 / Year 2 / Year 3. Link "Read the full case study →" → `/results/apex-cmg`.

---

## Motion summary
Emphasis ease `cubic-bezier(0.16,1,0.3,1)` for reveals; standard `cubic-bezier(0.2,0.8,0.2,1)` for hovers (120ms). Everything reveals once on scroll-in. No bounces, no parallax. Keyframes used: `alloyPaneIn` (carousel page), `alloyPin` (map pin drop), `alloyTipIn` / `alloyTipIn2` (tooltip / result pill), `alloyPulse` (ring). Existing `AnimatedNumber.tsx` covers the counters; `MarketChecker.tsx` can be refactored for the map (its ZIP lookup logic is reusable).

## State (hero card)
`zip` (string) · `phase` idle | loading | result · `metro` {name, lat, lng, claimed} · `dash` 0|1 · `dashPaused` · `tipA`/`tipB` (tooltips) · `rv_dash` / `rv_match` / `rv_ledger` (scroll-reveal flags).

## Data to wire
- ZIP → metro geocode + claimed/open status (replace the mock `ZIPS` table).
- Outcome tile numbers (28 / #3 / 4 / 10) and network-leads numbers (3 vs 10) are **illustrative placeholders** — confirm with the client or pull from reporting.
- Ledger stats are the 3-year partner's real results (already on `/results`).

## Tokens
Purple `#381c4f` · Pink `#d9356e` (hover `#c12a60`, press `#a82451`) · Yellow `#f5d880` · Blue `#a1c8e7` · Green `#aed7d0` · Off-white `#f8f7fc` · Border `#e8e4ef` · Body `#555` · Purple-90 `#4c3361` · **Success `#16a34a` (new)** · Map base `#2a1440`.

## Changelog (since v1 of this handoff)
- **MatchHOA logo** replaces the "matchhoa.com →" text link in the Network leads section. Asset: `assets/match-hoa-white.svg` — the client's wordmark with every path hard-filled `#ffffff` (the source SVG shipped with no fills). Also included: `assets/match-hoa-wordmark.svg` (white text + coral `#f47c6c` heart) if a two-tone version is preferred. Copy to `/public/assets/`.
- **Ledger chart**: "With Alloy" band now starts at x=70 of 500 (~14% in) so a short pre-Alloy flat stretch reads before the climb; line points updated (see §3). Axis labels are Year 1 / Year 2 / Year 3; copy says "three years in."

## Files
- `site/index.dc.html` — the homepage (open this)
- `assets/match-hoa-white.svg`, `assets/match-hoa-wordmark.svg` — MatchHOA logo variants
- `site/SiteHeader.dc.html`, `site/SiteFooter.dc.html`, `site/alloy-motion.js`, `site/support.js` — required to run it
- `assets/`, `fonts/`
