import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = process.env.LEADS_EMAIL || "leads@memorycarefind.com";

interface Lead {
  name: string;
  email: string;
  phone: string;
  careType: string;
  message?: string;
  listingName?: string;
}

const careTypeLabels: Record<string, string> = {
  "early-stage-dementia": "Early-Stage Dementia Care",
  "alzheimers-care": "Alzheimer's Care",
  "advanced-dementia": "Advanced Dementia Care",
  "memory-care": "General Memory Care",
  "respite-care": "Respite Care",
  "24-hour-care": "24-Hour / Live-In Memory Care",
  other: "Other",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, careType, message, listingName } = body as Lead;

    if (!name || !email || !phone || !careType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const source = request.headers.get("referer") || "direct";
    const careLabel = careTypeLabels[careType] || careType;

    await resend.emails.send({
      from: "MemoryCareFind <leads@memorycarefind.com>",
      to: NOTIFICATION_EMAIL,
      subject: `New Lead: ${name} — ${careLabel}${listingName ? ` (${listingName})` : ""}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Lead from MemoryCareFind</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Name</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Email</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Phone</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Care Type</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${careLabel}</td>
            </tr>
            ${listingName ? `<tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Provider</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${listingName}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Message</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${message || "No message provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e5e7eb;">Source Page</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${source}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold;">Submitted</td>
              <td style="padding: 8px 12px;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">
            You can reply directly to this email to reach the lead at ${email}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
