import { NextRequest, NextResponse } from "next/server";
import { sendQuoteAdminEmail, sendQuoteClientEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, category, tyreSize, quantity, brands, product, details } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
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
      phone: phone.trim(),
      company: company?.trim() || "",
      category: category?.trim() || "",
      tyreSize: tyreSize?.trim() || "",
      quantity: quantity?.trim() || "",
      brands: brands?.trim() || "",
      product: product?.trim() || "",
      details: details?.trim() || "",
    };

    // Send both emails in parallel
    await Promise.all([
      sendQuoteAdminEmail(data),
      sendQuoteClientEmail(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again later.", code: (error as { code?: string }).code },
      { status: 500 }
    );
  }
}
