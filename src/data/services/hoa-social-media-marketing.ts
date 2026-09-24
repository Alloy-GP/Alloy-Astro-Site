// /boardreach/hoa-social-media-marketing — copy from docs/redesign-handoff/site/boardreach-hoa-social-media-marketing.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/hoa-social-media-marketing',
  engine: 'reach',
  name: 'Social Media Marketing',
  eyebrow: 'BoardReach™ · Social',
  h1: 'The LinkedIn presence',
  h1Accent: 'boards check',
  h1Tail: 'before they call.',
  intro: 'Board members look you up. The owner, the executive team, the firm page — if the last post is from 2023, that’s the impression. Social Media Marketing for HOA management companies is founder-led thought leadership, ghostwritten and scheduled, repurposed from everything else you publish.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 20, suffix: 'posts / mo', note: 'Across the founder and firm accounts, written for you' },
    { value: 1, suffix: 'voice', note: 'Yours — we ghostwrite, you approve' },
    { value: 5, suffix: '+ channels', note: 'LinkedIn first; Facebook, Instagram, YouTube, Nextdoor where boards are' },
  ],
  sections: [
    {
      h: 'Founder-led, because boards hire people.',
      p: [
        'Firm pages get ignored. A managing principal with a point of view on reserve studies, insurance, or board burnout gets followed — by the exact board members who will be shopping next year. We write in your voice, from your calls and your notes, and you approve every post.',
      ],
    },
    {
      h: 'Repurposed, not reinvented.',
      p: [
        'Every article, webinar, newsletter, and case study becomes eight to twelve posts. Nothing is written from scratch when it can be cut from something you already said better.',
      ],
    },
    {
      h: 'Measured on inquiries, not likes.',
      p: [
        'We track profile visits, inbound messages, and the referral source on your inquiry form. If social isn’t producing conversations with boards within two quarters, we’ll say so.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Founder and firm profile optimization',
      'Monthly content calendar',
      '~20 ghostwritten posts a month',
      'Repurposing from long-form content',
      'Community management and reply drafting',
      'Video scripts and short-form edits',
      'Employer-brand posts for hiring',
      'Monthly report tied to inquiries',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Interview', body: 'Your positions, your stories, your voice.' },
      { title: 'Plan', body: 'A calendar aligned to your seasons and your content.' },
      { title: 'Publish', body: 'Drafts to you weekly; scheduled on approval.' },
      { title: 'Report', body: 'Visits, messages, and inquiries by source.' },
    ],
  },
  faq: {
    items: [
      { q: 'I don’t have time for social.', a: 'That’s the point. A thirty-minute call a month gives us enough to write from. You approve; we do the rest.' },
      { q: 'Which platforms?', a: 'LinkedIn first — it’s where board members with day jobs are. We add others only where your boards actually spend time.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
