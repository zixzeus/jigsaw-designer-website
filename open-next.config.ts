import {defineCloudflareConfig} from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  // Every published route is prerendered. Bundle those entries with Workers
  // static assets so deployments do not depend on a mutable R2 cache.
  incrementalCache: staticAssetsIncrementalCache,
});
