import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import FaqAccordion from "@/app/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Michigan Safe Rooms | Steel Safe Room Installation",
  description:
    "Premium steel safe rooms designed, fabricated, and installed across lower Michigan. Free consultations — fast installs — lifetime structural warranty.",
};

// ── Product tiers ─────────────────────────────────────────────────────────────
// Edit names, dimensions, features, and prices here
const PRODUCTS = [
  {
    name: "Essential",
    dimensions: '4′ × 4′ × 7′',
    sqft: "16 sq ft",
    capacity: "Seats 4–6",
    price: "$3,500",
    features: [
      "FEMA P-320 rated",
      "14-gauge steel walls",
      "Reinforced steel door",
      "Passive ventilation system",
    ],
    highlight: false,
  },
  {
    name: "Family",
    dimensions: '6′ × 8′ × 7′',
    sqft: "48 sq ft",
    capacity: "Seats 8–10",
    price: "$5,200",
    features: [
      "Everything in Essential",
      "Built-in bench seating",
      "Interior lighting",
      "ADA-accessible door width",
    ],
    highlight: true, // most popular
  },
  {
    name: "Ultimate",
    dimensions: '8′ × 12′ × 7′',
    sqft: "96 sq ft",
    capacity: "Seats 16–20",
    price: "$8,900",
    features: [
      "Everything in Family",
      "Electrical outlet ready",
      "Climate control prep",
      "Custom interior layout",
    ],
    highlight: false,
  },
];

// ── FAQ items ─────────────────────────────────────────────────────────────────
// Edit questions and answers here
const FAQ_ITEMS = [
  {
    question: "What are your safe rooms made of?",
    answer:
      "Our shelters are fabricated from heavy-gauge structural steel — no concrete, no wood framing. Every unit is welded, not bolted, giving you a seamless enclosure rated to withstand the highest wind-load and debris-impact standards set by FEMA P-320.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most installations are completed in a single day. We handle site prep, anchoring, and final inspection before we leave. Because we're centrally located in lower Michigan, scheduling is fast — typical lead time is 2–4 weeks from deposit.",
  },
  {
    question: "Do I need a permit to install a safe room?",
    answer:
      "Permit requirements vary by municipality. In many Michigan jurisdictions, above-ground safe rooms installed in an existing garage or basement require only a basic building permit. We'll walk you through the process for your area during your free consultation.",
  },
  {
    question: "How much does a safe room cost?",
    answer:
      "Our shelters start at $3,500 for the Essential model. Final pricing depends on size, site conditions, and any custom options. All quotes are free and include an on-site assessment with no obligation.",
  },
  {
    question: "Are your shelters FEMA rated?",
    answer:
      "Yes. Every Michigan Safe Rooms unit is engineered to meet FEMA P-320 standards, which specify performance requirements for safe rooms against extreme wind events. We provide documentation for your records and insurance provider.",
  },
  {
    question: "What areas of Michigan do you serve?",
    answer:
      "We install throughout lower Michigan. Based in the Durand area, we regularly serve greater Lansing, Flint, Grand Rapids, Saginaw, Ann Arbor, Kalamazoo, Battle Creek, and surrounding communities. Contact us to confirm your area.",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0b1929] via-brand to-[#1a3a6e] text-white py-24 md:py-36 px-4 overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            Michigan&rsquo;s Premier Safe Room Installer
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-7xl font-extrabold uppercase tracking-tight leading-none mb-6">
            Your Family Deserves
            <br />
            <span className="text-brand-accent">Complete Protection</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            We design, fabricate, and install premium steel safe rooms across lower Michigan.
            One call — from free consultation to final installation, we handle everything.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#contact"
              className="bg-brand-accent hover:opacity-90 text-white font-bold px-10 py-4 rounded-lg transition-opacity text-lg"
            >
              Get a Free Quote
            </a>
            {/* ── PHONE: update (XXX) XXX-XXXX and tel: href ── */}
            <a
              href="tel:+1XXXXXXXXXX"
              className="border-2 border-white/40 text-white hover:border-white hover:bg-white/10 font-bold px-10 py-4 rounded-lg transition-all text-lg"
            >
              Call (XXX) XXX-XXXX
            </a>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { num: "500+", label: "Installs Completed" },
              { num: "10+", label: "Years Serving MI" },
              { num: "Lifetime", label: "Structural Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-accent">
                  {stat.num}
                </div>
                <div className="text-xs text-blue-200 mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Free Consultation",
                body: "We visit your property, assess the best location, and walk you through every option. No pressure, no obligation — just answers.",
              },
              {
                step: "02",
                title: "Custom Fabrication",
                body: "Your shelter is cut, welded, and finished in our Michigan facility to exact specifications. Heavy-gauge steel built to outlast your home.",
              },
              {
                step: "03",
                title: "Professional Install",
                body: "Our crew handles delivery, anchoring, and final inspection — typically in a single day. We don't leave until you're satisfied.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="font-heading text-5xl font-extrabold text-brand-accent/30 leading-none mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-brand mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
              Steel Safe Rooms
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
              Choose Your Shelter
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Every model is FEMA P-320 rated, welded steel construction, and installed by our crew.
              Prices below are starting points — contact us for a precise quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.name}
                className={`relative rounded-xl border-2 p-8 flex flex-col ${
                  product.highlight
                    ? "border-brand-accent shadow-xl"
                    : "border-gray-200 shadow-sm"
                }`}
              >
                {/* Most popular badge */}
                {product.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading text-3xl font-extrabold uppercase text-brand mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{product.dimensions}</p>
                  <p className="text-gray-400 text-xs">{product.sqft} · {product.capacity}</p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-accent mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-6">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Starting at</p>
                  <p className="font-heading text-4xl font-extrabold text-brand mb-4">
                    {product.price}
                  </p>
                  <a
                    href="#contact"
                    className={`block text-center font-bold py-3 px-6 rounded-lg transition-opacity text-sm ${
                      product.highlight
                        ? "bg-brand-accent text-white hover:opacity-90"
                        : "bg-brand text-white hover:opacity-90"
                    }`}
                  >
                    Request a Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
              Common Questions
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
              FAQ
            </h2>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── Contact / Quote Form ──────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
              Free — No Obligation
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
              Get a Free Quote
            </h2>
            <p className="text-gray-500 mt-3">
              Fill out the form below and we&rsquo;ll be in touch within one business day.
            </p>
          </div>

          {/* TODO: wire action to /api/contact when a backend is ready */}
          <form
            action="mailto:aaronspoorconstruction@gmail.com"
            method="POST"
            encType="text/plain"
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
                <option value="">— Select a model —</option>
                <option value="essential">Essential (4′ × 4′)</option>
                <option value="family">Family (6′ × 8′)</option>
                <option value="ultimate">Ultimate (8′ × 12′)</option>
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

            <button
              type="submit"
              className="w-full bg-brand-accent hover:opacity-90 text-white font-bold py-4 rounded-lg text-lg transition-opacity"
            >
              Send My Quote Request
            </button>

            <p className="text-center text-xs text-gray-400">
              Or email us directly:{" "}
              <a href="mailto:aaronspoorconstruction@gmail.com" className="text-brand-light hover:underline">
                aaronspoorconstruction@gmail.com
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* ── Recent Blog Posts ─────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">
                  Resources
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
                  From the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-brand-light font-semibold hover:underline text-sm hidden sm:block"
              >
                View all posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border-l-4 border-brand-accent rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group block"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-50 text-brand-light px-2 py-0.5 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-light transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="text-brand-light font-semibold hover:underline text-sm">
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
