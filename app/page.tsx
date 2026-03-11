import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Michigan Safe Rooms | FEMA-Compliant Storm Shelters",
  description:
    "Find trusted safe room and storm shelter contractors across Michigan. FEMA-compliant installation, local pricing guides, and expert advice for Michigan homeowners.",
};

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6">
            Michigan's Safe Room Resource
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Protect Your Family with a{" "}
            <span className="text-brand-accent">FEMA-Compliant Safe Room</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Michigan tornado season is real. Find local safe room contractors,
            pricing guides, and storm shelter resources — all specific to
            Michigan homeowners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-brand-accent hover:opacity-90 text-white font-bold px-8 py-3 rounded-lg transition-opacity"
            >
              Read the Blog →
            </Link>
            <a
              href="mailto:aaronspoorconstruction@gmail.com"
              className="border-2 border-white text-white hover:bg-white hover:text-brand font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-gray-50 border-b py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-gray-600 font-medium">
          <span>✅ FEMA Compliant Installations</span>
          <span>✅ Michigan-Licensed Contractors</span>
          <span>✅ Free Site Assessments</span>
          <span>✅ Financing Available</span>
        </div>
      </section>

      {/* Why a safe room */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-brand text-center mb-12">
          Why Michigan Homeowners Need a Safe Room
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: "🌪️",
              title: "Tornado Risk Is Real",
              body: "Michigan averages 15+ tornadoes per year. Southwest Michigan — including Kalamazoo, Battle Creek, and Grand Rapids — sits in a known tornado corridor.",
            },
            {
              icon: "🏠",
              title: "Protect What Matters",
              body: "A FEMA-rated safe room can withstand 250+ mph winds and EF5 tornado debris impact. Give your family the 30 seconds they need to get to safety.",
            },
            {
              icon: "💰",
              title: "Grants Available",
              body: "FEMA's Hazard Mitigation Grant Program covers up to 75% of installation costs for eligible Michigan homeowners. We'll help you navigate the application.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-brand mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent blog posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-brand">
                Latest from the Blog
              </h2>
              <Link
                href="/blog"
                className="text-brand-light font-medium hover:underline text-sm"
              >
                View all posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-wrap gap-1 mb-3">
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
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center px-4 py-16">
        <h2 className="text-3xl font-bold text-brand mb-4">
          Ready to Get Protected?
        </h2>
        <p className="text-gray-600 mb-8">
          Connect with a Michigan-licensed safe room contractor for a free site
          assessment and quote.
        </p>
        <a
          href="mailto:aaronspoorconstruction@gmail.com"
          className="inline-block bg-brand text-white font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg"
        >
          Email Us for a Free Quote
        </a>
      </section>
    </>
  );
}
