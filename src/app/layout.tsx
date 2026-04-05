import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: "Vida Digital Solutions | GoHighLevel Implementation & CRM Automation",
  description:
    "We implement GoHighLevel, automate business processes and integrate any system via API. Serving USA, Brazil and beyond. Built to Scale.",
  keywords: [
    "GoHighLevel",
    "CRM automation",
    "GHL implementation",
    "business automation",
    "RevOps",
    "n8n",
    "Stripe integration",
    "ClickUp",
    "WhatsApp automation",
  ],
  metadataBase: new URL("https://vidadigitalsolutions.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      pt: "/",
      es: "/",
    },
  },
  openGraph: {
    title: "Vida Digital Solutions | Built to Scale.",
    description:
      "We connect every tool your business runs on. Into one orbit. GoHighLevel implementation, CRM automation & system integrations.",
    url: "https://vidadigitalsolutions.com",
    siteName: "Vida Digital Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vida Digital Solutions — Built to Scale.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vida Digital Solutions | Built to Scale.",
    description:
      "GoHighLevel implementation, CRM automation & system integrations. Serving USA, Brazil and beyond.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vida Digital Solutions",
  description:
    "High-ticket GoHighLevel implementation, business automation, and revenue operations for companies that build to scale.",
  url: "https://vidadigitalsolutions.com",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Victor Melo",
    jobTitle: "Director & Technical Lead",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Brazil" },
    { "@type": "Place", name: "Global" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GHL Implementation & RevOps",
          description:
            "Full GoHighLevel ecosystem setup. Pipelines, automations, onboarding. Commercial, operational and financial in one system.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automation & Integrations",
          description:
            "n8n, GHL, Zapier. Any system with API: Stripe, Asaas, ClickUp, ZapSign, WhatsApp, Meta Ads, Google and more.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Quasar CRM",
          description:
            "White-label all-in-one platform. CRM, automations, funnels, email, SMS, scheduling.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white text-[#0A0A0F] font-[family-name:var(--font-inter)]">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
