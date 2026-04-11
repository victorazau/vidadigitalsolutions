"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, TrendingUp, Bot, BarChart3, Globe, Megaphone, ChevronDown, Play, X } from "lucide-react"
import { useState } from "react"
import { Footer } from "@/components/sections/footer"
import { AutoLocaleProvider } from "@/components/AutoLocaleProvider"
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { trackBrasilWhatsApp, trackBrasilVideoView } from "@/components/TrackingEvents"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const cases = [
  {
    name: "Scarlett Caroline Beauty",
    instagram: "@scarlettcarolinebeauty",
    instagramUrl: "https://www.instagram.com/scarlettcarolinebeauty/",
    location: "Belo Horizonte, MG",
    industry: "Beleza & Estética",
    logo: "/logos/scarllet-caroline-beauty.jpg",
    result: "Começou vendendo mega hair com malinha. Recebeu placa de R$2 milhões em faturamento. Hoje tem salões na área nobre de BH.",
    highlight: "Placa de R$2M em faturamento",
    videoUrl: "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media/69d8cab523917331fbb49092.mp4",
  },
  {
    name: "Viveza Pratas",
    instagram: "@vivezapratas",
    instagramUrl: "https://www.instagram.com/vivezapratas/",
    location: "Minas Gerais",
    industry: "Joalheria & Acessórios",
    logo: "/logos/viveza-pratas.jpg",
    result: "'Empresa sem marketing não sobrevive.' Resultado expressivo em vendas online e posicionamento digital.",
    highlight: "Marketing que gera resultado real",
    videoUrl: "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media/69d8cab5982fd67a351356c0.mp4",
  },
  {
    name: "Gerais Proteção Veicular",
    instagram: "@geraisprotecao",
    instagramUrl: "https://www.instagram.com/geraisprotecao/",
    location: "Minas Gerais",
    industry: "Proteção Veicular",
    logo: "/logos/gerais-protecao-veicular.jpg",
    result: "Já tinha outra agência. A Vida Marketing compreendeu a marca, agregou valor e aumentou significativamente a base de associados.",
    highlight: "Base de associados em crescimento",
    videoUrl: "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media/69d8cab5019dc508d3f5674e.mp4",
  },
  {
    name: "Azul Viagens",
    instagram: "@azulviagens",
    instagramUrl: "https://www.instagram.com/azulviagens/",
    location: "Brasil",
    industry: "Aviação & Turismo",
    logo: "/logos/azul-viagens.jpeg",
    result: "Rodízio automatizado de leads entre colaboradores, follow-up automático via WhatsApp/email e rastreamento completo de Meta Ads.",
    highlight: "Zero leads perdidos",
    videoUrl: "",
  },
]

const PRIN_VIDEO = "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media/69d8cab5982fd67a351356bf.mp4"

const services = [
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    desc: "Meta Ads e Google Ads com estratégia, segmentação e otimização contínua. Resultados mensuráveis desde o primeiro mês.",
  },
  {
    icon: TrendingUp,
    title: "CRM & Automação",
    desc: "Funis de vendas, follow-up automático, WhatsApp, email marketing — tudo integrado no Quasar CRM.",
  },
  {
    icon: Globe,
    title: "Sites, Landing Pages & E-commerce",
    desc: "Sites profissionais, landing pages de alta conversão e integração com Nuvem Shop para seu e-commerce ir para as nuvens.",
  },
  {
    icon: Bot,
    title: "Relatórios e IA",
    desc: "Relatórios otimizados por IA, chatbots inteligentes para WhatsApp e Instagram. Atendimento e análise 24/7.",
  },
  {
    icon: BarChart3,
    title: "Rastreamento & Disparo em Massa",
    desc: "Pixel, CAPI, Analytics e disparos segmentados na base. Saiba de onde vem cada venda e reative clientes inativos automaticamente.",
  },
]

