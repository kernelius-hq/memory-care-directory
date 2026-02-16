import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "leads.json");

interface Lead {
  name: string;
  email: string;
  phone: string;
  careType: string;
  message?: string;
  listingName?: string;
  submittedAt: string;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, careType, message, listingName } = body;

    if (!name || !email || !phone || !careType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      name,
      email,
      phone,
      careType,
      message: message || "",
      listingName: listingName || "",
      submittedAt: new Date().toISOString(),
      source: request.headers.get("referer") || "direct",
    };

    // Read existing leads
    let leads: Lead[] = [];
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    leads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const leads = JSON.parse(data);
    return NextResponse.json({ leads, count: leads.length });
  } catch {
    return NextResponse.json({ leads: [], count: 0 });
  }
}
