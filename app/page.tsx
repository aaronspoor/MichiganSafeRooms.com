import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import FaqAccordion from "@/app/components/FaqAccordion";
import ContactForm from "@/app/components/ContactForm";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import AboutSection from "@/app/components/AboutSection";
import PricingSection from "@/app/components/PricingSection";

export const metadata: Metadata = {
  title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer | Free Quote — Michigan Safe Rooms",
  description:
    "Michigan's dedicated safe room installer. We design, fabricate & install FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation. Free quote — no obligation.",
  alternates: {
    canonical: "https://michigansaferooms.com",
  },
  openGraph: {
    title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer | Free Quote",
    description:
      "Michigan's dedicated safe room installer. FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation. Free consultation.",
    url: "https://michigansaferooms.com",
    // TODO: Replace with real OG image once photography is complete
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Michigan Safe Rooms Installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer",
    description:
      "Michigan's dedicated safe room installer. FEMA P-320 compliant. EF5-rated. Same-day installation. Free quote — no obligation.",
    // TODO: Replace with real Twitter card image
    images: ["/og-image.jpg"],
  },
};

// ── FAQ items ─────────────────────────────────────────────────────────────────
// Edit questions and answers here
const FAQ_ITEMS = [
  {
    question: "What are your safe rooms made of?",
    answer:
      "Our shelters are constructed from heavy-gauge structural steel panels, bolted together for a rock-solid enclosure that meets or exceeds FEMA P-320 standards for wind load and debris impact.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most installations are completed in a single day. We handle site prep, anchoring, and final inspection before we leave.",
  },
  {
    question: "Do I need a permit to install a safe room?",
    answer:
      "Permit requirements vary by municipality. In many Michigan jurisdictions, above-ground safe rooms installed in an existing garage or basement require only a basic building permit. We'll walk you through the process for your area during your free consultation.",
  },
  {
    question: "How much does a safe room cost?",
    answer:
      "Our shelters start at $7,000. Final pricing depends on size, site conditions, and any custom options. All quotes are free with no obligation.",
  },
  {
    question: "Are your shelters FEMA rated?",
    answer:
      "Every Michigan Safe Rooms unit is engineered to meet FEMA P-320 standards, which specify performance requirements for safe rooms against extreme wind events.",
  },
  {
    question: "What areas of Michigan do you serve?",
    answer:
      "We install throughout lower Michigan. Based in the Durand area, we regularly serve greater Lansing, Flint, Grand Rapids, Saginaw, Ann Arbor, Kalamazoo, Battle Creek, and surrounding communities. Contact us to confirm your area.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "We want to make sure cost isn't a barrier to protecting your family. Contact us to discuss your situation and we'll work with you on timing and payment.",
  },
  {
    question: "What is a FEMA hazard mitigation grant and do I qualify?",
    answer:
      "FEMA's Hazard Mitigation Grant Program (HMGP) and Flood Mitigation Assistance (FMA) programs can cover up to 75% of safe room installation costs for qualifying homeowners in declared disaster areas. Michigan has been an active participant in these programs. Eligibility depends on your county and current grant cycles — ask us when you call and we'll point you toward the right resources.",
  },
  {
    question: "Can a safe room be installed in a garage?",
    answer:
      "Absolutely — the garage is actually one of the most popular and practical locations for a safe room. It provides easy access from the home, usually has a concrete slab that allows for secure anchoring, and keeps the unit out of your living space entirely. We assess your garage during the free consultation and recommend the best placement.",
  },
  {
    question: "What makes Michigan Safe Rooms different from national companies?",
    answer:
      "We're a Michigan-based, family-owned operation — not a national franchise dispatching subcontractors from out of state. When you call, you're talking to Aaron, the owner and installer. We know Michigan's permit requirements, soil conditions, and storm patterns. We can often schedule installs faster than national companies, and we stand behind every job personally. You won't get lost in a customer service queue.",
  },
  {
    question: "Can I get a safe room installed before tornado season?",
    answer:
      "Yes — and we strongly encourage it. Michigan tornado season runs roughly April through August, and install slots fill up quickly as storm season approaches. Most installations take a single day, so even a late-spring inquiry can get you covered before the peak risk window. Contact us today to check availability.",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Michigan Safe Rooms",
              url: "https://michigansaferooms.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Durand, MI",
                addressLocality: "Durand",
                addressRegion: "MI",
                postalCode: "48429",
                addressCountry: "US",
              },
              areaServed: [
                "Ingham County, MI", "Genesee County, MI", "Kent County, MI",
                "Saginaw County, MI", "Washtenaw County, MI", "Kalamazoo County, MI",
                "Jackson County, MI", "Bay County, MI", "Midland County, MI",
                "Ottawa County, MI", "Muskegon County, MI", "Grand Traverse County, MI",
                "Shiawassee County, MI", "Clinton County, MI", "Eaton County, MI",
                "Barry County, MI", "Ionia County, MI", "Montcalm County, MI",
              ],
              openingHours: "Mo-Fr 08:00-18:00",
              description:
                "Michigan's dedicated safe room installer. FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation.",
              priceRange: "$$$",
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Safe Room Installation Michigan",
              provider: {
                "@type": "LocalBusiness",
                name: "Michigan Safe Rooms",
                url: "https://michigansaferooms.com",
              },
              areaServed: "Lower Michigan",
              description:
                "Professional design, fabrication, and installation of FEMA P-320 compliant steel safe rooms for Michigan homeowners. EF5-rated against 250 MPH winds.",
              serviceType: "Safe Room Installation",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]),
        }}
      />

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

          <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">
            EF5-Rated | 250 MPH Tested | FEMA Compliant
          </p>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only dedicated safe room installer based in mid-Michigan. We fabricate, deliver, and install — everything included.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a
              href="#contact"
              className="bg-brand-accent hover:opacity-90 text-white font-bold px-10 py-4 rounded-lg transition-opacity text-lg"
            >
              Get a Free Quote
            </a>
          </div>

          <p className="text-blue-200 text-sm mt-2 mb-16">
            Serving: Lansing • Flint • Grand Rapids • Saginaw • Ann Arbor • Kalamazoo + all lower Michigan
          </p>

          {/* Trust stat */}
          <div className="text-center">
            <div className="font-heading text-5xl sm:text-6xl font-extrabold text-brand-accent">
              Lifetime
            </div>
            <div className="text-sm text-blue-200 mt-2 uppercase tracking-widest font-semibold">
              Structural Warranty
            </div>
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
                body: "We discuss your home, walk through your options, and answer every question — at no cost and with no obligation. Getting started is as simple as a conversation.",
              },
              {
                step: "02",
                title: "Deposit & Installation Scheduled",
                body: "We collect a deposit and coordinate everything needed on our end and yours — permits, site prep details, and scheduling — so your install day goes smoothly.",
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

      <TestimonialsSection />

      <PricingSection />

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

          <ContactForm />
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
      <AboutSection />
    </>
  );
}
