// src/data/services/types.ts
// Data contract for the service-page template (src/components/rd/ServicePage.tsx).
// One file per service under src/data/services/, copy lifted verbatim from the
// design prototypes in docs/redesign-handoff/site/*.dc.html.
import type { EngineKey } from '~/lib/nav';
import type { FaqItem } from '~/lib/schema';

export interface StatItem {
  /** Numeric target for the count-up. */
  value: number;
  /** Rendered after the number at .5em (e.g. "%", "×", "months"). */
  suffix?: string;
  /** Rendered before the number (e.g. "+", "$"). */
  prefix?: string;
  /** Exact final text for the number when locale formatting isn't right (e.g. "40–60"). */
  display?: string;
  /** Bold 16px line under the number (optional — some bands only carry a note). */
  label?: string;
  /** 14px supporting line. */
  note: string;
}

export interface ProseSection {
  h: string;
  p: string[];
}

export interface Step {
  title: string;
  body: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface ServicePageData {
  /** Canonical path, e.g. "/boardreach/email-marketing". Must match nav.ts. */
  href: string;
  engine: EngineKey;
  /** Short name for breadcrumb + chips (matches nav.ts label). */
  name: string;
  /** e.g. "BoardReach™ · Email" */
  eyebrow: string;
  /** First clause of the H1 (purple). */
  h1: string;
  /** Second clause of the H1 (pink). */
  h1Accent: string;
  /** Optional third clause after the accent (purple again), e.g. "Fix that." */
  h1Tail?: string;
  /** 72px vs 76px per the prototype. Default 'md' (72). */
  h1Size?: 'md' | 'lg';
  intro: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Right-hand hero column. Default 'siblings'. */
  heroAside?: 'siblings' | 'seo-map';
  stats: StatItem[];
  sections: ProseSection[];
  included: { eyebrow?: string; h2: string; intro: string; items: string[] };
  process: { h2: string; intro: string; steps: Step[] };
  faq: { eyebrow?: string; h2?: string; items: FaqItem[] };
  cta: { text: string; label?: string; href?: string };
}
