import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Safe Room & Storm Shelter Blog — Michigan",
  description:
    "Expert guides on safe rooms, storm shelters, FEMA compliance, and weather preparedness for Michigan homeowners. City-specific pricing, installation tips, and local contractor advice.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* ── Blog header banner ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0b1929] via-brand to-[#1a3a6e] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-3">
            Resource Library
          </p>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white mb-4">
            Michigan Safe Room Blog
          </h1>
          <p className="text-blue-100 max-w-2xl text-lg leading-relaxed">
            Everything Michigan homeowners need to know about safe rooms, FEMA grants, and
            local installation costs — updated regularly.
          </p>
        </div>
      </section>

      {/* ── Post listing ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-20">
            Posts coming soon. Check back shortly!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border-l-4 border-brand-accent rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-50 text-brand-light px-2 py-0.5 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-heading text-2xl font-bold uppercase text-gray-900 mb-2 leading-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-brand-light transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-400" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-accent text-sm font-bold hover:opacity-80 transition-opacity"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
