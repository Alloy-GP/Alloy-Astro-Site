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

## Measurement cadence
- Weekly (CC): Rank Tracker (46 terms) + BigQuery pages/queries by day; flag any URL losing impressions.
- Monthly (CC): re-run the Ahrefs baseline (DR, ref domains, organic keywords), Site Audit, backlink 404 check; update `seo-baseline-*.md`.
- KPIs by 2026-12-31: ≥ 20 of 46 tracked terms in top 100; ≥ 5 in top 10 (the exact CAM phrases); software guide in top 20 for "hoa management software"; non-brand impressions ≥ 3× the Sept baseline.
