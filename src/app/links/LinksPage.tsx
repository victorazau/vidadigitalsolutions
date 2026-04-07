"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Globe, MessageCircle, CalendarDays, BookOpen, Star } from "lucide-react"

const links = [
  {
    label: "Website",
    desc: "vidadigitalsolutions.com",
    href: "https://vidadigitalsolutions.com",
    icon: Globe,
    style: "bg-[#1B2F5E] text-white hover:bg-[#1B2F5E]/80",
  },
  {
    label: "WhatsApp",
    desc: "Talk to our team",
    href: "https://wa.me/14382985740",
    icon: MessageCircle,
    style: "bg-[#00C4A0] text-[#060D1C] hover:bg-[#00C4A0]/80",
  },
  {
    label: "Book a Call",
    desc: "Free 30-min discovery call",
    href: "https://vidadigitalsolutions.com/book",
    icon: CalendarDays,
    style: "bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12]",
  },
  {
    label: "Blog",
    desc: "Automation & CRM insights",
    href: "https://vidadigitalsolutions.com/blog",
    icon: BookOpen,
    style: "bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12]",
  },
  {
    label: "Google Reviews",
    desc: "See what our clients say",
    href: "https://share.google/vSDDAaZ2UvIeabFaS",
    icon: Star,
    style: "bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12]",
  },
]

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vida.digital_solutions?igsh=YTNkZWFheW84NDll&utm_source=qr",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Vida.Digital.Solutions/",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vidadigitalsolutions/",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
]

// Deterministic star positions
const stars = Array.from({ length: 60 }, (_, i) => {
  const seed = (i + 1) * 7.31
  return {
    x: ((seed * 13.37) % 100),
    y: ((seed * 9.73) % 100),
    size: 0.5 + ((seed * 3.14) % 1.5),
    delay: (seed * 1.23) % 5,
    duration: 3 + ((seed * 2.17) % 4),
  }
})

export function LinksPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#060D1C]">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Pulsing radial gradients — VDS palette */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(0,196,160,0.15) 0%, transparent 60%),
              radial-gradient(circle at 70% 60%, rgba(27,47,94,0.20) 0%, transparent 60%)
            `,
            backgroundSize: "100% 100%",
            animation: "pulse 10s infinite",
          }}
        />

        {/* Animated blobs — VDS colors */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-35"
            style={{ background: "#1B2F5E" }}
            animate={{ x: [-50, 50, -50], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-30"
            style={{ background: "#00C4A0" }}
            animate={{ x: [50, -50, 50], y: [20, -20, 20], scale: [1, 1.3, 1] }}
            transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full filter blur-3xl opacity-25"
            style={{ background: "#4B6CB7" }}
            animate={{ x: [20, -20, 20], y: [-30, 30, -30], rotate: [0, 360, 0] }}
            transition={{ duration: 50, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </motion.div>

        {/* Twinkling stars */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-6 py-12">
        {/* Logo */}
        <Image
          src="/logo-h-white.png"
          alt="Vida Digital Solutions"
          width={220}
          height={48}
          className="h-12 w-auto mb-3"
          unoptimized
          priority
        />

        {/* Tagline */}
        <p className="text-[11px] text-[#4B6CB7] tracking-[0.2em] uppercase mb-1">
          Built to Scale.
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#94A3B8] text-center mb-8 max-w-xs leading-relaxed">
          GoHighLevel implementation, CRM automation & system integrations.
        </p>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mb-10">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className={`flex items-center gap-4 w-full rounded-xl px-5 py-4 transition-all duration-200 backdrop-blur-sm ${link.style}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-extrabold">{link.label}</p>
                  <p className="text-[11px] opacity-60">{link.desc}</p>
                </div>
                <svg className="w-4 h-4 opacity-30 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9,6 15,12 9,18" />
                </svg>
              </motion.a>
            )
          })}
        </div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all backdrop-blur-sm"
                aria-label={social.label}
              >
                <Icon />
              </a>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[10px] text-[#2a4a7a] tracking-wider">
            28 W Flagler St — Miami, FL, USA
          </p>
          <p className="text-[10px] text-[#2a4a7a] mt-1">
            &copy; {new Date().getFullYear()} Vida Digital Solutions LLC
          </p>
        </motion.div>
      </div>
    </div>
  )
}
