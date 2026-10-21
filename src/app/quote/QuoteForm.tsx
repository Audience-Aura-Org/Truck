"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  tyreSize: string;
  quantity: string;
  brands: string;
  product: string;
  details: string;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";

  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "",
    tyreSize: "",
    quantity: "",
    brands: "",
    product: prefilledProduct,
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<QuoteFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<QuoteFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit quote request");
      }

      setStatus("success");
      setFormData({
        name: "", email: "", phone: "", company: "",
        category: "", tyreSize: "", quantity: "", brands: "", product: "", details: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Quote Request Received</h3>
        <p className="text-sm text-green-700 mb-2">
          Thank you for your request. We have sent you a confirmation email. Our team will prepare a competitive quotation and contact you within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-green-700 hover:text-green-800"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your Details</h2>
        <p className="text-sm text-gray-500 mb-5">Tell us who you are so we can send you the quote.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="quote-name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="quote-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="quote-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="quote-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.email ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="quote-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="quote-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.phone ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="quote-company" className="block text-sm font-medium text-gray-700 mb-1.5">
              Company
            </label>
            <input
              id="quote-company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Company name"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Tyre Requirements</h2>
        <p className="text-sm text-gray-500 mb-5">Tell us what tyres you need.</p>

        {prefilledProduct && (
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-5">
            <p className="text-sm text-brand-700">
              <span className="font-medium">Selected product:</span> {prefilledProduct}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="quote-category" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tyre Category
            </label>
            <select
              id="quote-category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quote-size" className="block text-sm font-medium text-gray-700 mb-1.5">
              Tyre Size
            </label>
            <input
              id="quote-size"
              type="text"
              value={formData.tyreSize}
              onChange={(e) => handleChange("tyreSize", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. 315/80R22.5"
            />
          </div>

          <div>
            <label htmlFor="quote-quantity" className="block text-sm font-medium text-gray-700 mb-1.5">
              Quantity
            </label>
            <input
              id="quote-quantity"
              type="text"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Number of tyres"
            />
          </div>

          <div>
            <label htmlFor="quote-brands" className="block text-sm font-medium text-gray-700 mb-1.5">
              Preferred Brands
            </label>
            <input
              id="quote-brands"
              type="text"
              value={formData.brands}
              onChange={(e) => handleChange("brands", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. Michelin, Bridgestone"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="quote-details" className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Details
          </label>
          <textarea
            id="quote-details"
            rows={4}
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-vertical"
            placeholder="Any additional requirements, delivery location, fleet details, etc."
          />
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">
            Failed to submit your request. Please try again, or contact us directly by phone or WhatsApp.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-accent-600 rounded-xl hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}
