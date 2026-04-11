import { BrasilPage } from "./BrasilPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vida Marketing | Tráfego Pago, CRM e Automação para Empresas Brasileiras",
  description:
    "Agência de tráfego pago, CRM com automação, inteligência artificial e e-commerce para lojas de roupa, salões de beleza e proteção veicular no Brasil. Case Prin Modas: de 11K para 130K seguidores. Nota fiscal no Brasil. CNPJ ativo.",
  keywords: [
    // Tráfego pago
    "tráfego pago", "gestão de tráfego", "gestor de tráfego",
    "tráfego pago para loja", "tráfego pago para e-commerce",
    "tráfego pago Instagram", "tráfego pago Facebook",
    "agência de tráfego pago", "tráfego pago Belo Horizonte",
    "tráfego pago para moda feminina", "tráfego pago para loja de roupa",
    "tráfego pago para salão de beleza", "tráfego pago para proteção veicular",
    "Meta Ads", "Google Ads", "Facebook Ads", "Instagram Ads",
    "anúncios pagos", "campanha de tráfego", "ROI em tráfego pago",
    // CRM e automação
    "CRM para loja", "CRM para e-commerce", "CRM automação",
    "automação de marketing", "automação de vendas", "automação WhatsApp",
    "automação de atendimento", "funil de vendas automático",
    "follow-up automático", "disparo em massa WhatsApp",
    "automação para loja de roupa", "CRM para moda feminina",
    "automação para salão de beleza", "CRM proteção veicular",
    "Quasar CRM", "GoHighLevel Brasil", "GHL Brasil",
    // Inteligência artificial
    "inteligência artificial para negócios", "IA para vendas",
    "chatbot inteligente", "chatbot WhatsApp", "chatbot Instagram",
    "IA para atendimento", "IA para marketing", "bot de vendas",
    "inteligência artificial para loja", "IA para e-commerce",
    // E-commerce e Nuvem Shop
    "e-commerce", "loja virtual", "Nuvem Shop", "NuvemShop",
    "criar loja virtual", "e-commerce moda feminina",
    "loja online de roupas", "plataforma de e-commerce",
    "integração Nuvem Shop", "automação e-commerce",
    // Moda feminina e lojas
    "marketing para moda feminina", "marketing para loja de roupa",
    "tráfego pago para moda", "como vender roupa online",
    "marketing digital para loja", "Instagram para loja de roupa",
    "como crescer loja no Instagram", "vender roupa pela internet",
    "Prin Modas", "case Prin Modas", "case de sucesso moda feminina",
    // Salão de beleza e estética
    "marketing para salão de beleza", "tráfego pago para salão",
    "CRM para salão de beleza", "automação para salão",
    "como atrair clientes para salão", "marketing para estética",
    "Scarlett Caroline Beauty",
    // Proteção veicular
    "marketing para proteção veicular", "CRM proteção veicular",
    "automação para associação veicular", "gestão de inadimplência",
    "cobrança automática proteção veicular", "régua de cobrança automática",
    "Gerais Proteção Veicular",
    // Joalheria e acessórios
    "marketing para joalheria", "tráfego pago para joalheria",
    "Viveza Pratas",
    // Rastreamento e dados
    "pixel Facebook", "CAPI Meta", "rastreamento de conversões",
    "Google Analytics", "rastreamento de dados", "atribuição de vendas",
    // Marketing digital geral
    "marketing digital", "agência de marketing digital",
    "agência de marketing", "marketing digital Brasil",
    "agência de marketing Belo Horizonte", "agência de marketing BH",
    "agência de marketing Minas Gerais", "marketing digital MG",
    // Cidades brasileiras
    "tráfego pago São Paulo", "marketing digital São Paulo",
    "agência de marketing Rio de Janeiro", "tráfego pago Curitiba",
    "marketing digital Brasília", "agência marketing Campinas",
    "tráfego pago Florianópolis", "marketing digital Porto Alegre",
    // Landing page e site
    "criação de site", "landing page", "site para loja",
    "site para empresa", "site profissional",
    // Disparo em massa
    "disparo em massa", "disparo WhatsApp", "email marketing",
    "SMS marketing", "campanha de reativação",
    "marketing de base de clientes",
    // Marca
    "Vida Marketing", "Vida Digital Solutions", "Vida Digital Solutions Brasil",
  ],
  openGraph: {
    title: "Vida Marketing | Tráfego Pago, CRM e Automação no Brasil",
    description: "De 11K para 130K seguidores. Tráfego pago, CRM, automação, IA e e-commerce para empresas brasileiras. Case Prin Modas. Nota fiscal no Brasil.",
    url: "https://vidadigitalsolutions.com/brasil",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vida Marketing | Tráfego Pago + CRM + Automação",
    description: "Agência brasileira com expertise americana. Case Prin Modas: 11K → 130K seguidores.",
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
    canonical: "https://vidadigitalsolutions.com/brasil",
  },
  other: {
    "geo.region": "BR-MG",
    "geo.placename": "Belo Horizonte",
    "ICBM": "-19.9167, -43.9345",
  },
}

// JSON-LD LocalBusiness para a operação Brasil
const jsonLdBrasil = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: "Vida Marketing",
  alternateName: "Vida Digital Solutions — Brasil",
  description: "Agência de tráfego pago, CRM, automação e inteligência artificial para empresas brasileiras. Especialistas em moda feminina, salões de beleza, proteção veicular e e-commerce.",
  url: "https://vidadigitalsolutions.com/brasil",
  logo: "https://vidadigitalsolutions.com/logos/logo-vida-marketing.png",
  telephone: "+5531999700039",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.9167,
    longitude: -43.9345,
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Vida Digital Solutions LLC",
    url: "https://vidadigitalsolutions.com",
  },
  areaServed: [
    { "@type": "City", name: "Belo Horizonte" },
    { "@type": "City", name: "São Paulo" },
    { "@type": "City", name: "Rio de Janeiro" },
    { "@type": "City", name: "Curitiba" },
    { "@type": "City", name: "Brasília" },
    { "@type": "Country", name: "Brazil" },
  ],
  sameAs: [
    "https://www.instagram.com/vidamkt/",
    "https://www.facebook.com/vidamktoficial/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tráfego Pago", description: "Meta Ads e Google Ads com estratégia, segmentação e otimização contínua para lojas, salões e empresas." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM e Automação", description: "Funis de vendas, follow-up automático, WhatsApp, email marketing integrado no Quasar CRM." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce e Nuvem Shop", description: "Lojas virtuais, integração com Nuvem Shop e automação de vendas online." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Inteligência Artificial", description: "Chatbots inteligentes para WhatsApp e Instagram. Relatórios otimizados por IA." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Disparo em Massa", description: "Campanhas segmentadas de WhatsApp, email e SMS para reativar base de clientes." } },
    ],
  },
}

export default function Brasil() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBrasil) }}
      />
      <BrasilPage />
    </>
  )
}
