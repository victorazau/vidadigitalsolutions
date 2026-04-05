"use client"

import { useLocale } from "@/lib/locale-context"
import { LocaleProvider } from "@/lib/locale-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { BlogPostView } from "@/components/blog/BlogPost"
import type { Post, PostMeta } from "@/lib/posts"

interface Props {
  postEN: Post | null
  postPT: Post | null
  postES: Post | null
  relatedEN: PostMeta[]
  relatedPT: PostMeta[]
  relatedES: PostMeta[]
  countsEN: Record<string, number>
  countsPT: Record<string, number>
  countsES: Record<string, number>
  adjEN: { prev: PostMeta | null; next: PostMeta | null }
  adjPT: { prev: PostMeta | null; next: PostMeta | null }
  adjES: { prev: PostMeta | null; next: PostMeta | null }
}

export function BlogPostPage(props: Props) {
  return (
    <LocaleProvider>
      <Header />
      <BlogPostInner {...props} />
      <Footer />
    </LocaleProvider>
  )
}

function BlogPostInner({
  postEN, postPT, postES,
  relatedEN, relatedPT, relatedES,
  countsEN, countsPT, countsES,
  adjEN, adjPT, adjES,
}: Props) {
  const { locale } = useLocale()

  const post = locale === "pt" ? postPT : locale === "es" ? postES : postEN
  const fallback = postEN || postPT || postES

  if (!post && !fallback) return null

  const current = post || fallback!
  const related = locale === "pt" ? relatedPT : locale === "es" ? relatedES : relatedEN
  const counts = locale === "pt" ? countsPT : locale === "es" ? countsES : countsEN
  const adj = locale === "pt" ? adjPT : locale === "es" ? adjES : adjEN

  // If no post in current locale, use fallback related/counts
  const finalRelated = related.length > 0 ? related : relatedEN
  const finalCounts = Object.keys(counts).length > 0 ? counts : countsEN

  return (
    <BlogPostView
      post={current}
      relatedPosts={finalRelated}
      categoryCounts={finalCounts}
      prevPost={adj.prev}
      nextPost={adj.next}
    />
  )
}
