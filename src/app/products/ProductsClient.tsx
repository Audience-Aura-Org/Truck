"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { TYRE_BRANDS } from "@/lib/constants";
import { searchProducts, sortProducts, getUniqueSizes, getUniqueTypes } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sizes = useMemo(() => getUniqueSizes(), []);
  const types = useMemo(() => getUniqueTypes(), []);

  const filteredProducts = useMemo(() => {
    let result = query ? searchProducts(query) : [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    if (selectedSize) {
      result = result.filter((p) => p.size === selectedSize);
    }
    if (selectedType) {
      result = result.filter((p) => p.type === selectedType);
    }

    return sortProducts(result, sortBy);
  }, [query, selectedCategory, selectedBrand, selectedSize, selectedType, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedSize("");
    setSelectedType("");
    setSortBy("default");
  };

  const hasActiveFilters = query || selectedCategory || selectedBrand || selectedSize || selectedType;

  return (
    <>
      {/* Page header */}
      <section className="bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-sm text-brand-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">
            Commercial Truck &amp; Car Tyres
          </h1>
          <p className="text-brand-200 mt-2 max-w-2xl">
            Browse our complete range of premium tyres. Filter by category, brand, type, or size to find the right product.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Search and controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, brand, size, pattern..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="default">Sort: Default</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
              <option value="brand">Brand</option>
              <option value="size">Size</option>
            </select>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium bg-white flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className={`lg:w-64 shrink-0 space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
            {/* Category */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Brand</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    !selectedBrand ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  All Brands
                </button>
                {TYRE_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      selectedBrand === brand
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Type</h3>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
                <span className="font-semibold">{products.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
