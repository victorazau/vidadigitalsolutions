"use client"

import Image from "next/image"
import { Globe, MessageCircle, CalendarDays, BookOpen, Star } from "lucide-react"

const links = [
  {
    label: "Website",
    desc: "vidadigitalsolutions.com",
    href: "https://vidadigitalsolutions.com",
    icon: Globe,
    style: "bg-[#1B2F5E] text-white hover:bg-[#1B2F5E]/90",
  },
  {
    label: "WhatsApp",
    desc: "Talk to our team",
    href: "https://wa.me/14382985740",
    icon: MessageCircle,
    style: "bg-[#00C4A0] text-[#060D1C] hover:bg-[#00C4A0]/90",
  },
  {
    label: "Book a Call",
    desc: "Free 30-min discovery call",
    href: "https://vidadigitalsolutions.com/book",
    icon: CalendarDays,
    style: "bg-white/10 text-white border border-white/15 hover:bg-white/15",
  },
  {
    label: "Blog",
    desc: "Automation & CRM insights",
    href: "https://vidadigitalsolutions.com/blog",
    icon: BookOpen,
    style: "bg-white/10 text-white border border-white/15 hover:bg-white/15",
  },
  {
    label: "Google Reviews",
    desc: "See what our clients say",
    href: "https://g.page/r/vidadigitalsolutions/review",
    icon: Star,
    style: "bg-white/10 text-white border border-white/15 hover:bg-white/15",
  },
]

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/vidadigitalsolutions",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@vidadigitalsolutions",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.58 7.19a2.5 2.5 0 00-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.5 2.5 0 002.42 7.19C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 001.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 001.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15.5V8.5l6 3.5-6 3.5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/vida-digital-solutions",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@vidadigitalsolutions",
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

// Fixed star positions
const stars = [
  { top: "5%", left: "10%", s: 1.5, o: 0.4 },
  { top: "12%", left: "85%", s: 1, o: 0.3 },
  { top: "25%", left: "92%", s: 1.5, o: 0.25 },
  { top: "40%", left: "5%", s: 1, o: 0.35 },
  { top: "55%", left: "88%", s: 1.5, o: 0.2 },
  { top: "65%", left: "15%", s: 1, o: 0.4 },
  { top: "78%", left: "80%", s: 1.5, o: 0.3 },
  { top: "90%", left: "25%", s: 1, o: 0.35 },
]

export function LinksPage() {
  return (
    <div className="min-h-screen bg-[#060D1C] relative overflow-hidden flex flex-col items-center px-6 py-12">
      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.s, height: s.s, opacity: s.o }}
        />
      ))}

      {/* Aurora glows */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27,47,94,0.3) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,196,160,0.15) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(75,108,183,0.08) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <Image
          src="/logo-h.png"
          alt="Vida Digital Solutions"
          width={200}
          height={44}
          className="h-10 w-auto brightness-0 invert mb-3"
          unoptimized
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
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 w-full rounded-xl px-5 py-4 transition-all duration-200 ${link.style}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-extrabold">{link.label}</p>
                  <p className="text-[11px] opacity-70">{link.desc}</p>
                </div>
                <svg className="w-4 h-4 opacity-40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9,6 15,12 9,18" />
                </svg>
              </a>
            )
          })}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-8">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label={social.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[10px] text-[#2a4a7a] tracking-wider">
            Miami, FL, USA
          </p>
          <p className="text-[10px] text-[#2a4a7a] mt-1">
            &copy; {new Date().getFullYear()} Vida Digital Solutions LLC
          </p>
        </div>
      </div>
    </div>
  )
}
