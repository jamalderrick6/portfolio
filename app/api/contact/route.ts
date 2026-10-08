import { Resend } from "resend";
import { HONEYPOT_FIELD, validateContact, type ContactPayload } from "@/lib/contact";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { site } from "@/data/site";

// Submissions faster than this are almost certainly scripted.
const MIN_FILL_MS = 2000;

const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const limited = rateLimit(clientIp(request));
  if (!limited.ok) {
    return Response.json(
      { error: "That's a lot of messages in a short time. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam traps: pretend it worked so bots don't learn anything.
  const honeypot = body[HONEYPOT_FIELD];
  const elapsed = Number(body.elapsedMs);
  if ((typeof honeypot === "string" && honeypot.trim() !== "") || (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS)) {
    return Response.json({ ok: true });
  }

  const { data, errors } = validateContact(body);
  if (!data) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set; message not sent:", data);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is missing");
    return Response.json(
      { error: "The contact form isn't set up yet. Please reach out on LinkedIn instead." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} Portfolio <onboarding@resend.dev>`,
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: `[Portfolio] ${data.need}: ${data.name.replace(/\s+/g, " ")}`,
    text: renderText(data),
    html: renderHtml(data),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return Response.json({ error: "Couldn't send your message. Please try again in a minute." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function renderText(d: ContactPayload) {
  return `New message from your portfolio\n\nName: ${d.name}\nEmail: ${d.email}\nNeed: ${d.need}\n\n${d.message}\n`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function renderHtml(d: ContactPayload) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#667085">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`;
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#101828">
  <p style="margin:0 0 12px">New message from your portfolio</p>
  <table style="border-collapse:collapse;margin-bottom:16px">${row("Name", d.name)}${row("Email", d.email)}${row("Need", d.need)}</table>
  <div style="white-space:pre-wrap;border-left:3px solid #ff8a3d;padding-left:12px">${escapeHtml(d.message)}</div>
</div>`;
}
