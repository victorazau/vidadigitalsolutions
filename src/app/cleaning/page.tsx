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
    // EN — cities (comunidades brasileiras)
    "cleaning business marketing Miami", "cleaning business website Boston",
    "cleaning company branding Philadelphia", "house cleaning marketing Orlando",
    "cleaning business website New Jersey", "maid service marketing Massachusetts",
    "cleaning business website Framingham", "cleaning company marketing Everett MA",
    "house cleaning website Somerville", "cleaning business Malden MA",
    "cleaning company website Worcester", "maid service website Newark NJ",
    "cleaning business marketing Danbury CT", "house cleaning website Bridgeport",
    "cleaning company website Pompano Beach", "cleaning business Deerfield Beach",
    "house cleaning marketing Boca Raton", "cleaning business website Fort Lauderdale",
    "maid service marketing Atlanta", "cleaning company website Houston",
    "cleaning business website Charlotte NC", "house cleaning marketing San Francisco",
    "cleaning business marketing Salt Lake City", "maid service website Long Branch NJ",
    // PT — brasileiras nos EUA
    "site para housecleaning", "site para empresa de limpeza nos EUA",
    "logo para housecleaning", "identidade visual para limpeza",
    "como conseguir clientes de limpeza nos EUA", "marketing para housecleaning",
    "google meu negócio para limpeza", "divulgar empresa de limpeza nos Estados Unidos",
    "site para faxineira americana", "empresa de limpeza brasileira nos EUA",
    "housecleaning em Boston", "housecleaning em Framingham",
    "empresa de limpeza brasileira em Massachusetts", "cleaning em Everett",
    "housecleaning na Flórida", "empresa de limpeza em Miami",
    "housecleaning em Orlando", "cleaning em Pompano Beach",
    "empresa de limpeza em New Jersey", "housecleaning em Newark",
    "brasileiras em Danbury Connecticut", "cleaning em Atlanta",
    "como abrir empresa de limpeza nos EUA", "como divulgar cleaning nos EUA",
    "cartão de visita para housecleaning", "imã de carro para cleaning",
    "site para schedule de limpeza", "quanto custa um site para cleaning",
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
    images: [{ url: "/cleaning/branding-monteiros.jpg", width: 1920, height: 987, alt: "Complete visual identity delivered for a house cleaning company" }],
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
    // Massachusetts — maior comunidade brasileira dos EUA
    { "@type": "City", name: "Boston" },
    { "@type": "City", name: "Framingham" },
    { "@type": "City", name: "Everett" },
    { "@type": "City", name: "Somerville" },
    { "@type": "City", name: "Malden" },
    { "@type": "City", name: "Worcester" },
    { "@type": "City", name: "Lowell" },
    { "@type": "City", name: "Marlborough" },
    // Florida
    { "@type": "City", name: "Miami" },
    { "@type": "City", name: "Orlando" },
    { "@type": "City", name: "Pompano Beach" },
    { "@type": "City", name: "Deerfield Beach" },
    { "@type": "City", name: "Boca Raton" },
    { "@type": "City", name: "Fort Lauderdale" },
    { "@type": "City", name: "Kissimmee" },
    // New Jersey
    { "@type": "City", name: "Newark" },
    { "@type": "City", name: "Elizabeth" },
    { "@type": "City", name: "Harrison" },
    { "@type": "City", name: "Long Branch" },
    // Connecticut
    { "@type": "City", name: "Danbury" },
    { "@type": "City", name: "Bridgeport" },
    // Outras
    { "@type": "City", name: "New York" },
    { "@type": "City", name: "Mount Vernon" },
    { "@type": "City", name: "Atlanta" },
    { "@type": "City", name: "Philadelphia" },
    { "@type": "City", name: "Houston" },
    { "@type": "City", name: "Charlotte" },
    { "@type": "City", name: "San Francisco" },
    { "@type": "City", name: "Salt Lake City" },
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

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I don't speak English well. Can I still get a website for my cleaning business?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Vida Digital Solutions serves you in Portuguese, Spanish or English. Your website and brand are written in perfect English (the language of your clients), and everything is explained to you in your language." },
    },
    {
      "@type": "Question",
      name: "How does a house cleaning business get found on Google?",
      acceptedAnswer: { "@type": "Answer", text: "Three pieces working together: an optimized Google Business Profile so you appear on Google Maps in your service area, a professional website with the right structure and keywords, and a steady flow of Google reviews. Vida Digital Solutions sets up all three for cleaning businesses in the US." },
    },
    {
      "@type": "Question",
      name: "What does it mean for a cleaning business to be recommended by AI?",
      acceptedAnswer: { "@type": "Answer", text: "Homeowners increasingly ask ChatGPT and other AI assistants for 'the best house cleaner near me'. AI pulls answers from websites with the right structure and content. A site built for AI readability can be cited and recommended — most cleaning companies don't have this yet." },
    },
    {
      "@type": "Question",
      name: "How much does a complete launch package for a cleaning business cost?",
      acceptedAnswer: { "@type": "Answer", text: "Brand Essentials (visual identity + Google Business Profile) is $997. Complete Launch (identity + website optimized for Google and AI + quote form) is $1,997. Launch + Automation adds Quasar CRM for $147/month. All packages can be split into 4 interest-free payments at checkout." },
    },
    {
      "@type": "Question",
      name: "How long does it take to launch a cleaning business brand and website?",
      acceptedAnswer: { "@type": "Answer", text: "Visual identity is ready in about 7 days. The complete package — brand, website and Google Business Profile — takes 2 to 3 weeks from the first conversation to going live." },
    },
  ],
}

export default function Cleaning() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCleaning) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <CleaningPage />
    </>
  )
}
