"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
  starCount?: number;
}

export function AuroraBackground({
  children,
  className = "",
  starCount = 60,
}: AuroraBackgroundProps) {
  // Deterministic star positions to avoid hydration mismatch
  const stars = React.useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => {
        const seed = (i + 1) * 7.31
        return {
          id: i,
          x: ((seed * 13.37) % 100),
          y: ((seed * 9.73) % 100),
          size: 0.5 + ((seed * 3.14) % 1.5),
          delay: (seed * 1.23) % 5,
          duration: 3 + ((seed * 2.17) % 4),
        }
      }),
    [starCount]
  );

  return (
    <div
      className={`relative flex flex-col w-full items-center justify-center bg-[#060D1C] text-slate-50 overflow-hidden ${className}`}
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
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

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-35 mix-blend-screen"
        style={{ background: "#1B2F5E" }}
        animate={{ x: [-50, 50, -50], y: [-20, 20, -20], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl opacity-30 mix-blend-screen"
        style={{ background: "#00C4A0" }}
        animate={{ x: [50, -50, 50], y: [20, -20, 20], scale: [1, 1.3, 1] }}
        transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full filter blur-3xl opacity-25 mix-blend-screen"
        style={{ background: "#4B6CB7" }}
        animate={{ x: [20, -20, 20], y: [-30, 30, -30], rotate: [0, 360, 0] }}
        transition={{ duration: 50, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
