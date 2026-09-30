import type { QuizAnswers, QuoteResult } from "@/app/instant-quote/types";
import { formatCurrency } from "@/app/instant-quote/quote-engine";

const NAVY = "#1a3a5c";
const AMBER = "#f59e0b";

function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface EmailMeta {
  quoteNumber: string;
  quoteDate: string;
  validThrough: string;
  ownerPhone: string;
}

export function renderInstantQuoteEmail(
  answers: QuizAnswers,
  quote: QuoteResult,
  meta: EmailMeta
): string {
  const fullName = `${esc(answers.firstName)} ${esc(answers.lastName)}`;
  const installAddr =
    answers.installSameAsContact || !answers.installAddress
      ? `${esc(answers.streetAddress)}${answers.addressLine2 ? ", " + esc(answers.addressLine2) : ""}, ${esc(answers.city)}, ${esc(answers.state)} ${esc(answers.zip)}`
      : esc(answers.installAddress);
  const td = `padding:8px 12px;border:1px solid #e5e7eb;`;
  const tdLabel = `${td}background:#f8f9fa;font-weight:600;width:55%;`;

  let quoteBlock: string;
  if (quote.isCustom) {
    quoteBlock = `
      <h2 style="font-size:16px;margin:24px 0 10px;color:${NAVY};">Your Custom Quote Is On The Way</h2>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:18px 20px;margin:0 0 16px;color:#374151;">
        <p style="margin:0 0 10px;">${esc(quote.reason)}</p>
        <p style="margin:0;color:#6b7280;font-size:13px;">${esc(quote.recommendedSizeNote)}</p>
      </div>`;
  } else {
    const lineRows = quote.lineItems
      .map((item) => `<tr><td style="${td}">${esc(item.label)}</td><td style="${td}text-align:right;">${formatCurrency(item.amount)}</td></tr>`)
      .join("");
    const veteranRow =
      quote.veteranDiscount > 0
        ? `<tr><td style="${td}">Veteran / active-duty discount (10%)</td><td style="${td}text-align:right;color:#15803d;">−${formatCurrency(quote.veteranDiscount)}</td></tr>`
        : "";
    const notes =
      quote.siteNotes.length > 0
        ? `<div style="margin:16px 0 0;color:#7c4a00;"><strong>Site notes</strong><ul style="padding-left:20px;line-height:1.6;">${quote.siteNotes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul></div>`
        : "";

    quoteBlock = `
      <h2 style="font-size:16px;margin:24px 0 10px;color:${NAVY};">Your Estimate</h2>
      <p style="margin:0 0 12px;color:#374151;">Recommended shelter: <strong>${esc(quote.shelter.name)}</strong> (${quote.shelter.sqFt} sq ft).</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
        ${lineRows}
        ${veteranRow}
        <tr><td style="${td}font-weight:bold;background:#f8f9fa;">Estimated Total</td><td style="${td}text-align:right;font-weight:bold;background:#f8f9fa;">${formatCurrency(quote.total)}</td></tr>
      </table>
      ${notes}`;
  }

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111;">
    <div style="background:${NAVY};padding:24px 32px;border-radius:8px 8px 0 0;">
      <h1 style="color:${AMBER};font-size:22px;margin:0 0 4px;">Michigan Safe Rooms</h1>
      <p style="color:#93c5fd;margin:0;font-size:14px;">Quote ${esc(meta.quoteNumber)}</p>
    </div>
    <div style="height:5px;background:${AMBER};"></div>
    <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
      <p style="margin:0 0 16px;">Hi ${esc(answers.firstName)}, thanks for using our instant quote tool. Here's your tailored Michigan Safe Rooms estimate.</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
        <tr><td style="${tdLabel}">Quote number</td><td style="${td}">${esc(meta.quoteNumber)}</td></tr>
        <tr><td style="${tdLabel}">Quote date</td><td style="${td}">${esc(meta.quoteDate)}</td></tr>
        <tr><td style="${tdLabel}">Valid through</td><td style="${td}">${esc(meta.validThrough)}</td></tr>
        <tr><td style="${tdLabel}">Customer</td><td style="${td}">${fullName}</td></tr>
        <tr><td style="${tdLabel}">Install address</td><td style="${td}">${installAddr}</td></tr>
      </table>

      ${quoteBlock}

      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px 18px;margin:20px 0;">
        <h3 style="margin:0 0 8px;font-size:14px;color:${NAVY};">FEMA Safe-Room Guidance</h3>
        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">Our design and installation process uses applicable FEMA safe-room guidance as a reference. FEMA does not certify or endorse individual contractors or products. Ask us about the specifications and documentation available for the shelter you are considering.</p>
      </div>

      <h3 style="font-size:15px;margin:0 0 10px;color:${NAVY};">What Happens Next</h3>
      <ol style="padding-left:20px;line-height:1.9;color:#374151;margin:0 0 20px;">
        <li>Aaron will reach out within 1 business day to schedule a free site visit.</li>
        <li>The site visit confirms final pricing. This quote is an estimate based on the information you provided.</li>
        <li>After you review the final scope and price, we can coordinate an installation date.</li>
      </ol>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.7;">
        <strong style="color:${NAVY};">Aaron Spoor</strong>, Aaron Spoor Construction LLC<br />
        8863 E Prior Rd, Durand, MI 48429<br />
        <a href="https://michigansaferooms.com" style="color:#2563eb;">michigansaferooms.com</a><br />
        ${esc(meta.ownerPhone)}
      </p>
    </div>
  </div>
  `;
}
