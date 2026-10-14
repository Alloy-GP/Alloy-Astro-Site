// POST /api/subscribe: the Alloy Briefing newsletter form (NewsletterSignup.tsx on /resources and the
// homepage). FormData: email, firstName, source + the guard fields (website honeypot, elapsed).
// Mailchimp subscribe (tags newsletter + source) and a Resend welcome email.
// Spam guard (2026-10-14): src/lib/form-guard.ts; blocked submissions never reach Mailchimp or
// Resend, and the welcome email only greets with a sanitised first name.
import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Resend } from "resend";
import { EMAIL_RE, esc, field, guardSubmission, json, rejectionResponse, safeFirstName } from "~/lib/form-guard";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async (ctx) => {
  const { request } = ctx;
  try {
    // Empty or non-form bodies (bots, health probes) are a client error, not a server error.
    let data: FormData;
    try { data = await request.formData(); } catch { return json({ error: 'Expected form data.' }, 400); }
    const email = field(data, "email", 200);
    const firstName = field(data, "firstName", 80);
    const source = (data.get("source")?.toString().trim() ?? "").replace(/[^a-z0-9-]/gi, "").slice(0, 40);

    if (!email) return json({ error: "Email is required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "That email does not look right." }, 400);

    const verdict = guardSubmission(ctx, { form: "subscribe", data, email, name: firstName });
    if (!verdict.ok) return rejectionResponse("subscribe", verdict, { firstName, email });

    try {
      await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName },
        tags: ["newsletter", ...(source ? [source] : [])],
      });
    } catch (err: any) {
      const alreadyExists = err?.response?.body?.title === "Member Exists";
      if (!alreadyExists) {
        console.error("Mailchimp subscribe error:", err?.response?.body ?? err);
        return json({ error: "Could not subscribe. Please try again." }, 500);
      }
    }

    const greet = safeFirstName(firstName, "");
    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "You're on the list: welcome to Alloy.",
        html: `<p>Hi${greet ? ` ${esc(greet)}` : ""},</p><p>Thanks for subscribing. We'll be in touch with insights built specifically for HOA and CAM companies looking to grow.</p><p>The Alloy Team</p>`,
      });
    } catch (err) {
      console.error("Resend welcome error:", err);
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error("Subscribe API error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
