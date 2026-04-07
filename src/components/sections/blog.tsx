"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const articles: Record<string, { title: string; category: string; slug: string; readTime: string; date: string; categoryColor: string }[]> = {
  en: [
    { title: "How to automate client onboarding with GoHighLevel in 2025", category: "GoHighLevel", slug: "how-to-automate-client-onboarding-gohighlevel", readTime: "6 min", date: "Apr 2025", categoryColor: "bg-[#1B2F5E]" },
    { title: "GoHighLevel vs HubSpot: Which CRM is right for your business?", category: "CRM", slug: "gohighlevel-vs-hubspot-which-crm", readTime: "7 min", date: "Apr 2025", categoryColor: "bg-[#4B6CB7]" },
    { title: "How a cleaning company closed clients on autopilot with CRM automation", category: "Cases", slug: "how-cleaning-company-closed-clients-automatically-crm", readTime: "5 min", date: "Apr 2025", categoryColor: "bg-[#00C4A0]" },
  ],
  pt: [
    { title: "Como automatizar o onboarding de clientes com GoHighLevel em 2025", category: "GoHighLevel", slug: "how-to-automate-client-onboarding-gohighlevel", readTime: "6 min", date: "Abr 2025", categoryColor: "bg-[#1B2F5E]" },
    { title: "GoHighLevel vs HubSpot: qual CRM é certo para o seu negócio?", category: "CRM", slug: "gohighlevel-vs-hubspot-which-crm", readTime: "7 min", date: "Abr 2025", categoryColor: "bg-[#4B6CB7]" },
    { title: "Como uma empresa de limpeza passou a fechar clientes automaticamente com CRM", category: "Cases", slug: "how-cleaning-company-closed-clients-automatically-crm", readTime: "5 min", date: "Abr 2025", categoryColor: "bg-[#00C4A0]" },
  ],
  es: [
    { title: "Cómo automatizar el onboarding de clientes con GoHighLevel en 2025", category: "GoHighLevel", slug: "how-to-automate-client-onboarding-gohighlevel", readTime: "6 min", date: "Abr 2025", categoryColor: "bg-[#1B2F5E]" },
    { title: "GoHighLevel vs HubSpot: ¿Qué CRM es el correcto para tu negocio?", category: "CRM", slug: "gohighlevel-vs-hubspot-which-crm", readTime: "7 min", date: "Abr 2025", categoryColor: "bg-[#4B6CB7]" },
    { title: "Cómo una empresa de limpieza empezó a cerrar clientes automáticamente con CRM", category: "Cases", slug: "how-cleaning-company-closed-clients-automatically-crm", readTime: "5 min", date: "Abr 2025", categoryColor: "bg-[#00C4A0]" },
  ],
}

export function Blog() {
  const { locale } = useLocale()
  const t = content[locale].blog
  const localArticles = articles[locale] || articles.en

  return (
    <section className="bg-white py-24 px-6">
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
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] mb-14 text-center"
        >
          {t.headline}
        </motion.h2>

        {/* 3 article cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {localArticles.map((article, i) => (
            <motion.a
              key={i}
              href={`/blog/${article.slug}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#1B2F5E]/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="relative h-44 bg-[#0D1B3E] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-8 w-16 h-16 rounded-full border border-white/20" />
                  <div className="absolute bottom-4 right-6 w-24 h-24 rounded-full border border-white/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-white/10" />
                </div>
                <span className={`relative z-10 text-[10px] font-medium tracking-[0.1em] uppercase text-white px-3 py-1.5 rounded-full ${article.categoryColor}`}>
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] leading-snug group-hover:text-[#1B2F5E] transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 mt-4 text-[12px] text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="/blog"
            className="text-[14px] font-medium text-[#4B6CB7] hover:text-[#1B2F5E] transition-colors"
          >
            {t.viewAll}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
