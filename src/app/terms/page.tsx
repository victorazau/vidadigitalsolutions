import { getLegalPage } from "@/lib/legal"
import { LegalPageView } from "@/components/blog/LegalPageView"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Vida Digital Solutions",
  description: "Terms and Conditions for Vida Digital Solutions LLC — GoHighLevel implementation and CRM automation services.",
}

export default function TermsPage() {
  const page = getLegalPage("terms-of-service.mdx")
  return <LegalPageView title={page.title} content={page.content} />
}
