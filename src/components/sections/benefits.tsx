"use client"

import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { Clock, DollarSign, BarChart3, Bot, TrendingUp, Link2 } from "lucide-react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  clock: Clock,
  dollar: DollarSign,
  chart: BarChart3,
  robot: Bot,
  scale: TrendingUp,
  link: Link2,
}

function SubQuote({ locale }: { locale: string }) {
  if (locale === "pt") {
    return (
      <p className="text-center text-[13px] md:text-[14px] italic text-white/50 leading-relaxed max-w-lg mx-auto mt-3">
        Enquanto você alterna entre <strong className="text-white/80 not-italic font-extrabold">12 ferramentas</strong> e responde manualmente, seus concorrentes fecham clientes no <strong className="text-[#00C4A0]/80 not-italic font-extrabold">piloto automático</strong> — <strong className="text-white/80 not-italic font-extrabold">24 horas por dia</strong>.
      </p>
    )
  }
  if (locale === "es") {
    return (
      <p className="text-center text-[13px] md:text-[14px] italic text-white/50 leading-relaxed max-w-lg mx-auto mt-3">
        Mientras alternas entre <strong className="text-white/80 not-italic font-extrabold">12 herramientas</strong> y respondes manualmente, tus competidores cierran clientes en <strong className="text-[#00C4A0]/80 not-italic font-extrabold">piloto automático</strong> — <strong className="text-white/80 not-italic font-extrabold">24 horas al día</strong>.
      </p>
    )
  }
  return (
    <p className="text-center text-[13px] md:text-[14px] italic text-white/50 leading-relaxed max-w-lg mx-auto mt-3">
      While you juggle <strong className="text-white/80 not-italic font-extrabold">12 tools</strong> and respond manually, your competitors close clients on <strong className="text-[#00C4A0]/80 not-italic font-extrabold">autopilot</strong> — <strong className="text-white/80 not-italic font-extrabold">24 hours a day</strong>.
    </p>
  )
}

function MobileSubQuote({ locale }: { locale: string }) {
  if (locale === "pt") {
    return (
      <p className="text-center text-[13px] italic text-[#475569] leading-relaxed max-w-sm mx-auto">
        Enquanto você alterna entre <strong className="text-[#0A0A0F] not-italic font-extrabold">12 ferramentas</strong> e responde manualmente, seus concorrentes fecham clientes no <strong className="text-[#1B2F5E] not-italic font-extrabold">piloto automático</strong> — <strong className="text-[#0A0A0F] not-italic font-extrabold">24 horas por dia</strong>.
      </p>
    )
  }
  if (locale === "es") {
    return (
      <p className="text-center text-[13px] italic text-[#475569] leading-relaxed max-w-sm mx-auto">
        Mientras alternas entre <strong className="text-[#0A0A0F] not-italic font-extrabold">12 herramientas</strong> y respondes manualmente, tus competidores cierran clientes en <strong className="text-[#1B2F5E] not-italic font-extrabold">piloto automático</strong> — <strong className="text-[#0A0A0F] not-italic font-extrabold">24 horas al día</strong>.
      </p>
    )
  }
  return (
    <p className="text-center text-[13px] italic text-[#475569] leading-relaxed max-w-sm mx-auto">
      While you juggle <strong className="text-[#0A0A0F] not-italic font-extrabold">12 tools</strong> and respond manually, your competitors close clients on <strong className="text-[#1B2F5E] not-italic font-extrabold">autopilot</strong> — <strong className="text-[#0A0A0F] not-italic font-extrabold">24 hours a day</strong>.
    </p>
  )
}

export function Benefits() {
  const { locale } = useLocale()
  const t = content[locale].benefits

  return (
    <section className="bg-white">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-slate-400 mb-4">
              {t.label}
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 leading-[1.1] tracking-[-0.04em] mb-4">
              {t.headline}
            </h2>
            {/* sub moved inside tablet */}
          </>
        }
      >
        <div className="flex flex-col gap-2.5">
          {/* Comparison grid */}
          {/* Mobile: stacked rows (bad→good per topic). Desktop: 2 columns */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            {/* BAD column */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <svg className="w-3 h-3 text-red-400" viewBox="0 0 10 10" fill="none">
                  <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-400">
                  {t.badLabel}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {[t.bad1, t.bad2, t.bad3].map((text, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl p-3"
                    style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
                    <div className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)" }} />
                    <p className="relative z-10 text-xs text-red-300/80 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* GOOD column */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <svg className="w-3 h-3 text-[#00C4A0]" viewBox="0 0 10 10" fill="none">
                  <polyline points="1,5 4,8 9,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#00C4A0]">
                  {t.goodLabel}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {[t.good1, t.good2, t.good3].map((text, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl p-3"
                    style={{ background: "rgba(0,196,160,0.06)", border: "1px solid rgba(0,196,160,0.12)" }}>
                    <div className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)" }} />
                    <p className="relative z-10 text-xs text-[#00C4A0]/80 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: interleaved bad/good rows */}
          <div className="flex flex-col gap-2 md:hidden">
            {[t.bad1, t.bad2, t.bad3].map((bad, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="relative overflow-hidden rounded-lg p-2.5"
                  style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
                  {i === 0 && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 10 10" fill="none">
                        <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[8px] font-extrabold tracking-widest uppercase text-red-400">{t.badLabel}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-red-300/80 leading-relaxed">{bad}</p>
                </div>
                <div className="relative overflow-hidden rounded-lg p-2.5"
                  style={{ background: "rgba(0,196,160,0.06)", border: "1px solid rgba(0,196,160,0.12)" }}>
                  {i === 0 && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <svg className="w-2.5 h-2.5 text-[#00C4A0]" viewBox="0 0 10 10" fill="none">
                        <polyline points="1,5 4,8 9,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[8px] font-extrabold tracking-widest uppercase text-[#00C4A0]">{t.goodLabel}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-[#00C4A0]/80 leading-relaxed">{[t.good1, t.good2, t.good3][i]}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits grid — desktop only inside tablet */}
          <div className="hidden md:block">
            <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {t.grid.map((item, i) => {
                const Icon = iconMap[item.icon]
                return (
                  <div key={i} className="rounded-lg p-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && (
                        <div className="flex items-center justify-center w-7 h-7 rounded-md"
                          style={{ background: "rgba(0,196,160,0.1)", border: "0.5px solid rgba(0,196,160,0.15)" }}>
                          <Icon className="w-3.5 h-3.5 text-[#00C4A0]" />
                        </div>
                      )}
                      <h3 className="text-[11px] font-extrabold text-white tracking-[-0.01em]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="h-px mt-2" style={{ background: "rgba(255,255,255,0.06)" }} />
            <SubQuote locale={locale} />
          </div>
        </div>
      </ContainerScroll>

      {/* Mobile: quote + benefit cards outside tablet */}
      <div className="md:hidden px-6 pb-12 -mt-20 bg-white">
        <MobileSubQuote locale={locale} />
        <div className="grid grid-cols-2 gap-3 mt-6">
          {t.grid.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={i} className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
                <div className="flex items-center gap-2 mb-2">
                  {Icon && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-[#E2E8F0]">
                      <Icon className="w-4 h-4 text-[#1B2F5E]" />
                    </div>
                  )}
                  <h3 className="text-[12px] font-extrabold text-[#0A0A0F] tracking-[-0.01em]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#475569] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
