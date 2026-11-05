import { NextRequest, NextResponse } from "next/server";
import { sendContactAdminEmail, sendContactClientEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, brands, tyreSize, quantity, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      company: company?.trim() || "",
      brands: brands?.trim() || "",
      tyreSize: tyreSize?.trim() || "",
      quantity: quantity?.trim() || "",
      message: message.trim(),
    };

    // Send both emails in parallel
    await Promise.all([
      sendContactAdminEmail(data),
      sendContactClientEmail(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later.", code: (error as { code?: string }).code },
      { status: 500 }
    );
  }
}
