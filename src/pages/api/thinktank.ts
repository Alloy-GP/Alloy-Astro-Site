// POST /api/thinktank: the Think Tank HOA drink-request card (src/assets/thinktank.html, served at
// /thinktank). JSON body: drink, name, email, address + the guard fields (website honeypot, elapsed).
// Internal notification to admin@ and a confirmation to the attendee via Resend.
// Spam guard (2026-10-14): src/lib/form-guard.ts; blocked requests never reach Resend and the
// confirmation only echoes a sanitised first name and an escaped drink line.
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { EMAIL_RE, esc, guardSubmission, json, rejectionResponse, safeFirstName, subjectLine } from "~/lib/form-guard";

const str = (v: unknown, max: number): string =>
  (typeof v === "string" ? v : "").replace(/\s+/g, " ").trim().slice(0, max);

export const POST: APIRoute = async (ctx) => {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    let body: Record<string, unknown>;
    try {
      const parsed: unknown = await ctx.request.json();
      body = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch {
      return json({ error: "Expected JSON." }, 400);
    }
    const drink = str(body.drink, 160);
    const name = str(body.name, 120);
    const email = str(body.email, 200);
    const address = str(body.address, 300);

    if (!drink || !name || !email || !address) return json({ error: "All fields are required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "That email does not look right." }, 400);

    // Event card: a whole room shares the venue IP, so the per-IP allowance is wider than the default 5.
    const verdict = guardSubmission(ctx, { form: "thinktank", data: body, email, name, text: [drink, address], limits: { ip: 40 } });
    if (!verdict.ok) return rejectionResponse("thinktank", verdict, { name, email });

    // Internal notification
    try {
      await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: ["admin@alloygp.co"],
        replyTo: email,
        subject: subjectLine(`Think Tank request: ${name} (${drink})`),
        html: `
          <h2>New Think Tank Drink Request</h2>
          <p><strong>Drink:</strong> ${esc(drink)}</p>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Address:</strong> ${esc(address)}</p>
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
          <p>Hi ${esc(safeFirstName(name))},</p>
          <p>We've got your request for <strong>${esc(drink)}</strong>. Cheers!</p>
          <p>The Alloy Team</p>
        `,
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error("Thinktank API error:", err);
    return json({ error: "Something went wrong." }, 500);
  }
};
