import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 submissions per IP per hour
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "anonymous";

    const { success: rateLimitOk } = rateLimit(ip, 5, 3600000);
    if (!rateLimitOk) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — bots fill hidden fields
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Zod validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials || !sheetId) {
      console.error("Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_SHEET_ID");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date();
    const date = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    // Find next empty row
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A:A",
    });
    const nextRow = (existing.data.values?.length || 1) + 1;

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Sheet1!A${nextRow}:E${nextRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[date, data.name, data.email, data.message, data.timezone || "Unknown"]],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