const faqs = [
  {
    q: "Como ter clientes sem investir tanto em tráfego pago?",
    a: "Esse é o grande segredo: tráfego pago traz o primeiro contato, mas quem escala de verdade é a automação. Construímos sua base de clientes e criamos disparos segmentados (WhatsApp, email, SMS) que reativam quem já comprou ou demonstrou interesse. Resultado: você vende mais gastando proporcionalmente menos em anúncio.",
  },
  {
    q: "Os anúncios estão cada vez mais caros. Vale a pena investir?",
    a: "Sim, mas com estratégia diferente. O custo por lead subiu — por isso não basta jogar dinheiro em anúncio. Nosso diferencial é combinar tráfego pago com automação de base: cada lead que entra é nutrido automaticamente até comprar. Você paga uma vez pelo lead e vende várias vezes pra ele.",
  },
  {
    q: "Já tive agência antes e não funcionou. Qual a diferença de vocês?",
    a: "A maioria das agências entrega só o tráfego e pronto. Nós entregamos o ecossistema completo: anúncios + CRM + automação + rastreamento de dados. Você sabe exatamente de onde vem cada venda, cada lead é acompanhado automaticamente e nenhuma oportunidade é perdida.",
  },
  {
    q: "Funciona pra moda feminina / proteção veicular / meu segmento?",
    a: "Sim. Nossos maiores cases são exatamente nesses segmentos: a Prin Modas saiu de 11K para 130K seguidores e abriu loja física. A Gerais Proteção Veicular cresceu a base de associados significativamente. O método funciona para qualquer negócio que vende para pessoa física.",
  },
  {
    q: "O que é o Quasar CRM que vem incluso?",
    a: "É nossa plataforma all-in-one que substitui várias ferramentas: CRM, funis de venda, automação de WhatsApp, email marketing, agendamento, disparo em massa e muito mais. Todos os nossos clientes recebem acesso sem custo adicional.",
  },
  {
    q: "Quanto tempo leva pra ver resultado?",
    a: "Resultados em tráfego pago começam nos primeiros 15-30 dias. Automações de base e CRM mostram impacto em 60-90 dias. A combinação de tráfego + automação é o que gera crescimento exponencial ao longo do tempo.",
  },
]

