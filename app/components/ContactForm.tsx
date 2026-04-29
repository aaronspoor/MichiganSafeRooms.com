"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSuccess(true);
      // Fire GA4 conversion event
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "form_submit", {
          event_category: "Contact",
          event_label: "Quote Request",
        });
      }
      form.reset();
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-10 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-3xl font-extrabold uppercase text-brand mb-3">
          Message Received
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
          Thanks — we&rsquo;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="phone">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(555) 555-5555"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="address">
          Property Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="123 Main St, City, MI"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="interest">
          Shelter Interest
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
        >
          <option value="">— Select a size —</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="message">
          Questions or Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Anything you'd like us to know before we reach out..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="callTime">
          Best Time to Call
        </label>
        <select
          id="callTime"
          name="callTime"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
        >
          <option value="">— Select a time —</option>
          <option value="morning">Morning (8am–12pm)</option>
          <option value="afternoon">Afternoon (12pm–5pm)</option>
          <option value="evening">Evening (5pm–8pm)</option>
        </select>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-3 px-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-accent hover:opacity-90 disabled:opacity-60 text-white font-bold py-4 rounded-lg text-lg transition-opacity"
      >
        {submitting ? "Sending…" : "Request My Free On-Site Consultation"}
      </button>
      <p className="text-center text-xs text-gray-400 mt-2">
        We respond within 1 business day. No spam, no pressure.
      </p>
      <p className="text-center text-xs text-gray-400">
        Your info is never shared or sold.
      </p>
    </form>
  );
}
