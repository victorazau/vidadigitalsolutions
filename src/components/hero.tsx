"use client"

import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from "@/components/ui/floating-icons-hero-section"
import Image from "next/image"

// Icon component that renders a PNG from /public/icons/
function PngIcon({ src, alt }: { src: string; alt: string }) {
  return function IconComponent({ className }: { className?: string }) {
    return (
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className={`${className} object-contain`}
        unoptimized
      />
    )
  }
}

// All icons as PNG images — just drop files in /public/icons/
const toolIcons: FloatingIconsHeroProps["icons"] = [
  { id: 1, icon: PngIcon({ src: "/icons/ghl.png", alt: "GoHighLevel" }), className: "top-[8%] left-[8%]" },
  { id: 2, icon: PngIcon({ src: "/icons/stripe.png", alt: "Stripe" }), className: "top-[12%] right-[12%]" },
  { id: 3, icon: PngIcon({ src: "/icons/clickup.png", alt: "ClickUp" }), className: "top-[5%] left-[35%]" },
  { id: 4, icon: PngIcon({ src: "/icons/n8n.png", alt: "n8n" }), className: "top-[22%] right-[25%]" },
  { id: 5, icon: PngIcon({ src: "/icons/whatsapp.png", alt: "WhatsApp" }), className: "top-[55%] left-[5%]" },
  { id: 6, icon: PngIcon({ src: "/icons/meta.png", alt: "Meta" }), className: "top-[30%] left-[8%]" },
  { id: 7, icon: PngIcon({ src: "/icons/gmail.png", alt: "Gmail" }), className: "top-[5%] right-[40%]" },
  { id: 8, icon: PngIcon({ src: "/icons/google-calendar.png", alt: "Google Calendar" }), className: "bottom-[15%] left-[15%]" },
  { id: 9, icon: PngIcon({ src: "/icons/linkedin.png", alt: "LinkedIn" }), className: "top-[18%] right-[6%]" },
  { id: 10, icon: PngIcon({ src: "/icons/youtube.png", alt: "YouTube" }), className: "top-[60%] left-[28%]" },
  { id: 11, icon: PngIcon({ src: "/icons/tiktok.png", alt: "TikTok" }), className: "bottom-[8%] right-[10%]" },
  { id: 12, icon: PngIcon({ src: "/icons/notion.png", alt: "Notion" }), className: "top-[48%] right-[5%]" },
  { id: 13, icon: PngIcon({ src: "/icons/canva.png", alt: "Canva" }), className: "bottom-[10%] left-[40%]" },
  { id: 14, icon: PngIcon({ src: "/icons/slack.png", alt: "Slack" }), className: "bottom-[20%] right-[28%]" },
  { id: 15, icon: PngIcon({ src: "/icons/asaas.png", alt: "Asaas" }), className: "top-[75%] right-[18%]" },
  { id: 16, icon: PngIcon({ src: "/icons/google.png", alt: "Google" }), className: "bottom-[5%] left-[8%]" },
  { id: 17, icon: PngIcon({ src: "/icons/zapsign.png", alt: "ZapSign" }), className: "top-[40%] left-[18%]" },
  { id: 18, icon: PngIcon({ src: "/icons/shopify.png", alt: "Shopify" }), className: "top-[70%] left-[50%]" },
]

export function Hero() {
  const { locale } = useLocale()
  const text = t(locale)

  return (
    <FloatingIconsHero
      className="bg-white"
      title={text.hero.headline}
      titleAccent={text.hero.headlineAccent}
      subtitle=""
      ctaText={text.hero.cta}
      ctaHref="/book"
      ctaSecondaryText=""
      ctaSecondaryHref=""
      icons={toolIcons}
    />
  )
}
