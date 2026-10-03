// /boardretain/reputation-management — copy from docs/redesign-handoff/site/boardretain-reputation-management.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/reputation-management',
  engine: 'retain',
  name: 'Reputation Management',
  eyebrow: 'BoardRetain™ · Reputation',
  h1: 'Your reviews are written by',
  h1Accent: 'angry homeowners.',
  h1Tail: 'Fix that.',
  intro: 'Management companies get reviewed by the owner who got the violation letter, not the board that renewed for the fifth year. Reputation Management for CAM firms builds a system that gets the happy ones to speak, responds to the rest with grace, and keeps the rating that the next board checks.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  statsFootnote: 'Sample metrics from Alloy partner engagements and industry benchmarks, shown as a guide. Your proposal shows the numbers for your firm.',
  stats: [
    { value: 97, suffix: '%', note: 'Of consumers read reviews before choosing a local business (BrightLocal, 2026)' },
    { value: 4.5, suffix: '★ +', note: 'Where a CAM firm needs to sit to make the shortlist' },
    { value: 71, suffix: '%', note: 'Read them on Google first (BrightLocal, 2026). That’s where we start.' },
  ],
  sections: [
    {
      h: 'Boards filter before they call.',
      p: [
        'Eighty-seven percent of board directors say they read online reviews before they contact a CAM firm. The shortlist gets made there, before your office knows the association was looking. Five stars isn’t the bar. The firm that gets the call is usually one star better than the firm next door.',
        'Most management companies collect one or two reviews a quarter, whenever someone remembers to ask. The Google profile hasn’t been touched in years and the BBB listing was never claimed. Reputation belongs to everyone in the office, so nobody owns it.',
      ],
    },
    {
      h: 'The ask, timed right.',
      p: [
        'The moment a board renews. The day the pool opens. The week after a smooth annual meeting. We build the triggers into your managers’ workflow so the request goes out when the sentiment is highest, and to the people who can actually speak to your work.',
        'Each trigger is an event your office already records, like a closed work order prompting the owner who filed it. Velocity is what moves local rankings: more recent reviews, a higher spot on the map, more calls from boards you haven’t met.',
      ],
    },
    {
      h: 'Responses that recruit.',
      p: [
        'Every response is read by a future board member. We write them: grateful, specific, never defensive. A well-handled complaint is a better trust signal than a wall of five stars.',
      ],
    },
    {
      h: 'A playbook for the bad review.',
      p: [
        'The response to a negative review is mediation first. Acknowledge the problem, take it offline, name who will follow up, then make sure your manager does. The playbook covers the operational step and the legal line: nothing in public about an owner’s account or a pending dispute. We’ve handled more than 200 negative reviews this way. None escalated to legal.',
        'Some complaints don’t stay in one review. A Reddit thread about a special assessment, a local news story, a board announcing it’s leaving for a competitor. Those get an on-call response within two hours, a full plan within 24, and mitigation under way the same week. The crisis plan is written during setup, so nobody drafts it at midnight.',
      ],
    },
    {
      h: 'Monitoring across everywhere boards look.',
      p: [
        'Google, Yelp, Facebook, the BBB, industry directories. We watch them all and flag anything that needs your attention the same day.',
        'That now includes the AI answer. Boards ask ChatGPT whether a CAM company is any good, and the model answers from your reviews and directory listings. We check what the major models say about you, fix bad citations at the source, and keep your Google, BBB, CAI, and CAM-directory profiles consistent.',
      ],
    },
    {
      h: 'The reviews that stay up.',
      p: [
        'Google, the BBB, and Yelp prohibit review removal as a paid service. Anyone selling it is selling you a policy violation. We report the reviews that break platform rules (fakes, spam, conflicts of interest) through each platform’s own process.',
        'If you inherited the problem through an acquisition or a manager who left badly, we publish authority content (case studies, board testimonials, transparency reports) that typically surfaces above the legacy results within a quarter.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Review audit across all platforms',
      'Profile cleanup: Google, BBB, CAI, and CAM directories',
      'Request system built into manager workflows',
      'Request templates and timing triggers',
      'Response writing for every review, good or bad',
      'Escalation protocol for serious complaints',
      'Crisis plan with two-hour on-call response',
      'Fake and policy-violating review removal',
      'AI-search answer monitoring and citation fixes',
      'Monthly reputation report',
      'Review integration on your website and proposals',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'Where you stand, where you’re listed, what’s said. Every mention from the last 24 months, against the firms boards compare you to.' },
      { title: 'System', body: 'Triggers, templates, and the manager playbook. Response templates cover the most common review types.' },
      { title: 'Run', body: 'Requests go out; responses go up; we monitor. Live within the first month; velocity builds over the following quarter.' },
      { title: 'Report', body: 'Volume, rating, and sentiment: monthly. Share of voice and the AI-search summary too; recalibrated quarterly.' },
    ],
  },
  faq: {
    items: [
      { q: 'Can you remove bad reviews?', a: 'Only ones that violate platform policy. The rest we respond to, then outnumber.' },
      { q: 'Do boards really read reviews?', a: 'Yes. It’s the first thing a board member does after the referral. Our Trust Building course covers exactly how they weigh them.' },
      { q: 'What if some of our bad reviews are fair?', a: 'Then the program starts with operations, not marketing. We find what’s driving the complaints (response time, manager turnover, financial transparency) and recommend that fix first. Reputation work without the operational fix is paint over rust.' },
      { q: 'Do you handle Reddit, Nextdoor, and forums?', a: 'We monitor the review sites, forums and neighborhood apps where boards talk. We engage directly only where the platform allows it, like Nextdoor or a Reddit AMA, and mediate off-platform everywhere else. Most CAM firms ignore these surfaces. Boards don’t, especially directors under fifty.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you, and which engine to fix first.' },
};

export default data;
