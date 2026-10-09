# Collections content cluster (alloygp.co)

Built 2026-10-09 on `staging` from the handoff `alloy-collections-handoff.md` (prepared 2026-10-08). Eleven pages,
one data-driven template. Nothing goes to `main` without Skyler's approval (brief, section 2).

## Where things live

| Piece | Path |
|---|---|
| Copy, links, FAQ, gating per page | `src/data/articles/<slug>.ts` (one file per page; `types.ts` is the contract) |
| Template | `src/components/rd/ArticlePage.tsx` (hero + byline + disclosure, TOC, numbered sections, callouts, worksheets, tables, `[PROOF]` boxes, FAQ, keep-reading, CTA bar) |
| Schema + author | `src/lib/article-page.ts` (`articlePageSchema`: Article with Person author Cameron Lange + BreadcrumbList + FAQPage when a FAQ exists; `AUTHOR.linkedIn` is the TODO for `sameAs`) |
| Routes | `src/pages/collections/*.astro`, `src/pages/resources/<slug>.astro` (thin shells) |
| Styles | `redesign.css` "Article extras" block, `mobile.css` ≤720 rules |
| Policy outline download | `public/assets/collections/hoa-collection-policy-outline.txt` (labelled "not a legal template") |
| Copy-rules lint | `node scripts/content-lint.mjs` (word counts, ≥25-word sentences, banned words, em dashes, "70%" framed as a goal, link targets, title/description length) |

## URL changes vs. the brief (brief, section 2: "adjust slugs if the site uses a different convention and report")

- **No trailing slashes.** The site's canonical URLs never end in `/` (`trailingSlash: 'never'`). Every `/x/` in the brief is `/x` here, including the contact CTA: `/contact`.
- **`/insights/*` → `/resources/*`.** All articles on this site live under `/resources` (the Resources hub lists them; `pageId="resources"` lights the nav). Pages 7–11 are built at `/resources/<slug>` with the brief's slugs unchanged. If `/insights/` is wanted after all, it is a rename of five route files plus five `path` fields.
- `/collections/*` kept as specified (`/collections` is the hub).

## Page status

| # | URL | Data file | Status on staging | Go-live (brief) |
|---|---|---|---|---|
| 1 | `/collections` | `collections-hub.ts` | Built. **noindex**, out of sitemap/nav: 4 `[PROOF]` placeholders | 2026-10-20, indexable once proof is in |
| 2 | `/collections/pre-legal-collections` | `pre-legal-collections.ts` | Built from the FINAL COPY, verbatim. Indexable, in sitemap | 2026-10-20 |
| 3 | `/collections/attorney-first-vs-pre-legal` | `attorney-first-vs-pre-legal.ts` | Built. **noindex**: 3 `[PROOF]` placeholders (HOA 48 results, cost data) | 2026-10-20, indexable once proof is in |
| 4 | `/collections/automating-hoa-dues-collection` | `automating-hoa-dues-collection.ts` | Built. Indexable, in sitemap | 2026-10-20 |
| 5 | `/collections/cost-of-delinquent-accounts` | `cost-of-delinquent-accounts.ts` | Built. Indexable, in sitemap | 2026-10-20 |
| 6 | `/collections/collection-policy` | `collection-policy.ts` | Built. Indexable, in sitemap | 2026-10-20 |
| 7 | `/resources/hoa-management-company-revenue-streams` | `hoa-management-company-revenue-streams.ts` | Built. **Gated** (noindex, out of sitemap, no inbound links) | 2026-10-27 |
| 8 | `/resources/how-to-grow-an-hoa-management-company` | `how-to-grow-an-hoa-management-company.ts` | Built. **Gated** | 2026-10-27 |
| 9 | `/resources/hoa-management-software-limits` | `hoa-management-software-limits.ts` | Built. **Gated** | 2026-11-03 |
| 10 | `/resources/why-associations-change-management-companies` | `why-associations-change-management-companies.ts` | Built. **Gated**. Ahrefs volume check not run (see open items) | 2026-11-10 |
| 11 | `/resources/winning-hoa-management-proposals` | `winning-hoa-management-proposals.ts` | Built. **Gated**. Ahrefs volume check not run | 2026-11-10 |

Why pages 7–11 are gated: everything lands on one branch (`staging`), and the brief staggers go-live over four dates.
Gating (robots `noindex,follow`, not in `SITEMAP_ROUTES`, links from earlier pages left as `TODO` comments) lets the
whole cluster merge to `main` on 2026-10-20 without publishing the later waves early. Un-gating is a three-line change per page.

## Go-live checklist (per page)

