import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { SITE_NAME, CONTACT, TYRE_BRANDS } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import ContactActions from "@/components/ContactActions";
import HeroVideo from "@/components/HeroVideo";

const featuredProducts = products.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ── Hero with Video Background ───────────────────── */}
      <section className="relative bg-brand-950 overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[700px] flex items-center">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <HeroVideo />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full" />
              Wholesale Truck Tyre Supplier
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Premium Commercial{" "}
              <span className="text-accent-400">Truck Tyres</span>{" "}
              for Every Fleet
            </h1>

            <p className="text-lg lg:text-xl text-brand-200 leading-relaxed mb-10 max-w-2xl">
              {SITE_NAME} supplies quality truck tyres from leading global brands.
              Long haul, regional, urban, off-road, winter, and trailer &mdash;
              we have the right tyre for your operation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-accent-600 rounded-xl hover:bg-accent-700 transition-colors"
              >
                Browse Tyres
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                Request a Quote
              </Link>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">{CONTACT.phoneFormatted}</span>
                <span className="sm:hidden">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tyre Showcase Banner ────────────────────────── */}
      <section className="w-full bg-black">
        <img
          src="/3.png"
          alt="Premium Truck Tyre Showcase"
          className="w-full h-auto object-cover opacity-90"
        />
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-gray-200">
            {[
              { value: `${products.length}+`, label: "Products Available" },
              { value: `${TYRE_BRANDS.length}`, label: "Trusted Brands" },
              { value: "2", label: "Categories" },
              { value: "24/7", label: "Quote Requests" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-2xl lg:text-3xl font-bold text-brand-700">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tyre Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We supply commercial truck tyres for every application.
              Select a category to browse our range.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                    {cat.icon === "truck" ? (
                      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-2.2a2.25 2.25 0 00-.659-1.591L16.5 9.75V6.75a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6.75v7.5c0 .621.504 1.125 1.125 1.125" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                      {cat.name} Tyres
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Featured Tyres
              </h2>
              <p className="text-gray-600">
                A selection from our range of premium commercial truck tyres.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="section-padding bg-brand-950 text-white relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src="/assets/background.png" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose {SITE_NAME}
            </h2>
            <p className="text-brand-200 text-lg max-w-2xl mx-auto">
              We are committed to supplying quality products and responsive service
              to commercial fleet operators and tyre distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Brands",
                desc: "We supply tyres from established global manufacturers known for performance and durability.",
                iconPath: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
              },
              {
                title: "Competitive Wholesale Pricing",
                desc: "Volume pricing for fleet operators and distributors. Request a quote for your specific requirements.",
                iconPath: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
              },
              {
                title: "Wide Product Range",
                desc: "From long haul to off-road, steer to trailer, we cover all commercial truck tyre applications.",
                iconPath: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
              },
              {
                title: "Responsive Communication",
                desc: "Reach us by phone, SMS, or WhatsApp. We respond promptly to enquiries and quote requests.",
                iconPath: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
              },
              {
                title: "Multi-Brand Selection",
                desc: "Access tyres from over 12 established manufacturers to match any fleet specification and budget.",
                iconPath: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
              },
              {
                title: "Fleet Solutions",
                desc: "Tailored recommendations based on your routes, loads, and operating conditions.",
                iconPath: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-accent-600/20 rounded-xl flex items-center justify-center text-accent-400 mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Brands We Supply
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We source from established global tyre manufacturers to ensure
              quality and reliability for your fleet.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {TYRE_BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/products?brand=${encodeURIComponent(brand)}`}
                className="flex-1 min-w-[140px] flex items-center justify-center h-16 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-semibold text-sm hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How to Order
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Getting the right tyres for your fleet is straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Browse or Enquire",
                desc: "Explore our product range or tell us what you need. We cover all major sizes and categories.",
              },
              {
                step: "2",
                title: "Get a Quote",
                desc: "Request pricing for your specific requirements. We respond promptly with competitive wholesale rates.",
              },
              {
                step: "3",
                title: "Place Your Order",
                desc: "Confirm your order and we arrange supply. Contact us by phone, SMS, or WhatsApp at any stage.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-700 text-white rounded-lg flex items-center justify-center text-lg font-semibold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="bg-brand-900 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Source Your Truck Tyres?
            </h2>
            <p className="text-brand-200 mb-8 max-w-xl mx-auto">
              Contact us today for wholesale pricing on premium commercial truck tyres.
              We are ready to assist with your fleet requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-accent-600 rounded-xl hover:bg-accent-700 transition-colors"
              >
                Request a Quote
              </Link>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {CONTACT.phoneFormatted}
              </a>
            </div>
            <ContactActions variant="compact" className="justify-center" />
          </div>
        </div>
      </section>
    </>
  );
}
