# Hero 7a (map hero) — build notes, 2026-10-02 · v2 applied the same day

Built as `src/components/modules/HeroMap.tsx` (static) + `MetroCheck.tsx` (island: header band + the one 58px state row).
`src/lib/hero-map.ts` makes the static map react to the island. Supersedes hero card 2b. `README.md` here is the v2 delta;
`README-v1-full-spec.md` holds the full v1 spec for everything v2 left alone.

Kept from earlier client decisions, where the handoff still shows an older treatment:
- Flush hero (no outer white card / border / shadow), site radii (10) on the metro card, map, callouts and the status row (spec says 12).
- Pink keyword eyebrow "Marketing for HOA Management Companies"; the question is the page H1 (pink last clause as specified).
- The whole guarantee row opens the terms modal; `/faq#guarantee` is the no-JS fallback.
- Both result buttons go to **/contact** (`?metro=…&intent=claim|waitlist`) — the spec's "get-started flow" was retired on 2026-10-01.

v2 as built:
- Idle → Checking (≥900ms beat, spinner, pill CHECKING) → Result. Open: green **Reserve it** · Claimed: purple **Join waitlist** · 44px reset.
  Name stack ellipsizes; on phones the check glyph is dropped so the name gets the room.
- Map: `.rd-hm-map-layer` scales 1.1 / fades to .55 while checking; on result the image is swapped for the metro's own map from
  `/api/map?lat&lng` (`src/lib/map-tiles.ts`: 3×3 OSM z12 tiles → grayscale → cream multiply → 768px WebP, in-memory memo + 30-day CDN cache),
  then scales back. Pin label → "Your Company · City". Callouts/dots stay put. Unknown input → Open, title-cased, map unchanged.
- Tint: cream `#fdfbf5` multiply over lifted grayscale tiles, ring `#ece9e0`, competitor dots `#b8ad99`; no veil/vignette.
  The committed Austin default uses the same recipe: `node --experimental-strip-types .context/gen-map.mjs`.
- Reduced motion: no pulse, no zoom, no row entrance. Status row `role="status" aria-live="polite"`.

Marks: Google "G" is the brand SVG from the handoff (nominative use). The ChatGPT avatar is a neutral sparkle glyph,
not the OpenAI mark — swap in the official asset after brand/legal review (see launch checklist #17).
Attribution "© OpenStreetMap contributors" stays on the hero because every map image derives from OSM tiles.
