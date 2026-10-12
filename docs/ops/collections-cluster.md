# Collections content cluster (alloygp.co)

Built 2026-10-09 on `staging` from the handoff `alloy-collections-handoff.md` (2026-10-08). **Repositioned 2026-10-12**
from the client's review notes: Alloy is an unbiased advisor on collections strategy and process, no provider is named
or linked, claims are hedged for a regulated industry, each article ties to Alloy's bigger picture (revenue, margin,
less unnecessary work, people and technology, less owner dependence) and carries its own CTA. Eleven pages, one
data-driven template. Nothing goes to `main` without Skyler's approval.

## Where things live

| Piece | Path |
|---|---|
| Copy, links, FAQ, CTA, gating per page | `src/data/articles/<slug>.ts` (one file per page; `types.ts` is the contract) |
| Template | `src/components/rd/ArticlePage.tsx` (hero + byline + interest disclosure, sticky TOC + per-article CTA card, numbered sections, callouts, worksheets, tables, FAQ, keep-reading, CTA bar) |
| Schema + author | `src/lib/article-page.ts` (`articlePageSchema`: Article with Person author Cameron Lange + BreadcrumbList + FAQPage when a FAQ exists; `AUTHOR.linkedIn` is the TODO for `sameAs`) |
| Routes | `src/pages/collections/*.astro`, `src/pages/resources/<slug>.astro` (thin shells; `robots` driven by `data.noindex`) |
| Contact intents | `ContactPage.tsx` `ARTICLE_INTENTS`: `/contact?intent=collections|growth|operations|profitability|proposals|retention` preselects a topic and seeds the message |
| Styles | `redesign.css` "Article extras" block, `mobile.css` ≤720 rules |
| Policy outline download | `public/assets/collections/hoa-collection-policy-outline.txt` ("not a legal template") |
| Copy-rules lint | `node scripts/content-lint.mjs` |

## Positioning rules (client, 2026-10-12) — enforced by the lint where a regex can

