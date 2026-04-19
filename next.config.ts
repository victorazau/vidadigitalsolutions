import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old localized blog slugs → shared EN slug
      { source: "/blog/como-automatizar-onboarding-clientes-gohighlevel", destination: "/blog/how-to-automate-client-onboarding-gohighlevel", permanent: true },
      { source: "/blog/como-criar-pipeline-vendas-gohighlevel", destination: "/blog/how-to-create-sales-pipeline-gohighlevel", permanent: true },
      { source: "/blog/como-crear-pipeline-ventas-gohighlevel", destination: "/blog/how-to-create-sales-pipeline-gohighlevel", permanent: true },
      { source: "/blog/empresa-de-limpeza-fecha-clientes-automaticamente-crm", destination: "/blog/how-cleaning-company-closed-clients-automatically-crm", permanent: true },
      { source: "/blog/empresa-de-limpieza-cierra-clientes-automaticamente-crm", destination: "/blog/how-cleaning-company-closed-clients-automatically-crm", permanent: true },
      { source: "/blog/gohighlevel-vs-hubspot-qual-crm-escolher", destination: "/blog/gohighlevel-vs-hubspot-which-crm", permanent: true },
      { source: "/blog/gohighlevel-vs-hubspot-que-crm-elegir", destination: "/blog/gohighlevel-vs-hubspot-which-crm", permanent: true },
      { source: "/blog/ia-gohighlevel-agentes-inteligentes-automacao", destination: "/blog/ai-gohighlevel-smart-agents-automation", permanent: true },
      { source: "/blog/ia-gohighlevel-agentes-inteligentes-automatizacion", destination: "/blog/ai-gohighlevel-smart-agents-automation", permanent: true },
      // Deduplicated workflow-builder → keep 2026 version
      { source: "/blog/gohighlevel-workflow-builder-complete-guide", destination: "/blog/gohighlevel-workflow-builder-complete-guide-2026", permanent: true },
    ];
  },
};

export default nextConfig;
