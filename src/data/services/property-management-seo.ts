// /property-management-seo — copy from docs/redesign-handoff/site/property-management-seo.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/property-management-seo',
  engine: 'reach',
  name: 'Property Management SEO',
  eyebrow: 'BoardReach™ · SEO + AI search',
  h1: 'Rank where boards look:',
  h1Accent: 'Google, the map, and the AI answer.',
  h1Size: 'lg',
  intro: 'Property management SEO built for community association management. Local search, the map pack, and AI citations across ChatGPT, Perplexity, Gemini, and Google AI Overviews — one program, one metro, one firm.',
  secondaryCta: { label: 'Talk SEO strategy', href: '/get-started' },
  heroAside: 'seo-map',
  stats: [
    { value: 3, label: 'firms on the map', note: 'The local pack shows three results above every organic listing. Fourth place is page two.' },
    { value: 535, suffix: '%', label: 'more lead intake', note: 'One Alloy CAM partner, 18 months, SEO and AI-search rebuild at the core.' },
    { value: 1, label: 'CAM firm per metro', note: 'We don’t rank two competitors for the same three spots. Ever.' },
  ],
  sections: [
    {
      h: 'Local SEO: the search that starts with a city name.',
      p: [
        'Most board searches are local. “HOA management company Austin.” “Condo association management near me.” Google answers those with a map first, then organic results — and the organic results it favors are pages built for one city and one service, not a generic services page trying to rank for everything.',
        'We build service-area and city pages that read like they were written by someone who manages associations there, because they are. Each one targets a real query, links to the engine hub above it, and to the two or three services a board reads next.',
      ],
    },
    {
      h: 'The map pack: three spots, decided by completeness and recency.',
      p: [
        'The local pack rewards a Google Business Profile that is complete, categorized correctly, and active. Most CAM profiles have the wrong primary category, no services listed, and a review every few months. We fix the profile, seed Q&A, run a monthly photo and post cadence, and build a review system your managers trigger at the moments boards are happiest — targeting ten or more reviews a quarter.',
        'Rating matters. Volume and recency decide the pack.',
      ],
    },
    {
      h: 'AI search: being the source the answer cites.',
      p: [
        'Boards now ask ChatGPT, Perplexity, Gemini, and Google’s AI Overview who manages associations in their city. Those answers are assembled from a handful of sources — reviews, directories, and pages that plainly explain what a firm does and where. Most CAM sites give the models nothing to quote.',
        'We structure your site so it can be cited: clear entity pages, FAQ schema, consistent citations across forty-plus directories, and authority content written for board-stage questions. When the answer names three firms, one of them is you.',
      ],
    },
  ],
  included: {
    h2: 'One program. Every surface.',
    intro: 'Set up once, run monthly, reported quarterly against board-level outcomes: calls, direction requests, inbound inquiries.',
    items: [
      'Technical SEO audit and fixes',
      'Google Business Profile buildout and cadence',
      'Service-area and city pages that rank',
      'Review velocity system with response handling',
      'Citation cleanup across 40+ directories',
      'AI-search citation strategy and FAQ schema',
      'Authority content written for board intent',
      'Local rank tracking by ZIP',
      'Spam-listing removal in your metro',
      'Quarterly report: calls, clicks, directions, inquiries',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Ninety days to the map pack in most metros; six to twelve months for the organic and AI layers to compound. We’ll tell you which situation you’re in at the audit.',
    steps: [
      { title: 'Audit', body: 'Where you rank by ZIP today, who holds the pack, what the AI engines say when asked about your metro.' },
      { title: 'Build', body: 'Profile, citations, technical fixes, and service-area pages — the foundation every algorithm reads.' },
      { title: 'Velocity', body: 'Reviews, posts, content, and Q&A on a monthly cadence. This is what moves you from fourth to third.' },
      { title: 'Report', body: 'Calls, directions, and inquiries by month. Board-level outcomes, not vanity rankings.' },
    ],
  },
  faq: {
    items: [
      { q: 'We already have a Google Business Profile. Isn’t that enough?', a: 'Having one and ranking with one are different things. Most CAM profiles have the wrong primary category, no services listed, and a review every few months. The pack rewards completeness and recency.' },
      { q: 'How is this different from a general SEO agency?', a: 'We only do CAM. We know which queries boards actually type, which directories matter in this category, and what an association board needs to read before they call. A generalist learns that on your retainer.' },
      { q: 'How long until we see results?', a: 'Map pack: about ninety days in most metros. Organic and AI-search visibility compound over six to twelve months. The audit tells you which situation you’re in before you commit.' },
      { q: 'Is this included in BoardSuite?', a: 'Yes — in every tier. It’s also available standalone for firms that only need the search layer fixed.' },
    ],
  },
  cta: { text: 'Is your metro’s map pack still open? Thirty minutes tells you where you rank and what it takes.' },
};

export default data;
