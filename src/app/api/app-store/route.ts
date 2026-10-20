import {getCloudflareContext} from "@opennextjs/cloudflare";

import {getAppStoreUrl, isAppStoreCountry} from "@/config/product";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const locale = params.get("locale") ?? "en";
  const selectedCountry = params.get("country")?.toLowerCase() ?? "";
  let country: string | undefined;
  try {
    // Use Cloudflare's request metadata rather than a client-supplied country.
    country = getCloudflareContext().cf?.country;
  } catch {
    // `next start` has no Workers context. Explicit locale storefronts also
    // provide a usable fallback if country information is unavailable.
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: getAppStoreUrl(locale, isAppStoreCountry(selectedCountry) ? selectedCountry : country),
      "Cache-Control": "private, no-store, max-age=0",
      "CDN-Cache-Control": "no-store",
      "Cloudflare-CDN-Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
