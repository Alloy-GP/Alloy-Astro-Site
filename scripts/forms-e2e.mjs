// node scripts/forms-e2e.mjs [base=http://127.0.0.1:4321]
// Drives every public form in a real (headless) Chrome the way a person would: load the page, type,
// wait a moment, click submit. Confirms each form carries the spam-guard fields (hidden honeypot
// left empty, `elapsed` present), that the endpoint answers 200, and that the success state renders.
// Run it against `npm run dev` (needs a .env with any RESEND/MAILCHIMP values so the SDKs construct;
// the sends fail harmlessly without real keys). Do not point it at production or staging: a passing
// submission there emails the team. Needs `npm i --no-save puppeteer-core` and Google Chrome.
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME ?? '/usr/bin/google-chrome';
const SHOT_DIR = process.env.SHOT_DIR ?? '.context';
const ONLY = process.env.ONLY ?? ''; // substring filter on the form label

const FORMS = [
  {
    label: 'Contact (/contact → /api/contact)', path: '/contact', api: '/api/contact',
    fill: [['#contact-form input[name="name"]', 'Jane Doe'], ['#contact-form input[name="email"]', 'jane.e2e@example.com'], ['#contact-form textarea[name="message"]', 'We manage 40 associations in Austin and want to grow.']],
    submit: '#contact-form button[type="submit"]', successText: 'Got it.', shot: 'contact-success.png',
  },
  {
    label: 'Newsletter (/resources → /api/subscribe)', path: '/resources', api: '/api/subscribe',
    fill: [['#newsletter-signup input[name="firstName"]', 'Jane'], ['#newsletter-signup input[name="email"]', 'jane.nl@example.com']],
    submit: '#newsletter-signup button[type="submit"]', successSel: '.rd-nl-success',
  },
  {
    label: 'Book club (/book-club → /api/book-club)', path: '/book-club', api: '/api/book-club',
    fill: [['#ge-book-club input[name="name"]', 'Jane Doe'], ['#ge-book-club input[name="email"]', 'jane.bc@example.com'], ['#ge-book-club input[name="company"]', 'Peak CAM']],
    submit: '#ge-book-club button[type="submit"]', successText: 'You are in.',
  },
  {
    label: 'Growth Portal (/cam-growth-portal → /api/lead)', path: '/cam-growth-portal', api: '/api/lead',
    fill: [['#gp-walkthrough-form input[name="name"]', 'Jane'], ['#gp-walkthrough-form input[name="company"]', 'Peak CAM'], ['#gp-walkthrough-form input[name="email"]', 'jane.gp@example.com']],
    submit: '#gp-walkthrough-form button[type="submit"]', successText: 'Thanks, Jane',
  },
  {
    label: 'Worksheet book club (/cai-growth → /api/book-club)', path: '/cai-growth', api: '/api/book-club',
    fill: [['#bc_name', 'Jane Doe'], ['#bc_email', 'jane.ws@example.com'], ['#bc_company', 'Peak CAM']],
    submit: '#ge-book-club button[type="submit"]', successSel: '.ge-ok',
  },
  {
    label: 'Think Tank (/thinktank → /api/thinktank)', path: '/thinktank', api: '/api/thinktank',
    presubmit: async (page) => { await page.waitForSelector('[data-drink]'); await page.click('[data-drink]'); },
    fill: [['#name', 'Jane Doe'], ['#email', 'jane.tt@example.com'], ['#address', '1234 Main St, Austin, TX 78701']],
    submit: '#submitBtn', successText: 'Request sent!',
  },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
const rows = [];
let failures = 0;

for (const f of FORMS.filter((x) => x.label.includes(ONLY))) {
  const context = await browser.createBrowserContext(); // fresh profile per form: no autofill carry-over
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const row = { form: f.label };
  try {
    await page.goto(BASE + f.path, { waitUntil: 'networkidle2', timeout: 90000 });
    await page.waitForSelector(f.submit, { timeout: 30000 });
    if (f.presubmit) await f.presubmit(page);
    for (const [sel, val] of f.fill) {
      await page.waitForSelector(sel, { timeout: 15000 });
      await page.click(sel, { clickCount: 3 });
      await page.type(sel, val);
    }
    // The honeypot must exist, be empty, and sit off-screen.
    row.honeypot = await page.$eval('input[name="website"]', (el) => {
      const r = el.getBoundingClientRect();
      return `${el.value === '' ? 'empty' : 'FILLED'} / ${r.right < 0 || r.width <= 1 ? 'off-screen' : 'VISIBLE'}`;
    }).catch(() => 'MISSING');
    await new Promise((r) => setTimeout(r, 2600)); // past the 2 s floor, like a person
    const responseP = page.waitForResponse((r) => new URL(r.url()).pathname === f.api && r.request().method() === 'POST', { timeout: 30000 });
    await page.click(f.submit);
    const res = await responseP;
    const post = res.request().postData() ?? '';
    row.sentElapsed = /elapsed/.test(post) ? 'yes' : 'NO';
    row.status = res.status();
    row.body = JSON.stringify(await res.json().catch(() => ({})));
    if (res.status() !== 200) row.sent = post.slice(0, 220);
    let success = true;
    if (f.successSel) success = await page.waitForSelector(f.successSel, { timeout: 10000 }).then(() => true).catch(() => false);
    if (f.successText) {
      await new Promise((r) => setTimeout(r, 400));
      success = success && (await page.evaluate(() => document.body.innerText)).includes(f.successText);
    }
    row.successUI = success ? 'yes' : 'NO';
    if (f.shot) { await page.screenshot({ path: `${SHOT_DIR}/${f.shot}` }); row.shot = `${SHOT_DIR}/${f.shot}`; }
    if (row.status !== 200 || !success || row.sentElapsed !== 'yes' || !String(row.honeypot).startsWith('empty')) failures++;
  } catch (err) {
    row.error = err instanceof Error ? err.message.split('\n')[0] : String(err);
    failures++;
  }
  rows.push(row);
  await context.close();
}

await browser.close();
console.table(rows);
console.log(failures ? `${failures} form(s) failed` : `all ${rows.length} forms passed the guard as a person would`);
process.exit(failures ? 1 : 0);
