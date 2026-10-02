// /boardreach/email-marketing — copy from docs/redesign-handoff/site/boardreach-email-marketing.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/email-marketing',
  engine: 'reach',
  name: 'Email Marketing',
  eyebrow: 'BoardReach™ · Email',
  h1: 'Stay in front of every board',
  h1Accent: 'until they’re ready.',
  intro: 'Most boards don’t switch when they first meet you. They switch eleven months later when the contract comes up. Email Marketing for HOA management companies keeps you present in between — segmented, branded, and written for the board timeline, not a generic drip.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  stats: [
    { value: 11, suffix: 'months', note: 'Average gap between first conversation and contract decision' },
    { value: 4, suffix: 'segments', note: 'Prospect boards, current boards, homeowners, vendors and partners' },
    { value: 2, suffix: '×', note: 'Open rates we typically see against category benchmarks after a rebuild' },
  ],
  sections: [
    {
      h: 'Sequences built on the contract calendar.',
      p: [
        'We map the year a board lives: budget season, annual meeting, insurance renewal, the contract review. Every send lands when the topic is already on the agenda — and positions your firm as the one that understands it.',
        'That becomes a twelve-month plan: a monthly board send, a quarterly state-of-the-portfolio note, legislative alerts when a bill touches associations, and win-back sequences for boards that went quiet after a proposal. All of it is drafted weeks ahead.',
      ],
    },
    {
      h: 'One list, four conversations.',
      p: [
        'Boards you’re courting, boards you manage, the homeowners inside them, and the vendors and attorneys who refer you. Each gets a different cadence and a different message, from one system.',
        'Automations handle the timing. New contacts get a welcome flow. A board you bid on last year hears from you before its contract anniversary. Directors who stop opening get a re-engagement series before they’re suppressed, and a newly seated president starts at the beginning, not halfway through someone else’s thread.',
      ],
    },
    {
      h: 'Written in the language directors use.',
      p: [
        'Most CAM email is written by whoever wrote it last — usually the owner, between budget meetings. Ours comes from editors who have worked inside the industry. They know what a reserve study funds, what a special assessment does to a board meeting, and why a governance change matters to a volunteer director.',
        'It shows in the subject lines. “Reserve study Q&A — your seven questions answered.” “RFP help: five things to ask any CAM finalist.” A director opens those because the problem is already in front of them. Generic tips get archived — and teach the reader to skip your name.',
      ],
    },
    {
      h: 'Templates your team can run.',
      p: [
        'Branded, mobile-first, and simple enough that your operations lead can send an emergency notice without calling us.',
        'Each association you manage gets its own header, colors, and signature line on one underlying template, so adding a community means adding a header — not rebuilding a layout.',
      ],
    },
    {
      h: 'Gated assets that grow the prospect list.',
      p: [
        'A signup box on your site collects almost nobody. A board researching a management change will trade an email address for something it needs that week: an RFP scorecard, a reserve-study checklist, an onboarding kit for new directors.',
        'Each download tags the contact and starts prospect nurture, so the list grows with boards that are actually shopping. We report which assets pull and retire the rest.',
      ],
    },
    {
      h: 'Deliverability and compliance, set before the first send.',
      p: [
        'CAM lists are messy — old board rosters, personal addresses that go stale when a director rotates off, vendor contacts nobody has touched in years. Sending to that list as-is damages your domain. We set up SPF, DKIM, and DMARC, warm up new sending, and track sender reputation to keep you in the inbox.',
        'Every template ships with a compliant unsubscribe, a plain-text version, alt text, and checked color contrast, so CAN-SPAM and accessibility are handled once, in the template, instead of after a complaint.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'List audit, segmentation, and cleanup',
      'Branded template system',
      'Prospect nurture sequences',
      'Board and homeowner communication templates',
      'Monthly or bi-weekly editorial calendar',
      'Copywriting and design for every send',
      'Automation and CRM integration',
      'Reporting: opens, replies, inquiries',
      'Gated assets: RFP scorecards, reserve checklists, onboarding kits',
      'Deliverability: SPF, DKIM, DMARC, and reputation monitoring',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'Who’s on the list, what they’ve received, what’s bounced. Usually a segment or two gets nothing at all.' },
      { title: 'Map', body: 'Segments and the calendar each one lives by. Plus a voice guide, so every send sounds like the same firm.' },
      { title: 'Build', body: 'Templates, sequences, and automations. The first ninety days of content are written and approved before anything goes live.' },
      { title: 'Run', body: 'We write, you approve, it sends — with a monthly report. Each quarter we cut what isn’t opening and expand what starts replies.' },
    ],
  },
  faq: {
    items: [
      { q: 'We use Mailchimp / Constant Contact / HubSpot. Do we switch?', a: 'No. We work in the tool you have unless it genuinely can’t do the job.' },
      { q: 'Isn’t this just a newsletter?', a: 'Newsletter Production is the retention piece for boards you already manage. Email Marketing is the demand piece — the boards you don’t have yet.' },
      { q: 'Will boards actually open these?', a: 'When the cadence is right and the content is operator-grade. The median open rate on Alloy CAM email programs is 38%, against the roughly 21% all-industry average HubSpot reports, because boards already know your firm and the content is useful. The wrong cadence burns that goodwill fast — that’s why we audit first.' },
      { q: 'Do you write the homeowner emails too?', a: 'Yes — homeowners are one of the four segments: maintenance announcements, project updates, special-assessment communications, annual meeting notices. It’s writing your managers know matters and rarely have time to do well.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
