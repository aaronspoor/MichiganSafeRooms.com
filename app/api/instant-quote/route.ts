import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { calculateQuote } from "@/app/instant-quote/quote-engine";
import { renderInstantQuoteEmail } from "@/lib/emails/InstantQuoteEmail";
import type { QuizAnswers } from "@/app/instant-quote/types";

const OWNER_EMAIL = "aaronspoorconstruction@gmail.com";
const OWNER_PHONE = process.env.QUOTE_OWNER_PHONE ?? "(989) 627-7291";

const LOCATIONS = [
  "basement_existing",
  "garage_existing",
  "interior_new",
  "exterior_above",
  "exterior_buried",
];

// Manual validation — returns an error string, or null if valid.
function validate(a: Partial<QuizAnswers>): string | null {
  const required: (keyof QuizAnswers)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "streetAddress",
    "city",
    "state",
    "zip",
    "location",
    "hasConcreteSlab",
    "floodZone",
    "mobilityNeeds",
  ];
  for (const k of required) {
    if (!a[k] || String(a[k]).trim() === "") return `Missing required field: ${k}`;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(a.email))) return "Invalid email";
  if (typeof a.occupants !== "number" || a.occupants < 1 || a.occupants > 20)
    return "Invalid occupants count";
  if (typeof a.bedrooms !== "number" || a.bedrooms < 1) return "Invalid bedrooms";
  if (!LOCATIONS.includes(String(a.location))) return "Invalid location";
  if (!/^\d{5}$/.test(String(a.zip))) return "Invalid ZIP code";
  return null;
}

function prettyDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export async function POST(request: NextRequest) {
  let answers: QuizAnswers;
  try {
    answers = (await request.json()) as QuizAnswers;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(answers);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  // Never trust the client's pricing — recompute server-side.
  const quote = calculateQuote(answers);

  const supabase = getSupabase();

  // Snapshot of the computed quote. The DB function generates the daily
  // quote number (MSR-YYYYMMDD-####) and inserts the row; the table itself
  // is locked by RLS so the anon key can never read PII back.
  const payload = {
    first_name: answers.firstName,
    last_name: answers.lastName,
    email: answers.email,
    phone: answers.phone,
    street_address: answers.streetAddress,
    address_line_2: answers.addressLine2 ?? null,
    city: answers.city,
    state: answers.state,
    zip: answers.zip,
    install_address:
      answers.installSameAsContact || !answers.installAddress
        ? null
        : answers.installAddress,
    referral_source: answers.referralSource ?? null,
    bedrooms: answers.bedrooms,
    occupants: answers.occupants,
    mobility_needs: answers.mobilityNeeds,
    location: answers.location,
    has_concrete_slab: answers.hasConcreteSlab,
    slab_thickness: answers.slabThickness ?? null,
    flood_zone: answers.floodZone,
    veteran: !!answers.veteran,
    recommended_size: quote.isCustom ? "Custom" : quote.shelter.name,
    recommended_sqft: quote.isCustom ? 0 : quote.shelter.sqFt,
    line_items: quote.isCustom ? [] : quote.lineItems,
    subtotal: quote.isCustom ? 0 : quote.subtotal,
    veteran_discount: quote.isCustom ? 0 : quote.veteranDiscount,
    total: quote.isCustom ? 0 : quote.total,
    // Retain no-rebate values for compatibility with existing quote rows and RPC schema.
    rebate_intent: "not_applying",
    estimated_rebate: 0,
    net_out_of_pocket: quote.isCustom ? 0 : quote.total,
    requires_bca: false,
    rebate_flags: quote.siteNotes,
  };

  const { data: quoteNumber, error: dbError } = await supabase.rpc(
    "create_instant_quote",
    { p: payload }
  );
  if (dbError || !quoteNumber) {
    console.error("Supabase create_instant_quote error:", dbError);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your quote. Please try again or call us." },
      { status: 500 }
    );
  }

  // ── Send the email (DB write must survive an email failure) ──
  const now = new Date();
  const validThrough = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  let emailDelivered = false;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
    const html = renderInstantQuoteEmail(answers, quote, {
      quoteNumber,
      quoteDate: prettyDate(now),
      validThrough: prettyDate(validThrough),
      ownerPhone: OWNER_PHONE,
    });

    const { error: sendError } = await resend.emails.send({
      from: `Michigan Safe Rooms <${from}>`,
      to: answers.email,
      cc: OWNER_EMAIL,
      replyTo: OWNER_EMAIL,
      subject: `Your Michigan Safe Rooms Quote — ${quoteNumber}`,
      html,
    });
    if (sendError) throw sendError;
    emailDelivered = true;

    await supabase.rpc("mark_instant_quote_email", {
      p_quote_number: quoteNumber,
      p_sent_at: new Date().toISOString(),
      p_error: null,
    });
  } catch (e) {
    console.error("Resend send error:", e);
    try {
      await supabase.rpc("mark_instant_quote_email", {
        p_quote_number: quoteNumber,
        p_sent_at: null,
        p_error: String(e).slice(0, 500),
      });
    } catch (u) {
      console.error("Failed to record email error:", u);
    }
  }

  return NextResponse.json({
    ok: true,
    quoteNumber,
    emailDelivered,
    quote,
  });
}
