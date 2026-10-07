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

## What CAM operators actually search (US monthly volume · KD · traffic potential)

Client direction (2026-10-07): **no "property management" targeting** — that is the rental-management industry. The site serves HOA / community association management companies only.

### A. Exact CAM-marketing intent (small, specific, and nobody owns it)
| Query | Vol | Note |
|---|---:|---|
| marketing an hoa management company | 100 | no SERP data in Ahrefs → no established competitor |
| hoa management seo | 100 | same |
| community association management marketing | 80 | same |
| hoa management marketing | 60 | same |
| hoa management proposal | 40 | BoardMatch |
| hoa management growth / hoa management company growth | 30 + 30 | homepage / results |
| cam marketing | 30 | ambiguous (webcams); use only inside CAM copy |
| rfp for hoa management services | 20 | RFP page |
| hoa management website design | 10 | website page |

≈500 searches/month combined, all KD ≈ 0. These are the phrases to put in titles and H1s on the pages that already exist.

### B. Operator research intent (the real top of funnel)
| Query | Vol | KD | We have |
|---|---:|---:|---|
| hoa management software | 1,400 | 8 | buyer's guide (not indexed/ranking) |
| software for hoa management | 300 | 26 | guide |
| community association management software | 250 | 4 | guide |
| best hoa management software | 200 | 30 | guide (retitle) |
| hoa management app | 200 | 6 | guide |
| hoa management software reviews | 150 | 5 | guide |
| best community association management software | 100 | 0 | guide |
| hoa board communication software | 100 | — | board-education / newsletter |
| hoa website software · platforms · builder · best hoa website software | 150–200 each | 12–36 | hoa-website-design page (+ a platform comparison) |
| how to start an hoa management company | 60 | 0 | — (new firms = ideal prospects) |
| how much do hoa management companies charge / hoa management fees | 60 + 60 | 0–24 | — (pricing guide for operators + boards) |
| cam license | 1,200 | 0 | — (manager audience; L&D / Peak Executive Academy angle) |
| community association manager | 600 | 0 | — (role definition; manager audience) |

### C. The deliverables Alloy sells, searched as templates/examples (all KD 0)
| Query | Vol | Page |
|---|---:|---|
| hoa newsletter template(s) · ideas · examples · free templates | 150 + 150 + 150 + 100 + 100 | /boardretain/newsletter-production (+ a free template) |
| hoa website templates · examples · ideas | 250 + 200 + 100 | /boardreach/hoa-website-design (+ an examples gallery) |
| hoa board member training · free hoa board member certification course · hoa board training · hoa board education | 150 + 150 + 40 + 40 | /boardretain/board-education (+ the free course) |
| hoa board meeting agenda template · minutes template · candidate statement examples | 150 each | board-education resources |

### D. Board-side demand (large; MatchHOA's territory)
"hoa management companies" 2,000 · "hoa management company" 1,300 (KD 0) · "hoa management companies near me" 600 · "top hoa management companies" 150 (KD 0) · "list of hoa management companies" 150 (KD 0) · metro queries in partner markets: "hoa management companies austin" 200 (KD 0), "houston hoa management" 250 (KD 0), "hoa management companies in dallas" 150 (KD 0), "hoa management company san antonio" 150 · "how to choose an hoa management company" 50 · "selecting an association management company" 30. Best served from matchhoa.com (directory + metro pages naming the partner) with alloygp.co hosting the "how to choose" guide that routes boards to MatchHOA.

## Recommended next moves (client sign-off where marked)
1. **Index check + request indexing** of the 42 URLs (client, GSC UI). Priority: /, /property-management-seo, the software guide, lead-gen, strategy article, the three hubs, /pricing.
2. **Exact-phrase titles/H1s (client decision)** — homepage title → "HOA Management Marketing Agency | Alloy Growth Partners"; strategy article → "Marketing an HOA Management Company: the plan before the tactics"; /property-management-seo title → "HOA Management SEO: Google, the Map Pack and the AI Answer"; proposal page keeps "HOA management proposal"; RFP page adds "RFP for HOA management services". URLs unchanged.
3. **Retitle the software guide** → "Best HOA Management Software (2026): Buyer's Guide for CAM Firms"; add a short "community association management software" section + reviews framing.
4. **Lead magnets on existing pages**: free HOA newsletter template (newsletter page), HOA website examples gallery (website page), "HOA board member training" free course (board-education page). All KD 0, all searched by the operators we want.
5. **Operator guides**: "How to start an HOA management company", "What HOA management companies charge" (fees guide), "CAM license requirements by state" (manager audience).
6. **Board-side** stays on MatchHOA; alloygp.co publishes "How to choose an HOA management company" and links to MatchHOA.
7. Re-run this baseline in 30 days from the BigQuery export and Rank Tracker.
