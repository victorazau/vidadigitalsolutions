"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060D1C] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Stars */}
      {[
        { top: "10%", left: "15%", s: 1.5, o: 0.4 },
        { top: "25%", left: "80%", s: 1, o: 0.3 },
        { top: "50%", left: "90%", s: 1.5, o: 0.25 },
        { top: "70%", left: "8%", s: 1, o: 0.5 },
        { top: "85%", left: "60%", s: 1.5, o: 0.3 },
        { top: "40%", left: "45%", s: 1, o: 0.2 },
      ].map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.s, height: s.s, opacity: s.o }} />
      ))}

      {/* Aurora glow */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27,47,94,0.3) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,196,160,0.15) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        <Image
          src="/logo-h.png"
          alt="Vida Digital Solutions"
          width={160}
          height={36}
          className="h-8 w-auto mx-auto mb-8 brightness-0 invert"
          unoptimized
        />

        <p className="text-[#00C4A0] text-[13px] font-extrabold tracking-[0.2em] uppercase mb-4">
          404
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-[-0.04em] mb-4">
          Lost in orbit.
        </h1>

        <p className="text-[#94A3B8] text-base mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another orbit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border border-[#2a3a5a] text-white hover:bg-white/5 transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
