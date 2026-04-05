import { getLegalPage } from "@/lib/legal"
import { LegalPageView } from "@/components/blog/LegalPageView"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Vida Digital Solutions",
  description: "Privacy Policy for Vida Digital Solutions LLC — GDPR, LGPD, and CCPA compliant data protection policy.",
}

export default function PrivacyPage() {
  const page = getLegalPage("privacy-policy.mdx")
  return <LegalPageView title={page.title} content={page.content} />
}
