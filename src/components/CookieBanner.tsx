"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

type ConsentStatus = "pending" | "accepted" | "rejected" | "custom";

const COOKIE_KEY = "vds_cookie_consent";
const COOKIE_EXPIRES_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.substring(0, eqIndex);
    const val = trimmed.substring(eqIndex + 1);
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

function loadGoogleAnalytics() {
  if (typeof window === "undefined") return;
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-6L8QCB30PB"; // Replace with your GA4 ID
  script.async = true;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) { window.dataLayer.push(args); }
  gtag("js", new Date());
  gtag("config", "G-6L8QCB30PB", { anonymize_ip: true });
}

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  if ((window as unknown as Record<string, unknown>).fbq) return;

  /* eslint-disable */
  const script = document.createElement("script");
  script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','1241390329847733');
    fbq('track','PageView');
  `;
  document.head.appendChild(script);
  /* eslint-enable */
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const saved = getCookie(COOKIE_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    try {
      const parsed = JSON.parse(decodeURIComponent(saved));
      if (parsed.analytics) loadGoogleAnalytics();
      if (parsed.marketing) loadMetaPixel();
    } catch {}
  }, []);

  function saveConsent(state: ConsentState, status: ConsentStatus) {
    const payload = JSON.stringify({ ...state, status, timestamp: new Date().toISOString() });
    setCookie(COOKIE_KEY, encodeURIComponent(payload), COOKIE_EXPIRES_DAYS);
    if (state.analytics) loadGoogleAnalytics();
    if (state.marketing) loadMetaPixel();
    setVisible(false);
  }

  function acceptAll() {
    const all: ConsentState = { essential: true, analytics: true, marketing: true, functional: true };
    saveConsent(all, "accepted");
  }

  function rejectAll() {
    const minimal: ConsentState = { essential: true, analytics: false, marketing: false, functional: false };
    saveConsent(minimal, "rejected");
  }

  function saveCustom() {
    saveConsent(consent, "custom");
  }

  if (!visible) return null;

  return (
    <>
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowDetails(false)}
        />
      )}

      {/* Main banner */}
      {!showDetails && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-md rounded-t-xl md:rounded-xl p-5 shadow-2xl"
          style={{ background: "#0D1B3E", border: "0.5px solid rgba(75,108,183,0.4)" }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-[20px]">&#x1F36A;</span>
            <span className="text-white text-[14px] font-medium">We use cookies</span>
          </div>

          <p className="text-[#94A3B8] text-[12px] leading-relaxed mb-4">
            We use essential, analytics, and marketing cookies to improve your experience and understand how our site is used.
            Read our{" "}
            <Link href="/cookies" className="text-[#00C4A0] underline">Cookie Policy</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-[#00C4A0] underline">Privacy Policy</Link>.
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={acceptAll}
              className="flex-1 min-w-[100px] bg-[#00C4A0] text-[#060D1C] rounded-lg px-4 py-2.5 text-[12px] font-medium cursor-pointer"
            >
              Accept all
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 min-w-[100px] bg-transparent text-[#94A3B8] border border-[#4B6CB7]/40 rounded-lg px-4 py-2.5 text-[12px] cursor-pointer"
            >
              Reject non-essential
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="bg-transparent text-[#4B6CB7] border-none px-2 py-2.5 text-[11px] cursor-pointer underline whitespace-nowrap"
            >
              Manage
            </button>
          </div>
        </div>
      )}

      {/* Detail panel */}
      {showDetails && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-lg rounded-t-xl md:rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          style={{ background: "#0D1B3E", border: "0.5px solid rgba(75,108,183,0.4)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-[15px] font-medium">Cookie Preferences</span>
            <button
              onClick={() => setShowDetails(false)}
              className="bg-none border-none text-[#475569] cursor-pointer text-[18px] leading-none"
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          <p className="text-[#64748B] text-[12px] leading-relaxed mb-5">
            Choose which cookies you allow. Essential cookies cannot be disabled as they are required for the website to function.
          </p>

          {[
            {
              key: "essential" as const,
              label: "Essential",
              description: "Required for basic website functionality (language, consent storage, security). Cannot be disabled.",
              examples: "Cookie consent, language preference, Cloudflare security",
              locked: true,
            },
            {
              key: "analytics" as const,
              label: "Analytics",
              description: "Help us understand how visitors use our site. Data is anonymized.",
              examples: "Google Analytics (session data, page views, traffic sources)",
              locked: false,
            },
            {
              key: "marketing" as const,
              label: "Marketing",
              description: "Track ad campaign performance and enable targeted advertising.",
              examples: "Meta Pixel, LinkedIn Insight, Google Ads",
              locked: false,
            },
            {
              key: "functional" as const,
              label: "Functional",
              description: "Enable enhanced features like theme preferences and chat widgets.",
              examples: "Theme preference, Calendly scheduling widget",
              locked: false,
            },
          ].map((cat) => (
            <div
              key={cat.key}
              className="bg-[#060D1C] rounded-xl p-3.5 mb-2.5 border border-[#4B6CB7]/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-white text-[13px] font-medium mb-1">
                    {cat.label}
                    {cat.locked && (
                      <span className="text-[#2a4a7a] text-[10px] ml-2 bg-[#4B6CB7]/15 px-1.5 py-0.5 rounded">
                        Always on
                      </span>
                    )}
                  </div>
                  <div className="text-[#64748B] text-[11px] leading-snug">{cat.description}</div>
                  <div className="text-[#2a4a7a] text-[10px] mt-1">{cat.examples}</div>
                </div>
                <button
                  role="switch"
                  aria-checked={consent[cat.key]}
                  disabled={cat.locked}
                  onClick={() => {
                    if (!cat.locked) setConsent((prev) => ({ ...prev, [cat.key]: !prev[cat.key] }));
                  }}
                  className="relative w-[44px] h-[24px] rounded-full border-none flex-shrink-0 transition-colors"
                  style={{
                    background: consent[cat.key] ? "#00C4A0" : "rgba(75,108,183,0.2)",
                    cursor: cat.locked ? "not-allowed" : "pointer",
                    opacity: cat.locked ? 0.6 : 1,
                  }}
                  aria-label={`${cat.label} cookies`}
                >
                  <span
                    className="absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-[left]"
                    style={{ left: consent[cat.key] ? "22px" : "2px" }}
                  />
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <button
              onClick={saveCustom}
              className="flex-1 bg-[#1B2F5E] text-white border border-[#4B6CB7]/40 rounded-lg py-2.5 text-[12px] font-medium cursor-pointer"
            >
              Save preferences
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 bg-[#00C4A0] text-[#060D1C] border-none rounded-lg py-2.5 text-[12px] font-medium cursor-pointer"
            >
              Accept all
            </button>
          </div>

          <p className="text-[#2a4a7a] text-[10px] text-center mt-3">
            <Link href="/cookies" className="text-[#2a4a7a]">Cookie Policy</Link>
            {" · "}
            <Link href="/privacy" className="text-[#2a4a7a]">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="text-[#2a4a7a]">Terms of Service</Link>
          </p>
        </div>
      )}
    </>
  );
}
