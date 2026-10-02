# Handoff: Homepage hero — option 7a, v2

Supersedes `design_handoff_hero_map_7a`. Layout, headline, callouts and guarantee are unchanged from v1 — **everything new is in the "What changed" section.** The v1 README still holds the full spec for the map overlays, Google card, ChatGPT thread, referral pill and guarantee badge; this doc only repeats what moved.

## Files
- `reference/hero-map-7a-v2.html` — standalone reference with a **state switcher** (top-right: Idle / Open / Claimed) so every state can be inspected at true size. Stacks under 980px.
- Source design: `Hero Map.dc.html` option 7a (working prototype — type a metro and press Check).

---

## What changed since v1

### 1. Metro card — three states, one fixed height  ⟵ NEW
The card no longer grows on check. Idle, Checking and Result all render a **58px row** in the same slot; the helper text under the field is gone. Card height is identical in every state, so the map (align-items: stretch) never resizes.

| State | Row contents | Header pill |
|---|---|---|
| **Idle** | Combined field: borderless input (placeholder "Enter your metro") + pink **Check** button (h44, min-width 92) | `LIVE` — mint `#aed7d0` dot + text |
| **Checking** (~900ms) | Same field; button label → "Checking" with a 12px spinner (2px ring, `rgba(255,255,255,.4)` / white top, 700ms linear spin) | `CHECKING` — yellow `#f5d880` |
| **Result · Open** | Status row: 10px dot `#2f9e85` with ring `rgba(47,158,133,.18)` → metro name stack → **Reserve it** (success green) → reset button | `OPEN` — mint `#aed7d0` |
| **Result · Claimed** | Same row; dot `#d9356e` ring `rgba(217,53,110,.18)` → **Join waitlist** (purple) → reset | `CLAIMED` — soft pink `#f5a3c0` |

**Status row spec** — white, 1px `#e8e4ef`, radius 12, padding `6 6 6 16`, height 58 (border-box), gap 12, entrance `heroResultIn 360ms cubic-bezier(.16,1,.3,1)` (fade + 6px rise).
- **Metro name stack** (flex 1, min-width 0): name 15 / 700 / lh 1.15 / `#381c4f`, `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`; status word under it 10.5 / 700 / 0.08em / uppercase in the status color. Stacking (not inline) is deliberate — long names ("San Bernardino, CA") ellipsize instead of squeezing the buttons.
- **Reserve it** — bg `#16a34a`, hover `#15803d`, white 12 / 700 / 0.1em uppercase, h44, padding 0 18, radius 8, 13px check glyph, shadow `0 8px 24px rgba(22,163,74,.3)`. Links to the get-started flow with `?metro=`. Copy changed from "Claim it" → "Reserve it" (softer ask).
- **Join waitlist** — bg `#381c4f`, hover `#4c3361`, same type/size, no icon. Links to contact.
- **Reset** — 44×44, bg `#f3f0f8` hover `#e8e4ef`, radius 8, 15px rotate-ccw glyph, `aria-label="Check another metro"`. Returns to Idle and clears the input.
- Header pill: color transitions 200ms; ring is the pill color at 20% alpha.

### 2. Map responds to the check  ⟵ NEW
- Tiles sit in a wrapper with `transition: transform 900ms cubic-bezier(.16,1,.3,1), opacity 400ms`. During **Checking**: `scale(1.1)`, opacity .55. On **Result**: re-center on the metro's lat/lng (zoom stays 12), scale back to 1, opacity 1.
- Pin label updates: "Your Company" → "Your Company · Los Angeles" (metro name before the comma).
- Callout cards and competitor dots do not move.
- Metro resolution in production: use MarketChecker's lookup; the prototype's inline table (Austin/Phoenix/Atlanta/Orlando/Miami claimed; LA/Dallas/Houston/Denver/Tampa/Charlotte/San Diego/Chicago/Las Vegas open) is illustrative only. Unknown input: treat as Open, title-case the typed string, keep the current map center.

### 3. Map tint  ⟵ CHANGED
v1 was gray. Now: tiles `filter: grayscale(1) brightness(1.12) contrast(.98)` under a single **multiply layer `#fdfbf5`** (near-white cream). Clip-layer bg `#fdfbf5`, inset ring `#ece9e0`. No veil, no vignette. Competitor dots `#b8ad99`.

### 4. Metro card header  ⟵ CHANGED (from v1's flat lavender)
Solid purple band `#381c4f`, padding 18×24: title 22 / 700 / white / −0.01em "Is your metro still open?" + the status pill (11 / 700 / 0.1em uppercase, bg `rgba(255,255,255,.08)`, padding `6 10 6 8`, radius 999). Body padding `20 24 24`, gap 20. Guarantee row unchanged (48px badge, 1px `#ddd6e6` top rule).

### 5. Removed
- Helper line under the field ("One management company per metro…") — all states.
- "Live availability" inline label — folded into the header pill.

---

## Unchanged (see v1 README)
Grid `minmax(0,1fr) 560px`, gap 48, stretch. Eyebrow / H2 (pink "who do they find?") / payoff. Google local-pack card (z2), ChatGPT thread (z3), referral pill overhanging right edge (z4), #1 pin with pulse, guarantee badge SVG recipe, mobile rules, brand/legal notes.

## Accessibility
- Status row: `role="status" aria-live="polite"` so the Open/Claimed result is announced.
- Honor `prefers-reduced-motion`: disable pin pulse, map zoom and the row entrance.
- Reset button has an aria-label; all buttons ≥ 44px.

## Tokens added in v2
Success green `#16a34a` / hover `#15803d` · Open `#2f9e85` · Claimed pill `#f5a3c0` · Checking `#f5d880` · Map cream `#fdfbf5` / ring `#ece9e0` / dots `#b8ad99`.
