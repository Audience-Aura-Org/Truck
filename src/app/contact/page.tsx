import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants";
import ContactActions from "@/components/ContactActions";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_NAME}. Call, text, WhatsApp, or submit an enquiry form for truck tyre pricing and availability.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Contact Us</h1>
          <p className="text-brand-200 mt-2 max-w-2xl">
            Reach out by phone, text, WhatsApp, or the form below. We respond promptly to all enquiries.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Contact methods */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <ContactActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</h3>
                <a href={CONTACT.phoneTel} className="text-lg font-semibold text-gray-900 hover:text-brand-700 transition-colors">
                  {CONTACT.phoneFormatted}
                </a>
                <p className="text-sm text-gray-500 mt-1">Available for calls and text messages</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">WhatsApp</h3>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-green-700 hover:text-green-800 transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-sm text-gray-500 mt-1">Quick responses via WhatsApp messaging</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</h3>
                <a
                  href={CONTACT.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-900 hover:text-brand-700 transition-colors"
                >
                  {CONTACT.address}
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Business Hours</h3>
                <p className="text-sm text-gray-600">
                  We aim to respond to all enquiries within one business day.
                  For urgent requirements, please call us directly.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-accent-50 border border-accent-200 rounded-xl p-6">
              <h3 className="font-semibold text-accent-800 mb-2">Need a Quote?</h3>
              <p className="text-sm text-accent-700 mb-4">
                For specific product pricing and bulk order enquiries, use our dedicated quote request form.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
