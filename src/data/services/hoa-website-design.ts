// /boardreach/hoa-website-design — copy from docs/redesign-handoff/site/boardreach-hoa-website-design.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/hoa-website-design',
  engine: 'reach',
  name: 'HOA Website Design',
  eyebrow: 'BoardReach™ · Website',
  h1: 'A website that',
  h1Accent: 'wins boards',
  h1Tail: ', not just homeowners.',
  intro: 'Most CAM sites are built for the owners you already have: portals, payments, forms. Boards evaluating you land on the same page and leave. We build the site four audiences actually use: boards, RFP committees, homeowners, and the talent you’re hiring.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  stats: [
    { value: 4, suffix: 'audiences', note: 'Boards, RFP committees, homeowners, talent: each with a clear path' },
    { value: 535, suffix: '%', note: 'More lead intake for one Alloy CAM partner after the rebuild' },
    { value: 1, suffix: 'firm per metro', note: 'Your site is never a template we sell to your competitor' },
  ],
  sections: [
    {
      h: 'Built for the board’s decision, not the owner’s login.',
      p: [
        'A board president landing on your homepage wants three things in ten seconds: do you manage communities like theirs, can they trust you, and how do they start a conversation. Most CAM sites answer none of them above the fold. Ours answer all three.',
        'Owner and portal traffic still gets a clear, fast path. It just doesn’t sit in the way of the people deciding whether to hire you.',
      ],
    },
    {
      h: 'Every page has one audience and one job.',
      p: [
        'A board director and a homeowner want completely different things from your site. One is evaluating a half-million-dollar contract. The other wants the pool hours. Most CAM sites treat them as the same visitor and serve neither well.',
        'We map four: boards researching a change, committees running an active RFP, homeowners already in your portfolio, and managers deciding whether to work for you. Every page gets a primary audience and a measurable job: a proposal request, a portal login, an application. Build for one audience and the others bounce. Build for everyone and no one converts.',
      ],
    },
    {
      h: 'Proof a board can see before it scrolls.',
      p: [
        '“Serving HOA communities since 2014” is not a signal. The number of associations you manage, case studies with names attached, and a reference from a board president are. We put portfolio scale, your metro, and a trust line in the hero, and the proof one scroll below it, beside the proposal request.',
        'The copy comes from CAM-fluent editors, not generalist copywriters who think “community” means apartments. Every headline has a verb and speaks to where the reader is in the decision, which is why the RFP page and the careers page don’t sound like the homepage.',
      ],
    },
    {
      h: 'Structured so search engines and AI answers can read it.',
      p: [
        'Every service, every city, every association type gets a page with a real job. Schema is written in, not bolted on. When a board asks Google or ChatGPT who manages HOAs in your metro, your site gives them something to quote.',
        'Under the pages sits an internal-link structure that ties each city page to its services and each service to the pages a board reads next. The result is a site Google can crawl and ChatGPT or Perplexity can quote from launch day, instead of after a second SEO project.',
      ],
    },
    {
      h: 'Fast on a phone, usable by every homeowner.',
      p: [
        'Most CAM site visits happen on a phone, yet the majority of CAM sites still fail Google’s mobile Core Web Vitals. We build mobile-first to a sub-two-second largest contentful paint on the templates that matter, and benchmark speed before and after launch so you can see the difference. A slow site loses the board in the first three seconds, before any copy gets read.',
        'Accessibility is built to WCAG 2.2 AA: full keyboard access, screen-reader labels, verified color contrast. CAM firms serve seniors and homeowners with disabilities, so an inaccessible portal path is a service failure, and accessibility lawsuits are real.',
      ],
    },
    {
      h: 'Proposals, RFPs, and careers get their own front door.',
      p: [
        'An RFP committee comparing five firms shouldn’t have to dig. A dedicated RFP page, a proposal request form, and a careers section that actually sells the job. Each converts a different visitor without cluttering the homepage.',
        'Each door ends somewhere better than a generic inbox. Proposal requests book a calendar slot, RFP intake captures the details your BD lead needs, and gated guides collect a name worth following up with. Every form is scored and routed to your CRM, or BoardSuite, within 24 hours, and GA4 and Search Console report which pages produce inquiries rather than counting sessions.',
      ],
    },
    {
      h: 'Built so your team can run it.',
      p: [
        'You get a design system, not a set of one-off pages. Type, color, components, and page patterns are documented, so the next service or city page your team adds stays on brand without re-engaging us. Changing a comma shouldn’t require emailing an agency.',
        'Launch includes a training session for whoever will publish. The site goes live on hosting matched to the stack. Vercel for Astro, a managed WordPress host such as WP Engine or Kinsta for WordPress. Security updates, content refreshes, and performance monitoring are bundled into BoardSuite tiers or available as a standalone retainer.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Discovery with your BD and operations leads',
      'Information architecture for four audiences',
      'Copy written for board-stage intent',
      'Design in your brand system (or a refreshed one)',
      'Documented design system for future pages',
      'Astro or WordPress build, your choice',
      'Service, city, and association-type pages',
      'Portal, payments, and owner paths preserved',
      'Calendar booking and scored RFP intake',
      'Schema, speed, and accessibility baked in',
      'Speed benchmarks before and after launch',
      'Analytics and attribution wired from day one',
      'Launch training for your publishing team',
      'Ninety days of post-launch optimization',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Discover', body: 'Who visits, why, and what they need to see to act. Two weeks of stakeholder interviews, competitor audit, and content inventory.' },
      { title: 'Architect', body: 'The page tree, the copy, the paths for each audience. Reviewed by your leadership and the operators closest to the buyer.' },
      { title: 'Build', body: 'Design, development, and content on a staging site you review. Content migration and CRM, calendar, and portal integrations happen here.' },
      { title: 'Launch', body: 'Redirects, tracking, and a ninety-day optimization window. Search Console handoff and analytics calibration included.' },
    ],
  },
  faq: {
    items: [
      { q: 'We just redesigned. Do we need to start over?', a: 'Usually not. We audit what you have, keep what works, and fix the board-facing paths first. A full rebuild is only the answer when the foundation can’t support the pages you need.' },
      { q: 'Do you migrate our owner portal?', a: 'We don’t replace your portal: we integrate it. Vantaca, AppFolio, Buildium, CINC: the login stays where owners expect it.' },
      { q: 'How long does a build take?', a: 'Sixty to ninety days for most firms. Multi-brand or multi-market sites run longer; we scope that in the Strategic Review.' },
      { q: 'WordPress, Astro, or something else?', a: 'Whatever fits your team’s capacity. WordPress with a structured block setup is the right answer for most CAM firms. Your marketing person can publish pages without a developer. Larger firms with engineering capacity get speed and AI-search advantages from headless Astro. We recommend in discovery, not before.' },
      { q: 'Can we keep our current branding?', a: 'Yes. We can build to your existing identity or refresh the elements that aren’t working. A full rebrand is a separate engagement. Branding for CAM. Most firms start with the site and discover what the brand needs to do along the way.' },
      { q: 'How does this fit with BoardSuite?', a: 'Your website is the surface every engine touches. BoardReach™ channels send traffic to it, BoardMatch™ proposals point back to it, and under BoardRetain™, homeowners self-serve on it. Without a site that converts, the engines fill a leaky bucket, which is why most BoardSuite™ engagements include a build or refresh in the first ninety days.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you, and which engine to fix first.' },
};

export default data;
