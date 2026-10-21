import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import ContactActions from "@/components/ContactActions";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: `Request wholesale pricing on commercial truck tyres from ${SITE_NAME}. Tell us what you need and we will respond with competitive rates.`,
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Request a Quote</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Request a Quote</h1>
          <p className="text-brand-200 mt-2 max-w-2xl">
            Tell us your tyre requirements and we will provide competitive wholesale pricing.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Suspense fallback={<p className="text-gray-500">Loading form...</p>}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Prefer to Talk?</h3>
              <p className="text-sm text-gray-600 mb-4">
                You can also reach us directly for immediate assistance with your quote request.
              </p>
              <ContactActions variant="compact" />
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-xl p-6">
              <h3 className="font-semibold text-brand-900 mb-3">What to Include</h3>
              <ul className="space-y-2">
                {[
                  "Tyre sizes needed",
                  "Preferred brands (if any)",
                  "Quantity per size",
                  "Application type (long haul, regional, etc.)",
                  "Delivery location",
                  "Any specific requirements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-700">
                    <svg className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
