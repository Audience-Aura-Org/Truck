import { ContactInfo } from "./types";
import { products } from "@/data/products";

export const SITE_NAME = "Global Prime Truck Tyres Supply";
export const SITE_URL = "https://globalprimetrucktyressupply.com";
export const PRIMARY_BRAND = "Double Coin";
export const SITE_TAGLINE = "Double Coin Truck Tyres & Fleet Solutions";
export const SITE_DESCRIPTION =
  "Global Prime Truck Tyres Supply is an independent wholesale supplier of Double Coin and other commercial truck tyres for fleet, highway, and off-road applications. Request a quote — we do not process payments on this website.";

export const CONTACT: ContactInfo = {
  phone: "+1 415-787-9551",
  phoneFormatted: "+1 (415) 787-9551",
  phoneTel: "tel:+14157879551",
  smsLink: "sms:+14157879551",
  whatsappLink: "https://wa.me/14157879551",
  email: "info@globalprimetrucktyressupply.com",
  emailMailto: "mailto:info@globalprimetrucktyressupply.com",
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
  PRIMARY_BRAND,
  ...Array.from(new Set(products.map((product) => product.brand))).filter(
    (brand) => brand !== PRIMARY_BRAND
  ),
];
