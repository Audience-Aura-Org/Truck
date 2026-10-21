import Link from "next/link";
import { Product } from "@/lib/types";
import { generateWhatsAppLink } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const whatsappMsg = `Hi, I'm interested in the ${product.brand} ${product.name} (${product.size}). Could you provide pricing and availability?`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 z-20 bg-brand-700 text-white text-xs font-medium px-2.5 py-1 rounded-md">
          {product.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-gray-900 font-bold text-base leading-snug">
            <Link href={`/products/${product.slug}`} className="hover:text-brand-700 transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Size</p>
            <p className="text-sm font-semibold text-gray-800">{product.size}</p>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Load</p>
            <p className="text-sm font-semibold text-gray-800">{product.loadIndex}</p>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Type</p>
            <p className="text-sm font-semibold text-gray-800">{product.type}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-sm font-medium px-4 py-2.5 bg-brand-700 text-white rounded-lg hover:bg-brand-800 transition-colors"
          >
            View Details
          </Link>
          <a
            href={generateWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            aria-label="Enquire on WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.496A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.3 0-4.438-.66-6.27-1.79l-.438-.27-2.633.883.883-2.633-.27-.438A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
