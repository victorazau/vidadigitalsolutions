"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const { locale } = useLocale();
  const text = t(locale);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/logo-h.png"
            alt="Vida Digital Solutions"
            width={180}
            height={40}
            className="h-8 md:h-9 w-auto"
            unoptimized
            priority
          />
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {[
            { href: "#services", label: text.nav.services },
            { href: "#cases", label: text.nav.cases },
            { href: "#process", label: text.nav.process },
            { href: "/blog", label: "Blog" },
            { href: "#quasar", label: text.nav.quasar },
            { href: "#contact", label: text.nav.contact },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#475569] transition-colors hover:text-[#1B2F5E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="/book"
            className="hidden rounded-lg bg-[#1B2F5E] px-5 py-2 text-sm text-white font-semibold hover:bg-[#1B2F5E]/90 transition-colors sm:flex"
          >
            {text.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
