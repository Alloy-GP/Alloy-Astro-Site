# Hero 7a (map hero) — build notes, 2026-10-02

Built as `src/components/modules/HeroMap.tsx` (+ `MetroCheck.tsx` island for the header band + field). Supersedes hero card 2b.

Kept from earlier client decisions, where this handoff still shows the older treatment:
- Flush hero (no outer white card / border / shadow), site radii (10) on the metro card, map and callouts.
- Pink keyword eyebrow "Marketing for HOA Management Companies"; the question is the page H1 (pink last clause as specified).
- The whole guarantee row opens the terms modal; `/faq#guarantee` is the no-JS fallback.
- Open / Claimed result state replaces the field after a check.

Map: a single static image per metro, generated from OpenStreetMap tiles by `.context/gen-map.mjs` (grayscale, lifted,
lavender tint) — Austin shipped. Attribution kept ("© OpenStreetMap contributors") because the image derives from OSM.
Per-visitor metro needs a map provider key (Mapbox / MapTiler) or a pre-generated image per partner metro.

Marks: Google "G" is the brand SVG from the handoff (nominative use). The ChatGPT avatar is a neutral sparkle glyph,
not the OpenAI mark — swap in the official asset after brand/legal review (see launch checklist #17).
