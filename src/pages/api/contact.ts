// POST /api/contact: the /contact form (ContactPage.tsx). FormData: name, email, message, subscribe,
// source (page / referrer / UTMs) + the guard fields (website honeypot, elapsed). Internal
// notification via Resend, confirmation to the requester, optional Mailchimp opt-in.
// Spam guard (2026-10-14): src/lib/form-guard.ts runs after the required-field check; blocked
// submissions never reach Resend or Mailchimp, and the confirmation email only ever carries a
// sanitised first name, so the site cannot be used as a relay.
import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { EMAIL_RE, esc, field, guardSubmission, json, rejectionResponse, safeFirstName, subjectLine, textField } from "~/lib/form-guard";

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
    const name = field(data, "name", 120);
    const email = field(data, "email", 200);
    const message = textField(data, "message", 5000);
    const subscribe = data.get("subscribe") === "true";
    const source = textField(data, "source", 1500);

    if (!email || !name || !message) return json({ error: "All fields are required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "That email does not look right." }, 400);

    const verdict = guardSubmission(ctx, { form: "contact", data, email, name, text: [message] });
    if (!verdict.ok) return rejectionResponse("contact", verdict, { name, email });

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: [import.meta.env.INTERNAL_NOTIFY_EMAIL, 'admin@alloygp.co'],
        cc: ['cameron@alloygp.co', 'nicole@alloygp.co'],
        replyTo: email,
        subject: subjectLine(`New contact form submission from ${name}`),
        html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Message:</strong></p><p>${esc(message).replace(/\n/g, "<br>")}</p><p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${esc(source).replace(/\n/g, '<br>')}</p>` : ''}`,
      });
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "We received your message. Alloy Growth Partners",
        html: `<p>Hi ${esc(safeFirstName(name))},</p><p>Thanks for reaching out. We typically respond within 1 business day.</p><p>In the meantime, feel free to explore our work at <a href="https://alloygp.co">alloygp.co</a>.</p><p>The Alloy Team</p>`,
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    if (subscribe) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status: "subscribed",
          merge_fields: { FNAME: name.split(" ")[0] },
        });
      } catch (err: any) {
        console.error("Mailchimp opt-in error:", err?.response?.body ?? err);
      }
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error("Contact API error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
