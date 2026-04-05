import { getAllPosts } from "@/lib/posts"
import { BlogListPage } from "./BlogListPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Vida Digital Solutions",
  description: "Articles on GoHighLevel, CRM automation, business integrations and RevOps. Weekly insights to help your business scale.",
}

export default function BlogPage() {
  const postsEN = getAllPosts("en")
  const postsPT = getAllPosts("pt")
  const postsES = getAllPosts("es")

  return <BlogListPage postsEN={postsEN} postsPT={postsPT} postsES={postsES} />
}
