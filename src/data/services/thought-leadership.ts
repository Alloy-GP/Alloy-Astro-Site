// /boardretain/thought-leadership — copy from docs/redesign-handoff/site/boardretain-thought-leadership.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/thought-leadership',
  engine: 'retain',
  name: 'Thought Leadership',
  eyebrow: 'BoardRetain™ · Authority',
  h1: 'Be the firm other firms',
  h1Accent: 'quote.',
  intro: 'Boards renew with the manager who seems to know more than anyone else in the room. Thought Leadership for HOA management companies puts your principal’s expertise in writing — articles, LinkedIn, trade press, speaking — so your authority is visible to the boards you have and the ones you want.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 4, suffix: 'articles / mo', note: 'Long-form, ghostwritten, in your voice' },
    { value: 1, suffix: 'byline', note: 'Your principal’s — the person boards hire' },
    { value: 3, suffix: 'channels', note: 'Your site, LinkedIn, and trade press — repurposed across all of them' },
  ],
  sections: [
    {
      h: 'Authority is a retention tool.',
      p: [
        'A board that reads its manager’s article on reserve funding in a trade magazine doesn’t shop. It brags. Thought leadership works on the boards you already have first — and reaches the next ones second.',
      ],
    },
    {
      h: 'Ghostwritten from real expertise.',
      p: [
        'A monthly interview with your principal becomes the month’s articles, posts, and pitches. The ideas are yours; the hours aren’t.',
      ],
    },
    {
      h: 'Placed where boards and peers see it.',
      p: [
        'Your own site for search. LinkedIn for the board members with day jobs. CAI chapter publications and trade press for credibility. Speaking slots when the topic fits.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Positioning and topic strategy',
      'Monthly principal interview',
      'Four long-form articles a month',
      'LinkedIn repurposing (with Social Media Marketing)',
      'Trade press pitching and placement',
      'Speaking and panel outreach',
      'Media kit and bio',
      'Quarterly authority report',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Position', body: 'What you know that others don’t say.' },
      { title: 'Interview', body: 'Thirty minutes a month with your principal.' },
      { title: 'Publish', body: 'Articles on your site; posts on LinkedIn; pitches to press.' },
      { title: 'Amplify', body: 'Placements, speaking, and repurposing.' },
    ],
  },
  faq: {
    items: [
      { q: 'I’m not a writer.', a: 'You don’t need to be. You need thirty minutes a month and opinions. We handle the rest.' },
      { q: 'How is this different from Social Media Marketing?', a: 'Social is the daily presence. Thought leadership is the long-form authority that feeds it.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