// Video popup component
function VideoPopup({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-2xl overflow-hidden bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <video
            src={url}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function BrasilPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [videoPopup, setVideoPopup] = useState<string | null>(null)

  return (
    <AutoLocaleProvider>
      <div className="bg-white overflow-x-hidden">
        {/* Header */}
        <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <a href="/brasil" className="flex items-center gap-3">
              <Image
                src="/logos/logo-vida-marketing.png"
                alt="Vida Marketing"
                width={140}
                height={32}
                className="h-8 w-auto"
                unoptimized
              />
              <span className="hidden sm:block text-[10px] text-[#94A3B8] border-l border-gray-200 pl-3 leading-tight">
                Uma divisão da<br />
                <span className="text-[#1B2F5E] font-extrabold">Vida Digital Solutions</span>
              </span>
            </a>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/vidamkt/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:text-[#E1306C] hover:bg-[#E1306C]/5 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.facebook.com/vidamktoficial/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:text-[#1877F2] hover:bg-[#1877F2]/5 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/5531999700039"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBrasilWhatsApp}
                className="rounded-lg bg-[#00C4A0] px-5 py-2 text-sm text-[#060D1C] font-extrabold hover:bg-[#00C4A0]/90 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <AuroraBackground className="pt-28 pb-20 px-6 min-h-0 h-auto" starCount={40}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00C4A0]/10 blur-2xl rounded-full scale-150" />
                <Image
                  src="/logos/logo-vida-marketing-b.png"
                  alt="Vida Marketing"
                  width={240}
                  height={72}
                  className="relative h-20 md:h-24 w-auto"
                  unoptimized
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#00C4A0]" />
                <span className="text-[12px] text-white/70">Uma divisão da Vida Digital Solutions</span>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] leading-tight mb-4"
            >
              Dos anúncios às automações.
              <br />
              <span className="text-[#00C4A0]">Seu negócio no automático.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 font-light"
            >
              Tráfego pago, CRM, automação e IA para empresas brasileiras que querem vender mais sem depender só de anúncio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <a
                href="https://wa.me/5531999700039"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBrasilWhatsApp}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <p className="text-[12px] text-white/40">Agência com 5.0 ★ no Google e mais de 100 empresas atendidas.</p>
              <div className="flex items-center gap-3">
                {[
                  "/logos/logo-prin-modas.jpg",
                  "/logos/scarllet-caroline-beauty.jpg",
                  "/logos/viveza-pratas.jpg",
                  "/logos/gerais-protecao-veicular.jpg",
                  "/logos/azul-viagens.jpeg",
                ].map((logo, i) => (
                  <div key={i} className="w-9 h-9 rounded-full overflow-hidden border border-white/15 opacity-60">
                    <Image src={logo} alt="" width={36} height={36} className="w-full h-full object-cover" unoptimized />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </AuroraBackground>

        {/* Serviços */}
        <HeroHighlight containerClassName="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
              O que fazemos no Brasil
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-4">
              Não é só tráfego. É o ecossistema completo.
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#1B2F5E]/70 text-center max-w-2xl mx-auto mb-14">
              Enquanto outros entregam só anúncio, nós construímos a máquina que transforma cada lead em cliente — <strong className="text-[#1B2F5E] font-extrabold">automaticamente</strong>.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => {
                const Icon = service.icon
                return (
                  <motion.div key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 hover:border-[#1B2F5E]/20 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1B2F5E]/5 border border-[#1B2F5E]/10 mb-4">
                      <Icon className="w-5 h-5 text-[#1B2F5E]" />
                    </div>
                    <h3 className="text-[16px] font-extrabold text-[#0A0A0F] mb-2">{service.title}</h3>
                    <p className="text-[13px] text-[#475569] leading-relaxed">{service.desc}</p>
                  </motion.div>
                )
              })}
              {/* Quasar CRM card */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xl bg-[#060D1C] border border-[#4B6CB7]/20 p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#00C4A0]/10 border border-[#00C4A0]/20 px-3 py-1 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00C4A0]" />
                  <span className="text-[10px] text-[#00C4A0] font-medium tracking-wider uppercase">Incluído nos planos</span>
                </div>
                <h3 className="text-[16px] font-extrabold mb-2">Quasar CRM</h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                  Todos os clientes ganham acesso ao nosso CRM all-in-one: funis, automações, email, SMS, agendamento, disparo em massa e mais.
                </p>
              </motion.div>
            </div>
          </div>
        </HeroHighlight>

        {/* Case Prin Modas — Destaque */}
        <AuroraBackground className="py-20 px-6 min-h-0 h-auto" starCount={30}>
          <div id="prinmodas" className="max-w-4xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#00C4A0] mb-4 text-center">
              Case em destaque
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em] text-center mb-12">
              De 11K para 130K seguidores.
            </motion.h2>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}>

              {/* Image area */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image
                  src="/logos/prin-modas.jpg"
                  alt="Prin Modas — Case de sucesso Vida Marketing"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                      <Image
                        src="/logos/logo-prin-modas.jpg"
                        alt="Prin Modas logo"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-lg">Prin Modas</p>
                      <a href="https://www.instagram.com/prin.modas/" target="_blank" rel="noopener noreferrer"
                        className="text-[12px] text-[#00C4A0]">@prin.modas · 130K seguidores</a>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/40">Belo Horizonte, MG</span>
                </div>
              </div>

              <div className="p-8 md:p-10">
                {/* Before / After */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="rounded-xl p-5" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
                    <p className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-red-400/80 mb-2">Antes</p>
                    <p className="text-[14px] text-[#94A3B8] leading-relaxed">
                      Vendia roupa online, dentro de casa. 11 mil seguidores. Sem estrutura de vendas, sem automação, sem loja física.
                    </p>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: "rgba(0,196,160,0.06)", border: "1px solid rgba(0,196,160,0.12)" }}>
                    <p className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-[#00C4A0]/80 mb-2">Depois</p>
                    <p className="text-[14px] text-[#94A3B8] leading-relaxed">
                      130 mil seguidores. Faturamento multiplicado. Loja física enorme em BH. E-commerce com envios para todo Brasil. Viagens, qualidade de vida e sonhos realizados.
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-[#00C4A0]">
                      <AnimatedCounter value={130} suffix="K" />
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-1">seguidores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-white">
                      <AnimatedCounter value={850} suffix="+" />
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-1">posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-[#E91E8C]">
                      <AnimatedCounter value={10} suffix="x" />
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-1">faturamento</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-[#4B6CB7]">Loja</p>
                    <p className="text-[11px] text-[#94A3B8] mt-1">física + e-commerce</p>
                  </div>
                </div>

                {/* Video CTA */}
                <div className="flex items-center justify-center mb-6">
                  <button
                    onClick={() => { setVideoPopup(PRIN_VIDEO); trackBrasilVideoView("Prin Modas"); }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E91E8C] flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-extrabold">Assistir depoimento</p>
                      <p className="text-[11px] text-[#94A3B8]">Vídeo da Prin Modas</p>
                    </div>
                  </button>
                </div>

                {/* Quote */}
                <div className="border-l-2 border-[#E91E8C]/40 pl-4">
                  <p className="text-[14px] italic text-white/60 leading-relaxed">
                    "A Vida Marketing transformou meu negócio e minha vida. Saí de vendas dentro de casa para uma loja referência, viagens e qualidade de vida que nunca imaginei."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        {/* Outros Cases */}
        <div id="cases" className="pt-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#4B6CB7] mb-4 text-center">
              Mais resultados
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em] text-center mb-12">
              Empresas que cresceram com a gente.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cases.map((c, i) => (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-6 backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    {c.logo ? (
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15 flex-shrink-0">
                        <Image src={c.logo} alt={c.name} width={44} height={44}
                          className="w-full h-full object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#1B2F5E] flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
                        {c.name[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-[14px] font-extrabold text-white">{c.name}</h3>
                      <p className="text-[11px] text-[#94A3B8]">{c.location} · {c.industry}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-4">{c.result}</p>
                  <span className="text-[12px] font-extrabold text-[#00C4A0] block mb-4">{c.highlight}</span>

                  {/* Video button */}
                  {c.videoUrl && (
                    <button
                      onClick={() => { setVideoPopup(c.videoUrl); trackBrasilVideoView(c.name); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                      <Play className="w-4 h-4 text-[#00C4A0]" />
                      <span className="text-[12px] font-extrabold">Assistir depoimento</span>
                    </button>
                  )}

                  <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="block text-center mt-3 text-[11px] text-[#4B6CB7] hover:text-white transition-colors">
                    {c.instagram} →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </AuroraBackground>

        {/* Diferenciais */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
              Por que a Vida Marketing
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-12">
              O que nos torna diferentes.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Tráfego + automação, não só anúncio",
                  desc: "Enquanto outras agências só entregam o tráfego, nós construímos o sistema completo: desde o anúncio até o follow-up automático que fecha a venda.",
                  color: "#00C4A0",
                  icon: TrendingUp,
                },
                {
                  title: "Cada lead é acompanhado até comprar",
                  desc: "Seu lead não fica esquecido. Automações de WhatsApp, email e SMS acompanham cada contato com a mensagem certa no momento certo — 24 horas por dia.",
                  color: "#1B2F5E",
                  icon: MessageCircle,
                },
                {
                  title: "Disparos na base = vendas sem custo de anúncio",
                  desc: "Construímos sua base de clientes e criamos campanhas de disparo em massa segmentadas. Você vende pra quem já te conhece — sem pagar novamente pelo lead.",
                  color: "#4B6CB7",
                  icon: Megaphone,
                },
                {
                  title: "Rastreamento completo de dados",
                  desc: "Pixel, CAPI, Analytics configurados corretamente. Você sabe exatamente de onde vem cada venda e qual campanha gera mais resultado.",
                  color: "#E91E8C",
                  icon: BarChart3,
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: item.color }} />
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0" style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold text-[#0A0A0F] mb-2">{item.title}</h3>
                      <p className="text-[13px] text-[#475569] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </div>
            {/* CTA secundário */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-10"
            >
              <a
                href="https://wa.me/5531999700039"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-extrabold text-[#1B2F5E] border-2 border-[#1B2F5E] rounded-lg hover:bg-[#1B2F5E] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Quero saber mais
              </a>
            </motion.div>
          </div>
        </section>

        {/* Quote highlight */}
        <section className="bg-[#060D1C] py-16 px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[40px] leading-none text-[#00C4A0]/30 font-extrabold select-none">&ldquo;</span>
            <p className="text-lg md:text-xl italic text-white/70 leading-relaxed -mt-4">
              Empresa sem marketing não sobrevive.
            </p>
            <p className="mt-4 text-[13px] text-[#94A3B8]">
              — Viveza Pratas, cliente Vida Marketing
            </p>
          </motion.div>
        </section>

        {/* Google Reviews */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-[#FBBC05]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[14px] font-extrabold text-[#0A0A0F]">5.0</span>
              <span className="text-[13px] text-[#94A3B8]">no Google</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Tifani Adrieli",
                  date: "Dez 2024",
                  text: "Empresa muito séria e que atende nossas necessidades ajudando em tudo sempre! Eu estou amando a experiência com a empresa.",
                },
                {
                  name: "Fernando Braga",
                  date: "Jul 2024",
                  text: "A empresa é muito boa, atende todos os prazos combinados, profissionais altamente qualificados e o resultado é impressionante.",
                },
                {
                  name: "Brenda Pinheiro",
                  date: "Set 2024",
                  text: "Maravilhosa. O suporte e a prestação de serviço dos meninos é impecável. Minha empresa mudou muito desde que começamos a trabalhar juntos.",
                },
              ].map((review, i) => (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl border border-[#E2E8F0] p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B2F5E]/10 flex items-center justify-center text-[11px] font-extrabold text-[#1B2F5E]">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#0A0A0F]">{review.name}</p>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <svg key={s} className="w-3 h-3 text-[#FBBC05]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        <span className="text-[10px] text-[#94A3B8] ml-1">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{review.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-6"
            >
              <a
                href="https://share.google/f7axPqGRNuyy8O8hl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#4B6CB7] hover:text-[#1B2F5E] transition-colors"
              >
                Ver todas as avaliações no Google →
              </a>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F5F7FA] py-20 px-6">
          <div className="max-w-[640px] mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
              Dúvidas frequentes
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-10">
              Ainda tem dúvida? A gente resolve.
            </motion.h2>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }}
                    variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`rounded-xl border overflow-hidden transition-colors ${
                      isOpen ? "bg-[#EEF2FF] border-[#1B2F5E]/20" : "bg-white border-[#E2E8F0]"
                    }`}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left">
                      <span className="text-[15px] font-extrabold text-[#0A0A0F]">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-[14px] text-[#475569] leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Como funciona — mini processo */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
              Como funciona
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-10">
              3 passos para começar.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: "1", title: "Conversa no WhatsApp", desc: "Conte sobre seu negócio, seus desafios e seus objetivos. Sem compromisso." },
                { num: "2", title: "Análise personalizada", desc: "Analisamos seu negócio e montamos uma proposta sob medida com tudo que você precisa." },
                { num: "3", title: "Começamos em 7 dias", desc: "Aprovado o plano, em uma semana seus anúncios e automações já estão rodando." },
              ].map((step, i) => (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#00C4A0]/10 border border-[#00C4A0]/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[18px] font-extrabold text-[#00C4A0]">{step.num}</span>
                  </div>
                  <h3 className="text-[15px] font-extrabold text-[#0A0A0F] mb-1">{step.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <AuroraBackground className="py-20 px-6 min-h-0 h-auto" starCount={30}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em] mb-4">
              Pronto para vender no automático?
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#94A3B8] mb-3">
              Conversa sem compromisso · Orçamento personalizado · Nota fiscal no Brasil
            </motion.p>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#00C4A0]/20 bg-[#00C4A0]/5 px-4 py-1.5 mb-8">
              <span className="h-2 w-2 rounded-full bg-[#00C4A0] animate-pulse" />
              <span className="text-[12px] text-[#00C4A0] font-medium">Vagas limitadas este mês</span>
            </motion.p>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <a
                href="https://wa.me/5531999700039"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-lg animate-ping bg-[#00C4A0]/30" style={{ animationDuration: "2s" }} />
                {/* Glow */}
                <span className="absolute -inset-1 rounded-xl bg-[#00C4A0]/20 blur-md animate-pulse" style={{ animationDuration: "3s" }} />
                {/* Shimmer sweep */}
                <span className="absolute inset-0 rounded-lg overflow-hidden">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </span>
                <MessageCircle className="relative w-5 h-5" />
                <span className="relative">Falar no WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </AuroraBackground>

        {/* Footer — reusa o do site principal */}
        <Footer />

        {/* WhatsApp floating */}
        <a
          href="https://wa.me/5531999700039"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all"
          aria-label="WhatsApp">
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Video popup */}
        {videoPopup && (
          <VideoPopup url={videoPopup} onClose={() => setVideoPopup(null)} />
        )}
      </div>
    </AutoLocaleProvider>
  )
}
