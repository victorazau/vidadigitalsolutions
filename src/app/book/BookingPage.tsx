"use client"

import { useEffect } from "react"
import { AutoLocaleProvider as LocaleProvider } from "@/components/AutoLocaleProvider"
import { useLocale } from "@/lib/locale-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"

const text = {
  en: {
    label: "Book a Call",
    headline: "Let's talk about your business.",
    sub: "Free 30-minute discovery call · No commitment",
  },
  pt: {
    label: "Agendar",
    headline: "Vamos conversar sobre seu negócio.",
    sub: "Discovery call gratuita de 30 minutos · Sem compromisso",
  },
  es: {
    label: "Reservar",
    headline: "Hablemos sobre tu negocio.",
    sub: "Discovery call gratuita de 30 minutos · Sin compromiso",
  },
}

function BookingContent() {
  const { locale } = useLocale()
  const t = text[locale]

  useEffect(() => {
    // Load the GHL form embed script
    if (!document.getElementById("ghl-form-embed")) {
      const script = document.createElement("script")
      script.id = "ghl-form-embed"
      script.src = "https://link.vidadigitalsolutions.com/js/form_embed.js"
      script.type = "text/javascript"
      document.body.appendChild(script)
    }
  }, [])

  return (
    <>
      <Header />

      {/* Hero header */}
      <div className="bg-[#060D1C] pt-28 pb-12 px-6 text-center relative overflow-hidden">
        {/* Stars */}
        {[
          { top: "10%", left: "15%", s: 1.5, o: 0.4 },
          { top: "25%", left: "80%", s: 1, o: 0.3 },
          { top: "60%", left: "90%", s: 1.5, o: 0.35 },
          { top: "70%", left: "8%", s: 1, o: 0.5 },
          { top: "40%", left: "50%", s: 1, o: 0.25 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ top: s.top, left: s.left, width: s.s, height: s.s, opacity: s.o }}
          />
        ))}
        {/* Aurora glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,47,94,0.3) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,196,160,0.15) 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#00C4A0] mb-3">
            {t.label}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.04em]">
            {t.headline}
          </h1>
          <p className="mt-3 text-[#94A3B8] text-base font-light">
            {t.sub}
          </p>
        </div>
      </div>

      {/* Calendar embed */}
      <div className="bg-white py-8 md:py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <iframe
            src="https://link.vidadigitalsolutions.com/widget/booking/CODDDsQrswemB6LxkMRN"
            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
            scrolling="no"
            id="CODDDsQrswemB6LxkMRN_1775414183529"
            title="Book a call with Vida Digital Solutions"
          />
        </div>
      </div>

      <Footer />
    </>
  )
}

export function BookingPage() {
  return (
    <LocaleProvider>
      <BookingContent />
    </LocaleProvider>
  )
}
