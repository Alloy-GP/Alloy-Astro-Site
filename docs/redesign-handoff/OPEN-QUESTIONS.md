# Redesign — open questions & repo discrepancies

Found while reconciling the handoff (written against `c3c47de`) with the repo on 2026-09-23.
Answer inline. Items marked **Assumption** are what the build will do if nothing is said.

## 1. Redirect conflicts (blocking for launch, not for build)
The handoff's two rules — "do not remove any existing redirect" and "no redirect chains" — collide in `astro.config.mjs`:

- **Loop:** `/boardmatch → /our-approach/boardmatch` exists today. The redesign makes `/boardmatch` a page and sends `/our-approach/boardmatch → /boardmatch`. The old rule must be deleted.
- **Chains** — existing rules whose target will itself redirect. Plan: re-target to the final URL (edit, don't remove):
  - → `/our-approach/boardmatch`: `/category/boardmatch`, `/focus/sales`
  - → `/our-approach/boardretain`: `/boardretain-hoa-client-retention`, `/category/boardretain`, `/focus/retention`
  - → `/resource-hub/ai-search-for-cam`: `/services/ai-search-optimization-for-hoa-cam-companies`
  - → `/resource-hub/cam-marketing-strategy`: `/services/marketing-strategy-campaign-planning-for-cam-companies`
  - → old social-media URL: `/focus/social`, `/services/video-marketing-for-hoa-management-services`
  - → `/we-know-cam`: `/why-hoa-management-companies-need-specialized-marketing`
  - → `/courses/trust-building/lessons/*` and `/courses/trust-building-quiz`: the 12 old WordPress course rules + `/courses/trust-building-lesson`
  - `.html` rules whose targets are `Astro.redirect()` shells (`/we-know-cam.html`, `/our-approach*.html`, `/resource-hub*.html`, `/courses.html`, `/groundwork.html`, `/hoa-board-education-programs.html`, `/hoa-cam-marketing-services.html`, `/strategic-review-request.html`) — these already chain today; re-target.
- **Rules pointing at dropped pages** (would 404 after launch):
  - `/focus/advertising-ads`, `/services/hoa-management-google-ads-ppc-management` → `/boardreach/google-ads-ppc`
  - `/services/organic-local-seo-for-cam-companies` → `/boardreach/local-pack-optimization`
  - **Proposed:** PPC → `/boardreach/property-management-lead-generation`; local pack → `/property-management-seo`. Confirm.
- **The dropped pages themselves** (`/boardreach/local-pack-optimization`, `/boardreach/google-ads-ppc`): handoff says 301 only if indexed. Both are in the live nav and the auto-generated sitemap, so they have been crawled. **Proposed:** add the 301s regardless, same targets as above. Confirm.
- The `Astro.redirect()` shell routes (`we-know-cam.astro`, `groundwork.astro`, `resource-hub.astro`, `courses.astro`, `courses/trust-building.astro`, `hoa-cam-marketing-services.astro`, `strategic-review-request.astro`, `hoa-board-education-programs.astro`, `services/hoa-newsletter-production.astro`) move into `astro.config.mjs` with final targets.

## 2. Nav: the handoff contains two versions
- `README.md`, `docs/nav-data.json`, `site/SiteHeader.dc.html`, `page-inventory.md §8`: **4 items + CTA** — The System ▾ · Results · Pricing · Resources · "Claim Your Market". About lives in the footer only.
- `docs/alloygp-sitemap.md §4`: 7 items — BoardSuite · Services ▾ · Results · Pricing · Resources · About ▾ · "Get Started".
- **Assumption:** 4-item nav. `alloygp-sitemap.md §4` is treated as stale.

## 3. Header: search and Log in
The design has neither. The live header has a search modal and a "Log in" button (→ growth.alloygp.co, fixed in `3651146`).
Keep either? **Assumption:** drop both, per the design.

## 4. Font weight 900 renders as Gotham Ultra
The prototypes declare Gotham-Black at `font-weight: 900`. The site's `colors_and_type.css` maps **800 → Black** and **900 → Ultra**. Building H1/H2 at 900 as written would render heavier than the design.
**Assumption:** use 800 (Black) wherever the design says 900. Alternative: remap CSS so 900 = Black and drop Ultra.

## 5. Titles and meta descriptions
Handoff: "flow through BaseLayout exactly as today." But the prototype `<title>`s differ from live on nearly every page and are mostly generic ("Careers | Alloy GP", "Contact | Alloy GP").
**Assumption:** keep the live title + description on every existing URL (zero regression). Write new ones only for the new hubs `/boardmatch` and `/boardretain`. MOVEd pages keep their old title. Say if you want the prototype titles instead.

## 6. Live pages that are not in the 40-route table
- `/boardstart`, `/cam-growth-portal`, `/find-your-path` — self-contained landing pages (`hideHeader hideFooter`), unaffected by the chrome rework.
- `/results/rise-amg` — noindex duplicate of apex-cmg; a redirect rule for the same path already exists.
- `/api/*`, `/thinktank` — endpoints.
**Assumption:** leave the landing pages and endpoints live and untouched; delete `rise-amg.astro` so the redirect wins. The new sitemap filter would exclude `/boardstart` and `/cam-growth-portal` (both indexable today) — confirm whether they should stay listed.

## 7. Metro checker (homepage hero)
Design: ZIP input → ~1.6s "checking" state → Available / Not available over a map tile credited "© OpenStreetMap". The existing `MarketChecker.tsx` is city-name based with a hardcoded 10-metro lock list and no map. Decisions needed:
- ZIP → metro lookup: bundled ZIP-centroid table (offline), a free API (zippopotam.us), or a new `/api/metro` endpoint?
- Map tiles: raw OSM tiles are not licensed for production traffic. Static image per result, or a keyed provider (MapTiler / Stadia)?
- Lock list: reuse the 10 metros in `MarketChecker.tsx`?

## 8. Claims in the copy
"Copy is final-draft; client will review claims." Numbers used across the design: +535% lead intake, 3× proposal requests, 40–60% qualified→closed, 3 vs 10 board inquiries/month via MatchHOA, "eighteen months in", "closing 1 in 4 → 1 in 2". Building with these as-is; flag any that should not ship.

## 9. Smaller assumptions (speak up only if you disagree)
- Icons: extend the in-house `Icon.tsx` with `chevron-right` / `chevron-down` instead of adding `lucide-react`.
- Engine ink colors `#b8942a` (match) and `#3f8f83` (retain) are added to `tokens.ts` and as CSS vars.
- Mobile: follow the existing `mobile.css` breakpoints (980 / 720 / 480), not the handoff's ≤900 note.
- Homepage keeps the `HeroStatic.astro` static-H1 pattern for LCP.
- Trust-building guide copy comes from `src/data/courseTrustBuilding.ts` (prototype has ~1.1k words of structure; target is 4–5k).
- Forms wire to existing endpoints: `/api/lead` (get-started), `/api/subscribe` (resources newsletter), `/api/contact`.
- Nothing merges to `main` until you say so. The branch gets Vercel preview builds only.

---

## Build log additions (2026-09-23, during the build)

## 10. Hubs have no FAQ section in the prototypes
`boardreach`, `boardmatch`, `boardretain` prototypes go from "What it costs to wait" straight to the CTA bar. The handoff asks for FAQPage schema on the hubs, but Google requires the Q&As to be visible on the page. **Built without hub FAQ / FAQ schema.** The `HubPage` template renders an optional FAQ block if `faq` is added to the hub data later.

## 11. Metro checker implementation (built, needs a launch decision)
- ZIP → place: new `GET /api/metro?zip=` endpoint. Live lookup via Zippopotam (free, no key, 2.5s timeout) with a bundled 3-digit-prefix fallback table.
- Claimed/open: within 15 miles (client decision 2026-10-01; was 30) of one of the 10 partner metros carried over from the old `MarketChecker.tsx` (Denham Springs LA, Branford CT, Orlando FL, Manchester NH, Venice FL, Fredericksburg VA, Houston TX, Austin TX, San Antonio TX, Owings Mills MD). **Confirm this list is current.**
- Map: **resolved 2026-10-01** — replaced the OpenStreetMap raster tiles with a flat, brand-colored vector map of the contiguous US (US Census boundaries, public domain; `src/data/us-map.ts`, Albers projection in `src/lib/albers.ts`). No third-party tiles, no attribution, no network dependency.
- "Waitlist" → `/get-started?intent=waitlist&zip=…`, "Talk to us" → `/contact`, "Claim it" → `/get-started?zip=…`.

## 12. Homepage webinar block
Prototype copy: "Oct 14 · Live webinar · 45 min · AI search for CAM: how boards find management companies in 2026". Built as designed; "Save my seat" posts the email to the existing `/api/subscribe` (newsletter list). **Is there a real webinar? If not, remove or re-date before launch.**

## 13. Service-page accent colors
Prototypes use pink for the hero eyebrow, "Questions" eyebrow, check icons and step numerals on every service page regardless of engine; only the sibling-services card label uses the engine ink (gold / teal). Built that way.

## 14. Content the redesign drops (built per prototype — say if any should come back)
- **/about/testimonials**: the Vimeo testimonial video (Jason D., RISE AMG), the Valerie L. / Rikky M. quotes and three others, per-engine stats, and the firm-name list. Prototype has fewer, longer quotes.
- **/careers**: old 6 roles, principles, benefits, hiring process and the careers@ mailto → prototype's 3 roles linking to /contact.
- **/about**: "Why we exist" and "Our discipline" sections. We-Know-CAM content folded into "Why CAM-only" (`#why-cam-only`).
- **/get-started**: the old ZIP market checker and diagnostic flow (the checker now lives on the homepage). The kept meta description still mentions a "ZIP market check".
- **/growth-modeled**: the assumption notes and "An estimate, not a quote" sections.

## 15. FAQ copy contradicts the new pricing/exclusivity copy
Kept verbatim from the live site: exclusivity lasts "the engagement and 12 months after" (prototypes say "for the life of the engagement"); tier names Steady / Accelerate / Ascend (new pricing page: Foundation / Growth / Scale); "Do you do paid ads?" still promises Google Ads while the Google Ads page is dropped. **Needs a ruling before launch.**

## 16. Legal "Last updated"
Prototype says "Effective September 2026"; kept the live "Last updated: January 2026" because the policy text references it. Legal call.

## 17. Pre-existing: `/api/lead` interpolates user input into the notification email HTML without escaping. Not touched; worth fixing separately.

## 18. Resource / article pages — content decisions made during the build
- **/resources/hoa-management-software-guide**: live sections (old ids kept) interleaved with the prototype's five; the live text called the case-study client "RISE AMG" — changed to "Apex CMG" to match `/results/apex-cmg` (the case study says the client name was changed, so the old text may have leaked the real name). Prototype adds a vendor rating table and the claim "BoardSuite Scale includes the custom integration work" — **both new claims, review.**
- **/results/apex-cmg**: prototype says "3-year engagement / Year one·two·three" and "growth flat for three years"; the live copy describes an 18-month build and a firm "growing organically". **Both kept; pick one.** Header highlights Results.
- **/resources/courses/trust-building**: 11 sections rendered from the full lesson data (~4,700 words); the prototype's own short section paragraphs (~800 words) were not layered on top to avoid duplication. Quiz has 5 questions (prototype said "ten"); copy adjusted. Completion text still references a "Putting Trust Signals to Work" course that doesn't exist.
- **/resources/cam-marketing-strategy**: 5 prototype sections + 3 live sections; visible byline dropped (author kept in Article schema).
- **/resources**: prototype's "AI search" card links to `/resources/cam-marketing-strategy` though the AI-search content now lives at `/property-management-seo` — kept as designed; the "All articles" link points at `/resources` itself.
- Article section headings are `<h2>` (prototype used `<h3>`) to keep a valid outline under the single H1.

## 19. Sitemap
Allowlist = the 40 canonical routes + `/boardstart` and `/cam-growth-portal` (indexable today, outside the redesign). Remove those two from `SITEMAP_ROUTES` in `astro.config.mjs` if they should not be listed.


## 20. Homepage update (docs/redesign-handoff-homepage, built 2026-09-24)
- **Hero copy conflict.** The update's prototype uses the old subhead ("You know how to manage…") and no eyebrow; your later instruction gave a keyword eyebrow-as-H1 and a new subhead. **Kept your copy.** Say if the prototype's should win.
- **Illustrative numbers.** Outcome tiles (28 inquiries, #9→#3, 4/4 AI engines, 10 boards) and the network chart (3 vs 10 board leads/month) are placeholders per the README — confirm or replace with reporting data.
- **Open-metro dots** on the idle map come from a hand-picked list of large metros in `src/data/metros.ts`; the claimed list is the same 10 partner metros as before. Replace both from the CMS when available.
- **Success green `#16a34a`** added as `--success` / `--success-hover` tokens.
- **Textured light sections** (grain + 2px five-color rule + wash) now apply to every off-white `<section>` site-wide via `.rd-bg-off` / `.section-light`, as the README asks.

## 21. Content depth restored (2026-09-30) — items to confirm
Service pages were rebuilt from the prototypes at ~400 words; the pre-redesign pages ran 700–1,700. All 15 service pages and six other pages were brought back to comparable depth using the old pages' substance (see git history for the retired components). Figures reused from the old pages that should be re-confirmed before launch:
- Reputation: **87% of board directors read reviews before contacting a firm** (old page credited an "Alloy CAM operator survey, 2026"); **200+ negative reviews handled, none escalated to legal**.
- RFP Response: **200+ CAM selection meetings sat through**. Thought Leadership: **200+ trade-press placements**.
- Branding: **73% of firms haven't refreshed in 8+ years**. Annual Report: **88% never open the stapled packet; 1.7× renewal probability**. Email: **38% open rate vs a 21% B2B benchmark**.
- Deliberately dropped where they conflicted with approved prototype stats or pricing framing: old dollar ranges (website $25K–$75K, RFP $14k–$32k, thought leadership $9k–$16k/mo, annual report $8K–$18K), old timelines that contradict the new ones (14-day RFP sprint vs 10 days; 12–16 week rebrand vs 60–90 days), "64% win rate" (vs 40–60%), "30–60 reviews/quarter" (vs 10+).

## 22. Social media positioning gap
The old `/services/social-media-marketing-for-hoa-management-companies` page sold **per-association community feeds** (dozens of feeds, 2–3 posts a week per association, replacing the board secretary) and ranked for that intent. The redesign repositions social as founder-led LinkedIn for the firm. Its URL now 301s to `/boardreach/hoa-social-media-marketing`, so those searches have no matching page. **Decide:** is the community-feed service still offered? If yes it needs a section or its own page; if no, expect that traffic to fall.

## 23. Testimonials, careers, video — confirm before launch
- **/about/testimonials** now shows the real quotes the old page had (Rim E. in full, Valerie L., Rikky M.) plus the Jason D. / RISE AMG video. Three old quotes (Marcus T., Dana W., Priya S.) were **left out** because the old component paired them with placeholder firm names ("Cardinal CAM", "Sunbelt HOA Group") — confirm they are real before publishing (they're in `git show c3c47de:src/components/pages/TestimonialsPage.tsx`).
- **Anonymity:** the video caption names RISE AMG, while `/results/apex-cmg` anonymizes the same firm as "Apex CMG*". Decide whether the case study stays anonymous; if so, the video caption (or the video) has to go.
- **/careers** benefits are the old page's figures verbatim (100%/80% health cover, $2K HSA, 4% 401(k), 16 weeks parental leave, $3K learning budget, two offsites a year). Confirm they're current. Roles now email careers@alloygp.co.


## 24. Resolved 2026-10-01 (client)
- Tier names are **Steady / Accelerate / Ascend** (not Foundation / Growth / Scale). Renamed on /pricing, /boardsuite, and in service FAQs.
- Exclusivity wording: **for the length of the engagement, renewing with the contract unless something changes.** Applied on /faq, /boardsuite, /about.
- **Google Ads is still offered.** `/boardreach/google-ads-ppc` restored as a service page (old URL, old title/description); the legacy `/focus/advertising-ads` and `/services/hoa-management-google-ads-ppc-management` redirects point at it again; added to nav, footer, BoardReach hub, and sitemap. Services count is now 17.

- **Case-study client stays anonymous** (client decision 2026-10-01). The testimonials video is now attributed to "CEO, Alloy CAM partner"; no firm or person names on the site. Note: the video itself may name the firm on camera — Alloy's call whether to keep it. The unreferenced legacy headshots in `public/assets` (`jason-delgado.jpg`, `apex-cmg-ceo.jpg`) were removed.

## 25. Testimonials — which quotes are real (resolved 2026-10-01)

**Decision:** Publish only the two testimonials the client supplied verbatim: Rim E. (HOA Management Operator) and Valerie L. (Business Development), plus the anonymized partner-CEO video. Removed until confirmed real: the prototype's four placeholder quotes (CEO / Principal / Owner / Director of Operations), the old quote wall's Rikky M., and the old code's Marcus T. / Dana W. / Priya S. Attribution uses first name + last initial + role; no firm names or metros.

**Side fix:** Google results showed a generic globe because production only declared an SVG favicon and `/favicon.ico` returned 404. Added `favicon.ico` (16/32/48), `favicon-48.png`, `favicon-96.png`, `apple-touch-icon.png` (180, on brand purple), `icon-192/512.png` + `site.webmanifest`, generated by `.context/gen-favicons.mjs`. Takes effect in search only after launch (main is locked) and a Googlebot favicon recrawl.

## 26. Webinar block + placeholder articles (resolved 2026-10-01)

**Decision:** The homepage webinar ("Oct 14 · AI search for CAM") was not a real event — removed, along with `WebinarSignup.tsx`. Events may come later; nothing is scheduled. "No fake blogs": the prototype's placeholder article cards (homepage news grid, `/resources` Latest) linked to unrelated pages — replaced with the site's real pieces only (AI-search article, CAM marketing strategy, HOA software guide, trust-building course, Apex case study, newsletter archive).

**Restored:** the live site's second article, *How CAM Firms Win in AI Search*, now lives at `/resources/ai-search-for-cam` (copy verbatim, original title/description/author schema; `/resource-hub/ai-search-for-cam` 301s there instead of to the SEO page, which keeps its own AI-search sections). The sitemap spec's "absorb into /property-management-seo" is superseded.

**Not on the live site:** the nine pre-Astro blog URLs in `astro.config.mjs` ("Old blog / article pages") are redirect-only — their content was never in this repo. Recoverable from the Wayback Machine if wanted.

## 27. Hero card 2b — built (2026-10-01)

**Built from** `docs/redesign-handoff-hero-2b/` (v2, "final"). Calls made because the handoff didn't settle them:
- **Composition:** the card is designed at 960px and the old right column was 480px, so the hero is now copy on top (keyword H1 + headline left, intro + CTAs right) with the card full width beneath. The hero copy the client chose is unchanged.
- **Metro input:** free text per the design. `/api/metro?q=` resolves a ZIP (Zippopotam), "City, ST" (Zippopotam city endpoint), or a bare city (Nominatim/OpenStreetMap with an identifying User-Agent, cached a day; falls back to our own metro list). The result replaces the form in place (no map any more): Open → "Claim it", Claimed → "Join the waitlist", both carry `?metro=` to /get-started.
- **Guarantee terms link:** there is no terms page, so "See guarantee terms" → `/faq#guarantee` (new anchored entry using only the handoff's wording + "full terms are part of your engagement agreement"). The old FAQ answer "Do you guarantee results? — No." contradicted the card and was rewritten. **Legal must confirm the promise before launch** (launch checklist #15).
- **Mobile:** stacked as specified (card ≈1,300px tall on a 390px phone). A horizontal rail for the three moments is the alternative if that feels long.
- The vector US map (`us-map.ts`, `albers.ts`) and the illustrative outcome tiles are gone, which also closes launch question 6.

**Addendum (2026-10-01, client):** keep the guarantee and show the terms in a **modal**, not a page — the condition is that the firm follows the programs Alloy puts in place so Alloy can deliver on the promise (`lib/dialog.ts`, `#guarantee-terms` in `HeroCard.tsx`; `/faq#guarantee` is the no-JS fallback and uses the same wording). Mock card content is fine ("they are examples"). Exclusivity: the client will send a list of partner office cities/addresses; everything within **15 miles** of an office is claimed (`LOCK_RADIUS_MI` 30 → 15). Legal sign-off on the guarantee wording is still owed.

**Addendum 2 (2026-10-01, client):** remove the hero banner copy and layout — the card is the hero. To keep the page's keyword H1, the card eyebrow now reads "Marketing for HOA Management Companies" (as an `<h1>`) instead of the handoff's "Growth partner for CAM companies · One per metro"; the question headline stays an h2. Flip back by swapping the eyebrow text if the designer's line is preferred — the exclusivity message survives in the payoff and availability copy.

## 28. Illustrative homepage numbers (resolved 2026-10-01)

**Decision:** keep. The network-leads chart (3 board leads/mo from paid ads vs 10 via MatchHOA, labelled "Illustrative") and the partner ledger (+535% lead intake, 3× proposal requests, 40–60% qualified-to-closed) stay as they are.

## 29. Statistics audit (resolved 2026-10-01)

**Research:** 88% "never open the annual packet" and 73% "haven't refreshed their brand in 8+ years" have no source (prototype copy) → rewritten without numbers. 21% email benchmark ≈ HubSpot's all-industry average (attributed); Mailchimp's own 2025 figure is ~35% because Apple Mail inflates opens. **Client confirmed real:** 38% median open rate on Alloy CAM programs; 200+ negative reviews handled; 200+ CAM selection meetings; 200+ trade-publication placements; every careers benefit and the three open roles.

## 30. Homepage SEO alignment + hero polish (client, 2026-10-01)

- **H1** = the hero question, now "…looks for a new **HOA** management company…" (client: "marketing" needn't be in it). The keyword eyebrow stays as a plain pink label.
- **Title** → `Marketing for HOA Management Companies | Alloy Growth Partners`; **description** rewritten around the term; the purple band H2 names "HOA management company". This is the one deliberate title change on an existing URL.
- **Guarantee card** is the button (whole card opens the terms modal, lifts 2px on hover).
- **Story animation** (`lib/hero-story.ts`): one moment at a time — Google types the query then the #1 result pops; AI types the question, thinks, the answer slides in; Referral shows the request, a pink "Searching for a match…" sweep, then the match pops and the check draws. Plays once when the card is in view; static under reduced motion or without JS.

## 31. Social media scope (resolved 2026-10-01)

**Decision:** Alloy runs social for CAM firms only — never per-association / HOA board feeds. The old site's community-feed offer is gone for good; `/boardreach/hoa-social-media-marketing` (firm channels + founder-led LinkedIn) already matches and was left as is.

## 32. About page + Get Started (resolved 2026-10-01)

- **About:** keep the new page (old "Why we exist / Our discipline" stay retired). Stat band switched to the yellow-unit treatment ("35+ years" — numeral white, unit word yellow, hairline dividers), same data. New founders video section (Vimeo 1230353437) before "How we work" — heading/caption are placeholders until the client says what the cut is; the video returned 403/404 from the build sandbox, so its Vimeo privacy/embed-domain settings need checking.
- **Get Started:** page removed. `/get-started` 301s to `/contact`, which is now the "Claim your market" destination: the form defaults to a "Claim my market" topic and prefills metro/intent from the hero check. The Strategic Review FAQ and the 30·90·1 strip went with the page.

## 33. Header login + search (resolved 2026-10-01)

**Decision:** bring both back (the design had dropped them, §3). Search = icon button → native dialog over a nav-derived index (⌘K / Ctrl+K, ↑↓↵); on phones it's the first row of the menu panel. Log in → growth.alloygp.co in a new tab, as an icon + text link sized explicitly so the icon can't clip like it did on the old header; on phones it sits in the About · Contact · FAQ row.

**Second testimonial video:** the client's "another video to use on that page" meant **/about/testimonials** — it now shows two videos side by side (CEO, anonymous · Jeff Harman, CMGT). The link is unlisted (`vimeo.com/1230353437/22399014d8`), so the embed uses `?h=`. Named per Vimeo's own title — flagged in case it should be anonymous like the case study.

## 34. Legal pages date (resolved 2026-10-01)

**Decision:** keep "Last updated: January 2026" on /privacy-policy and /terms-conditions for now; the prototype's "Effective September 2026" is not used. Revisit if legal text changes.

## 35. Landing pages (resolved 2026-10-01)

**Decision:** keep `/boardstart`, `/cam-growth-portal` and `/find-your-path` live for campaigns, `noindex,follow` on all three, none in the sitemap, none in the nav. (`/find-your-path` was already `noindex,nofollow`.)

## 36. Hub FAQs (resolved 2026-10-01)

**Decision:** add FAQs to the three engine hubs. Five questions each in `data/hubs/*.ts` (`faq`), rendered by `HubPage` as the standard accordion with FAQPage schema from the routes. Copy uses only facts already published elsewhere on the site (timelines from the FAQ page, proof stats from the hub bands, exclusivity + guarantee wording as decided) — no new numbers.

## 37. Guarantee = the 1× floor (client, 2026-10-02)

**Decision:** replace the handoff's "pays for itself / 24-month refund" with the client's plan language — **The floor · 1×: Your growth covers our fees. Guaranteed. We're confident enough to back it with our money, not just yours.** Applied to the hero guarantee card, the terms modal (condition unchanged: the firm runs the programs Alloy puts in place; measurement, timeframe and make-good live in the agreement) and both FAQ answers. The 2× plan / 6×+ experience tiles from the same graphic are not on the site.

**Mobile menu:** the panel didn't open on iPhones because the header's `backdrop-filter` makes it the containing block for fixed descendants in Safari (panel height collapsed). The panel is now portaled to `<body>`.

## 38. Hero card revision — 4a bottom + 6a rows (client, 2026-10-02)

**Applied from the "home edit" handoff:** answer rows are now light rows in each channel's tint with purple text and a small YOU tag (referral chip yellow, pink reserved for the Check button); the bottom of the card is one lavender panel with a combined metro field (input + Check) on the left and the guarantee badge row on the right (five-color arcs, purple disc, gold check — no text). Divider and microcopy removed. Kept from earlier client decisions: flush card, radius 10, pink keyword eyebrow + question H1, whole guarantee row opens the terms modal, Open/Claimed result state in place of the field.

## 39. Hero 7a — map hero (client, 2026-10-02; v2 applied the same day)

**Built** from `docs/redesign-handoff-hero-7a/` ("another better update for the home banner"), then updated to the **v2 handoff** ("some updates to the map hero section"): three-state fixed-height metro card (Idle / Checking / Result with **Get my report** (client's wording — the next step is a market report; "Get a Market Report" didn't fit beside long metro names) · Join waitlist · reset), map zooms while checking and re-centres on the metro with the pin label "Your Company · City", cream map tint. Left: copy + metro card; right: muted street map with the Google local-pack card, ChatGPT thread and referral pill all pointing at the #1 pin. Earlier client calls kept (flush hero, radii 10, pink keyword eyebrow + question H1, guarantee row = terms button, Open/Claimed result).

**Owed / to decide:**
- **Per-visitor metro — resolved by v2 (2026-10-02).** The map re-centres on whatever metro the visitor checks: `/api/map?lat&lng` renders the metro's street map from OpenStreetMap tiles on the server (same cream recipe as the committed Austin default) and caches it at the CDN for 30 days, so each metro costs a handful of tile requests once. This sits inside OSM's tile-usage policy at our traffic (identifying User-Agent, cached), but if the hero ever gets heavy traffic across hundreds of metros, a Mapbox/MapTiler key is the clean replacement — same endpoint, different tile source. Attribution line stays.
- **Unknown input** (anything our lookup can't resolve) is treated as Open with the typed text title-cased and the map left where it is, per the v2 spec — the Contact form still captures what they typed.
- **Third-party marks.** Google "G" is used as in the handoff (nominative). The ChatGPT avatar is a neutral sparkle, not the OpenAI logo — license/approve the official mark if wanted. Legal review of both before launch (checklist #17).

