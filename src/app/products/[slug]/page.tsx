import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug, generateWhatsAppLink } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import ContactActions from "@/components/ContactActions";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.brand} ${product.name} | ${product.category} Tyre`,
    description: product.description,
    openGraph: {
      title: `${product.brand} ${product.name}`,
      description: product.description,
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const whatsappMsg = `Hi, I'm interested in the ${product.brand} ${product.name} (${product.size}). Could you provide pricing and availability information?`;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-y-1">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-gray-700 transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-700 transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.brand} {product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="bg-gray-100 rounded-2xl aspect-[4/3] sm:aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {product.type}
                </span>
                {product.origin && (
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                    {product.origin}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications table */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Specifications</h2>
              <dl className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Size", value: product.size },
                  { label: "Load Index", value: product.loadIndex },
                  { label: "Ply Rating", value: product.pr },
                  { label: "Tread Depth", value: product.treadDepth },
                  { label: "Pattern", value: product.pattern },
                  { label: "Origin", value: product.origin },
                  { label: "Brand", value: product.brand },
                  { label: "Tube Type", value: product.tubeType },
                  ...(product.standardRim ? [{ label: "Standard Rim", value: product.standardRim }] : []),
                  ...(product.sectionWidth ? [{ label: "Section Width", value: product.sectionWidth }] : []),
                ].filter((spec) => spec.value).map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs text-gray-500 uppercase font-medium">{spec.label}</dt>
                    <dd className="text-sm font-semibold text-gray-900 mt-1">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Enquiry */}
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Get Pricing</h2>
              <p className="text-sm text-gray-600 mb-4">
                Contact us for wholesale pricing on this tyre. We offer competitive rates for fleet and bulk orders.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href={`/quote?product=${encodeURIComponent(`${product.brand} ${product.name} (${product.size})`)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Request Quote
                </Link>
                <a
                  href={generateWhatsAppLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.496A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.3 0-4.438-.66-6.27-1.79l-.438-.27-2.633.883.883-2.633-.27-.438A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                  WhatsApp Enquiry
                </a>
                <a
                  href={CONTACT.phoneTel}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-brand-700 bg-white border border-brand-200 rounded-lg hover:bg-brand-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </div>

            <ContactActions variant="compact" />
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related {product.category} Tyres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
