// src/data/hubs/types.ts
// Data contract for the engine-hub template (src/components/rd/HubPage.tsx).
import type { EngineKey } from '~/lib/nav';
import type { FaqItem } from '~/lib/schema';
import type { StatItem, Cta } from '~/data/services/types';

export interface HubOutcome {
  title: string;
  body: string;
  /** Service cards under "What builds it". */
  services: { label: string; sub: string; href: string }[];
}

export interface HubPageData {
  engine: EngineKey;
  /** e.g. "BoardReach™ · Attract" */
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string;
  secondaryCta?: Cta;
  /** Footer line inside "The system" card. */
  systemNote: string;
  outcomes: { eyebrow: string; h2: string; items: HubOutcome[] };
  proof: { eyebrow: string; h2: string; link: Cta; stats: StatItem[] };
  wait: { eyebrow: string; h2: string; h2Accent?: string; body: string };
  /** Optional FAQ (rendered + FAQPage schema) */
  faq?: { eyebrow?: string; h2?: string; items: FaqItem[] };
  cta: { text: string; label?: string; href?: string };
}
