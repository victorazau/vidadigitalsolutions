"use client"

import { useEffect } from "react"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { Zap, Globe } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function VdsIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 44 44" fill="none" className={className}>
      <polygon points="22,3 13,22 31,22" fill="#1B2F5E" />
      <polygon points="4,41 22,41 13,22" fill="#00C4A0" />
      <polygon points="40,41 31,22 22,41" fill="#4B6CB7" />
    </svg>
  )
}

const cardIcons = [
  ({ className }: { className?: string }) => (
    <div className={className}><VdsIcon /></div>
  ),
  ({ className }: { className?: string }) => <Zap className={className} />,
  ({ className }: { className?: string }) => <Globe className={className} />,
]

export function Services() {
  const { locale } = useLocale()
  const t = content[locale].services

  // Mouse tracking for spotlight
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card')
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      const card = mouseEvent.currentTarget as HTMLElement
      const rect = card.getBoundingClientRect()
      const x = ((mouseEvent.clientX - rect.left) / rect.width * 100).toFixed(1) + '%'
      const y = ((mouseEvent.clientY - rect.top) / rect.height * 100).toFixed(1) + '%'
      card.style.setProperty('--mx', x)
      card.style.setProperty('--my', y)
    }
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove)
    })
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove)
      })
    }
  }, [])

  return (
    <section id="services" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center"
        >
          {t.label}
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] max-w-3xl text-center mx-auto"
        >
          {t.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-[#475569] max-w-2xl font-light leading-relaxed mb-14 text-center mx-auto"
        >
          {t.subheadline}
        </motion.p>

        {/* 3 spotlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {t.cards.map((card, i) => {
            const isHighlight = i === 1
            const IconComp = cardIcons[i]

            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`service-card ${isHighlight ? "featured" : ""} flex flex-col`}
                style={isHighlight ? { paddingTop: "36px" } : undefined}
              >
                <div className="glow-layer" />

                {/* Badge for featured card */}
                {isHighlight && (
                  <div
                    className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-[#1B2F5E] text-white text-[9px] font-extrabold tracking-[0.14em] uppercase px-3.5 py-1 rounded-full whitespace-nowrap z-10"
                  >
                    {t.mostRequested}
                  </div>
                )}

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center bg-[#1B2F5E]/5 border border-[#1B2F5E]/10">
                  <IconComp className="w-5 h-5 text-[#1B2F5E]" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-extrabold text-[#0A0A0F] mb-2.5 tracking-[-0.02em]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#64748B] leading-relaxed mb-5 flex-1">
                  {card.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#1B2F5E]/[0.08] mb-4" />

                {/* CTA / Price */}
                {i === 2 ? (
                  <a
                    href="https://quasarcrm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#4B6CB7] hover:text-[#1B2F5E] transition-colors"
                  >
                    {card.price} →
                  </a>
                ) : (
                  <span className="text-xs font-medium text-[#1B2F5E]">
                    {card.price}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer quote */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-[15px] italic text-[#475569]"
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  )
}
