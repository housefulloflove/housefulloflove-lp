import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route is prerendered at build, and the Worker has no repo files to read
// at request time, so serve the prerendered output from Workers Static Assets.
// This cache is read-only: if ISR (revalidate) is used later, switch to the R2
// incremental cache (add an R2 bucket binding named NEXT_INC_CACHE_R2_BUCKET in
// wrangler.jsonc and use overrides/incremental-cache/r2-incremental-cache).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
