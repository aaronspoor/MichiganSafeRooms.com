import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://michigansaferooms.com";

const CITY_SLUGS = [
  "lansing", "flint", "grand-rapids", "saginaw", "jackson",
  "bay-city", "midland", "holland", "muskegon", "traverse-city",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...postRoutes];
}
