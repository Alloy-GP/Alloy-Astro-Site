# Addendum: "Emerging PE firm" map signal

Adds one element to the 7a map hero (`design_handoff_hero_map_7a_v2`). Nothing else changes.

## Purpose
A second, slower pulse on the map that signals private-equity consolidation in the metro — a visible threat next to the client's #1 pin. It sits behind the three channel callouts (z 2) and does not interact.

## Placement
Inside the map box (560 × ≥560), absolute: `left: 12%; top: 46%`. Column, centered, gap 7. Occupies the open left-middle area between the Google card and the ChatGPT thread. On mobile keep the same percentages; if it collides with the thread under ~600px, drop `top` to 40%.

## Spec
Marker (40 × 40, position relative)
- Halo: full circle, `#f5d880` at 60% opacity.
- Pulse ring: inset 6px, 2px `#d9a62a` border, `heroPulse 2.4s ease-out infinite` (same keyframes as the #1 pin: scale .6→2.6, opacity .8→0). Slower than the pin's 1.8s so the two never sync.
- Core: 20px circle `#381c4f`, 3px white border, shadow `0 4px 10px rgba(56,28,79,.3)`, centered; contains a 10px Lucide `trending-up` glyph, stroke `#f5d880`, width 3.

Tag
- Pill `#f5d880`, padding 6 × 12, radius 999, shadow `0 6px 16px rgba(56,28,79,.18)`, nowrap.
- Label "EMERGING PE FIRM" — 11px / 700 / 0.10em / uppercase / `#381c4f`.

## Markup (drop-in)
```html
<div class="pe-signal" style="position:absolute; left:12%; top:46%; z-index:2; display:flex; flex-direction:column; align-items:center; gap:7px;" aria-hidden="true">
  <div style="position:relative; width:40px; height:40px;">
    <span style="position:absolute; inset:0; border-radius:50%; background:#f5d880; opacity:.6;"></span>
    <span style="position:absolute; inset:6px; border-radius:50%; border:2px solid #d9a62a; animation:heroPulse 2.4s ease-out infinite;"></span>
    <span style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:20px; height:20px; border-radius:50%; background:#381c4f; border:3px solid #fff; box-shadow:0 4px 10px rgba(56,28,79,.3); display:flex; align-items:center; justify-content:center;">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f5d880" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"></path><path d="M14 7h7v7"></path></svg>
    </span>
  </div>
  <div style="background:#f5d880; border-radius:999px; padding:6px 12px; box-shadow:0 6px 16px rgba(56,28,79,.18); white-space:nowrap;">
    <span style="font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#381c4f;">Emerging PE firm</span>
  </div>
</div>
```
Insert before the competitor dots so it paints beneath the callouts.

## Behaviour
- Decorative only: `aria-hidden`, no pointer events, no hover.
- Honor `prefers-reduced-motion` — disable the pulse ring animation (leave the halo static).
- Static across metro checks; it does not move with the pin.

## Copy note
"Emerging PE firm" is a placeholder label. Alternatives considered: "PE-backed competitor", "New PE roll-up". Confirm wording with the team before launch.
