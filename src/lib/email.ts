import nodemailer from "nodemailer";
import { SITE_NAME, CONTACT } from "./constants";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Inboxes that receive quote requests and contact enquiries. The Gmail copy
// is always included, whatever ADMIN_EMAIL is set to.
const ADMIN_EMAIL = Array.from(
  new Set([process.env.ADMIN_EMAIL || CONTACT.email, "globalprimetrucktiressupply@gmail.com"])
);
const FROM_EMAIL = process.env.SMTP_FROM || `"${SITE_NAME}" <${process.env.SMTP_USER}>`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Escape every user-supplied field before it is interpolated into email HTML.
function escapeFields<T extends object>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, typeof value === "string" ? escapeHtml(value) : value])
  ) as T;
}

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#072849;padding:28px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">${SITE_NAME}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">${SITE_NAME}</p>
              <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">${CONTACT.address}</p>
              <p style="margin:0 0 4px;font-size:13px;color:#6b7280;">Phone: ${CONTACT.phoneFormatted}</p>
              <p style="margin:0;font-size:13px;color:#6b7280;">Email: ${CONTACT.email}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;color:#6b7280;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;font-size:14px;color:#111827;">${value}</td>
  </tr>`;
}

// ─── Contact Form Emails ─────────────────────────────

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
  brands: string;
  tyreSize: string;
  quantity: string;
  message: string;
}

export async function sendContactAdminEmail(raw: ContactData) {
  const data = escapeFields(raw);
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#111827;font-weight:700;">New Contact Enquiry</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">You have received a new message from your website.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
      ${row("Name", data.name)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#0059a1;text-decoration:none;">${data.email}</a>`)}
      ${data.phone ? row("Phone", data.phone) : ""}
      ${data.company ? row("Company", data.company) : ""}
      ${data.brands ? row("Brands Interested", data.brands) : ""}
      ${data.tyreSize ? row("Tyre Sizes", data.tyreSize) : ""}
      ${data.quantity ? row("Quantity", data.quantity) : ""}
    </table>
    <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;">Message</p>
      <p style="margin:0;font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">Reply directly to this email to respond to the customer.</p>`;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: raw.email,
    subject: `New Enquiry from ${raw.name}`,
    html: baseLayout(content),
  });
}

export async function sendContactClientEmail(raw: ContactData) {
  const data = escapeFields(raw);
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#111827;font-weight:700;">Thank You for Your Enquiry</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6;">
      Dear ${data.name},<br><br>
      Thank you for reaching out to ${SITE_NAME}. We have received your message and our team will review it promptly.
      You can expect a response within one business day.
    </p>
    <div style="margin:0 0 24px;padding:16px;background:#f0f7ff;border-radius:8px;border:1px solid #b9dffd;">
      <p style="margin:0 0 8px;font-size:13px;color:#0059a1;font-weight:600;">Your Message</p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    ${data.brands || data.tyreSize || data.quantity ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;border:1px solid #b9dffd;margin-bottom:24px;">
      ${data.brands ? row("Brands Interested", data.brands) : ""}
      ${data.tyreSize ? row("Tyre Sizes", data.tyreSize) : ""}
      ${data.quantity ? row("Quantity", data.quantity) : ""}
    </table>` : ""}
    <p style="margin:0 0 8px;font-size:14px;color:#374151;">For urgent enquiries, you can also reach us directly:</p>
    <p style="margin:0 0 4px;font-size:14px;color:#374151;">
      Phone: <a href="${CONTACT.phoneTel}" style="color:#0059a1;text-decoration:none;">${CONTACT.phoneFormatted}</a>
    </p>
    <p style="margin:0 0 4px;font-size:14px;color:#374151;">
      WhatsApp: <a href="${CONTACT.whatsappLink}" style="color:#0059a1;text-decoration:none;">Chat with us</a>
    </p>
    <p style="margin:24px 0 0;font-size:14px;color:#374151;">
      Best regards,<br>
      <strong>${SITE_NAME} Team</strong>
    </p>`;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: raw.email,
    subject: `We've received your enquiry — ${SITE_NAME}`,
    html: baseLayout(content),
  });
}

// ─── Quote Form Emails ───────────────────────────────

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  tyreSize: string;
  quantity: string;
  brands: string;
  product: string;
  details: string;
}

export async function sendQuoteAdminEmail(raw: QuoteData) {
  const data = escapeFields(raw);
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#111827;font-weight:700;">New Quote Request</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">A customer has submitted a quote request from your website.</p>

    <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#111827;">Customer Details</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:20px;">
      ${row("Name", data.name)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#0059a1;text-decoration:none;">${data.email}</a>`)}
      ${row("Phone", data.phone)}
      ${data.company ? row("Company", data.company) : ""}
    </table>

    <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#111827;">Tyre Requirements</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:20px;">
      ${data.product ? row("Product", data.product) : ""}
      ${data.category ? row("Category", data.category) : ""}
      ${data.tyreSize ? row("Tyre Size", data.tyreSize) : ""}
      ${data.quantity ? row("Quantity", data.quantity) : ""}
      ${data.brands ? row("Preferred Brands", data.brands) : ""}
    </table>

    ${data.details ? `
    <div style="padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;">Additional Details</p>
      <p style="margin:0;font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap;">${data.details}</p>
    </div>` : ""}
    <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">Reply directly to this email to respond to the customer.</p>`;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: raw.email,
    subject: `Quote Request from ${raw.name}${raw.product ? ` — ${raw.product}` : ""}`,
    html: baseLayout(content),
  });
}

export async function sendQuoteClientEmail(raw: QuoteData) {
  const data = escapeFields(raw);
  const content = `
    <h2 style="margin:0 0 8px;font-size:18px;color:#111827;font-weight:700;">Quote Request Received</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6;">
      Dear ${data.name},<br><br>
      Thank you for requesting a quote from ${SITE_NAME}. Our team will review your requirements
      and prepare a competitive quotation for you. You can expect to hear from us within one business day.
    </p>

    <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#111827;">Your Request Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;border:1px solid #b9dffd;margin-bottom:24px;">
      ${data.product ? row("Product", data.product) : ""}
      ${data.category ? row("Category", data.category) : ""}
      ${data.tyreSize ? row("Tyre Size", data.tyreSize) : ""}
      ${data.quantity ? row("Quantity", data.quantity) : ""}
      ${data.brands ? row("Preferred Brands", data.brands) : ""}
      ${data.details ? row("Details", data.details) : ""}
    </table>

    <p style="margin:0 0 8px;font-size:14px;color:#374151;">Need to discuss your requirements? Reach us directly:</p>
    <p style="margin:0 0 4px;font-size:14px;color:#374151;">
      Phone: <a href="${CONTACT.phoneTel}" style="color:#0059a1;text-decoration:none;">${CONTACT.phoneFormatted}</a>
    </p>
    <p style="margin:0 0 4px;font-size:14px;color:#374151;">
      WhatsApp: <a href="${CONTACT.whatsappLink}" style="color:#0059a1;text-decoration:none;">Chat with us</a>
    </p>
    <p style="margin:24px 0 0;font-size:14px;color:#374151;">
      Best regards,<br>
      <strong>${SITE_NAME} Team</strong>
    </p>`;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: raw.email,
    subject: `Your quote request has been received — ${SITE_NAME}`,
    html: baseLayout(content),
  });
}
