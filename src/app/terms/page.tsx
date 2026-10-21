import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${SITE_NAME} website.`,
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Terms &amp; Conditions</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Terms &amp; Conditions</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            These Terms and Conditions govern your use of the {SITE_NAME} website.
            By using this website, you agree to these terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Website Use</h2>
          <p className="text-gray-600 leading-relaxed">
            This website is provided for informational purposes and to facilitate enquiries
            about our truck tyre products and services. The content on this website is subject
            to change without notice.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Product Information</h2>
          <p className="text-gray-600 leading-relaxed">
            While we strive to keep product information accurate, specifications, availability,
            and pricing are subject to change. All product details should be confirmed with our
            sales team before purchase. Product images are for illustration purposes and may not
            exactly represent the physical product.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pricing and Quotes</h2>
          <p className="text-gray-600 leading-relaxed">
            Prices are provided on a per-quote basis and are not binding until a formal order
            is confirmed. Quotations are valid for the period stated in the quote or, if no
            period is stated, for a reasonable timeframe. All prices are subject to availability.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            The content, design, and layout of this website are the property of {SITE_NAME}
            or its licensors. Brand names and logos of tyre manufacturers mentioned on this
            website are the property of their respective owners and are used for product
            identification purposes only.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            {SITE_NAME} provides this website on an &quot;as is&quot; basis. We do not guarantee that the
            website will be available at all times or free from errors. We are not liable for any
            losses or damages arising from your use of this website.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">External Links</h2>
          <p className="text-gray-600 leading-relaxed">
            This website may contain links to third-party websites. We are not responsible for
            the content or practices of any linked websites.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these terms from time to time. Continued use of the website after
            changes constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions about these terms, please contact us at{" "}
            <a href={CONTACT.phoneTel} className="text-brand-700 hover:underline">
              {CONTACT.phoneFormatted}
            </a>{" "}
            or via our{" "}
            <Link href="/contact" className="text-brand-700 hover:underline">
              contact page
            </Link>.
          </p>

          <p className="text-sm text-gray-400 mt-10">
            These terms were last updated on October 2026.
          </p>
        </div>
      </section>
    </>
  );
}
