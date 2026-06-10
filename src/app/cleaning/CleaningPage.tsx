"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle, Palette, Globe, MapPin, CalendarCheck, Bot,
  ChevronDown, Play, X, Check, Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Footer } from "@/components/sections/footer"
import { AutoLocaleProvider } from "@/components/AutoLocaleProvider"
import { useLocale } from "@/lib/locale-context"
import type { Locale } from "@/lib/i18n"
import { HeroHighlight } from "@/components/ui/hero-highlight"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { trackCleaningWhatsApp, trackCleaningVideoView, trackCleaningCheckout, trackCleaningPurchase } from "@/components/TrackingEvents"

const WHATSAPP_URL = "https://wa.me/14382985740"

const STRIPE_LINKS = [
  { url: "https://buy.stripe.com/28E7sM2y09oUbxV5kU7AI0s", plan: "essentials", value: 997 },
  { url: "https://buy.stripe.com/7sY5kE6OgdFagSfcNm7AI0t", plan: "launch", value: 1997 },
  { url: "https://buy.stripe.com/3cI4gAc8A9oU45t6oY7AI0u", plan: "automation", value: 2144 },
]

const PLAN_VALUES: Record<string, number> = { essentials: 997, launch: 1997, automation: 2144 }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const VIDEO_CDN = "https://assets.cdn.filesafe.space/bvXQZ1UUmgHH9wgr73sa/media"

const testimonials = [
  { name: "Vieira Cleaning Services", video: `${VIDEO_CDN}/2b7a916a-bdae-4e93-9a1c-758804783650.mp4` },
  { name: "Alessandra Cleaning", video: `${VIDEO_CDN}/7885cdb2-dce6-4d05-bd8a-b9d388550936.mp4` },
  { name: "Paty Cleaning", video: `${VIDEO_CDN}/142c8708-28d6-493a-bee3-daa7b7279b10.mp4` },
  { name: "Ferreira Cleaning", video: `${VIDEO_CDN}/296dca8f-d107-41c1-805f-2bd06531fe93.mp4` },
  { name: "Neatness Cleaning", video: `${VIDEO_CDN}/8abae70c-8a49-4fd7-9928-c511517116ed.mp4` },
]

const portfolio = [
  { name: "Monteiros Cleaning Service", img: "/cleaning/site-monteiroscleaning.jpg", url: "https://monteiroscleaningservice.com/" },
  { name: "Ita Cleaning", img: "/cleaning/site-itacleaning.jpg", url: "" },
  { name: "Ribeiro Cleaning", img: "/cleaning/site-ribeirocleaning.jpg", url: "" },
  { name: "Vieira Cleaning", img: "/cleaning/site-vieiracleaning.jpg", url: "" },
]

type Copy = {
  headerCta: string
  heroBadge: string
  heroTitle1: string
  heroTitle2: string
  heroSub: string
  heroCta: string
  heroCta2: string
  heroProof: string
  deliverLabel: string
  deliverTitle: string
  deliverSub: string
  deliverables: { title: string; desc: string }[]
  crmBadge: string
  crmTitle: string
  crmDesc: string
  brandLabel: string
  brandTitle: string
  brandCaption: string
  sitesLabel: string
  sitesTitle: string
  sitesSub: string
  videosLabel: string
  videosTitle: string
  videosSub: string
  watchVideo: string
  videoTag: string
  nextCardTitle: string
  nextCardDesc: string
  nextCardCta: string
  pricingLabel: string
  pricingTitle: string
  pricingSub: string
  popular: string
  oneTime: string
  perMonth: string
  plans: { name: string; price: string; monthly?: string; weekly: string; features: string[]; cta: string }[]
  orWhats: string
  pricingNote: string
  faqLabel: string
  faqTitle: string
  faqs: { q: string; a: string }[]
  stepsLabel: string
  stepsTitle: string
  steps: { title: string; desc: string }[]
  finalTitle: string
  finalSub: string
  finalBadge: string
  finalCta: string
}

