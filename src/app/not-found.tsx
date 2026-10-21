import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 text-sm font-semibold text-white bg-brand-700 rounded-xl hover:bg-brand-800 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 text-sm font-semibold text-brand-700 bg-brand-50 border border-brand-200 rounded-xl hover:bg-brand-100 transition-colors"
        >
          Browse Products
        </Link>
        <a
          href={CONTACT.phoneTel}
          className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
