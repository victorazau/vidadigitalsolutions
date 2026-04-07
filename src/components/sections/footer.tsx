"use client"

import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"

const linkHrefs = ["/#services", "/#cases", "/#process", "/blog", "https://quasarcrm.com", "/#contact"]

export function Footer() {
  const { locale } = useLocale()
  const t = content[locale].footer

  return (
    <footer className="bg-[#060D1C] px-6">
      {/* Main row */}
      <div className="mx-auto max-w-6xl py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-h-white.png"
            alt="Vida Digital Solutions"
            width={160}
            height={36}
            className="h-7 md:h-8 w-auto"
            unoptimized
          />
          <div className="hidden sm:block w-px h-8 bg-[#4B6CB7]/20 mx-3" />
          <span className="hidden sm:block text-[11px] text-[#2a4a7a] tracking-[0.2em]">
            {t.tagline}
          </span>
        </div>

        {/* Nav links — grid on mobile, flex on desktop */}
        <nav className="grid grid-cols-3 gap-x-6 gap-y-3 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2">
          {t.links.map((label, i) => (
            <a
              key={i}
              href={linkHrefs[i]}
              className="text-[12px] text-[#2a4a7a] hover:text-white transition-colors"
              {...(linkHrefs[i].startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom row */}
      <div className="mx-auto max-w-6xl border-t border-[#4B6CB7]/10 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Legal + policy links */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <p className="text-[11px] text-[#2a4a7a] leading-relaxed">
            {t.legal}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="hidden md:inline text-[#4B6CB7]/20">|</span>
            <a href="/terms" className="text-[11px] text-[#2a4a7a] hover:text-white transition-colors">
              {locale === "pt" ? "Termos" : locale === "es" ? "Términos" : "Terms"}
            </a>
            <a href="/privacy" className="text-[11px] text-[#2a4a7a] hover:text-white transition-colors">
              {locale === "pt" ? "Privacidade" : locale === "es" ? "Privacidad" : "Privacy"}
            </a>
            <a href="/cookies" className="text-[11px] text-[#2a4a7a] hover:text-white transition-colors">
              Cookies
            </a>
            <button
              onClick={() => {
                document.cookie = "vds_cookie_consent=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                window.location.reload();
              }}
              className="text-[11px] text-[#2a4a7a] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {locale === "pt" ? "Config. Cookies" : locale === "es" ? "Config. Cookies" : "Cookie Settings"}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-[#2a4a7a]">
          © {new Date().getFullYear()} Vida Digital Solutions LLC. {locale === "pt" ? "Todos os direitos reservados." : locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