const copy: Record<Locale, Copy> = {
  en: {
    headerCta: "WhatsApp",
    heroBadge: "For house cleaning businesses in the USA",
    heroTitle1: "Your cleaning business, found on Google.",
    heroTitle2: "And recommended by AI.",
    heroSub: "Professional brand, website and Google Business Profile — the complete package, built by the team that has launched 30+ small businesses in the US since 2021. We speak English, Portuguese and Spanish.",
    heroCta: "Chat on WhatsApp",
    heroCta2: "See packages",
    heroProof: "5.0 ★ on Google · 30+ businesses launched in the US",
    deliverLabel: "What you get",
    deliverTitle: "Everything a cleaning business needs to look professional.",
    deliverSub: "When a homeowner finds you, they decide in seconds if they trust you. We build everything that makes that decision a yes.",
    deliverables: [
      { title: "Complete Visual Identity", desc: "Logo, business cards, t-shirt, car magnet and door hanger. A brand that makes clients trust you before you say a word." },
      { title: "Website found by Google & AI", desc: "A fast, professional website structured so Google ranks you — and so AI assistants like ChatGPT recommend you when someone asks for a cleaner nearby." },
      { title: "Google Business Profile", desc: "Full setup and optimization to show up on Google Maps in the areas you serve, with a review strategy to climb past competitors." },
      { title: "Quotes straight to WhatsApp", desc: "A quote request form connected to your WhatsApp. Leads arrive on your phone ready to close — no email checking, no missed jobs." },
    ],
    crmBadge: "Optional add-on",
    crmTitle: "Quasar CRM",
    crmDesc: "Our all-in-one platform: automatic review requests, missed-call text-back, follow-up sequences and online scheduling. Your business runs even while you're cleaning.",
    brandLabel: "Real delivery",
    brandTitle: "This is what your brand can look like.",
    brandCaption: "Complete identity delivered for Monteiros Cleaning Service (New Jersey): logo, business cards, t-shirts, car magnet and door hanger — plus the website, live at monteiroscleaningservice.com.",
    sitesLabel: "Websites",
    sitesTitle: "Websites that turn searches into quote requests.",
    sitesSub: "Real websites we built for cleaning businesses in the US.",
    videosLabel: "Testimonials",
    videosTitle: "Cleaning business owners who started with us.",
    videosSub: "Brazilian women who built their cleaning businesses in the US — hear it from them.",
    watchVideo: "Watch testimonial",
    videoTag: "House cleaning · USA",
    nextCardTitle: "You're next.",
    nextCardDesc: "Your cleaning business deserves the same structure. Let's talk — in English, Portuguese or Spanish.",
    nextCardCta: "Start now",
    pricingLabel: "Packages",
    pricingTitle: "Clear pricing. Up to 4 interest-free payments.",
    pricingSub: "Pay online in one go, or split into 4 interest-free payments at checkout (Klarna / Afterpay) — you choose.",
    popular: "Most popular",
    oneTime: "one-time",
    perMonth: "/month",
    plans: [
      {
        name: "Brand Essentials",
        price: "$997",
        weekly: "or 4 interest-free payments at checkout",
        features: [
          "Logo + complete visual identity",
          "Business card, t-shirt, car magnet & door hanger designs",
          "Google Business Profile setup & optimization",
          "Review strategy to grow your stars",
        ],
        cta: "Start with Essentials",
      },
      {
        name: "Complete Launch",
        price: "$1,997",
        weekly: "or 4 interest-free payments at checkout",
        features: [
          "Everything in Brand Essentials",
          "Professional website optimized for Google & AI",
          "Quote form connected to your WhatsApp",
          "Domain + hosting for the first year",
          "Ready to run Google or Facebook ads",
        ],
        cta: "Launch my business",
      },
      {
        name: "Launch + Automation",
        price: "$1,997",
        monthly: "+ $147",
        weekly: "setup in up to 4 payments + monthly subscription",
        features: [
          "Everything in Complete Launch",
          "Quasar CRM: scheduling + client base",
          "Automatic review requests after each job",
          "Missed-call text-back (never lose a lead)",
          "Ongoing support in your language",
        ],
        cta: "Automate everything",
      },
    ],
    orWhats: "Questions first? Chat on WhatsApp →",
    pricingNote: "Secure checkout by Stripe · Split into 4 interest-free payments with Klarna or Afterpay · Prefer to talk first? Message us on WhatsApp.",
    faqLabel: "Common questions",
    faqTitle: "Still deciding? We get it.",
    faqs: [
      { q: "I don't speak English well. Is that a problem?", a: "Not at all. We serve you in Portuguese, Spanish or English — whichever you prefer. Your website and brand are written in perfect English (the language of your clients), and we explain everything to you in your language." },
      { q: "I get all my clients from referrals. Why do I need this?", a: "Referrals are great — but they have a ceiling. And here's the thing: when someone receives your name, the first thing they do is Google you. If nothing shows up, trust drops and they move on. A professional presence turns every referral into a closed deal, and brings new clients you'd never reach otherwise." },
      { q: "What does 'recommended by AI' mean?", a: "More and more homeowners ask ChatGPT and other AI assistants things like 'best house cleaner near me'. AI pulls answers from websites with the right structure and content. We build your site so AI can read it, cite it and recommend your business — most cleaning companies have no idea this exists yet." },
      { q: "How long does it take?", a: "Visual identity is ready in about 7 days. The complete package — brand, website and Google Business Profile — takes 2 to 3 weeks from our first conversation to going live." },
      { q: "Can I split the payment?", a: "Yes — up to 4 interest-free payments. At checkout you can choose Klarna or Afterpay and split any package into 4 payments on your card, with no interest. You can also pay in full with any card. Checkout is secure, by Stripe." },
      { q: "What exactly is Quasar CRM?", a: "It's our all-in-one platform: online scheduling, client database, automatic review requests after each job, missed-call text-back and follow-up messages. It's optional — you can add it at any time after launch." },
    ],
    stepsLabel: "How it works",
    stepsTitle: "3 steps to launch.",
    steps: [
      { title: "Message us on WhatsApp", desc: "Tell us about your business — in English, Portuguese or Spanish. No commitment." },
      { title: "We design and build", desc: "Brand, website and Google profile built for your service areas. You approve every piece." },
      { title: "You go live", desc: "In 2-3 weeks your business is on Google, looking professional and ready to win clients." },
    ],
    finalTitle: "Ready to look as professional as your work?",
    finalSub: "Free consultation · English, Portuguese & Spanish · Weekly payment plans",
    finalBadge: "Limited spots this month",
    finalCta: "Chat on WhatsApp",
  },
  pt: {
    headerCta: "WhatsApp",
    heroBadge: "Para empresas de limpeza nos EUA",
    heroTitle1: "Sua empresa de limpeza, encontrada no Google.",
    heroTitle2: "E recomendada pela IA.",
    heroSub: "Marca profissional, site e Google Business Profile — o pacote completo, feito pelo time que já lançou mais de 30 negócios nos EUA desde 2021. Atendimento em português.",
    heroCta: "Falar no WhatsApp",
    heroCta2: "Ver pacotes",
    heroProof: "5.0 ★ no Google · 30+ negócios lançados nos EUA",
    deliverLabel: "O que você recebe",
    deliverTitle: "Tudo que uma empresa de limpeza precisa para parecer profissional.",
    deliverSub: "Quando a cliente americana te encontra, ela decide em segundos se confia em você. Nós construímos tudo que transforma essa decisão num sim.",
    deliverables: [
      { title: "Identidade Visual Completa", desc: "Logo, cartão de visita, camiseta, imã de carro e door hanger. Uma marca que faz a cliente confiar em você antes de você dizer uma palavra." },
      { title: "Site encontrado pelo Google e pela IA", desc: "Um site rápido e profissional, estruturado para o Google te rankear — e para assistentes de IA como o ChatGPT te recomendarem quando alguém procura uma cleaner na região." },
      { title: "Google Business Profile", desc: "Configuração e otimização completa para aparecer no Google Maps nas áreas que você atende, com estratégia de reviews para passar os concorrentes." },
      { title: "Orçamentos direto no WhatsApp", desc: "Formulário de orçamento conectado ao seu WhatsApp. Os leads chegam no seu celular prontos para fechar — sem checar email, sem perder trabalho." },
    ],
    crmBadge: "Opcional",
    crmTitle: "Quasar CRM",
    crmDesc: "Nossa plataforma all-in-one: pedido automático de review, mensagem automática quando você perde ligação, follow-up e agendamento online. Seu negócio trabalha enquanto você limpa.",
    brandLabel: "Entrega real",
    brandTitle: "É assim que a sua marca pode ficar.",
    brandCaption: "Identidade completa entregue para a Monteiros Cleaning Service (New Jersey): logo, cartões, camisetas, imã de carro e door hanger — mais o site, no ar em monteiroscleaningservice.com.",
    sitesLabel: "Sites",
    sitesTitle: "Sites que transformam pesquisa em pedido de orçamento.",
    sitesSub: "Sites reais que construímos para empresas de limpeza nos EUA.",
    videosLabel: "Depoimentos",
    videosTitle: "Donas de cleaning que começaram com a gente.",
    videosSub: "Brasileiras que construíram suas empresas de limpeza nos EUA — ouça delas.",
    watchVideo: "Assistir depoimento",
    videoTag: "House cleaning · EUA",
    nextCardTitle: "A próxima é você.",
    nextCardDesc: "Sua empresa de limpeza merece a mesma estrutura. Vamos conversar — em português mesmo.",
    nextCardCta: "Começar agora",
    pricingLabel: "Pacotes",
    pricingTitle: "Preço claro. Em até 4x sem juros.",
    pricingSub: "Pague online de uma vez ou divida em 4x sem juros no checkout (Klarna / Afterpay) — você escolhe.",
    popular: "Mais escolhido",
    oneTime: "único",
    perMonth: "/mês",
    plans: [
      {
        name: "Brand Essentials",
        price: "$997",
        weekly: "ou em até 4x sem juros no checkout",
        features: [
          "Logo + identidade visual completa",
          "Cartão, camiseta, imã de carro e door hanger",
          "Google Business Profile configurado e otimizado",
          "Estratégia de reviews para crescer suas estrelas",
        ],
        cta: "Começar com Essentials",
      },
      {
        name: "Complete Launch",
        price: "$1,997",
        weekly: "ou em até 4x sem juros no checkout",
        features: [
          "Tudo do Brand Essentials",
          "Site profissional otimizado para Google e IA",
          "Formulário de orçamento no seu WhatsApp",
          "Domínio + hospedagem no primeiro ano",
          "Pronto para rodar anúncios no Google ou Facebook",
        ],
        cta: "Lançar meu negócio",
      },
      {
        name: "Launch + Automation",
        price: "$1,997",
        monthly: "+ $147",
        weekly: "setup em até 4x + assinatura mensal",
        features: [
          "Tudo do Complete Launch",
          "Quasar CRM: agendamento + base de clientes",
          "Pedido automático de review após cada serviço",
          "Mensagem automática em ligação perdida",
          "Suporte contínuo em português",
        ],
        cta: "Automatizar tudo",
      },
    ],
    orWhats: "Dúvidas antes? Chama no WhatsApp →",
    pricingNote: "Checkout seguro pela Stripe · Divida em 4x sem juros com Klarna ou Afterpay · Prefere conversar antes? Chama no WhatsApp.",
    faqLabel: "Dúvidas frequentes",
    faqTitle: "Ainda decidindo? A gente entende.",
    faqs: [
      { q: "Não falo inglês bem. Isso é problema?", a: "Nenhum. Todo o atendimento é em português. Seu site e sua marca são escritos em inglês perfeito (a língua das suas clientes), e nós explicamos tudo para você em português." },
      { q: "Consigo todos os meus clientes por indicação. Por que preciso disso?", a: "Indicação é ótimo — mas tem teto. E tem um detalhe: quando alguém recebe seu nome, a primeira coisa que faz é jogar no Google. Se não aparece nada, a confiança cai e a pessoa segue em frente. Presença profissional transforma cada indicação em contrato fechado e traz clientes novas que você nunca alcançaria." },
      { q: "O que significa 'recomendada pela IA'?", a: "Cada vez mais americanos perguntam ao ChatGPT e outros assistentes coisas como 'best house cleaner near me'. A IA busca respostas em sites com a estrutura certa. Nós construímos seu site para a IA conseguir ler, citar e recomendar o seu negócio — a maioria das empresas de limpeza nem sabe que isso existe." },
      { q: "Quanto tempo demora?", a: "A identidade visual fica pronta em cerca de 7 dias. O pacote completo — marca, site e Google Business Profile — leva de 2 a 3 semanas da primeira conversa até estar no ar." },
      { q: "Posso parcelar?", a: "Sim — em até 4x sem juros. No checkout você escolhe Klarna ou Afterpay e divide qualquer pacote em 4 pagamentos no cartão, sem juros. Também dá pra pagar de uma vez com qualquer cartão. O checkout é seguro, pela Stripe." },
      { q: "O que é exatamente o Quasar CRM?", a: "É nossa plataforma all-in-one: agendamento online, base de clientes, pedido automático de review após cada serviço, mensagem automática em ligação perdida e follow-up. É opcional — você pode adicionar a qualquer momento depois do lançamento." },
    ],
    stepsLabel: "Como funciona",
    stepsTitle: "3 passos para lançar.",
    steps: [
      { title: "Chama no WhatsApp", desc: "Conta sobre seu negócio — em português mesmo. Sem compromisso." },
      { title: "Nós desenhamos e construímos", desc: "Marca, site e perfil do Google feitos para as áreas que você atende. Você aprova cada peça." },
      { title: "Você entra no ar", desc: "Em 2-3 semanas seu negócio está no Google, com cara profissional e pronto para ganhar clientes." },
    ],
    finalTitle: "Pronta para parecer tão profissional quanto seu trabalho?",
    finalSub: "Consulta gratuita · Atendimento em português · Pagamento semanal",
    finalBadge: "Vagas limitadas este mês",
    finalCta: "Falar no WhatsApp",
  },
  es: {
    headerCta: "WhatsApp",
    heroBadge: "Para empresas de limpieza en EE.UU.",
    heroTitle1: "Tu empresa de limpieza, encontrada en Google.",
    heroTitle2: "Y recomendada por la IA.",
    heroSub: "Marca profesional, sitio web y Google Business Profile — el paquete completo, hecho por el equipo que ya lanzó más de 30 negocios en EE.UU. desde 2021. Atención en español.",
    heroCta: "Hablar por WhatsApp",
    heroCta2: "Ver paquetes",
    heroProof: "5.0 ★ en Google · 30+ negocios lanzados en EE.UU.",
    deliverLabel: "Lo que recibes",
    deliverTitle: "Todo lo que una empresa de limpieza necesita para verse profesional.",
    deliverSub: "Cuando una clienta te encuentra, decide en segundos si confía en ti. Nosotros construimos todo lo que convierte esa decisión en un sí.",
    deliverables: [
      { title: "Identidad Visual Completa", desc: "Logo, tarjetas de presentación, camiseta, imán para el carro y door hanger. Una marca que genera confianza antes de que digas una palabra." },
      { title: "Sitio web encontrado por Google y la IA", desc: "Un sitio rápido y profesional, estructurado para que Google te posicione — y para que asistentes de IA como ChatGPT te recomienden cuando alguien busca una limpiadora cerca." },
      { title: "Google Business Profile", desc: "Configuración y optimización completa para aparecer en Google Maps en las zonas que atiendes, con estrategia de reseñas para superar a la competencia." },
      { title: "Cotizaciones directo a WhatsApp", desc: "Formulario de cotización conectado a tu WhatsApp. Los clientes llegan a tu teléfono listos para cerrar — sin revisar email, sin perder trabajos." },
    ],
    crmBadge: "Opcional",
    crmTitle: "Quasar CRM",
    crmDesc: "Nuestra plataforma todo-en-uno: solicitud automática de reseñas, mensaje automático cuando pierdes una llamada, seguimiento y agenda online. Tu negocio trabaja mientras tú limpias.",
    brandLabel: "Entrega real",
    brandTitle: "Así puede verse tu marca.",
    brandCaption: "Identidad completa entregada para Monteiros Cleaning Service (New Jersey): logo, tarjetas, camisetas, imán para el carro y door hanger — más el sitio web, en línea en monteiroscleaningservice.com.",
    sitesLabel: "Sitios web",
    sitesTitle: "Sitios que convierten búsquedas en cotizaciones.",
    sitesSub: "Sitios reales que construimos para empresas de limpieza en EE.UU.",
    videosLabel: "Testimonios",
    videosTitle: "Dueñas de empresas de limpieza que empezaron con nosotros.",
    videosSub: "Mujeres que construyeron sus negocios de limpieza en EE.UU. — escúchalas.",
    watchVideo: "Ver testimonio",
    videoTag: "Limpieza de casas · EE.UU.",
    nextCardTitle: "La próxima eres tú.",
    nextCardDesc: "Tu empresa de limpieza merece la misma estructura. Hablemos — en español.",
    nextCardCta: "Empezar ahora",
    pricingLabel: "Paquetes",
    pricingTitle: "Precio claro. Hasta 4 pagos sin intereses.",
    pricingSub: "Paga online de una vez o divide en 4 pagos sin intereses al pagar (Klarna / Afterpay) — tú eliges.",
    popular: "Más elegido",
    oneTime: "pago único",
    perMonth: "/mes",
    plans: [
      {
        name: "Brand Essentials",
        price: "$997",
        weekly: "o hasta 4 pagos sin intereses al pagar",
        features: [
          "Logo + identidad visual completa",
          "Tarjeta, camiseta, imán para carro y door hanger",
          "Google Business Profile configurado y optimizado",
          "Estrategia de reseñas para subir tus estrellas",
        ],
        cta: "Empezar con Essentials",
      },
      {
        name: "Complete Launch",
        price: "$1,997",
        weekly: "o hasta 4 pagos sin intereses al pagar",
        features: [
          "Todo lo de Brand Essentials",
          "Sitio web profesional optimizado para Google e IA",
          "Formulario de cotización a tu WhatsApp",
          "Dominio + hosting el primer año",
          "Listo para anuncios en Google o Facebook",
        ],
        cta: "Lanzar mi negocio",
      },
      {
        name: "Launch + Automation",
        price: "$1,997",
        monthly: "+ $147",
        weekly: "inicial en hasta 4 pagos + suscripción mensual",
        features: [
          "Todo lo de Complete Launch",
          "Quasar CRM: agenda + base de clientes",
          "Solicitud automática de reseña tras cada servicio",
          "Mensaje automático en llamadas perdidas",
          "Soporte continuo en español",
        ],
        cta: "Automatizar todo",
      },
    ],
    orWhats: "¿Dudas antes? Escríbenos por WhatsApp →",
    pricingNote: "Pago seguro con Stripe · Divide en 4 pagos sin intereses con Klarna o Afterpay · ¿Prefieres hablar primero? Escríbenos por WhatsApp.",
    faqLabel: "Preguntas frecuentes",
    faqTitle: "¿Aún lo estás pensando? Te entendemos.",
    faqs: [
      { q: "No hablo bien inglés. ¿Es un problema?", a: "Para nada. Te atendemos en español. Tu sitio web y tu marca se escriben en inglés perfecto (el idioma de tus clientes), y nosotros te explicamos todo en español." },
      { q: "Consigo todos mis clientes por recomendación. ¿Para qué necesito esto?", a: "Las recomendaciones son geniales — pero tienen techo. Y hay un detalle: cuando alguien recibe tu nombre, lo primero que hace es buscarte en Google. Si no aparece nada, la confianza baja y sigue de largo. Una presencia profesional convierte cada recomendación en contrato y trae clientes nuevos que nunca alcanzarías." },
      { q: "¿Qué significa 'recomendada por la IA'?", a: "Cada vez más personas le preguntan a ChatGPT y otros asistentes cosas como 'best house cleaner near me'. La IA saca respuestas de sitios con la estructura correcta. Construimos tu sitio para que la IA pueda leerlo, citarlo y recomendar tu negocio — la mayoría de las empresas de limpieza ni saben que esto existe." },
      { q: "¿Cuánto tiempo toma?", a: "La identidad visual está lista en unos 7 días. El paquete completo — marca, sitio y Google Business Profile — toma de 2 a 3 semanas desde la primera conversación hasta estar en línea." },
      { q: "¿Puedo pagar en cuotas?", a: "Sí — hasta 4 pagos sin intereses. Al pagar puedes elegir Klarna o Afterpay y dividir cualquier paquete en 4 pagos con tu tarjeta, sin intereses. También puedes pagar de una vez con cualquier tarjeta. El pago es seguro, con Stripe." },
      { q: "¿Qué es exactamente Quasar CRM?", a: "Es nuestra plataforma todo-en-uno: agenda online, base de clientes, solicitud automática de reseñas tras cada servicio, mensaje automático en llamadas perdidas y seguimiento. Es opcional — puedes agregarlo en cualquier momento después del lanzamiento." },
    ],
    stepsLabel: "Cómo funciona",
    stepsTitle: "3 pasos para lanzar.",
    steps: [
      { title: "Escríbenos por WhatsApp", desc: "Cuéntanos de tu negocio — en español. Sin compromiso." },
      { title: "Diseñamos y construimos", desc: "Marca, sitio y perfil de Google hechos para las zonas que atiendes. Tú apruebas cada pieza." },
      { title: "Sales en línea", desc: "En 2-3 semanas tu negocio está en Google, con imagen profesional y listo para ganar clientes." },
    ],
    finalTitle: "¿Lista para verte tan profesional como tu trabajo?",
    finalSub: "Consulta gratuita · Atención en español · Pagos semanales",
    finalBadge: "Cupos limitados este mes",
    finalCta: "Hablar por WhatsApp",
  },
}

