import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const units = data.get("units")?.toString().trim() ?? "";
    const goal = data.get("goal")?.toString().trim() ?? "";
    const source = data.get("source")?.toString().trim() ?? "";

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Name and email are required." }), { status: 400 });
    }

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: [import.meta.env.INTERNAL_NOTIFY_EMAIL, 'admin@alloygp.co'],
        cc: ['cameron@alloygp.co', 'nicole@alloygp.co'],
        subject: `New lead: ${company || name}`,
        html: `<h2>New Lead Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company}</p><p><strong>Units managed:</strong> ${units}</p><p><strong>Primary goal:</strong> ${goal}</p>${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${source.replace(/\n/g, '<br>')}</p>` : ''}`,
      });
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "We got your info. Alloy Growth Partners",
        html: `<p>Hi ${name},</p><p>Thanks for your interest in working with Alloy. We have received your information and someone from our team will be in touch shortly to discuss what growth looks like for ${company || "your company"}.</p><p>The Alloy Team</p>`,
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

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500 });
  }
};
