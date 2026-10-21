import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. How we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy describes how {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles
            information when you use our website.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you submit a contact form or quote request on our website, we collect the information
            you provide, which may include:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Details about your tyre requirements</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            We may also collect standard website usage data through server logs, which can include
            IP addresses, browser type, and pages visited.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Use Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information you provide to respond to your enquiries, prepare quotations,
            process orders, and communicate with you about our products and services. We do not
            sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We retain your information for as long as necessary to fulfil the purposes for which
            it was collected, including to satisfy any legal, accounting, or reporting requirements.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website may use cookies and similar technologies for basic website functionality
            and analytics. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website may use third-party services for hosting, analytics, or form processing.
            These services have their own privacy policies governing their use of data.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            You may request access to, correction of, or deletion of your personal information
            by contacting us using the details below.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href={CONTACT.phoneTel} className="text-brand-700 hover:underline">
              {CONTACT.phoneFormatted}
            </a>{" "}
            or use our{" "}
            <Link href="/contact" className="text-brand-700 hover:underline">
              contact form
            </Link>.
          </p>

          <p className="text-sm text-gray-400 mt-10">
            This policy was last updated on October 2026.
          </p>
        </div>
      </section>
    </>
  );
}
