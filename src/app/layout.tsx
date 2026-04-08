import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { TrackingEvents } from "@/components/TrackingEvents";
import { FloatingButtons } from "@/components/FloatingButtons";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  title: "Vida Digital Solutions | GoHighLevel Implementation & CRM Automation Miami",
  description:
    "We implement GoHighLevel, automate business processes and integrate any system via API. CRM automation specialists in Miami, FL serving USA, Brazil and beyond. Built to Scale.",
  keywords: [
    // Core services
    "GoHighLevel", "GHL implementation", "CRM automation", "business automation",
    "RevOps", "revenue operations", "n8n automation", "Zapier integration",
    // Tools
    "Stripe integration", "ClickUp integration", "WhatsApp automation",
    "ZapSign digital contracts", "Asaas payment", "Meta Ads tracking",
    // City targeting — Miami
    "GoHighLevel Miami", "CRM automation Miami", "business automation Miami FL",
    "GHL implementation Miami", "marketing automation Miami",
    // City targeting — South Florida
    "CRM automation South Florida", "business automation Fort Lauderdale",
    "GoHighLevel Boca Raton", "marketing automation Doral",
    // US general
    "GoHighLevel implementation USA", "CRM automation United States",
    "business process automation US", "GHL agency USA",
    // Brazil
    "GoHighLevel Brasil", "automação empresarial", "implementação GHL",
    "CRM automação Brasil", "automação de processos",
    // Spanish
    "GoHighLevel implementación", "automatización CRM", "automatización empresarial",
    // Industry specific
    "CRM for cleaning companies", "CRM for law firms", "CRM for real estate",
    "CRM for medical clinics", "CRM for accounting firms",
    "automation for service businesses", "automation for small business",
    // Comparison
    "GoHighLevel vs HubSpot", "GoHighLevel vs Salesforce", "best CRM for small business",
    // Long tail
    "how to automate client onboarding", "automate WhatsApp follow-up",
    "automate billing and invoicing", "CRM pipeline automation",
    "lead nurturing automation", "appointment booking automation",
    // Brand
    "Vida Digital Solutions", "Quasar CRM", "Built to Scale",
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
      "We connect every tool your business runs on. Into one orbit. GoHighLevel implementation, CRM automation & system integrations in Miami, FL.",
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
      "GoHighLevel implementation, CRM automation & system integrations. Miami, FL. Serving USA, Brazil and beyond.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    // Geo meta tags — Miami, FL
    "geo.region": "US-FL",
    "geo.placename": "Miami",
    "geo.position": "25.7743;-80.1937",
    "ICBM": "25.7743, -80.1937",
    // Business meta
    "business:contact_data:street_address": "28 W Flagler St SUITE 300-B",
    "business:contact_data:locality": "Miami",
    "business:contact_data:region": "FL",
    "business:contact_data:postal_code": "33130",
    "business:contact_data:country_name": "United States",
    "business:contact_data:phone_number": "+14382985740",
    "business:contact_data:website": "https://vidadigitalsolutions.com",
  },
};

// ProfessionalService + Person Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://vidadigitalsolutions.com/#organization",
      name: "Vida Digital Solutions",
      legalName: "Vida Digital Solutions LLC",
      description:
        "High-ticket GoHighLevel implementation, business automation, and revenue operations for companies that build to scale.",
      url: "https://vidadigitalsolutions.com",
      logo: "https://vidadigitalsolutions.com/logo.png",
      image: "https://vidadigitalsolutions.com/og-image.png",
      foundingDate: "2020",
      founder: { "@id": "https://vidadigitalsolutions.com/#founder" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "28 W Flagler St SUITE 300-B",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33130",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.7743,
        longitude: -80.1937,
      },
      telephone: "+14382985740",
      email: "info@vidadigitalsolutions.com",
      priceRange: "$$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "8",
        bestRating: "5",
      },
      areaServed: [
        { "@type": "City", name: "Miami", containedInPlace: { "@type": "State", name: "Florida" } },
        { "@type": "State", name: "Florida" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Brazil" },
        { "@type": "Place", name: "Global" },
      ],
      sameAs: [
        "https://www.linkedin.com/company/vidadigitalsolutions/",
        "https://www.instagram.com/vida.digital_solutions",
        "https://www.facebook.com/Vida.Digital.Solutions/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "GoHighLevel Implementation & RevOps",
              description: "Full GoHighLevel ecosystem setup. Pipelines, automations, onboarding. Commercial, operational and financial in one system.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Process Automation & Integrations",
              description: "n8n, GHL, Zapier. Any system with API: Stripe, Asaas, ClickUp, ZapSign, WhatsApp, Meta Ads, Google and more.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Quasar CRM",
              description: "White-label all-in-one platform. CRM, automations, funnels, email, SMS, scheduling.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "WhatsApp Automation",
              description: "Automated follow-up sequences, appointment reminders, post-service review requests, and mass messaging campaigns.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Contracts & Billing Automation",
              description: "ZapSign automated contract flow, Asaas billing integration with PIX, boleto, and credit card payments.",
            },
          },
        ],
      },
    },
    // Person Schema — Victor Melo
    {
      "@type": "Person",
      "@id": "https://vidadigitalsolutions.com/#founder",
      name: "Victor Melo",
      jobTitle: "Founder & Technical Lead",
      worksFor: { "@id": "https://vidadigitalsolutions.com/#organization" },
      url: "https://vidadigitalsolutions.com",
      sameAs: [
        "https://www.linkedin.com/in/victormelo",
      ],
      knowsAbout: [
        "GoHighLevel", "CRM Automation", "Business Process Automation",
        "Revenue Operations", "n8n", "System Integration", "API Development",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miami",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
  ],
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
        <TrackingEvents />
        <FloatingButtons />
        <CookieBanner />
      </body>
    </html>
  );
}
