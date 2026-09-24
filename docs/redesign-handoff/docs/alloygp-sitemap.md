# alloygp.co — Site Architecture & Page Build Spec

Goal: fewer, deeper pages. ~55 indexed pages → ~36. Every page below has one job and one primary search target. Build new/expanded pages first, then apply the redirect map.

**Status key:** KEEP (no change) · EXPAND (rebuild on same URL, more depth) · NEW (URL doesn't exist yet) · MOVE (new URL, old one redirects)

---

## 1. Page Tree

```
/                                         KEEP
├── /boardsuite                           EXPAND   (absorbs /our-approach)
├── /services                             KEEP     (service index)
├── /pricing                              KEEP
│
├── /boardreach                           EXPAND   (engine hub — absorbs /our-approach/boardreach)
│   ├── /boardreach/hoa-website-design
│   ├── /boardreach/hoa-management-branding
│   ├── /boardreach/property-management-lead-generation
│   ├── /boardreach/hoa-social-media-marketing          MOVE
│   ├── /boardreach/email-marketing
│   └── /boardreach/print-production
│
├── /boardmatch                           NEW      (engine hub — absorbs /our-approach/boardmatch)
│   ├── /boardmatch/proposal-optimization
│   ├── /boardmatch/rfp-response-system
│   ├── /boardmatch/sales-messaging
│   └── /boardmatch/groundwork                           EXPAND
│
├── /boardretain                          NEW      (engine hub — absorbs /our-approach/boardretain)
│   ├── /boardretain/newsletter-production
│   ├── /boardretain/annual-report-production
│   ├── /boardretain/reputation-management
│   ├── /boardretain/thought-leadership
│   └── /boardretain/board-education                     EXPAND
│
├── /property-management-seo              EXPAND   (absorbs AI-search article)
│
├── /results                              KEEP
│   └── /results/apex-cmg                 KEEP
│
├── /resources                            EXPAND   (single content hub)
│   ├── /resources/hoa-management-software-guide         KEEP
│   ├── /resources/cam-marketing-strategy                MOVE
│   └── /resources/courses                               KEEP
│       └── /resources/courses/trust-building            EXPAND  (absorbs 10 lessons + quiz)
│
├── /about                                EXPAND   (absorbs /about/we-know-cam)
│   └── /about/testimonials               KEEP
├── /partners                             KEEP
├── /careers                              KEEP
├── /faq                                  KEEP
├── /growth-modeled                       KEEP
├── /get-started                          KEEP
├── /contact                              KEEP
├── /privacy-policy                       KEEP
└── /terms-conditions                     KEEP
```

---

## 2. Pages to Build or Rebuild

### /boardsuite — EXPAND
- **Job:** The one page that explains the integrated system (three engines, three tiers, one firm per market).
- **Primary target:** HOA management company marketing / CAM growth system
- **Length:** 1,200+ words
- **Pull content from:** /our-approach (Attract. Close. Keep. framing), current /boardsuite
- **Must include:** Engine overview linking to all three hubs, tier comparison linking to /pricing, market-exclusivity explainer, Apex proof point, CTA to /get-started

### /boardreach — EXPAND (engine hub)
- **Job:** Hub for all marketing/demand services.
- **Primary target:** HOA management marketing
- **Length:** 1,000+ words
- **Pull content from:** /our-approach/boardreach, current /boardreach
- **Must include:** Problem framing, card grid linking to all 6 BoardReach service pages + /property-management-seo, one proof stat, CTA

### /boardmatch — NEW (engine hub)
- **Job:** Hub for sales/close services.
- **Primary target:** HOA management proposals / CAM business development
- **Length:** 1,000+ words
- **Pull content from:** /our-approach/boardmatch ("Closing 1 in 4? You should be at 1 in 2.")
- **Must include:** Card grid linking to all 4 BoardMatch service pages, win-rate proof, CTA
- **Note:** Clarify the difference between Proposal Optimization (rebuild your standing template) and RFP Response System (done-for-you on a single high-stakes RFP)

### /boardretain — NEW (engine hub)
- **Job:** Hub for retention services.
- **Primary target:** HOA client retention for management companies
- **Length:** 1,000+ words
- **Pull content from:** /our-approach/boardretain ("Protect the portfolio you've already built.")
- **Must include:** Card grid linking to all 5 BoardRetain service pages, churn/retention proof, CTA

### /boardmatch/groundwork — EXPAND
- **Job:** Fractional business development offer.
- **Primary target:** fractional business development for property management
- **Length:** 900+ words (currently 170)
- **Must include:** How prospecting/qualification/handoff works, 40–60% qualified-to-close target, who it's for, process timeline, FAQ, CTA
- **Note:** Give it a unique H1. It currently duplicates a heading on /services.

### /boardretain/board-education — EXPAND
- **Job:** Branded board education programs.
- **Primary targets:** hoa board training, hoa board education
- **Length:** 900+ words (currently 173)
- **Must include:** What the library/micro-courses look like, formats, how it drives retention, example topics, FAQ, CTA

### /property-management-seo — EXPAND
- **Job:** Rank for the highest-value term in the category.
- **Primary target:** property management seo (secondary: property management seo services, AI search for property managers)
- **Length:** 1,800+ words (currently 234)
- **Pull content from:** /resource-hub/ai-search-for-cam, SEO/AI-search sections of /our-approach/boardreach
- **Must include:** Local SEO, map pack, AI search / citations (ChatGPT, Perplexity, Gemini, AI Overviews), what a program includes, Apex proof, FAQ with schema, CTA

### /resources/courses/trust-building — EXPAND
- **Job:** One complete guide replacing a 13-URL course.
- **Primary target:** trust signals (secondary: HOA management reviews, testimonials, case studies)
- **Length:** 4,000–5,000 words, single page with jump-link table of contents
- **Structure (one section per former lesson, in this order):**
  1. Intro to trust-building
  2. Why trust signals matter to HOA boards
  3. What reviews are
  4. Reviews: extra factors
  5. What testimonials are
  6. Testimonials: extra factors
  7. What case studies are
  8. Case studies: extra factors
  9. Recapping the 3 trust signals
  10. From proof to persuasion
  11. Knowledge check (quiz embedded at the end)
- **Each section gets an anchor ID** matching the old lesson slug (e.g. `#what-reviews-are`) so redirects land in the right place.

### /about — EXPAND
- **Pull content from:** /about/we-know-cam ("Generic agencies guess. Alloy knows.")
- **Add:** A "Why CAM-only" section.

### /resources — EXPAND
- **Job:** The single content hub.
- **Must include:** Featured guide (software guide), article list, courses block, newsletter signup

### MOVE pages (content unchanged, URL changes)
| Old URL | New URL |
|---|---|
| /services/social-media-marketing-for-hoa-management-companies | /boardreach/hoa-social-media-marketing |
| /resource-hub/cam-marketing-strategy | /resources/cam-marketing-strategy |

---

## 3. Redirect Map (301)

| From | To |
|---|---|
| /our-approach | /boardsuite |
| /our-approach/boardreach | /boardreach |
| /our-approach/boardmatch | /boardmatch |
| /our-approach/boardretain | /boardretain |
| /about/we-know-cam | /about |
| /services/social-media-marketing-for-hoa-management-companies | /boardreach/hoa-social-media-marketing |
| /resource-hub/cam-marketing-strategy | /resources/cam-marketing-strategy |
| /resource-hub/ai-search-for-cam | /property-management-seo |
| /courses/trust-building/lessons/intro | /resources/courses/trust-building#intro |
| /courses/trust-building/lessons/why-trust-signals-matter | /resources/courses/trust-building#why-trust-signals-matter |
| /courses/trust-building/lessons/what-reviews-are | /resources/courses/trust-building#what-reviews-are |
| /courses/trust-building/lessons/reviews-extra-factors | /resources/courses/trust-building#reviews-extra-factors |
| /courses/trust-building/lessons/what-testimonials-are | /resources/courses/trust-building#what-testimonials-are |
| /courses/trust-building/lessons/testimonials-extra-factors | /resources/courses/trust-building#testimonials-extra-factors |
| /courses/trust-building/lessons/what-case-studies-are | /resources/courses/trust-building#what-case-studies-are |
| /courses/trust-building/lessons/case-studies-extra-factors | /resources/courses/trust-building#case-studies-extra-factors |
| /courses/trust-building/lessons/recapping-trust-signals | /resources/courses/trust-building#recapping-trust-signals |
| /courses/trust-building/lessons/from-proof-to-persuasion | /resources/courses/trust-building#from-proof-to-persuasion |
| /courses/trust-building-quiz | /resources/courses/trust-building#knowledge-check |
| /courses/trust-building-lesson | /resources/courses/trust-building |
| /learn/is-online-employee-training-too-much | /resources/courses/trust-building |
| /terms-conditions/ | /terms-conditions |

Redirects go straight to the final URL (no chains).

---

## 4. Navigation

**Primary nav:**
- BoardSuite
- Services ▾ (BoardReach · BoardMatch · BoardRetain, each with its service pages beneath)
- Results
- Pricing
- Resources
- About ▾ (About · Testimonials · Partners · Careers)
- CTA button: Get Started

**Footer:** Services by engine · Property Management SEO · FAQ · Growth Model · Contact · Privacy · Terms

---

## 5. Build Rules (all pages)

- **Links:** Internal links use the final URL with no trailing slash. Update the nav's current `/resources/` link to `/resources`.
- **Hierarchy:** Every service page links up to its engine hub and across to 2–3 sibling services. Every hub links to /boardsuite and /get-started.
- **Headings:** One unique H1 per page. Don't reuse the "Three engines. One playbook. Your market." heading block across multiple pages. Use it on /boardsuite only.
- **Schema:** FAQ schema on /property-management-seo, the three hubs, and all EXPAND service pages. Article schema on the trust-building guide and the /resources articles.
- **Titles:** Keep the current pattern: `[Service] for HOA Management Companies | Alloy GP`.
- **Sitemap:** Update sitemap.xml to list only the URLs in Section 1.
