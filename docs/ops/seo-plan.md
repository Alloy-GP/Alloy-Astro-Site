# alloygp.co organic growth plan (drafted 2026-10-07)

Companion to `seo-baseline-2026-10-07.md` (data) and `gsc-baseline-2026-10-06.md` (Search Console snapshot). Scope: HOA / community-association management companies only; no "property management" targeting (client, 2026-10-07). Owners: **Alloy** = Skyler's team · **CC** = Claude Code in Conductor.

## Where we are
Technically clean (Site Audit health 100, 0 errors), DR 24 with 321 referring domains, **but 0 organic keywords in Ahrefs' top 100 and 1 of 46 tracked terms ranking**. Search Console shows ~340 impressions/month, nearly all brand. Diagnosis: indexing + exact-phrase relevance on the money pages, not technical health.

## Phase 0 — Unblock measurement (this week)
| # | Task | Owner | Status |
|---|---|---|---|
| 0.1 | Enable the Search Console API in GCP project `alloy-gsc` (link in chat) | Alloy | open |
| 0.2 | URL Inspection of all 42 canonical URLs → list what Google has / hasn't indexed | CC | blocked on 0.1 |
| 0.3 | Request indexing in the GSC UI for every un-indexed priority URL (/, /property-management-seo, software guide, lead-gen, strategy article, 3 hubs, /pricing) | Alloy | after 0.2 |
| 0.4 | BigQuery export for alloygp.co delivers (configured 10-07) → weekly query of pages/queries by day | CC | waiting on Google |
| 0.5 | Bing Webmaster Tools: import from GSC, submit sitemap-index (IndexNow already live) | Alloy | open |
| 0.6 | Google Business Profile for the Austin office (Marketing agency; service-area business) | Alloy | open |

## Phase 1 — Own the exact CAM phrases (shipped 2026-10-07)
Titles/H1s now carry the phrases operators actually type (volumes from Ahrefs):
- Homepage → "HOA Management Marketing Agency" (hoa management marketing · 60/mo)
- Strategy article → "Marketing an HOA Management Company…" (100/mo)
- SEO service → "HOA Management SEO…" (100/mo)
- Software guide → "Best HOA Management Software (2026)…" (200/mo, TP 11k; + 1,400/mo head term)
- Lead-gen → "HOA Management Lead Generation"
Follow-ups: internal links with phrase-match anchors from the homepage engine tiles and hubs to these four pages (CC, after indexing confirms).

## Phase 2 — Lead magnets on pages that already rank-worthy (weeks 2–4)
All terms KD 0, all searched by the operators we want. Each needs one asset + a short gated/ungated section on the existing page.
| Asset | Page | Target queries (vol) | Owner |
|---|---|---|---|
| Free HOA newsletter template (Canva/Doc) + 12-month ideas list | /boardretain/newsletter-production | hoa newsletter template 150 · templates 150 · ideas 150 · examples 100 · free templates 100 | Alloy design → CC builds the section |
| HOA website examples gallery (8–10 partner sites, annotated) | /boardreach/hoa-website-design | hoa website examples 200 · templates 250 · ideas 100 · design 100 | Alloy picks sites → CC builds |
| "HOA board member training" free micro-course (reuse trust-building format) | /boardretain/board-education | hoa board member training 150 · free hoa board member certification course 150 · hoa board training 40 · hoa board education 40 | Alloy writes → CC builds |
| HOA management proposal template (BoardMatch) | /boardmatch/proposal-optimization | hoa management proposal 40 · proposal template | Alloy → CC |

## Phase 3 — Operator guides (weeks 3–8; one every 10 days)
| Guide | Target (vol) | Angle |
|---|---|---|
| How to start an HOA management company | 60 (KD 0) | new firms = ideal prospects; ends in "and here's how the first boards find you" |
| What HOA management companies charge (fees guide) | 60 + 60 (KD 0–24) | operators benchmarking; boards too; neutral, data-led |
| CAM license requirements by state | 1,200 (KD 0) | manager audience; Peak Executive Academy / L&D tie-in; big TOFU |
| What a community association manager does | 600 (KD 0) | role definition; talent + board audience |
| How to choose an HOA management company | 50 (KD 0) + "selecting an association management company" 30 | board-side; routes to MatchHOA |
| HOA board communication software (what boards expect) | 100 | BoardRetain |
| Best HOA website software / builders for management companies | 150–200 (KD 12–36) | companion to the website page |

