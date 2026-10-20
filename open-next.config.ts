import {defineCloudflareConfig} from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Content pages are prerendered. Bundle those entries with Workers static
  // assets; the legacy App Store redirect runs uncached per request.
  incrementalCache: staticAssetsIncrementalCache,
});
