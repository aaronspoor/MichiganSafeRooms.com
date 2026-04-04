import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Simple HTML escape to prevent injection in email body
function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, address, interest, message, callTime } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    // Instantiate inside handler — module-level init throws at build time if env var is missing
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // Update RESEND_FROM in Vercel env vars once michigansaferooms.com is verified in Resend dashboard
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: "aaronspoorconstruction@gmail.com",
      replyTo: email,
      subject: `Safe Room Quote Request — ${esc(name)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a3a5c; border-bottom: 3px solid #f59e0b; padding-bottom: 8px;">
            New Quote Request — Michigan Safe Rooms
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; width: 140px; border: 1px solid #e5e7eb;">Name</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Phone</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Address</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(address) || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Shelter Interest</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(interest) || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${esc(message) || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Best Time to Call</td>
              <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(callTime) || "—"}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
            Hit Reply to respond directly to ${esc(name)} at ${esc(email)}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
