"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { MessageCircle, CalendarDays } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function CTAFinal() {
  const { locale } = useLocale()
  const t = content[locale].ctaFinal

  return (
    <AuroraBackground className="py-28 px-6" starCount={60}>
      <section id="contact" className="mx-auto max-w-2xl text-center">
        {/* Label */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#4B6CB7] mb-4"
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
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-white"
        >
          {t.headline}
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-[16px] text-[#94A3B8] font-light"
        >
          {t.sub}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/14382985740"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t.whatsapp}
          </a>
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-lg border border-[#2a3a5a] text-white hover:bg-white/5 transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            {t.schedule}
          </a>
        </motion.div>
      </section>
    </AuroraBackground>
  )
}
