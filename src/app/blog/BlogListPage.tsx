"use client"

import { useLocale } from "@/lib/locale-context"
import { LocaleProvider } from "@/lib/locale-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { BlogList } from "@/components/blog/BlogList"
import type { PostMeta } from "@/lib/posts"

export function BlogListPage({
  postsEN,
  postsPT,
  postsES,
}: {
  postsEN: PostMeta[]
  postsPT: PostMeta[]
  postsES: PostMeta[]
}) {
  return (
    <LocaleProvider>
      <Header />
      <BlogListInner postsEN={postsEN} postsPT={postsPT} postsES={postsES} />
      <Footer />
    </LocaleProvider>
  )
}

function BlogListInner({
  postsEN,
  postsPT,
  postsES,
}: {
  postsEN: PostMeta[]
  postsPT: PostMeta[]
  postsES: PostMeta[]
}) {
  const { locale } = useLocale()
  const posts = locale === "pt" ? postsPT : locale === "es" ? postsES : postsEN

  return <BlogList posts={posts} />
}