function VideoPopup({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-2xl overflow-hidden bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <video src={url} className="w-full h-full object-contain" controls autoPlay playsInline />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function LangToggle() {
  const { locale, setLocale } = useLocale()
  const langs: Locale[] = ["en", "pt", "es"]
  return (
    <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1.5 text-[11px] font-extrabold uppercase transition-colors ${
            locale === l ? "bg-[#1B2F5E] text-white" : "text-[#475569] hover:bg-gray-50"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

const deliverableIcons = [Palette, Globe, MapPin, CalendarCheck]

function CleaningContent() {
  const { locale } = useLocale()
  const t = copy[locale]
  const [openFaq, setOpenFaq] = useState(0)
  const [videoPopup, setVideoPopup] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("checkout") === "success") {
      const plan = params.get("plan") ?? "unknown"
      trackCleaningPurchase(plan, PLAN_VALUES[plan] ?? 0)
      window.history.replaceState({}, "", "/cleaning")
    }
  }, [])

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo-h.png"
              alt="Vida Digital Solutions"
              width={150}
              height={34}
              className="h-8 w-auto"
              unoptimized
            />
          </a>
          <div className="flex items-center gap-3">
            <LangToggle />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCleaningWhatsApp}
              className="rounded-lg bg-[#00C4A0] px-5 py-2 text-sm text-[#060D1C] font-extrabold hover:bg-[#00C4A0]/90 transition-colors"
            >
              {t.headerCta}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <AuroraBackground className="pt-32 pb-20 px-6 min-h-0 h-auto" starCount={40}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00C4A0]/20 bg-[#00C4A0]/5 px-4 py-2 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00C4A0]" />
            <span className="text-[12px] text-[#00C4A0] font-medium">{t.heroBadge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.04em] leading-tight mb-4"
          >
            {t.heroTitle1}
            <br />
            <span className="text-[#00C4A0]">{t.heroTitle2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 font-light"
          >
            {t.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCleaningWhatsApp}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {t.heroCta}
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            >
              {t.heroCta2}
            </a>
          </motion.div>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-[12px] text-white/40"
          >
            {t.heroProof}
          </motion.p>
        </div>
      </AuroraBackground>

      {/* Deliverables */}
      <HeroHighlight containerClassName="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.deliverLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-4">
            {t.deliverTitle}
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#1B2F5E]/70 text-center max-w-2xl mx-auto mb-14">
            {t.deliverSub}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.deliverables.map((item, i) => {
              const Icon = deliverableIcons[i]
              return (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 hover:border-[#1B2F5E]/20 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1B2F5E]/5 border border-[#1B2F5E]/10 mb-4">
                    <Icon className="w-5 h-5 text-[#1B2F5E]" />
                  </div>
                  <h3 className="text-[16px] font-extrabold text-[#0A0A0F] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
            {/* Quasar CRM card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-xl bg-[#060D1C] border border-[#4B6CB7]/20 p-6 text-white sm:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00C4A0]/10 border border-[#00C4A0]/20 px-3 py-1 mb-4">
                <Bot className="w-3 h-3 text-[#00C4A0]" />
                <span className="text-[10px] text-[#00C4A0] font-medium tracking-wider uppercase">{t.crmBadge}</span>
              </div>
              <h3 className="text-[16px] font-extrabold mb-2">{t.crmTitle}</h3>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed">{t.crmDesc}</p>
            </motion.div>
          </div>
        </div>
      </HeroHighlight>

      {/* Branding showcase */}
      <section className="py-20 px-6 bg-[#F5F7FA]">
        <div className="max-w-5xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.brandLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-10">
            {t.brandTitle}
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-xl"
          >
            <Image
              src="/cleaning/branding-monteiros.jpg"
              alt="Complete visual identity for Monteiros Cleaning Service: logo, business cards, t-shirts, car magnet and door hanger"
              width={1920}
              height={987}
              className="w-full h-auto"
              unoptimized
            />
          </motion.div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[13px] text-[#475569] text-center mt-5 max-w-xl mx-auto">
            {t.brandCaption}
          </motion.p>
        </div>
      </section>

      {/* Websites portfolio */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.sitesLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-4">
            {t.sitesTitle}
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#1B2F5E]/70 text-center max-w-2xl mx-auto mb-14">
            {t.sitesSub}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((site, i) => {
              const card = (
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={site.img}
                    alt={`Website built for ${site.name}`}
                    width={720}
                    height={1100}
                    className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:-translate-y-16"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-extrabold text-[15px]">{site.name}</p>
                      <p className="text-[11px] text-white/60">{t.videoTag}</p>
                    </div>
                    {site.url && (
                      <span className="text-[11px] font-extrabold text-[#00C4A0] bg-[#060D1C]/60 rounded-full px-3 py-1">
                        {site.url.replace("https://", "").replace(/\/$/, "")} →
                      </span>
                    )}
                  </div>
                </div>
              )
              return (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] hover:shadow-xl transition-all"
                >
                  {site.url ? (
                    <a href={site.url} target="_blank" rel="noopener noreferrer">{card}</a>
                  ) : card}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials — vídeos em PT-BR, exibidos em pt e es (espanholas entendem); ocultos em en */}
      {locale !== "en" && (
      <AuroraBackground className="py-20 px-6 min-h-0 h-auto" starCount={30}>
        <div className="max-w-6xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#00C4A0] mb-4 text-center">
            {t.videosLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em] text-center mb-4">
            {t.videosTitle}
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#94A3B8] text-center max-w-2xl mx-auto mb-12">
            {t.videosSub}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((c, i) => (
              <motion.div key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#1B2F5E] border border-white/15 flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
                    {c.name[0]}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-extrabold text-white">{c.name}</h3>
                    <p className="text-[11px] text-[#94A3B8]">{t.videoTag}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setVideoPopup(c.video); trackCleaningVideoView(c.name); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                >
                  <Play className="w-4 h-4 text-[#00C4A0]" />
                  <span className="text-[12px] font-extrabold">{t.watchVideo}</span>
                </button>
              </motion.div>
            ))}
            {/* You're next card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              style={{ background: "rgba(0,196,160,0.08)", border: "1px solid rgba(0,196,160,0.25)" }}>
              <h3 className="text-[18px] font-extrabold text-white mb-2">{t.nextCardTitle}</h3>
              <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-5">{t.nextCardDesc}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCleaningWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.nextCardCta}
              </a>
            </motion.div>
          </div>
        </div>
      </AuroraBackground>
      )}

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.pricingLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-4">
            {t.pricingTitle}
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#1B2F5E]/70 text-center max-w-2xl mx-auto mb-14">
            {t.pricingSub}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.plans.map((plan, i) => {
              const isPopular = i === 1
              return (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-2xl p-7 flex flex-col ${
                    isPopular
                      ? "bg-[#060D1C] text-white border border-[#00C4A0]/30 shadow-2xl md:scale-105"
                      : "bg-[#F8FAFC] border border-[#E2E8F0]"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00C4A0] px-4 py-1 text-[11px] font-extrabold text-[#060D1C]">
                      {t.popular}
                    </span>
                  )}
                  <h3 className={`text-[17px] font-extrabold mb-3 ${isPopular ? "text-white" : "text-[#0A0A0F]"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-4xl font-extrabold tracking-tight ${isPopular ? "text-[#00C4A0]" : "text-[#1B2F5E]"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-[12px] ${isPopular ? "text-white/50" : "text-[#94A3B8]"}`}>
                      {t.oneTime}
                    </span>
                    {plan.monthly && (
                      <span className={`text-[15px] font-extrabold ${isPopular ? "text-white" : "text-[#1B2F5E]"}`}>
                        {plan.monthly}<span className="text-[11px] font-medium">{t.perMonth}</span>
                      </span>
                    )}
                  </div>
                  <p className={`text-[12px] mb-6 ${isPopular ? "text-[#00C4A0]/80" : "text-[#475569]"}`}>
                    {plan.weekly}
                  </p>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isPopular ? "text-[#00C4A0]" : "text-[#1B2F5E]"}`} />
                        <span className={`text-[13px] leading-relaxed ${isPopular ? "text-white/80" : "text-[#475569]"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${STRIPE_LINKS[i].url}?client_reference_id=${locale}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCleaningCheckout(STRIPE_LINKS[i].plan, STRIPE_LINKS[i].value)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-extrabold rounded-lg transition-colors ${
                      isPopular
                        ? "bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C]"
                        : "bg-[#1B2F5E] text-white hover:bg-[#1B2F5E]/90"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    {plan.cta}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackCleaningWhatsApp}
                    className={`block text-center mt-3 text-[12px] font-medium transition-colors ${
                      isPopular ? "text-white/60 hover:text-white" : "text-[#475569] hover:text-[#1B2F5E]"
                    }`}
                  >
                    {t.orWhats}
                  </a>
                </motion.div>
              )
            })}
          </div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[13px] text-[#475569] text-center mt-8">
            {t.pricingNote}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F7FA] py-20 px-6">
        <div className="max-w-[640px] mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.faqLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-10">
            {t.faqTitle}
          </motion.h2>

          <div className="flex flex-col gap-3">
            {t.faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`rounded-xl border overflow-hidden transition-colors ${
                    isOpen ? "bg-[#EEF2FF] border-[#1B2F5E]/20" : "bg-white border-[#E2E8F0]"
                  }`}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="text-[15px] font-extrabold text-[#0A0A0F]">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-[14px] text-[#475569] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#94A3B8] mb-4 text-center">
            {t.stepsLabel}
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] text-center mb-10">
            {t.stepsTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.steps.map((step, i) => (
              <motion.div key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00C4A0]/10 border border-[#00C4A0]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[18px] font-extrabold text-[#00C4A0]">{i + 1}</span>
                </div>
                <h3 className="text-[15px] font-extrabold text-[#0A0A0F] mb-1">{step.title}</h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <AuroraBackground className="py-20 px-6 min-h-0 h-auto" starCount={30}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.04em] mb-4">
            {t.finalTitle}
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#94A3B8] mb-3">
            {t.finalSub}
          </motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00C4A0]/20 bg-[#00C4A0]/5 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-[#00C4A0] animate-pulse" />
            <span className="text-[12px] text-[#00C4A0] font-medium">{t.finalBadge}</span>
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCleaningWhatsApp}
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] rounded-lg transition-colors"
            >
              <span className="absolute inset-0 rounded-lg animate-ping bg-[#00C4A0]/30" style={{ animationDuration: "2s" }} />
              <span className="absolute -inset-1 rounded-xl bg-[#00C4A0]/20 blur-md animate-pulse" style={{ animationDuration: "3s" }} />
              <span className="absolute inset-0 rounded-lg overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </span>
              <MessageCircle className="relative w-5 h-5" />
              <span className="relative">{t.finalCta}</span>
            </a>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* Footer */}
      <Footer />

      {/* WhatsApp floating */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackCleaningWhatsApp}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all"
        aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Video popup */}
      {videoPopup && (
        <VideoPopup url={videoPopup} onClose={() => setVideoPopup(null)} />
      )}
    </div>
  )
}

export function CleaningPage() {
  return (
    <AutoLocaleProvider>
      <CleaningContent />
    </AutoLocaleProvider>
  )
}
