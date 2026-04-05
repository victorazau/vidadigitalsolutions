import { getLegalPage } from "@/lib/legal"
import { LegalPageView } from "@/components/blog/LegalPageView"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Vida Digital Solutions",
  description: "Cookie Policy for Vida Digital Solutions LLC — how we use cookies and tracking technologies on our website.",
}

export default function CookiesPage() {
  const page = getLegalPage("cookie-policy.mdx")
  return <LegalPageView title={page.title} content={page.content} />
}
