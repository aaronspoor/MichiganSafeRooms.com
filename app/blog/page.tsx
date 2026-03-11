import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Safe Room & Storm Shelter Blog — Michigan",
  description:
    "Expert guides on safe rooms, storm shelters, FEMA compliance, and tornado preparedness for Michigan homeowners. City-specific pricing, installation tips, and local contractor advice.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-12 border-b pb-8">
        <p className="text-brand-light text-sm font-semibold uppercase tracking-widest mb-2">
          Resource Library
        </p>
        <h1 className="text-4xl font-extrabold text-brand mb-4">
          Michigan Safe Room & Storm Shelter Blog
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Everything Michigan homeowners need to know about safe rooms, storm
          shelters, tornado preparedness, FEMA grants, and local installation
          costs — updated regularly.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          Posts coming soon. Check back shortly!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">
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
                  className="text-brand-light text-sm font-semibold hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
