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

// Verbatim from Step 4 — must appear in every email where the customer is applying.
const TIMING_WARNING_HTML = `
  <p style="margin:0 0 10px;font-weight:bold;color:#7c4a00;">⚠️ CRITICAL TIMING WARNING</p>
  <p style="margin:0 0 10px;color:#5b3a00;">The Michigan State Police rebate program requires you to apply and receive written notice to proceed <strong>BEFORE</strong> any purchase or construction begins. If you sign a contract, pay a deposit, or break ground before approval, you will be permanently ineligible for the rebate on this project.</p>
  <p style="margin:0;color:#5b3a00;">If you want to apply for the rebate, do <strong>NOT</strong> accept this quote until your application is approved. We'll hold your quote pricing for 30 days while you apply.</p>
`;

const FEMA_STATEMENT =
  "All Michigan Safe Rooms shelters are designed and fabricated to comply with FEMA P-320 (Taking Shelter from the Storm) and FEMA P-361 (Design and Construction Guidance for Community Safe Rooms), and meet ICC-500-2014 requirements for storm shelters. Each unit is built from 1/4\" A36 plate steel, bolt-anchored to a 4\" minimum reinforced concrete slab, and includes a tested door rated for positive/negative wind pressure and debris impact per ICC-500 Chapter 8. Upon installation, Aaron Spoor Construction LLC will sign the FEMA Certificate of Installation required for Michigan Safe Room Rebate eligibility.";

interface EmailMeta {
  quoteNumber: string;
  quoteDate: string; // formatted
  validThrough: string; // formatted
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
      ? `${esc(answers.streetAddress)}${
          answers.addressLine2 ? ", " + esc(answers.addressLine2) : ""
        }, ${esc(answers.city)}, ${esc(answers.state)} ${esc(answers.zip)}`
      : esc(answers.installAddress);

  const applying = answers.rebateIntent === "applying_rebate";

  const td = `padding:8px 12px;border:1px solid #e5e7eb;`;
  const tdLabel = `${td}background:#f8f9fa;font-weight:600;width:55%;`;

  // ── Quote body (priced vs custom) ──────────────────────────
  let quoteBlock = "";
  if (!quote.isCustom) {
    const lineRows = quote.lineItems
      .map(
        (li) =>
          `<tr><td style="${td}">${esc(li.label)}</td><td style="${td}text-align:right;">${formatCurrency(
            li.amount
          )}</td></tr>`
      )
      .join("");

    const veteranRow =
      quote.veteranDiscount > 0
        ? `<tr><td style="${td}">Veteran / active-duty discount (10%)</td><td style="${td}text-align:right;color:#15803d;">−${formatCurrency(
            quote.veteranDiscount
          )}</td></tr>`
        : "";

    quoteBlock = `
      <h2 style="font-size:16px;margin:24px 0 10px;color:${NAVY};">Your Estimate</h2>
      <p style="margin:0 0 12px;color:#374151;">Recommended shelter: <strong>${esc(
        quote.shelter.name
      )}</strong> (${quote.shelter.sqFt} sq ft).</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
        ${lineRows}
        ${veteranRow}
        <tr><td style="${td}font-weight:bold;background:#f8f9fa;">Estimated Total</td><td style="${td}text-align:right;font-weight:bold;background:#f8f9fa;">${formatCurrency(
      quote.total
    )}</td></tr>
      </table>
    `;

    if (applying) {
      const flagsHtml =
        quote.rebateFlags.length > 0
          ? `<ul style="margin:8px 0 0;padding-left:20px;color:#5b3a00;line-height:1.6;">${quote.rebateFlags
              .map((f) => `<li>${esc(f)}</li>`)
              .join("")}</ul>`
          : "";

      quoteBlock += `
        <div style="background:#fffbeb;border:1px solid ${AMBER};border-radius:8px;padding:18px 20px;margin:20px 0;">
          <h3 style="margin:0 0 10px;font-size:15px;color:#7c4a00;">Michigan Rebate Estimate</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
            <tr><td style="${td}">Estimated rebate (75%)</td><td style="${td}text-align:right;color:#15803d;">${formatCurrency(
        quote.estimatedRebate
      )}</td></tr>
            <tr><td style="${tdLabel}">Estimated net out-of-pocket</td><td style="${td}text-align:right;font-weight:bold;">${formatCurrency(
        quote.netOutOfPocket
      )}</td></tr>
          </table>
          ${flagsHtml}
        </div>
        <div style="background:#fff7e6;border-left:4px solid ${AMBER};border-radius:6px;padding:16px 18px;margin:0 0 20px;">
          ${TIMING_WARNING_HTML}
        </div>
      `;
    }
  } else {
    quoteBlock = `
      <h2 style="font-size:16px;margin:24px 0 10px;color:${NAVY};">Your Custom Quote Is On The Way</h2>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:18px 20px;margin:0 0 16px;color:#374151;">
        <p style="margin:0 0 10px;">${esc(quote.reason)}</p>
        <p style="margin:0;color:#6b7280;font-size:13px;">${esc(quote.recommendedSizeNote)}</p>
      </div>
      ${
        applying
          ? `<div style="background:#fff7e6;border-left:4px solid ${AMBER};border-radius:6px;padding:16px 18px;margin:0 0 20px;">${TIMING_WARNING_HTML}</div>`
          : ""
      }
    `;
  }

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111;">
    <div style="background:${NAVY};padding:24px 32px;border-radius:8px 8px 0 0;">
      <h1 style="color:${AMBER};font-size:22px;margin:0 0 4px;">Michigan Safe Rooms</h1>
      <p style="color:#93c5fd;margin:0;font-size:14px;">Quote ${esc(
        meta.quoteNumber
      )}</p>
    </div>
    <div style="height:5px;background:${AMBER};"></div>
    <div style="background:#f9fafb;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
      <p style="margin:0 0 16px;">Hi ${esc(
        answers.firstName
      )}, thanks for using our instant quote tool. Here's your tailored Michigan Safe Rooms estimate.</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
        <tr><td style="${tdLabel}">Quote number</td><td style="${td}">${esc(
    meta.quoteNumber
  )}</td></tr>
        <tr><td style="${tdLabel}">Quote date</td><td style="${td}">${esc(
    meta.quoteDate
  )}</td></tr>
        <tr><td style="${tdLabel}">Valid through</td><td style="${td}">${esc(
    meta.validThrough
  )}</td></tr>
        <tr><td style="${tdLabel}">Customer</td><td style="${td}">${fullName}</td></tr>
        <tr><td style="${tdLabel}">Install address</td><td style="${td}">${installAddr}</td></tr>
      </table>

      ${quoteBlock}

      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px 18px;margin:0 0 20px;">
        <h3 style="margin:0 0 8px;font-size:14px;color:${NAVY};">FEMA Compliance</h3>
        <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">${esc(
          FEMA_STATEMENT
        )}</p>
      </div>

      <h3 style="font-size:15px;margin:0 0 10px;color:${NAVY};">What Happens Next</h3>
      <ol style="padding-left:20px;line-height:1.9;color:#374151;margin:0 0 20px;">
        <li>Aaron will reach out within 1 business day to schedule a free site visit.</li>
        <li>The site visit confirms final pricing (this quote is an estimate based on the info you provided).</li>
        <li>If you're applying for the Michigan rebate, do <strong>NOT</strong> sign or pay anything until your application is approved by MSP/EMHSD.</li>
        <li>Once approved (or if you're not applying), we lock in your install date.</li>
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
