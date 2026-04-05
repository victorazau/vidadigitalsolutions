"use client"

import { useRef, useState, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion"

interface CaseItem {
  initials: string
  color: string
  name: string
  meta: string
  problem: string
  solution: string
  result: string
  quote: string
}

const casesData: Record<string, CaseItem[]> = {
  en: [
    {
      initials: "AV", color: "#1B2F5E", name: "Azul Viagens", meta: "Brazil · Aviation",
      problem: "Large volume of employees with no lead rotation and fully manual follow-up.",
      solution: "Automated lead rotation, WhatsApp/email follow-up, Meta Ads tracking, flight check-in reminders.",
      result: "Zero lost leads. 100% automated communication.",
      quote: "The structure transformed how our team acts on every sales opportunity.",
    },
    {
      initials: "AS", color: "#4B6CB7", name: "Astride US Inc.", meta: "Miami, FL · Digital Accounting",
      problem: "Sales, operations and finance on completely disconnected systems.",
      solution: "GHL + ClickUp integration + sales pipeline with automations + unified leadership dashboard.",
      result: "Zero to orbit in 30 days. 100% centralized operations.",
      quote: "Professional, precise and delivered exactly what was promised.",
    },
    {
      initials: "SA", color: "#0F766E", name: "Souza Advogados + Marcos Assunção", meta: "Brazil · Law",
      problem: "Paper contracts, manual signatures and decentralized billing.",
      solution: "ZapSign integrated: client signs → Asaas creates billing → power of attorney auto-generated.",
      result: "Onboarding from 3 days to under 4 hours.",
      quote: "I never imagined it was possible to automate something as bureaucratic as law.",
    },
    {
      initials: "VC", color: "#1e5c4a", name: "Vieira Cleaning Services", meta: "United States · Cleaning Services",
      problem: "Phone scheduling, no review system and no post-service follow-up.",
      solution: "Google Ads + free estimate form + automatic scheduling + review request flow.",
      result: "Google reviews tripled in 60 days.",
      quote: "Our Google got filled with 5 stars without asking anyone manually.",
    },
    {
      initials: "AP", color: "#5B21B6", name: "APLAC Mais", meta: "Brazil · Vehicle Protection",
      problem: "Manual billing, defaulters without follow-up, PIX and boleto decentralized.",
      solution: "Automated PIX + boleto billing, WhatsApp alerts and real-time default dashboard.",
      result: "Defaults dropped 40% in the first month.",
      quote: "The billing flow paid for the entire investment in the first cycle.",
    },
  ],
  pt: [
    {
      initials: "AV", color: "#1B2F5E", name: "Azul Viagens", meta: "Brasil · Aviação",
      problem: "Volume de colaboradores sem rodízio de leads e follow-up 100% manual.",
      solution: "Rodízio automático, follow-up WhatsApp/email, rastreamento Meta Ads e check-in de voo.",
      result: "Zero leads perdidos. Comunicação 100% automatizada.",
      quote: "A estrutura transformou como nossa equipe age sobre cada oportunidade de venda.",
    },
    {
      initials: "AS", color: "#4B6CB7", name: "Astride US Inc.", meta: "Miami, FL · Contabilidade Digital",
      problem: "Comercial, operacional e financeiro em sistemas completamente desconectados.",
      solution: "GHL + ClickUp + pipeline de vendas com automações + dashboard unificado para liderança.",
      result: "Zero to orbit em 30 dias. Operação 100% centralizada.",
      quote: "Profissional, preciso e entregou exatamente o que foi prometido.",
    },
    {
      initials: "SA", color: "#0F766E", name: "Souza Advogados + Marcos Assunção", meta: "Brasil · Advocacia",
      problem: "Contratos em papel, assinatura manual e cobrança descentralizada.",
      solution: "ZapSign integrado: cliente assina → Asaas cria cobrança → procuração gerada automaticamente.",
      result: "Onboarding de 3 dias para menos de 4 horas.",
      quote: "Nunca imaginei que seria possível automatizar algo tão burocrático quanto advocacia.",
    },
    {
      initials: "VC", color: "#1e5c4a", name: "Vieira Cleaning Services", meta: "Estados Unidos · Serviços de Limpeza",
      problem: "Agendamentos por telefone, sem sistema de avaliações e sem follow-up pós-serviço.",
      solution: "Google Ads + formulário de free estimate + agendamento automático + pedido de review.",
      result: "Reviews no Google triplicaram em 60 dias.",
      quote: "Nosso Google ficou cheio de 5 estrelas sem precisar pedir manualmente para ninguém.",
    },
    {
      initials: "AP", color: "#5B21B6", name: "APLAC Mais", meta: "Brasil · Proteção Veicular",
      problem: "Cobrança manual, inadimplentes sem follow-up, PIX e boleto descentralizados.",
      solution: "Régua automática PIX + boleto, alertas WhatsApp e dashboard de inadimplência em tempo real.",
      result: "Inadimplência caiu 40% no primeiro mês de uso.",
      quote: "A régua de cobrança pagou o investimento inteiro já no primeiro ciclo.",
    },
  ],
  es: [
    {
      initials: "AV", color: "#1B2F5E", name: "Azul Viagens", meta: "Brasil · Aviación",
      problem: "Gran volumen de empleados sin rotación de leads y follow-up 100% manual.",
      solution: "Rotación automática, follow-up WhatsApp/email, rastreo Meta Ads y check-in de vuelo.",
      result: "Cero leads perdidos. Comunicación 100% automatizada.",
      quote: "La estructura transformó cómo nuestro equipo actúa sobre cada oportunidad de venta.",
    },
    {
      initials: "AS", color: "#4B6CB7", name: "Astride US Inc.", meta: "Miami, FL · Contabilidad Digital",
      problem: "Comercial, operativo y financiero en sistemas completamente desconectados.",
      solution: "GHL + ClickUp + pipeline de ventas con automatizaciones + dashboard unificado para liderazgo.",
      result: "Zero to orbit en 30 días. Operación 100% centralizada.",
      quote: "Profesional, preciso y entregó exactamente lo que fue prometido.",
    },
    {
      initials: "SA", color: "#0F766E", name: "Souza Advogados + Marcos Assunção", meta: "Brasil · Abogacía",
      problem: "Contratos en papel, firma manual y cobro descentralizado.",
      solution: "ZapSign integrado: cliente firma → Asaas crea cobro → poder notarial generado automáticamente.",
      result: "Onboarding de 3 días a menos de 4 horas.",
      quote: "Nunca imaginé que fuera posible automatizar algo tan burocrático como la abogacía.",
    },
    {
      initials: "VC", color: "#1e5c4a", name: "Vieira Cleaning Services", meta: "Estados Unidos · Servicios de Limpieza",
      problem: "Agendamiento por teléfono, sin sistema de reseñas y sin follow-up post-servicio.",
      solution: "Google Ads + formulario de free estimate + agendamiento automático + solicitud de review.",
      result: "Reviews en Google se triplicaron en 60 días.",
      quote: "Nuestro Google se llenó de 5 estrellas sin pedir manualmente a nadie.",
    },
    {
      initials: "AP", color: "#5B21B6", name: "APLAC Mais", meta: "Brasil · Protección Vehicular",
      problem: "Cobro manual, morosos sin follow-up, PIX y boleto descentralizados.",
      solution: "Regla automática PIX + boleto, alertas WhatsApp y dashboard de morosidad en tiempo real.",
      result: "Morosidad cayó 40% en el primer mes de uso.",
      quote: "La regla de cobro pagó toda la inversión en el primer ciclo.",
    },
  ],
}

export function Cases() {
  const { locale } = useLocale()
  const t = content[locale].cases
  const cases = casesData[locale]
  const totalCases = cases.length

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Map scroll to active case index (0-4)
  const rawIndex = useTransform(scrollYProgress, [0, 0.95], [0, totalCases - 1])

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"])

  return (
    <section id="cases">
      {/* 400vh container — one "page" per case + buffer */}
      <div ref={containerRef} style={{ height: `${totalCases * 60}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#060D1C] flex flex-col justify-center px-4">

          {/* Aurora blobs */}
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 500, height: 500, background: "#1B2F5E", filter: "blur(100px)", opacity: 0.45, top: -150, left: -100 }} />
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 380, height: 380, background: "#00C4A0", filter: "blur(90px)", opacity: 0.18, bottom: -100, right: -80 }} />
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 260, height: 260, background: "#4B6CB7", filter: "blur(80px)", opacity: 0.22, top: "40%", left: "60%" }} />

          {/* Stars */}
          {[
            { top: "6%", left: "18%", s: 2, o: 0.5 },
            { top: "20%", left: "75%", s: 1, o: 0.4 },
            { top: "70%", left: "85%", s: 2, o: 0.4 },
            { top: "82%", left: "12%", s: 1, o: 0.5 },
            { top: "35%", left: "8%", s: 2, o: 0.3 },
            { top: "10%", left: "92%", s: 1, o: 0.6 },
            { top: "55%", left: "48%", s: 1, o: 0.4 },
          ].map((s, i) => (
            <div key={i} className="pointer-events-none absolute rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.s, height: s.s, opacity: s.o }} />
          ))}

          {/* Section header */}
          <div className="relative z-10 text-center mb-8">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#00C4A0] mb-3">
              {t.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em]">
              {t.title}
            </h2>
          </div>

          {/* Card area */}
          <div className="relative z-10 max-w-2xl mx-auto w-full" style={{ minHeight: 320 }}>
            {/* Stacked cards behind */}
            <div className="absolute inset-0 rounded-[20px] border"
              style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.06)", transform: "translateY(-16px) scale(0.93)", zIndex: 1 }} />
            <div className="absolute inset-0 rounded-[20px] border"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", transform: "translateY(-8px) scale(0.965)", zIndex: 2 }} />

            {/* Active card — driven by scroll */}
            <CaseCardAnimated rawIndex={rawIndex} cases={cases} t={t} />
          </div>

          {/* Progress dots */}
          <CaseDots rawIndex={rawIndex} total={totalCases} />

          {/* Progress bar */}
          <div className="relative z-10 max-w-[180px] mx-auto mt-3 h-[2px] rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full rounded-full"
              style={{ width: progressWidth, background: "linear-gradient(90deg, #00C4A0, #4B6CB7)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Separate component that reads rawIndex as motion value
function CaseCardAnimated({
  rawIndex,
  cases,
  t,
}: {
  rawIndex: MotionValue<number>
  cases: CaseItem[]
  t: { problem: string; solution: string; result: string }
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const unsubscribe = rawIndex.on("change", (v: number) => {
      const idx = Math.round(v)
      const clamped = Math.max(0, Math.min(cases.length - 1, idx))
      setCurrent(clamped)
    })
    return unsubscribe
  }, [rawIndex, cases.length])

  const c = cases[current]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[20px] overflow-hidden"
        style={{
          zIndex: 5,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 0 0 0.5px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
          padding: "30px 32px",
        }}
      >
        {/* Decorative overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 30%, transparent 60%)" }} />
        <div className="pointer-events-none absolute top-0 left-4 right-4"
          style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,196,160,0.6), rgba(75,108,183,0.5), transparent)" }} />
        <div className="pointer-events-none absolute -top-10 -right-10 rounded-full"
          style={{ width: 160, height: 160, background: "radial-gradient(circle, rgba(0,196,160,0.12) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 rounded-full"
          style={{ width: 140, height: 140, background: "radial-gradient(circle, rgba(75,108,183,0.12) 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0"
              style={{ background: c.color, border: "1px solid rgba(255,255,255,0.15)" }}>
              {c.initials}
            </div>
            <div>
              <div className="text-[15px] font-extrabold text-white">{c.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{c.meta}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: t.problem, text: c.problem, color: "rgba(252,165,165,0.8)" },
              { label: t.solution, text: c.solution, color: "rgba(147,197,253,0.8)" },
              { label: t.result, text: c.result, color: "rgba(94,234,212,0.8)" },
            ].map((col) => (
              <div key={col.label} className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase mb-1.5"
                  style={{ color: col.color }}>{col.label}</div>
                <p className="text-[11.5px] leading-[1.55]" style={{ color: "rgba(203,213,225,0.85)" }}>
                  {col.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-4" style={{ height: 0.5, background: "rgba(255,255,255,0.08)" }} />

          <p className="text-[12.5px] italic leading-relaxed" style={{ color: "rgba(148,163,184,0.9)" }}>
            <span className="not-italic text-[18px] leading-none align-[-3px] mr-1" style={{ color: "#00C4A0" }}>&ldquo;</span>
            {c.quote}&rdquo;
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Dots component
function CaseDots({
  rawIndex,
  total,
}: {
  rawIndex: MotionValue<number>
  total: number
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const unsubscribe = rawIndex.on("change", (v: number) => {
      setCurrent(Math.max(0, Math.min(total - 1, Math.round(v))))
    })
    return unsubscribe
  }, [rawIndex, total])

  return (
    <div className="relative z-10 flex justify-center gap-2 mt-7">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 7,
            height: 7,
            background: i === current ? "#00C4A0" : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  )
}
