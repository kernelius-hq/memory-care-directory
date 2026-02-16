import { MetadataRoute } from "next";
import { listings, getStates, getCitiesByState } from "@/data/listings";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://memorycarefind.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const states = getStates();
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/states`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/get-started`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // State pages
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${BASE_URL}/${state.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = states.flatMap((state) =>
    getCitiesByState(state.slug).map((city) => ({
      url: `${BASE_URL}/${state.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  );

  // Individual listing pages
  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${BASE_URL}/${listing.stateSlug}/${listing.citySlug}/${listing.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...statePages, ...cityPages, ...listingPages, ...blogPages];
}
