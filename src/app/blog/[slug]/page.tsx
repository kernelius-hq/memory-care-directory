import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  // Simple markdown-to-html (handles ##, ###, **, -, |)
  const htmlContent = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("### "))
        return `<h3 class="text-xl font-semibold mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("## "))
        return `<h2 class="text-2xl font-bold mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("- **"))
        return `<li class="ml-4 mb-2">${line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
      if (line.startsWith("- "))
        return `<li class="ml-4 mb-1">${line.slice(2)}</li>`;
      if (line.startsWith("| "))
        return ""; // Skip table rows for simplicity
      if (line.startsWith("1. ") || /^\d+\. /.test(line))
        return `<li class="ml-4 mb-2 list-decimal">${line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
      if (line.trim() === "") return "<br/>";
      return `<p class="mb-4 leading-relaxed">${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("\n");

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
            <p className="text-sm text-gray-400 mb-8">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {/* Related Posts */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-sm text-gray-900 hover:text-primary transition-colors mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <LeadForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
