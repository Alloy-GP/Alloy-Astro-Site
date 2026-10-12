// src/data/articles/how-to-grow-an-hoa-management-company.ts — /resources/how-to-grow-an-hoa-management-company
// Cluster page 8 (the brief's /insights/… → /resources/). Revised 2026-10-12 per the client notes: the three-lever
// philosophy kept, emphasis on profitable, less owner-dependent growth rather than doors; no provider named.
// Go-live 2026-10-27: until then noindex and out of the sitemap.
import type { ArticleData } from './types';

const APPFOLIO = 'https://www.appfolio.com/blog/new-research-reveals-what-hoa-board-members-want/';

export const data: ArticleData = {
  path: '/resources/how-to-grow-an-hoa-management-company',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'How to grow a management company',
  eyebrow: 'Insights',
  h1: 'How to grow',
  h1Accent: 'an HOA management company.',
  title: 'How to Grow an HOA Management Company | Alloy',
  description: 'An HOA management company grows through three levers: new contracts, retention and revenue per door. What each takes, where marketing fits, which to pull first.',
  keywords: ['how to grow a property management company', 'how to start an hoa management company'],
  published: '2026-10-27',
  answer: `An HOA management company grows through three levers: new contracts, retention and revenue per door. New contracts come from being found and chosen by boards. Retention comes from board communication, delinquency handling and service quality. Revenue per door comes from fee lines on the contracts you already have. Most companies pull one lever and neglect the other two.`,
  disclosure: 'interest',
  noindex: 'Go-live 2026-10-27 per the brief. On that date: remove robots from the route, add the path to SITEMAP_ROUTES, activate the TODO links on page 1.',
  aside: { title: 'Which lever is weakest?', body: 'A conversation with a CAM operator about your win rate, your contracts lost and your revenue per door, and which to work on first.', label: 'Review your strategy', href: '/contact?intent=growth' },
  sections: [
    {
      id: 'wrong-scoreboard',
      h2: 'Why is "more doors" the wrong scoreboard?',
      blocks: [
        { t: 'p', s: `Doors are easy to count and easy to brag about. They are also the number that hides the most. A company can add doors every year while losing contracts, thinning its margin and tying every decision to the owner's calendar.` },
        { t: 'p', s: `A better scoreboard has four numbers. Net doors (won minus lost), revenue per door, contribution per association, and how much of the business runs without the owner in the room. Growth that moves all four makes the company more valuable. Growth that moves only the first makes it busier.` },
        { t: 'p', s: `Alloy's view of a management company is the same as its view of any business. Grow revenue. Improve margins. Eliminate unnecessary work. Make better use of people and technology. Build something less dependent on its owner. Not just more doors. Better businesses.` },
      ],
    },
    {
      id: 'which-lever-first',
      h2: 'Which of the three levers should you pull first?',
      blocks: [
        { t: 'p', s: `Start with a diagnosis, not a tactic. Three questions, with the number that answers each:` },
        { t: 'ul', items: [
          `**Are boards finding and choosing you?** Proposals requested per quarter, and proposal win rate.`,
          `**Are you keeping the boards you have?** Contracts lost per year, and the reasons in the board's words.`,
          `**Are you earning enough from each one?** Revenue per door and contribution per association, this year against last.`,
        ] },
        { t: 'p', s: `The weakest number is the lever to pull. A company losing two contracts a year does not need more leads; it needs to stop the leak. A company with a healthy win rate and flat revenue per door needs fee discipline and fewer unbilled hours, not a new website.` },
        { t: 'p', s: `For companies that are just starting, the order is usually retention, then revenue per door, then new contracts. A reputation is built one renewal at a time, and early proposals are won on references.` },
      ],
    },
    {
      id: 'new-contracts',
      h2: 'How do you win new contracts?',
      blocks: [
        { t: 'p', s: `Boards change management companies rarely and reluctantly. When they do, they look in three places.` },
        { t: 'ul', items: [
          `**Search.** Board members search the way everyone does: Google, the map pack and, increasingly, AI answers. The company that appears with reviews, a clear service page and a local presence gets the call.`,
          `**Reputation.** References, reviews and what other board members say at the community pool. A board that hears your name twice before the search is already leaning your way.`,
          `**The proposal.** The document and the presentation. Boards compare fee structure, staffing, reporting and transition plan, and they notice the company that answered their actual questions.`,
        ] },
        { t: 'p', s: `Marketing's job is the first two. Sales' job is the third. The best growth plans treat them as one system: a board finds you, checks you, then compares you.` },
        // TODO(2026-11-10): link "why boards leave" → /resources/why-associations-change-management-companies and
        // "the proposal" → /resources/winning-hoa-management-proposals once pages 10 and 11 are live.
        { t: 'p', s: `Alloy's [BoardReach](/boardreach) engine covers search and reputation. [BoardMatch](/boardmatch) covers the proposal and the close.` },
      ],
    },
    {
      id: 'retention',
      h2: 'How do you keep the boards you have?',
      blocks: [
        { t: 'p', s: `Retention is cheaper than acquisition, and most companies measure it last. Boards leave for reasons they can name, and the reasons repeat.` },
        { t: 'ul', items: [
          `**Communication.** Slow responses were the most cited reason to switch in a 2022 board-member survey by AppFolio and HOA-USA ([source](${APPFOLIO})). Fix response times before anything else.`,
          `**Delinquency handling.** A growing receivables line reflects on the management company even when it caused none of it. A written process with dates and monthly reporting answers the question before the board asks it.`,
          `**Service quality.** Projects that stall, violations that drift, meetings that run long. Boards tolerate a lot, but not the same problem twice.`,
        ] },
        { t: 'p', s: `The retention tools are unglamorous: a response-time standard and a monthly report the board can read in a minute. Add a delinquency process with dates and a renewal conversation that starts six months out. [BoardRetain](/boardretain) is Alloy's version of that system, from board education to reputation.` },
      ],
    },
    {
      id: 'revenue-per-door',
      h2: 'How do you grow revenue per door without losing margin?',
      blocks: [
        { t: 'p', s: `Revenue per door is total revenue divided by units managed. It rises when you add fee lines to contracts you already have, without adding doors. Margin rises only when those lines cover the hours they take.` },
        { t: 'ul', items: [
          `**Ancillary services.** Resale packages, lender questionnaires, extra meetings, project oversight, each in the fee schedule the board signed and each actually billed.`,
          `**A managed collections process.** Fewer unbilled hours on every contract. In some models, a board-approved fee or a coordination fee where the governing documents and state law allow it.`,
          `**Fee discipline.** Review the schedule annually and bill what it says.`,
          `**Unnecessary work.** Double entry, case-by-case decisions, reports built by hand. Removing them raises margin without touching a fee.`,
        ] },
        { t: 'p', s: `[Collections as a Revenue Stream for HOA Management Companies](/resources/collections) covers the collections line in detail. The other lines, and how to tell revenue from contribution, are in [Revenue Streams for HOA Management Companies](/resources/hoa-management-company-revenue-streams).` },
      ],
    },
    {
      id: 'twelve-month-plan',
      h2: 'What does a 12-month growth plan look like?',
      blocks: [
        { t: 'p', s: `Here is a plan that pulls all three levers in order. It assumes a healthy win rate but two contracts lost last year:` },
        { t: 'ol', items: [
          `**Quarter one: stop the leak.** Response-time standard in writing, a one-page monthly report to every board, a delinquency process with a trigger and dates. Measure contracts at risk.`,
          `**Quarter two: revenue per door and margin.** Fee schedule reviewed and billed. Collections process reviewed and a middle stage piloted where it fits. Revenue per door and contribution tracked by association.`,
          `**Quarter three: be found.** Service page rewritten for a board member, reviews requested from every president, local and AI search presence built.`,
          `**Quarter four: win.** Proposal rebuilt around fee transparency, named staff, reporting, transition and a clear delinquency plan. Win rate measured against the first quarter.`,
        ] },
        { t: 'p', s: `The order changes with the diagnosis. The discipline does not: one lever at a time, measured, then the next. By the fourth quarter the owner should be spending less time inside the process than at the start, which is the real test.` },
      ],
    },
    {
      id: 'where-marketing-fits',
      h2: 'Where does marketing fit each lever?',
      blocks: [
        { t: 'p', s: `Marketing is usually sold as a lead machine. In a management company it does different work on each lever:` },
        { t: 'table', caption: 'Where marketing fits the three levers', head: ['Lever', 'What moves it', `Marketing's job`], rows: [
          ['New contracts', 'Search visibility, reputation, proposals', 'Be found and trusted before the board compares proposals: local search, reviews, a service page a board understands.'],
          ['Retention', 'Communication, delinquency handling, service quality', 'Board education, newsletters and annual reports that show the board what it is getting, every month.'],
          ['Revenue per door', 'Fee schedule, ancillary services, a managed collections process', 'Position the services so boards see value, not add-ons: a delinquency plan with dates, a project oversight service with a written scope.'],
        ] },
        { t: 'p', s: `Pull the levers in order of the weakest number. Then build the system that keeps all three moving.` },
        { t: 'cta', s: `Alloy runs the attract, close and keep engines for one HOA management company per metro, and helps with the margin underneath them.`, label: 'Review your growth strategy', href: '/contact?intent=growth' },
      ],
    },
  ],
  faq: [
    { q: 'How do HOA management companies get new clients?', a: `Boards find candidates through search, referrals from other board members and the company's reputation, then compare proposals. The companies that win show up in local and AI search with reviews, answer the board's real questions in the proposal, and bring references. A clear delinquency plan is a differentiator most proposals lack.` },
    { q: 'What is a good growth rate for a management company?', a: `There is no reliable industry figure, and a target that ignores retention is misleading. Measure net doors (won minus lost), revenue per door and contribution per association together. A company adding doors while losing contracts is running in place. One growing margin on a stable base is compounding.` },
    { q: 'How do you start an HOA management company?', a: `Licensing varies by state, so start there. Then win a first few associations on references and responsiveness. Set a fee schedule you will actually bill, and put a delinquency process in writing before the first board asks about it. Growth after that follows the three levers above.` },
    { q: 'Should a small management company spend on marketing?', a: `Only on the lever that is weakest. If retention is the problem, spend on communication and reporting first. If boards are not finding you, spend on local search and reviews. Marketing that adds leads to a company losing contracts only accelerates the churn.` },
  ],
  next: [
    `Answer the three questions in the second section with real numbers. The weakest one is the plan. If it is new contracts or retention, [talk to Alloy](/contact?intent=growth). If it is revenue per door, start with [Collections as a Revenue Stream for HOA Management Companies](/resources/collections).`,
  ],
  keepReading: [
    { kind: 'Insights', meta: 'Fee lines', title: 'Revenue streams for HOA management companies.', href: '/resources/hoa-management-company-revenue-streams', tone: 'match' },
    { kind: 'Strategy', meta: '12 min read', title: 'Marketing an HOA management company: the plan before the tactics.', href: '/resources/cam-marketing-strategy', tone: 'blue' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'retain' },
  ],
  cta: { text: 'Thirty minutes with a CAM operator tells you which lever is weakest, what to do about it first, and whether your metro is open.', label: 'Review your growth strategy', href: '/contact?intent=growth' },
};
