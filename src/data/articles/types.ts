// src/data/articles/types.ts
// Data contract for the long-form article template (src/components/rd/ArticlePage.tsx).
// One file per page under src/data/articles/. Copy strings accept a tiny inline markup:
//   **bold**            → <strong>
//   [label](/path)      → internal link      [label](https://…) → external link (new tab, noopener)
// Keep sentences short (the brief: under 25 words), no em dashes, no promised outcomes, no "always" / "never",
// no provider named (client, 2026-10-12): recommend processes, not companies.
import type { FaqItem } from '~/lib/schema';

export type ReadingTone = 'reach' | 'match' | 'retain' | 'blue';

export type Block =
  | { t: 'p'; s: string }
  | { t: 'h3'; s: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  /** Styled callout box (definitions, the one thing to remember). */
  | { t: 'callout'; label?: string; s: string }
  /** Small print under a block (sources, "not legal advice"). */
  | { t: 'note'; s: string }
  /** Visible `[PROOF: …]` placeholder. Pages carrying one stay noindex until it is filled. */
  | { t: 'proof'; s: string }
  /** Fill-in worksheet: the reader supplies the numbers (the brief: no invented averages). */
  | { t: 'worksheet'; title: string; rows: Array<{ label: string; hint?: string }>; result?: string; note?: string }
  | { t: 'table'; caption?: string; head: string[]; rows: string[][]; note?: string }
  /** Inline CTA row (Alloy services). */
  | { t: 'cta'; s: string; label: string; href: string };

export interface ArticleSection {
  /** Anchor id (TOC + mobile TOC bar). */
  id: string;
  /** Written as the question an operator asks. */
  h2: string;
  blocks: Block[];
}

export interface KeepReading {
  kind: string;
  meta: string;
  title: string;
  href: string;
  tone?: ReadingTone;
  /** Card image, when the linked article has one. */
  image?: string;
}

export interface ArticleData {
  /** Canonical path, no trailing slash. */
  path: string;
  /** Breadcrumb parent (Collections hub or Resources). */
  parent: { label: string; href: string };
  /** Short crumb label for this page. */
  crumb: string;
  eyebrow: string;
  /** H1, split for the site's two-tone headline. Words come from the brief's sitemap. */
  h1: string;
  h1Accent?: string;
  /** <title> and meta description. */
  title: string;
  description: string;
  /** Target phrases (documentation only; from the brief's Ahrefs pull, 2026-10-08). */
  keywords: string[];
  /** ISO dates. `published` is the planned go-live date from the brief's timeline. */
  published: string;
  updated?: string;
  /** The 40–60 word direct answer to the H1 question (AI search pickup). Rendered as the intro. */
  answer: string;
  /** Blocks rendered before the first H2 (e.g. a definition callout). */
  lead?: Block[];
  /** Disclosure under the byline. 'interest' = the cluster-wide financial-interest line (no provider named; client, 2026-10-12). */
  disclosure: 'interest' | 'none';
  /** Sticky-column CTA card. Each article routes to /contact?intent=<key> so the form preselects a matching topic. */
  aside?: { title: string; body: string; label: string; href: string };
  sections: ArticleSection[];
  faq?: FaqItem[];
  /** Closing "Next steps" paragraph(s). */
  next?: string[];
  keepReading: KeepReading[];
  cta: { text: string; label?: string; href?: string };
  /** When set, the route emits robots noindex,follow and the page stays out of the sitemap. The string says why. */
  noindex?: string;
}
