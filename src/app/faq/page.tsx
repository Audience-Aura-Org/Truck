import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants";
import { faqItems } from "@/data/faq";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about ${SITE_NAME}, our truck tyre products, ordering, and wholesale pricing.`,
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-brand-200 mt-2 max-w-2xl">
            Find answers to common questions about our products, ordering process, and services.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <FAQAccordion items={faqItems} />

        <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Still Have Questions?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Our team is happy to help. Contact us directly for any questions not covered here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT.phoneTel}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-brand-700 bg-white border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {CONTACT.phoneFormatted}
            </a>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-green-700 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-700 rounded-lg hover:bg-brand-800 transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
