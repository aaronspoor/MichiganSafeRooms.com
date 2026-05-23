"use client";

import { useState } from "react";

const LOWER_MICHIGAN_COUNTIES = [
  "Alcona", "Allegan", "Alpena", "Antrim", "Arenac",
  "Barry", "Bay", "Benzie", "Berrien", "Branch",
  "Calhoun", "Cass", "Charlevoix", "Cheboygan", "Clare", "Clinton", "Crawford",
  "Eaton", "Emmet",
  "Genesee", "Gladwin", "Grand Traverse", "Gratiot",
  "Hillsdale", "Huron",
  "Ingham", "Ionia", "Iosco", "Isabella",
  "Jackson",
  "Kalamazoo", "Kalkaska", "Kent",
  "Lake", "Lapeer", "Leelanau", "Lenawee", "Livingston",
  "Macomb", "Manistee", "Mason", "Mecosta", "Midland", "Missaukee", "Monroe", "Montcalm", "Montmorency", "Muskegon",
  "Newaygo",
  "Oakland", "Oceana", "Ogemaw", "Osceola", "Oscoda", "Otsego", "Ottawa",
  "Presque Isle",
  "Roscommon",
  "Saginaw", "St. Clair", "St. Joseph", "Sanilac", "Shiawassee",
  "Tuscola",
  "Van Buren",
  "Washtenaw", "Wayne", "Wexford",
];

export default function LeadCaptureForm() {
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
      const res = await fetch("/api/grant-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);

      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "form_submit", {
          event_category: "Grant Lead",
          event_label: "Grant Interest Form",
        });
      }

      form.reset();
    } catch {
      setError("Something went wrong. Please try again or call (989) 627-7291.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white border border-green-200 rounded-2xl shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-3xl font-extrabold uppercase text-brand mb-3">
          You&rsquo;re on the List
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto mb-5">
          Check your inbox — we&rsquo;ve sent you a full breakdown of the program plus next steps. We&rsquo;ll follow up within one business day.
        </p>
        <a
          href="https://app.smartsheet.com/b/form/019d6e30121875f6ae8b02a5d30b3a4b"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Apply Through the State Portal Now
        </a>
      </div>
    );
  }

  return (
    <form
      id="grant-lead-form"
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="gl-name">
            Full Name *
          </label>
          <input
            id="gl-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="gl-phone">
            Phone Number
          </label>
          <input
            id="gl-phone"
            name="phone"
            type="tel"
            placeholder="(555) 555-5555"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="gl-email">
          Email Address *
        </label>
        <input
          id="gl-email"
          name="email"
          type="email"
          required
          placeholder="jane@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="gl-county">
          County
        </label>
        <select
          id="gl-county"
          name="county"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
        >
          <option value="">— Select your county —</option>
          {LOWER_MICHIGAN_COUNTIES.map((c) => (
            <option key={c} value={c}>{c} County</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="gl-interest">
          Rebate Interest
        </label>
        <select
          id="gl-interest"
          name="rebate_interest"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
        >
          <option value="">— Select one —</option>
          <option value="applying">Yes — I want to apply for the rebate</option>
          <option value="already-applied">I&apos;ve already applied</option>
          <option value="just-quote">Just interested in a safe room (no rebate)</option>
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
        className="w-full bg-brand-accent hover:opacity-90 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg transition-opacity"
      >
        {submitting ? "Submitting…" : "Get Program Info + Free Quote"}
      </button>

      <p className="text-center text-xs text-gray-400">
        We respond within 1 business day. Your info is never shared or sold.
      </p>
    </form>
  );
}
