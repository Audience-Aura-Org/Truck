import { NextRequest, NextResponse } from "next/server";
import { sendQuoteAdminEmail, sendQuoteClientEmail } from "@/lib/email";
import { FIELD_LIMITS, clip, isHoneypotFilled, isValidEmail } from "@/lib/form-guard";
import { clientKey, isSameOrigin, rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const limit = rateLimit(`quote:${clientKey(req)}`, 5);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Bots fill the hidden "website" field; pretend success so they move on.
    if (isHoneypotFilled(body.website)) {
      return NextResponse.json({ success: true });
    }

    const data = {
      name: clip(body.name, FIELD_LIMITS.name),
      email: clip(body.email, FIELD_LIMITS.email),
      phone: clip(body.phone, FIELD_LIMITS.phone),
      company: clip(body.company, FIELD_LIMITS.company),
      category: clip(body.category, FIELD_LIMITS.category),
      tyreSize: clip(body.tyreSize, FIELD_LIMITS.tyreSize),
      quantity: clip(body.quantity, FIELD_LIMITS.quantity),
      brands: clip(body.brands, FIELD_LIMITS.brands),
      product: clip(body.product, FIELD_LIMITS.product),
      details: clip(body.details, FIELD_LIMITS.details),
    };

    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await sendQuoteAdminEmail(data);
    // The acknowledgement is best-effort and carries no visitor-supplied text.
    await sendQuoteClientEmail(data.email).catch((err) =>
      console.error("Quote acknowledgement failed:", err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again later." },
      { status: 500 }
    );
  }
}
