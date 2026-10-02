import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const { drink, name, email, address } = await request.json();

    if (!drink || !name || !email || !address) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
    }

    // Internal notification
    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: ["admin@alloygp.co"],
        subject: `Think Tank request: ${name} (${drink})`,
        html: `
          <h2>New Think Tank Drink Request</h2>
          <p><strong>Drink:</strong> ${drink}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
        `,
      });
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    // Confirmation to attendee
    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: "Your drink request from Alloy. Think Tank HOA",
        html: `
          <p>Hi ${name.split(" ")[0]},</p>
          <p>We've got your request for <strong>${drink}</strong>. Cheers!</p>
          <p>The Alloy Team</p>
        `,
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Thinktank API error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
  }
};
