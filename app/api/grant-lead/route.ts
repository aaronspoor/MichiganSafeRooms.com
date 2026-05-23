import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, county, rebate_interest } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Instantiate inside handler to avoid build-time crash (anon key + RLS INSERT policy)
    const supabase = getSupabase();
    const { error: dbError } = await supabase
      .from("grant_leads")
      .insert({ name, email, phone, county, rebate_interest });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

    // Confirmation email to homeowner
    await resend.emails.send({
      from,
      to: email,
      replyTo: "aaronspoorconstruction@gmail.com",
      subject: "Your Michigan Safe Room Rebate Information",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background: #1a3a5c; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #f59e0b; font-size: 22px; margin: 0 0 4px;">Michigan Safe Rooms</h1>
            <p style="color: #93c5fd; margin: 0; font-size: 14px;">Your Safe Room Rebate Information</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0 0 16px;">Hi ${esc(name)},</p>
            <p style="margin: 0 0 16px;">Thanks for your interest in the <strong>Michigan Safe Room Rebate Program</strong>. Here's a summary of what you need to know:</p>

            <div style="background: #fff; border: 1px solid #d1fae5; border-left: 4px solid #10b981; border-radius: 6px; padding: 16px 20px; margin: 0 0 20px;">
              <h2 style="margin: 0 0 10px; font-size: 16px; color: #065f46;">Program Highlights</h2>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: #374151;">
                <li><strong>Up to $7,131.75 back</strong> (75% of eligible costs)</li>
                <li>50 homeowners selected statewide by random draw</li>
                <li>Your safe room must be FEMA P-320 or P-361 compliant</li>
                <li>Must be your primary residence, owner-occupied single-family home</li>
                <li>A licensed, FEMA-compliant contractor must complete the installation</li>
              </ul>
            </div>

            <h2 style="font-size: 16px; margin: 0 0 10px;">How to Apply</h2>
            <ol style="padding-left: 20px; line-height: 1.9; color: #374151; margin: 0 0 20px;">
              <li>Submit your application through the state's official Smartsheet form</li>
              <li>If selected, attend a required virtual briefing via Microsoft Teams</li>
              <li>Receive a Notice to Proceed, then hire a FEMA-compliant contractor</li>
              <li>Complete installation, submit documentation, receive your rebate check</li>
            </ol>

            <div style="text-align: center; margin: 24px 0;">
              <a href="https://app.smartsheet.com/b/form/019d6e30121875f6ae8b02a5d30b3a4b"
                 style="background: #1a3a5c; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px;">
                Apply Through the State Portal →
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

            <p style="margin: 0 0 10px; font-weight: bold; color: #1a3a5c;">Ready to get your free quote from Michigan Safe Rooms?</p>
            <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">We install FEMA P-320 compliant steel safe rooms throughout lower Michigan and can provide all contractor certification documentation required by the program.</p>
            <div style="text-align: center; margin-bottom: 8px;">
              <a href="https://michigansaferooms.com/#contact"
                 style="background: #f59e0b; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px;">
                Get a Free Quote →
              </a>
            </div>

            <p style="margin: 24px 0 0; font-size: 12px; color: #9ca3af;">
              Michigan Safe Rooms is not affiliated with the Michigan State Police or EMHSD. We are a qualified FEMA-compliant contractor for this program.<br /><br />
              Official program page: <a href="https://www.michigan.gov/msp/divisions/emhsd/response-recovery-responsive/michigan-safe-room-rebate-program" style="color: #2563eb;">michigan.gov</a>
            </p>
          </div>
        </div>
      `,
    });

    // Internal notification to Aaron
    await resend.emails.send({
      from,
      to: "aaronspoorconstruction@gmail.com",
      subject: `Grant Lead — ${esc(name)} (${esc(county || "unknown county")})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a3a5c; border-bottom: 3px solid #f59e0b; padding-bottom: 8px;">
            New Grant Program Lead — Michigan Safe Rooms
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; width: 160px; border: 1px solid #e5e7eb;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Phone</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(phone) || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">County</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(county) || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Rebate Interest</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(rebate_interest) || "—"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 13px;">Reply directly to this email to respond to ${esc(name)}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Grant lead route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