## Phase 4 — Authority & entity (ongoing)
- Partner-page links from Peak, Think Tank HOA, Innovia, Vantaca, CINC, CAI directory (Alloy).
- Cite sources inline on the two articles + guide (CAI Foundation, Ahrefs AIO study, BrightLocal, Whitespark, Gartner — verified 10-02) (CC).
- Video transcripts under the two testimonials (Alloy sends text → CC).
- Confirm the hero's "Emerging PE firm" label wording (Alloy).

## Phase 5 — Board-side demand (MatchHOA, not alloygp.co)
"hoa management companies" 2,000 · "hoa management company" 1,300 · "near me" 600 · metro queries in partner markets (Austin 200, Houston 250, Dallas 150, San Antonio 150; all KD 0). Build metro pages on matchhoa.com naming the partner; alloygp.co only hosts the "how to choose" guide and links across.

## Phase 6 — Links from properties we control (added 2026-10-16)

### MatchHOA → alloygp.co (checked 2026-10-16)
- **The reported "broken link" was a script tag, not a link.** Every one of MatchHOA's 3,642 sitemap URLs loaded `https://alloygp.co/content.js` through a `next/script` tag in `frontend/src/app/layout.tsx`. It was added on 2026-08-31 as a placeholder when GroAS's `app.groas.ai/content.js` was dropped, waiting for an Alloy-hosted script that was never built. The URL has served alloygp.co's 404 page ever since (the file never existed on the WordPress or Astro site; no Wayback copy), so every page load fetched a 156 KB HTML 404 and crawlers reported a broken outlink from matchhoa.com to alloygp.co. Fix: Match-HOA PR removing the tag (https://github.com/Alloy-GP/Match-HOA/pull/8). Nothing to restore on alloygp.co; do **not** add a stub `public/content.js`.
- **The only real links sit on matchhoa.com/about**: "Powered by Alloy Growth Partners" (text) and the Alloy logo ("Visit AlloyGP.co"), both to `https://alloygp.co/?utm_source=MatchHOA&utm_medium=referral`, dofollow, new tab. The URL returns 200 with canonical `https://alloygp.co/`, so the link works. The About schema also names Alloy as `parentOrganization`. `/for-management-companies`, `/become-a-partner`, the three guides and the 3,616 city pages do not link to Alloy at all.
- Options if Alloy wants the MatchHOA link to carry more (Alloy decides; MatchHOA is positioned as neutral for boards, so keep it factual and small):
  1. A footer line on every page, "Match HOA is operated by [Alloy Growth Partners](https://alloygp.co/)": 3,642 dofollow pages with a branded anchor.
  2. One contextual sentence on `/for-management-companies` linking the phrase "HOA management lead generation" to `/boardreach/property-management-lead-generation` (or "BoardMatch" to `/boardmatch`): the deep link the money pages are missing (see "Where we are").
  3. Drop the UTMs from the About links. The referrer already attributes the visit in GA4 and WhatConverts; a clean target URL is the tidier backlink. Minor.

### Client sites → alloygp.co (the "partner link")
Yes. A credit link on the sites Alloy built is the cheapest topically relevant authority available, and none of them link to alloygp.co today. It has to look like what it is: an agency credit, placed with the client's consent.

Rules:
- **Branded anchor only**: "Alloy Growth Partner" or "Alloy Growth Partners". Never a keyword anchor in a footer ("HOA management marketing agency"); widely distributed keyword-rich footer or widget links are the pattern Google's link-spam policy names. One keyword anchor inside an editorial sentence on an About or Partners page is fine.
- **Dofollow, plain `<a>`**, no `nofollow` or `sponsored`: the credit is editorial, not paid. If a client insists on `nofollow`, it still sends referral traffic, just no authority.
- **Target `https://alloygp.co/`** with no UTMs. The referrer identifies the site.
- **Small and consistent**: one line in the footer legal row, same wording on every site, and in `agp-astro-starter` so new sites ship with it.
- **Ask first**: one line in the next status email per client. Sites Alloy does not maintain (the WordPress ones) only get it if the client adds it.

