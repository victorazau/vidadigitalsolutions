import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Sem incrementalCache configurado, TODAS as paginas pre-renderizadas (os 54 posts
// do blog) respondem 404 — o /blog abre mas nenhum artigo. Este cache serve as
// paginas pre-renderizadas a partir dos static assets do Worker, sem exigir R2/KV.
// Adequado porque o site e 100% SSG e nao usa revalidacao.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
