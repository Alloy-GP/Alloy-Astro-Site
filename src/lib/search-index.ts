// src/lib/search-index.ts — every navigable page, for the header search (SiteSearch.tsx).
// Services + hubs come from nav.ts so they can't drift; everything else is listed here.
import { ENGINES } from './nav';

export interface SearchItem { t: string; h: string; g: string; k: string }

const STATIC: SearchItem[] = [
  { t: 'All services', h: '/services', g: 'The System', k: 'services engines boardreach boardmatch boardretain overview' },
  { t: 'BoardSuite™ — all three engines', h: '/boardsuite', g: 'The System', k: 'boardsuite suite tiers steady accelerate ascend full system' },
  { t: 'Pricing', h: '/pricing', g: 'The System', k: 'pricing cost retainer tiers steady accelerate ascend all-in' },
  { t: 'Results', h: '/results', g: 'Proof', k: 'results case studies outcomes proof numbers' },
  { t: 'Case study: from chasing RFPs to inbound boards', h: '/results/apex-cmg', g: 'Proof', k: 'case study apex partner three years rfp inbound' },
  { t: 'Testimonials', h: '/about/testimonials', g: 'Proof', k: 'testimonials reviews quotes partners video' },
  { t: 'Growth Modeled', h: '/growth-modeled', g: 'Proof', k: 'roi calculator growth model revenue doors' },
  { t: 'Resource Hub', h: '/resources', g: 'Resources', k: 'resources articles guides courses newsletter library' },
  { t: 'How CAM firms win in AI search', h: '/resources/ai-search-for-cam', g: 'Resources', k: 'ai search chatgpt perplexity gemini overviews citations article' },
  { t: 'CAM marketing strategy: the plan before the tactics', h: '/resources/cam-marketing-strategy', g: 'Resources', k: 'strategy plan 18 months engines article' },
  { t: 'The HOA management software guide', h: '/resources/hoa-management-software-guide', g: 'Resources', k: 'software guide platforms pricing rfp vantaca appfolio buildium' },
  { t: 'Courses', h: '/resources/courses', g: 'Resources', k: 'courses training learning' },
  { t: 'Trust building for CAM firms', h: '/resources/courses/trust-building', g: 'Resources', k: 'trust reviews testimonials case studies course quiz' },
  { t: 'The Alloy Briefing (newsletter archive)', h: '/resources/newsletter', g: 'Resources', k: 'newsletter briefing archive issues mailchimp' },
  { t: 'FAQ', h: '/faq', g: 'Resources', k: 'faq questions answers exclusivity guarantee pricing' },
  { t: 'About Alloy', h: '/about', g: 'Company', k: 'about team partners operators story cam-only' },
  { t: 'Partners', h: '/partners', g: 'Company', k: 'partners partnerships referral network vendors' },
  { t: 'Careers', h: '/careers', g: 'Company', k: 'careers jobs hiring roles benefits' },
  { t: 'Contact · Claim your market', h: '/contact', g: 'Company', k: 'contact claim market metro strategic review talk email phone' },
  { t: 'Partner portal login', h: 'https://growth.alloygp.co', g: 'Company', k: 'login log in portal account growth dashboard' },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...ENGINES.flatMap((e) => [
    { t: `${e.title} — ${e.stage}`, h: e.href, g: e.title, k: `${e.sub} engine hub overview` },
    ...e.services.map((s) => ({ t: s.label, h: s.href, g: e.title, k: s.sub })),
  ]),
  ...STATIC,
];

/** Token match: every token must hit; title hits rank above keyword hits. */
export function searchIndex(query: string, limit = 20): SearchItem[] {
  const term = query.trim().toLowerCase();
  if (!term) return SEARCH_INDEX.slice(0, 12);
  const tokens = term.split(/\s+/);
  const scored: Array<{ item: SearchItem; score: number }> = [];
  for (const item of SEARCH_INDEX) {
    const title = item.t.toLowerCase();
    const hay = `${title} ${item.g} ${item.k}`.toLowerCase();
    let score = 0;
    let ok = true;
    for (const tok of tokens) {
      if (title.startsWith(tok)) score += 10;
      else if (title.includes(tok)) score += 6;
      else if (hay.includes(tok)) score += 2;
      else { ok = false; break; }
    }
    if (ok) scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}
