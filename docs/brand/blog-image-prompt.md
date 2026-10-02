# Alloy blog / article image prompt (Gemini)

Paste the **Style block** every time, then swap the `[SUBJECT]` line. Keep one aspect ratio per use:
16:9 (1600×900) for article heroes and resource cards, 1.91:1 (1200×630) for Open Graph / social.

## Master prompt

```
Flat editorial vector illustration for a B2B marketing agency that serves HOA / community association
management companies. Subject: [SUBJECT — one concrete scene, e.g. "an HOA board of four people around a
conference table reviewing a proposal, with a simplified map pin and a star-rating card floating above"].

STYLE: clean, geometric, modern-editorial. Simple shapes, crisp edges, minimal detail, generous negative
space. Soft paper-grain texture over the whole image. Subtle, long soft shadows; no 3D, no glossy
rendering, no photorealism. Composition on a 12-column grid, main subject slightly left of centre,
calm and uncluttered.

PALETTE (use only these): deep plum #381c4f and darker plum #290d41 for backgrounds and line work;
magenta-pink #d9356e as the single strong accent; soft gold #f5d880; powder blue #a1c8e7; mint
#aed7d0; off-white #f8f7fc for light surfaces. Light version: off-white background with plum and pink
shapes. Dark version: deep plum background with off-white, gold, blue and mint shapes. Pink appears
once, as the focal element.

MOTIFS (pick one or two): rounded rectangular cards with 10px corners; a thin five-colour horizontal
rule (pink, gold, blue, mint, plum) somewhere in the frame; map pins; search bars; a small gold
check mark in a plum circle; rows of simple townhouses or condo rooflines; a clipboard or proposal
document; a ringing phone replaced by an inbox card.

PEOPLE: if present, stylised, flat, diverse, no facial detail, business-casual, shown as board members
or managers — never cartoonish, never caricature.

NO: text, letters, numbers or logos of any kind; no stock-photo realism; no neon or gradients;
no glass, chrome or 3D renders; no clip-art smiley faces; no generic "AI glow".

Aspect ratio 16:9, high resolution.
```

## Subject lines that fit the site

- AI search: "a board member asking a question into a simple chat window, with three answer cards stacked beneath and one card highlighted in pink"
- Local search / map pack: "a city map simplified to blocks and streets, three map pins, the centre pin pink and larger"
- Proposals / RFP: "a stack of three proposal documents on a table, the top one open, a gold check mark seal on its corner"
- Board education: "a small classroom scene, four board members at a table, a flip chart with simple bar shapes"
- Reputation / reviews: "a storefront-style office with a five-star review card floating above it, stars in gold"
- Newsletters / annual reports: "a monthly report card with simple charts sliding into a mailbox"
- Retention / renewal: "a handshake rendered in flat shapes under a calendar card with one date circled in pink"

## Consistency tips

- Generate the first image, then attach it as a reference in every later Gemini request ("match this style exactly").
- Keep the same aspect ratio and the same light/dark choice within a series.
- Export PNG, then compress (Squoosh, ~150 KB) before adding to `public/assets/blog/`.
