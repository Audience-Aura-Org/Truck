export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  company: 120,
  brands: 200,
  tyreSize: 120,
  quantity: 40,
  message: 3000,
  category: 80,
  product: 200,
  details: 3000,
} as const;

export function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= FIELD_LIMITS.email;
}

export function hasConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on";
}
