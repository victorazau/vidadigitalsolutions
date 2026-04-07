"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LocaleProvider } from "@/lib/locale-context";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) return val;
  }
  return null;
}

export function AutoLocaleProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<string | undefined>(undefined);

  useEffect(() => {
    const c = getCookie("vds_country");
    if (c) setCountry(c);
  }, []);

  return (
    <LocaleProvider countryCode={country}>
      {children}
    </LocaleProvider>
  );
}
