import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Dementia Care Blog - Guides & Resources",
  description:
    "Expert articles on dementia care, Alzheimer's support, caregiver tips, and memory care resources for families.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Blog" }]} />
      <h1 className="text-3xl font-bold mb-2">Dementia Care Blog</h1>
      <p className="text-gray-500 mb-10">
        Expert guides and resources to help families navigate dementia and
        memory care.
      </p>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-400 mb-3">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
