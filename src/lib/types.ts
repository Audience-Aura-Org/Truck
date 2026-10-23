export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Truck";
  type: string;
  size: string;
  origin: string;
  pr: string;
  loadIndex: string;
  treadDepth: string;
  pattern: string;
  price: number;
  discountPrice: number | null;
  image: string;
  description: string;
  standardRim: string;
  sectionWidth: string;
  tubeType: string;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  smsLink: string;
  whatsappLink: string;
  email: string;
  address: string;
  addressShort: string;
  mapsLink: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
}
