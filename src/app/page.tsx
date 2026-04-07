"use client";

import dynamic from "next/dynamic";
import { AutoLocaleProvider as LocaleProvider } from "@/components/AutoLocaleProvider";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LogoBar } from "@/components/sections/logo-bar";
import { Footer } from "@/components/sections/footer";

// Lazy load heavy sections — only load when needed
const Benefits = dynamic(() => import("@/components/sections/benefits").then(m => ({ default: m.Benefits })), { ssr: true });
const Cases = dynamic(() => import("@/components/sections/cases").then(m => ({ default: m.Cases })), { ssr: true });
const Services = dynamic(() => import("@/components/sections/services").then(m => ({ default: m.Services })), { ssr: true });
const Process = dynamic(() => import("@/components/sections/process").then(m => ({ default: m.Process })), { ssr: true });
const Blog = dynamic(() => import("@/components/sections/blog").then(m => ({ default: m.Blog })), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/faq").then(m => ({ default: m.FAQ })), { ssr: true });
const CTAFinal = dynamic(() => import("@/components/sections/cta-final").then(m => ({ default: m.CTAFinal })), { ssr: true });

export default function Home() {
  return (
    <LocaleProvider>
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <Benefits />
        <Cases />
        <Services />
        <Process />
        <Blog />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
