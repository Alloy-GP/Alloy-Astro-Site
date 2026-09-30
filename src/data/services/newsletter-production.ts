// /boardretain/newsletter-production — copy from docs/redesign-handoff/site/boardretain-newsletter-production.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/newsletter-production',
  engine: 'retain',
  name: 'Newsletter Production',
  eyebrow: 'BoardRetain™ · Newsletters',
  h1: 'The newsletter that makes your work',
  h1Accent: 'visible.',
  intro: 'Boards forget what you did last quarter. Newsletter Production for HOA management companies is a done-for-you, branded monthly or quarterly newsletter — for boards, for homeowners, or both — that shows the work, teaches the basics, and keeps your firm the obvious choice at renewal.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 12, suffix: 'issues / yr', note: 'Monthly, written, designed, and sent for you' },
    { value: 2, suffix: 'audiences', note: 'Boards and homeowners, with different content and cadence' },
    { value: 1, suffix: 'hour', note: 'Of your team’s time per issue — a quick call and an approval' },
  ],
  sections: [
    {
      h: 'Show the work.',
      p: [
        'Violations resolved, vendor savings, projects completed, meetings held. Your team does this every month and nobody sees it. The newsletter is where it becomes visible — to the board that votes on your contract and the homeowners who talk to them.',
        'Boards that leave are usually boards that felt ignored. A newsletter on a published cadence is the cheapest, most visible proof that you’re still paying attention — the one touchpoint every board sees every month, under your name. When renewal comes, nobody opens with “remind me what you do for us.”',
      ],
    },
    {
      h: 'A calendar built on the association year.',
      p: [
        'Your associations live the same year on repeat: reserve cycles, dues notices, election prep, the annual meeting, storm season. With a calendar that predictable, communication shouldn’t feel improvised every month.',
        'We map twelve months of themes to your portfolio’s seasonality, so the reserve explainer lands before budget season and the storm-prep issue lands before the season starts. Your leadership approves the calendar before issue one ships.',
      ],
    },
    {
      h: 'Teach a little, every issue.',
      p: [
        'One short piece on how associations work: what a reserve study is, why the insurance premium moved, how to read the budget. Educated owners complain less and support the board that hired you.',
        'The writers are CAM-fluent, not generalists. An ARC denial, a statute change, a special assessment — they explain it the way a good manager would at the table, in language a homeowner reads to the end.',
      ],
    },
    {
      h: 'One masthead, an edition for every community.',
      p: [
        'A single masthead system carries your firm’s brand and flexes for each association it serves. Community-specific dates, financials, and notices merge into set blocks, so one production run yields dozens of customized editions.',
        'At 80 associations, nobody writes 80 newsletters from scratch. The issue is written once on one editorial backbone, community blocks merge in where they matter, and the associations large enough to need their own edition get one.',
      ],
    },
    {
      h: 'Branded, done, sent.',
      p: [
        'We write it, design it in your system, get your approval, and send it — email, print, or both. Your team’s job is one call a month.',
        'Every issue goes out as a print-ready PDF for the portal and the clubhouse bulletin board, and as responsive email to the list you already have. Issues are archived and indexed on your domain, so a director looking for last spring’s reserve explainer finds it without emailing the manager.',
      ],
    },
    {
      h: 'Off the manager’s desk.',
      p: [
        'Without us, the newsletter is a Word doc a manager assembles at 5pm on a Friday: single column, exported to PDF, printed, posted, and lost. It costs three to five manager hours an issue that nobody bills, so it goes out whenever there’s time — about four times a year.',
        'Our version asks a manager for the monthly call and one review per issue. The rest of those hours go back to the associations.',
      ],
    },
    {
      h: 'Engagement data that flags a quiet board.',
      p: [
        'Each issue reports opens, click maps, and reading depth by association, split between board and homeowner editions. That feeds your BoardRetain™ view: a board that stops opening is visible months before the renewal call.',
        'Directors forward issues to homeowners, which makes them look responsive without extra work and puts your firm in front of the audience they care most about. Each month we trim the sections boards skip and give the space to what they read.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Editorial calendar',
      'Monthly or quarterly writing',
      'Design in your brand system',
      'Board edition and homeowner edition',
      'Email and print production',
      'Community-specific variants where needed',
      'Vendor and partner features',
      'Open and engagement reporting',
      'Print-ready PDF for portal and bulletin board',
      'Searchable issue archive on your domain',
      'English and Spanish editions',
      'Optional pre-publication legal pass',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Plan', body: 'Audiences, cadence, and the calendar. We inventory every association — brand assets, board makeup, what it receives today — and set the voice guide.' },
      { title: 'Gather', body: 'A monthly call with your team for the month’s work. Projects, resolved violations, upcoming dates — we take the notes, you don’t write.' },
      { title: 'Produce', body: 'Written, designed, approved. Draft, manager review, design, and the optional compliance pass, in that order.' },
      { title: 'Send', body: 'Email, print, or both — and the report. It shows which boards read and which skipped.' },
    ],
  },
  faq: {
    items: [
      { q: 'Per-community or firm-wide?', a: 'Either. Most firms run a firm-wide board edition plus community variants for larger associations.' },
      { q: 'Isn’t this what Email Marketing does?', a: 'Email Marketing is for boards you don’t have yet. Newsletters are for the ones you do.' },
      { q: 'Can we edit issues before they go out?', a: 'Yes. Every issue gets a 24-hour manager review window: approve it as-is, request copy edits, or replace a community’s block. After 24 hours we publish on schedule, because boards complain when newsletters slip.' },
      { q: 'Do you handle state-specific notice language?', a: 'Optionally. A pre-publication legal pass checks reserve-disclosure language, election communications, and state-specific notice requirements before the issue goes out. Most firms add it once they’re producing at portfolio scale.' },
      { q: 'Can you produce Spanish editions?', a: 'Yes — English and Spanish, with other languages on request. Professional translators who know HOA terminology do the work, not a translation tool, and the Spanish edition is held to the same editorial standard.' },
      { q: 'We already have a newsletter. Can you take it over?', a: 'Yes. We audit what you send today — cadence, design, open rates, and the manager hours it costs — and rebuild from there. We usually find quick wins inside the first 60 days: open rates climbing, manager hours dropping.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