- Alloy recommends **strategies and processes, not providers**. No collections company is named, linked, described or promoted. No "our pre-legal program" / "our collections service". Alloy is not a collection agency and does not perform collections.
- Timelines are **ranges** ("commonly 60 to 120 days", "policies commonly use 60, 90 or 120 days"), never a universal number.
- No **"always"** or **"never"** anywhere in copy. No blanket claims that associations pay nothing, that owners cover every charge, or that a management company earns revenue on every account. Revenue is conditional on the governing documents, state law, the management agreement and disclosure to the board; revenue is distinguished from contribution to profit.
- Attorney-first is presented with its real advantages (legal leverage, deadline protection, existing relationships, counsel's judgment, deferred-billing arrangements where offered) and pre-legal with its limitations (no leverage, an added party, deadline risk, contested owner-paid charges, compliance obligations).
- Pre-legal activity is described as generally subject to federal debt collection law (Regulation F linked) and, in many states, licensing and state collection law.
- Software claims are hedged ("rarely go late by accident", "not built to handle", "on its own"). No platform is disparaged.
- No performance figures or resolution rates. No invented statistics. Worksheets where a number would otherwise be needed.
- Statutes cited only from official state code sites, labelled "not legal advice", flagged for attorney review (below).
- **Disclosure** under every byline: "Alloy's partners have a financial interest in a pre-legal collections business. These articles recommend processes, not providers." Rationale: removing a provider's name removes the mention, not the interest; an "unbiased" stance with an undisclosed interest is the bigger credibility risk. One constant in `ArticlePage.tsx` if the team wants it changed or dropped.

## URL changes vs. the brief

- **No trailing slashes** (`trailingSlash: 'never'`); the contact CTA is `/contact`.
- **`/insights/*` → `/resources/*`** (all articles on this site live under `/resources`). Slugs unchanged. Renaming back is five route files plus five `path` fields.
- `/collections/*` kept as specified.

## Page status

| # | URL | Status on staging | Index |
|---|---|---|---|
| 1 | `/collections` | Repositioned: profitability/operations framing, four-approach overview, eight-step process review, conditional revenue, bigger-picture close. Proof placeholders removed. | Indexable, in sitemap (2026-10-20) |
| 2 | `/collections/pre-legal-collections` | Rewritten provider-neutral: definition, stages, generic window, when it fits / doesn't, existing relationships, what to ask. The brief's final copy no longer applies. | Indexable (2026-10-20) |
| 3 | `/collections/attorney-first-vs-pre-legal` | Rebalanced: what each path buys and costs, stage table with leverage and relationships, owner-paid fee debate, how to decide on your own data. | **noindex** until the comparison is approved (client) |
| 4 | `/collections/automating-hoa-dues-collection` | Hedged capabilities, trigger section with ranges, integration realities, where admin work goes away. CTA: operations. | Indexable (2026-10-20) |
| 5 | `/collections/cost-of-delinquent-accounts` | Added opportunity cost, homeowner experience, profitability per association; worksheet assumptions spelled out; four options instead of one. | Indexable (2026-10-20) |
| 6 | `/collections/collection-policy` | Reframed around assessing the policy you have; middle stage "if the board adopts one"; outline + download updated. | Indexable (2026-10-20) |
| 7 | `/resources/hoa-management-company-revenue-streams` | Revenue vs contribution table and worksheet; collections line conditional. CTA: profitability. | Gated to 2026-10-27 |
| 8 | `/resources/how-to-grow-an-hoa-management-company` | "Wrong scoreboard" section, margin on the revenue lever, owner-dependence test in the 12-month plan. CTA: growth. | Gated to 2026-10-27 |
| 9 | `/resources/hoa-management-software-limits` | People/process/platform section, vendor questions, hedged claims. CTA: operations. | Gated to 2026-11-03 |
| 10 | `/resources/why-associations-change-management-companies` | Light touch: statistics as sourced and directional, absolutes removed. CTA: retention. Ahrefs check still owed. | Gated to 2026-11-10 |
| 11 | `/resources/winning-hoa-management-proposals` | Board-priority section with the survey, "show value instead of claiming it", delinquency plan as a process not a provider. CTA: proposals. Ahrefs check still owed. | Gated to 2026-11-10 |

Gating: `data.noindex` → `robots noindex,follow`, out of `SITEMAP_ROUTES`, inbound links left as `TODO(date)` comments. Everything can merge on 2026-10-20; later waves un-gate on their dates.

## Editorial workflow

1. **Draft** in `src/data/articles/<slug>.ts` (copy, links, FAQ, CTA, `noindex` reason). Sources linked inline; statutes from official code sites only.
2. **Lint**: `node scripts/content-lint.mjs` must exit 0 (positioning rules, sentence length, lengths, links).
3. **Build + crawl** locally (`npm run build`; the route returns 200 with one H1, valid Article/Breadcrumb/FAQ schema, canonical, correct robots).
4. **Push to `staging`** → review on stg.alloygp.co (Pastel round). Reviewer checks: accuracy, positioning rules, CTA fit, anything needing legal sign-off.
5. **Approval** (Skyler) → PR `staging` → `main`. After merge, `git push origin main:staging`.
6. **Go-live per page**: delete `noindex` in the data file, add the path to `SITEMAP_ROUTES` + `LASTMOD`, resolve `TODO(date)` links, add to `public/llms.txt` and (optionally) the `LATEST` list in `ResourceHubPage.tsx`.

## Article deliverables (per page)

- Data file with: title (≤60), description (≤160), H1 (two-tone), 40–60-word opening answer, question-form H2s, FAQ (40–60-word answers), keep-reading links, per-article CTA and contact intent, sources linked inline, `noindex` reason if gated.
- Lint clean; build clean; crawl clean.
- A line in the change summary below, and a list of statements needing business or legal approval.

## Change summary by article (2026-10-12)

- **Hub**: new framing (profitability and operations, not a product); approaches section (internal / attorney-first / pre-legal / hybrid); "well-designed process" with eight generic pieces and timeline ranges; revenue section rewritten as two conditional models; who-pays section with three cost structures and risks; relationships paragraph; eight-check process review with Alloy CTA; bigger-picture close; proof boxes removed; indexable.
- **Pre-legal**: full rewrite (definition kept generic; stages hedged; window as a range; "when it fits and when it doesn't"; existing relationships; FDCPA/state licensing; handoff; "what to ask"); provider link and process description removed.
- **Attorney-first vs. pre-legal**: attorney-first gets its advantages and deferred-billing note; pre-legal gets cost models and limitations; table gains Leverage and Relationships rows; "no savings figure" paragraph now includes "including us"; decision section on your own data; proof boxes removed; stays noindex.
- **Automation**: "rarely go late by accident"; trigger ranges with lien deadlines; integration-realities paragraph; "where admin work goes away" section; revenue claim removed; CTA operations.
- **Cost of delinquency**: "what else does delinquency cost" (opportunity cost, homeowner experience, profitability per association); worksheet assumptions; four options; "managed line, sometimes a revenue line" with conditions.
- **Collection policy**: "assess the policy you have" (five checks); "add a middle stage, if you decide to" with internal/attorney/vendor options and ranges; element 7 renamed "next-stage handoff"; outline and download updated; licensing note.
- **Revenue streams**: revenue-vs-contribution table and worksheet; collections line rewritten as two conditional forms; audit paragraph; CTA profitability.
- **How to grow**: "why more doors is the wrong scoreboard" (four numbers, Alloy's five-point view); survey citation on communication; margin added to the revenue lever; plan ends on owner dependence; CTA growth.
- **Software limits**: "on its own" throughout; people/process/platform section; vendor questions; "most established platforms"; CTA operations.
- **Why associations change**: "rarely" for "almost never"; "not in every case"; next stage "whoever runs it"; CTA retention.
- **Proposals**: "what boards actually weigh" with the survey; differentiator reframed as a delinquency plan (process, not provider; keep the board's attorney); "show value instead of claiming it"; CTA proposals.

## Statements needing business or legal approval

- The interest disclosure wording (above), and whether it stays on all 11 pages.
- Statute summaries on pages 3 and 6: Cal. Civ. Code 5650 / 5655 / 5660, C.R.S. 38-33.3-209.5, Fla. Stat. 720.3085. Linked to official sources; an attorney should confirm the summaries before those pages index.
- The owner-paid fee debate on page 3 (In re Cisneros, Hanson v. JQD, Tinnelly Law Group commentary): accurate to the sources, California-specific, labelled not legal advice. Attorney read recommended.
- Attorney-fee ranges on page 3 (Gomez Law 2025, LS Carlson Law 2025, ProPublica 2023 / Alcock Law Group filing): sourced, labelled orientation not a quote. Business to confirm it is comfortable citing them.
- "In many states" licensing of third-party collectors and FDCPA applicability: stated generally, Regulation F linked. Attorney to confirm the phrasing.
- CTA offers: "Review your collections process", "Review your growth strategy", "Review your operations and tools", "Talk through revenue and margin", "Review your proposals", "Review how you keep boards". All phrased as a conversation with a CAM operator; contact topics added to match. Confirm the wording and that no deliverable is implied.

## Open items

- **Cameron Lange's LinkedIn URL** → `AUTHOR.linkedIn` in `src/lib/article-page.ts`.
- **Ahrefs volume checks for pages 10 and 11** (no Ahrefs access from this workspace). Candidate terms in each data file's `keywords`. Run before the 2026-11-10 go-live.
- **Published dates** are the brief's go-live dates. Adjust if a page ships on a different day.
- **Resources hub listing / nav**: the cluster is not on `/resources` or in the nav. Recommend adding the indexable pages to `LATEST` in `ResourceHubPage.tsx` at go-live.
- Hub runs ~2,300 words (brief guide 1,800–2,200) after the approaches and process-review sections were added at the client's request.
- Skyler reviews all copy on stg (Pastel) before any push to `main`.
