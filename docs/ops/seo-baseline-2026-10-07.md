# Organic baseline, 5 days after launch (2026-10-07)

Sources: Ahrefs (Site Explorer, Rank Tracker project 9497923, Keywords Explorer, Site Audit) via the Ahrefs MCP; Search Console via Ahrefs' integration (data to 2026-09-29) — see `gsc-baseline-2026-10-06.md`. BigQuery export for alloygp.co is configured (project `alloy-gsc`) and will deliver from ~2026-10-08.

## Where alloygp.co stands

| Signal | Value | Read |
|---|---|---|
| Domain Rating | 24 | Respectable for a small B2B site |
| Referring domains (live) | 321 (328 live backlinks; 474 all-time) | Authority exists; it just isn't attached to ranking pages |
| Organic keywords in Ahrefs' index (top 100) | **0** | The site is not ranking for anything with measurable volume |
| Rank Tracker (46 tracked terms, desktop) | **1 ranking**: "hoa email marketing" #18 → /boardreach/email-marketing | 45 of 46 targets are outside the top 100 |
| GSC (28 days to 2026-09-29) | 338 impressions · 6 clicks · 16 pages, almost all brand | Google sees the site but mostly for "alloy …" queries |
| Ahrefs Site Audit | Health 100, 0 errors (after today's fixes) | Technical SEO is not the blocker |

**Conclusion:** the blocker is indexing + relevance/authority on the money pages, not technical health. Next step is the Search Console *Pages* report / URL Inspection (needs the `claude-gsc-reader` service account added to the property) to see which of the 42 URLs Google has actually indexed, then "Request indexing" on the priority pages.

## What people actually search (US monthly volume · KD · traffic potential)

| Query | Volume | KD | TP | We have |
|---|---:|---:|---:|---|
| hoa management software | 1,400 | 8 | 10,000 | /resources/hoa-management-software-guide (not ranking) |
| hoa management company | 1,300 | 0 | 4,200 | nothing board-facing (a "how to choose" guide would target it) |
| property management seo | 600 | 0 | 300 | /property-management-seo (not ranking) |
| property management marketing | 500 | 1 | 700 | no page uses this phrase |
| property management leads | 450 | 0 | 150 | /boardreach/property-management-lead-generation |
| best hoa management software | 200 | 30 | 11,000 | the guide, retitled, could target it |
| property management website design | 200 | 1 | 100 | /boardreach/hoa-website-design (HOA phrasing only) |
| hoa newsletter | 200 | 0 | 150 | /boardretain/newsletter-production |
| property management marketing agency | 150 | 0 | 500 | homepage / about |
| property management lead generation | 150 | 0 | 200 | lead-gen page |
| marketing for property management companies | 100 | 0 | 700 | — |
| hoa website design | 100 | 22 | 90 | hoa-website-design page |
| seo for property management companies | 90 | — | — | — |
| community association management marketing | 80 | — | — | — |
| hoa management marketing | 60 | — | — | homepage (indirectly) |
| **marketing for hoa management companies** (current homepage target) | **~0** | — | — | homepage title/H1 |
| cam marketing agency | 0 | — | — | — |
| hoa reputation management | 0 (GSC shows impressions) | — | — | reputation page |

Read: the market phrases its need as **"property management …"** far more than "HOA management …". Nearly every attainable term (KD 0–8) is one we already have a page for; they need the phrasing in titles/H1s and they need to be indexed.

## Who ranks today
- *property management seo*: agency guides (ClearLead, Boulder SEO, Brindle, Kihan) plus RealPage/AppFolio blogs. All KD 0 — reachable with the existing page once indexed and linked internally.
- *hoa management software*: vendors (PayHOA, AppFolio, RunHOA, ManageCasa), Capterra, and blog roundups — the buyer's guide can compete for "best hoa management software" with a roundup-style title.
- *marketing for property management companies*: Buildium blog (DR 76) and Fourandhalf (DR 60) — beatable over time with the strategy article + homepage.

## Recommended next moves (need client sign-off where marked)
1. **Index check + request indexing** of the 42 canonical URLs in Search Console (client, in the GSC UI; API is read-only). Priority: /, /property-management-seo, /resources/hoa-management-software-guide, /boardreach/property-management-lead-generation, /resources/cam-marketing-strategy, /boardmatch, /boardreach, /boardretain, /pricing.
2. **Title/H1 phrasing (client decision):** add "property management" to the homepage title and to the SEO, lead-gen, website-design and newsletter pages alongside the HOA wording, e.g. homepage → "Property Management & HOA Marketing Agency | Alloy Growth Partners". Keeps the HOA positioning, adds the phrasing people type.
3. **Retitle the software guide** toward "Best HOA Management Software (2026): Buyer's Guide for CAM Firms" (KD 30, TP 11,000) and keep the comparison/RFP content.
4. **Internal links** from the homepage ledger/engine tiles to /property-management-seo and the guide with phrase-match anchors.
5. **Board-side content**: "How to choose an HOA management company" (1,300 vol, KD 0) — positions partners; links to MatchHOA.
6. Re-run this baseline in 30 days from the BigQuery export (`node .context/bq.mjs sql …`) and Rank Tracker.
