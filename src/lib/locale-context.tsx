"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "./i18n";

const COOKIE_KEY = "vds_lang";
const VALID_LOCALES: Locale[] = ["en", "pt", "es"];

const SPANISH_COUNTRIES = [
  "MX", "AR", "CO", "ES", "CL", "PE", "VE", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY",
];

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
});

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) return val;
  }
  return null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
}

function detectLocaleFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || "";
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export function LocaleProvider({
  children,
  countryCode,
}: {
  children: ReactNode;
  countryCode?: string;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 1. Check saved preference (cookie)
    const saved = getCookie(COOKIE_KEY);
    if (saved && VALID_LOCALES.includes(saved as Locale)) {
      setLocaleState(saved as Locale);
      setInitialized(true);
      return;
    }

    // 2. Check Cloudflare country header (passed as prop)
    if (countryCode) {
      if (countryCode === "BR") {
        setLocaleState("pt");
        setCookie(COOKIE_KEY, "pt");
        setInitialized(true);
        return;
      }
      if (SPANISH_COUNTRIES.includes(countryCode)) {
        setLocaleState("es");
        setCookie(COOKIE_KEY, "es");
        setInitialized(true);
        return;
      }
    }

    // 3. Fallback to browser language
    const browserLocale = detectLocaleFromBrowser();
    setLocaleState(browserLocale);
    setCookie(COOKIE_KEY, browserLocale);
    setInitialized(true);
  }, [countryCode]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(COOKIE_KEY, newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
