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
        width={36}
        height={36}
        className={`${className} object-contain`}
        unoptimized
        loading="lazy"
      />
    )
  }
}

// All icons as PNG images — just drop files in /public/icons/
// mobileOnly: false means hidden on mobile to improve performance
const allIcons = [
  { id: 1, icon: PngIcon({ src: "/icons/ghl.png", alt: "GoHighLevel" }), className: "top-[8%] left-[8%]", mobile: true },
  { id: 2, icon: PngIcon({ src: "/icons/stripe.png", alt: "Stripe" }), className: "top-[12%] right-[12%]", mobile: true },
  { id: 3, icon: PngIcon({ src: "/icons/clickup.png", alt: "ClickUp" }), className: "top-[5%] left-[35%]", mobile: false },
  { id: 4, icon: PngIcon({ src: "/icons/n8n.png", alt: "n8n" }), className: "top-[22%] right-[25%]", mobile: true },
  { id: 5, icon: PngIcon({ src: "/icons/whatsapp.png", alt: "WhatsApp" }), className: "top-[55%] left-[5%]", mobile: true },
  { id: 6, icon: PngIcon({ src: "/icons/meta.png", alt: "Meta" }), className: "top-[30%] left-[8%]", mobile: false },
  { id: 7, icon: PngIcon({ src: "/icons/gmail.png", alt: "Gmail" }), className: "top-[5%] right-[40%]", mobile: true },
  { id: 8, icon: PngIcon({ src: "/icons/google-calendar.png", alt: "Google Calendar" }), className: "bottom-[15%] left-[15%]", mobile: false },
  { id: 9, icon: PngIcon({ src: "/icons/linkedin.png", alt: "LinkedIn" }), className: "top-[18%] right-[6%]", mobile: true },
  { id: 10, icon: PngIcon({ src: "/icons/youtube.png", alt: "YouTube" }), className: "top-[60%] left-[28%]", mobile: false },
  { id: 11, icon: PngIcon({ src: "/icons/tiktok.png", alt: "TikTok" }), className: "bottom-[8%] right-[10%]", mobile: true },
  { id: 12, icon: PngIcon({ src: "/icons/notion.png", alt: "Notion" }), className: "top-[48%] right-[5%]", mobile: false },
  { id: 13, icon: PngIcon({ src: "/icons/canva.png", alt: "Canva" }), className: "bottom-[10%] left-[40%]", mobile: false },
  { id: 14, icon: PngIcon({ src: "/icons/slack.png", alt: "Slack" }), className: "bottom-[20%] right-[28%]", mobile: false },
  { id: 15, icon: PngIcon({ src: "/icons/asaas.png", alt: "Asaas" }), className: "top-[75%] right-[18%]", mobile: false },
  { id: 16, icon: PngIcon({ src: "/icons/google.png", alt: "Google" }), className: "bottom-[5%] left-[8%]", mobile: true },
  { id: 17, icon: PngIcon({ src: "/icons/zapsign.png", alt: "ZapSign" }), className: "top-[40%] left-[18%]", mobile: false },
  { id: 18, icon: PngIcon({ src: "/icons/shopify.png", alt: "Shopify" }), className: "top-[70%] left-[50%]", mobile: false },
]

export function Hero() {
  const { locale } = useLocale()
  const text = t(locale)

  // Filter icons based on screen size — uses CSS to hide, but also reduces DOM on mobile
  const toolIcons: FloatingIconsHeroProps["icons"] = allIcons.map((icon) => ({
    id: icon.id,
    icon: icon.icon,
    className: icon.mobile
      ? icon.className
      : `${icon.className} hidden md:block`,
  }))

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
