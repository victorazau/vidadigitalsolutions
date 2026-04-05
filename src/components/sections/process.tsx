"use client"

import { useRef } from "react"
import { useLocale } from "@/lib/locale-context"
import { content } from "@/lib/content"
import { motion, useScroll, useTransform } from "framer-motion"

function Spaceship({ engineActive }: { engineActive: boolean }) {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" fill="none">
      <path d="M26 4C26 4 38 18 38 36V52H14V36C14 18 26 4 26 4Z"
        fill="url(#bodyGrad)" stroke="rgba(75,108,183,0.5)" strokeWidth="0.8" />
      <path d="M26 4C26 4 32 14 32 22H20C20 14 26 4 26 4Z"
        fill="rgba(0,196,160,0.3)" stroke="rgba(0,196,160,0.4)" strokeWidth="0.5" />
      <ellipse cx="26" cy="22" rx="5" ry="6"
        fill="url(#windowGrad)" stroke="rgba(0,196,160,0.6)" strokeWidth="0.8" />
      <ellipse cx="24" cy="20" rx="2" ry="2.5" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="24.5" cy="19.5" rx="0.8" ry="1" fill="rgba(255,255,255,0.5)" />
      <line x1="20" y1="32" x2="32" y2="32" stroke="rgba(75,108,183,0.3)" strokeWidth="0.5" />
      <line x1="19" y1="40" x2="33" y2="40" stroke="rgba(75,108,183,0.3)" strokeWidth="0.5" />
      <rect x="14" y="34" width="24" height="2" rx="1" fill="rgba(0,196,160,0.25)" />
      <path d="M14 36L4 52L14 50V36Z"
        fill="url(#wingGrad)" stroke="rgba(75,108,183,0.4)" strokeWidth="0.6" />
      <path d="M38 36L48 52L38 50V36Z"
        fill="url(#wingGrad)" stroke="rgba(75,108,183,0.4)" strokeWidth="0.6" />
      <line x1="14" y1="40" x2="6" y2="50" stroke="rgba(0,196,160,0.3)" strokeWidth="0.5" />
      <line x1="38" y1="40" x2="46" y2="50" stroke="rgba(0,196,160,0.3)" strokeWidth="0.5" />
      <rect x="18" y="50" width="16" height="6" rx="2"
        fill="#0D1B3E" stroke="rgba(75,108,183,0.4)" strokeWidth="0.6" />
      <path d="M20 56L18 62H34L32 56Z"
        fill="#0D1B3E" stroke="rgba(75,108,183,0.3)" strokeWidth="0.6" />
      <rect x="11" y="44" width="4" height="8" rx="2"
        fill="rgba(75,108,183,0.4)" stroke="rgba(75,108,183,0.3)" strokeWidth="0.5" />
      <rect x="37" y="44" width="4" height="8" rx="2"
        fill="rgba(75,108,183,0.4)" stroke="rgba(75,108,183,0.3)" strokeWidth="0.5" />
      <line x1="26" y1="4" x2="26" y2="1"
        stroke="rgba(0,196,160,0.7)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="26" cy="1" r="1.2" fill="#00C4A0" />

      {engineActive && (
        <g>
          <motion.ellipse cx="26" cy="66" rx="5" ry="7"
            fill="rgba(0,196,160,0.6)"
            animate={{ scaleX: [1, 1.2, 1], scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
          <motion.ellipse cx="26" cy="67" rx="3.5" ry="5"
            fill="rgba(147,197,253,0.5)"
            animate={{ scaleX: [1, 1.15, 1], scaleY: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} />
          <motion.ellipse cx="26" cy="68" rx="2" ry="3.5"
            fill="rgba(255,255,255,0.45)"
            animate={{ scaleY: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
        </g>
      )}

      <defs>
        <linearGradient id="bodyGrad" x1="14" y1="0" x2="38" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B2F5E" />
          <stop offset="50%" stopColor="#0D1B3E" />
          <stop offset="100%" stopColor="#1B2F5E" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0" y1="36" x2="14" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B2F5E" />
          <stop offset="100%" stopColor="#0D1B3E" />
        </linearGradient>
        <radialGradient id="windowGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="rgba(0,196,160,0.9)" />
          <stop offset="100%" stopColor="rgba(27,47,94,0.8)" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function Process() {
  const { locale } = useLocale()
  const t = content[locale].process

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Ship stays near step area until step4 is revealed, then rises to top
  const shipY = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], ["75%", "30%", "8%", "2%"])

  const step0opacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1])
  const step1opacity = useTransform(scrollYProgress, [0.14, 0.25], [0, 1])
  const step2opacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1])
  const step3opacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1])

  const step0x = useTransform(scrollYProgress, [0.02, 0.12], [-20, 0])
  const step1x = useTransform(scrollYProgress, [0.14, 0.25], [-20, 0])
  const step2x = useTransform(scrollYProgress, [0.28, 0.40], [-20, 0])
  const step3x = useTransform(scrollYProgress, [0.42, 0.55], [-20, 0])

  const num0color = useTransform(scrollYProgress, [0.02, 0.12], ["rgba(75,108,183,0.3)", "#00C4A0"])
  const num1color = useTransform(scrollYProgress, [0.14, 0.25], ["rgba(75,108,183,0.3)", "#00C4A0"])
  const num2color = useTransform(scrollYProgress, [0.28, 0.40], ["rgba(75,108,183,0.3)", "#00C4A0"])
  const num3color = useTransform(scrollYProgress, [0.42, 0.55], ["rgba(75,108,183,0.3)", "#00C4A0"])

  // Step 4 gets a scale bump for emphasis
  const step3scale = useTransform(scrollYProgress, [0.42, 0.58], [0.95, 1])

  const lineHeight = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"])
  const progressH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const orbitOpacity = useTransform(scrollYProgress, [0.50, 0.62], [0, 1])
  const orbitRotate1 = useTransform(scrollYProgress, [0, 1], [0, 720])
  const orbitRotate2 = useTransform(scrollYProgress, [0, 1], [0, -360])

  const steps = [
    { opacity: step0opacity, x: step0x, numColor: num0color, num: "1", title: t.step1.title, desc: t.step1.desc },
    { opacity: step1opacity, x: step1x, numColor: num1color, num: "2", title: t.step2.title, desc: t.step2.desc },
    { opacity: step2opacity, x: step2x, numColor: num2color, num: "3", title: t.step3.title, desc: t.step3.desc },
    { opacity: step3opacity, x: step3x, numColor: num3color, num: "4", title: t.step4.title, desc: t.step4.desc },
  ]

  return (
    <section id="process">
      <div ref={containerRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#060D1C] flex flex-col justify-center px-6 md:px-16">

          {/* Aurora blobs */}
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 380, height: 380, background: "#1B2F5E", filter: "blur(90px)", opacity: 0.35, top: -100, left: -80 }} />
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 220, height: 220, background: "#00C4A0", filter: "blur(80px)", opacity: 0.1, bottom: -60, right: -40 }} />
          <div className="pointer-events-none absolute rounded-full"
            style={{ width: 200, height: 200, background: "#4B6CB7", filter: "blur(70px)", opacity: 0.15, top: "40%", left: "60%" }} />

          {/* Stars */}
          {[
            { top: "5%", left: "22%", s: 2, o: 0.5 }, { top: "14%", left: "82%", s: 1, o: 0.4 },
            { top: "58%", left: "91%", s: 2, o: 0.35 }, { top: "78%", left: "14%", s: 1, o: 0.55 },
            { top: "32%", left: "96%", s: 2, o: 0.3 }, { top: "48%", left: "4%", s: 1, o: 0.45 },
            { top: "20%", left: "60%", s: 2, o: 0.4 }, { top: "68%", left: "74%", s: 1, o: 0.3 },
          ].map((s, i) => (
            <div key={i} className="pointer-events-none absolute rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.s, height: s.s, opacity: s.o }} />
          ))}

          {/* Left progress bar */}
          <div className="absolute left-0 top-0 w-[3px] h-full bg-[rgba(75,108,183,0.12)] rounded-r-sm overflow-hidden">
            <motion.div className="w-full rounded-r-sm"
              style={{ height: progressH, background: "linear-gradient(180deg,#1B2F5E,#4B6CB7,#00C4A0)" }} />
          </div>

          {/* Section header */}
          <div className="relative z-10 mb-12 text-center max-w-3xl mx-auto">
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#00C4A0] mb-3">
              {t.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em]">
              {t.title}
            </h2>
          </div>

          {/* Main layout: Ship + Steps */}
          <div className="relative z-10 max-w-3xl mx-auto flex gap-0 w-full">

            {/* Ship track column */}
            <div className="relative w-16 md:w-20 flex-shrink-0">
              {/* Vertical connector line */}
              <div className="absolute left-[30px] top-6 bottom-6 w-[2px] bg-[rgba(75,108,183,0.1)] rounded-full overflow-hidden">
                <motion.div className="w-full rounded-full"
                  style={{ height: lineHeight, background: "linear-gradient(180deg,#00C4A0,#4B6CB7)" }} />
              </div>

              {/* Spaceship */}
              <motion.div className="absolute left-[6px]" style={{ top: shipY }}>
                {/* Orbit rings — step 4 */}
                <motion.div
                  className="absolute rounded-full border border-[rgba(0,196,160,0.35)]"
                  style={{ width: 54, height: 54, top: -8, left: -2, opacity: orbitOpacity, rotate: orbitRotate1 }} />
                <motion.div
                  className="absolute rounded-full border border-[rgba(75,108,183,0.25)]"
                  style={{ width: 42, height: 42, top: -2, left: 4, opacity: orbitOpacity, rotate: orbitRotate2 }} />

                {/* Trail particles */}
                <motion.div
                  className="absolute left-[22px] w-1 h-1 rounded-full bg-[#00C4A0]/40"
                  style={{ top: 60 }}
                  animate={{ opacity: [0.6, 0], y: [0, 12], x: [-2, 2] }}
                  transition={{ duration: 0.8, repeat: Infinity }} />
                <motion.div
                  className="absolute left-[25px] w-[3px] h-[3px] rounded-full bg-[#4B6CB7]/30"
                  style={{ top: 65 }}
                  animate={{ opacity: [0.5, 0], y: [0, 10] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} />

                <Spaceship engineActive={true} />
              </motion.div>
            </div>

            {/* Steps column */}
            <div className="flex-1 flex flex-col gap-9 pl-4 pt-2">
              {steps.map((s, i) => {
                const isLast = i === 3
                return (
                  <motion.div key={i}
                    className={`flex items-start gap-5 ${isLast ? "mt-2" : ""}`}
                    style={{
                      opacity: s.opacity,
                      x: s.x,
                      ...(isLast ? { scale: step3scale } : {}),
                    }}>
                    <motion.span
                      className={`font-extrabold leading-none flex-shrink-0 tracking-[-0.04em] ${
                        isLast ? "text-5xl md:text-6xl min-w-[52px]" : "text-4xl min-w-[42px]"
                      }`}
                      style={{ color: s.numColor }}>
                      {s.num}
                    </motion.span>
                    <div>
                      <h3 className={`font-extrabold text-white mb-1.5 ${
                        isLast ? "text-[18px] md:text-[20px]" : "text-[15px]"
                      }`}>
                        {s.title}
                      </h3>
                      <p className={`text-slate-400 leading-relaxed ${
                        isLast ? "text-sm max-w-sm" : "text-xs max-w-xs"
                      }`}>
                        {s.desc}
                      </p>
                      {isLast && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#00C4A0]/20 bg-[#00C4A0]/5 px-3 py-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00C4A0] animate-pulse" />
                          <span className="text-[10px] text-[#00C4A0] font-medium tracking-wider uppercase">
                            {locale === "pt" ? "Órbita permanente" : locale === "es" ? "Órbita permanente" : "Permanent orbit"}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