Wording and look (Skyler, 2026-10-16, two rounds): not "Marketing by" or "Site by", and then "as inconspicuous as possible without looking like we are hiding it: no colour, no bold". Final form: the **outline Alloy logo** (`public/assets/alloy-logo-outline-white.svg` on dark footers, `alloy-logo-outline-black.svg` on light ones) at 18px tall and 50% opacity (85% on hover), in the footer legal row at the same tone as the copyright line. No visible text; `alt="Alloy Growth Partners"` is the anchor text and `title`/`aria-label` carry the designation "Alloy Growth Partner · {Metro} metro" for anyone who hovers. If a site wants words, the only allowed addition is plain-weight muted text after the logo ("Growth Partner · Orlando metro"), never bold, never a colour. The rejected first cut (coloured mark + bold "Alloy Growth Partner") and the five wording options are in `docs/ops/partner-credit-options.html` for the record. First site: Edison (Alloy-GP/Edison-Website#15).

Snippet (footer legal row; the logo file is copied into the client site's `public/assets/`, not hotlinked):
```html
<a class="partner-credit" href="https://alloygp.co/" target="_blank" rel="noopener"
   title="Alloy Growth Partner · Orlando metro" aria-label="Alloy Growth Partner · Orlando metro">
  <img src="/assets/alloy-logo-outline-white.svg" alt="Alloy Growth Partners" width="57" height="18">
</a>
<style>.partner-credit{display:inline-flex;opacity:.5;transition:opacity 140ms}.partner-credit:hover{opacity:.85}.partner-credit img{height:18px;width:auto;display:block}</style>
```

Add-on with the most weight, with any footer option: one sentence on the client's About page, "{Firm} is the [Alloy Growth Partner](https://alloygp.co/) for the {Metro} metro, running Alloy's BoardReach, BoardMatch and BoardRetain programs for the associations we serve."

Inventory (live check 2026-10-16; none link to alloygp.co):

| Live site | Repo (Alloy-GP) | Platform live | Notes |
|---|---|---|---|
| cmgt.org | cmgt-site-astro | Astro | |
| edisonassociationmanagement.com | Edison-Website | Astro | |
| cpepropertymanagement.com | CPE-Website | Astro | |
| www.e-landmarc.com | Landmarc-site-astro | Astro | |
| keys-caldwell.com | keys-caldwell-astro | Astro | |
| innoviaco-op.com | innovia-site-astro | Astro | also a Phase 4 partner-page candidate |
| tidewaterproperty.com | Tidewater-Website | Astro 4 | |
| riseamg.com | rise-site-astro | WordPress (Astro build not live) | add when the Astro site launches |
| microhoa.com | microhoa-astro | WordPress (Astro build not live) | same |
| chcsbc.org | chcs | WordPress / Elementor | client adds it, or skip |
| mygermancarsa.com | gcs | custom | not CAM; skip |

Expected effect: about ten new referring domains, all in the CAM niche, which is worth more than the same count of generic directories. Google discounts links between sites that share an owner or host, so treat this as a floor, not a lever: Phases 1 to 3 remain what moves rankings.

## Measurement cadence
- Weekly (CC): Rank Tracker (46 terms) + BigQuery pages/queries by day; flag any URL losing impressions.
- Monthly (CC): re-run the Ahrefs baseline (DR, ref domains, organic keywords), Site Audit, backlink 404 check; update `seo-baseline-*.md`.
- KPIs by 2026-12-31: ≥ 20 of 46 tracked terms in top 100; ≥ 5 in top 10 (the exact CAM phrases); software guide in top 20 for "hoa management software"; non-brand impressions ≥ 3× the Sept baseline.