1. In `src/data/articles/<slug>.ts` delete the `noindex:` line.
2. In `astro.config.mjs` move the path from the commented list into `SITEMAP_ROUTES` (and add a `LASTMOD` entry with the go-live date).
3. Search `src/data/articles/` for `TODO(<date>)` comments naming the page and add the links (hub §8 → pages 7 and 8; page 4 → page 9; page 5 → page 7; page 8 → pages 10 and 11).
4. Add the page to `public/llms.txt` under "HOA collections for management companies" and, if wanted, to the `LATEST` list in `ResourceHubPage.tsx`.
5. For pages 1 and 3: replace every `{ t: 'proof', … }` block with the real material first.

## Copy rules applied (brief, section 4)

Plain headlines, H2s as operator questions, 40–60-word opening answer on every page, sentences under 25 words
(lint reports any at or over), no banned words, no em dashes (site rule), "70%+" only ever a **goal**, no amount or
percentage for the management company's fee ("management company administrative fee" / "a share of collected
revenue"), no HOA 48 per-account charge amount, no legal advice (every legal passage points to the association's
attorney), statutes cited only from official state code sites, no invented statistics (worksheets instead),
hoa48.com linked only from pages 1 and 2, byline "By Cameron Lange, Alloy Growth Partners" on every page.

**Disclosure.** Pages that name HOA 48 (1, 2, 3) carry the brief's exact line. The other eight do not name HOA 48, so
the brief allows dropping the line; because they still argue for the program the partners sell, they carry a
shortened version instead ("Alloy's partners operate HOA 48, a pre-legal collections company."). Skyler to confirm or drop.

## Sources used (all linked inline on the pages)

- HOA 48 program facts: hoa48.com (home, How It Works, Pricing), re-read 2026-10-09. Pricing page confirms the term "Management Company Administrative Fee" and "Resolution goal: 70%+ within 90 days".
- Attorney-fee ranges (page 3): Gomez Law, "How Much Does an HOA Lawyer Cost in Florida?" (2025-10-30); LS Carlson Law, "Budgeting for Potential HOA Legal Expenses in California" (2025-12-17); ProPublica, "HOA Foreclosures Are a 'Lose-Lose' Game for Coloradans…" (2023-03-11, Alcock Law Group court filing: $4,000–$6,000 per typical uncontested foreclosure).
- No-cost model debate (page 3): In re Cisneros (Bankr. N.D. Cal. 2012); Hanson v. JQD, LLC d/b/a Pro Solutions (N.D. Cal. 2014, settled); Tinnelly Law Group posts of 2012-10-22 and 2017-02-07; Cal. Civ. Code 5650.
- Statutes (pages 3, 6): Cal. Civ. Code 5650 / 5655 / 5660 (leginfo.legislature.ca.gov; the site returns 403 to scripted fetches but is the official source), C.R.S. 38-33.3-209.5 via the General Assembly's Title 38 PDF (crs2024), Fla. Stat. 720.3085 (leg.state.fl.us), CFPB Regulation F (consumerfinance.gov).
- Board survey (page 10): AppFolio + HOA-USA board member survey, AppFolio blog 2022-03-15 (66% unresponsiveness, 65% follow-through, 61% customer service; 75% rank financial reporting top three). Labelled directional on the page.

## Open items (brief, section 10, plus what came up in the build)

- **HOA 48 proof material** (due 2026-10-12): resolution results to date, 1–2 anonymized account examples, a manager/board quote with permission, a sample notice/report screenshot, real cost data for page 3's table. Blocks pages 1 and 3 going indexable.
- **Cameron Lange's LinkedIn URL** → `AUTHOR.linkedIn` in `src/lib/article-page.ts` (adds `sameAs` to the Person schema on all 11 pages).
- **Ahrefs volume checks for pages 10 and 11** were not run: the Ahrefs MCP needs `AHREFS_MCP_KEY`, which is not present in this cloud workspace. Candidate terms are in each data file's `keywords`. Run them before the 2026-11-10 go-live; retitle if a better phrase wins.
- **Contact URL** confirmed: `/contact` (the brief's `/contact/` trailing slash dropped).
- **Published dates** in the byline and Article schema are the brief's go-live dates. Adjust if a page ships on a different day.
- **Resources hub listing**: the cluster is not yet on `/resources` or in the nav (the brief says keep 1 and 3 off navigation; it says nothing about the indexable spokes). Recommend adding pages 2, 4, 5, 6 to `LATEST` in `ResourceHubPage.tsx` at go-live so they have inbound links beyond the cluster.
- **hoa48.com backlink** to page 2 or 3 (brief, section 8): request it from HOA 48 once the pages are live.
- Skyler reviews all copy on stg before any push to `main`.
