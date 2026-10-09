// src/data/articles/why-associations-change-management-companies.ts — /resources/why-associations-change-management-companies
// Cluster page 10 (the brief's /insights/… → /resources/). Written to the handoff spec (2026-10-08). The "most
// common" claim is sourced (AppFolio + HOA-USA board survey, 2022) and labelled directional.
// Ahrefs volume check NOT run (no Ahrefs access from this workspace, 2026-10-09); candidate terms listed in `keywords`.
// Go-live 2026-11-10: until then noindex + out of sitemap.
import type { ArticleData } from './types';

const APPFOLIO = 'https://www.appfolio.com/blog/new-research-reveals-what-hoa-board-members-want/';

export const data: ArticleData = {
  path: '/resources/why-associations-change-management-companies',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'Why associations change companies',
  eyebrow: 'Insights',
  h1: 'Why associations change',
  h1Accent: 'management companies.',
  title: 'Why Associations Change Management Companies | Alloy',
  description: 'Why HOA boards switch management companies, led by slow responses and financial problems: what each looks like before the board says it, and how to fix it.',
  keywords: ['why hoa boards change management companies (volume unchecked)', 'switching hoa management companies (volume unchecked)', 'how to change hoa management company (volume unchecked)'],
  published: '2026-11-10',
  answer: `Boards most often change management companies over responsiveness, follow-through and financial problems. In a 2022 AppFolio and HOA-USA survey, unresponsiveness was the leading reason board members switched or considered switching. Behind the stated reasons sit four patterns: communication gaps, budget and reserve trouble, delinquency handling and slow service. Each shows up before the board says it.`,
  disclosure: 'short',
  noindex: 'Go-live 2026-11-10 per the brief, after the Ahrefs volume check. On that date: remove robots, add to SITEMAP_ROUTES, activate the TODO links on page 8.',
  sections: [
    {
      id: 'what-boards-say',
      h2: 'What do boards say when they leave?',
      blocks: [
        { t: 'p', s: `Surveys of board members are rare, and most are run by software vendors, so treat the figures as directional. The most cited one is AppFolio's 2022 survey with HOA-USA. Among board members who switched or considered switching, 66% cited unresponsiveness or long response times. Another 65% cited failure to follow through on projects quickly and accurately, and 61% cited overall poor customer service ([AppFolio](${APPFOLIO})). In the same survey, 75% of boards ranked funds management and financial reporting among their top three expectations.` },
        { t: 'p', s: `In our own conversations with boards, the stated reasons cluster into four patterns. They are below, in the order boards tend to feel them.` },
      ],
    },
    {
      id: 'communication-gaps',
      h2: 'Communication gaps: what they look like before the board says it',
      blocks: [
        { t: 'p', s: `The board's first complaint is almost never about money. It is about silence. Emails answered in days, calls returned after the meeting, a question asked twice.` },
        { t: 'ul', items: [
          `**Early sign.** Board members start copying each other on emails to the manager, or the president starts calling the company's owner directly.`,
          `**What it means.** The board has stopped trusting that one message is enough.`,
          `**Fix.** A written response standard (acknowledge within a business day, resolve or update within a set time) and a shared inbox the whole team can see. Add a monthly report that answers the predictable questions before they are asked.`,
        ] },
      ],
    },
    {
      id: 'budget-and-reserves',
      h2: 'Budget and reserve problems',
      blocks: [
        { t: 'p', s: `Boards are volunteers responsible for other people's money. When the budget misses, the reserve study is stale or the audit raises questions, the board looks for who should have warned them.` },
        { t: 'ul', items: [
          `**Early sign.** Budget-versus-actual variances explained after the fact instead of flagged ahead. Reserve contributions deferred two years running.`,
          `**What it means.** The board feels exposed, and the management company is the only professional in the room.`,
          `**Fix.** Flag variances in the month they happen, with a one-line reason. Put the reserve study date and funding level on every financial packet. Bring the budget draft early enough to change.`,
        ] },
      ],
    },
    {
      id: 'delinquency-handling',
      h2: 'Delinquency handling',
      blocks: [
        { t: 'p', s: `A growing receivables line is one of the first numbers a board reads. It reflects on the management company even when the company caused none of it.` },
        { t: 'ul', items: [
          `**Early sign.** The same accounts on the delinquency report for a year. Questions about one owner's account at every meeting.`,
          `**What it means.** The board sees a management problem, not a collections problem.`,
          `**Fix.** A written collection policy with a trigger date and a pre-legal stage with a fixed window before the attorney. Add a monthly report with stage and next action for every account. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the stage and why it helps the management company as well as the board.`,
        ] },
      ],
    },
    {
      id: 'service-responsiveness',
      h2: 'Responsiveness on service',
      blocks: [
        { t: 'p', s: `Work orders that stall, violations that drift, a project approved in March and started in September. Boards tolerate a lot, but not the same delay twice.` },
        { t: 'ul', items: [
          `**Early sign.** Items carried on the action list for three meetings. Board members doing vendor follow-up themselves.`,
          `**What it means.** The board no longer believes the company's capacity matches its promises.`,
          `**Fix.** A visible action list with owners and dates, reviewed at the top of every meeting. Capacity planning that matches managers to portfolios before adding doors.`,
        ] },
      ],
    },
    {
      id: 'relationship-scorecard',
      h2: 'What does a healthy board relationship look like on paper?',
      blocks: [
        { t: 'p', s: `Boards judge on feel, but feel has leading indicators. Track five per association, monthly, on one line:` },
        { t: 'ul', items: [
          `**Response time.** Median hours from a board or owner request to a first reply, from your own system.`,
          `**Action items closed.** Items closed versus items carried, from the meeting minutes.`,
          `**Variance flags.** Budget-versus-actual variances flagged ahead versus explained after.`,
          `**Receivables trend.** Accounts past the policy trigger, this month against three months ago.`,
          `**Renewal date.** With the conversation start date six months before it.`,
        ] },
        { t: 'p', s: `An association with slow responses, carried items and a rising receivables line is shopping, whether or not anyone has said so. The scorecard turns the four patterns above into something a manager can act on before the president makes a call.` },
      ],
    },
    {
      id: 'catching-it-early',
      h2: 'How do you catch it before the renewal vote?',
      blocks: [
        { t: 'p', s: `Boards rarely announce they are shopping. They stop asking questions, they ask about the contract's termination clause, or a new board member arrives with a friend at another company. By then the decision is mostly made.` },
        { t: 'p', s: `Three habits catch it earlier:` },
        { t: 'ul', items: [
          `**Ask directly, twice a year.** A short check-in with the president, with one question: what would make you leave?`,
          `**Watch the signs above.** Copied emails, carried action items, a receivables line that only grows.`,
          `**Start the renewal conversation six months out.** Bring the record: response times, projects closed, delinquency movement. Boards renew what they can see.`,
        ] },
        { t: 'p', s: `Retention is the cheapest growth lever a management company has. [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) puts it next to the other two. Alloy's [BoardRetain](/boardretain) engine is built for this job.` },
      ],
    },
  ],
  faq: [
    { q: 'What is the most common reason HOA boards fire their management company?', a: `In the most cited survey, AppFolio's 2022 study with HOA-USA, unresponsiveness and long response times led. Two thirds of board members who switched or considered it, 66%, cited them. Follow-through and customer service came next. Financial problems and delinquency handling show up in the conversations behind those answers.` },
    { q: 'How much notice does a board give before changing companies?', a: `Whatever the management agreement requires, often 30 to 90 days. The decision is usually made well before the notice. The signs are visible months earlier: copied emails, carried action items, questions about the termination clause. A company that reads the signs has a quarter or two to respond before the vote.` },
    { q: 'Can a management company recover a board that is already shopping?', a: `Sometimes. It takes an honest conversation about what went wrong, a written fix with dates, and visible change within weeks, not quarters. Boards that have found a replacement rarely turn back, so the recovery window is before the search starts.` },
    { q: `Does switching management companies usually fix the board's problem?`, a: `Not always. Some problems travel with the association: a thin reserve, a divided board, chronic delinquency. A management company that names those problems early, with a plan, is harder to blame for them and harder to replace. Boards that switch and find the same problems waiting often regret the change.` },
  ],
  next: [
    `Walk the four patterns against each association in your portfolio and mark the early signs you can see today. Then read [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) for where retention sits among the three levers.`,
  ],
  keepReading: [
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'match' },
    { kind: 'Insights', meta: 'Proposals', title: 'What to put in an HOA management proposal.', href: '/resources/winning-hoa-management-proposals', tone: 'reach' },
    { kind: 'Course', meta: 'Self-paced · 10 sections', title: 'Trust building for CAM firms: reviews, testimonials, case studies.', href: '/resources/courses/trust-building', tone: 'retain' },
  ],
  cta: { text: 'Keeping boards is the cheapest lever. Thirty minutes with a CAM operator tells you where the leak is.', label: 'Talk to Alloy' },
};
