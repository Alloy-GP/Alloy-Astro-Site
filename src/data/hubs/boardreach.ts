// /boardreach — copy from docs/redesign-handoff/site/boardreach.dc.html
import type { HubPageData } from './types';

const data: HubPageData = {
  engine: 'reach',
  eyebrow: 'BoardReach™ · Attract',
  h1: 'Get found',
  h1Accent: 'before boards start shopping.',
  intro: 'Boards research management companies across Google Maps, AI answers, LinkedIn, and review sites before the first call. BoardReach makes your firm the answer they find — in your metro, and only for you.',
  systemNote: 'Attract feeds Close. Close feeds Keep. One playbook, one partner, one CAM firm per metro.',
  outcomes: {
    eyebrow: 'Three outcomes',
    h2: 'What BoardReach is built to produce.',
    items: [
      {
        title: 'Boards find you on the map before they find your competitor.',
        body: 'Most board searches start local — “HOA management company near me”, a city name, a ZIP. The top three map results get the calls. Everyone else gets the RFP, if anything.',
        services: [
          { label: 'Property Management SEO', sub: 'Google, the map pack, and the AI answer — one program', href: '/property-management-seo' },
          { label: 'HOA Website Design', sub: 'A site built to convert boards, not just homeowners', href: '/boardreach/hoa-website-design' },
        ],
      },
      {
        title: 'You look like the firm boards already trust.',
        body: 'Once a board finds you, they judge you in seconds — the brand, the LinkedIn presence, the proposal on the table. Authority is built before the first call, not during it.',
        services: [
          { label: 'Branding for CAM', sub: 'An identity that reads as the credible choice', href: '/boardreach/hoa-management-branding' },
          { label: 'Social Media Marketing', sub: 'Founder thought-leadership boards actually see', href: '/boardreach/hoa-social-media-marketing' },
          { label: 'Print & Marketing Materials', sub: 'Proposal, deck, mailer, and tradeshow systems', href: '/boardreach/print-production' },
        ],
      },
      {
        title: 'Demand you can measure, month over month.',
        body: 'Inbound compounds — but only if you can see where it comes from. Every BoardReach engagement starts with attribution, so paid, email, and social prove their keep.',
        services: [
          { label: 'Lead Generation', sub: 'Lead magnets and demand-gen assets for boards', href: '/boardreach/property-management-lead-generation' },
          { label: 'Email Marketing', sub: 'Nurture sequences written for the board timeline', href: '/boardreach/email-marketing' },
        ],
      },
    ],
  },
  proof: {
    eyebrow: 'One Alloy CAM partner · 18 months',
    h2: 'What Attract produced for one firm.',
    link: { label: 'Read the results', href: '/results' },
    stats: [
      { value: 535, suffix: '%', note: 'lead intake vs. baseline' },
      { value: 3, suffix: '×', note: 'proposal requests' },
      { value: 1580, suffix: '%', display: '1,580', note: 'YoY opportunities' },
    ],
  },
  wait: {
    eyebrow: 'What it costs to wait',
    h2: 'Every board you didn’t hear from this quarter',
    h2Accent: 'hired someone.',
    body: 'Boards research CAM firms across Google, AI search, LinkedIn, and review sites before the first call. The firms that show up — with real authority — win the meeting. The rest live on referrals they can’t forecast and can’t repeat. That isn’t growth. It’s waiting.',
  },
  cta: { text: 'Ready to be the answer, not an option? Thirty minutes shows you where Attract is leaking.' },
};

export default data;
