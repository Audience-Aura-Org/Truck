import { FAQItem } from "@/lib/types";
import { TYRE_BRANDS } from "@/lib/constants";

export const faqItems: FAQItem[] = [
  {
    question: "What types of truck tyres do you supply?",
    answer:
      "We supply commercial truck tyres for steer, drive, all-position, and trailer applications, plus highway and off-road light-truck tyres. Use the product filters to find the right size and application.",
  },
  {
    question: "Which tyre brands do you carry?",
    answer:
      `Our truck tyre catalog includes ${TYRE_BRANDS.join(", ")}. Browse the brand filters to see the available products from each manufacturer.`,
  },
  {
    question: "Do you offer wholesale pricing?",
    answer:
      "Yes, we specialize in wholesale and bulk supply of commercial truck tyres. Pricing depends on quantity, brand, and specifications. Contact us for a detailed quotation tailored to your requirements.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "You can request a quote by filling out the form on our Request a Quote page, calling us directly at +1 (415) 787-9551, sending a text message, or reaching us via WhatsApp. We typically respond within one business day.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We serve customers across multiple regions. Shipping availability and logistics depend on the destination and order volume. Please contact us with your location and requirements for specific shipping information.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "Minimum order quantities vary by product and brand. We accommodate both fleet-sized orders and smaller volume purchases. Contact us to discuss your specific needs.",
  },
  {
    question: "Can you supply tyres for specific fleet requirements?",
    answer:
      "We work closely with fleet managers to identify the optimal tyre solutions for their specific operating conditions, routes, and budget. Share your fleet details and we will recommend suitable products.",
  },
  {
    question: "How can I contact your sales team?",
    answer:
      "Our sales team is available by phone at +1 (415) 787-9551, via text message to the same number, or through WhatsApp. You can also use the contact form on our website. We aim to respond promptly to all enquiries.",
  },
];
