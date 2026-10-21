import { Product } from "./types";
import { products } from "@/data/products";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.pattern.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getUniqueBrands(): string[] {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export function getUniqueSizes(): string[] {
  return Array.from(new Set(products.map((p) => p.size))).sort();
}

export function getUniqueCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function getUniqueTypes(): string[] {
  return Array.from(new Set(products.map((p) => p.type))).sort();
}

export function sortProducts(
  items: Product[],
  sortBy: string
): Product[] {
  const sorted = [...items];
  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "brand":
      return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    case "size":
      return sorted.sort((a, b) => a.size.localeCompare(b.size));
    default:
      return sorted;
  }
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateWhatsAppLink(message?: string): string {
  const base = "https://wa.me/14157879551";
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}