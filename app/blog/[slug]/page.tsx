import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/posts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const description = post.metaDescription || post.excerpt;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `https://michigansaferooms.com/blog/${post.slug}`,
      tags: post.tags,
    },
    alternates: {
      canonical: `https://michigansaferooms.com/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) notFound();

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Michigan Safe Rooms",
      url: "https://michigansaferooms.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Michigan Safe Rooms",
      url: "https://michigansaferooms.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://michigansaferooms.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Post header banner ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0b1929] via-brand to-[#1a3a6e] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-blue-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {" / "}
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            {" / "}
            <span className="text-blue-100">{post.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/10 border border-white/20 text-brand-accent px-2.5 py-1 rounded font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-blue-200">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>Michigan Safe Rooms Editorial Team</span>
          </div>
        </div>
      </section>

      {/* ── Post body ──────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Excerpt / lede */}
        <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-brand-accent pl-4">
          {post.excerpt}
        </p>

        {/* Body */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* CTA Box */}
        <div className="mt-14 bg-gradient-to-br from-brand to-[#1a3a6e] rounded-xl p-8 text-center text-white">
          <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight mb-3">
            Ready to Install a Safe Room?
          </h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto leading-relaxed">
            Get a free quote from our team. We serve all major Michigan cities and counties —
            fast install times, lifetime structural warranty.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-brand-accent text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get a Free Quote
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-brand-light hover:underline font-semibold">
            ← Back to all articles
          </Link>
        </div>
      </div>
    </>
  );
}
