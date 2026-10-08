// POST /api/book-club: HOA Leader Book Club seats from the Growth Engine walk-through (/cai-growth).
//
// FormData: name, email, company, cell (optional), team (repeatable: emails of the senior leaders
// the requester is seating), source (page / referrer / UTMs, built client-side like /contact).
//
// 1. Internal notification via Resend to cameron@ + admin@ (+ INTERNAL_NOTIFY_EMAIL, the hook every
//    form on the site shares, so the existing Resend → Slack alerting sees it too)
// 2. Slack: a direct post to an Incoming Webhook when SLACK_WEBHOOK_URL is set (skipped otherwise)
// 3. Confirmation email to the requester
// 4. Mailchimp: upsert the requester with tags `book-club` + `growth-engine`. Seat-holders are
//    only ever emailed by Cameron (they did not opt in themselves).
// WhatConverts records the lead client-side (the form has id/name/action/method; see growth-engine.js).
import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_SEATS = 10;
const CALENDAR_URL = "https://calendar.app.google/ssQ22vSCJC38Cy8QA";
const FORM_LABEL = "HOA Leader Book Club";

const NOTIFY_TO = Array.from(
  new Map(
    [import.meta.env.INTERNAL_NOTIFY_EMAIL, "cameron@alloygp.co", "admin@alloygp.co"]
      .filter((s): s is string => typeof s === "string" && s.includes("@"))
      .map((s) => [s.trim().toLowerCase(), s.trim()] as const),
  ).values(),
);

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

const field = (data: FormData, key: string, max: number) =>
  (data.get(key)?.toString() ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Empty or non-form bodies (bots, health probes) are a client error, not a server error.
    let data: FormData;
    try { data = await request.formData(); } catch { return json({ error: "Expected form data." }, 400); }

    const name = field(data, "name", 120);
    const email = field(data, "email", 200);
    const company = field(data, "company", 160);
    const cell = field(data, "cell", 40);
    const source = (data.get("source")?.toString() ?? "").trim().slice(0, 1500);

    // Seats: one `team` entry per leader; trimmed, deduped (case-insensitive), requester excluded.
    const seen = new Set<string>([email.toLowerCase()]);
    const team: string[] = [];
    for (const raw of data.getAll("team")) {
      const t = raw.toString().trim().slice(0, 200);
      const key = t.toLowerCase();
      if (!t || seen.has(key)) continue;
      seen.add(key);
      team.push(t);
    }

    if (!name || !email || !company) return json({ error: "Name, email and company are required." }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "That email does not look right." }, 400);
    const badSeat = team.find((t) => !EMAIL_RE.test(t));
    if (badSeat) return json({ error: `That email does not look right: ${badSeat}` }, 400);
    if (team.length > MAX_SEATS) return json({ error: `Up to ${MAX_SEATS} leader seats per request.` }, 400);

    const firstName = name.split(" ")[0] ?? name;
    const lastName = name.split(" ").slice(1).join(" ");
    const seatSummary = team.length ? `${team.length} leader seat${team.length === 1 ? "" : "s"}` : "no extra seats";

    // 1. Internal notification (Cameron + admin + the shared notify hook)
    try {
      const { error } = await resend.emails.send({
        from: "Alloy Growth Partners <notifications@alloygp.co>",
        to: NOTIFY_TO,
        replyTo: email,
        subject: `Book club seats: ${company} (${name}, ${seatSummary})`,
        html: `<h2>${FORM_LABEL} request</h2>
<p><strong>Name:</strong> ${esc(name)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Company:</strong> ${esc(company)}</p>
<p><strong>Cell:</strong> ${cell ? esc(cell) : "not given"}</p>
<p><strong>Also seat:</strong> ${team.length ? team.map(esc).join(", ") : "none yet"}</p>
${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${esc(source).replace(/\n/g, "<br>")}</p>` : ""}`,
      });
      if (error) console.error("Resend notify error:", error);
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    // 2. Slack (optional: set SLACK_WEBHOOK_URL to an Incoming Webhook for the forms channel)
    const slackUrl = import.meta.env.SLACK_WEBHOOK_URL;
    if (slackUrl) {
      try {
        const res = await fetch(slackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📚 ${FORM_LABEL}: ${name} at ${company} (${seatSummary})`,
            blocks: [
              { type: "header", text: { type: "plain_text", text: `📚 ${FORM_LABEL} request` } },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Name:*\n${name}` },
                  { type: "mrkdwn", text: `*Email:*\n${email}` },
                  { type: "mrkdwn", text: `*Company:*\n${company}` },
                  { type: "mrkdwn", text: `*Cell:*\n${cell || "not given"}` },
                  { type: "mrkdwn", text: `*Also seat:*\n${team.length ? team.join("\n") : "none yet"}` },
                ],
              },
              ...(source ? [{ type: "context", elements: [{ type: "mrkdwn", text: source.replace(/\n/g, " · ") }] }] : []),
            ],
          }),
        });
        if (!res.ok) console.error("Slack webhook rejected the message:", res.status, await res.text());
      } catch (err) {
        console.error("Slack webhook error:", err);
      }
    }

    // 3. Confirmation to the requester
    try {
      const seatLine = team.length
        ? ` and to the ${team.length} leader${team.length === 1 ? "" : "s"} you added`
        : "";
      const { error } = await resend.emails.send({
        from: "Alloy Growth Partners <hello@alloygp.co>",
        to: email,
        subject: `Your seat in the ${FORM_LABEL}. Alloy Growth Partners`,
        html: `<p>Hi ${esc(firstName)},</p>
<p>You are in. Cameron will email the details for the ${FORM_LABEL} to ${esc(email)}${seatLine}.</p>
<p>Want to talk before then? <a href="${CALENDAR_URL}">Book 20 minutes with Cameron</a>.</p>
<p>Cameron Lange<br>Alloy Growth Partners</p>`,
      });
      if (error) console.error("Resend confirm error:", error);
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    // 4. Mailchimp: upsert + tag (existing members just get the tags)
    try {
      const listId = import.meta.env.MAILCHIMP_AUDIENCE_ID;
      const hash = createHash("md5").update(email.toLowerCase()).digest("hex");
      await mailchimp.lists.setListMember(listId, hash, {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName, COMPANY: company },
      });
      await mailchimp.lists.updateListMemberTags(listId, hash, {
        tags: [
          { name: "book-club", status: "active" },
          { name: "growth-engine", status: "active" },
        ],
      });
    } catch (err: any) {
      console.error("Mailchimp book-club error:", err?.response?.body ?? err);
    }

    return json({ success: true, seats: team.length }, 200);
  } catch (err) {
    console.error("Book club API error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};
