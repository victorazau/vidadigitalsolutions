import { CleaningPage } from "./CleaningPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website, Logo & Google Business Profile for House Cleaning Companies | Vida Digital Solutions",
  description:
    "Complete launch package for house cleaning businesses in the US: visual identity, professional website optimized for Google and AI, Google Business Profile and CRM. 30+ businesses launched since 2021. We speak English, Portuguese and Spanish.",
  keywords: [
    // EN — core
    "website for cleaning business", "cleaning company website design",
    "logo for cleaning business", "cleaning business branding",
    "google business profile for cleaners", "google my business cleaning company",
    "how to get cleaning clients", "marketing for house cleaning business",
    "cleaning business starter package", "house cleaning website",
    "maid service website", "cleaning service logo design",
    "crm for cleaning business", "booking system for cleaning company",
    "get found on google cleaning business", "ai seo for small business",
    // EN — cities
    "cleaning business marketing Miami", "cleaning business website Boston",
    "cleaning company branding Philadelphia", "house cleaning marketing Orlando",
    "cleaning business website New Jersey", "maid service marketing Massachusetts",
    // PT — brasileiras nos EUA
    "site para housecleaning", "site para empresa de limpeza nos EUA",
    "logo para housecleaning", "identidade visual para limpeza",
    "como conseguir clientes de limpeza nos EUA", "marketing para housecleaning",
    "google meu negócio para limpeza", "divulgar empresa de limpeza nos Estados Unidos",
    "site para faxineira americana", "empresa de limpeza brasileira nos EUA",
    // ES — hispanas
    "página web para empresa de limpieza", "logo para empresa de limpieza",
    "como conseguir clientes de limpieza en USA", "marketing para limpieza de casas",
    "google business para limpieza", "sitio web para servicio de limpieza",
    // Marca
    "Vida Digital Solutions", "Quasar CRM",
  ],
  openGraph: {
    title: "Get Your Cleaning Business Found — on Google and by AI",
    description:
      "Visual identity + website + Google Business Profile for house cleaning companies in the US. 30+ businesses launched. English, Portuguese and Spanish.",
    url: "https://vidadigitalsolutions.com/cleaning",
    images: [{ url: "/cleaning/branding-cleaning.jpg", width: 1600, height: 830, alt: "Complete visual identity delivered for a house cleaning company" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website + Logo + Google Business Profile for Cleaning Companies",
    description: "Complete launch package for house cleaning businesses in the US. We speak English, Portuguese and Spanish.",
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
  alternates: {
    canonical: "https://vidadigitalsolutions.com/cleaning",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Miami",
    "ICBM": "25.7743, -80.1937",
  },
}

const jsonLdCleaning = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vida Digital Solutions — Marketing for House Cleaning Companies",
  description:
    "Complete launch package for house cleaning businesses in the United States: visual identity, professional website optimized for Google and AI assistants, Google Business Profile and Quasar CRM. Service in English, Portuguese and Spanish.",
  url: "https://vidadigitalsolutions.com/cleaning",
  logo: "https://vidadigitalsolutions.com/logo.png",
  telephone: "+14382985740",
  email: "info@vidadigitalsolutions.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "28 W Flagler St SUITE 300-B",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33130",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.7743, longitude: -80.1937 },
  parentOrganization: {
    "@type": "Organization",
    name: "Vida Digital Solutions LLC",
    url: "https://vidadigitalsolutions.com",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "City", name: "Miami" },
    { "@type": "City", name: "Orlando" },
    { "@type": "City", name: "Boston" },
    { "@type": "City", name: "Philadelphia" },
    { "@type": "City", name: "Newark" },
    { "@type": "City", name: "Atlanta" },
    { "@type": "City", name: "New York" },
  ],
  knowsLanguage: ["en", "pt", "es"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Packages for House Cleaning Companies",
    itemListElement: [
      {
        "@type": "Offer",
        price: "997",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: "Brand Essentials",
          description: "Complete visual identity (logo, business card, t-shirt, car magnet, door hanger) + Google Business Profile setup and optimization.",
        },
      },
      {
        "@type": "Offer",
        price: "1997",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: "Complete Launch",
          description: "Visual identity + professional website optimized for Google and AI + quote form connected to WhatsApp + Google Business Profile.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Launch + Automation",
          description: "Complete Launch package + Quasar CRM: automatic review requests, missed-call text-back, follow-up and scheduling.",
        },
      },
    ],
  },
}

export default function Cleaning() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCleaning) }}
      />
      <CleaningPage />
    </>
  )
}
