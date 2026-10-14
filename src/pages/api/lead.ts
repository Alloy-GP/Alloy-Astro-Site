// POST /api/lead: the Growth Portal walkthrough form (GrowthPortalPage.tsx). FormData: name, email,
// company, units, goal, source + the guard fields (website honeypot, elapsed). Internal notification
// via Resend, confirmation to the requester, Mailchimp subscribe tagged lead-form.
// Spam guard (2026-10-14): src/lib/form-guard.ts; blocked submissions never reach Resend or
// Mailchimp, and the confirmation email only echoes a sanitised first name / company.
import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { EMAIL_RE, esc, field, guardSubmission, json, rejectionResponse, safeEcho, safeFirstName, subjectLine, textField } from "~/lib/form-guard";

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
    const company = field(data, "company", 160);
    const units = field(data, "units", 60);
    const goal = field(data, "goal", 400);
    const source = textField(data, "source", 1500);

    if (!email || !name) return json({ error: "Name and email are required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "That email does not look right." }, 400);

    const verdict = guardSubmission(ctx, { form: "lead", data, email, name, text: [company, goal] });
    if (!verdict.ok) return rejectionResponse("lead", verdict, { name, email, company });

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: [import.meta.env.INTERNAL_NOTIFY_EMAIL, 'admin@alloygp.co'],
        cc: ['cameron@alloygp.co', 'nicole@alloygp.co'],
        replyTo: email,
        subject: subjectLine(`New lead: ${company || name}`),
        html: `<h2>New Lead Form Submission</h2><p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Company:</strong> ${esc(company)}</p><p><strong>Units managed:</strong> ${esc(units)}</p><p><strong>Primary goal:</strong> ${esc(goal)}</p>${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${esc(source).replace(/\n/g, '<br>')}</p>` : ''}`,
      });
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "We got your info. Alloy Growth Partners",
        html: `<p>Hi ${esc(safeFirstName(name))},</p><p>Thanks for your interest in working with Alloy. We have received your information and someone from our team will be in touch shortly to discuss what growth looks like for ${esc(safeEcho(company, "your company"))}.</p><p>The Alloy Team</p>`,
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    try {
      await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name.split(" ")[0],
          LNAME: name.split(" ").slice(1).join(" "),
          COMPANY: company,
        },
        tags: ["lead-form"],
      });
    } catch (err: any) {
      console.error("Mailchimp lead error:", err?.response?.body ?? err);
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error("Lead API error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
