"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import Image from "next/image"

const clients = [
  { name: "Azul Viagens", logo: "/logos/logo-azul-viagens.png" },
  { name: "Astride US", logo: "/logos/logo-astride.png" },
  { name: "Vieira Cleaning", logo: "/logos/logo-vieira-cleaning.png" },
  { name: "Avanti Imóveis", logo: "/logos/logo-avanti-imoveis.png" },
  { name: "APLAC+", logo: "/logos/logo-aplac-mais.png" },
]

// Double the array for seamless loop
const marqueeItems = [...clients, ...clients]

export function LogoBar() {
  const { locale } = useLocale()
  const text = content[locale].logoBar

  return (
    <section className="bg-[#060D1C] py-12 overflow-hidden">
      <p className="text-center text-[11px] font-medium tracking-[0.14em] uppercase text-white mb-8">
        {text.label}
      </p>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060D1C] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060D1C] to-transparent z-10" />

        {/* Marquee track */}
        <div className="flex animate-marquee">
          {marqueeItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center grayscale brightness-75 opacity-40 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all duration-500"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
