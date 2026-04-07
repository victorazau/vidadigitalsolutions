import { getPostBySlug, getAllSlugs, getRelatedPosts, getCategoryCounts, getAdjacentPosts } from "@/lib/posts"
import { BlogPostPage } from "./BlogPostPage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  // Deduplicate slugs (same slug across langs)
  const seen = new Set<string>()
  return slugs
    .filter((s) => {
      if (seen.has(s.slug)) return false
      seen.add(s.slug)
      return true
    })
    .map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, "en") || getPostBySlug(slug, "pt") || getPostBySlug(slug, "es")

  if (!post) return { title: "Not Found" }

  return {
    title: `${post.title} | Vida Digital Solutions`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Vida Digital Solutions"],
      tags: post.keywords,
    },
    alternates: {
      canonical: `https://vidadigitalsolutions.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Get post in all langs
  const postEN = getPostBySlug(slug, "en")
  const postPT = getPostBySlug(slug, "pt")
  const postES = getPostBySlug(slug, "es")

  if (!postEN && !postPT && !postES) {
    notFound()
  }

  const mainPost = postEN || postPT || postES!

  const relatedEN = getRelatedPosts(slug, mainPost.category, "en")
  const relatedPT = getRelatedPosts(slug, mainPost.category, "pt")
  const relatedES = getRelatedPosts(slug, mainPost.category, "es")

  const countsEN = getCategoryCounts("en")
  const countsPT = getCategoryCounts("pt")
  const countsES = getCategoryCounts("es")

  const adjEN = getAdjacentPosts(slug, "en")
  const adjPT = getAdjacentPosts(slug, "pt")
  const adjES = getAdjacentPosts(slug, "es")

  // Extract FAQ from content (lines with **Q:** and **A:**)
  const faqItems: { question: string; answer: string }[] = [];
  const lines = mainPost.content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("**Q:**")) {
      const question = line.replace(/\*\*Q:\*\*\s*/, "").trim();
      const nextLine = lines[i + 1] || "";
      const answer = nextLine.replace(/\*\*A:\*\*\s*/, "").trim();
      if (question && answer) {
        faqItems.push({ question, answer });
      }
    }
  }

  // JSON-LD Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mainPost.title,
    description: mainPost.description,
    datePublished: mainPost.date,
    author: {
      "@type": "Organization",
      name: "Vida Digital Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "Vida Digital Solutions LLC",
      url: "https://vidadigitalsolutions.com",
    },
  }

  // JSON-LD FAQPage (if article has FAQ)
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostPage
        postEN={postEN}
        postPT={postPT}
        postES={postES}
        relatedEN={relatedEN}
        relatedPT={relatedPT}
        relatedES={relatedES}
        countsEN={countsEN}
        countsPT={countsPT}
        countsES={countsES}
        adjEN={adjEN}
        adjPT={adjPT}
        adjES={adjES}
      />
    </>
  )
}
