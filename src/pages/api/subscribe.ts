import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // Empty or non-form bodies (bots, health probes) are a client error, not a server error.
    let data: FormData;
    try { data = await request.formData(); } catch { return new Response(JSON.stringify({ error: 'Expected form data.' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }
    const email = data.get("email")?.toString().trim();
    const firstName = data.get("firstName")?.toString().trim() ?? "";
    const source = (data.get("source")?.toString().trim() ?? "").replace(/[^a-z0-9-]/gi, "").slice(0, 40);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), { status: 400 });
    }

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
        return new Response(JSON.stringify({ error: "Could not subscribe. Please try again." }), { status: 500 });
      }
    }

    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "You're on the list: welcome to Alloy.",
        html: `<p>Hi${firstName ? ` ${firstName}` : ""},</p><p>Thanks for subscribing. We'll be in touch with insights built specifically for HOA and CAM companies looking to grow.</p><p>The Alloy Team</p>`,
      });
    } catch (err) {
      console.error("Resend welcome error:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500 });
  }
};
