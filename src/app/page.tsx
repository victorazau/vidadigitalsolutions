"use client";

import { AutoLocaleProvider as LocaleProvider } from "@/components/AutoLocaleProvider";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LogoBar } from "@/components/sections/logo-bar";
import { Benefits } from "@/components/sections/benefits";
import { Cases } from "@/components/sections/cases";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Blog } from "@/components/sections/blog";
import { FAQ } from "@/components/sections/faq";
import { CTAFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";

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
