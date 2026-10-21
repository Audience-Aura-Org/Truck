import { Suspense } from "react";
import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products | Commercial Truck Tyres",
  description: "Browse our complete range of premium commercial truck tyres. Filter by category, brand, or size. Long haul, regional, urban, off-road, winter, and trailer tyres available.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
