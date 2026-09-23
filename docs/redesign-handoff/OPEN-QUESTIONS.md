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
