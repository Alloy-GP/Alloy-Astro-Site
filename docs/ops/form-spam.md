# Form spam guard

**Added 2026-10-14.** The contact inbox was being flooded with Russian-language link spam posted
straight at `/api/contact` (name = payload + `https://….top/…` link, gibberish message, random
Gmail address). Two problems: the whole team got every one, and the confirmation email we send to
the submitted address relayed the payload to that address, so the site was acting as a spam relay.

## What runs now

`src/lib/form-guard.ts` (server only) is called by every form endpoint after its required-field
check and before anything is sent: `/api/contact`, `/api/lead`, `/api/subscribe`, `/api/book-club`,
`/api/thinktank`. Layers, in order:

| # | Layer | How | Response when it trips |
|---|---|---|---|
| 1 | Honeypot | Every form renders a visually hidden `website` input. People never see or tab into it; bots that fill every field fill it. | Silent `200 {success:true}`, nothing sent, so the bot never learns. |
| 2 | Same-origin | The `Origin` (or `Referer`) host must be alloygp.co / www / stg / dev, the request's own host, a `*.vercel.app` preview, or localhost. Scripts that POST straight at the endpoint send neither. | `403` "This request was blocked. Email contact@alloygp.co…" |
| 3 | Fill time | The page measures how long the form was open and sends it as `elapsed` (ms). No JavaScript → no field. Under 2 seconds → bot. Client-measured, so a wrong clock on the visitor's machine cannot matter. | `400` "This form needs JavaScript…" / "That was quick. Give it a second and send again." |
| 4 | Content | Name: a URL or domain, a run of 3+ digits, ≥30% non-Latin letters, >120 chars. Free text: ≥30% non-Latin letters, a known spam TLD (`.top .xyz .icu .buzz .click .ru …`), 3+ links, gibberish tokens (3+ tokens of 5+ chars that mix digits and letters or have two internal capitals, making up half the message), or a message that just repeats the name. Accented Latin names are fine. | `400` "Something in that submission tripped our spam filter. Email contact@alloygp.co and a person will reply." |
| 5 | Rate limit | Per form: 5 submissions per IP and 3 per email address per 10 minutes (`limits` option; the Think Tank event card allows 40 per IP because a room shares the venue's IP). In-memory, so per warm serverless instance: it blunts a burst rather than enforcing a hard ceiling. | `429` "Too many submissions from here just now…" |

Every block is logged in Vercel as `[form-guard] <form> blocked (<reason>) ip=… name=… email=…`.
Filter the function logs for `form-guard` to see what is being caught and whether anything real
is being caught by mistake. The person-facing messages always name an email address to fall back
to, so a wrongly blocked human has a way through.

The emails themselves were hardened at the same time: every field is HTML-escaped and length-capped,
subjects are collapsed to one line (no header injection), notifications set `replyTo` to the
requester, and confirmations only ever greet with `safeFirstName()` (Latin letters, apostrophe,
hyphen; otherwise "there") and echo a company only through `safeEcho()` (no links, no `@`). Nothing
attacker-controlled can reach a third party through our Resend account any more.

## Where the client half lives

* React forms: `src/components/modules/FormGuard.tsx` exports `<Honeypot />` (render it inside the
  `<form>`) and `useFormGuard()` (returns `stamp(fd, formEl)`: appends the honeypot value and
  `elapsed` to the outgoing FormData). Used by `ContactPage`, `NewsletterSignup`, `BookClubForm`,
  `GrowthPortalPage`.
* Plain-JS forms do the same inline: `src/lib/book-club-form.js` (the /cai-growth worksheet form)
  and `src/assets/thinktank.html` (+ its `public/` mirror).

Field names (`website`, `elapsed`) must match `HONEYPOT_FIELD` / `ELAPSED_FIELD` in both halves.

## Adding a form

1. Server: parse with `field()` / `textField()` (capped, trimmed), check required fields, validate
   the email with `EMAIL_RE`, then
   `const verdict = guardSubmission(ctx, { form, data, email, name, text: [...] });`
   `if (!verdict.ok) return rejectionResponse(form, verdict, { name, email });`
   Escape everything with `esc()` in the HTML, wrap subjects in `subjectLine()`, greet with
   `safeFirstName()`.
2. Client: `<Honeypot />` inside the form, `const stamp = useFormGuard();` in the component,
   `stamp(fd, e.currentTarget)` right before `fetch`.

## Testing

* Unit: `node scripts/form-guard-test.mjs` (Node 24 runs the `.ts` directly). Covers every layer
  with the real 2026-10-14 sample and a set of legitimate messages that must pass.
* Against a deployment (no email is sent for any of these):

```bash
# no Origin → 403
curl -s -X POST https://stg.alloygp.co/api/contact -F name=Test -F email=t@example.com -F message=hello
# right Origin but the real spam content → 400 content block
curl -s -X POST https://stg.alloygp.co/api/contact -H 'Origin: https://stg.alloygp.co' \
  -F 'name=Вам перевод 133235 руб. https://kunirtyrt.top/x' -F email=v@gmail.com \
  -F 'message=g3ulwNN 6jXB ovpVXEu' -F elapsed=5000 -F website=
# honeypot filled → silent 200
curl -s -X POST https://stg.alloygp.co/api/contact -H 'Origin: https://stg.alloygp.co' \
  -F name=Test -F email=t@example.com -F message=hello -F elapsed=5000 -F website=http://x.top
```

A real submission through the browser on staging does send email to the team, so test the
pass-through path locally (`npm run dev`, Resend/Mailchimp calls fail without keys but the
endpoint still returns `{success:true}` once the guard passes).

## If spam still gets through

The layers above stop scripts and naive headless bots at zero cost. If a smarter bot drives a real
browser slowly and writes plausible English, the next steps are, in order of effort:

1. **Vercel Firewall** (project › Firewall): a rate-limit rule on `/api/*` and the managed bot
   challenge. No code change.
2. **Cloudflare Turnstile** (free, the domain does not need to be on Cloudflare): render the widget
   in each form, send its token as `cf-turnstile-response`, verify it in `guardSubmission` against
   `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY`. Keep
   it env-gated so local/preview work without keys.
3. Add the offending phrases or TLDs to `SPAM_TLD_RE` / `spamSignal()` in `form-guard.ts` and
   extend `scripts/form-guard-test.mjs` with the sample.
