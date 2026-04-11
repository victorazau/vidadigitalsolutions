"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Globe, Star, Play, TrendingUp, X } from "lucide-react"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const links = [
  {
    label: "Falar no WhatsApp",
    desc: "Orçamento sem compromisso",
    href: "https://wa.me/5531999700039",
    icon: MessageCircle,
    style: "bg-[#25D366] text-white hover:bg-[#25D366]/85",
    pulse: true,
  },
  {
    label: "Nosso Site",
    desc: "Conheça nossos serviços e cases",
    href: "https://vidadigitalsolutions.com/brasil",
    icon: Globe,
    style: "bg-[#1B2F5E] text-white hover:bg-[#1B2F5E]/85",
  },
  {
    label: "Case Prin Modas",
    desc: "De 11K para 130K seguidores",
    href: "https://vidadigitalsolutions.com/brasil#prinmodas",
    icon: TrendingUp,
    style: "bg-white/[0.07] text-white border border-white/[0.12] hover:bg-white/[0.12]",
  },
  {
    label: "Depoimentos em Vídeo",
    desc: "Veja o que nossos clientes dizem",
    href: "https://vidadigitalsolutions.com/brasil#cases",
    icon: Play,
    style: "bg-white/[0.07] text-white border border-white/[0.12] hover:bg-white/[0.12]",
  },
  {
    label: "Avaliações no Google",
    desc: "5.0 ★ — 100% satisfação",
    href: "https://share.google/f7axPqGRNuyy8O8hl",
    icon: Star,
    style: "bg-white/[0.07] text-white border border-white/[0.12] hover:bg-white/[0.12]",
  },
]

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vidamkt/",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vidamktoficial/",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

// Deterministic stars
const stars = Array.from({ length: 50 }, (_, i) => {
  const seed = (i + 1) * 7.31
  return {
    x: ((seed * 13.37) % 100),
    y: ((seed * 9.73) % 100),
    size: 0.5 + ((seed * 3.14) % 1.5),
    delay: (seed * 1.23) % 5,
    duration: 3 + ((seed * 2.17) % 4),
  }
})

const PRIN_VIDEO = "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media/69d8cab5982fd67a351356bf.mp4"

export function BrasilLinksPage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
    {showVideo && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        onClick={() => setShowVideo(false)}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden bg-black"
          onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowVideo(false)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <video src={PRIN_VIDEO} className="w-full h-full object-contain" controls autoPlay playsInline />
        </motion.div>
      </motion.div>
    )}
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#060D1C]">
      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-30"
        style={{ background: "#1B2F5E" }}
        animate={{ x: [-50, 50, -50], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-25"
        style={{ background: "#00C4A0" }}
        animate={{ x: [50, -50, 50], y: [20, -20, 20], scale: [1, 1.3, 1] }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px` }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-6 py-10">
        {/* Logo */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4 }}>
          <Image
            src="/logos/logo-vida-marketing-b.png"
            alt="Vida Marketing"
            width={180}
            height={54}
            className="h-14 w-auto mb-2"
            unoptimized
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00C4A0]" />
          <span className="text-[10px] text-white/60">Uma divisão da Vida Digital Solutions</span>
        </motion.div>

        {/* Tagline */}
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[12px] text-[#94A3B8] text-center mb-6">
          Tráfego pago · CRM · Automação · IA
        </motion.p>

        {/* Prin Modas highlight card */}
        <motion.button
          onClick={() => setShowVideo(true)}
          initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full rounded-2xl overflow-hidden mb-5 group text-left cursor-pointer"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="relative h-32 overflow-hidden">
            <Image
              src="/logos/prin-modas.jpg"
              alt="Prin Modas — Case de sucesso"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060D1C] via-transparent to-transparent" />
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#00C4A0]/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <Image src="/logos/logo-prin-modas.jpg" alt="Prin Modas" width={32} height={32} className="w-full h-full object-cover" unoptimized />
              </div>
              <div>
                <p className="text-[12px] font-extrabold text-white">Prin Modas</p>
                <p className="text-[10px] text-[#00C4A0]">11K → 130K seguidores</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/60">Faturamento multiplicado</p>
              <p className="text-[10px] text-[#00C4A0]">De casa para loja referência em BH</p>
            </div>
            <span className="text-[10px] text-white/30 flex items-center gap-1"><Play className="w-3 h-3" /> Assistir</span>
          </div>
        </motion.button>

        {/* Links */}
        <div className="w-full flex flex-col gap-2.5 mb-8">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden" animate="visible" variants={fadeUp}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                className={`relative flex items-center gap-3 w-full rounded-xl px-5 py-3.5 transition-all duration-200 backdrop-blur-sm ${link.style}`}
              >
                {link.pulse && (
                  <>
                    <span className="absolute inset-0 rounded-xl animate-ping bg-[#25D366]/20" style={{ animationDuration: "2.5s" }} />
                    <span className="absolute -inset-0.5 rounded-xl bg-[#25D366]/10 blur-sm animate-pulse" style={{ animationDuration: "3s" }} />
                  </>
                )}
                <Icon className="relative w-5 h-5 flex-shrink-0" />
                <div className="relative flex-1 min-w-0">
                  <p className="text-[13px] font-extrabold">{link.label}</p>
                  <p className="text-[10px] opacity-60">{link.desc}</p>
                </div>
                <svg className="relative w-4 h-4 opacity-30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9,6 15,12 9,18" />
                </svg>
              </motion.a>
            )
          })}
        </div>

        {/* Social icons */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.55, duration: 0.4 }}
          className="flex items-center gap-4 mb-6">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all backdrop-blur-sm"
                aria-label={social.label}>
                <Icon />
              </a>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center">
          <p className="text-[10px] text-[#2a4a7a]">5.0 ★ no Google · 100+ empresas atendidas</p>
          <p className="text-[10px] text-[#2a4a7a] mt-1">&copy; {new Date().getFullYear()} Vida Digital Solutions LLC</p>
        </motion.div>
      </div>
    </div>
    </>
  )
}
