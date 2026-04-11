import { BrasilLinksPage } from "./BrasilLinksPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  icons: { icon: "/logos/fav-icon-vida-mkt.png", apple: "/logos/fav-icon-vida-mkt.png" },
  title: "Vida Marketing | Links",
  description: "Links da Vida Marketing — WhatsApp, site, cases, redes sociais e mais.",
}

export default function BrasilLinks() {
  return <BrasilLinksPage />
}
