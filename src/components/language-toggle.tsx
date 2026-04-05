"use client";

import { useLocale } from "@/lib/locale-context";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; flag: string }[] = [
  { code: "en", flag: "🇺🇸" },
  { code: "pt", flag: "🇧🇷" },
  { code: "es", flag: "🇪🇸" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`flex items-center justify-center rounded-full w-8 h-8 text-base transition-all ${
            locale === lang.code
              ? "bg-white shadow-sm scale-110"
              : "opacity-50 hover:opacity-80"
          }`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
