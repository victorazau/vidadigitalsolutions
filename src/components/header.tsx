"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { LanguageToggle } from "./language-toggle";
import { Menu, X } from "lucide-react";

export function Header() {
  const { locale } = useLocale();
  const text = t(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/#services", label: text.nav.services },
    { href: "/#cases", label: text.nav.cases },
    { href: "/#process", label: text.nav.process },
    { href: "/blog", label: "Blog" },
    { href: "https://quasarcrm.com", label: text.nav.quasar, external: true },
    { href: "/#contact", label: text.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileOpen(false);
      window.location.href = href;
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
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

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-[#475569] transition-colors hover:text-[#1B2F5E]"
                {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#475569] hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-16 bg-white/95 backdrop-blur-lg lg:hidden">
          <nav className="flex flex-col items-center gap-6 pt-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg text-[#0A0A0F] font-medium hover:text-[#1B2F5E] transition-colors"
                {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-lg bg-[#1B2F5E] px-8 py-3 text-base text-white font-semibold hover:bg-[#1B2F5E]/90 transition-colors"
            >
              {text.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
