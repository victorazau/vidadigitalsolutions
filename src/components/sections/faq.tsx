"use client"

import { useState } from "react"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function FAQ() {
  const { locale } = useLocale()
  const t = content[locale].faq
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-[640px]">
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
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] mb-12 text-center"
        >
          {t.headline}
        </motion.h2>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {t.items.map((item, i) => {
            const isOpen = openIndex === i
            const isFirst = i === 0

            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  isOpen
                    ? "bg-[#EEF2FF] border-[#1B2F5E]/20"
                    : "bg-white border-[#E2E8F0]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0F]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-[14px] text-[#475569] leading-relaxed">
                          {item.a}
                        </p>
                        {"cta" in item && item.cta && (
                          <a
                            href="#contact"
                            className="inline-block mt-4 text-[13px] font-medium text-[#1B2F5E] hover:text-[#4B6CB7] transition-colors"
                          >
                            {item.cta}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
