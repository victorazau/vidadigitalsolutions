export type Locale = "en" | "pt" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      cases: "Cases",
      process: "Process",
      quasar: "Quasar CRM",
      contact: "Contact",
      cta: "Book a Call",
    },
    hero: {
      headline: "Vida Digital Solutions",
      headlineAccent: "We connect every tool your business runs on.\nInto one orbit.",
      subtitle:
        "Automation, integration, and digital strategy for businesses that want to scale without chaos.",
      cta: "Schedule a Free Discovery Call",
      ctaSecondary: "See Our Work",
      currencies: "Accepted: USD · EUR · BRL",
    },
  },
  pt: {
    nav: {
      services: "Serviços",
      cases: "Cases",
      process: "Processo",
      quasar: "Quasar CRM",
      contact: "Contato",
      cta: "Agendar",
    },
    hero: {
      headline: "Vida Digital Solutions",
      headlineAccent: "Conectamos cada sistema do seu negócio.\nEm uma só órbita.",
      subtitle:
        "Automação, integração e estratégia digital para empresas que querem escalar sem caos.",
      cta: "Agendar uma Discovery Call",
      ctaSecondary: "Veja Nosso Trabalho",
      currencies: "Aceito: USD · EUR · BRL",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      cases: "Cases",
      process: "Proceso",
      quasar: "Quasar CRM",
      contact: "Contacto",
      cta: "Reservar",
    },
    hero: {
      headline: "Vida Digital Solutions",
      headlineAccent: "Conectamos cada herramienta de tu negocio.\nEn una sola órbita.",
      subtitle:
        "Automatización, integración y estrategia digital para empresas que quieren escalar sin caos.",
      cta: "Reservar una Discovery Call",
      ctaSecondary: "Mira Nuestro Trabajo",
      currencies: "Aceptado: USD · EUR · BRL",
    },
  },
} as const;

export function t(locale: Locale) {
  return translations[locale];
}
