"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Always use desktop values for transforms to avoid hydration mismatch
  // Mobile scaling is handled via CSS classes instead
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [20, 14, 8, 3, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.05, 1.04, 1.02, 1.01, 1]
  );
  const translate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -25, -50, -75, -100]
  );

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

// Fixed star positions to avoid hydration mismatch
const STARS = [
  { top: "4%", left: "12%", s: 1.5, o: 0.4 },
  { top: "15%", left: "78%", s: 1, o: 0.3 },
  { top: "30%", left: "92%", s: 1.5, o: 0.25 },
  { top: "45%", left: "5%", s: 1, o: 0.35 },
  { top: "55%", left: "55%", s: 1.5, o: 0.2 },
  { top: "70%", left: "88%", s: 1, o: 0.4 },
  { top: "80%", left: "20%", s: 1.5, o: 0.3 },
  { top: "90%", left: "65%", s: 1, o: 0.35 },
  { top: "10%", left: "40%", s: 1, o: 0.2 },
  { top: "62%", left: "35%", s: 1.5, o: 0.25 },
];

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-2 border-slate-200 p-2 md:p-4 bg-white rounded-[22px] shadow-2xl"
    >
      {/* Browser bar */}
      <div className="bg-slate-50 rounded-t-xl border-b border-slate-100 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-1.5 md:gap-2 mb-0">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400" />
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400" />
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 ml-2 md:ml-3 bg-slate-100 rounded-md px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] text-slate-400 font-mono">
          vidadigitalsolutions.com
        </div>
      </div>

      {/* Screen content — dark starfield */}
      <div className="relative h-[calc(100%-2rem)] md:h-[calc(100%-2.5rem)] w-full overflow-hidden rounded-b-xl bg-[#060D1C] p-3 md:p-6">
        {/* Stars — fixed positions */}
        {STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ top: star.top, left: star.left, width: star.s, height: star.s, opacity: star.o }}
          />
        ))}
        {/* Aurora glows */}
        <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,47,94,0.25) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,196,160,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(75,108,183,0.08) 0%, transparent 70%)" }} />
        {/* Content centered */}
        <div className="relative z-10 h-full flex flex-col justify-center overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
