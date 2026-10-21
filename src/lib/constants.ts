import { ContactInfo } from "./types";

export const SITE_NAME = "Global Prime Truck Tyres Supply";
export const SITE_TAGLINE = "Premium Fleet Tyre Solutions";
export const SITE_DESCRIPTION =
  "Global Prime Truck Tyres Supply is a trusted wholesale supplier of premium commercial truck tyres. We supply a wide range of sizes and brands for long haul, regional, urban, and off-road applications.";

export const CONTACT: ContactInfo = {
  phone: "+1 415-787-9551",
  phoneFormatted: "+1 (415) 787-9551",
  phoneTel: "tel:+14157879551",
  smsLink: "sms:+14157879551",
  whatsappLink: "https://wa.me/14157879551",
  email: "info@globalprimetrucktyressupply.com",
  address: "8741 Pioneer Blvd, Santa Fe Springs, CA 90670, United States",
  addressShort: "Santa Fe Springs, CA 90670",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=8741+Pioneer+Blvd+Santa+Fe+Springs+CA+90670",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const TYRE_BRANDS = [
  "DRC",
  "Nebula",
  "Force",
  "American Builder",
  "Headway",
] as const;
